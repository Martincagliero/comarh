"use client";

import Image from "next/image";

/**
 * Marquee — loop infinito horizontal. Duplica el array para un loop perfecto.
 * Pausa en hover vía CSS (.marquee-paused). Respeta reduced-motion.
 */
export type MarqueeItem = {
  name: string;
  logo: string;
};

export default function Marquee({ items }: { items: MarqueeItem[] }) {
  const loop = [...items, ...items];
  return (
    <div className="marquee-paused overflow-hidden border-y border-line py-10">
      <div className="animate-marquee flex w-max items-center gap-16">
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex h-12 w-[clamp(6rem,10vw,9rem)] shrink-0 items-center justify-center grayscale opacity-70 transition hover:grayscale-0 hover:opacity-100"
          >
            <Image
              src={item.logo}
              alt={item.name}
              width={160}
              height={80}
              className="h-full w-full object-contain"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
