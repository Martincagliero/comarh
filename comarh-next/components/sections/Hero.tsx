"use client";

/**
 * Hero — réplica del hero de eleos.la, rebrandeado a COMARH.
 *
 * Layout (de arriba hacia abajo, sobre imagen full-bleed + overlay oscuro):
 *  - El header (nav + "Trabajemos juntos") lo aporta el <Header/> global,
 *    transparente sobre el hero y sólido al scrollear. Por eso acá NO se
 *    duplica la barra de navegación.
 *  - Centro: wordmark serif de alto contraste "COMARH" (fuente Fraunces),
 *    edge-to-edge, tracking muy negativo — contrasta con la sans del pie.
 *  - Pie: dos bloques de texto (sans, mayúsculas, tracking amplio) + "EXPLORAR ↓".
 *
 * Toda la animación (entrada + scroll) vive en useHeroAnimation().
 *
 * ── QUÉ REEMPLAZAR ──
 *  1. Imagen final: /public/img/hero.png (aérea del río). Para usar video,
 *     descomentá el <video> y comentá el <Image> (dejá hero.png como poster).
 *  2. Logo blanco: /public/img/logo-white.png (lo usa el Header sobre el hero).
 */
import Image from "next/image";
import { useRef } from "react";
import { scrollTo } from "@/lib/store";
import { useHeroAnimation } from "@/lib/useHeroAnimation";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useHeroAnimation({
    root: rootRef,
    bg: bgRef,
    overlay: overlayRef,
    wordmark: wordmarkRef,
    footer: footerRef,
  });

  return (
    <section
      ref={rootRef}
      className="relative flex h-[100svh] flex-col overflow-hidden"
    >
      {/* Fondo full-bleed (parallax + settle). Reemplazar por el render final. */}
      <div ref={bgRef} className="absolute inset-0 -z-20 will-change-transform">
        <Image
          src="/img/hero.png"
          alt="Vista aérea de un río serpenteando entre campos"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/*
        // === OPCIÓN VIDEO (Veo sin texto) ===
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/img/hero.png"
          className="h-full w-full object-cover"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        */}
      </div>

      {/* Overlay oscuro verde-azulado (no negro puro) */}
      <div
        ref={overlayRef}
        className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-deep/55 via-navy-deep/35 to-navy-deep/70"
      />

      {/* Wordmark gigante centrado, edge-to-edge */}
      <div className="flex flex-1 items-center justify-center px-[clamp(1rem,5vw,3rem)]">
        <h1
          ref={wordmarkRef}
          className="hero-wordmark split-hidden select-none text-center"
        >
          COMARH
        </h1>
      </div>

      {/* Pie: dos bloques de texto (sans) + EXPLORAR */}
      <div
        ref={footerRef}
        className="relative z-10 flex flex-col gap-6 px-[clamp(1.25rem,5vw,5rem)] pb-[clamp(1.75rem,4vh,3rem)] md:flex-row md:items-end md:justify-between md:gap-10"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:gap-12">
          <p data-hero-meta className="hero-meta">
            Servicio profesional de diseño,
            <br />
            desarrollo de proyectos y consultoría
          </p>
          <p data-hero-meta className="hero-meta">
            Asistencia técnica a medida
            <br />
            de cada cliente.
          </p>
        </div>

        <button
          data-hero-meta
          data-cursor="hover"
          onClick={() => scrollTo("#intro")}
          className="hero-meta group inline-flex items-center gap-2 self-start border-b border-[#f5f0e8]/70 pb-1 transition-colors hover:border-[#f5f0e8] md:self-auto"
        >
          Explorar
          <span className="transition-transform duration-300 group-hover:translate-y-1">
            ↓
          </span>
        </button>
      </div>
    </section>
  );
}
