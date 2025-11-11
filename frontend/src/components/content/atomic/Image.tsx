import Image from 'next/image'
import { toAbsoluteStrapiUrl } from '@/lib/cms/toAbsoluteStrapiUrl'

type SimpleImageData = {
  id: number;
  url: string;
  width: number;
  height: number;
  alternativeText?: string;
}

type ResponsiveImageData = {
  id: number;
  altText: string;
  desktop: SimpleImageData;
  mobile: SimpleImageData;
}

const ImageData = ({ image }: { image: ResponsiveImageData }) => {
  // Check if it's a responsive image (has desktop and mobile)
  if ('desktop' in image && 'mobile' in image) {
    const responsiveImage = image as ResponsiveImageData
    const { desktop, mobile, altText } = responsiveImage
    return (
      <picture>
        <source
          media="(min-width: 768px)"
          srcSet={toAbsoluteStrapiUrl(desktop.url)!}
          width={desktop.width}
          height={desktop.height}
        />
        <source
          media="(max-width: 767px)"
          srcSet={toAbsoluteStrapiUrl(mobile.url)!}
          width={mobile.width}
          height={mobile.height}
        />
        <Image
          src={toAbsoluteStrapiUrl(desktop.url)!}
          alt={altText}
          width={desktop.width}
          height={desktop.height}
          priority={false}
          unoptimized={true}
        />
      </picture>
    )
  }
}

export default ImageData