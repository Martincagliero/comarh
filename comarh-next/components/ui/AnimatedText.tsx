"use client";

/**
 * AnimatedText — wrapper reutilizable de GSAP SplitText.
 * Divide en palabras/caracteres y anima con stagger (yPercent 120→0, expo.out).
 * trigger="load"  -> anima al montar.
 * trigger="view"  -> anima al entrar en viewport (ScrollTrigger).
 */
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, SplitText, registerGsap } from "@/lib/gsap";

type Props = {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  trigger?: "load" | "view";
  splitBy?: "words" | "chars";
  stagger?: number;
  delay?: number;
};

export default function AnimatedText({
  children,
  as = "h2",
  className = "",
  trigger = "view",
  splitBy = "words",
  stagger = 0.04,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as React.ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.style.visibility = "visible";
      return;
    }

    registerGsap();
    let split: SplitText | null = null;
    const ctx = gsap.context(() => {
      split = new SplitText(el, {
        type: splitBy === "chars" ? "chars,words" : "lines,words",
        linesClass: "split-line",
      });
      const targets = splitBy === "chars" ? split.chars : split.words;
      el.style.visibility = "visible";

      gsap.from(targets, {
        yPercent: 120,
        opacity: 0,
        rotateZ: 2,
        duration: 0.9,
        ease: "expo.out",
        stagger,
        delay: trigger === "load" ? delay + 0.15 : 0,
        scrollTrigger:
          trigger === "view" ? { trigger: el, start: "top 85%" } : undefined,
      });
    }, el);

    return () => {
      split?.revert();
      ctx.revert();
    };
  }, [children, trigger, splitBy, stagger, delay]);

  return (
    <Tag ref={ref} className={`split-hidden ${className}`}>
      {children}
    </Tag>
  );
}
