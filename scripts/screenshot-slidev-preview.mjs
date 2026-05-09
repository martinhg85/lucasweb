// Captura preview de las slides actuales de Slidev (chwork presentación).
// Resolución 1920x1080 (16:9) que es lo estándar para licitaciones.

import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "screenshots/presentacion-preview");

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();

const slides = [
  { num: 1, name: "01-portada" },
  { num: 2, name: "02-servicios" },
];

for (const s of slides) {
  process.stdout.write(`  ${s.name}.png ... `);
  await page.goto(`http://localhost:3030/${s.num}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  // Esconder controles de Slidev
  await page.addStyleTag({
    content: `
      .slidev-controls, .slidev-page, [data-test="navigation-controls"] { display: none !important; }
    `,
  });
  await page.waitForTimeout(200);
  await page.screenshot({ path: join(OUT, `${s.name}.png`) });
  console.log("OK");
}

await browser.close();
console.log(`\n→ ${OUT}`);
