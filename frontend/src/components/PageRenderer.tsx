import { notFound } from 'next/navigation'
import type { PageAndSeoResponse } from '@/types/CMSResponse'

const PageRenderer = ({ data }: { data: PageAndSeoResponse }) => {
  if (!data) return notFound()
  return (
    <main>
      <h1 className="text-4xl font-bold text-foreground mb-4">{data.title}</h1>
    </main>
  )
}

export default PageRenderer
