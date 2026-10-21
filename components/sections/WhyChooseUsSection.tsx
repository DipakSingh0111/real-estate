import React from "react";
import defaultData from "@/data/properties.json";

interface PillarItem {
  number: string;
  title: string;
  description: string;
}

interface WhyChooseUsSectionProps {
  title?: string;
  pillars?: PillarItem[];
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({
  title = (defaultData as any).whyChooseUs?.title || "Why Choose Aura Estates",
  pillars = ((defaultData as any).whyChooseUs?.pillars || []) as PillarItem[],
}) => {
  return (
    <section className="py-14 sm:py-16 px-6 sm:px-8 lg:px-12 bg-[#171717] text-[#F7F4EE] border-t border-[#262626]">
      <div className="max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.12]">
            {title}
          </h2>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="p-8 border border-[#262626] hover:border-[#B8945A]/50 bg-[#171717] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <span className="font-serif text-4xl text-[#B8945A] font-light block mb-6">
                  {pillar.number}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F7F4EE] font-normal mb-3 group-hover:text-[#B8945A] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm sm:text-base text-[#737373] leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>

              <div className="w-0 group-hover:w-12 h-[1.5px] bg-[#B8945A] transition-all duration-500 mt-8" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
