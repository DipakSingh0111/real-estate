"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PropertyListing } from "@/types/estate";
import { BreadcrumbHeader } from "@/components/ui/BreadcrumbHeader";

interface PropertyDetailsClientProps {
  property: PropertyListing;
  similarProperties: PropertyListing[];
}

export const PropertyDetailsClient: React.FC<PropertyDetailsClientProps> = ({
  property,
}) => {
  const images = property.gallery && property.gallery.length > 0 ? property.gallery : [property.image];
  const [selectedImage, setSelectedImage] = useState<string>(images[0]);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    message: `Hello, I am interested in scheduling a private discreet viewing for "${property.title}". Please get in touch with me.`,
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="bg-[#F7F4EE] min-h-screen text-[#171717] pb-14 sm:pb-16">
      {/* 1. Hero BreadcrumbHeader */}
      <BreadcrumbHeader
        badge={property.tag || "Private Sanctuary"}
        title={property.title}
        titleHighlight=""
        breadcrumbs={[
          { label: "Listings", href: "/listings" },
          { label: property.title, active: true },
        ]}
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-10">
        {/* Gallery Showcase */}
        <section aria-label="Property Media Showcase">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:items-stretch">
            {/* Main Featured Display Image */}
            <div className="lg:col-span-9 relative overflow-hidden bg-[#171717] border border-[#E5DFD3] min-h-[380px] sm:min-h-[460px] lg:min-h-[560px] flex">
              <img
                src={selectedImage}
                alt={property.title}
                className="w-full h-full object-cover transition-all duration-700"
              />
              <div className="absolute bottom-5 left-5 px-4 py-2 bg-[#171717]/85 backdrop-blur-sm text-[#F7F4EE] text-xs font-medium border border-[#B8945A]/40 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8945A]" />
                <span className="uppercase tracking-[0.2em] text-[10px]">Architectural Photography</span>
              </div>
            </div>

            {/* Thumbnail Column */}
            <div className="lg:col-span-3 flex lg:flex-col gap-3.5">
              {images.slice(0, 3).map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`relative flex-1 w-full overflow-hidden cursor-pointer transition-all border min-h-[110px] ${
                    selectedImage === imgUrl
                      ? "border-[#B8945A] ring-1 ring-[#B8945A]"
                      : "border-[#E5DFD3] opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${property.title} preview ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Key Metrics Quick Ribbon */}
        <section aria-label="Key Property Specs" className="mt-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-[#F7F4EE] p-5 border border-[#E5DFD3] text-center flex flex-col items-center justify-center">
              <span className="text-[10px] text-[#737373] uppercase tracking-[0.2em] font-medium">Bedrooms</span>
              <span className="text-2xl font-serif text-[#171717] mt-1">{property.beds}</span>
              <span className="text-[11px] text-[#B8945A] font-medium">Private Suites</span>
            </div>

            <div className="bg-[#F7F4EE] p-5 border border-[#E5DFD3] text-center flex flex-col items-center justify-center">
              <span className="text-[10px] text-[#737373] uppercase tracking-[0.2em] font-medium">Bathrooms</span>
              <span className="text-2xl font-serif text-[#171717] mt-1">{property.baths}</span>
              <span className="text-[11px] text-[#B8945A] font-medium">Designer Marble</span>
            </div>

            <div className="bg-[#F7F4EE] p-5 border border-[#E5DFD3] text-center flex flex-col items-center justify-center">
              <span className="text-[10px] text-[#737373] uppercase tracking-[0.2em] font-medium">Total Area</span>
              <span className="text-2xl font-serif text-[#171717] mt-1">
                {property.areaSqFt ? property.areaSqFt.toLocaleString() : "7,500"}
              </span>
              <span className="text-[11px] text-[#B8945A] font-medium">Square Feet</span>
            </div>

            <div className="bg-[#F7F4EE] p-5 border border-[#E5DFD3] text-center flex flex-col items-center justify-center">
              <span className="text-[10px] text-[#737373] uppercase tracking-[0.2em] font-medium">Garage</span>
              <span className="text-2xl font-serif text-[#171717] mt-1">{property.garages || 4} Cars</span>
              <span className="text-[11px] text-[#B8945A] font-medium">Climate Controlled</span>
            </div>

            <div className="bg-[#F7F4EE] p-5 border border-[#E5DFD3] text-center flex flex-col items-center justify-center">
              <span className="text-[10px] text-[#737373] uppercase tracking-[0.2em] font-medium">Built Year</span>
              <span className="text-2xl font-serif text-[#171717] mt-1">{property.builtYear || 2022}</span>
              <span className="text-[11px] text-[#B8945A] font-medium">Pristine State</span>
            </div>

            <div className="bg-[#F7F4EE] p-5 border border-[#E5DFD3] text-center flex flex-col items-center justify-center">
              <span className="text-[10px] text-[#737373] uppercase tracking-[0.2em] font-medium">Valuation</span>
              <span className="text-xl font-serif text-[#B8945A] mt-1 truncate max-w-[130px] font-normal">
                {property.price}
              </span>
              <span className="text-[11px] text-[#737373]">Prime Enclave</span>
            </div>
          </div>
        </section>

        {/* Main Content Layout: 8 cols (Details) + 4 cols (Lead & Agent Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12">
          {/* Left Column: Details, Highlights, Amenities */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Overview */}
            <div className="bg-[#F7F4EE] p-8 border border-[#E5DFD3]">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-[1.5px] bg-[#B8945A]" />
                <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#B8945A]">
                  Overview
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#171717] font-normal mb-4">
                Architectural Narrative
              </h2>
              <p className="text-base text-[#737373] leading-relaxed font-light">
                {property.description ||
                  "An extraordinary private residence exhibiting the finest caliber of bespoke craftsmanship, dramatic panoramic horizons, and unparalleled privacy. Every detail has been curated to surpass the expectations of discerning luxury connoisseurs."}
              </p>

              <div className="mt-8 pt-6 border-t border-[#E5DFD3] grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <span className="font-serif text-xl text-[#B8945A]">✓</span>
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#171717]">Freehold Title</h4>
                    <p className="text-xs text-[#737373] mt-1 font-light">Clean registered title authenticated by Senior Legal Advisory</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="font-serif text-xl text-[#B8945A]">✓</span>
                  <div>
                    <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#171717]">Discreet Acquisition</h4>
                    <p className="text-xs text-[#737373] mt-1 font-light">Off-market privacy protection for private family offices</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Key Highlights */}
            {property.highlights && property.highlights.length > 0 && (
              <div className="bg-[#F7F4EE] p-8 border border-[#E5DFD3]">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-[1.5px] bg-[#B8945A]" />
                  <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#B8945A]">
                    Key Features
                  </span>
                </div>
                <h3 className="text-2xl font-serif text-[#171717] font-normal mb-6">
                  Bespoke Distinctions & Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {property.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="p-4 bg-[#F7F4EE] border border-[#E5DFD3] flex items-start gap-3"
                    >
                      <span className="text-xs font-mono text-[#B8945A] font-semibold mt-0.5">
                        0{index + 1}
                      </span>
                      <span className="text-sm text-[#171717] font-light leading-snug">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="space-y-6">
                {property.amenities.map((categoryGroup, idx) => (
                  <div key={idx} className="bg-[#F7F4EE] p-8 border border-[#E5DFD3]">
                    <div className="flex items-center gap-3 mb-5 pb-3 border-b border-[#E5DFD3]">
                      <span className="w-2 h-2 rounded-full bg-[#B8945A]" />
                      <h3 className="text-lg font-serif text-[#171717] font-normal">
                        {categoryGroup.category}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {categoryGroup.items.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="flex items-center gap-2.5 p-3 border border-[#E5DFD3] text-xs font-medium text-[#171717]"
                        >
                          <span className="text-[#B8945A]">❖</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Private Client Advisor & Viewing Booking Form */}
          <div className="lg:col-span-4 space-y-6">
            {/* Schedule Private Viewing Form */}
            <div className="bg-[#171717] text-[#F7F4EE] p-8 border border-[#262626]">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-[1.5px] bg-[#B8945A]" />
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#B8945A]">
                  Discreet Protocol
                </span>
              </div>
              <h3 className="text-2xl font-serif text-[#F7F4EE] font-normal mb-2">
                Schedule Private Viewing
              </h3>
              <p className="text-xs text-[#737373] leading-relaxed mb-6 font-light">
                Receive confidential architectural blueprints and coordinate a bespoke on-site or helicopter arrival tour.
              </p>

              {formSubmitted ? (
                <div className="border border-[#B8945A]/40 p-6 text-center space-y-3">
                  <span className="text-[#B8945A] text-2xl font-serif">✓</span>
                  <h4 className="font-serif text-lg text-[#F7F4EE]">Request Received</h4>
                  <p className="text-xs text-[#737373] font-light">
                    Your Senior Private Client Director will reach out confidentially within 4 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#737373] mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Principal Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#171717] border border-[#262626] text-xs text-[#F7F4EE] placeholder:text-[#737373] focus:outline-none focus:border-[#B8945A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#737373] mb-1">
                      Confidential Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="client@familyoffice.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#171717] border border-[#262626] text-xs text-[#F7F4EE] placeholder:text-[#737373] focus:outline-none focus:border-[#B8945A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#737373] mb-1">
                      Direct Telephone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 / +44 / +1"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#171717] border border-[#262626] text-xs text-[#F7F4EE] placeholder:text-[#737373] focus:outline-none focus:border-[#B8945A]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#B8945A] hover:bg-[#9E7D46] text-[#F7F4EE] text-xs font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer mt-2"
                  >
                    Confirm Confidential Visit →
                  </button>

                  <p className="text-[10px] text-[#737373] text-center font-light pt-2">
                    Protected by bilateral non-disclosure protocols.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
