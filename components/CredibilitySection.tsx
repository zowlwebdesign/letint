import styles from './CredibilitySection.module.css'
import ScrollReveal from './ScrollReveal'

interface CredibilityProps {
  data?: {
    title?: string
    subtitle?: string
    cards?: Array<{ title: string; description: string }>
  }
}

const ICONS = [
  // Balance scale
  <svg key="a" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M12 3v18M12 6l-6 6M12 6l6 6M6 12v3a3 3 0 006 0v-3M18 12v3a3 3 0 01-6 0v-3"/>
    <path d="M3 12h18"/>
  </svg>,
  // Map pin
  <svg key="b" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>,
  // Shield check
  <svg key="c" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>,
  // Network nodes
  <svg key="d" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <circle cx="12" cy="5" r="3"/>
    <circle cx="19" cy="19" r="3"/>
    <circle cx="5" cy="19" r="3"/>
    <line x1="12" y1="8" x2="12" y2="16"/>
    <line x1="12" y1="16" x2="19" y2="19"/>
    <line x1="12" y1="16" x2="5" y2="19"/>
  </svg>,
]

export default function CredibilitySection({ data }: CredibilityProps) {
  if (!data) return null;
  const cards = data.cards || []

  return (
    <section className={styles.section} id="company" aria-label="Governance and Credibility">
      <div className={styles.inner}>
        <ScrollReveal>
          {data.title && <h2 className={styles.title}>{data.title}</h2>}
          {data.subtitle && <p className={styles.subtitle}>{data.subtitle}</p>}
        </ScrollReveal>

        {cards.length > 0 && (
          <div className={styles.grid}>
            {cards.map((card, i) => (
              <ScrollReveal key={i} variant="up" delay={i * 90} className={styles.cardReveal}>
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
