# Proyecto — Sitio web chwork (Lic. Lucas Contreras)

Sitio profesional para **Lic. Lucas Contreras**, Asesor en Seguridad e Higiene en CABA.
**Stack**: Astro + TypeScript.
**Marca de trabajo**: chwork (Contreras Higiene).
**Dominio acordado**: `chwork.com.ar` (con `lcwork.com.ar` y `lucascontreras.com.ar` como redirects defensivos).

## Documentos clave del proyecto

| Archivo | Contenido |
|---|---|
| `PRESUPUESTO-LUCAS.md` | Borrador original con dos planes |
| `presupuesto-lucas.html` / `.pdf` | Presupuesto final consolidado (USD 1.500, 1 año de soporte incluido) |
| `KICKOFF-LUCAS.md` | Checklist de información que el cliente tiene que entregar |
| `RELEVAMIENTO.md` | Relevamiento técnico inicial |
| `CONTEXT.md` | Contexto general |

> **Importante**: leer estos antes de tocar código si el contexto es nuevo.

---

## Estrategia multi-version (fase concluida — referencia histórica)

> **Estado**: esta fase se completó. La variante **empresa-framed** fue elegida y mergeada a `main`. Las otras variantes quedaron archivadas como tags `archive/*` (ver `git tag -l "archive/*"`) y sus worktrees / branches locales fueron eliminados. No spawnear nuevos worktrees salvo que el cliente pida explícitamente una nueva ronda de exploración.

El proyecto **estuvo** armado para **explorar múltiples variantes de diseño en paralelo**, usando **Git worktrees**. Cada variante vivía en su propio branch y en su propia carpeta de trabajo. El cliente vio las opciones y eligió la final.

### Estructura de directorios

```
~/Projects/webs/
├── lucas-contreras-sh/     ← REPO RAÍZ (branch: main)
│   └── .git/               ← único repo, compartido entre worktrees
└── lucas-trees/
    ├── clasica/            ← branch: version/clasica
    └── industrial/         ← branch: version/industrial
    (sumar variantes según necesidad)
```

### Política de `main`

`main` es la **base neutra/compartida**. En `main` viven los cambios que aplican a TODAS las variantes:

- Nuevos componentes compartidos
- Fixes técnicos
- Cambios de SEO técnico / metadata / structured data
- Estructura general de páginas
- Datos en `src/data/site.ts`

**`main` no contiene "look & feel" de ninguna variante específica.**

Cuando se haga un cambio en `main`, propagarlo a cada variante con `git merge main` (desde el worktree de la variante).

### Política de branches `version/*`

Cada variante diverge solo en:

- Paleta de colores (CSS variables / tokens)
- Tipografía
- Tono y matices de copy
- Microinteracciones / animaciones
- Eventualmente: layouts si la diferencia es estructural

**Convención de naming**: `version/<nombre-corto-en-minúsculas>` (ej: `version/clasica`, `version/industrial`, `version/minimal`).

### Workflow diario

```bash
# Trabajar en una variante específica
cd ~/Projects/webs/lucas-trees/clasica
npm run dev -- --port 4321

# Levantar otra variante en paralelo (otra terminal)
cd ~/Projects/webs/lucas-trees/industrial
npm run dev -- --port 4322
```

**Puertos asignados**:
- 4321 → clasica
- 4322 → industrial
- 4323 → (siguiente variante)
- 4324 → (siguiente variante)

Commits normales dentro de cada worktree quedan en su branch correspondiente.

### Sumar una variante nueva

```bash
cd ~/Projects/webs/lucas-contreras-sh
git branch version/<nombre>
git worktree add ../lucas-trees/<nombre> version/<nombre>
cd ../lucas-trees/<nombre>
npm install
```

### Mergear la variante ganadora (cuando el cliente elija)

```bash
cd ~/Projects/webs/lucas-contreras-sh
git merge version/<elegida>

# Limpiar las descartadas
git worktree remove ../lucas-trees/<descartada>
git branch -D version/<descartada>
```

### Comandos útiles

```bash
git worktree list                              # ver todos los worktrees activos
git diff version/clasica version/industrial    # comparar variantes
git checkout version/clasica -- src/styles/    # traer archivos puntuales de otra branch
git log version/clasica --oneline              # historia de una variante
```

---

## Convenciones de código

