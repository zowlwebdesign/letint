import styles from './IndustryFooter.module.css'

interface IndustryFooterProps {
  lang?: 'es' | 'en'
}

export default function IndustryFooter({ lang = 'es' }: IndustryFooterProps) {
  const isEs = lang === 'es'

  return (
    <footer className={styles.footer} aria-label="Pie de página legal Grupo LET">
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div className={styles.brandTitle}>Grupo LET</div>
          <div className={styles.entities}>
            LET Logistics · LET Pro (LET Procurement S.A.S.) · Agencia de Aduanas LET Logistics
          </div>
        </div>

        <p className={styles.disclaimer}>
          {isEs
            ? 'Los servicios de importación y exportación de record, representación y Merchant of Record se estructuran mediante contratos de mandato y están sujetos a la aprobación de la División de KYC y Cumplimiento del Grupo LET y a la validación previa de cada caso. La información regulatoria es de carácter general y no reemplaza la verificación caso a caso.'
            : 'Importer of Record, regulatory representation, and Merchant of Record services are structured through mandate agreements and are subject to approval by LET Group’s KYC & Compliance Division and prior case-by-case validation. Regulatory information is general in nature and does not replace case-specific verification.'}
        </p>
      </div>
    </footer>
  )
}

