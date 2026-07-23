"use client";

/**
 * Estado global de UI (modal de contacto + menú mobile) con Zustand.
 */
import { create } from "zustand";

interface UIState {
  contactOpen: boolean;
  menuOpen: boolean;
  openContact: () => void;
  closeContact: () => void;
  toggleMenu: () => void;
  closeMenu: () => void;
}

export const useUI = create<UIState>((set) => ({
  contactOpen: false,
  menuOpen: false,
  openContact: () => set({ contactOpen: true, menuOpen: false }),
  closeContact: () => set({ contactOpen: false }),
  toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),
  closeMenu: () => set({ menuOpen: false }),
}));

/** Helper de scroll suave usando Lenis si está disponible. */
export function scrollTo(target: string | number, offset = -60) {
  if (typeof window === "undefined") return;
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.2 });
  } else if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }
}
