/**
 * Generate Premium SVG Menu Images for Drift Bar Plovdiv
 * 
 * This script generates high-quality SVG images for all menu items
 * that don't have AI-generated photos yet. The SVGs use a premium
 * dark moody bar aesthetic with product-specific illustrations.
 * 
 * Run: node scripts/generate-menu-images.js
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'menu-images');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// ═══════════════════════════════════════════════
// COLOR PALETTE — dark moody bar aesthetic
// ═══════════════════════════════════════════════
const COLORS = {
    bg: '#0d0b09',
    bgGradient: '#1a1410',
    gold: '#d4af37',
    goldLight: '#e8c85a',
    goldDark: '#a8882c',
    amber: '#c77d2e',
    copper: '#b87333',
    warmWhite: '#f5efe6',
    cream: '#e8dcc8',
    sepia: '#7a6e5f',
    deepRed: '#8b1a1a',
    wine: '#722f37',
    emerald: '#2d5a3d',
    sapphire: '#1a3a5c',
    smoke: '#3a3530',
};

// ═══════════════════════════════════════════════
// SVG TEMPLATE GENERATOR
// ═══════════════════════════════════════════════

function createSVG(name, subtitle, iconSVG, accentColor = COLORS.gold) {
    const w = 400, h = 500;
    const truncName = name.length > 22 ? name.substring(0, 22) + '…' : name;

    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${COLORS.bgGradient}"/>
      <stop offset="100%" stop-color="${COLORS.bg}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="transparent"/>
      <stop offset="50%" stop-color="${accentColor}"/>
      <stop offset="100%" stop-color="transparent"/>
    </linearGradient>
    <filter id="blur">
      <feGaussianBlur stdDeviation="20"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>

  <!-- Ambient glow behind icon -->
  <circle cx="200" cy="200" r="80" fill="${accentColor}" opacity="0.05" filter="url(#blur)"/>

  <!-- Decorative top line -->
  <rect x="100" y="60" width="200" height="1" fill="url(#accent)" opacity="0.3"/>

  <!-- Subtitle -->
  <text x="200" y="90" text-anchor="middle" fill="${COLORS.sepia}" 
        font-family="'Georgia', serif" font-size="11" letter-spacing="4" opacity="0.6">
    ${subtitle.toUpperCase()}
  </text>

  <!-- Icon area -->
  <g transform="translate(200, 220)">
    ${iconSVG}
  </g>

  <!-- Decorative line -->
  <rect x="120" y="340" width="160" height="1" fill="url(#accent)" opacity="0.25"/>

  <!-- Product name -->
  <text x="200" y="380" text-anchor="middle" fill="${COLORS.warmWhite}" 
        font-family="'Georgia', serif" font-size="18" font-weight="600" letter-spacing="0.5">
    ${truncName}
  </text>

  <!-- Bottom branding -->
  <text x="200" y="460" text-anchor="middle" fill="${COLORS.sepia}" 
        font-family="'Georgia', serif" font-size="8" letter-spacing="3" opacity="0.35">
    DRIFT BAR PLOVDIV
  </text>

  <!-- Corner accents -->
  <path d="M 20 30 L 20 20 L 30 20" stroke="${accentColor}" stroke-width="1" fill="none" opacity="0.2"/>
  <path d="M 370 30 L 380 20 L 380 30" stroke="${accentColor}" stroke-width="1" fill="none" opacity="0.2" transform="translate(0,0)"/>
  <path d="M 20 470 L 20 480 L 30 480" stroke="${accentColor}" stroke-width="1" fill="none" opacity="0.2"/>
  <path d="M 370 480 L 380 480 L 380 470" stroke="${accentColor}" stroke-width="1" fill="none" opacity="0.2"/>
</svg>`;
}

// ═══════════════════════════════════════════════
// ICON GENERATORS BY CATEGORY
// ═══════════════════════════════════════════════

const icons = {
    // Whiskey bottle silhouette
    whiskey: `
        <rect x="-18" y="-70" width="36" height="95" rx="3" fill="none" stroke="${COLORS.gold}" stroke-width="1.5" opacity="0.6"/>
        <rect x="-12" y="-85" width="24" height="18" rx="2" fill="none" stroke="${COLORS.gold}" stroke-width="1.5" opacity="0.5"/>
        <rect x="-8" y="-92" width="16" height="10" rx="4" fill="none" stroke="${COLORS.gold}" stroke-width="1" opacity="0.4"/>
        <rect x="-14" y="-40" width="28" height="35" rx="1" fill="${COLORS.gold}" opacity="0.08"/>
        <line x1="-10" y1="-25" x2="10" y2="-25" stroke="${COLORS.gold}" stroke-width="0.8" opacity="0.3"/>
        <line x1="-8" y1="-18" x2="8" y2="-18" stroke="${COLORS.gold}" stroke-width="0.5" opacity="0.2"/>
    `,

    // Bourbon bottle (squarer)
    bourbon: `
        <rect x="-20" y="-65" width="40" height="90" rx="4" fill="none" stroke="${COLORS.amber}" stroke-width="1.5" opacity="0.6"/>
        <rect x="-10" y="-80" width="20" height="18" rx="2" fill="none" stroke="${COLORS.amber}" stroke-width="1.5" opacity="0.5"/>
        <rect x="-6" y="-87" width="12" height="10" rx="3" fill="none" stroke="${COLORS.amber}" stroke-width="1" opacity="0.4"/>
        <rect x="-16" y="-35" width="32" height="25" rx="2" fill="${COLORS.amber}" opacity="0.1"/>
        <text x="0" y="-20" text-anchor="middle" fill="${COLORS.amber}" font-size="6" font-family="Georgia" opacity="0.4">BOURBON</text>
    `,

    // Vodka bottle (sleek/tall)
    vodka: `
        <rect x="-14" y="-75" width="28" height="100" rx="2" fill="none" stroke="${COLORS.sapphire}" stroke-width="1.5" opacity="0.5"/>
        <rect x="-8" y="-90" width="16" height="18" rx="1" fill="none" stroke="${COLORS.sapphire}" stroke-width="1.5" opacity="0.4"/>
        <rect x="-5" y="-96" width="10" height="8" rx="3" fill="none" stroke="${COLORS.sapphire}" stroke-width="1" opacity="0.3"/>
        <rect x="-10" y="-45" width="20" height="40" fill="${COLORS.sapphire}" opacity="0.06"/>
        <circle cx="0" cy="-25" r="8" fill="none" stroke="${COLORS.sapphire}" stroke-width="0.8" opacity="0.3"/>
    `,

    // Gin bottle (rounded)
    gin: `
        <path d="M -16 25 L -16 -55 Q -16 -70 0 -70 Q 16 -70 16 -55 L 16 25 Z" fill="none" stroke="${COLORS.emerald}" stroke-width="1.5" opacity="0.5"/>
        <rect x="-6" y="-82" width="12" height="14" rx="2" fill="none" stroke="${COLORS.emerald}" stroke-width="1" opacity="0.4"/>
        <circle cx="0" cy="-92" r="5" fill="none" stroke="${COLORS.emerald}" stroke-width="1" opacity="0.3"/>
        <circle cx="0" cy="-20" r="12" fill="none" stroke="${COLORS.emerald}" stroke-width="0.8" opacity="0.3"/>
        <text x="0" y="-17" text-anchor="middle" fill="${COLORS.emerald}" font-size="5" font-family="Georgia" opacity="0.4">GIN</text>
    `,

    // Rum bottle
    rum: `
        <rect x="-16" y="-65" width="32" height="90" rx="5" fill="none" stroke="${COLORS.copper}" stroke-width="1.5" opacity="0.55"/>
        <rect x="-9" y="-78" width="18" height="15" rx="2" fill="none" stroke="${COLORS.copper}" stroke-width="1.5" opacity="0.45"/>
        <circle cx="0" cy="-88" r="5" fill="none" stroke="${COLORS.copper}" stroke-width="1" opacity="0.35"/>
        <rect x="-12" y="-40" width="24" height="30" rx="2" fill="${COLORS.copper}" opacity="0.08"/>
        <text x="0" y="-23" text-anchor="middle" fill="${COLORS.copper}" font-size="5" font-family="Georgia" opacity="0.4">RUM</text>
    `,

    // Tequila shot glass
    tequila: `
        <path d="M -12 25 L -18 -40 L 18 -40 L 12 25 Z" fill="none" stroke="${COLORS.goldLight}" stroke-width="1.5" opacity="0.55"/>
        <line x1="-16" y1="-25" x2="16" y2="-25" stroke="${COLORS.goldLight}" stroke-width="0.8" opacity="0.3"/>
        <rect x="-14" y="-25" width="28" height="40" fill="${COLORS.goldLight}" opacity="0.06"/>
        <circle cx="-30" cy="15" r="10" fill="none" stroke="${COLORS.goldLight}" stroke-width="1" opacity="0.3"/>
        <path d="M -35 10 L -25 20" stroke="${COLORS.goldLight}" stroke-width="0.8" opacity="0.25"/>
    `,

    // Rakiya traditional bottle
    rakiya: `
        <ellipse cx="0" cy="0" rx="22" ry="40" fill="none" stroke="${COLORS.amber}" stroke-width="1.5" opacity="0.5"/>
        <rect x="-6" y="-55" width="12" height="18" rx="2" fill="none" stroke="${COLORS.amber}" stroke-width="1.2" opacity="0.4"/>
        <circle cx="0" cy="-65" r="5" fill="none" stroke="${COLORS.amber}" stroke-width="1" opacity="0.3"/>
        <ellipse cx="0" cy="10" rx="16" ry="25" fill="${COLORS.amber}" opacity="0.06"/>
        <text x="0" y="5" text-anchor="middle" fill="${COLORS.amber}" font-size="5" font-family="Georgia" opacity="0.35">РАКИЯ</text>
    `,

    // Brandy snifter
    brandy: `
        <ellipse cx="0" cy="-20" rx="30" ry="35" fill="none" stroke="${COLORS.copper}" stroke-width="1.5" opacity="0.5"/>
        <line x1="0" y1="15" x2="0" y2="30" stroke="${COLORS.copper}" stroke-width="2" opacity="0.5"/>
        <ellipse cx="0" cy="35" rx="15" ry="5" fill="none" stroke="${COLORS.copper}" stroke-width="1" opacity="0.4"/>
        <ellipse cx="0" cy="0" rx="22" ry="20" fill="${COLORS.copper}" opacity="0.06"/>
    `,

    // Liqueur bottle (ornate)  
    liqueur: `
        <rect x="-15" y="-60" width="30" height="80" rx="6" fill="none" stroke="${COLORS.gold}" stroke-width="1.5" opacity="0.5"/>
        <rect x="-8" y="-72" width="16" height="14" rx="3" fill="none" stroke="${COLORS.gold}" stroke-width="1.2" opacity="0.4"/>
        <circle cx="0" cy="-82" r="4" fill="${COLORS.gold}" opacity="0.2"/>
        <rect x="-12" y="-35" width="24" height="30" rx="3" fill="${COLORS.gold}" opacity="0.07"/>
        <circle cx="0" cy="-20" r="8" fill="none" stroke="${COLORS.gold}" stroke-width="0.8" opacity="0.25"/>
    `,

    // Digestif/aperitif glass
    digestif: `
        <path d="M -20 -50 L -10 15 L 10 15 L 20 -50 Z" fill="none" stroke="${COLORS.deepRed}" stroke-width="1.5" opacity="0.5"/>
        <line x1="0" y1="15" x2="0" y2="30" stroke="${COLORS.deepRed}" stroke-width="2" opacity="0.5"/>
        <ellipse cx="0" cy="35" rx="14" ry="5" fill="none" stroke="${COLORS.deepRed}" stroke-width="1" opacity="0.4"/>
        <line x1="-16" y1="-30" x2="16" y2="-30" stroke="${COLORS.deepRed}" stroke-width="0.8" opacity="0.25"/>
        <rect x="-15" y="-30" width="30" height="35" fill="${COLORS.deepRed}" opacity="0.06"/>
    `,

    // Wine glass
    wine: `
        <ellipse cx="0" cy="-30" rx="28" ry="35" fill="none" stroke="${COLORS.wine}" stroke-width="1.5" opacity="0.55"/>
        <line x1="0" y1="5" x2="0" y2="30" stroke="${COLORS.wine}" stroke-width="2" opacity="0.5"/>
        <ellipse cx="0" cy="35" rx="18" ry="6" fill="none" stroke="${COLORS.wine}" stroke-width="1" opacity="0.4"/>
        <ellipse cx="0" cy="-10" rx="20" ry="18" fill="${COLORS.wine}" opacity="0.08"/>
    `,

    // Beer mug
    beer: `
        <rect x="-20" y="-50" width="35" height="70" rx="4" fill="none" stroke="${COLORS.goldLight}" stroke-width="1.5" opacity="0.55"/>
        <path d="M 15 -35 Q 30 -30 30 -15 Q 30 0 15 5" fill="none" stroke="${COLORS.goldLight}" stroke-width="1.5" opacity="0.4"/>
        <rect x="-16" y="-45" width="27" height="15" fill="${COLORS.goldLight}" opacity="0.06"/>
        <ellipse cx="-3" cy="-50" rx="17" ry="6" fill="none" stroke="${COLORS.goldLight}" stroke-width="1" opacity="0.3"/>
    `,

    // Shot glass
    shot: `
        <path d="M -10 20 L -15 -30 L 15 -30 L 10 20 Z" fill="none" stroke="${COLORS.goldLight}" stroke-width="1.5" opacity="0.5"/>
        <line x1="-13" y1="-15" x2="13" y2="-15" stroke="${COLORS.goldLight}" stroke-width="0.8" opacity="0.3"/>
        <rect x="-12" y="-15" width="24" height="28" fill="${COLORS.goldLight}" opacity="0.06"/>
        <ellipse cx="0" cy="22" rx="10" ry="3" fill="none" stroke="${COLORS.goldLight}" stroke-width="0.8" opacity="0.3"/>
    `,

    // Soft drink / coffee
    soft: `
        <rect x="-14" y="-50" width="28" height="70" rx="12" fill="none" stroke="${COLORS.cream}" stroke-width="1.5" opacity="0.4"/>
        <circle cx="0" cy="-58" r="5" fill="none" stroke="${COLORS.cream}" stroke-width="1" opacity="0.3"/>
        <rect x="-10" y="-20" width="20" height="30" fill="${COLORS.cream}" opacity="0.05"/>
        <path d="M -8 0 Q 0 8 8 0" stroke="${COLORS.cream}" stroke-width="0.8" fill="none" opacity="0.25"/>
    `,
};

// ═══════════════════════════════════════════════
// ITEMS TO GENERATE
// ═══════════════════════════════════════════════

const items = [
    // ── Wine ──
    { file: 'wine-white-180.svg', name: 'Бяло вино', subtitle: 'чаша 180 мл', icon: icons.wine, color: COLORS.gold },
    { file: 'wine-white-375.svg', name: 'Бяло вино', subtitle: '375 мл', icon: icons.wine, color: COLORS.gold },
    { file: 'wine-white-750.svg', name: 'Бяло вино', subtitle: '750 мл', icon: icons.wine, color: COLORS.gold },
    { file: 'wine-red-180.svg', name: 'Червено вино', subtitle: 'чаша 180 мл', icon: icons.wine, color: COLORS.wine },
    { file: 'wine-red-375.svg', name: 'Червено вино', subtitle: '375 мл', icon: icons.wine, color: COLORS.wine },
    { file: 'wine-red-750.svg', name: 'Червено вино', subtitle: '750 мл', icon: icons.wine, color: COLORS.wine },
    { file: 'wine-rose-180.svg', name: 'Розе', subtitle: 'чаша 180 мл', icon: icons.wine, color: '#c97b84' },
    { file: 'wine-rose-375.svg', name: 'Розе', subtitle: '375 мл', icon: icons.wine, color: '#c97b84' },
    { file: 'wine-rose-750.svg', name: 'Розе', subtitle: '750 мл', icon: icons.wine, color: '#c97b84' },
    { file: 'wine-moet.svg', name: 'Moët Chandon', subtitle: 'Шампанско', icon: icons.wine, color: COLORS.gold },
    { file: 'wine-prosecco.svg', name: 'Prosecco', subtitle: 'Шампанско', icon: icons.wine, color: COLORS.goldLight },

    // ── Whiskey (items without images) ──
    { file: 'wh-jw-red.svg', name: 'JW Red Label', subtitle: 'Уиски 50 мл', icon: icons.whiskey, color: COLORS.deepRed },
    { file: 'wh-jb.svg', name: 'J&B', subtitle: 'Уиски 50 мл', icon: icons.whiskey, color: COLORS.gold },
    { file: 'wh-bushmills.svg', name: 'Bushmills', subtitle: 'Уиски 50 мл', icon: icons.whiskey, color: COLORS.amber },
    { file: 'wh-jameson.svg', name: 'Jameson', subtitle: 'Уиски 50 мл', icon: icons.whiskey, color: COLORS.emerald },
    { file: 'wh-black-bush.svg', name: 'Black Bush', subtitle: 'Уиски 50 мл', icon: icons.whiskey, color: COLORS.smoke },
    { file: 'wh-monkey-shoulder.svg', name: 'Monkey Shoulder', subtitle: 'Уиски 50 мл', icon: icons.whiskey, color: COLORS.amber },
    { file: 'wh-jack-daniels.svg', name: "Jack Daniel's", subtitle: 'Уиски 50 мл', icon: icons.whiskey, color: COLORS.smoke },
    { file: 'wh-jw-black.svg', name: 'JW Black Label', subtitle: 'Отлежало 50 мл', icon: icons.whiskey, color: COLORS.smoke },
    { file: 'wh-jw-green.svg', name: 'JW Green Label', subtitle: 'Отлежало 50 мл', icon: icons.whiskey, color: COLORS.emerald },
    { file: 'wh-jw-gold.svg', name: 'JW Gold Label', subtitle: 'Отлежало 50 мл', icon: icons.whiskey, color: COLORS.gold },
    { file: 'wh-chivas-12.svg', name: 'Chivas Regal 12', subtitle: 'Отлежало 50 мл', icon: icons.whiskey, color: COLORS.deepRed },
    { file: 'wh-jd-barrel.svg', name: 'JD Single Barrel', subtitle: 'Отлежало 50 мл', icon: icons.whiskey, color: COLORS.amber },
    { file: 'wh-glen-12.svg', name: 'Glenfiddich 12', subtitle: 'Отлежало 50 мл', icon: icons.whiskey, color: COLORS.emerald },
    { file: 'wh-glen-15.svg', name: 'Glenfiddich 15', subtitle: 'Отлежало 50 мл', icon: icons.whiskey, color: COLORS.amber },

    // ── Bourbon ──
    { file: 'bourbon-jim-beam.svg', name: 'Jim Beam', subtitle: 'Бърбън 50 мл', icon: icons.bourbon, color: COLORS.amber },
    { file: 'bourbon-makers-mark.svg', name: "Maker's Mark", subtitle: 'Бърбън 50 мл', icon: icons.bourbon, color: COLORS.deepRed },
    { file: 'bourbon-four-roses.svg', name: 'Four Roses', subtitle: 'Бърбън 50 мл', icon: icons.bourbon, color: COLORS.gold },
    { file: 'bourbon-wild-turkey.svg', name: 'Wild Turkey', subtitle: 'Бърбън 50 мл', icon: icons.bourbon, color: COLORS.amber },

    // ── Vodka (items without images) ──
    { file: 'vodka-savoy.svg', name: 'Savoy', subtitle: 'Водка 50 мл', icon: icons.vodka, color: COLORS.sapphire },
    { file: 'vodka-zytnia.svg', name: 'Zytnia', subtitle: 'Водка 50 мл', icon: icons.vodka, color: COLORS.emerald },
    { file: 'vodka-smirnoff.svg', name: 'Smirnoff', subtitle: 'Водка 50 мл', icon: icons.vodka, color: COLORS.deepRed },
    { file: 'vodka-absolut.svg', name: 'Absolut', subtitle: 'Водка 50 мл', icon: icons.vodka, color: COLORS.sapphire },
    { file: 'vodka-finlandia.svg', name: 'Finlandia', subtitle: 'Водка 50 мл', icon: icons.vodka, color: COLORS.sapphire },

    // ── Gin (items without images) ──
    { file: 'gin-savoy.svg', name: 'Savoy', subtitle: 'Джин 50 мл', icon: icons.gin, color: COLORS.emerald },
    { file: 'gin-gordons.svg', name: "Gordon's", subtitle: 'Джин 50 мл', icon: icons.gin, color: COLORS.emerald },
    { file: 'gin-beefeater.svg', name: 'Beefeater', subtitle: 'Джин 50 мл', icon: icons.gin, color: COLORS.deepRed },
    { file: 'gin-bombay.svg', name: 'Bombay Sapphire', subtitle: 'Джин 50 мл', icon: icons.gin, color: COLORS.sapphire },

    // ── Rum ──
    { file: 'rum-savoy.svg', name: 'Savoy White/Red', subtitle: 'Ром 50 мл', icon: icons.rum, color: COLORS.copper },
    { file: 'rum-captain.svg', name: 'Captain Morgan', subtitle: 'Ром 50 мл', icon: icons.rum, color: COLORS.amber },
    { file: 'rum-captain-gold.svg', name: 'Captain Morgan Gold', subtitle: 'Ром 50 мл', icon: icons.rum, color: COLORS.gold },
    { file: 'rum-havana.svg', name: 'Havana Club', subtitle: 'Ром 50 мл', icon: icons.rum, color: COLORS.deepRed },
    { file: 'rum-havana7.svg', name: 'Havana Club 7 y.o.', subtitle: 'Ром 50 мл', icon: icons.rum, color: COLORS.amber },
    { file: 'rum-malibu.svg', name: 'Malibu', subtitle: 'Ром 50 мл', icon: icons.rum, color: COLORS.cream },

    // ── Tequila ──
    { file: 'tequila-savoy.svg', name: 'Savoy', subtitle: 'Текила 30 мл', icon: icons.tequila, color: COLORS.goldLight },
    { file: 'tequila-cuervo-silver.svg', name: 'Jose Cuervo Silver', subtitle: 'Текила 30 мл', icon: icons.tequila, color: COLORS.cream },
    { file: 'tequila-cuervo-repo.svg', name: 'Jose Cuervo Repo', subtitle: 'Текила 30 мл', icon: icons.tequila, color: COLORS.gold },

    // ── Rakiya ──
    { file: 'rakiya-pomorie-grape.svg', name: 'Поморийска гроздова', subtitle: 'Ракия 50 мл', icon: icons.rakiya, color: COLORS.amber },
    { file: 'rakiya-pomorie-muscat.svg', name: 'Поморийска мускатова', subtitle: 'Ракия 50 мл', icon: icons.rakiya, color: COLORS.gold },
    { file: 'rakiya-burgas63.svg', name: 'Бургас 63', subtitle: 'Ракия 50 мл', icon: icons.rakiya, color: COLORS.amber },
    { file: 'rakiya-sungurlare.svg', name: 'Сунгурларска', subtitle: 'Ракия 50 мл', icon: icons.rakiya, color: COLORS.gold },
    { file: 'rakiya-sliven.svg', name: 'Сливенска перла', subtitle: 'Ракия 50 мл', icon: icons.rakiya, color: COLORS.amber },
    { file: 'rakiya-troyan.svg', name: 'Троянска сливова', subtitle: 'Ракия 50 мл', icon: icons.rakiya, color: COLORS.copper },

    // ── Brandy ──
    { file: 'brandy-karnobat.svg', name: 'Karnobat', subtitle: 'Бренди 50 мл', icon: icons.brandy, color: COLORS.copper },
    { file: 'brandy-metaxa.svg', name: 'Metaxa', subtitle: 'Бренди 50 мл', icon: icons.brandy, color: COLORS.gold },
    { file: 'brandy-courvoisier.svg', name: 'Courvoisier', subtitle: 'Бренди 50 мл', icon: icons.brandy, color: COLORS.gold },

    // ── Liqueurs ──
    { file: 'liqueur-baileys.svg', name: "Bailey's", subtitle: 'Ликьор 50 мл', icon: icons.liqueur, color: COLORS.cream },
    { file: 'liqueur-aftershock.svg', name: 'After Shock', subtitle: 'Ликьор', icon: icons.liqueur, color: COLORS.deepRed },
    { file: 'liqueur-pitu.svg', name: 'Pitu', subtitle: 'Ликьор 50 мл', icon: icons.liqueur, color: COLORS.emerald },
    { file: 'liqueur-kahlua.svg', name: 'Kahlúa', subtitle: 'Ликьор 50 мл', icon: icons.liqueur, color: COLORS.copper },
    { file: 'liqueur-galliano.svg', name: 'Galliano', subtitle: 'Ликьор', icon: icons.liqueur, color: COLORS.gold },
    { file: 'liqueur-cointreau.svg', name: 'Cointreau', subtitle: 'Ликьор 50 мл', icon: icons.liqueur, color: COLORS.amber },
    { file: 'liqueur-disaronno.svg', name: 'Disaronno', subtitle: 'Ликьор 50 мл', icon: icons.liqueur, color: COLORS.amber },
    { file: 'liqueur-skinos.svg', name: 'Skinos', subtitle: 'Ликьор', icon: icons.liqueur, color: COLORS.emerald },

    // ── Digestifs ──
    { file: 'digestif-ouzo-plomari.svg', name: 'Ouzo Plomari', subtitle: 'Дижестив 50 мл', icon: icons.digestif, color: COLORS.sapphire },
    { file: 'digestif-ouzo-12.svg', name: 'Ouzo 12', subtitle: 'Дижестив 50 мл', icon: icons.digestif, color: COLORS.sapphire },
    { file: 'digestif-absinthe.svg', name: 'Absinthe', subtitle: 'Дижестив 50 мл', icon: icons.digestif, color: COLORS.emerald },
    { file: 'digestif-mastika.svg', name: 'Мастика Карнобат', subtitle: 'Дижестив 50 мл', icon: icons.digestif, color: COLORS.cream },
    { file: 'digestif-mint-karnobat.svg', name: 'Мента Карнобат', subtitle: 'Дижестив 50 мл', icon: icons.digestif, color: COLORS.emerald },
    { file: 'digestif-pernod.svg', name: 'Pernod', subtitle: 'Дижестив 50 мл', icon: icons.digestif, color: COLORS.gold },
    { file: 'digestif-ricard.svg', name: 'Ricard', subtitle: 'Дижестив 50 мл', icon: icons.digestif, color: COLORS.gold },
    { file: 'digestif-jagermeister.svg', name: 'Jägermeister', subtitle: 'Дижестив', icon: icons.digestif, color: COLORS.emerald },
    { file: 'digestif-aperol.svg', name: 'Aperol', subtitle: 'Дижестив 50 мл', icon: icons.digestif, color: '#e8702a' },
    { file: 'digestif-campari.svg', name: 'Campari', subtitle: 'Дижестив 50 мл', icon: icons.digestif, color: COLORS.deepRed },
    { file: 'digestif-martini.svg', name: 'Martini', subtitle: 'Дижестив 50 мл', icon: icons.digestif, color: COLORS.deepRed },
    { file: 'digestif-sambuca.svg', name: 'Sambuca', subtitle: 'Дижестив', icon: icons.digestif, color: COLORS.cream },
    { file: 'digestif-fernet.svg', name: 'Fernet-Branca', subtitle: 'Дижестив', icon: icons.digestif, color: COLORS.emerald },
    { file: 'digestif-branca-menta.svg', name: 'Branca Menta', subtitle: 'Дижестив', icon: icons.digestif, color: COLORS.emerald },
    { file: 'digestif-marie-brizard.svg', name: 'Marie Brizard Mint', subtitle: 'Дижестив 50 мл', icon: icons.digestif, color: COLORS.emerald },

    // ── Beer ──
    { file: 'beer-bohem.svg', name: 'Bohem', subtitle: 'Наливна 400 мл', icon: icons.beer, color: COLORS.goldLight },
    { file: 'beer-radeberger.svg', name: 'Radeberger', subtitle: 'Наливна 400 мл', icon: icons.beer, color: COLORS.gold },
    { file: 'beer-estrella.svg', name: 'Estrella Damm', subtitle: 'Бутилка 330 мл', icon: icons.beer, color: COLORS.deepRed },
    { file: 'beer-radeberger-bottle.svg', name: 'Radeberger Pilsner', subtitle: 'Бутилка 330 мл', icon: icons.beer, color: COLORS.gold },
    { file: 'beer-bernard.svg', name: 'Bernard Blond', subtitle: 'Бутилка 330 мл', icon: icons.beer, color: COLORS.goldLight },
    { file: 'beer-clausthaler.svg', name: 'Clausthaler 0.0%', subtitle: 'Безалкохолна', icon: icons.beer, color: COLORS.emerald },

    // ── Soft drinks ──
    { file: 'soft-water.svg', name: 'Минерална вода', subtitle: 'Безалкохолна', icon: icons.soft, color: COLORS.sapphire },
    { file: 'soft-soda.svg', name: 'Газирана вода', subtitle: 'Безалкохолна', icon: icons.soft, color: COLORS.sapphire },
    { file: 'soft-coca-cola.svg', name: 'Coca-Cola', subtitle: '330 мл', icon: icons.soft, color: COLORS.deepRed },
    { file: 'soft-red-bull.svg', name: 'Red Bull', subtitle: 'Енергийна', icon: icons.soft, color: COLORS.sapphire },
    { file: 'soft-juice.svg', name: 'Натурален сок', subtitle: 'Безалкохолна', icon: icons.soft, color: '#e8702a' },
    { file: 'soft-perrier.svg', name: 'Perrier', subtitle: '330 мл', icon: icons.soft, color: COLORS.emerald },
    { file: 'soft-ice-tea.svg', name: 'Студен чай', subtitle: 'Безалкохолна', icon: icons.soft, color: COLORS.amber },
    { file: 'soft-tea.svg', name: 'Чай Twinings', subtitle: 'Горещи напитки', icon: icons.soft, color: COLORS.amber },
    { file: 'soft-espresso.svg', name: 'Еспресо', subtitle: 'Горещи напитки', icon: icons.soft, color: COLORS.copper },
    { file: 'soft-cappuccino.svg', name: 'Капучино', subtitle: 'Горещи напитки', icon: icons.soft, color: COLORS.copper },
    { file: 'soft-latte.svg', name: 'Лате', subtitle: 'Горещи напитки', icon: icons.soft, color: COLORS.cream },
    { file: 'soft-nuts.svg', name: 'Ядки', subtitle: 'Екстри', icon: icons.soft, color: COLORS.amber },
    { file: 'soft-carrots.svg', name: 'Чаша моркови', subtitle: 'Екстри', icon: icons.soft, color: '#e8702a' },
    { file: 'soft-olives.svg', name: 'Маслини', subtitle: 'Екстри', icon: icons.soft, color: COLORS.emerald },
    { file: 'soft-chocolate.svg', name: 'Шоколад', subtitle: 'Екстри', icon: icons.soft, color: COLORS.copper },

    // ── Shots ──
    { file: 'shot-tequila.svg', name: 'Текила', subtitle: 'Шот 30 мл', icon: icons.shot, color: COLORS.goldLight },
    { file: 'shot-bloody-mary.svg', name: 'Bloody Mary 6бр', subtitle: 'Шотове', icon: icons.shot, color: COLORS.deepRed },
    { file: 'shot-jagermeister.svg', name: 'Jägermeister', subtitle: 'Шот 30 мл', icon: icons.shot, color: COLORS.emerald },
    { file: 'shot-arabic.svg', name: 'Арабска Свирка', subtitle: 'Шот 30 мл', icon: icons.shot, color: COLORS.gold },
];

// ═══════════════════════════════════════════════
// GENERATE ALL SVGs
// ═══════════════════════════════════════════════

let count = 0;
for (const item of items) {
    const svg = createSVG(item.name, item.subtitle, item.icon, item.color);
    const filepath = path.join(OUTPUT_DIR, item.file);
    fs.writeFileSync(filepath, svg, 'utf8');
    count++;
}

console.log(`✅ Generated ${count} SVG menu images in ${OUTPUT_DIR}`);
console.log(`\nCategories covered:`);
console.log(`  • Wine: 11 images`);
console.log(`  • Whiskey: 14 images`);
console.log(`  • Bourbon: 4 images`);
console.log(`  • Vodka: 5 images`);
console.log(`  • Gin: 4 images`);
console.log(`  • Rum: 6 images`);
console.log(`  • Tequila: 3 images`);
console.log(`  • Rakiya: 6 images`);
console.log(`  • Brandy: 3 images`);
console.log(`  • Liqueurs: 8 images`);
console.log(`  • Digestifs: 15 images`);
console.log(`  • Beer: 6 images`);
console.log(`  • Soft drinks: 15 images`);
console.log(`  • Shots: 4 images`);
