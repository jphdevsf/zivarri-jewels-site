import type { BlocksContent } from '@strapi/blocks-react-renderer'
import qs from 'qs'

// Base Strapi URL. Prefer NEXT_PUBLIC_STRAPI_URL for both server and client usage.
const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || 'http://strapi-dev:1337'

// Generic Strapi response shapes
type StrapiItem<T> = { id: number; attributes?: T } & Record<string, unknown>;
type StrapiListResponse<T> = { data: Array<StrapiItem<T>>; meta?: unknown };

// Normalized frontend types
export type Page = {
  id: number;
  title: string;
  slug: string;
  published?: boolean;
  text?: BlocksContent | null;
  banners?: unknown;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
    schemaType?: string;
    llmSummary?: BlocksContent | null;
    seoImage?: any;
  } | null;
};

// Helper to normalize Strapi v4 entries (flattens attributes)
function normalizeEntry<T>(item: StrapiItem<T>): T & { id: number } {
  if (!item) return item as unknown as T & { id: number }
  const { id, attributes, ...rest } = item as any
  return (attributes ? { id, ...attributes } : { id, ...(rest as object) }) as T & { id: number }
}

// Returns an absolute URL for a Strapi media field (handles both data.url and data.attributes.url)
interface StrapiMedia {
  url?: string
  data?: {
    url?: string
    attributes?: {
      url?: string
    }
  }
  attributes?: {
    url?: string
  }
}

export function getMediaUrl(media: unknown): string | undefined {
  if (!media) return undefined

  if (typeof media === 'string') return media

  if (typeof media === 'object' && media !== null) {
    const mediaObj = media as StrapiMedia
    return (
      mediaObj.url ||
      mediaObj.data?.url ||
      mediaObj.data?.attributes?.url ||
      mediaObj.attributes?.url
    )
  }

  return undefined
}

// Thin wrapper around fetch for Strapi
export async function strapiFetch<T = unknown>(
  endpoint: string,
  init?: RequestInit & { next?: { revalidate?: number | false; tags?: string[] } }
): Promise<T> {
  const url = `${STRAPI_URL}${endpoint}`
  const res = await fetch(url, init)
  if (!res.ok) {
    throw new Error(`Strapi request failed: ${res.status} ${res.statusText}`)
  }
  return (await res.json()) as T
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const query = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: '*',
  }, {
    encodeValuesOnly: true, // avoids encoding keys like filters[slug][$eq]
  })

  const json = await strapiFetch<StrapiListResponse<Page>>(`/api/pages?${query}`)
  const item = json?.data?.[0]
  if (!item) return null
  return normalizeEntry<Page>(item)
}

export async function getPageBannersBySlug(slug: string): Promise<unknown | null> {
  const query = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      banners: {
        populate: {
          image: {
            populate: '*', // gets image metadata including URL
          },
          lockup: '*',
          schedule: '*',
        },
      },
    },
  }, {
    encodeValuesOnly: true,
  })

  const json = await strapiFetch<StrapiListResponse<{ banners: unknown[] }>>(`/api/pages?${query}`, { next: { revalidate: 60 } })
  const page = json?.data?.[0]
  if (!page?.banners) return null
  return page.banners
}