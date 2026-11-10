import ScrollReveal from '../ScrollReveal'
import styles from './RegulationRetie.module.css'
import { RegulationData } from '../../lib/solar-data'

interface RegulationRetieProps {
  data: RegulationData
  lang: 'es' | 'en'
}

export default function RegulationRetie({ data, lang }: RegulationRetieProps) {
  const isEs = lang === 'es'

  return (
    <section id="retie" className={styles.section} aria-label="RETIE 2024 regulation">
      <div className={styles.container}>
        <div className={styles.layoutGrid}>
          {/* Left Column: Explanatory Text */}
          <ScrollReveal variant="left">
            <div className={styles.textColumn}>
              <h2 className={styles.title}>{data.title}</h2>
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
    </section>
  )
}
