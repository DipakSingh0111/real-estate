"use client";

import React, { useState } from "react";
import defaultData from "@/data/properties.json";
import { FooterData } from "@/types/estate";

export interface FooterProps {
  data?: FooterData;
}

export const Footer: React.FC<FooterProps> = ({
  data = defaultData.footer,
}) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const enclaves = (data as any)?.topEnclaves || (data as any)?.enclaves || [
    { name: "Worli, Mumbai", href: "/listings?city=mumbai" },
    { name: "Golf Links, Delhi NCR", href: "/listings?city=delhi-ncr" },
    { name: "Indiranagar, Bangalore", href: "/listings?city=bangalore" },
    { name: "Jubilee Hills, Hyderabad", href: "/listings?city=hyderabad" },
    { name: "Assagao, Goa", href: "/listings?city=goa" },
  ];

  const navigation = data?.navigation || [
    { name: "Curated Estates", href: "/listings" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Faq's", href: "/faq" },
    { name: "Blog & Articles", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="relative bg-[#171717] text-[#F7F4EE] pt-14 sm:pt-16 pb-12 px-6 sm:px-8 lg:px-12 select-none border-t border-[#262626] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#262626]">
          {/* Column 1: Brand Info (col-span-6) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Logo */}
            <div className="flex items-center justify-start">
              <a href="/" className="inline-flex items-center group cursor-pointer -ml-1">
                <img
                  src={(defaultData as any).company?.logo || "/images/Logo.png"}
                  alt="Aura Estates Logo"
                  className="h-11 sm:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </a>
            </div>

            <p className="text-sm sm:text-base text-[#999999] leading-relaxed max-w-sm font-light">
              {data.description || "Curating distinctive palazzos, sky mansions, and private sanctuaries for the world's most discerning families."}
            </p>

            {/* Social Icons with High Visibility & Gold Accent */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 border border-[#3E3E3E] bg-[#222222] hover:border-[#B8945A] hover:bg-[#B8945A] text-[#E5DFD3] hover:text-[#171717] flex items-center justify-center transition-all duration-300 group shadow-sm"
              >
                <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 border border-[#3E3E3E] bg-[#222222] hover:border-[#B8945A] hover:bg-[#B8945A] text-[#E5DFD3] hover:text-[#171717] flex items-center justify-center transition-all duration-300 group shadow-sm"
              >
                <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 border border-[#3E3E3E] bg-[#222222] hover:border-[#B8945A] hover:bg-[#B8945A] text-[#E5DFD3] hover:text-[#171717] flex items-center justify-center transition-all duration-300 group shadow-sm"
              >
                <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 border border-[#3E3E3E] bg-[#222222] hover:border-[#B8945A] hover:bg-[#B8945A] text-[#E5DFD3] hover:text-[#171717] flex items-center justify-center transition-all duration-300 group shadow-sm"
              >
                <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links (col-span-3) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-[#B8945A]">
              Navigation
            </h4>
            <ul className="space-y-3.5">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm sm:text-[15px] text-[#A3A3A3] hover:text-[#F7F4EE] transition-colors duration-200 tracking-wide block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Top Enclaves (col-span-3) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-[#B8945A]">
              Prime Enclaves
            </h4>
            <ul className="space-y-3.5">
              {enclaves.map((enclave: any) => (
                <li key={enclave.name}>
                  <a
                    href={enclave.href}
                    className="text-sm sm:text-[15px] text-[#A3A3A3] hover:text-[#F7F4EE] transition-colors duration-200 tracking-wide block"
                  >
                    {enclave.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 flex items-center justify-center text-xs sm:text-sm text-[#888888] font-light text-center">
          <p>{data?.copyright || "© 2026 Aura Estates International. All Rights Reserved."}</p>
        </div>
      </div>
    </footer>
  );
};
