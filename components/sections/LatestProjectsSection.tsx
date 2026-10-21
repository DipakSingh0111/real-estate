"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import defaultData from "@/data/properties.json";
import { LatestProjectsData } from "@/types/estate";

interface LatestProjectsSectionProps {
  data?: LatestProjectsData;
}

export const LatestProjectsSection: React.FC<LatestProjectsSectionProps> = ({
  data = defaultData.latestProjects,
}) => {
  return (
    <section id="developments" className="relative bg-[#F7F4EE] text-[#171717] py-14 sm:py-16 px-6 sm:px-8 lg:px-12 border-t border-[#E5DFD3]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#171717]">
            Latest Projects
          </h2>
        </div>

        {/* 3 Showcase Project Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {data.projects.slice(0, 3).map((project: any) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug || project.id}`}
              className="group bg-[#F7F4EE] border border-[#E5DFD3] hover:border-[#B8945A]/60 transition-colors duration-300 flex flex-col justify-between"
            >
              {/* Project Image Box */}
              <div className="relative aspect-[16/11] overflow-hidden bg-[#171717]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                <div className="absolute top-4 left-4 z-10 bg-[#171717]/85 backdrop-blur-sm px-3 py-1">
                  <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#B8945A]">
                    {project.status}
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-10 bg-[#B8945A] px-3 py-1">
                  <span className="text-[10px] font-bold tracking-wider text-[#F7F4EE]">
                    From {project.startingPrice}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#B8945A] font-semibold block mb-1">
                    {project.location}
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-[#171717] group-hover:text-[#B8945A] transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#737373] font-light leading-relaxed">
                    {project.units}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E5DFD3] flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#171717] group-hover:text-[#B8945A] transition-colors">
                    Explore Project
                  </span>
                  <span className="text-[#B8945A] text-sm">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
