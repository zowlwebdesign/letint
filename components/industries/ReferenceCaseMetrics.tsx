'use client'

import ScrollReveal from '../ScrollReveal'
import styles from './ReferenceCaseMetrics.module.css'
import { CaseStudyData, SectionImageData } from '../../lib/solar-data'
import SectionImage from './SectionImage'

interface ReferenceCaseMetricsProps {
  data: CaseStudyData
  lang: 'es' | 'en'
  compact?: boolean
  image?: SectionImageData
}

export default function ReferenceCaseMetrics({
  data,
  lang,
  image,
}: ReferenceCaseMetricsProps) {
  return (
    <section id="caso" className={styles.section} aria-label="Reference case">
      <div className={styles.container}>
        <ScrollReveal variant="up">
          <div className={`${styles.caseCard} ${image ? styles.withImage : ''}`}>
            <div className={styles.textCol}>
              <h2 className={styles.title}>{data.title}</h2>
              <div className={styles.paragraphsGrid}>
                <p className={styles.paragraph}>{data.problemDescription}</p>
                <p className={styles.paragraph}>{data.solutionDescription}</p>
              </div>
            </div>
            {image && (
              <div className={styles.photoCol}>
                <SectionImage image={image} ratio="card" sizes="(max-width: 820px) 100vw, 480px" />
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
