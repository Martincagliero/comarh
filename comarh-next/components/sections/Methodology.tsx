"use client";

/**
 * Methodology — bloque con imagen de fondo (parallax GSAP) + overlay,
 * y 3 pilares con reveal escalonado (Framer stagger via variants).
 */
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { gsap, registerGsap } from "@/lib/gsap";
import AnimatedText from "@/components/ui/AnimatedText";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const pillars = [
  {
    n: "01",
    title: "Diagnóstico y Diseño",
    text: "Relevamos, medimos y diseñamos soluciones técnicas ajustadas a cada sitio y cada normativa vigente.",
  },
  {
    n: "02",
    title: "Marco Normativo",
    text: "Conocemos la legislación ambiental y de recursos hídricos, y la convertimos en un camino claro de permisos y aprobaciones.",
  },
  {
    n: "03",
    title: "Ejecución Integral",
    text: "Acompañamos el proyecto de punta a punta, desde el estudio inicial hasta la asistencia técnica en obra.",
  },
];

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const col = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Methodology() {
  const imgRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !imgRef.current) return;
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { yPercent: -6 },
        {
          yPercent: 6,
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
    <section className="relative overflow-hidden py-[clamp(4rem,10vw,9rem)] text-white">
      <div ref={imgRef} className="absolute inset-[-8%_0] -z-20 h-[116%] w-full">
        <Image
          src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1920&q=70"
          alt="Lago de montaña que representa la gestión de recursos hídricos"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-deep/85 to-navy-deep/70" />

      <div className="mx-auto w-full max-w-[1440px] px-[clamp(1.25rem,5vw,5rem)]">
        <div className="mb-14 max-w-[60ch]">
          <RevealOnScroll>
            <p className="eyebrow !text-green-light">Metodología</p>
          </RevealOnScroll>
          <AnimatedText as="h2" className="h2-fluid mt-3 text-white">
            La metodología que sostiene cada proyecto.
          </AnimatedText>
          <RevealOnScroll delay={0.1}>
            <p className="mt-4 text-[clamp(1.05rem,1.6vw,1.4rem)] text-white/80">
              Un enfoque repetible pensado para el rigor técnico, los tiempos del
              cliente y el cumplimiento normativo.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.15}>
            <Link
              href="/servicios"
              className="group mt-6 inline-flex items-center gap-2 text-[0.8rem] font-medium uppercase tracking-[0.04em] text-green-light"
            >
              Ver nuestro impacto
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </RevealOnScroll>
        </div>

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {pillars.map((p) => (
            <motion.div key={p.n} variants={col} className="border-t border-white/25 pt-6">
              <span className="text-[0.8rem] font-semibold tracking-[0.1em] text-green-light">
                {p.n}
              </span>
              <h3 className="mb-2.5 mt-3 text-white">{p.title}</h3>
              <p className="text-white/80">{p.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
