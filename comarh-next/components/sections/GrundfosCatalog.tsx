"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { type GrundfosProduct, whatsappLink } from "@/lib/data/grundfos";

const ALL = "Todos";

export default function GrundfosCatalog({
  products,
}: {
  products: GrundfosProduct[];
}) {
  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );
  const [active, setActive] = useState(ALL);

  const filtered =
    active === ALL ? products : products.filter((p) => p.category === active);

  return (
    <section className="px-[clamp(1.25rem,5vw,5rem)] pb-[clamp(4rem,8vw,7rem)]">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="mb-8">
          {/* Mobile: desplegable para no ocupar espacio */}
          <div className="relative sm:hidden">
            <select
              value={active}
              onChange={(e) => setActive(e.target.value)}
              data-cursor="hover"
              className="w-full appearance-none rounded-full border border-navy/20 bg-transparent px-4 py-2.5 text-[0.78rem] font-medium uppercase tracking-[0.03em] text-navy"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-navy/60">
              ▾
            </span>
          </div>

          {/* Desktop: pills */}
          <div className="hidden flex-wrap gap-2.5 sm:flex">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                data-cursor="hover"
                onClick={() => setActive(cat)}
                className={`rounded-full border px-4 py-2 text-[0.78rem] font-medium uppercase tracking-[0.03em] transition-colors duration-300 ${
                  active === cat
                    ? "border-navy bg-navy text-white"
                    : "border-navy/20 bg-transparent text-navy/70 hover:border-navy/40 hover:text-navy"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <RevealOnScroll key={p.slug} delay={Math.min(i * 0.04, 0.3)}>
              <div className="flex h-full flex-col overflow-hidden rounded border border-navy/10 bg-white">
                <div className="relative aspect-[4/3] bg-[#f4f1ea]">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-3 sm:p-6"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2.5 p-3 sm:gap-4 sm:p-5">
                  <p className="text-[0.8rem] font-medium leading-snug text-navy sm:text-[0.95rem]">
                    {p.name}
                  </p>
                  <a
                    href={whatsappLink(p.name)}
                    target="_blank"
                    rel="noopener"
                    data-cursor="hover"
                    className="group mt-auto inline-flex w-fit items-center gap-1.5 rounded-full border border-navy bg-navy px-3 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.02em] text-white transition-colors duration-400 hover:border-green-dark hover:bg-green-dark sm:gap-2 sm:px-5 sm:py-2.5 sm:text-[0.75rem] sm:tracking-[0.04em]"
                  >
                    Consultar por este equipo
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
