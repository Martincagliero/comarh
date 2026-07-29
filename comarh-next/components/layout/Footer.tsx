"use client";

/**
 * Footer — réplica del footer de eleos.la, rebrandeado a COMARH.
 *
 * - Fondo crema, texto navy oscuro (contrasta con el resto del sitio).
 * - Arriba a la izquierda: CTA grande (grotesk) + "Trabajemos juntos →" subrayado.
 * - Arriba a la derecha: email y ubicación con bullet.
 * - Fila media: tres columnas de links (navegación / redes / legales).
 * - Abajo: wordmark serif GIGANTE "COMARH" cortado por el borde inferior,
 *   con reveal (slide-up) al entrar en viewport — el efecto clave de eleos.
 */
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useUI, scrollTo } from "@/lib/store";

export default function Footer() {
  const { openContact } = useUI();
  const reduce = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#f4f1ea] text-navy-deep">
      <div className="mx-auto w-full max-w-[1440px] px-[clamp(1.25rem,5vw,5rem)] pt-[clamp(3rem,7vw,6rem)]">
        {/* Fila superior: CTA + contactos */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <h2 className="max-w-[16ch] text-[clamp(1.9rem,4.2vw,3.4rem)] font-semibold uppercase leading-[1.02] tracking-[-0.01em]">
              Un buen proyecto necesita un buen equipo. Hablemos.
            </h2>
            <button
              onClick={openContact}
              data-cursor="hover"
              className="group mt-8 inline-flex items-center gap-2 border-b border-navy-deep/70 pb-1 text-[0.8rem] font-medium uppercase tracking-[0.1em] transition-colors hover:border-navy-deep"
            >
              Trabajemos juntos
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>

          <div className="flex justify-between gap-6 text-[0.72rem] font-medium uppercase tracking-[0.12em] text-navy-deep/80 md:justify-end md:gap-16">
            <a
              href="mailto:contacto@consultoracomarh.com"
              className="inline-flex items-center gap-2 transition-opacity hover:opacity-60"
            >
              <span className="text-green">●</span>
              contacto@consultoracomarh.com
            </a>
            <span className="inline-flex items-center gap-2">
              <span className="text-green">●</span>
              Santa Fe, Argentina
            </span>
          </div>
        </div>

        {/* Fila media: columnas de links */}
        <div className="mt-[clamp(3rem,7vw,6rem)] grid grid-cols-1 gap-8 sm:grid-cols-3">
          <ul className="flex flex-col gap-2 text-[0.9rem] font-medium uppercase tracking-[0.08em]">
            <li><Link href="/nosotros" className="transition-opacity hover:opacity-60">Nosotros</Link></li>
            <li><Link href="/servicios" className="transition-opacity hover:opacity-60">Servicios</Link></li>
            <li><Link href="/proyectos" className="transition-opacity hover:opacity-60">Proyectos</Link></li>
            <li>
              <button onClick={openContact} className="uppercase transition-opacity hover:opacity-60">
                Contacto
              </button>
            </li>
          </ul>

          <ul className="flex flex-col gap-2 text-[0.9rem] font-medium uppercase tracking-[0.08em]">
            <li>
              <a
                href="https://instagram.com/consultora_comarh_sa"
                target="_blank"
                rel="noopener"
                className="transition-opacity hover:opacity-60"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="mailto:contacto@consultoracomarh.com"
                className="transition-opacity hover:opacity-60"
              >
                Email
              </a>
            </li>
          </ul>

          <ul className="flex flex-col gap-2 text-[0.9rem] font-medium uppercase tracking-[0.08em]">
            <li>
              <Link href="/legales/privacidad" className="transition-opacity hover:opacity-60">
                Política de Privacidad
              </Link>
            </li>
            <li>
              <Link href="/legales/terminos" className="transition-opacity hover:opacity-60">
                Términos de Servicio
              </Link>
            </li>
            <li>
              <button
                onClick={() => scrollTo(0)}
                className="uppercase transition-opacity hover:opacity-60"
              >
                Volver arriba ↑
              </button>
            </li>
          </ul>
        </div>

        {/* Copyright fino */}
        <p className="mt-[clamp(2.5rem,5vw,4rem)] text-[0.72rem] uppercase tracking-[0.12em] text-navy-deep/50">
          © {year} COMARH S.A. — Todos los derechos reservados.
        </p>
      </div>

      {/* Wordmark serif gigante, cortado por el borde inferior + reveal on-scroll */}
      <div
        aria-hidden
        className="mt-[clamp(1.5rem,4vw,3rem)] h-[0.7em] select-none overflow-hidden text-center text-[clamp(5rem,25vw,22rem)] leading-none [font-family:var(--font-display)]"
      >
        <motion.span
          initial={reduce ? false : { y: "22%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="block font-medium uppercase tracking-[-0.03em] text-navy-deep"
        >
          COMARH
        </motion.span>
      </div>
    </footer>
  );
}
