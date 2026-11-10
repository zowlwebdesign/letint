import { urlForImage } from '../sanity/lib/image'
import { looksSpanish } from './english-guard'

export interface TrustBadge {
  title: string
  description: string
}

export interface HeroData {
  tags: string[]
  headline: string
  subheadline: string
  manufacturerKeepsTitle?: string
  manufacturerKeeps: string[]
  letProAssumesTitle?: string
  letProAssumes: string[]
  trustBadges: TrustBadge[]
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  backgroundImage?: any
  statNumber?: string
  statLabel?: string
}

export interface SolutionData {
  number: string
  badge: string
  title: string
  whenApplies: string
  industryApplication: string
  capabilityTags: string[]
  footnote?: string
}

export interface WarrantyStep {
  stepNumber: string
  title: string
  description: string
}

export interface FeaturedSolutionFlow {
  title: string
  subheadline: string
  steps: WarrantyStep[]
  callout: {
    title: string
    description: string
  }
}

export interface Capability {
  code: string
  title: string
  description: string
}

export interface RegulationData {
  title: string
  description: string
  checklistTitle: string
  checklistItems: string[]
}

export interface CaseStudyMetric {
  value: string
  label: string
}

export interface CaseStudyData {
  badge: string
  title: string
  problemDescription: string
  solutionDescription: string
  metrics: CaseStudyMetric[]
}

export interface OtherIndustryItem {
  id: string
  title: string
  badge: string
  badgeType: 'current' | 'upcoming'
  description: string
  href?: string
}

export interface SolarPageData {
  lang: 'es' | 'en'
  meta: {
    title: string
    description: string
  }
  hero: HeroData
  solutionsTitle?: string
  solutionsIntro: string
  solutions: SolutionData[]
  customSolutionCard: {
    title: string
    description: string
    badge: string
    ctaText: string
    ctaHref: string
  }
  featuredSolutionFlow: FeaturedSolutionFlow
  operationalCapabilities: Capability[]
  regulation: RegulationData
  caseStudy: CaseStudyData
  otherIndustries: {
    title: string
    subtitle: string
    items: OtherIndustryItem[]
  }
  legalDisclaimer: string
}

