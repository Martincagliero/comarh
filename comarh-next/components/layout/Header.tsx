"use client";

/**
 * Header sticky.
 * - Framer useScroll + useMotionValueEvent: bg transparente → blanco/blur pasando 50px.
 * - Logo a color, nav en mayúsculas, LiveClock, CTA que abre el modal (Zustand).
 * - Burger que togglea el menú mobile.
 */
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { useUI } from "@/lib/store";
import Button from "@/components/ui/Button";
import MobileMenu from "./MobileMenu";

const links = [
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/proyectos", label: "Proyectos" },
];

export default function Header() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const { openContact, toggleMenu, menuOpen } = useUI();

  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 50));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-400 ${
          solid
            ? "bg-white/80 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="flex h-[76px] items-center justify-between gap-6 px-[clamp(1.25rem,5vw,5rem)]">
          <Link href="/" className="flex items-center" aria-label="COMARH S.A. — Inicio">
            <Image
              src={solid ? "/img/logo-scroll.png" : "/img/logo-white-mark.png"}
              alt="COMARH S.A."
              width={320}
              height={320}
              priority
              className={solid ? "h-[58px] w-auto" : "h-[64px] w-auto"}
            />
          </Link>

          <nav className="flex items-center gap-8" aria-label="Navegación principal">
            <ul
              className={`hidden items-center gap-7 md:flex ${
                solid ? "text-navy" : "text-white"
              }`}
            >
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="relative py-1 text-[0.8rem] font-medium uppercase tracking-[0.04em] after:absolute after:inset-x-0 after:-bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className={`hidden md:block ${solid ? "" : "text-white"}`}>
              <Button
                variant={solid ? "solid" : "ghost"}
                onClick={openContact}
              >
                Trabajemos juntos
              </Button>
            </div>

            <button
              onClick={toggleMenu}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              className={`flex flex-col gap-[5px] p-1.5 md:hidden ${
                solid ? "text-navy" : "text-white"
              }`}
            >
              <span
                className={`h-0.5 w-7 bg-current transition-transform duration-300 ${
                  menuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-7 bg-current transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-7 bg-current transition-transform duration-300 ${
                  menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </button>
          </nav>
        </div>
      </header>

      <MobileMenu links={links} />
    </>
  );
}
