import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbHeader } from "@/components/ui/BreadcrumbHeader";
import { RevealCard } from "@/components/animations/Reveal";
import defaultData from "@/data/properties.json";
import type { BlogPostItem } from "@/types/realestate.types";
import { getEstateSections } from "@/lib/estate";

function getBlogPosts(): BlogPostItem[] {
  const sections = getEstateSections();
  return (
    (sections.BlogNews?.variants?.AuraEstatesBlogNews1?.list as BlogPostItem[]) ||
    (((defaultData as any).blogPosts || []) as BlogPostItem[])
  );
}

export default function BlogPage() {
  const sections = getEstateSections();
  const blogNewsVariant = sections.BlogNews?.variants?.AuraEstatesBlogNews1;
  const blogPosts = (blogNewsVariant?.list as BlogPostItem[]) || getBlogPosts();
  const blogConfig = blogNewsVariant?.blogConfig;
  const blogDetails = blogNewsVariant?.blogDetails;

  const headerBadge = blogDetails?.badge || "Editorial Intelligence";
  const headerTitle = blogDetails?.title || "Latest";
  const headerHighlight = blogDetails?.titleHighlight || "Articles";
  const breadcrumbLabel = blogDetails?.breadcrumbLabel || "Blog";
  const latestHeading = blogConfig?.latestArticlesHeading || "Latest Blog & Articles";
  const readArticleText = blogConfig?.readArticleText || "Read Article";

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#171717]">
      <BreadcrumbHeader
        badge={headerBadge}
        title={headerTitle}
        titleHighlight={headerHighlight}
        breadcrumbs={[{ label: breadcrumbLabel, active: true }]}
      />

      <div className="section-shell py-14 sm:py-16">
        <div className="section-container">
        <div className="mb-12 pb-6 border-b border-[#E5DFD3]">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171717] tracking-tight">
            {latestHeading}
          </h2>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {blogPosts.map((post, idx) => (
            <RevealCard key={post.id} index={idx}>
              <Link
                href={`/blog/${post.slug || post.id}`}
                className="group flex flex-col bg-[#F7F4EE] border border-[#E5DFD3] hover:border-[#B8945A]/60 transition-colors duration-300"
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
                    <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-white">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-serif text-[#171717] font-normal leading-snug group-hover:text-[#B8945A] transition-colors duration-200 mb-2.5 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs sm:text-[13px] text-[#737373] font-light leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#E5DFD3] flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#171717] group-hover:text-[#B8945A] transition-colors">
                      {readArticleText}
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
            </RevealCard>
          ))}
        </div>
        </div>
      </div>
    </main>
  );
}
