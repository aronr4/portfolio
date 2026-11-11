"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Pulse project pause / play state & slide index
  const [pulsePlaying, setPulsePlaying] = useState(true);
  const [pulseSlide, setPulseSlide] = useState(0);

  // Floating "Open" pill cursor tracking per card
  const [hoveredCardSlug, setHoveredCardSlug] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const featuredProjects = projects.slice(0, 4);

  // Pulse slideshow timer
  useEffect(() => {
    if (!pulsePlaying) return;
    const interval = setInterval(() => {
      setPulseSlide((prev) => (prev === 0 ? 1 : 0));
    }, 2400);
    return () => clearInterval(interval);
  }, [pulsePlaying]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".featured-project-card");

      cards.forEach((card) => {
        const imageWrapper = card.querySelector(".project-image-wrapper");

        if (imageWrapper) {
          gsap.fromTo(
            imageWrapper,
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.2,
              ease: "power4.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                once: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, slug: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredCardSlug(slug);
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-label="Featured Work Section"
      style={{
        paddingLeft: "var(--work-pad-x)",
        paddingRight: "var(--work-pad-x)",
      }}
      className="w-full flex flex-col items-center bg-bg select-none"
    >
      {/* Header Container */}
      <div
        style={{
          maxWidth: "calc(var(--work-col-width) * 2 + var(--work-col-gap))",
        }}
        className="w-full mb-12 flex flex-col"
      >
        {/* Short dash label: — Featured. */}
        <div className="flex items-center gap-2 font-body font-medium text-fg mb-1">
          <span className="w-3.5 h-[1.5px] bg-fg inline-block" />
          <span
            style={{
              fontSize: "var(--label-size)",
              lineHeight: "var(--label-lh)",
            }}
          >
            Featured.
          </span>
        </div>

        <div className="flex items-end justify-between">
          <h2
            style={{
              fontSize: "var(--section-h2-size)",
              lineHeight: "var(--section-h2-lh)",
              letterSpacing: "var(--section-h2-ls)",
              paddingTop: "var(--section-h2-pt)",
            }}
            className="font-display font-semibold text-fg"
          >
            Work.
          </h2>

          {/* ↗ View all projects with leading icon */}
          <Link
            href="/work"
            style={{
              fontSize: "var(--label-size)",
              lineHeight: "var(--label-lh)",
            }}
            className="font-body font-normal text-fg hover:opacity-70 transition-opacity inline-flex items-center gap-1.5 group cursor-pointer"
          >
            <span className="text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
            <span>View all projects</span>
          </Link>
        </div>
      </div>

      {/* 2-Column Grid (431px wide columns, 8px gap, 48px row gap) */}
      <div
        style={{
          maxWidth: "calc(var(--work-col-width) * 2 + var(--work-col-gap))",
          gap: "var(--work-col-gap)",
          rowGap: "var(--work-row-gap)",
        }}
        className="w-full grid grid-cols-1 md:grid-cols-2"
      >
        {featuredProjects.map((project) => {
          const isPulse = project.slug === "pulse";
          const isHovered = hoveredCardSlug === project.slug;

          return (
            <div
              key={project.slug}
              className="featured-project-card flex flex-col group cursor-pointer"
            >
              <Link href={`/projects/${project.slug}`} className="block">
                {/* Image Area (32px radius, scale 1.2 inside overflow-hidden) */}
                <div
                  style={{
                    height: "var(--work-img-height)",
                    borderRadius: "32px",
                  }}
                  className="relative w-full overflow-hidden bg-white/60 cursor-none"
                  onMouseMove={(e) => handleMouseMove(e, project.slug)}
                  onMouseEnter={() => setHoveredCardSlug(project.slug)}
                  onMouseLeave={() => setHoveredCardSlug(null)}
                >
                  <div className="project-image-wrapper relative w-full h-full overflow-hidden">
                    <div
                      className={cn(
                        "project-image-inner absolute inset-0 transition-opacity duration-700",
                        isPulse && pulseSlide === 1 ? "opacity-0" : "opacity-100"
                      )}
                    >
                      <Image
                        src={project.images.hero}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 431px"
                        className={cn(
                          "object-cover transition-transform duration-700 ease-out",
                          isPulse
                            ? "scale-100 group-hover:scale-[1.03]"
                            : "scale-[1.20] group-hover:scale-[1.24]"
                        )}
                      />
                    </div>

                    {isPulse && project.images.secondary && (
                      <div
                        className={cn(
                          "absolute inset-0 transition-opacity duration-700",
                          pulseSlide === 1 ? "opacity-100" : "opacity-0"
                        )}
                      >
                        <Image
                          src={project.images.secondary}
                          alt={`${project.title} slide`}
                          fill
                          sizes="(max-width: 768px) 100vw, 431px"
                          className={cn(
                            "object-cover transition-transform duration-700 ease-out",
                            isPulse
                              ? "scale-100 group-hover:scale-[1.03]"
                              : "scale-[1.20] group-hover:scale-[1.24]"
                          )}
                        />
                      </div>
                    )}
                  </div>

                  {/* Floating "Open" pill cursor badge following pointer over image */}
                  <div
                    style={{
                      transform: `translate(${cursorPos.x}px, ${cursorPos.y}px) translate(-50%, -50%)`,
                      opacity: isHovered ? 1 : 0,
                      scale: isHovered ? 1 : 0.8,
                    }}
                    className="pointer-events-none absolute top-0 left-0 z-30 px-4 py-1.5 rounded-full bg-[#111618] text-white text-xs font-body font-medium shadow-xl transition-all duration-100 ease-out"
                  >
                    Open
                  </div>

                  {/* Pulse Card 48px Glass Pause/Play Button (30px from top and right) */}
                  {isPulse && (
                    <button
                      type="button"
                      aria-label={pulsePlaying ? "Pause preview" : "Play preview"}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setPulsePlaying(!pulsePlaying);
                      }}
                      style={{
                        width: "48px",
                        height: "48px",
                        top: "30px",
                        right: "30px",
                        backgroundColor: "var(--glass)",
                      }}
                      className="absolute z-20 flex items-center justify-center rounded-full text-fg backdrop-blur-md shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      {pulsePlaying ? (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                          <rect x="2" y="1" width="2.5" height="10" rx="0.8" />
                          <rect x="7.5" y="1" width="2.5" height="10" rx="0.8" />
                        </svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                          <path d="M2.5 1.5L10 6L2.5 10.5V1.5Z" />
                        </svg>
                      )}
                    </button>
                  )}
                </div>

                {/* Text Block: 16px gap below image */}
                <div
                  style={{
                    marginTop: "var(--work-img-text-gap)",
                  }}
                  className="flex items-baseline justify-between overflow-hidden"
                >
                  <h5
                    style={{
                      fontSize: "var(--project-title-size)",
                      lineHeight: "var(--project-title-lh)",
                    }}
                    className="font-body font-semibold text-fg"
                  >
                    {project.title}
                  </h5>

                  {/* Metric Line: Leading ↗ swaps to Trailing → on hover while text slides left */}
                  <div
                    style={{
                      fontSize: "var(--project-metric-size)",
                      lineHeight: "var(--project-metric-lh)",
                    }}
                    className="font-body font-normal text-muted flex items-center transition-transform duration-300 group-hover:-translate-x-1"
                  >
                    <span className="transition-all duration-300 group-hover:opacity-0 group-hover:w-0 overflow-hidden inline-block mr-1 text-xs">
                      ↗
                    </span>
                    <span>
                      {project.metric} {project.metricLabel}
                    </span>
                    <span className="transition-all duration-300 opacity-0 w-0 group-hover:opacity-100 group-hover:w-3.5 overflow-hidden inline-block ml-1 text-xs text-fg">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
