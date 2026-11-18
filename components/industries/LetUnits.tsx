'use client'

import { useEffect, useRef } from 'react'
import ScrollReveal from '../ScrollReveal'
import styles from './LetUnits.module.css'
import { LetUnit } from '../../lib/solar-data'

interface LetUnitsProps {
  units: LetUnit[]
}

const MOBILE_QUERY = '(max-width: 900px)'

/**
 * The four LET units behind the solar program.
 * Desktop: four open columns. Mobile: collapsed rows that open on tap.
 */
export default function LetUnits({ units }: LetUnitsProps) {
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY)
    const sync = () => {
      listRef.current?.querySelectorAll('details').forEach((d) => {
        d.open = !mq.matches
      })
    }
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return (
    <section id="let" className={styles.section} aria-labelledby="let-title">
      <div className={styles.container}>
        <ScrollReveal variant="up">
          <div className={styles.header}>
            <h2 id="let-title" className={styles.title}>Four LET units, one accountable operation.</h2>
          </div>
        </ScrollReveal>
        <ul ref={listRef} className={styles.grid}>
          {units.map((unit, idx) => (
            <li key={unit.name}>
              <ScrollReveal variant="up" delay={idx * 80}>
                <details className={styles.card} open>
                  <summary
                    className={styles.summary}
                    onClick={(e) => {
                      // Desktop columns stay open
                      if (!window.matchMedia(MOBILE_QUERY).matches) e.preventDefault()
                    }}
                  >
                    <span className={styles.summaryText}>
                      <h3 className={styles.name}>{unit.name}</h3>
                      <span className={styles.country}>{unit.country}</span>
                    </span>
                    <svg className={styles.chevron} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </summary>
                  <p className={styles.role}>{unit.role}</p>
                </details>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
