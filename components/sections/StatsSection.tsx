"use client";

import React, { useEffect, useRef, useState } from "react";
import type { SectionProps, StatItem } from "@/types/realestate.types";

export const StatsSection: React.FC<SectionProps.Stats> = ({ data }) => {
  const statsList = data?.list || [];

  const [counts, setCounts] = useState<{ [key: string]: number }>(() =>
    statsList.reduce((acc: { [key: string]: number }, stat: StatItem) => ({ ...acc, [stat.id]: 0 }), {})
  );

  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          statsList.forEach((stat: StatItem) => {
            const duration = 2000;
            const steps = 60;
            const stepTime = duration / steps;
            const target = stat.value;
            const isDecimal = target % 1 !== 0;
            let current = 0;

            const timer = setInterval(() => {
              current += target / steps;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              setCounts((prev) => ({
                ...prev,
                [stat.id]: isDecimal
                  ? parseFloat(current.toFixed(1))
                  : Math.floor(current),
              }));
            }, stepTime);
          });
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, statsList]);

  return (
    <section
      ref={sectionRef}
      className="section-shell pt-8 pb-12 sm:pt-10 sm:pb-14 bg-[#F7F4EE] border-t border-[#E5DFD3]"
    >
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          {statsList.map((stat: StatItem) => (
            <div key={stat.id} className="flex flex-col">
              
              <div className="font-serif text-2xl sm:text-4xl lg:text-5xl text-[#171717] font-normal tracking-tight mb-1.5 flex items-baseline">
                {stat.prefix && (
                  <span className="text-xl sm:text-2xl text-[#B8945A] mr-0.5">
                    {stat.prefix}
                  </span>
                )}
                <span>{counts[stat.id] !== undefined ? counts[stat.id] : stat.value}</span>
                {stat.suffix && (
                  <span className="text-xl sm:text-2xl text-[#B8945A] ml-0.5">
                    {stat.suffix}
                  </span>
                )}
              </div>

              
              <span className="text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold text-[#171717] mb-1">
                {stat.label}
              </span>
              <p className="text-[11px] sm:text-xs text-[#737373] font-light leading-relaxed">
                {stat.subLabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
