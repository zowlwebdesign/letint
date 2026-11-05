'use client'

import { useState, useEffect } from 'react'
import styles from './CookieConsentBanner.module.css'

interface CookieConsentBannerProps {
  lang: 'es' | 'en'
}

export default function CookieConsentBanner({ lang }: CookieConsentBannerProps) {
  const isEs = lang === 'es'
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const consent = localStorage.getItem('let_cookie_consent')
      if (!consent) {
        setVisible(true)
      }
    } catch {
      // LocalStorage access may fail in strict private browsing
      setVisible(true)
    }
  }, [])

  const handleAccept = () => {
    try {
      localStorage.setItem('let_cookie_consent', 'accepted')
    } catch {
      // Ignore
    }
    setVisible(false)
  }

  const handleDecline = () => {
    try {
      localStorage.setItem('let_cookie_consent', 'declined')
    } catch {
      // Ignore
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={styles.banner} role="dialog" aria-label="Consentimiento de Cookies">
      <p className={styles.text}>
        {isEs ? (
          <>
            Utilizamos cookies técnicas y de analítica para optimizar su experiencia de navegación y
            medir el rendimiento comercial conforme a nuestra{' '}
            <a href="/privacy" className={styles.link}>
              Política de Privacidad
            </a>
            .
          </>
        ) : (
          <>
            We use technical and analytics cookies to optimize your browsing experience and evaluate
            commercial performance in accordance with our{' '}
            <a href="/privacy" className={styles.link}>
              Privacy Policy
            </a>
            .
          </>
        )}
      </p>

      <div className={styles.buttons}>
        <button type="button" onClick={handleDecline} className={styles.btnDecline}>
          {isEs ? 'Rechazar' : 'Decline'}
        </button>
        <button type="button" onClick={handleAccept} className={styles.btnAccept}>
          {isEs ? 'Aceptar' : 'Accept'}
        </button>
      </div>
    </div>
  )
}
