import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'contactSection',
  title: 'Contact Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string'
    }),
    defineField({
      name: 'responseTimeDescription',
      title: 'Response Time Description',
      type: 'string'
    }),
    defineField({
      name: 'serviceDropdownOptions',
      title: 'Service Dropdown Options',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'privacyDisclaimer',
      title: 'Privacy Disclaimer',
      type: 'array',
      of: [{ type: 'block' }]
    })
  ]
})
