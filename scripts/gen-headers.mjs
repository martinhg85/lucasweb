// Genera dist/_headers (Cloudflare Pages) tras el build.
// - Security headers comunes a prod y staging (CSP, Referrer-Policy, etc.).
// - El CSP usa hash SHA-256 del/los <script> inline (auto-sincronizado en cada
//   build, así nunca queda desfasado si cambia el JS del header/menú).
// - En staging (PUBLIC_STAGING=true) agrega X-Robots-Tag: noindex como capa extra
//   junto al meta noindex y al robots.txt.
// Se corre vía el script "postbuild" de package.json, después de `astro build`.
import { readFile, readdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join } from "node:path";

const DIST = "dist";
const isStaging = process.env.PUBLIC_STAGING === "true";

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(p)));
    else if (entry.name.endsWith(".html")) out.push(p);
  }
  return out;
}

// Hash de cada <script> inline EJECUTABLE (tag sin atributos). Excluye los
// <script type="application/ld+json"> (datos, no los bloquea el CSP) y los
// <script src="..."> externos (cubiertos por la allowlist de dominios).
const inlineScriptRe = /<script>([\s\S]*?)<\/script>/g;
const hashes = new Set();
for (const file of await htmlFiles(DIST)) {
  const html = await readFile(file, "utf8");
  let m;
  while ((m = inlineScriptRe.exec(html)) !== null) {
    const digest = createHash("sha256").update(m[1], "utf8").digest("base64");
    hashes.add(`'sha256-${digest}'`);
  }
}
const scriptHashes = [...hashes].join(" ");

// static.cloudflareinsights.com + cloudflareinsights.com = beacon de Cloudflare
// Web Analytics (inyectado en el edge). fonts.googleapis/gstatic = Google Fonts.
const csp = [
  "default-src 'self'",
  `script-src 'self' ${scriptHashes} https://static.cloudflareinsights.com`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data:",
  "connect-src 'self' https://cloudflareinsights.com https://static.cloudflareinsights.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const lines = [
  "/*",
  "  X-Content-Type-Options: nosniff",
  "  Referrer-Policy: strict-origin-when-cross-origin",
  "  Permissions-Policy: geolocation=(), camera=(), microphone=(), payment=()",
  "  X-Frame-Options: DENY",
  `  Content-Security-Policy: ${csp}`,
];
if (isStaging) lines.push("  X-Robots-Tag: noindex, nofollow");
lines.push("");

await writeFile(join(DIST, "_headers"), lines.join("\n"), "utf8");
console.log(
  `[gen-headers] dist/_headers generado — ${hashes.size} script hash, staging=${isStaging}`,
);
