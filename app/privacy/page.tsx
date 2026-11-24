import type { Metadata } from 'next'
import { client } from '../../sanity/lib/client'
import { PRIVACY_POLICY_QUERY, SITE_SETTINGS_QUERY, ALL_INDUSTRIES_QUERY } from '../../sanity/lib/queries'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import styles from './page.module.css'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Privacy Policy | LET Group',
  description:
    'Review the official Privacy Policy of LET LOGISTICS INTERNATIONAL LLC (LET Group). Effective Date: November 21, 2026.',
  alternates: {
    canonical: 'https://letintl.com/privacy',
    languages: {
      en: 'https://letintl.com/privacy',
      'en-US': 'https://letintl.com/privacy',
      'x-default': 'https://letintl.com/privacy',
    },
  },
  robots: {
    index: true,
    follow: true,
  },
}

interface PolicySection {
  title: string
  content?: string
  bullets?: { label?: string; text: string }[]
  footerText?: string
  isContact?: boolean
}

const DEFAULT_SECTIONS: PolicySection[] = [
  {
    title: '1. Information We Collect',
    content:
      'We collect information necessary to provide global logistics, customs compliance, and supply chain services, including:',
    bullets: [
      {
        label: 'Business & Contact Information',
        text: 'Name, job title, company name, business email address, phone number, and physical billing/shipping addresses.',
      },
      {
        label: 'Shipment & Customs Compliance Data',
        text: 'Commercial invoices, packing lists, serial numbers, product specifications, tax identification numbers (such as EIN/NIT), and consignee/shipper details required by customs authorities (e.g., U.S. CBP, Colombian DIAN) and regulatory agencies.',
      },
      {
        label: 'Technical & Usage Data',
        text: 'IP address, browser type, operating system, referring URLs, pages viewed, and cookies or similar tracking technologies collected automatically when you navigate https://letintl.com/.',
      },
    ],
  },
  {
    title: '2. How We Use Your Information',
    content:
      'We process collected information strictly for legitimate business and operational purposes, including:',
    bullets: [
      { text: 'Providing freight quotes, booking cargo, and executing air, ocean, and ground transportation services.' },
      { text: 'Managing customs clearance, temporary import regimes, Free Trade Zone (FTZ) entries, IOR/EOR compliance, and RMA/FSL dispatches.' },
      { text: 'Communicating operational updates, tracking milestones, invoices, and customer support responses.' },
      { text: 'Complying with applicable U.S. federal and state laws, export control regulations, anti-money laundering (AML) screening, and international customs mandates.' },
      { text: 'Improving the functionality, security, and user experience of our Site.' },
    ],
  },
  {
    title: '3. Disclosure and Sharing of Information',
    content:
      'We do not sell, rent, or trade your personal information to third parties. We may share your information only with trusted parties strictly necessary to execute your logistics operations or comply with the law:',
    bullets: [
      {
        label: 'Operational Partners & Carriers',
        text: 'Ocean lines, airlines, trucking companies, warehouse operators, customs brokers, and local affiliates (such as LET Procurement S.A.S. in Colombia) involved in fulfilling your shipment.',
      },
      {
        label: 'Government & Regulatory Authorities',
        text: 'Customs agencies, port authorities, tax authorities, and regulatory bodies as required by law for cargo clearance and trade compliance.',
      },
      {
        label: 'Service Providers',
        text: 'IT, cloud hosting, ERP/TMS software, and payment processing vendors bound by strict confidentiality obligations.',
      },
      {
        label: 'Legal & Safety Compliance',
        text: 'When required to comply with a subpoena, court order, legal process, or to protect our legal rights and prevent fraud.',
      },
    ],
  },
  {
    title: '4. International Data Transfers',
    content:
      'Because we operate global supply chains across the United States, Latin America, Asia, and Europe, your business and shipment data may be transferred to and processed in countries outside your state or country of residence (including the United States and Colombia). We implement appropriate contractual and operational safeguards to protect your data during cross-border transfers.',
  },
  {
    title: '5. Cookies and Tracking Technologies',
    content:
      'Our Site may use essential and analytical cookies to ensure proper website functionality and analyze traffic trends. You can control or disable cookies through your browser settings; however, disabling certain cookies may affect your experience on the Site.',
  },
  {
    title: '6. Data Security and Retention',
    content:
      'We maintain commercially reasonable administrative, technical, and physical safeguards designed to protect your information against unauthorized access, loss, misuse, or alteration. We retain shipment, customs, and billing records for as long as necessary to fulfill the services requested and to comply with statutory recordkeeping obligations under U.S. tax, customs, and commercial laws.',
  },
  {
    title: '7. Your Privacy Rights & Choices (U.S. State Privacy Laws)',
    content:
      'Depending on your jurisdiction of residence within the United States (including Florida, California, Virginia, Colorado, Texas, and other states with applicable privacy statutes), you may have the right to:',
    bullets: [
      {
        label: 'Access & Know',
        text: 'Request confirmation of whether we process your personal data and obtain a copy of such data.',
      },
      {
        label: 'Correction',
        text: 'Request correction of inaccurate personal information.',
      },
      {
        label: 'Deletion',
        text: 'Request deletion of personal information we hold about you, subject to legal and statutory retention exceptions (such as mandatory customs and tax records).',
      },
      {
        label: 'Opt-Out',
        text: 'Unsubscribe from marketing or promotional emails at any time by following the opt-out instructions in our emails or contacting us directly.',
      },
    ],
    footerText:
      'To exercise any of these rights, please submit a verifiable request using the contact details in Section 11 below. We will not discriminate against you for exercising your privacy rights.',
  },
  {
    title: "8. Children's Privacy (COPPA Compliance)",
    content:
      'Our Site and services are strictly intended for business and commercial use. We do not knowingly collect personal information from children under the age of 13. If we become aware that we have inadvertently collected data from a minor under 13, we will promptly delete it.',
  },
  {
    title: '9. Third-Party Links',
    content:
      'Our Site may contain links to third-party websites (such as carrier tracking portals or regulatory agencies). We are not responsible for the privacy practices or content of external sites, and we encourage you to review their respective privacy policies.',
  },
  {
    title: '10. Changes to This Privacy Policy',
    content:
      'We reserve the right to update or modify this Privacy Policy at any time. Any changes will be posted on this page with an updated "Last Updated" date.',
  },
  {
    title: '11. Contact Us',
    content:
      'If you have any questions, requests, or concerns regarding this Privacy Policy or our data handling practices, please contact us at:',
    isContact: true,
  },
]

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

  const title = privacyData?.title || 'PRIVACY POLICY'
  const effectiveDate = 'November 21, 2026'
  const lastUpdated = privacyData?.lastUpdated || 'November 21, 2026'
  const intro =
    privacyData?.intro ||
    'LET LOGISTICS INTERNATIONAL LLC ("LET Logistics," "we," "us," or "our"), located at 4855 W Hillsboro Blvd Ste B3, Coconut Creek, FL 33073, USA, respects your privacy and is committed to protecting the personal and business information you share with us. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website https://letintl.com/ (the "Site"), request a freight or logistics quote, or engage our international freight forwarding, customs brokerage, Importer/Exporter of Record (IOR/EOR), and Forward Stocking Location (FSL) services.'

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

  // Use Sanity sections if they exist and are populated, otherwise use the official policy sections
  const hasCmsSections = Array.isArray(privacyData?.sections) && privacyData.sections.length > 0

  return (
    <div className={styles.wrapper}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.meta}>
            <span className={styles.badge}>Official</span>
            <span>Effective Date: {effectiveDate}</span>
            <span>·</span>
            <span>Last Updated: {lastUpdated}</span>
          </div>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.intro}>
          <p>{intro}</p>
          <p style={{ marginTop: '14px', marginBottom: 0 }}>
            By accessing or using our Site or submitting your information to us, you acknowledge the practices described in this Privacy Policy.
          </p>
        </div>

        <div className={styles.sectionsList}>
          {hasCmsSections
            ? privacyData.sections.map((section: any, idx: number) => (
                <article key={idx} className={styles.sectionItem}>
                  <h2 className={styles.sectionTitle}>{section.title}</h2>
                  <div className={styles.sectionBody}>
                    <p>{section.content}</p>
                  </div>
                </article>
              ))
            : DEFAULT_SECTIONS.map((section, idx) => (
                <article key={idx} className={styles.sectionItem}>
                  <h2 className={styles.sectionTitle}>{section.title}</h2>
                  <div className={styles.sectionBody}>
                    {section.content && <p>{section.content}</p>}

                    {section.bullets && (
                      <ul className={styles.list}>
                        {section.bullets.map((b, bIdx) => (
                          <li key={bIdx} className={styles.listItem}>
                            {b.label ? (
                              <>
                                <strong>{b.label}:</strong> {b.text}
                              </>
                            ) : (
                              b.text
                            )}
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.footerText && <p>{section.footerText}</p>}

                    {section.isContact && (
                      <div className={styles.contactCard}>
                        <p>
                          <strong>LET LOGISTICS INTERNATIONAL LLC</strong>
                        </p>
                        <p>Attn: Privacy &amp; Compliance Officer</p>
                        <p>4855 W Hillsboro Blvd Ste B3, Coconut Creek, FL 33073, USA</p>
                        <p>
                          Email:{' '}
                          <a href={`mailto:${contactEmail}`} className={styles.emailLink}>
                            {contactEmail}
                          </a>
                        </p>
                        <p>
                          Phone:{' '}
                          <a href="tel:+13052194974" className={styles.emailLink}>
                            +1 (305) 219-4974
                          </a>
                        </p>
                        <p>
                          Website:{' '}
                          <a href="https://letintl.com/" className={styles.emailLink}>
                            https://letintl.com/
                          </a>
                        </p>
                      </div>
                    )}
                  </div>
                </article>
              ))}
        </div>
      </main>

      <Footer data={siteSettings} />
    </div>
  )
}
