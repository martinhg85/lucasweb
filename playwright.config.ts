import { defineConfig, devices } from "@playwright/test";

// Cada variante corre en su propio puerto; tests las recorren en paralelo.
const VARIANTS = [
  { name: "clasica", baseURL: "http://localhost:4321" },
  { name: "industrial", baseURL: "http://localhost:4322" },
  { name: "premium", baseURL: "http://localhost:4323" },
  { name: "original", baseURL: "http://localhost:4324" },
  { name: "chwork", baseURL: "http://localhost:4325" },
];

const VIEWPORTS = [
  { name: "desktop", device: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } } },
  { name: "mobile", device: { ...devices["Pixel 7"] } },
];

const projects = VARIANTS.flatMap((v) =>
  VIEWPORTS.map((vp) => ({
    name: `${v.name}-${vp.name}`,
    use: {
      ...vp.device,
      baseURL: v.baseURL,
    },
  }))
);

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [["list"], ["html", { open: "never", outputFolder: "playwright-report" }]],
  outputDir: "test-results",
  use: {
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects,
});
