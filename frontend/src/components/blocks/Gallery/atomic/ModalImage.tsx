'use client'

import React from 'react'

interface ModalImageProps {
  fullSizeUrl: string
  alternativeText: string
}

const ModalImage = ({ fullSizeUrl, alternativeText }: ModalImageProps) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={fullSizeUrl}
    alt={alternativeText}
    className="max-w-full max-h-full object-contain"
    style={{ maxHeight: 'calc(100vh - 2rem)' }}
    onClick={(e) => e.stopPropagation()}
  />
)

export default ModalImage
