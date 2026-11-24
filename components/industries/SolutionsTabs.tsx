'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import styles from './SolutionsSection.module.css'
import { trackEvent } from '../../lib/analytics'

export interface SolutionTab {
  slug: string
  number: string
  title: string
  badge: string
  themeClass: string
  panel: ReactNode
}

interface SolutionsTabsProps {
  tabs: SolutionTab[]
  labels: { prev: string; next: string; of: string; list: string }
}

const HASH_PREFIX = '#solution-'
const ALT_HASH_PREFIX = '#solucion-'

/**
 * Shows one solution at a time. Every panel stays in the HTML (anchors, SEO);
 * inactive ones are hidden. Links to #solucion-<slug> open the matching tab.
 */
export default function SolutionsTabs({ tabs, labels }: SolutionsTabsProps) {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const rootRef = useRef<HTMLDivElement>(null)

  const select = useCallback(
    (idx: number, opts: { focus?: boolean; scroll?: boolean } = {}) => {
      const next = (idx + tabs.length) % tabs.length
      setActive(next)
      trackEvent('solution_tab_click', { industry: 'solar', solution: tabs[next]?.slug || '' })
      if (opts.focus) tabRefs.current[next]?.focus()
      if (opts.scroll && rootRef.current) {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const top = rootRef.current.getBoundingClientRect().top + window.scrollY - 90
        window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
      }
    },
    [tabs]
  )

  // Open the tab named in the URL hash (menu links, shared links)
  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash
      const isMatch = hash.startsWith(HASH_PREFIX) || hash.startsWith(ALT_HASH_PREFIX)
      if (!isMatch) return
      const cleanSlug = hash.replace(HASH_PREFIX, '').replace(ALT_HASH_PREFIX, '')
      const idx = tabs.findIndex((t) => t.slug === cleanSlug)
      if (idx < 0) return
      setActive(idx)
      requestAnimationFrame(() => {
        if (!rootRef.current) return
        window.scrollTo({ top: rootRef.current.getBoundingClientRect().top + window.scrollY - 90 })
      })
    }
    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => window.removeEventListener('hashchange', openFromHash)
  }, [tabs])

  // Keep the active tab visible when the strip scrolls sideways (mobile)
  useEffect(() => {
    const btn = tabRefs.current[active]
    const strip = btn?.parentElement
    if (!btn || !strip || strip.scrollWidth <= strip.clientWidth) return
    const left = btn.offsetLeft - (strip.clientWidth - btn.offsetWidth) / 2
    strip.scrollTo({ left, behavior: 'smooth' })
  }, [active])

  const onKeyDown =(e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); select(idx + 1, { focus: true }) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); select(idx - 1, { focus: true }) }
    if (e.key === 'Home') { e.preventDefault(); select(0, { focus: true }) }
    if (e.key === 'End') { e.preventDefault(); select(tabs.length - 1, { focus: true }) }
  }

  return (
    <div ref={rootRef} className={styles.tabsRoot}>
      <div className={styles.indexList} role="tablist" aria-label={labels.list}>
        {tabs.map((tab, idx) => {
          const isActive = idx === active
          return (
            <button
              key={tab.slug}
              ref={(el) => { tabRefs.current[idx] = el }}
              type="button"
              role="tab"
              id={`tab-${tab.slug}`}
              aria-selected={isActive}
              aria-controls={`solution-${tab.slug}`}
              tabIndex={isActive ? 0 : -1}
              className={`${styles.indexCard} ${tab.themeClass} ${isActive ? styles.indexCardActive : ''}`}
              onClick={() => select(idx)}
              onKeyDown={(e) => onKeyDown(e, idx)}
            >
              <span className={styles.indexNumber}>{tab.number}</span>
              <span className={styles.indexTitle}>{tab.title}</span>
              <span className={styles.indexBadge}>{tab.badge}</span>
            </button>
          )
        })}
      </div>

      {tabs.map((tab, idx) => (
        <div
          key={tab.slug}
          id={`solution-${tab.slug}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.slug}`}
          hidden={idx !== active}
          className={styles.panel}
        >
          <span id={`solucion-${tab.slug}`} style={{ position: 'absolute' }} />
          {tab.panel}
        </div>
      ))}

      <div className={styles.pager}>
        <button type="button" className={styles.pagerBtn} onClick={() => select(active - 1, { scroll: true })} aria-label={labels.prev}>
          <span aria-hidden="true">&larr;</span>
          <span className={styles.pagerText}>{tabs[(active - 1 + tabs.length) % tabs.length]?.title}</span>
        </button>
        <span className={styles.pagerCount}>
          {tabs[active]?.number} {labels.of} {String(tabs.length).padStart(2, '0')}
        </span>
        <button type="button" className={`${styles.pagerBtn} ${styles.pagerNext}`} onClick={() => select(active + 1, { scroll: true })} aria-label={labels.next}>
          <span className={styles.pagerText}>{tabs[(active + 1) % tabs.length]?.title}</span>
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </div>
  )
}
