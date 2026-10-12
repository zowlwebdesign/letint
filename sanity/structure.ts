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
