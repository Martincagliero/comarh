export interface GrundfosProduct {
  slug: string;
  name: string;
  category: string;
  image: string;
}

// Número de contacto para consultas puntuales por WhatsApp.
export const GRUNDFOS_WHATSAPP = "5493493417640";

export function whatsappLink(productName: string) {
  const text = `Hola, quiero consultar por: ${productName} (Grundfos)`;
  return `https://wa.me/${GRUNDFOS_WHATSAPP}?text=${encodeURIComponent(text)}`;
}

// Nombres y fotos extraídos del catálogo en PDF provisto por el cliente (grundfos/_EQUIPOS GRUNDFOS.pdf).
// El PDF agrupa las fotos por categoría sin nombre individual por equipo; cada foto se lista bajo el
// nombre de su categoría.
const categories: { slug: string; name: string; images: string[] }[] = [
  {
    slug: "tableros-electricos",
    name: "Tableros Eléctricos",
    images: ["1.png", "2.png", "3.png", "4.png"],
  },
  {
    slug: "sumergibles",
    name: "Bombas Sumergibles de Pozo Profundo",
    images: ["1.png"],
  },
  {
    slug: "centrifugas",
    name: "Bombas Centrífugas",
    images: ["1.png", "2.png", "3.png", "4.png"],
  },
  {
    slug: "achique",
    name: "Bombas de Achique y Efluentes",
    images: ["1.png", "2.png", "3.png", "4.png", "5.png"],
  },
  {
    slug: "dosificacion",
    name: "Sistemas de Dosificación",
    images: ["1.png", "2.png", "3.png"],
  },
  {
    slug: "presurizacion",
    name: "Sistemas de Presurización",
    images: ["1.png", "2.png"],
  },
  {
    slug: "pozos-bombeo",
    name: "Pozos de Bombeo Prefabricados en PRFV",
    images: ["1.png", "2.png"],
  },
  {
    slug: "repuestos-accesorios",
    name: "Repuestos y Accesorios de Montaje",
    images: ["1.png", "2.png", "3.png", "4.png", "5.png"],
  },
];

export const grundfosProducts: GrundfosProduct[] = categories.flatMap((cat) =>
  cat.images.map((img, i) => ({
    slug: `${cat.slug}-${i + 1}`,
    name: cat.images.length > 1 ? `${cat.name} — Modelo ${i + 1}` : cat.name,
    category: cat.name,
    image: `/img/grundfos/${cat.slug}/${img}`,
  }))
);
