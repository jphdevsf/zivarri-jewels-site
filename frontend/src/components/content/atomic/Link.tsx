type LinkData = {
  id: number;
  title: string;
  url: string;
  hierarchy?: {
    priority: string;
  }
}

const Link = ({ link }: { link: LinkData }) => {
  const priority = link?.hierarchy?.priority || 'primary'
  return (
    priority === 'primary' ? (<a className="content-link inline-block relative text-background bg-primary dark:text-background dark:bg-primary border hover:text-primary hover:bg-background transition-all duration-300 text-center text-md py-3 px-8 z-20 my-2" href={link.url} key={link.id}>{link.title}</a>)
      : priority === 'secondary' ? (<a className="content-link inline-block underline relative text-primary dark:text-background text-center text-md font-semibold z-20 my-2" href={link.url} key={link.id}>{link.title}</a>)
        : priority === 'tertiary' ? (<a className="content-link inline-block underline relative text-primary dark:text-background text-center text-sm font-semibold z-20 my-2" href={link.url} key={link.id}>{link.title}</a>)
          : null
  )
}

export default Link