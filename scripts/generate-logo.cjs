const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Create high quality SVG for white CBS logo
const svgLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 280" width="520" height="280">
  <defs>
    <style>
      .cbs-text {
        font-family: 'Impact', 'Arial Black', 'Trebuchet MS', sans-serif;
        font-weight: 900;
        font-style: italic;
        font-size: 135px;
        fill: #ffffff;
        letter-spacing: -3px;
      }
      .sub-text {
        font-family: 'Arial', 'Helvetica', sans-serif;
        font-weight: 700;
        font-size: 27px;
        fill: #ffffff;
        letter-spacing: -0.3px;
      }
    </style>
  </defs>

  <!-- Top Feather / Wing 1 -->
  <path
    d="M 125 125 C 210 60, 340 8, 485 0 C 375 38, 245 84, 168 128 Z"
    fill="#ffffff"
  />

  <!-- Middle Feather / Wing 2 -->
  <path
    d="M 148 120 C 232 78, 350 36, 460 32 C 362 58, 255 92, 182 126 Z"
    fill="#ffffff"
  />

  <!-- Bottom Feather / Wing 3 -->
  <path
    d="M 178 116 C 255 90, 350 72, 435 72 C 350 86, 265 106, 202 124 Z"
    fill="#ffffff"
  />

  <!-- CBS Text -->
  <text x="65" y="212" class="cbs-text">CBS</text>

  <!-- Subtitle Text -->
  <text x="5" y="258" class="sub-text">Central Bureau of Statistics Curaçao</text>
</svg>`;

async function main() {
  const publicDir = path.join(__dirname, '..', 'public');
  const svgPath = path.join(publicDir, 'cbs-logo.svg');
  
  fs.writeFileSync(svgPath, svgLogo, 'utf8');
  console.log('Saved SVG to:', svgPath);

  // Convert to high-res transparent PNGs
  const pngBuffer = await sharp(Buffer.from(svgLogo))
    .resize(1040, 560)
    .png()
    .toBuffer();

  const targetFiles = [
    'cbs_logo-01.png',
    'cbs-logo-fixed.png',
    'cbs-logo.png',
    'cbs-official.png',
    'test-cbs.png'
  ];

  for (const fileName of targetFiles) {
    const filePath = path.join(publicDir, fileName);
    fs.writeFileSync(filePath, pngBuffer);
    console.log('Saved PNG to:', filePath);
  }

  // Also sync to dist if dist exists
  const distDir = path.join(__dirname, '..', 'dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'cbs-logo.svg'), svgLogo, 'utf8');
    for (const fileName of targetFiles) {
      fs.writeFileSync(path.join(distDir, fileName), pngBuffer);
    }
    console.log('Synced files to dist/');
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
