# Datos de Lucas — Recolectados

> Última actualización: 2026-05-07
>
> Inventario vivo de la información real que tenemos de Lucas Contreras
> y dónde se usa (o no) en el sitio. Cada vez que entre dato nuevo,
> sumarlo acá y actualizar el mapa de consumo.
>
> Documentos de origen relacionados:
> - `info-lucas.txt` — checklist original que mandamos al cliente (gitignored)
> - `KICKOFF-LUCAS.md` — versión formal del checklist
> - `src/data/site.ts` — implementación que consume estos datos

---

## 1. Datos confirmados (con fuente)

### Identidad y formación

| Dato | Valor | Fuente |
|---|---|---|
| Nombre completo | Lucas Aníbal Contreras | Credencial COPIME + CPSH |
| DNI | 26.321.847 | Credencial COPIME (NO publicar) |
| Título | Licenciado en Higiene y Seguridad en el Trabajo | Credencial COPIME |
| Universidad | Universidad Nacional de Lomas de Zamora (UNLZ) | Credencial COPIME |
| Fecha del título | 17/03/2022 | Credencial COPIME |

### Matrículas y registros profesionales

| Tipo | Número | Organismo | Jurisdicción | Vigencia |
|---|---|---|---|---|
| Matrícula | **L003619** | COPIME | CABA | Inscripto 09/06/2022 — Paga 2026-01, vence 30/06/2026 |
| Matrícula | **LHS-007573** | CPSH (Distrito 1) | Provincia de Buenos Aires (Ley 15.105) | Confirmada vigente |
| Registro | **G005021** | Registro de Profesionales en H&ST | (registro adicional) | Inscripto 29/10/2020 — vence 31/12/2026 |

### Antigüedad ejerciendo

- Inferida en **+5 años** a partir de la inscripción al Registro de Profesionales H&ST (29/10/2020).
- A confirmar con Lucas si quiere expresarla de otra forma (ej: "desde 2020", "+10 años con experiencia previa").

### Email institucional (NO usar como contacto)

- `lucasanibal.contreras@copime.org.ar` — es el **domicilio electrónico** de COPIME, no el mail de contacto profesional. NO se publica.

---

## 2. Diferencial estratégico identificado

**Doble matrícula CABA + PBA.** La mayoría de los profesionales en el rubro tiene una sola jurisdicción cubierta. Lucas firma y presenta trámites en CABA (COPIME) y en Provincia (CPSH) sin intermediarios.

Hoy explícito en:
- `sobre-mi.astro` — copy del cuerpo y card de matrículas
- `Footer.astro` — listado de matrículas
- `coverage.extended` → "CABA y Provincia de Buenos Aires"

---

## 3. Pendientes (siguen del kickoff `info-lucas.txt`)

### Datos profesionales

- [ ] **Posgrado** — no aparece en credenciales recibidas. Confirmar con Lucas: ¿tiene? ¿no? ¿hay otro doc?
- [ ] Otras certificaciones / cursos a destacar
- [ ] Año exacto en que arrancó a ejercer (tenemos 2020 inferido)

### Contacto

- [ ] Email profesional definitivo (el de COPIME no sirve)
- [ ] Celular / WhatsApp
- [ ] LinkedIn URL
- [ ] Instagram laboral (si tiene)
- [ ] Horario de atención (opcional)

### Visuales

- [ ] Foto profesional (vertical y horizontal). La del COPIME es thumbnail chico de baja calidad — no sirve.
- [ ] Foto de Lucas en obra / haciendo medición (opcional, refuerza autoridad)
- [ ] Logo propio (si decide tener uno)

### Clientes (logos)

- [x] **6 logos cargados** en `/public/clients/` (Bajda, Revestimientos Cerámicos, Ranko, truFFa, Cabarco, Vicente Parrilla Restaurante) — bajados de webs oficiales el 2026-05-07/08.
- [ ] **Autorización explícita de cada cliente** para mostrar logo + nombre. Pendiente confirmar con Lucas.
- [ ] Logos en mejor calidad (SVG/PNG hi-res) si los clientes los aportan. El de Bajda quedó chico (238×63 jpg, fondo blanco) porque el del sitio actual es para fondo oscuro.
- [ ] **Truffa pendiente de re-verificación**: Lucas avisó que `truffa.png` (truFFa café especial, Av. Asamblea 1552) NO es el cliente correcto. El share `8Gu0UXpNDUA2I4pO6` ahora resuelve a una página vacía de Google que sugiere "Truffas café gourmet" pero no se encontró ningún negocio con ese nombre exacto en CABA. Pedirle a Lucas el nombre/URL correcto antes de cambiar el logo.
- Vicente Parrilla Restaurante: logo recibido como imagen local (sin URL fuente); imagen 1484×1600 jpg. Ubicado en Dr. Pedro Ignacio Rivera 3801, Coghlan (CABA). IG: @vicente_resto. Sin sitio web oficial.

