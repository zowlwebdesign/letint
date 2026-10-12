import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'servicesSection',
  title: 'Sección de Servicios',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título de la Sección',
      type: 'string',
      initialValue: 'Services, built to be combined',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'featuredService',
      title: 'Servicio Destacado (Banner IOR / EOR)',
      type: 'object',
      fields: [
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'description', title: 'Descripción Principal', type: 'text', rows: 3 },
        { name: 'capabilitiesHeading', title: 'Encabezado de Viñetas', type: 'string' },
        {
          name: 'capabilities',
          title: 'Lista de Capacidades',
          type: 'array',
          of: [{ type: 'string' }],
        },
        { name: 'linkText', title: 'Texto del Enlace', type: 'string', initialValue: 'Learn more' },
        { name: 'linkUrl', title: 'URL del Enlace', type: 'string' },
      ],
    }),
    defineField({
      name: 'standardServices',
      title: 'Servicios Regulares (Grid)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'standardService',
          fields: [
            { name: 'title', title: 'Nombre del Servicio', type: 'string' },
            { name: 'description', title: 'Descripción', type: 'text', rows: 3 },
            { name: 'linkText', title: 'Texto del Enlace', type: 'string', initialValue: 'Learn more' },
            { name: 'linkUrl', title: 'URL', type: 'string' },
          ],
        },
      ],
    }),
  ],
})
