# Pendientes a confirmar con Lucas

> Última actualización: 2026-05-08
>
> Lista priorizada de preguntas/decisiones que dependen de Lucas antes
> de cerrar el sitio. Está pensada para que armes una sola conversación
> con él (WhatsApp / videollamada) y bajemos todo de una.
>
> Ver también:
> - `DATOS-LUCAS.md` — datos confirmados + decisiones tomadas
> - `info-lucas.txt` (gitignored) — checklist original del kickoff

---

## 1. Decisión bloqueante (define todo lo demás)

### Voz del sitio: empresa o personal

Lucas tiene que elegir cómo se presenta. Las dos opciones están renderizadas y listas:

- **🅲 Voz empresa (chwork)** — http://localhost:4321
  Marca paraguas + página dedicada "El responsable / Director Técnico"
  con su nombre, universidad y matrículas. Footer con DT explícito.
  Resto del sitio en plural ("Acompañamos", "Operamos con doble matrícula").

- **🅳 Voz personal limpia** — http://localhost:4322
  Marca personal Lic. Lucas Contreras. Sitio en 1ra singular declarativa
  ("Acompaño", "Diseño", "Trabajo"), sin slogans.

Branches: `copy/v2-empresa` y `copy/v2-personal-clean`.

> Mensaje sugerido para Lucas: "Elegí cuál refleja cómo te ves vos en
> los próximos 5 años, no cuál suena más lindo. Si pensás chwork como
> marca que pueda crecer → C. Si te ves como profesional independiente
> que firma con su nombre → D."

---

## 2. Servicios — alcance real

### 2.1 ¿Hace peritajes?

Flowork lo lista como servicio diferenciado. Es un servicio real, regulado
y bien pago en el rubro (Lic. en H&S actúan como peritos a pedido judicial
o de aseguradoras).

- Si **sí** → sumamos como servicio destacado o sub-servicio dentro de
  "Estudios técnicos".
- Si **no** → queda fuera (no inventar).

### 2.2 ¿Qué mediciones hace además de iluminación, ruido y carga térmica?

Hoy listamos 9 mediciones. Flowork lista ~20. Lucas puede hacer algunas
que aún no figuran:

- [ ] **Material particulado** (PM10, PM2.5, polvo respirable) — requiere bomba muestreo
- [ ] **Gases** (CO, CO₂, NO₂, SO₂, vapores orgánicos) — requiere detector específico
- [ ] **Vibraciones** mano-brazo / cuerpo entero — requiere acelerómetro
- [ ] **Estrés térmico por frío** (rara vez, pero existe)
- [ ] **Calidad de aire interior** (CO₂, ventilación) — para oficinas

Si hace alguna, listar. Si no, quedan fuera.

### 2.3 Otros servicios del rubro a evaluar

- [ ] Programa Anual de Seguridad (PAS) — lo piden las ART
- [ ] RAR (Relevamiento de Agentes de Riesgo) — lo piden las ART
- [ ] Análisis de riesgo formal / matriz de riesgo
- [ ] Investigación de accidentes laborales
- [ ] Legajo técnico para inspecciones SRT

Los 5 son servicios estándar del rubro. Confirmar cuáles ofrece.

---

## 3. Datos profesionales pendientes

### 3.1 Posgrado / formación complementaria

No aparece en las credenciales que pasó. Confirmar:
- ¿Tiene posgrado? Si sí → nombre exacto, institución, año.
- ¿Cursos relevantes (auditor ISO 45001, ergonomía aplicada, etc.)?
- ¿Otras certificaciones o registros para destacar?

### 3.2 Antigüedad real

Hoy mostramos `+5 años ejerciendo profesionalmente` (inferido de la
inscripción al Registro Profesional H&ST del 29/10/2020).

- ¿Le sirve esa expresión?
- ¿Tiene experiencia previa al título (años trabajando como técnico,
  empleado en consultora, etc.) que quiera sumar?
- ¿Año exacto de inicio si quiere personalizar?

### 3.3 Stats numéricos

Hoy `[+X] habilitaciones gestionadas` y `[+X] mediciones realizadas`
están como placeholders. Pedir números aproximados (conservadores) para
poner en la home. Por ejemplo: "+30 habilitaciones", "+50 mediciones".

---

## 4. Datos de contacto (bloquean publicación)

- [ ] **Email profesional definitivo** — el institucional COPIME
  (`lucasanibal.contreras@copime.org.ar`) NO sirve para clientes.
  ¿Va `contacto@chwork.com.ar` (si elige voz empresa) o
  `lucas@lucascontreras.com.ar` (si elige personal)?
- [ ] **WhatsApp** — formato display ("+54 9 11 XXXX-XXXX") + E.164
  ("549...") sin "+" ni espacios.
- [ ] **LinkedIn** URL completa.
- [ ] **Instagram** profesional (si tiene; el personal puede no servir).
- [ ] **Horario de atención** (opcional, pero ayuda en Google Business
  Profile y en el footer).

---

## 5. Visuales

### 5.1 Foto profesional (alta prioridad)

Hoy NO hay foto real de Lucas en el sitio (la del COPIME es thumbnail
chico, no sirve). Para una marca personal o un Director Técnico, la
foto es lo que más convierte.

