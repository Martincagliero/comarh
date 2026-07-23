export type ProjectStatus = "En desarrollo" | "Finalizado";
export type ProjectCategory =
  | "impacto"
  | "hidrico"
  | "asistencia"
  | "efluentes"
  | "monitoreo";

export interface Project {
  slug: string;
  title: string;
  description: string;
  status: ProjectStatus;
  location: string;
  category: ProjectCategory;
  categoryLabel: string;
  image: string; // ruta en /public
  client?: string;
  year?: string;
}

// REEMPLAZAR con los proyectos reales (posts de Instagram).
// Las imágenes son de Unsplash; descargalas a /public/img y actualizá las rutas.
export const projects: Project[] = [
  {
    slug: "estudio-impacto-ambiental",
    title: "Estudio de Impacto Ambiental — Cuenca del Río X",
    description:
      "Evaluación integral de impactos y medidas de mitigación sobre la cuenca.",
    status: "En desarrollo",
    location: "Santa Fe",
    category: "impacto",
    categoryLabel: "Impacto Ambiental",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=70",
    client: "Confidencial",
    year: "2025",
  },
  {
    slug: "gestion-recursos-hidricos",
    title: "Gestión Integral de Recursos Hídricos",
    description: "Planificación y uso sostenible del agua a escala de cuenca.",
    status: "En desarrollo",
    location: "Región Centro",
    category: "hidrico",
    categoryLabel: "Recursos Hídricos",
    image:
      "https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?auto=format&fit=crop&w=900&q=70",
    year: "2025",
  },
  {
    slug: "asistencia-municipios",
    title: "Asistencia Técnica a Municipios",
    description: "Acompañamiento técnico en gestión ambiental municipal.",
    status: "Finalizado",
    location: "Santa Fe",
    category: "asistencia",
    categoryLabel: "Asistencia Técnica",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=70",
    year: "2024",
  },
  {
    slug: "tratamiento-efluentes",
    title: "Diseño de Sistemas de Tratamiento de Efluentes",
    description: "Ingeniería de sistemas de tratamiento adaptados a cada industria.",
    status: "En desarrollo",
    location: "Córdoba",
    category: "efluentes",
    categoryLabel: "Efluentes",
    image:
      "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=900&q=70",
    year: "2025",
  },
  {
    slug: "monitoreo-calidad-agua",
    title: "Monitoreo y Muestreo de Calidad de Agua",
    description: "Programas de monitoreo periódico y análisis de parámetros clave.",
    status: "Finalizado",
    location: "Entre Ríos",
    category: "monitoreo",
    categoryLabel: "Monitoreo",
    image:
      "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&w=900&q=70",
    year: "2024",
  },
  {
    slug: "consultoria-agroindustrial",
    title: "Consultoría Ambiental para Proyectos Agroindustriales",
    description: "Asesoramiento ambiental para el sector agroindustrial.",
    status: "En desarrollo",
    location: "Santa Fe",
    category: "impacto",
    categoryLabel: "Impacto Ambiental",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=70",
    year: "2025",
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const projectFilters: { key: ProjectCategory | "all"; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "impacto", label: "Impacto Ambiental" },
  { key: "hidrico", label: "Recursos Hídricos" },
  { key: "asistencia", label: "Asistencia Técnica" },
  { key: "efluentes", label: "Efluentes" },
  { key: "monitoreo", label: "Monitoreo" },
];
