import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import ProjectsCarousel from "@/components/sections/ProjectsCarousel";
import Methodology from "@/components/sections/Methodology";
import PartnersMarquee from "@/components/sections/PartnersMarquee";
import CtaFullbleed from "@/components/sections/CtaFullbleed";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function Home() {
  return (
    <>
      <Hero />
      <PartnersMarquee />
      <Intro />
      <ProjectsCarousel />
      <Methodology />

      <section className="py-[clamp(3rem,6vw,5rem)]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-5 px-[clamp(1.25rem,5vw,5rem)] text-center">
          <RevealOnScroll>
            <div className="relative h-12 w-36 sm:h-14 sm:w-40">
              <Image
                src="/img/grundfos/logo.png"
                alt="Grundfos"
                fill
                className="object-contain"
              />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.05}>
            <h2 className="max-w-[20ch] text-[clamp(1.3rem,2.6vw,2rem)] font-medium uppercase leading-[1.1] text-navy">
              Representación de Equipos Grundfos
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <p className="max-w-[42ch] text-[clamp(1.1rem,1.8vw,1.5rem)] text-navy/70">
              Realizamos la Provisión de Equipos Especiales, desarrollando Ingeniería
              para garantizar resultados y sostenibilidad operativa.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.12}>
            <Link
              href="/grundfos"
              data-cursor="hover"
              className="group inline-flex items-center gap-2 rounded-full border border-navy bg-navy px-6 py-3 text-[0.8rem] font-medium uppercase tracking-[0.04em] text-white transition-colors duration-400 hover:border-green-dark hover:bg-green-dark"
            >
              Ver equipos Grundfos
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </RevealOnScroll>
        </div>
      </section>

      <CtaFullbleed />
    </>
  );
}
