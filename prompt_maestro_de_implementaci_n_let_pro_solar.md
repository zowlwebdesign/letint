# PROMPT MAESTRO DE ESPECIFICACIÓN TÉCNICA Y FUNCIONAL
**Proyecto:** Implementación Ecosistema "Industrias › Energía Solar y Almacenamiento" + Landing de Campaña B2B  
**Cliente:** Grupo LET — LET Pro (LET Procurement S.A.S.) & LET INT (LET Logistics International LLC)  
**Stack Existente:** Next.js (App Router) + Tailwind CSS + Sanity CMS (Headless) + Resend (Transactional Email) + Vercel  

---

## 1. ROL E INSTRUCCIÓN INICIAL PARA EL ASISTENTE DE CÓDIGO (IA / DESARROLLADOR)

Actúa como un **Senior Full-Stack Developer especialista en Next.js (App Router), Sanity CMS, Resend y Arquitectura de Conversión B2B**. 

Debemos implementar un nuevo módulo escalable dentro de un proyecto existente de **Next.js**. 
**IMPORTANTE — ESTADO ACTUAL DEL PROYECTO:**
1. El sitio web ya está en funcionamiento y **ya está conectado y configurado con Sanity CMS** (para gestión de contenidos) y **Resend** (para el envío de correos). **No debes reinstalar ni reconfigurar desde cero** estas integraciones; debes extender los esquemas (*schemas*) de Sanity y crear/actualizar los *endpoints* o *Server Actions* de Resend aprovechando la configuración existente.
2. El proyecto requiere construir una **arquitectura de plantilla reutilizable para la sección "Industrias"**, inaugurándola con la vertical de **Energía Solar y Almacenamiento (BESS)**, la cual debe servir simultáneamente para **dos objetivos (Doble Vista)** y en **dos idiomas (Español e Inglés)**.

A continuación se detallan absolutamente todos los requerimientos funcionales, de diseño, textos, reglas legales, analítica y automatización acordados con el cliente. **No omitas ningún detalle.**

---

## 2. REGLA DE ORO DE POSICIONAMIENTO LEGAL Y COMERCIAL (ESTRICTO)

En todo el código, textos, metadatos, correos automáticos y esquemas de Sanity se debe cumplir estrictamente esta directriz del área de Cumplimiento (KYC) del cliente:
* **LET Pro (LET Procurement S.A.S.):** Se posiciona exclusivamente como el **brazo legal, titular regulatorio en Colombia (RETIE, SIC, INVIMA) e Importador/Exportador de Record (IOR / EOR) para envíos sin valor comercial, temporales, muestras y de retorno (garantías)**.
* **LET INT / LET Logistics:** Se posiciona como el **operador logístico internacional y agencia de aduanas**.
* **PROHIBICIÓN ESTRICTA:** Bajo ninguna circunstancia se debe presentar a LET Pro o a LET INT como una "importadora de mercancía para la venta" o comercializadora/revendedora de equipos. El fabricante siempre conserva la marca, el producto y la relación con su cliente.
* **Confidencialidad del Caso de Éxito:** Nunca se debe mencionar el nombre de marcas de clientes reales (ej. *prohibido escribir "GoodWe"* en el frontend, metadatos o en el PDF). Siempre se debe denominar de forma genérica como: **"Importante empresa global del sector PV"** (en inglés: **"Leading global PV manufacturer"**).

---

## 3. ARQUITECTURA DE DOBLE OBJETIVO (LOS 3 TABLEROS) E INTERNACIONALIZACIÓN (ES / EN)

El desarrollo debe ser una **Plantilla Modular Reutilizable en Sanity + Next.js** (pensada para que en el futuro se creen nuevas industrias como *Dispositivos regulados y salud* o *TI y telecomunicaciones* simplemente agregando un documento en Sanity).

Debe renderizar **dos variantes de interfaz (Layouts/Vistas)** consumiendo la misma información base en **Español (`es`)** e **Inglés (`en`)**:

