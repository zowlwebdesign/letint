# 📘 Manual y Guía de Administración de Contenido en Sanity Studio
## Proyecto: LET INT US (letintl.com)

Bienvenido a la guía oficial de administración del sitio web **LET INT US**. 

Este documento fue diseñado para que cualquier persona del equipo (incluso sin conocimientos técnicos) pueda modificar, actualizar o agregar textos, imágenes, datos de contacto, enlaces y servicios en el sitio web de manera 100% autónoma utilizando **Sanity Studio**.

---

## 📑 Tabla de Contenidos
1. [Cómo Acceder al Panel de Administración](#1-cómo-acceder-al-panel-de-administración)
2. [Conceptos Básicos de Sanity Studio](#2-conceptos-básicos-de-sanity-studio)
3. [Estructura del Panel](#3-estructura-del-panel)
4. [Documento 1: Landing Page (Página Principal)](#4-documento-1-landing-page-página-principal)
   - [4.1 Hero Section (Pantalla de Bienvenida)](#41-hero-section-pantalla-de-bienvenida)
   - [4.2 Credibility Section (Gobernanza y Credibilidad)](#42-credibility-section-gobernanza-y-credibilidad)
   - [4.3 Problem Section (Retos en Colombia)](#43-problem-section-retos-en-colombia)
   - [4.4 Hub Section (Torre de Control y Proceso Operativo)](#44-hub-section-torre-de-control-y-proceso-operativo)
   - [4.5 Audience Section (A Quién Servimos / Sectores)](#45-audience-section-a-quién-servimos--sectores)
   - [4.6 Services Section (Catálogo de Servicios y CTA)](#46-services-section-catálogo-de-servicios-y-cta)
   - [4.7 Why Choose Section (Diferenciales Competitivos)](#47-why-choose-section-diferenciales-competitivos)
   - [4.8 Contact Section (Formulario y WhatsApp)](#48-contact-section-formulario-y-whatsapp)
5. [Documento 2: Configuración Global (Site Settings)](#5-documento-2-configuración-global-site-settings)
   - [5.1 Logo, Favicon e Imagen de Redes Sociales](#51-logo-favicon-e-imagen-de-redes-sociales)
   - [5.2 Menú de Navegación Superior](#52-menú-de-navegación-superior)
   - [5.3 Datos Corporativos y Pie de Página (Footer)](#53-datos-corporativos-y-pie-de-página-footer)
   - [5.4 Redes Sociales](#54-redes-sociales)
6. [Documento 3: Política de Privacidad (Privacy Policy)](#6-documento-3-política-de-privacidad-privacy-policy)
7. [Buenas Prácticas y Preguntas Frecuentes](#7-buenas-prácticas-y-preguntas-frecuentes)

---

## 1. Cómo Acceder al Panel de Administración

El panel de Sanity Studio está integrado directamente en tu sitio web.

- **URL de Acceso en Producción:** [https://letintl.com/studio](https://letintl.com/studio)
- **URL Alternativa en Netlify:** `https://letintln.netlify.app/studio`
- **URL en Entorno de Desarrollo Local:** `http://localhost:3000/studio`

### Inicio de Sesión:
1. Al entrar a la URL verás la pantalla de inicio de sesión de Sanity.
2. Puedes identificarte con **Google**, **GitHub** o el correo electrónico con el que fuiste invitado al proyecto.
3. Si un nuevo miembro de tu equipo necesita acceso, el administrador del proyecto en [sanity.io/manage](https://www.sanity.io/manage) puede invitarlo con rol de **Editor**.

---

## 2. Conceptos Básicos de Sanity Studio

* **Draft vs. Published (Borrador vs. Publicado):**
  * Cuando editas un texto, Sanity guarda los cambios automáticamente en modo **Draft** (borrador privado). 
  * Los visitantes de la web **NO verán los cambios** hasta que presiones el botón verde **"Publish"** en la esquina inferior derecha.
* **Tiempo de actualización en la web (60 segundos):**
  * El sitio web utiliza una tecnología de ultra-alta velocidad llamada *Incremental Static Regeneration (ISR)*.
  * Una vez que presionas **Publish**, los cambios se reflejan en la web pública en un máximo de **60 segundos** (al refrescar el navegador).
* **Gestión de Listas y Tarjetas (Arrays):**
  * Para agregar un elemento nuevo, haz clic en **`Add item`** / **`+`**.
  * Para reordenar elementos, arrástralos desde el icono de seis puntos `⋮⋮` a la izquierda de cada fila.
  * Para eliminar un elemento, haz clic en los tres puntos `...` a la derecha del elemento y selecciona **`Delete`** / **`Remove`**.
* **Subida y Recorte de Imágenes (Hotspot):**
  * Puedes arrastrar imágenes directamente desde tu computador o hacer clic en **`Upload`**.
  * La herramienta **Hotspot (Punto de Enfoque)** te permite hacer clic en el punto más importante de la imagen (por ejemplo, el rostro de una persona o el buque de carga) para que nunca quede cortado en pantallas de celulares o tablets.

---

## 3. Estructura del Panel

En la columna izquierda de Sanity Studio encontrarás los 3 documentos que componen todo el sitio:

```text
📁 Contenido LET INT US
├── 📄 Landing Page              <-- Todo el contenido visual de la página principal
├── ⚙️ Configuración Global       <-- Logo, teléfonos, correos, dirección y menú
└── 🔒 Política de Privacidad     <-- Página legal /privacy
```

---

## 4. Documento 1: Landing Page (Página Principal)

Al hacer clic en **Landing Page**, verás un formulario organizado en 8 acordeones que corresponden exactamente al orden visual de la página de arriba a abajo.

---

### 4.1 Hero Section (Pantalla de Bienvenida)

Es la primera sección que ven los usuarios al ingresar a la página web (fondo oscuro con imagen de logística portuaria y texto principal).

| Campo en Sanity Studio | Tipo de Campo | ¿Dónde se ve en la web? | Recomendación |
| :--- | :--- | :--- | :--- |
| **Headline** | Texto | Título principal gigante en blanco. Ej: *"Your Control Tower for Specialized Supply Chain Services in Colombia"* | Mantén un mensaje contundente de 1 a 2 líneas. |
| **Subheadline** | Párrafo | Párrafo descriptivo debajo del título principal. | Explica en 2 o 3 líneas la propuesta de valor única (contrato en EE.UU., IOR/EOR, logística integral). |
| **Primary CTA > Label** | Texto corto | Texto del botón principal cian/azul brillante. Ej: *"Talk to an Expert"* | Usa un verbo de acción claro (2 a 4 palabras). |
| **Primary CTA > Href** | Texto corto | Destino del botón principal. Ej: `#contact` | Déjalo en `#contact` para que desplace la pantalla hacia el formulario. |
| **Secondary CTA > Label** | Texto corto | Texto del botón secundario traslúcido. Ej: *"How It Works"* o *"Contact Us"* | Ideal para guiar a ver el proceso operativo. |
| **Secondary CTA > Href** | Texto corto | Destino del botón secundario. Ej: `#how-it-works` | `#how-it-works` lleva a la sección de la Torre de Control. |
| **Imagen de Fondo Principal** | Imagen | Fondo fotográfico del Hero. | Si subes una nueva imagen aquí, reemplazará la imagen predeterminada. Usa imágenes horizontales (16:9) de alta calidad. |

---

### 4.2 Credibility Section (Gobernanza y Credibilidad)

Es la franja de fondo claro ubicada justo debajo del Hero. Presenta el respaldo legal en Florida y Colombia a través de **4 tarjetas blancas**.

| Campo en Sanity Studio | Tipo de Campo | ¿Dónde se ve en la web? | Recomendación |
| :--- | :--- | :--- | :--- |
| **Title** | Texto | Título en negrita oscura a la izquierda. Ej: *"A U.S.-registered company operating in Colombia"* | Enfatiza la presencia binacional (EE.UU. - Colombia). |
| **Subtitle** | Texto | Subtítulo explicativo en gris debajo del título. | Explica la tranquilidad contractual y operativa. |
| **Credibility Cards** | Lista (Máx. 4) | Las 4 tarjetas cuadradas con iconos azules. | Puedes editar el título y la descripción de cada tarjeta. |
| ↳ *Card > Title* | Texto | Título en negrita de la tarjeta (ej. *"Legal entity in Florida"*). | Máximo 3 a 5 palabras. |
| ↳ *Card > Description* | Párrafo corto | Texto descriptivo dentro de la tarjeta (ej. *"Registered in Coconut Creek, FL"*). | Mantén 1 o 2 líneas breves para que todas las tarjetas se vean armónicas. |

---

### 4.3 Problem Section (Retos en Colombia)

Sección de fondo blanco que expone los dolores de cabeza habituales al importar o gestionar logística en Colombia sin un socio especializado.

| Campo en Sanity Studio | Tipo de Campo | ¿Dónde se ve en la web? | Recomendación |
| :--- | :--- | :--- | :--- |
| **Title** | Texto | Título principal de la sección. Ej: *"Entering Colombia shouldn't mean managing ten vendors"* | Plantea el problema principal de forma directa. |
| **Subtitle** | Párrafo | Subtítulo en gris que detalla los riesgos aduaneros, demoras y costos ocultos. | 2 a 3 líneas explicativas. |
| **Friction Cards** | Lista (Máx. 3) | Las 3 tarjetas de fondo gris claro con iconos descriptivos. | Exponen los 3 puntos de fricción habituales. |
| ↳ *Card > Title* | Texto | Título del problema (ej. *"Customs bottlenecks & DIAN compliance"*). | Claro y enfocado en el dolor operativo. |
| ↳ *Card > Description* | Párrafo | Explicación del riesgo o problema que LET INT US resuelve. | Entre 2 y 3 líneas. |

---

### 4.4 Hub Section (Torre de Control y Proceso Operativo)

Es la sección interactiva más destacada de la web: fondo azul oscuro con el **Diagrama Orbital de la Torre de Control** a la izquierda y el **Acordeón de Pasos Operativos** a la derecha.

| Campo en Sanity Studio | Tipo de Campo | ¿Dónde se ve en la web? | Recomendación |
| :--- | :--- | :--- | :--- |
| **Header Title** | Texto | Título principal blanco. Ej: *"How It Works — The Control Tower Model"* | Identificador del modelo operativo. |
| **Header Description** | Párrafo | Descripción introductoria bajo el título. | Explica cómo se orquesta la red de proveedores. |
| **Imagen de Fondo del Diagrama** | Imagen | Imagen de fondo del contenedor del diagrama orbital. | Fotografía industrial sutil con baja opacidad. |
| **Center Tower > Label** | Texto | Texto central en la esfera orbital. Ej: *"LET INT US"* | Nombre de la entidad controladora. |
| **Center Tower > Subtitle** | Texto | Subtítulo bajo el nombre central. Ej: *"Control Tower"* | Función de la entidad. |
| **Hub Nodes (Perimeter)** | Lista de textos (Máx. 5) | Los 5 nodos satélite que orbitan alrededor del centro: *Customs Brokers*, *Carriers*, *3PL Warehouses*, *Field Service*, *Legal & Tax*. | Puedes modificar el texto de cada nodo satélite. |
| **Process Steps** | Lista (Máx. 4) | El acordeón interactivo de la derecha con los pasos 01 a 04. | Al hacer clic en la web, cada paso se abre y muestra su detalle. |
| ↳ *Step > Step Number* | Texto corto | El indicador numérico (ej. *"01"*, *"02"*, *"03"*, *"04"*). | Usa formato de dos dígitos. |
| ↳ *Step > Title* | Texto | Título del paso (ej. *"Needs Assessment & Compliance Mapping"*). | Resumen de la etapa. |
| ↳ *Step > Description* | Párrafo | Explicación detallada de lo que sucede en esa fase operativa. | Texto explicativo del paso. |

---

### 4.5 Audience Section (A Quién Servimos / Sectores)

Franja de fondo gris perla con 4 tarjetas de sectores empresariales a los que se dirige LET INT US.

| Campo en Sanity Studio | Tipo de Campo | ¿Dónde se ve en la web? | Recomendación |
| :--- | :--- | :--- | :--- |
| **Title** | Texto | Título de la sección. Ej: *"Built for companies scaling into Colombia"* | Breve y aspiracional. |
| **Audience Cards** | Lista (Máx. 4) | Las 4 tarjetas de perfil de cliente (Tech Hardware, Medical Devices, Industrial, etc.). | Puedes ajustar los nichos de clientes. |
| ↳ *Card > Title* | Texto | Título del sector o perfil. | 2 a 4 palabras. |
| ↳ *Card > Description* | Párrafo | Descripción de las necesidades típicas de ese sector en Colombia. | 2 a 3 líneas. |

---

### 4.6 Services Section (Catálogo de Servicios y CTA)

Esta sección contiene toda la oferta comercial dividida en 3 partes: el **Servicio Estrella (IOR/EOR)**, la **Cuadrícula de Servicios Regulares** y el **Banner de Llamado a la Acción**.

#### A. Encabezados de la sección:
* **Title:** Título principal de la sección (ej. *"Services, built to be combined"*).
* **Subtitle:** Subtítulo que explica que los servicios pueden contratarse juntos o por separado.

#### B. Servicio Destacado (Banner IOR / EOR):
Es la tarjeta grande oscura con destello cian que encabeza la sección.
* **Visible en el sitio web (Switch On/Off):** Permite ocultar o mostrar todo el banner destacado sin borrarlo.
* **Title:** Título grande (ej. *"Importer & Exporter of Record (IOR / EOR)"*).
* **Description:** Explicación de cómo LET INT US asume la responsabilidad fiscal y legal ante la DIAN.
* **Capabilities Heading:** Encabezado en mayúsculas de las viñetas (ej. *"CAPABILITIES INCLUDED"*).
* **Capabilities:** Lista de viñetas con checks verdes (puedes agregar, editar o borrar viñetas).
* **Link Text:** Texto del enlace inferior (ej. *"Learn more →"*).
* **Link URL:** Destino del enlace (ej. `#contact`).

#### C. Servicios Regulares (Standard Services Grid):
Son las tarjetas de la cuadrícula (Consulting, Freight, Warehousing, Last-Mile, Reverse Logistics).
Para cada servicio puedes editar:
* **Visible en el sitio web (Switch On/Off):** Si desactivas un servicio, se oculta de la web automáticamente.
* **Title:** Nombre del servicio (ej. *"Warehousing & Inventory (WMS)"*).
* **Description:** Breve resumen del servicio.
* **Link Text:** Texto del botón pequeño (ej. *"Learn more"*).
* **Link URL:** Destino del botón (ej. `#contact`).

#### D. Llamado a la Acción (CTA Minimalista):
Es la caja inferior que invita a armar una operación a la medida.
* **Visible en el sitio web (Switch On/Off):** Permite activar o desactivar este banner.
* **Title:** Pregunta o llamado (ej. *"Need a tailored combination of services?"*).
* **Description:** Descripción explicativa.
* **Button Text:** Texto del botón negro (ej. *"Contact our team"*).
* **Button URL:** Enlace del botón (ej. `#contact`).

---

### 4.7 Why Choose Section (Diferenciales Competitivos)

Sección de fondo blanco con **6 cajas de diferenciales** con iconos azules que destacan por qué elegir a LET INT US frente a agentes tradicionales.

| Campo en Sanity Studio | Tipo de Campo | ¿Dónde se ve en la web? | Recomendación |
| :--- | :--- | :--- | :--- |
| **Title** | Texto | Título principal de la sección. Ej: *"Why choose LET INT US"* | Breve y claro. |
| **Differentials** | Lista de elementos | Los 6 diferenciales competitivos. | Puedes modificar el texto de cada diferencial. |
| ↳ *Differential > Text* | Texto | El texto en negrita de cada diferencial (ej. *"U.S. contract and jurisdiction"*). | Frases directas de 4 a 8 palabras. |

---

### 4.8 Contact Section (Formulario y WhatsApp)

Configura los textos del formulario de contacto final y el botón interactivo de WhatsApp.

| Campo en Sanity Studio | Tipo de Campo | ¿Dónde se ve en la web? | Recomendación |
| :--- | :--- | :--- | :--- |
| **Title** | Texto | Título principal sobre el formulario. Ej: *"Start your Colombia operation with confidence"* | Mensaje de cierre de venta. |
| **Response Time Description** | Texto corto | El texto debajo del título (ej. *"Average response time: under 2 hours during business hours"*). | Genera confianza y expectativas de atención rápida. |
| **Service Dropdown Options** | Lista de textos | Las opciones que aparecen en el menú desplegable *"Select a service"* del formulario. | Puedes agregar nuevas opciones de servicio o renombrar las existentes. |
| **Número de WhatsApp** | Texto corto | El número al que se redirige al hacer clic en el botón de WhatsApp. Ej: `+57 313 231 0746` | **Importante:** Incluye siempre el código de país con signo más (`+57` o `+1`). Si dejas este campo vacío, el botón de WhatsApp se ocultará automáticamente. |
| **Texto del botón de WhatsApp** | Texto corto | El texto visible dentro del botón verde de WhatsApp (ej. *"Chat on WhatsApp"*). | Claro y directo. |
| **Mensaje predeterminado de WhatsApp** | Texto | El texto que ya aparecerá escrito en el chat del cliente al abrir WhatsApp. Ej: *"Hello! I would like to inquire about LET INT US logistics services in Colombia."* | Facilita que el cliente solo tenga que presionar "Enviar". |

---

## 5. Documento 2: Configuración Global (Site Settings)

En el panel izquierdo, al hacer clic en **Configuración Global**, puedes cambiar los elementos transversales de todo el sitio web (cabecera, pie de página, datos legales y SEO).

---

### 5.1 Logo, Favicon e Imagen de Redes Sociales

* **Logo:** 
  * Imagen del logotipo de la empresa que se muestra en la barra de navegación superior y en el pie de página.
  * Formato recomendado: Archivo PNG o SVG con fondo transparente.
* **Favicon:** 
  * El pequeño icono que aparece en la pestaña del navegador (junto al título de la página) y en los marcadores.
  * Formato recomendado: Archivo cuadrado PNG o ICO de 64x64 o 128x128 px.
* **Imagen para Redes Sociales (Open Graph / Social Preview):** 
  * La imagen rectangular que se muestra automáticamente cuando alguien comparte el enlace `https://letintl.com` por **WhatsApp, LinkedIn, Twitter, Slack o Facebook**.
  * Dimensiones recomendadas: **1200 x 630 píxeles** (formato JPG o PNG).

---

### 5.2 Menú de Navegación Superior

En el campo **Navigation Links** puedes gestionar los enlaces del menú del encabezado:
* Puedes agregar nuevos enlaces haciendo clic en **Add item**.
* Cada enlace tiene:
  * **Label:** El texto visible en el menú (ej. *"Services"*, *"Company"*, *"FAQ"*).
  * **Href:** El enlace al que dirige. Si es una sección de la misma página, usa `#` seguido del ID (ej. `#services`, `#company`, `#contact`). Si es un enlace externo, escribe la URL completa (`https://...`).
* Puedes arrastrar los enlaces con `⋮⋮` para cambiar el orden en que aparecen en la barra.

---

### 5.3 Datos Corporativos y Pie de Página (Footer)

En la sección **Corporate Data** se encuentran los datos de contacto y representación legal:

* **Physical Address:** Dirección física registrada en Florida (ej. *"4855 W Hillsboro Blvd B3, Coconut Creek, FL 33073"*). Se muestra en la tarjeta de contacto y en el pie de página.
* **US Phone:** Teléfono comercial en Estados Unidos (ej. `+1 (305) 219-4974`).
* **Colombia Phone:** Teléfono de operaciones en Colombia (ej. `+57 313 231 0746`).
* **WhatsApp Number:** Número corporativo de WhatsApp.
* **Contact Email:** Correo electrónico oficial de contacto (ej. `info@letintl.com`).
* **Legal Disclaimer:** Texto legal en letra pequeña que aparece al final del pie de página.

---

### 5.4 Redes Sociales

En el campo **Social Links** puedes añadir los perfiles de redes sociales de la empresa:
* **Platform:** Nombre de la red (ej. *"LinkedIn"*, *"Twitter/X"*, *"YouTube"*).
* **URL:** Enlace directo a tu perfil o página de empresa (ej. `https://www.linkedin.com/company/letintus`).

---

## 6. Documento 3: Política de Privacidad (Privacy Policy)

Al hacer clic en **Política de Privacidad** en el panel izquierdo, puedes gestionar el contenido de la página legal de privacidad accesible desde [https://letintl.com/privacy](https://letintl.com/privacy):

* **Título Principal:** Título de la página (ej. *"Privacy Policy"*).
* **Fecha de Última Actualización:** Fecha informativa visible para los usuarios (ej. *"September 2026"*).
* **Introducción:** Párrafo introductorio que explica el alcance de la política.
* **Secciones de la Política (Array dinámico):** 
  * Puedes agregar tantas secciones o cláusulas como desees (*1. Information We Collect*, *2. How We Use Information*, *3. Data Sharing*, etc.).
  * Cada sección tiene su propio **Título de la Sección** y su **Contenido de la Sección**.
  * Puedes reordenar o eliminar secciones cuando cambien las regulaciones legales.
* **Correo de Contacto Legal:** Correo para solicitudes de protección de datos (ej. `info@letintl.com`).

---

## 7. Buenas Prácticas y Preguntas Frecuentes

### ¿Por qué guardé los cambios pero aún no se ven en la web?
Recuerda presionar el botón verde **"Publish"** en la esquina inferior derecha. Una vez publicado, espera **60 segundos** y recarga tu navegador con `Ctrl + F5` (o `Cmd + Shift + R` en Mac) para forzar la actualización de la memoria caché.

### ¿Qué pasa si cometo un error al escribir y quiero volver a la versión anterior?
Sanity cuenta con historial de versiones automático. Al hacer clic en los tres puntos del documento en la esquina superior derecha, puedes seleccionar **"History"** (Historial) y restaurar cualquier versión anterior con un solo clic.

### ¿Puedo romper el diseño de la página si escribo textos más largos?
No. El sitio web fue programado de forma totalmente elástica y responsiva. Si escribes una descripción más larga en una tarjeta, los elementos vecinos ajustan su altura automáticamente para mantenerse alineados de forma armónica. No obstante, para mantener una lectura ejecutiva y elegante, se recomienda no exceder de 3 a 4 líneas por párrafo en las tarjetas.

### ¿Cómo pruebo que el formulario de contacto funciona?
Llena el formulario al final de la página con un correo real y haz clic en *"Send Consultation Request"*. El sistema enviará una notificación instantánea a `info@letintl.com` a través del servicio transaccional de Resend.

---

*Manual elaborado para el equipo de LET INT US. Si tienes dudas técnicas adicionales, contacta al equipo de desarrollo.*
