"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { SectionProps, BlogPostItem } from "@/types/realestate.types";
import { Reveal } from "@/components/animations/Reveal";

export const BlogSection: React.FC<SectionProps.Blog> = ({ data, limit = 3 }) => {
  const posts = (data?.list || []).slice(0, limit);
  const featuredPost = posts[0];
  const secondaryPosts = posts.slice(1, limit);

  const title = data?.heading?.main || "Blog";
  const ctaLabel = data?.cta?.label || "VIEW ALL ARTICLES";
  const ctaHref = data?.cta?.href || "/blog";
  const blogConfig = data?.blogConfig;

  const featuredBadge = blogConfig?.featuredCoverBadge || "FEATURED COVER";
  const readFullText = blogConfig?.readFullFeatureText || "READ FULL FEATURE";
  const readStoryText = blogConfig?.readStoryText || "READ STORY";
  const secondaryBadge02 = blogConfig?.secondaryBadge02 || "02 • ARCHITECTURAL SPOTLIGHT";
  const secondaryBadge03 = blogConfig?.secondaryBadge03 || "03 • PRIVATE WEALTH";

  return (
    <section id="journal" className="section-shell relative bg-[#F7F4EE] pt-10 pb-16 sm:pt-12 sm:pb-20 border-t border-[#E5DFD3]">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#171717] font-normal tracking-tight">
              {title}
            </h2>
          </div>
          <Link
            href={ctaHref}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-[#171717] hover:text-[#B8945A] transition-colors flex items-center gap-2 group cursor-pointer"
          >
            <span>{ctaLabel}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {featuredPost && (
            <Reveal direction="left" className="lg:col-span-7 flex flex-col">
              <Link
                href={`/blog/${featuredPost.slug || featuredPost.id}`}
                className="group flex flex-col flex-1 bg-white border border-[#E5DFD3] shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#171717] shrink-0">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[#171717]/90 backdrop-blur-sm px-3.5 py-1.5 border border-white/10">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#B8945A]">
                      {featuredBadge}
                    </span>
                  </div>
                </div>

                <div className="p-7 sm:p-9 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-[#737373] tracking-wider uppercase font-medium mb-3">
                      <span>{featuredPost.category}</span>
                      <span className="w-1 h-1 rounded-full bg-[#B8945A]" />
                      <span>{featuredPost.date}</span>
                      <span className="w-1 h-1 rounded-full bg-[#B8945A]" />
                      <span>{featuredPost.readTime}</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-[#171717] font-normal leading-snug group-hover:text-[#B8945A] transition-colors mb-3">
                      {featuredPost.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#737373] font-light leading-relaxed line-clamp-3 mb-6">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-[#E5DFD3] flex items-center justify-between mt-auto">
                    <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#171717] group-hover:text-[#B8945A] transition-colors">
                      {readFullText}
                    </span>
                    <span className="text-[#B8945A] transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          <div className="lg:col-span-5 flex flex-col justify-between gap-6 sm:gap-7">
            {secondaryPosts.map((post: BlogPostItem, idx: number) => {
              const badgeLabel = idx === 0 ? secondaryBadge02 : secondaryBadge03;

              return (
                <Reveal key={post.id} direction="right" delay={idx * 0.15} className="flex flex-col flex-1">
                  <Link
                    href={`/blog/${post.slug || post.id}`}
                    className="group flex flex-col flex-1 bg-white border border-[#E5DFD3] shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300"
                  >
                    <div className="relative aspect-[16/7] overflow-hidden bg-[#171717] shrink-0">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-[#171717]/90 backdrop-blur-sm px-2.5 py-1 border border-white/10">
                        <span className="text-[9px] uppercase tracking-[0.18em] font-semibold text-[#B8945A]">
                          {badgeLabel}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                      <div>
                        <h4 className="font-serif text-lg sm:text-xl text-[#171717] font-normal leading-snug group-hover:text-[#B8945A] transition-colors mb-2">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-[#737373] tracking-wider mb-4">
                          <span>{post.date}</span>
                          <span className="w-1 h-1 rounded-full bg-[#B8945A]" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <div className="pt-3.5 border-t border-[#E5DFD3] flex items-center justify-between mt-auto">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#171717] group-hover:text-[#B8945A] transition-colors">
                          {readStoryText}
                        </span>
                        <span className="text-[#B8945A] text-xs transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
