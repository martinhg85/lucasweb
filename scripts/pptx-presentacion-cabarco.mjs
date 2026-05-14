// Genera un .pptx por versión (v1, v2, v3) de la presentación CABARCO.
// Cada slide del pptx es un screenshot full-bleed (mismo look exacto que el PDF).
// Pensado para subir a Google Slides: el archivo se importa nativo.
// Requiere el dev server corriendo en el puerto 4399.
//
// Uso:
//   node scripts/pptx-presentacion-cabarco.mjs         # las 3 versiones
//   node scripts/pptx-presentacion-cabarco.mjs v3      # solo una

import { chromium } from "@playwright/test";
import pptxgen from "pptxgenjs";
import { mkdir, readdir } from "node:fs/promises";

const ARG = (process.argv[2] || "").toLowerCase();
const VERSIONS = ARG ? [ARG] : ["v1", "v2", "v3", "v4"];
for (const v of VERSIONS) {
  if (!["v1", "v2", "v3", "v4"].includes(v)) {
    console.error(`Versión inválida: "${v}". Usar v1, v2, v3 o v4.`);
    process.exit(1);
  }
}

// A4 landscape en pulgadas (mismas proporciones que el PDF).
const PAGE_W = 11.69;
const PAGE_H = 8.27;

const OUT_DIR = "/Users/martin.guadalupe/Projects/webs/lucas-contreras-sh/output";
await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();

for (const version of VERSIONS) {
  const route = `presentacion-cabarco-${version}`;
  console.log(`\n→ ${route}`);

  // Detectar cantidad de slides leyendo el directorio
  const dir = `/Users/martin.guadalupe/Projects/webs/lucas-contreras-sh/src/pages/${route}`;
  const slideNums = (await readdir(dir))
    .filter((f) => /^\d+\.astro$/.test(f))
    .map((f) => parseInt(f, 10))
    .sort((a, b) => a - b);

  const pres = new pptxgen();
  pres.defineLayout({ name: "A4LAND", width: PAGE_W, height: PAGE_H });
  pres.layout = "A4LAND";

  for (const n of slideNums) {
    process.stdout.write(`  slide ${n} ... `);

    await page.goto(`http://localhost:4399/${route}/${n}`, {
      waitUntil: "networkidle",
      timeout: 15000,
    });
    await page.addStyleTag({
      content: `
        .nav-controls, astro-dev-toolbar { display: none !important; }
        body { background: white !important; margin: 0 !important; }
        .slide { margin: 0 !important; box-shadow: none !important; }
      `,
    });
    await page.waitForTimeout(400);

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
    const buf = await el.screenshot({ type: "png" });
    const dataUrl = `data:image/png;base64,${buf.toString("base64")}`;

    const slide = pres.addSlide();
    slide.addImage({ data: dataUrl, x: 0, y: 0, w: PAGE_W, h: PAGE_H });

    console.log("OK");
  }

  const outPath = `${OUT_DIR}/presentacion-${version}.pptx`;
  await pres.writeFile({ fileName: outPath });
  console.log(`  → ${outPath}`);
}

await browser.close();
console.log("\nListo.");