### Vista A: Página Integrada al Sitio Principal (Sección "Industrias")
* **Rutas:** 
  * Español: `/industrias/energia-solar` (o `/es/industrias/energia-solar` según el enrutamiento i18n actual).
  * Inglés: `/en/industries/solar-energy` (o equivalente en el router actual).
* **Navegación Global:** Incluye el `Header` principal del sitio (con el ítem **"Industrias"** activo en el menú desplegable apuntando a *Energía solar y almacenamiento*), selector de idioma (`ES | EN`), botón principal *"Hablar con un especialista"* y el `Footer` corporativo completo.
* **Submenú Anclado (Sticky Sub-navbar):** Justo debajo del Header principal, incluye una barra secundaria de navegación interna con *smooth scroll* hacia los bloques de la página:
  * `Soluciones` | `Garantías` | `RETIE` | `Otras industrias`
* **Estructura de Bloques (Completa):**
  1. **Bloque 1: Hero Comparativo + Barra de Credenciales (4 pilares).**
  2. **Bloque 2: Las 5 Soluciones** (presentadas en grilla ejecutiva + tarjeta comodín "¿Su caso no encaja exactamente en una de estas cinco?").
  3. **Bloque 3: Solución 01 en Detalle (El ciclo completo de una garantía en 6 pasos)** + Bloque destacado *"El compromiso ante la aduana lo asume LET Pro"*.
     * *Requerimiento UX obligatorio aprobado:* En **Desktop** estos 6 pasos deben mostrarse como una **línea de tiempo horizontal interactiva/limpia**, y en **Mobile** deben transformarse en un **carrusel deslizable (swipeable)** para evitar apilar 6 tarjetas largas verticalmente.
  4. **Bloque 4: Capacidades Operativas** (Grilla de 8 componentes técnicos con sus siglas: `ICR`, `SN`, `IOR/EOR`, `INBOUND`, `FSL`, `XDOCK`, `UNIT`, `RMA`).
  5. **Bloque 5: Regulación (RETIE 2024 - Resolución 40117 de 2024)** con lista de verificación pre-embarque de 6 puntos.
  6. **Bloque 6: Caso de Referencia** (*"Importante empresa global del sector PV"*) con sus 4 indicadores numéricos editables desde Sanity.
  7. **Bloque 7: Otras Industrias ("Las mismas soluciones, aplicadas a cada industria"):** Tarjetas mostrando:
     * *Esta página:* Energía solar y almacenamiento.
     * *Próximamente:* Dispositivos regulados y salud (SIC / INVIMA).
     * *Próximamente:* TI y telecomunicaciones (Bancos, BPO, Data Centers).
  8. **Bloque 8: Formulario de Contacto Completo** (Diagnóstico de operación en Colombia) + Pie legal del Grupo LET.

---

### Vista B: Pieza de Campaña para LinkedIn, Correo y Redes Sociales (Landing de Conversión Sin Fugas)
* **Rutas sugeridas (o activación por ruta dedicada / query param):**
  * Español: `/campanas/energia-solar` (o `/lp/solar-es`)
  * Inglés: `/en/campaigns/solar-energy` (o `/lp/solar-en`)
