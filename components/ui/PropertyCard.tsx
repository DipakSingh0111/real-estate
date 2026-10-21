import React from "react";
import Link from "next/link";
import { PropertyListing } from "@/types/estate";

interface PropertyCardProps {
  property: PropertyListing;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const propertyUrl = `/properties/${encodeURIComponent(property.title)}`;

  return (
    <div className="group bg-white overflow-hidden border border-[#E5DFD3] hover:border-[#B8945A]/60 transition-all duration-500 flex flex-col">
      {/* Property Image Container */}
      <Link href={propertyUrl} className="block relative aspect-[16/11] overflow-hidden bg-[#171717]">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {property.tag && (
          <span className="absolute top-4 left-4 px-3 py-1 bg-[#171717]/90 text-[#B8945A] text-[10px] font-semibold uppercase tracking-[0.2em] border border-[#B8945A]/40 backdrop-blur-xs">
            {property.tag}
          </span>
        )}
      </Link>

      {/* Card Info */}
      <div className="p-6 flex flex-col flex-1 justify-between gap-5 bg-[#F7F4EE]/40">
        <div>
          <div className="flex items-baseline justify-between gap-3 mb-2">
            <Link href={propertyUrl}>
              <h3 className="font-serif text-[#171717] text-xl sm:text-2xl leading-snug line-clamp-1 hover:text-[#B8945A] transition-colors cursor-pointer font-normal">
                {property.title}
              </h3>
            </Link>
            <span className="font-serif text-[#B8945A] text-lg sm:text-xl font-medium whitespace-nowrap">
              {property.price}
            </span>
          </div>

          {/* Location note */}
          <p className="text-sm text-[#737373] mt-2 flex items-center gap-2 font-normal">
            <svg className="w-4 h-4 text-[#B8945A] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{property.location}</span>
          </p>

          {/* Features line */}
          <p className="text-xs sm:text-[13px] text-[#737373] mt-3 line-clamp-1 font-normal tracking-wide">
            {property.features.join(" • ")}
          </p>
        </div>

        {/* View Details Button */}
        <Link
          href={propertyUrl}
          className="w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#171717] bg-transparent hover:bg-[#B8945A] hover:text-[#171717] border border-[#171717]/25 hover:border-[#B8945A] transition-all duration-300 text-center block"
        >
          View Residence
        </Link>
      </div>
    </div>
  );
};
