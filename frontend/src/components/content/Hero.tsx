import type { HeroBanner } from '@/types/content'
import Lockup from './atomic/Lockup'
import ImageData from './atomic/Image'

// Explicit arrays for Tailwind to detect all possible margin classes (25 entries: 15 increment by 1, then 10 increment by 2)
const topOffsetClasses = [
  'md:mt-0',
  'md:mt-1',
  'md:mt-2',
  'md:mt-3',
  'md:mt-4',
  'md:mt-5',
  'md:mt-6',
  'md:mt-7',
  'md:mt-8',
  'md:mt-9',
  'md:mt-10',
  'md:mt-11',
  'md:mt-12',
  'md:mt-13',
  'md:mt-14',
  'md:mt-16',
  'md:mt-18',
  'md:mt-20',
  'md:mt-22',
  'md:mt-24',
  'md:mt-26',
  'md:mt-28',
  'md:mt-30',
  'md:mt-32',
  'md:mt-34'
]

const rightOffsetClasses = [
  'md:mr-0',
  'md:mr-1',
  'md:mr-2',
  'md:mr-3',
  'md:mr-4',
  'md:mr-5',
  'md:mr-6',
  'md:mr-7',
  'md:mr-8',
  'md:mr-9',
  'md:mr-10',
  'md:mr-11',
  'md:mr-12',
  'md:mr-13',
  'md:mr-14',
  'md:mr-16',
  'md:mr-18',
  'md:mr-20',
  'md:mr-22',
  'md:mr-24',
  'md:mr-26',
  'md:mr-28',
  'md:mr-30',
  'md:mr-32',
  'md:mr-34'
]

const bottomOffsetClasses = [
  'md:mb-0',
  'md:mb-1',
  'md:mb-2',
  'md:mb-3',
  'md:mb-4',
  'md:mb-5',
  'md:mb-6',
  'md:mb-7',
  'md:mb-8',
  'md:mb-9',
  'md:mb-10',
  'md:mb-11',
  'md:mb-12',
  'md:mb-13',
  'md:mb-14',
  'md:mb-16',
  'md:mb-18',
  'md:mb-20',
  'md:mb-22',
  'md:mb-24',
  'md:mb-26',
  'md:mb-28',
  'md:mb-30',
  'md:mb-32',
  'md:mb-34'
]

const leftOffsetClasses = [
  'md:ml-0',
  'md:ml-1',
  'md:ml-2',
  'md:ml-3',
  'md:ml-4',
  'md:ml-5',
  'md:ml-6',
  'md:ml-7',
  'md:ml-8',
  'md:ml-9',
  'md:ml-10',
  'md:ml-11',
  'md:ml-12',
  'md:ml-13',
  'md:ml-14',
  'md:ml-16',
  'md:ml-18',
  'md:ml-20',
  'md:ml-22',
  'md:ml-24',
  'md:ml-26',
  'md:ml-28',
  'md:ml-30',
  'md:ml-32',
  'md:ml-34'
]


const grid12 = [
  'min-w-1/12',
  'min-w-2/12',
  'min-w-3/12',
  'min-w-4/12',
  'min-w-5/12',
  'min-w-6/12',
  'min-w-7/12',
  'min-w-8/12',
  'min-w-9/12',
  'min-w-10/12',
  'min-w-11/12',
  'min-w-12/12'
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
  const widthClass = grid12[width - 1] || 'min-w-12/12'
  return (
    <div className='content-hero relative block bg-background dark:bg-background-dark'>
      {/* {schedule && (
        <div>
          <h4>Schedule</h4>
          <p>Start: {schedule.date_start}</p>
          <p>End: {schedule.date_end}</p>
        </div>
      )} */}
      {firstLinkUrl && <a className='content-hero-hotspot absolute w-full h-full z-10' href={firstLinkUrl}></a>}
      <ImageData image={image} />
      <div className={`content-hero-lockup-wrapper relative md:absolute top-0 left-0 w-full h-full flex flex-col pb-4 ${alignClasses}`}>
        <div className={`content-hero-lockup-offset block relative ${widthClass} ${offsetClasses}`}>
          <span className='block p-8 text-primary dark:text-primary-dark bg-background dark:bg-background-dark'>
            <Lockup lockup={lockup} />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Hero
