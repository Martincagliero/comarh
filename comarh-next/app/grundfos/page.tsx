import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimatedText from "@/components/ui/AnimatedText";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import CtaFullbleed from "@/components/sections/CtaFullbleed";
import GrundfosCatalog from "@/components/sections/GrundfosCatalog";
import { grundfosProducts } from "@/lib/data/grundfos";

export const metadata: Metadata = {
  title: "Equipos Grundfos",
  description:
    "Representación de equipos Grundfos: bombas sumergibles, centrífugas, de achique, sistemas de dosificación, presurización y más.",
};

export default function GrundfosPage() {
  return (
    <>
      <section className="px-[clamp(1.25rem,5vw,5rem)] pb-12 pt-28 sm:pt-40">
        <div className="mx-auto w-full max-w-[1440px]">
          <Link
            href="/"
            data-cursor="hover"
            className="mb-6 inline-flex items-center gap-2 text-sm text-navy/60 transition-colors hover:text-navy"
          >
            ← Volver al inicio
          </Link>
          <RevealOnScroll>
            <div className="relative mb-6 h-14 w-40 sm:h-16 sm:w-48">
              <Image
                src="/img/grundfos/logo.png"
                alt="Grundfos"
                fill
                className="object-contain object-left"
              />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.05}>
            <p className="eyebrow">Representación de equipos</p>
          </RevealOnScroll>
          <AnimatedText as="h1" className="display mt-4 max-w-[20ch]">
            Equipos Grundfos
          </AnimatedText>
          <RevealOnScroll delay={0.1}>
            <p className="mt-6 max-w-[60ch] text-[clamp(1.05rem,1.6vw,1.4rem)] text-navy/70">
              Realizamos la Provisión de Equipos Especiales, desarrollando Ingeniería
              para garantizar resultados y sostenibilidad operativa.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <GrundfosCatalog products={grundfosProducts} />

      <CtaFullbleed title="¿Necesitás un equipo Grundfos a medida? Escribinos." />
    </>
  );
}
