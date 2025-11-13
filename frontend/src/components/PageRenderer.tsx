import { notFound } from 'next/navigation'
import type { PageAndSeoResponse } from '@/types/CMSResponse'
import Hero from './content/Hero'
import Card from './content/Card'
import SectionHeader from './content/SectionHeader'
import FreeformText from './content/FreeformText'
import Gallery from './content/Gallery'
import CardList from './content/CardList'
import { CardBanner, HeroBanner, SectionHeaderBanner, FreeformTextBanner, GalleryBanner, CardListBanner, type Banner } from '@/types/content'
import React from 'react'

interface componentMapType {
  'content.hero': React.ComponentType<HeroBanner>;
  'content.card': React.ComponentType<CardBanner>;
  'content.section-header': React.ComponentType<SectionHeaderBanner>;
  'content.freeform-text': React.ComponentType<FreeformTextBanner>;
  'content.gallery': React.ComponentType<GalleryBanner>;
  'content.card-list': React.ComponentType<CardListBanner>;
}

const componentMap: componentMapType = {
  'content.hero': Hero,
  'content.card': Card,
  'content.section-header': SectionHeader,
  'content.freeform-text': FreeformText,
  'content.gallery': Gallery,
  'content.card-list': CardList,
}

const PageRenderer = ({ data }: { data: PageAndSeoResponse }) => {
  if (!data) return notFound()
  const { banners } = data
  return (
    <main className='w-full max-w-7xl block relative mx-auto my-8 flex flex-col gap-12 px-4'>
      <h1 className="sr-only">{data.title}</h1>
      {banners && banners.map((banner: Banner) => {
        const key = banner.__component as keyof componentMapType
        if (!(key in componentMap)) {
          return <div key={banner.id}>Component not found: {banner.__component}</div>
        }
        const Component = componentMap[key] as React.ComponentType<any>
        return React.createElement(Component, { key: banner.id, ...banner })
      })}
    </main>
  )
}

export default PageRenderer