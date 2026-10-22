"use client";

import React, { useState } from "react";
import type { SectionProps } from "@/types/realestate.types";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { RevealCard } from "@/components/animations/Reveal";
import { smoothScrollTo } from "@/components/ui/SmoothScroll";

export const ListingsGridWithPagination: React.FC<SectionProps.ListingsGrid> = ({
  listings,
  itemsPerPage = 6,
  initialCity = "all",
  availableCities = [],
  config,
}) => {
  const [selectedCity, setSelectedCity] = useState<string>(initialCity);
  const [currentPage, setCurrentPage] = useState(1);

  React.useEffect(() => {
    setSelectedCity(initialCity || "all");
    setCurrentPage(1);
  }, [initialCity]);

  const filteredListings = React.useMemo(() => {
    if (!selectedCity || selectedCity.toLowerCase() === "all") {
      return listings;
    }
    const target = selectedCity.toLowerCase().trim();
    return listings.filter((item) => {
      const itemCity = (item.city || "").toLowerCase().trim();
      const itemLoc = (item.location || "").toLowerCase().trim();
      const citySlug = (item.city || "").toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
      return (
        itemCity === target ||
        citySlug === target ||
        itemLoc.includes(target) ||
        (target === "delhi-ncr" && (itemCity.includes("delhi") || itemLoc.includes("delhi") || itemLoc.includes("gurugram") || itemLoc.includes("noida")))
      );
    });
  }, [listings, selectedCity]);

  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentListings = filteredListings.slice(startIndex, startIndex + itemsPerPage);

  const handleCityChange = (slug: string) => {
    setSelectedCity(slug);
    setCurrentPage(1);
    const url = new URL(window.location.href);
    if (slug === "all") {
      url.searchParams.delete("city");
    } else {
      url.searchParams.set("city", slug);
    }
    window.history.pushState({}, "", url.toString());
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    smoothScrollTo(380);
  };

  const selectedBadge = config?.selectedBadge || "City Selected Portfolio";
  const allBadge = config?.allBadge || "Complete Registry";
  const defaultTitle = config?.defaultTitle || "All Available Residences";
  const cityTitlePrefix = config?.cityTitlePrefix || "Curated Luxury Residences in";
  const residencesInPrefix = config?.residencesInPrefix || "Residences in";
  const emptyMessage = config?.emptyMessage || "No residences currently available for this city";
  const showAllButtonText = config?.showAllButtonText || "Show All Cities";
  const prevButtonText = config?.prevButtonText || "← Prev";
  const nextButtonText = config?.nextButtonText || "Next →";

  const getCityDisplayName = () => {
    if (!selectedCity || selectedCity === "all") return defaultTitle;
    const found = availableCities.find((c) => c.slug === selectedCity || c.name.toLowerCase() === selectedCity.toLowerCase());
    return found ? `${cityTitlePrefix} ${found.name}` : `${residencesInPrefix} ${selectedCity.toUpperCase()}`;
  };

  return (
    <section className="section-shell py-14 sm:py-16">
      <div className="section-container">
      <div className="pb-8 mb-12 border-b border-[#E5DFD3]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#B8945A] block mb-2">
            {selectedCity !== "all" ? selectedBadge : allBadge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#171717] font-normal tracking-tight">
            {getCityDisplayName()}
          </h2>
        </div>
      </div>

      {currentListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentListings.map((item, idx) => (
            <RevealCard key={item.id} index={idx}>
              <PropertyCard property={item} />
            </RevealCard>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/40 border border-[#E5DFD3]">
          <p className="font-serif text-2xl text-[#171717] mb-3">{emptyMessage}</p>
          <button
            type="button"
            onClick={() => handleCityChange("all")}
            className="mt-4 px-6 py-3 bg-[#B8945A] text-[#171717] text-xs font-semibold uppercase tracking-[0.2em] cursor-pointer"
          >
            {showAllButtonText}
          </button>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-16 flex items-center justify-center gap-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-5 py-2.5 border text-xs uppercase tracking-[0.2em] font-medium transition-all flex items-center gap-2 cursor-pointer ${
              currentPage === 1
                ? "border-[#E5DFD3] text-[#737373]/40 cursor-not-allowed bg-transparent"
                : "border-[#E5DFD3] bg-[#F7F4EE] text-[#171717] hover:border-[#B8945A] hover:text-[#B8945A]"
            }`}
          >
            {prevButtonText}
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 border text-xs font-mono font-medium transition-all cursor-pointer ${
                  currentPage === page
                    ? "bg-[#B8945A] border-[#B8945A] text-[#F7F4EE] font-bold"
                    : "border-[#E5DFD3] bg-[#F7F4EE] text-[#171717] hover:border-[#B8945A] hover:text-[#B8945A]"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-5 py-2.5 border text-xs uppercase tracking-[0.2em] font-medium transition-all flex items-center gap-2 cursor-pointer ${
              currentPage === totalPages
                ? "border-[#E5DFD3] text-[#737373]/40 cursor-not-allowed bg-transparent"
                : "border-[#E5DFD3] bg-[#F7F4EE] text-[#171717] hover:border-[#B8945A] hover:text-[#B8945A]"
            }`}
          >
            {nextButtonText}
          </button>
        </div>
      )}
      </div>
    </section>
  );
};
