'use client'

import { useState, useEffect } from 'react'
import styles from './SolarContactForm.module.css'
import ScrollReveal from '../ScrollReveal'
import { trackEvent, trackLinkedInConversion } from '../../lib/analytics'
import { SOLUTION_FORM_VALUES } from '../../lib/solar-data'
import { SOLUTION_SELECT_EVENT } from './SolutionCta'

interface SolarContactFormProps {
  variant?: 'full' | 'campaign'
  lang: 'es' | 'en'
}

interface FormState {
  nombre: string
  empresa: string
  correo: string
  solucionInteres: string
  entidadLegalColombia: string
  tipoProducto: string
  mensaje: string
  aceptaDatos: boolean
}

export default function SolarContactForm({
  variant = 'full',
  lang,
}: SolarContactFormProps) {
  // The site is English-first: Spanish is only produced by Google Translate.
  const isEs = false
  const isCampaign = variant === 'campaign'

  const [formData, setFormData] = useState<FormState>({
    nombre: '',
    empresa: '',
    correo: '',
    solucionInteres: 'After-sales & warranties',
    entidadLegalColombia: '',
    tipoProducto: '',
    mensaje: '',
    aceptaDatos: false,
  })

  const [utms, setUtms] = useState({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const [preselected, setPreselected] = useState(false)

  // Preselect the solution chosen with ?solution=<slug> or a solution CTA on the page
  useEffect(() => {
    const applySolution = (slug: string | null) => {
      const value = slug ? SOLUTION_FORM_VALUES[slug] : undefined
      if (!value) return
      setFormData((prev) => ({ ...prev, solucionInteres: value }))
      setPreselected(true)
    }
    applySolution(new URLSearchParams(window.location.search).get('solution'))
    const onSelect = (e: Event) => applySolution((e as CustomEvent<string>).detail)
    window.addEventListener(SOLUTION_SELECT_EVENT, onSelect)
    return () => window.removeEventListener(SOLUTION_SELECT_EVENT, onSelect)
  }, [])

  // Extract UTM parameters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      setUtms({
        utm_source: params.get('utm_source') || '',
        utm_medium: params.get('utm_medium') || '',
        utm_campaign: params.get('utm_campaign') || '',
        utm_content: params.get('utm_content') || '',
        utm_term: params.get('utm_term') || '',
      })
    }
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    if (name === 'solucionInteres') setPreselected(false)
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }

    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev }
        delete copy[name]
        return copy
      })
    }
  }

  const validate = (): boolean => {
    const errs: Record<string, string> = {}

    if (!formData.nombre.trim()) {
      errs.nombre = isEs ? 'El nombre es obligatorio' : 'Name is required'
    }

    if (!formData.empresa.trim()) {
      errs.empresa = isEs ? 'La empresa es obligatoria' : 'Company is required'
    }

    if (!formData.correo.trim()) {
      errs.correo = isEs ? 'El correo corporativo es obligatorio' : 'Corporate email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      errs.correo = isEs ? 'Ingrese un correo electrónico válido' : 'Enter a valid corporate email'
    }

    if (!formData.entidadLegalColombia) {
      errs.entidadLegalColombia = 'Please select an option'
    }

    if (!formData.aceptaDatos) {
      errs.aceptaDatos = isEs
        ? 'Debe autorizar el tratamiento de datos para continuar'
        : 'You must authorize data processing to continue'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError(null)

    if (!validate()) return

    setLoading(true)

    try {
      const payload = {
        nombre: formData.nombre,
        empresa: formData.empresa,
        correo: formData.correo,
        solucionInteres: formData.solucionInteres,
        mensaje: formData.mensaje,
        aceptaDatos: formData.aceptaDatos,
        paisOrigen: 'Not specified',
        producto: formData.tipoProducto || 'Not specified',
        entidadLegalColombia: formData.entidadLegalColombia,
        certificadoRetie: 'Not specified',
        ...utms,
        idioma: lang,
        vistaOrigen: isCampaign ? 'campaign_landing' : 'industry_site',
      }

      const res = await fetch('/api/solar-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Error processing the request')
      }

      setSubmitted(true)

      // Fire Analytics Events
      trackEvent('lead_form_submit', {
        industry: 'solar',
        language: lang,
        form_variant: variant,
        solution_interest: formData.solucionInteres,
        product_type: formData.tipoProducto || 'not_specified',
        utm_source: utms.utm_source,
      })

      trackLinkedInConversion()
    } catch (err: any) {
      setServerError(
        err.message ||
          (isEs
            ? 'Ocurrió un error al enviar el formulario. Por favor intente nuevamente o escríbanos a info@letintl.com'
            : 'An error occurred while submitting. Please try again or email us at info@letintl.com')
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contacto" className={styles.section} aria-label="Sales contact">
      <div className={styles.container}>
        <div className={styles.layout}>
          {/* Left Column: Context Info */}
          <ScrollReveal variant="left">
            <div className={styles.infoColumn}>
              <h2 className={styles.title}>
                {isEs ? 'Revisión de su operación en Colombia' : 'Review your operation in Colombia'}
              </h2>
              <p className={styles.subtitle}>
                {isEs
                  ? 'Seleccione la solución de su interés y déjenos sus datos de contacto. Recibirá de inmediato nuestro Brochure Ejecutivo en su correo y un especialista evaluará su operación.'
                  : 'Select the solution of your interest and leave your contact details. You will immediately receive our Executive Brochure in your inbox, and a specialist will evaluate your operation.'}
              </p>

              <div className={styles.contactDetails}>
                <a href="mailto:info@letintl.com" className={styles.contactItem}>
                  info@letintl.com
                </a>
                <a
                  href="https://wa.me/573132310746"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactItem}
                  onClick={() =>
                    trackEvent('whatsapp_click', {
                      industry: 'solar',
                      language: lang,
                      source: 'contact_form_sidebar',
                    })
                  }
                >
                  +57 313 231 0746 (WhatsApp)
                </a>
                <span className={styles.contactLocation}>
                  {isEs ? 'Bogotá, Colombia' : 'Bogota, Colombia'}
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Clean 2x2 Form */}
          <ScrollReveal variant="right" delay={150}>
            <div className={styles.formCard}>
              {submitted ? (
                <div className={styles.successState}>
                  <div className={styles.successIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className={styles.successTitle}>
                    {isEs ? 'Solicitud recibida exitosamente' : 'Inquiry received successfully'}
                  </h3>
                  <p className={styles.successMessage}>
                    {isEs
                      ? 'Hemos enviado el Brochure Ejecutivo PDF a su correo corporativo. Un especialista de LET PRO revisará su caso y se pondrá en contacto en menos de 24 horas hábiles.'
                      : 'We have dispatched the Executive Solar PDF to your corporate inbox. A LET PRO specialist will review your operational requirements and follow up within 24 business hours.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form} noValidate>
                  {serverError && (
                    <div className={styles.serverAlert}>{serverError}</div>
                  )}

                  {/* Fila 1: [ Nombre * ] | [ Empresa * ] */}
                  <div className={styles.rowTwo}>
                    <div className={styles.field}>
                      <label htmlFor="nombre" className={styles.label}>
                        {isEs ? 'Nombre *' : 'Full Name *'}
                      </label>
                      <input
                        id="nombre"
                        type="text"
                        name="nombre"
                        required
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder={isEs ? 'Ej. Carlos Méndez' : 'e.g. John Doe'}
                        className={`${styles.input} ${errors.nombre ? styles.inputError : ''}`}
                      />
                      {errors.nombre && <span className={styles.errorText}>{errors.nombre}</span>}
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="empresa" className={styles.label}>
                        {isEs ? 'Empresa *' : 'Company *'}
                      </label>
                      <input
                        id="empresa"
                        type="text"
                        name="empresa"
                        required
                        value={formData.empresa}
                        onChange={handleChange}
                        placeholder={isEs ? 'Ej. SolarTech Global' : 'e.g. SolarTech Global'}
                        className={`${styles.input} ${errors.empresa ? styles.inputError : ''}`}
                      />
                      {errors.empresa && <span className={styles.errorText}>{errors.empresa}</span>}
                    </div>
                  </div>

                  {/* Fila 2: [ Correo corporativo * ] | [ Solución de interés * (Select) ] */}
                  <div className={styles.rowTwo}>
                    <div className={styles.field}>
                      <label htmlFor="correo" className={styles.label}>
                        {isEs ? 'Correo corporativo *' : 'Corporate Email *'}
                      </label>
                      <input
                        id="correo"
                        type="email"
                        name="correo"
                        required
                        value={formData.correo}
                        onChange={handleChange}
                        placeholder={isEs ? 'nombre@empresa.com' : 'name@company.com'}
                        className={`${styles.input} ${errors.correo ? styles.inputError : ''}`}
                      />
                      {errors.correo && <span className={styles.errorText}>{errors.correo}</span>}
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="solucionInteres" className={styles.label}>
                        {isEs ? 'Solución de interés *' : 'Solution of Interest *'}
                      </label>
                      <select
                        id="solucionInteres"
                        name="solucionInteres"
                        value={formData.solucionInteres}
                        onChange={handleChange}
                        className={styles.select}
                      >
                        <option value="After-sales & warranties">
                          {isEs ? 'Posventa y garantías' : 'After-sales & warranties'}
                        </option>
                        <option value="Regulatory holder in Colombia">
                          {isEs ? 'Titular regulatorio en Colombia' : 'Regulatory holder in Colombia'}
                        </option>
                        <option value="Samples, demos & prototypes">
                          {isEs ? 'Muestras, demostraciones y prototipos' : 'Samples, demos & prototypes'}
                        </option>
                        <option value="Customer Premises Equipment (CPE)">
                          Customer Premises Equipment (CPE)
                        </option>
                        <option value="General operational review">
                          {isEs ? 'Revisión general de operación' : 'General operational review'}
                        </option>
                      </select>
                      {preselected && (
                        <span className={styles.preselectNote} role="status">
                          {isEs ? 'Preseleccionada desde la solución que eligió.' : 'Preselected from the solution you chose.'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Fila 3: Product type | Legal Entity in Colombia */}
                  <div className={styles.rowTwo}>
                    <div className={styles.field}>
                      <label htmlFor="tipoProducto" className={styles.label}>
                        {isEs ? 'Tipo de producto' : 'Product Type'}
                      </label>
                      <select
                        id="tipoProducto"
                        name="tipoProducto"
                        value={formData.tipoProducto}
                        onChange={handleChange}
                        className={styles.select}
                      >
                        <option value="">Select a product type (optional)</option>
                        <option value="Inverters">Inverters</option>
                        <option value="Energy storage (BESS)">Energy storage (BESS)</option>
                        <option value="Trackers">Trackers</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="entidadLegalColombia" className={styles.label}>
                        {isEs ? '¿Tiene entidad legal en Colombia? *' : 'Do you have a legal entity in Colombia? *'}
                      </label>
                      <select
                        id="entidadLegalColombia"
                        name="entidadLegalColombia"
                        value={formData.entidadLegalColombia}
                        onChange={handleChange}
                        className={`${styles.select} ${errors.entidadLegalColombia ? styles.inputError : ''}`}
                        required
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        <option value="No">No — LET PRO acts as my local legal &amp; operating arm</option>
                        <option value="Yes">Yes — we have a local legal entity</option>
                        <option value="Evaluating">Under evaluation / exploring market entry</option>
                      </select>
                      {errors.entidadLegalColombia && (
                        <span className={styles.errorText}>{errors.entidadLegalColombia}</span>
                      )}
                    </div>
                  </div>

                  {/* Fila 4: Mensaje o producto específico (Opcional, altura reducida) */}
                  <div className={styles.field}>
                    <label htmlFor="mensaje" className={styles.label}>
                      {isEs ? 'Mensaje o producto específico (opcional)' : 'Specific product or message (optional)'}
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={2}
                      value={formData.mensaje}
                      onChange={handleChange}
                      placeholder={
                        isEs
                          ? 'Ej. Inversores y baterías BESS desde China, requerimos posventa FSL y titularidad RETIE'
                          : 'e.g. Inverters and BESS batteries from China, requiring FSL warranty custody and RETIE holder'
                      }
                      className={styles.textareaCompact}
                    />
                  </div>

                  {/* Fila 4: Checkbox Ley 1581 */}
                  <div className={styles.checkboxField}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        name="aceptaDatos"
                        checked={formData.aceptaDatos}
                        onChange={handleChange}
                        className={styles.checkbox}
                      />
                      <span className={styles.checkboxText}>
                        {isEs
                          ? 'Autorizo el tratamiento de mis datos personales conforme a la Ley 1581 de 2012 y a la política de tratamiento de datos de LET.'
                          : 'I authorize the processing of my personal data in accordance with Law 1581 of 2012 and LET’s data policy.'}
                      </span>
                    </label>
                    {errors.aceptaDatos && (
                      <span className={styles.errorText}>{errors.aceptaDatos}</span>
                    )}
                  </div>

                  {/* Fila 5: Botón Enviar y recibir Brochure PDF */}
                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className={styles.submitBtn}
                    >
                      <span>
                        {loading
                          ? (isEs ? 'Enviando...' : 'Submitting...')
                          : (isEs ? 'Solicitar revisión y recibir el brochure' : 'Request review & get the brochure')}
                      </span>
                      {!loading && <span className={styles.submitArrow}>→</span>}
                    </button>
                  </div>

                  <div className={styles.divider}>
                    <span>{isEs ? 'o escríbanos directamente' : 'or chat directly'}</span>
                  </div>

                  <a
                    href={`https://wa.me/573132310746?text=${encodeURIComponent(
                      isEs
                        ? 'Hola, me interesa conocer las soluciones de LET PRO para el sector solar en Colombia.'
                        : 'Hello! I would like to learn more about LET PRO solutions for the solar sector in Colombia.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.whatsappBtn}
                    aria-label={isEs ? 'Chatear por WhatsApp con LET' : 'Chat on WhatsApp with LET'}
                    onClick={() =>
                      trackEvent('whatsapp_click', {
                        industry: 'solar',
                        language: lang,
                        source: 'contact_form_button',
                      })
                    }
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.34C9.37 7.34 9.11 7.4 8.89 7.64C8.67 7.87 8.06 8.45 8.06 9.61C8.06 10.77 8.91 11.89 9.02 12.05C9.14 12.21 10.66 14.54 12.98 15.54C13.53 15.78 13.96 15.92 14.29 16.03C14.84 16.2 15.34 16.18 15.74 16.12C16.18 16.05 17.1 15.56 17.29 15.03C17.48 14.5 17.48 14.05 17.42 13.95C17.36 13.86 17.2 13.8 16.96 13.68C16.71 13.56 15.53 12.98 15.31 12.9C15.09 12.82 14.93 12.78 14.77 13.02C14.61 13.26 14.15 13.8 14.01 13.96C13.87 14.12 13.73 14.14 13.49 14.02C13.25 13.9 12.23 13.57 11.03 12.5C10.1 11.66 9.47 10.63 9.35 10.43C9.23 10.23 9.34 10.11 9.46 9.99C9.57 9.88 9.71 9.7 9.83 9.56C9.95 9.42 9.99 9.32 10.07 9.16C10.15 9 10.11 8.86 10.05 8.74C9.99 8.62 9.53 7.5 9.34 7.04C9.15 6.59 8.96 6.65 8.82 6.64C8.68 6.64 8.52 6.63 8.36 6.63"/>
                    </svg>
                    <span>{isEs ? 'Chatear por WhatsApp' : 'Chat on WhatsApp'}</span>
                  </a>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
