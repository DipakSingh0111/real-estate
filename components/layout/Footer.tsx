"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ImageItem, SectionProps } from "@/types/realestate.types";

import {
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa6";

export const Footer: React.FC<
  SectionProps.Footer & { logo?: ImageItem }
> = ({ data, logo }) => {
  const footerLogoSrc =
    logo?.light || logo?.src || "/images/Footer_logo.png";
  const pathname = usePathname();

  const navigation = data?.navigation || [];
  const enclaves = data?.topEnclaves || [];
  const description =
    data?.description ||
    "India's premier luxury real estate advisory. Curating distinctive palazzos, sky mansions, and private sanctuaries for the world's most discerning families.";
  const socials = data?.socials || [];
  const gallery = data?.gallery || [];
  const copyright =
    data?.copyright || "Copyright © 2026 Aura Estates. All Rights Reserved.";

  const getSocialIcon = (name: string) => {
    const n = (name || "").toLowerCase();
    if (n.includes("instagram") || n.includes("ig")) {
      return <FaInstagram className="w-5 h-5" />;
    }
    if (n.includes("linkedin") || n.includes("in")) {
      return <FaLinkedinIn className="w-5 h-5" />;
    }
    if (n.includes("facebook") || n.includes("fb")) {
      return <FaFacebookF className="w-5 h-5" />;
    }
    return <FaYoutube className="w-5 h-5" />;
  };

  return (
    <footer className="relative bg-[#EFEAE1] text-[#171717] pt-14 pb-8 border-t border-[#DED7CA] select-none section-shell">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#DED7CA] items-start">
          <div className="lg:col-span-4 space-y-5 pr-0 lg:pr-6">
            <Link href="/" className="inline-flex group cursor-pointer">
              <img
                src={footerLogoSrc}
                alt={logo?.alt || "Aura Estates Logo"}
                className="brand-logo-footer group-hover:scale-105"
              />
            </Link>

            <p className="text-sm sm:text-[15px] text-[#555555] leading-relaxed font-light">
              {description}
            </p>

            {socials.length > 0 && (
              <div className="flex items-center gap-3 pt-2">
                {socials.map((s, idx) => (
                  <a
                    key={s.name || idx}
                    href={s.url || "#"}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.name}
                    className="w-11 h-11 rounded-full border border-[#D5CEC0] bg-[#FAF8F5] hover:border-[#B8945A] hover:bg-[#B8945A] text-[#171717] hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    {getSocialIcon(s.name)}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="border-b border-[#DED7CA] pb-2">
              <h4 className="text-[13px] sm:text-sm uppercase tracking-[0.25em] text-[#B8945A] font-semibold">
                Navigation
              </h4>
            </div>
            <ul className="space-y-3">
              {navigation.map((item) => {
                const label = item.label || item.name;
                const isActive =
                  (item.href === "/" && pathname === "/") ||
                  (item.href === "/contact" && pathname === "/contact") ||
                  (item.href !== "/" && pathname?.startsWith(item.href));

                return (
                  <li key={label}>
                    <Link
                      href={item.href}
                      className={`text-[14px] sm:text-[15px] transition-all duration-200 inline-flex items-center gap-2.5 ${
                        isActive
                          ? "text-[#B8945A] font-semibold"
                          : "text-[#555555] hover:text-[#171717] hover:translate-x-1"
                      }`}
                    >
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B8945A]" />
                      )}
                      <span>{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <div className="border-b border-[#DED7CA] pb-2">
              <h4 className="text-[13px] sm:text-sm uppercase tracking-[0.25em] text-[#B8945A] font-semibold">
                Prime Enclaves
              </h4>
            </div>
            <ul className="space-y-3">
              {enclaves.map((enclave) => {
                const label = enclave.label || enclave.name;
                return (
                  <li key={label}>
                    <Link
                      href={enclave.href}
                      className="text-[14px] sm:text-[15px] text-[#555555] hover:text-[#171717] hover:translate-x-1 transition-all duration-200 block"
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <div className="border-b border-[#DED7CA] pb-2">
              <h4 className="text-[13px] sm:text-sm uppercase tracking-[0.25em] text-[#B8945A] font-semibold">
                Sanctuaries
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {gallery.map((item, i) => (
                <Link
                  key={i}
                  href={item.href || "/listings"}
                  className="group relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-[#D5CEC0] hover:border-[#B8945A] shadow-sm hover:shadow-md transition-all duration-300 bg-white"
                >
                  <Image
                    src={item.image}
                    alt={item.alt || "Sanctuary"}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
                  {item.tag && (
                    <span className="absolute bottom-1.5 left-2 text-[11px] uppercase tracking-wider text-white font-medium">
                      {item.tag}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex items-center justify-center text-center">
          <p className="text-sm sm:text-[15px] text-[#666666] font-normal tracking-wide">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};
