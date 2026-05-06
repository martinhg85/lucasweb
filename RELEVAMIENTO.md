# Relevamiento — Sitio Lucas Contreras (Seguridad e Higiene)

> Auditoría del estado actual del sitio antes de salir a producción. Foco en producto, copy y conversión para mercado argentino.

---

## 1. Resumen ejecutivo

El sitio tiene **una base técnica muy sólida** (Astro, SEO bien armado, buen performance, diseño coherente con el rubro), pero **no está listo para captar clientes todavía**. Faltan datos críticos del cliente (matrícula, foto, clientes reales, contacto), hay **inconsistencias de voz** entre "yo" y "nosotros" que confunden si es marca personal o estudio, y el copy todavía se apoya en frases genéricas ("asesoramiento integral", "soluciones") en lugar de diferenciales concretos que converten.

**Estado**: maqueta funcional al 80%. Para salir vivo se necesita una segunda ronda con Lucas para completar datos y bajar el copy a tierra.

---

## 2. Puntos fuertes

### Técnicos / SEO
- **Stack moderno y rápido**: Astro 5 + Tailwind v4 = HTML estático, sin JS innecesario. Va a cargar en menos de 1s en 4G.
- **SEO técnico bien hecho**: `schema.org LocalBusiness` + `ProfessionalService` + `Service` por página, sitemap automático, Open Graph, Twitter Cards, canonical, meta description por página, h1 único.
- **Una página por servicio** (`/servicios/habilitaciones`, `/mediciones`, `/incendios`) — es lo correcto para SEO local en CABA. Google va a rankear por "carga de extintores CABA" sin esfuerzo extra.
- **Mobile-first**: layout responsive en todas las páginas.
- **HTML semántico** y accesibilidad básica cubierta (aria-labels en CTAs, alt texts en imágenes).

### Diseño / UX
- **Look industrial-profesional coherente**: paleta navy + naranja, mayúsculas, cortes diagonales, tipografía Open Sans. No tiene el look "SaaS startup" que estaría fuera de tono para el rubro.
- **Cortes diagonales del hero** (clip-path) bien resueltos — le dan personalidad sin sentirse forzado.
- **Header sticky con compactación al scroll** — buen detalle de UX.
- **Navegación clara**: 6 ítems, todos con propósito definido.
- **Botón flotante de WhatsApp** en todas las páginas — el canal natural para el cliente argentino.

### Copy
- **Uso correcto del voseo** en CTAs y formularios ("Contame qué necesitás", "querés mandar planos", "necesitás una capacitación"). Suena local.
- **Mención de normativa real** (Resolución SRT 84/12, 85/12) → genera confianza técnica.
- **CTA principal directa**: WhatsApp es el canal correcto para el mercado AR, mejor que un formulario.

---

## 3. Puntos débiles

### Bloqueantes para salir vivo
- **Todos los datos de contacto son placeholder**: mail `contacto@lucascontreras.com.ar`, teléfono `+54 9 11 0000-0000`, matrícula `Mat. [completar]`, posgrado `Posgrado en [completar]`. **Si alguien entra hoy, no puede contactarlo.**
- **Sin foto real de Lucas** — el hero y `/sobre-mi` muestran un placeholder. Para una marca personal, la cara es lo que más convierte.
- **Sin clientes reales** — la grilla de clientes muestra 12 cuadrados con "Logo 1", "Logo 2"... Es peor que no tener la sección. **Sacar la sección hasta tener 4-6 logos reales** o reemplazar por testimonios.
- **Sin testimonios** — para servicios profesionales, 2-3 testimonios cortos firmados (con nombre y empresa) son lo que más mueve la aguja.

### Inconsistencia de voz (importante)
El sitio se presenta como **marca personal de Lucas**, pero el copy mezcla "yo" con "nosotros":

| Página | Texto | Voz |
|---|---|---|
| Home Hero | "Acompaño a empresas..." | yo ✓ |
| Home NOSOTROS | "Brindo soluciones..." | yo ✓ |
| Home Clientes | "Confían en nosotros." | nosotros ✗ |
| Servicios | "Acompañamos cada etapa..." | nosotros ✗ |
| Servicios | "Realizamos las mediciones..." | nosotros ✗ |
| Servicios | "Cubrimos el ciclo completo..." | nosotros ✗ |
| Capacitación CTA | "Diseñamos el plan..." | nosotros ✗ |
| Sobre mí | "Cada cliente trabaja directamente conmigo, sin intermediarios" | yo ✓ |
| Header | "NOSOTROS" (link a /sobre-mi) | nosotros ✗ |

