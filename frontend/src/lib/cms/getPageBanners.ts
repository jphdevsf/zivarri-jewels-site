import { getCmsData } from '@/lib/cms/getCmsData'
import type { BlockResponse } from '@/types/CMSResponse'
import type { BlockBanner } from '@/types/content'
import { dynamicZoneQuery } from '@/lib/cms/config/queries'

export const getPageBanners = async (slug: string): Promise<BlockBanner[]> => {
  const res = await getCmsData<BlockResponse[]>('blocks', {
    filters: {
      pages: {
        slug: {
          $eq: slug
        }
      }
    },
    populate: {
      content: {
        on: dynamicZoneQuery
      }
    }
  })

  const blocks = (res.data as BlockResponse[]) || []

  // Sort by page_order if it exists
  blocks.sort((a, b) => {
    const orderA = a.page_order || 1
    const orderB = b.page_order || 1
    return orderA - orderB
  })
  const content = blocks.flatMap(block => block.content || []).filter(Boolean) as BlockBanner[]

  return content
}