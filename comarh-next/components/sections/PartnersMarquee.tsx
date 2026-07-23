"use client";

/**
 * PartnersMarquee — franja de logos/nombres en loop infinito.
 */
import { partners } from "@/lib/data/partners";
import Marquee from "@/components/ui/Marquee";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function PartnersMarquee() {
  return (
    <section className="py-[clamp(3rem,6vw,5rem)]">
      <div className="mx-auto mb-8 w-full max-w-[1440px] px-[clamp(1.25rem,5vw,5rem)]">
        <RevealOnScroll>
          <p className="eyebrow text-center">
            Empresas y organismos que confían en nosotros
          </p>
        </RevealOnScroll>
      </div>
      <Marquee items={partners} />
    </section>
  );
}
