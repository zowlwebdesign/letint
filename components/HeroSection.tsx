import { urlForImage } from '../sanity/lib/image'
import HeroCarousel, { type HeroSlide } from './HeroCarousel'

interface HeroProps {
  data?: {
    headline?: string
    subheadline?: string
    primaryCTA?: { label: string; href: string }
    secondaryCTA?: { label: string; href: string }
    backgroundGraphic?: any
  }
  /** Photo for the Solar & Storage slide (the technician photo used in the brochure and on the solar page) */
  solarImage?: any
}

const SOLAR_IMAGE_FALLBACK = '/images/solar/warranty-technician.webp'
const ENTITY_IMAGE = '/images/solar/capabilities-warehouse.webp'

/** Fixes known typos still present in CMS copy. */
function cleanLabel(label: string): string {
  return label.replace(/\bWoks\b/g, 'Works')
}

export default function HeroSection({ data, solarImage }: HeroProps) {
  if (!data) return null

  const isOldPlaceholder = data.backgroundGraphic?.asset?._ref?.includes('fb02b17177014277fdf329e857b424cf21c5847e')
  const sanityBg = data.backgroundGraphic && !isOldPlaceholder ? urlForImage(data.backgroundGraphic)?.width(2400).url() : undefined

  const solarSrc = solarImage?.asset ? urlForImage(solarImage)?.width(2400).url() || SOLAR_IMAGE_FALLBACK : SOLAR_IMAGE_FALLBACK

  const slides: HeroSlide[] = [
    {
      id: 'control-tower',
      headline: data.headline || 'Your Control Tower for Specialized Supply Chain Services in Colombia',
      subheadline: data.subheadline,
      primaryCta: data.primaryCTA?.label
        ? {
            label: data.primaryCTA.label,
            href: data.primaryCTA.href || '#contact',
            ariaLabel: `${data.primaryCTA.label} — Consult with LET INT US`,
          }
        : undefined,
      secondaryCta: data.secondaryCTA?.label
        ? {
            label: cleanLabel(data.secondaryCTA.label),
            href: data.secondaryCTA.href || '#how-it-works',
            ariaLabel: `${cleanLabel(data.secondaryCTA.label)} — See our operational process`,
          }
        : undefined,
      image: sanityBg
        ? { src: sanityBg, alt: 'LET INT US - Specialized Supply Chain Control Tower Operations in Colombia' }
        : {
            src: '/hero-bg.webp',
            mobileSrc: '/hero-bg-mobile.webp',
            alt: 'LET INT US - Specialized Supply Chain Control Tower Operations in Colombia',
          },
      showBadges: true,
    },
    {
      id: 'solar',
      eyebrow: 'Solar & Storage',
      headline: 'When an inverter fails, the replacement is already in Colombia.',
      subheadline: 'After-sales, RMA and warranty operations for inverters, batteries (BESS) and solar trackers.',
      primaryCta: {
        label: 'See Solar & Storage solutions',
        href: '/industrias/energia-solar',
      },
      image: {
        src: solarSrc,
        alt: 'Technician servicing installed solar equipment on site',
      },
    },
    {
      id: 'operate-before-entity',
      eyebrow: 'Representation in Colombia (IOR / EOR)',
      headline: 'Operate before you form an entity.',
      subheadline:
        'Import and export in Colombia with LET as your Importer and Exporter of Record (IOR / EOR), while you decide whether a local company makes sense.',
      primaryCta: {
        label: 'See how representation works',
        href: '#services',
      },
      secondaryCta: {
        label: 'Talk to an Expert',
        href: '#contact',
      },
      image: {
        src: ENTITY_IMAGE,
        alt: 'Warehouse racking with pallets identified by serial and barcode labels',
      },
    },
  ]

  return <HeroCarousel slides={slides} />
}
