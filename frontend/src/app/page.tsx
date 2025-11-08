import { notFound } from 'next/navigation'
import { generateMetadataFromCms } from '@/lib/cms/generateMetadataFromCms'
import { getCmsData } from '@/lib/cms/getCmsData'
import { draftMode } from 'next/headers'
import type { PageResponse } from '@/types/CMSResponse'

export async function generateMetadata() {
  const { isEnabled: isDraftMode } = await draftMode()
  const status = isDraftMode ? 'draft' : 'published'
  const test = await generateMetadataFromCms('home', status)
  return test
}

export default async function HomePage() {
  const { isEnabled: isDraftMode } = await draftMode()
  const status = isDraftMode ? 'draft' : 'published'
  const res = await getCmsData<PageResponse>('pages', {
    filters: {
      slug: {
        $eq: 'home'
      }
    },
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
