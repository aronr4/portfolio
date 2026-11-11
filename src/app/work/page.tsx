"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import Counter from "@/components/ui/Counter";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <main className="container-x py-16 md:py-24">
      {/* Page Header */}
      <div className="border-b border-white/10 pb-12 mb-12">
        <span className="text-xs uppercase tracking-widest text-accent font-display block mb-3">
          Selected Archive
        </span>
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-fg">
          Work<span className="text-accent">.</span>
        </h1>
        <p className="text-muted text-base sm:text-lg max-w-xl font-body mt-4">
          Ideas shaped into brands, products, and digital experiences worth remembering. Selected client engagements from 2024 to 2026.
        </p>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mt-8" role="tablist" aria-label="Project Categories">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-display tracking-wider uppercase transition-all duration-300 min-h-[40px] flex items-center",
                  isSelected
                    ? "bg-accent text-bg font-semibold"
                    : "bg-surface border border-white/10 text-muted hover:text-fg hover:border-white/20"
                )}
                role="tab"
                aria-selected={isSelected}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {filteredProjects.map((project, idx) => (
          <Reveal key={project.slug} variant="clip-up" delay={idx * 0.08}>
            <Link
              href={`/projects/${project.slug}`}
              className="group block bg-surface rounded-2xl overflow-hidden border border-white/10 hover:border-accent/40 transition-all duration-500"
              data-cursor="view"
            >
              {/* Image Preview */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg">
                <Image
                  src={project.images.hero}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 right-4 bg-bg/80 backdrop-blur px-3 py-1 rounded-full text-xs font-display text-accent border border-white/10">
                  {project.year}
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted font-display mb-2">
                    <span>{project.category}</span>
                    <span>•</span>
                    <span>{project.sector}</span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-fg group-hover:text-accent transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-sm text-muted mt-2 font-body line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="flex items-baseline justify-between border-t border-white/10 pt-4 mt-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-2xl sm:text-3xl font-bold text-accent">
                      {project.metric}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-muted font-display">
                      {project.metricLabel}
                    </span>
                  </div>
                  <span className="text-xs uppercase tracking-wider text-fg group-hover:text-accent font-display transition-colors">
                    View Case Study →
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
