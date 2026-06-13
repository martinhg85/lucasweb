// Temporal: genera los PDF de v5 y v6 con el mismo nombre que su carpeta.
// Requiere el dev server en localhost:4321. Borrar este script tras usarlo.
import { chromium } from "@playwright/test";
import { PDFDocument } from "pdf-lib";
import { mkdir, readdir, writeFile } from "node:fs/promises";

const ROOT = "/Users/martin.guadalupe/Projects/webs/lucas-contreras-sh";
const OUT_DIR = `${ROOT}/output`;
await mkdir(OUT_DIR, { recursive: true });

const DECKS = ["presentacion-v5-feedback", "presentacion-v6-feedback"];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

for (const deck of DECKS) {
  console.log(`\n→ ${deck}`);
  const dir = `${ROOT}/src/pages/${deck}`;
  const slideNums = (await readdir(dir))
    .filter((f) => /^\d+\.astro$/.test(f))
    .map((f) => parseInt(f, 10))
    .sort((a, b) => a - b);

  const merged = await PDFDocument.create();

  for (const n of slideNums) {
    process.stdout.write(`  slide ${n} ... `);
    await page.goto(`http://localhost:4321/${deck}/${n}`, {
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

  const outPath = `${OUT_DIR}/${deck}.pdf`;
  await writeFile(outPath, await merged.save());
  console.log(`  → ${outPath}`);
}

await browser.close();
console.log("\nListo.");
