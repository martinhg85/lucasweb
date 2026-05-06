# Contexto del proyecto — Lucas Contreras (Seguridad e Higiene)

> Documento de handoff para que cualquier agente o desarrollador pueda continuar el trabajo sin acceso al historial de la sesión original.

---

## 1. Qué es este proyecto

Landing institucional de **marca personal** para el **Lic. Lucas Contreras**, profesional independiente en Seguridad e Higiene en CABA. Es la web pública que va a usar para captar clientes (empresas, comercios, obras civiles).

**No es** una agencia ni una empresa multi-empleado: es una marca personal con look industrial-profesional.

---

## 2. Origen del pedido y desvíos importantes

El usuario originalmente pidió **clonar `https://www.flowork.com.ar/`** (misma estructura, mismos textos, cambiando solo logo y nombre, para el mismo rubro).

**Esto se rechazó** porque era plagio + competencia desleal directa (mismo rubro, copy literal). Se ofrecieron tres alternativas:
1. WordPress + template parecido
2. Framer/Webflow template
3. **Astro a medida tomando Flowork solo como referencia visual** ← **elegido**

> ⚠️ **Importante para futuras conversaciones:** Flowork se usa **solo como referencia de estética** (paleta, layout, sensación). Los textos y estructura son originales, basados en lo que Lucas mismo dictó. Nunca copiar contenido de Flowork.

---

## 3. Información que aportó Lucas (vía WhatsApp)

Texto original que pasó el usuario:

```
Tiene q decie Lucas Contreras
LIC. EN SEGURIDAD E higiene
Post grado en .....
A un costado datos Mail y celular ( q te derive a poder mandarte mensaje)
Del otro lado asesoramiento integral en Seguridad e higiene
Nos especializamos en brindar un servicio integral
Nuestros clientes modelos ...... bla bla
Habilitaciones en Caba. Ejecucion, permisos de obra, ejecucion y permisos
de excavacion. Reformas de las viviendas y permisos de construccion

Nos diferenciamos en mediciones ambientales, iluminacion y ruidos

Carga de extintores, red de incendio, mantenimiento de red de incendio,
obras de incendio
```

**Se interpretó así (3 grupos de servicios):**

1. **Habilitaciones y obra en CABA**
   - Habilitaciones comerciales
   - Permisos de obra y ejecución
   - Permisos de excavación
   - Reformas de viviendas y permisos de construcción

2. **Mediciones ambientales** (marcado como diferencial)
   - Iluminación
   - Ruido (dosimetrías, nivel sonoro)

3. **Sistemas contra incendio**
   - Carga de extintores
   - Instalación de red de incendio
   - Mantenimiento de red de incendio
   - Obras e instalaciones contra incendio

---

## 4. Stack y decisiones técnicas

| Decisión | Elegido | Por qué |
|---|---|---|
| Framework | **Astro 5** | SSG puro, 0 KB JS por defecto, mejor SEO/performance que Next.js para una landing |
| CSS | **Tailwind CSS v4** (vía `@tailwindcss/vite`) | Última versión, sin config files, theme con CSS vars |
| Tipografía | **Open Sans** | Más cercana al estilo Flowork que Inter |
| Sitemap | `@astrojs/sitemap` | Genera `sitemap-index.xml` automático |
| Hosting planeado | **Vercel** | Free tier suficiente, edge en SP, deploy en 1 click desde Git |
| Dominio planeado | `.com.ar` en NIC.ar | Registro local AR (~$15.000/año) |
| CMS | **Ninguno** | El cliente pidió frontend estático, no quería WordPress |

**Versión Astro instalada:** 5.18.1 (hay v6.2.1 disponible, no upgradeada todavía).

**Node:** 22.22.0 (homebrew).

---

## 5. Estado actual del sitio

✅ **Completado:**

- Estructura de proyecto + build funcional (10 páginas)
- Layout base con SEO completo: meta tags, Open Graph, Twitter Cards, canonical, **schema.org `LocalBusiness` + `ProfessionalService`** y schema `Service` por página de servicio
- Robots.txt + sitemap.xml automático
- 6 páginas principales:
  - `/` — Home con hero diagonal, NOSOTROS (3 pilares con iconos), SERVICIOS (tabs), CAPACITACIÓN, CLIENTES, CTA final
  - `/sobre-mi` — Nosotros
  - `/servicios` — Listado de servicios + tabs
  - `/servicios/habilitaciones`, `/servicios/mediciones`, `/servicios/incendios` — páginas individuales (route dinámica `[slug].astro`)
  - `/capacitacion`
  - `/clientes`
  - `/contacto`
  - `/404`
