"use client";

/**
 * ContactModal — panel lateral (AnimatePresence).
 * - Backdrop con blur (fade), panel entra desde la derecha (ease [0.76,0,0.24,1]).
 * - React Hook Form + Zod (validación en tiempo real).
 * - Éxito animado: check SVG dibujado con motion path (pathLength).
 * - Cierra con Escape / click en backdrop. Bloquea el scroll de Lenis.
 */
import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUI } from "@/lib/store";

const schema = z.object({
  nombre: z.string().min(2, "Ingresá tu nombre"),
  apellido: z.string().min(2, "Ingresá tu apellido"),
  email: z.string().email("Email inválido"),
  mensaje: z.string().min(10, "Contanos un poco más (mín. 10 caracteres)"),
});
type FormData = z.infer<typeof schema>;

const panel = {
  hidden: { x: "100%" },
  show: { x: 0 },
  exit: { x: "100%" },
};

export default function ContactModal() {
  const { contactOpen, closeContact } = useUI();
  const reduce = useReducedMotion();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

  // Escape + bloqueo de scroll (Lenis)
  useEffect(() => {
    if (!contactOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeContact();
    document.addEventListener("keydown", onKey);
    window.__lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      window.__lenis?.start();
      document.body.style.overflow = "";
    };
  }, [contactOpen, closeContact]);

  const onSubmit = async (data: FormData) => {
    // Arma el mail y abre el cliente de correo del usuario (no se envía nada desde acá)
    const subject = encodeURIComponent(`Consulta desde la web — ${data.nombre} ${data.apellido}`);
    const body = encodeURIComponent(
      `Nombre: ${data.nombre} ${data.apellido}\nEmail: ${data.email}\n\nMensaje:\n${data.mensaje}`
    );
    window.location.href = `mailto:contacto@consultoracomarh.com?subject=${subject}&body=${body}`;
  };

  const close = () => {
    closeContact();
    setTimeout(() => reset(), 300);
  };

  const field =
    "w-full rounded bg-bg-alt px-3.5 py-2.5 text-navy outline-none border border-line focus:border-green-dark transition-colors sm:py-3";

  return (
    <AnimatePresence>
      {contactOpen && (
        <div className="fixed inset-0 z-[200]">
          <motion.div
            className="absolute inset-0 bg-navy-deep/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.div
            className="absolute right-0 top-0 flex h-full w-full max-w-[560px] flex-col overflow-y-auto overscroll-contain bg-white p-[clamp(1.25rem,4vw,2.75rem)]"
            data-lenis-prevent
            variants={reduce ? undefined : panel}
            initial={reduce ? { opacity: 0 } : "hidden"}
            animate={reduce ? { opacity: 1 } : "show"}
            exit={reduce ? { opacity: 0 } : "exit"}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={close}
              aria-label="Cerrar"
              className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-line transition-colors hover:bg-navy hover:text-white"
            >
              ✕
            </button>

            <AnimatePresence mode="wait">
              {isSubmitSuccessful ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-1 flex-col items-center justify-center text-center"
                >
                  <svg width="72" height="72" viewBox="0 0 72 72" className="mb-6">
                    <motion.circle
                      cx="36" cy="36" r="33" fill="none"
                      stroke="#4ca22f" strokeWidth="3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    <motion.path
                      d="M22 37 L32 47 L51 26" fill="none"
                      stroke="#4ca22f" strokeWidth="4"
                      strokeLinecap="round" strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
                    />
                  </svg>
                  <h2 className="text-2xl">¡Listo!</h2>
                  <p className="mt-2 text-navy/70">
                    Se abrió tu programa de correo con el mensaje listo. Solo falta que lo envíes desde ahí.
                  </p>
                  <button onClick={close} className="mt-8 text-green-dark underline underline-offset-4">
                    Cerrar
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" exit={{ opacity: 0 }}>
                  <h2 className="mb-1.5 text-[clamp(1.2rem,3.5vw,2.1rem)] sm:mb-3">
                    Trabajemos juntos: profesional, cercano y a medida.
                  </h2>
                  <p className="mb-4 text-sm text-navy/70 sm:mb-7 sm:text-base">
                    Nos asociamos con empresas, municipios, ONGs y particulares
                    para desarrollar proyectos ambientales y de recursos hídricos
                    con rigor técnico. Contanos tu proyecto.
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2.5 sm:gap-4" noValidate>
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-4">
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-navy/70">Nombre *</label>
                        <input className={field} {...register("nombre")} />
                        {errors.nombre && <p className="mt-1 text-xs text-red-600">{errors.nombre.message}</p>}
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-navy/70">Apellido *</label>
                        <input className={field} {...register("apellido")} />
                        {errors.apellido && <p className="mt-1 text-xs text-red-600">{errors.apellido.message}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-navy/70">Email *</label>
                      <input type="email" className={field} {...register("email")} />
                      {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-navy/70">Mensaje *</label>
                      <textarea rows={3} className={`${field} resize-y`} {...register("mensaje")} />
                      {errors.mensaje && <p className="mt-1 text-xs text-red-600">{errors.mensaje.message}</p>}
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative mt-1 inline-flex items-center gap-2 justify-self-start overflow-hidden rounded-full border border-navy bg-navy px-6 py-2.5 text-[0.8rem] font-medium uppercase tracking-[0.04em] text-white disabled:opacity-70 sm:py-3"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                          Abriendo…
                        </>
                      ) : (
                        <>Enviar por mail <span className="transition-transform group-hover:translate-x-1">→</span></>
                      )}
                    </button>
                  </form>

                  <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-4 text-sm sm:mt-7 sm:gap-y-4 sm:pt-6">
                    <span>
                      <b>Email:</b>{" "}
                      <a href="mailto:contacto@consultoracomarh.com" className="text-green-dark">
                        contacto@consultoracomarh.com
                      </a>
                    </span>
                    <span>
                      <b>Teléfono:</b>{" "}
                      <a href="tel:+5493493417640" className="text-green-dark">
                        +54 9 3493 41-7640
                      </a>
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
