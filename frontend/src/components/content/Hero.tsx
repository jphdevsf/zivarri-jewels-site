import type { HeroBanner } from '@/types/content'
import Lockup from './atomic/Lockup'
import ImageData from './atomic/Image'

// Explicit arrays for Tailwind to detect all possible margin classes (25 entries: 15 increment by 1, then 10 increment by 2)
const topOffsetClasses = [
  'mt-0', 'mt-1', 'mt-2', 'mt-3', 'mt-4', 'mt-5', 'mt-6', 'mt-7', 'mt-8', 'mt-9', 'mt-10',
  'mt-11', 'mt-12', 'mt-13', 'mt-14', 'mt-16', 'mt-18', 'mt-20', 'mt-22', 'mt-24', 'mt-26', 'mt-28', 'mt-30', 'mt-32', 'mt-34'
]
const rightOffsetClasses = [
  'mr-0', 'mr-1', 'mr-2', 'mr-3', 'mr-4', 'mr-5', 'mr-6', 'mr-7', 'mr-8', 'mr-9', 'mr-10',
  'mr-11', 'mr-12', 'mr-13', 'mr-14', 'mr-16', 'mr-18', 'mr-20', 'mr-22', 'mr-24', 'mr-26', 'mr-28', 'mr-30', 'mr-32', 'mr-34'
]
const bottomOffsetClasses = [
  'mb-0', 'mb-1', 'mb-2', 'mb-3', 'mb-4', 'mb-5', 'mb-6', 'mb-7', 'mb-8', 'mb-9', 'mb-10',
  'mb-11', 'mb-12', 'mb-13', 'mb-14', 'mb-16', 'mb-18', 'mb-20', 'mb-22', 'mb-24', 'mb-26', 'mb-28', 'mb-30', 'mb-32', 'mb-34'
]
const leftOffsetClasses = [
  'ml-0', 'ml-1', 'ml-2', 'ml-3', 'ml-4', 'ml-5', 'ml-6', 'ml-7', 'ml-8', 'ml-9', 'ml-10',
  'ml-11', 'ml-12', 'ml-13', 'ml-14', 'ml-16', 'ml-18', 'ml-20', 'ml-22', 'ml-24', 'ml-26', 'ml-28', 'ml-30', 'ml-32', 'ml-34'
]

const grid12 = [
  'w-1/12',
  'w-2/12',
  'w-3/12',
  'w-4/12',
  'w-5/12',
  'w-6/12',
  'w-7/12',
  'w-8/12',
  'w-9/12',
  'w-10/12',
  'w-11/12',
  'w-12/12'
]

const Hero = ({ lockup, image, lockup_align }: HeroBanner) => {
  const { links, width } = lockup
  const firstLinkUrl = links && links.length > 0 ? links[0].url : null
  const offsetClasses = `${topOffsetClasses[lockup_align.offset_top | 0]} ${rightOffsetClasses[lockup_align.offset_right | 0]} ${bottomOffsetClasses[lockup_align.offset_bottom | 0]} ${leftOffsetClasses[lockup_align.offset_left | 0]}`
  let alignClasses = ''
  if (lockup_align.x_axis === 'left') alignClasses += 'items-start '
  if (lockup_align.x_axis === 'center') alignClasses += 'items-center '
  if (lockup_align.x_axis === 'right') alignClasses += 'items-end '
  if (lockup_align.y_axis === 'top') alignClasses += 'justify-start '
  if (lockup_align.y_axis === 'center') alignClasses += 'justify-center '
  if (lockup_align.y_axis === 'bottom') alignClasses += 'justify-end '
  const widthClass = grid12[width - 1] || 'w-12/12'
  return (
    <div className='content-hero relative block bg-white'>
      {/* {schedule && (
        <div>
          <h4>Schedule</h4>
          <p>Start: {schedule.date_start}</p>
          <p>End: {schedule.date_end}</p>
        </div>
      )} */}
      {firstLinkUrl && <a className='content-hero-hotspot absolute w-full h-full z-10' href={firstLinkUrl}></a>}
      <ImageData image={image} />
      <div className={`content-hero-lockup-wrapper absolute top-0 left-0 w-full h-full flex flex-col pb-4 ${alignClasses}`}>
        <div className={`content-hero-lockup-offset block relative ${widthClass} ${offsetClasses}`}>
          <Lockup lockup={lockup} />
        </div>
      </div>
    </div>
  )
}

export default Hero
