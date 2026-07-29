import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimatedText from "@/components/ui/AnimatedText";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import CtaFullbleed from "@/components/sections/CtaFullbleed";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "COMARH S.A.S. es una consultora de ingeniería conformada por un equipo interdisciplinario de profesionales de la Ingeniería.",
};

const gallery = [
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=70",
];

const team = [
  { name: "Ing. Fabián Cabeza", role: "Director técnico" },
  { name: "Marisa Pasquero", role: "Responsable administración" },
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
            ¿Quiénes somos?
          </AnimatedText>
          <RevealOnScroll delay={0.1}>
            <div className="mt-8 max-w-[65ch] space-y-5 text-[clamp(1.05rem,1.6vw,1.4rem)] text-navy/70">
              <p>
                COMARH S.A.S. es una consultora de ingeniería conformada por un
                equipo interdisciplinario de profesionales de la Ingeniería.
              </p>
              <p>
                Con origen en la provincia de Santa Fe, brindamos soluciones
                integrales para el diseño, planificación, gestión y ejecución
                de obras, acompañando a organismos públicos, empresas e
                industrias en cada etapa del proceso.
              </p>
              <p>
                Nuestra experiencia nos permite desarrollar proyectos de
                infraestructura, tratamiento de agua y efluentes, estudios de
                factibilidad, redes de agua, cloacas y gas, estaciones de
                bombeo, plantas potabilizadoras y de tratamiento, además de
                proveer equipos especiales y asistencia técnica.
              </p>
              <p>
                Nos distinguimos por combinar conocimiento técnico, innovación
                y compromiso, ofreciendo soluciones eficientes, sostenibles y
                adaptadas a las necesidades de cada cliente, con el objetivo
                de generar un impacto positivo en las comunidades y el
                ambiente.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="px-[clamp(1.25rem,5vw,5rem)] py-8">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-3 gap-2 sm:gap-4">
          {gallery.map((src, i) => (
            <RevealOnScroll key={src} delay={i * 0.08}>
              <div className="relative aspect-[4/5] overflow-hidden rounded">
                <Image src={src} alt="" fill sizes="(max-width: 640px) 33vw, 33vw" className="object-cover" />
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
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-3">
            {team.map((m, i) => (
              <RevealOnScroll key={i} delay={(i % 3) * 0.08}>
                <div className="border-t border-line pt-4">
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
