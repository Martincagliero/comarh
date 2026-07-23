"use client";

/**
 * MobileMenu — overlay fullscreen con AnimatePresence.
 * Panel entra con clip-path/translate; links con stagger (staggerChildren).
 */
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useUI } from "@/lib/store";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};
const item = {
  hidden: { y: 60, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { ease: [0.16, 1, 0.3, 1] as const, duration: 0.6 } },
  exit: { y: 40, opacity: 0 },
};

export default function MobileMenu({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  const { menuOpen, closeMenu, openContact } = useUI();

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          className="fixed inset-0 z-[99] flex flex-col justify-center bg-navy-deep px-[clamp(1.25rem,5vw,5rem)] text-white"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.ul
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            className="flex flex-col gap-1"
          >
            {links.map((l) => (
              <motion.li key={l.href} variants={item}>
                <Link
                  href={l.href}
                  onClick={closeMenu}
                  className="block text-[clamp(2rem,9vw,3.5rem)] font-semibold uppercase tracking-tight"
                >
                  {l.label}
                </Link>
              </motion.li>
            ))}
            <motion.li variants={item}>
              <button
                onClick={openContact}
                className="block text-[clamp(2rem,9vw,3.5rem)] font-semibold uppercase tracking-tight text-green-light"
              >
                Contacto
              </button>
            </motion.li>
          </motion.ul>

          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            className="mt-12 flex flex-col gap-2 text-white/70"
          >
            <a href="mailto:contacto@consultoracomarh.com">contacto@consultoracomarh.com</a>
            <a
              href="https://instagram.com/consultora_comarh_sa"
              target="_blank"
              rel="noopener"
            >
              Instagram
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
