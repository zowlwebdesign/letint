import type { Metadata } from 'next'
import { client } from '../../../sanity/lib/client'
import { INDUSTRY_PAGE_QUERY } from '../../../sanity/lib/queries'
import { getMergedSolarData } from '../../../lib/solar-data'

import styles from './campaign.module.css'
import ReferenceCaseMetrics from '../../../components/industries/ReferenceCaseMetrics'
import SolutionsSection from '../../../components/industries/SolutionsSection'
import WarrantyCycleTimeline from '../../../components/industries/WarrantyCycleTimeline'
import SolarContactForm from '../../../components/industries/SolarContactForm'
import ScrollReveal from '../../../components/ScrollReveal'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  let industryDoc: any = null

  try {
    industryDoc = await client.fetch(INDUSTRY_PAGE_QUERY, { slug: 'energia-solar' })
  } catch (e) {
    // Fallback
  }

  const title =
    'Inverter Warranty, RMA & RETIE Solutions for Solar Manufacturers in Colombia | LET Pro'
  const description =
    'Legal and operating arm in Colombia for inverter, panel and BESS manufacturers. Swap-ready FSL stock, end-to-end RMA and RETIE 2024 compliance with no local entity.'

  const ogImageUrl = industryDoc?.seoAndSocial?.ogImageUrl || 'https://letintl.com/Logo_let.webp'

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: 'https://letintl.com/industrias/energia-solar',
    },
    openGraph: {
      title,
      description,
      url: 'https://letintl.com/campanas/energia-solar',
      siteName: 'LET Pro | Solar Energy',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: 'LET Pro Solar — Operations and After-Sales in Colombia',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  }
}

export default async function SolarCampaignPage() {
  let industryDoc: any = null

  try {
    industryDoc = await client.fetch(INDUSTRY_PAGE_QUERY, { slug: 'energia-solar' })
  } catch (e) {
    // Fallback
  }

  const data = getMergedSolarData(industryDoc, 'en')

  return (
    <div className={styles.campaignPage}>
      {/* ─── 1. Minimal Header (Zero-leakage conversion navigation) ─── */}
      <header className={styles.campaignHeader}>
        <div className={styles.headerContainer}>
          <a href="/campanas/energia-solar" className={styles.brandLogo} aria-label="LET Pro Home">
            <span className={styles.brandText}>LET Pro</span>
            <span className={styles.brandTag}>SOLAR & STORAGE</span>
          </a>

          <div className={styles.headerActions}>
            <div className={styles.langSwitch}>
              <span className={styles.langActive}>EN</span>
            </div>
            <a href="#contacto" className={styles.headerCta}>
              <span>Request Brochure</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* ─── 2. Compact High-Impact Hero ─── */}
        <section className={styles.campaignHero}>
          <div className="container">
            <div className={styles.heroContent}>
              <ScrollReveal variant="fade">
                <div className={styles.campaignPill}>
                  <span>INVERTER WARRANTY & RMA PROGRAM · RETIE 2024</span>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="up" delay={100}>
                <h1 className={styles.heroTitle}>
                  You keep the brand and the customer.{' '}
                  <span className={styles.heroTitleAccent}>
                    LET Pro is your legal and operating arm in Colombia.
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal variant="up" delay={150}>
                <p className={styles.heroSub}>
                  Honor long-term inverter warranties, cut downtime with swap-ready stock in Colombia, and let one accountable partner run the full RMA cycle, with no local entity and no distributor dependency.
                </p>
              </ScrollReveal>
            </div>

            {/* Immediate Proof of Authority: Reference Case Metrics */}
            <ReferenceCaseMetrics data={data.caseStudy} lang="en" compact />
          </div>
        </section>

        {/* ─── 3. Solutions in Interactive Tabs ─── */}
        <SolutionsSection
          data={data.solutions}
          lang="en"
          variant="tabs"
          intro={data.solutionsIntro}
          customCard={data.customSolutionCard}
        />

        {/* ─── 4. Warranty Lifecycle in Detail ─── */}
        <WarrantyCycleTimeline
          steps={data.featuredSolutionFlow.steps}
          lang="en"
          title={data.featuredSolutionFlow.title}
          subheadline={data.featuredSolutionFlow.subheadline}
          callout={data.featuredSolutionFlow.callout}
        />

        {/* ─── 5. RETIE Summary & Brochure PDF Hook ─── */}
        <section className={styles.retieHookSection}>
          <div className="container">
            <ScrollReveal variant="up">
              <div className={styles.hookCard}>
                <div className={styles.hookLeft}>
                  <h3>RETIE 2024: Resolution 40117 of 2024</h3>
                  <p>
                    PV inverters, panels and controllers require a certificate of conformity to clear customs. With LET Pro as regulatory holder, legal and technical control stays 100% with the manufacturer and is never ceded to third parties.
                  </p>
                </div>
                <div className={styles.hookRight}>
                  <div className={styles.pdfIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                    </svg>
                  </div>
                  <div className={styles.pdfTitle}>B2B Executive Brochure</div>
                  <div className={styles.pdfSub}>Technical, operational and regulatory detail in PDF</div>
                  <a href="#contacto" className={styles.hookCta}>
                    <span>Send the Brochure to My Inbox</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── 6. High-Conversion Campaign Form ─── */}
        <SolarContactForm variant="campaign" lang="en" />
      </main>

      {/* ─── 7. Minimal KYC Footer ─── */}
      <footer className={styles.campaignFooter}>
        <div className={styles.footerContainer}>
          <p className={styles.disclaimerText}>{data.legalDisclaimer}</p>
          <div className={styles.footerLinks}>
            <a href="/privacy" className={styles.footerLink}>
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
