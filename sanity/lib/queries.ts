export const LANDING_PAGE_QUERY = `*[_type == "landingPage"][0]{
  hero,
  credibility,
  problem,
  hub,
  audience,
  services,
  whyChoose,
  contact
}`

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  logo,
  favicon,
  ogImage,
  navigationLinks,
  corporateData,
  socialLinks
}`

export const PRIVACY_POLICY_QUERY = `*[_type == "privacyPolicy"][0]{
  title,
  lastUpdated,
  intro,
  sections[]{
    title,
    content
  },
  contactEmail
}`

