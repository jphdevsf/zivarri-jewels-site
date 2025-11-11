import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import type { FreeformTextBanner } from '@/types/content'

const FreeformText = ({ text }: FreeformTextBanner) => {
  return (
    <div>
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
