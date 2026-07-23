"use client";

/**
 * Button — pill con fill animado (slide-up del fondo verde en hover).
 * Envuelto en MagneticButton para el efecto magnético.
 * variant: "solid" (navy) | "light" (blanco sobre imágenes) | "ghost".
 */
import MagneticButton from "./MagneticButton";

type Variant = "solid" | "light" | "ghost";

const base =
  "group relative inline-flex items-center gap-2 overflow-hidden rounded-full border px-6 py-3 text-[0.8rem] font-medium uppercase tracking-[0.04em] transition-colors duration-400";

const variants: Record<Variant, string> = {
  solid: "border-navy bg-navy text-white",
  light: "border-white bg-white text-navy",
  ghost: "border-current bg-transparent text-current",
};

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "solid",
  arrow = "→",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  arrow?: string;
  className?: string;
}) {
  return (
    <MagneticButton
      onClick={onClick}
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {/* Capa de relleno que sube en hover */}
      <span className="absolute inset-0 -z-0 translate-y-full bg-green-dark transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
      <span className="relative z-10 transition-colors duration-400 group-hover:text-white">
        {children}
      </span>
      {arrow && (
        <span className="relative z-10 transition-transform duration-400 group-hover:translate-x-1 group-hover:text-white">
          {arrow}
        </span>
      )}
    </MagneticButton>
  );
}
