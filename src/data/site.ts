// Configuración central del sitio. Todo lo editable arranca acá.

export const site = {
  name: "Lucas Contreras",
  // Tagline corto bajo el logo (estilo "ESPECIALISTAS EN HIGIENE OCUPACIONAL" de Flowork)
  brandTagline: "Asesor en Seguridad e Higiene",
  tagline: "Asesoramiento en Higiene y Seguridad en el Trabajo",
  url: "https://lucascontreras.com.ar",
  locale: "es-AR",

  professional: {
    fullName: "Lic. Lucas Aníbal Contreras",
    title: "Licenciado en Higiene y Seguridad en el Trabajo",
    universidad: "Universidad Nacional de Lomas de Zamora",
    fechaTitulo: "Marzo 2022",
    // Doble matrícula: diferencial fuerte vs. competencia que solo tiene una.
    // Le permite firmar y presentar en CABA y en Provincia sin intermediarios.
    matriculas: [
      { numero: "L003619", colegio: "COPIME", jurisdiccion: "CABA" },
      { numero: "LHS-007573", colegio: "CPSH", jurisdiccion: "Provincia de Buenos Aires" },
    ],
    photo: "/lucas.jpg",
  },

  contact: {
    // TODO: reemplazar con datos reales
    email: "contacto@lucascontreras.com.ar",
    phoneDisplay: "+54 9 11 0000-0000",
    phoneE164: "5491100000000", // sin "+" ni espacios, formato wa.me
    whatsappMessage:
      "Hola Lucas, me gustaría consultarte por un servicio de Seguridad e Higiene.",
  },

  coverage: {
    primary: "CABA",
    extended: "CABA y Provincia de Buenos Aires",
  },

  // Para schema.org LocalBusiness — clave para SEO local
  business: {
    addressLocality: "Ciudad Autónoma de Buenos Aires",
    addressRegion: "CABA",
    addressCountry: "AR",
    // TODO: si Lucas atiende en oficina, completar dirección
    streetAddress: "",
    postalCode: "",
    // Si no hay oficina física, usamos areaServed
    areaServed: ["Ciudad Autónoma de Buenos Aires", "Gran Buenos Aires"],
  },

  social: {
    // TODO: completar si Lucas tiene perfiles
    linkedin: "",
    instagram: "",
  },

  // Marco normativo de referencia. Se muestra en la home (sub-hero) y en cada servicio.
  // Capturar estas keywords es una oportunidad de SEO local que la competencia no aprovecha.
  regulations: [
    "Ley Nacional 19.587 — Higiene y Seguridad en el Trabajo",
    "Decreto 351/79 — Reglamentación general",
    "Ley 5.920 CABA — Sistema de Autoprotección",
    "Resolución SRT 84/12 — Iluminación",
    "Resolución SRT 85/12 — Ruido",
    "Resolución SRT 886/15 — Ergonomía",
  ],

  // Números para reforzar autoridad. "+5 años" es inferido de la inscripción al
  // Registro de Profesionales H&ST (29/10/2020). Los otros dos siguen pendientes
  // de confirmación con Lucas — placeholders entre corchetes para detectarlos rápido.
  stats: [
    { value: "+5 años", label: "ejerciendo profesionalmente" },
    { value: "[+X]", label: "habilitaciones gestionadas" },
    { value: "[+X]", label: "mediciones realizadas" },
    { value: "100%", label: "atendido personalmente" },
  ],
} as const;

export type ServiceGroup = {
  slug: string;
  title: string;
  short: string;
  description: string;
  items: string[];
  // Normativa específica del servicio. Aparece en la card y en la página de detalle.
  regulations?: string[];
  highlight?: boolean;
};

