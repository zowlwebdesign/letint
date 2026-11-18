'use client'

import { trackEvent } from '../../lib/analytics'

export const SOLUTION_SELECT_EVENT = 'solar:select-solution'

interface SolutionCtaProps {
  slug?: string
  number?: string
  className?: string
  children: React.ReactNode
  /** Form section to scroll to */
  target?: string
}

/**
 * Link to the solar form that preselects a solution.
 * The href works without JS (?solution=<slug>#contacto); with JS it keeps the
 * current UTM parameters, tells the form which solution was chosen and scrolls.
 */
export default function SolutionCta({ slug, number, className, children, target = 'contacto' }: SolutionCtaProps) {
  const href = slug ? `?solution=${slug}#${target}` : `#${target}`

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById(target)
    if (!el) return
    e.preventDefault()

    if (slug) {
      const params = new URLSearchParams(window.location.search)
      params.set('solution', slug)
      window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}#${target}`)
      window.dispatchEvent(new CustomEvent(SOLUTION_SELECT_EVENT, { detail: slug }))
      trackEvent('solution_cta_click', { industry: 'solar', solution: slug, solution_number: number || '' })
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 80,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  )
}
