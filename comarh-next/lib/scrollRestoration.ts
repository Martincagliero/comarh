/**
 * scrollRestoration — guarda la posición de scroll de cada ruta para poder
 * restaurarla al volver atrás (popstate), en vez de resetear siempre al tope.
 */
const positions = new Map<string, number>();
let isPopNavigation = false;

if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    isPopNavigation = true;
  });
}

export function saveScrollPosition(path: string, y: number) {
  positions.set(path, y);
}

export function getScrollPosition(path: string) {
  return positions.get(path);
}

// Se consume una sola vez: distingue "volver atrás/adelante" de una navegación normal (Link/push).
export function consumePopNavigation() {
  const was = isPopNavigation;
  isPopNavigation = false;
  return was;
}
