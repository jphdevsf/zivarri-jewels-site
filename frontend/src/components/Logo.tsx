import Image from 'next/image'
import { toAbsoluteStrapiUrl } from '@/lib/cms/toAbsoluteStrapiUrl'
import type { GlobalSettingResponse } from '@/types/CMSResponse'
import SvgLogo from './SvgLogo'

interface LogoProps {
  logo?: GlobalSettingResponse['logo']
}

export default function Logo({ logo }: LogoProps) {
  if (!logo || !logo.url) return null

  const url = toAbsoluteStrapiUrl(logo.url)!
  const isSvg = logo.mime === 'image/svg+xml'

  return (
    <div className="logo-wrapper flex items-center gap-2">
      <div className="logo-container white w-[32px] aspect-square overflow-hidden">
        {isSvg ? (
          <SvgLogo
            svgUrl={url}
            alt={logo.alternativeText || logo.caption || 'Logo'}
          />
        ) : (
          <Image
            src={url}
            alt={logo.alternativeText || logo.caption || 'Logo'}
            width={logo.width || undefined}
            height={logo.height || undefined}
            className="relative w-full h-full object-cover"
            unoptimized={true}
          />
        )}
      </div>
      <span className="text-center text-[2em] tracking-widest uppercase leading-none font-heading-bold mx-2">Zivarri <span className="block text-[0.5em] leading-[0.8em] font-heading">Jewels</span></span>
    </div>
  )
}