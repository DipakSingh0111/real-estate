import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import defaultData from "@/data/properties.json";
import { BlogPostItem } from "@/types/realestate.types";
import { BlogDetailsClient } from "@/components/sections/BlogDetailsClient";
import { getEstateSections } from "@/lib/estate";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getPosts(): BlogPostItem[] {
  const sections = getEstateSections();
  return (
    (sections?.BlogNews?.variants?.AuraEstatesBlogNews1?.list as any) ||
    (defaultData as any)?.blogPosts ||
    []
  );
}

export async function generateStaticParams() {
  const posts = getPosts();
  return posts.flatMap((p: BlogPostItem) => [
    { slug: p.slug },
    { slug: p.id },
  ]);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const posts = getPosts();
  const post = posts.find((p) => p.slug === slug || p.id === slug);

  if (!post) {
    return {
      title: "Article Not Found | Aura Estates Journal",
    };
  }

  return {
    title: `${post.title} | Aura Estates Journal`,
    description: post.excerpt || post.subtitle,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const posts = getPosts();
  const post = posts.find((p) => p.slug === slug || p.id === slug);

  if (!post) {
    notFound();
  }

  const sections = getEstateSections();
  const config = sections?.BlogNews?.variants?.AuraEstatesBlogNews1?.blogDetails;

  return <BlogDetailsClient initialPost={post} allPosts={posts} config={config} />;
}
