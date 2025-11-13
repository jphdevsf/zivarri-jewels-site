import { buildMetadata } from '@/lib/cms/buildMetadata'
import PageRenderer from '@/components/PageRenderer'
import { getFullPageData } from '@/lib/cms/getPageAndSeoData'
import { getPageBanners } from '@/lib/cms/getPageBanners'
import type { PageAndSeoResponse } from '@/types/CMSResponse'

export async function generateMetadata() {
  const data = await getFullPageData('home')
  return buildMetadata(data as PageAndSeoResponse)
}

export default async function HomePage() {
  const data = await getFullPageData('home')
  const blocks = await getPageBanners('home')

  return <PageRenderer data={data as PageAndSeoResponse} blocks={blocks} />
}
