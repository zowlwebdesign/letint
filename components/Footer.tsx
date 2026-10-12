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
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {data.corporateData?.legalDisclaimer && <p className={styles.copy}>{data.corporateData.legalDisclaimer}</p>}
        {data.socialLinks && data.socialLinks.length > 0 && (
          <div className={styles.links}>
            {data.socialLinks.map((link, i) => (
              <a key={i} href={link.url} className={styles.link}>{link.label}</a>
            ))}
          </div>
        )}
      </div>
    </footer>
  )
}
