import { client } from '../sanity/lib/client'
import { LANDING_PAGE_QUERY, SITE_SETTINGS_QUERY } from '../sanity/lib/queries'

import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import CredibilitySection from '../components/CredibilitySection'
import ProblemSection from '../components/ProblemSection'
import HubSection from '../components/HubSection'
import AudienceSection from '../components/AudienceSection'
import ServicesSection from '../components/ServicesSection'
import WhyChooseSection from '../components/WhyChooseSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

export const revalidate = 60

export default async function Page() {
  let landingData: any = null
  let siteSettings: any = null
  try {
    const [landing, settings] = await Promise.all([
      client.fetch(LANDING_PAGE_QUERY),
      client.fetch(SITE_SETTINGS_QUERY)
    ])
    landingData = landing
    siteSettings = settings
  } catch (e) {
    // Graceful degradation
  }

  return (
    <>
      <a href="#main-content" className="skipLink">
        Skip to main content
      </a>
      <Navbar data={siteSettings} />
      <main id="main-content">
        <HeroSection data={landingData?.hero} />
        <CredibilitySection data={landingData?.credibility} />
        <ProblemSection data={landingData?.problem} />
        <HubSection data={landingData?.hub} />
        <div className="content-auto">
          <AudienceSection data={landingData?.audience} />
          <ServicesSection data={landingData?.services} />
          <WhyChooseSection data={landingData?.whyChoose} />
          <ContactSection data={landingData?.contact} corporateData={siteSettings?.corporateData} />
        </div>
      </main>
      <Footer data={siteSettings} />
    </>
  )
}
