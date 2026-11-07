'use client'

import { useEffect, useState, useRef } from 'react'
import styles from './Navbar.module.css'
import { urlForImage } from '../sanity/lib/image'
import { getCurrentLanguage, setLanguage, type Language } from '../lib/language'

export interface NavDropdownItem {
  title: string
  description: string
  href: string
  badge?: string
  badgeType?: 'active' | 'upcoming'
}

export interface NavItem {
  label: string
  href: string
  dropdown?: NavDropdownItem[]
}

export interface IndustrySummary {
  _id?: string
  title?: string
  slug?: { current?: string }
  status?: string
  shortDescription?: string
  categoryTags?: string[]
}

interface NavbarProps {
  data?: {
    navigationLinks?: Array<{ label: string; href: string }>
    logo?: any
  }
  industries?: IndustrySummary[]
  variant?: 'default' | 'industry'
  activeItem?: string
  lang?: 'es' | 'en'
}

const DEFAULT_INDUSTRIES_DROPDOWN: NavDropdownItem[] = [
  {
    title: 'Energía solar y almacenamiento',
    description: 'Inversores, paneles, baterías y BESS. RETIE 2024, custodia FSL y garantías.',
    href: '/industrias/energia-solar',
    badge: 'Activa',
    badgeType: 'active',
  },
]