- Componentes reutilizables: `Header`, `Footer`, `Hero`, `SectionTitle`, `ServiceTabs`, `ServiceCard`, `ClientGrid`, `ContactCTA`, `WhatsAppButton`
- Botón flotante de WhatsApp en todas las páginas
- Favicon SVG

✅ **Estilo visual aplicado** (estilo Flowork, no SaaS moderno):

- Paleta navy `#1b2868` + naranja `#e8602c` + grises sobrios
- Tipografía Open Sans con MAYÚSCULAS y `letter-spacing` amplio en headings
- Bordes rectos (no rounded-xl), líneas horizontales como separadores
- Hero con cortes diagonales reales vía `clip-path: polygon()`
- Patrón de líneas diagonales sutiles en backgrounds (`pattern-diagonal`)
- Sección titles centrados con regla horizontal debajo
- ServiceTabs con pills + icon flat grande + lista con guiones

> ⚠️ **No volver al estilo SaaS** (rounded-3xl, gradientes brillantes, cards con shadow grandes). El usuario rechazó explícitamente ese estilo en favor del look industrial-profesional clásico.

---

## 6. Datos pendientes (TODOs antes de salir live)

Buscar en el código con `grep -rn TODO src/ public/`. Resumen:

### En `src/data/site.ts`
- [ ] **Posgrado real** de Lucas (campo `professional.postgrado`)
- [ ] **Matrícula profesional** (campo `professional.matricula`)
- [ ] **Mail real** (campo `contact.email`)
- [ ] **Teléfono/WhatsApp real** — formato display + E.164 sin "+" ni espacios
  - Ejemplo: `+54 9 11 3083-2781` → display
  - `5491130832781` → E.164 (para `wa.me/`)
- [ ] **Lista de clientes** con nombres y/o paths a logos en `/public/clients/`
- [ ] Confirmar mediciones que ofrece (hay opcionales comentados: puesta a tierra, carga de fuego, ergonomía)
- [ ] Confirmar zona real de cobertura (`coverage.extended`) — actualmente "CABA y Gran Buenos Aires"
- [ ] Si Lucas atiende en oficina física, completar `business.streetAddress` y `postalCode`

### Imágenes a cargar en `/public/`
- [ ] **`lucas.jpg`** — foto profesional de Lucas. Ratio sugerido **16:9 horizontal**, mín 1600x900px. Idealmente con casco y chaleco visible. Va al hero y a `/sobre-mi` (también se acepta 4:5 vertical para sobre-mi).
- [ ] **`og-default.jpg`** — imagen para compartir en WhatsApp/redes sociales. **1200x630px**.
- [ ] **`/public/clients/*.svg`** — logos de clientes (SVG ideal, PNG transparente OK)

### En `src/pages/sobre-mi.astro`
- [ ] Reemplazar la bio placeholder por la bio real de Lucas

### Nombre/dominio comercial
- [ ] Confirmar si va `lucascontreras.com.ar` (es lo configurado) u otro dominio. Cambiar en:
  - `astro.config.mjs` → campo `site`
  - `public/robots.txt` → URL del sitemap

---

## 7. Decisiones de copy y estructura

- **Tagline corto bajo el logo**: "Asesor en Seguridad e Higiene" (estilo "ESPECIALISTAS EN HIGIENE OCUPACIONAL" de Flowork)
- **Voz**: primera persona singular ("Soy licenciado...", "Acompaño a..."). Es marca personal, no empresa.
- **Diferencial destacado**: mediciones ambientales (instrumental propio calibrado). Es lo que se viene marcando como ventaja.
- **CTAs principales**: WhatsApp directo + mail. No hay formulario de contacto ni newsletter (no se necesita backend).
- **Páginas de servicio individuales** (`/servicios/[slug]`): existen para SEO local — Google rankea separado por keywords como "carga de extintores CABA".

