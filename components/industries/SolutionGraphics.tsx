import React from 'react'

interface GraphicProps {
  number: string
  lang: 'es' | 'en'
}

export default function SolutionGraphic({ number, lang }: GraphicProps) {
  const isEs = lang === 'es'

  switch (number) {
    case '01':
      // Programa de posventa y garantías
      return (
        <svg
          viewBox="0 0 320 380"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="solutionGraphicSvg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="grad01" x1="0" y1="0" x2="320" y2="380" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1a365d" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#08172c" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="goldGlow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d49a37" />
            </linearGradient>
            <filter id="glow01" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Card */}
          <rect x="16" y="20" width="288" height="340" rx="16" fill="url(#grad01)" stroke="#d49a37" strokeWidth="1.5" strokeOpacity="0.4" />

          {/* Tech Grid Pattern */}
          <path d="M40 70 H280 M40 120 H280 M40 170 H280 M40 220 H280 M40 270 H280" stroke="#d49a37" strokeWidth="0.5" strokeOpacity="0.15" />
          <path d="M90 40 V330 M160 40 V330 M230 40 V330" stroke="#d49a37" strokeWidth="0.5" strokeOpacity="0.15" />

          {/* Central Inverter Hardware Representation */}
          <rect x="70" y="75" width="180" height="150" rx="10" fill="#0d233e" stroke="#00b4ff" strokeWidth="1.5" strokeOpacity="0.7" />
          
          {/* Inverter Top Heat Sink Grill */}
          <path d="M85 92 H235 M85 98 H235 M85 104 H235" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />

          {/* LCD Screen on Inverter */}
          <rect x="105" y="120" width="110" height="42" rx="4" fill="#051322" stroke="#00b4ff" strokeWidth="1" strokeOpacity="0.5" />
          <text x="160" y="137" fill="#00b4ff" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">STATUS: ACTIVE</text>
          <text x="160" y="152" fill="#d49a37" fontSize="9" fontFamily="monospace" textAnchor="middle">SN-INV-COL-2024</text>

          {/* Indicator LEDs */}
          <circle cx="95" cy="190" r="4" fill="#10b981" filter="url(#glow01)" />
          <text x="106" y="193" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">LOCAL FSL</text>

          <circle cx="165" cy="190" r="4" fill="#f59e0b" />
          <text x="176" y="193" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">DIAN RMA</text>

          {/* Closed Loop Badge */}
          <g transform="translate(45, 250)">
            <rect width="230" height="42" rx="8" fill="#142c4c" stroke="#d49a37" strokeWidth="1" />
            <circle cx="24" cy="21" r="12" fill="#d49a37" fillOpacity="0.2" />
            <text x="24" y="25" fill="#f59e0b" fontSize="12" textAnchor="middle" fontWeight="bold">↺</text>
            <text x="46" y="18" fill="#ffffff" fontSize="11" fontWeight="bold">
              {isEs ? 'Ciclo cerrado sin dobles tributos' : 'Closed loop with no re-taxation'}
            </text>
            <text x="46" y="31" fill="#94a3b8" fontSize="9">
              {isEs ? 'SLA despacho FSL: 24h - 48h' : 'FSL dispatch SLA: 24h - 48h'}
            </text>
          </g>

          {/* Bottom Trust Stamp */}
          <text x="160" y="324" fill="#64748b" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="0.08em">
            LET PRO · LOCAL CUSTODY & WARRANTIES
          </text>
        </svg>
      )

    case '02':
      // Titular regulatorio en Colombia (RETIE)
      return (
        <svg
          viewBox="0 0 320 380"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="solutionGraphicSvg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="grad02" x1="0" y1="0" x2="320" y2="380" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0f333c" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#06181c" stopOpacity="0.95" />
            </linearGradient>
            <filter id="tealGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Card */}
          <rect x="16" y="20" width="288" height="340" rx="16" fill="url(#grad02)" stroke="#2dd4bf" strokeWidth="1.5" strokeOpacity="0.4" />

          {/* Concentric Security Waves */}
          <circle cx="160" cy="155" r="95" stroke="#2dd4bf" strokeWidth="1" strokeOpacity="0.12" strokeDasharray="4 4" />
          <circle cx="160" cy="155" r="75" stroke="#2dd4bf" strokeWidth="1" strokeOpacity="0.2" />

          {/* Central Shield Graphic */}
          <path
            d="M160 85 L225 110 V165 C225 205 160 235 160 235 C160 235 95 205 95 165 V110 Z"
            fill="#0b242a"
            stroke="#2dd4bf"
            strokeWidth="2"
            filter="url(#tealGlow)"
          />

          {/* Lock / Certificate Emblem inside Shield */}
          <rect x="145" y="145" width="30" height="26" rx="4" fill="#2dd4bf" />
          <path d="M152 145 V136 C152 131 168 131 168 136 V145" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" />
          <circle cx="160" cy="156" r="3" fill="#0b242a" />
          <path d="M160 159 V164" stroke="#0b242a" strokeWidth="2" strokeLinecap="round" />

          {/* RETIE Banner across shield */}
          <rect x="105" y="185" width="110" height="24" rx="4" fill="#134e4a" stroke="#2dd4bf" strokeWidth="1" />
          <text x="160" y="201" fill="#2dd4bf" fontSize="11" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold" letterSpacing="0.08em">
            RETIE 2024
          </text>

          {/* Compliance Items Box */}
          <g transform="translate(45, 252)">
            <rect width="230" height="42" rx="8" fill="#082025" stroke="#2dd4bf" strokeWidth="1" strokeOpacity="0.5" />
            <circle cx="20" cy="21" r="8" fill="#10b981" fillOpacity="0.2" />
            <path d="M16 21 L19 24 L25 18" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <text x="36" y="18" fill="#ffffff" fontSize="11" fontWeight="bold">
              {isEs ? 'Titularidad en el Fabricante' : 'Ownership with Manufacturer'}
            </text>
            <text x="36" y="31" fill="#94a3b8" fontSize="9">
              {isEs ? 'Independencia total de distribuidores' : 'Zero lock-in with local dealers'}
            </text>
          </g>

          <text x="160" y="324" fill="#5eead4" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="0.08em">
            ONAC · CIDET · SIC · VUCE / MINCIT
          </text>
        </svg>
      )

    case '03':
      // Samples, demos & prototypes
      return (
        <svg
          viewBox="0 0 320 380"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="solutionGraphicSvg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="grad03" x1="0" y1="0" x2="320" y2="380" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38201a" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#181009" stopOpacity="0.95" />
            </linearGradient>
            <filter id="amberGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Card */}
          <rect x="16" y="20" width="288" height="340" rx="16" fill="url(#grad03)" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.4" />

          {/* Flight / Transit Route Lines */}
          <path d="M50 160 Q160 80 270 160" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="6 4" />
          <circle cx="50" cy="160" r="5" fill="#f59e0b" />
          <circle cx="270" cy="160" r="5" fill="#10b981" />

          {/* Central High-Tech Transit Box */}
          <g transform="translate(90, 95)">
            {/* Box Body */}
            <rect width="140" height="110" rx="8" fill="#241611" stroke="#f59e0b" strokeWidth="1.5" />
            
            {/* Straps / Ribs */}
            <path d="M35 0 V110 M105 0 V110" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.4" />
            <path d="M0 55 H140" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.4" />

            {/* Custom Stamp */}
            <rect x="42" y="32" width="56" height="24" rx="3" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="1" />
            <text x="70" y="47" fill="#fbbf24" fontSize="8" fontWeight="bold" textAnchor="middle" letterSpacing="0.06em">
              TEST / PROTOTYPE
            </text>

            <text x="70" y="80" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontWeight="bold">
              EQUIPO DEMO
            </text>
            <text x="70" y="93" fill="#94a3b8" fontSize="8" textAnchor="middle">
              NON-COMMERCIAL
            </text>
          </g>

          {/* Regime Badge */}
          <g transform="translate(45, 245)">
            <rect width="230" height="46" rx="8" fill="#261610" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.6" />
            <text x="20" y="20" fill="#f59e0b" fontSize="11" fontWeight="bold">
              {isEs ? 'Importación Temporal (IOR)' : 'Temporary Importation (IOR)'}
            </text>
            <text x="20" y="34" fill="#cbd5e1" fontSize="9">
              {isEs ? 'Opción de compra local o retorno a fábrica' : 'Option to purchase locally or return to origin'}
            </text>
          </g>

          <text x="160" y="324" fill="#fbbf24" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="0.08em">
            TRADE SHOWS · SHOWROOMS · TECHNICAL TESTING
          </text>
        </svg>
      )

    case '04':
      // Venta directa con entrega en destino (DDP)
      return (
        <svg
          viewBox="0 0 320 380"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="solutionGraphicSvg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="grad04" x1="0" y1="0" x2="320" y2="380" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#142b4e" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#081528" stopOpacity="0.95" />
            </linearGradient>
            <filter id="blueGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Card */}
          <rect x="16" y="20" width="288" height="340" rx="16" fill="url(#grad04)" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.4" />

          {/* Road / Route Grid */}
          <path d="M50 200 L120 140 L200 160 L270 100" stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.4" strokeDasharray="4 4" />

          {/* Direct Handover Node */}
          <circle cx="270" cy="100" r="14" fill="#0284c7" filter="url(#blueGlow)" />
          <circle cx="270" cy="100" r="6" fill="#ffffff" />

          {/* Turnkey Logistics Hub Illustration */}
          <g transform="translate(60, 90)">
            <rect width="160" height="110" rx="10" fill="#0c1f38" stroke="#38bdf8" strokeWidth="1.5" />
            
            {/* DDP Stamp */}
            <rect x="20" y="20" width="50" height="26" rx="4" fill="#0369a1" />
            <text x="45" y="37" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">DDP</text>

            <text x="85" y="32" fill="#ffffff" fontSize="11" fontWeight="bold">LLAVE EN MANO</text>
            <text x="85" y="44" fill="#38bdf8" fontSize="9">Entrega en Obra</text>

            <path d="M20 62 H140" stroke="#38bdf8" strokeWidth="0.5" strokeOpacity="0.4" />

            {/* Checkpoints */}
            <text x="20" y="78" fill="#94a3b8" fontSize="8.5">✓ Desaduanamiento nacional</text>
            <text x="20" y="92" fill="#94a3b8" fontSize="8.5">✓ Invoicing in Colombia</text>
          </g>

          {/* Target Audience Box */}
          <g transform="translate(45, 245)">
            <rect width="230" height="46" rx="8" fill="#091b34" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.5" />
            <text x="20" y="20" fill="#ffffff" fontSize="11" fontWeight="bold">
              {isEs ? 'Venta a EPCs y Proyectos Utility' : 'Sales to EPCs & Utility Projects'}
            </text>
            <text x="20" y="34" fill="#94a3b8" fontSize="9">
              {isEs ? 'El cliente recibe listo sin trámites de aduana' : 'Client receives on-site with all customs cleared'}
            </text>
          </g>

          <text x="160" y="324" fill="#7dd3fc" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="0.08em">
            MERCHANT OF RECORD · LAST-MILE LOGISTICS
          </text>
        </svg>
      )

    case '05':
      // Equipos propios en sede del cliente (BESS / Comodato)
      return (
        <svg
          viewBox="0 0 320 380"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="solutionGraphicSvg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="grad05" x1="0" y1="0" x2="320" y2="380" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#10382b" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#071b14" stopOpacity="0.95" />
            </linearGradient>
            <filter id="emeraldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Card */}
          <rect x="16" y="20" width="288" height="340" rx="16" fill="url(#grad05)" stroke="#34d399" strokeWidth="1.5" strokeOpacity="0.4" />

          {/* Energy Wave Lines */}
          <path d="M40 80 Q100 60 160 80 T280 80" stroke="#34d399" strokeWidth="1" strokeOpacity="0.2" />
          <path d="M40 95 Q100 75 160 95 T280 95" stroke="#34d399" strokeWidth="1" strokeOpacity="0.3" />

          {/* BESS Battery Storage Rack Graphic */}
          <g transform="translate(95, 75)">
            <rect width="130" height="150" rx="8" fill="#0b241c" stroke="#34d399" strokeWidth="1.5" />
            
            {/* Battery Module 1 */}
            <rect x="15" y="18" width="100" height="24" rx="4" fill="#133d2f" stroke="#34d399" strokeWidth="0.8" />
            <circle cx="28" cy="30" r="3" fill="#10b981" filter="url(#emeraldGlow)" />
            <rect x="42" y="26" width="60" height="8" rx="2" fill="#047857" />

            {/* Battery Module 2 */}
            <rect x="15" y="52" width="100" height="24" rx="4" fill="#133d2f" stroke="#34d399" strokeWidth="0.8" />
            <circle cx="28" cy="64" r="3" fill="#10b981" filter="url(#emeraldGlow)" />
            <rect x="42" y="60" width="60" height="8" rx="2" fill="#047857" />

            {/* Battery Module 3 */}
            <rect x="15" y="86" width="100" height="24" rx="4" fill="#133d2f" stroke="#34d399" strokeWidth="0.8" />
            <circle cx="28" cy="98" r="3" fill="#10b981" filter="url(#emeraldGlow)" />
            <rect x="42" y="94" width="60" height="8" rx="2" fill="#047857" />

            {/* Inverter Control / Telemetry */}
            <rect x="15" y="120" width="100" height="18" rx="3" fill="#061c15" />
            <text x="65" y="132" fill="#34d399" fontSize="8" fontFamily="monospace" textAnchor="middle">
              BESS · TELEMETRY OK
            </text>
          </g>

          {/* Contractual Protection Badge */}
          <g transform="translate(45, 248)">
            <rect width="230" height="44" rx="8" fill="#072017" stroke="#34d399" strokeWidth="1" strokeOpacity="0.6" />
            <text x="20" y="19" fill="#ffffff" fontSize="11" fontWeight="bold">
              {isEs ? 'Figura Legal de Comodato' : 'Comodato Legal Agreement'}
            </text>
            <text x="20" y="32" fill="#a7f3d0" fontSize="9">
              {isEs ? 'El equipo es siempre propiedad del fabricante' : 'Asset ownership strictly stays with OEM'}
            </text>
          </g>

          <text x="160" y="324" fill="#6ee7b7" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="0.08em">
            ENERGY AS A SERVICE · SOLAR + BESS
          </text>
        </svg>
      )

    default:
      return null
  }
}

