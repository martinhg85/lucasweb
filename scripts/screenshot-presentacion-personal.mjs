import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const OUT = "/Users/martin.guadalupe/Projects/webs/lucas-contreras-sh/screenshots/presentacion-personal";
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();

for (const n of [1, 2, 3, 4, 5]) {
  process.stdout.write(`  ${n}.png ... `);
  await page.goto(`http://localhost:4323/presentacion-personal/${n}`, {
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
