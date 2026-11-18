import type { ReactNode } from 'react'
import ScrollReveal from '../ScrollReveal'
import styles from './SolutionsSection.module.css'
import { SolutionData } from '../../lib/solar-data'
import SolutionCta from './SolutionCta'
import SolutionsTabs, { type SolutionTab } from './SolutionsTabs'

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
    howItWorks: isEs ? 'Ver cómo funciona' : 'See how it works',
    hide: isEs ? 'Ocultar detalle' : 'Hide details',
    open: isEs ? 'Abrir' : 'Open',
  }

  // One-line teaser of what the collapsible holds
  const detailHint = (slug: string, steps?: number) =>
    slug === 'after-sales'
      ? isEs ? '6 pasos, de la falla reportada al stock repuesto · con foto y compromiso ante la DIAN' : '6 steps, from failure report to restocked buffer · plus the DIAN commitment'
      : slug === 'regulatory-holder'
      ? isEs ? 'Resolución 40117 de 2024 y la lista de verificación antes de embarcar' : 'Resolution 40117 of 2024 and the pre-shipment checklist'
      : isEs ? `${steps || 4} pasos, de principio a fin` : `${steps || 4} steps, start to finish`

  // Label of the collapsible detail of each solution
  const detailSummary = (slug: string, fallback?: string) =>
    slug === 'after-sales'
      ? isEs ? 'Ver el ciclo de garantía, paso a paso' : 'See the warranty cycle, step by step'
      : slug === 'regulatory-holder'
      ? isEs ? 'Ver por qué importa: RETIE 2024' : 'See why it matters: RETIE 2024'
      : fallback || labels.howItWorks

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

        <SolutionsTabs
          labels={{
            prev: isEs ? 'Solución anterior' : 'Previous solution',
            next: isEs ? 'Siguiente solución' : 'Next solution',
            of: isEs ? 'de' : 'of',
            list: isEs ? 'Soluciones' : 'Solutions',
          }}
          tabs={data.map((item, idx): SolutionTab => {
            const customDetail = details[item.slug]
            const detailContent = customDetail ? (
              customDetail
            ) : item.detail ? (
              <>
                <div className={styles.detailHead}>
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
              </>
            ) : null

            return {
              slug: item.slug,
              number: item.number,
              title: item.title,
              badge: item.number === '01' ? labels.flagship : item.badge,
              themeClass: styles[`theme${idx}`],
              panel: (
                <article className={`${styles.block} ${styles[`theme${idx}`]}`} aria-labelledby={`solucion-${item.slug}-title`}>
                  <div className={styles.offer}>
                    <div className={styles.offerHead} data-number={item.number}>
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

                  {detailContent && (
                    <details className={styles.detail}>
                      <summary className={styles.detailSummary}>
                        <span className={styles.summaryIcon} aria-hidden="true">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                            <line x1="12" y1="5" x2="12" y2="19" className={styles.plusVertical} />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </span>
                        <span className={styles.summaryText}>
                          <span className={styles.summaryOpen}>{detailSummary(item.slug, item.detail?.title)}</span>
                          <span className={styles.summaryClose}>{labels.hide}</span>
                          <span className={styles.summaryHint}>{detailHint(item.slug, item.detail?.steps.length)}</span>
                        </span>
                        <span className={styles.summaryCue} aria-hidden="true">
                          <span className={styles.summaryCueText}>{labels.open}</span>
                          <svg className={styles.summaryChevron} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </span>
                      </summary>
                      <div className={styles.detailBody}>{detailContent}</div>
                    </details>
                  )}
                </article>
              ),
            }
          })}
        />

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
