import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import type { FreeformTextComponent } from '@/types/content'

const FreeformText = ({ text }: FreeformTextComponent) => {
  return (
    <div className="content-freeform-text text-primary block px-8 py-12 dark:text-primary-dark bg-background dark:bg-background-dark">
      <BlocksRenderer content={text} />
    </div>
  )
}

export default FreeformText
