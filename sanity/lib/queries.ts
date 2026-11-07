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

export const INDUSTRY_PAGE_QUERY = `*[_type == "industryPage" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  status,
  categoryTags,
  hero,
  solutionsTitle,
  solutionsIntro,
  solutions,
  customSolutionCard,
  featuredSolutionFlow,
  operationalCapabilities,
  regulationSection,
  caseStudy,
  "brochureUrl": brochurePdf.brochureFile.asset->url,
  "brochureEsUrl": brochurePdf.brochureEs.asset->url,
  "brochureEnUrl": brochurePdf.brochureEn.asset->url,
  seoAndSocial {
    metaTitle,
    metaDescription,
    "ogImageUrl": openGraphImage.asset->url
  }
}`

export const ALL_INDUSTRIES_QUERY = `*[_type == "industryPage"] | order(_createdAt asc) {
  _id,
  title,
  slug,
  status,
  shortDescription,
  categoryTags
}`
