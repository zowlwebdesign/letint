import ScrollReveal from '../ScrollReveal'
import styles from './SolarProblems.module.css'
import { ProblemData } from '../../lib/solar-data'

interface SolarProblemsProps {
  data: ProblemData
}

/** Opens the page with the two problems, using the same copy as the LinkedIn piece. */
export default function SolarProblems({ data }: SolarProblemsProps) {
  return (
    <section id="problema" className={styles.section} aria-labelledby="problema-title">
      <div className={styles.container}>
        <ScrollReveal variant="up">
          <div className={styles.header}>
            <h2 id="problema-title" className={styles.title}>{data.title}</h2>
            <p className={styles.intro}>{data.intro}</p>
          </div>
        </ScrollReveal>

        <div className={styles.cards}>
          {data.cards.map((card, idx) => (
            <ScrollReveal key={card.title} variant="up" delay={idx * 100}>
              <article className={styles.card}>
                <span className={styles.label}>{card.label}</span>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardText}>{card.description}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal variant="up" delay={150}>
          <figure className={styles.compare}>
            <figcaption className={styles.compareTitle}>{data.compareTitle}</figcaption>
            <div className={styles.compareRow}>
              <span className={`${styles.bar} ${styles.barSlow}`}>{data.compareSlow.label}</span>
              <span className={`${styles.value} ${styles.valueSlow}`}>{data.compareSlow.value}</span>
            </div>
            <div className={styles.compareRow}>
              <span className={`${styles.bar} ${styles.barFast}`}>{data.compareFast.label}</span>
              <span className={`${styles.value} ${styles.valueFast}`}>{data.compareFast.value}</span>
            </div>
          </figure>
        </ScrollReveal>
      </div>
    </section>
  )
}
