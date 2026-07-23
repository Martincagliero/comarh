/* ============================================================
   COMARH S.A. — animations.js
   GSAP + ScrollTrigger + SplitType.
   SplitText de GSAP es de club premium -> usamos SplitType (MIT).
   Expone window.initAnimations(), llamada desde main.js.
   ============================================================ */

(function () {
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.initAnimations = function initAnimations() {
    if (typeof gsap === "undefined") return;
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    if (REDUCED) {
      // Todo visible, sin movimiento.
      document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-in"));
      return;
    }

    splitHeadings();
    revealBlocks();
    parallax();
    counters();
    initSwiper();

    // Recalcular tras cargar imágenes.
    window.addEventListener("load", () => window.ScrollTrigger && ScrollTrigger.refresh());
  };

  /* -------------------------------------------------------
     SplitType en H1/H2 marcados con [data-split]
     - hero (data-split="load"): entra al cargar.
     - resto (data-split): entra al viewport.
  ------------------------------------------------------- */
  function splitHeadings() {
    if (typeof SplitType === "undefined") return;

    document.querySelectorAll("[data-split]").forEach((el) => {
      const type = el.dataset.split; // "load" | "" (viewport)
      const split = new SplitType(el, { types: "lines,words", tagName: "span" });
      split.lines.forEach((line) => {
        const wrap = document.createElement("span");
        wrap.className = "line-mask";
        line.parentNode.insertBefore(wrap, line);
        wrap.appendChild(line);
      });

      const anim = {
        yPercent: 120,
        opacity: 0,
        rotateZ: 2,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.out",
      };

      if (type === "load") {
        gsap.from(split.words, { ...anim, delay: 0.2 });
      } else {
        gsap.from(split.words, {
          ...anim,
          scrollTrigger: { trigger: el, start: "top 82%" },
        });
      }
    });
  }

  /* -------------------------------------------------------
     Reveal genérico: opacity 0->1 + translateY 40->0
  ------------------------------------------------------- */
  function revealBlocks() {
    gsap.utils.toArray("[data-reveal]").forEach((el) => {
      const delay = parseFloat(el.dataset.delay || 0);
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", onEnter: () => el.classList.add("is-in") },
        }
      );
    });

    // Stagger en grupos [data-reveal-group] > hijos
    gsap.utils.toArray("[data-reveal-group]").forEach((group) => {
      gsap.fromTo(
        group.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: group, start: "top 82%" },
        }
      );
    });
  }

  /* -------------------------------------------------------
     Parallax vertical sutil (hero / CTA / method bg)
  ------------------------------------------------------- */
  function parallax() {
    if (!window.ScrollTrigger) return;
    gsap.utils.toArray("[data-parallax]").forEach((el) => {
      const amount = parseFloat(el.dataset.parallax || 8); // %
      gsap.fromTo(
        el,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: "none",
          scrollTrigger: { trigger: el.closest("section") || el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    });
  }

  /* -------------------------------------------------------
     Contadores count-up (data-count="120")
  ------------------------------------------------------- */
  function counters() {
    if (!window.ScrollTrigger) return;
    gsap.utils.toArray("[data-count]").forEach((el) => {
      const end = parseFloat(el.dataset.count);
      const prefix = el.dataset.prefix || "";
      const suffix = el.dataset.suffix || "";
      const obj = { v: 0 };
      gsap.to(obj, {
        v: end,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
        onUpdate: () => { el.textContent = prefix + Math.round(obj.v).toLocaleString("es-AR") + suffix; },
      });
    });
  }

  /* -------------------------------------------------------
     Carrusel de proyectos (Swiper con drag + autoplay)
  ------------------------------------------------------- */
  function initSwiper() {
    const node = document.querySelector(".projects .swiper");
    if (!node || typeof Swiper === "undefined") return;
    new Swiper(node, {
      slidesPerView: 1.15,
      spaceBetween: 20,
      grabCursor: true,
      speed: 700,
      autoplay: { delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true },
      breakpoints: {
        640: { slidesPerView: 2.15 },
        1024: { slidesPerView: 3.15 },
      },
      navigation: { nextEl: ".swiper-btn--next", prevEl: ".swiper-btn--prev" },
    });
  }

  /* -------------------------------------------------------
     Filtros de proyectos (grid) — página proyectos.html
  ------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    const filters = document.querySelectorAll(".filter");
    const cards = document.querySelectorAll(".grid-projects .card");
    if (!filters.length) return;
    filters.forEach((f) => {
      f.addEventListener("click", () => {
        filters.forEach((x) => x.classList.remove("is-active"));
        f.classList.add("is-active");
        const cat = f.dataset.filter;
        cards.forEach((c) => {
          const show = cat === "all" || c.dataset.cat === cat;
          c.classList.toggle("is-hidden", !show);
        });
        if (window.ScrollTrigger) ScrollTrigger.refresh();
      });
    });
  });
})();
