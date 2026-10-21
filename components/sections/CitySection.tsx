"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import defaultData from "@/data/properties.json";
import { CitySectionData } from "@/types/estate";

interface CitySectionProps {
  data?: CitySectionData;
}

interface CityCardProps {
  city: any;
  index: number;
  total: number;
  badge?: string;
  defaultCollection?: string;
  ctaText?: string;
}

const CityCardItem: React.FC<CityCardProps> = ({
  city,
  index,
  total,
  badge = "DESTINATION",
  defaultCollection = "Metropolitan Collection",
  ctaText = "Explore Estates",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cityQuery = city.slug || encodeURIComponent(city.name);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  // Smooth entry and stacking scale
  const scale = useTransform(scrollYProgress, [0, 1], [0.93, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.9, 1]);

  const topOffset = 100 + index * 26; // Luxury layered overlap stack

  return (
    <div
      ref={containerRef}
      className="sticky"
      style={{
        top: `${topOffset}px`,
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{ scale, opacity }}
        className="w-full origin-top"
      >
        <Link
          href={`/listings?city=${cityQuery}`}
          className="group block relative w-full aspect-[16/10] sm:aspect-[21/9] min-h-[380px] sm:min-h-[480px] lg:min-h-[520px] overflow-hidden border border-[#E5DFD3] shadow-[0_24px_60px_rgba(23,23,23,0.22)] bg-[#171717] cursor-pointer rounded-sm"
        >
          {/* Full High-Resolution City Image */}
          <img
            src={city.image}
            alt={city.name}
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-108"
            loading="lazy"
          />

          {/* Cinematic Overlap Gradients & Glass Border */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/95 via-[#171717]/40 to-black/30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#171717]/85 via-[#171717]/30 to-transparent pointer-events-none" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />

          {/* Top Badge: City Sequence & Index */}
          <div className="absolute top-6 sm:top-8 left-6 sm:left-10 z-10 flex items-center gap-3">
            <span className="font-serif text-lg sm:text-2xl text-[#B8945A] font-light">
              0{index + 1}
            </span>
            <span className="w-8 h-[1px] bg-[#B8945A]/70" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#F7F4EE]/90 font-medium bg-[#171717]/60 backdrop-blur-md px-2.5 py-1 border border-white/10">
              {badge}
            </span>
          </div>

          {/* Bottom Content Bar */}
          <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 z-10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8945A] font-semibold block mb-2">
                {city.collection || defaultCollection}
              </span>
              <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal group-hover:text-[#B8945A] transition-colors leading-tight">
                {city.name}
              </h3>
            </div>

            <div className="inline-flex items-center gap-3 px-7 sm:px-9 py-3.5 bg-[#B8945A] group-hover:bg-[#9E7D46] text-[#F7F4EE] text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-2xl group-hover:translate-x-1 shrink-0">
              <span>{ctaText}</span>
              <span>→</span>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
};

export const CitySection: React.FC<CitySectionProps> = ({
  data = defaultData.citySection,
}) => {
  const cities = data.cities || [];

  return (
    <section id="cities" className="relative bg-[#F7F4EE] py-16 sm:py-20 px-6 sm:px-8 lg:px-12 border-t border-[#E5DFD3]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#B8945A] block mb-3">
            {data.badge || "PRIME GLOBAL ENCLAVES"}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#171717] tracking-tight">
            {data.title || "Explore by City"}
          </h2>
        </div>

        {/* Animated Overlapping Cards Container */}
        <div className="relative pb-16 space-y-12 sm:space-y-16">
          {cities.map((city, index) => (
            <CityCardItem
              key={city.id || index}
              city={city}
              index={index}
              total={cities.length}
              badge={(data as any).cardBadge}
              defaultCollection={(data as any).cardCollection}
              ctaText={(data as any).ctaText}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

