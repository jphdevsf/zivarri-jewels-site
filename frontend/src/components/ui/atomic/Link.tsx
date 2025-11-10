type LinkData = {
  id: number;
  title: string;
  url: string;
}

const Link = ({ link }: { link: LinkData }) => {
  return (
    <a href={link.url} key={link.id}>{link.title}</a>
  )
}

export default Link