**El propio diferencial declarado** ("trabajás directo conmigo, sin intermediarios") **se contradice** con el "nosotros" en Servicios. Hay que **decidir y unificar**: si es marca personal, todo va en primera persona singular ("Acompaño", "Realizo", "Cubro"). El item del header debería ser "SOBRE MÍ", no "NOSOTROS".

### Copy genérico — falta diferencial concreto
- **"Asesoramiento integral en Seguridad e Higiene"** se repite en hero, footer y descripción. Es una frase que dice cualquier competidor. No comunica por qué Lucas y no otro.
- **"Brindo soluciones en todas las áreas..."** — frase larga, técnica, sin gancho. Cuesta leerla.
- **"Convencido de que una buena gestión... contribuye a la formación de una compañía sólida"** — suena a discurso institucional, no a marca personal cercana.
- El **diferencial real** (instrumental propio calibrado para mediciones) está mencionado pero **diluido**. Debería ser EL gancho del hero, no un pilar más.

### Faltan secciones que convierten en este rubro
- **Proceso de trabajo** ("Cómo trabajamos en 3 pasos: 1. Visita inicial → 2. Diagnóstico y plan → 3. Ejecución y seguimiento"). Da previsibilidad.
- **FAQ** (¿cuánto sale una habilitación? ¿en cuántos días sale el permiso de obra? ¿hay abono mensual?). Resuelve objeciones antes del WhatsApp.
- **Casos / proyectos recientes** (aunque sea genéricos: "Habilitación gastronómica en Palermo", "Medición ambiental en planta industrial Avellaneda").
- **Logos de aseguradoras / cámaras** con las que trabaja (ART, cámaras de comercio, colegio profesional).

### Riesgos de copy
- **"Coordinemos una primera visita o videollamada sin cargo"** (`/sobre-mi`) — comprometerse a "sin cargo" sin definir alcance puede traer consultas-zombi. **Confirmar con Lucas si realmente quiere ofrecer eso**.
- **"in company"** en capacitaciones — anglicismo. Una pyme argentina puede no saber qué significa. Mejor: **"en tu empresa"** o **"en planta"**.
- **"punta a punta"** (hero) — es coloquial AR, suena bien, pero algunos clientes corporativos lo van a leer informal. Aceptable, pero alternativa: "de principio a fin".

### Inconsistencias UX menores
- En `/sobre-mi` el `<title>` HTML dice "Nosotros" pero la URL es `/sobre-mi`. El header link dice "NOSOTROS". → Decidir y unificar (recomendado: **"Sobre mí"** en todos lados).
- **`ServiceTabs` usa `rounded-full`** en las pills, pero el sistema de diseño declarado es "bordes rectos, sin rounded". Inconsistencia con el resto.
- **Falta menú hamburguesa móvil** explícito — el header tiene `overflow-x-auto` en la nav, pero en mobile se va a ver raro con 6 ítems. Probar en 375px.
- **No hay versión mobile de la foto del hero**: el corte diagonal queda solo a partir de `md:`. En mobile la foto desaparece.

### Faltan elementos legales / formales argentinos
- **Datos de matrícula visibles** son obligatorios en algunos rubros profesionales (Colegio de Higiene y Seguridad). Hoy figura `Mat. [completar]` en footer.
- Si Lucas factura como monotributista o RI, **no es necesario mostrarlo**, pero algunos clientes corporativos lo piden — ver si conviene tener una sección "Datos fiscales" en el footer.

### SEO — falta on-page más específico
- Las **meta descriptions son OK pero genéricas**. Faltan keywords locales potentes: "habilitación local CABA", "medición de ruido fábrica Buenos Aires", "carga de extintores Capital Federal".
- **Sin contenido extenso en cada servicio** — Google rankea mejor páginas con 600+ palabras. Hoy las páginas de servicio tienen ~150 palabras.
- **Falta blog / sección de novedades** — para SEO local sostenido sirve mucho. Nota técnica de 800 palabras al mes ("Cómo es el trámite de habilitación gastronómica en CABA en 2026") atrae tráfico orgánico.
- **No está creado Google Business Profile** (mencionado en CONTEXT.md como pendiente). Es lo #1 en SEO local — más impacto que cualquier optimización on-page.

---

## 4. Análisis del copy para mercado argentino

