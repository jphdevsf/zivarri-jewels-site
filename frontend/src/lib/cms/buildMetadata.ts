// import type { Metadata } from 'next'
import { toAbsoluteStrapiUrl } from '@/lib/cms/toAbsoluteStrapiUrl'
import type { PageAndSeoResponse } from '@/types/CMSResponse'

const mapSchemaTypeToOgType = (schemaType?: string): 'website' | 'article' => {
  if (schemaType === 'Article') return 'article'
  return 'website'
}

export const buildMetadata = (data: PageAndSeoResponse) => {
  const { slug } = data
  const seo = data.seo ?? undefined
  const imageUrl = toAbsoluteStrapiUrl(seo?.seoImage?.url)

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