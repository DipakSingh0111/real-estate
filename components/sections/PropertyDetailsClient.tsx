"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { SectionProps } from "@/types/realestate.types";
import { BreadcrumbHeader } from "@/components/ui/BreadcrumbHeader";
import {
  TbAirConditioning,
  TbSwimming,
  TbShieldCheck,
  TbCar,
  TbWifi,
  TbHome,
  TbFlame,
  TbSailboat,
  TbDeviceTv,
} from "react-icons/tb";
import {
  LuTrees,
  LuCookingPot,
  LuSparkles,
  LuPlane,
  LuHospital,
  LuBuilding2,
  LuDumbbell,
} from "react-icons/lu";

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

  const getFeatureIcon = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes("air") || t.includes("conditioning") || t.includes("ac") || t.includes("climate")) {
      return <TbAirConditioning className="w-5 h-5 text-[#0f2e5c]" />;
    }
    if (t.includes("pool") || t.includes("swim")) {
      return <TbSwimming className="w-5 h-5 text-[#0f2e5c]" />;
    }
    if (t.includes("gym") || t.includes("fitness") || t.includes("yoga")) {
      return <LuDumbbell className="w-5 h-5 text-[#0f2e5c]" />;
    }
    if (t.includes("cinema") || t.includes("theater") || t.includes("media") || t.includes("tv")) {
      return <TbDeviceTv className="w-5 h-5 text-[#0f2e5c]" />;
    }
    if (t.includes("spa") || t.includes("sauna") || t.includes("wellness")) {
      return <LuSparkles className="w-5 h-5 text-[#0f2e5c]" />;
    }
    if (t.includes("fireplace") || t.includes("fire")) {
      return <TbFlame className="w-5 h-5 text-[#0f2e5c]" />;
    }
    if (t.includes("garden") || t.includes("park") || t.includes("tree")) {
      return <LuTrees className="w-5 h-5 text-[#0f2e5c]" />;
    }
    if (t.includes("security") || t.includes("cctv") || t.includes("safe") || t.includes("biometric") || t.includes("gated")) {
      return <TbShieldCheck className="w-5 h-5 text-[#0f2e5c]" />;
    }
    if (t.includes("parking") || t.includes("garage") || t.includes("car")) {
      return <TbCar className="w-5 h-5 text-[#0f2e5c]" />;
    }
    if (t.includes("kitchen") || t.includes("cook") || t.includes("dining")) {
      return <LuCookingPot className="w-5 h-5 text-[#0f2e5c]" />;
    }
    if (t.includes("balcony") || t.includes("terrace") || t.includes("deck") || t.includes("patio")) {
      return <TbHome className="w-5 h-5 text-[#0f2e5c]" />;
    }
    if (t.includes("internet") || t.includes("wifi") || t.includes("high-speed")) {
      return <TbWifi className="w-5 h-5 text-[#0f2e5c]" />;
    }
    return <LuSparkles className="w-5 h-5 text-[#0f2e5c]" />;
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
    title: "Property Enquiry",
    subtitle: "Connect with our real estate advisor for pricing, floor plans, and acquisition details.",
    successTitle: "Request Dispatched",
    successMessage: "Our luxury property consultant will reach out shortly.",
    nameLabel: "Full Name *",
    namePlaceholder: "Your Name",
    emailLabel: "Email Address *",
    emailPlaceholder: "info@xyz.com",
    phoneLabel: "Phone Number *",
    phonePlaceholder: "+1 00000 00000",
    messageLabel: "Your Message",
    submitButtonText: "Request Property Details →",
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
          <div className="relative aspect-[16/9] sm:aspect-[21/9] max-h-[520px] w-full rounded-xl overflow-hidden bg-slate-900">
            <img
              src={selectedImage}
              alt={property.title}
              className="w-full h-full object-cover transition-all duration-500"
            />
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
                        {getFeatureIcon(featLabel)}
                      </div>
                      <span className="font-semibold text-slate-800 text-sm sm:text-base">
                        {featLabel}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Amenities Section - Compact */}
            <div>
              <div className="mb-3">
                <h2 className="text-xl font-bold text-[#0a192f] tracking-tight">
                  {config?.amenitiesTitle || "Amenities"}
                </h2>
                <div className="w-8 h-0.5 bg-[#0f2e5c] rounded-full mt-1.5" />
              </div>

              <div className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                  {(
                    property.amenities?.flatMap((g) => g.items).slice(0, 6) || [
                      "Infinity Pool",
                      "Private Spa",
                      "Smart Automation",
                      "24/7 Security",
                      "Covered Parking",
                      "Fitness Center"
                    ]
                  ).map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className="flex items-center gap-3 text-sm text-slate-700 bg-slate-50/80 hover:bg-slate-100/80 transition-colors py-3 px-3.5 rounded-xl border border-slate-100"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center shrink-0 shadow-2xs">
                        {getFeatureIcon(item)}
                      </div>
                      <span className="font-semibold text-slate-800 text-[13px] truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Nearby Section - Compact */}
            <div>
              <div className="mb-3">
                <h2 className="text-xl font-bold text-[#0a192f] tracking-tight">
                  {config?.nearbyTitle || "Nearby"}
                </h2>
                <div className="w-8 h-0.5 bg-[#0f2e5c] rounded-full mt-1.5" />
              </div>

              <div className="bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(
                    property.nearbyLocations?.flatMap((g) => g.items).slice(0, 4) || [
                      { name: "International Airport", distance: "25 mins" },
                      { name: "Express Highway", distance: "5 mins" },
                      { name: "Shopping Galleria", distance: "8 mins" },
                      { name: "Super-Specialty Hospital", distance: "10 mins" }
                    ]
                  ).map((loc, itemIdx) => {
                    const locName = loc.name.toLowerCase();
                    const LocIcon = locName.includes("airport") || locName.includes("flight")
                      ? LuPlane
                      : locName.includes("hospital") || locName.includes("clinic") || locName.includes("medical")
                      ? LuHospital
                      : locName.includes("mall") || locName.includes("shopping") || locName.includes("market")
                      ? LuBuilding2
                      : locName.includes("marina") || locName.includes("ferry") || locName.includes("boat") || locName.includes("dock")
                      ? TbSailboat
                      : locName.includes("restaurant") || locName.includes("ristorante") || locName.includes("dining")
                      ? LuCookingPot
                      : TbCar;

                    return (
                      <div
                        key={itemIdx}
                        className="flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/70 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-2">
                          <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center shrink-0 shadow-2xs">
                            <LocIcon className="w-5 h-5 text-[#0f2e5c]" />
                          </div>
                          <span className="font-semibold text-slate-800 text-[13px] truncate">{loc.name}</span>
                        </div>
                        <span className="shrink-0 font-bold text-[#0f2e5c] bg-white px-2.5 py-1 rounded-md border border-slate-200/80 text-xs">
                          {loc.distance}
                        </span>
                      </div>
                    );
                  })}
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
