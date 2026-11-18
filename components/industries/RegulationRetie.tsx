import ScrollReveal from '../ScrollReveal'
import styles from './RegulationRetie.module.css'
import { RegulationData } from '../../lib/solar-data'

interface RegulationRetieProps {
  data: RegulationData
  lang: 'es' | 'en'
  /** Render inside a solution block (no section shell, h4 heading) */
  embedded?: boolean
}

export default function RegulationRetie({ data, lang, embedded = false }: RegulationRetieProps) {
  const isEs = lang === 'es'
  const Shell = embedded ? 'div' : 'section'
  const HeadingTag = embedded ? 'h4' : 'h2'

  return (
    <Shell id="retie" className={`${styles.section} ${embedded ? styles.embedded : ''}`} aria-label="RETIE 2024 regulation">
      <div className={styles.container}>
        <div className={styles.layoutGrid}>
          {/* Left Column: Explanatory Text */}
          <ScrollReveal variant="left">
            <div className={styles.textColumn}>
              <HeadingTag className={styles.title}>{data.title}</HeadingTag>
              <p className={styles.paragraph}>{data.description}</p>
            </div>
          </ScrollReveal>

          {/* Right Column: Pre-shipment Checklist with Gold Border */}
          <ScrollReveal variant="right" delay={150}>
            <div className={styles.checklistCard}>
              <h3 className={styles.checklistTitle}>{data.checklistTitle}</h3>
              <ul className={styles.list}>
                {data.checklistItems.map((item, idx) => (
                  <li key={idx} className={styles.listItem}>
                    <span className={styles.bullet}>•</span>
                    <span className={styles.itemText}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </Shell>
  )
}
