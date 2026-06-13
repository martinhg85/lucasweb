import { test, expect, type Page } from "@playwright/test";
import * as fs from "node:fs";
import * as path from "node:path";

const ROUTES = [
  { slug: "home", path: "/" },
  { slug: "nosotros", path: "/nosotros" },
  { slug: "servicios", path: "/servicios" },
  { slug: "habilitaciones", path: "/servicios/habilitaciones" },
  { slug: "mediciones", path: "/servicios/mediciones" },
  { slug: "incendios", path: "/servicios/incendios" },
  { slug: "capacitacion", path: "/capacitacion" },
  { slug: "clientes", path: "/clientes" },
  { slug: "contacto", path: "/contacto" },
];

// Carpeta donde guardamos screenshots full-page por variante × viewport × ruta.
function screenshotPath(projectName: string, slug: string) {
  const dir = path.join(process.cwd(), "screenshots", projectName);
  fs.mkdirSync(dir, { recursive: true });
  return path.join(dir, `${slug}.png`);
}

async function gatherConsoleErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(err.message));
  return errors;
}

for (const route of ROUTES) {
  test(`${route.slug} renders, no horizontal overflow, screenshot`, async ({
    page,
  }, testInfo) => {
    const errors = await gatherConsoleErrors(page);

    const response = await page.goto(route.path, { waitUntil: "networkidle" });
    expect(response?.status(), `HTTP status for ${route.path}`).toBeLessThan(400);

    // Header presente y visible (responsive)
    const header = page.locator("#site-header");
    await expect(header).toBeVisible();

    // En mobile: hamburger visible, nav desktop oculto
    const isMobile = (testInfo.project.use.viewport?.width ?? 1280) < 768;
    if (isMobile) {
      const burger = page.locator("#mobile-menu-btn");
      await expect(burger).toBeVisible();
    }

    // No scroll horizontal (overflow-x). Tolerancia 1px por scrollbars / fractional pixels.
    const overflow = await page.evaluate(() => {
      const docW = document.documentElement.scrollWidth;
      const winW = window.innerWidth;
      return { docW, winW };
    });
    expect(
      overflow.docW - overflow.winW,
      `horizontal overflow on ${route.path} (doc ${overflow.docW} vs win ${overflow.winW})`
    ).toBeLessThanOrEqual(1);

    // Antes del screenshot: scroll completo para disparar IntersectionObserver
    // de los elementos con .reveal/.reveal-stagger (sino quedan en opacity:0).
    await page.evaluate(async () => {
      await new Promise<void>((resolve) => {
        let total = 0;
        const distance = 300;
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          total += distance;
          if (total >= document.body.scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 40);
      });
    });
    await page.waitForTimeout(2200); // dejar que el fallback de 2s dispare reveals
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);

    await page.screenshot({
      path: screenshotPath(testInfo.project.name, route.slug),
      fullPage: true,
    });

    // Sin errores de consola críticos
    const blocking = errors.filter(
      (e) => !/favicon|net::ERR_FAILED.*lucas\.jpg/i.test(e)
    );
    expect(blocking, `console errors on ${route.path}`).toEqual([]);
  });
}

test("mobile menu opens and closes", async ({ page }, testInfo) => {
  const isMobile = (testInfo.project.use.viewport?.width ?? 1280) < 768;
  test.skip(!isMobile, "Solo aplica a viewport mobile");

  await page.goto("/");
  const btn = page.locator("#mobile-menu-btn");
  const panel = page.locator("#mobile-menu-panel");

  await expect(btn).toBeVisible();
  await expect(panel).toHaveAttribute("aria-hidden", "true");

  await btn.click();
  await expect(panel).toHaveAttribute("aria-hidden", "false");
  await expect(btn).toHaveAttribute("aria-expanded", "true");

  // Click en un link cierra
  await page.locator("#mobile-menu-panel a", { hasText: /Servicios/i }).first().click();
  await page.waitForURL("**/servicios");
  await expect(panel).toHaveAttribute("aria-hidden", "true");
});
