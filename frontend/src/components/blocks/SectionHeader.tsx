import type { SectionHeaderComponent } from '@/types/content'
import Lockup from './atomic/Lockup'

const SectionHeader = ({ lockup }: SectionHeaderComponent) => {
  return (
    <div className='content-section-header'>
      {/* <div>
        <h4>Schedule</h4>
        <p>Start: {schedule.date_start}</p>
        <p>End: {schedule.date_end}</p>
      </div> */}
      <Lockup lockup={lockup} />
    </div>
  )
}

export default SectionHeader
