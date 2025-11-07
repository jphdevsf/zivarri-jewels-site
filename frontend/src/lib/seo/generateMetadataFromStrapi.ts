import type { Metadata } from 'next'
import qs from 'qs'
import { getMediaUrl, type Page } from '@/lib/strapi/client'

// Map Strapi SEO schemaType (Schema.org) to Next.js Open Graph type.
// Only 'Article' has a direct OG match; others default to 'website' for safety.
const mapSchemaTypeToOg = (t?: string):
  | 'website'
  | 'article'
  | 'profile'
  | 'video.other' => {
  switch (t) {
    case 'Article':
      return 'article'
    case 'WebPage':
    case 'Product':
    case 'CollectionPage':
    case 'Event':
    case 'FAQPage':
    case 'LocalBusiness':
    default:
      return 'website'
  }
}

interface StrapiResponse<T = unknown> {
  data: T[]
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
  error?: {
    status: number
    name: string
    message: string
    details?: unknown
  }
}

async function getCmsData<T = unknown>(endpoint: string, queryParams: Record<string, unknown> = {}): Promise<StrapiResponse<T>> {
  // Match the same env fallback strategy used by lib/strapi/client.ts
  const baseUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    process.env.STRAPI_URL ||
    'http://strapi-dev:1337'
  const queryString = qs.stringify(queryParams, { encodeValuesOnly: true })
  const url = `${baseUrl}/api/${endpoint}${queryString ? `?${queryString}` : ''}`

  const response = await fetch(url, {
    // Add cache control to prevent caching issues
    cache: 'no-store'
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch from ${url}: ${response.statusText}`)
  }
  const data = await response.json()
  return data
}

export async function generateMetadataFromStrapi(slug: string): Promise<Metadata> {
  const rawData = await getCmsData<Page>('pages', {
    filters: { slug: { $eq: slug } },
    populate: { seo: { populate: '*' } },
    fields: ['title', 'slug']
  })
  const data = rawData.data?.[0]
  if (!data) return {}
  const seo = data.seo ?? undefined
  const imageUrl = getMediaUrl(seo?.seoImage)

  return {
    title: seo?.metaTitle || data.title,
    description: seo?.metaDescription || data.title,
    keywords: seo?.metaKeywords?.split(',').map((k: string) => k.trim()) || [],
    alternates: {
      canonical: `https://yourdomain.com/${slug}`,
    },
    openGraph: {
      title: seo?.metaTitle || data.title,
      description: seo?.metaDescription || data.title,
      url: `https://yourdomain.com/${slug}`,
      images: imageUrl ? [{ url: imageUrl }] : [],
      type: mapSchemaTypeToOg(seo?.schemaType),
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.metaTitle || data.title,
      description: seo?.metaDescription || data.title,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}