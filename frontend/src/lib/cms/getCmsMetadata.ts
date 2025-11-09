import { getCmsData } from '@/lib/cms/getCmsData'
import type { SeoResponse } from '@/types/CMSResponse'

/**
 * Fetches page data from Strapi CMS
 * @param slug - Page slug to fetch
 * @param status - Publication status ('draft' or 'published')
 * @returns Page data or null if not found
 */
export const getCmsMetadata = async (slug: string, status: string): Promise<SeoResponse | null> => {
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
  return (res.data as SeoResponse[])?.[0] || null
}