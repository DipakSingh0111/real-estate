"use client";

import React, { useRef, useState, useEffect } from "react";
import defaultData from "@/data/properties.json";

interface CategoryItem {
  title: string;
  count: string;
  image: string;
  link: string;
}

interface PropertyCategoriesSectionProps {
  categories?: CategoryItem[];
}

export const PropertyCategoriesSection: React.FC<PropertyCategoriesSectionProps> = ({
  categories = ((defaultData as any).categories || []) as CategoryItem[],
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    return () => el.removeEventListener("scroll", checkScroll);
  }, [categories]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const clientWidth = scrollContainerRef.current.clientWidth;
    const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="py-14 sm:py-16 px-6 sm:px-8 lg:px-12 bg-[#F7F4EE] border-t border-[#E5DFD3]">
      <div className="max-w-7xl mx-auto">
        {/* Header with Title and Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#171717] tracking-tight">
              Explore by Category
            </h2>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
            <a
              href="/listings"
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#171717] hover:text-[#B8945A] transition-colors flex items-center gap-2 group"
            >
              <span>View All Categories</span>
              <span className="text-[#B8945A] group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>

            {/* Navigation Arrows for Mobile Slide */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Previous Category"
                className={`w-10 h-10 border border-[#E5DFD3] flex items-center justify-center transition-all ${
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
                aria-label="Next Category"
                className={`w-10 h-10 border border-[#E5DFD3] flex items-center justify-center transition-all ${
                  canScrollRight
                    ? "bg-[#F7F4EE] text-[#171717] hover:border-[#B8945A] hover:text-[#B8945A] cursor-pointer"
                    : "border-[#E5DFD3]/40 text-[#737373]/30 cursor-not-allowed"
                }`}
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Categories: 1 Card per View with Snap on Mobile, 4-Column Grid on Tablet/Desktop */}
        <div
          ref={scrollContainerRef}
          className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 snap-x snap-mandatory no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((cat) => (
            <a
              key={cat.title}
              href={cat.link}
              className="snap-start shrink-0 w-full sm:w-auto group relative aspect-[3/4] overflow-hidden border border-[#E5DFD3] block bg-[#171717]"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 opacity-90 group-hover:opacity-100"
              />

              {/* Charcoal Subtle Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/30 to-transparent" />

              {/* Bottom Card Content */}
              <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8945A] font-semibold block mb-1">
                  {cat.count}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#F7F4EE] font-normal leading-snug group-hover:text-[#B8945A] transition-colors">
                  {cat.title}
                </h3>
                <div className="w-0 group-hover:w-10 h-[1.5px] bg-[#B8945A] transition-all duration-500 mt-3" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
