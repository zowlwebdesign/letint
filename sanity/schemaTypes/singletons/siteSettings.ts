import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image'
    }),
    defineField({
      name: 'ogImage',
      title: 'Imagen para Redes Sociales (Open Graph / Social Preview)',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'navigationLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'link',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'href', title: 'Href', type: 'string' }
          ]
        }
      ]
    }),
    defineField({
      name: 'corporateData',
      title: 'Corporate Data',
      type: 'object',
      fields: [
        { name: 'address', title: 'Physical Address', type: 'text' },
        { name: 'phoneUS', title: 'US Phone', type: 'string' },
        { name: 'phoneColombia', title: 'Colombia Phone', type: 'string' },
        { name: 'whatsappNumber', title: 'WhatsApp Number', type: 'string' },
        { name: 'contactEmail', title: 'Contact Email', type: 'string' },
        { name: 'legalDisclaimer', title: 'Legal Disclaimer', type: 'text' }
      ]
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            { name: 'platform', title: 'Platform', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' }
          ]
        }
      ]
    })
  ]
})
