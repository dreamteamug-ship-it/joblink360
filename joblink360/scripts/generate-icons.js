// scripts/generate-icons.js
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const outputDir = path.join(__dirname, '../public/icons');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// SVG template for icon
const svgTemplate = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#050B14"/>
  <circle cx="256" cy="256" r="200" fill="#D4AF37"/>
  <text x="256" y="320" text-anchor="middle" fill="#050B14" font-size="120" font-weight="bold" font-family="Arial">A</text>
</svg>`;

// For simplicity, create placeholder icons
// In production, you'd use sharp or similar to generate PNGs
console.log('Icons will be generated at build time');
