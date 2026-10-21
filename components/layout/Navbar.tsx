"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import defaultData from "@/data/properties.json";
import { NavLink, CtaButton } from "@/types/estate";

export interface NavbarProps {
  navLinks?: NavLink[];
  ctaButton?: CtaButton;
}

export const Navbar: React.FC<NavbarProps> = ({
  navLinks = defaultData.company.navLinks,
  ctaButton = defaultData.company.ctaButton,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-500 ${
        isScrolled
          ? "bg-[#171717]/95 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.35)] border-b border-[#262626]"
          : "bg-gradient-to-b from-[#171717]/80 via-[#171717]/40 to-transparent py-5 border-b border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Identity */}
        <div className="flex items-center justify-start">
          <a
            href="/"
            className="inline-flex items-center gap-3.5 group cursor-pointer"
          >
            <img
              src={(defaultData as any).company?.logo || "/images/Logo.png"}
              alt="Aura Estates Logo"
              className="h-10 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </a>
        </div>
        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {navLinks.map((link) => {
            const isActive =
              (link.href === "/" && pathname === "/") ||
              (link.href === "/contact" && pathname === "/contact") ||
              (link.href !== "/" && pathname === link.href);

            return (
              <a
                key={link.name}
                href={link.href}
                className={`group relative py-2 px-1 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-300 flex items-center ${
                  isActive
                    ? "text-[#B8945A]"
                    : "text-white/80 hover:text-white"
                }`}
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5">
                  {link.name}
                </span>

                {/* Animated Gold Underline Bar */}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#B8945A] to-[#E5DFD3] transition-all duration-300 ease-out ${
                    isActive
                      ? "w-full opacity-100"
                      : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                  }`}
                />

                {/* Soft ambient hover glow */}
                <span
                  className={`absolute inset-0 -z-10 rounded-sm bg-[#B8945A]/10 opacity-0 blur-sm transition-opacity duration-300 pointer-events-none ${
                    isActive ? "opacity-40" : "group-hover:opacity-80"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Right Gold CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center">
            <a
              href={ctaButton.href}
              className="px-6 sm:px-7 py-3 bg-[#B8945A] hover:bg-[#9E7D46] text-[#171717] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-lg flex items-center gap-2 group cursor-pointer"
            >
              <span>{ctaButton.text}</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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

          {/* Mobile Menu Hamburger Toggle */}
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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#171717] border-b border-[#262626] px-6 py-6 shadow-2xl animate-fadeIn">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive =
                (link.href === "/" && pathname === "/") ||
                (link.href === "/contact" && pathname === "/contact") ||
                (link.href !== "/" && pathname === link.href);

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`group flex items-center justify-between text-sm uppercase tracking-[0.2em] py-3.5 px-3 font-semibold transition-all duration-300 rounded-sm ${
                    isActive
                      ? "text-[#B8945A] bg-[#B8945A]/10 border-l-2 border-[#B8945A]"
                      : "text-white/80 hover:text-white hover:bg-white/5 hover:translate-x-1"
                  }`}
                >
                  <span>{link.name}</span>
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
