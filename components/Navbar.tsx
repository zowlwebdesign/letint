import styles from './Navbar.module.css'
import { urlForImage } from '../sanity/lib/image'

interface NavbarProps {
  data?: {
    navigationLinks?: Array<{ label: string; href: string }>
    logo?: any
  }
}

export default function Navbar({ data }: NavbarProps) {
  const links = data?.navigationLinks || []

  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <a href="/" className={styles.logo}>
          {data?.logo ? (
            <img src={urlForImage(data.logo)?.url()} alt="LET INT US Logo" className={styles.logoSvg} />
          ) : (
            <svg className={styles.logoSvg} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 5C25.147 5 5 25.147 5 50C5 74.853 25.147 95 50 95C74.853 95 95 74.853 95 50C95 25.147 74.853 5 50 5ZM50 88.571C28.698 88.571 11.429 71.302 11.429 50C11.429 28.698 28.698 11.429 50 11.429C71.302 11.429 88.571 28.698 88.571 50C88.571 71.302 71.302 88.571 50 88.571Z" fill="white" opacity="0.8"/>
              <path d="M50 16.429C31.46 16.429 16.429 31.46 16.429 50C16.429 68.54 31.46 83.571 50 83.571C68.54 83.571 83.571 68.54 83.571 50C83.571 31.46 68.54 16.429 50 16.429ZM50 78.571C34.221 78.571 21.429 65.779 21.429 50C21.429 34.221 34.221 21.429 50 21.429C65.779 21.429 78.571 34.221 78.571 50C78.571 65.779 65.779 78.571 50 78.571Z" fill="white" opacity="0.5"/>
              <text x="50" y="58" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="900" fill="white" textAnchor="middle" fontStyle="italic">LET</text>
            </svg>
          )}
        </a>
        
        {links.length > 0 && (
          <div className={styles.navLinks}>
            {links.map((link, i) => (
              <a key={i} href={link.href} className={styles.navLink}>{link.label}</a>
            ))}
          </div>
        )}

        {links.length > 0 && <a href="#contact" className={styles.navCta}>Talk to an Expert</a>}
      </div>
    </nav>
  )
}
