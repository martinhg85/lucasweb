// Captura las 5 páginas de /presentacion-cabarco-{v1|v2}/ en su tamaño físico A4 landscape.
// Apunta al puerto 4399 (dev server lanzado para la presentación CABARCO).
// Uso:
//   node scripts/screenshot-presentacion-cabarco.mjs        # default: v2 (activa)
//   node scripts/screenshot-presentacion-cabarco.mjs v1
//   node scripts/screenshot-presentacion-cabarco.mjs v2

import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const VERSION = (process.argv[2] || "v2").toLowerCase();
if (!["v1", "v2", "v3"].includes(VERSION)) {
  console.error(`Versión inválida: "${VERSION}". Usar v1 o v2.`);
  process.exit(1);
}

const ROUTE = `presentacion-cabarco-${VERSION}`;
const OUT = `/Users/martin.guadalupe/Projects/webs/lucas-contreras-sh/screenshots/${ROUTE}`;
await mkdir(OUT, { recursive: true });

console.log(`→ Capturando ${ROUTE} (puerto 4399)`);

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();

for (const n of [1, 2, 3, 4, 5]) {
  process.stdout.write(`  ${n}.png ... `);
  await page.goto(`http://localhost:4399/${ROUTE}/${n}`, {
    waitUntil: "networkidle",
    timeout: 15000,
  });
  await page.addStyleTag({
    content: `
      .nav-controls, astro-dev-toolbar { display: none !important; }
      body { background: white !important; }
      .slide { margin: 0 !important; box-shadow: none !important; }
    `,
  });
  await page.waitForTimeout(500);

  await page.evaluate(async () => {
    const imgs = [...document.images];
    imgs.forEach((img) => img.setAttribute("loading", "eager"));
    await Promise.all(
      imgs.map((img) =>
        img.complete
          ? null
          : new Promise((res) => {
              img.addEventListener("load", res, { once: true });
              img.addEventListener("error", res, { once: true });
            })
      )
    );
  });
  await page.waitForTimeout(300);

  const el = await page.$(".slide");
  await el.screenshot({ path: `${OUT}/${n}.png` });
  console.log("OK");
}

await browser.close();
console.log(`\n→ ${OUT}`);