* **Objetivo:** Recibir tráfico pago/orgánico desde LinkedIn, campañas de email marketing y redes sociales con cero distracciones y máxima tasa de conversión en dispositivos móviles.
* **Diferencias clave de UI/UX frente a la Vista A:**
  1. **SIN Menú del Sitio:** Se oculta la navegación general del sitio web para evitar fugas de tráfico. Solo se muestra el logo de `LET Pro | SOLAR & ENERGY STORAGE`, el selector de idioma (`ES / EN`) y un **único llamado a la acción (CTA)** que hace scroll directo al formulario corto.
  2. **Compactación Interactiva (Estilo AIT Worldwide):**
     * Muestra el **Hero Comparativo** + las **4 métricas del Caso de Referencia** en la parte superior para generar autoridad inmediata.
     * **Las 5 Soluciones en Pestañas Interactivas (Tabs) / Acordeón:** En lugar de desplegar todo hacia abajo, el usuario alterna entre las 5 soluciones mediante pestañas limpias. Dentro de la Solución 01 se muestra la línea de tiempo/carrusel de los 6 pasos del ciclo de garantía.
     * **Resumen Regulatorio RETIE 2024 + Gancho de Descarga del Brochure PDF:** Bloque conciso advirtiendo sobre la Resolución 40117 de 2024 e invitando a completar el formulario para recibir en su correo el **Brochure Ejecutivo PDF** con el detalle técnico y regulatorio.
     * **Sección "Otras Industrias" omitida:** No se muestra el bloque de otras industrias para mantener el foco 100% en Energía Solar.
  3. **Formulario Corto de Alta Conversión:**
     * En la vista de campaña el formulario se reduce a los campos esenciales de captación rápida (Nombre, Empresa, Correo corporativo, Teléfono/WhatsApp opcional, Solución de interés / Producto y Checkbox Ley 1581) para minimizar la fricción en móviles, enviando igualmente el Brochure PDF automático vía Resend.

---

## 4. ESQUEMAS DE SANITY CMS (PLANTILLA REUTILIZABLE DE INDUSTRIAS)

Extiende el estudio de Sanity actual creando un esquema de documento llamado `industryPage` (o `industryTemplate`) con soporte bilingüe (`es` y `en`, siguiendo el patrón de localización que ya use el proyecto en Sanity).

El esquema debe permitir crear futuras industrias (por un costo operativo mínimo) parametrizando:
1. `title` y `slug` (ej. `energia-solar` / `solar-energy`).
2. `status`: `'active' | 'coming_soon'` (para alimentar automáticamente el bloque de "Otras Industrias").
3. `categoryTags`: Array de etiquetas superiores (ej. `['PANELES', 'INVERSORES', 'BATERÍAS', 'BESS']` / `['PANELS', 'INVERTERS', 'BATTERIES', 'BESS']`).
4. `hero`:
   * `headline`: Título principal.
   * `subheadline`: Subtítulo descriptivo.
   * `manufacturerKeeps`: Lista de puntos ("Lo que el fabricante conserva").
   * `letProAssumes`: Lista de puntos ("Lo que asume LET Pro").
   * `trustBadges`: Las 4 tarjetas de respaldo (*Desde 2006*, *Agencia de aduanas*, *Operación activa*, *Red WFA*).
5. `solutions`: Array de las 5 soluciones. Cada ítem incluye:
   * `number` (`01` a `05`), `badge` (ej. *"Solución insignia"*), `title`, `whenApplies` (*Cuándo aplica*), `industryApplication` (*En energía solar*), `capabilityTags` (ej. `['IOR', 'EOR', 'FSL', 'SN', 'RMA']`), `footnote`.
6. `featuredSolutionFlow`: Objeto para la **Solución 01 en detalle** (Título, subtítulo, array de los 6 pasos numerados `01` a `06` con título y descripción, y el bloque destacado de compromiso ante la DIAN).
7. `operationalCapabilities`: Array de las 8 capacidades operativas (Código/Sigla, Título, Descripción corta).
8. `regulationSection`: Título (`RETIE 2024...`), párrafos explicativos y array de `checklistItems` (los 6 puntos de verificación pre-embarque).
9. `caseStudy`:
   * `title`: *"Importante empresa global del sector PV"* (Editable).
   * `problemDescription` y `solutionDescription`.
   * `metrics`: Array de 4 objetos `{ value: string, label: string }` para reemplazar fácilmente los placeholders `[X]` desde Sanity sin tocar código:
     * `[X]` referencias en custodia
     * `[X]` ciudades atendidas
     * `[X] días` tiempo promedio de reemplazo
     * `[X] %` exactitud de inventario
10. `brochurePdf`: Archivo PDF en español (`brochureEs`) y archivo PDF en inglés (`brochureEn`) subidos a Sanity Assets (o alojados en `/public/docs/`) para que Resend los envíe automáticamente.
11. `seoAndSocial`:
    * `metaTitle`, `metaDescription`.
    * `openGraphImage`: Imagen dedicada (1200x630 px) para la vista previa en LinkedIn y WhatsApp.