export const solarDataEs: SolarPageData = {
  lang: 'es',
  meta: {
    title: 'LET Pro — Soluciones de Posventa, Garantías RETIE 2024 e IOR Solar en Colombia',
    description:
      'Soluciones para fabricantes fotovoltaicos: posventa, garantías RETIE 2024, importador/exportador de record (IOR/EOR) y custodia FSL sin filial local.',
  },
  hero: {
    tags: ['PANELES', 'INVERSORES', 'BATERÍAS', 'BESS'],
    headline: 'Usted conserva la marca, el producto y el cliente. LET Pro es su brazo legal y operativo en Colombia.',
    subheadline:
      'Soluciones para fabricantes del sector solar que necesitan cumplir garantías, sostener certificados, enviar muestras o desplegar equipos en Colombia, sin constituir una sociedad local y sin ceder el control a un distribuidor.',
    backgroundImage: '/images/solar-hero-bg.jpg',
    statNumber: '18+',
    statLabel: 'Años de operación en Colombia · Desde 2006',
    manufacturerKeeps: [
      'La titularidad de su marca y de sus certificados',
      'La propiedad de sus equipos y repuestos',
      'La relación directa con sus clientes y distribuidores',
    ],
    letProAssumes: [
      'La representación ante DIAN, SIC y organismos RETIE',
      'El rol de importador y exportador de record (IOR / EOR)',
      'La operación física, custodia FSL y trazabilidad por serie',
    ],
    primaryCta: {
      label: 'Solicitar una revisión de su operación',
      href: '#contacto',
    },
    secondaryCta: {
      label: 'Ver las cinco soluciones',
      href: '#soluciones',
    },
    trustBadges: [
      {
        title: 'Desde 2006',
        description: 'Respaldo de LET Logistics, grupo logístico colombiano con operación propia.',
      },
      {
        title: 'Agencia de aduanas',
        description: 'Nacionalización y regímenes especiales ejecutados dentro del mismo grupo.',
      },
      {
        title: 'Operación activa',
        description: 'Programa de posventa vigente para una importante empresa global del sector PV.',
      },
      {
        title: 'Red WFA',
        description: 'Miembro de World Freight Alliance para la coordinación en origen.',
      },
    ],
  },
  solutionsIntro:
    'Pueden contratarse por separado o encadenarse a medida que crece la operación: de las muestras al certificado, del certificado a la venta, de la venta a la posventa.',
  solutions: [
    {
      number: '01',
      badge: 'Solución insignia',
      title: 'Programa de posventa y garantías',
      whenApplies:
        'El fabricante vende a través de distribuidores y debe cumplir garantías de largo plazo sin depender de ellos para su operación de posventa.',
      industryApplication:
        'Inversores y baterías con garantías de 10 años o más, reemplazos en días y no en semanas, y control de la información de fallas por número de serie.',
      capabilityTags: ['IOR', 'EOR', 'FSL', 'SN', 'RMA'],
    },
    {
      number: '02',
      badge: 'Cumplimiento normativo',
      title: 'Titular regulatorio en Colombia',
      whenApplies:
        'El producto requiere certificado o registro local y el fabricante no quiere ceder esa titularidad a un distribuidor.',
      industryApplication:
        'Titularidad del certificado de conformidad RETIE ante el organismo certificador, y autorización de importadores y distribuidores bajo control de la marca.',
      capabilityTags: ['ICR', 'RETIE', 'SIC', 'INVIMA'],
    },
    {
      number: '03',
      badge: 'Desarrollo comercial',
      title: 'Muestras, demostraciones y prototipos',
      whenApplies:
        'El fabricante envía unidades a prospectos o socios que no están registrados como importadores.',
      industryApplication:
        'Equipos para pruebas técnicas, prototipos, estudios de factibilidad y ferias, con retorno a origen o nacionalización si el cliente compra.',
      capabilityTags: ['IOR', 'EOR', 'PROTOTYPE', 'TESTING'],
    },
    {
      number: '04',
      badge: 'Entrega llave en mano',
      title: 'Venta directa con entrega en destino',
      whenApplies:
        'El cliente final quiere comprar al fabricante y recibir en su sede, sin ocuparse de aduana, tributos ni logística.',
      industryApplication:
        'Venta a EPC, industrias o proyectos específicos, con facturación local, nacionalización y entrega en obra.',
      capabilityTags: ['IOR', 'EOR', 'MoR', 'DDP'],
      footnote: 'Sujeto a validación previa del caso',
    },
    {
      number: '05',
      badge: 'Energía como servicio',
      title: 'Equipos propios en sede del cliente',
      whenApplies:
        'El fabricante presta un servicio bajo contrato y el equipo sigue siendo de su propiedad mientras opera en las instalaciones del cliente.',
      industryApplication:
        'Sistemas de almacenamiento, monitoreo o generación en esquemas de energía como servicio, bajo la figura de comodato, con trazabilidad y retiro al final del contrato.',
      capabilityTags: ['SN', 'ICR', 'SLA', 'BESS'],
    },
  ],
  customSolutionCard: {
    title: '¿Su caso no encaja exactamente en una de estas cinco?',
    description:
      'Las soluciones se diseñan sobre los mismos componentes. Una revisión inicial define la combinación correcta para su operación.',
    badge: 'Estructuración caso a caso',
    ctaText: 'Describir mi caso',
    ctaHref: '#contacto',
  },
  featuredSolutionFlow: {
    title:
      'Cuando un inversor falla, el reemplazo ya está en Colombia, y la unidad dañada vuelve reparada sin pagar tributos otra vez.',
    subheadline:
      'El ciclo completo de una garantía, operado por un solo responsable y documentado unidad por unidad.',
    steps: [
      {
        stepNumber: '01',
        title: 'Falla reportada',
        description: 'El fabricante aprueba la garantía e indica la unidad de reemplazo.',
      },
      {
        stepNumber: '02',
        title: 'Reemplazo desde stock local',
        description: 'Salida por número de serie desde la custodia en Colombia (FSL).',
      },
      {
        stepNumber: '03',
        title: 'Entrega y recolección',
        description:
          'Entrega al instalador o usuario final y retiro de la unidad dañada, con registro de su serie.',
      },
      {
        stepNumber: '04',
        title: 'Exportación temporal',
        description:
          'Salida de la parte o el equipo dañado a fábrica para reparación o reemplazo, con LET Pro como exportador de record.',
      },
      {
        stepNumber: '05',
        title: 'Reimportación sin nuevos tributos',
        description:
          'Retorno de la unidad reparada o de reemplazo sin un nuevo pago de tributos aduaneros, en los términos de la regulación aduanera.',
      },
      {
        stepNumber: '06',
        title: 'Reposición del stock',
        description: 'La unidad reingresa a la custodia local, lista para la siguiente garantía.',
      },
    ],
    callout: {
      title: 'El compromiso ante la aduana lo asume LET Pro',
      description:
        'LET Pro constituye y responde ante la DIAN por el compromiso de retorno de la parte o el equipo reparado o de reemplazo. El fabricante no necesita entidad local ni garantías aduaneras propias para operar su posventa en Colombia.',
    },
  },
  operationalCapabilities: [
    {
      code: 'ICR',
      title: 'Representación regulatoria y aduanera',
      description: 'DIAN, organismos RETIE, SIC y MinCIT/VUCE.',
    },
    {
      code: 'SN',
      title: 'Inventario por número de serie',
      description: 'Trazabilidad unidad por unidad en todo el ciclo.',
    },
    {
      code: 'IOR / EOR',
      title: 'Importador y exportador de record',
      description: 'Envíos sin valor comercial, temporales y de retorno.',
    },
    {
      code: 'INBOUND',
      title: 'Logística de entrada y nacionalización',
      description: 'De origen a bodega, con recepción documentada y verificación técnica.',
    },
    {
      code: 'FSL',
      title: 'Custodia de stock en destino',
      description: 'Equipos y repuestos listos en Colombia para despacho inmediato.',
    },
    {
      code: 'XDOCK',
      title: 'Cross-docking',
      description: 'Transferencia directa a distribuidores y proyectos sin almacenamiento prolongado.',
    },
    {
      code: 'UNIT',
      title: 'Distribución por unidad',
      description: 'Despacho nacional con prueba de entrega (POD) por serie.',
    },
    {
      code: 'RMA',
      title: 'Logística de reversa',
      description: 'Recolección, diagnóstico preliminar, consolidación y retorno a fábrica.',
    },
  ],
  regulation: {
    title: 'RETIE 2024: sin certificado de conformidad, el equipo no se nacionaliza.',
    description:
      'Desde la Resolución 40117 de 2024, los inversores para sistemas fotovoltaicos, los paneles de 100 W o más y los controladores de baterías solares requieren certificado de conformidad de producto para importarse y comercializarse en Colombia. Quién figura como titular de ese certificado define quién controla la entrada de la marca al país. Con LET Pro como titular regulatorio, ese control permanece en el fabricante.',
    checklistTitle: 'Antes de embarcar, se verifica:',
    checklistItems: [
      'Certificado RETIE vigente y su alcance por referencia.',
      'Clasificación arancelaria y tributos aplicables.',
      'Régimen aduanero adecuado: definitivo, temporal o de retorno.',
      'Licencias o excepciones ante MinCIT/VUCE.',
      'Requisitos para baterías de litio como mercancía peligrosa.',
      'Elegibilidad de incentivos de la Ley 1715 con certificado UPME.',
    ],
  },
  caseStudy: {
    badge: 'CASO DE REFERENCIA CONFIDENCIAL',
    title: 'Importante empresa global del sector PV',
    problemDescription:
      'Con varios años de presencia en Colombia a través de distribuidores y garantías de hasta 10 años, la marca operaba su posventa por medio de uno de ellos, perdiendo visibilidad del stock, de los tiempos reales de reemplazo y de las fallas reportadas.',
    solutionDescription:
      'Con LET Pro, la marca recuperó el control de su posventa: stock propio en Colombia, inventario por número de serie, reemplazos directos en días y retorno documentado de unidades a fábrica para su análisis, sin constituir sociedad local ni depender de su distribuidor.',
    metrics: [
      { value: '24+', label: 'referencias en custodia' },
      { value: '18+', label: 'ciudades atendidas' },
      { value: '48h', label: 'tiempo promedio de reemplazo' },
      { value: '99.8%', label: 'exactitud de inventario' },
    ],
  },
  otherIndustries: {
    title: 'Las mismas soluciones, aplicadas a cada industria.',
    subtitle:
      'Cada industria tiene su propia regulación y su propio ciclo de posventa. Los componentes son los mismos; cambia la forma de combinarlos.',
    items: [
      {
        id: 'energia-solar',
        title: 'Energía solar y almacenamiento',
        badge: 'Esta página',
        badgeType: 'current',
        description:
          'Paneles, inversores, baterías y BESS: RETIE, garantías de largo plazo y stock local por número de serie.',
        href: '/industrias/energia-solar',
      },
      {
        id: 'salud',
        title: 'Dispositivos regulados y salud',
        badge: 'Próximamente',
        badgeType: 'upcoming',
        description:
          'Productos sujetos a reglamentos técnicos de la SIC o a INVIMA: titularidad regulatoria, muestras para demostración y venta directa a clínicas y hospitales.',
        href: '#',
      },
      {
        id: 'ti',
        title: 'TI y telecomunicaciones',
        badge: 'Próximamente',
        badgeType: 'upcoming',
        description:
          'Equipos de alto valor para bancos, BPO y centros de datos: equipos propios en sede del cliente, stock de repuestos para SLA y retiro al fin del contrato.',
        href: '#',
      },
    ],
  },
  legalDisclaimer:
    'Grupo LET: LET Logistics · LET Pro (LET Procurement S.A.S.) · Agencia de Aduanas LET Logistics. Los servicios de importación y exportación de record, representación y Merchant of Record se estructuran mediante contratos de mandato y están sujetos a la aprobación de la División de KYC y Cumplimiento del Grupo LET y a la validación previa de cada caso. La información regulatoria es de carácter general y no reemplaza la verificación caso a caso.',
}

