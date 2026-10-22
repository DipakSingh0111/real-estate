"use client";

import React from "react";
import Link from "next/link";
import type { SectionProps, ServiceCardItem } from "@/types/realestate.types";

export const ServicesSection: React.FC<SectionProps.Services> = ({ data }) => {
  const items = data?.list || [];
  const badge = data?.badge || "WHAT WE DO";
  const title = data?.heading?.main || "Our Services";

  return (
    <section className="py-16 sm:py-20 px-6 sm:px-8 lg:px-12 bg-[#F7F4EE]">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-12 pb-6 border-b border-[#E5DFD3]">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-[1.5px] bg-[#B8945A]" />
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#B8945A]">
              {badge}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#171717] font-normal tracking-tight">
            {title}
          </h2>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {items.map((item: ServiceCardItem, idx: number) => (
            <div
              key={item.id || idx}
              className="bg-white border border-[#E5DFD3] hover:border-[#B8945A] hover:shadow-[0_16px_36px_rgba(184,148,90,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              
              <div className="relative aspect-[16/12] overflow-hidden bg-[#171717]">
                <img
                  src={item.image || "/images/modern-buildings.jpg"}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/40 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-3 left-3 bg-[#171717]/85 backdrop-blur-sm px-2.5 py-1 border border-[#B8945A]/40">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#B8945A]">
                    0{idx + 1} · {item.category || "SERVICE"}
                  </span>
                </div>
              </div>

              
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#171717] font-normal mb-2 group-hover:text-[#B8945A] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#737373] font-light leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5DFD3] flex items-center justify-between">
                  <Link
                    href={item.cta?.href || "/contact"}
                    className="text-xs uppercase tracking-[0.15em] font-semibold text-[#171717] group-hover:text-[#B8945A] transition-colors inline-flex items-center gap-2"
                  >
                    <span>{item.cta?.label || "Inquire"}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
