// Syncs the published "energia-solar" industryPage in Sanity with lib/solar-data.ts (EN copy: the site is English-first).
// Usage (needs an Editor API token): SANITY_WRITE_TOKEN=xxx npx sanity exec scripts/sanity-sync-solar.ts
// Dry run: DRY=1 npx sanity exec scripts/sanity-sync-solar.ts
import { createClient } from '@sanity/client'
import { solarDataEn } from '../lib/solar-data'

const DRY = process.env.DRY === '1'
const client = createClient({ projectId: 'l56ogkfz', dataset: 'production', apiVersion: '2024-01-01', useCdn: false, token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_WRITE_TOKEN })

const withKeys = <T extends object>(items: T[], prefix: string) =>
  items.map((item, i) => ({ _key: `${prefix}${i + 1}`, ...item }))

async function main() {
  const docs = await client.fetch(`*[_type=="industryPage" && slug.current=="energia-solar"]{_id}`)
  console.log('docs:', JSON.stringify(docs))
  if (docs.length !== 1) throw new Error('Expected exactly one energia-solar doc (published or draft).')
  const id = docs[0]._id
  const d = solarDataEn

  const set = {
    categoryTags: d.hero.tags,
    'hero.headline': d.hero.headline,
    'hero.subheadline': d.hero.subheadline,
    'hero.secondaryCtaLabel': d.hero.secondaryCta.label,
    'hero.trustBadges': withKeys(d.hero.trustBadges, 'badge'),
    solutions: withKeys(
      d.solutions.map((s) => ({
        number: s.number,
        badge: s.badge,
        title: s.title,
        whenApplies: s.whenApplies,
        industryApplication: s.industryApplication,
        capabilityTags: s.capabilityTags,
        ...(s.footnote ? { footnote: s.footnote } : {}),
      })),
      'sol'
    ),
    solutionsIntro: d.solutionsIntro,
    'regulationSection.description': d.regulation.description,
    'customSolutionCard.title': d.customSolutionCard.title,
    'customSolutionCard.description': d.customSolutionCard.description,
    'featuredSolutionFlow.title': d.featuredSolutionFlow.title,
    'featuredSolutionFlow.subheadline': d.featuredSolutionFlow.subheadline,
    'featuredSolutionFlow.steps': withKeys(d.featuredSolutionFlow.steps, 'step'),
    operationalCapabilities: withKeys(d.operationalCapabilities, 'cap'),
  }
  console.log('keys to set:', Object.keys(set).join(', '))
  if (DRY) return console.log('DRY RUN — nothing written')
  const res = await client.patch(id).set(set).commit()
  console.log('patched', res._id, 'rev', res._rev)
}
main().catch((e) => { console.error(e); process.exit(1) })
