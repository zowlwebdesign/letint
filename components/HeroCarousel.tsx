'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './HeroSection.module.css'
import carousel from './HeroCarousel.module.css'
import { trackEvent } from '../lib/analytics'

export interface HeroSlideCta {
  label: string
  href: string
  ariaLabel?: string
}

export interface HeroSlide {
  id: string
  eyebrow?: string
  headline: string
  subheadline?: string
  primaryCta?: HeroSlideCta
  secondaryCta?: HeroSlideCta
  image: {
    src: string
    alt: string
    /** Optional mobile source for a static <picture> (slide 1 only) */
    mobileSrc?: string
  }
  showBadges?: boolean
}

interface HeroCarouselProps {
  slides: HeroSlide[]
  intervalMs?: number
}

const SWIPE_THRESHOLD = 50

export default function HeroCarousel({ slides, intervalMs = 7000 }: HeroCarouselProps) {
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [pageHidden, setPageHidden] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const count = slides.length

  const goTo = useCallback((idx: number) => setActive(((idx % count) + count) % count), [count])
  const next = useCallback(() => goTo(active + 1), [active, goTo])
  const prev = useCallback(() => goTo(active - 1), [active, goTo])

  // Respect "reduce motion": no auto-rotation and no transitions
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Do not rotate while the tab is in the background
  useEffect(() => {
    const onVisibility = () => setPageHidden(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  const paused = hovered || focused || reducedMotion || pageHidden || count < 2

  useEffect(() => {
    if (paused) return
    const timer = setTimeout(() => setActive((i) => (i + 1) % count), intervalMs)
    return () => clearTimeout(timer)
  }, [active, paused, count, intervalMs])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    touchStartX.current = null
    touchStartY.current = null
    // Only horizontal swipes change the slide; vertical ones keep scrolling the page
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return
    if (dx < 0) next()
    else prev()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
  }

  return (
    <section
      className={`${styles.hero} ${carousel.root} ${reducedMotion ? carousel.noMotion : ''}`}
      id="top"
      aria-roledescription="carousel"
      aria-label="Highlights"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false)
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={onKeyDown}
    >
      {slides.map((slide, idx) => {
        const isActive = idx === active
        const isFirst = idx === 0
        const Heading = isFirst ? 'h1' : 'h2'
        return (
          <div
            key={slide.id}
            className={`${carousel.slide} ${isActive ? carousel.slideActive : ''}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${idx + 1} of ${count}`}
            aria-hidden={!isActive}
            inert={!isActive}
          >
            <div className={styles.bgWrapper}>
              {slide.image.mobileSrc ? (
                <picture>
                  <source media="(max-width: 768px)" srcSet={slide.image.mobileSrc} type="image/webp" />
                  <source srcSet={slide.image.src} type="image/webp" />
                  <img
                    src={slide.image.src}
                    alt={slide.image.alt}
                    fetchPriority={isFirst ? 'high' : 'low'}
                    loading={isFirst ? 'eager' : 'lazy'}
                    decoding="async"
                    className={`${styles.bgImg} ${carousel.bgImg}`}
                  />
                </picture>
              ) : (
                <Image
                  src={slide.image.src}
                  alt={slide.image.alt}
                  fill
                  sizes="100vw"
                  quality={75}
                  preload={isFirst}
                  loading={isFirst ? undefined : 'lazy'}
                  className={styles.bgImg}
                />
              )}
            </div>
            <div className={`${styles.overlay} ${slide.id === 'solar' ? carousel.overlayStrong : ''}`} />

            <div className={styles.inner}>
              <div className={styles.content}>
                <Heading className={styles.title}>{slide.headline}</Heading>
                {slide.subheadline && <p className={styles.subtitle}>{slide.subheadline}</p>}

                <div className={styles.actions}>
                  {slide.primaryCta?.label && (
                    <a
                      href={slide.primaryCta.href}
                      className={styles.btnPrimary}
                      aria-label={slide.primaryCta.ariaLabel}
                      onClick={() =>
                        trackEvent('hero_slide_cta', { slide: slide.id, cta: 'primary', href: slide.primaryCta?.href || '' })
                      }
                    >
                      {slide.primaryCta.label}
                    </a>
                  )}
                  {slide.secondaryCta?.label && (
                    <a
                      href={slide.secondaryCta.href}
                      className={styles.btnSecondary}
                      aria-label={slide.secondaryCta.ariaLabel}
                    >
                      {slide.secondaryCta.label}
                    </a>
                  )}
                </div>

                {slide.showBadges && (
                  <div className={styles.badges}>
                    <span className={styles.badge}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /><line x1="2" y1="12" x2="22" y2="12" />
                      </svg>
                      U.S. entity
                    </span>
                    <span className={styles.separator}></span>
                    <span className={styles.badge}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                      </svg>
                      Florida, USA
                    </span>
                    <span className={styles.separator}></span>
                    <span className={styles.badge}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                      </svg>
                      Colombia operations
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}

      {count > 1 && (
        <div className={carousel.controls}>
          <button type="button" className={carousel.arrow} onClick={prev} aria-label="Previous slide">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div className={carousel.dots}>
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                className={`${carousel.dot} ${idx === active ? carousel.dotActive : ''}`}
                onClick={() => goTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={idx === active ? 'true' : undefined}
              >
                {idx === active && !paused && (
                  <span
                    key={`progress-${active}`}
                    className={carousel.dotProgress}
                    style={{ animationDuration: `${intervalMs}ms` }}
                  />
                )}
              </button>
            ))}
          </div>
          <button type="button" className={carousel.arrow} onClick={next} aria-label="Next slide">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}
