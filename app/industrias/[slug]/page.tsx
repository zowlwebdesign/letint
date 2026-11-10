import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '../../../sanity/lib/client'
import {
  INDUSTRY_PAGE_QUERY,
  SITE_SETTINGS_QUERY,
  ALL_INDUSTRIES_QUERY,
} from '../../../sanity/lib/queries'
import { urlForImage } from '../../../sanity/lib/image'
import { getMergedSolarData, solarDataEn } from '../../../lib/solar-data'

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
      title: 'Industry not found | LET Pro',
      robots: { index: false, follow: false },
    }
  }

  const isSolar = slug === 'energia-solar'
  const fallbackTitle = isSolar
    ? solarDataEn.meta.title
    : `${industryDoc?.title || 'Industry'} in Colombia | LET Pro`
  const fallbackDescription = isSolar
    ? solarDataEn.meta.description
    : `Specialized solutions for manufacturers and brands: IOR/EOR representation, regulatory compliance, and logistics in Colombia.`

  const rawTitle = industryDoc?.seoAndSocial?.metaTitle
  const title = (typeof rawTitle === 'string' ? rawTitle : rawTitle?.en || rawTitle?.es) || fallbackTitle

  const rawDesc = industryDoc?.seoAndSocial?.metaDescription
  const description = (typeof rawDesc === 'string' ? rawDesc : rawDesc?.en || rawDesc?.es) || fallbackDescription

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
      `${industryDoc?.title || 'Solar Energy'} Colombia`,
      'Importer of Record Colombia',
      'IOR Colombia',
      'Inverter Warranty Service Colombia',
      'RMA Logistics Colombia',
      'FSL Forward Stock Colombia',
      'RETIE 2024 Compliance',
      'LET Pro',
      'Mandate Agreement Customs Colombia',
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
      siteName: 'LET Pro | LET Group',
      locale: 'en_US',
      alternateLocale: ['es_CO'],
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

  const data = getMergedSolarData(industryDoc, 'en')
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
        Skip to main content
      </a>

      {/* Global Site Navbar with dynamic industries list */}
      <Navbar
        data={siteSettings}
        industries={allIndustries}
        variant="industry"
        activeItem={pageTitle}
        lang="en"
      />

      <main id="main-content">
        {/* Block 1: Hero & Comparative + 4 Trust Pillars */}
        <IndustryHero data={data.hero} lang="en" />

        {/* Block 2: Five Solutions Accordion */}
        <SolutionsSection
          data={data.solutions}
          lang="en"
          variant="grid"
          title={data.solutionsTitle}
          intro={data.solutionsIntro}
          customCard={data.customSolutionCard}
        />

        {/* Block 3: Solution 01 in Detail (6-step Warranty Cycle + DIAN Callout) */}
        <WarrantyCycleTimeline
          steps={data.featuredSolutionFlow.steps}
          lang="en"
          title={data.featuredSolutionFlow.title}
          subheadline={data.featuredSolutionFlow.subheadline}
          callout={data.featuredSolutionFlow.callout}
        />

        {/* Block 4: Operational Capabilities (8 Codes) */}
        <CapabilitiesGrid
          capabilities={data.operationalCapabilities}
          lang="en"
        />

        {/* Block 5: RETIE Technical Regulation + Pre-shipment Checklist */}
        <RegulationRetie
          data={data.regulation}
          lang="en"
        />

        {/* Block 6: Confidential Reference Case (2-column layout) */}
        <ReferenceCaseMetrics
          data={data.caseStudy}
          lang="en"
        />

        {/* Block 7: Full B2B Contact Form */}
        <SolarContactForm
          variant="full"
          lang="en"
        />
      </main>

      {/* Global Site Footer */}
      <IndustryFooter lang="en" />
    </>
  )
}

