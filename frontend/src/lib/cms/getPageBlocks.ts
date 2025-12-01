import { getCmsData } from '@/lib/cms/getCmsData'
import type { BlockResponse } from '@/types/CMSResponse'
import type { CMSBlock, Schedule } from '@/types/content'
import { dynamicZoneQuery } from '@/lib/cms/queries'

const isValidDate = (schedule: Schedule | null) => {
  if (!schedule) return true
  const currentDate = new Date().toISOString()
  const { date_start, date_end } = {
    date_start: new Date(schedule?.date_start || 0).toISOString(),
    date_end: new Date(schedule?.date_end || currentDate).toISOString(),
  }
  return currentDate >= date_start && currentDate <= date_end
}

export const getPageBlocks = async (slug: string): Promise<CMSBlock[]> => {
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
      },
      schedule: true
    }
  })
  const blocks = (res.data as BlockResponse[]) || []
  // Sort by page_order if it exists
  blocks.sort((a, b) => {
    const orderA = a.page_order || 1
    const orderB = b.page_order || 1
    return orderA - orderB
  })
  const scheduledBlocks = blocks.filter((block) => isValidDate(block.schedule))
  return scheduledBlocks.flatMap(block => block.content || []).filter(Boolean) as CMSBlock[]
}