import { MetadataRoute } from 'next'
import { client } from '../sanity/lib/client'
import { ALL_INDUSTRIES_QUERY } from '../sanity/lib/queries'

export const revalidate = 3600 // Revalidate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://letintl.com'
  const currentDate = new Date()

  // Base core routes with proper canonical URLs (no hash fragments!)
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          en: baseUrl,
          'en-US': baseUrl,
          es: baseUrl,
          'es-CO': baseUrl,
          'x-default': baseUrl,
        },
      },
    },
    {
      url: `${baseUrl}/industrias/energia-solar`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
      alternates: {
        languages: {
          es: `${baseUrl}/industrias/energia-solar`,
          'es-CO': `${baseUrl}/industrias/energia-solar`,
          en: `${baseUrl}/industrias/energia-solar`,
          'en-US': `${baseUrl}/industrias/energia-solar`,
          'x-default': `${baseUrl}/industrias/energia-solar`,
        },
      },
    },
    {
      url: `${baseUrl}/campanas/energia-solar`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          es: `${baseUrl}/campanas/energia-solar`,
          'es-CO': `${baseUrl}/campanas/energia-solar`,
          'x-default': `${baseUrl}/campanas/energia-solar`,
        },
      },
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: {
        languages: {
          en: `${baseUrl}/privacy`,
          'en-US': `${baseUrl}/privacy`,
          es: `${baseUrl}/privacy`,
          'es-CO': `${baseUrl}/privacy`,
          'x-default': `${baseUrl}/privacy`,
        },
      },
    },
  ]

  // Dynamically discover any other published industry pages from Sanity CMS
  try {
    const industries = await client.fetch(ALL_INDUSTRIES_QUERY)
    if (Array.isArray(industries)) {
      for (const ind of industries) {
        const slug = ind?.slug?.current
        if (slug && slug !== 'energia-solar' && ind?.status !== 'draft') {
          routes.push({
            url: `${baseUrl}/industrias/${slug}`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
            alternates: {
              languages: {
                es: `${baseUrl}/industrias/${slug}`,
                'es-CO': `${baseUrl}/industrias/${slug}`,
                en: `${baseUrl}/industrias/${slug}`,
                'en-US': `${baseUrl}/industrias/${slug}`,
                'x-default': `${baseUrl}/industrias/${slug}`,
              },
            },
          })
        }
      }
    }
  } catch (e) {
    // Graceful fallback to static routes
  }

  return routes
}
