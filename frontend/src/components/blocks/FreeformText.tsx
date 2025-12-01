import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import type { FreeformTextComponent } from '@/types/content'

const FreeformText = ({ text }: FreeformTextComponent) => {
  return (
    <div className="content-freeform-text text-primary block px-8 py-12 dark:text-primary-dark bg-background dark:bg-background-dark">
      {/* <div>
        <h4>Schedule</h4>
        <p>Start: {schedule.date_start}</p>
        <p>End: {schedule.date_end}</p>
      </div> */}
      <BlocksRenderer content={text} />
    </div>
  )
}

export default FreeformText
