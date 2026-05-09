import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto("http://localhost:4326/", { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.screenshot({ path: "screenshots/original-framed-desktop/viewport-1440.png", fullPage: false });
console.log("original-framed viewport saved");
await browser.close();
