import React from "react";
import Link from "next/link";
import { PropertyListing } from "@/types/estate";
import defaultData from "@/data/properties.json";
import { Reveal } from "@/components/animations/Reveal";

interface FeaturedListingsProps {
  title?: string;
  listings?: PropertyListing[];
  footerCredit?: string;
}

export const FeaturedListings: React.FC<FeaturedListingsProps> = ({
  title = (defaultData as any).featuredListingsConfig?.title || defaultData.featuredListings.title || "Featured Luxury Listings",
  listings = defaultData.featuredListings.items,
}) => {
  const featuredItem = listings[0] || {
    title: "The Amalfi Coast Palazzo",
    price: "₹1.45 Cr",
    location: "Amalfi Coast, Italy",
    image: "/images/real-estate-01.jpg",
    features: ["6 Beds", "8 Baths", "Infinity Pool", "Helipad"],
  };

  return (
    <section id="listings" className="bg-[#F7F4EE] py-16 sm:py-20 px-6 sm:px-8 lg:px-12 border-t border-[#E5DFD3]">
      <div className="max-w-7xl mx-auto">
        {/* Top Centered Title */}
        <Reveal className="text-center mb-12 sm:mb-14">
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#171717] tracking-tight">
            {title}
          </h2>
        </Reveal>

        {/* Full-width / Cinematic Image Container with View More Overlay */}
        <Reveal yOffset={40} delay={0.15}>
          <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] min-h-[420px] sm:min-h-[520px] lg:min-h-[600px] overflow-hidden border border-[#E5DFD3] shadow-[0_20px_50px_rgba(23,23,23,0.12)] group bg-[#171717]">
          {/* Main Cinematic High-Res Image */}
          <img
            src={featuredItem.image}
            alt={featuredItem.title}
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/90 via-[#171717]/30 to-black/20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#171717]/80 via-transparent to-transparent pointer-events-none" />

          {/* Bottom Left: Featured Details */}
          <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 z-10">
            <div className="max-w-xl text-[#F7F4EE]">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8945A] font-semibold block mb-2">
                Exclusive Waterfront Residence
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal leading-tight text-white mb-2">
                {featuredItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 font-light flex items-center gap-2">
                <span>{featuredItem.location}</span>
                <span>•</span>
                <span className="text-[#B8945A] font-serif text-base sm:text-lg">{featuredItem.price}</span>
              </p>
            </div>

            {/* View More Button */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/listings"
                className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 bg-[#B8945A] hover:bg-[#9E7D46] text-[#171717] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-2xl hover:shadow-[0_8px_30px_rgba(184,148,90,0.4)] group/btn cursor-pointer"
              >
                <span>View More</span>
                <span className="transition-transform duration-300 group-hover/btn:translate-x-1.5">→</span>
              </Link>
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
};
