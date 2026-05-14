// Genera el .pptx de los módulos feedback (preventiva, reactiva, preventiva-reactiva).
// Cada slide va como imagen full-bleed (mismo look exacto que el PDF), listo para Google Slides.
// Requiere el dev server corriendo en el puerto 4399.
//
// Uso:
//   node scripts/pptx-presentacion-feedback.mjs                       # los 3 módulos
//   node scripts/pptx-presentacion-feedback.mjs preventiva-reactiva
//   node scripts/pptx-presentacion-feedback.mjs reactiva

import { chromium } from "@playwright/test";
import pptxgen from "pptxgenjs";
import { mkdir, readdir } from "node:fs/promises";

const ARG = (process.argv[2] || "").toLowerCase();
const MODULOS = ARG ? [ARG] : ["preventiva", "reactiva", "preventiva-reactiva"];
for (const m of MODULOS) {
  if (!["preventiva", "reactiva", "preventiva-reactiva"].includes(m)) {
    console.error(`Módulo inválido: "${m}". Usar preventiva, reactiva o preventiva-reactiva.`);
    process.exit(1);
  }
}

const PAGE_W = 11.69; // A4 landscape en pulgadas
const PAGE_H = 8.27;

const OUT_DIR = "/Users/martin.guadalupe/Projects/webs/lucas-contreras-sh/output";
await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();

for (const modulo of MODULOS) {
  const route = `presentacion-v3-feedback/${modulo}`;
  console.log(`\n→ ${route}`);

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

  const outPath = `${OUT_DIR}/presentacion-feedback-v1-${modulo}.pptx`;
  await pres.writeFile({ fileName: outPath });
  console.log(`  → ${outPath}`);
}

await browser.close();
console.log("\nListo.");
