"use client";

import React from "react";
import { motion } from "framer-motion";
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
  primaryCta = (defaultData as any).heroConfig?.primaryCta || {
    text: "Explore Collection",
    href: "/listings",
  },
  secondaryCta = (defaultData as any).heroConfig?.secondaryCta || {
    text: "Inquire Privately",
    href: "/contact",
  },
}) => {
  const heroImage = slides?.[0]?.image || "/images/day-city-view.jpg";
  const heroTitle = defaultData.hero?.title || slides?.[0]?.title || "DISCOVER YOUR DISTINCTIVE ADDRESS";
  const heroSubtitle = defaultData.hero?.subtitle || "Luxury Real Estate, Refined Living.";

  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden select-none bg-[#171717] pt-28 pb-16">
      {/* 1. Ultra-High-Resolution Architectural Background Image with Ambient Pan */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Aura Estates Luxury Living"
          className="w-full h-full object-cover object-center scale-100 transition-transform duration-[14000ms] hover:scale-105"
        />

        {/* Cinematic Vignette for Centered Contrast */}
        <div className="absolute inset-0 bg-black/35 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#171717]/85 to-transparent pointer-events-none" />
      </div>

      {/* 2. Centered Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
        {/* Majestic Centered Headline with Gold Highlight & Framer Motion entrance */}
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-[#F7F4EE] tracking-tight leading-[1.08] font-normal drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)] max-w-4xl"
        >
          Discover Your{" "}
          <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#B8945A] to-[#F7F4EE]">
            Distinctive
          </span>{" "}
          Address
        </motion.h1>
      </div>
    </section>
  );
};
