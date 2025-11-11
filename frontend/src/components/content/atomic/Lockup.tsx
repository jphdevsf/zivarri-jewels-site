import Link from './Link'

type LockupData = {
  id: number;
  leadin: string;
  title: string;
  subtitle: string;
  price: string;
  links: Array<{
    id: number;
    title: string;
    url: string;
  }>;
}

const Lockup = ({ lockup }: { lockup: LockupData }) => {
  const { leadin, title, subtitle, price, links } = lockup
  return (
    <span key={lockup.id} className="lockup">
      <span className="lockup-leadin">{leadin}</span>
      <span className="lockup-title">{title}</span>
      <span className="lockup-leadin">{subtitle}</span>
      <span className="lockup-leadin">{price}</span>
      {links.map((link) => (
        <Link key={link.id} link={link} />
      ))}
    </span>
  )
}

export default Lockup