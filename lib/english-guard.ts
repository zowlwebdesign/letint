/**
 * The public site is English-only (Spanish is produced exclusively by the
 * Google Translate widget). Some CMS fields in Sanity may still hold the
 * original Spanish source text; this heuristic lets us detect it so the code
 * can fall back to the English copy instead of showing mixed languages.
 */
const SPANISH_WORDS = new Set([
  'el', 'la', 'los', 'las', 'del', 'de', 'y', 'en', 'un', 'una', 'para', 'por', 'con', 'sin',
  'su', 'sus', 'que', 'se', 'al', 'es', 'como', 'más', 'cada', 'desde', 'entre', 'sobre',
  'soluciones', 'garantías', 'garantia', 'posventa', 'fabricante', 'energía', 'inversores',
  'baterías', 'paneles', 'almacenamiento', 'próximamente', 'activa', 'esta', 'página',
  'muestras', 'demostraciones', 'pilotos', 'temporal', 'caso', 'titular', 'regulatorio', 'entrega',
  'venta', 'directa', 'equipos', 'propios', 'sede', 'cliente', 'servicio', 'tributos', 'reemplazo',
  'falla', 'reportada', 'reposición', 'recolección', 'ciclo', 'cuando', 'usted', 'puede', 'nuestro', 'nuestra', 'revisión', 'solicitar', 'conserva', 'asume',
])

const ALLOWED_ACCENTED = new Set(['bogotá', 'medellín', 'cundinamarca', 'colombiá'])

export function looksSpanish(text: string): boolean {
  if (!text) return false
  if (/[¿¡ñ]/i.test(text)) return true
  const words = text.toLowerCase().match(/[a-záéíóúü]+/g) || []
  if (words.length === 0) return false
  // English copy has no accented letters (except a few city names)
  if (words.some((w) => /[áéíóú]/.test(w) && !ALLOWED_ACCENTED.has(w))) return true
  if (words.some((w) => /(ción|ciones|sión)$/.test(w))) return true
  let hits = 0
  for (const w of words) if (SPANISH_WORDS.has(w)) hits++
  return hits >= 2 || (words.length <= 8 && hits >= 1)
}
