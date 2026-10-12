Implementación del Schema Principal y Desk Structure
Definición de sanity/structure.ts para fijar la landing page como un Singleton en el panel lateral de Sanity Studio:

TypeScript
import { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido LET INT US')
    .items([
      S.listItem()
        .title('Landing Page')
        .id('landingPage')
        .child(
          S.document()
            .schemaType('landingPage')
            .documentId('landingPage')
        ),
      S.divider(),
      S.listItem()
        .title('Configuración Global')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
    ])
Ejemplo de esquema para la sección de servicios en sanity/schemaTypes/objects/servicesSection.ts:

TypeScript
import { defineField, defineType } from 'sanity'

export const servicesSection = defineType({
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