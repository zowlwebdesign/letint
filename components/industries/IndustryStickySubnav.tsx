'use client'

import styles from './IndustryStickySubnav.module.css'

interface IndustryStickySubnavProps {
  lang: 'es' | 'en'
}

export default function IndustryStickySubnav({ lang }: IndustryStickySubnavProps) {
  const isEs = lang === 'es'

  const navItems = [
    { label: isEs ? 'Soluciones' : 'Solutions', href: '#soluciones' },
    { label: isEs ? 'Garantías' : 'Warranties', href: '#garantias' },
    { label: isEs ? 'RETIE' : 'RETIE', href: '#retie' },
    { label: isEs ? 'Contacto' : 'Contact', href: '#contacto' },
  ]

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const el = document.getElementById(targetId)
    if (el) {
      const navOffset = 60
      const elPosition = el.getBoundingClientRect().top + window.scrollY - navOffset
      window.scrollTo({
        top: elPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <nav className={styles.subnav} aria-label="Industry sub-navigation">
      <div className={styles.container}>
        {/* Left: Breadcrumbs */}
        <div className={styles.breadcrumbs}>
          <a href="/#industries" className={styles.parentCrumb}>
            {isEs ? 'Industrias' : 'Industries'}
          </a>
          <span style={{ margin: '0 6px', color: '#64748b' }}>›</span>
          <span className={styles.currentCrumb}>
            {isEs ? 'Energía solar y almacenamiento' : 'Solar Energy & Storage'}
          </span>
        </div>

        {/* Right: Section Anchors */}
        <ul className={styles.linksList}>
          {navItems.map((item, idx) => (
            <li key={idx}>
              <a
                href={item.href}
                className={styles.subnavLink}
                onClick={(e) => handleSmoothScroll(e, item.href)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