---

## 5. CONTENIDO EXACTO Y TEXTOS OFICIALES (ESPAÑOL E INGLÉS)

Utiliza exactamente esta estructura de textos aprobada por el cliente para poblar los datos iniciales (seed/fallback) y los componentes:

### 5.1. Bloque 1: Hero & Credenciales
* **Tags superiores:** `PANELES` · `INVERSORES` · `BATERÍAS` · `BESS` (`PANELS` · `INVERTERS` · `BATTERIES` · `BESS`)
* **H1 (ES):** Usted conserva la marca, el producto y el cliente. LET Pro es su brazo legal y operativo en Colombia.
* **H1 (EN):** You keep the brand, the product, and the customer. LET Pro is your legal and operational arm in Colombia.
* **Subtítulo (ES):** Soluciones para fabricantes del sector solar que necesitan cumplir garantías, sostener certificados, enviar muestras o desplegar equipos en Colombia, sin constituir una sociedad local y sin ceder el control a un distribuidor.
* **Subtítulo (EN):** Solutions for solar manufacturers that need to honor warranties, hold certifications, ship samples, or deploy equipment in Colombia—without incorporating a local entity or surrendering control to a distributor.
* **Cuadro Comparativo:**
  * **LO QUE EL FABRICANTE CONSERVA (`WHAT THE MANUFACTURER KEEPS`):**
    1. La titularidad de su marca y de sus certificados (*Ownership of its brand and certificates*).
    2. La propiedad de sus equipos (*Ownership of its equipment*).
    3. La relación directa con sus clientes y distribuidores (*Direct relationship with its customers and distributors*).
  * **LO QUE ASUME LET PRO (`WHAT LET PRO ASSUMES`):**
    1. La representación ante DIAN, SIC y organismos de certificación (*Representation before DIAN, SIC, and certification bodies*).
    2. El rol de importador y exportador de record (*The role of Importer and Exporter of Record - IOR/EOR*).
    3. La operación física, unidad por unidad (*Physical operations, unit by unit*).
* **Botones Hero:** 
  * CTA Primario: `Solicitar una revisión de su operación` (`Request an operation review`) -> Scroll al formulario.
  * CTA Secundario: `Ver las cinco soluciones` (`See the five solutions`) -> Scroll a Soluciones.
* **4 Pilares de Respaldo:**
  1. **Desde 2006 (`Since 2006`):** Respaldo de LET Logistics, grupo logístico colombiano con operación propia.
  2. **Agencia de aduanas (`Customs Brokerage`):** Nacionalización y regímenes especiales ejecutados dentro del mismo grupo.
  3. **Operación activa (`Active Operation`):** Programa de posventa vigente para una importante empresa global del sector PV.
  4. **Red WFA (`WFA Network`):** Miembro de World Freight Alliance para la coordinación en origen.

### 5.2. Bloque 2: Cinco Soluciones (`FIVE SOLUTIONS`)
* **Encabezado:** Cada una responde a una situación concreta del fabricante, no a un servicio aislado. Pueden contratarse por separado o encadenarse a medida que crece la operación: de las muestras al certificado, del certificado a la venta, de la venta a la posventa.
* **01 — Programa de posventa y garantías (`After-Sales & Warranty Program`) [Solución insignia / Flagship Solution]:**
  * *Cuándo aplica:* el fabricante vende a través de distribuidores y debe cumplir garantías de largo plazo sin depender de ellos para su operación de posventa.
  * *En energía solar:* inversores y baterías con garantías de 10 años o más, reemplazos en días y no en semanas, y control de la información de fallas por número de serie.
  * *Tags:* `IOR` · `EOR` · `FSL` · `SN` · `RMA`
