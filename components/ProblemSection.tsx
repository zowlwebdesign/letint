import styles from './ProblemSection.module.css'
import ScrollReveal from './ScrollReveal'

interface ProblemProps {
  data?: {
    title?: string
    subtitle?: string
    frictionCards?: Array<{ title: string; description: string }>
  }
}

const ICONS = [
  // Document with check/fold
  <svg key="a" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <path d="M14 2v6h6"/>
    <path d="M16 13H8"/>
    <path d="M16 17H8"/>
    <path d="M10 9H8"/>
  </svg>,
  // Balance scale
  <svg key="b" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M12 3v18M12 6l-6 6M12 6l6 6M6 12v3a3 3 0 006 0v-3M18 12v3a3 3 0 01-6 0v-3"/>
    <path d="M3 12h18"/>
  </svg>,
  // Warning triangle
  <svg key="c" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>,
]

export default function ProblemSection({ data }: ProblemProps) {
  if (!data) return null;
  const cards = data.frictionCards || []

  return (
    <section className={styles.section} id="problem" aria-label="Colombia Supply Chain Challenges">
      <div className={styles.inner}>
        <ScrollReveal>
          {data.title && <h2 className={styles.title}>{data.title}</h2>}
          {data.subtitle && <p className={styles.subtitle}>{data.subtitle}</p>}
        </ScrollReveal>

        {cards.length > 0 && (
          <div className={styles.grid}>
            {cards.map((card, i) => (
              <ScrollReveal key={i} variant="up" delay={i * 100} className={styles.cardReveal}>
                <div className={styles.card}>
                  <div className={styles.cardIcon}>{ICONS[i % ICONS.length]}</div>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardDesc}>{card.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
