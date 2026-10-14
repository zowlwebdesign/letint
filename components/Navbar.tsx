'use client'

import { useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import { urlForImage } from '../sanity/lib/image'

interface NavbarProps {
  data?: {
    navigationLinks?: Array<{ label: string; href: string }>
    logo?: any
  }
}

const DEFAULT_LINKS = [
  { label: 'Company', href: '#company' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Services', href: '#services' },
  { label: 'Who we serve', href: '#audience' },
  { label: 'Why Us', href: '#why-choose' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ data }: NavbarProps) {
  const links = data?.navigationLinks && data.navigationLinks.length > 0 
    ? data.navigationLinks 
    : DEFAULT_LINKS

  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Track scroll position to adjust navbar backdrop
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen])

  // Automatically close mobile menu if resized to desktop viewport
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900 && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileMenuOpen])

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev)
  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <header className={`${styles.header}${scrolled || mobileMenuOpen ? ` ${styles.scrolled}` : ''}`}>
      <nav className={styles.nav} aria-label="Main Navigation">
        <div className={styles.navInner}>
          {/* Brand Logo */}
          <a
            href="/"
            className={styles.logo}
            aria-label="LET INT US Home — Supply Chain Control Tower"
            onClick={closeMobileMenu}
          >
            {data?.logo ? (
              <img 
                src={urlForImage(data.logo)?.url()} 
                alt="LET INT US Logo" 
                fetchPriority="high"
                decoding="async"
                className={styles.logoImg} 
              />
            ) : (
              <svg className={styles.logoSvg} width={42} height={42} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="LET INT US Logo">
                <path d="M50 5C25.147 5 5 25.147 5 50C5 74.853 25.147 95 50 95C74.853 95 95 74.853 95 50C95 25.147 74.853 5 50 5ZM50 88.571C28.698 88.571 11.429 71.302 11.429 50C11.429 28.698 28.698 11.429 50 11.429C71.302 11.429 88.571 28.698 88.571 50C88.571 71.302 71.302 88.571 50 88.571Z" fill="white" opacity="0.8"/>
                <path d="M50 16.429C31.46 16.429 16.429 31.46 16.429 50C16.429 68.54 31.46 83.571 50 83.571C68.54 83.571 83.571 68.54 83.571 50C83.571 31.46 68.54 16.429 50 16.429ZM50 78.571C34.221 78.571 21.429 65.779 21.429 50C21.429 34.221 34.221 21.429 50 21.429C65.779 21.429 78.571 34.221 78.571 50C78.571 65.779 65.779 78.571 50 78.571Z" fill="white" opacity="0.5"/>
                <text x="50" y="58" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="900" fill="white" textAnchor="middle" fontStyle="italic">LET</text>
              </svg>
            )}
          </a>

          {/* Desktop Navigation Links */}
          <div className={styles.navLinks} role="menubar">
            {links.map((link, i) => (
              <a key={i} href={link.href} className={styles.navLink} role="menuitem">
                {link.label}
              </a>
            ))}
          </div>

          {/* Action Group: CTA + Hamburger Toggle */}
          <div className={styles.actionsGroup}>
            <a href="#contact" className={styles.navCta} aria-label="Talk to an Expert - Start Your Operations in Colombia">
              <span className={styles.navCtaFull}>Talk to an Expert</span>
              <span className={styles.navCtaShort}>Contact</span>
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              className={`${styles.hamburgerBtn}${mobileMenuOpen ? ` ${styles.open}` : ''}`}
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <span className={styles.hamburgerBar} />
              <span className={styles.hamburgerBar} />
              <span className={styles.hamburgerBar} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Backdrop & Drawer */}
      <div 
        id="mobile-navigation"
        className={`${styles.mobileDrawer}${mobileMenuOpen ? ` ${styles.drawerOpen}` : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className={styles.drawerContent}>
          <div className={styles.drawerLinks}>
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className={styles.drawerLink}
                onClick={closeMobileMenu}
              >
                <div className={styles.drawerLinkLeft}>
                  <span className={styles.drawerLinkIndex}>0{i + 1}</span>
                  <span className={styles.drawerLinkLabel}>{link.label}</span>
                </div>
                <svg className={styles.drawerChevron} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
            ))}
            <a
              href="/privacy"
              className={styles.drawerLink}
              onClick={closeMobileMenu}
            >
              <div className={styles.drawerLinkLeft}>
                <span className={styles.drawerLinkIndex}>0{links.length + 1}</span>
                <span className={styles.drawerLinkLabel}>Privacy Policy</span>
              </div>
              <svg className={styles.drawerChevron} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
          </div>

          <div className={styles.drawerFooter}>
            <a
              href="#contact"
              className={styles.drawerCta}
              onClick={closeMobileMenu}
            >
              <span>Talk to an Expert</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>

            <div className={styles.drawerContactCard}>
              <div className={styles.drawerContactItem}>
                <span className={styles.drawerContactLabel}>Direct Inquiries</span>
                <a href="mailto:info@letintl.com" className={styles.drawerContactValue}>
                  info@letintl.com
                </a>
              </div>
              <div className={styles.drawerContactItem}>
                <span className={styles.drawerContactLabel}>Headquarters</span>
                <span className={styles.drawerContactSub}>
                  Coconut Creek, Florida, USA • Colombia
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
