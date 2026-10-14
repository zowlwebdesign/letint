'use client'

import { useState } from 'react'
import styles from './ContactSection.module.css'

interface ContactProps {
  data?: {
    title?: string
    responseTimeDescription?: string
    serviceDropdownOptions?: string[]
  }
  corporateData?: {
    address?: string
    contactEmail?: string
    phoneUS?: string
    phoneColombia?: string
    legalDisclaimer?: string
  }
}

// removed DEFAULTS
export default function ContactSection({ data, corporateData }: ContactProps) {
  const [form, setForm] = useState({ fullName: '', companyName: '', email: '', originCountry: '', service: '', message: '' })
  const [status, setStatus] = useState('')

  if (!data) return null;

  const options = data.serviceDropdownOptions || []

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
        <div className={styles.header}>
          {data.title && <h2 className={styles.title}>{data.title}</h2>}
          {data.responseTimeDescription && <p className={styles.subtitle}>{data.responseTimeDescription}</p>}
        </div>

        <div className={styles.layout}>
          {/* Form Card */}
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

          {/* Info Card */}
          {corporateData && (
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
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
