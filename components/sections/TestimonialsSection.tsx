"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import type { SectionProps, TestimonialReviewItem } from "@/types/realestate.types";
import { Reveal } from "@/components/animations/Reveal";

export const TestimonialsSection: React.FC<SectionProps.Testimonials> = ({ data }) => {
  const testimonials: TestimonialReviewItem[] = data?.list || [];
  const badge = data?.badge || "TESTIMONIALS";
  const title = data?.heading?.main || "What Our Clients Say";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (isPaused || testimonials.length <= itemsPerView) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, itemsPerView, testimonials.length, handleNext]);

  return (
    <section className="section-shell bg-[#F7F4EE] pt-14 pb-12 sm:pt-16 sm:pb-14 border-t border-[#E5DFD3] select-none">
      <div className="section-container">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-14 gap-6">
          <div>
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-medium text-[#B8945A] block mb-2">
              {badge}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#171717] tracking-tight">
              {title}
            </h2>
          </div>

          
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              onClick={handlePrev}
              aria-label="Previous Testimonial"
              className="w-11 h-11 border border-[#E5DFD3] bg-white text-[#171717] hover:bg-[#171717] hover:text-[#F7F4EE] hover:border-[#171717] transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Testimonial"
              className="w-11 h-11 border border-[#E5DFD3] bg-white text-[#171717] hover:bg-[#171717] hover:text-[#F7F4EE] hover:border-[#171717] transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        
        <Reveal direction="right" delay={0.15}>
          <div
            ref={sliderRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="overflow-hidden -mx-3 px-3 py-4"
          >
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {testimonials.map((item: TestimonialReviewItem) => (
              <div
                key={item.id}
                className="shrink-0 px-3.5"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                
                <div className="group h-full bg-white p-8 sm:p-10 border border-[#E5DFD3] shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(184,148,90,0.12)] hover:-translate-y-1.5 hover:border-[#B8945A]/60 transition-all duration-500 flex flex-col justify-between relative cursor-default">
                  
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#B8945A] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div>
                    
                    <div className="flex items-center gap-1.5 mb-6 text-[#B8945A] transition-transform duration-300 group-hover:scale-105 origin-left">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <span key={i} className="text-sm leading-none">
                          ★
                        </span>
                      ))}
                    </div>

                    
                    <p className="font-serif italic font-normal text-[15px] sm:text-[16px] text-[#262626] group-hover:text-[#171717] leading-relaxed mb-8">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  
                  <div className="pt-6 border-t border-[#E5DFD3] group-hover:border-[#E5DFD3]/80 flex items-center gap-4">
                    
                    <div className="relative w-12 h-12 rounded-none overflow-hidden shrink-0 bg-[#E5DFD3] border border-transparent group-hover:border-[#B8945A]/50 transition-colors duration-300">
                      <Image
                        src={item.avatar || "/images/team_01.avif"}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </div>

                    
                    <div className="flex flex-col">
                      <h4 className="font-serif text-[15px] font-medium text-[#171717] group-hover:text-[#B8945A] transition-colors duration-300 leading-snug">
                        {item.name}
                      </h4>
                      <span className="text-[10px] uppercase tracking-[0.14em] text-[#737373] mt-0.5 font-medium">
                        {item.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </Reveal>

        {maxIndex > 0 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-1.5 transition-all duration-300 cursor-pointer ${
                  currentIndex === index
                    ? "w-8 bg-[#B8945A]"
                    : "w-2.5 bg-[#E5DFD3] hover:bg-[#B8945A]/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
