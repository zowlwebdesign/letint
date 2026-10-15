import styles from './WhyChooseSection.module.css'
import ScrollReveal from './ScrollReveal'

interface WhyChooseProps {
  data?: {
    title?: string
    differentials?: Array<{ text: string }>
  }
}

// removed DEFAULTS
const ICONS = [
  // Shield check
  <svg key="a" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
  // Map pin
  <svg key="b" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  // Network nodes
  <svg key="c" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="5" r="3"/><circle cx="19" cy="19" r="3"/><circle cx="5" cy="19" r="3"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="12" y1="16" x2="19" y2="19"/><line x1="12" y1="16" x2="5" y2="19"/></svg>,
  // Balance scale
  <svg key="d" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 3v18M12 6l-6 6M12 6l6 6M6 12v3a3 3 0 006 0v-3M18 12v3a3 3 0 01-6 0v-3"/><path d="M3 12h18"/></svg>,
  // Clock/timer
  <svg key="e" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  // Globe
  <svg key="f" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
]

export default function WhyChooseSection({ data }: WhyChooseProps) {
  if (!data) return null;
  const reasons = data.differentials?.map(r => r.text) || []

  return (
    <section className={styles.section} id="why-choose" aria-label="Why Choose LET INT US">
      <div className={styles.inner}>
        <ScrollReveal>
          {data.title && <h2 className={styles.title}>{data.title}</h2>}
        </ScrollReveal>

        {reasons.length > 0 && (
          <div className={styles.grid}>
            {reasons.map((reason, i) => (
              <ScrollReveal key={i} variant="left" delay={i * 70} className={styles.itemReveal}>
                <div className={styles.item}>
                  <div className={styles.icon}>{ICONS[i % ICONS.length]}</div>
                  <span className={styles.text}>{reason}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
