import type { Metadata } from 'next'
import { toAbsoluteStrapiUrl } from '@/lib/cms/toAbsoluteStrapiUrl'
import { getCmsMetadata } from '@/lib/cms/getCmsMetadata'
import type { SeoResponse } from '@/types/CMSResponse'

const mapSchemaTypeToOgType = (schemaType?: string): 'website' | 'article' => {
  if (schemaType === 'Article') return 'article'
  return 'website'
}



/**
 * Builds Next.js Metadata object from CMS data
 * @param data - Raw page data from Strapi
 * @param slug - Page slug for URL construction
 * @returns Next.js Metadata object
 */
const buildM = (data: SeoResponse, slug: string): Metadata => {
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
      type: mapSchemaTypeToOgType(seo?.schemaType),
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.metaTitle || data.title,
      description: seo?.metaDescription || data.title,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export const buildMetadata = async (slug: string, status: string): Promise<Metadata> => {
  const data = await getCmsMetadata(slug, status)
  if (!data) return {}
  return buildM(data, slug)
}