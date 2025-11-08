import { notFound } from 'next/navigation'
import { generateMetadataFromCms } from '@/lib/seo/generateMetadataFromCms'
import { getCmsData, type PageResponse } from '@/lib/strapi/client'
import { draftMode } from 'next/headers'


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { isEnabled: isDraftMode } = await draftMode()
  const status = isDraftMode ? 'draft' : 'published'
  return await generateMetadataFromCms(slug, status)
}

export default async function Page({ params }: { params: Promise<{ slug?: string }> }) {
  const { slug } = await params
  const { isEnabled: isDraftMode } = await draftMode()
  const status = isDraftMode ? 'draft' : 'published'
  const res = await getCmsData<PageResponse>('pages', {
    filters: { slug: { $eq: slug } },
    populate: '*',
    status
  })
  const page = (res.data as PageResponse[])?.[0]
  if (!page) return notFound()
  return (
    <main>
      <h1 className="text-4xl font-bold text-foreground mb-4">{page.title}</h1>
    </main>
  )
}