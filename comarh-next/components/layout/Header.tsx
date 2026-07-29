"use client";

/**
 * Header sticky.
 * - Framer useScroll + useMotionValueEvent: bg transparente → blanco/blur pasando 50px.
 * - Logo a color, nav en mayúsculas, LiveClock, CTA que abre el modal (Zustand).
 * - Burger que togglea el menú mobile.
 */
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
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
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const { openContact, toggleMenu, menuOpen } = useUI();

  useMotionValueEvent(scrollY, "change", (v) => {
    setSolid(v > 50);
    const diff = v - lastY.current;
    if (v < 80) setHidden(false);
    else if (diff > 4) setHidden(true);
    else if (diff < -4) setHidden(false);
    lastY.current = v;
  });

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-[background-color,box-shadow,transform] duration-400 ${
          solid
            ? "bg-white/80 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md"
            : "bg-transparent"
        } ${hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="flex h-[60px] items-center justify-between gap-6 px-[clamp(1.25rem,5vw,5rem)] md:h-[76px]">
          <Link href="/" className="flex items-center" aria-label="COMARH S.A. — Inicio">
            <Image
              src={solid ? "/img/logo-scroll.png" : "/img/logo-white-mark.png"}
              alt="COMARH S.A."
              width={320}
              height={320}
              priority
              className={solid ? "h-[42px] w-auto md:h-[58px]" : "h-[46px] w-auto md:h-[64px]"}
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

            <div
              className={`flex items-center gap-4 md:hidden ${
                solid ? "text-navy" : "text-white"
              }`}
            >
              <button
                type="button"
                onClick={openContact}
                data-cursor="hover"
                className="text-[0.68rem] font-medium uppercase tracking-[0.14em]"
              >
                Trabajemos juntos
              </button>
              <button
                type="button"
                onClick={toggleMenu}
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={menuOpen}
                data-cursor="hover"
                className="text-[0.68rem] font-medium uppercase tracking-[0.14em]"
              >
                {menuOpen ? "Cerrar" : "Menú"}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <MobileMenu links={links} />
    </>
  );
}
