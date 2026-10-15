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
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'Número de WhatsApp',
      type: 'string',
      description: 'Número de WhatsApp con código de país (ej: +57 313 231 0746 o +1 305 ...). Si se deja vacío se ocultará el botón.',
      initialValue: '+57 313 231 0746'
    }),
    defineField({
      name: 'whatsappLabel',
      title: 'Texto del botón de WhatsApp',
      type: 'string',
      initialValue: 'Chat on WhatsApp'
    }),
    defineField({
      name: 'whatsappMessage',
      title: 'Mensaje predeterminado de WhatsApp',
      type: 'string',
      initialValue: 'Hello! I would like to inquire about LET INT US logistics services in Colombia.'
    })
  ]
})
