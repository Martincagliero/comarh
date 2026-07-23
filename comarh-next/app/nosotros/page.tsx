import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimatedText from "@/components/ui/AnimatedText";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import CtaFullbleed from "@/components/sections/CtaFullbleed";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Detrás de cada informe técnico hay un equipo comprometido con el ambiente y los recursos hídricos.",
};

const gallery = [
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=70",
];

const team = [
  { name: "Nombre Apellido", role: "Dirección técnica" },
  { name: "Nombre Apellido", role: "Ingeniería ambiental" },
  { name: "Nombre Apellido", role: "Recursos hídricos" },
  { name: "Nombre Apellido", role: "Gestión de proyectos" },
  { name: "Nombre Apellido", role: "Trabajo de campo" },
  { name: "Nombre Apellido", role: "Asuntos normativos" },
];

export default function NosotrosPage() {
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
            <p className="eyebrow">Nosotros</p>
          </RevealOnScroll>
          <AnimatedText as="h1" className="display mt-4 max-w-[20ch]">
            Porque el ambiente que cuidamos hoy es el que vamos a habitar mañana.
          </AnimatedText>
          <RevealOnScroll delay={0.1}>
            <p className="mt-8 max-w-[60ch] text-[clamp(1.05rem,1.6vw,1.4rem)] text-navy/70">
              Detrás de cada informe técnico y cada proyecto hay un equipo
              comprometido con el ambiente, el uso responsable del agua y la
              excelencia técnica. Trabajamos junto a empresas, municipios, ONGs y
              particulares, aportando rigor, cercanía y soluciones a medida.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="px-[clamp(1.25rem,5vw,5rem)] py-8">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-2 gap-4 md:grid-cols-3">
          {gallery.map((src, i) => (
            <RevealOnScroll key={src} delay={i * 0.08}>
              <div className="relative aspect-[4/5] overflow-hidden rounded">
                <Image src={src} alt="" fill sizes="33vw" className="object-cover" />
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="px-[clamp(1.25rem,5vw,5rem)] py-[clamp(4rem,8vw,7rem)]">
        <div className="mx-auto w-full max-w-[1440px]">
          <RevealOnScroll>
            <h2 className="h2-fluid mb-12">Nuestro equipo</h2>
          </RevealOnScroll>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3">
            {team.map((m, i) => (
              <RevealOnScroll key={i} delay={(i % 3) * 0.08}>
                <div>
                  <div className="mb-4 aspect-square overflow-hidden rounded-full bg-bg-alt" />
                  <h3 className="text-lg">{m.name}</h3>
                  <p className="text-sm text-navy/60">{m.role}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <CtaFullbleed title="¿Querés sumar a tu proyecto un equipo con rigor técnico?" />
    </>
  );
}