export const services: ServiceGroup[] = [
  {
    slug: "habilitaciones",
    title: "Habilitaciones y obra en CABA",
    short:
      "Habilitaciones comerciales, permisos de obra, excavación y reformas ante el GCBA. Acompañamos cada trámite hasta el certificado.",
    description:
      "Acompañamos cada etapa del trámite ante el Gobierno de la Ciudad: del diagnóstico al certificado final. Trabajamos con comercios, oficinas, locales gastronómicos, viviendas y obras civiles bajo Ley 5.920 (Sistema de Autoprotección) y la normativa de habilitaciones del GCBA. La presentación la firma el Lic. Lucas Contreras con matrícula COPIME.",
    items: [
      "Habilitación comercial (rubros simples y con condiciones)",
      "Permiso de obra y aviso de obra",
      "Permiso de demolición y excavación",
      "Reformas y permisos de construcción",
      "Plan de Autoprotección (Ley 5.920 CABA)",
      "Plano de incendio para AGC y Bomberos",
      "Plan de evacuación y señalización",
      "Trámites ante AGC, ADI y Defensa Civil",
      "Acta de constatación y descargos por inspección",
    ],
    regulations: [
      "Ley 5.920 CABA",
      "Código de Edificación CABA",
      "Decreto 351/79",
    ],
  },
  {
    slug: "mediciones",
    title: "Mediciones ambientales",
    short:
      "Iluminación, ruido y carga térmica. Hacemos la medición, la interpretamos y te dejamos el plan de corrección.",
    description:
      "Hacemos las mediciones obligatorias bajo las Resoluciones SRT 84/12 (iluminación), 85/12 (ruido) y la normativa ergonómica vigente. No entregamos solo el protocolo: te explicamos qué dice, qué riesgos detectó y qué hay que corregir. Cada protocolo lleva la firma del Lic. Lucas Contreras (matrículas COPIME y CPSH).",
    items: [
      "Iluminación general y localizada en puestos de trabajo",
      "Nivel sonoro continuo equivalente (LAeq)",
      "Dosimetrías personales de ruido",
      "Puesta a tierra y continuidad de masas",
      "Carga de fuego de sectores y depósitos",
      "Carga térmica y estrés térmico (TGBH)",
      "Estudios ergonómicos por puesto",
      "Termohigrometría y ventilación",
      "Verificación de tableros e instalaciones eléctricas",
    ],
    regulations: [
      "Res. SRT 84/12 (Iluminación)",
      "Res. SRT 85/12 (Ruido)",
      "Res. SRT 886/15 (Ergonomía)",
      "Res. SRT 900/15 (Puesta a tierra)",
    ],
    highlight: true,
  },
  {
    slug: "incendios",
    title: "Sistemas contra incendio",
    short:
      "Proyecto, instalación, mantenimiento y certificación contra incendio. Coordinamos la obra y la presentación ante AGC y Bomberos.",
    description:
      "Cubrimos el ciclo completo: del proyecto y la obra al mantenimiento periódico exigido por normativa. Coordinamos con una red de instaladores y matriculados de confianza, y supervisamos la entrega para que pase inspección de Bomberos y AGC sin observaciones. La memoria técnica y la presentación las firma el Lic. Lucas Contreras.",
    items: [
      "Recarga y mantenimiento de matafuegos",
      "Red de hidrantes (proyecto, obra y mantenimiento)",
      "Sistemas de detección y alarma temprana",
      "Iluminación de emergencia y señalización",
      "Estudio de carga de fuego y memoria técnica",
      "Capacitación al personal en uso de extintores",
      "Inspección anual y plan de mantenimiento",
      "Certificaciones para inspección AGC / Bomberos",
    ],
    regulations: [
      "Ley 19.587 — Decreto 351/79 (Cap. 18)",
      "IRAM 3517 / 3546 / 3597",
      "Código de Edificación CABA",
    ],
  },
];

// Clientes confirmados por Lucas. Logos descargados de las webs oficiales en /public/clients/.
export const clients: { name: string; logo?: string }[] = [
  { name: "Bajda SRL", logo: "/clients/bajda.jpg" },
  { name: "Revestimientos Cerámicos", logo: "/clients/revestimientos-ceramicos.png" },
  { name: "Ranko SRL", logo: "/clients/ranko.png" },
  { name: "truFFa café especial", logo: "/clients/truffa.png" },
  { name: "Cabarco", logo: "/clients/cabarco.png" },
  { name: "Vicente Parrilla Restaurante", logo: "/clients/vicente-parrilla.jpg" },
];

// "Cómo trabajo" — proceso en 4 pasos. Diferenciador clave: ningún competidor en CABA
// lo tiene bien hecho (HISE es el único que se acerca, con 4 pasos genéricos).
export const howIWork: { icon: string; title: string; text: string }[] = [
  {
    icon: "ph:magnifying-glass-bold",
    title: "Diagnóstico",
    text: "Hablamos por WhatsApp o nos juntamos por videollamada. Entendemos el caso, revisamos lo que ya tenés y te decimos qué hace falta — sin compromiso.",
  },
  {
    icon: "ph:hard-hat-bold",
    title: "Visita técnica",
    text: "Vamos a tu local u obra. Hacemos el relevamiento, las mediciones con instrumental propio y registramos todo lo que hay que corregir.",
  },
  {
    icon: "ph:list-checks-bold",
    title: "Plan de acción",
    text: "Te entregamos un informe con prioridades, plazos y costos estimados. Vos decidís qué se ejecuta primero según el riesgo y el presupuesto.",
  },
  {
    icon: "ph:repeat-bold",
    title: "Seguimiento",
    text: "Coordinamos las correcciones, presentamos los trámites y volvemos a inspeccionar antes de la fiscalización oficial. No te dejamos solo en la inspección.",
  },
];

export const navLinks = [
  { href: "/", label: "INICIO" },
  { href: "/sobre-mi", label: "NOSOTROS" },
  { href: "/servicios", label: "SERVICIOS" },
  { href: "/capacitacion", label: "CAPACITACIÓN" },
  { href: "/clientes", label: "CLIENTES" },
  { href: "/contacto", label: "CONTACTO" },
];

export function whatsappUrl(message?: string) {
  const text = encodeURIComponent(message ?? site.contact.whatsappMessage);
  return `https://wa.me/${site.contact.phoneE164}?text=${text}`;
}

export function mailtoUrl(subject?: string) {
  const s = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${site.contact.email}${s}`;
}
