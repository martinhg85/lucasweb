// Configuración central del sitio. Todo lo editable arranca acá.

export const site = {
  name: "chwork",
  brandTagline: "Asesoría integral en seguridad e higiene del trabajo",
  tagline: "Asesoría integral en Seguridad e Higiene del Trabajo",
  url: "https://chwork.com.ar",
  locale: "es-AR",

  contact: {
    email: "prevencion@chwork.com.ar",
    phoneDisplay: "+54 9 11 3083-2781",
    phoneE164: "5491130832781",
    whatsappMessage:
      "Hola, me gustaría consultarles por un servicio de Seguridad e Higiene.",
  },

  coverage: {
    primary: "CABA",
    extended: "CABA y Provincia de Buenos Aires",
  },

  // Para schema.org Organization — clave para SEO local
  business: {
    addressLocality: "Ciudad Autónoma de Buenos Aires",
    addressRegion: "CABA",
    addressCountry: "AR",
    streetAddress: "",
    postalCode: "",
    areaServed: ["Ciudad Autónoma de Buenos Aires", "Gran Buenos Aires"],
  },

  social: {
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

  // Las 5 áreas son las que figuran en la presentación CABARCO (slide 4).
  stats: [
    { value: "5", label: "áreas de especialización" },
    { value: "+5 años", label: "de trayectoria" },
    { value: "CABA + PBA", label: "cobertura territorial" },
    { value: "100%", label: "casos con seguimiento" },
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
  // Bloque destacado tipo grid de íconos (estilo "tarjetas con ícono").
  // Si está presente, se renderiza en la página de detalle del servicio.
  iconCards?: { icon: string; text: string }[];
  highlight?: boolean;
};

export const services: ServiceGroup[] = [
  {
    slug: "habilitaciones",
    title: "Habilitaciones y obra en CABA",
    short:
      "Habilitaciones comerciales, permisos de obra, excavación y reformas ante el GCBA. Acompañamos cada trámite hasta el certificado.",
    description:
      "Acompañamos cada etapa del trámite ante el Gobierno de la Ciudad: del diagnóstico al certificado final. Trabajamos con comercios, oficinas, locales gastronómicos, viviendas y obras civiles bajo Ley 5.920 (Sistema de Autoprotección) y la normativa de habilitaciones del GCBA.",
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
      "Realizamos las mediciones obligatorias bajo las Resoluciones SRT 84/12 (iluminación), 85/12 (ruido) y la normativa ergonómica vigente. No entregamos solo el protocolo: te explicamos qué dice, qué riesgos detectó y qué hay que corregir.",
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
      "Cubrimos el ciclo completo: del proyecto y la obra al mantenimiento periódico exigido por normativa. Coordinamos con una red de instaladores y matriculados de confianza, y supervisamos la entrega para que pase inspección de Bomberos y AGC sin observaciones.",
    items: [
      "Red de hidrantes (proyecto, obra y mantenimiento)",
      "Sistemas de detección y alarma temprana",
      "Iluminación de emergencia y señalización",
      "Estudio de carga de fuego y memoria técnica",
      "Inspección anual y plan de mantenimiento",
      "Certificaciones para inspección AGC / Bomberos",
    ],
    regulations: [
      "Ley 19.587 — Decreto 351/79 (Cap. 18)",
      "IRAM 3517 / 3546 / 3597",
      "Código de Edificación CABA",
    ],
  },
  {
    slug: "matafuegos",
    title: "Matafuegos certificados IRAM",
    short:
      "Venta, mantenimiento y recarga de matafuegos certificados con sello IRAM, en taller propio. Para consorcios, comercios e industrias en CABA y PBA.",
    description:
      "Comercializamos, instalamos y mantenemos extintores certificados que cumplen las normas y ordenanzas vigentes. Trabajamos en taller propio bajo licencia IRAM (Norma 3517-2) y contamos con el Registro de Recargadores y Mantenedores del GCBA. Equipamos desde grandes empresas y consorcios hasta pequeños negocios.",
    items: [
      "Matafuegos ABC, CO₂, agua y espuma — todas las capacidades",
      "Plan de mantenimiento anual para consorcios y empresas",
      "Tarjeta de control y oblea reglamentaria",
      "Atención de urgencias las 24 hs",
    ],
    regulations: [
      "IRAM 3517-2 (mantenimiento y recarga)",
      "Ordenanza GCBA 40473/85",
      "Registro de Recargadores GCBA Nº 0083/DAP95",
    ],
    iconCards: [
      {
        icon: "ph:fire-extinguisher-bold",
        text: "Provisión de extintores manuales y rodantes de todo tipo y capacidad.",
      },
      {
        icon: "ph:calendar-check-bold",
        text: "Controles periódicos de mantenimiento y recarga.",
      },
      {
        icon: "ph:truck-bold",
        text: "Traslado e instalación de extintores.",
      },
      {
        icon: "ph:clipboard-text-bold",
        text: "Relevamiento y presentación de informes <strong>sin cargo</strong>.",
      },
      {
        icon: "ph:identification-card-bold",
        text: "Registro de Recargadores y Mantenedores de extintores en G.C.B.A. Nº 0083/DAP95 (ordenanza 40473/85.3).",
      },
      {
        icon: "ph:shield-check-bold",
        text: "Licencia <strong>IRAM</strong> para servicio de control, mantenimiento y recarga de extintores (Norma 3517-2), en taller propio.",
      },
    ],
  },
];

// Logos descargados de las webs oficiales en /public/clients/.
// `aspect: "square"` marca logos cuadrados o casi cuadrados (ratio < 1.5) para que
// el grid les dé más altura y queden visualmente equilibrados con los wordmarks.
export const clients: { name: string; logo?: string; aspect?: "wide" | "square" }[] = [
  { name: "Bajda SRL", logo: "/clients/bajda.jpg" },
  { name: "Revestimientos Cerámicos", logo: "/clients/revestimientos-ceramicos.png" },
  { name: "Ranko SRL", logo: "/clients/ranko.png" },
  { name: "Truffa's café gourmet", logo: "/clients/truffa.png" },
  { name: "Cabarco", logo: "/clients/cabarco.png" },
  { name: "Vicente Parrilla Restaurante", logo: "/clients/vicente-parrilla.jpg" },
];

// "Cómo trabajamos" — proceso en 4 pasos. Diferenciador clave: ningún competidor en CABA
// lo tiene bien hecho (HISE es el único que se acerca, con 4 pasos genéricos).
export const howIWork: { icon: string; title: string; text: string }[] = [
  {
    icon: "ph:magnifying-glass-bold",
    title: "Diagnóstico",
    text: "Hablamos por WhatsApp o coordinamos una videollamada. Entendemos el caso, revisamos lo que ya tenés y te decimos qué hace falta — sin compromiso.",
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
  { href: "/nosotros", label: "NOSOTROS" },
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
