"use client";

/**
 * SmoothScrollProvider
 * Inicializa Lenis y lo sincroniza con el ticker de GSAP para que
 * ScrollTrigger y el smooth scroll nunca se desincronicen (patrón Awwwards).
 * Respeta prefers-reduced-motion.
 */
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    registerGsap();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Lenis -> ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // GSAP ticker maneja el rAF de Lenis
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Exponer para scroll programático (botones "Explorar", "volver arriba")
    window.__lenis = lenis;

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}
