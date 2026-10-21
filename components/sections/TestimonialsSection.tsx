"use client";

import React from "react";
import { TestimonialsData } from "@/types/estate";
import { Reveal, RevealStagger, RevealChild } from "@/components/animations/Reveal";

interface TestimonialsSectionProps {
  data: TestimonialsData;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ data }) => {
  const testimonials = data.items.slice(0, 3);

  return (
    <section className="bg-[#F7F4EE] py-16 sm:py-20 px-6 sm:px-8 lg:px-12 border-t border-[#E5DFD3]">
      <div className="max-w-7xl mx-auto">
        {/* Simple Centered Heading */}
        <Reveal className="text-center mb-12 sm:mb-14">
          <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#B8945A] block mb-2">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#171717] tracking-tight">
            What Our Clients Say
          </h2>
        </Reveal>

        {/* Simple 3-Column Testimonial Cards */}
        <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item) => (
            <RevealChild
              key={item.id}
              className="bg-white p-8 sm:p-9 border border-[#E5DFD3] hover:border-[#B8945A]/50 transition-all duration-300 shadow-[0_4px_20px_rgba(23,23,23,0.03)] flex flex-col justify-between"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-3.5 h-3.5 fill-[#B8945A] text-[#B8945A]"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="font-serif text-base sm:text-lg text-[#171717] leading-relaxed mb-8 font-normal italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Info */}
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
            </RevealChild>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
};
