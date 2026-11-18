'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import ScrollReveal from '../ScrollReveal'
import styles from './WarrantyCycleTimeline.module.css'
import { WarrantyStep, SectionImageData } from '../../lib/solar-data'
import SectionImage from './SectionImage'
import { trackEvent } from '../../lib/analytics'

interface WarrantyCycleTimelineProps {
  steps: WarrantyStep[]
  lang: 'es' | 'en'
  title?: string
  subheadline?: string
  callout?: {
    title: string
    description: string
  }
  image?: SectionImageData
  /** Render inside a solution block (no section shell, h4 headings) */
  embedded?: boolean
}

const AUTO_CYCLE_MS = 10000

export default function WarrantyCycleTimeline({
  steps,
  lang,
  title,
  subheadline,
  callout,
  image,
  embedded = false,
}: WarrantyCycleTimelineProps) {
  const Shell = embedded ? 'div' : 'section'
  const HeadingTag = embedded ? 'h4' : 'h2'
  const isEs = lang === 'es'

  // ── Desktop state ───────────────────────────────────────────────
  const [activeIdx, setActiveIdx] = useState(0)
  const [userPaused, setUserPaused] = useState(false)
  // autoKey increments each time the auto-cycle advances so the
  // progress bar's `key` prop changes and CSS re-triggers the animation.
  const [autoKey, setAutoKey] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // ── Mobile carousel state ────────────────────────────────────────
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeMobileIdx, setActiveMobileIdx] = useState(0)

  // ── Defaults ─────────────────────────────────────────────────────
  const defaultTitle = isEs
    ? 'Cuando un inversor falla, el reemplazo ya está en Colombia, y la unidad dañada vuelve reparada sin pagar tributos otra vez.'
    : 'When an inverter fails, the replacement is already in Colombia, and the defective unit returns repaired without repaying customs duties.'

  const defaultSubheadline = isEs
    ? 'El ciclo completo de una garantía, operado por un solo responsable y documentado unidad por unidad.'
    : 'The complete warranty lifecycle, operated by a single accountable partner and documented serial by serial.'

  const defaultCallout = {
    title: isEs
      ? 'El compromiso ante la aduana lo asume LET PRO'
      : 'Customs accountability is assumed by LET PRO',
    description: isEs
      ? 'LET PRO constituye y responde ante la DIAN por el compromiso de retorno de la parte o el equipo reparado o de reemplazo. El fabricante no necesita entidad local ni garantías aduaneras propias para operar su posventa en Colombia.'
      : 'LET PRO files and guarantees before DIAN the legal return commitment for the repaired or replacement unit. The manufacturer requires neither a Colombian subsidiary nor local customs collateral to fulfill warranties.',
  }

  const effectiveCallout = callout || defaultCallout

  // ── Auto-cycle ───────────────────────────────────────────────────
  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActiveIdx((prev) => {
        const next = (prev + 1) % steps.length
        return next
      })
      setAutoKey((k) => k + 1)
    }, AUTO_CYCLE_MS)
  }, [steps.length])

  useEffect(() => {
    if (!userPaused) {
      startInterval()
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [userPaused, startInterval])

  const handleStepClick = (idx: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setUserPaused(true)
    setActiveIdx(idx)
    trackEvent('solution_tab_click', {
      industry: 'solar',
      language: lang,
      warranty_step: idx + 1,
      step_title: steps[idx]?.title || '',
    })
  }

  // ── Mobile helpers ───────────────────────────────────────────────
  const handleScroll = () => {
    if (!carouselRef.current) return
    const el = carouselRef.current
    const cardWidth = el.offsetWidth * 0.82
    const newIdx = Math.round(el.scrollLeft / cardWidth)
    if (newIdx >= 0 && newIdx < steps.length) {
      setActiveMobileIdx(newIdx)
    }
  }

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return
    const cardWidth = carouselRef.current.offsetWidth * 0.82
    carouselRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' })
    setActiveMobileIdx(index)
    trackEvent('solution_tab_click', {
      industry: 'solar',
      language: lang,
      warranty_step: index + 1,
      step_title: steps[index]?.title || '',
    })
  }

  const handlePrev = () => scrollToIndex(Math.max(0, activeMobileIdx - 1))
  const handleNext = () => scrollToIndex(Math.min(steps.length - 1, activeMobileIdx + 1))

  const activeStep = steps[activeIdx]
  const isLastActive = activeIdx === steps.length - 1

  return (
    <Shell id="garantias" className={`${styles.section} ${embedded ? styles.embedded : ''}`} aria-label="Warranty cycle">
      <div className={styles.container}>
        {/* Header */}
        <ScrollReveal variant="up">
          <div className={styles.header}>
            <HeadingTag className={styles.title}>{title || defaultTitle}</HeadingTag>
            <p className={styles.subheadline}>{subheadline || defaultSubheadline}</p>
          </div>
        </ScrollReveal>

        {image && (
          <div className={styles.photoBand}>
            <SectionImage image={image} ratio="wide" />
          </div>
        )}

        {/* ── DESKTOP SPLIT-SCREEN ─────────────────────────────── */}
        <div className={styles.splitScreen}>
          {/* LEFT: step list */}
          <div className={styles.stepList} role="tablist" aria-label={isEs ? 'Pasos del ciclo' : 'Warranty cycle steps'}>
            {steps.map((step, idx) => {
              const isActive = idx === activeIdx
              const isFinal = idx === steps.length - 1
              const progressBarKey = `${idx}-${autoKey}`

              return (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="step-panel"
                  className={`${styles.stepRow} ${isActive ? styles.stepRowActive : ''} ${isFinal ? styles.stepRowFinal : ''}`}
                  onClick={() => handleStepClick(idx)}
                >
                  <span className={`${styles.stepNum} ${isFinal ? styles.stepNumFinal : ''}`}>
                    {isFinal ? '↺' : step.stepNumber}
                  </span>
                  <span className={styles.stepRowContent}>
                    <span className={styles.stepRowTitle}>{step.title}</span>
                    {/* Progress bar: only shown when this step is active */}
                    <span className={styles.progressTrack}>
                      {isActive && (
                        <span
                          key={progressBarKey}
                          className={`${styles.progressBar} ${userPaused ? styles.progressBarPaused : ''}`}
                        />
                      )}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* RIGHT: content panel */}
          <div
            id="step-panel"
            role="tabpanel"
            className={styles.contentPanel}
            aria-live="polite"
          >
            {/* key on the inner div triggers re-mount → re-plays fade-in animation */}
            <div key={`panel-${activeIdx}`} className={styles.panelInner}>
              {/* Title */}
              <h3 className={`${styles.panelTitle} ${isLastActive ? styles.panelTitleFinal : ''}`}>
                {activeStep.title}
              </h3>

              {/* Description */}
              <p className={styles.panelDescription}>{activeStep.description}</p>

              {/* Return-to-FSL note (step 06 only) */}
              {isLastActive && (
                <p className={styles.panelReturnNote}>
                  <span className={styles.returnIcon}>↺</span>
                  {isEs
                    ? ' El inventario local queda restablecido para la siguiente eventualidad.'
                    : ' Local inventory is replenished for the next eventuality.'}
                </p>
              )}

              {/* DIAN Callout */}
              <div className={styles.calloutBox}>
                <div className={styles.calloutTitleCol}>
                  <h4 className={styles.calloutTitle}>{effectiveCallout.title}</h4>
                </div>
                <div className={styles.calloutTextCol}>
                  <p className={styles.calloutDescription}>{effectiveCallout.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE SWIPEABLE CAROUSEL ────────────────────────── */}
        <div className={styles.timelineMobile}>
          {/* Mobile Top Controls */}
          <div className={styles.mobileCarouselHeader}>
            <div className={styles.mobileStepCounter}>
              <span className={styles.counterCurrent}>0{activeMobileIdx + 1}</span>
              <span className={styles.counterDivider}>/</span>
              <span className={styles.counterTotal}>0{steps.length}</span>
              {activeMobileIdx === steps.length - 1 && (
                <span className={styles.mobileClosedBadge}>
                  {isEs ? '↺ Ciclo cerrado' : '↺ Closed loop'}
                </span>
              )}
            </div>
            <div className={styles.mobileNavArrows}>
              <button
                type="button"
                className={styles.navBtn}
                onClick={handlePrev}
                disabled={activeMobileIdx === 0}
                aria-label={isEs ? 'Paso anterior' : 'Previous step'}
              >
                ‹
              </button>
              <button
                type="button"
                className={styles.navBtn}
                onClick={handleNext}
                disabled={activeMobileIdx === steps.length - 1}
                aria-label={isEs ? 'Siguiente paso' : 'Next step'}
              >
                ›
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            className={styles.carouselContainer}
            onScroll={handleScroll}
          >
            {steps.map((step, idx) => {
              const isLast = idx === steps.length - 1
              return (
                <div
                  key={idx}
                  className={`${styles.carouselSlide} ${isLast ? styles.carouselSlideFinal : ''}`}
                >
                  <div className={styles.slideTop}>
                    <div className={`${styles.slideNode} ${isLast ? styles.slideNodeFinal : ''}`}>
                      {isLast ? '↺' : step.stepNumber}
                    </div>
                    <span className={styles.slideStepTag}>
                      {isLast
                        ? isEs
                          ? 'Paso 06 · Ciclo cerrado'
                          : 'Step 06 · Closed loop'
                        : `${isEs ? 'Paso' : 'Step'} ${step.stepNumber}`}
                    </span>
                  </div>
                  <h3 className={styles.slideTitle}>{step.title}</h3>
                  <p className={styles.slideDescription}>{step.description}</p>

                  {isLast && (
                    <div className={styles.slideReturnNote}>
                      <span className={styles.returnIcon}>↺</span>
                      <span>
                        {isEs
                          ? 'El inventario local queda restablecido para la siguiente eventualidad.'
                          : 'Local inventory is replenished for the next eventuality.'}
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Dots */}
          <div className={styles.carouselDots} role="tablist">
            {steps.map((_, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={activeMobileIdx === idx}
                aria-label={`${isEs ? 'Paso' : 'Step'} 0${idx + 1}`}
                className={`${styles.dot} ${activeMobileIdx === idx ? styles.dotActive : ''}`}
                onClick={() => scrollToIndex(idx)}
              />
            ))}
          </div>

          {/* Mobile callout */}
          <ScrollReveal variant="up" delay={250}>
            <div className={styles.calloutBox}>
              <div className={styles.calloutTitleCol}>
                <h4 className={styles.calloutTitle}>{effectiveCallout.title}</h4>
              </div>
              <div className={styles.calloutTextCol}>
                <p className={styles.calloutDescription}>{effectiveCallout.description}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </Shell>
  )
}
