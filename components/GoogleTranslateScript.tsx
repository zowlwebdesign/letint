'use client'

import { useEffect } from 'react'
import { getCurrentLanguage } from '../lib/language'

declare global {
  interface Window {
    googleTranslateElementInit?: () => void
    google?: any
  }
}

export default function GoogleTranslateScript() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return

    const preferred = getCurrentLanguage()
    const host = window.location.hostname
    const hostParts = host.split('.')
    const rootDomain = hostParts.length > 1 ? `.${hostParts.slice(-2).join('.')}` : null

    // 1. Ensure cookie matches preferred language
    if (preferred === 'en') {
      const cookieVal = '/es/en'
      if (!document.cookie.includes('googtrans=/es/en')) {
        document.cookie = `googtrans=${cookieVal}; path=/;`
        document.cookie = `googtrans=${cookieVal}; path=/; domain=${host};`
        if (rootDomain) document.cookie = `googtrans=${cookieVal}; path=/; domain=${rootDomain};`
      }
    } else {
      if (!document.cookie.includes('googtrans=/es/es')) {
        document.cookie = 'googtrans=/es/es; path=/;'
        document.cookie = `googtrans=/es/es; path=/; domain=${host};`
        if (rootDomain) document.cookie = `googtrans=/es/es; path=/; domain=${rootDomain};`
      }
    }

    // 2. Continuous banner killer & layout reset
    const killGoogleBanner = () => {
      if (document.body.style.top && document.body.style.top !== '0px') {
        document.body.style.setProperty('top', '0px', 'important')
      }
      if (document.body.style.position && document.body.style.position !== 'static') {
        document.body.style.setProperty('position', 'static', 'important')
      }
      if (document.documentElement.style.top && document.documentElement.style.top !== '0px') {
        document.documentElement.style.setProperty('top', '0px', 'important')
      }

      const iframes = document.querySelectorAll<HTMLIFrameElement>(
        'iframe.skiptranslate, iframe[class*="skiptranslate"], iframe[id*=":1.container"], iframe[id*=":2.container"], .VIpgJd-ZVi9od-ORHb-Oxf5Fd, .goog-te-banner-frame'
      )
      iframes.forEach((iframe) => {
        iframe.style.setProperty('display', 'none', 'important')
        iframe.style.setProperty('visibility', 'hidden', 'important')
        iframe.style.setProperty('height', '0', 'important')
        iframe.style.setProperty('width', '0', 'important')
        iframe.style.setProperty('position', 'absolute', 'important')
        iframe.style.setProperty('top', '-9999px', 'important')
      })
    }

    killGoogleBanner()
    const observer = new MutationObserver(killGoogleBanner)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class'],
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style', 'class'],
    })

    // 3. Define the Google Translate Element callback
    window.googleTranslateElementInit = () => {
      try {
        if (window.google?.translate?.TranslateElement) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'es',
              includedLanguages: 'en,es',
              autoDisplay: false,
            },
            'google_translate_element'
          )
        }
      } catch (err) {
        console.warn('[Google Translate Init]:', err)
      }
    }

    // 4. Inject script if not already added
    const scriptId = 'google-translate-element-script'
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script')
      script.id = scriptId
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      script.async = true
      document.body.appendChild(script)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div
      id="google_translate_element"
      style={{ display: 'none' }}
      aria-hidden="true"
    />
  )
}
