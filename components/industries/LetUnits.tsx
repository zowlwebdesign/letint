import ScrollReveal from '../ScrollReveal'
import styles from './LetUnits.module.css'
import { LetUnit } from '../../lib/solar-data'

interface LetUnitsProps {
  units: LetUnit[]
}

/** The four LET units behind the solar program. */
export default function LetUnits({ units }: LetUnitsProps) {
  return (
    <section id="let" className={styles.section} aria-labelledby="let-title">
      <div className={styles.container}>
        <ScrollReveal variant="up">
          <div className={styles.header}>
            <span className={styles.eyebrow}>Backed by LET · Since 2006</span>
            <h2 id="let-title" className={styles.title}>Four LET units, one accountable operation.</h2>
          </div>
        </ScrollReveal>
        <ul className={styles.grid}>
          {units.map((unit, idx) => (
            <li key={unit.name}>
              <ScrollReveal variant="up" delay={idx * 80}>
                <div className={styles.card}>
                  <span className={styles.country}>{unit.country}</span>
                  <h3 className={styles.name}>{unit.name}</h3>
                  <p className={styles.role}>{unit.role}</p>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
