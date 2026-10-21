import React from "react";
import { PropertyListing } from "@/types/estate";
import { PropertyCard } from "@/components/ui/PropertyCard";
import defaultData from "@/data/properties.json";

interface FeaturedListingsProps {
  title?: string;
  listings?: PropertyListing[];
  footerCredit?: string;
}

export const FeaturedListings: React.FC<FeaturedListingsProps> = ({
  title = (defaultData as any).featuredListingsConfig?.title || defaultData.featuredListings.title || "Featured Properties",
  listings = defaultData.featuredListings.items,
  footerCredit = defaultData.footer.credit,
}) => {
  return (
    <section id="listings" className="bg-[#F7F4EE] py-14 sm:py-16 px-6 sm:px-8 lg:px-12 border-t border-[#E5DFD3]">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="gsap-header text-center mb-14">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#171717] tracking-tight">
            {title}
          </h2>
        </div>

        {/* 3-Column Luxury Property Cards Grid (Only 3 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {listings.slice(0, 3).map((item) => (
            <div key={item.id} className="gsap-listing-card">
              <PropertyCard property={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
