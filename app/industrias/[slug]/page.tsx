import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '../../../sanity/lib/client'
import {
  INDUSTRY_PAGE_QUERY,
  SITE_SETTINGS_QUERY,
  ALL_INDUSTRIES_QUERY,
} from '../../../sanity/lib/queries'
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

export const revalidate = 60

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const industries = await client.fetch(ALL_INDUSTRIES_QUERY)
    if (Array.isArray(industries) && industries.length > 0) {
      return industries
        .filter((ind: any) => ind?.slug?.current)
        .map((ind: any) => ({ slug: ind.slug.current }))
    }
  } catch (e) {
    // Graceful fallback
  }
  return [{ slug: 'energia-solar' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  let industryDoc: any = null
  let siteSettings: any = null

  try {
    const [doc, settings] = await Promise.all([
      client.fetch(INDUSTRY_PAGE_QUERY, { slug }),
      client.fetch(SITE_SETTINGS_QUERY),
    ])
    industryDoc = doc
    siteSettings = settings
  } catch (e) {
    // Graceful fallback
  }

  if (!industryDoc && slug !== 'energia-solar') {
    return {
      title: 'Industria no encontrada | LET Pro',
      robots: { index: false, follow: false },
    }
  }

  const isSolar = slug === 'energia-solar'
  const fallbackTitle = isSolar
    ? solarDataEs.meta.title
    : `${industryDoc?.title || 'Industria'} en Colombia | LET Pro`
  const fallbackDescription = isSolar
    ? solarDataEs.meta.description
    : `Soluciones para fabricantes y marcas: logística especializada, representación IOR/EOR y cumplimiento en Colombia.`

  const rawTitle = industryDoc?.seoAndSocial?.metaTitle
  const title = (typeof rawTitle === 'string' ? rawTitle : rawTitle?.es) || fallbackTitle

  const rawDesc = industryDoc?.seoAndSocial?.metaDescription
  const description = (typeof rawDesc === 'string' ? rawDesc : rawDesc?.es) || fallbackDescription

  const ogImageUrl = industryDoc?.seoAndSocial?.ogImageUrl
    ? industryDoc.seoAndSocial.ogImageUrl
    : siteSettings?.ogImage
    ? urlForImage(siteSettings.ogImage)?.url()
    : 'https://letintl.com/Logo_let.webp'

  const canonicalUrl = `https://letintl.com/industrias/${slug}`

  return {
    title,
    description,
    keywords: [
      `${industryDoc?.title || 'Industria'} Colombia`,
      'Importador de Record Colombia',
      'IOR Colombia',
      'Cumplimiento Regulatorio Colombia',
      'Custodia FSL Repuestos',
      'Logística Inversa Colombia',
      'LET Pro',
      'Mandato Comercial Aduanas Colombia',
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'es-CO': canonicalUrl,
        es: canonicalUrl,
        en: canonicalUrl,
        'en-US': canonicalUrl,
        'x-default': canonicalUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
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
          alt: `${title} — LET Pro`,
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

export default async function IndustryDynamicPage({ params }: Props) {
  const { slug } = await params

  let industryDoc: any = null
  let siteSettings: any = null
  let allIndustries: any[] = []

  try {
    const [doc, settings, inds] = await Promise.all([
      client.fetch(INDUSTRY_PAGE_QUERY, { slug }),
      client.fetch(SITE_SETTINGS_QUERY),
      client.fetch(ALL_INDUSTRIES_QUERY),
    ])
    industryDoc = doc
    siteSettings = settings
    allIndustries = inds || []
  } catch (e) {
    // Graceful fallback
  }

  // If slug doesn't exist in Sanity and isn't the built-in solar vertical, 404
  if (!industryDoc && slug !== 'energia-solar') {
    notFound()
  }

  const data = getMergedSolarData(industryDoc, 'es')
  const canonicalUrl = `https://letintl.com/industrias/${slug}`
  const pageTitle = industryDoc?.title || data.meta.title

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
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
            name: pageTitle,
            item: canonicalUrl,
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: data.meta.title,
        description: data.meta.description,
        inLanguage: ['es-CO', 'en-US'],
        isPartOf: {
          '@id': 'https://letintl.com/#website',
        },
        breadcrumb: {
          '@id': `${canonicalUrl}#breadcrumb`,
        },
      },
      {
        '@type': 'Service',
        '@id': `${canonicalUrl}#service-ior`,
        name: `Importador y Exportador de Record (IOR / EOR) — ${pageTitle}`,
        serviceType: 'Agenciamiento Aduanero y Comercio Exterior',
        description:
          'Representación legal y fiscal como Importador y Exportador de Record en Colombia para el ingreso seguro de equipos y tecnología bajo normativas DIAN.',
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
        '@id': `${canonicalUrl}#service-fsl`,
        name: `Hub FSL de Posventa, Stock de Garantías y Repuestos Críticos — ${pageTitle}`,
        serviceType: 'Logística Inversa y Custodia FSL',
        description:
          'Custodia de stock de contingencia FSL (Field Service Logistics) con trazabilidad por número de serie, reemplazo swap y reexportación bajo régimen aduanero DIAN.',
        provider: {
          '@id': 'https://letintl.com/#organization',
        },
        areaServed: {
          '@type': 'Country',
          name: 'Colombia',
        },
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

      {/* Global Site Navbar with dynamic industries list */}
      <Navbar
        data={siteSettings}
        industries={allIndustries}
        variant="industry"
        activeItem={pageTitle}
        lang="es"
      />

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

        {/* Bloque 5: Regulación Técnica + Checklist Pre-embarque */}
        <RegulationRetie
          data={data.regulation}
          lang="es"
        />

        {/* Bloque 6: Caso de Referencia Confidencial en 2 columnas */}
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
    </>
  )
}

