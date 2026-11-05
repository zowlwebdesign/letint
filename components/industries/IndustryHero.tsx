import Image from 'next/image'
import ScrollReveal from '../ScrollReveal'
import styles from './IndustryHero.module.css'
import { HeroData } from '../../lib/solar-data'

interface IndustryHeroProps {
  data: HeroData
  lang?: 'es' | 'en'
}

export default function IndustryHero({ data }: IndustryHeroProps) {
  const bgImageSrc = data.backgroundImage || '/images/solar-hero-bg.jpg'

  const manufacturerItems = (data.manufacturerKeeps || []).map((item) => item.replace(/\.$/, ''))
  const letProItems = (data.letProAssumes || []).map((item) => item.replace(/\.$/, ''))

  // Split headline at period if present to apply highlight to second sentence
  const headlineParts = (data.headline || '').split(/(?<=\.)\s+/)
  const firstSentence = headlineParts[0] || data.headline || ''
  const remainingSentences = headlineParts.slice(1).join(' ')

  return (
    <header className={styles.heroWrapper} aria-label="Hero de Industria">
      {/* Background Photographic Image & Dark Gradient Overlay */}
      <div className={styles.bgContainer} aria-hidden="true">
        <Image
          src={bgImageSrc}
          alt="Operaciones de logística portuaria y aduanera para proyectos de energía solar y BESS en Colombia — LET Pro"
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
            {/* Top-Left: Secondary Contextual Text */}
            <ScrollReveal variant="fade" delay={80}>
              <div className={styles.topSubheadlineWrapper}>
                <p className={styles.subheadline}>{data.subheadline}</p>
              </div>
            </ScrollReveal>

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

              <ScrollReveal variant="up" delay={180}>
                <a href={data.secondaryCta?.href || '#soluciones'} className={styles.secondaryLink}>
                  <span>{data.secondaryCta?.label || 'Ver las cinco soluciones'}</span>
                  <span className={styles.secondaryArrow}>↓</span>
                </a>
              </ScrollReveal>
            </div>
          </div>

          {/* Right Column: Executive Control Panel (Stripe / Vercel Aesthetic) */}
          <div className={styles.heroRight}>
            <ScrollReveal variant="up" delay={160}>
              <aside
                className={styles.comparisonCard}
                aria-label="División de responsabilidades operativas"
              >
                {/* Panel Superior: El Fabricante Conserva */}
                <div className={styles.panelTop}>
                  <div className={styles.panelHeadingTop}>
                    {data.manufacturerKeepsTitle || 'El Fabricante Conserva'}
                  </div>
                  <ul className={styles.panelList}>
                    {manufacturerItems.map((item, idx) => (
                      <li key={idx} className={styles.panelItem}>
                        <span className={styles.dotEmerald} aria-hidden="true" />
                        <span className={styles.panelText}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Panel Inferior: LET Pro Asume */}
                <div className={styles.panelBottom}>
                  <div className={styles.panelHeadingBottom}>
                    {data.letProAssumesTitle || 'LET Pro Asume'}
                  </div>
                  <ul className={styles.panelList}>
                    {letProItems.map((item, idx) => (
                      <li key={idx} className={styles.panelItem}>
                        <span className={styles.dotAmber} aria-hidden="true" />
                        <span className={styles.panelText}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Botón Ghost de Borde Luminoso */}
                <div className={styles.buttonWrapper}>
                  <a
                    href={data.primaryCta?.href || '#contacto'}
                    className={styles.ghostCta}
                    aria-label={data.primaryCta?.label || 'Solicitar una revisión de su operación'}
                  >
                    <span className={styles.ghostLabel}>
                      {data.primaryCta?.label || 'Solicitar una revisión de su operación'}
                    </span>
                    <svg
                      className={styles.ghostArrow}
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="4" y1="10" x2="16" y2="10" />
                      <polyline points="11 5 16 10 11 15" />
                    </svg>
                  </a>
                </div>
              </aside>
            </ScrollReveal>
          </div>
        </div>
      </div>

    </header>
  )
}
