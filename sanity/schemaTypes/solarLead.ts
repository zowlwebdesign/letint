import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'solarLead',
  title: 'Lead Energía Solar',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre Completo',
      type: 'string',
    }),
    defineField({
      name: 'empresa',
      title: 'Empresa',
      type: 'string',
    }),
    defineField({
      name: 'correo',
      title: 'Correo Corporativo',
      type: 'string',
    }),
    defineField({
      name: 'paisOrigen',
      title: 'País de Origen',
      type: 'string',
    }),
    defineField({
      name: 'producto',
      title: 'Producto de Interés',
      type: 'string',
    }),
    defineField({
      name: 'entidadLegalColombia',
      title: '¿Tiene Entidad Legal en Colombia?',
      type: 'string',
    }),
    defineField({
      name: 'certificadoRetie',
      title: 'Estado Certificado RETIE',
      type: 'string',
    }),
    defineField({
      name: 'solucionInteres',
      title: 'Solución de Interés',
      type: 'string',
    }),
    defineField({
      name: 'mensaje',
      title: 'Mensaje / Alcance',
      type: 'text',
    }),
    defineField({
      name: 'aceptaDatos',
      title: 'Aceptó Política Ley 1581',
      type: 'boolean',
    }),
    defineField({
      name: 'idioma',
      title: 'Idioma de Conversión',
      type: 'string',
    }),
    defineField({
      name: 'vistaOrigen',
      title: 'Vista de Origen',
      type: 'string',
    }),
    defineField({
      name: 'utm_source',
      title: 'UTM Source',
      type: 'string',
    }),
    defineField({
      name: 'utm_medium',
      title: 'UTM Medium',
      type: 'string',
    }),
    defineField({
      name: 'utm_campaign',
      title: 'UTM Campaign',
      type: 'string',
    }),
    defineField({
      name: 'utm_content',
      title: 'UTM Content',
      type: 'string',
    }),
    defineField({
      name: 'utm_term',
      title: 'UTM Term',
      type: 'string',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Fecha y Hora de Envío',
      type: 'datetime',
    }),
  ],
})
