import Image from 'next/image'
import styles from './HeroSection.module.css'
import { urlForImage } from '../sanity/lib/image'

interface HeroProps {
  data?: {
    headline?: string
    subheadline?: string
    primaryCTA?: { label: string; href: string }
    secondaryCTA?: { label: string; href: string }
    backgroundGraphic?: any
  }
}

export default function HeroSection({ data }: HeroProps) {
  if (!data) return null;

  const isOldPlaceholder = data.backgroundGraphic?.asset?._ref?.includes('fb02b17177014277fdf329e857b424cf21c5847e')
  const bgImageUrl = (data.backgroundGraphic && !isOldPlaceholder)
    ? urlForImage(data.backgroundGraphic)?.url()
    : '/hero-bg.webp'

  const isStatic = bgImageUrl.startsWith('/hero-bg')

  return (
    <section className={styles.hero} id="top" aria-label="Hero Introduction">
      <div className={styles.bgWrapper}>
        {isStatic ? (
          <picture>
            <source media="(max-width: 768px)" srcSet="/hero-bg-mobile.webp" type="image/webp" />
            <source srcSet="/hero-bg.webp" type="image/webp" />
            <img
              src="/hero-bg.webp"
              alt="LET INT US - Specialized Supply Chain Control Tower Operations in Colombia"
              // @ts-ignore
              fetchpriority="high"
              decoding="async"
              className={styles.bgImg}
              style={{ position: 'absolute', height: '100%', width: '100%', inset: 0, objectFit: 'cover' }}
            />
          </picture>
        ) : (
          <Image
            src={bgImageUrl}
            alt="LET INT US - Specialized Supply Chain Control Tower Operations in Colombia"
            fill
            priority
            sizes="100vw"
            quality={75}
            className={styles.bgImg}
          />
        )}
      </div>
      <div className={styles.overlay} />
      <div className={styles.glowSpot} />

      <div className={styles.inner}>
        <div className={styles.content}>
          {data.headline && (
            <h1 className={styles.title}>
              {data.headline}
            </h1>
          )}

          {data.subheadline && (
            <p className={styles.subtitle}>
              {data.subheadline}
            </p>
          )}

          <div className={styles.actions}>
            {data.primaryCTA?.label && (
              <a 
                href={data.primaryCTA.href || '#contact'} 
                className={styles.btnPrimary}
                aria-label={`${data.primaryCTA.label} — Consult with LET INT US`}
              >
                {data.primaryCTA.label}
              </a>
            )}
            {data.secondaryCTA?.label && (
              <a 
                href={data.secondaryCTA.href || '#how-it-works'} 
                className={styles.btnSecondary}
                aria-label={`${data.secondaryCTA.label} — See our operational process`}
              >
                {data.secondaryCTA.label}
              </a>
            )}
          </div>

          <div className={styles.badges}>
            <span className={styles.badge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/><line x1="2" y1="12" x2="22" y2="12"/>
              </svg>
              U.S. entity
            </span>
            <span className={styles.separator}></span>
            <span className={styles.badge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              Florida, USA
            </span>
            <span className={styles.separator}></span>
            <span className={styles.badge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              Colombia operations
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
