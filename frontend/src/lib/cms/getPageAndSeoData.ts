import { getCmsData } from '@/lib/cms/getCmsData'
import type { PageAndSeoResponse } from '@/types/CMSResponse'
import { draftMode } from 'next/headers'
import { dynamicZoneQuery } from '@/lib/cms/config/queries'

export const getFullPageData = async (slug: string): Promise<PageAndSeoResponse | null> => {
  const { isEnabled: isDraftMode } = await draftMode()
  const status = isDraftMode ? 'draft' : 'published'
  const res = await getCmsData<PageAndSeoResponse>('pages', {
    filters: {
      slug: {
        $eq: slug
      }
    },
    fields: ['title', 'slug'],
    populate: {
      banners: {
        on: dynamicZoneQuery
      },
      seo: {
        fields: ['metaTitle', 'metaDescription', 'metaKeywords', 'schemaType', 'llmSummary'],
        populate: {
          seoImage: {
            fields: ['url', 'width', 'height'],
          }
        }
      }
    },
    status,
  })
  return (res.data as PageAndSeoResponse[])?.[0] || null
}