### Lo que está bien (suena local)
- Voseo en CTAs: "Contame qué necesitás", "querés mandar planos", "Necesitás una capacitación a medida".
- Referencias correctas: SRT, CABA, Gobierno de la Ciudad, Resolución 84/12 y 85/12.
- WhatsApp como canal principal — es el default en AR para servicios profesionales.
- Mail + WhatsApp y NO formulario — el cliente argentino prefiere el contacto directo, valida la decisión.

### Lo que se puede mejorar para sonar más local y profesional
- **Sumar referencias normativas que el público AR reconoce**: Ley 19.587, Decreto 351/79, ART, RAR (Relevamiento de Agentes de Riesgo), Programa Anual de Seguridad. El público comercial las conoce por nombre y dispara confianza.
- **Cambiar "in company"** por "en tu empresa" o "en planta".
- **Rubros explícitos** que el cliente argentino busca por nombre: gastronómicos, indumentaria, oficinas, depósitos, talleres, obras civiles, construcción. Mencionarlos dispara reconocimiento ("ah, este atiende lo mío").
- **Términos comerciales argentinos**: "abono mensual" / "asesoramiento por hora" / "auditoría puntual" — son las tres modalidades típicas en AR. Hoy no se aclara cuál ofrece Lucas.
- **Tono**: el copy alterna entre formal-corporativo ("contribuye a la formación de una compañía sólida") y cercano ("Contame qué necesitás"). Para una marca personal en AR, **conviene apuntar al tono cercano-profesional** parejo. Más "te ayudo a no tener problemas con el inspector" y menos "contribuye a una gestión sólida".
- **Urgencia local**: el cliente argentino reacciona a "evitar la clausura", "habilitar antes de la inspección", "estar en regla con ART". Hoy el copy es muy abstracto.

### Calificación general del copy
- Voz / tono: **6/10** — voseo OK, pero inconsistencia yo/nosotros baja el puntaje.
- Claridad técnica: **7/10** — las normativas están bien, falta sumar más referencias locales.
- Persuasión / conversión: **5/10** — falta diferencial concreto, prueba social, urgencia y CTAs específicas.
- Localización argentina: **7/10** — bien, pero se puede subir mucho con los ajustes anteriores.

---

## 5. Qué consultarle al cliente para cumplir todas sus expectativas

### A. Datos personales y profesionales (bloqueantes)
1. **Matrícula profesional** completa — ¿Colegio de Higiene y Seguridad de qué provincia?
2. **Posgrado / especialización** real (nombre exacto y dónde lo cursó).
3. **Años de experiencia** y trayectoria — ¿dónde trabajó antes?
4. **Foto profesional**: ¿tiene una con casco/chaleco? ¿Hay que producir sesión? ¿Usamos stock como puente?
5. **LinkedIn / IG profesional** — para sumar al footer y al schema.org.
6. **Mail real** y si va a usar dominio propio (`contacto@lucascontreras.com.ar`) o uno existente.
7. **Teléfono de WhatsApp Business** — confirmar si es el personal o uno separado.
8. **¿Atiende en oficina física?** Si sí, dirección para schema LocalBusiness y mapa.

### B. Servicios — confirmar alcance real
9. **Mediciones**: además de iluminación y ruido, ¿hace puesta a tierra, carga de fuego, ergonomía, vibraciones, calidad de aire? (Hay opcionales comentados en el código).
10. **¿Ofrece asesoramiento mensual / abono fijo?** Es lo más común en el rubro AR para empresas con personal.
11. **¿Hace Programa Anual de Seguridad / RAR / análisis de riesgo formal?** Lo piden las ART.
12. **¿Trabaja con ART específicas?** Si tiene relación con alguna en particular, mencionarlo es prueba social.
13. **¿Hace legajo técnico para inspecciones?** Puntería específica en CABA.
14. **Capacitaciones**: ¿tiene catálogo definido (cursos, duraciones, certificados)? ¿Las certifica el Colegio?
15. **¿Ofrece servicios para obra (estudios de impacto, plan de seguridad de obra)?**

### C. Clientes y prueba social
16. **Listado real de clientes** que dan permiso para mostrar nombre/logo.
17. **2-4 testimonios cortos** firmados (nombre, empresa, cargo). Para servicios profesionales esto es lo que más convierte.
18. **Casos de éxito** que pueda contar (sin nombres si hay confidencialidad): "habilité 6 locales gastronómicos en Palermo en 2025", "medición ambiental en planta de 80 empleados".

