"use client";

import React, { useState } from "react";
import defaultData from "@/data/properties.json";

interface ChannelItem {
  id: string;
  title: string;
  detail: string;
}

interface ContactSectionProps {
  badge?: string;
  title?: string;
  description?: string;
  channels?: ChannelItem[];
  formConfig?: any;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  badge = (defaultData as any).contactSection?.badge || "Confidential Inquiry",
  title = (defaultData as any).contactSection?.title || "Connect With Our Principals",
  description = (defaultData as any).contactSection?.description || "Whether considering private portfolio acquisition, off-market estate disposition, or cross-border syndication, our senior directors ensure complete discretion.",
  channels = (defaultData as any).contactSection?.channels || [],
  formConfig = (defaultData as any).contactSection?.form || {},
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section className="py-16 sm:py-20 px-6 sm:px-8 lg:px-12 bg-[#F7F4EE]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Office & Advisory Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#171717] font-normal tracking-tight">
                {title}
              </h2>
              <p className="text-sm sm:text-base text-[#737373] font-light leading-relaxed mt-4 max-w-lg">
                {description}
              </p>
            </div>

            {/* Direct Channels */}
            <div className="space-y-6 pt-4 border-t border-[#E5DFD3]">
              {channels.map((channel: ChannelItem) => (
                <div key={channel.id} className="flex items-start gap-4">
                  <span className="font-serif text-xl text-[#B8945A] font-light">{channel.id}</span>
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#171717] block mb-1">
                      {channel.title}
                    </span>
                    <p className="text-sm text-[#737373] font-light">
                      {channel.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Luxury Form Container */}
          <div className="lg:col-span-7 bg-[#F7F4EE] border border-[#E5DFD3] p-8 sm:p-10 md:p-12 shadow-[0_12px_40px_rgba(23,23,23,0.06)]">
            {isSubmitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-14 h-14 rounded-full border border-[#B8945A] text-[#B8945A] flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#171717] font-normal">
                  {formConfig.successTitle || "Inquiry Dispatched"}
                </h3>
                <p className="text-sm text-[#737373] max-w-md mx-auto font-light leading-relaxed">
                  {formConfig.successMessage || "A Senior Client Partner will reach out via your preferred secure protocol within four hours."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-[#171717] mb-2">
                      {formConfig.nameLabel || "Full Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={formConfig.namePlaceholder || "Enter your full name"}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-white/70 border border-[#E5DFD3] hover:border-[#B8945A]/50 focus:border-[#B8945A] px-4 py-3.5 text-sm text-[#171717] placeholder:text-[#A39D93] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-[#171717] mb-2">
                      {formConfig.emailLabel || "Email Address *"}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={formConfig.emailPlaceholder || "name@example.com"}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/70 border border-[#E5DFD3] hover:border-[#B8945A]/50 focus:border-[#B8945A] px-4 py-3.5 text-sm text-[#171717] placeholder:text-[#A39D93] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-[#171717] mb-2">
                      {formConfig.phoneLabel || "Phone Number"}
                    </label>
                    <input
                      type="tel"
                      placeholder={formConfig.phonePlaceholder || "+91 98765 43210"}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/70 border border-[#E5DFD3] hover:border-[#B8945A]/50 focus:border-[#B8945A] px-4 py-3.5 text-sm text-[#171717] placeholder:text-[#A39D93] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-[#171717] mb-2">
                      {formConfig.intentLabel || "I am interested in"}
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-white/70 border border-[#E5DFD3] hover:border-[#B8945A]/50 focus:border-[#B8945A] px-4 py-3.5 text-sm text-[#171717] focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="">Select an option</option>
                      {(formConfig.intentOptions || [
                        "Buying a Luxury Property",
                        "Selling / Listing an Estate",
                        "Property Valuation & Advisory",
                        "General Inquiry"
                      ]).map((option: string) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] font-semibold text-[#171717] mb-2">
                    {formConfig.messageLabel || "Your Message / Requirements *"}
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={formConfig.messagePlaceholder || "Tell us about your requirements, preferred locations, budget, or any questions..."}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/70 border border-[#E5DFD3] hover:border-[#B8945A]/50 focus:border-[#B8945A] px-4 py-3.5 text-sm text-[#171717] placeholder:text-[#A39D93] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#B8945A] hover:bg-[#9E7D46] text-[#F7F4EE] text-xs font-semibold uppercase tracking-[0.25em] transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                >
                  {formConfig.submitButtonText || "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
