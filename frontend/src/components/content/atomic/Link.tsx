type LinkData = {
  id: number;
  title: string;
  url: string;
}

const Link = ({ link }: { link: LinkData }) => {
  return (
    <a className="content-link inline-block relative bg-black text-white hover:bg-white hover:text-black transition-all duration-300 text-center text-md py-3 px-8 z-20 my-2" href={link.url} key={link.id}>{link.title}</a>
  )
}

export default Link