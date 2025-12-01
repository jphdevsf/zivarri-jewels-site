import { notFound } from 'next/navigation'
import type { PageAndSeoResponse } from '@/types/CMSResponse'
import Hero from './blocks/Hero'
import Card from './blocks/Card'
import SectionHeader from './blocks/SectionHeader'
import FreeformText from './blocks/FreeformText'
import Gallery from './blocks/Gallery'
import CardList from './blocks/CardList'
import Form from './blocks/Form'
import type { CMSBlock, Schedule } from '@/types/content'
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
  blocks: CMSBlock[]; // Required blocks prop for reusable content
}

const isValidDate = (schedule: Schedule | null) => {
  if (!schedule) return true
  const currentDate = new Date().toISOString()
  const { date_start, date_end } = {
    date_start: new Date(schedule?.date_start || 0).toISOString(),
    date_end: new Date(schedule?.date_end || currentDate).toISOString(),
  }
  return currentDate >= date_start && currentDate <= date_end
}

const PageRenderer = ({ data, blocks }: PageRendererProps) => {
  if (!data) return notFound()


  return (
    <main className='w-full max-w-7xl relative mx-auto my-8 flex flex-col gap-4 px-4'>
      <h1 className="sr-only">{data.title}</h1>
      {blocks && blocks.map((block: CMSBlock) => {
        if (!isValidDate(block.schedule)) return <></>
        const key = block.__component as keyof typeof componentMap
        if (!(key in componentMap)) {
          return <div key={block.id}>PageRenderer could not find component: {block.__component}</div>
        }
        const Component = componentMap[key] as React.ComponentType<unknown>
        return React.createElement(Component, { key: block.id, ...block })
      })}
    </main>
  )
}

export default PageRenderer