'use client'

import { useState, useRef } from 'react'
import { toAbsoluteStrapiUrl } from '@/lib/cms/toAbsoluteStrapiUrl'
import ImageModal from './ImageModal'
import type { GalleryBanner, StrapiImage } from '@/types/content'

const Gallery = ({ title, images }: GalleryBanner) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<StrapiImage | null>(null)
  const openedButtonRef = useRef<HTMLButtonElement | null>(null)

  const handleImageClick = (image: StrapiImage, event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedImage(image)
    openedButtonRef.current = event.currentTarget
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
    if (openedButtonRef.current) {
      // Restore focus after modal unmounts
      setTimeout(() => {
        openedButtonRef.current?.focus()
      }, 0)
    }
    openedButtonRef.current = null
  }

  return (
    <div className='content-gallery'>
      {title && <h2 className='text-3xl mt-8 mb-6'>{title}</h2>}
      <ul className='content-gallery-image-wrapper grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 list-none p-0 m-0 focus:outline-none focus:ring-2'>
        {images && images.map((image) => {
          const { width, height, url, formats: { small, medium } } = image
          return (
            <li key={image.id} className='aspect-square overflow-hidden'>
              <button
                type="button"
                className='w-full h-full block bg-transparent border-0 p-0 focus:ring-2 focus:ring-blue-500'
                onClick={(e) => handleImageClick(image, e)}
                aria-label={`View ${image.alternativeText || 'image'}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className='block'
                  src={toAbsoluteStrapiUrl(medium.url || url)}
                  alt={image.alternativeText || ''}
                  width={width}
                  height={height}
                  sizes="(max-width: 767px) 33vw, (max-width: 1023px) 25vw, 16vw"
                  srcSet={`${toAbsoluteStrapiUrl(small.url)} ${small.width}w, ${toAbsoluteStrapiUrl(medium.url)} ${medium.width}w, ${toAbsoluteStrapiUrl(url)} ${width}w`}
                />
              </button>
            </li>
          )
        })}
      </ul>
      {
        isModalOpen && selectedImage && (
          <ImageModal
            isOpen={isModalOpen}
            selectedImage={selectedImage}
            images={images}
            onClose={closeModal}
          />
        )
      }
    </div >
  )
}

export default Gallery