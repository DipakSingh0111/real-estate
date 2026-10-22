"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const LENIS_KEY = "__auraLenis" as const;

type AuraWindow = Window & {
  [LENIS_KEY]?: Lenis;
};

function getLenis(): Lenis | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as AuraWindow)[LENIS_KEY];
}

/** Smooth scroll helper — uses Lenis when available */
export function smoothScrollTo(
  target: number | string | HTMLElement,
  options?: { offset?: number; duration?: number; immediate?: boolean }
) {
  if (typeof window === "undefined") return;

  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target, {
      offset: options?.offset ?? 0,
      duration: options?.duration ?? 1.1,
      immediate: options?.immediate ?? false,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    return;
  }

  const top =
    typeof target === "number"
      ? target
      : typeof target === "string"
        ? (document.querySelector(target)?.getBoundingClientRect().top ?? 0) +
          window.scrollY
        : target.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({
    top: top + (options?.offset ?? 0),
    behavior: options?.immediate ? "auto" : "smooth",
  });
}

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.15,
      syncTouch: false,
      autoRaf: true,
      anchors: true,
    });

    (window as AuraWindow)[LENIS_KEY] = lenis;

    return () => {
      lenis.destroy();
      const w = window as AuraWindow;
      if (w[LENIS_KEY] === lenis) {
        w[LENIS_KEY] = undefined;
      }
    };
  }, []);

  return <>{children}</>;
};
