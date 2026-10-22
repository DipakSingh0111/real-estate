"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";
import { ReactLenis, type LenisRef } from "lenis/react";
import "lenis/dist/lenis.css";

const LENIS_KEY = "__auraLenis" as const;

type AuraWindow = Window & {
  [LENIS_KEY]?: Lenis;
};

const lenisOptions = {
  lerp: 0.075,
  duration: 1.2,
  smoothWheel: true,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.2,
  syncTouch: false,
  autoRaf: true,
  anchors: true,
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
      duration: options?.duration ?? 1.2,
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
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    let attached = false;

    const bind = () => {
      const lenis = lenisRef.current?.lenis;
      if (!lenis) return false;

      (window as AuraWindow)[LENIS_KEY] = lenis;

      const ScrollTrigger = (window as Window & { ScrollTrigger?: any })
        .ScrollTrigger;
      if (ScrollTrigger && !attached) {
        lenis.on("scroll", ScrollTrigger.update);
        ScrollTrigger.refresh();
        attached = true;
      }
      return true;
    };

    bind();
    const timer = window.setTimeout(bind, 400);

    return () => {
      window.clearTimeout(timer);
      const lenis = lenisRef.current?.lenis;
      const ScrollTrigger = (window as Window & { ScrollTrigger?: any })
        .ScrollTrigger;
      if (lenis && ScrollTrigger) {
        lenis.off("scroll", ScrollTrigger.update);
      }
      const w = window as AuraWindow;
      if (w[LENIS_KEY] === lenis) {
        w[LENIS_KEY] = undefined;
      }
    };
  }, []);

  return (
    <ReactLenis root ref={lenisRef} options={lenisOptions}>
      {children}
    </ReactLenis>
  );
};
