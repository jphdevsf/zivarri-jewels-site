import type { BlocksContent } from '@strapi/blocks-react-renderer'

// Base Strapi URL. Prefer NEXT_PUBLIC_STRAPI_URL for both server and client usage.
const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || 'http://strapi-dev:1337'

// Strapi v5 response shapes (flattened in data, no attributes wrapper)
type StrapiListResponse<T> = { data: Array<T & { id: number }>; meta?: unknown }

// Minimal media shape helper types
type RecordObject = Record<string, unknown>
function isRecord(value: unknown): value is RecordObject {
  return typeof value === 'object' && value !== null
}

export type StrapiMedia =
  | { url?: string }
  | { attributes?: { url?: string } | null }
  | { data?: { url?: string } | { attributes?: { url?: string } } | null }

// Domain types
export type SEO = {
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string
  schemaType?:
  | 'WebPage'
  | 'Article'
  | 'Product'
  | 'CollectionPage'
  | 'Event'
  | 'FAQPage'
  | 'LocalBusiness'
  llmSummary?: BlocksContent | null
  seoImage?: StrapiMedia | null
} | null

export type Page = {
  id: number
  documentId?: string
  title: string
  slug: string
  published?: boolean
  text?: BlocksContent | null
  banners?: unknown
  seo?: SEO
}

// Returns an absolute URL for a Strapi media field (handles common Strapi shapes)
export function getMediaUrl(media: StrapiMedia | undefined | null): string | undefined {
  if (!media) return undefined

  let url: unknown

  if (isRecord(media) && typeof (media as RecordObject).url === 'string') {
    url = (media as RecordObject).url
  } else if (isRecord(media) && isRecord((media as RecordObject).data)) {
    const data = (media as RecordObject).data as RecordObject
    if (typeof data.url === 'string') {
      url = data.url
    } else if (isRecord(data.attributes) && typeof (data.attributes as RecordObject).url === 'string') {
      url = (data.attributes as RecordObject).url
    }
  } else if (isRecord(media) && isRecord((media as RecordObject).attributes)) {
    const attrs = (media as RecordObject).attributes as RecordObject
    if (typeof attrs.url === 'string') url = attrs.url
  }

  if (typeof url !== 'string' || url.length === 0) return undefined
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`
}

type NextFetchOptions = { revalidate?: number | false; tags?: string[] }

// Thin wrapper around fetch for Strapi
export async function strapiFetch<T = unknown>(
  endpoint: string,
  init?: RequestInit & { next?: NextFetchOptions }
): Promise<T> {
  const url = `${STRAPI_URL}${endpoint}`
  const res = await fetch(url, init)
  if (!res.ok) {
    throw new Error(`Strapi request failed: ${res.status} ${res.statusText}`)
  }
  return (await res.json()) as T
}

// Domain-specific queries (Strapi v5)
export async function getPageBySlug(
  slug: string,
  init?: RequestInit & { next?: NextFetchOptions }
): Promise<Page | null> {
  const query = `?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
  const json = await strapiFetch<StrapiListResponse<Page>>(`/api/pages${query}`, init)
  const item = json?.data?.[0]
  return item ?? null
}
