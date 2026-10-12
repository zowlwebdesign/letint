import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PUBLIC_ID || 'l56ogkfz',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_PUBLIC_DATASET || 'production',
  apiVersion: '2026-10-08',
  useCdn: false, // set to true in production if you want to cache responses
})
