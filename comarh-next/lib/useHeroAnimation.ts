"use client";

/**
 * useHeroAnimation — encapsula todo el timeline de GSAP del hero.
 *
 * Entrada (on load):
 *  - Fondo: scale 1.05 → 1 (settle de cámara).
 *  - Overlay oscuro: opacity 0 → 1.
 *  - Wordmark "COMARH": SplitText en chars, cada letra yPercent 100 → 0 +
 *    opacity, stagger 0.025s, expo.out (emergen desde el borde inferior).
 *  - Bloques del pie: fade + slide up con stagger.
 *
 * Scroll (ScrollTrigger scrub):
 *  - Parallax sutil del fondo (yPercent -5 → 5).
 *  - Wordmark fade opacity 1 → 0.3 (profundidad antes de la próxima sección).
 *
 * NOTA: usamos SplitText de GSAP (registrado en @/lib/gsap). Al correr solo
 * dentro de useEffect no hay problema de SSR, por eso no hace falta el
 * dynamic import con ssr:false.
 */
import { useEffect, type RefObject } from "react";
import { gsap, registerGsap, ScrollTrigger, SplitText } from "@/lib/gsap";

interface HeroRefs {
  root: RefObject<HTMLElement | null>;
  bg: RefObject<HTMLDivElement | null>;
  overlay: RefObject<HTMLDivElement | null>;
  wordmark: RefObject<HTMLHeadingElement | null>;
  footer: RefObject<HTMLDivElement | null>;
}

export function useHeroAnimation({ root, bg, overlay, wordmark, footer }: HeroRefs) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    registerGsap();

    const ctx = gsap.context(() => {
      if (reduce) {
        // Sin animación: dejamos todo visible.
        if (wordmark.current) wordmark.current.style.visibility = "visible";
        gsap.set([overlay.current, footer.current], { opacity: 1 });
        return;
      }

      let split: SplitText | null = null;
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // 1. Fondo — settle de cámara.
      tl.fromTo(
        bg.current,
        { scale: 1.05 },
        { scale: 1, duration: 1.5, ease: "power2.out" },
        0
      );

      // 2. Overlay fade-in.
      tl.fromTo(
        overlay.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        0
      );

      // 3. Wordmark — SplitText por chars, emergen desde abajo.
      if (wordmark.current) {
        wordmark.current.style.visibility = "visible";
        split = new SplitText(wordmark.current, {
          type: "chars",
          charsClass: "inline-block will-change-transform",
        });
        tl.fromTo(
          split.chars,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.15,
            stagger: 0.025,
          },
          0.2
        );
      }

      // 4. Pie — bloques fade + slide up con stagger.
      if (footer.current) {
        const blocks = footer.current.querySelectorAll("[data-hero-meta]");
        tl.fromTo(
          blocks,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 },
          0.8
        );
      }

      // 5. Scroll — parallax del fondo.
      gsap.fromTo(
        bg.current,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // 6. Scroll — fade del wordmark (profundidad).
      gsap.to(wordmark.current, {
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      return () => split?.revert();
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
