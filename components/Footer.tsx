import styles from './Footer.module.css'

interface FooterProps {
  data?: {
    corporateData?: {
      legalDisclaimer?: string
      // Other fields exist but we only need disclaimer here
    }
    socialLinks?: Array<{ label: string; url: string }>
  }
}

export default function Footer({ data }: FooterProps) {
  if (!data) return null;

  return (
    <footer className={styles.footer} aria-label="Site Footer">
      <div className={styles.inner}>
        {data.corporateData?.legalDisclaimer && <p className={styles.copy}>{data.corporateData.legalDisclaimer}</p>}
        <div className={styles.links}>
          <a href="/privacy" className={styles.link} aria-label="Read our Privacy Policy">
            Privacy Policy
          </a>
          {data.socialLinks && data.socialLinks.length > 0 && (
            data.socialLinks.map((link, i) => (
              <a 
                key={i} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.link}
                aria-label={`Visit LET INT US on ${link.label}`}
              >
                {link.label}
              </a>
            ))
          )}
        </div>
      </div>
    </footer>
  )
}
