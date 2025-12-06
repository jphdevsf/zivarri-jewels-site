import type { NavigationHeaderResponse } from '@/types/CMSResponse'
import { toAbsoluteStrapiUrl } from '@/lib/cms/toAbsoluteStrapiUrl'
import Image from 'next/image'
import SvgLogo from './SvgLogo'

const Navigation = ({ links }: { links?: NavigationHeaderResponse['links'] }) => {
  console.log('JPH ', JSON.stringify(links, null, 2))
  if (!links || links.length === 0) return <></>
  const finalLinks = links.map(link => {
    return {
      url: link.url || `/${link.page?.slug || ''}`,
      title: link.title || link.page?.title || '',
      id: link.id,
      icon: {
        url: link?.icon?.url && toAbsoluteStrapiUrl(link?.icon?.url)! || null,
        mime: link?.icon?.mime || null,
        width: link?.icon?.width || null,
        height: link?.icon?.height || null,
        alternativeText: link?.icon?.alternativeText || null,
      },
      isIconSvg: link?.icon?.mime === 'image/svg+xml',
      hide_title: link.hide_title || false,
      hierarchy: link.hierarchy || null,
    }
  })
  return (
    <nav>
      <ul className="flex">
        {
          finalLinks?.map(link => (
            <li key={link.id}>
              <a href={link.url} className="px-4 py-4 block text-secondary dark:text-secondary-dark">
                {link.title}
                {link.icon.url && link.isIconSvg ? (
                  <SvgLogo
                    svgUrl={link.icon?.url || ''}
                    alt={link.icon.alternativeText || 'Logo'}
                  />
                ) : link.icon.url ? (
                  <Image
                    src={link.icon?.url || ''}
                    alt={link.icon.alternativeText || 'Logo'}
                    width={link.icon.width || undefined}
                    height={link.icon.height || undefined}
                    className="relative w-full h-full object-cover"
                    unoptimized={true}
                  />) : null
                }
              </a>
            </li>
          )) || []
        }
      </ul>
    </nav>
  )
}

export default Navigation
