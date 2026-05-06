# Lucas Contreras — Seguridad e Higiene

Landing institucional, Astro + Tailwind v4, deploy en Vercel.

## Comandos

```bash
npm install         # instalar deps
npm run dev         # servidor local en http://localhost:4321
npm run build       # build de producción en dist/
npm run preview     # previsualizar el build
```

## Editar contenido

**Todo lo editable está en un solo archivo:** `src/data/site.ts`
Ahí cambiás textos, contacto, servicios, etc. sin tocar HTML.

## Pendientes (TODOs antes de salir live)

Buscá `TODO` en el código (`grep -r TODO src/`):

- [ ] `src/data/site.ts` → posgrado real, matrícula, mail, WhatsApp, clientes
- [ ] `public/lucas.jpg` → foto profesional de Lucas (formato 4:5, mín 800x1000px)
- [ ] `public/og-default.jpg` → imagen para compartir en WhatsApp/redes (1200x630px)
- [ ] `public/clients/` → logos de clientes (SVG ideal)
- [ ] `src/pages/sobre-mi.astro` → reemplazar bio placeholder con la real
- [ ] Confirmar mediciones que ofrece (ver comentarios en `services.mediciones.items`)

## Deploy a Vercel

1. Subir el repo a GitHub.
2. En vercel.com → Add New → Project → importar el repo.
3. Vercel detecta Astro automáticamente. Click en "Deploy".
4. Listo. Después conectás el dominio `.com.ar` desde Settings → Domains.

## SEO

- Schema.org `LocalBusiness` + `ProfessionalService` en cada página.
- Sitemap automático en `/sitemap-index.xml`.
- Una página por servicio: `/servicios/habilitaciones`, `/servicios/mediciones`, etc.
- Open Graph + Twitter Cards para previsualizaciones en WhatsApp/redes.

**Lo que falta hacer fuera del sitio (más importante que el sitio mismo):**
- Crear Google Business Profile
- Cargar el sitio en Google Search Console
- Listar el negocio en directorios locales
