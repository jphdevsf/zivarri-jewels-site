import type { SectionHeaderComponent } from '@/types/content'
import Lockup from './atomic/Lockup'

const SectionHeader = ({ lockup }: SectionHeaderComponent) => {
  return (
    <div className='content-section-header'>
      <Lockup lockup={lockup} />
    </div>
  )
}

export default SectionHeader
