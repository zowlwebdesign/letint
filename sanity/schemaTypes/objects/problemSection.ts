import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'problemSection',
  title: 'Problem Section',
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
      name: 'frictionCards',
      title: 'Friction Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'frictionCard',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' }
          ]
        }
      ],
      validation: (Rule) => Rule.max(3)
    })
  ]
})
