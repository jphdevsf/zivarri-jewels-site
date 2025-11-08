import type { Metadata } from 'next'
import { getCmsData } from '@/lib/cms/getCmsData'
import { toAbsoluteStrapiUrl } from '@/lib/cms/toAbsoluteStrapiUrl'
import type { SeoResponse } from '@/types/CMSResponse'

const mapSchemaTypeToOgType = (schemaType?: string): 'website' | 'article' => {
  if (schemaType === 'Article') return 'article'
  return 'website'
}

export const generateMetadataFromCms = async (slug: string, status: string): Promise<Metadata> => {
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