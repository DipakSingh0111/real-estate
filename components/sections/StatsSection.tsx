"use client";

import React, { useEffect, useRef, useState } from "react";
import { CounterStat } from "@/types/estate";
import defaultData from "@/data/properties.json";

const DEFAULT_LUXURY_STATS: CounterStat[] = [
  {
    id: "stat-1",
    prefix: "$",
    value: 2.4,
    suffix: "B+",
    label: "Private Portfolio",
    subLabel: "Off-market curated volume",
  },
  {
    id: "stat-2",
    value: 180,
    suffix: "+",
    label: "Trophy Sanctuaries",
    subLabel: "Verified architectural landmarks",
  },
  {
    id: "stat-3",
    value: 98,
    suffix: "%",
    label: "Confidentiality Rate",
    subLabel: "Strict NDA principal transactions",
  },
  {
    id: "stat-4",
    value: 16,
    suffix: "+",
    label: "Global Prime Enclaves",
    subLabel: "Mayfair, Como, Beverly Hills, Mumbai",
  },
];

interface StatsSectionProps {
  stats?: CounterStat[];
}

export const StatsSection: React.FC<StatsSectionProps> = ({
  stats = (defaultData as any).stats || DEFAULT_LUXURY_STATS,
}) => {
  const [counts, setCounts] = useState<{ [key: string]: number }>(() =>
    stats.reduce((acc: { [key: string]: number }, stat: CounterStat) => ({ ...acc, [stat.id]: 0 }), {})
  );

  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          stats.forEach((stat: CounterStat) => {
            const duration = 2000;
            const startTime = performance.now();

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeOutExpo =
                progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
              const currentVal =
                stat.value % 1 !== 0
                  ? parseFloat((easeOutExpo * stat.value).toFixed(1))
                  : Math.floor(easeOutExpo * stat.value);

              setCounts((prev) => ({
                ...prev,
                [stat.id]: currentVal,
              }));

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCounts((prev) => ({
                  ...prev,
                  [stat.id]: stat.value,
                }));
              }
            };

            requestAnimationFrame(animate);
          });
        }
      },
      { threshold: 0.25 }
    );

    const currentElem = sectionRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, [hasAnimated, stats]);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 my-6 sm:my-8 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full"
    >
      <div className="bg-[#F7F4EE] border border-[#E5DFD3] p-8 sm:p-10 shadow-[0_12px_40px_rgba(23,23,23,0.06)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-[#E5DFD3]">
          {stats.map((stat: CounterStat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center text-center justify-between py-6 sm:py-4 px-4 sm:px-6 h-full group"
            >
              {/* Number Container with Fixed Baseline */}
              <div className="h-16 flex items-center justify-center">
                <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171717] flex items-baseline tracking-tight">
                  {stat.prefix && (
                    <span className="text-[#B8945A] mr-0.5 text-2xl sm:text-3xl font-serif">
                      {stat.prefix}
                    </span>
                  )}
                  <span>{counts[stat.id] ?? 0}</span>
                  {stat.suffix && (
                    <span className="text-[#B8945A] text-xl sm:text-2xl font-serif ml-1">
                      {stat.suffix}
                    </span>
                  )}
                </div>
              </div>

              {/* Title & SubLabel Container with consistent vertical spacing */}
              <div className="flex flex-col items-center justify-center flex-1 my-2">
                <p className="text-xs sm:text-sm font-bold text-[#171717] uppercase tracking-[0.2em] min-h-[2.5rem] flex items-center justify-center text-center">
                  {stat.label}
                </p>

                <span className="mt-1 text-xs text-[#737373] font-light max-w-[200px] leading-relaxed min-h-[2rem] flex items-center justify-center text-center">
                  {stat.subLabel}
                </span>
              </div>

              {/* Bottom Gold Indicator */}
              <div className="w-6 h-[1.5px] bg-[#B8945A] mt-3 group-hover:w-12 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
