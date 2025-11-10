import { notFound } from 'next/navigation'
import type { PageAndSeoResponse } from '@/types/CMSResponse'
import Card from './ui/Card'
import SectionHeader from './ui/SectionHeader'
import FreeformText from './ui/FreeformText'
import Gallery from './ui/Gallery'
import CardList from './ui/CardList'

const PageRenderer = ({ data }: { data: PageAndSeoResponse }) => {
  if (!data) return notFound()

  const renderBanner = (banner: unknown) => {
    const bannerObj = banner as { id: number; __component: string;[key: string]: unknown }

    if (bannerObj.__component === 'content.card') {
      return <Card key={bannerObj.id} banner={bannerObj as any} />
    } else if (bannerObj.__component === 'content.section-header') {
      return <SectionHeader key={bannerObj.id} banner={bannerObj as any} />
    } else if (bannerObj.__component === 'content.freeform-text') {
      return <FreeformText key={bannerObj.id} banner={bannerObj as any} />
    } else if (bannerObj.__component === 'content.gallery') {
      return <Gallery key={bannerObj.id} banner={bannerObj as any} />
    } else if (bannerObj.__component === 'content.card-list') {
      return <CardList key={bannerObj.id} banner={bannerObj as any} />
    } else {
      return <div>Unknown component type: {bannerObj.__component}</div>
    }
  }

  return (
    <main>
      <h1 className="text-4xl font-bold text-foreground mb-4">{data.title}</h1>
      {data.banners && data.banners.map((banner) => renderBanner(banner))}
    </main>
  )
}

export default PageRenderer