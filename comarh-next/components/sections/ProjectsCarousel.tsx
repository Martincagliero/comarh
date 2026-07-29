"use client";

/**
 * ProjectsCarousel — carrusel con drag (Framer Motion drag="x") + flechas de navegación.
 * - dragConstraints calculado dinámicamente según ancho del track.
 * - Contador "01 / 06" que se actualiza según la card en viewport.
 * - Cada card: hover scale en contenedor + imagen (spring), overflow hidden.
 * - layoutId en la imagen para la transición compartida al detalle de proyecto.
 */
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue } from "motion/react";
import { projects } from "@/lib/data/projects";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function ProjectsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [constraint, setConstraint] = useState(0);
  const [active, setActive] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const overflow =
        trackRef.current.scrollWidth - trackRef.current.offsetWidth;
      setConstraint(overflow > 0 ? overflow : 0);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const slide = (direction: 1 | -1) => {
    const card = trackRef.current?.firstElementChild as HTMLElement | null;
    const step = (card?.offsetWidth ?? 320) + 20;
    const next = Math.min(0, Math.max(-constraint, x.get() - direction * step));
    animate(x, next, { type: "spring", stiffness: 300, damping: 32 });
  };

  return (
    <section id="proyectos" className="overflow-hidden py-[clamp(4rem,10vw,9rem)]">
      <div className="mx-auto w-full max-w-[1440px] px-[clamp(1.25rem,5vw,5rem)]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-[40ch]">
            <RevealOnScroll>
              <p className="eyebrow">Proyectos</p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.05}>
              <h2 className="h2-fluid mt-3">
                Distintos proyectos, mismo compromiso técnico.
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <p className="mt-4 text-[clamp(1.05rem,1.6vw,1.4rem)] text-navy/70">
                Soluciones diseñadas a medida de cada cliente y cada territorio. Deslizá para ver todos.
              </p>
            </RevealOnScroll>
          </div>
          <div className="flex items-center gap-6">
            <span className="tabular-nums text-sm text-navy/60">
              {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => slide(-1)}
                aria-label="Proyecto anterior"
                data-cursor="hover"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-navy/70 transition-colors hover:border-navy hover:text-navy"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => slide(1)}
                aria-label="Proyecto siguiente"
                data-cursor="hover"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-navy/70 transition-colors hover:border-navy hover:text-navy"
              >
                →
              </button>
            </div>
            <Link
              href="/proyectos"
              className="group inline-flex items-center gap-2 text-[0.8rem] font-medium uppercase tracking-[0.04em] text-green-dark"
            >
              Ver todos los proyectos
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>

      <motion.div
        ref={trackRef}
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -constraint, right: 0 }}
        dragElastic={0.08}
        className="flex cursor-grab gap-5 px-[clamp(1.25rem,5vw,5rem)] active:cursor-grabbing"
      >
        {projects.map((p, i) => (
          <motion.div
            key={p.slug}
            onViewportEnter={() => setActive(i)}
            viewport={{ amount: 0.6 }}
            className="h-auto w-[80vw] shrink-0 sm:w-[46vw] lg:w-[30vw]"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="h-full"
            >
              <Link
                href={`/proyectos/${p.slug}`}
                draggable={false}
                className="group flex h-full flex-col overflow-hidden rounded border border-line bg-bg-alt"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <motion.div layoutId={`project-image-${p.slug}`} className="h-full w-full">
                    <Image
                      src={p.cover}
                      alt={p.title}
                      width={700}
                      height={467}
                      draggable={false}
                      className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
                    />
                  </motion.div>
                </div>
                <div className="flex flex-1 flex-col gap-2.5 p-6">
                  <span className="self-start rounded-full bg-navy/10 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-wide text-navy">
                    {p.categoryLabel}
                  </span>
                  <h3 className="line-clamp-2 text-xl">{p.title}</h3>
                  <p className="line-clamp-3 text-sm text-navy/70">{p.description}</p>
                  <div className="mt-auto flex flex-wrap gap-4 pt-2 text-xs text-navy/70">
                    <span><b className="text-green-dark">Ubicación:</b> {p.location}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
