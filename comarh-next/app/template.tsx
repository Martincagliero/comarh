"use client";

/**
 * template.tsx — se re-monta en cada navegación. Aplica una transición
 * de entrada suave (fade + slide up) a cada página.
 * Al navegar hacia adelante (Link/push) resetea el scroll al tope.
 * Al volver atrás (popstate) restaura la posición de scroll que tenía esa página.
 */
import { useEffect } from "react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { saveScrollPosition, getScrollPosition, consumePopNavigation } from "@/lib/scrollRestoration";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = window.__lenis;
    const isBack = consumePopNavigation();
    const saved = isBack ? getScrollPosition(pathname) : undefined;
    const target = saved ?? 0;

    if (lenis) lenis.scrollTo(target, { immediate: true });
    else window.scrollTo(0, target);

    const onScroll = () => saveScrollPosition(pathname, window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

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
