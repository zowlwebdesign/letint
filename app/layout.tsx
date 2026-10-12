import './globals.css'
import { client } from '../sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '../sanity/lib/queries'
import { urlForImage } from '../sanity/lib/image'

export async function generateMetadata() {
  const settings = await client.fetch(SITE_SETTINGS_QUERY)
  const faviconUrl = settings?.favicon ? urlForImage(settings.favicon)?.url() : '/favicon.ico'

  return {
    title: 'LET INT US — Control Tower for Supply Chain Services in Colombia',
    description: 'One U.S. contract. Local operations. Freight, customs, IOR/EOR, warehousing and more in Colombia.',
    icons: {
      icon: faviconUrl,
    },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