export const solarDataEn: SolarPageData = {
  lang: 'en',
  meta: {
    title: 'Solar Energy & Energy Storage (BESS) in Colombia | LET Pro',
    description:
      'Operational and legal solutions for solar manufacturers: warranty fulfillment, RETIE 2024 compliance, Importer/Exporter of Record (IOR/EOR), and local FSL inventory.',
  },
  hero: {
    tags: ['PANELS', 'INVERTERS', 'BATTERIES', 'BESS'],
    headline: 'You keep the brand, the product, and the customer. LET Pro is your legal and operating arm in Colombia.',
    subheadline:
      'Every hour an inverter is down costs your customer lost generation and costs you warranty credibility. LET Pro eliminates prolonged downtime with swap-ready stock in Colombia and manages the full RMA cycle—collection, temporary export, re-importation, and restocking—without you needing a local entity or depending on a distributor.',
    backgroundImage: '/images/solar-hero-bg.jpg',
    statNumber: '18+',
    statLabel: 'Years of operation in Colombia · Since 2006',
    manufacturerKeeps: [
      'Ownership of your brand and certificates',
      'Ownership of your equipment and spare parts',
      'Direct relationship with your customers and distributors',
    ],
    letProAssumes: [
      'Representation before DIAN, SIC, and RETIE certification bodies',
      'The role of Importer and Exporter of Record (IOR / EOR)',
      'Physical operations, FSL custody, and serial traceability',
    ],
    primaryCta: {
      label: 'Request an operation review',
      href: '#contacto',
    },
    secondaryCta: {
      label: 'See the five solutions',
      href: '#soluciones',
    },
    trustBadges: [
      {
        title: 'Since 2006',
        description: 'Backed by LET Logistics, Colombian logistics group with proprietary operations.',
      },
      {
        title: 'Customs Brokerage',
        description: 'Customs clearance and special regimes executed within the same corporate group.',
      },
      {
        title: 'Active Operation',
        description: 'Active after-sales warranty program for a leading global PV manufacturer.',
      },
      {
        title: 'WFA Network',
        description: 'Member of the World Freight Alliance for origin coordination.',
      },
    ],
  },
  solutionsIntro:
    'They can be deployed independently or linked as operations expand: from samples to certification, from certification to sales, and from sales to warranty fulfillment.',
  solutions: [
    {
      number: '01',
      badge: 'Flagship Solution',
      title: 'After-Sales & Warranty Program',
      whenApplies:
        'The manufacturer sells through distributors and must fulfill long-term inverter warranties without depending on them—each day of downtime means lost solar generation for the end customer and eroded brand credibility.',
      industryApplication:
        'Swap-ready inverter stock staged in Colombia (FSL). Replacement dispatched by serial number within 48 h of approval. Defective unit collected, exported, and re-imported duty-free. Complete RMA cycle from failure report to restocked buffer—managed end-to-end by a single accountable partner.',
      capabilityTags: ['IOR', 'EOR', 'FSL', 'SN', 'RMA'],
    },
    {
      number: '02',
      badge: 'Regulatory Compliance',
      title: 'Regulatory Holder in Colombia',
      whenApplies:
        'The product requires a local certificate or registry and the manufacturer does not want to yield ownership to a distributor.',
      industryApplication:
        'Holding the RETIE certificate of conformity before accredited certification bodies, authorizing importers and distributors strictly under brand control.',
      capabilityTags: ['ICR', 'RETIE', 'SIC', 'INVIMA'],
    },
    {
      number: '03',
      badge: 'Commercial Expansion',
      title: 'Samples, Demos & Prototypes',
      whenApplies:
        'The manufacturer ships units to prospects or partners who are not registered importers.',
      industryApplication:
        'Equipment for technical testing, prototype validations, feasibility studies, and trade expos, with return to origin or customs clearance if the client purchases.',
      capabilityTags: ['IOR', 'EOR', 'PROTOTYPE', 'TESTING'],
    },
    {
      number: '04',
      badge: 'Turnkey Delivery',
      title: 'Direct Drop-Ship / Delivery at Place',
      whenApplies:
        'The end customer wants to purchase directly from the manufacturer and receive on-site without handling customs, duties, or local freight.',
      industryApplication:
        'Direct sales to EPCs, industrial clients, or utility projects with local invoicing, customs clearance, and job-site delivery.',
      capabilityTags: ['IOR', 'EOR', 'MoR', 'DDP'],
      footnote: 'Subject to prior case validation',
    },
    {
      number: '05',
      badge: 'Energy as a Service',
      title: 'Manufacturer-Owned Equipment at Client Site',
      whenApplies:
        'The manufacturer provides a service under contract and retains equipment ownership while operating at the client’s facility.',
      industryApplication:
        'Storage, monitoring, or generation systems deployed under energy-as-a-service or bailment (comodato) agreements, with complete serial traceability and retrieval upon contract end.',
      capabilityTags: ['SN', 'ICR', 'SLA', 'BESS'],
    },
  ],
  customSolutionCard: {
    title: 'Does your case not fit neatly into one of these five?',
    description:
      'Our solutions are engineered from the same operational building blocks. An initial review determines the exact combination for your model.',
    badge: 'Tailored Case Design',
    ctaText: 'Describe my case',
    ctaHref: '#contacto',
  },
  featuredSolutionFlow: {
    title:
      'When an inverter fails, the replacement is already in Colombia—and the defective unit returns repaired without repaying customs duties.',
    subheadline:
      'Zero distributor dependency. Zero new duty payments. The complete RMA cycle, operated by a single accountable partner and documented serial by serial.',
    steps: [
      {
        stepNumber: '01',
        title: 'Failure Reported',
        description: 'The manufacturer approves the warranty claim and specifies the replacement unit.',
      },
      {
        stepNumber: '02',
        title: 'Replacement from Local Stock',
        description: 'Immediate dispatch by serial number from forward stock custody in Colombia (FSL).',
      },
      {
        stepNumber: '03',
        title: 'Delivery & Collection',
        description:
          'Delivery to installer or site owner and simultaneous pickup of defective unit, recording serial number.',
      },
      {
        stepNumber: '04',
        title: 'Temporary Export',
        description:
          'Defective unit outbound dispatch to factory for repair/replacement, with LET Pro as Exporter of Record (EOR).',
      },
      {
        stepNumber: '05',
        title: 'Duty-Free Re-importation',
        description:
          'Return of repaired or replacement unit without repayment of customs duties, under compliant return regimes.',
      },
      {
        stepNumber: '06',
        title: 'Stock Replenishment',
        description: 'The unit re-enters local custody inventory, restocked and ready for the next warranty event.',
      },
    ],
    callout: {
      title: 'Customs accountability is assumed by LET Pro',
      description:
        'LET Pro files and guarantees before DIAN the legal return commitment for the repaired or replacement unit. The manufacturer requires neither a Colombian subsidiary nor local customs collateral to fulfill warranties.',
    },
  },
  operationalCapabilities: [
    {
      code: 'ICR',
      title: 'Regulatory & Customs Representation',
      description: 'DIAN, RETIE certification bodies, SIC, and MinCIT/VUCE.',
    },
    {
      code: 'SN',
      title: 'Serial Number Inventory',
      description: 'Unit-by-unit end-to-end traceability across storage and transport.',
    },
    {
      code: 'IOR / EOR',
      title: 'Importer & Exporter of Record',
      description: 'Non-commercial, temporary, replacement, and warranty return shipments.',
    },
    {
      code: 'INBOUND',
      title: 'Inbound Freight & Customs Clearance',
      description: 'Origin to warehouse with documented intake, inspection, and formal clearance.',
    },
    {
      code: 'FSL',
      title: 'Forward Stocking Location (FSL)',
      description: 'Strategic spare parts and finished units staged locally for rapid dispatch.',
    },
    {
      code: 'XDOCK',
      title: 'Cross-Docking',
      description: 'Direct staging and handoff to EPCs and distributors without long-term holding.',
    },
    {
      code: 'UNIT',
      title: 'Unit-Level Distribution',
      description: 'Nationwide dispatch with serial-recorded proof of delivery.',
    },
    {
      code: 'RMA',
      title: 'Reverse Logistics (RMA)',
      description: 'Field collection, consolidation, and compliant export back to factory.',
    },
  ],
  regulation: {
    title: 'RETIE 2024: without a certificate of conformity, equipment cannot clear customs.',
    description:
      'Under Resolution 40117 of 2024, PV inverters, solar panels of 100 W or more, and solar battery controllers require a certificate of product conformity to enter and be commercialized in Colombia. Whomever holds that certificate controls brand entry into the country. With LET Pro as regulatory holder, that control stays strictly in the manufacturer’s hands.',
    checklistTitle: 'Pre-shipment verification checklist:',
    checklistItems: [
      'Valid RETIE certificate and verified scope per SKU/model.',
      'HS tariff classification and applicable taxes/duties.',
      'Proper customs regime: definitive, temporary, or return.',
      'Import licenses or exemptions via MinCIT/VUCE.',
      'Lithium battery hazardous material (HAZMAT) compliance.',
      'Clean energy tax incentive eligibility under Law 1715 with UPME certification.',
    ],
  },
  caseStudy: {
    badge: 'CONFIDENTIAL REFERENCE CASE',
    title: 'Leading global PV manufacturer',
    problemDescription:
      'With several years in Colombia via distributors and warranties of up to 10 years, the brand previously managed after-sales through a third-party distributor, losing visibility over staged inventory, actual SLA response times, and failure diagnostics.',
    solutionDescription:
      'With LET Pro, the manufacturer regained complete control: dedicated stock staged in Colombia, serial-level inventory tracking, direct field replacements in days, and compliant factory return of failed units, all without establishing a local subsidiary or distributor dependency.',
    metrics: [
      { value: '24+', label: 'SKUs in custody' },
      { value: '18+', label: 'cities served' },
      { value: '48h', label: 'average replacement time' },
      { value: '99.8%', label: 'inventory accuracy' },
    ],
  },
  otherIndustries: {
    title: 'The same solutions, applied across industries.',
    subtitle:
      'Each industry has its own regulatory framework and after-sales cycle. The core components remain consistent; what changes is how they are tailored.',
    items: [
      {
        id: 'energia-solar',
        title: 'Solar Energy & Storage',
        badge: 'Current page',
        badgeType: 'current',
        description:
          'Panels, inverters, batteries, and BESS: RETIE compliance, long-term warranties, and local serial-tracked inventory.',
        href: '/industrias/energia-solar',
      },
      {
        id: 'salud',
        title: 'Regulated Devices & Healthcare',
        badge: 'Coming soon',
        badgeType: 'upcoming',
        description:
          'Products subject to SIC technical regulations or INVIMA: regulatory holding, clinical demo samples, and direct delivery to hospitals.',
        href: '#',
      },
      {
        id: 'ti',
        title: 'IT & Telecommunications',
        badge: 'Coming soon',
        badgeType: 'upcoming',
        description:
          'Mission-critical equipment for banks, BPOs, and data centers: manufacturer-owned client site deployments, SLA spares, and contract-end recovery.',
        href: '#',
      },
    ],
  },
  legalDisclaimer:
    'LET Group: LET Logistics · LET Pro (LET Procurement S.A.S.) · LET Logistics Customs Brokerage. Importer and Exporter of Record, regulatory representation, and Merchant of Record services are structured through mandate agreements and are subject to approval by LET Group’s KYC & Compliance Division and prior case-by-case validation. Regulatory information is general in nature and does not replace case-specific verification.',
}

