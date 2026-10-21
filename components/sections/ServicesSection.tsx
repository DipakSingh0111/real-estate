"use client";

import React from "react";
import Link from "next/link";
import defaultData from "@/data/properties.json";
import { ServicesPageData } from "@/types/estate";

export interface ServicesSectionProps {
  data?: ServicesPageData;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  data = defaultData.servicesPage as ServicesPageData,
}) => {
  return (
    <>
      {/* 1. Top Hero Section: Editorial Heading + Paragraphs + CTAs + Photo */}
      <section className="py-16 sm:py-20 px-6 sm:px-8 lg:px-12 border-b border-[#E5DFD3] bg-[#F7F4EE]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1.5px] bg-[#B8945A]" />
              <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-[#B8945A]">
                {data.badge || "Advisory Excellence"}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#171717] font-normal leading-[1.15] tracking-tight mb-4">
              {data.title}
            </h2>

            <p className="text-base sm:text-lg text-[#737373] leading-relaxed mb-4 font-light max-w-xl">
              {data.description}
            </p>
            <p className="text-sm text-[#737373]/80 leading-relaxed mb-8 max-w-xl font-light">
              {data.subDescription}
            </p>

            {/* CTAs */}
            <div className="flex items-center flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-7 py-3.5 bg-[#B8945A] hover:bg-[#9E7D46] text-[#F7F4EE] text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
              >
                Inquire Privately →
              </Link>

              <Link
                href="/listings"
                className="px-7 py-3.5 border border-[#171717] text-[#171717] hover:border-[#B8945A] hover:text-[#B8945A] text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
              >
                Explore Portfolio
              </Link>
            </div>
          </div>

          {/* Right Column: Clean Architectural Photography */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-lg aspect-[4/3] overflow-hidden border border-[#E5DFD3] bg-[#171717]">
              <img
                src={data.heroImage || "/images/real-estate-07.jpg"}
                alt={data.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Grid of 6 Specialized Services */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-[#F7F4EE]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1.5px] bg-[#B8945A]" />
              <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-[#B8945A]">
                Comprehensive Practice
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#171717] font-normal tracking-tight">
              Specialized Fiduciary Advisory
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.items?.map((item, idx) => (
              <div
                key={item.id || idx}
                className="p-8 bg-[#F7F4EE] border border-[#E5DFD3] hover:border-[#B8945A]/60 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="font-serif text-3xl text-[#B8945A] font-light block mb-4">
                    0{idx + 1}
                  </span>
                  <h3 className="font-serif text-2xl text-[#171717] font-normal mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#737373] leading-relaxed font-light mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5DFD3]">
                  <Link
                    href="/contact"
                    className="text-xs uppercase tracking-[0.2em] font-semibold text-[#171717] hover:text-[#B8945A] transition-colors inline-flex items-center gap-2"
                  >
                    <span>Consult Advisor</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
