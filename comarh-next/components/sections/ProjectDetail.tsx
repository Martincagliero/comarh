"use client";

/**
 * ProjectDetail — hero con layoutId (transición compartida desde la grilla),
 * ficha técnica y galería con reveals escalonados.
 */
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { Project } from "@/lib/data/projects";
import AnimatedText from "@/components/ui/AnimatedText";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const gallery = [
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=70",
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=70",
];

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <>
      <section className="px-[clamp(1.25rem,5vw,5rem)] pt-32">
        <div className="mx-auto w-full max-w-[1440px]">
          <Link
            href="/proyectos"
            className="mb-6 inline-flex items-center gap-2 text-sm text-navy/60 transition-colors hover:text-navy"
          >
            ← Volver a proyectos
          </Link>
          <motion.div
            layoutId={`project-image-${project.slug}`}
            className="relative aspect-[16/9] overflow-hidden rounded"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      <section className="px-[clamp(1.25rem,5vw,5rem)] py-[clamp(3rem,6vw,5rem)]">
        <div className="mx-auto grid w-full max-w-[1440px] gap-[clamp(2rem,5vw,5rem)] md:grid-cols-[1.4fr_0.6fr]">
          <div>
            <RevealOnScroll>
              <p className="eyebrow">{project.categoryLabel}</p>
            </RevealOnScroll>
            <AnimatedText as="h1" className="mt-3 text-[clamp(1.8rem,4vw,3rem)]">
              {project.title}
            </AnimatedText>
            <RevealOnScroll delay={0.1}>
              <p className="mt-6 max-w-[60ch] text-[clamp(1.05rem,1.6vw,1.4rem)] text-navy/70">
                {project.description} El proyecto integra relevamiento de campo,
                análisis técnico y gestión normativa, con foco en soluciones
                sostenibles y verificables. (Reemplazar con la descripción real del
                proyecto.)
              </p>
            </RevealOnScroll>
          </div>

          <aside>
            <RevealOnScroll delay={0.15}>
              <dl className="flex flex-col gap-4 border-t border-line pt-6 text-sm">
                <div>
                  <dt className="text-navy/50">Estado</dt>
                  <dd className="text-navy">{project.status}</dd>
                </div>
                <div>
                  <dt className="text-navy/50">Ubicación</dt>
                  <dd className="text-navy">{project.location}</dd>
                </div>
                {project.client && (
                  <div>
                    <dt className="text-navy/50">Cliente</dt>
                    <dd className="text-navy">{project.client}</dd>
                  </div>
                )}
                {project.year && (
                  <div>
                    <dt className="text-navy/50">Año</dt>
                    <dd className="text-navy">{project.year}</dd>
                  </div>
                )}
              </dl>
            </RevealOnScroll>
          </aside>
        </div>
      </section>

      <section className="px-[clamp(1.25rem,5vw,5rem)] pb-[clamp(4rem,8vw,7rem)]">
        <div className="mx-auto grid w-full max-w-[1440px] gap-6 md:grid-cols-2">
          {gallery.map((src, i) => (
            <RevealOnScroll key={src} delay={i * 0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded">
                <Image src={src} alt="" fill sizes="50vw" className="object-cover" />
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>
    </>
  );
}
