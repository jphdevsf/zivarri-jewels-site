import { buildMetadata } from '@/lib/cms/buildMetadata'
import PageRenderer from '@/components/PageRenderer'
import { getFullPageData } from '@/lib/cms/getPageAndSeoData'
import { getPageBanners } from '@/lib/cms/getPageBanners'
import type { PageAndSeoResponse } from '@/types/CMSResponse'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await getFullPageData(slug)
  return buildMetadata(data as PageAndSeoResponse)
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await getFullPageData(slug)
  const blocks = await getPageBanners(slug)
  
  console.log('📄 Dynamic Page - Slug:', slug)
  console.log('📄 Dynamic Page - Page data:', data?.title)
  console.log('📄 Dynamic Page - Blocks data:', blocks?.length, 'items')
  
  return <PageRenderer data={data as PageAndSeoResponse} blocks={blocks} />
}