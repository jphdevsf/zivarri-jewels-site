import { notFound } from 'next/navigation'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import { generateMetadataFromStrapi } from '@/lib/seo/generateMetadataFromStrapi'
import { getPageBySlug } from '@/lib/strapi/client'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return await generateMetadataFromStrapi(slug)
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await getPageBySlug(slug)
  if (!page) return notFound()
  return (
    <main>
      <BlocksRenderer content={page.text ?? []} />
    </main>
  )
}
