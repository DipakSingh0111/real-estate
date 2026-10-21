"use client";

import React, { useState, useEffect, useCallback } from "react";
import { HeroSlide } from "@/types/estate";
import defaultData from "@/data/properties.json";

interface HeroSectionProps {
  slides: HeroSlide[];
  badge?: string;
  primaryCta?: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  slides,
  badge = (defaultData as any).heroConfig?.badge ||
    "Private Architecture & Estates",
  primaryCta = (defaultData as any).heroConfig?.primaryCta || {
    text: "Explore Collection",
    href: "#listings",
  },
  secondaryCta = (defaultData as any).heroConfig?.secondaryCta || {
    text: "Inquire Privately",
    href: "/contact",
  },
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section
      className="relative w-full h-[100vh] min-h-[560px] max-h-screen overflow-hidden select-none bg-[#171717]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id || idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide
              ? "opacity-100 z-10 scale-100"
              : "opacity-0 z-0 pointer-events-none scale-105"
          }`}
          style={{
            transitionProperty: "opacity, transform",
            transitionDuration: "1200ms",
          }}
        >
          <img
            src={slide.image}
            alt={slide.title || "Luxury Property"}
            className="w-full h-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/40 to-black/40" />
        </div>
      ))}

      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-20 sm:pb-24 md:pb-28 lg:pb-32 px-6 sm:px-8 lg:px-12 pointer-events-none">
        <div className="max-w-7xl mx-auto w-full pointer-events-none">
          <div className="max-w-3xl pointer-events-auto">
            {badge && (
              <div className="hidden items-center gap-3 mb-3 sm:mb-4">
                <span className="w-8 h-[1px] bg-[#B8945A]" />
                <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-[#B8945A]">
                  {badge}
                </span>
              </div>
            )}

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F7F4EE] tracking-tight leading-[1.08] mb-6 sm:mb-8 font-normal">
              {slides[currentSlide]?.title ||
                "Discover Your Distinctive Address"}
            </h1>

            <div className="flex items-center gap-4">
              <a
                href={primaryCta.href}
                className="px-7 py-3.5 bg-[#B8945A] hover:bg-[#9E7D46] text-[#171717] text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-lg pointer-events-auto"
              >
                {primaryCta.text}
              </a>
              <a
                href={secondaryCta.href}
                className="px-7 py-3.5 bg-transparent hover:bg-white/10 text-[#F7F4EE] text-[11px] font-medium uppercase tracking-[0.2em] border border-white/30 hover:border-white transition-all duration-300 pointer-events-auto"
              >
                {secondaryCta.text}
              </a>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 border border-white/20 bg-[#171717]/40 hover:bg-[#B8945A] text-white hover:text-[#171717] hover:border-[#B8945A] backdrop-blur-sm flex items-center justify-center transition-all duration-300 cursor-pointer"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 border border-white/20 bg-[#171717]/40 hover:bg-[#B8945A] text-white hover:text-[#171717] hover:border-[#B8945A] backdrop-blur-sm flex items-center justify-center transition-all duration-300 cursor-pointer"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Minimal Gold Progress Lines */}
      <div className="absolute bottom-6 right-6 sm:right-12 z-30 flex items-center gap-2.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-500 cursor-pointer ${
              idx === currentSlide
                ? "w-8 h-[2px] bg-[#B8945A]"
                : "w-3 h-[2px] bg-white/40 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
};
