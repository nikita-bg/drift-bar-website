const sharp = require('sharp');

// D.J. Retro - Retro DJ set placeholder
const djRetroSvg = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#e67e22;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#d35400;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#grad1)"/>
  <text x="400" y="250" font-family="Arial, sans-serif" font-size="80" font-weight="bold" fill="white" text-anchor="middle">DJ RETRO</text>
  <text x="400" y="350" font-family="Arial, sans-serif" font-size="40" fill="white" text-anchor="middle" opacity="0.9">11.03 • Сряда • 21:00</text>
  <circle cx="200" cy="450" r="60" fill="white" opacity="0.2"/>
  <circle cx="600" cy="150" r="80" fill="white" opacity="0.15"/>
</svg>`;

// The Four Tones - Heavy Metal placeholder
const fourTonesSvg = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#c0392b;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#922B21;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#grad2)"/>
  <text x="400" y="230" font-family="Arial, sans-serif" font-size="70" font-weight="bold" fill="white" text-anchor="middle">THE FOUR</text>
  <text x="400" y="310" font-family="Arial, sans-serif" font-size="70" font-weight="bold" fill="white" text-anchor="middle">TONES</text>
  <text x="400" y="380" font-family="Arial, sans-serif" font-size="35" fill="white" text-anchor="middle" opacity="0.9">Heavy Metal</text>
  <text x="400" y="430" font-family="Arial, sans-serif" font-size="30" fill="white" text-anchor="middle" opacity="0.8">14.03 • Събота • 21:00</text>
</svg>`;

const fs = require('fs');
fs.writeFileSync('dj-retro.svg', djRetroSvg);
fs.writeFileSync('the-four-tones.svg', fourTonesSvg);

console.log('Placeholder images generated');
