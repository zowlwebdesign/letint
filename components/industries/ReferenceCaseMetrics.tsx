'use client'

import ScrollReveal from '../ScrollReveal'
import styles from './ReferenceCaseMetrics.module.css'
import { CaseStudyData } from '../../lib/solar-data'

interface ReferenceCaseMetricsProps {
  data: CaseStudyData
  lang: 'es' | 'en'
  compact?: boolean
}

export default function ReferenceCaseMetrics({
  data,
  lang,
}: ReferenceCaseMetricsProps) {
  return (
    <section className={styles.section} aria-label="Reference case">
      <div className={styles.container}>
        <ScrollReveal variant="up">
          <div className={styles.caseCard}>
            <h2 className={styles.title}>{data.title}</h2>
            <div className={styles.paragraphsGrid}>
              <p className={styles.paragraph}>{data.problemDescription}</p>
              <p className={styles.paragraph}>{data.solutionDescription}</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
