"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbHeader } from "@/components/ui/BreadcrumbHeader";
import { BlogPost } from "@/types/estate";

interface BlogDetailsClientProps {
  initialPost: BlogPost;
  allPosts: BlogPost[];
}

export const BlogDetailsClient: React.FC<BlogDetailsClientProps> = ({
  initialPost,
  allPosts,
}) => {
  // Active post managed dynamically in state so it changes instantly without full reload
  const [currentPost, setCurrentPost] = useState<BlogPost>(initialPost);

  // Extract all unique categories
  const categories = Array.from(new Set(allPosts.map((p) => p.category)));

  // Handle clicking a category: open the primary article of that category
  const handleSelectCategory = (cat: string) => {
    const matched = allPosts.find((p) => p.category === cat);
    if (matched) {
      setCurrentPost(matched);
      window.history.pushState(null, "", `/blog/${matched.slug || matched.id}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Handle clicking a recent blog: open that blog in the same page
  const handleSelectPost = (post: BlogPost) => {
    setCurrentPost(post);
    window.history.pushState(null, "", `/blog/${post.slug || post.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Related posts (excluding current post)
  const relatedPosts = allPosts.filter((p) => p.id !== currentPost.id).slice(0, 3);

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#171717]">
      {/* 1. Standard Reusable Breadcrumb Header */}
      <BreadcrumbHeader
        badge="Editorial Intelligence"
        title="Latest"
        titleHighlight="Articles"
        breadcrumbs={[
          { label: "Blog", href: "/blog" },
          { label: currentPost.category, active: true },
        ]}
      />

      {/* 2. Article Core Container */}
      <article className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-10 sm:pt-14 pb-20">
        {/* 3. Featured Image Frame */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] mb-12 sm:mb-16 overflow-hidden bg-[#171717] border border-[#E5DFD3]">
          <Image
            src={currentPost.image}
            alt={currentPost.title}
            fill
            priority
            sizes="100vw"
            className="object-cover transition-all duration-700"
          />
        </div>

        {/* 4. Article Core Layout with Screenshot-Style Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Main Narrative Content */}
          <div className="lg:col-span-8 space-y-10">
            {/* Key Takeaways Box */}
            {currentPost.keyTakeaways && currentPost.keyTakeaways.length > 0 && (
              <div className="p-8 bg-[#171717] text-[#F7F4EE] border border-[#262626]">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#B8945A]" />
                  <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#B8945A]">
                    Executive Summary & Fiduciary Insights
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#F7F4EE] font-normal mb-5">
                  Core Architectural & Capital Takeaways
                </h3>
                <ul className="space-y-4">
                  {currentPost.keyTakeaways.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3.5 text-sm sm:text-base text-[#E5DFD3] font-light leading-relaxed"
                    >
                      <span className="text-[#B8945A] font-semibold text-sm mt-0.5">
                        0{idx + 1}.
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article Sections / Content */}
            {currentPost.content && currentPost.content.length > 0 ? (
              <div className="space-y-10 text-[#171717]">
                {currentPost.content.map((section, idx) => (
                  <div key={idx} className="space-y-4">
                    <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#171717] tracking-tight">
                      {section.heading}
                    </h2>
                    {section.body.map((pText, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-base sm:text-lg text-[#404040] font-light leading-relaxed"
                      >
                        {pText}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6 text-[#171717]">
                <p className="text-base sm:text-lg text-[#404040] font-light leading-relaxed">
                  {currentPost.excerpt}
                </p>
              </div>
            )}
          </div>

          {/* Right Sidebar - Styled matching user image */}
          <aside className="lg:col-span-4 space-y-7 sticky top-28">
            {/* 1. Categories Card */}
            <div className="bg-[#EFEAE2]/70 p-6 sm:p-7 rounded-[28px] border border-[#E5DFD3]/80">
              <h3 className="text-2xl font-bold text-[#171717] mb-5 tracking-tight">
                Categories
              </h3>
              <div className="space-y-3">
                {categories.map((cat) => {
                  const isCurrent = cat === currentPost.category;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleSelectCategory(cat)}
                      className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                        isCurrent
                          ? "bg-[#B85D19] text-white shadow-sm"
                          : "bg-white text-[#2B2B2B] hover:bg-[#F9F7F3] border border-[#E8E2D8]"
                      }`}
                    >
                      <span className="truncate pr-2">{cat}</span>
                      <svg
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isCurrent ? "text-white" : "text-[#B85D19]"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Recent Blogs Card */}
            <div className="bg-[#EFEAE2]/70 p-6 sm:p-7 rounded-[28px] border border-[#E5DFD3]/80">
              <h3 className="text-2xl font-bold text-[#171717] mb-6 tracking-tight">
                Recent Blogs
              </h3>
              <div className="space-y-5">
                {allPosts.slice(0, 5).map((rPost) => {
                  const isCurrent = rPost.id === currentPost.id;
                  return (
                    <button
                      key={rPost.id}
                      type="button"
                      onClick={() => handleSelectPost(rPost)}
                      className="w-full flex items-center gap-4 group text-left cursor-pointer transition-opacity"
                    >
                      {/* Thumbnail Image */}
                      <div className="relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden bg-[#171717]">
                        <Image
                          src={rPost.image}
                          alt={rPost.title}
                          fill
                          sizes="80px"
                          className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                        />
                      </div>

                      {/* Blog Title & Date */}
                      <div className="flex-1 min-w-0">
                        <h4
                          className={`text-sm sm:text-[14px] font-bold line-clamp-2 leading-snug mb-1.5 transition-colors ${
                            isCurrent
                              ? "text-[#B85D19]"
                              : "text-[#171717] group-hover:text-[#B85D19]"
                          }`}
                        >
                          {rPost.title}
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs text-[#737373]">
                          {/* Calendar Icon */}
                          <svg
                            className="w-3.5 h-3.5 text-[#B85D19] shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="font-medium text-[#737373]">
                            {rPost.date}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
};
