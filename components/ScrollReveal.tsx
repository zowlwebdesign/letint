'use client'

import { useEffect, useRef } from 'react'

type Variant = 'up' | 'left' | 'right' | 'scale' | 'fade'

interface Props {
  children: React.ReactNode
  className?: string
  variant?: Variant
  delay?: number   // ms
  threshold?: number
}

const variantClass: Record<Variant, string> = {
  up: 'reveal',
  left: 'reveal-left',
  right: 'reveal-right',
  scale: 'reveal-scale',
  fade: 'reveal-fade',
}

export default function ScrollReveal({
  children,
  className = '',
  variant = 'up',
  delay = 0,
  threshold = 0.12,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Apply delay inline so it's scoped to this element only
    if (delay) el.style.transitionDelay = `${delay}ms`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, threshold])

  return (
    <div ref={ref} className={`${variantClass[variant]} ${className}`}>
      {children}
    </div>
  )
}