### Textos por sección

- [ ] Inicio: frase corta que defina + 2-3 líneas de propuesta de valor
- [ ] Capacitación: cursos que da, modalidad, público, certificación
- [ ] Contacto: mensaje propio ("respondo en 24hs", etc.)
- [ ] Casos puntuales / tipos de obra emblemáticos (refuerzo del "sobre mí")

### Stats que siguen como placeholder

- [ ] Cantidad de habilitaciones gestionadas → hoy `[+X]` en `site.ts`
- [ ] Cantidad de mediciones realizadas → hoy `[+X]` en `site.ts`

---

## 4. Mapa: dato → dónde se usa

| Dato | Campo en `site.ts` | Consumido en |
|---|---|---|
| Nombre completo | `professional.fullName` | `sobre-mi.astro` (h1), `Footer.astro` (copyright), `Layout.astro` (JSON-LD) |
| Título profesional | `professional.title` | `sobre-mi.astro` (eyebrow) |
| Universidad + año | `professional.universidad`, `.fechaTitulo` | `sobre-mi.astro` (subtítulo bajo el nombre) |
| Matrículas (array) | `professional.matriculas` | `sobre-mi.astro` (card), `Footer.astro` (línea bajo tagline) |
| Foto | `professional.photo` | `Hero.astro` (background), `Layout.astro` (JSON-LD image) |
| Cobertura | `coverage.extended` | `Footer.astro`, `sobre-mi.astro` (card "Zona"), `Hero.astro` |
| Areas served (SEO) | `business.areaServed` | `Layout.astro` (JSON-LD LocalBusiness) |
| Email contacto | `contact.email` | `Footer.astro`, `contacto.astro`, `mailtoUrl()` |
| Teléfono | `contact.phoneDisplay`, `.phoneE164` | `Footer.astro`, `WhatsAppButton.astro`, `whatsappUrl()` |
| Stats (números) | `stats[]` | `Stats.astro` (home) |
| Marco normativo | `regulations[]` | `RegulatoryStrip.astro` (home + servicios) |
| Cómo trabajo | `howIWork[]` | `HowIWork.astro` (home + sobre-mi) |
| Servicios | `services[]` | `index.astro`, `servicios/*`, `ServiceTabs.astro`, `Footer.astro` |
| Clientes | `clients[]` | `ClientGrid.astro` (página `/clientes`) |

---

## 5. Datos sensibles que NO se publican

- **DNI 26.321.847** — solo para uso interno / facturación. Nunca al sitio.
- **Email institucional COPIME** (`lucasanibal.contreras@copime.org.ar`) — es el "domicilio electrónico" del colegio profesional, no un canal de contacto público.
- **Firma escaneada / QR de la credencial** — material privado, no publicar.

---

## 6. Decisiones tomadas (y por qué)

1. **`fullName` = "Lic. Lucas Aníbal Contreras"** — agregamos el segundo nombre porque aparece así en ambas credenciales y refuerza autoridad/seriedad. Si Lucas prefiere "Lic. Lucas Contreras" sin el "Aníbal", se cambia en una línea.
2. **Saqué el campo `postgrado`** del modelo de datos. Estaba como placeholder y no tenemos confirmación. Si después aparece, lo reincorporamos.
3. **Cambié `matricula` (string) → `matriculas` (array)**. Single source of truth, y el footer lo serializa con `.join(" · ")` en lugar de tener un string redundante en `site.ts`.
4. **`coverage.extended`** pasó de "CABA y Gran Buenos Aires" → "CABA y Provincia de Buenos Aires". Ahora es defendible con la matrícula CPSH PBA y es más amplio (CPSH cubre toda la Provincia, no solo GBA).
5. **`stats[0]`** pasó de `[+X] años` → `+5 años`. Conservador, basado en inscripción al Registro Profesional 2020.
6. **Bajda logo en `.jpg` con fondo blanco** (resto son PNG con alfa) porque el sitio actual de Bajda solo tiene la versión de texto blanco para fondo oscuro. Bajamos del sitio anterior `pisodemadera.com.ar`.
