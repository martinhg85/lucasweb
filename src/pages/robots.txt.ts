import type { APIRoute } from "astro";

// PUBLIC_STAGING=true ⇒ build apuntado a staging.chwork.com.ar.
// En staging bloqueamos todo el crawl (Disallow: /) como defensa en
// profundidad junto al <meta robots noindex,nofollow> de Layout.astro.
// En producción permitimos el crawl y publicamos el sitemap real.
const isStaging = import.meta.env.PUBLIC_STAGING === "true";

const body = isStaging
  ? `User-agent: *
Disallow: /
`
  : `User-agent: *
Allow: /

Sitemap: https://chwork.com.ar/sitemap-index.xml
`;

export const GET: APIRoute = () =>
  new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
