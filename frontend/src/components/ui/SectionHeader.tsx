import type { SectionHeaderBanner } from '@/types/content'
import Lockup from './atomic/Lockup'

const SectionHeader = ({ banner }: { banner: SectionHeaderBanner }) => {
  const { id, lockup } = banner

  return (
    <div key={id}>
      <Lockup lockup={lockup} />

      {/* <div>
        <h4>Schedule</h4>
        <p>Start: {schedule.date_start}</p>
        <p>End: {schedule.date_end}</p>
      </div> */}
    </div>
  )
}

export default SectionHeader
