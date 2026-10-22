import React from "react";
import type { SectionProps } from "@/types/realestate.types";
import { Reveal } from "@/components/animations/Reveal";

export const AboutSection: React.FC<SectionProps.About> = ({ data, showStrip = true }) => {
  const badge = data?.badge || "OUR STORY";
  const title = data?.heading?.main || "About Us";
  const description = data?.description || "";
  const primaryCard = data?.primaryCard;
  const secondaryCard = data?.secondaryCard;
  const strip = data?.strip;
  const stripCtaLink = strip?.cta?.href || "/listings";
  const stripCtaText = strip?.cta?.label || "Explore";

  return (
    <section className="section-shell pt-8 pb-14 sm:pt-10 sm:pb-16 bg-[#F7F4EE] border-t border-[#E5DFD3]">
      <div className="section-container">
        
        <Reveal className="mb-12 sm:mb-14 pb-6 border-b border-[#E5DFD3]">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-[1.5px] bg-[#B8945A]" />
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#B8945A]">
              {badge}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171717] tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-[#737373] font-light max-w-2xl leading-relaxed">
            {description}
          </p>
        </Reveal>

        
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            <Reveal direction="left" className="md:col-span-7 flex flex-col">
              <div className="relative aspect-[16/11] md:aspect-auto md:min-h-[460px] h-full overflow-hidden border border-[#E5DFD3] group bg-[#171717]">
                <img
                  src={primaryCard?.image || "/images/modern-buildings.jpg"}
                  alt={primaryCard?.imageAlt || primaryCard?.title || "Aura Estates"}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-[#F7F4EE]">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8945A] font-semibold block mb-1">
                      {primaryCard?.tag}
                    </span>
                    <h3 className="font-serif text-2xl font-normal text-[#F7F4EE]">
                      {primaryCard?.title}
                    </h3>
                  </div>
                  <span className="font-serif text-3xl text-[#B8945A] font-light">
                    {primaryCard?.statValue}
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal
              direction="right"
              delay={0.15}
              className={`md:col-span-5 flex flex-col ${showStrip ? "gap-6 sm:gap-8 justify-between" : "h-full"}`}
            >
              <div
                className={`relative ${
                  showStrip
                    ? "aspect-[16/10]"
                    : "h-full min-h-[320px] md:min-h-[460px]"
                } overflow-hidden border border-[#E5DFD3] group bg-[#171717]`}
              >
                <img
                  src={secondaryCard?.image || "/images/real-estate-08.jpg"}
                  alt={secondaryCard?.imageAlt || secondaryCard?.title || "Architectural details"}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-[#F7F4EE]">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#B8945A] font-semibold block mb-1">
                    {secondaryCard?.tag}
                  </span>
                  <span className="font-serif text-xl sm:text-2xl font-normal block">
                    {secondaryCard?.title}
                  </span>
                </div>
              </div>

              {showStrip && strip && (
                <div className="p-7 bg-white border border-[#E5DFD3] flex items-center justify-between shadow-[0_4px_24px_rgba(23,23,23,0.04)]">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#737373] block mb-1">
                      {strip?.label}
                    </span>
                    <span className="font-serif text-xl sm:text-2xl text-[#171717] font-normal">
                      {strip?.title}
                    </span>
                  </div>
                  <a
                    href={stripCtaLink}
                    className="px-5 py-3 bg-[#171717] hover:bg-[#B8945A] text-[#F7F4EE] hover:text-[#171717] text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 shrink-0 cursor-pointer"
                  >
                    {stripCtaText}
                  </a>
                </div>
              )}
            </Reveal>
          </div>
      </div>
    </section>
  );
};
