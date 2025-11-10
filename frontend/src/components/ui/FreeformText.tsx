import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import type { FreeformTextBanner } from '@/types/content'

const FreeformText = ({ banner }: { banner: FreeformTextBanner }) => {
  const { id, text } = banner

  return (
    <div key={id}>
      <BlocksRenderer content={text} />
      {/* <div>
        <h4>Schedule</h4>
        <p>Start: {schedule.date_start}</p>
        <p>End: {schedule.date_end}</p>
      </div> */}
    </div>
  )
}

export default FreeformText
