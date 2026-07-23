/* ============================================================
   COMARH S.A. — main.js
   Lenis smooth scroll + GSAP init + UI (header, reloj, modal,
   menú mobile, cursor, loader, back-to-top).
   ============================================================ */

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------------------------------------------------
   Lenis smooth scroll (sincronizado con GSAP ticker)
--------------------------------------------------------- */
let lenis = null;

function initLenis() {
  if (REDUCED || typeof Lenis === "undefined") return;
  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  if (typeof gsap !== "undefined") {
    lenis.on("scroll", () => {
      if (window.ScrollTrigger) ScrollTrigger.update();
    });
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
}

/* Scroll helper (usa Lenis si existe) */
function scrollTo(target, offset = 0) {
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.2 });
  } else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: REDUCED ? "auto" : "smooth" });
    else window.scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" });
  }
}

/* ---------------------------------------------------------
   Header: transparente -> sólido con blur al pasar 50px
--------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector(".header");
  if (!header) return;
  const onScroll = () => header.classList.toggle("is-solid", window.scrollY > 50);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------------------------------------------------------
   Reloj en vivo — Sunchales, Santa Fe
--------------------------------------------------------- */
function initClock() {
  const el = document.querySelector("[data-clock]");
  if (!el) return;
  const tick = () => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    el.textContent = `Sunchales, Santa Fe · ${hh}:${mm}:${ss} hs`;
  };
  tick();
  setInterval(tick, 1000);
}

/* ---------------------------------------------------------
   Anchors internos con smooth scroll (Explorar ↓, etc.)
--------------------------------------------------------- */
function initAnchors() {
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      const el = document.querySelector(id);
      if (el) { e.preventDefault(); scrollTo(el, -60); }
    });
  });
  document.querySelectorAll("[data-scroll-to]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      scrollTo(btn.getAttribute("data-scroll-to"), -60);
    });
  });
  const top = document.querySelector("[data-to-top]");
  if (top) top.addEventListener("click", (e) => { e.preventDefault(); scrollTo(0); });
}

/* ---------------------------------------------------------
   Menú mobile fullscreen (stagger de links con GSAP)
--------------------------------------------------------- */
function initMobileNav() {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".mobile-nav");
  if (!burger || !nav) return;
  const links = nav.querySelectorAll(".mobile-nav__links a > span");
  let open = false;

  const toggle = (state) => {
    open = state ?? !open;
    burger.classList.toggle("is-open", open);
    nav.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
    if (lenis) open ? lenis.stop() : lenis.start();

    if (typeof gsap !== "undefined" && !REDUCED) {
      if (open) {
        gsap.fromTo(nav, { yPercent: -100 }, { yPercent: 0, duration: 0.6, ease: "power4.out" });
        gsap.fromTo(links, { yPercent: 120 }, { yPercent: 0, duration: 0.6, stagger: 0.06, ease: "power4.out", delay: 0.15 });
      } else {
        gsap.to(nav, { yPercent: -100, duration: 0.5, ease: "power4.in" });
      }
    } else {
      nav.style.transform = open ? "translateY(0)" : "translateY(-100%)";
    }
  };

  burger.addEventListener("click", () => toggle());
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => toggle(false)));
}

/* ---------------------------------------------------------
   Modal de contacto (GSAP timeline entrada/salida)
--------------------------------------------------------- */
function initModal() {
  const modal = document.querySelector(".modal");
  if (!modal) return;
  const overlay = modal.querySelector(".modal__overlay");
  const panel = modal.querySelector(".modal__panel");
  const openers = document.querySelectorAll("[data-open-modal]");
  const closers = modal.querySelectorAll("[data-close-modal]");
  let tl = null;

  const build = () => {
    if (REDUCED || typeof gsap === "undefined") return null;
    return gsap.timeline({ paused: true })
      .set(modal, { visibility: "visible" })
      .to(overlay, { opacity: 1, duration: 0.4, ease: "power2.out" }, 0)
      .fromTo(panel, { opacity: 0, scale: 0.95, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: "power3.out" }, 0.05);
  };

  const open = () => {
    modal.classList.add("is-open");
    if (lenis) lenis.stop();
    document.body.style.overflow = "hidden";
    if (REDUCED || typeof gsap === "undefined") {
      overlay.style.opacity = 1; panel.style.opacity = 1; panel.style.transform = "none";
      return;
    }
    tl = tl || build();
    tl.play(0);
  };
  const close = () => {
    if (lenis) lenis.start();
    document.body.style.overflow = "";
    if (REDUCED || typeof gsap === "undefined" || !tl) {
      modal.classList.remove("is-open"); return;
    }
    tl.reverse().eventCallback("onReverseComplete", () => modal.classList.remove("is-open"));
  };

  openers.forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); open(); }));
  closers.forEach((b) => b.addEventListener("click", close));
  overlay.addEventListener("click", close);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.classList.contains("is-open")) close(); });

  /* Formulario (demo: sin backend) */
  const form = modal.querySelector(".form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      form.querySelectorAll(".field, .form__submit").forEach((el) => (el.style.display = "none"));
      modal.querySelector(".form__success")?.classList.add("is-visible");
      // TODO: conectar a un endpoint / servicio de email real.
    });
  }
}

/* ---------------------------------------------------------
   Cursor custom (solo desktop / puntero fino)
--------------------------------------------------------- */
function initCursor() {
  if (REDUCED || window.matchMedia("(hover: none)").matches) return;
  const cursor = document.createElement("div");
  cursor.className = "cursor";
  document.body.appendChild(cursor);
  let x = 0, y = 0, cx = 0, cy = 0;
  window.addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; });
  const loop = () => {
    cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  };
  loop();
  document.querySelectorAll("a, button, .card, .filter").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("is-hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("is-hover"));
  });
}

/* ---------------------------------------------------------
   Botones magnéticos
--------------------------------------------------------- */
function initMagnetic() {
  if (REDUCED || typeof gsap === "undefined" || window.matchMedia("(hover: none)").matches) return;
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const mx = e.clientX - (r.left + r.width / 2);
      const my = e.clientY - (r.top + r.height / 2);
      gsap.to(el, { x: mx * 0.3, y: my * 0.3, duration: 0.5, ease: "power3.out" });
    });
    el.addEventListener("mouseleave", () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" }));
  });
}

/* ---------------------------------------------------------
   Loader / curtain reveal
--------------------------------------------------------- */
function initLoader() {
  const loader = document.querySelector(".loader");
  if (!loader) return;
  const logo = loader.querySelector(".loader__logo");
  const done = () => { loader.remove(); document.body.classList.add("is-loaded"); };

  if (REDUCED || typeof gsap === "undefined") { done(); return; }
  if (lenis) lenis.stop();
  gsap.timeline({ onComplete: () => { if (lenis) lenis.start(); } })
    .to(logo, { opacity: 1, duration: 0.6, ease: "power2.out" })
    .to(logo, { opacity: 0, duration: 0.4, delay: 0.3 })
    .to(loader, { yPercent: -100, duration: 0.8, ease: "power4.inOut", onComplete: done }, "-=0.1");
}

/* ---------------------------------------------------------
   Boot
--------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  initLenis();
  initHeader();
  initClock();
  initAnchors();
  initMobileNav();
  initModal();
  initCursor();
  initMagnetic();
  initLoader();
  // animations.js expone window.initAnimations
  if (typeof window.initAnimations === "function") window.initAnimations();
});

window.__comarh = { scrollTo, get lenis() { return lenis; } };
