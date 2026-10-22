import React from "react";
import Link from "next/link";
import estateData from "@/data/properties.json";

import type { BreadcrumbHeaderProps } from "@/types/realestate.types";

export const BreadcrumbHeader: React.FC<BreadcrumbHeaderProps> = ({
  badge,
  title = "Our",
  titleHighlight = "Properties",
  breadcrumbs,
  backgroundImage = (estateData as any).company?.breadcrumbBackgroundImage || "/images/hero-banner.png",
}) => {
  return (
    <section className="section-shell relative min-h-[340px] sm:min-h-[380px] lg:min-h-[420px] flex items-center pt-32 pb-16 select-none overflow-hidden bg-[#171717] border-b border-[#262626]">
      
      <div
        className="absolute inset-0 bg-cover bg-center z-0 scale-100 opacity-90"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-r from-[#171717] via-[#171717]/80 to-transparent pointer-events-none"
        style={{
          WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0) 65%)",
          maskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0) 65%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-16 z-[1] bg-gradient-to-t from-[#171717]/40 to-transparent pointer-events-none" />

      
      <div className="relative z-10 section-container">

        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#F7F4EE] leading-[1.12]">
          {title}{" "}
          {titleHighlight && (
            <span className="text-[#B8945A] font-serif font-normal ml-2">
              {titleHighlight}
            </span>
          )}
        </h1>

        
        <nav aria-label="Breadcrumb" className="mt-5">
          <ol className="flex items-center flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm font-medium">
            
            <li>
              <Link
                href="/"
                className="flex items-center gap-1.5 text-[#F7F4EE]/70 hover:text-[#B8945A] transition-colors"
              >
                <svg
                  className="w-4 h-4 text-[#B8945A]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span>Home</span>
              </Link>
            </li>

            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <React.Fragment key={item.label}>
                  
                  <li className="text-[#F7F4EE]/30 text-xs">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </li>

                  
                  <li>
                    {isLast ? (
                      <span className="text-[#B8945A] font-medium tracking-wide">
                        {item.label}
                      </span>
                    ) : (
                      <Link
                        href={item.href || "#"}
                        className={`transition-colors tracking-wide ${
                          item.active
                            ? "text-[#B8945A] font-semibold"
                            : "text-[#F7F4EE]/70 hover:text-[#B8945A]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                </React.Fragment>
              );
            })}
          </ol>
        </nav>
      </div>
    </section>
  );
};
