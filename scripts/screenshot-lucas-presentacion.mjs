// Captura las 8 imágenes para presentarle a Lucas las dos voces:
//   - voice-empresa-framed (puerto 4321)
//   - voice-personal-clean-framed (puerto 4322)
// Para cada voz, captura Home + Sobre mí, en desktop (1280px) y mobile (Pixel 7).
//
// Uso:
//   node scripts/screenshot-lucas-presentacion.mjs
//
// Requisitos:
//   - Servers corriendo en 4321 y 4322
//   - @playwright/test instalado

import { chromium, devices } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "screenshots/lucas-presentacion");

await mkdir(OUT, { recursive: true });

const variants = [
  { url: "http://localhost:4321/",         slug: "1-empresa-home",         label: "Voz empresa — Home" },
  { url: "http://localhost:4321/sobre-mi", slug: "2-empresa-sobre-mi",     label: "Voz empresa — El responsable" },
  { url: "http://localhost:4322/",         slug: "3-personal-home",        label: "Voz personal — Home" },
  { url: "http://localhost:4322/sobre-mi", slug: "4-personal-sobre-mi",    label: "Voz personal — Sobre mí" },
];

const viewports = [
  { name: "desktop", viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 },
  { name: "mobile",  ...devices["Pixel 7"] },
];

const browser = await chromium.launch();

console.log(`📸 Generando 8 capturas → ${OUT}\n`);

for (const v of variants) {
  for (const vp of viewports) {
    const ctx = await browser.newContext(vp);
    const page = await ctx.newPage();

    process.stdout.write(`  ${v.slug}-${vp.name}.png ... `);
    await page.goto(v.url, { waitUntil: "networkidle", timeout: 20000 });

    // CSS de captura:
    //   - Esconder dev toolbar de Astro
    //   - Header: pasar de fixed → static, así toma su altura en el flujo
    //     normal y no se monta sobre el body al hacer fullPage screenshot
    //   - Spacer del header: ocultar (ya no es necesario sin position:fixed)
    //   - Forzar las animaciones reveal a estado final (visible) por si
    //     algunas no se dispararon con el scroll
    await page.addStyleTag({
      content: `
        astro-dev-toolbar { display: none !important; }
        .site-header { position: static !important; }
        .header-spacer { display: none !important; }
        [data-reveal], .reveal, .is-revealed { opacity: 1 !important; transform: none !important; }
      `,
    });
    await page.waitForTimeout(300);

    // Disparar reveal observers — scroll lento de arriba abajo y vuelta
    const height = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < height; y += 400) {
      await page.evaluate((y) => window.scrollTo(0, y), y);
      await page.waitForTimeout(80);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

    // Forzar todas las imágenes a eager + esperar a que terminen de cargar
    // (sin esto, los logos de clientes con loading="lazy" no se renderizan
    // a tiempo y la sección de Clientes sale vacía).
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

    const path = join(OUT, `${v.slug}-${vp.name}.png`);
    await page.screenshot({ path, fullPage: true });

    process.stdout.write("OK\n");
    await ctx.close();
  }
}

await browser.close();

console.log(`\n✓ Listo. Abrí el folder:\n  open ${OUT}`);
