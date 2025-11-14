import Link from './Link'
import type { Lockup } from '@/types/content'
import styles from './Lockup.module.css'

const Lockup = ({ lockup }: { lockup: Lockup }) => {
  const { leadin, title, subtitle, price, links, text_align } = lockup
  const textAlign = text_align === 'left' ? 'text-left' : text_align === 'right' ? 'text-right' : 'text-center'
  return (
    <span key={lockup.id} className={`content-lockup relative flex flex-row justify-center items-center p-1 bg-background dark:bg-background-dark ${textAlign} ${styles.lockup}`}>
      <span className='inline-block'>
        {leadin && <span className={`lockup-leadin block relative tracking-wide mt-1 ${styles.leadin}`}>{leadin}</span>}
        <h2 className={`lockup-title block relative font-semibold mt-1 ${styles.title}`}>{title}</h2>
        {subtitle && <span className={`lockup-subtitle block relative mt-1 ${styles.subtitle}`}>{subtitle}</span>}
        {price && <span className={`lockup-price block relative mt-2 ${styles.price}`}>{price}</span>}
        {links && links.length > 0 && (
          <span className={`lockup-links mx-auto w-11/12 ${styles.links}`}>
            {links.map((link) => (
              <Link key={link.id} link={link} />
            ))}
          </span>
        )}
      </span>
    </span>
  )
}

export default Lockup