* **02 — Titular regulatorio en Colombia (`Regulatory Holder in Colombia`):**
  * *Cuándo aplica:* el producto requiere certificado o registro local y el fabricante no quiere ceder esa titularidad a un distribuidor.
  * *En energía solar:* titularidad del certificado de conformidad RETIE ante el organismo certificador, y autorización de importadores y distribuidores bajo control de la marca.
  * *Tags:* `ICR` · *También SIC e INVIMA*
* **03 — Muestras, demostraciones y pilotos (`Samples, Demos & Pilots`):**
  * *Cuándo aplica:* el fabricante envía unidades a prospectos o socios que no están registrados como importadores.
  * *En energía solar:* equipos para pruebas técnicas, proyectos piloto, estudios de factibilidad y ferias, con retorno a origen o nacionalización si el cliente compra.
  * *Tags:* `IOR` · `EOR`
* **04 — Venta directa con entrega en destino (`Direct Drop-Ship / Delivery at Place`):**
  * *Cuándo aplica:* el cliente final quiere comprar al fabricante y recibir en su sede, sin ocuparse de aduana, tributos ni logística.
  * *En energía solar:* venta a EPC, industrias o proyectos específicos, con facturación local, nacionalización y entrega en obra.
  * *Tags:* `IOR` · `EOR` · `MoR` *(Sujeto a validación previa del caso)*
* **05 — Equipos propios en sede del cliente (`Manufacturer-Owned Equipment at Client Site`):**
  * *Cuándo aplica:* el fabricante presta un servicio bajo contrato y el equipo sigue siendo de su propiedad mientras opera en las instalaciones del cliente.
  * *En energía solar:* sistemas de almacenamiento, monitoreo o generación en esquemas de energía como servicio, bajo la figura de comodato, con trazabilidad y retiro al final del contrato.
  * *Tags:* `SN` · `ICR` · `SLA`
* **Tarjeta Comodín:** *¿Su caso no encaja exactamente en una de estas cinco?* Las soluciones se diseñan sobre los mismos componentes. Una revisión inicial define la combinación correcta para su operación. (`Estructuración caso a caso` -> CTA: `Describir mi caso`).

### 5.3. Bloque 3: Solución 01 en Detalle (`SOLUTION 01 IN DETAIL`)
* **Componente UX:** Línea de tiempo horizontal en Desktop (`lg:grid-cols-6`) y Carrusel deslizable con controles e indicadores en Mobile (`overflow-x-auto snap-x snap-mandatory`).
* **Título:** Cuando un inversor falla, el reemplazo ya está en Colombia, y la unidad dañada vuelve reparada sin pagar tributos otra vez.
* **Subtítulo:** El ciclo completo de una garantía, operado por un solo responsable y documentado unidad por unidad.
* **Los 6 Pasos:**
  1. `01` **Falla reportada (`Failure Reported`):** El fabricante aprueba la garantía e indica la unidad de reemplazo.
  2. `02` **Reemplazo desde stock local (`Replacement from Local Stock`):** Salida por número de serie desde la custodia en Colombia (FSL).
  3. `03` **Entrega y recolección (`Delivery & Collection`):** Entrega al instalador o usuario final y retiro de la unidad dañada, con registro de su serie.
  4. `04` **Exportación temporal (`Temporary Export`):** Salida de la parte o el equipo dañado a fábrica para reparación o reemplazo, con LET Pro como exportador de record.
  5. `05` **Reimportación sin nuevos tributos (`Duty-Free Re-importation`):** Retorno de la unidad reparada o de reemplazo sin un nuevo pago de tributos aduaneros, en los términos de la regulación aduanera.
  6. `06` **Reposición del stock (`Stock Replenishment`):** La unidad reingresa a la custodia local, lista para la siguiente garantía.
* **Callout Aduanero:** **El compromiso ante la aduana lo asume LET Pro:** LET Pro constituye y responde ante la DIAN por el compromiso de retorno de la parte o el equipo reparado o de reemplazo. El fabricante no necesita entidad local ni garantías aduaneras propias para operar su posventa en Colombia.

