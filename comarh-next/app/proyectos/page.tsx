import type { Metadata } from "next";
import Link from "next/link";
import AnimatedText from "@/components/ui/AnimatedText";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import CtaFullbleed from "@/components/sections/CtaFullbleed";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Proyectos ambientales y de recursos hídricos ejecutados por COMARH: impacto ambiental, efluentes, monitoreo y más.",
};

export default function ProyectosPage() {
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
            <p className="eyebrow">Proyectos</p>
          </RevealOnScroll>
          <AnimatedText as="h1" className="display mt-4 max-w-[18ch]">
            Distintos proyectos, mismo compromiso técnico.
          </AnimatedText>
        </div>
      </section>

      <section className="px-[clamp(1.25rem,5vw,5rem)] pb-[clamp(4rem,8vw,7rem)]">
        <div className="mx-auto w-full max-w-[1440px]">
          <ProjectsGrid />
        </div>
      </section>

      <CtaFullbleed title="¿Tenés un proyecto ambiental en mente?" />
    </>
  );
}
