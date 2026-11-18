import styles from './AudienceSection.module.css'
import ScrollReveal from './ScrollReveal'

interface AudienceProps {
  data?: {
    title?: string
    audienceCards?: Array<{ title: string; description: string; linkUrl?: string; linkText?: string }>
  }
}

// removed DEFAULTS
const ICONS = [
  // Chart/trend up
  <svg key="a" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /><polyline points="16 3 21 3 21 8" />
  </svg>,
  // Shopping cart
  <svg key="b" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
  </svg>,
  // Chip/CPU
  <svg key="c" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
  </svg>,
  // Map pin
  <svg key="d" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
  </svg>,
]

// Warranty programs are the Solar & Storage offer: link that card even if the CMS has no link yet
const SOLAR_LANDING = '/industrias/energia-solar'
function cardLink(card: { title: string; linkUrl?: string }): string | undefined {
  if (card.linkUrl) return card.linkUrl
  return /warrant/i.test(card.title || '') ? SOLAR_LANDING : undefined
}

export default function AudienceSection({ data }: AudienceProps) {
  if (!data) return null;
  const cards = data.audienceCards || []

  return (
    <section className={styles.section} id="audience" aria-label="Who We Serve">
      <div className={styles.inner}>
        <ScrollReveal>
          {data.title && <h2 className={styles.title}>{data.title}</h2>}
        </ScrollReveal>

        {cards.length > 0 && (
          <div className={styles.grid}>
            {cards.map((card, i) => (
              <ScrollReveal key={i} variant="scale" delay={i * 80} className={styles.cardReveal}>
                {(() => {
                  const href = cardLink(card)
                  const content = (
                    <>
                      <div className={styles.cardIcon}>{ICONS[i % ICONS.length]}</div>
                      <h3 className={styles.cardTitle}>{card.title}</h3>
                      <p className={styles.cardDesc}>{card.description}</p>
                      {href && (
                        <span className={styles.cardLink}>
                          {card.linkText || (href === SOLAR_LANDING ? 'See Solar & Storage' : 'Learn more')}{' '}
                          <span aria-hidden="true">&rarr;</span>
                        </span>
                      )}
                    </>
                  )
                  return href ? (
                    <a href={href} className={`${styles.card} ${styles.cardLinked}`}>
                      {content}
                    </a>
                  ) : (
                    <div className={styles.card}>{content}</div>
                  )
                })()}
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
