/**
 * Генерира SVG placeholder изображения за menu items
 * Aspect ratio: 4:5 (portrait) - modern Instagram-like format
 */

export type PlaceholderType =
  | 'cocktail'       // Коктейли
  | 'food'           // Храна
  | 'wine'           // Вино
  | 'whiskey'        // Уиски/спиртни
  | 'beer'           // Бира
  | 'soft'           // Безалкохолни
  | 'signature'      // Авторски коктейли (special)

const COLORS = {
  parchment: '#e8e1cf',
  primary: '#9c3211',
  ink: '#241c15',
  sepia: '#7a6e5f',
  accent: '#d4af37',
}

/**
 * Генерира SVG placeholder data URL
 * @param type Тип на item (cocktail, food, wine, etc.)
 * @param name Име на item за display в SVG
 * @returns Data URL на SVG изображение
 */
export function generatePlaceholder(type: PlaceholderType, name: string): string {
  const width = 400
  const height = 500 // 4:5 aspect ratio

  let icon = ''
  let subtitle = ''

  switch (type) {
    case 'signature':
      subtitle = 'АВТОРСКИ КОКТЕЙЛ'
      icon = `
        <circle cx="200" cy="180" r="60" fill="none" stroke="${COLORS.primary}" stroke-width="3" opacity="0.3"/>
        <circle cx="200" cy="180" r="40" fill="none" stroke="${COLORS.primary}" stroke-width="2" opacity="0.4"/>
        <circle cx="200" cy="180" r="20" fill="none" stroke="${COLORS.primary}" stroke-width="1.5" opacity="0.5"/>
        <circle cx="200" cy="180" r="8" fill="${COLORS.primary}" opacity="0.6"/>
        <path d="M 160 240 Q 200 260 240 240" stroke="${COLORS.primary}" stroke-width="2" fill="none" opacity="0.4"/>
      `
      break
    case 'cocktail':
      subtitle = 'КОКТЕЙЛ'
      icon = `
        <path d="M 150 140 L 200 200 L 250 140 Z" fill="none" stroke="${COLORS.sepia}" stroke-width="2.5" opacity="0.5"/>
        <line x1="200" y1="200" x2="200" y2="260" stroke="${COLORS.sepia}" stroke-width="2.5" opacity="0.5"/>
        <ellipse cx="200" cy="265" rx="25" ry="8" fill="${COLORS.sepia}" opacity="0.3"/>
        <circle cx="215" cy="175" r="6" fill="${COLORS.accent}" opacity="0.6"/>
      `
      break
    case 'food':
      subtitle = 'ХРАНА'
      icon = `
        <rect x="140" y="160" width="120" height="80" rx="8" fill="none" stroke="${COLORS.sepia}" stroke-width="2.5" opacity="0.5"/>
        <circle cx="170" cy="190" r="15" fill="${COLORS.accent}" opacity="0.4"/>
        <circle cx="210" cy="210" r="18" fill="${COLORS.primary}" opacity="0.3"/>
        <circle cx="230" cy="185" r="12" fill="${COLORS.sepia}" opacity="0.5"/>
      `
      break
    case 'wine':
      subtitle = 'ВИНО'
      icon = `
        <ellipse cx="200" cy="160" rx="35" ry="45" fill="none" stroke="${COLORS.primary}" stroke-width="2.5" opacity="0.5"/>
        <line x1="200" y1="205" x2="200" y2="250" stroke="${COLORS.primary}" stroke-width="2.5" opacity="0.5"/>
        <path d="M 175 250 L 225 250" stroke="${COLORS.primary}" stroke-width="2.5" opacity="0.5"/>
        <ellipse cx="200" cy="180" rx="25" ry="30" fill="${COLORS.primary}" opacity="0.2"/>
      `
      break
    case 'whiskey':
      subtitle = 'СПИРТНА НАПИТКА'
      icon = `
        <rect x="165" y="140" width="70" height="110" rx="4" fill="none" stroke="${COLORS.sepia}" stroke-width="2.5" opacity="0.5"/>
        <rect x="175" y="130" width="50" height="15" rx="2" fill="${COLORS.sepia}" opacity="0.4"/>
        <rect x="165" y="170" width="70" height="50" fill="${COLORS.accent}" opacity="0.15"/>
        <path d="M 185 205 L 215 205" stroke="${COLORS.sepia}" stroke-width="1.5" opacity="0.3"/>
      `
      break
    case 'beer':
      subtitle = 'БИРА'
      icon = `
        <rect x="160" y="150" width="80" height="100" rx="6" fill="none" stroke="${COLORS.accent}" stroke-width="2.5" opacity="0.5"/>
        <ellipse cx="200" cy="150" rx="40" ry="12" fill="${COLORS.accent}" opacity="0.3"/>
        <rect x="160" y="165" width="80" height="60" fill="${COLORS.accent}" opacity="0.15"/>
        <path d="M 245 170 Q 260 190 245 210" stroke="${COLORS.accent}" stroke-width="2" fill="none" opacity="0.4"/>
      `
      break
    case 'soft':
      subtitle = 'БЕЗАЛКОХОЛНА'
      icon = `
        <rect x="170" y="140" width="60" height="100" rx="25" fill="none" stroke="${COLORS.sepia}" stroke-width="2.5" opacity="0.5"/>
        <circle cx="200" cy="130" r="8" fill="${COLORS.sepia}" opacity="0.4"/>
        <rect x="170" y="170" width="60" height="50" fill="${COLORS.sepia}" opacity="0.1"/>
        <path d="M 185 195 Q 200 205 215 195" stroke="${COLORS.sepia}" stroke-width="1.5" fill="none" opacity="0.3"/>
      `
      break
  }

  const svg = `
    <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect width="${width}" height="${height}" fill="${COLORS.parchment}"/>

      <!-- Grain texture -->
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
        <feBlend mode="multiply" in="SourceGraphic"/>
      </filter>
      <rect width="${width}" height="${height}" fill="${COLORS.parchment}" opacity="0.03" filter="url(#grain)"/>

      <!-- Border frame -->
      <rect x="20" y="20" width="360" height="460" rx="8" fill="none" stroke="${COLORS.sepia}" stroke-width="1" opacity="0.15"/>

      <!-- Icon -->
      ${icon}

      <!-- Text -->
      <text
        x="200"
        y="320"
        text-anchor="middle"
        fill="${COLORS.sepia}"
        font-size="10"
        font-family="'Space Grotesk', sans-serif"
        font-weight="700"
        letter-spacing="3"
        opacity="0.5">
        ${subtitle}
      </text>

      <text
        x="200"
        y="360"
        text-anchor="middle"
        fill="${COLORS.ink}"
        font-size="20"
        font-family="'Space Grotesk', sans-serif"
        font-weight="600"
        letter-spacing="0.5">
        ${name.length > 20 ? name.substring(0, 20) + '...' : name}
      </text>

      <!-- Logo mark -->
      <circle cx="200" cy="420" r="20" fill="none" stroke="${COLORS.primary}" stroke-width="1.5" opacity="0.2"/>
      <circle cx="200" cy="420" r="12" fill="none" stroke="${COLORS.primary}" stroke-width="1" opacity="0.3"/>
      <circle cx="200" cy="420" r="4" fill="${COLORS.primary}" opacity="0.4"/>

      <text
        x="200"
        y="460"
        text-anchor="middle"
        fill="${COLORS.sepia}"
        font-size="9"
        font-family="'Space Grotesk', sans-serif"
        font-weight="600"
        letter-spacing="2"
        opacity="0.4">
        DRIFT BAR PLOVDIV
      </text>
    </svg>
  `

  // Encode SVG to data URL
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22')

  return `data:image/svg+xml,${encoded}`
}

/**
 * Мапинг на категории към placeholder types
 */
export function getPlaceholderTypeForCategory(categoryKey: string): PlaceholderType {
  if (categoryKey === 'signatures') return 'signature'
  if (categoryKey === 'cocktails') return 'cocktail'
  if (categoryKey === 'wine') return 'wine'
  if (categoryKey === 'whiskey' || categoryKey === 'spirits') return 'whiskey'
  if (categoryKey === 'beer') return 'beer'
  if (categoryKey === 'food') return 'food'
  if (categoryKey === 'soft' || categoryKey === 'shots') return 'soft'
  return 'cocktail'
}
