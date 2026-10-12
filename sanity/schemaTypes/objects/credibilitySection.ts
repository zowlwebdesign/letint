import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'credibilitySection',
  title: 'Credibility Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string'
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string'
    }),
    defineField({
      name: 'cards',
      title: 'Credibility Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'credibilityCard',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' }
          ]
        }
      ],
      validation: (Rule) => Rule.max(4)
    })
  ]
})