- **Stack**: Astro + TypeScript
- **Componentes**: `src/components/`
- **Páginas**: `src/pages/`
- **Estilos globales**: `src/styles/global.css`
- **Datos del sitio (textos, servicios, contactos)**: `src/data/site.ts` — single source of truth para contenido
- **Variables de tema (colores, tipografía, espaciado)**: en CSS variables dentro de `global.css` para que cada variante pueda redefinirlas sin tocar componentes
- **Imágenes**: las que querés optimizar (WebP responsive) van en `src/assets/` y se usan con el componente `<Image>` de `astro:assets` (genera `/_astro/*.webp`, soporta `fetchpriority`/`widths`/`sizes`). Las de `public/` se sirven tal cual (sin optimizar) — se usan en CSS `background-image` y en las presentaciones `_`. Ojo: `syh-banner-v.jpg` existe **en ambos** lugares a propósito (el hero usa el de `src/assets/` vía `<Image>`; las presentaciones siguen usando el de `public/`).

### Reglas para mantener variantes "limpias"

1. **Componentes deben ser agnósticos al tema**: no hardcodear colores ni tipografías. Siempre usar CSS variables.
2. **Cambios estructurales (componentes nuevos, páginas, datos) van a `main`**, después se propaga a las variantes.
3. **Cambios visuales (paleta, tipografía, spacing tokens) van directo en la variante.**
4. Si una variante necesita un cambio estructural distinto de las otras (ej: una sección extra), evaluar si vale la pena divergir o si conviene mover esa diferencia a un componente condicionado en `main`.

---

## Deploy

### Hosting actual

| Entorno | Dominio | Sirve | Proyecto Pages |
|---|---|---|---|
| **Producción** | `chwork.com.ar` + `www.chwork.com.ar` | Sitio Astro completo build SIN `PUBLIC_STAGING` (indexable) — **live desde 2026-06-13** | `chwork-holding` |
| **Staging** | `staging.chwork.com.ar` | Sitio Astro completo build con `PUBLIC_STAGING=true` (noindex global) | `chwork-staging` |

> El proyecto se sigue llamando `chwork-holding` por razones históricas (antes servía el placeholder "Próximamente"), pero **ahora sirve el sitio de producción**. El HTML standalone `holding/index.html` quedó obsoleto tras el launch.

Ambos proyectos viven en **Cloudflare Pages** (free tier). DNS gestionado en la misma cuenta de Cloudflare (zona `chwork.com.ar`), records proxied (nubecita naranja) → CF actúa como CDN + SSL + WAF. SSL automático vía Cloudflare (cert Google), auto-renovado.

### Configuración post-launch (Cloudflare, ya aplicada 2026-06-13)

Hardening y medición configurados tras el launch. **Importante**: el `CLOUDFLARE_API_TOKEN` del `.env` **no** tiene permisos para Redirect Rules ni Web Analytics (devuelve `Authentication error` 10000); esas se gestionan desde el dashboard. Sí tiene permiso para `security_header` (HSTS) vía `Zone Settings:Edit`.

| Config | Qué hace | Dónde se gestiona |
|---|---|---|
| **Redirect `www` → apex (301)** | `www.chwork.com.ar/*` → `chwork.com.ar/*` (preserva ruta + query). URL canónica única, sin contenido duplicado. | Dashboard → zona → Rules → Redirect Rules (plantilla "Redirect from WWW to root"). **No** vía API (token sin permiso `Dynamic Redirect`). |
| **HSTS** | `Strict-Transport-Security: max-age=15552000` (6 meses, sin `includeSubDomains`, sin `preload`, `nosniff` on). Fuerza HTTPS a nivel navegador. | API `PATCH /zones/{id}/settings/security_header` (token OK). Subir a 1 año + subdominios más adelante si todo va bien. |
| **Cloudflare Web Analytics** | Beacon privacy-first (sin cookies, sin banner). Inyección **automática** a nivel edge (solo en requests de navegador, no en curl). Site token `819c89cc...`. | Dashboard → cuenta → Web Analytics. **No** vía API (token sin permiso `Account Analytics`). Ya estaba activo desde ~2026-05. |
| **Security headers** | CSP (con hash SHA-256 del `<script>` inline + allowlist Google Fonts y beacon CF), `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options`. En staging suma `X-Robots-Tag: noindex`. | Archivo `dist/_headers` **generado en build** por `scripts/gen-headers.mjs` (hook `postbuild`). Ver abajo. |

