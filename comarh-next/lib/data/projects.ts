export type ProjectCategory =
  | "civil-hidraulica"
  | "ambiental-hidrogeologia"
  | "gasoductos"
  | "obras-especiales";

export interface Project {
  slug: string;
  title: string;
  description: string;
  location?: string;
  category: ProjectCategory;
  categoryLabel: string;
  cover: string; // imagen de portada, ruta en /public
  gallery: string[]; // imágenes/planos adicionales, ruta en /public
  galleryCaptions?: Record<string, string>; // texto asociado a una imagen puntual de gallery (se muestra en hover/tap)
  client?: string;
  comitente?: string;
  year: string;
}

const categoryLabels: Record<ProjectCategory, string> = {
  "civil-hidraulica": "Recursos Hídricos / Ing. Civil",
  "ambiental-hidrogeologia": "Recursos Hídricos / Ing. Ambiental",
  gasoductos: "Gasoductos y Redes",
  "obras-especiales": "Obras y Provisiones Especiales",
};

// Contenido extraído del relevamiento de proyectos por rubro (PDF cargado por el cliente).
export const projects: Project[] = [
  {
    slug: "acueducto-desvio-arijon",
    title: "Acueducto Desvío Arijón — Ampliación Etapa 1, Ramal B° Jorge Newbery",
    description:
      "Proyecto ejecutivo civil e hidráulico del ramal de derivación del acueducto Desvío Arijón, sobre la progresiva +12.350. Tramo de 2.360 m de cañería PEAD Dn 160 con tres cruces especiales (AP01, RN 11 y FFCC Belgrano). Descarga en una cisterna de hormigón armado de 1.000 m³, desde la cual se eleva agua a un tanque existente de 150 m³ mediante bombas centrífugas de 68 l/s a 32 m.c.a. Incluye el dimensionamiento de las cámaras de regulación de caudal y presión.",
    location: "Sauce Viejo, Santa Fe",
    category: "civil-hidraulica",
    categoryLabel: categoryLabels["civil-hidraulica"],
    cover: "/img/proyectos/acueducto-desvio-arijon/cover.png",
    gallery: [
      "/img/proyectos/acueducto-desvio-arijon/g1.png",
      "/img/proyectos/acueducto-desvio-arijon/g2.png",
    ],
    galleryCaptions: {
      "/img/proyectos/acueducto-desvio-arijon/g1.png": "Planialtimetría del acueducto de derivación",
    },
    client: "Winkelmann SRL",
    comitente: "Secretaría de Agua y Saneamiento, MOP Santa Fe",
    year: "2021",
  },
  {
    slug: "saneamiento-los-alamos-aeroclub-cloacal",
    title: "Saneamiento Rafaela — Desagües Cloacales Villa Los Álamos y Villa Aeroclub",
    description:
      "Verificaciones hidráulicas de la impulsión y selección de equipos de bombeo, junto con la memoria de cálculo de piezas especiales.",
    location: "Rafaela, Santa Fe",
    category: "civil-hidraulica",
    categoryLabel: categoryLabels["civil-hidraulica"],
    cover: "/img/proyectos/saneamiento-los-alamos-aeroclub-cloacal/cover.png",
    gallery: ["/img/proyectos/saneamiento-los-alamos-aeroclub-cloacal/g1.png"],
    client: "Montaño Construcciones",
    comitente: "Aguas Santafesinas S.A.",
    year: "2021",
  },
  {
    slug: "red-agua-potable-loyola-la-ranita",
    title: "Red de Agua Potable Barrios Loyola Norte y La Ranita — Acueducto Santa Marta, Etapa II",
    description:
      "Dimensionamiento de la red de distribución de agua de los barrios Loyola Norte y La Ranita, junto con el diseño y las verificaciones hidráulicas del Acueducto Santa Marta.",
    location: "Santa Fe",
    category: "civil-hidraulica",
    categoryLabel: categoryLabels["civil-hidraulica"],
    cover: "/img/proyectos/red-agua-potable-loyola-la-ranita/cover.png",
    gallery: [
      "/img/proyectos/red-agua-potable-loyola-la-ranita/g1.png",
      "/img/proyectos/red-agua-potable-loyola-la-ranita/g2.png",
      "/img/proyectos/red-agua-potable-loyola-la-ranita/g3.png",
    ],
    galleryCaptions: {
      "/img/proyectos/red-agua-potable-loyola-la-ranita/g1.png": "Diseño de bloques de anclaje del acueducto",
      "/img/proyectos/red-agua-potable-loyola-la-ranita/g2.png": "Diseño de cámaras especiales",
      "/img/proyectos/red-agua-potable-loyola-la-ranita/g3.png": "Modelación mediante elementos finitos — Cámaras especiales",
    },
    client: "Winkelmann SRL",
    comitente: "Municipalidad de Santa Fe",
    year: "2021",
  },
  {
    slug: "saneamiento-transporte-villa-elsa",
    title: "Saneamiento Barrios Transporte y Villa Elsa",
    description:
      "Dimensionamiento de red de distribución de agua, colectoras y colectores cloacales. Dimensionamiento civil e hidráulico de la Estación Elevadora de Líquidos Cloacales, con verificaciones hidráulicas en régimen permanente e impermanente de la impulsión, y diseño y verificación de la cámara disipadora de energía.",
    location: "Santa Fe",
    category: "civil-hidraulica",
    categoryLabel: categoryLabels["civil-hidraulica"],
    cover: "/img/proyectos/saneamiento-transporte-villa-elsa/cover.png",
    gallery: [
      "/img/proyectos/saneamiento-transporte-villa-elsa/g1.png",
      "/img/proyectos/saneamiento-transporte-villa-elsa/g2.png",
      "/img/proyectos/saneamiento-transporte-villa-elsa/g3.png",
    ],
    galleryCaptions: {
      "/img/proyectos/saneamiento-transporte-villa-elsa/g1.png": "Planos de arquitectura — obras generales del predio",
      "/img/proyectos/saneamiento-transporte-villa-elsa/g2.png": "Modelación mediante elementos finitos — Cámara disipadora de energía",
      "/img/proyectos/saneamiento-transporte-villa-elsa/g3.png": "Verificación del transitorio hidráulico",
    },
    client: "Winkelmann - Montaño Construcciones (UTE)",
    comitente: "Municipalidad de Santa Fe",
    year: "2022",
  },
  {
    slug: "refuncionalizacion-ee19-saint-germain",
    title: "Refuncionalización Estación Elevadora de Líquidos Cloacales N°19 — Saint Germain",
    description:
      "Verificación de equipos de bombeo, determinación de la curva del sistema y verificación en régimen impermanente.",
    location: "Saint Germain, Santiago del Estero",
    category: "civil-hidraulica",
    categoryLabel: categoryLabels["civil-hidraulica"],
    cover: "/img/proyectos/refuncionalizacion-ee19-saint-germain/cover.png",
    gallery: [
      "/img/proyectos/refuncionalizacion-ee19-saint-germain/g1.png",
      "/img/proyectos/refuncionalizacion-ee19-saint-germain/g2.png",
    ],
    galleryCaptions: {
      "/img/proyectos/refuncionalizacion-ee19-saint-germain/g1.png": "Distribución de presiones",
      "/img/proyectos/refuncionalizacion-ee19-saint-germain/g2.png": "Distribución de presiones",
    },
    comitente: "Ministerio de Agua y Medioambiente",
    year: "2022",
  },
  {
    slug: "verificaciones-hidraulicas-perales-aguiar",
    title: "Verificaciones Hidráulicas de Acueducto — El Colorado / Los Juries",
    description:
      "Anteproyecto y proyecto ejecutivo con verificaciones hidráulicas del acueducto del sistema de provisión de agua potable para las localidades de El Colorado y Los Juries, con planos de detalles electromecánicos.",
    category: "civil-hidraulica",
    categoryLabel: categoryLabels["civil-hidraulica"],
    cover: "/img/proyectos/verificaciones-hidraulicas-perales-aguiar/cover.png",
    gallery: [],
    client: "Constructora Perales Aguiar S.A.",
    year: "2022",
  },
  {
    slug: "alteo-proteccion-planta-urbana-saguier",
    title: "Alteo y Protección de la Planta Urbana y Canalización de Bajos Naturales — Saguier",
    description:
      "Diseño del alteo de la defensa de la planta urbana de Saguier y de la canalización del bajo natural al sur de la localidad. El alteo se planificó en los caminos perimetrales Norte y Oeste, con una longitud aproximada de 1.300 y 1.000 metros respectivamente, incluyendo el aseguramiento de las cunetas para garantizar el correcto escurrimiento del agua.",
    location: "Saguier, Santa Fe",
    category: "civil-hidraulica",
    categoryLabel: categoryLabels["civil-hidraulica"],
    cover: "/img/proyectos/alteo-proteccion-planta-urbana-saguier/cover.png",
    gallery: [
      "/img/proyectos/alteo-proteccion-planta-urbana-saguier/g1.png",
      "/img/proyectos/alteo-proteccion-planta-urbana-saguier/g2.png",
      "/img/proyectos/alteo-proteccion-planta-urbana-saguier/g3.png",
    ],
    galleryCaptions: {
      "/img/proyectos/alteo-proteccion-planta-urbana-saguier/g1.png": "Sección transversal Prog. +2700 — Traza Norte",
      "/img/proyectos/alteo-proteccion-planta-urbana-saguier/g2.png": "Mancha de inundación y alcance proyectado",
      "/img/proyectos/alteo-proteccion-planta-urbana-saguier/g3.png": "Perfil longitudinal — Traza Norte",
    },
    comitente: "Comité de Cuenca Canal Principal Saguier",
    year: "2024",
  },
  {
    slug: "renovacion-colectores-cloacales-rafaela",
    title: "Renovación de Colectores Cloacales — Ciudad de Rafaela",
    description:
      "Pliego de especificaciones técnicas, cómputo y presupuesto de obra para el proceso licitatorio. Anteproyecto ejecutivo de renovación de colectores en Av. Fader (DN 500), R. Escalada (DN 500) y F. Beltramino (DN 600), con mejoras en el ingreso a la Planta Depuradora de Líquidos Cloacales.",
    location: "Rafaela, Santa Fe",
    category: "civil-hidraulica",
    categoryLabel: categoryLabels["civil-hidraulica"],
    cover: "/img/proyectos/renovacion-colectores-cloacales-rafaela/cover.png",
    gallery: [
      "/img/proyectos/renovacion-colectores-cloacales-rafaela/g1.png",
      "/img/proyectos/renovacion-colectores-cloacales-rafaela/g2.png",
    ],
    galleryCaptions: {
      "/img/proyectos/renovacion-colectores-cloacales-rafaela/g1.png": "Detalle de cruce y salto hidráulico",
      "/img/proyectos/renovacion-colectores-cloacales-rafaela/g2.png": "Detalle de cruce y salto hidráulico",
    },
    client: "Aguas Santafesinas S.A.",
    year: "2025",
  },
  {
    slug: "parque-metropolitano-villa-olimpica-rafaela",
    title: "Intervención en el Parque Metropolitano Regional — Villa Olímpica, Microestadio y Velódromo",
    description:
      "Proyecto ejecutivo de obras de infraestructura con dimensionamiento del reservorio bajo Amancay (concesiones 340-341) y protección de la defensa urbana. Verificación y dimensionamiento de paquetes estructurales y pavimento rígido (25.000 m²), cámaras de enlace y descarga pluvial, y bocas de registro cloacales. Verificación del comportamiento hidrológico e hidráulico del sistema de reservorios de la zona sur de Rafaela, determinando los volúmenes de almacenamiento requeridos para evitar el sobrepaso de los terraplenes frente a las crecidas de diseño.",
    location: "Departamento Castellanos, Rafaela",
    category: "civil-hidraulica",
    categoryLabel: categoryLabels["civil-hidraulica"],
    cover: "/img/proyectos/parque-metropolitano-villa-olimpica-rafaela/cover.jpeg",
    gallery: [
      "/img/proyectos/parque-metropolitano-villa-olimpica-rafaela/g1.png",
      "/img/proyectos/parque-metropolitano-villa-olimpica-rafaela/g2.png",
      "/img/proyectos/parque-metropolitano-villa-olimpica-rafaela/g3.png",
    ],
    galleryCaptions: {
      "/img/proyectos/parque-metropolitano-villa-olimpica-rafaela/g1.png": "Alcantarilla proyectada en salida de reservorios",
      "/img/proyectos/parque-metropolitano-villa-olimpica-rafaela/g2.png": "Reservorio proyectado — sector Microestadio",
      "/img/proyectos/parque-metropolitano-villa-olimpica-rafaela/g3.png": "Proyecto vial y pluvial — sector Velódromo",
    },
    client: "Bauzá Ingeniería - EPC. Odesur Rafaela (UTE)",
    year: "2026",
  },
  {
    slug: "red-agua-potable-los-alamos-aeroclub",
    title: "Red de Agua Potable — Barrios Los Álamos y Aeroclub",
    description:
      "Proyecto ejecutivo de la red de distribución de agua potable, con cómputo de materiales y detalle de nudos.",
    location: "Rafaela, Santa Fe",
    category: "civil-hidraulica",
    categoryLabel: categoryLabels["civil-hidraulica"],
    cover: "/img/proyectos/red-agua-potable-los-alamos-aeroclub/cover.png",
    gallery: [
      "/img/proyectos/red-agua-potable-los-alamos-aeroclub/g1.png",
      "/img/proyectos/red-agua-potable-los-alamos-aeroclub/g2.png",
    ],
    galleryCaptions: {
      "/img/proyectos/red-agua-potable-los-alamos-aeroclub/g1.png": "Red de distribución proyectada",
      "/img/proyectos/red-agua-potable-los-alamos-aeroclub/g2.png": "Cómputo de materiales y detalle de nudos y bloques de anclaje",
    },
    client: "Winkelmann SRL",
    year: "2022",
  },
  {
    slug: "red-cloacal-antartida-brigadier-lopez-pioneros",
    title: "Red de Desagües Cloacales — Barrios Antártida Argentina, Brigadier López y Tierra de Pioneros",
    description:
      "B° Antártida Argentina: red de cañerías de PVC cloacal de 0,160 m con 5.345 m de longitud, funcionamiento por gravedad, 60 bocas de registro de hormigón H21 y 341 conexiones domiciliarias. B° Brigadier López: cañerías de PVC cloacal junta deslizante de 0,160 m (7.202 m) y de 0,200 m (829 m). B° Tierra de Pioneros: cañerías de 0,160 m (7.408 m), 0,200 m (687 m) y 0,400 m (1.084 m) para la conexión al colector sur.",
    location: "Rafaela, Santa Fe",
    category: "civil-hidraulica",
    categoryLabel: categoryLabels["civil-hidraulica"],
    cover: "/img/proyectos/red-cloacal-antartida-brigadier-lopez-pioneros/cover.png",
    gallery: [
      "/img/proyectos/red-cloacal-antartida-brigadier-lopez-pioneros/g1.png",
      "/img/proyectos/red-cloacal-antartida-brigadier-lopez-pioneros/g2.png",
    ],
    galleryCaptions: {
      "/img/proyectos/red-cloacal-antartida-brigadier-lopez-pioneros/g1.png": "Perfil longitudinal — colector cloacal",
      "/img/proyectos/red-cloacal-antartida-brigadier-lopez-pioneros/g2.png": "Perfil longitudinal — colector cloacal",
    },
    client: "Constructora Pilatti",
    year: "2020",
  },
  {
    slug: "factibilidad-hidrica-psfv-arrufo-san-guillermo",
    title: "Estudio de Factibilidad Hídrica — Parque Solar Fotovoltaico Arrufo y San Guillermo",
    description:
      "Proyecto ejecutivo de drenaje interno de los predios para la obtención del certificado de habilitación de drenaje urbano ante la Secretaría de Recursos Hídricos. Incluye planos de detalle de cunetas y caminos internos, verificaciones hidráulicas en descarga para lograr la condición de impacto hídrico cero, y el informe de obras ejecutadas para la tramitación del certificado final de obra hídrica.",
    category: "civil-hidraulica",
    categoryLabel: categoryLabels["civil-hidraulica"],
    cover: "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/cover.png",
    gallery: [
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g1.png",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g2.png",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g3.png",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g6.png",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g7.png",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g8.png",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g9.png",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g10.png",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g11.png",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g12.png",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g4.png",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g5.png",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g14.png",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g15.png",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g16.png",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g17.png",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g18.png",
    ],
    galleryCaptions: {
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g1.png": "Planimetría general — PSFV Arrufo",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g2.png": "Diseño de caminos internos y verificación de cunetas — Arrufo",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g3.png": "Detalle de cunetas — Ingreso al predio, Camino Principal (Arrufo)",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g6.png": "Ingreso al predio — Camino Principal (Arrufo)",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g7.png": "Ingreso al predio, sector Este — Camino Principal (Arrufo)",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g8.png": "Camino Principal, sector Este (Arrufo)",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g9.png": "Camino Principal, sector Central (Arrufo)",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g10.png": "Camino Secundario, sector Este (Arrufo)",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g11.png": "Camino Secundario, sector Oeste (Arrufo)",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g12.png": "Obra de descarga, sector Acceso (Arrufo)",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g4.png": "Planimetría de caminos internos — Parque Solar San Guillermo",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g5.png": "Ingreso por Ruta Provincial N°23 (San Guillermo)",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g14.png": "Camino Secundario, sector Norte (San Guillermo)",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g15.png": "Camino Secundario, Badén N°1 (San Guillermo)",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g16.png": "Camino Secundario, sector Centro (San Guillermo)",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g17.png": "Camino Secundario, Badén N°4, sector Sur (San Guillermo)",
      "/img/proyectos/factibilidad-hidrica-psfv-arrufo-san-guillermo/g18.png": "Camino Principal, sector Oeste (San Guillermo)",
    },
    client: "Coral Energía",
    year: "2025/2026",
  },
  {
    slug: "factibilidad-industria-parque-industrial-sunchales",
    title: "Estudio de Factibilidad para Industria — Parque Industrial Sunchales",
    description:
      "Análisis de inundabilidad del predio donde se desarrollará el proyecto, de acuerdo con la reglamentación de la Ley Provincial N° 11.730.",
    location: "Sunchales, Santa Fe",
    category: "civil-hidraulica",
    categoryLabel: categoryLabels["civil-hidraulica"],
    cover: "/img/proyectos/factibilidad-industria-parque-industrial-sunchales/cover.png",
    gallery: [
      "/img/proyectos/factibilidad-industria-parque-industrial-sunchales/g1.png",
      "/img/proyectos/factibilidad-industria-parque-industrial-sunchales/g2.jpeg",
      "/img/proyectos/factibilidad-industria-parque-industrial-sunchales/g3.jpeg",
    ],
    galleryCaptions: {
      "/img/proyectos/factibilidad-industria-parque-industrial-sunchales/g1.png": "Implantación del sector en estudio",
      "/img/proyectos/factibilidad-industria-parque-industrial-sunchales/g2.jpeg": "Mancha de inundación y tirantes para recurrencia T=100 años",
      "/img/proyectos/factibilidad-industria-parque-industrial-sunchales/g3.jpeg": "Mancha de inundación y tirantes para recurrencia T=100 años",
    },
    client: "Bensal Química",
    year: "2026",
  },
  {
    slug: "sistema-desagues-cloacales-apostoles",
    title: "Sistema de Desagües Cloacales de Apóstoles — 1ra Etapa",
    description:
      "Verificación y diseño de lagunas de tratamiento de líquidos cloacales, y diseño de las estaciones elevadoras de líquidos cloacales.",
    location: "Apóstoles, Misiones",
    category: "ambiental-hidrogeologia",
    categoryLabel: categoryLabels["ambiental-hidrogeologia"],
    cover: "/img/proyectos/sistema-desagues-cloacales-apostoles/cover.png",
    gallery: ["/img/proyectos/sistema-desagues-cloacales-apostoles/g1.png"],
    galleryCaptions: {
      "/img/proyectos/sistema-desagues-cloacales-apostoles/g1.png": "Planos electromecánicos — Estación de bombeo cloacal",
    },
    comitente: "Ministerio de Hacienda y Obras Públicas / Municipio de Apóstoles",
    year: "2022",
  },
  {
    slug: "factibilidad-hidrogeologico-sunchales-ypf",
    title: "Estudio de Factibilidad Hídrica y Análisis Hidrogeológico — Ciudad de Sunchales",
    description:
      "Estudio de impacto hídrico para evaluar la viabilidad del proyecto y asegurar que no se generen impactos negativos sobre el entorno, obteniendo el certificado de factibilidad hídrica. Estudio hidrogeológico complementario para determinar la profundidad, comportamiento y dirección del nivel freático, como aporte al Estudio de Impacto Ambiental y al diseño de la futura red de monitoreo.",
    location: "Sunchales, Santa Fe",
    category: "ambiental-hidrogeologia",
    categoryLabel: categoryLabels["ambiental-hidrogeologia"],
    cover: "/img/proyectos/factibilidad-hidrogeologico-sunchales-ypf/cover.png",
    gallery: [
      "/img/proyectos/factibilidad-hidrogeologico-sunchales-ypf/g1.png",
      "/img/proyectos/factibilidad-hidrogeologico-sunchales-ypf/g2.png",
    ],
    galleryCaptions: {
      "/img/proyectos/factibilidad-hidrogeologico-sunchales-ypf/g1.png": "Ejecución de pozos de sondeo",
      "/img/proyectos/factibilidad-hidrogeologico-sunchales-ypf/g2.png": "Plano de dinámica hídrica",
    },
    client: "YPF Sunchales",
    year: "2025/2026",
  },
  {
    slug: "analisis-hidrogeologico-pozos-monitoreo-airsa",
    title: "Análisis Hidrogeológico para Ubicación de Pozos de Monitoreo",
    description:
      "Análisis cualitativo de la zona donde están ubicadas las lagunas de tratamiento de efluentes industriales, para determinar el sentido de escurrimiento subterráneo y definir la ubicación de los futuros pozos de monitoreo.",
    category: "ambiental-hidrogeologia",
    categoryLabel: categoryLabels["ambiental-hidrogeologia"],
    cover: "/img/proyectos/analisis-hidrogeologico-pozos-monitoreo-airsa/cover.png",
    gallery: [
      "/img/proyectos/analisis-hidrogeologico-pozos-monitoreo-airsa/g1.png",
      "/img/proyectos/analisis-hidrogeologico-pozos-monitoreo-airsa/g2.png",
      "/img/proyectos/analisis-hidrogeologico-pozos-monitoreo-airsa/g3.png",
    ],
    galleryCaptions: {
      "/img/proyectos/analisis-hidrogeologico-pozos-monitoreo-airsa/g1.png": "Medición de niveles freáticos",
      "/img/proyectos/analisis-hidrogeologico-pozos-monitoreo-airsa/g2.png": "Medición de niveles freáticos",
      "/img/proyectos/analisis-hidrogeologico-pozos-monitoreo-airsa/g3.png": "Ubicación y diseño de pozos de monitoreo",
    },
    client: "AIRSA S.A.",
    year: "2026",
  },
  {
    slug: "ampliacion-red-interna-gas-natural-yeruva",
    title: "Ampliación y Readecuación de la Red Interna de Gas Natural",
    description:
      "Proyección para la ampliación y readecuación de la red de distribución interna de gas natural, respetando la Normativa Argentina de Gas, Grupo N° 2 (Instalaciones Internas) y los requisitos de la distribuidora.",
    location: "Capitán Bermúdez, Santa Fe",
    category: "gasoductos",
    categoryLabel: categoryLabels.gasoductos,
    cover: "/img/proyectos/ampliacion-red-interna-gas-natural-yeruva/cover.png",
    gallery: [
      "/img/proyectos/ampliacion-red-interna-gas-natural-yeruva/g1.png",
      "/img/proyectos/ampliacion-red-interna-gas-natural-yeruva/g2.png",
    ],
    galleryCaptions: {
      "/img/proyectos/ampliacion-red-interna-gas-natural-yeruva/g1.png": "Solicitud de factibilidad",
      "/img/proyectos/ampliacion-red-interna-gas-natural-yeruva/g2.png": "Solicitud de factibilidad",
    },
    client: "Yeruvá S.A.",
    year: "2026",
  },
  {
    slug: "galvez-cloacas-finalizacion-obra-civil",
    title: "Gálvez — Cloacas: Finalización de Obra Civil, Instalaciones Complementarias y Sistema de Cloración",
    description:
      "Finalización de la obra civil, instalaciones complementarias y sistema de cloración en la Planta Depuradora de Líquidos Cloacales (PDLC).",
    location: "Gálvez, Santa Fe",
    category: "obras-especiales",
    categoryLabel: categoryLabels["obras-especiales"],
    cover: "/img/proyectos/galvez-cloacas-finalizacion-obra-civil/cover.png",
    gallery: [
      "/img/proyectos/galvez-cloacas-finalizacion-obra-civil/g1.jpeg",
      "/img/proyectos/galvez-cloacas-finalizacion-obra-civil/g2.png",
      "/img/proyectos/galvez-cloacas-finalizacion-obra-civil/g3.jpeg",
      "/img/proyectos/galvez-cloacas-finalizacion-obra-civil/g4.jpeg",
    ],
    galleryCaptions: {
      "/img/proyectos/galvez-cloacas-finalizacion-obra-civil/g1.jpeg": "Estructura civil proyectada — Implementación del modelo",
      "/img/proyectos/galvez-cloacas-finalizacion-obra-civil/g2.png": "Fotos de obra ejecutada",
      "/img/proyectos/galvez-cloacas-finalizacion-obra-civil/g3.jpeg": "Fotos de obra ejecutada",
      "/img/proyectos/galvez-cloacas-finalizacion-obra-civil/g4.jpeg": "Fotos de obra ejecutada",
    },
    comitente: "Aguas Santafesinas S.A.",
    year: "2025",
  },
  {
    slug: "intervencion-bv-tacca-mundo-construcciones",
    title: "Intervención Integral BV Tacca — Acceso y Entorno C.A.R.D.",
    description:
      "Provisión de equipamiento electromecánico y pozo de bombeo prefabricado Grundfos para la intervención integral del acceso y entorno del C.A.R.D.",
    location: "Santa Fe, La Capital",
    category: "obras-especiales",
    categoryLabel: categoryLabels["obras-especiales"],
    cover: "/img/proyectos/intervencion-bv-tacca-mundo-construcciones/cover.png",
    gallery: ["/img/proyectos/intervencion-bv-tacca-mundo-construcciones/g1.png"],
    galleryCaptions: {
      "/img/proyectos/intervencion-bv-tacca-mundo-construcciones/g1.png": "Imágenes del equipo",
    },
    client: "Mundo Construcciones S.A.",
    year: "2026",
  },
  {
    slug: "provision-electromecanica-carlos-casares",
    title: "Provisión de Equipamiento Electromecánico y Pozo de Bombeo Prefabricado Grundfos",
    description:
      "Provisión de equipamiento electromecánico y pozo de bombeo prefabricado Grundfos para el desarrollo del loteo.",
    location: "Carlos Casares",
    category: "obras-especiales",
    categoryLabel: categoryLabels["obras-especiales"],
    cover: "/img/proyectos/provision-electromecanica-carlos-casares/cover.jpeg",
    gallery: [
      "/img/proyectos/provision-electromecanica-carlos-casares/g1.jpeg",
      "/img/proyectos/provision-electromecanica-carlos-casares/g2.png",
      "/img/proyectos/provision-electromecanica-carlos-casares/g3.png",
    ],
    galleryCaptions: {
      "/img/proyectos/provision-electromecanica-carlos-casares/g2.png": "Vistas planos de proyecto ejecutivo",
      "/img/proyectos/provision-electromecanica-carlos-casares/g3.png": "Vistas planos de proyecto ejecutivo",
    },
    client: "Desarrollo Loteos Carlos Casares",
    year: "2026",
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const projectFilters: { key: ProjectCategory | "all"; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "civil-hidraulica", label: categoryLabels["civil-hidraulica"] },
  { key: "ambiental-hidrogeologia", label: categoryLabels["ambiental-hidrogeologia"] },
  { key: "gasoductos", label: categoryLabels.gasoductos },
  { key: "obras-especiales", label: categoryLabels["obras-especiales"] },
];
