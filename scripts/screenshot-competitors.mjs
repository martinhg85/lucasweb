// Captura screenshots de los 7 competidores del rubro SyH para comparación visual
// con las 3 variantes de Lucas.
//
// Corre con: node scripts/screenshot-competitors.mjs

import { chromium, devices } from "@playwright/test";
import * as fs from "node:fs";
import * as path from "node:path";

const COMPETITORS = [
  { slug: "flowork", url: "https://www.flowork.com.ar/" },
  { slug: "ivana-medina", url: "https://www.consultoraseguridadehigiene.site/" },
  { slug: "highseg", url: "https://www.highseg.com.ar/" },
  { slug: "hise", url: "https://hise.com.ar/" },
  { slug: "cuenca", url: "https://cuencayasociados.com.ar/" },
  { slug: "previnnova", url: "https://www.previnnova.com.ar/" },
  { slug: "borex", url: "https://borex.com.ar/" },
];

const VIEWPORTS = [
  {
    name: "desktop",
    options: { viewport: { width: 1280, height: 800 } },
  },
  {
    name: "mobile",
    options: devices["Pixel 7"],
  },
];

const OUT_DIR = path.join(process.cwd(), "screenshots", "competitors");
fs.mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const summary = [];

for (const c of COMPETITORS) {
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ ...vp.options, ignoreHTTPSErrors: true });
    const page = await ctx.newPage();
    const file = path.join(OUT_DIR, `${c.slug}-${vp.name}.png`);
    let status = "ok";
    try {
      const res = await page.goto(c.url, {
        waitUntil: "networkidle",
        timeout: 25_000,
      });
      // Algunos cookie banners cubren el viewport — los ignoramos.
      // Esperamos un beat para que terminen las animaciones de entrada.
      await page.waitForTimeout(1500);
      await page.screenshot({ path: file, fullPage: true });
      status = res?.status() ?? "no-response";
    } catch (err) {
      status = `error: ${err.message.slice(0, 80)}`;
      try {
        await page.screenshot({ path: file, fullPage: false });
      } catch {}
    }
    summary.push({ competitor: c.slug, viewport: vp.name, status, file });
    console.log(`  ${c.slug.padEnd(15)} ${vp.name.padEnd(8)} ${status}`);
    await ctx.close();
  }
}

await browser.close();

console.log("\nResumen:");
console.table(summary.map((s) => ({ competitor: s.competitor, viewport: s.viewport, status: s.status })));
console.log(`\nScreenshots en: ${OUT_DIR}`);
