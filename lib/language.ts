export type Language = 'en' | 'es'

export function getCurrentLanguage(): Language {
  if (typeof document === 'undefined') return 'en'

  // 1. Check localStorage first
  try {
    const saved = localStorage.getItem('preferred_lang') as Language | null
    if (saved === 'es' || saved === 'en') {
      return saved
    }
  } catch (e) {
    // Ignore storage errors
  }

  // 2. Check if user already set googtrans cookie
  const match = document.cookie.match(/googtrans=\/es\/(en|es)/i)
  if (match && match[1]) {
    return match[1].toLowerCase() as Language
  }

  // Default is English as requested by user
  return 'en'
}

export function setLanguage(targetLang: Language) {
  if (typeof window === 'undefined') return

  // 1. Persist preference in localStorage
  try {
    localStorage.setItem('preferred_lang', targetLang)
  } catch (e) {
    // Ignore storage errors
  }

  // 2. Manage cookies
  const host = window.location.hostname
  const hostParts = host.split('.')
  const rootDomain = hostParts.length > 1 ? `.${hostParts.slice(-2).join('.')}` : null

  if (targetLang === 'es') {
    // Clear / reset translation for Spanish
    const clearCookie = (name: string, domain?: string) => {
      const d = domain ? `; domain=${domain}` : ''
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;${d}`
    }
    clearCookie('googtrans')
    clearCookie('googtrans', host)
    if (rootDomain) clearCookie('googtrans', rootDomain)

    // Set explicitly to /es/es to signal source language
    document.cookie = 'googtrans=/es/es; path=/;'
    document.cookie = `googtrans=/es/es; path=/; domain=${host};`
    if (rootDomain) document.cookie = `googtrans=/es/es; path=/; domain=${rootDomain};`
  } else {
    // English (/es/en)
    const cookieVal = '/es/en'
    document.cookie = `googtrans=${cookieVal}; path=/;`
    document.cookie = `googtrans=${cookieVal}; path=/; domain=${host};`
    if (rootDomain) document.cookie = `googtrans=${cookieVal}; path=/; domain=${rootDomain};`
  }

  // 3. Dispatch change event to Google Translate combo if available in DOM
  const select = document.querySelector<HTMLSelectElement>('.goog-te-combo')
  if (select) {
    if (targetLang === 'es') {
      select.value = ''
      select.dispatchEvent(new Event('change'))
    } else {
      select.value = 'en'
      select.dispatchEvent(new Event('change'))
    }
  }

  // 4. Reload page to ensure complete and clean translation across all components
  setTimeout(() => {
    window.location.reload()
  }, 120)
}
