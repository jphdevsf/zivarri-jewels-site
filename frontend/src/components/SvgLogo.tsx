'use client'

import { useState, useEffect } from 'react'

interface SvgLogoProps {
  svgUrl: string
  alt: string
}

export default function SvgLogo({ svgUrl, alt: _alt }: SvgLogoProps) {
  const [svgContent, setSvgContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(svgUrl)
        if (!res.ok) {
          throw new Error(`Failed to fetch SVG: ${res.status}`)
        }
        const content = await res.text()
        setSvgContent(content)
        setError(null)
      } catch (err) {
        console.error('Error fetching SVG:', err)
        setError(err instanceof Error ? err.message : 'Failed to load SVG')
      } finally {
        setIsLoading(false)
      }
    }

    if (svgUrl) {
      fetchSvg()
    }
  }, [svgUrl])

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-pulse bg-gray-200 w-full h-full rounded-full" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-gray-400 text-xs">SVG Error</div>
      </div>
    )
  }

  if (!svgContent) {
    return null
  }

  return (
    <div
      className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain"
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  )
}
