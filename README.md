# COMARH S.A.S. — Sitio web

Réplica funcional del sistema de layout/animaciones de eleos.la, rebrandeada y en español para COMARH S.A.S. (consultoría ambiental y recursos hídricos).

## Cómo abrirlo en local

1. Instalá la extensión **Live Server** en VS Code (autor: Ritwick Dey).
2. Click derecho sobre `index.html` → **Open with Live Server**.
3. Se abre en `http://127.0.0.1:5500/`.

> Importante: abrilo con un servidor (Live Server), NO con doble click (`file://`),
> porque los módulos y algunas librerías CDN funcionan mejor sobre `http`.
> Las librerías (GSAP, ScrollTrigger, SplitType, Lenis, Swiper) se cargan por CDN,
> así que necesitás conexión a internet la primera vez.

## Estructura

```
index.html                         Home (hero, intro, carrusel, metodología, marquee, CTA)
nosotros.html                      Equivalente a /about
servicios.html                     Equivalente a /impact (bloques + contadores)
proyectos.html                     Listado con filtros
proyectos/estudio-impacto-ambiental.html   Detalle de proyecto (plantilla: duplicar por proyecto)
legales/privacidad.html
legales/terminos.html
assets/css/style.css               Sistema de diseño + componentes
assets/js/main.js                  Lenis, header, reloj, modal, menú mobile, cursor, loader
assets/js/animations.js            GSAP: SplitType, reveals, parallax, contadores, carrusel
assets/img/logo-comarh.svg         Logo placeholder (REEMPLAZAR por el PNG real)
```

## ✅ Qué tenés que reemplazar (buscá el comentario `REEMPLAZAR`)

1. **Logo** → `assets/img/logo-comarh.svg`: reemplazalo por tu PNG real con fondo transparente
   (o dejá el SVG y ajustalo). El logo se monta en header y footer.
2. **Paleta de colores** → `assets/css/style.css`, bloque `:root`. Muestreá los hex EXACTOS
   del logo real y actualizá `--verde-claro`, `--verde`, `--verde-oscuro`, `--azul-marino`.
   (Ahora hay valores placeholder aproximados a tu descripción.)
3. **Fotos** → todas son de Unsplash (libres, uso comercial) con temática de agua/ambiente.
   Reemplazalas por fotos reales de tus posts de Instagram / trabajos. Están marcadas con
   `<!-- REEMPLAZAR ... -->` en cada bloque.
4. **Proyectos** → las 6 tarjetas del carrusel (`index.html`) y del grid (`proyectos.html`).
   Duplicá `proyectos/estudio-impacto-ambiental.html` para crear el detalle de cada uno
   (cambiá el nombre de archivo = slug, ya enlazado desde las tarjetas).
5. **Clientes/aliados** → `index.html`, sección marquee: reemplazá `Cliente 1..6` por logos reales.
6. **Equipo** → `nosotros.html`: fotos, nombres y cargos reales.
7. **Contadores** → `servicios.html`: ajustá los `data-count` (proyectos, años, clientes, hectáreas).
8. **Formulario de contacto** → `assets/js/main.js` (`initModal`): hoy sólo muestra el mensaje de
   éxito. Conectalo a un backend/servicio de email real (Formspree, EmailJS, tu API, etc.).
9. **Textos legales** → `legales/privacidad.html` y `legales/terminos.html`: revisar con asesoría legal.

## Datos del cliente ya cargados

- Nombre: COMARH S.A.S.
- Email: contacto@consultoracomarh.com
- Instagram: instagram.com/consultora_comarh_sa
- Ubicación / reloj en vivo: Sunchales, Santa Fe

## Animaciones incluidas (checklist)

- Lenis smooth scroll sincronizado con GSAP ticker.
- SplitType en H1/H2 (`data-split` / `data-split="load"`).
- Parallax con scrub en hero/CTA/metodología (`data-parallax`).
- Reveal genérico (`data-reveal`) y en grupo con stagger (`data-reveal-group`).
- Botones magnéticos (`data-magnetic`) + fill animado en hover.
- Header transparente → sólido con blur al pasar 50px.
- Menú mobile fullscreen con stagger de links.
- Marquee infinito de clientes (pausa en hover).
- Modal de contacto con timeline GSAP (entrada/salida).
- Cursor custom (solo desktop).
- Contadores count-up (`data-count`).
- Loader / curtain reveal inicial.
- Back-to-top con Lenis.
- `prefers-reduced-motion`: desactiva animaciones agresivas.

## Notas de rendimiento

- Optimizá las imágenes reales a **WebP** y tamaños adecuados para llegar a Lighthouse 90+.
- El hero usa `fetchpriority="high"`; el resto `loading="lazy"`.
