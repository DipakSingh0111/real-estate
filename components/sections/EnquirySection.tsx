"use client";

import React, { useState } from "react";

const PROPERTY_TYPES = [
  "Villa / Estate",
  "Penthouse",
  "Apartment",
  "Heritage Residence",
  "Commercial / Investment",
  "Other",
];

const BUDGET_RANGES = [
  "Under ₹5 Cr",
  "₹5 Cr – ₹15 Cr",
  "₹15 Cr – ₹50 Cr",
  "₹50 Cr – ₹100 Cr",
  "₹100 Cr+",
  "Prefer not to say",
];

const CITIES = [
  "Mumbai",
  "Delhi NCR",
  "Bangalore",
  "Hyderabad",
  "Goa",
  "International",
  "Other",
];

export const EnquirySection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    propertyType: "",
    budget: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const inputClass =
    "w-full bg-white/70 border border-[#E5DFD3] hover:border-[#B8945A]/50 focus:border-[#B8945A] px-4 py-3.5 text-sm text-[#171717] placeholder:text-[#A39D93] focus:outline-none transition-colors";
  const labelClass =
    "block text-[11px] uppercase tracking-[0.2em] font-semibold text-[#171717] mb-2";

  return (
    <section className="section-shell py-16 sm:py-20 bg-[#F7F4EE]">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-[1.5px] bg-[#B8945A]" />
                <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#B8945A]">
                  Private Desk
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#171717] font-normal tracking-tight">
                Submit Your Enquiry
              </h2>
              <p className="text-sm sm:text-base text-[#737373] font-light leading-relaxed mt-4 max-w-lg">
                Share your requirements with our private client desk. A senior
                advisor will respond within four hours with curated options
                matched to your brief.
              </p>
            </div>

            <div className="space-y-5 pt-4 border-t border-[#E5DFD3]">
              {[
                {
                  id: "01",
                  title: "Confidential Handling",
                  detail: "All enquiries are handled with complete discretion.",
                },
                {
                  id: "02",
                  title: "Curated Matches",
                  detail: "Off-market and listed residences tailored to you.",
                },
                {
                  id: "03",
                  title: "Fast Response",
                  detail: "A dedicated partner replies within four hours.",
                },
              ].map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <span className="font-serif text-xl text-[#B8945A] font-light">
                    {item.id}
                  </span>
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#171717] block mb-1">
                      {item.title}
                    </span>
                    <p className="text-sm text-[#737373] font-light">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#F7F4EE] border border-[#E5DFD3] p-8 sm:p-10 md:p-12 shadow-[0_12px_40px_rgba(23,23,23,0.06)]">
            {isSubmitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-14 h-14 rounded-full border border-[#B8945A] text-[#B8945A] flex items-center justify-center mx-auto">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#171717] font-normal">
                  Enquiry Received
                </h3>
                <p className="text-sm text-[#737373] max-w-md mx-auto font-light leading-relaxed">
                  Thank you. A Senior Client Partner will reach out shortly with
                  residences aligned to your requirements.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Preferred City</label>
                    <select
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option value="">Select city</option>
                      {CITIES.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Property Type</label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          propertyType: e.target.value,
                        })
                      }
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option value="">Select type</option>
                      {PROPERTY_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Budget Range</label>
                    <select
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: e.target.value })
                      }
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option value="">Select budget</option>
                      {BUDGET_RANGES.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    Requirements / Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about preferred locations, size, amenities, timeline, or any specific requirements..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#B8945A] hover:bg-[#9E7D46] text-[#F7F4EE] text-xs font-semibold uppercase tracking-[0.25em] transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                >
                  Submit Enquiry →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
