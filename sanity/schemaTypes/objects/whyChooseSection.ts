import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'whyChooseSection',
  title: 'Why Choose Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string'
    }),
    defineField({
      name: 'differentials',
      title: 'Differentials',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'differential',
          fields: [
            { name: 'text', title: 'Text', type: 'string' },
            { name: 'icon', title: 'Icon (String/Identifier)', type: 'string' }
          ]
        }
      ]
    })
  ]
})
