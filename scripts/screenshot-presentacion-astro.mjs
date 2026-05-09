// Captura las 5 páginas de /presentacion/ en su tamaño físico A4 landscape:
//   297mm × 210mm  →  ~1123×794 px @ 96dpi
// Pero Playwright trabaja en px directos y nuestro CSS usa unidades mm,
// así que viewport más grande para no truncar.

import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const OUT = "/Users/martin.guadalupe/Projects/webs/lucas-contreras-sh/screenshots/presentacion-astro";
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();

for (const n of [1, 2, 3, 4, 5]) {
  process.stdout.write(`  ${n}.png ... `);
  await page.goto(`http://localhost:4323/presentacion/${n}`, {
    waitUntil: "networkidle",
    timeout: 15000,
  });
  // Esconder controles de navegación + dev toolbar
  await page.addStyleTag({
    content: `
      .nav-controls, astro-dev-toolbar { display: none !important; }
      body { background: white !important; }
      .slide { margin: 0 !important; box-shadow: none !important; }
    `,
  });
  await page.waitForTimeout(500);

  // Forzar carga de imágenes
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

  // Screenshot del .slide específicamente
  const el = await page.$(".slide");
  await el.screenshot({ path: `${OUT}/${n}.png` });
  console.log("OK");
}

await browser.close();
console.log(`\n→ ${OUT}`);
