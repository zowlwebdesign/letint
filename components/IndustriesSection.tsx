import Image from 'next/image'
import styles from './IndustriesSection.module.css'
import ScrollReveal from './ScrollReveal'
import { solarDataEn } from '../lib/solar-data'

interface IndustriesSectionProps {
  /** Resolved URL of the Solar & Storage photo */
  solarImageSrc: string
}

/**
 * Industries with a dedicated landing. Only Solar & Storage is listed: other
 * industries were removed by the client until they are developed.
 */
export default function IndustriesSection({ solarImageSrc }: IndustriesSectionProps) {
  return (
    <section className={styles.section} id="industries" aria-labelledby="industries-title">
      <div className={styles.inner}>
        <ScrollReveal>
          <h2 id="industries-title" className={styles.title}>Industries</h2>
          <p className={styles.subtitle}>
            The same services, packaged for the after-sales and regulatory cycle of a specific industry.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="up">
          <a href="/industrias/energia-solar" className={styles.card}>
            <div className={styles.photo}>
              <Image
                src={solarImageSrc}
                alt="Technician servicing installed solar equipment on site"
                fill
                sizes="(max-width: 900px) 100vw, 480px"
                className={styles.photoImg}
              />
            </div>
            <div className={styles.body}>
              <span className={styles.badge}>Solar &amp; Storage</span>
              <h3 className={styles.cardTitle}>When an inverter fails, the replacement is already in Colombia.</h3>
              <p className={styles.cardText}>
                After-sales, RMA and warranty operations for inverters, batteries (BESS) and solar trackers, without a
                local entity and without depending on a distributor.
              </p>
              <ul className={styles.solutions} aria-label="Solar & Storage solutions">
                {solarDataEn.solutions.map((sol) => (
                  <li key={sol.slug}>
                    <span className={styles.solNumber}>{sol.number}</span>
                    {sol.title}
                  </li>
                ))}
              </ul>
              <span className={styles.link}>
                See Solar &amp; Storage solutions <span aria-hidden="true">&rarr;</span>
              </span>
            </div>
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