### 5.4. Bloque 4: Capacidades Operativas (`OPERATIONAL CAPABILITIES`)
1. `ICR` — **Representación regulatoria y aduanera:** DIAN, organismos RETIE, SIC y MinCIT/VUCE.
2. `SN` — **Inventario por número de serie:** Trazabilidad unidad por unidad.
3. `IOR / EOR` — **Importador y exportador de record:** Envíos sin valor comercial, temporales y de retorno.
4. `INBOUND` — **Logística de entrada y nacionalización:** De origen a bodega, con recepción documentada.
5. `FSL` — **Custodia de stock en destino:** Equipos y repuestos listos en Colombia.
6. `XDOCK` — **Cross-docking:** Transferencia directa a distribuidores y proyectos.
7. `UNIT` — **Distribución por unidad:** Despacho nacional con prueba de entrega por serie.
8. `RMA` — **Logística de reversa:** Recolección, consolidación y retorno a fábrica.

### 5.5. Bloque 5: Regulación (`REGULATION`)
* **Título:** RETIE 2024: sin certificado de conformidad, el equipo no se nacionaliza.
* **Cuerpo:** Desde la Resolución 40117 de 2024, los inversores para sistemas fotovoltaicos, los paneles de 100 W o más y los controladores de baterías solares requieren certificado de conformidad de producto para importarse y comercializarse en Colombia. Quién figura como titular de ese certificado define quién controla la entrada de la marca al país. Con LET Pro como titular regulatorio, ese control permanece en el fabricante.
* **Antes de embarcar, se verifica (`Pre-shipment verification checklist`):**
  * Certificado RETIE vigente y su alcance por referencia.
  * Clasificación arancelaria y tributos aplicables.
  * Régimen aduanero adecuado: definitivo, temporal o de retorno.
  * Licencias o excepciones ante MinCIT/VUCE.
  * Requisitos para baterías de litio como mercancía peligrosa.
  * Elegibilidad de incentivos de la Ley 1715 con certificado UPME.

### 5.6. Bloque 6: Caso de Referencia (`REFERENCE CASE`)
* **Título:** Importante empresa global del sector PV (`Leading global PV manufacturer`)
* **Descripción:** Con varios años de presencia en Colombia a través de distribuidores y garantías de hasta 10 años, la marca operaba su posventa por medio de uno de ellos. Con LET Pro, la marca recuperó el control de su posventa: stock propio en Colombia, inventario por número de serie, reemplazos directos y retorno de unidades a fábrica, sin depender de un distribuidor.
* **4 Indicadores (conectados a Sanity):**
  * `[X]` referencias en custodia (`SKUs in custody`)
  * `[X]` ciudades atendidas (`cities served`)
  * `[X] días` tiempo promedio de reemplazo (`average replacement time`)
  * `[X] %` exactitud de inventario (`inventory accuracy`)

### 5.7. Bloque 7: Industrias (`INDUSTRIES` - Solo en Vista A del Sitio General)
* **Título:** Las mismas soluciones, aplicadas a cada industria.
* **Subtítulo:** Cada industria tiene su propia regulación y su propio ciclo de posventa. Los componentes son los mismos; cambia la forma de combinarlos.
* **3 Tarjetas:**
  1. **Energía solar y almacenamiento** (*Badge: Esta página*): Paneles, inversores, baterías y BESS: RETIE, garantías de largo plazo y stock local por número de serie.
  2. **Dispositivos regulados y salud** (*Badge: Próximamente*): Productos sujetos a reglamentos técnicos de la SIC o a INVIMA: titularidad regulatoria, muestras para demostración y venta directa a clínicas y hospitales.
  3. **TI y telecomunicaciones** (*Badge: Próximamente*): Equipos de alto valor para bancos, BPO y centros de datos: equipos propios en sede del cliente, stock de repuestos para SLA y retiro al fin del contrato.

---

## 6. FORMULARIO, RESEND (CORREO AUTOMÁTICO CON PDF) Y CUMPLIMIENTO LEGAL

