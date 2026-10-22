"use client";

import React from "react";
import Link from "next/link";
import type { SectionProps, CityEnclaveItem } from "@/types/realestate.types";

const CityCardItem: React.FC<SectionProps.CityCard> = ({
  city,
  index,
  total,
  badge = "DESTINATION",
  defaultCollection = "Metropolitan Collection",
  ctaText = "Explore Estates",
}) => {
  const cityQuery = city.slug || encodeURIComponent(city.name);

  const topOffset = 100 + index * 24;

  return (
    <div
      className="sticky w-full"
      style={{
        top: `${topOffset}px`,
        zIndex: index + 1,
      }}
    >
      <Link
        href={`/listings?city=${cityQuery}`}
        className="group block relative w-full aspect-[16/10] sm:aspect-[21/9] min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] overflow-hidden border border-[#E5DFD3] shadow-[0_24px_60px_rgba(0,0,0,0.35)] bg-[#171717] cursor-pointer rounded-sm"
      >
        
        <div className="absolute inset-0 bg-[#171717]">
          <img
            src={city.image}
            alt={city.name}
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </div>

        
        <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/95 via-[#171717]/35 to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#171717]/80 via-[#171717]/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />

        
        <div className="absolute top-6 sm:top-8 left-6 sm:left-10 z-10 flex items-center gap-3">
          <span className="font-serif text-lg sm:text-2xl text-[#B8945A] font-light">
            0{index + 1}
          </span>
          <span className="w-8 h-[1px] bg-[#B8945A]/70" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#F7F4EE]/90 font-medium bg-[#171717]/80 backdrop-blur-md px-2.5 py-1 border border-white/10">
            {badge}
          </span>
        </div>

        
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 bg-[#B8945A] group-hover:bg-[#9E7D46] text-[#F7F4EE] text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase transition-all duration-300 shadow-[0_14px_40px_rgba(0,0,0,0.6)] group-hover:scale-105 pointer-events-auto">
            <span>{ctaText}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </div>

        
        <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 z-10">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8945A] font-semibold block mb-2">
              {city.collection || defaultCollection}
            </span>
            <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal group-hover:text-[#B8945A] transition-colors leading-tight">
              {city.name}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export const CitySection: React.FC<SectionProps.Cities> = ({ data }) => {
  const cities = data?.list || [];
  const badge = data?.badge || "PRIME GLOBAL ENCLAVES";
  const title = data?.heading?.main || "Explore by City";

  return (
    <section
      id="cities"
      className="section-shell relative bg-[#F7F4EE] pt-14 pb-8 sm:pt-20 sm:pb-10 border-t border-[#E5DFD3]"
    >
      <div className="section-container">
        
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#B8945A] block mb-3">
            {badge}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#171717] tracking-tight">
            {title}
          </h2>
        </div>

        
        <div className="relative pb-6 sm:pb-8 space-y-16 sm:space-y-24">
          {cities.map((city: CityEnclaveItem, index: number) => (
            <CityCardItem
              key={city.id || index}
              city={city}
              index={index}
              total={cities.length}
              badge={data?.cardBadge || "DESTINATION"}
              defaultCollection={
                data?.cardCollection || "Metropolitan Collection"
              }
              ctaText={data?.cta?.label || data?.ctaText || "Explore Estates"}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
