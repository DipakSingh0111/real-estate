"use client";

import React from "react";
import { motion } from "framer-motion";
import type { SectionProps } from "@/types/realestate.types";

export const HeroSection: React.FC<SectionProps.Hero> = ({ data }) => {
  const slides = data?.slides || [];
  const heroImage = slides?.[0]?.image || "/images/day-city-view.jpg";

  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden select-none bg-[#171717] pt-28 pb-16">
      
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Aura Estates Luxury Living"
          className="w-full h-full object-cover object-center scale-100 transition-transform duration-[14000ms] hover:scale-105"
        />

        
        <div className="absolute inset-0 bg-black/35 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#171717]/85 to-transparent pointer-events-none" />
      </div>

      
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
        
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-[#F7F4EE] tracking-tight leading-[1.08] font-normal drop-shadow-[0_4px_30px_rgba(0,0,0,0.7)] max-w-4xl"
        >
          {data?.heading?.main || "Discover Your"}{" "}
          {data?.heading?.highlight && (
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#B8945A] to-[#F7F4EE]">
              {data.heading.highlight}
            </span>
          )}{" "}
          {data?.heading?.middle || "Address"}
        </motion.h1>
      </div>
    </section>
  );
};
