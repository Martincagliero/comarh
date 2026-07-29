"use client";

/**
 * Intro / propósito — imagen con parallax (GSAP scrub) + statement con SplitText
 * y párrafo con RevealOnScroll.
 */
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { gsap, registerGsap } from "@/lib/gsap";
import AnimatedText from "@/components/ui/AnimatedText";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function Intro() {
  const imgRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !imgRef.current) return;
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: imgRef.current!.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="intro" className="py-[clamp(4rem,10vw,9rem)]">
      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-[clamp(2rem,5vw,5rem)] px-[clamp(1.25rem,5vw,5rem)] md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative aspect-[4/5] overflow-hidden rounded">
          <div ref={imgRef} className="absolute inset-[-8%_0] h-[116%] w-full">
            <Image
              src="/img/proposito.png"
              alt="Profesional trazando sobre una carta topográfica con el curso de un río"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <RevealOnScroll>
            <p className="eyebrow">Nuestro propósito</p>
          </RevealOnScroll>
          <AnimatedText
            as="h2"
            className="mt-4 text-[clamp(1.6rem,3.2vw,2.8rem)] font-medium leading-[1.1]"
          >
            Brindar soluciones integrales de ingeniería que respondan a las
            necesidades de nuestros clientes mediante un enfoque
            interdisciplinario, innovador y sostenible.
          </AnimatedText>
          <RevealOnScroll delay={0.1}>
            <p className="mt-6 max-w-[52ch] text-[clamp(1.05rem,1.6vw,1.4rem)] text-navy/70">
              Diseñamos, gestionamos y ejecutamos proyectos de recursos
              hídricos, medio ambiente, infraestructura y sistemas especiales,
              garantizando calidad técnica, eficiencia y compromiso en cada
              etapa del proceso.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <Link
              href="/nosotros"
              className="group mt-6 inline-flex items-center gap-2 text-[0.8rem] font-medium uppercase tracking-[0.04em] text-navy"
            >
              Conocé más sobre nosotros
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
