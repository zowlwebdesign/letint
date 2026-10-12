sanity/
├── schemaTypes/
│   ├── index.ts
│   ├── singletons/
│   │   ├── landingPage.ts
│   │   └── siteSettings.ts
│   └── objects/
│       ├── heroSection.ts
│       ├── credibilitySection.ts
│       ├── problemSection.ts
│       ├── hubSection.ts
│       ├── processStep.ts
│       ├── audienceSection.ts
│       ├── servicesSection.ts
│       ├── whyChooseSection.ts
│       └── contactSection.ts
└── structure.ts

1. siteSettings.ts (Configuración Global)
Logo & Favicon: Imágenes SVG/PNG.

Navigation Links: Array de objetos { label: string, href: string }.

Corporate Data: Dirección física, teléfonos (+1 US y +57 Colombia), correo de contacto (info@letintl.com) y nota legal de registro en Florida.

Redes Sociales: Links condicionales (LinkedIn, etc.).

2. heroSection.ts
Headline: String (ej. "Your Control Tower for Specialized Supply Chain Services in Colombia").

Subheadline: Text (ej. "From local representation as Importer and Exporter of Record...").

Primary CTA: Objeto { label: string, href: string } ("Talk to an Expert").

Secondary CTA: Objeto { label: string, href: string } ("Explore How It Works").

Background Graphic / Glow: Imagen o toggle de estilo.

3. credibilitySection.ts & problemSection.ts
Credibility: Título, subtítulo y array de 4 tarjetas { title, description } (Legal entity in Florida, Colombia operations, Compliance, Vetted provider network).

Problem: Título ("Entering Colombia shouldn't mean managing ten vendors"), subtítulo y array de 3 tarjetas de fricción (Complex customs, Local legal exposure, Fragmented providers).

4. hubSection.ts (Diagrama Central y Pasos Operativos)
Header: Título ("One hub. A vetted network behind it.") y descripción de orquestación.

Center Tower: Etiqueta central ("LET INT US"), subtítulo ("CONTROL TOWER") y badge ("Single Contract").

Hub Nodes: Array de 5 strings simples para los nodos perimetrales:

OCEAN & AIR CARRIERS

3PL WAREHOUSES

REGULATORY & QUALITY SPECIALISTS

LEGAL & TAX SPECIALISTS

CUSTOMS BROKERS

Process Steps: Array de 4 objetos con { stepNumber: string, title: string, description: string } (01 Brief us, 02 We design the route, 03 Vetted providers execute, 04 You track everything).

5. servicesSection.ts (Tarjeta Destacada IOR/EOR + Grid)
Section Header: Título ("Services, built to be combined") y subtítulo.

Featured Service (Tarjeta horizontal azul oscura):

title: "Representation in Colombia (IOR / EOR)"

description: Párrafo introductorio.

capabilitiesHeading: "CORE CAPABILITIES & PROGRAMS"

capabilities: Array de strings (Warranty and FSL, Samples and demos, Temporary imports, Returns).

ctaLink: Objeto { label: string, url: string }.

Standard Services (Grid modular):

Array de objetos: { title, description, icon: image/string, ctaLabel, ctaUrl } para Consulting & Market Entry, Freight & Customs Clearance, Warehousing & Inventory, Last-Mile Delivery, Reverse Logistics.

Upcoming Service Placeholder:

Toggle para mostrar/ocultar tarjeta "Your next service" junto con su texto y badge "Coming soon".

6. audienceSection.ts & whyChooseSection.ts
Audience: Título ("Built for global companies operating in Colombia") y 4 tarjetas editables.

Why Choose: Título ("Why companies choose LET INT US") y array de strings o ítems con icono para los 6 diferenciales.

7. contactSection.ts
Form Content: Título, descripción de tiempo de respuesta ("We reply within one business day").

Service Dropdown Options: Array de strings editables para el campo "PRIMARY SERVICE OF INTEREST".

Privacy Disclaimer: Texto con soporte de enlace enriquecido para la política de privacidad.