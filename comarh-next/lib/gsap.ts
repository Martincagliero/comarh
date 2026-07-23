/**
 * Config global de GSAP.
 * Registra ScrollTrigger una sola vez y expone defaults de ease/duration
 * consistentes con el "feel" premium (expo-out).
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: "power4.out", duration: 0.9 });
  registered = true;
}

export { gsap, ScrollTrigger, SplitText };
