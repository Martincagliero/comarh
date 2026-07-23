"use client";

/**
 * Loader — cortina de intro. Se muestra una vez por sesión.
 * Sale con clip/translate y stagger del wordmark (Motion + AnimatePresence).
 */
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export default function Loader() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("comarh-loaded")) return;
    setShow(true);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("comarh-loaded", "1");
      document.body.style.overflow = "";
    }, reduce ? 400 : 1600);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-deep"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.span
            className="text-[clamp(2rem,8vw,6rem)] font-semibold tracking-[0.02em] text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            COMARH
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
