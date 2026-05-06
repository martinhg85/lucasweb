// Configuración central del sitio. Todo lo editable arranca acá.

export const site = {
  name: "Lucas Contreras",
  // Tagline corto bajo el logo (estilo "ESPECIALISTAS EN HIGIENE OCUPACIONAL" de Flowork)
  brandTagline: "Asesor en Seguridad e Higiene",
  tagline: "Asesoramiento integral en Seguridad e Higiene",
  url: "https://lucascontreras.com.ar",
  locale: "es-AR",

  professional: {
    fullName: "Lic. Lucas Contreras",
    title: "Licenciado en Seguridad e Higiene",
    // TODO: completar con el posgrado real
    postgrado: "Posgrado en [completar]",
    // TODO: completar matrícula profesional
    matricula: "Mat. [completar]",
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
    extended: "CABA y Gran Buenos Aires",
    // TODO: confirmar zona real de cobertura
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
} as const;

export type ServiceGroup = {
  slug: string;
  title: string;
  short: string;
  description: string;
  items: string[];
  highlight?: boolean;
};

export const services: ServiceGroup[] = [
  {
    slug: "habilitaciones",
    title: "Habilitaciones y obra en CABA",
    short:
      "Gestión integral de habilitaciones, permisos de obra, excavación y reformas.",
    description:
      "Acompañamos cada etapa del proceso ante el Gobierno de la Ciudad: desde el diagnóstico inicial hasta la obtención del certificado final. Trabajamos con comercios, oficinas, viviendas y obras civiles.",
    items: [
      "Habilitaciones comerciales",
      "Permisos de obra y ejecución",
      "Permisos de excavación",
      "Reformas de viviendas y permisos de construcción",
    ],
  },
  {
    slug: "mediciones",
    title: "Mediciones ambientales",
    short:
      "Nuestro diferencial: mediciones técnicas con instrumental calibrado.",
    description:
      "Realizamos las mediciones obligatorias por la Resolución SRT 84/12, 85/12 y normativa vigente. Entregamos protocolos firmados y plan de mejoras.",
    items: [
      "Iluminación en ambientes laborales",
      "Ruido (dosimetrías y nivel sonoro)",
      // TODO: confirmar con Lucas si también ofrece estos:
      // "Puesta a tierra y continuidad eléctrica",
      // "Carga de fuego",
      // "Estudio ergonómico",
    ],
    highlight: true,
  },
  {
    slug: "incendios",
    title: "Sistemas contra incendio",
    short:
      "Instalación, mantenimiento y certificación de sistemas de protección.",
    description:
      "Cubrimos el ciclo completo: desde el proyecto y la obra hasta el mantenimiento periódico exigido por normativa.",
    items: [
      "Carga de extintores",
      "Instalación de red de incendio",
      "Mantenimiento de red de incendio",
      "Obras e instalaciones contra incendio",
    ],
  },
];

// TODO: completar con clientes reales — los logos/nombres son lo que más convierte
export const clients: { name: string; logo?: string }[] = [
  // { name: "Cliente 1", logo: "/clients/cliente1.svg" },
  // { name: "Cliente 2", logo: "/clients/cliente2.svg" },
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
