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
  navigationLinks,
  corporateData,
  socialLinks
}`