> Verificación rápida: `curl -I https://www.chwork.com.ar` (301 a apex), `curl -I https://chwork.com.ar | grep -i strict-transport` (`max-age=15552000`), `curl -I https://chwork.com.ar | grep -i content-security` (CSP presente, sin `X-Robots-Tag` en prod), y el beacon con `curl -A "Mozilla/5.0 ... Chrome" https://chwork.com.ar | grep cloudflareinsights` (requiere User-Agent de navegador).

#### `dist/_headers` se genera en build — NO crear `public/_headers`

`scripts/gen-headers.mjs` corre automáticamente tras `astro build` (script `postbuild` en `package.json`) y escribe `dist/_headers` (formato Cloudflare Pages). Razón de hacerlo en build y no como archivo estático:

- **El CSP usa el hash SHA-256 del `<script>` inline** (el del header/menú, idéntico en todas las páginas). Generarlo en build lo mantiene **auto-sincronizado**: si cambia ese JS, el hash se recalcula solo. Si fuera estático quedaría desfasado y el navegador bloquearía el script.
- **`X-Robots-Tag: noindex` solo se agrega cuando `PUBLIC_STAGING=true`** — un `public/_headers` estático no puede ser condicional por entorno y arruinaría la indexación de prod.

Si tocás el CSP, editá `scripts/gen-headers.mjs` (no busques un `_headers` en `public/`, no existe). Tras cambiarlo, **probá en staging con un navegador real** (no solo curl): cargá las páginas y revisá que no haya violaciones de CSP en consola (el beacon, las fuentes y el script inline deben cargar).

### Credenciales

Las credenciales viven en `.env` (gitignored — confirmar siempre):

```
CLOUDFLARE_API_TOKEN=<token con permisos:>
                     #  Zone-level scoped a chwork.com.ar:
                     #    Zone:Read, DNS:Edit, Zone Settings:Edit,
                     #    SSL and Certificates:Edit, Cache Purge
                     #  Account-level:
                     #    Pages:Edit
ACCOUNT_ID=<CF account ID>
```

Wrangler espera la variable `CLOUDFLARE_ACCOUNT_ID`. Antes de invocar wrangler, exportar `CLOUDFLARE_ACCOUNT_ID="$ACCOUNT_ID"`.

### Deploy del holding (página "Próximamente")

```bash
set -a; source .env; set +a
export CLOUDFLARE_ACCOUNT_ID="$ACCOUNT_ID"
npx wrangler@latest pages deploy holding/ \
  --project-name=chwork-holding --branch=main --commit-dirty=true
```

El `holding/` es un HTML standalone (no pasa por Astro). Se sube como está.

### Deploy del sitio completo a staging

```bash
set -a; source .env; set +a
export CLOUDFLARE_ACCOUNT_ID="$ACCOUNT_ID"
PUBLIC_STAGING=true npm run build
npx wrangler@latest pages deploy dist/ \
  --project-name=chwork-staging --branch=main --commit-dirty=true
```

**Importante**: el flag `PUBLIC_STAGING=true` activa el `<meta robots="noindex,nofollow">` en todas las páginas (ver `src/layouts/Layout.astro`). Es **obligatorio** para builds que apunten a `staging.chwork.com.ar` — si no, Google indexa la versión preview y arruina el lanzamiento real.

### Control de indexación (noindex + robots.txt)

La protección contra indexación es **configurable por entorno vía el flag `PUBLIC_STAGING`** y tiene **tres capas (defensa en profundidad)**:

| Capa | Archivo | Staging (`PUBLIC_STAGING=true`) | Producción (sin flag) |
|---|---|---|---|
| Meta robots | `src/layouts/Layout.astro` | `<meta robots="noindex,nofollow">` en todas las páginas | ausente |
| `robots.txt` | `src/pages/robots.txt.ts` (endpoint dinámico, **no** archivo estático) | `User-agent: * / Disallow: /` (sin sitemap) | `Allow: /` + `Sitemap: https://chwork.com.ar/sitemap-index.xml` |
| `X-Robots-Tag` header | `dist/_headers` (vía `scripts/gen-headers.mjs`) | `X-Robots-Tag: noindex, nofollow` | ausente |

