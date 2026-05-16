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
| **Holding** | `chwork.com.ar` + `www.chwork.com.ar` | `holding/index.html` ("Próximamente", noindex) | `chwork-holding` |
| **Staging** | `staging.chwork.com.ar` | Sitio Astro completo build con `PUBLIC_STAGING=true` (noindex global) | `chwork-staging` |

Ambos proyectos viven en **Cloudflare Pages** (free tier). DNS gestionado en la misma cuenta de Cloudflare (zona `chwork.com.ar`), records proxied (nubecita naranja) → CF actúa como CDN + SSL + WAF. SSL automático vía Cloudflare (cert Google), auto-renovado.

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

La protección contra indexación es **configurable por entorno vía el flag `PUBLIC_STAGING`** y tiene **dos capas (defensa en profundidad)**:

| Capa | Archivo | Staging (`PUBLIC_STAGING=true`) | Producción (sin flag) |
|---|---|---|---|
| Meta robots | `src/layouts/Layout.astro` | `<meta robots="noindex,nofollow">` en todas las páginas | ausente |
| `robots.txt` | `src/pages/robots.txt.ts` (endpoint dinámico, **no** archivo estático) | `User-agent: * / Disallow: /` (sin sitemap) | `Allow: /` + `Sitemap: https://chwork.com.ar/sitemap-index.xml` |

- El `robots.txt` se genera en build leyendo `import.meta.env.PUBLIC_STAGING`. **No existe `public/robots.txt`** — fue reemplazado por el endpoint para que sea staging-aware. No recrear el archivo estático.
- El dominio del sitemap sale de `astro.config.mjs` → `site` (debe ser `https://chwork.com.ar`, **no** `lucascontreras.com.ar`). El canonical, en cambio, sale de `site.url` en `src/data/site.ts`.
- Verificación post-build: `cat dist/robots.txt` y `grep noindex dist/index.html` deben coincidir con la columna del entorno que se está deployando.

### Presentaciones (NO se publican en el sitio)

Las presentaciones / pitches del cliente viven en `src/pages/_presentacion*` (carpetas **prefijadas con `_`**). Astro **ignora** todo path con `_` → no se buildean, no entran al sitemap, no son indexables. Es intencional: son material interno, solo se usaron para generar PDF/PPTX (ya guardados en `output/`).

- **No quitar el prefijo `_`** salvo necesidad puntual de regenerar un export.
- **Para regenerar un PDF/PPTX**: renombrar temporalmente la carpeta puntual sacándole el `_` (ej: `git mv src/pages/_presentacion-cabarco-v4 src/pages/presentacion-cabarco-v4`), correr el script correspondiente en `scripts/` (apuntan a las URLs sin `_`), y **volver a ponerle el `_`** antes de commitear/deployar.
- El sitio público real son solo ~10 páginas (home, servicios, nosotros, capacitación, clientes, contacto). Verificar con `grep -o '<loc>' dist/sitemap-0.xml | wc -l`.

### Flujo de launch (cuando esté listo para producción)

Dos caminos posibles:

**Opción A (recomendada)**: pasar el custom domain `chwork.com.ar` del proyecto `chwork-holding` al `chwork-staging` (renombrándolo a `chwork-production` o dejándolo). El holding queda archivado.

**Opción B**: deployar el `dist/` (sin `PUBLIC_STAGING`) al proyecto `chwork-holding`, sobreescribiendo el placeholder. Mantiene los proyectos con sus dominios actuales.

Cualquiera que se elija, antes del cutover: build sin `PUBLIC_STAGING`, verificar que no hay `noindex` en el HTML final, comprobar metadata SEO en `/`, `/servicios/*`, etc.

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
- ✅ Holding live en `chwork.com.ar` + `www.chwork.com.ar`
- ✅ Sitio completo en `staging.chwork.com.ar` (con noindex)
- ✅ Fixes mobile (header flex + hamburguesa + botones 50/50)
- ⏳ Pendiente: contenido final del cliente (textos definitivos, logos clientes faltantes, foto/imagen genérica del rubro)
- ⏳ Pendiente: definir hosting de producción (Cloudflare Pages vs DonWeb para handover)
- ⏳ Pendiente: GitHub Action para auto-deploy de staging en cada push a `main`
- ⏳ Pendiente: redirects defensivos `lcwork.com.ar` y `lucascontreras.com.ar` → `chwork.com.ar`
- ⏳ Pendiente: launch (cutover holding → sitio completo)

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
