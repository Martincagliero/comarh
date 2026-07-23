"use client";

/**
 * Intro / propósito — imagen con parallax (GSAP scrub) + statement con SplitText
 * y párrafo con RevealOnScroll.
 */
import Image from "next/image";
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
            El cuidado del ambiente y el uso responsable del agua no admiten
            atajos. Cada proyecto exige rigor técnico desde el primer relevamiento
            hasta la entrega final.
          </AnimatedText>
          <RevealOnScroll delay={0.1}>
            <p className="mt-6 max-w-[52ch] text-[clamp(1.05rem,1.6vw,1.4rem)] text-navy/70">
              En COMARH combinamos ingeniería, ciencias ambientales y experiencia
              de campo para acompañar a nuestros clientes en cada etapa:
              diagnóstico, diseño, gestión de permisos y ejecución, sin perder de
              vista los plazos ni la calidad técnica.
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
