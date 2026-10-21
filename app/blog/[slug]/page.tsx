import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import defaultData from "@/data/properties.json";
import { BlogPost } from "@/types/estate";
import { BlogDetailsClient } from "@/components/sections/BlogDetailsClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = (defaultData as any).blogPosts || [];
  return posts.flatMap((p: BlogPost) => [
    { slug: p.slug },
    { slug: p.id },
  ]);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const posts: BlogPost[] = (defaultData as any).blogPosts || [];
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
  const posts: BlogPost[] = (defaultData as any).blogPosts || [];
  const post = posts.find((p) => p.slug === slug || p.id === slug);

  if (!post) {
    notFound();
  }

  return <BlogDetailsClient initialPost={post} allPosts={posts} />;
}
