// Genera 2 PDFs separados (preventiva + reactiva) basados en el feedback de Lucas
// sobre v3: dividir en dos PDFs cortos, uno por modalidad de servicio.
// Requiere el dev server corriendo en el puerto 4399.
//
// Uso:
//   node scripts/pdf-presentacion-feedback.mjs              # las dos
//   node scripts/pdf-presentacion-feedback.mjs preventiva
//   node scripts/pdf-presentacion-feedback.mjs reactiva

import { chromium } from "@playwright/test";
import { PDFDocument } from "pdf-lib";
import { mkdir, readdir, writeFile } from "node:fs/promises";

const ARG = (process.argv[2] || "").toLowerCase();
const MODULOS = ARG ? [ARG] : ["preventiva", "reactiva", "preventiva-reactiva"];
for (const m of MODULOS) {
  if (!["preventiva", "reactiva", "preventiva-reactiva"].includes(m)) {
    console.error(`Módulo inválido: "${m}". Usar preventiva, reactiva o preventiva-reactiva.`);
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

for (const modulo of MODULOS) {
  const route = `presentacion-v3-feedback/${modulo}`;
  console.log(`\n→ ${route}`);

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

    await page.addStyleTag({
      content: `
        .nav-controls, astro-dev-toolbar { display: none !important; }
        body { background: white !important; margin: 0 !important; }
        .slide { margin: 0 !important; box-shadow: none !important; }
        @page { size: A4 landscape; margin: 0; }
      `,
    });

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

    const slidePdf = await PDFDocument.load(pdfBytes);
    const [copiedPage] = await merged.copyPages(slidePdf, [0]);
    merged.addPage(copiedPage);

    console.log("OK");
  }

  const finalBytes = await merged.save();
  const outPath = `${OUT_DIR}/presentacion-feedback-v1-${modulo}.pdf`;
  await writeFile(outPath, finalBytes);
  console.log(`  → ${outPath}`);
}

await browser.close();
console.log("\nListo.");