### 6.1. Campos del Formulario
El componente del formulario debe aceptar una prop `variant="full" | "campaign"`:
* **En `variant="full"` (Página `/industrias/energia-solar`):**
  * `nombre` (Texto, obligatorio)
  * `empresa` (Texto, obligatorio)
  * `correo` (Email corporativo, obligatorio)
  * `paisOrigen` (Texto, obligatorio)
  * `producto` (Select: *Inversores, Paneles, Baterías, BESS, Otro*)
  * `entidadLegalColombia` (Select: *No, Sí, En evaluación*)
  * `certificadoRetie` (Select: *Vigente, En trámite, No cuenta con certificado, No aplica*)
  * `solucionInteres` (Select: *Posventa y garantías, Titular regulatorio en Colombia, Muestras / pilotos, Venta directa con entrega en destino, Equipos propios en sede del cliente, Revisión general*)
  * `mensaje` (Textarea, opcional)
  * `aceptaDatos` (Checkbox obligatorio: *"Autorizo el tratamiento de mis datos personales conforme a la Ley 1581 de 2012 y a la política de tratamiento de datos del Grupo LET."*)
* **En `variant="campaign"` (Pieza de campaña LinkedIn/Email):**
  * Versión compacta de alta conversión (oculta campos secundarios de diagnóstico o los deja opcionales en un paso colapsable, pidiendo únicamente: `nombre`, `empresa`, `correo`, `solucionInteres` / `producto`, `mensaje` breve opcional y el checkbox obligatorio `aceptaDatos`).
