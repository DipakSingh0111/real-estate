import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import defaultData from "@/data/properties.json";
import { BreadcrumbHeader } from "@/components/ui/BreadcrumbHeader";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const projects = (defaultData as any).latestProjects.projects;
  return projects.flatMap((p: any) => [
    { id: p.slug },
    { id: p.id },
  ]);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = (defaultData as any).latestProjects.projects.find(
    (p: any) => p.slug === id || p.id === id
  );

  if (!project) {
    return {
      title: "Project Not Found | Aura Estates",
    };
  }

  return {
    title: `${project.title} | Landmark Developments | Aura Estates`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const projects = (defaultData as any).latestProjects.projects;
  const project = projects.find((p: any) => p.slug === id || p.id === id);

  if (!project) {
    notFound();
  }

  const otherProjects = projects.filter((p: any) => p.id !== project.id).slice(0, 3);

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#171717]">
      {/* 1. Breadcrumb Hero Header */}
      <BreadcrumbHeader
        badge={project.developer || "Landmark Portfolio"}
        title={project.title}
        breadcrumbs={[
          { label: "Projects", href: "/projects" },
          { label: project.title, active: true },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14 sm:py-16">
        {/* 2. Top Overview Bar */}
        <div className="bg-[#171717] text-[#F7F4EE] p-8 sm:p-10 mb-12 border border-[#262626] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_12px_40px_rgba(23,23,23,0.08)]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#B8945A]">
                {project.status}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#B8945A]" />
              <span className="text-xs uppercase tracking-wider text-[#737373]">
                {project.location}
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#F7F4EE] font-normal tracking-tight">
              {project.title}
            </h1>
            <p className="text-sm text-[#737373] font-light mt-1">
              Configuration: <span className="text-[#F7F4EE] font-normal">{project.units}</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-4 md:pt-0 border-t md:border-t-0 border-[#262626]">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#737373] block mb-0.5">
                Starting Price
              </span>
              <span className="font-serif text-2xl sm:text-3xl text-[#B8945A] font-light block">
                {project.startingPrice}
              </span>
            </div>

            <a
              href="/contact"
              className="px-8 py-3.5 bg-[#B8945A] hover:bg-[#9E7D46] text-[#171717] text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 text-center whitespace-nowrap shadow-lg"
            >
              Inquire Privately →
            </a>
          </div>
        </div>

        {/* 3. Main Gallery Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-14">
          {/* Hero Featured Image */}
          <div className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-[#171717] border border-[#E5DFD3]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          </div>

          {/* Side Thumbnail Stack */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-6">
            {(project.gallery || [project.image]).slice(1, 3).map((imgUrl: string, idx: number) => (
              <div
                key={idx}
                className="relative aspect-[16/10] overflow-hidden bg-[#171717] border border-[#E5DFD3]"
              >
                <Image
                  src={imgUrl}
                  alt={`${project.title} view ${idx + 2}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 4. Details Grid: Narrative & Highlights vs Specs Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16 items-start">
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#171717] font-normal mb-4 tracking-tight">
                Architectural Concept & Vision
              </h2>
              <p className="text-base sm:text-lg text-[#737373] font-light leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Key Project Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="p-8 bg-[#F7F4EE] border border-[#E5DFD3]">
                <h3 className="font-serif text-xl sm:text-2xl text-[#171717] font-normal mb-6">
                  Signature Landmark Highlights
                </h3>
                <ul className="space-y-4">
                  {project.highlights.map((highlight: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-4 text-sm sm:text-base text-[#171717] font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B8945A] mt-2.5 shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Amenities Grid */}
            <div>
              <h3 className="font-serif text-2xl text-[#171717] font-normal mb-6 tracking-tight">
                Curated Amenities & Services
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {project.amenities.map((amenity: string, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 bg-white/70 border border-[#E5DFD3] text-center flex flex-col items-center justify-center min-h-[90px]"
                  >
                    <span className="w-6 h-[1.5px] bg-[#B8945A] mb-2" />
                    <span className="text-xs uppercase tracking-wider text-[#171717] font-medium leading-snug">
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Specs Card */}
          <div className="lg:col-span-5 space-y-8 sticky top-28">
            <div className="bg-[#171717] text-[#F7F4EE] p-8 border border-[#262626] shadow-xl">
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#B8945A] block mb-2">
                Project Dossier
              </span>
              <h3 className="font-serif text-2xl text-[#F7F4EE] font-normal mb-6">
                Key Specifications
              </h3>

              <div className="divide-y divide-[#262626]">
                <div className="py-3.5 flex justify-between items-center text-sm">
                  <span className="text-[#737373] uppercase tracking-wider text-xs">Developer</span>
                  <span className="text-[#F7F4EE] font-light">{project.developer}</span>
                </div>
                <div className="py-3.5 flex justify-between items-center text-sm">
                  <span className="text-[#737373] uppercase tracking-wider text-xs">Architectural Design</span>
                  <span className="text-[#F7F4EE] font-light">{project.architect || "Signature International Studio"}</span>
                </div>
                <div className="py-3.5 flex justify-between items-center text-sm">
                  <span className="text-[#737373] uppercase tracking-wider text-xs">Timeline / Completion</span>
                  <span className="text-[#F7F4EE] font-light">{project.completionYear || "2026"}</span>
                </div>
                <div className="py-3.5 flex justify-between items-center text-sm">
                  <span className="text-[#737373] uppercase tracking-wider text-xs">Project Scale</span>
                  <span className="text-[#F7F4EE] font-light">{project.totalTowers || "Master Landmark"}</span>
                </div>
                <div className="py-3.5 flex justify-between items-center text-sm">
                  <span className="text-[#737373] uppercase tracking-wider text-xs">Total Inventory</span>
                  <span className="text-[#F7F4EE] font-light">{project.totalUnits || "Ultra-Limited"}</span>
                </div>

                {project.specs?.map((spec: any, idx: number) => (
                  <div key={idx} className="py-3.5 flex justify-between items-center text-sm">
                    <span className="text-[#737373] uppercase tracking-wider text-xs">{spec.label}</span>
                    <span className="text-[#F7F4EE] font-light">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#262626] space-y-3">
                <a
                  href="/contact"
                  className="w-full py-4 bg-[#B8945A] hover:bg-[#9E7D46] text-[#171717] font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 block text-center"
                >
                  Request Floor Plans & Pricing
                </a>
                <a
                  href="tel:+919876543210"
                  className="w-full py-3.5 bg-transparent border border-[#262626] hover:border-white text-[#F7F4EE] text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 block text-center"
                >
                  Direct Inquiry Line
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
