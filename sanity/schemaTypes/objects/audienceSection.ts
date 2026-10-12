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
            { name: 'description', title: 'Description', type: 'text' }
          ]
        }
      ],
      validation: (Rule) => Rule.max(4)
    })
  ]
})
