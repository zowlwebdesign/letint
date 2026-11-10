'use client'

import { useState, useEffect } from 'react'
import styles from './CookieConsentBanner.module.css'

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem('let_cookie_consent')) setVisible(true)
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
    <div className={styles.banner} role="dialog" aria-label="Cookie consent">
      <p className={styles.text}>
        We use technical and analytics cookies to optimize your browsing experience and evaluate
        commercial performance in accordance with our{' '}
        <a href="/privacy" className={styles.link}>
          Privacy Policy
        </a>
        .
      </p>

      <div className={styles.buttons}>
        <button type="button" onClick={handleDecline} className={styles.btnDecline}>
          Decline
        </button>
        <button type="button" onClick={handleAccept} className={styles.btnAccept}>
          Accept
        </button>
      </div>
    </div>
  )
}
