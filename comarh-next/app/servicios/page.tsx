import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimatedText from "@/components/ui/AnimatedText";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Counter from "@/components/ui/Counter";
import CtaFullbleed from "@/components/sections/CtaFullbleed";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Diseño, desarrollo de proyectos, asistencia técnica y consultoría ambiental y de recursos hídricos.",
};

const services = [
  {
    n: "01",
    title: "Diseño",
    text: "Estudios de base, relevamientos y diseño de soluciones técnicas ajustadas a cada sitio, cada normativa y cada objetivo del cliente.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=70",
  },
  {
    n: "02",
    title: "Desarrollo de Proyectos",
    text: "Formulación integral de proyectos ambientales y de recursos hídricos, desde la ingeniería conceptual hasta el proyecto ejecutivo.",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=900&q=70",
  },
  {
    n: "03",
    title: "Asistencia Técnica",
    text: "Acompañamiento en obra y en gestión, monitoreo, control de cumplimiento normativo y respuesta a requerimientos de la autoridad.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=70",
  },
  {
    n: "04",
    title: "Consultoría",
    text: "Asesoramiento estratégico en materia ambiental e hídrica para empresas, municipios y organizaciones que necesitan decisiones informadas.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=70",
  },
];

const stats = [
  { value: 120, prefix: "+", label: "Proyectos ejecutados" },
  { value: 15, prefix: "+", label: "Años de experiencia" },
  { value: 80, prefix: "+", label: "Clientes acompañados" },
  { value: 5000, prefix: "+", label: "Hectáreas relevadas" },
];

export default function ServiciosPage() {
  return (
    <>
      <section className="px-[clamp(1.25rem,5vw,5rem)] pb-16 pt-40">
        <div className="mx-auto w-full max-w-[1440px]">
          <Link
            href="/"
            data-cursor="hover"
            className="mb-6 inline-flex items-center gap-2 text-sm text-navy/60 transition-colors hover:text-navy"
          >
            ← Volver al inicio
          </Link>
          <RevealOnScroll>
            <p className="eyebrow">Servicios</p>
          </RevealOnScroll>
          <AnimatedText as="h1" className="display mt-4 max-w-[18ch]">
            Cuatro formas de resolver un desafío ambiental.
          </AnimatedText>
        </div>
      </section>

      <section className="px-[clamp(1.25rem,5vw,5rem)]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-[clamp(3rem,8vw,7rem)] py-8">
          {services.map((s, i) => (
            <div
              key={s.n}
              className={`grid items-center gap-[clamp(2rem,5vw,5rem)] md:grid-cols-2 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <RevealOnScroll>
                <div className="relative aspect-[4/3] overflow-hidden rounded">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </RevealOnScroll>
              <div>
                <span className="text-[0.8rem] font-semibold tracking-[0.1em] text-green-dark">
                  {s.n}
                </span>
                <AnimatedText as="h2" className="mt-3 text-[clamp(1.6rem,3vw,2.4rem)]">
                  {s.title}
                </AnimatedText>
                <RevealOnScroll delay={0.1}>
                  <p className="mt-4 max-w-[46ch] text-[clamp(1.05rem,1.5vw,1.3rem)] text-navy/70">
                    {s.text}
                  </p>
                </RevealOnScroll>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-[clamp(1.25rem,5vw,5rem)] py-[clamp(4rem,8vw,7rem)]">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-2 gap-8 border-t border-line pt-12 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <Counter
                value={s.value}
                prefix={s.prefix}
                className="block text-[clamp(2.4rem,5vw,4rem)] font-semibold text-navy"
              />
              <p className="mt-2 text-sm text-navy/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaFullbleed title="Contanos tu proyecto y armamos la propuesta técnica." />
    </>
  );
}
