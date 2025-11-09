import Image from 'next/image'
import { toAbsoluteStrapiUrl } from '@/lib/cms/toAbsoluteStrapiUrl'
import type { GlobalSettingResponse } from '@/types/CMSResponse'

interface LogoProps {
  logo?: GlobalSettingResponse['logo']
}

export default function Logo({ logo }: LogoProps) {
  if (!logo || !logo.url || !logo.width || !logo.height) {
    return null
  }

  return (
    <div className="w-full max-w-[72px] aspect-square rounded-full overflow-hidden">
      <Image
        src={toAbsoluteStrapiUrl(logo.url)!}
        alt={logo.alternativeText || 'Logo'}
        width={logo.width}
        height={logo.height}
        className="relative w-full h-full object-cover"
        unoptimized={true}
      />
    </div>
  )
}