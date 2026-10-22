import React from "react";
import Link from "next/link";
import type { SectionProps } from "@/types/realestate.types";
import { Reveal } from "@/components/animations/Reveal";

export const FeaturedListings: React.FC<SectionProps.Listings> = ({ data }) => {
  const title = data?.heading?.main || "Featured Luxury Properties";
  const listings = data?.list || [];

  const featuredItem = listings[0] || {
    title: "The Amalfi Coast Palazzo",
    price: "₹1.45 Cr",
    location: "Amalfi Coast, Italy",
    image: "/images/real-estate-01.jpg",
    features: ["6 Beds", "8 Baths", "Infinity Pool", "Helipad"],
  };

  const badge = data?.badge || "Exclusive Waterfront Residence";
  const ctaLabel = data?.cta?.label || "Explore All Properties";
  const ctaHref = data?.cta?.href || "/listings";

  return (
    <section
      id="listings"
      className="section-shell bg-[#F7F4EE] pt-14 pb-8 sm:pt-16 sm:pb-10 border-t border-[#E5DFD3]"
    >
      <div className="section-container">
        <Reveal className="text-center mb-12 sm:mb-14">
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#171717] tracking-tight">
            {title}
          </h2>
        </Reveal>

        <Reveal yOffset={40} delay={0.15}>
          <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] min-h-[420px] sm:min-h-[520px] lg:min-h-[600px] overflow-hidden border border-[#E5DFD3] shadow-[0_20px_50px_rgba(23,23,23,0.12)] group bg-[#171717]">
            <img
              src={featuredItem.image}
              alt={featuredItem.title}
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/90 via-[#171717]/30 to-black/20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#171717]/80 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 z-10">
              <div className="max-w-xl text-[#F7F4EE]">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8945A] font-semibold block mb-2">
                  {badge}
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal leading-tight text-white mb-2">
                  {featuredItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-light flex items-center gap-2">
                  <span>{featuredItem.location}</span>
                  <span>•</span>
                  <span>{featuredItem.price}</span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={ctaHref}
                  className="px-6 sm:px-8 py-3 sm:py-3.5 bg-[#F7F4EE] hover:bg-[#B8945A] text-[#171717] hover:text-[#171717] text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-lg flex items-center gap-2 group/btn"
                >
                  <span>{ctaLabel}</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
