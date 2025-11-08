import type { Metadata } from 'next'
import { getCmsData, toAbsoluteStrapiUrl, type SeoResponse } from '@/lib/strapi/client'

// Map Strapi SEO schemaType (Schema.org) to Next.js Open Graph type. Only 'Article' has a direct OG match; others default to 'website' for safety.
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

export async function generateMetadataFromCms(slug: string, status: string): Promise<Metadata> {
  const res = await getCmsData<SeoResponse>('pages', {
    filters: {
      slug: {
        $eq: slug
      }
    },
    populate: {
      seo: {
        populate: '*'
      }
    },
    fields: ['title', 'slug'],
    status: status
  })
  const data = (res.data as SeoResponse[])?.[0]
  if (!data) return {}
  const seo = data.seo ?? undefined
  const imageUrl = toAbsoluteStrapiUrl(seo?.seoImage?.formats?.small?.url || seo?.seoImage?.url)
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