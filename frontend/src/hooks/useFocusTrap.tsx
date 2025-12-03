import { useEffect, RefObject } from 'react'

interface UseFocusTrapProps {
  modalRef: RefObject<HTMLDivElement | null>
  closeButtonRef: RefObject<HTMLButtonElement | null>
  isActive: boolean
}

export const useFocusTrap = ({ modalRef, closeButtonRef, isActive }: UseFocusTrapProps) => {
  useEffect(() => {
    if (!isActive || !modalRef.current) return

    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    const focusables = Array.from(modalRef.current.querySelectorAll(focusableSelector)) as HTMLElement[]
    if (focusables.length === 0) return
    
    const firstFocusable = focusables[0]
    const lastFocusable = focusables[focusables.length - 1]
    
    closeButtonRef.current?.focus()
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (focusables.length === 1) return e.preventDefault()
      if (e.shiftKey && (document.activeElement === firstFocusable)) {
        e.preventDefault()
        lastFocusable.focus()
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault()
          firstFocusable.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isActive, modalRef, closeButtonRef])
}
