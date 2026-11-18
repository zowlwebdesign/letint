import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'audienceSection',
  title: 'Audience Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string'
    }),
    defineField({
      name: 'audienceCards',
      title: 'Audience Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'audienceCard',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'linkUrl', title: 'Link URL (optional)', type: 'string', description: 'E.g. /industrias/energia-solar. Leave empty for a card without link.' },
            { name: 'linkText', title: 'Link text (optional)', type: 'string' }
          ]
        }
      ],
      validation: (Rule) => Rule.max(4)
    })
  ]
})
