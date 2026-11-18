import type { ReactNode } from 'react'
import ScrollReveal from '../ScrollReveal'
import styles from './SolutionsSection.module.css'
import { SolutionData } from '../../lib/solar-data'
import SolutionCta from './SolutionCta'

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
  /** Kept for backwards compatibility with older callers; the layout is the same. */
  variant?: 'grid' | 'tabs'
  title?: string
  intro?: string
  customCard?: CustomCardProps
  /**
   * Detail rendered inside a solution block, keyed by solution slug.
   * Solutions without an entry fall back to their own `detail` copy.
   */
  details?: Record<string, ReactNode>
}

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

export default function SolutionsSection({ data, lang, title, intro, customCard, details = {} }: SolutionsSectionProps) {
  const isEs = lang === 'es'

  const defaultIntro = isEs
    ? 'Pueden contratarse por separado o encadenarse a medida que crece la operación.'
    : 'Each one can be contracted on its own, or combined as your operation in Colombia grows.'

  // Strip a duplicated opening sentence that older CMS copy may still carry
  const cleanIntro = intro
    ? intro
        .replace(/^Cada una responde a una situación concreta del fabricante, no a un servicio aislado\.\s*/i, '')
        .replace(/^Each addresses a specific manufacturer challenge, not an isolated service\.\s*/i, '')
    : defaultIntro

  const defaultTitle = isEs
    ? 'Cuatro soluciones. Cada una responde a una situación concreta del fabricante.'
    : 'Four solutions. Each answers a specific manufacturer situation.'

  const card: CustomCardProps = customCard || {
    title: isEs ? '¿Su caso no encaja exactamente en una de estas cuatro?' : 'Does your case not fit neatly into one of these four?',
    description: isEs
      ? 'Las soluciones se diseñan sobre los mismos componentes. Una revisión inicial define la combinación correcta para su operación.'
      : 'Our solutions are engineered from the same operational building blocks. An initial review determines the exact combination for your model.',
    badge: isEs ? 'Estructuración caso a caso' : 'Tailored Case Design',
    ctaText: isEs ? 'Describir mi caso' : 'Describe my case',
    ctaHref: '#contacto',
  }

  const labels = {
    when: isEs ? 'Cuándo aplica' : 'When it applies',
    what: isEs ? 'Qué hace' : 'What it does',
    built: isEs ? 'Se construye con' : 'Built from',
    cta: isEs ? 'Consultar viabilidad de esta solución' : 'Check feasibility for this solution',
    flagship: isEs ? 'Solución insignia' : 'Flagship solution',
    jump: isEs ? 'Ir a la solución' : 'Go to solution',
  }

  return (
    <section id="soluciones" className={styles.section} aria-labelledby="soluciones-title">
      <div className={styles.container}>
        <ScrollReveal variant="up">
          <div className={styles.header}>
            <div className={styles.eyebrow}>{isEs ? 'CUATRO SOLUCIONES' : 'FOUR SOLUTIONS'}</div>
            <h2 id="soluciones-title" className={styles.title}>{title || defaultTitle}</h2>
            <p className={styles.intro}>{cleanIntro}</p>
          </div>
        </ScrollReveal>

        {/* Index: one card per solution, each jumps to its own block */}
        <nav className={styles.index} aria-label={isEs ? 'Soluciones' : 'Solutions'}>
          <ol className={styles.indexList}>
            {data.map((item, idx) => (
              <li key={item.slug} className={styles[`theme${idx}`]}>
                <a href={`#solucion-${item.slug}`} className={styles.indexCard} aria-label={`${labels.jump} ${item.number}: ${item.title}`}>
                  <span className={styles.indexNumber}>{item.number}</span>
                  <span className={styles.indexTitle}>{item.title}</span>
                  <span className={styles.indexBadge}>{item.badge}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* One independent offer per block, all with the same structure */}
        <div className={styles.blocks}>
          {data.map((item, idx) => {
            const customDetail = details[item.slug]
            return (
              <article
                key={item.slug}
                id={`solucion-${item.slug}`}
                className={`${styles.block} ${styles[`theme${idx}`]}`}
                aria-labelledby={`solucion-${item.slug}-title`}
              >
                <div className={styles.offer}>
                  <div className={styles.offerHead}>
                    <div className={styles.numberRow}>
                      <span className={styles.number}>{item.number}</span>
                      <span className={styles.badge}>{item.number === '01' ? labels.flagship : item.badge}</span>
                    </div>
                    <h3 id={`solucion-${item.slug}-title`} className={styles.blockTitle}>{item.title}</h3>
                    {item.footnote && <p className={styles.footnote}>{item.footnote}</p>}
                  </div>

                  <dl className={styles.facts}>
                    <div className={styles.fact}>
                      <dt className={styles.factLabel}>{labels.when}</dt>
                      <dd className={styles.factText}>{item.whenApplies}</dd>
                    </div>
                    <div className={styles.fact}>
                      <dt className={styles.factLabel}>{labels.what}</dt>
                      <dd className={styles.factText}>{item.industryApplication}</dd>
                    </div>
                    <div className={styles.fact}>
                      <dt className={styles.factLabel}>{labels.built}</dt>
                      <dd>
                        <ul className={styles.chips}>
                          {item.capabilityTags.map((tag) => (
                            <li key={tag} className={styles.chip}>{tag}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                    <div className={styles.ctaRow}>
                      <SolutionCta slug={item.slug} number={item.number} className={styles.solutionCta}>
                        <span>{labels.cta}</span>
                        <ArrowIcon />
                      </SolutionCta>
                    </div>
                  </dl>
                </div>

                {customDetail ? (
                  <div className={styles.detail}>{customDetail}</div>
                ) : item.detail ? (
                  <div className={styles.detail}>
                    <div className={styles.detailHead}>
                      <h4 className={styles.detailTitle}>{item.detail.title}</h4>
                      <p className={styles.detailIntro}>{item.detail.intro}</p>
                    </div>
                    <ol className={styles.steps}>
                      {item.detail.steps.map((step, sIdx) => (
                        <li key={sIdx} className={styles.step}>
                          <span className={styles.stepNumber}>{String(sIdx + 1).padStart(2, '0')}</span>
                          <span className={styles.stepTitle}>{step.title}</span>
                          <span className={styles.stepText}>{step.description}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : null}
              </article>
            )
          })}
        </div>

        <ScrollReveal variant="up" delay={120}>
          <div className={styles.customCardBanner}>
            <div className={styles.customCardLeft}>
              <span className={styles.customBadge}>{card.badge}</span>
              <h3 className={styles.customTitle}>{card.title}</h3>
              <p className={styles.customDescription}>{card.description}</p>
            </div>
            <div className={styles.customCardRight}>
              <SolutionCta slug="general" className={styles.customCtaBtn}>
                <span>{card.ctaText}</span>
                <ArrowIcon />
              </SolutionCta>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
