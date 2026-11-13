import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'industryPage',
  title: 'Página de Industria (Industry Page)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título de la Industria',
      type: 'string',
      initialValue: 'Energía Solar y Almacenamiento',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      initialValue: { current: 'energia-solar' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Estado de la Industria',
      type: 'string',
      options: {
        list: [
          { title: 'Activo (Página disponible)', value: 'active' },
          { title: 'Próximamente (Coming soon)', value: 'coming_soon' },
        ],
      },
      initialValue: 'active',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descripción Corta (Para el menú de navegación)',
      type: 'text',
      rows: 2,
      initialValue: 'Inversores, paneles, baterías y BESS. RETIE 2024, custodia FSL y garantías.',
      description: 'Breve resumen de 1 a 2 líneas que aparecerá debajo del título en el menú desplegable del sitio web.',
    }),
    defineField({
      name: 'categoryTags',
      title: 'Etiquetas de Categoría (Chips superiores del Hero)',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['PANELES', 'INVERSORES', 'BATERÍAS', 'BESS'],
    }),

    // ─── BLOQUE 1: HERO & COMPARATIVA ───
    defineField({
      name: 'hero',
      title: 'Bloque 1: Hero & Comparativa',
      type: 'object',
      initialValue: {
        headline: 'Usted conserva la marca, el producto y el cliente. LET PRO es su brazo operativo en Colombia.',
        subheadline:
          'Soluciones para fabricantes del sector solar que necesitan cumplir garantías, sostener certificados, enviar muestras o desplegar equipos en Colombia, sin constituir una sociedad local y sin ceder el control a un distribuidor.',
        statNumber: '18+',
        statLabel: 'Años de operación en Colombia · Desde 2006',
        manufacturerKeepsTitle: 'El Fabricante Conserva',
        manufacturerKeeps: [
          'La titularidad de su marca y de sus certificados',
          'La propiedad de sus equipos y repuestos',
          'La relación directa con sus clientes y distribuidores',
        ],
        letProAssumesTitle: 'LET PRO Asume',
        letProAssumes: [
          'La representación ante DIAN, SIC y organismos RETIE',
          'El rol de importador y exportador de record (IOR / EOR)',
          'La operación física, custodia FSL y trazabilidad por serie',
        ],
        primaryCtaLabel: 'Solicitar una revisión de su operación',
        primaryCtaHref: '#contacto',
        secondaryCtaLabel: 'Ver las cuatro soluciones',
        secondaryCtaHref: '#soluciones',
        trustBadges: [
          {
            title: 'Desde 2006',
            description: 'Respaldo de LET: LET INT en EE. UU. y LET PRO, LET ADA y LET LOG en Colombia, con operación propia.',
          },
          {
            title: 'Agencia de aduanas',
            description: 'Nacionalización y regímenes especiales ejecutados dentro del mismo grupo.',
          },
          {
            title: 'Operación activa',
            description: 'Programa de posventa vigente para una importante empresa global del sector PV.',
          },
          {
            title: 'Red WFA',
            description: 'Miembro de World Freight Alliance para la coordinación en origen.',
          },
        ],
      },
      fields: [
        {
          name: 'headline',
          title: 'Titular Principal (H1)',
          type: 'text',
          rows: 2,
        },
        {
          name: 'subheadline',
          title: 'Subtítulo',
          type: 'text',
          rows: 3,
        },
        {
          name: 'backgroundImage',
          title: 'Imagen de Fondo del Hero',
          type: 'image',
          options: { hotspot: true },
          description:
            'Imagen de fondo para el Hero (contenedores, logística, energía solar). Si se omite, se usa la imagen por defecto.',
        },
        {
          name: 'statNumber',
          title: 'Número Destacado (ej: 18+)',
          type: 'string',
        },
        {
          name: 'statLabel',
          title: 'Etiqueta del Número Destacado',
          type: 'string',
        },
        {
          name: 'manufacturerKeepsTitle',
          title: 'Título Panel Superior (ej: El Fabricante Conserva)',
          type: 'string',
        },
        {
          name: 'manufacturerKeeps',
          title: 'Puntos: Lo que el Fabricante Conserva',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'letProAssumesTitle',
          title: 'Título Panel Inferior (ej: LET PRO Asume)',
          type: 'string',
        },
        {
          name: 'letProAssumes',
          title: 'Puntos: Lo que Asume LET PRO',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'primaryCtaLabel',
          title: 'Texto del Botón Principal',
          type: 'string',
        },
        {
          name: 'primaryCtaHref',
          title: 'Enlace del Botón Principal (ej: #contacto)',
          type: 'string',
        },
        {
          name: 'secondaryCtaLabel',
          title: 'Texto del Enlace Secundario',
          type: 'string',
        },
        {
          name: 'secondaryCtaHref',
          title: 'Enlace Secundario (ej: #soluciones)',
          type: 'string',
        },
        {
          name: 'trustBadges',
          title: '4 Pilares de Respaldo / Credenciales (Cinta Inferior)',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Título del Pilar', type: 'string' },
                { name: 'description', title: 'Descripción del Pilar', type: 'text', rows: 2 },
              ],
            },
          ],
        },
      ],
    }),

    // ─── BLOQUE 2: LAS 5 SOLUCIONES ───
    defineField({
      name: 'solutionsTitle',
      title: 'Título de la Sección de Soluciones',
      type: 'string',
      initialValue: 'Cada una responde a una situación concreta del fabricante, no a un servicio aislado.',
    }),
    defineField({
      name: 'solutionsIntro',
      title: 'Subtítulo / Introducción de las Soluciones',
      type: 'text',
      rows: 2,
      initialValue:
        'Pueden contratarse por separado o encadenarse a medida que crece la operación: de las muestras al certificado, y del certificado a la posventa y los equipos en sede del cliente.',
    }),
    defineField({
      name: 'solutions',
      title: 'Bloque 2: Las 4 Soluciones',
      type: 'array',
      initialValue: [
        {
          number: '01',
          badge: 'Solución insignia',
          title: 'Programa de posventa y garantías',
          whenApplies:
            'El fabricante vende a través de distribuidores y debe cumplir garantías de largo plazo sin depender de ellos para su operación de posventa.',
          industryApplication:
            'Inversores y baterías con garantías de 10 años o más, reemplazos en días y no en semanas, y control de la información de fallas por número de serie.',
          capabilityTags: ['IOR', 'EOR', 'FSL', 'SN', 'RMA'],
        },
        {
          number: '02',
          badge: 'Cumplimiento normativo',
          title: 'Titular regulatorio en Colombia',
          whenApplies:
            'El producto requiere certificado o registro local y el fabricante no quiere ceder esa titularidad a un distribuidor.',
          industryApplication:
            'Titularidad del certificado de conformidad RETIE ante el organismo certificador, y autorización de importadores y distribuidores bajo control de la marca.',
          capabilityTags: ['ICR', 'RETIE', 'SIC', 'INVIMA'],
        },
        {
          number: '03',
          badge: 'Desarrollo comercial',
          title: 'Samples, demos & prototypes',
          whenApplies:
            'El fabricante envía unidades a prospectos o socios que no están registrados como importadores.',
          industryApplication:
            'Equipos para pruebas técnicas, prototipos, estudios de factibilidad y ferias, con retorno a origen o nacionalización si el cliente compra.',
          capabilityTags: ['IOR', 'EOR', 'PROTOTYPE', 'TESTING'],
        },
        {
          number: '04',
          badge: 'Energía como servicio',
          title: 'Customer Premises Equipment (CPE)',
          whenApplies:
            'El fabricante presta un servicio bajo contrato y el equipo sigue siendo de su propiedad mientras opera en las instalaciones del cliente.',
          industryApplication:
            'Sistemas de almacenamiento, monitoreo o generación en esquemas de energía como servicio, bajo la figura de comodato, con trazabilidad y retiro al final del contrato.',
          capabilityTags: ['SN', 'ICR', 'SLA', 'BESS'],
          footnote: 'Sujeto a aprobación previa del caso',
        },
      ],
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', title: 'Número (ej. 01)', type: 'string' },
            { name: 'badge', title: 'Badge (ej. Solución insignia)', type: 'string' },
            { name: 'title', title: 'Título de la Solución', type: 'string' },
            { name: 'whenApplies', title: 'Cuándo Aplica', type: 'text', rows: 2 },
            { name: 'industryApplication', title: 'En la Industria Solar', type: 'text', rows: 2 },
            {
              name: 'capabilityTags',
              title: 'Tags de Capacidades (ej: IOR, EOR, FSL, SN, RMA)',
              type: 'array',
              of: [{ type: 'string' }],
            },
            { name: 'footnote', title: 'Nota al pie (opcional)', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'customSolutionCard',
      title: 'Tarjeta de Caso a Medida (Debajo de las 4 soluciones)',
      type: 'object',
      initialValue: {
        title: '¿Su caso no encaja exactamente en una de estas cuatro?',
        description:
          'Las soluciones se diseñan sobre los mismos componentes. Una revisión inicial define la combinación correcta para su operación.',
        badge: 'Estructuración caso a caso',
        ctaText: 'Describir mi caso',
        ctaHref: '#contacto',
      },
      fields: [
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'description', title: 'Descripción', type: 'text', rows: 2 },
        { name: 'badge', title: 'Badge', type: 'string' },
        { name: 'ctaText', title: 'Texto del Botón', type: 'string' },
        { name: 'ctaHref', title: 'Enlace del Botón', type: 'string' },
      ],
    }),

    // ─── BLOQUE 3: FLUJO DE GARANTÍAS ───
    defineField({
      name: 'featuredSolutionFlow',
      title: 'Bloque 3: Solución 01 en Detalle (Ciclo de Garantías)',
      type: 'object',
      initialValue: {
        title:
          'Cuando un inversor falla, el reemplazo ya está en Colombia, y la unidad dañada vuelve reparada sin pagar tributos otra vez.',
        subheadline:
          'El ciclo completo de una garantía, operado por un solo responsable y documentado unidad por unidad.',
        steps: [
          {
            stepNumber: '01',
            title: 'Falla reportada',
            description: 'El fabricante aprueba la garantía e indica la unidad de reemplazo.',
          },
          {
            stepNumber: '02',
            title: 'Reemplazo desde stock local',
            description: 'Salida por número de serie desde la custodia en Colombia (FSL).',
          },
          {
            stepNumber: '03',
            title: 'Entrega y recolección',
            description:
              'Entrega al instalador o usuario final y retiro de la unidad dañada, con registro de su serie.',
          },
          {
            stepNumber: '04',
            title: 'Exportación temporal',
            description:
              'Salida de la parte o el equipo dañado a fábrica para reparación o reemplazo, con LET PRO como exportador de record.',
          },
          {
            stepNumber: '05',
            title: 'Reimportación sin nuevos tributos',
            description:
              'Retorno de la unidad reparada o de reemplazo sin un nuevo pago de tributos aduaneros, en los términos de la regulación aduanera.',
          },
          {
            stepNumber: '06',
            title: 'Reposición del stock',
            description: 'La unidad reingresa a la custodia local, lista para la siguiente garantía.',
          },
        ],
        dianCommitmentCallout: {
          title: 'El compromiso ante la aduana lo asume LET PRO',
          description:
            'LET PRO constituye y responde ante la DIAN por el compromiso de retorno de la parte o el equipo reparado o de reemplazo. El fabricante no necesita entidad local ni garantías aduaneras propias para operar su posventa en Colombia.',
        },
      },
      fields: [
        { name: 'title', title: 'Título del Ciclo', type: 'text', rows: 2 },
        { name: 'subheadline', title: 'Subtítulo del Ciclo', type: 'text', rows: 2 },
        {
          name: 'steps',
          title: '6 Pasos del Ciclo de Garantía',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'stepNumber', title: 'Paso (ej: 01)', type: 'string' },
                { name: 'title', title: 'Título del Paso', type: 'string' },
                { name: 'description', title: 'Descripción del Paso', type: 'text', rows: 2 },
              ],
            },
          ],
        },
        {
          name: 'dianCommitmentCallout',
          title: 'Callout de Compromiso ante DIAN',
          type: 'object',
          fields: [
            { name: 'title', title: 'Título', type: 'string' },
            { name: 'description', title: 'Descripción', type: 'text', rows: 3 },
          ],
        },
      ],
    }),

    // ─── BLOQUE 4: CAPACIDADES OPERATIVAS ───
    defineField({
      name: 'operationalCapabilities',
      title: 'Bloque 4: Capacidades Operativas (8 Siglas)',
      type: 'array',
      initialValue: [
        { code: 'ICR', title: 'Representación regulatoria y aduanera', description: 'DIAN, organismos RETIE, SIC y MinCIT/VUCE.' },
        { code: 'IOR / EOR', title: 'Importador y exportador de record', description: 'Envíos sin valor comercial, temporales y de retorno.' },
        { code: 'INBOUND', title: 'Logística de entrada y nacionalización', description: 'De origen a bodega, con recepción documentada y verificación técnica.' },
        { code: 'FSL', title: 'Custodia de stock en destino', description: 'Equipos y repuestos listos en Colombia para despacho inmediato.' },
        { code: 'WMS', title: 'Sistema de gestión de bodega', description: 'Cada movimiento registrado en un solo sistema, desde la recepción hasta la entrega.' },
        { code: 'SN', title: 'Inventario por número de serie', description: 'Trazabilidad unidad por unidad en todo el ciclo.' },
        { code: 'LMD', title: 'Last Mile Distribution', description: 'Despacho nacional hasta cualquier municipio, con prueba de entrega (POD) por número de serie.' },
        { code: 'RMA', title: 'Logística de reversa', description: 'Recolección, diagnóstico preliminar, consolidación y retorno a fábrica.' },
      ],
      of: [
        {
          type: 'object',
          fields: [
            { name: 'code', title: 'Código / Sigla (ej: ICR, SN, IOR / EOR)', type: 'string' },
            { name: 'title', title: 'Título', type: 'string' },
            { name: 'description', title: 'Descripción Corta', type: 'text', rows: 2 },
          ],
        },
      ],
    }),

    // ─── BLOQUE 5: REGULACIÓN RETIE 2024 ───
    defineField({
      name: 'regulationSection',
      title: 'Bloque 5: Regulación (RETIE 2024)',
      type: 'object',
      initialValue: {
        title: 'RETIE 2024: sin certificado de conformidad, el equipo no se nacionaliza.',
        description:
          'Desde la Resolución 40117 de 2024, los inversores para sistemas fotovoltaicos, los paneles de 100 W o más, los controladores de carga y las baterías requieren certificado de conformidad de producto para importarse y comercializarse en Colombia. Quién figura como titular de ese certificado define quién controla la entrada de la marca al país. Con LET PRO como titular regulatorio, ese control permanece en el fabricante.',
        checklistTitle: 'Antes de embarcar, se verifica:',
        checklistItems: [
          'Certificado RETIE vigente y su alcance por referencia.',
          'Clasificación arancelaria y tributos aplicables.',
          'Régimen aduanero adecuado: definitivo, temporal o de retorno.',
          'Licencias o excepciones ante MinCIT/VUCE.',
          'Requisitos para baterías de litio como mercancía peligrosa.',
          'Elegibilidad de incentivos de la Ley 1715 con certificado UPME.',
        ],
      },
      fields: [
        { name: 'title', title: 'Título Regulatorio', type: 'text', rows: 2 },
        { name: 'description', title: 'Cuerpo / Descripción', type: 'text', rows: 4 },
        { name: 'checklistTitle', title: 'Título de la Lista de Verificación Pre-embarque', type: 'string' },
        {
          name: 'checklistItems',
          title: 'Puntos de Verificación Pre-embarque',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    }),

    // ─── BLOQUE 6: CASO DE ESTUDIO ───
    defineField({
      name: 'caseStudy',
      title: 'Bloque 6: Caso de Referencia Confidencial',
      type: 'object',
      initialValue: {
        badge: 'CASO DE REFERENCIA CONFIDENCIAL',
        title: 'Importante empresa global del sector PV',
        problemDescription:
          'Con varios años de presencia en Colombia a través de distribuidores y garantías de hasta 10 años, la marca operaba su posventa por medio de uno de ellos, perdiendo visibilidad del stock, de los tiempos reales de reemplazo y de las fallas reportadas.',
        solutionDescription:
          'Con LET PRO, la marca recuperó el control de su posventa: stock propio en Colombia, inventario por número de serie, reemplazos directos en días y retorno documentado de unidades a fábrica para su análisis, sin constituir sociedad local ni depender de su distribuidor.',
        metrics: [
          { value: '24+', label: 'referencias en custodia' },
          { value: '18+', label: 'ciudades atendidas' },
          { value: '48h', label: 'tiempo promedio de reemplazo' },
          { value: '99.8%', label: 'exactitud de inventario' },
        ],
      },
      fields: [
        { name: 'badge', title: 'Badge', type: 'string' },
        { name: 'title', title: 'Título (ej. Importante empresa global del sector PV)', type: 'string' },
        { name: 'problemDescription', title: 'Situación Previa / Reto', type: 'text', rows: 3 },
        { name: 'solutionDescription', title: 'Solución Operada por LET PRO', type: 'text', rows: 3 },
        {
          name: 'metrics',
          title: '4 Indicadores / Métricas Numéricas',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'value', title: 'Valor (ej. 24+, 100%, 48h)', type: 'string' },
                { name: 'label', title: 'Etiqueta del Indicador', type: 'string' },
              ],
            },
          ],
        },
      ],
    }),

    // ─── IMÁGENES DE SECCIÓN ───
    defineField({
      name: 'sectionImages',
      title: 'Imágenes de las secciones',
      description:
        'Fotos que acompañan cada bloque de la página. Si un campo queda vacío, se muestra la imagen provisional. Formato horizontal recomendado, mínimo 1600 px de ancho (JPG, PNG o WebP).',
      type: 'object',
      fields: [
        {
          name: 'warranty',
          title: 'Ciclo de garantía (Bloque 3) · banner ancho',
          description: 'Técnico reemplazando un inversor o equipo instalado en sitio.',
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Texto alternativo (en inglés)',
              description: 'Describe la imagen para accesibilidad y SEO.',
              type: 'string',
            },
          ],
        },
        {
          name: 'capabilities',
          title: 'Capacidades operativas (Bloque 4) · banner ancho',
          description: 'Bodega con equipos identificados por número de serie. Sin camiones, contenedores ni aviones.',
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Texto alternativo (en inglés)',
              description: 'Describe la imagen para accesibilidad y SEO.',
              type: 'string',
            },
          ],
        },
        {
          name: 'caseStudy',
          title: 'Caso de referencia (Bloque 6) · banner ancho',
          description: 'Planta solar, trackers, inversores o baterías BESS instalados.',
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Texto alternativo (en inglés)',
              description: 'Describe la imagen para accesibilidad y SEO.',
              type: 'string',
            },
          ],
        },
      ],
    }),

    // ─── BROCHURE PDF ───
    defineField({
      name: 'brochurePdf',
      title: 'Archivo PDF Brochure Ejecutivo',
      description:
        'Suba aquí los brochures ejecutivos en PDF (español e inglés) para que se adjunten automáticamente a los correos enviados por Resend a cada prospecto.',
      type: 'object',
      fields: [
        {
          name: 'brochureEs',
          title: 'Brochure PDF en Español',
          description: 'Documento PDF para prospectos que completan el formulario en español.',
          type: 'file',
          options: { accept: '.pdf' },
        },
        {
          name: 'brochureEn',
          title: 'Brochure PDF en Inglés (English)',
          description: 'Documento PDF para prospectos que completan el formulario en inglés.',
          type: 'file',
          options: { accept: '.pdf' },
        },
        {
          name: 'brochureFile',
          title: 'Brochure PDF General (Opcional / Respaldo)',
          description: 'Archivo de respaldo si falta alguno de los dos idiomas.',
          type: 'file',
          options: { accept: '.pdf' },
        },
      ],
    }),

    // ─── SEO Y REDES SOCIALES ───
    defineField({
      name: 'seoAndSocial',
      title: 'SEO y Previsualización Social (Open Graph)',
      type: 'object',
      initialValue: {
        metaTitle: 'LET PRO — Soluciones de Energía Solar y Almacenamiento en Colombia',
        metaDescription:
          'Soluciones para fabricantes fotovoltaicos: posventa, garantías RETIE 2024, importador/exportador de record (IOR/EOR) y custodia FSL sin filial local.',
      },
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'openGraphImage',
          title: 'Imagen Open Graph (1200x630 px)',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
  ],
})
