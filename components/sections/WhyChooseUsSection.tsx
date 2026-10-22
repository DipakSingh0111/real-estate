"use client";

import React from "react";
import type { SectionProps, WhyChooseUsItem } from "@/types/realestate.types";
import { Reveal, RevealStagger, RevealChild } from "@/components/animations/Reveal";

export const WhyChooseUsSection: React.FC<SectionProps.WhyChooseUs> = ({ data }) => {
  const title = data?.heading?.main || "Why Choose US";
  const luxuryPillars = data?.list || [];

  return (
    <section className="py-16 sm:py-20 px-6 sm:px-8 lg:px-12 bg-[#F7F4EE] text-[#171717] border-t border-[#E5DFD3]">
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-12 sm:mb-14 text-center sm:text-left">
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#171717] tracking-tight leading-[1.08]">
            {title}
          </h2>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {luxuryPillars.map((item: WhyChooseUsItem) => (
            <RevealChild
              key={item.number}
              className="group flex flex-col justify-between"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#171717] mb-6 border border-[#E5DFD3] group-hover:border-[#B8945A]/60 shadow-[0_8px_30px_rgba(23,23,23,0.06)] transition-all">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-transparent to-transparent opacity-50 pointer-events-none" />

                <div className="absolute inset-3 border border-[#B8945A]/0 group-hover:border-[#B8945A]/60 transition-all duration-700 pointer-events-none" />
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#171717] font-normal mb-2 group-hover:text-[#B8945A] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#737373] font-light leading-relaxed line-clamp-2">
                  {item.tagline}
                </p>
              </div>
            </RevealChild>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
};
