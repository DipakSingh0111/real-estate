"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import defaultData from "@/data/properties.json";

interface BlogPost {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  slug?: string;
}

interface BlogSectionProps {
  posts?: BlogPost[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  posts = (defaultData as any).blogPosts?.slice(0, 3) || [],
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    return () => el.removeEventListener("scroll", checkScroll);
  }, [posts]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const clientWidth = scrollContainerRef.current.clientWidth;
    const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section id="journal" className="relative bg-[#F7F4EE] py-14 sm:py-16 border-t border-[#E5DFD3]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header with Navigation */}
        <div className="mb-10 sm:mb-16 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#171717] font-normal tracking-tight">
              Latest Blog & Articles
            </h2>
          </div>

          {/* Navigation Arrows for Mobile Slide */}
          <div className="flex md:hidden items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous Article"
              className={`w-10 h-10 border border-[#E5DFD3] flex items-center justify-center transition-all ${
                canScrollLeft
                  ? "bg-[#F7F4EE] text-[#171717] hover:border-[#B8945A] hover:text-[#B8945A] cursor-pointer"
                  : "border-[#E5DFD3]/40 text-[#737373]/30 cursor-not-allowed"
              }`}
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Next Article"
              className={`w-10 h-10 border border-[#E5DFD3] flex items-center justify-center transition-all ${
                canScrollRight
                  ? "bg-[#F7F4EE] text-[#171717] hover:border-[#B8945A] hover:text-[#B8945A] cursor-pointer"
                  : "border-[#E5DFD3]/40 text-[#737373]/30 cursor-not-allowed"
              }`}
            >
              →
            </button>
          </div>
        </div>

        {/* Blog Container: Smooth 1-Card Snap Slide on Mobile, 3-Column Grid on Tablet/Desktop */}
        <div
          ref={scrollContainerRef}
          className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {posts.map((post: BlogPost) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug || post.id}`}
              className="snap-start shrink-0 w-full md:w-auto group flex flex-col bg-[#F7F4EE] border border-[#E5DFD3] hover:border-[#B8945A]/60 transition-colors duration-300"
            >
              {/* Image Frame with Zoom */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#171717]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-[#171717]/85 backdrop-blur-sm px-3 py-1">
                  <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#B8945A]">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-[#737373] tracking-wider mb-3">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-[#B8945A]" />
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif text-[#171717] font-normal leading-snug group-hover:text-[#B8945A] transition-colors duration-200 mb-3">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#737373] font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E5DFD3] flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#171717] group-hover:text-[#B8945A] transition-colors">
                    Explore Article
                  </span>
                  <svg
                    className="w-4 h-4 text-[#B8945A] transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
