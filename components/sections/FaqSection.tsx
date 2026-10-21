"use client";

import React, { useState } from "react";
import defaultData from "@/data/properties.json";

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title?: string;
  faqs?: FaqItem[];
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  title = (defaultData as any).faqConfig?.title || "Frequently Asked Questions",
  faqs = ((defaultData as any).faqs || []) as FaqItem[],
}) => {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative bg-[#F7F4EE] py-14 sm:py-16 border-t border-[#E5DFD3]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#171717] font-normal tracking-tight whitespace-nowrap">
            {title}
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="divide-y divide-[#E5DFD3] border-y border-[#E5DFD3]">
          {faqs.map((faq: FaqItem, index: number) => {
            const isOpen = openId === faq.id;
            const itemNumber = String(index + 1).padStart(2, "0");

            return (
              <div
                key={faq.id}
                className={`transition-colors duration-300 ${
                  isOpen ? "bg-[#F7F4EE]" : "hover:bg-[#F2EEE5]/40"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left py-7 sm:py-8 flex items-start justify-between gap-6 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-start gap-5 sm:gap-8">
                    <span
                      className={`text-xs font-mono tracking-widest mt-1 transition-colors ${
                        isOpen ? "text-[#B8945A] font-semibold" : "text-[#737373]"
                      }`}
                    >
                      {itemNumber}
                    </span>
                    <div>
                      <span className="block text-[10px] uppercase tracking-[0.2em] text-[#B8945A] mb-1 font-semibold">
                        {faq.category}
                      </span>
                      <h3
                        className={`text-lg sm:text-xl font-serif leading-snug transition-colors ${
                          isOpen ? "text-[#171717]" : "text-[#171717]/80 hover:text-[#171717]"
                        }`}
                      >
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full border shrink-0 flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "border-[#B8945A] bg-[#B8945A] text-[#F7F4EE] rotate-45"
                        : "border-[#E5DFD3] text-[#171717] hover:border-[#B8945A]"
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-8 pt-0 pl-11 sm:pl-16 pr-4 sm:pr-12">
                      <p className="text-sm sm:text-base text-[#737373] leading-relaxed font-light">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
