"use client";

import React, { useState } from "react";
import defaultData from "@/data/properties.json";
import { FooterData } from "@/types/estate";

export interface FooterProps {
  data?: FooterData;
}

export const Footer: React.FC<FooterProps> = ({
  data = defaultData.footer,
}) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const enclaves = (data as any)?.topEnclaves || (data as any)?.enclaves || [
    { name: "Worli, Mumbai", href: "/listings?city=mumbai" },
    { name: "Golf Links, Delhi NCR", href: "/listings?city=delhi-ncr" },
    { name: "Indiranagar, Bangalore", href: "/listings?city=bangalore" },
    { name: "Jubilee Hills, Hyderabad", href: "/listings?city=hyderabad" },
    { name: "Assagao, Goa", href: "/listings?city=goa" },
  ];

  const navigation = data?.navigation || [
    { name: "Curated Estates", href: "/#listings" },
    { name: "About Aura", href: "/#about" },
    { name: "Architectural Typologies", href: "/#categories" },
    { name: "Why Aura", href: "/#why-us" },
    { name: "Blog & Articles", href: "/blog" },
    { name: "Inquiries & FAQ", href: "/#faq" },
  ];

  return (
    <footer className="relative bg-[#171717] text-[#F7F4EE] pt-14 sm:pt-16 pb-12 px-6 sm:px-8 lg:px-12 select-none border-t border-[#262626] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#262626]">
          {/* Column 1: Brand Info (col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo */}
            <div className="flex items-center justify-start">
              <a href="/" className="inline-flex items-center group cursor-pointer -ml-1">
                <img
                  src={(defaultData as any).company?.logo || "/images/Logo.png"}
                  alt="Aura Estates Logo"
                  className="h-11 sm:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </a>
            </div>

            <p className="text-sm sm:text-base text-[#999999] leading-relaxed max-w-sm font-light">
              {data.description || "Curating distinctive palazzos, sky mansions, and private sanctuaries for the world's most discerning families."}
            </p>

            {/* Social Icons with Gold Border */}
            <div className="flex items-center gap-3 pt-2">
              {["IG", "IN", "FB", "YT"].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="w-10 h-10 border border-[#262626] hover:border-[#B8945A] hover:bg-[#B8945A] text-[#999999] hover:text-[#171717] flex items-center justify-center transition-all duration-300 text-xs font-semibold tracking-wider uppercase"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation Links (col-span-2) */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-[#B8945A]">
              Navigation
            </h4>
            <ul className="space-y-3.5">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm sm:text-[15px] text-[#A3A3A3] hover:text-[#F7F4EE] transition-colors duration-200 tracking-wide block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Top Enclaves (col-span-2) */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-[#B8945A]">
              Prime Enclaves
            </h4>
            <ul className="space-y-3.5">
              {enclaves.map((enclave: any) => (
                <li key={enclave.name}>
                  <a
                    href={enclave.href}
                    className="text-sm sm:text-[15px] text-[#A3A3A3] hover:text-[#F7F4EE] transition-colors duration-200 tracking-wide block"
                  >
                    {enclave.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter / Portfolio Subscription (col-span-4) */}
          <div className="lg:col-span-4 space-y-5">
            <h4 className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-[#B8945A]">
              Private Portfolio Dispatches
            </h4>
            <p className="text-sm sm:text-[15px] text-[#A3A3A3] leading-relaxed font-light">
              Receive confidential invitations to off-market auctions, private previews, and quarterly luxury market reports.
            </p>

            {subscribed ? (
              <div className="p-4 bg-[#B8945A]/10 border border-[#B8945A] text-sm text-[#B8945A] font-medium">
                Thank you. Your discrete invitation has been registered.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center border border-[#262626] focus-within:border-[#B8945A] transition-colors bg-[#171717]">
                <input
                  type="email"
                  required
                  placeholder="Enter your private email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent px-4 py-3 text-sm text-[#F7F4EE] placeholder-[#737373] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#B8945A] hover:bg-[#9E7D46] text-[#171717] text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 shrink-0"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}

            <p className="text-xs text-[#737373] font-light">
              Discreet & confidential. Never shared with third parties.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal Policies */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#888888] font-light">
          <p>{data?.copyright || "© 2026 Aura Estates International. All Rights Reserved."}</p>
          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-[13px] uppercase tracking-wider">
            <a href="/#" className="hover:text-[#B8945A] transition-colors">Privacy Policy</a>
            <a href="/#" className="hover:text-[#B8945A] transition-colors">Terms of Engagement</a>
            <a href="/#" className="hover:text-[#B8945A] transition-colors">RERA Compliance</a>
            <a href="/#" className="hover:text-[#B8945A] transition-colors">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
