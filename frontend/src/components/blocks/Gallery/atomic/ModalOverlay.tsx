'use client'

import { useEffect, useRef, useCallback } from 'react'
import { toAbsoluteStrapiUrl } from '@/lib/cms/toAbsoluteStrapiUrl'
import type { StrapiImage } from '@/types/content'
import ModalCloseButton from './ModalCloseButton'
import ModalImage from './ModalImage'
import { useFocusTrap } from '@/hooks/useFocusTrap'

interface ModalOverlayProps {
  isOpen: boolean
  onClose: () => void
  selectedImage: {
    id: number
    url: string
    width: number
    height: number
    alternativeText?: string
    formats?: {
      small?: {
        url: string
        width: number
        height: number
      }
      medium?: {
        url: string
        width: number
        height: number
      }
    }
  } | null,
  images: Array<StrapiImage>;
}

const ModalOverlay = ({ isOpen, onClose, selectedImage }: ModalOverlayProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const scrollRef = useRef<number>(0)  // Persist scroll position
  
  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])
  
  useFocusTrap({ modalRef, closeButtonRef, isActive: !!selectedImage })


  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    if (isOpen) document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, handleClose])

  // Fixed scroll prevention without layout shift
  useEffect(() => {
    if (isOpen) {
      scrollRef.current = window.scrollY
      const scrollTop = `-${scrollRef.current}px`
      document.body.style.position = 'fixed'
      document.body.style.top = scrollTop
      document.body.style.left = '0'
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      window.scrollTo(0, scrollRef.current)
    }
  }, [isOpen])
  
  if (!selectedImage) return null
  const url = selectedImage?.url || ''
  const alternativeText = selectedImage?.alternativeText || ''
  const fullSizeUrl = selectedImage ? toAbsoluteStrapiUrl(url) : ''
  if (!fullSizeUrl) return null

  const bgClasses = `fixed inset-0 z-50 flex items-center justify-center bg-background dark:bg-background-dark bg-opacity-75 p-4 transition-opacity duration-300 ${
    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
  }`

  return (
    <div
      className={bgClasses}
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="image-modal relative max-w-full max-h-full"
        role="dialog"
        aria-modal="true"
        aria-label={alternativeText ? `View image: ${alternativeText}` : 'View image'}
      >
        <ModalCloseButton onClick={handleClose} buttonRef={closeButtonRef} />
        <ModalImage fullSizeUrl={fullSizeUrl} alternativeText={alternativeText} />
      </div>
    </div>
  )
}

export default ModalOverlay