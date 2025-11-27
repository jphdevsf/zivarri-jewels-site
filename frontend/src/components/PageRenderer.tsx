import { notFound } from 'next/navigation'
import type { PageAndSeoResponse } from '@/types/CMSResponse'
import Hero from './content/Hero'
import Card from './content/Card'
import SectionHeader from './content/SectionHeader'
import FreeformText from './content/FreeformText'
import Gallery from './content/Gallery'
import CardList from './content/CardList'
import Form from './content/Form'
import type { BlockBanner } from '@/types/content'
import React from 'react'

const componentMap = {
  'content.hero': Hero,
  'content.card': Card,
  'content.section-header': SectionHeader,
  'content.freeform-text': FreeformText,
  'content.gallery': Gallery,
  'content.card-list': CardList,
  'content.contact-form': Form,
} as const

interface PageRendererProps {
  data: PageAndSeoResponse;
  blocks: BlockBanner[]; // Required blocks prop for reusable content
}

const PageRenderer = ({ data, blocks }: PageRendererProps) => {
  if (!data) return notFound()
  return (
    <main className='w-full max-w-7xl relative mx-auto my-8 flex flex-col gap-4 px-4'>
      <h1 className="sr-only">{data.title}</h1>
      {blocks && blocks.map((banner: BlockBanner) => {
        const key = banner.__component as keyof typeof componentMap
        if (!(key in componentMap)) {
          return <div key={banner.id}>PageRenderer could not find component: {banner.__component}</div>
        }
        const Component = componentMap[key] as React.ComponentType<unknown>
        return React.createElement(Component, { key: banner.id, ...banner })
      })}
    </main>
  )
}

export default PageRenderer