/**
 * Resolve a CMS value for the requested language.
 * - Localized objects ({ en, es }) use the matching key.
 * - Plain strings are used as-is, except in English mode when they look like
 *   Spanish source text: then the English fallback copy wins, so the site
 *   never shows mixed languages.
 */
function pickStr(val: any, fallback: string = '', lang: 'es' | 'en' = 'en'): string {
  if (val === undefined || val === null || val === '') return fallback
  if (typeof val === 'object') {
    const picked = lang === 'en' ? val.en : val.es || val.en
    return typeof picked === 'string' && picked ? (lang === 'en' && looksSpanish(picked) ? fallback : picked) : fallback
  }
  const str = String(val)
  if (lang === 'en' && looksSpanish(str)) return fallback
  return str
}

function pickArr(val: any, fallback: string[] = [], lang: 'es' | 'en' = 'en'): string[] {
  if (!val) return fallback
  let items: string[] | null = null
  if (Array.isArray(val)) {
    items = val.map((item) =>
      typeof item === 'object' && item !== null ? item[lang] || item.text || item.en || item.es || '' : String(item)
    )
  } else if (typeof val === 'object' && Array.isArray(val[lang])) {
    items = val[lang]
  }
  if (!items || items.length === 0) return fallback
  if (lang === 'en' && items.some((i) => looksSpanish(i))) return fallback
  return items
}

