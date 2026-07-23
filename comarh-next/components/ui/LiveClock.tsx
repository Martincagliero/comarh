"use client";

/**
 * LiveClock — reloj en vivo con ubicación, actualizado cada segundo.
 */
import { useEffect, useState } from "react";

export default function LiveClock({ className = "" }: { className?: string }) {
  const [time, setTime] = useState<string>("--:--:--");

  useEffect(() => {
    const tick = () => {
      const n = new Date();
      const p = (v: number) => String(v).padStart(2, "0");
      setTime(`${p(n.getHours())}:${p(n.getMinutes())}:${p(n.getSeconds())}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      Sunchales, Santa Fe · {time} hs
    </span>
  );
}
