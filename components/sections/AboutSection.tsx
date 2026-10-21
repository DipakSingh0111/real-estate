import React from "react";
import defaultData from "@/data/properties.json";

export interface AboutSectionProps {
  data?: typeof defaultData.about;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  data = defaultData.about,
}) => {
  return (
    <section className="py-14 sm:py-16 px-6 sm:px-8 lg:px-12 bg-[#F7F4EE] border-t border-[#E5DFD3]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Architectural Imagery Collage */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-[4/3] overflow-hidden border border-[#E5DFD3] shadow-[0_12px_40px_rgba(23,23,23,0.06)]">
            <img
              src={data.image}
              alt={data.imageAlt}
              className="w-full h-full object-cover img-zoom"
            />
          </div>

          {/* Floating Subtle Stats Box */}
          <div className="absolute -bottom-8 -right-4 sm:-right-8 bg-[#171717] text-[#F7F4EE] p-6 sm:p-8 border border-[#B8945A]/40 max-w-[260px] shadow-2xl hidden sm:block">
            <span className="font-serif text-3xl sm:text-4xl text-[#B8945A] block font-normal">
              {data.statValue}
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#737373] mt-1 block">
              {data.statLabel}
            </span>
          </div>
        </div>

        {/* Right Column: Editorial Philosophy */}
        <div className="lg:col-span-6 space-y-6">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#171717] tracking-tight leading-[1.12]">
            {data.title}
          </h2>

          <p className="text-base sm:text-lg text-[#737373] leading-relaxed font-light">
            {data.paragraph1}
          </p>

          <p className="text-base sm:text-lg text-[#737373] leading-relaxed font-light">
            {data.paragraph2}
          </p>

          {/* Key Pillars */}
          <div className="grid grid-cols-2 gap-8 pt-6 border-t border-[#E5DFD3]">
            {data.pillars.map((pillar, idx) => (
              <div key={idx}>
                <span className="font-serif text-2xl sm:text-3xl text-[#171717] block font-normal">
                  {pillar.title}
                </span>
                <p className="text-sm sm:text-base text-[#737373] mt-2 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <a
              href={data.ctaLink}
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#171717] hover:bg-[#B8945A] text-[#F7F4EE] hover:text-[#171717] text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300"
            >
              <span>{data.ctaText}</span>
              <span className="text-[#B8945A]">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
