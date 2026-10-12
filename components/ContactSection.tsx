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
            <form onSubmit={handleSubmit} className={styles.formGroup}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>YOUR FULL NAME *</label>
                  <input required name="fullName" value={form.fullName} onChange={handleChange} placeholder="John Doe" type="text" />
                </div>
                <div className={styles.field}>
                  <label>COMPANY NAME *</label>
                  <input required name="companyName" value={form.companyName} onChange={handleChange} placeholder="Acme Logistics Corp." type="text" />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label>BUSINESS EMAIL *</label>
                  <input required name="email" value={form.email} onChange={handleChange} placeholder="john@acme.com" type="email" />
                </div>
                <div className={styles.field}>
                  <label>ORIGIN COUNTRY</label>
                  <input name="originCountry" value={form.originCountry} onChange={handleChange} placeholder="United States, Canada, Germany..." type="text" />
                </div>
              </div>

              <div className={styles.field}>
                <label>PRIMARY SERVICE OF INTEREST</label>
                <select name="service" value={form.service} onChange={handleChange}>
                  {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                </select>
              </div>

              <div className={styles.field}>
                <label>MESSAGE OR PROJECT SCOPE</label>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Briefly describe your products, volume, or hiring needs..." rows={4} />
              </div>

              <button type="submit" className={styles.submitBtn}>
                Send Request &rarr;
              </button>

              {status && <p className={styles.statusMsg}>{status}</p>}

              <p className={styles.privacy}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
                Your information is secure. Please review our <a href="#">Privacy Policy</a>.
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
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
                        <path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>
                      </svg>
                    </div>
                    <div className={styles.infoContent}>
                      <p className={styles.infoLabel}>HEAD OFFICE</p>
                      <p className={styles.infoText} style={{ whiteSpace: 'pre-line' }}>{corporateData.address}</p>
                    </div>
                  </div>
                )}
                
                {/* Email */}
                {corporateData.contactEmail && (
                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </div>
                    <div className={styles.infoContent}>
                      <p className={styles.infoLabel}>DIRECT INQUIRIES</p>
                      <p className={styles.infoText}>{corporateData.contactEmail}</p>
                    </div>
                  </div>
                )}
                
                {/* Phone */}
                {(corporateData.phoneUS || corporateData.phoneColombia) && (
                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                    <div className={styles.infoContent}>
                      <p className={styles.infoLabel}>PHONE</p>
                      <p className={styles.infoText}>
                        {corporateData.phoneUS && <>{corporateData.phoneUS}<br/></>}
                        {corporateData.phoneColombia && <>{corporateData.phoneColombia}<br/></>}
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
