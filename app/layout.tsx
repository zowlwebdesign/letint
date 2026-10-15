import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { client } from '../sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '../sanity/lib/queries'
import { urlForImage } from '../sanity/lib/image'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800'],
})

export const viewport: Viewport = {
  themeColor: '#0c1424',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export async function generateMetadata(): Promise<Metadata> {
  let settings: any = null
  try {
    settings = await client.fetch(SITE_SETTINGS_QUERY)
  } catch (e) {
    // Graceful fallback
  }

  const faviconUrl = settings?.favicon ? urlForImage(settings.favicon)?.url() : '/favicon.ico'
  const logoUrl = settings?.ogImage
    ? urlForImage(settings.ogImage)?.url()
    : settings?.logo
      ? urlForImage(settings.logo)?.url()
      : 'https://letintl.com/og-image.jpg'

  return {
    metadataBase: new URL('https://letintl.com'),
    title: {
      default: 'LET INT US — Control Tower for Supply Chain & IOR Services in Colombia',
      template: '%s | LET INT US',
    },
    description:
      'Scale your operations in Colombia with one U.S. contract. Dedicated Control Tower for Importer of Record (IOR/EOR), customs clearance, 3PL warehousing, and freight forwarding.',
    applicationName: 'LET INT US',
    keywords: [
      'Importer of Record Colombia',
      'IOR Colombia',
      'Exporter of Record Colombia',
      'EOR Colombia',
      'Supply Chain Control Tower Colombia',
      'Colombia Logistics for US Companies',
      'Colombia Customs Brokerage',
      'DIAN Compliance Logistics',
      'Freight Forwarding Colombia',
      '3PL Warehousing Colombia',
      'Bonded Warehousing Bogota',
      'Last Mile Delivery Colombia',
      'Reverse Logistics Colombia',
      'Warranty FSL Colombia',
      'US Contract Colombia Logistics',
      'B2B Distribution Colombia',
      'Medical Device Import Colombia',
      'Telecom Equipment Import Colombia',
    ],
    authors: [{ name: 'LET INT US Corp.', url: 'https://letintl.com' }],
    creator: 'LET INT US Corp.',
    publisher: 'LET INT US Corp.',
    category: 'Logistics & Supply Chain',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/',
        'es-CO': '/',
      },
    },
    openGraph: {
      title: 'LET INT US — Control Tower for Supply Chain & IOR Services in Colombia',
      description:
        'One U.S. contract. Local operations. Freight, customs clearance, IOR/EOR representation, and warehousing in Colombia.',
      url: 'https://letintl.com',
      siteName: 'LET INT US',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: logoUrl,
          width: 1200,
          height: 630,
          alt: 'LET INT US — Supply Chain & Logistics Control Tower in Colombia',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'LET INT US — Control Tower for Supply Chain & IOR Services in Colombia',
      description:
        'One U.S. contract. Local operations. Freight, customs, IOR/EOR, and warehousing in Colombia.',
      images: [logoUrl],
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
    icons: {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
    },
    manifest: '/manifest.json',
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let settings: any = null
  try {
    settings = await client.fetch(SITE_SETTINGS_QUERY)
  } catch (e) {
    // Graceful fallback
  }

  const logoUrl = settings?.logo ? urlForImage(settings.logo)?.url() : 'https://letintl.com/logo.png'

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Corporation',
        '@id': 'https://letintl.com/#organization',
        name: 'LET INT US',
        legalName: 'LET INT US Corp.',
        url: 'https://letintl.com',
        logo: logoUrl,
        email: settings?.corporateData?.contactEmail || 'info@letintl.com',
        telephone: settings?.corporateData?.phoneUS || '+1 (305) 219-4974',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '4855 W Hillsboro Blvd B3',
          addressLocality: 'Coconut Creek',
          addressRegion: 'FL',
          postalCode: '33073',
          addressCountry: 'US',
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: settings?.corporateData?.phoneUS || '+1 (305) 219-4974',
            contactType: 'customer service',
            areaServed: ['US', 'CO'],
            availableLanguage: ['English', 'Spanish'],
          },
          {
            '@type': 'ContactPoint',
            telephone: settings?.corporateData?.phoneColombia || '+57 313 231 0746',
            contactType: 'operations',
            areaServed: 'CO',
            availableLanguage: ['English', 'Spanish'],
          },
        ],
        areaServed: [
          { '@type': 'Country', name: 'Colombia' },
          { '@type': 'Country', name: 'United States' },
        ],
        knowsAbout: [
          'Importer of Record (IOR) in Colombia',
          'Exporter of Record (EOR)',
          'Customs Brokerage and DIAN Compliance',
          'International Freight Forwarding (Ocean & Air)',
          'Supply Chain Control Tower Orchestration',
          '3PL Bonded Warehousing & Inventory Management (WMS)',
          'Last-Mile B2B Delivery in Colombia',
          'Reverse Logistics and Warranty FSL Operations',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://letintl.com/#website',
        url: 'https://letintl.com',
        name: 'LET INT US',
        publisher: { '@id': 'https://letintl.com/#organization' },
        inLanguage: 'en-US',
      },
      {
        '@type': 'ItemList',
        name: 'Specialized Supply Chain Services in Colombia',
        itemListElement: [
          {
            '@type': 'Service',
            position: 1,
            name: 'Importer & Exporter of Record (IOR / EOR) in Colombia',
            description:
              'Full legal representation as Importer and Exporter of Record in Colombia without setting up a local entity.',
            provider: { '@id': 'https://letintl.com/#organization' },
          },
          {
            '@type': 'Service',
            position: 2,
            name: 'Consulting & Market Entry',
            description:
              'Regulatory mapping, tax structure design, and supply chain route planning for Colombia expansion.',
            provider: { '@id': 'https://letintl.com/#organization' },
          },
          {
            '@type': 'Service',
            position: 3,
            name: 'Freight Forwarding & Customs Clearance',
            description:
              'Ocean and air cargo coordination and compliant customs clearance through one synchronized point of contact.',
            provider: { '@id': 'https://letintl.com/#organization' },
          },
          {
            '@type': 'Service',
            position: 4,
            name: 'Warehousing & Inventory Management (WMS)',
            description:
              'Secure storage with real-time inventory visibility, pick & pack, and dispatch in strategic hubs in Colombia.',
            provider: { '@id': 'https://letintl.com/#organization' },
          },
          {
            '@type': 'Service',
            position: 5,
            name: 'Last-Mile Delivery',
            description:
              'Reliable nationwide delivery across Colombia, including white-glove logistics for mission-critical equipment.',
            provider: { '@id': 'https://letintl.com/#organization' },
          },
          {
            '@type': 'Service',
            position: 6,
            name: 'Reverse Logistics & Warranty Fulfillment',
            description:
              'End-to-end RMA management, warranty repairs, field service logistics, and compliant re-exportation.',
            provider: { '@id': 'https://letintl.com/#organization' },
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is an Importer of Record (IOR) in Colombia?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'An Importer of Record (IOR) is the legally registered entity in Colombia responsible for ensuring imported shipments comply with local customs regulations, paying duties and tariffs, and managing filing documentation. LET INT US acts as your IOR, enabling you to import goods without creating a costly local Colombian subsidiary.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why should companies operate in Colombia under a U.S. contract?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Contracting under a U.S. entity provides legal certainty, payment in USD, and single-contract governance under United States jurisdiction, avoiding the administrative exposure of direct local incorporation while enjoying seamless execution on the ground in Colombia.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does the LET INT US Supply Chain Control Tower model work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'LET INT US selects, orchestrates, manages, and answers for a vetted network of Colombian customs brokers, carriers, 3PL warehouses, and regulatory specialists. You get a single bilingual contact point and unified reporting instead of juggling multiple local vendors.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does LET INT US support reverse logistics and warranty repairs?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. LET INT US coordinates warranty and Field Service Logistics (FSL) programs, customer product returns, temporary trade show imports, and compliant re-exportation of equipment back to the origin country.',
            },
          },
        ],
      },
    ],
  }

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link
          rel="preload"
          as="image"
          href="/hero-bg-mobile.webp"
          media="(max-width: 768px)"
          type="image/webp"
          // @ts-ignore
          fetchpriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/hero-bg.webp"
          media="(min-width: 769px)"
          type="image/webp"
          // @ts-ignore
          fetchpriority="high"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
