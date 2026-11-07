import type { Metadata } from 'next'
import { client } from '../../sanity/lib/client'
import { PRIVACY_POLICY_QUERY, SITE_SETTINGS_QUERY, ALL_INDUSTRIES_QUERY } from '../../sanity/lib/queries'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import styles from './page.module.css'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Privacy Policy | LET INT US Corp.',
  description:
    'Review the official Privacy Policy of LET INT US Corp. Learn how we collect, protect, and handle your data under Colombian Law 1581 and global compliance standards.',
  alternates: {
    canonical: 'https://letintl.com/privacy',
    languages: {
      en: 'https://letintl.com/privacy',
      'en-US': 'https://letintl.com/privacy',
      es: 'https://letintl.com/privacy',
      'es-CO': 'https://letintl.com/privacy',
      'x-default': 'https://letintl.com/privacy',
    },
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function PrivacyPage() {
  let privacyData: any = null
  let siteSettings: any = null
  let industries: any[] = []

  try {
    const [privacy, settings, inds] = await Promise.all([
      client.fetch(PRIVACY_POLICY_QUERY),
      client.fetch(SITE_SETTINGS_QUERY),
      client.fetch(ALL_INDUSTRIES_QUERY),
    ])
    privacyData = privacy
    siteSettings = settings
    industries = inds || []
  } catch (e) {
    // Graceful degradation
  }

  const title = privacyData?.title || 'Privacy Policy'
  const lastUpdated = privacyData?.lastUpdated || 'September 2026'
  const intro = privacyData?.intro
  const sections = privacyData?.sections || []
  const contactEmail =
    privacyData?.contactEmail || siteSettings?.corporateData?.contactEmail || 'info@letintl.com'

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://letintl.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Privacy Policy',
        item: 'https://letintl.com/privacy',
      },
    ],
  }

  return (
    <div className={styles.wrapper}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar data={siteSettings} industries={industries} />

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="/" className={styles.backLink} aria-label="Return to LET INT US homepage">
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
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.meta}>
            {lastUpdated && <span>Last Updated: {lastUpdated}</span>}
          </div>
        </div>
      </header>

      <main className={styles.mainContent}>
        {intro && <p className={styles.intro}>{intro}</p>}

        {sections.length > 0 ? (
          <div className={styles.sectionsList}>
            {sections.map((section: any, idx: number) => {
              const isContactSection =
                section.title?.includes('Contact Us') || section.title?.includes('8.')
              return (
                <article key={idx} className={styles.sectionItem}>
                  <h2 className={styles.sectionTitle}>{section.title}</h2>
                  <div className={styles.sectionBody}>
                    {isContactSection ? (
                      <>
                        If you have any questions about this Privacy Policy, please contact us at:{' '}
                        <a href={`mailto:${contactEmail}`} className={styles.emailLink}>
                          {contactEmail}
                        </a>
                      </>
                    ) : (
                      section.content
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <p className={styles.intro}>
            No privacy policy content published yet. Please configure the Privacy Policy document in Sanity Studio.
          </p>
        )}
      </main>

      <Footer data={siteSettings} />
    </div>
  )
}
