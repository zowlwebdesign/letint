import type { Metadata } from 'next'
import { client } from '../../../sanity/lib/client'
import { INDUSTRY_PAGE_QUERY, SITE_SETTINGS_QUERY } from '../../../sanity/lib/queries'
import { urlForImage } from '../../../sanity/lib/image'
import { getMergedSolarData, solarDataEs } from '../../../lib/solar-data'

import Navbar from '../../../components/Navbar'
import IndustryFooter from '../../../components/industries/IndustryFooter'
import IndustryHero from '../../../components/industries/IndustryHero'
import SolutionsSection from '../../../components/industries/SolutionsSection'
import WarrantyCycleTimeline from '../../../components/industries/WarrantyCycleTimeline'
import CapabilitiesGrid from '../../../components/industries/CapabilitiesGrid'
import RegulationRetie from '../../../components/industries/RegulationRetie'
import ReferenceCaseMetrics from '../../../components/industries/ReferenceCaseMetrics'
import SolarContactForm from '../../../components/industries/SolarContactForm'
import CookieConsentBanner from '../../../components/CookieConsentBanner'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  let industryDoc: any = null
  let siteSettings: any = null

  try {
    const [doc, settings] = await Promise.all([
      client.fetch(INDUSTRY_PAGE_QUERY, { slug: 'energia-solar' }),
      client.fetch(SITE_SETTINGS_QUERY),
    ])
    industryDoc = doc
    siteSettings = settings
  } catch (e) {
    // Graceful fallback to static data
  }

  const rawTitle = industryDoc?.seoAndSocial?.metaTitle
  const title =
    (typeof rawTitle === 'string' ? rawTitle : rawTitle?.es) || solarDataEs.meta.title

  const rawDesc = industryDoc?.seoAndSocial?.metaDescription
  const description =
    (typeof rawDesc === 'string' ? rawDesc : rawDesc?.es) || solarDataEs.meta.description

  const ogImageUrl = industryDoc?.seoAndSocial?.ogImageUrl
    ? industryDoc.seoAndSocial.ogImageUrl
    : siteSettings?.ogImage
    ? urlForImage(siteSettings.ogImage)?.url()
    : 'https://letintl.com/Logo_let.webp'

  return {
    title,
    description,
    keywords: [
      'RETIE 2024 Colombia',
      'Titularidad RETIE Inversores',
      'Importador de Record Solar Colombia',
      'IOR Fotovoltaico Colombia',
      'Garantías Inversores Solares Colombia',
      'BESS Almacenamiento Baterías Colombia',
      'Custodia FSL Repuestos Fotovoltaicos',
      'Logística Inversa Solar Colombia',
      'LET Pro Energía Solar',
      'Perfeccionamiento Pasivo DIAN Inversores',
      'Cumplimiento SIC Fotovoltaico',
      'Despliegue Repuestos Parque Solar Colombia',
      'Mandato Comercial Aduanas Colombia',
    ],
    alternates: {
      canonical: 'https://letintl.com/industrias/energia-solar',
      languages: {
        'es-CO': 'https://letintl.com/industrias/energia-solar',
        'es': 'https://letintl.com/industrias/energia-solar',
        'en': 'https://letintl.com/industrias/energia-solar',
        'en-US': 'https://letintl.com/industrias/energia-solar',
        'x-default': 'https://letintl.com/industrias/energia-solar',
      },
    },
    openGraph: {
      title,
      description,
      url: 'https://letintl.com/industrias/energia-solar',
      siteName: 'LET Pro | Grupo LET',
      locale: 'es_CO',
      alternateLocale: ['en_US'],
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          type: 'image/jpeg',
          alt: 'LET Pro — Soluciones de Posventa, Garantías RETIE 2024 e IOR Solar en Colombia',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function SolarIndustryPage() {
  let industryDoc: any = null
  let siteSettings: any = null

  try {
    const [doc, settings] = await Promise.all([
      client.fetch(INDUSTRY_PAGE_QUERY, { slug: 'energia-solar' }),
      client.fetch(SITE_SETTINGS_QUERY),
    ])
    industryDoc = doc
    siteSettings = settings
  } catch (e) {
    // Graceful fallback to static data
  }

  const data = getMergedSolarData(industryDoc, 'es')

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://letintl.com/industrias/energia-solar#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: 'https://letintl.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Industrias',
            item: 'https://letintl.com/#industrias',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Energía Solar & Almacenamiento (BESS)',
            item: 'https://letintl.com/industrias/energia-solar',
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': 'https://letintl.com/industrias/energia-solar#webpage',
        url: 'https://letintl.com/industrias/energia-solar',
        name: data.meta.title,
        description: data.meta.description,
        inLanguage: ['es-CO', 'en-US'],
        isPartOf: {
          '@id': 'https://letintl.com/#website',
        },
        breadcrumb: {
          '@id': 'https://letintl.com/industrias/energia-solar#breadcrumb',
        },
        about: [
          { '@type': 'Thing', name: 'Energía solar fotovoltaica' },
          { '@type': 'Thing', name: 'Sistemas BESS de almacenamiento' },
          { '@type': 'Thing', name: 'Reglamento Técnico RETIE 2024' },
          { '@type': 'Thing', name: 'Importer of Record (IOR)' },
          { '@type': 'Thing', name: 'Logística de garantías FSL' },
        ],
      },
      {
        '@type': 'Service',
        '@id': 'https://letintl.com/industrias/energia-solar#service-retie',
        name: 'Titularidad de Certificados RETIE 2024 y Representación Regulatoria',
        serviceType: 'Homologación y Cumplimiento Regulatorio Técnico',
        description:
          'Gestión, mantenimiento y titularidad legal de certificados de conformidad RETIE 2024 ante organismos acreditados (ONAC) y la SIC en Colombia para fabricantes de inversores, paneles y BESS sin filial local.',
        provider: {
          '@id': 'https://letintl.com/#organization',
        },
        areaServed: {
          '@type': 'Country',
          name: 'Colombia',
        },
      },
      {
        '@type': 'Service',
        '@id': 'https://letintl.com/industrias/energia-solar#service-ior',
        name: 'Importador y Exportador de Record (IOR / EOR) Fotovoltaico',
        serviceType: 'Agenciamiento Aduanero y Comercio Exterior',
        description:
          'Representación legal y fiscal como Importador y Exportador de Record en Colombia para el ingreso seguro de inversores centrales/string, baterías de litio LFP y contenedores BESS bajo normativas DIAN.',
        provider: {
          '@id': 'https://letintl.com/#organization',
        },
        areaServed: {
          '@type': 'Country',
          name: 'Colombia',
        },
      },
      {
        '@type': 'Service',
        '@id': 'https://letintl.com/industrias/energia-solar#service-fsl',
        name: 'Hub FSL de Posventa, Stock de Garantías y Repuestos Críticos',
        serviceType: 'Logística Inversa y Custodia FSL',
        description:
          'Custodia de stock de contingencia FSL (Field Service Logistics) con trazabilidad por número de serie, reemplazo swap de inversores dañados y reexportación bajo régimen de perfeccionamiento pasivo DIAN sin duplicar tributos.',
        provider: {
          '@id': 'https://letintl.com/#organization',
        },
        areaServed: {
          '@type': 'Country',
          name: 'Colombia',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://letintl.com/industrias/energia-solar#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: '¿Cómo puede un fabricante internacional mantener certificados RETIE 2024 sin filial en Colombia?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A través de un contrato de mandato comercial y representación legal con LET Pro. LET Pro figura como titular o cotitular del certificado ante los organismos certificadores acreditados por la ONAC y la SIC, mientras que el fabricante conserva el 100% de la propiedad intelectual de su marca y sus productos sin tener que transferirlos a un distribuidor.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Qué ventajas ofrece el rol de Importador de Record (IOR) en proyectos solares y BESS?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Permite al fabricante o EPC internacional importar paneles, inversores y contenedores BESS a Colombia cumpliendo todas las regulaciones aduaneras de la DIAN sin tener que constituir una sociedad colombiana ni asumir riesgos tributarios permanentes.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Cómo funciona la reposición por garantía de inversores sin pagar impuestos de importación dos veces?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'LET Pro opera bajo el régimen de perfeccionamiento pasivo y la figura de reposición por garantía de la DIAN: despacha de inmediato una unidad funcional desde el stock FSL en Colombia al parque solar, e ingresa el inversor averiado para su reexportación y reparación en fábrica sin liquidar aranceles ni IVA adicionales.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Qué productos y tecnologías solares están cubiertos por los servicios de LET Pro?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Inversores string y centrales fotovoltaicos, paneles solares monocristalinos y bifaciales, controladores de carga MPPT, sistemas de monitoreo SCADA, baterías LFP (litio ferrofosfato) y sistemas de almacenamiento energético en contenedores BESS para proyectos Utility-Scale y C&I.',
            },
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <a href="#main-content" className="skipLink">
        Saltar al contenido principal
      </a>

      {/* Global Site Navbar (Reused) */}
      <Navbar data={siteSettings} variant="industry" activeItem="Industrias" lang="es" />

      <main id="main-content">
        {/* Bloque 1: Hero & Comparativa + 4 Pilares */}
        <IndustryHero data={data.hero} lang="es" />

        {/* Bloque 2: Las 5 Soluciones en Grilla */}
        <SolutionsSection
          data={data.solutions}
          lang="es"
          variant="grid"
          title={data.solutionsTitle}
          intro={data.solutionsIntro}
          customCard={data.customSolutionCard}
        />

        {/* Bloque 3: Solución 01 en Detalle (Ciclo de Garantías en 6 pasos + Callout DIAN) */}
        <WarrantyCycleTimeline
          steps={data.featuredSolutionFlow.steps}
          lang="es"
          title={data.featuredSolutionFlow.title}
          subheadline={data.featuredSolutionFlow.subheadline}
          callout={data.featuredSolutionFlow.callout}
        />

        {/* Bloque 4: Capacidades Operativas (8 Siglas) */}
        <CapabilitiesGrid
          capabilities={data.operationalCapabilities}
          lang="es"
        />

        {/* Bloque 5: Regulación RETIE 2024 + Checklist Pre-embarque */}
        <RegulationRetie
          data={data.regulation}
          lang="es"
        />

        {/* Bloque 6: Caso de Referencia Confidencial + 4 Métricas */}
        <ReferenceCaseMetrics
          data={data.caseStudy}
          lang="es"
        />

        {/* Bloque 7: Formulario de Contacto B2B Completo */}
        <SolarContactForm
          variant="full"
          lang="es"
        />
      </main>

      {/* Global Site Footer */}
      <IndustryFooter lang="es" />

      {/* Cookie Consent Banner */}
      <CookieConsentBanner lang="es" />
    </>
  )
}
