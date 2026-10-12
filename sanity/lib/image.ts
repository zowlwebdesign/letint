import createImageUrlBuilder from '@sanity/image-url'

const imageBuilder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PUBLIC_ID || 'l56ogkfz',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_PUBLIC_DATASET || 'production',
})

export const urlForImage = (source: any) => {
  if (!source || !source.asset) return undefined
  return imageBuilder?.image(source).auto('format').fit('max')
}
