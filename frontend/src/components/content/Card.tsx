import type { CardBanner } from '@/types/content'
import Lockup from './atomic/Lockup'
import ImageData from './atomic/Image'

const Card = ({ lockup, image }: CardBanner) => {
  const { links } = lockup
  const firstLinkUrl = links && links.length > 0 ? links[0].url : null
  return (
    <div className="content-card relative mb-8 md:mb-0 md:flex md:flex-col justify-start lg:justify-beteween text-primary block p-8 pb-4 dark:text-primary-dark bg-background dark:bg-background-dark">
      {/* {schedule && (
      <div>
        <h4>Schedule</h4>
        <p>Start: {schedule.date_start}</p>
        <p>End: {schedule.date_end}</p>
      </div>
      )} */}
      {firstLinkUrl ? (
        <a href={firstLinkUrl} className="aspect-square">
          <ImageData image={image} />
        </a>
      ) : (
        <div className="aspect-square">
          <ImageData image={image} />
        </div>
      )}
      <div className='flex flex-col relative justify-center'>
        <Lockup lockup={lockup} />
      </div>
    </div>
  )
}

export default Card
