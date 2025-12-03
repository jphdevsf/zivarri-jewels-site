'use client'

import React from 'react'

interface ModalCloseButtonProps {
  onClick: () => void
  buttonRef: React.Ref<HTMLButtonElement>
}

const ModalCloseButton = ({ onClick, buttonRef }: ModalCloseButtonProps) => (
  <button
    ref={buttonRef}
    onClick={onClick}
    className={'image-modal-button absolute block aspect-square top-1 right-2 text-primary bg-background hover:text-background hover:bg-primary text-2xl font-bold z-10'}
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
)

export default ModalCloseButton
