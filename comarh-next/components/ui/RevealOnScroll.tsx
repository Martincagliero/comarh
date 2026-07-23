"use client";

/**
 * RevealOnScroll — fade + translateY genérico con Framer Motion (useInView).
 * Curva expo-out [0.16,1,0.3,1]. Respeta prefers-reduced-motion.
 */
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: keyof typeof motion;
};

export default function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  y = 40,
}: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
