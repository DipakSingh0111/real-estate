"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import defaultData from "@/data/properties.json";
import { ProjectItem } from "@/types/estate";

export interface ProjectsSectionProps {
  projects?: ProjectItem[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects = defaultData.latestProjects.projects,
}) => {
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const filterTabs = [
    { label: "All Projects", key: "ALL" },
    { label: "Ready to Move", key: "Ready Possession" },
    { label: "Under Construction", key: "Under Construction" },
    { label: "New Launch", key: "Newly Launched" },
  ];

  const filteredProjects =
    selectedStatus === "ALL"
      ? projects
      : projects.filter((p) => p.status === selectedStatus);

  return (
    <section className="pt-14 pb-14 sm:pt-16 sm:pb-16 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Section Header & Filter Pills */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 pb-8 border-b border-[#E5DFD3]">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[1.5px] bg-[#B8945A]" />
            <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-[#B8945A]">
              Iconic Developments
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#171717] font-normal tracking-tight">
            Curated Architectural Landmarks
          </h2>
        </div>

        {/* Filter Status Buttons - Single Horizontal Line */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar whitespace-nowrap shrink-0 pb-1">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setSelectedStatus(tab.key)}
              className={`px-4 py-2 border text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 cursor-pointer shrink-0 ${
                selectedStatus === tab.key
                  ? "bg-[#B8945A] border-[#B8945A] text-[#F7F4EE] font-semibold"
                  : "bg-transparent border-[#E5DFD3] text-[#171717] hover:border-[#B8945A] hover:text-[#B8945A]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Luxury Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project: any) => (
          <Link
            key={project.id}
            href={`/projects/${project.slug || project.id}`}
            className="group flex flex-col bg-[#F7F4EE] border border-[#E5DFD3] hover:border-[#B8945A]/60 transition-colors duration-300"
          >
            {/* Image Box */}
            <div className="relative aspect-[16/11] overflow-hidden bg-[#171717]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-[#171717]/85 backdrop-blur-sm px-3 py-1">
                <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#B8945A]">
                  {project.status}
                </span>
              </div>
            </div>

            {/* Info Body */}
            <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#B8945A] font-semibold block mb-1">
                  {project.location}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#171717] font-normal group-hover:text-[#B8945A] transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#737373] font-light leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E5DFD3] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#737373] block">Starting from</span>
                  <span className="text-base font-serif text-[#B8945A] font-normal">{project.startingPrice}</span>
                </div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#171717] group-hover:text-[#B8945A] transition-colors">
                  Details →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
