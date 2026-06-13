import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1240, height: 860 } });
await p.goto("http://localhost:4321/presentacion-v3-feedback/preventiva-reactiva/3", { waitUntil: "networkidle" });
await p.locator(".slide").first().screenshot({ path: "/tmp/slide3.png" });
await b.close();
console.log("ok");
