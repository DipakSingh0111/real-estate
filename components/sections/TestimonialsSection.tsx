"use client";

import React, { useRef, useState, useEffect } from "react";
import { TestimonialsData } from "@/types/estate";

interface TestimonialsSectionProps {
  data: TestimonialsData;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ data }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

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
    const cardWidth = scrollContainerRef.current.firstElementChild?.clientWidth || 360;
    const scrollAmount = direction === "left" ? -(cardWidth + 24) : cardWidth + 24;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (!scrollContainerRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 20) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const cardWidth = scrollContainerRef.current.firstElementChild?.clientWidth || 360;
        scrollContainerRef.current.scrollBy({ left: cardWidth + 24, behavior: "smooth" });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="relative bg-[#F7F4EE] py-14 sm:py-16 px-6 sm:px-8 lg:px-12 border-t border-[#E5DFD3] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="gsap-header relative mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#171717] tracking-tight">
              What Our Clients Say
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous Testimonial"
              className={`w-11 h-11 border border-[#E5DFD3] flex items-center justify-center transition-all ${
                canScrollLeft
                  ? "bg-white text-[#171717] hover:bg-[#B8945A] hover:text-[#171717] hover:border-[#B8945A] cursor-pointer"
                  : "bg-transparent text-[#737373]/30 cursor-not-allowed"
              }`}
            >
              ‹
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Next Testimonial"
              className={`w-11 h-11 border border-[#E5DFD3] flex items-center justify-center transition-all ${
                canScrollRight
                  ? "bg-white text-[#171717] hover:bg-[#B8945A] hover:text-[#171717] hover:border-[#B8945A] cursor-pointer"
                  : "bg-transparent text-[#737373]/30 cursor-not-allowed"
              }`}
            >
              ›
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-6 pt-2 select-none no-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {data.items.map((item) => (
            <div
              key={item.id}
              className="snap-start shrink-0 w-[310px] sm:w-[380px] md:w-[420px] bg-white p-8 sm:p-9 border border-[#E5DFD3] hover:border-[#B8945A]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(item.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-3.5 h-3.5 fill-[#B8945A] text-[#B8945A]"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#737373] ml-2">
                    Verified Acquirer
                  </span>
                </div>

                <p className="font-serif text-lg text-[#171717] leading-relaxed mb-6 font-normal italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-5 border-t border-[#E5DFD3]">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 object-cover border border-[#E5DFD3]"
                />
                <div>
                  <h4 className="font-serif text-[#171717] font-medium text-base">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#737373] uppercase tracking-wider font-light">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
