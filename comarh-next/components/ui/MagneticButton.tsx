"use client";

/**
 * MagneticButton — efecto "magnético": el botón se desplaza hacia el cursor
 * dentro de un radio, con springs de Framer Motion para retorno elástico.
 * Desactivado en touch y con prefers-reduced-motion.
 */
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  strength?: number;
};

export default function MagneticButton({
  children,
  className = "",
  onClick,
  type = "button",
  strength = 0.35,
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduce || window.matchMedia("(hover: none)").matches) return;
    const rect = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      data-cursor="hover"
      className={className}
    >
      {children}
    </motion.button>
  );
}
