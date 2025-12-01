import { buildMetadata } from '@/lib/cms/buildMetadata'
import PageRenderer from '@/components/PageRenderer'
import { getFullPageData } from '@/lib/cms/getPageAndSeoData'
import { getPageBlocks } from '@/lib/cms/getPageBlocks'
import type { PageAndSeoResponse } from '@/types/CMSResponse'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await getFullPageData(slug)
  return buildMetadata(data as PageAndSeoResponse)
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await getFullPageData(slug)
  const blocks = await getPageBlocks(slug)

  return <PageRenderer data={data as PageAndSeoResponse} blocks={blocks} />
}