// Single unified navbar links for the specialized industry landing page
const INDUSTRY_NAVBAR_LINKS: NavItem[] = [
  { label: 'Soluciones', href: '#soluciones' },
  { label: 'Garantías', href: '#garantias' },
  { label: 'RETIE', href: '#retie' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar({
  data,
  industries,
  variant = 'default',
  activeItem,
  lang = 'es',
}: NavbarProps) {
  const isEs = lang === 'es'
  const isIndustry = variant === 'industry'

  // Dynamic dropdown items from Sanity or fallback
  const activeDropdownItems: NavDropdownItem[] = (() => {
    if (industries && industries.length > 0) {
      const items = industries
        .filter((ind) => ind?.slug?.current)
        .map((ind) => {
          const isActive = ind.status !== 'coming_soon'
          const slug = ind.slug?.current || ''
          return {
            title: ind.title || 'Industria',
            description:
              ind.shortDescription ||
              (ind.categoryTags && ind.categoryTags.length > 0
                ? ind.categoryTags.join(' · ')
                : 'Soluciones B2B, cumplimiento regulatorio y representación en Colombia.'),
            href: isActive ? `/industrias/${slug}` : '#',
            badge: isActive ? 'Activa' : 'Próximamente',
            badgeType: (isActive ? 'active' : 'upcoming') as 'active' | 'upcoming',
          }
        })
      if (items.length > 0) return items
    }
    return DEFAULT_INDUSTRIES_DROPDOWN
  })()

  const firstActiveHref =
    activeDropdownItems.find((item) => item.badgeType === 'active')?.href ||
    '/industrias/energia-solar'

  // Corporate links for the main website
  const defaultLinks: NavItem[] = [
    { label: 'Company', href: '/#company' },
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Services', href: '/#services' },
    {
      label: 'Industrias',
      href: firstActiveHref,
      dropdown: activeDropdownItems,
    },
    { label: 'Who we serve', href: '/#audience' },
    { label: 'Why Us', href: '/#why-choose' },
    { label: 'Contact', href: '#contact' },
  ]

  // Determine navigation items
  const links: NavItem[] = (() => {
    if (isIndustry) {
      return INDUSTRY_NAVBAR_LINKS
    }

    if (data?.navigationLinks && data.navigationLinks.length > 0) {
      const hasIndustrias = data.navigationLinks.some((l) =>
        l.label.toLowerCase().includes('industri')
      )

      const mapped: NavItem[] = data.navigationLinks.map((l) => ({
        label: l.label,
        href: l.href,
        dropdown: l.label.toLowerCase().includes('industri') ? activeDropdownItems : undefined,
      }))

      if (!hasIndustrias) {
        const serviceIdx = mapped.findIndex((l) => l.label.toLowerCase().includes('service'))
        const insertAt = serviceIdx >= 0 ? serviceIdx + 1 : 3
        mapped.splice(insertAt, 0, {
          label: isEs ? 'Industrias' : 'Industries',
          href: firstActiveHref,
          dropdown: activeDropdownItems,
        })
      }
      return mapped
    }
    return defaultLinks
  })()

  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileIndustriasOpen, setMobileIndustriasOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState<Language>('en')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
      dropdownTimeoutRef.current = null
    }
    setDropdownOpen(true)
  }

  const handleDropdownLeave = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false)
    }, 250)
  }

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    setCurrentLang(getCurrentLanguage())
  }, [])

  const handleLanguageChange = (target: Language) => {
    if (target === currentLang) return
    setCurrentLang(target)
    setLanguage(target)
  }

  // Track scroll position to adjust navbar backdrop
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
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

  // Close on Escape or click outside desktop dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileMenuOpen) setMobileMenuOpen(false)
        if (dropdownOpen) setDropdownOpen(false)
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [mobileMenuOpen, dropdownOpen])

  // Close mobile menu if resized to desktop viewport
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900 && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileMenuOpen])

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev)
  const closeMobileMenu = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
    setMobileMenuOpen(false)
    setDropdownOpen(false)
  }

  // Smooth scroll handler for anchor links
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      const targetId = href.replace('#', '')
      const el = document.getElementById(targetId)
      if (el) {
        e.preventDefault()
        const offset = 80
        const yPos = el.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top: yPos, behavior: 'smooth' })
        closeMobileMenu()
      }
    }
  }

  return (
    <header className={`${styles.header}${scrolled || mobileMenuOpen ? ` ${styles.scrolled}` : ''}`}>
      <nav className={styles.nav} aria-label="Main Navigation">
        <div className={styles.navInner}>
          {/* Logo Group: Logo LET + Botón volver a letintl.com + Breadcrumb */}
          <div className={styles.logoGroup}>
            <a
              href="/"
              className={styles.logo}
              aria-label="LET INT US Home — Supply Chain Control Tower"
              onClick={closeMobileMenu}
            >
              {data?.logo ? (
                <img
                  src={urlForImage(data.logo)?.width(160).fit('max').auto('format').url()}
                  alt="LET Logo"
                  width={84}
                  height={50}
                  decoding="async"
                  className={styles.logoImg}
                />
              ) : (
                <img
                  src="/Logo_let.webp"
                  alt="LET Logo"
                  width={84}
                  height={50}
                  className={styles.logoImg}
                />
              )}
            </a>

            {/* Botoncito para volver al home de letintl */}
            {isIndustry && (
              <>
                <a
                  href="/"
                  className={styles.backHomeBtn}
                  title="Volver a la página principal de letintl.com"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  <span>letintl.com</span>
                </a>

                <div className={styles.industryBreadcrumb}>
                  <span className={styles.crumbDivider}>/</span>
                  <span className={styles.crumbParent}>Industrias ›</span>
                  <span className={styles.crumbCurrent}>Energía solar</span>
                </div>
              </>
            )}
          </div>

          {/* Desktop Navigation Links (Unified, single row) */}
          <div className={styles.navLinks} role="menubar">
            {links.map((link, i) => {
              const isIndustrias = !!link.dropdown
              const isActive = activeItem === link.label

              if (isIndustrias) {
                return (
                  <div
                    key={i}
                    ref={dropdownRef}
                    className={styles.dropdownContainer}
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <a
                      href={link.href}
                      className={`${styles.navLink} ${styles.dropdownTrigger} ${isActive ? styles.navLinkActive : ''}`}
                      onClick={(e) => {
                        if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
                        setDropdownOpen((prev) => !prev)
                      }}
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{link.label}</span>
                      <svg
                        className={`${styles.chevronIcon} ${dropdownOpen ? styles.chevronOpen : ''}`}
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </a>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                      <div
                        className={styles.dropdownMenu}
                        role="menu"
                        onMouseEnter={handleDropdownEnter}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <div className={styles.dropdownEyebrow}>
                          {isEs ? 'Verticales B2B & Regulación' : 'B2B Industry Verticals'}
                        </div>
                        <div className={styles.dropdownList}>
                          {link.dropdown?.map((sub, sIdx) => (
                            <a
                              key={sIdx}
                              href={sub.href}
                              className={styles.dropdownItem}
                              role="menuitem"
                              onClick={() => {
                                if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
                                setDropdownOpen(false)
                              }}
                            >
                              <div className={styles.dropdownItemTop}>
                                <span className={styles.dropdownItemTitle}>{sub.title}</span>
                                {sub.badge && (
                                  <span
                                    className={
                                      sub.badgeType === 'active'
                                        ? styles.badgeActive
                                        : styles.badgeUpcoming
                                    }
                                  >
                                    {sub.badge}
                                  </span>
                                )}
                              </div>
                              <p className={styles.dropdownItemDesc}>{sub.description}</p>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <a
                  key={i}
                  href={link.href}
                  className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                  role="menuitem"
                  onClick={(e) => handleAnchorClick(e, link.href)}
                >
                  {link.label}
                </a>
              )
            })}

            {/* Selector de idioma original del header */}
            <button
              type="button"
              className={styles.langToggle}
              onClick={() => handleLanguageChange(currentLang === 'en' ? 'es' : 'en')}
              aria-label={currentLang === 'en' ? 'Cambiar a Español' : 'Switch to English'}
              title={currentLang === 'en' ? 'Cambiar a Español' : 'Switch to English'}
            >
              {currentLang === 'en' ? 'ES' : 'EN'}
            </button>
          </div>

          {/* Action Group: CTA + Hamburger Toggle */}
          <div className={styles.actionsGroup}>
            <a
              href={isIndustry ? '#contacto' : '#contact'}
              className={`${styles.navCta} ${isIndustry ? styles.navCtaGold : ''}`}
              aria-label="Talk to an Expert - Start Your Operations in Colombia"
              onClick={(e) => handleAnchorClick(e, isIndustry ? '#contacto' : '#contact')}
            >
              <span className={styles.navCtaFull}>
                {isEs ? 'Hablar con un especialista' : 'Talk to an Expert'}
              </span>
              <span className={styles.navCtaShort}>
                {isEs ? 'Contacto' : 'Contact'}
              </span>
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
          {/* Botoncito volver a letintl en móvil */}
          {isIndustry && (
            <div className={styles.mobileBackHomeWrapper}>
              <a href="/" className={styles.mobileBackHomeBtn} onClick={closeMobileMenu}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                <span>Volver al sitio principal letintl.com</span>
              </a>
            </div>
          )}

          <div className={styles.drawerLinks}>
            {links.map((link, i) => {
              if (link.dropdown) {
                return (
                  <div key={i} className={styles.mobileDropdownWrapper}>
                    <button
                      type="button"
                      className={styles.mobileDropdownBtn}
                      onClick={() => setMobileIndustriasOpen((prev) => !prev)}
                    >
                      <div className={styles.drawerLinkLeft}>
                        <span className={styles.drawerLinkIndex}>0{i + 1}</span>
                        <span className={styles.drawerLinkLabel}>{link.label}</span>
                      </div>
                      <svg
                        className={`${styles.drawerChevron} ${mobileIndustriasOpen ? styles.chevronOpen : ''}`}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>

                    {mobileIndustriasOpen && (
                      <div className={styles.mobileSubmenu}>
                        {link.dropdown.map((sub, sIdx) => (
                          <a
                            key={sIdx}
                            href={sub.href}
                            className={styles.mobileSubLink}
                            onClick={closeMobileMenu}
                          >
                            <div className={styles.mobileSubTop}>
                              <span className={styles.mobileSubTitle}>{sub.title}</span>
                              {sub.badge && (
                                <span
                                  className={
                                    sub.badgeType === 'active'
                                      ? styles.badgeActive
                                      : styles.badgeUpcoming
                                  }
                                >
                                  {sub.badge}
                                </span>
                              )}
                            </div>
                            <span className={styles.mobileSubDesc}>{sub.description}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <a
                  key={i}
                  href={link.href}
                  className={styles.drawerLink}
                  onClick={(e) => {
                    handleAnchorClick(e, link.href)
                    closeMobileMenu()
                  }}
                >
                  <div className={styles.drawerLinkLeft}>
                    <span className={styles.drawerLinkIndex}>0{i + 1}</span>
                    <span className={styles.drawerLinkLabel}>{link.label}</span>
                  </div>
                  <svg
                    className={styles.drawerChevron}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>
              )
            })}

            <a href="/privacy" className={styles.drawerLink} onClick={closeMobileMenu}>
              <div className={styles.drawerLinkLeft}>
                <span className={styles.drawerLinkIndex}>0{links.length + 1}</span>
                <span className={styles.drawerLinkLabel}>Privacy Policy</span>
              </div>
              <svg
                className={styles.drawerChevron}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
          </div>

          <div className={styles.drawerFooter}>
            <div className={styles.drawerLangRow}>
              <span className={styles.drawerLangLabel}>Idioma / Language</span>
              <button
                type="button"
                className={styles.langToggle}
                onClick={() => {
                  handleLanguageChange(currentLang === 'en' ? 'es' : 'en')
                  closeMobileMenu()
                }}
                aria-label={currentLang === 'en' ? 'Cambiar a Español' : 'Switch to English'}
              >
                {currentLang === 'en' ? 'ES' : 'EN'}
              </button>
            </div>

            <a
              href={isIndustry ? '#contacto' : '#contact'}
              className={`${styles.drawerCta} ${isIndustry ? styles.drawerCtaGold : ''}`}
              onClick={(e) => {
                handleAnchorClick(e, isIndustry ? '#contacto' : '#contact')
                closeMobileMenu()
              }}
            >
              <span>{isEs ? 'Hablar con un especialista' : 'Talk to an Expert'}</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
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
