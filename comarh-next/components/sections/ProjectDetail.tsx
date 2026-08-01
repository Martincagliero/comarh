"use client";

/**
 * ProjectDetail — hero con layoutId (transición compartida desde la grilla),
 * ficha técnica y galería compacta con captions en hover/tap.
 */
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Project } from "@/lib/data/projects";
import AnimatedText from "@/components/ui/AnimatedText";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { scrollTo } from "@/lib/store";

export default function ProjectDetail({ project }: { project: Project }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [coverOpen, setCoverOpen] = useState(false);

  useEffect(() => {
    if (lightboxIndex === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => (i === null ? i : (i + 1) % project.gallery.length));
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) =>
          i === null ? i : (i - 1 + project.gallery.length) % project.gallery.length
        );
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, project.gallery.length]);

  useEffect(() => {
    if (!coverOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCoverOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [coverOpen]);

  return (
    <>
      <section className="px-[clamp(1.25rem,5vw,5rem)] pt-28">
        <div className="mx-auto w-full max-w-[1440px]">
          <Link
            href="/proyectos"
            className="mb-6 inline-flex items-center gap-2 text-sm text-navy/60 transition-colors hover:text-navy"
          >
            ← Volver a proyectos
          </Link>
          <div className="flex items-stretch justify-center gap-3 sm:gap-5">
            <motion.div
              layoutId={`project-image-${project.slug}`}
              className="overflow-hidden rounded"
            >
              {project.cover ? (
                <button
                  type="button"
                  aria-label="Ampliar imagen"
                  data-cursor="hover"
                  onClick={() => setCoverOpen(true)}
                  className="block"
                >
                  <Image
                    src={project.cover}
                    alt={project.title}
                    width={1920}
                    height={1080}
                    priority
                    sizes="70vw"
                    className="block max-h-[55vh] w-auto max-w-[80vw] object-contain sm:max-w-[70vw]"
                  />
                </button>
              ) : (
                <div className="flex h-[38vh] w-[65vw] max-w-[820px] items-center justify-center bg-gradient-to-br from-navy-deep to-navy text-center text-sm font-semibold uppercase tracking-wide text-white/60 sm:h-[45vh]">
                  {project.categoryLabel}
                </div>
              )}
            </motion.div>
            <button
              type="button"
              aria-label="Ver más de este proyecto"
              data-cursor="hover"
              onClick={() => scrollTo("#proyecto-info", -80)}
              className="hidden w-6 shrink-0 items-center justify-center md:flex"
            >
              <span className="relative h-full w-1.5 rounded-full bg-navy/10">
                <motion.span
                  animate={{ top: ["0%", "70%", "0%"] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-1/2 h-24 w-1.5 -translate-x-1/2 rounded-full bg-green-light"
                />
              </span>
            </button>
          </div>
          <RevealOnScroll delay={0.05}>
            <p className="eyebrow mt-6">{project.categoryLabel}</p>
          </RevealOnScroll>
          <AnimatedText as="h1" className="mt-3 text-[clamp(1.8rem,4vw,3rem)]">
            {project.title}
          </AnimatedText>
        </div>
      </section>

      <section id="proyecto-info" className="px-[clamp(1.25rem,5vw,5rem)] py-[clamp(3rem,6vw,5rem)]">
        <div className="mx-auto grid w-full max-w-[1440px] gap-[clamp(2rem,5vw,5rem)] md:grid-cols-[1.4fr_0.6fr]">
          <div>
            <RevealOnScroll delay={0.1}>
              <p className="max-w-[60ch] text-[clamp(1.05rem,1.6vw,1.4rem)] text-navy/70">
                {project.description}
              </p>
            </RevealOnScroll>
          </div>

          <aside>
            <RevealOnScroll delay={0.15}>
              <dl className="flex flex-col gap-4 border-t border-line pt-6 text-sm">
                {project.location && (
                  <div>
                    <dt className="text-navy/50">Ubicación</dt>
                    <dd className="text-navy">{project.location}</dd>
                  </div>
                )}
                {project.client && (
                  <div>
                    <dt className="text-navy/50">Empresa</dt>
                    <dd className="text-navy">{project.client}</dd>
                  </div>
                )}
                {project.comitente && (
                  <div>
                    <dt className="text-navy/50">Comitente</dt>
                    <dd className="text-navy">{project.comitente}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-navy/50">Año</dt>
                  <dd className="text-navy">{project.year}</dd>
                </div>
              </dl>
            </RevealOnScroll>
          </aside>
        </div>
      </section>

      {project.gallery.length > 0 && (
        <section className="px-[clamp(1.25rem,5vw,5rem)] pb-[clamp(4rem,8vw,7rem)]">
          <div className="mx-auto w-full max-w-[1440px]">
            <p className="eyebrow mb-4">Imágenes y planos</p>
            <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-5">
              {project.gallery.map((src, i) => {
                const caption = project.galleryCaptions?.[src];
                return (
                  <RevealOnScroll key={src} delay={i * 0.05}>
                    <button
                      type="button"
                      data-cursor="hover"
                      onClick={() => setLightboxIndex(i)}
                      className="group relative block aspect-square w-full overflow-hidden rounded border border-line bg-bg-alt"
                    >
                      <Image
                        src={src}
                        alt={caption || `${project.title} — plano/imagen ${i + 1}`}
                        fill
                        sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        className="object-contain p-1.5 transition-transform duration-400 group-hover:scale-105"
                      />
                      {caption && (
                        <span
                          title={caption}
                          className="absolute inset-x-0 bottom-0 line-clamp-2 bg-navy/85 px-2 py-1.5 text-left text-[0.62rem] leading-snug text-white"
                        >
                          {caption}
                        </span>
                      )}
                    </button>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-navy-deep/95 px-[clamp(1rem,4vw,3rem)] py-[clamp(2rem,6vw,4rem)]"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              type="button"
              aria-label="Cerrar"
              onClick={() => setLightboxIndex(null)}
              className="absolute right-5 top-5 z-10 text-2xl text-white/80 transition-colors hover:text-white"
            >
              ✕
            </button>

            {project.gallery.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Imagen anterior"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(
                      (i) => (i! - 1 + project.gallery.length) % project.gallery.length
                    );
                  }}
                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 p-3 text-3xl text-white/70 transition-colors hover:text-white sm:left-6"
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="Imagen siguiente"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((i) => (i! + 1) % project.gallery.length);
                  }}
                  className="absolute right-3 top-1/2 z-10 -translate-y-1/2 p-3 text-3xl text-white/70 transition-colors hover:text-white sm:right-6"
                >
                  ›
                </button>
              </>
            )}

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-full w-full max-w-4xl flex-col items-center gap-4"
            >
              <div className="relative h-[50vh] w-full sm:h-[65vh]">
                <Image
                  src={project.gallery[lightboxIndex]}
                  alt={
                    project.galleryCaptions?.[project.gallery[lightboxIndex]] ||
                    `${project.title} — plano/imagen ${lightboxIndex + 1}`
                  }
                  fill
                  sizes="(max-width: 640px) 90vw, 60vw"
                  className="object-contain"
                />
              </div>
              <div className="text-center">
                <p className="text-[0.7rem] uppercase tracking-[0.1em] text-white/50">
                  {lightboxIndex + 1} / {project.gallery.length}
                </p>
                {project.galleryCaptions?.[project.gallery[lightboxIndex]] && (
                  <p className="mt-1 text-sm text-white sm:text-base">
                    {project.galleryCaptions[project.gallery[lightboxIndex]]}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {coverOpen && project.cover && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-navy-deep/95 px-[clamp(1rem,4vw,3rem)] py-[clamp(2rem,6vw,4rem)]"
            onClick={() => setCoverOpen(false)}
          >
            <button
              type="button"
              aria-label="Cerrar"
              onClick={() => setCoverOpen(false)}
              className="absolute right-5 top-5 z-10 text-2xl text-white/80 transition-colors hover:text-white"
            >
              ✕
            </button>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative h-[80vh] w-full max-w-5xl"
            >
              <Image
                src={project.cover}
                alt={project.title}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
