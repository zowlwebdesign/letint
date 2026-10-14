import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'hubSection',
  title: 'Hub Section',
  type: 'object',
  fields: [
    defineField({
      name: 'headerTitle',
      title: 'Header Title',
      type: 'string'
    }),
    defineField({
      name: 'headerDescription',
      title: 'Header Description',
      type: 'text'
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Imagen de Fondo del Diagrama / Hub',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'centerTower',
      title: 'Center Tower',
      type: 'object',
      fields: [
        { name: 'label', title: 'Label', type: 'string' },
        { name: 'subtitle', title: 'Subtitle', type: 'string' }
      ]
    }),
    defineField({
      name: 'hubNodes',
      title: 'Hub Nodes (Perimeter)',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.max(5)
    }),
    defineField({
      name: 'processSteps',
      title: 'Process Steps',
      type: 'array',
      of: [
        {
          type: 'processStep'
        }
      ],
      validation: (Rule) => Rule.max(4)
    })
  ]
})
