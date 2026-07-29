"use client";

/**
 * Loader — cortina de intro. Se muestra una vez por sesión.
 * Letras de "COMARH" con rebote stagger + contador de progreso, sale con clip/translate (Motion + AnimatePresence).
 */
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const letters = "COMARH".split("");

export default function Loader() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("comarh-loaded")) return;
    setShow(true);
    document.body.style.overflow = "hidden";

    const duration = reduce ? 400 : 1600;
    const start = Date.now();
    const tick = setInterval(() => {
      setProgress(Math.min(100, Math.round(((Date.now() - start) / duration) * 100)));
    }, 40);

    const t = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("comarh-loaded", "1");
      document.body.style.overflow = "";
    }, duration);

    return () => {
      clearTimeout(t);
      clearInterval(tick);
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-navy-deep"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex" aria-hidden>
            {letters.map((l, i) => (
              <motion.span
                key={i}
                className="text-[clamp(2rem,8vw,6rem)] font-semibold tracking-[0.02em] text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [30, 0, -12, 0] }
                }
                transition={
                  reduce
                    ? { duration: 0.3, delay: i * 0.03 }
                    : {
                        duration: 1.1,
                        times: [0, 0.35, 0.6, 1],
                        ease: [0.16, 1, 0.3, 1],
                        delay: i * 0.06,
                      }
                }
              >
                {l}
              </motion.span>
            ))}
          </div>
          <motion.span
            className="font-mono text-sm tabular-nums text-white/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {String(progress).padStart(3, "0")}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

