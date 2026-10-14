import styles from './AudienceSection.module.css'

interface AudienceProps {
  data?: {
    title?: string
    audienceCards?: Array<{ title: string; description: string }>
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

export default function AudienceSection({ data }: AudienceProps) {
  if (!data) return null;
  const cards = data.audienceCards || []

  return (
    <section className={styles.section} id="audience" aria-label="Who We Serve">
      <div className={styles.inner}>
        {data.title && <h2 className={styles.title}>{data.title}</h2>}

        {cards.length > 0 && (
          <div className={styles.grid}>
            {cards.map((card, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.cardIcon}>{ICONS[i % ICONS.length]}</div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDesc}>{card.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