- El `robots.txt` se genera en build leyendo `import.meta.env.PUBLIC_STAGING`. **No existe `public/robots.txt`** — fue reemplazado por el endpoint para que sea staging-aware. No recrear el archivo estático.
- El dominio del sitemap sale de `astro.config.mjs` → `site` (debe ser `https://chwork.com.ar`, **no** `lucascontreras.com.ar`). El canonical, en cambio, sale de `site.url` en `src/data/site.ts`.
- Verificación post-build: `cat dist/robots.txt` y `grep noindex dist/index.html` deben coincidir con la columna del entorno que se está deployando.

### Presentaciones (NO se publican en el sitio)

Las presentaciones / pitches del cliente viven en `src/pages/_presentacion*` (carpetas **prefijadas con `_`**). Astro **ignora** todo path con `_` → no se buildean, no entran al sitemap, no son indexables. Es intencional: son material interno, solo se usaron para generar PDF/PPTX (ya guardados en `output/`).

- **No quitar el prefijo `_`** salvo necesidad puntual de regenerar un export.
- **Para regenerar un PDF/PPTX**: renombrar temporalmente la carpeta puntual sacándole el `_` (ej: `git mv src/pages/_presentacion-cabarco-v4 src/pages/presentacion-cabarco-v4`), correr el script correspondiente en `scripts/` (apuntan a las URLs sin `_`), y **volver a ponerle el `_`** antes de commitear/deployar.
- El sitio público real son solo ~10 páginas (home, servicios, nosotros, capacitación, clientes, contacto). Verificar con `grep -o '<loc>' dist/sitemap-0.xml | wc -l`.

### Flujo de launch — ✅ EJECUTADO (2026-06-13, Opción B)

> **Estado**: el launch **ya ocurrió**. El sitio completo está live e indexable en `chwork.com.ar` + `www.chwork.com.ar`. Esta sección queda como referencia histórica del procedimiento.

Se eligió la **Opción B**: se buildeó `dist/` sin `PUBLIC_STAGING` y se deployó al proyecto `chwork-holding` (que ya tenía ambos custom domains), sobreescribiendo el placeholder "Próximamente". Los proyectos mantienen sus dominios actuales: `chwork-holding` ahora sirve el sitio completo y `chwork-staging` sigue como entorno de pruebas con noindex.

Pre-flight verificado antes del cutover: build sin `PUBLIC_STAGING`, `noindex` ausente en todas las páginas (solo presente en `404.html`), `robots.txt` con `Allow: /` + `Sitemap`, titles/descriptions/canonical/OG/favicon completos, sitemap con 10 URLs reales.

**Comando del cutover** (para repetir un redeploy de producción tras nuevos cambios):

```bash
set -a; source .env; set +a
export CLOUDFLARE_ACCOUNT_ID="$ACCOUNT_ID"
npm run build   # SIN PUBLIC_STAGING → build indexable de producción
npx wrangler@latest pages deploy dist/ \
  --project-name=chwork-holding --branch=main --commit-dirty=true
```

> **Opción A (no usada)**: pasar el custom domain `chwork.com.ar` de `chwork-holding` a `chwork-staging`. Se descartó porque el proyecto staging sirve builds con noindex (`PUBLIC_STAGING=true`); mantener proyectos separados (holding=prod, staging=pruebas) es más limpio.

### Setup inicial de custom domains (referencia, ya hecho)

Para futuras instancias o si hay que rehacer:

1. **Crear proyecto Pages vía API** (porque `wrangler pages project create` requiere permisos User adicionales):
   ```bash
   curl -X POST \
     "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects" \
     -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"name":"chwork-holding","production_branch":"main"}'
   ```

2. **Attach custom domain al proyecto**:
   ```bash
   curl -X POST \
     "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/chwork-holding/domains" \
     -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"name":"chwork.com.ar"}'
   ```

3. **Crear el DNS record CNAME proxied** apuntando a `<proyecto>.pages.dev`. CF soporta CNAME en apex vía flattening.

4. Esperar 1-5 min a que CF provisione el SSL (status pasa de `pending` → `active`).

---

## Estado del proyecto

