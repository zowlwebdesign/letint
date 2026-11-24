import Image from 'next/image'
import ScrollReveal from '../ScrollReveal'
import styles from './IndustryHero.module.css'
import { HeroData } from '../../lib/solar-data'

interface IndustryHeroProps {
  data: HeroData
  lang?: 'es' | 'en'
}

export default function IndustryHero({ data, lang = 'en' }: IndustryHeroProps) {
  const bgImageSrc = data.backgroundImage || '/images/solar/hero-bess.webp'

  const manufacturerItems = (data.manufacturerKeeps || []).map((item) => item.replace(/\.$/, ''))
  const letProItems = (data.letProAssumes || []).map((item) => item.replace(/\.$/, ''))

  // Split headline at period if present to apply highlight to second sentence
  const headlineParts = (data.headline || '').split(/(?<=\.)\s+/)
  const firstSentence = headlineParts[0] || data.headline || ''
  const remainingSentences = headlineParts.slice(1).join(' ')

  return (
    <header className={styles.heroWrapper} aria-label="Industry hero">
      {/* Background Photographic Image & Dark Gradient Overlay */}
      <div className={styles.bgContainer} aria-hidden="true">
        <Image
          src={bgImageSrc}
          alt="Aerial view of an installed battery energy storage system (BESS) next to a utility-scale solar plant"
          fill
          priority
          sizes="100vw"
          className={styles.bgImage}
        />
        <div className={styles.bgOverlay} />
      </div>

      {/* Main Hero Content Area - Fills Screen */}
      <div className={styles.mainContainer}>
        <div className={styles.heroGrid}>
          {/* Left Column: Subheadline at Top-Left, Main Display Text at Bottom-Left */}
          <div className={styles.heroLeft}>
            {/* Bottom-Left: Main Text with Clean Geometric Sans */}
            <div className={styles.bottomHeadlineWrapper}>
              <ScrollReveal variant="up" delay={140}>
                <h1 className={styles.headline}>
                  {remainingSentences ? (
                    <>
                      {firstSentence}
                      <span className={styles.headlineHighlight}> {remainingSentences}</span>
                    </>
                  ) : (
                    data.headline
                  )}
                </h1>
              </ScrollReveal>

              <ScrollReveal variant="up" delay={160}>
                <div className={styles.scope}>
                  <span className={styles.scopeLabel}>
                    {lang === 'es' ? 'RMA y garantías en Colombia para' : 'RMA & warranty in Colombia for'}
                  </span>
                  <ul className={styles.chips}>
                    {(data.tags || []).map((tag) => (
                      <li key={tag} className={styles.chip}>
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="up" delay={180}>
                <div className={styles.actions}>
                  <a
                    href={data.primaryCta?.href || '#contacto'}
                    className={styles.primaryCta}
                  >
                    <span>{data.primaryCta?.label || 'Request an operation review'}</span>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="4" y1="10" x2="16" y2="10" />
                      <polyline points="11 5 16 10 11 15" />
                    </svg>
                  </a>
                  <a href={data.secondaryCta?.href || '#solutions'} className={styles.secondaryLink}>
                    <span>{data.secondaryCta?.label || 'See the four solutions'}</span>
                    <span className={styles.secondaryArrow}>↓</span>
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Right Column: Executive Control Panel (Stripe / Vercel Aesthetic) */}
          <div className={styles.heroRight}>
            <ScrollReveal variant="up" delay={160}>
              <aside className={styles.rail} aria-label="Division of responsibilities">
                <div className={`${styles.railGroup} ${styles.railKeep}`}>
                  <span className={styles.railNode} aria-hidden="true" />
                  <div className={styles.railHeading}>
                    {data.manufacturerKeepsTitle || 'The Manufacturer Keeps'}
                  </div>
                  <ol className={styles.railList}>
                    {manufacturerItems.map((item, idx) => (
                      <li key={idx} className={styles.railItem}>
                        <span className={styles.railIndex}>{String(idx + 1).padStart(2, '0')}</span>
                        <span className={styles.railText}>{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className={`${styles.railGroup} ${styles.railAssume}`}>
                  <span className={styles.railNode} aria-hidden="true" />
                  <div className={styles.railHeading}>
                    {data.letProAssumesTitle || 'LET PRO Assumes'}
                  </div>
                  <ol className={styles.railList}>
                    {letProItems.map((item, idx) => (
                      <li key={idx} className={styles.railItem}>
                        <span className={styles.railIndex}>{String(idx + 1).padStart(2, '0')}</span>
                        <span className={styles.railText}>{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </aside>
            </ScrollReveal>
          </div>
        </div>
      </div>

    </header>
  )
}
