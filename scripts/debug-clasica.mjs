import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto("http://localhost:4325/", { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.screenshot({ path: "screenshots/chwork-desktop/viewport-1440.png" });
console.log("chwork viewport-1440 saved");
await browser.close();