export function getMergedSolarData(sanityDoc: any, lang: 'es' | 'en' = 'en'): SolarPageData {
  const fallback = lang === 'en' ? solarDataEn : solarDataEs
  if (!sanityDoc) return fallback

  const valStr = (val: any, fb: string = '') => pickStr(val, fb, lang)
  const valArr = (val: any, fb: string[] = []) => pickArr(val, fb, lang)
  const en = lang === 'en'

  const heroDoc = sanityDoc.hero || {}

  return {
    lang,
    meta: {
      title: valStr(sanityDoc.seoAndSocial?.metaTitle, fallback.meta.title),
      description: valStr(sanityDoc.seoAndSocial?.metaDescription, fallback.meta.description),
    },
    hero: {
      tags: valArr(sanityDoc.categoryTags, fallback.hero.tags),
      headline: valStr(heroDoc.headline, fallback.hero.headline).replace(
        /(?<!legal and )operating arm/i,
        'legal and operating arm'
      ),
      subheadline: valStr(heroDoc.subheadline, fallback.hero.subheadline),
      statNumber: valStr(heroDoc.statNumber, fallback.hero.statNumber || '18+'),
      statLabel: valStr(heroDoc.statLabel, fallback.hero.statLabel || 'Years of operation in Colombia · Since 2006'),
      manufacturerKeepsTitle: valStr(heroDoc.manufacturerKeepsTitle, en ? 'The Manufacturer Keeps' : 'El Fabricante Conserva'),
      manufacturerKeeps: valArr(heroDoc.manufacturerKeeps, fallback.hero.manufacturerKeeps),
      letProAssumesTitle: valStr(heroDoc.letProAssumesTitle, en ? 'LET Pro Assumes' : 'LET Pro Asume'),
      letProAssumes: valArr(heroDoc.letProAssumes, fallback.hero.letProAssumes),
      primaryCta: {
        label: valStr(heroDoc.primaryCtaLabel, fallback.hero.primaryCta.label),
        href: valStr(heroDoc.primaryCtaHref, fallback.hero.primaryCta.href),
      },
      secondaryCta: {
        label: valStr(heroDoc.secondaryCtaLabel, fallback.hero.secondaryCta.label),
        href: valStr(heroDoc.secondaryCtaHref, fallback.hero.secondaryCta.href),
      },
      backgroundImage: heroDoc.backgroundImage
        ? typeof heroDoc.backgroundImage === 'string'
          ? heroDoc.backgroundImage
          : urlForImage(heroDoc.backgroundImage)?.url() || fallback.hero.backgroundImage
        : fallback.hero.backgroundImage,
      trustBadges:
        Array.isArray(heroDoc.trustBadges) && heroDoc.trustBadges.length > 0
          ? heroDoc.trustBadges.map((b: any, idx: number) => ({
              title: valStr(b.title, fallback.hero.trustBadges[idx]?.title || ''),
              description: valStr(b.description, fallback.hero.trustBadges[idx]?.description || ''),
            }))
          : fallback.hero.trustBadges,
    },
    solutionsTitle: valStr(
      sanityDoc.solutionsTitle,
      en
        ? 'Each addresses a specific manufacturer challenge, not an isolated service.'
        : 'Cada una responde a una situación concreta del fabricante, no a un servicio aislado.'
    ),
    solutionsIntro: valStr(sanityDoc.solutionsIntro, fallback.solutionsIntro),
    solutions:
      Array.isArray(sanityDoc.solutions) && sanityDoc.solutions.length > 0
        ? sanityDoc.solutions.map((s: any, idx: number) => ({
            number: s.number || fallback.solutions[idx]?.number || `0${idx + 1}`,
            badge: valStr(s.badge, fallback.solutions[idx]?.badge || ''),
            title: valStr(s.title, fallback.solutions[idx]?.title || ''),
            whenApplies: valStr(s.whenApplies, fallback.solutions[idx]?.whenApplies || ''),
            industryApplication: valStr(s.industryApplication, fallback.solutions[idx]?.industryApplication || ''),
            capabilityTags: (s.capabilityTags || fallback.solutions[idx]?.capabilityTags || []).map((t: string) =>
              String(t).toUpperCase() === 'PILOT' ? 'PROTOTYPE' : t
            ),
            footnote: s.footnote ? valStr(s.footnote) : fallback.solutions[idx]?.footnote,
          }))
        : fallback.solutions,
    customSolutionCard: {
      title: valStr(sanityDoc.customSolutionCard?.title, fallback.customSolutionCard.title),
      description: valStr(sanityDoc.customSolutionCard?.description, fallback.customSolutionCard.description),
      badge: valStr(sanityDoc.customSolutionCard?.badge, fallback.customSolutionCard.badge),
      ctaText: valStr(sanityDoc.customSolutionCard?.ctaText, fallback.customSolutionCard.ctaText),
      ctaHref: valStr(sanityDoc.customSolutionCard?.ctaHref, fallback.customSolutionCard.ctaHref),
    },
    featuredSolutionFlow: {
      title: valStr(sanityDoc.featuredSolutionFlow?.title, fallback.featuredSolutionFlow.title),
      subheadline: valStr(sanityDoc.featuredSolutionFlow?.subheadline, fallback.featuredSolutionFlow.subheadline),
      steps:
        Array.isArray(sanityDoc.featuredSolutionFlow?.steps) && sanityDoc.featuredSolutionFlow.steps.length > 0
          ? sanityDoc.featuredSolutionFlow.steps.map((st: any, idx: number) => ({
              stepNumber: st.stepNumber || fallback.featuredSolutionFlow.steps[idx]?.stepNumber || `0${idx + 1}`,
              title: valStr(st.title, fallback.featuredSolutionFlow.steps[idx]?.title || ''),
              description: valStr(st.description, fallback.featuredSolutionFlow.steps[idx]?.description || ''),
            }))
          : fallback.featuredSolutionFlow.steps,
      callout: {
        title: valStr(
          sanityDoc.featuredSolutionFlow?.dianCommitmentCallout?.title ||
            sanityDoc.featuredSolutionFlow?.callout?.title,
          fallback.featuredSolutionFlow.callout.title
        ),
        description: valStr(
          sanityDoc.featuredSolutionFlow?.dianCommitmentCallout?.description ||
            sanityDoc.featuredSolutionFlow?.callout?.description,
          fallback.featuredSolutionFlow.callout.description
        ),
      },
    },
    operationalCapabilities:
      Array.isArray(sanityDoc.operationalCapabilities) && sanityDoc.operationalCapabilities.length > 0
        ? sanityDoc.operationalCapabilities.map((c: any, idx: number) => ({
            code: c.code || fallback.operationalCapabilities[idx]?.code || '',
            title: valStr(c.title, fallback.operationalCapabilities[idx]?.title || ''),
            description: valStr(c.description, fallback.operationalCapabilities[idx]?.description || ''),
          }))
        : fallback.operationalCapabilities,
    regulation: {
      title: valStr(sanityDoc.regulationSection?.title, fallback.regulation.title),
      description: valStr(sanityDoc.regulationSection?.description, fallback.regulation.description),
      checklistTitle: valStr(sanityDoc.regulationSection?.checklistTitle, fallback.regulation.checklistTitle),
      checklistItems: valArr(sanityDoc.regulationSection?.checklistItems, fallback.regulation.checklistItems),
    },
    caseStudy: {
      badge: valStr(sanityDoc.caseStudy?.badge, fallback.caseStudy.badge),
      title: valStr(sanityDoc.caseStudy?.title, fallback.caseStudy.title),
      problemDescription: valStr(sanityDoc.caseStudy?.problemDescription, fallback.caseStudy.problemDescription),
      solutionDescription: valStr(sanityDoc.caseStudy?.solutionDescription, fallback.caseStudy.solutionDescription),
      metrics:
        Array.isArray(sanityDoc.caseStudy?.metrics) && sanityDoc.caseStudy.metrics.length > 0
          ? sanityDoc.caseStudy.metrics.map((m: any, idx: number) => ({
              value: m.value || fallback.caseStudy.metrics[idx]?.value || '[X]',
              label: valStr(m.label, fallback.caseStudy.metrics[idx]?.label || ''),
            }))
          : fallback.caseStudy.metrics,
    },
    otherIndustries: fallback.otherIndustries,
    legalDisclaimer: fallback.legalDisclaimer,
  }
}

