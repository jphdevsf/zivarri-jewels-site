import type { CardBanner } from '@/types/content'
import Lockup from './atomic/Lockup'
import ImageData from './atomic/Image'

const Card = ({ banner }: { banner: CardBanner }) => {
  const { id, lockup, image } = banner

  return (
    <div key={id}>
      <Lockup lockup={lockup} />
      <ImageData image={image} />
      {/* {schedule && (
        <div>
          <h4>Schedule</h4>
          <p>Start: {schedule.date_start}</p>
          <p>End: {schedule.date_end}</p>
        </div>
      )} */}
    </div>
  )
}

export default Card
