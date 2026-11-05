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
        .title('Industrias (Verticales B2B)')
        .id('industryPages')
        .child(
          S.documentTypeList('industryPage')
            .title('Páginas de Industrias')
        ),
      S.listItem()
        .title('Prospectos (Leads Solares)')
        .id('solarLeads')
        .child(
          S.documentTypeList('solarLead')
            .title('Leads de Energía Solar')
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
      S.divider(),
      S.listItem()
        .title('Política de Privacidad')
        .id('privacyPolicy')
        .child(
          S.document()
            .schemaType('privacyPolicy')
            .documentId('privacyPolicy')
        ),
    ])