- ✅ Presupuesto cerrado y aceptado (USD 1.500)
- ✅ Kickoff enviado al cliente; pendiente recepción de información
- ✅ Variante `empresa-framed` elegida y mergeada a `main` (otras archivadas como tags `archive/*`)
- ✅ Voz "empresa" aplicada (sin DT personal, schema.org Organization, equipo de Licenciados y Técnicos)
- ✅ Dominio `chwork.com.ar` registrado y apuntando a Cloudflare DNS
- ✅ Sitio completo en `staging.chwork.com.ar` (con noindex) — entorno de pruebas
- ✅ Fixes mobile (header flex + hamburguesa + botones 50/50)
- ✅ **LAUNCH (2026-06-13)**: sitio completo live e indexable en `chwork.com.ar` + `www.chwork.com.ar` (deploy de `dist/` sin `PUBLIC_STAGING` a `chwork-holding`, Opción B). Placeholder "Próximamente" reemplazado.
- ✅ Google Search Console: propiedad de **Dominio** `chwork.com.ar` verificada (TXT vía integración Cloudflare↔GSC) + sitemap `sitemap-index.xml` enviado y leído OK (status "Success", 10 páginas descubiertas — 2026-06-13)
- ✅ Hardening + medición post-launch (2026-06-13): redirect `www`→apex (301), HSTS (6 meses), Cloudflare Web Analytics activo, security headers vía `dist/_headers` (CSP con hash + Referrer/Permissions/Frame; `X-Robots-Tag` en staging) — ver "Configuración post-launch"
- ✅ Quick wins post-review Codex (2026-06-13): `h1` semántico en páginas internas (prop `as` en `SectionTitle`, verificado pixel-idéntico), test e2e ruta `/sobre-mi`→`/nosotros`, 404 sin clases muertas (`brand-600`→`orange-600`)
- ✅ Hero optimizado (2026-06-13): de `background-image` JPG (417 KB) a `<Image>` WebP responsive (13–94 KB) + `fetchpriority`. Validado visualmente por el cliente (diff píxeles 0.34–1%, solo bordes). Lighthouse mobile prod: Performance 81→**93**, LCP 4.5s→**2.7s**, SEO/Best Practices 100, Accesibilidad 90→94
- ⏳ Pendiente: contenido final del cliente (textos definitivos, logos clientes faltantes, foto/imagen genérica del rubro)
- ⏳ Pendiente: GitHub Action para auto-deploy en cada push a `main` (antes: limpiar `playwright.config.ts`, que aún apunta a las 6 variantes archivadas en puertos 4321-4326 → el suite e2e no corre tal cual contra el sitio actual)
- ⏳ Pendiente: redirects defensivos `lcwork.com.ar` y `lucascontreras.com.ar` → `chwork.com.ar`
- ⏳ Pendiente: hosting de handover a definir (Cloudflare Pages vs DonWeb) y traspaso de GSC a cuenta de Lucas cuando la tenga
- ⏳ Pendiente (review, baja prioridad): para Accesibilidad ~100 → contraste de `text-orange-600` en textos chicos (3.2–3.4, pide 4.5; usar `orange-700`), orden de headings (un `<h4>` en footer sin h2/h3 previo), `aria-label` de links que no incluye el texto visible. Otros: schema local más rico (`@id`, `logo`, `sameAs`), self-host de fuentes, foco/trap del menú mobile, `prefers-reduced-motion`

## Reglas de oro para agentes que trabajen acá

1. **Antes de editar código**: `git branch` para confirmar que estás en `main`. Las variantes ya están mergeadas/archivadas — no spawnear worktrees nuevos salvo pedido explícito.
2. **Cambios al sitio Astro van a `main`**. Después: build + deploy a `chwork-staging` para que Lucas valide antes del launch.
3. **Cambios al holding** (`holding/index.html`) son independientes del build de Astro — se deployan a `chwork-holding` con direct upload.
4. **Build de staging SIEMPRE con `PUBLIC_STAGING=true`** para forzar noindex. Sin el flag, Google indexa la preview.
5. **Antes de crear archivos nuevos**: verificar que no exista uno similar. Preferir editar a crear.
6. **No tocar `presupuesto-lucas.*` ni `KICKOFF-LUCAS.md`** salvo pedido explícito — son documentos cerrados con el cliente.
7. **No commitear `.env`** — contiene `CLOUDFLARE_API_TOKEN` y `ACCOUNT_ID`. Ya está en `.gitignore`, no quitarlo.
8. **Antes de pushear a producción** (cutover real): verificar que el HTML deployado NO tiene `noindex` y que la metadata SEO está completa.

---

> **Si actualizás este archivo, actualizá también `AGENTS.md`** (mantienen el mismo contenido para que distintos agentes vean la misma estrategia).