* **Parámetros ocultos capturados automáticamente:**
  * `idioma` (`es` o `en`)
  * `vistaOrigen` (`sitio_industrias` o `campana_landing`)
  * Parámetros UTM de la URL (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`).

### 6.2. Flujo Automatizado con Resend (Doble Envío + Adjunto PDF)
Extiende la API Route / Server Action existente de **Resend** para que al recibir el submit ejecute dos acciones simultáneas (`Promise.all`):
1. **Correo 1 — Notificación Interna al Equipo Comercial de LET:**
   * Destino configurable por variable de entorno (ej. `CONTACT_EMAIL_TO=info@letintl.com`).
   * Incluye todos los campos diligenciados por el prospecto, el idioma, la vista desde la que convirtió, las etiquetas UTM de la campaña y la constancia de aceptación de la Ley 1581 de 2012 (con fecha y hora).
2. **Correo 2 — Autoresponder al Prospecto con el Brochure Ejecutivo en PDF:**
   * Se envía al `correo` ingresado por el prospecto.
   * Si `idioma === 'en'`, envía el asunto, cuerpo HTML corporativo y el archivo adjunto **Brochure PDF en Inglés**.
   * Si `idioma === 'es'`, envía el asunto, cuerpo HTML corporativo y el archivo adjunto **Brochure PDF en Español**.
   * Utiliza la propiedad `attachments: [{ filename: '...', path: brochureUrl }]` de Resend apuntando al PDF alojado en Sanity o en `/public/docs/`.
3. **Almacenamiento de respaldo en Sanity (Recomendado):**
   * Guarda también el registro del lead en una colección `solarLead` en Sanity (o en el esquema de contactos existente) para que nunca se pierda un contacto.

### 6.3. Banner de Consentimiento de Cookies y Pie Legal KYC
* **Banner de Cookies:** Implementar un componente de aviso de cookies limpio y no intrusivo en la parte inferior de la pantalla (en ES y EN) que guarde la preferencia en `localStorage` y active los scripts de seguimiento según corresponda.
* **Pie Legal Obligatorio (Footer Disclaimer):**
  * **ES:** *"Grupo LET: LET Logistics · LET Pro (LET Procurement S.A.S.) · Agencia de Aduanas LET Logistics. Los servicios de importación y exportación de record, representación y Merchant of Record se estructuran mediante contratos de mandato y están sujetos a la aprobación de la División de KYC y Cumplimiento del Grupo LET y a la validación previa de cada caso. La información regulatoria es de carácter general y no reemplaza la verificación caso a caso."*
  * **EN:** *"LET Group: LET Logistics · LET Pro (LET Procurement S.A.S.) · LET Logistics Customs Brokerage. Importer and Exporter of Record, regulatory representation, and Merchant of Record services are structured through mandate agreements and are subject to approval by LET Group's KYC & Compliance Division and prior case-by-case validation. Regulatory information is general in nature and does not replace case-specific verification."*

---

## 7. ANALÍTICA DIGITAL (GA4 + GTM), LINKEDIN INSIGHT TAG Y OPEN GRAPH

1. **Google Tag Manager (GTM) & Google Analytics 4 (GA4):**
   * Configurar el contenedor mediante variables de entorno (`NEXT_PUBLIC_GTM_ID` y `NEXT_PUBLIC_GA4_ID`).
   * Crear un helper `trackEvent(eventName, payload)` que empuje eventos al `window.dataLayer`:
     * `lead_form_submit`: Se dispara únicamente cuando la respuesta de Resend es exitosa (`200 OK`), enviando `{ industry: 'solar', language, form_variant, solution_interest, utm_source }`.
     * `solution_tab_click`: Cuando el usuario explora las pestañas de soluciones o el carrusel de garantías.
2. **LinkedIn Insight Tag:**
   * Inyectar el script oficial de LinkedIn mediante `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` y disparar el evento de conversión (`window.lintrk('track', { conversion_id: ... })`) al completar el envío del formulario.
3. **Metadatos Open Graph para LinkedIn (`generateMetadata` en Next.js):**
   * Configurar `openGraph` completo en las páginas (ES y EN) con título persuasivo, descripción ejecutiva, `type: 'website'`, `locale: 'es_CO' / 'en_US'` e imagen `1200x630` para que al compartir la URL en publicaciones o mensajes directos de LinkedIn se previsualice perfectamente.

---

## 8. ENTREGABLES DE CÓDIGO QUE DEBES GENERAR PASO A PASO

Por favor, revisa la estructura actual de mi repositorio y entrégame la implementación dividida de forma ordenada en los siguientes pasos:

1. **Paso 1 — Esquema de Sanity (`industryPage.ts`) y Diccionario Bilingüe (`es` / `en`):** Con todos los textos oficiales de Energía Solar ya precargados como datos iniciales para que la página funcione desde el primer minuto.
2. **Paso 2 — Componentes UI Modulares:**
   * `IndustryHero.tsx` (Comparativa + 4 credenciales).
   * `SolutionsSection.tsx` (Con modo Grilla para Vista A y modo Pestañas/Tabs para Vista B de campaña).
   * `WarrantyCycleTimeline.tsx` (Línea de tiempo horizontal en Desktop + Carrusel táctil en Mobile para los 6 pasos de la Solución 01).
   * `CapabilitiesGrid.tsx` (Las 8 capacidades operativas) y `RegulationRetie.tsx` (Resolución 40117 + Checklist).
   * `ReferenceCaseMetrics.tsx` (Caso de éxito confidencial con los 4 indicadores dinámicos).
   * `OtherIndustriesSection.tsx` (Tarjetas de proyección hacia Salud/INVIMA y TI/Telecomunicaciones).
   * `CookieConsentBanner.tsx` (Aviso de cookies bilingüe).
3. **Paso 3 — Formulario B2B + Integración Resend + Analítica:**
   * `SolarContactForm.tsx` (Soportando `variant="full"` y `variant="campaign"`, captura de UTMs y disparo de eventos GA4/GTM/LinkedIn).
   * Actualización de la ruta de API / Server Action de **Resend** con el envío doble (notificación interna a LET + correo automático al prospecto adjuntando el Brochure PDF en su idioma).
4. **Paso 4 — Rutas en Next.js y Actualización del Menú:**
   * Páginas para `/industrias/energia-solar` (ES/EN con submenú anclado) y páginas limpias de campaña (sin menú del sitio), más el enlace en el Header principal bajo "Industrias".