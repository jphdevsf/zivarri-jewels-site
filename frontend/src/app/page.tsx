import { notFound } from 'next/navigation'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import { generateMetadataFromStrapi } from '@/lib/seo/generateMetadataFromStrapi'
import { getPageBySlug } from '@/lib/strapi/client'

export async function generateMetadata() {
  return await generateMetadataFromStrapi('home')
}

export default async function HomePage() {
  const page = await getPageBySlug('home')
  if (!page) return notFound()
  return (
    <main>
      <BlocksRenderer content={page.text ?? []} />
    </main>
  )
}
