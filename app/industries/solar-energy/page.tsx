import type { Metadata } from 'next'
import { client } from '../../../sanity/lib/client'
import {
  INDUSTRY_PAGE_QUERY,
  SITE_SETTINGS_QUERY,
  ALL_INDUSTRIES_QUERY,
} from '../../../sanity/lib/queries'
import { urlForImage } from '../../../sanity/lib/image'
import { getMergedSolarData, solarDataEn, problemDataEn, letUnitsEn } from '../../../lib/solar-data'
import { looksSpanish } from '../../../lib/english-guard'

import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import IndustryHero from '../../../components/industries/IndustryHero'
import SolutionsSection from '../../../components/industries/SolutionsSection'
import WarrantyCycleTimeline from '../../../components/industries/WarrantyCycleTimeline'
import CapabilitiesGrid from '../../../components/industries/CapabilitiesGrid'
import RegulationRetie from '../../../components/industries/RegulationRetie'
import ReferenceCaseMetrics from '../../../components/industries/ReferenceCaseMetrics'
import SolarContactForm from '../../../components/industries/SolarContactForm'
import SolarProblems from '../../../components/industries/SolarProblems'
import LetUnits from '../../../components/industries/LetUnits'

export const revalidate = 60

const CANONICAL_URL = 'https://letintl.com/industries/solar-energy'

export const metadata: Metadata = {
  title: { absolute: 'Solar RMA & Warranty Logistics in Colombia | LET Group' },
  description: solarDataEn.meta.description,
  keywords: [
    'Solar Energy Colombia',
    'Importer of Record Colombia',
    'IOR Colombia',
    'Inverter Warranty Service Colombia',
    'Solar Inverter RMA Colombia',
    'Battery and BESS RMA Colombia',
    'Solar Tracker Spare Parts Colombia',
    'Solar Downtime Reduction',
    'Duty-free Re-importation Colombia',
    'FSL Forward Stock Colombia',
    'RETIE 2024 Compliance',
    'LET Group',
    'Mandate Agreement Customs Colombia',
  ],
  alternates: {
    canonical: CANONICAL_URL,
    languages: {
      en: CANONICAL_URL,
      'en-US': CANONICAL_URL,
      'x-default': CANONICAL_URL,
    },
  },
  openGraph: {
    title: 'Solar RMA & Warranty Logistics in Colombia | LET Group',
    description: solarDataEn.meta.description,
    url: CANONICAL_URL,
    siteName: 'LET Group',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://letintl.com/images/solar/hero-bess.webp',
        width: 1200,
        height: 630,
        alt: 'Solar RMA & Warranty Logistics in Colombia — LET Group',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solar RMA & Warranty Logistics in Colombia | LET Group',
    description: solarDataEn.meta.description,
    images: ['https://letintl.com/images/solar/hero-bess.webp'],
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

export default async function SolarEnergyPage() {
  let industryDoc: any = null
  let siteSettings: any = null
  let allIndustries: any[] = []

  try {
    const [doc, settings, inds] = await Promise.all([
      client.fetch(INDUSTRY_PAGE_QUERY, { slug: 'energia-solar' }),
      client.fetch(SITE_SETTINGS_QUERY),
      client.fetch(ALL_INDUSTRIES_QUERY),
    ])
    industryDoc = doc
    siteSettings = settings
    allIndustries = inds || []
  } catch (e) {
    // Graceful fallback
  }

  const data = getMergedSolarData(industryDoc, 'en')
  const pageTitle = 'Solar Energy & Storage'

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${CANONICAL_URL}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://letintl.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Industries',
            item: 'https://letintl.com/#industries',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: pageTitle,
            item: CANONICAL_URL,
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${CANONICAL_URL}#webpage`,
        url: CANONICAL_URL,
        name: data.meta.title,
        description: data.meta.description,
        inLanguage: 'en-US',
        isPartOf: { '@id': 'https://letintl.com/#website' },
        breadcrumb: { '@id': `${CANONICAL_URL}#breadcrumb` },
      },
      {
        '@type': 'Service',
        '@id': `${CANONICAL_URL}#service-rma`,
        name: `Solar Warranty & RMA Management in Colombia — ${pageTitle}`,
        serviceType: 'After-sales RMA, warranty fulfillment and reverse logistics',
        description:
          'End-to-end RMA for solar inverters, storage batteries and solar trackers: swap-ready FSL stock, collection, temporary export, duty-free re-importation, WMS with serial inventory and last-mile distribution.',
        provider: { '@id': 'https://letintl.com/#organization' },
        areaServed: { '@type': 'Country', name: 'Colombia' },
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

      <Navbar
        data={siteSettings}
        industries={allIndustries}
        variant="industry"
        activeItem={pageTitle}
        lang="en"
      />

      <main id="main-content">
        <IndustryHero data={data.hero} lang="en" />

        <SolarProblems data={problemDataEn} />

        <SolutionsSection
          data={data.solutions}
          lang="en"
          title={data.solutionsTitle}
          intro={data.solutionsIntro}
          customCard={data.customSolutionCard}
          details={{
            'after-sales': (
              <WarrantyCycleTimeline
                embedded
                steps={data.featuredSolutionFlow.steps}
                lang="en"
                title={data.featuredSolutionFlow.title}
                subheadline={data.featuredSolutionFlow.subheadline}
                callout={data.featuredSolutionFlow.callout}
                image={data.images.warranty}
              />
            ),
            'regulatory-holder': <RegulationRetie embedded data={data.regulation} lang="en" />,
          }}
        />

        <CapabilitiesGrid
          capabilities={data.operationalCapabilities}
          lang="en"
          image={data.images.capabilities}
        />

        <ReferenceCaseMetrics
          data={data.caseStudy}
          lang="en"
          image={data.images.caseStudy}
        />

        <LetUnits units={letUnitsEn} />

        <SolarContactForm variant="full" lang="en" />
      </main>

      <Footer data={siteSettings ?? {}} />
    </>
  )
}
