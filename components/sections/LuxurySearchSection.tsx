"use client";

import React, { useState } from "react";
import defaultData from "@/data/properties.json";

interface LuxurySearchFilterProps {
  onFilterChange?: (filters: {
    propertyType: string;
    location: string;
    priceRange: string;
    bedBath: string;
    searchQuery: string;
  }) => void;
}

export const LuxurySearchSection: React.FC<LuxurySearchFilterProps> = ({ onFilterChange }) => {
  const searchFilters = defaultData.hero.searchFilters;

  const [propertyType, setPropertyType] = useState("All Types");
  const [location, setLocation] = useState("All Locations");
  const [priceRange, setPriceRange] = useState("Any Price");
  const [bedBath, setBedBath] = useState("Any Beds/Baths");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onFilterChange) {
      onFilterChange({
        propertyType,
        location,
        priceRange,
        bedBath,
        searchQuery,
      });
    }

    // Smooth scroll down to listings section
    const listingsElement = document.getElementById("listings");
    if (listingsElement) {
      listingsElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleReset = () => {
    setPropertyType("All Types");
    setLocation("All Locations");
    setPriceRange("Any Price");
    setBedBath("Any Beds/Baths");
    setSearchQuery("");
    if (onFilterChange) {
      onFilterChange({
        propertyType: "All Types",
        location: "All Locations",
        priceRange: "Any Price",
        bedBath: "Any Beds/Baths",
        searchQuery: "",
      });
    }
  };

  return (
    <section id="search" className="relative z-30 -mt-10 sm:-mt-14 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
      <div className="bg-[#F7F4EE] border border-[#E5DFD3] shadow-[0_12px_40px_rgba(23,23,23,0.08)] p-6 sm:p-8 md:p-10">
        {/* Filter Inputs Grid */}
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          {/* 1. Keyword / Location text search */}
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#737373] mb-2">
              Keyword / Area
            </label>
            <input
              type="text"
              placeholder="e.g. Waterfront, Villa, Helipad..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E5DFD3] focus:border-[#B8945A] px-3.5 py-3 text-xs text-[#171717] placeholder-[#737373] outline-none transition-colors"
            />
          </div>

          {/* 2. Property Type Select */}
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#737373] mb-2">
              Estate Type
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full bg-white border border-[#E5DFD3] focus:border-[#B8945A] px-3.5 py-3 text-xs text-[#171717] outline-none transition-colors cursor-pointer appearance-none"
            >
              <option value="All Types">All Residences</option>
              {searchFilters.propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Prime Location Select */}
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#737373] mb-2">
              Prime Enclave
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-white border border-[#E5DFD3] focus:border-[#B8945A] px-3.5 py-3 text-xs text-[#171717] outline-none transition-colors cursor-pointer appearance-none"
            >
              <option value="All Locations">All Prime Locations</option>
              {searchFilters.locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Price Bracket */}
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#737373] mb-2">
              Valuation Tier
            </label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full bg-white border border-[#E5DFD3] focus:border-[#B8945A] px-3.5 py-3 text-xs text-[#171717] outline-none transition-colors cursor-pointer appearance-none"
            >
              <option value="Any Price">Any Tier</option>
              {searchFilters.priceRanges.map((price) => (
                <option key={price} value={price}>
                  {price}
                </option>
              ))}
            </select>
          </div>

          {/* 5. Submit Gold Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-[#B8945A] hover:bg-[#9E7D46] text-[#171717] font-semibold text-[11px] tracking-[0.2em] uppercase py-3.5 px-4 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Explore Estates</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
