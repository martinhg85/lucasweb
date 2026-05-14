// Genera un PDF por versión (v1 y v2) de la presentación CABARCO.
// Combina los 5 slides en un único PDF A4 landscape sin márgenes.
// Requiere el dev server corriendo en el puerto 4399.
//
// Uso:
//   node scripts/pdf-presentacion-cabarco.mjs           # ambas versiones
//   node scripts/pdf-presentacion-cabarco.mjs v1
//   node scripts/pdf-presentacion-cabarco.mjs v2

import { chromium } from "@playwright/test";
import { PDFDocument } from "pdf-lib";
import { mkdir, readdir, writeFile } from "node:fs/promises";

const ARG = (process.argv[2] || "").toLowerCase();
const VERSIONS = ARG ? [ARG] : ["v1", "v2", "v3", "v4"];
for (const v of VERSIONS) {
  if (!["v1", "v2", "v3", "v4"].includes(v)) {
    console.error(`Versión inválida: "${v}". Usar v1, v2, v3 o v4.`);
    process.exit(1);
  }
}

const OUT_DIR = "/Users/martin.guadalupe/Projects/webs/lucas-contreras-sh/output";
await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 900 },
});
const page = await ctx.newPage();

for (const version of VERSIONS) {
  const route = `presentacion-cabarco-${version}`;
  console.log(`\n→ ${route}`);

  // Detectar la cantidad de slides leyendo el directorio (1.astro, 2.astro, ...).
  const dir = `/Users/martin.guadalupe/Projects/webs/lucas-contreras-sh/src/pages/${route}`;
  const slideNums = (await readdir(dir))
    .filter((f) => /^\d+\.astro$/.test(f))
    .map((f) => parseInt(f, 10))
    .sort((a, b) => a - b);

  const merged = await PDFDocument.create();

  for (const n of slideNums) {
    process.stdout.write(`  slide ${n} ... `);

    await page.goto(`http://localhost:4399/${route}/${n}`, {
      waitUntil: "networkidle",
      timeout: 15000,
    });

    // Ocultar nav y devtools; sacar márgenes/sombras del .slide
    await page.addStyleTag({
      content: `
        .nav-controls, astro-dev-toolbar { display: none !important; }
        body { background: white !important; margin: 0 !important; }
        .slide { margin: 0 !important; box-shadow: none !important; }
        @page { size: A4 landscape; margin: 0; }
      `,
    });

    // Esperar a que las imágenes terminen de cargar
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
    await page.waitForTimeout(400);

    const pdfBytes = await page.pdf({
      format: "A4",
      landscape: true,
      printBackground: true,
      margin: { top: "0mm", bottom: "0mm", left: "0mm", right: "0mm" },
      preferCSSPageSize: true,
    });

    // Mergear este slide al PDF acumulado
    const slidePdf = await PDFDocument.load(pdfBytes);
    const [copiedPage] = await merged.copyPages(slidePdf, [0]);
    merged.addPage(copiedPage);

    console.log("OK");
  }

  const finalBytes = await merged.save();
  const outPath = `${OUT_DIR}/presentacion-${version}.pdf`;
  await writeFile(outPath, finalBytes);
  console.log(`  → ${outPath}`);
}

await browser.close();
console.log("\nListo.");
