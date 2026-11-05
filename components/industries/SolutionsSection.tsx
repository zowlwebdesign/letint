'use client'

import { useState, useRef } from 'react'
import ScrollReveal from '../ScrollReveal'
import styles from './SolutionsSection.module.css'
import { SolutionData } from '../../lib/solar-data'
import { trackEvent } from '../../lib/analytics'

interface CustomCardProps {
  title: string
  description: string
  badge: string
  ctaText: string
  ctaHref: string
}

interface SolutionsSectionProps {
  data: SolutionData[]
  lang: 'es' | 'en'
  variant?: 'grid' | 'tabs'
  title?: string
  intro?: string
  customCard?: CustomCardProps
}

export default function SolutionsSection({
  data,
  lang,
  title,
  intro,
  customCard,
}: SolutionsSectionProps) {
  const isEs = lang === 'es'
  const [activeIdx, setActiveIdx] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const handleSelectSolution = (index: number) => {
    setActiveIdx(index)
    trackEvent('solution_tab_click', {
      industry: 'solar',
      language: lang,
      solution_number: data[index]?.number || `0${index + 1}`,
      solution_title: data[index]?.title || '',
    })
  }

  const handlePrev = () => {
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : data.length - 1))
  }

  const handleNext = () => {
    setActiveIdx((prev) => (prev < data.length - 1 ? prev + 1 : 0))
  }

  // Smooth scroll to contact anchor
  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      const targetId = href.replace('#', '')
      const el = document.getElementById(targetId)
      if (el) {
        e.preventDefault()
        const offset = 80
        const yPos = el.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top: yPos, behavior: 'smooth' })
      }
    }
  }

  const defaultIntro = isEs
    ? 'Pueden contratarse por separado o encadenarse a medida que crece la operación: de las muestras al certificado, del certificado a la venta, de la venta a la posventa.'
    : 'They can be deployed independently or linked as operations expand: from samples to certification, from certification to sales, and from sales to warranty fulfillment.'

  // Strip duplicate opening sentence if present from Sanity or older cache
  const cleanIntro = intro
    ? intro
        .replace(/^Cada una responde a una situación concreta del fabricante, no a un servicio aislado\.\s*/i, '')
        .replace(/^Each addresses a specific manufacturer challenge, not an isolated service\.\s*/i, '')
    : defaultIntro

  const defaultTitle = isEs
    ? 'Cada una responde a una situación concreta del fabricante, no a un servicio aislado.'
    : 'Each addresses a specific manufacturer challenge, not an isolated service.'

  const defaultCustomCard: CustomCardProps = {
    title: isEs
      ? '¿Su caso no encaja exactamente en una de estas cinco?'
      : 'Does your case not fit neatly into one of these five?',
    description: isEs
      ? 'Las soluciones se diseñan sobre los mismos componentes. Una revisión inicial define la combinación correcta para su operación.'
      : 'Our solutions are engineered from the same operational building blocks. An initial review determines the exact combination for your model.',
    badge: isEs ? 'Estructuración caso a caso' : 'Tailored Case Design',
    ctaText: isEs ? 'Describir mi caso' : 'Describe my case',
    ctaHref: '#contacto',
  }

  const effectiveCustomCard = customCard || defaultCustomCard

  return (
    <section id="soluciones" className={styles.section} aria-label="Cinco Soluciones">
      <div className={styles.container}>
        {/* Header with Eyebrow and Deduplicated Title / Subtitle */}
        <ScrollReveal variant="up">
          <div className={styles.header}>
            <div className={styles.headerText}>
              <div className={styles.eyebrow}>
                {isEs ? 'CINCO SOLUCIONES' : 'FIVE SOLUTIONS'}
              </div>
              <h2 className={styles.title}>{title || defaultTitle}</h2>
              <p className={styles.intro}>{cleanIntro}</p>
            </div>

            {/* Navigation Controls (Desktop & Mobile accessible) */}
            <div className={styles.navControls}>
              <span className={styles.counterText}>
                0{activeIdx + 1} <span className={styles.counterDivider}>/</span> 0{data.length}
              </span>
              <button
                type="button"
                className={styles.arrowBtn}
                onClick={handlePrev}
                aria-label={isEs ? 'Solución anterior' : 'Previous solution'}
              >
                ‹
              </button>
              <button
                type="button"
                className={styles.arrowBtn}
                onClick={handleNext}
                aria-label={isEs ? 'Siguiente solución' : 'Next solution'}
              >
                ›
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* ─── ACCORDION: Desktop Horizontal Expanding Track / Mobile Vertical Stacked Bars ─── */}
        <div className={styles.accordionContainer}>
          <div ref={trackRef} className={styles.accordionTrack} role="tablist">
            {data.map((item, idx) => {
              const isActive = activeIdx === idx
              const themeClass = styles[`theme${idx}`]

              return (
                <div
                  key={idx}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`${item.number} ${item.title}`}
                  tabIndex={0}
                  className={`${styles.accordionPanel} ${themeClass} ${
                    isActive ? styles.panelActive : styles.panelCollapsed
                  }`}
                  onClick={() => handleSelectSolution(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleSelectSolution(idx)
                    }
                  }}
                >
                  {/* Inactive Collapsed Ribbon Content (Rotated 90° on Desktop, Horizontal Bar on Mobile) */}
                  {!isActive && (
                    <div className={styles.ribbonContent} aria-hidden="true">
                      <div className={styles.ribbonLeftGroup}>
                        <span className={styles.ribbonNumber}>{item.number}</span>
                        {item.number === '01' && (
                          <span className={styles.ribbonInsigniaBadge}>
                            · {isEs ? 'SOLUCIÓN INSIGNIA' : 'FLAGSHIP'}
                          </span>
                        )}
                        <span className={styles.ribbonTitle}>{item.title}</span>
                      </div>
                      <span className={styles.ribbonDot} />
                      <span className={styles.mobileChevron} aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </div>
                  )}

                  {/* Active Expanded Card Content */}
                  {isActive && (
                    <div className={styles.expandedContent} role="tabpanel">
                      <div className={styles.expandedInner}>
                        {/* Top Number + Insignia Badge */}
                        <div className={styles.expandedTopRow}>
                          <div className={styles.numberBadgeGroup}>
                            <span className={styles.expandedNumber}>{item.number}</span>
                            {item.number === '01' && (
                              <span className={styles.insigniaBadge}>
                                · {isEs ? 'SOLUCIÓN INSIGNIA' : 'FLAGSHIP SOLUTION'}
                              </span>
                            )}
                          </div>
                          <span className={styles.mobileChevronUp} aria-hidden="true">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="18 15 12 9 6 15" />
                            </svg>
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className={styles.expandedTitle}>{item.title}</h3>

                        {/* Details Paragraphs */}
                        <div className={styles.expandedBody}>
                          <div className={styles.detailBlock}>
                            <span className={styles.detailLabel}>
                              {isEs ? 'Cuándo aplica' : 'When it applies'}
                            </span>
                            <p className={styles.detailText}>{item.whenApplies}</p>
                          </div>

                          <div className={styles.detailBlock}>
                            <span className={styles.detailLabel}>
                              {isEs ? 'En energía solar' : 'In solar energy'}
                            </span>
                            <p className={styles.detailText}>{item.industryApplication}</p>
                          </div>
                        </div>

                        {/* Minimalist Capability Tags */}
                        <div className={styles.tagsRow}>
                          {item.capabilityTags.map((tag, tIdx) => (
                            <span key={tIdx} className={styles.capTag}>
                              {tag}
                            </span>
                          ))}
                        </div>

                        {item.footnote && (
                          <span className={styles.footnote}>{item.footnote}</span>
                        )}

                        {/* CTA Link */}
                        <div className={styles.ctaRow}>
                          <a
                            href="#contacto"
                            className={styles.solutionCta}
                            onClick={(e) => handleCtaClick(e, '#contacto')}
                          >
                            <span>
                              {isEs
                                ? 'Consultar viabilidad de esta solución'
                                : 'Check feasibility for this solution'}
                            </span>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* ─── CUSTOM CARD: Caso a medida (Banner Companion) ─── */}
        <ScrollReveal variant="up" delay={120}>
          <div className={styles.customCardBanner}>
            <div className={styles.customCardLeft}>
              <span className={styles.customBadge}>{effectiveCustomCard.badge}</span>
              <h3 className={styles.customTitle}>{effectiveCustomCard.title}</h3>
              <p className={styles.customDescription}>{effectiveCustomCard.description}</p>
            </div>
            <div className={styles.customCardRight}>
              <a
                href={effectiveCustomCard.ctaHref}
                className={styles.customCtaBtn}
                onClick={(e) => handleCtaClick(e, effectiveCustomCard.ctaHref)}
              >
                <span>{effectiveCustomCard.ctaText}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
