import type { Metadata } from 'next'
import { client } from '../../sanity/lib/client'
import { SITE_SETTINGS_QUERY, ALL_INDUSTRIES_QUERY } from '../../sanity/lib/queries'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import styles from './page.module.css'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Terms of Service | LET Group',
  description:
    'Terms of Service governing the use of LET Group platforms, logistics representation, and regulatory services.',
  alternates: {
    canonical: 'https://letintl.com/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function TermsPage() {
  let siteSettings: any = null
  let industries: any[] = []

  try {
    const [settings, inds] = await Promise.all([
      client.fetch(SITE_SETTINGS_QUERY),
      client.fetch(ALL_INDUSTRIES_QUERY),
    ])
    siteSettings = settings
    industries = inds || []
  } catch (e) {
    // Graceful degradation
  }

  const sections = [
    {
      title: '1. Acceptance of Terms',
      content:
        'By accessing or using the services provided by LET LOGISTICS INTERNATIONAL LLC and its operating entities (collectively, "LET Group"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.',
    },
    {
      title: '2. Commercial and Regulatory Services',
      content:
        'LET Group provides Importer of Record (IOR), Exporter of Record (EOR), regulatory compliance representation, and reverse logistics services under mandate agreements. All operational and customs services are subject to prior KYC and compliance approvals.',
    },
    {
      title: '3. Intellectual Property',
      content:
        'All content, branding, trademarks, and technological systems displayed on this website are the proprietary property of LET LOGISTICS INTERNATIONAL LLC or its licensors and are protected under international copyright and trademark laws.',
    },
    {
      title: '4. Limitation of Liability',
      content:
        'While LET Group exercises professional care in regulatory compliance and operations, regulatory interpretations and customs clearance procedures are subject to Colombian Customs and relevant governing authorities.',
    },
    {
      title: '5. Contact Information',
      content:
        'For inquiries regarding these Terms of Service, please contact us at info@letintl.com or info@letlogistics.com.',
    },
  ]

  return (
    <div className={styles.wrapper}>
      <Navbar data={siteSettings} industries={industries} />

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="/" className={styles.backLink} aria-label="Return to homepage">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Home
          </a>
          <h1 className={styles.title}>Terms of Service</h1>
          <div className={styles.meta}>
            <span className={styles.badge}>Official</span>
            <span>Effective: November 21, 2026</span>
          </div>
        </div>
      </header>

      <main className={styles.mainContent}>
        <p className={styles.intro}>
          Please read these Terms of Service carefully before engaging with our services, requesting operational review, or accessing our logistics platforms.
        </p>

        <div className={styles.sectionsList}>
          {sections.map((section, idx) => (
            <article key={idx} className={styles.sectionItem}>
              <h2 className={styles.sectionTitle}>{section.title}</h2>
              <div className={styles.sectionBody}>{section.content}</div>
            </article>
          ))}
        </div>
      </main>

      <Footer data={siteSettings} />
    </div>
  )
}