### D. Modelo comercial
19. **¿Cómo cobra?** Hora, abono mensual, por trabajo, paquete cerrado. Define si conviene mostrar precios desde, "presupuesto sin cargo", o nada.
20. **¿Quiere mostrar rangos de precio o "desde $X"?** Ayuda a filtrar leads malos. La mayoría en AR prefiere no mostrar.
21. **Confirmar la oferta "primera visita o videollamada sin cargo"** — ¿es real? ¿Cuánto dura? ¿Qué incluye?
22. **Plazos típicos** que pueda comprometer ("habilitación gastronómica en CABA: 30-45 días"). Sirven mucho para la sección FAQ.
23. **Zona de cobertura real** — ¿solo CABA? ¿GBA? ¿Costo extra para zona oeste/sur/norte? ¿Va al interior?

### E. Decisiones de producto
24. **Voz definitiva**: ¿"yo" (marca personal pura) o "nosotros" (marca con equipo aliado / red)? **Hay que elegir y unificar.** Recomendación: **yo**, porque es el diferencial declarado.
25. **¿Tiene equipo o profesionales aliados?** Si los tiene, vale aclarar "trabajo con red de aliados para X" — es más honesto que "Acompañamos".
26. **¿Quiere blog / novedades?** Mucho ROI en SEO si publica 1 nota al mes.
27. **¿Quiere formulario de contacto** además de WhatsApp + mail? Recomendación: **no**, mantener simple.
28. **¿Quiere chat en vivo / Calendly para agendar visitas**? Calendly puede sumar mucho — depende de su disponibilidad.
29. **¿Hay material descargable** (PDFs de "checklist de habilitación", catálogo de capacitaciones)? Funciona muy bien como lead magnet.

### F. Detalles operativos
30. **Horario de atención** — para mostrar en contacto y en Google Business.
31. **Idiomas** — ¿atiende en inglés? Algunas multinacionales en CABA lo pueden buscar.
32. **Nombre comercial / dominio definitivo** — confirmar `lucascontreras.com.ar` o alternativa.
33. **¿Tiene logo profesional o el del header (icono construido en CSS) es definitivo?** Recomendación: invertir en un logo simple.
34. **¿Tiene presupuesto para fotografía profesional** (de él + de obras/instrumental)? Para el hero y casos.
35. **¿Está dado de alta en algún portal o cámara** (Páginas Amarillas, cámaras de comercio, colegio profesional) que sirva para backlinks?

### G. Prioridades de público
36. **¿Cuál es su segmento prioritario?** Comercios chicos, oficinas, restaurantes/gastronómicos, fábricas pequeñas, obras civiles, despachantes — cada uno cambia el copy y los ejemplos del sitio.
37. **¿Hay un "cliente ideal" tipo?** (Ej: "comercio gastronómico de Palermo de 4-15 empleados"). Define cómo escribir todo.

---

## 6. Quick wins recomendados (orden sugerido)

Si querés priorizar impacto/esfuerzo:

1. **Completar los placeholders de `src/data/site.ts`** (datos de contacto + matrícula + posgrado). 30 min, desbloquea todo.
2. **Sacar la grilla de clientes vacía** o reemplazar por placeholder honesto ("Clientes activos en CABA y GBA — listado a pedido"). 10 min, hoy resta.
3. **Unificar la voz a primera persona singular** en todos los textos de servicios. 1h.
4. **Reescribir el hero** apuntando al diferencial real (mediciones con instrumental propio) en lugar de "asesoramiento integral". 30 min con borrador del cliente.
5. **Foto profesional real** o stock decente como puente. 1 día si es producción, 30 min si es stock.
6. **Sumar 3 testimonios cortos** (aunque sean de colegas o ex-empleadores autorizados). 1 sesión con Lucas.
7. **Agregar sección "Cómo trabajamos"** con 3-4 pasos. 1h.
8. **Agregar FAQ** con 6-8 preguntas reales que recibe por WhatsApp. 2h con Lucas.
9. **Crear Google Business Profile** (más impacto SEO local que cualquier cambio en el sitio). 30 min.

---

## 7. Conclusión

La base está bien, pero no se puede salir a producción todavía. La mayor parte del trabajo pendiente **no es técnico**: es **una sesión con Lucas** para bajar datos reales, definir voz y diferencial, y conseguir prueba social. Una vez con eso, son 2-3 días de ajustes de copy y media jornada de carga.

El sitio está hoy en **80% técnico / 40% comercial**. Con la sesión + ajustes pasa a **95% / 90%** y sale.