---

## 8. SEO — qué está hecho y qué falta hacer fuera del sitio

### Hecho en el sitio
- Schema.org `LocalBusiness` + `ProfessionalService` en cada página (en `Layout.astro`)
- Schema `Service` por página individual de servicio
- Meta description por página
- Open Graph + Twitter Cards
- Sitemap automático
- robots.txt
- Una página por servicio principal (no todo en home)
- HTML semántico, h1 único por página

### Pendiente fuera del código (más impacto que cualquier optimización on-page)
1. **Google Business Profile** — gratis, es lo #1 en SEO local
2. **Google Search Console** — submit sitemap
3. **Directorios locales** — Páginas Amarillas, guía del Colegio de profesionales del rubro, cámaras
4. **Backlinks** — pedirle a Lucas si tiene presencia en ediciones de revistas técnicas, ponencias, etc.

---

## 9. Cómo correr el proyecto

```bash
cd /Users/martin.guadalupe/Projects/webs/lucas-contreras-sh
npm install        # primera vez
npm run dev        # http://localhost:4321
npm run build      # output en dist/
npm run preview    # previsualizar el build
```

---

## 10. Cómo deployar (cuando esté listo)

1. `git init` + push a GitHub (no se hizo todavía, repo no inicializado)
2. Vercel → Add New → Project → importar el repo de GitHub
3. Vercel autodetecta Astro. Click Deploy. Listo.
4. Configurar dominio en Settings → Domains → seguir instrucciones para apuntar DNS desde NIC.ar

---

## 11. Estructura de carpetas

```
lucas-contreras-sh/
├── src/
│   ├── data/site.ts              ← 🔑 fuente única de datos editables
│   ├── layouts/Layout.astro      ← SEO + schema + fuente
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro            ← corte diagonal
│   │   ├── SectionTitle.astro    ← MAYÚSCULAS centrado + regla
│   │   ├── ServiceTabs.astro     ← pills + icon + lista
│   │   ├── ServiceCard.astro
│   │   ├── ClientGrid.astro
│   │   ├── ContactCTA.astro
│   │   └── WhatsAppButton.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── sobre-mi.astro
│   │   ├── capacitacion.astro
│   │   ├── clientes.astro
│   │   ├── contacto.astro
│   │   ├── 404.astro
│   │   └── servicios/
│   │       ├── index.astro
│   │       └── [slug].astro      ← genera 1 página por servicio
│   └── styles/global.css         ← theme Tailwind v4 + utils
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── lucas.jpg                 ← TODO: agregar
│   ├── og-default.jpg            ← TODO: agregar
│   └── clients/                  ← TODO: agregar logos
├── astro.config.mjs
├── tailwind.config.mjs           ← (no existe; Tailwind v4 vía Vite plugin, sin config file)
├── tsconfig.json
├── package.json
├── README.md                     ← cómo correr
└── CONTEXT.md                    ← este archivo
```

---

## 12. Próximas tareas sugeridas (en orden)

1. **Recolectar datos pendientes** del usuario/Lucas (sección 6).
2. **Cargar foto profesional** + logos de clientes.
3. Una vez con datos reales, **revisar y ajustar el copy** con principios de copywriting (skill `copywriting` disponible).
4. **`git init` + repo en GitHub** + deploy en Vercel.
5. **Crear Google Business Profile** en paralelo al deploy.
6. **Conectar dominio** comprado en NIC.ar.
7. **Search Console + sitemap submit**.

---

## 13. Notas sobre el cliente final (no técnicas)

- El usuario que está armando la web **no es Lucas**: parece ser alguien que lo ayuda (posiblemente un asistente, hijo, o conocido con perfil más técnico). Lucas pasó la info por WhatsApp.
- El usuario habla en español rioplatense (Argentina). Mantener vos/decime/querés en todo el copy.
- Es un usuario que valora honestidad técnica y opciones explicadas con tradeoffs (ver historial: pidió comparativas de WordPress vs frontend, Vercel vs Netlify vs Cloudflare, etc.).
- Consideró Envato Elements para templates/fotos. Se le recomendó **no reemplazar el sitio actual** sino usar Envato solo para fotos de stock como puente hasta tener foto real.
