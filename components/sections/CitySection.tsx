"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import defaultData from "@/data/properties.json";
import { CitySectionData } from "@/types/estate";

interface CitySectionProps {
  data?: CitySectionData;
}

export const CitySection: React.FC<CitySectionProps> = ({
  data = defaultData.citySection,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const containerWidth = scrollContainerRef.current.clientWidth;
    const scrollAmount = direction === "left" ? -containerWidth * 0.75 : containerWidth * 0.75;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      if (!scrollContainerRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 20) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const cardWidth = scrollContainerRef.current.firstElementChild?.clientWidth || 300;
        scrollContainerRef.current.scrollBy({ left: cardWidth + 20, behavior: "smooth" });
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section id="cities" className="relative bg-[#F7F4EE] py-14 sm:py-16 px-6 sm:px-8 lg:px-12 border-t border-[#E5DFD3] overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <div className="relative mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#171717] tracking-tight">
              Explore by City
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous City"
              className={`w-11 h-11 border border-[#E5DFD3] flex items-center justify-center transition-all ${
                canScrollLeft
                  ? "bg-[#F7F4EE] text-[#171717] hover:border-[#B8945A] hover:text-[#B8945A] cursor-pointer"
                  : "border-[#E5DFD3]/40 text-[#737373]/30 cursor-not-allowed"
              }`}
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Next City"
              className={`w-11 h-11 border border-[#E5DFD3] flex items-center justify-center transition-all ${
                canScrollRight
                  ? "bg-[#F7F4EE] text-[#171717] hover:border-[#B8945A] hover:text-[#B8945A] cursor-pointer"
                  : "border-[#E5DFD3]/40 text-[#737373]/30 cursor-not-allowed"
              }`}
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4 no-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {data.cities.map((city) => {
            const cityQuery = city.slug || encodeURIComponent(city.name);
            return (
              <Link
                key={city.id}
                href={`/listings?city=${cityQuery}`}
                className="snap-start shrink-0 w-full sm:w-[280px] lg:w-[300px] group overflow-hidden bg-[#171717] border border-[#E5DFD3] hover:border-[#B8945A] transition-all duration-300 block cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6 text-[#F7F4EE]">
                    <h3 className="font-serif text-2xl font-normal group-hover:text-[#B8945A] transition-colors">
                      {city.name}
                    </h3>
                    <span className="text-xs uppercase tracking-[0.2em] text-[#B8945A] mt-1 block font-semibold flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                      Explore Estates →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
