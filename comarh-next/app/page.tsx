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
            <p className="max-w-[42ch] text-[clamp(1.1rem,1.8vw,1.5rem)] text-navy/70">
              Cada desafío ambiental tiene una solución técnica a medida. Conocé cómo trabajamos.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <Link
              href="/servicios"
              data-cursor="hover"
              className="group inline-flex items-center gap-2 rounded-full border border-navy bg-navy px-6 py-3 text-[0.8rem] font-medium uppercase tracking-[0.04em] text-white transition-colors duration-400 hover:border-green-dark hover:bg-green-dark"
            >
              Ver nuestros servicios
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </RevealOnScroll>
        </div>
      </section>

      <CtaFullbleed />
    </>
  );
}
