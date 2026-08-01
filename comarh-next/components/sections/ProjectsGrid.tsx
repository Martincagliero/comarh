"use client";

/**
 * ProjectsGrid — grilla filtrable con transiciones de layout (Motion).
 * - Filtros: al cambiar, las cards se reordenan con animación (layout + AnimatePresence).
 * - layoutId en la imagen: transición compartida hacia el detalle del proyecto.
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { projects, projectFilters, type ProjectCategory } from "@/lib/data/projects";

export default function ProjectsGrid() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const list =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const current = projectFilters.find((f) => f.key === filter) ?? projectFilters[0];

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* Mobile: desplegable minimalista de rubros */}
      <div ref={rootRef} className="relative mb-6 sm:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          data-cursor="hover"
          aria-haspopup="listbox"
          aria-expanded={open}
          className={`flex w-full items-center justify-between gap-2 rounded-full border px-4 py-2.5 text-[0.75rem] font-medium uppercase tracking-[0.05em] transition-colors ${
            open ? "border-navy text-navy" : "border-line text-navy/80"
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-green-dark" />
            {current.label}
          </span>
          <motion.span
            aria-hidden
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="text-navy/50"
          >
            ▾
          </motion.span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              role="listbox"
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-20 overflow-hidden rounded-2xl border border-line bg-white p-1.5 shadow-[0_12px_32px_-8px_rgba(20,40,60,0.18)]"
            >
              {projectFilters.map((f) => (
                <li key={f.key}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={filter === f.key}
                    data-cursor="hover"
                    onClick={() => {
                      setFilter(f.key);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-2 rounded-xl px-3.5 py-2.5 text-left text-[0.75rem] font-medium uppercase tracking-[0.03em] transition-colors ${
                      filter === f.key ? "bg-bg-alt text-green-dark" : "text-navy/70 hover:bg-bg-alt"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`h-1.5 w-1.5 rounded-full transition-colors ${
                        filter === f.key ? "bg-green-dark" : "bg-navy/20"
                      }`}
                    />
                    {f.label}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <div className="mb-10 hidden flex-wrap gap-2 sm:flex">
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

      <motion.div layout className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
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
                <div className="aspect-[3/2] overflow-hidden bg-bg-alt">
                  <motion.div layoutId={`project-image-${p.slug}`} className="h-full w-full">
                    {p.cover ? (
                      <Image
                        src={p.cover}
                        alt={p.title}
                        width={700}
                        height={467}
                        className="h-full w-full object-contain p-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-navy-deep to-navy text-center text-xs font-semibold uppercase tracking-wide text-white/60">
                        {p.categoryLabel}
                      </div>
                    )}
                  </motion.div>
                </div>
                <div className="flex flex-1 flex-col gap-1.5 p-3 sm:gap-2.5 sm:p-6">
                  <span className="text-[0.58rem] font-semibold uppercase tracking-wide text-green-dark sm:text-[0.72rem]">
                    {p.categoryLabel}
                  </span>
                  <h3 className="line-clamp-2 text-sm sm:line-clamp-none sm:text-xl">{p.title}</h3>
                  <p className="line-clamp-2 text-xs text-navy/70 sm:line-clamp-none sm:text-sm">
                    {p.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
