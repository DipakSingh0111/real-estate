"use client";

import React, { useState } from "react";
import { PropertyListing } from "@/types/estate";
import { PropertyCard } from "@/components/ui/PropertyCard";

interface ListingsGridWithPaginationProps {
  listings: PropertyListing[];
  itemsPerPage?: number;
  initialCity?: string;
  availableCities?: { name: string; slug: string }[];
}

export const ListingsGridWithPagination: React.FC<ListingsGridWithPaginationProps> = ({
  listings,
  itemsPerPage = 6,
  initialCity = "all",
  availableCities = [],
}) => {
  const [selectedCity, setSelectedCity] = useState<string>(initialCity);
  const [currentPage, setCurrentPage] = useState(1);

  // Sync selectedCity if initialCity changes
  React.useEffect(() => {
    setSelectedCity(initialCity || "all");
    setCurrentPage(1);
  }, [initialCity]);

  // Filter listings by selected city
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
    // Update browser URL without hard refresh
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
    window.scrollTo({ top: 380, behavior: "smooth" });
  };

  const getCityDisplayName = () => {
    if (!selectedCity || selectedCity === "all") return "All Available Residences";
    const found = availableCities.find((c) => c.slug === selectedCity || c.name.toLowerCase() === selectedCity.toLowerCase());
    return found ? `Curated Luxury Residences in ${found.name}` : `Residences in ${selectedCity.toUpperCase()}`;
  };

  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14 sm:py-16">
      {/* Top Heading */}
      <div className="pb-8 mb-12 border-b border-[#E5DFD3]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#B8945A] block mb-2">
            {selectedCity !== "all" ? "City Selected Portfolio" : "Complete Registry"}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#171717] font-normal tracking-tight">
            {getCityDisplayName()}
          </h2>
        </div>
      </div>

      {/* Grid of Property Cards */}
      {currentListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentListings.map((item) => (
            <div key={item.id}>
              <PropertyCard property={item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/40 border border-[#E5DFD3]">
          <p className="font-serif text-2xl text-[#171717] mb-3">No residences currently available for this city</p>
          <button
            type="button"
            onClick={() => handleCityChange("all")}
            className="mt-4 px-6 py-3 bg-[#B8945A] text-[#171717] text-xs font-semibold uppercase tracking-[0.2em]"
          >
            Show All Cities
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-16 flex items-center justify-center gap-2">
          {/* Previous Page Button */}
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
            ← Prev
          </button>

          {/* Numbered Page Buttons */}
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

          {/* Next Page Button */}
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
            Next →
          </button>
        </div>
      )}
    </section>
  );
};
