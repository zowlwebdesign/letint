import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemaTypes'
import { structure } from './sanity/structure'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PUBLIC_ID || 'l56ogkfz'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_PUBLIC_DATASET || 'production'

export default defineConfig({
  basePath: '/studio',
  name: 'default',
  title: 'LET INT US Studio',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
