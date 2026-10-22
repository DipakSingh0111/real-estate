"use client";

import { useEffect } from "react";

/**
 * Ultra-smooth inertia momentum scrolling provider
 * Zero dependencies, works natively on top of requestAnimationFrame
 */
export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let isRunning = false;
    const ease = 0.085; // Luxurious damping factor

    const onWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest?.("textarea, input, [data-lenis-prevent], .no-smooth-scroll")) {
        return;
      }

      e.preventDefault();
      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
      targetY += e.deltaY * 0.9;
      targetY = Math.max(0, Math.min(targetY, maxScroll));

      if (!isRunning) {
        isRunning = true;
        requestAnimationFrame(updateScroll);
      }
    };

    const updateScroll = () => {
      const diff = targetY - currentY;
      currentY += diff * ease;

      if (Math.abs(diff) > 0.4) {
        window.scrollTo(0, Math.round(currentY));
        requestAnimationFrame(updateScroll);
      } else {
        currentY = targetY;
        window.scrollTo(0, Math.round(currentY));
        isRunning = false;
      }
    };

    const onScroll = () => {
      if (!isRunning) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <>{children}</>;
};
