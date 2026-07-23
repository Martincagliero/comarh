"use client";

/**
 * ProjectsGrid — grilla filtrable con transiciones de layout (Motion).
 * - Filtros: al cambiar, las cards se reordenan con animación (layout + AnimatePresence).
 * - layoutId en la imagen: transición compartida hacia el detalle del proyecto.
 */
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { projects, projectFilters, type ProjectCategory } from "@/lib/data/projects";

export default function ProjectsGrid() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const list =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2">
        {projectFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            data-cursor="hover"
            className={`rounded-full border px-4 py-2 text-[0.8rem] font-medium uppercase tracking-[0.03em] transition-colors ${
              filter === f.key
                ? "border-navy bg-navy text-white"
                : "border-line text-navy/70 hover:border-navy/40"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/proyectos/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded border border-line bg-bg-alt"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <motion.div layoutId={`project-image-${p.slug}`} className="h-full w-full">
                    <Image
                      src={p.image}
                      alt={p.title}
                      width={700}
                      height={467}
                      className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
                    />
                  </motion.div>
                </div>
                <div className="flex flex-1 flex-col gap-2.5 p-6">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-wide text-green-dark">
                    {p.categoryLabel}
                  </span>
                  <h3 className="text-xl">{p.title}</h3>
                  <p className="text-sm text-navy/70">{p.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
