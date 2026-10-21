"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import defaultData from "@/data/properties.json";
import { Reveal } from "@/components/animations/Reveal";

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
  const featuredPost = posts[0];
  const secondaryPosts = posts.slice(1, 3);

  return (
    <section id="journal" className="relative bg-[#F7F4EE] py-16 sm:py-20 border-t border-[#E5DFD3]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Editorial Section Header */}
        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-14 pb-6 border-b border-[#E5DFD3] gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#B8945A] block mb-2">
              The Journal
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#171717] font-normal tracking-tight">
              Perspectives & Insights
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-[#171717] hover:text-[#B8945A] transition-colors flex items-center gap-2 group cursor-pointer"
          >
            <span>View All Articles</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>

        {/* Asymmetrical High-Fashion Magazine Layout: 7/12 Featured + 5/12 Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Main Featured Cover Story (Left) */}
          {featuredPost && (
            <Reveal className="lg:col-span-7 flex flex-col" yOffset={40} delay={0.1}>
            <Link
              href={`/blog/${featuredPost.slug || featuredPost.id}`}
              className="group flex flex-col justify-between h-full bg-white border border-[#E5DFD3] hover:border-[#B8945A]/60 shadow-[0_12px_40px_rgba(23,23,23,0.04)] transition-all duration-500 overflow-hidden cursor-pointer"
            >
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#171717]">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/70 via-transparent to-transparent opacity-60" />

                <div className="absolute top-5 left-5 bg-[#171717] text-[#B8945A] text-[10px] uppercase tracking-[0.2em] font-semibold px-3.5 py-1.5 border border-[#B8945A]/30">
                  Featured Cover
                </div>
              </div>

              <div className="p-7 sm:p-8 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-2.5 text-[11px] text-[#737373] tracking-widest uppercase mb-2.5">
                    <span className="text-[#B8945A] font-semibold">{featuredPost.category}</span>
                    <span>•</span>
                    <span>{featuredPost.date}</span>
                    <span>•</span>
                    <span>{featuredPost.readTime}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#171717] font-normal leading-snug group-hover:text-[#B8945A] transition-colors mb-3">
                    {featuredPost.title}
                  </h3>

                  <p className="text-sm text-[#737373] font-light leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-5 mt-6 border-t border-[#E5DFD3] flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#171717] group-hover:text-[#B8945A] transition-colors">
                    Read Full Feature
                  </span>
                  <span className="text-[#B8945A] text-lg transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </div>
              </div>
            </Link>
            </Reveal>
          )}

          {/* Secondary Stacked Editorial Stories (Right) */}
          <Reveal className="lg:col-span-5 flex flex-col justify-between gap-6 sm:gap-8" yOffset={40} delay={0.25}>
            {secondaryPosts.map((post: BlogPost, idx: number) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug || post.id}`}
                className="group flex-1 bg-white border border-[#E5DFD3] hover:border-[#B8945A]/60 shadow-[0_8px_30px_rgba(23,23,23,0.03)] transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
              >
                {/* Prominent High-Resolution Image Header */}
                <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-[#171717]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#171717]/85 backdrop-blur-sm px-2.5 py-1 border border-[#B8945A]/30">
                    <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#B8945A]">
                      0{idx + 2} • {post.category}
                    </span>
                  </div>
                </div>

                {/* Text Body */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h4 className="font-serif text-xl sm:text-2xl text-[#171717] font-normal leading-snug group-hover:text-[#B8945A] transition-colors mb-2">
                      {post.title}
                    </h4>

                    <span className="text-[11px] text-[#737373] tracking-wide block font-light">
                      {post.date} · {post.readTime}
                    </span>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#E5DFD3] flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#171717] group-hover:text-[#B8945A] transition-colors">
                      Read Story
                    </span>
                    <span className="text-[#B8945A] text-sm transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
};
