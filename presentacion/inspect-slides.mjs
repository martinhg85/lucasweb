// Captura cada slide del dev server de slidev en /embed mode
// (sin UI ni controles), 1920x1080 sin escala, para inspección 1:1.
import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();

for (const num of [1, 2]) {
  const url = `http://localhost:3030/${num}?print`;
  await page.goto(url, { waitUntil: "networkidle", timeout: 15000 });
  await page.waitForTimeout(1000);
  await page.addStyleTag({
    content: `
      .slidev-controls,
      .slidev-page,
      [data-test="navigation-controls"],
      .slidev-info-dialog,
      astro-dev-toolbar { display: none !important; }
    `,
  });
  await page.waitForTimeout(300);
  const path = `/tmp/inspect-slide-${num}.png`;
  await page.screenshot({ path, fullPage: false });
  console.log(`saved ${path}`);
}
await browser.close();
