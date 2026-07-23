"use client";

/**
 * Cursor — punto custom que sigue al mouse con useMotionValue + useSpring.
 * Se agranda sobre elementos con [data-cursor="hover"]. Solo desktop.
 */
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

export default function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      setHover(!!t.closest('a, button, [data-cursor="hover"]'));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="cursor-dot pointer-events-none fixed left-0 top-0 z-[300] rounded-full bg-green-dark"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: hover ? 44 : 10,
        height: hover ? 44 : 10,
        backgroundColor: hover ? "rgba(76,162,47,0.25)" : "#2e7d32",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    />
  );
}
