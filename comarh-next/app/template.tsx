"use client";

/**
 * template.tsx — se re-monta en cada navegación. Aplica una transición
 * de entrada suave (fade + slide up) a cada página. Patrón: page transition.
 * También resetea el scroll (nativo + Lenis) al tope en cada cambio de ruta,
 * porque el scroll virtual de Lenis no se reinicia solo al navegar.
 */
import { useEffect } from "react";
import { motion } from "motion/react";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
