import { buildMetadata } from '@/lib/cms/buildMetadata'
import PageRenderer from '@/components/PageRenderer'
import { getFullPageData } from '@/lib/cms/getPageAndSeoData'
import type { PageAndSeoResponse } from '@/types/CMSResponse'


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await getFullPageData(slug)
  return buildMetadata(data as PageAndSeoResponse)
}

export default async function HomePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await getFullPageData(slug)
  return <PageRenderer data={data as PageAndSeoResponse} />
}
