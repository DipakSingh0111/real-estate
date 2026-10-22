"use client";

import React, { useState } from "react";
import type { SectionProps, FaqQuestionItem } from "@/types/realestate.types";
import { Reveal } from "@/components/animations/Reveal";

export const FaqSection: React.FC<SectionProps.Faq> = ({ data }) => {
  const title = data?.heading?.main || "Frequently Asked Questions";
  const faqs = data?.list || [];

  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="section-shell relative bg-[#F7F4EE] py-16 sm:py-20 border-t border-[#E5DFD3]">
      <div className="section-container">
        
        <Reveal className="mb-12 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#171717] font-normal tracking-tight whitespace-nowrap">
            {title}
          </h2>
        </Reveal>

        
        <Reveal yOffset={40} delay={0.15}>
          <div className="border-t border-[#E5DFD3] divide-y divide-[#E5DFD3]">
            {faqs.map((faq: FaqQuestionItem) => {
              const isOpen = openId === faq.id;
              return (
                <div key={faq.id} className="py-5 sm:py-6 group">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between text-left cursor-pointer transition-colors duration-200"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-lg sm:text-xl lg:text-2xl text-[#171717] group-hover:text-[#B8945A] transition-colors pr-6 font-normal">
                      {faq.question}
                    </span>
                    <span
                      className={`text-xl sm:text-2xl text-[#B8945A] font-light transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pt-4 pr-12 text-sm sm:text-base text-[#737373] font-light leading-relaxed animate-fadeIn">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
