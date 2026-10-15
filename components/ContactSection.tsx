'use client'

import { useState } from 'react'
import styles from './ContactSection.module.css'
import ScrollReveal from './ScrollReveal'

interface ContactProps {
  data?: {
    title?: string
    responseTimeDescription?: string
    serviceDropdownOptions?: string[]
    whatsappNumber?: string
    whatsappLabel?: string
    whatsappMessage?: string
  }
  corporateData?: {
    address?: string
    contactEmail?: string
    phoneUS?: string
    phoneColombia?: string
    whatsappNumber?: string
    legalDisclaimer?: string
  }
}

// removed DEFAULTS
export default function ContactSection({ data, corporateData }: ContactProps) {
  const [form, setForm] = useState({ fullName: '', companyName: '', email: '', originCountry: '', service: '', message: '' })
  const [status, setStatus] = useState('')

  if (!data) return null;

  const options = data.serviceDropdownOptions || []

  const whatsappRaw = data.whatsappNumber || corporateData?.whatsappNumber || '+57 313 231 0746'
  const whatsappClean = whatsappRaw ? whatsappRaw.replace(/[^0-9]/g, '') : ''
  const whatsappLabel = data.whatsappLabel || 'Chat on WhatsApp'
  const defaultMsg = data.whatsappMessage || 'Hello! I would like to inquire about LET INT US logistics services in Colombia.'
  const dynamicMsg = form.fullName 
    ? `Hello! My name is ${form.fullName}${form.companyName ? ` from ${form.companyName}` : ''}. I am interested in ${form.service || 'your logistics services'}. ${form.message ? `Message: ${form.message}` : ''}`
    : defaultMsg
  const whatsappHref = whatsappClean ? `https://wa.me/${whatsappClean}?text=${encodeURIComponent(dynamicMsg)}` : ''

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('Sending...')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (res.ok) { setStatus('Sent! We will reply within one business day.'); setForm({ fullName: '', companyName: '', email: '', originCountry: '', service: '', message: '' }) }
      else setStatus('Something went wrong. Please email us directly.')
    } catch { setStatus('Network error. Please try again.') }
  }

  return (
    <section className={styles.section} id="contact">
      <div className={styles.inner}>
        <ScrollReveal>
          <div className={styles.header}>
            {data.title && <h2 className={styles.title}>{data.title}</h2>}
            {data.responseTimeDescription && <p className={styles.subtitle}>{data.responseTimeDescription}</p>}
          </div>
        </ScrollReveal>

        <div className={styles.layout}>
          {/* Form Card */}
          <ScrollReveal variant="left">
          <div className={styles.formCard}>
            <form onSubmit={handleSubmit} className={styles.formGroup} aria-label="Contact and consultation inquiry form">
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="fullName">YOUR FULL NAME *</label>
                  <input 
                    id="fullName" 
                    required 
                    name="fullName" 
                    value={form.fullName} 
                    onChange={handleChange} 
                    placeholder="John Doe" 
                    type="text" 
                    autoComplete="name"
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="companyName">COMPANY NAME *</label>
                  <input 
                    id="companyName" 
                    required 
                    name="companyName" 
                    value={form.companyName} 
                    onChange={handleChange} 
                    placeholder="Acme Logistics Corp." 
                    type="text" 
                    autoComplete="organization"
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="email">BUSINESS EMAIL *</label>
                  <input 
                    id="email" 
                    required 
                    name="email" 
                    value={form.email} 
                    onChange={handleChange} 
                    placeholder="john@acme.com" 
                    type="email" 
                    autoComplete="email"
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="originCountry">ORIGIN COUNTRY</label>
                  <input 
                    id="originCountry" 
                    name="originCountry" 
                    value={form.originCountry} 
                    onChange={handleChange} 
                    placeholder="United States, Canada, Germany..." 
                    type="text" 
                    autoComplete="country-name"
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="service">PRIMARY SERVICE OF INTEREST</label>
                <select id="service" name="service" value={form.service} onChange={handleChange} aria-label="Select primary service of interest">
                  {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="message">MESSAGE OR PROJECT SCOPE</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={form.message} 
                  onChange={handleChange} 
                  placeholder="Briefly describe your products, volume, or hiring needs..." 
                  rows={4} 
                />
              </div>

              <button type="submit" className={styles.submitBtn} aria-label="Submit inquiry to LET INT US team">
                Send Request &rarr;
              </button>

              {status && <p className={styles.statusMsg} role="status">{status}</p>}

              {whatsappHref && (
                <>
                  <div className={styles.divider}>
                    <span>or chat directly</span>
                  </div>

                  <a 
                    href={whatsappHref} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.whatsappBtn}
                    aria-label={`${whatsappLabel} with LET INT US`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.34C9.37 7.34 9.11 7.4 8.89 7.64C8.67 7.87 8.06 8.45 8.06 9.61C8.06 10.77 8.91 11.89 9.02 12.05C9.14 12.21 10.66 14.54 12.98 15.54C13.53 15.78 13.96 15.92 14.29 16.03C14.84 16.2 15.34 16.18 15.74 16.12C16.18 16.05 17.1 15.56 17.29 15.03C17.48 14.5 17.48 14.05 17.42 13.95C17.36 13.86 17.2 13.8 16.96 13.68C16.71 13.56 15.53 12.98 15.31 12.9C15.09 12.82 14.93 12.78 14.77 13.02C14.61 13.26 14.15 13.8 14.01 13.96C13.87 14.12 13.73 14.14 13.49 14.02C13.25 13.9 12.23 13.57 11.03 12.5C10.1 11.66 9.47 10.63 9.35 10.43C9.23 10.23 9.34 10.11 9.46 9.99C9.57 9.88 9.71 9.7 9.83 9.56C9.95 9.42 9.99 9.32 10.07 9.16C10.15 9 10.11 8.86 10.05 8.74C9.99 8.62 9.53 7.5 9.34 7.04C9.15 6.59 8.96 6.65 8.82 6.64C8.68 6.64 8.52 6.63 8.36 6.63"/>
                    </svg>
                    <span>{whatsappLabel}</span>
                  </a>
                </>
              )}

              <p className={styles.privacy}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
                Your information is secure. Review our{' '}
                <a href="/privacy" aria-label="Review our Privacy Policy">
                  Privacy Policy
                </a>.
              </p>
            </form>
          </div>
          </ScrollReveal>

          {/* Info Card */}
          {corporateData && (
            <ScrollReveal variant="right">
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Corporate Office & Hub</h3>
              
              <div className={styles.infoItems}>
                {/* Head Office */}
                {corporateData.address && (
                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <div className={styles.infoContent}>
                      <p className={styles.infoLabel}>HEAD OFFICE</p>
                      <address className={styles.infoText} style={{ whiteSpace: 'pre-line', fontStyle: 'normal' }}>
                        {corporateData.address}
                      </address>
                    </div>
                  </div>
                )}
                
                {/* Email */}
                {corporateData.contactEmail && (
                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </div>
                    <div className={styles.infoContent}>
                      <p className={styles.infoLabel}>DIRECT INQUIRIES</p>
                      <p className={styles.infoText}>
                        <a 
                          href={`mailto:${corporateData.contactEmail}`} 
                          className={styles.contactLink}
                          aria-label={`Send direct email to ${corporateData.contactEmail}`}
                        >
                          {corporateData.contactEmail}
                        </a>
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Phone */}
                {(corporateData.phoneUS || corporateData.phoneColombia) && (
                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                    <div className={styles.infoContent}>
                      <p className={styles.infoLabel}>PHONE</p>
                      <p className={styles.infoText}>
                        {corporateData.phoneUS && (
                          <>
                            <a 
                              href={`tel:${corporateData.phoneUS.replace(/[^0-9+]/g, '')}`} 
                              className={styles.contactLink}
                              aria-label={`Call US headquarters ${corporateData.phoneUS}`}
                            >
                              {corporateData.phoneUS} (US)
                            </a>
                            <br/>
                          </>
                        )}
                        {corporateData.phoneColombia && (
                          <>
                            <a 
                              href={`tel:${corporateData.phoneColombia.replace(/[^0-9+]/g, '')}`} 
                              className={styles.contactLink}
                              aria-label={`Call Colombia operations office ${corporateData.phoneColombia}`}
                            >
                              {corporateData.phoneColombia} (Colombia)
                            </a>
                            <br/>
                          </>
                        )}
                        <span className={styles.infoMuted}>Bilingual EST support</span>
                      </p>
                    </div>
                  </div>
                )}

                {/* WhatsApp */}
                {whatsappClean && (
                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.34C9.37 7.34 9.11 7.4 8.89 7.64C8.67 7.87 8.06 8.45 8.06 9.61C8.06 10.77 8.91 11.89 9.02 12.05C9.14 12.21 10.66 14.54 12.98 15.54C13.53 15.78 13.96 15.92 14.29 16.03C14.84 16.2 15.34 16.18 15.74 16.12C16.18 16.05 17.1 15.56 17.29 15.03C17.48 14.5 17.48 14.05 17.42 13.95C17.36 13.86 17.2 13.8 16.96 13.68C16.71 13.56 15.53 12.98 15.31 12.9C15.09 12.82 14.93 12.78 14.77 13.02C14.61 13.26 14.15 13.8 14.01 13.96C13.87 14.12 13.73 14.14 13.49 14.02C13.25 13.9 12.23 13.57 11.03 12.5C10.1 11.66 9.47 10.63 9.35 10.43C9.23 10.23 9.34 10.11 9.46 9.99C9.57 9.88 9.71 9.7 9.83 9.56C9.95 9.42 9.99 9.32 10.07 9.16C10.15 9 10.11 8.86 10.05 8.74C9.99 8.62 9.53 7.5 9.34 7.04C9.15 6.59 8.96 6.65 8.82 6.64C8.68 6.64 8.52 6.63 8.36 6.63"/>
                      </svg>
                    </div>
                    <div className={styles.infoContent}>
                      <p className={styles.infoLabel}>WHATSAPP</p>
                      <p className={styles.infoText}>
                        <a 
                          href={whatsappHref} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={styles.contactLink}
                          aria-label={`Chat on WhatsApp with LET INT US at ${whatsappRaw}`}
                        >
                          {whatsappRaw}
                        </a>
                        <br/>
                        <span className={styles.infoMuted}>Instant messaging support</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  )
}
