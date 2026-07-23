"use client";

/**
 * template.tsx — se re-monta en cada navegación. Aplica una transición
 * de entrada suave (fade + slide up) a cada página. Patrón: page transition.
 */
import { motion } from "motion/react";

export default function Template({ children }: { children: React.ReactNode }) {
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
