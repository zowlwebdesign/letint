'use client'

import { useState } from 'react'
import ScrollReveal from '../ScrollReveal'
import styles from './CapabilitiesGrid.module.css'
import { Capability } from '../../lib/solar-data'

interface CapabilitiesGridProps {
  capabilities: Capability[]
  lang: 'es' | 'en'
  title?: string
  subtitle?: string
}

export default function CapabilitiesGrid({
  capabilities,
  lang,
  title,
  subtitle,
}: CapabilitiesGridProps) {
  const isEs = lang === 'es'
  const [expandedCodes, setExpandedCodes] = useState<Set<string>>(new Set())

  const allCodes = capabilities.map((c) => c.code)
  const isAllExpanded = allCodes.length > 0 && allCodes.every((code) => expandedCodes.has(code))

  const toggleCode = (code: string) => {
    setExpandedCodes((prev) => {
      const next = new Set(prev)
      if (next.has(code)) {
        next.delete(code)
      } else {
        next.add(code)
      }
      return next
    })
  }

  const toggleAll = () => {
    if (isAllExpanded) {
      setExpandedCodes(new Set())
    } else {
      setExpandedCodes(new Set(allCodes))
    }
  }

  return (
    <section className={styles.section} aria-label="Operational capabilities">
      <div className={styles.container}>
        <ScrollReveal variant="up">
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <h2 className={styles.title}>
                {title || 'The building blocks behind every solution.'}
              </h2>
              <p className={styles.subtitle}>
                {subtitle || 'Click each component to expand its description.'}
              </p>
            </div>

            <div className={styles.headerRight}>
              <button
                type="button"
                className={styles.toggleAllBtn}
                onClick={toggleAll}
                aria-label={
                  isAllExpanded
                    ? 'Contraer todos los componentes'
                    : 'Desplegar todos los componentes'
                }
              >
                <span>
                  {isAllExpanded
                    ? isEs
                      ? 'Contraer todos'
                      : 'Collapse all'
                    : isEs
                    ? 'Desplegar todos'
                    : 'Expand all'}
                </span>
                <svg
                  className={`${styles.toggleAllIcon} ${
                    isAllExpanded ? styles.toggleAllIconOpen : ''
                  }`}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {capabilities.map((cap, idx) => {
            const isExpanded = expandedCodes.has(cap.code)

            return (
              <ScrollReveal
                key={cap.code || idx}
                variant="up"
                delay={30 * (idx + 1)}
                className={styles.scrollRevealItem}
              >
                <div
                  className={`${styles.card} ${isExpanded ? styles.cardExpanded : ''}`}
                >
                  <button
                    type="button"
                    className={styles.cardHeaderBtn}
                    onClick={() => toggleCode(cap.code)}
                    aria-expanded={isExpanded}
                    aria-controls={`capability-desc-${cap.code}`}
                  >
                    <div className={styles.cardHeaderLeft}>
                      <span className={styles.codeBadge}>{cap.code}</span>
                      <h3 className={styles.cardTitle}>{cap.title}</h3>
                    </div>

                    <div
                      className={`${styles.chevronWrapper} ${
                        isExpanded ? styles.chevronOpen : ''
                      }`}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {/* Expandable Drawer with exclusively the original description */}
                  <div
                    id={`capability-desc-${cap.code}`}
                    className={`${styles.drawer} ${isExpanded ? styles.drawerOpen : ''}`}
                    aria-hidden={!isExpanded}
                  >
                    <div className={styles.drawerInner}>
                      <p className={styles.cardDescription}>{cap.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