Pedido concreto a Lucas (5 minutos con un iPhone moderno):
- Vertical y horizontal si se puede
- Luz natural, fondo claro neutro
- Vestimenta profesional (camisa o polo, sin uniforme)
- Idealmente una con casco / chaleco visible (para refuerzo del rubro)

Si no la entrega: usar placeholder elegante (silueta o iniciales) hasta
que la mande. **NO** inventar una con AI a partir de las dos fotos
chicas que tenemos (riesgo de impostor real).

### 5.2 Foto en obra (opcional, refuerza autoridad)

Una foto de Lucas haciendo una medición o supervisando un trabajo. Para
hero o página "Sobre mí".

### 5.3 Logo propio

¿Lucas quiere un logo propio o el wordmark actual ("CH/work" en chwork)
es suficiente? Hoy todas las variantes que tienen logo usan el monograma
construido en SVG.

---

## 6. Clientes (autorización + verificación)

### 6.1 Truffa — logo a corregir

Lucas avisó que `truffa.png` actual (truFFa café especial, Asamblea 1552)
NO es el cliente correcto. Encontró el Instagram correcto:
**@truffascafegourmet**.

Acción: bajar el avatar del Instagram y reemplazar `truffa.png`.
Instagram bloquea el scrape automático — hay que hacerlo a mano:
- Click derecho en la foto del perfil → "Guardar como"
- O usar instadp.com / imginn.com (sitios públicos sin login)
- Pegar en `/Users/martin.guadalupe/Downloads/` y avisarme

### 6.2 Autorización formal

Antes de publicar, los 6 clientes (Bajda · Revestimientos Cerámicos ·
Ranko · truFFa · Cabarco · Vicente Parrilla) tienen que **autorizar
explícitamente** que se muestre su logo + nombre. Es práctica estándar
y evita tirones.

### 6.3 Logos en mejor calidad

Bajda quedó como JPG chico (238×63) porque su web actual solo tiene
versión texto blanco para fondo oscuro. Si Lucas le pide al cliente
una versión SVG/PNG hi-res, mejor.

---

## 7. Textos por sección (placeholders restantes)

- [ ] **Inicio** — frase corta que defina + 2-3 líneas de propuesta de
  valor. Hoy está armado pero conviene que Lucas lo lea y diga si le
  representa.
- [ ] **Capacitación** — cursos concretos que da, modalidad (presencial /
  virtual), público, certificación, duración estándar.
- [ ] **Contacto** — mensaje propio si quiere ("respondo en X horas",
  "atiendo de lunes a viernes", etc.).
- [ ] **Casos puntuales / proyectos emblemáticos** — para reforzar
  "Sobre mí". Sin nombres si hay confidencialidad: "habilitación
  gastronómica en Palermo de 2024", "medición ambiental en planta
  industrial Avellaneda".

---

## 8. Modelo comercial (si quiere mostrarlo)

- [ ] ¿Cobra por hora / abono mensual / por trabajo / paquete cerrado?
- [ ] ¿Quiere mostrar rangos ("desde $X") o solo "presupuesto sin cargo"?
- [ ] ¿Confirma "primera visita o videollamada sin cargo"? ¿Qué incluye?
- [ ] **Plazos típicos** que pueda comprometer (ej: "habilitación
  gastronómica en CABA: 30-45 días"). Sirven mucho para FAQ futuro.

---

## 9. Decisiones de producto (no urgentes)

- [ ] ¿Quiere blog / sección de novedades? (1 nota al mes = mucho ROI SEO).
- [ ] ¿Quiere formulario de contacto además de WhatsApp + mail?
  (Recomendación: no, mantener simple).
- [ ] ¿Calendly para agendar visitas? (Depende de su disponibilidad).
- [ ] ¿Material descargable (checklist habilitación, catálogo capacitaciones)?
- [ ] ¿Idiomas? — ¿atiende en inglés? Algunas multinacionales en CABA
  podrían buscarlo.

---

## 10. Dominio + deploy

- [ ] **Dominio definitivo**: `chwork.com.ar` (si elige voz empresa) o
  `lucascontreras.com.ar` (si elige personal). Lucas registra en NIC.ar.
- [ ] **Defensivos**: registrar también el otro y `lcwork.com.ar` para
  redirects.
- [ ] **Hosting**: Vercel free tier (ya planeado).
- [ ] **Google Business Profile** en paralelo al deploy (más impacto SEO
  local que cualquier optimización on-page).
- [ ] **Search Console** + submit sitemap.

---

## Orden sugerido de bajada con Lucas

Si tenés solo una llamada con él, priorizar en este orden:

1. **Voz** (C o D) — desbloquea el copy final.
2. **Email + WhatsApp** definitivos — desbloquea publicación.
3. **Foto profesional** — más impacto en conversión.
4. **Stats numéricos** + **antigüedad** — datos rápidos de pasar.
5. **Peritajes / mediciones extras** — alcance real de servicios.
6. **Autorización clientes** — antes de salir live.
7. Lo demás (modelo comercial, blog, etc.) puede esperar.
