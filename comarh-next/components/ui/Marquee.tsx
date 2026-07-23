"use client";

/**
 * Marquee — loop infinito horizontal. Duplica el array para un loop perfecto.
 * Pausa en hover vía CSS (.marquee-paused). Respeta reduced-motion.
 */
export default function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];
  return (
    <div className="marquee-paused overflow-hidden border-y border-line py-10">
      <div className="animate-marquee flex w-max gap-16">
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 whitespace-nowrap text-[clamp(1.2rem,2.5vw,1.8rem)] font-semibold text-navy/60"
          >
            <span className="text-green-light text-[0.7em]">◆</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
