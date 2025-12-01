'use client'

import { useEffect, useRef, useCallback } from 'react'
import { toAbsoluteStrapiUrl } from '@/lib/cms/toAbsoluteStrapiUrl'
import type { StrapiImage } from '@/types/content'

interface ImageModalProps {
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

const ImageModal = ({ isOpen, onClose, selectedImage }: ImageModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  // Focus trap and initial focus
  useEffect(() => {
    if (isOpen && selectedImage) {
      // Focus trap setup
      if (modalRef.current) {
        const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        const focusables = Array.from(modalRef.current.querySelectorAll(focusableSelector)) as HTMLElement[]
        if (focusables.length === 0) return

        const firstFocusable = focusables[0]
        const lastFocusable = focusables[focusables.length - 1]

        closeButtonRef.current?.focus()

        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === 'Tab') {
            if (focusables.length === 1) {
              e.preventDefault()
              return
            }
            if (e.shiftKey) {
              if (document.activeElement === firstFocusable) {
                e.preventDefault()
                lastFocusable.focus()
              }
            } else {
              if (document.activeElement === lastFocusable) {
                e.preventDefault()
                firstFocusable.focus()
              }
            }
          }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => {
          document.removeEventListener('keydown', handleKeyDown)
        }
      }
    }
  }, [isOpen, selectedImage])


  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, handleClose])

  if (!isOpen || !selectedImage) return null

  const { url, alternativeText } = selectedImage
  const fullSizeUrl = toAbsoluteStrapiUrl(url)

  return (
    <div
      className="image-modal-bg fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="image-modal relative max-w-full max-h-full"
        role="dialog"
        aria-modal="true"
        aria-label={alternativeText ? `View image: ${alternativeText}` : 'View image'}
      >
        <button
          ref={closeButtonRef}
          onClick={handleClose}
          className="image-modal-button absolute block aspect-square top-1 right-2 text-primary bg-background hover:text-background hover:bg-primary text-2xl font-bold z-10"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={fullSizeUrl}
          alt={alternativeText || ''}
          className="max-w-full max-h-full object-contain"
          style={{ maxHeight: 'calc(100vh - 2rem)' }}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  )
}

export default ImageModal