export type Language = 'en' | 'es'

/**
 * The site source language is ENGLISH. Every page is rendered in English by
 * default. Spanish is only ever produced by the Google Translate widget
 * (pageLanguage "en" -> "es"), triggered explicitly by the visitor through the
 * language toggle. The choice only lasts for the current browser session
 * (sessionStorage), so every new visit starts in English again.
 */
const STORAGE_KEY = 'preferred_lang'
const COOKIE_NAME = 'googtrans'

function cookieDomains(): Array<string | undefined> {
  const host = window.location.hostname
  const parts = host.split('.')
  const domains: Array<string | undefined> = [undefined, host]
  if (parts.length > 1) domains.push(`.${parts.slice(-2).join('.')}`)
  return domains
}

function writeCookie(value: string) {
  cookieDomains().forEach((domain) => {
    const d = domain ? `; domain=${domain}` : ''
    document.cookie = `${COOKIE_NAME}=${value}; path=/${d}`
  })
}

function clearCookie() {
  cookieDomains().forEach((domain) => {
    const d = domain ? `; domain=${domain}` : ''
    document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/${d}`
  })
}

export function getCurrentLanguage(): Language {
  if (typeof document === 'undefined') return 'en'

  try {
    if (sessionStorage.getItem(STORAGE_KEY) === 'es') return 'es'
  } catch {
    // Ignore storage errors
  }

  // Fallback to the translate cookie only when it explicitly asks for Spanish
  if (/googtrans=\/en\/es/i.test(document.cookie)) return 'es'

  return 'en'
}

/**
 * Runs on every page load: guarantees English unless the visitor explicitly
 * switched to Spanish during this session. Also wipes legacy cookies
 * (/es/en, /es/es) written by previous versions of the site.
 */
export function enforceDefaultLanguage() {
  if (typeof window === 'undefined') return
  const lang = getCurrentLanguage()
  if (lang === 'es') {
    if (!/googtrans=\/en\/es/i.test(document.cookie)) writeCookie('/en/es')
  } else if (/googtrans=/i.test(document.cookie)) {
    clearCookie()
  }
  try {
    localStorage.removeItem(STORAGE_KEY) // legacy persistent value
  } catch {
    // Ignore storage errors
  }
}

export function setLanguage(targetLang: Language) {
  if (typeof window === 'undefined') return

  try {
    if (targetLang === 'es') sessionStorage.setItem(STORAGE_KEY, 'es')
    else sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore storage errors
  }

  clearCookie()
  if (targetLang === 'es') writeCookie('/en/es')

  // Reload so Google Translate applies (or removes) the translation cleanly
  setTimeout(() => {
    window.location.reload()
  }, 120)
}
