"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { SectionProps } from "@/types/realestate.types";
import { BreadcrumbHeader } from "@/components/ui/BreadcrumbHeader";

export const PropertyDetailsClient: React.FC<SectionProps.PropertyDetails> = ({
  property,
  config,
}) => {
  const fallbackImages = config?.fallbackImages || [
    "/images/modern-buildings.jpg",
    "/images/day-city-view.jpg",
    "/images/night-city-skyline.jpg",
    "/images/real-estate-06.jpg",
    "/images/real-estate-08.jpg",
    "/images/real-estate-04.jpg",
    "/images/real-estate-02.jpg",
  ];

  const rawImages = [
    property.image,
    ...(property.gallery || []),
    ...fallbackImages,
  ].filter(Boolean);

  const images = Array.from(new Set(rawImages)).slice(0, 5);
  const [selectedImage, setSelectedImage] = useState<string>(images[0]);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `Hello, I am interested in "${property.title}". Please get in touch with me.`,
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const featureLabels = config?.featuresList || [
    "Air Conditioning",
    "Swimming Pool",
    "Garden Area",
    "Security System",
    "Parking Space",
    "Modern Kitchen",
    "Balcony / Terrace",
    "High-Speed Internet",
  ];

  const getFeatureIcon = (idx: number) => {
    switch (idx % 8) {
      case 0:
        return (
          <svg className="w-5 h-5 text-[#0f2e5c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        );
      case 1:
        return (
          <svg className="w-5 h-5 text-[#0f2e5c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
          </svg>
        );
      case 2:
        return (
          <svg className="w-5 h-5 text-[#0f2e5c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918" />
          </svg>
        );
      case 3:
        return (
          <svg className="w-5 h-5 text-[#0f2e5c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        );
      case 4:
        return (
          <svg className="w-5 h-5 text-[#0f2e5c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25V4.5A2.25 2.25 0 0012 2.25H6.75A2.25 2.25 0 004.5 4.5v12" />
          </svg>
        );
      case 5:
        return (
          <svg className="w-5 h-5 text-[#0f2e5c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        );
      case 6:
        return (
          <svg className="w-5 h-5 text-[#0f2e5c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-[#0f2e5c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
          </svg>
        );
    }
  };

  const labels = config?.overviewLabels || {
    rooms: "Rooms",
    baths: "Baths",
    bed: "Bed",
    size: "Size",
    yearBuilt: "Year Built",
    propertyType: "Property Type",
    garage: "Garage",
  };

  const tourForm = config?.tourForm || {
    title: "Schedule a Tour",
    subtitle: "Connect with our advisor to book an in-person or virtual walkthrough.",
    successTitle: "Request Dispatched",
    successMessage: "Our luxury property consultant will reach out shortly.",
    nameLabel: "Full Name *",
    namePlaceholder: "Your Name",
    emailLabel: "Email Address *",
    emailPlaceholder: "info@xyz.com",
    phoneLabel: "Phone Number *",
    phonePlaceholder: "+1 00000 00000",
    messageLabel: "Your Message",
    submitButtonText: "Request Viewing Tour →",
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen text-[#1e293b] pb-16 font-sans">
      <BreadcrumbHeader
        badge={property.tag || config?.fallbackBadge || "Property Details"}
        title={property.title}
        titleHighlight=""
        breadcrumbs={[
          { label: "Properties", href: "/listings" },
          { label: property.title, active: true },
        ]}
      />

      <div className="section-shell pt-8 sm:pt-10">
        <div className="section-container">
        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-200/80 mb-10">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] max-h-[520px] w-full rounded-xl overflow-hidden bg-slate-900 mb-4">
            <img
              src={selectedImage}
              alt={property.title}
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>

          <div className="grid grid-cols-5 gap-3 sm:gap-4">
            {images.slice(0, 5).map((imgUrl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(imgUrl)}
                className={`relative aspect-[16/10] rounded-xl overflow-hidden cursor-pointer transition-all border-2 ${
                  selectedImage === imgUrl
                    ? "border-[#0f2e5c] ring-2 ring-[#0f2e5c]/20 scale-[1.02]"
                    : "border-transparent opacity-80 hover:opacity-100 hover:scale-[1.01]"
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-8 space-y-10">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a192f] tracking-tight mb-4">
                {property.title}
              </h1>
              <p className="text-base sm:text-lg text-slate-500 font-normal leading-relaxed">
                {property.description || config?.defaultDescription || "Explore our curated selection of premium real estate offerings."}
              </p>
            </div>

            <div>
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-[#0a192f] tracking-tight">
                  {config?.overviewTitle || "Overview"}
                </h2>
                <div className="w-12 h-1 bg-[#0f2e5c] rounded-full mt-2" />
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs divide-y divide-slate-100">
                <div className="flex items-center justify-between px-6 py-4.5 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-3.5">
                    <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                    </svg>
                    <span className="font-bold text-slate-800 text-sm sm:text-base">{labels.rooms}</span>
                  </div>
                  <span className="font-semibold text-slate-600 text-sm sm:text-base">
                    {(property.beds || 3) + (property.baths || 2) + 3}
                  </span>
                </div>

                <div className="flex items-center justify-between px-6 py-4.5 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-3.5">
                    <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
                    </svg>
                    <span className="font-bold text-slate-800 text-sm sm:text-base">{labels.baths}</span>
                  </div>
                  <span className="font-semibold text-slate-600 text-sm sm:text-base">{property.baths}</span>
                </div>

                <div className="flex items-center justify-between px-6 py-4.5 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-3.5">
                    <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                    <span className="font-bold text-slate-800 text-sm sm:text-base">{labels.bed}</span>
                  </div>
                  <span className="font-semibold text-slate-600 text-sm sm:text-base">{property.beds}</span>
                </div>

                <div className="flex items-center justify-between px-6 py-4.5 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-3.5">
                    <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                    <span className="font-bold text-slate-800 text-sm sm:text-base">{labels.size}</span>
                  </div>
                  <span className="font-semibold text-slate-600 text-sm sm:text-base">
                    {property.areaSqFt ? `${property.areaSqFt.toLocaleString()} sq.ft` : "1050 sq.ft"}
                  </span>
                </div>

                <div className="flex items-center justify-between px-6 py-4.5 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-3.5">
                    <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                    <span className="font-bold text-slate-800 text-sm sm:text-base">{labels.yearBuilt}</span>
                  </div>
                  <span className="font-semibold text-slate-600 text-sm sm:text-base">
                    {property.builtYear || 2018}
                  </span>
                </div>

                <div className="flex items-center justify-between px-6 py-4.5 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-3.5">
                    <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21" />
                    </svg>
                    <span className="font-bold text-slate-800 text-sm sm:text-base">{labels.propertyType}</span>
                  </div>
                  <span className="font-semibold text-slate-600 text-sm sm:text-base">
                    {property.type || "Apartment"}
                  </span>
                </div>

                <div className="flex items-center justify-between px-6 py-4.5 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-3.5">
                    <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25V4.5A2.25 2.25 0 0012 2.25H6.75A2.25 2.25 0 004.5 4.5v12" />
                    </svg>
                    <span className="font-bold text-slate-800 text-sm sm:text-base">{labels.garage}</span>
                  </div>
                  <span className="font-semibold text-slate-600 text-sm sm:text-base">
                    {property.garages || 2}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-[#0a192f] tracking-tight">
                  {config?.detailsTitle || "Property Details"}
                </h2>
                <div className="w-12 h-1 bg-[#0f2e5c] rounded-full mt-2" />
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-5 text-slate-600 leading-relaxed text-sm sm:text-base">
                <p>
                  {property.description || config?.defaultDescription}
                </p>

                <p className="font-medium text-slate-700">
                  This premium listing in <span className="font-bold text-slate-900">{property.location || "Prime City"}</span> offers {property.beds} bedrooms, {property.baths} bathrooms, and {property.areaSqFt ? `${property.areaSqFt.toLocaleString()}` : "1050"} sq.ft of thoughtfully designed living space.
                </p>

                <p className="font-semibold text-slate-800 pt-2">
                  Listed price: <span className="text-[#0f2e5c] font-bold text-lg">{property.price}</span>
                </p>
              </div>
            </div>

            <div>
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-[#0a192f] tracking-tight">
                  {config?.featuresTitle || "Features"}
                </h2>
                <div className="w-12 h-1 bg-[#0f2e5c] rounded-full mt-2" />
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {featureLabels.map((featLabel, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 bg-slate-50/70 hover:bg-slate-100/70 transition-colors p-4 rounded-xl border border-slate-100"
                    >
                      <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center shrink-0 border border-slate-200/60">
                        {getFeatureIcon(idx)}
                      </div>
                      <span className="font-semibold text-slate-800 text-sm sm:text-base">
                        {featLabel}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs sticky top-28">
              <h3 className="text-xl font-bold text-[#0a192f] mb-1">
                {tourForm.title}
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                {tourForm.subtitle}
              </p>

              {formSubmitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                  <span className="text-emerald-700 text-2xl font-bold">✓</span>
                  <h4 className="font-bold text-emerald-900 text-base">
                    {tourForm.successTitle}
                  </h4>
                  <p className="text-xs text-emerald-700">
                    {tourForm.successMessage}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {tourForm.nameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={tourForm.namePlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0f2e5c] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {tourForm.emailLabel}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={tourForm.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0f2e5c] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {tourForm.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder={tourForm.phonePlaceholder}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0f2e5c] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {tourForm.messageLabel}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0f2e5c] focus:bg-white transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#0f2e5c] hover:bg-[#0a2042] text-white font-bold rounded-lg text-sm tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer"
                  >
                    {tourForm.submitButtonText}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};
