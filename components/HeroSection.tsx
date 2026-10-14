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

  const bgImageUrl = data.backgroundGraphic
    ? urlForImage(data.backgroundGraphic)?.url()
    : 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop'

  return (
    <section className={styles.hero} id="top" aria-label="Hero Introduction">
      <div className={styles.bgWrapper}>
        <Image
          src={bgImageUrl || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop'}
          alt="LET INT US - Specialized Supply Chain Control Tower Operations in Colombia"
          fill
          priority
          sizes="100vw"
          quality={80}
          className={styles.bgImg}
        />
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
