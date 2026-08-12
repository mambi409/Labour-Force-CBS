const sharp = require('sharp');
const fs = require('fs');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 320" width="1080" height="640">
  <g fill="#ffffff">
    <!-- Wing 1 (Top Feather) -->
    <path d="M 135 138 C 225 65, 385 10, 525 0 C 405 38, 265 85, 180 142 Z" />

    <!-- Wing 2 (Middle Feather) -->
    <path d="M 162 133 C 248 84, 382 42, 498 36 C 392 62, 272 98, 195 139 Z" />

    <!-- Wing 3 (Bottom Feather) -->
    <path d="M 195 128 C 272 98, 382 76, 472 76 C 378 92, 278 114, 218 135 Z" />

    <!-- Letter C -->
    <path d="M 132 155 C 112 155 92 163 78 177 C 62 192 56 210 60 227 C 65 244 82 255 104 255 C 126 255 146 246 158 232 L 136 218 C 128 227 117 232 108 232 C 96 232 88 225 86 215 C 83 205 88 192 97 184 C 105 175 117 171 127 171 C 136 171 145 175 150 182 L 170 168 C 160 159 147 155 132 155 Z" />

    <!-- Letter B -->
    <path d="M 172 157 L 144 253 L 204 253 C 226 253 243 243 247 227 C 250 216 244 207 233 202 C 242 198 246 189 243 178 C 239 164 224 157 201 157 Z M 181 174 L 198 174 C 207 174 214 178 215 184 C 217 190 212 194 203 194 L 186 194 Z M 175 209 L 194 209 C 204 209 212 214 214 221 C 215 228 209 235 198 235 L 168 235 Z" />

    <!-- Letter S -->
    <path d="M 308 172 C 300 162 287 157 271 157 C 250 157 235 167 239 181 C 241 191 251 196 267 200 C 286 205 297 210 294 225 C 291 242 270 255 244 255 C 224 255 208 247 201 232 L 221 221 C 227 230 236 236 246 236 C 258 236 267 230 268 223 C 270 216 263 211 247 207 C 228 201 216 194 219 179 C 223 162 244 155 270 155 C 288 155 304 162 313 174 Z" />

    <!-- Subtitle: Central Bureau of Statistics Curaçao -->
    <path d="M 12 278 H 528 V 298 H 12 Z" opacity="0" />
    <text x="10" y="296" font-family="'Arial Black', 'Arial', sans-serif" font-weight="900" font-size="28" letter-spacing="-0.5">Central Bureau of Statistics Curaçao</text>
  </g>
</svg>`;

async function generate() {
  const buf = Buffer.from(svg);
  
  await sharp(buf)
    .trim()
    .png()
    .toFile('public/cbs_logo-01.png');

  await sharp(buf)
    .trim()
    .png()
    .toFile('public/cbs-logo.png');

  await sharp(buf)
    .trim()
    .png()
    .toFile('public/cbs-official.png');

  console.log('Successfully regenerated all public logo files');
}

generate().catch(console.error);
