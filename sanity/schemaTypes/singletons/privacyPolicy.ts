import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'privacyPolicy',
  title: 'Política de Privacidad',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título Principal',
      type: 'string',
      initialValue: 'Privacy Policy',
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Fecha de Última Actualización',
      type: 'string',
      initialValue: 'September 2026',
    }),
    defineField({
      name: 'intro',
      title: 'Introducción (Opcional)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'sections',
      title: 'Secciones de la Política',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Título de la Sección (ej. 1. Information We Collect)',
              type: 'string',
            },
            {
              name: 'content',
              title: 'Contenido de la Sección',
              type: 'text',
              rows: 5,
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Correo de Contacto Legal',
      type: 'string',
      initialValue: 'info@letintl.com',
    }),
  ],
})
