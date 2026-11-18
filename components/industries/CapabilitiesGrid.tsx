'use client'

import { useState } from 'react'
import ScrollReveal from '../ScrollReveal'
import styles from './CapabilitiesGrid.module.css'
import { Capability, SectionImageData } from '../../lib/solar-data'
import SectionImage from './SectionImage'

interface CapabilitiesGridProps {
  capabilities: Capability[]
  lang: 'es' | 'en'
  title?: string
  subtitle?: string
  image?: SectionImageData
}

export default function CapabilitiesGrid({
  capabilities,
  lang,
  title,
  subtitle,
  image,
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
    <section id="building-blocks" className={styles.section} aria-label="Building blocks shared by every solution">
      <div className={styles.container}>
        <div className={styles.split}>
          {/* Left: photo */}
          {image && (
            <div className={styles.photoCol}>
              <SectionImage image={image} ratio="tall" sizes="(max-width: 900px) 100vw, 560px" />
            </div>
          )}

          {/* Right: heading + vertical accordion */}
          <div className={styles.listCol}>
            <ScrollReveal variant="up">
              <div className={styles.header}>
                <div className={styles.headerLeft}>
                  <h2 className={styles.title}>
                    {title || (isEs ? 'Los componentes detrás de cada solución.' : 'The building blocks behind every solution.')}
                  </h2>
                  <p className={styles.subtitle}>
                    {subtitle ||
                      (isEs
                        ? 'No son una quinta oferta: las cuatro soluciones se arman con estos componentes. Haga clic en cada uno para ver su descripción.'
                        : 'Not a fifth offer: the four solutions above are assembled from these components. Click each one to expand its description.')}
                  </p>
                </div>

                <button
                  type="button"
                  className={styles.toggleAllBtn}
                  onClick={toggleAll}
                  aria-label={
                    isAllExpanded
                      ? isEs ? 'Contraer todos los componentes' : 'Collapse all components'
                      : isEs ? 'Desplegar todos los componentes' : 'Expand all components'
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
            </ScrollReveal>

            <div className={styles.list}>
              {capabilities.map((cap, idx) => {
                const isExpanded = expandedCodes.has(cap.code)

                return (
                  <ScrollReveal key={cap.code || idx} variant="up" delay={30 * (idx + 1)}>
                    <div className={`${styles.row} ${isExpanded ? styles.rowExpanded : ''}`}>
                      <button
                        type="button"
                        className={styles.rowBtn}
                        onClick={() => toggleCode(cap.code)}
                        aria-expanded={isExpanded}
                        aria-controls={`capability-desc-${cap.code}`}
                      >
                        <span className={styles.rowLeft}>
                          <span className={styles.codeBadge}>{cap.code}</span>
                          <span className={styles.rowTitle}>{cap.title}</span>
                        </span>
                        <svg
                          className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ''}`}
                          width="18"
                          height="18"
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

                      <div
                        id={`capability-desc-${cap.code}`}
                        className={`${styles.drawer} ${isExpanded ? styles.drawerOpen : ''}`}
                        aria-hidden={!isExpanded}
                      >
                        <div className={styles.drawerInner}>
                          <p className={styles.rowDescription}>{cap.description}</p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
