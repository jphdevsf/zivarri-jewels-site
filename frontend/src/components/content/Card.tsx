import type { CardBanner } from '@/types/content'
import Lockup from './atomic/Lockup'
import ImageData from './atomic/Image'

const Card = ({ lockup, image }: CardBanner) => {
  return (
    <div>
      {/* {schedule && (
        <div>
          <h4>Schedule</h4>
          <p>Start: {schedule.date_start}</p>
          <p>End: {schedule.date_end}</p>
        </div>
      )} */}
      <Lockup lockup={lockup} />
      <ImageData image={image} />
    </div>
  )
}

export default Card
