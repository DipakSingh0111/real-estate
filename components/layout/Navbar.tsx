"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import type { SectionProps, LinkItem } from "@/types/realestate.types";

export const Navbar: React.FC<SectionProps.Header> = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const logoSrc = data?.logo?.src || "/images/Logo.png";
  const navLinks: LinkItem[] = data?.menu || [];
  const ctaButton = data?.cta ? { text: data.cta.label, href: data.cta.href } : { text: "Contact Us", href: "/contact" };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 ${
        isScrolled ? "pt-3 pb-2" : "pt-5 pb-3"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        
        <div className="relative rounded-full bg-[#171717]/95 border border-[#B8945A]/30 px-6 sm:px-8 py-2.5 sm:py-3 shadow-[0_16px_50px_rgba(0,0,0,0.6)] flex items-center justify-between transition-all duration-300">
          
          <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#B8945A]/50 to-transparent pointer-events-none" />

          
          <div className="flex items-center justify-start">
            <a
              href="/"
              className="inline-flex items-center gap-3.5 group cursor-pointer"
            >
              <img
                src={logoSrc}
                alt="Aura Estates Logo"
                className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </a>
          </div>

          
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {navLinks.map((link) => {
              const isActive =
                (link.href === "/" && pathname === "/") ||
                (link.href === "/contact" && pathname === "/contact") ||
                (link.href !== "/" && pathname === link.href);

              const label = link.label || link.name;
              return (
                <a
                  key={label}
                  href={link.href}
                  className={`group relative py-1.5 px-2 text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 flex items-center ${
                    isActive
                      ? "text-[#B8945A]"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5">
                    {label}
                  </span>

                  
                  <span
                    className={`absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-[#B8945A] to-[#E5DFD3] transition-all duration-300 ease-out ${
                      isActive
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center">
              <a
                href={ctaButton.href}
                className="px-6 py-2.5 rounded-full bg-[#B8945A] hover:bg-[#9E7D46] text-[#171717] text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(184,148,90,0.3)] hover:shadow-[0_6px_25px_rgba(184,148,90,0.5)] flex items-center gap-2 group cursor-pointer"
              >
                <span>{ctaButton.text}</span>
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>

            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 text-white/90 hover:text-[#B8945A] transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.75"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#171717] border-b border-[#262626] px-6 py-6 shadow-2xl animate-fadeIn">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive =
                (link.href === "/" && pathname === "/") ||
                (link.href === "/contact" && pathname === "/contact") ||
                (link.href !== "/" && pathname === link.href);

              const label = link.label || link.name;
              return (
                <a
                  key={label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group flex items-center justify-between text-sm uppercase tracking-[0.2em] py-3.5 px-3 font-semibold transition-all duration-300 rounded-sm ${
                    isActive
                      ? "text-[#B8945A] bg-[#B8945A]/10 border-l-2 border-[#B8945A]"
                      : "text-white/80 hover:text-white hover:bg-white/5 hover:translate-x-1"
                  }`}
                >
                  <span>{label}</span>
                  <span className={`text-xs transition-transform duration-300 ${isActive ? "text-[#B8945A]" : "text-white/30 group-hover:text-[#B8945A] group-hover:translate-x-1"}`}>
                    →
                  </span>
                </a>
              );
            })}

            <div className="pt-4 border-t border-[#262626]">
              <a
                href={ctaButton.href}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 bg-[#B8945A] hover:bg-[#9E7D46] text-[#171717] text-sm font-bold uppercase tracking-[0.2em] text-center block"
              >
                {ctaButton.text}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
