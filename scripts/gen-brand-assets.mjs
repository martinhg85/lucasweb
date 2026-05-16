// Genera assets raster de marca a partir del SVG de marca chwork:
//   public/favicon-32.png     (favicon PNG fallback)
//   public/apple-touch-icon.png (180x180, iOS)
//   public/og-default.jpg     (1200x630, vista previa al compartir)
// Uso: node scripts/gen-brand-assets.mjs
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const pub = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

const NAVY_900 = "#0f1849";
const NAVY_700 = "#1b2868";
const ORANGE = "#ee6a26";

// Marca chwork: idéntica a src/components/Logo.astro (cuadrado navy con esquina
// superior derecha cortada en diagonal + el corte relleno de naranja + CH/work).
const markSvg = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <path d="M 4 4 H 50 L 60 14 V 60 H 4 Z" fill="${NAVY_700}"/>
  <path d="M 50 4 H 60 V 14 Z" fill="${ORANGE}"/>
  <text x="32" y="38" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="900" fill="#fff" text-anchor="middle">CH</text>
  <text x="32" y="52" font-family="Arial, Helvetica, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle" letter-spacing="1.8">WORK</text>
</svg>`;

// OG 1200x630 branded.
const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${NAVY_900}"/>
      <stop offset="1" stop-color="${NAVY_700}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="10" fill="${ORANGE}"/>

  <!-- marca: misma geometría que Logo.astro, escalada (64u → ~165px) -->
  <g transform="translate(96 90) scale(2.58)">
    <path d="M 4 4 H 50 L 60 14 V 60 H 4 Z" fill="${NAVY_700}"/>
    <path d="M 50 4 H 60 V 14 Z" fill="${ORANGE}"/>
    <text x="32" y="38" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="900" fill="#fff" text-anchor="middle">CH</text>
    <text x="32" y="52" font-family="Arial, Helvetica, sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle" letter-spacing="1.8">WORK</text>
  </g>

  <text x="96" y="330" font-family="Arial, Helvetica, sans-serif" font-size="62" font-weight="800" fill="#ffffff">Seguridad e Higiene</text>
  <text x="96" y="404" font-family="Arial, Helvetica, sans-serif" font-size="62" font-weight="800" fill="#ffffff">del Trabajo</text>

  <rect x="98" y="442" width="88" height="6" fill="${ORANGE}"/>

  <text x="96" y="510" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="600" fill="#b3bce0">Asesoría integral · CABA y Provincia de Buenos Aires</text>
  <text x="96" y="566" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" fill="${ORANGE}" letter-spacing="1">chwork.com.ar</text>
</svg>`;

const out = [];

// La marca es navy sobre fondo claro (igual que en el header). Aplanamos sobre
// blanco para que no desaparezca en tabs/iOS con tema oscuro.
await sharp(Buffer.from(markSvg(64)))
  .resize(32, 32)
  .flatten({ background: "#ffffff" })
  .png()
  .toFile(join(pub, "favicon-32.png"));
out.push("favicon-32.png (32x32)");

await sharp({
  create: { width: 180, height: 180, channels: 4, background: "#ffffff" },
})
  .composite([{ input: await sharp(Buffer.from(markSvg(148))).png().toBuffer(), gravity: "center" }])
  .png()
  .toFile(join(pub, "apple-touch-icon.png"));
out.push("apple-touch-icon.png (180x180)");

await sharp(Buffer.from(ogSvg)).jpeg({ quality: 88 }).toFile(join(pub, "og-default.jpg"));
out.push("og-default.jpg (1200x630)");

console.log("Generados en public/:\n - " + out.join("\n - "));
