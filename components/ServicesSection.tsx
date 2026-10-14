import styles from './ServicesSection.module.css'

interface ServiceProps {
  data?: {
    title?: string
    subtitle?: string
    featuredService?: {
      active?: boolean
      title?: string
      description?: string
      capabilitiesHeading?: string
      capabilities?: string[]
      linkText?: string
      linkUrl?: string
    }
    standardServices?: Array<{
      active?: boolean
      title?: string
      description?: string
      linkText?: string
      linkUrl?: string
    }>
    ctaBanner?: {
      active?: boolean
      title?: string
      description?: string
      buttonText?: string
      buttonUrl?: string
    }
    upcomingService?: { show?: boolean; title?: string; badge?: string }
  }
}

const DEFAULT_CTA = {
  title: 'Need a tailored combination of services?',
  description:
    'We can structure any combination of services into a single turnkey operation under a single U.S. contract.',
  buttonText: 'Contact our team',
  buttonUrl: '#contact',
}

const DEFAULT_CAPABILITIES = [
  'Warranty and field service logistics (FSL) programs',
  'Samples and demonstration units',
  'Temporary imports and trade shows',
  'Returns and re-exports to origin',
]

const DEFAULT_STANDARDS = [
  { title: 'Consulting & Market Entry', description: 'We map the route for your products in Colombia: regulatory path, structure and the right local providers.', linkText: 'Learn more' },
  { title: 'Freight & Customs Clearance', description: 'International freight coordination and customs clearance managed through a single point of contact.', linkText: 'Learn more' },
  { title: 'Warehousing & Inventory (WMS)', description: 'Secure storage with inventory visibility, plus pick, pack and dispatch.', linkText: 'Learn more' },
  { title: 'Last-Mile Delivery', description: 'Reliable national delivery, including white-glove service for high-value equipment.', linkText: 'Learn more' },
  { title: 'Reverse Logistics', description: 'Returns, warranty claims and RMA flows handled end to end.', linkText: 'Learn more' },
]

const SVC_ICONS = [
  <svg key="a" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  <svg key="b" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>,
  <svg key="c" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  <svg key="d" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
  <svg key="e" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
]

export default function ServicesSection({ data }: ServiceProps) {
  if (!data) return null;
  const feat = data.featuredService?.active !== false ? data.featuredService : null
  const caps = feat?.capabilities || []
  const standards = (data.standardServices || []).filter(s => s.active !== false)
  const upcoming = data.upcomingService

  const showCta = data.ctaBanner?.active !== false
  const ctaTitle = data.ctaBanner?.title ?? DEFAULT_CTA.title
  const ctaDesc = data.ctaBanner?.description ?? DEFAULT_CTA.description
  const ctaButtonText = data.ctaBanner?.buttonText ?? DEFAULT_CTA.buttonText
  const ctaButtonUrl = data.ctaBanner?.buttonUrl || DEFAULT_CTA.buttonUrl

  return (
    <section className={styles.section} id="services">
      <div className={styles.inner}>
        {data.title && <h2 className={styles.title}>{data.title}</h2>}
        {data.subtitle && <p className={styles.subtitle}>{data.subtitle}</p>}

        {/* Featured IOR/EOR card */}
        {feat && (
          <div className={styles.featured}>
            <div className={styles.featuredLeft}>
              <div className={styles.featuredIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
              {feat.title && <h3 className={styles.featuredTitle}>{feat.title}</h3>}
              {feat.description && <p className={styles.featuredDesc}>{feat.description}</p>}
              {feat.linkText && (
                <a 
                  href={feat.linkUrl || '#contact'} 
                  className={styles.featuredLink}
                  aria-label={`${feat.linkText}: ${feat.title} in Colombia`}
                >
                  {feat.linkText} &rarr;
                </a>
              )}
            </div>

            {caps.length > 0 && (
              <div className={styles.featuredRight}>
                {feat.capabilitiesHeading && <p className={styles.capsHeading}>{feat.capabilitiesHeading}</p>}
                <ul className={styles.capsList}>
                  {caps.map((cap, i) => (
                    <li key={i}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/>
                      </svg>
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Standard services grid */}
        <div className={styles.grid}>
          {standards.map((svc, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardIcon}>{SVC_ICONS[i % SVC_ICONS.length]}</div>
              <h3 className={styles.cardTitle}>{svc.title}</h3>
              <p className={styles.cardDesc}>
                {svc.description?.startsWith('eliable') ? 'R' + svc.description : svc.description}
              </p>
              {svc.linkText && (
                <a 
                  href={svc.linkUrl || '#contact'} 
                  className={styles.cardLink}
                  aria-label={`${svc.linkText} about ${svc.title}`}
                >
                  {svc.linkText}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Minimalist Call to Action */}
        {showCta && (
          <div className={styles.ctaBox}>
            <div className={styles.ctaText}>
              {ctaTitle && <h3 className={styles.ctaTitle}>{ctaTitle}</h3>}
              {ctaDesc && <p className={styles.ctaDesc}>{ctaDesc}</p>}
            </div>
            <a 
              href={ctaButtonUrl} 
              className={styles.ctaBtn}
              aria-label={`${ctaButtonText} - Scroll to contact form`}
            >
              <span>{ctaButtonText}</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
