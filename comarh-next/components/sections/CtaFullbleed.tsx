"use client";

/**
 * CtaFullbleed — CTA full-bleed con imagen de fondo (parallax GSAP) y overlay.
 * Reutilizable: recibe title y opcionalmente la imagen.
 */
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { useUI } from "@/lib/store";
import AnimatedText from "@/components/ui/AnimatedText";
import Button from "@/components/ui/Button";

export default function CtaFullbleed({
  title = "Los desafíos ambientales son estructurales. Nuestras soluciones, también.",
  image = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=70",
}: {
  title?: string;
  image?: string;
}) {
  const { openContact } = useUI();
  const imgRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !imgRef.current) return;
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: imgRef.current!.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section className="relative overflow-hidden py-[clamp(4rem,10vw,9rem)] text-center text-white">
      <div ref={imgRef} className="absolute inset-[-8%_0] -z-20 h-[116%] w-full">
        <Image src={image} alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-green-dark/70 to-navy-deep/85" />

      <div className="mx-auto w-full max-w-[1440px] px-[clamp(1.25rem,5vw,5rem)]">
        <AnimatedText as="h2" className="h2-fluid mx-auto max-w-[20ch] text-white">
          {title}
        </AnimatedText>
        <div className="mt-10 flex justify-center">
          <Button variant="light" onClick={openContact}>
            Trabajemos juntos
          </Button>
        </div>
      </div>
    </section>
  );
}
