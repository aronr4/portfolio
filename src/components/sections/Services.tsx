"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { services, type ServiceItem } from "@/data/services";
import { cn } from "@/lib/utils";

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const rowInners = section.querySelectorAll<HTMLElement>(".service-row-inner");

      // Entrance animation for rows
      gsap.fromTo(
        rowInners,
        { yPercent: 40, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: {
            trigger: rowsRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Scroll-linked text darkness reveal for each service row (matching Statement effect)
      rowInners.forEach((row) => {
        const title = row.querySelector<HTMLElement>(".service-title");
        const desc = row.querySelector<HTMLElement>(".service-desc");

        if (title) {
          gsap.fromTo(
            title,
            { color: "var(--inactive)" }, // #c4cfd4
            {
              color: "var(--fg)", // #111618
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top 78%",
                end: "top 45%",
                scrub: true,
              },
            }
          );
        }

        if (desc) {
          gsap.fromTo(
            desc,
            { opacity: 0.35 },
            {
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top 78%",
                end: "top 45%",
                scrub: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Services Section"
      style={{
        paddingTop: "var(--services-pt)",
        paddingLeft: "var(--page-pad-x)",
        paddingRight: "var(--page-pad-x)",
      }}
      className="w-full flex flex-col items-center bg-bg"
    >
      <div
        style={{
          maxWidth: "calc(var(--work-col-width) * 2 + var(--work-col-gap))",
          gap: "var(--services-gap)",
        }}
        className="w-full flex flex-col"
      >
        {/* Section Header with short dash label: — Services. */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 font-body font-medium text-fg mb-1">
            <span className="w-3.5 h-[1.5px] bg-fg inline-block" />
            <span
              style={{
                fontSize: "var(--label-size)",
                lineHeight: "var(--label-lh)",
              }}
            >
              Services.
            </span>
          </div>

          <h2
            style={{
              fontSize: "var(--section-h2-size)",
              lineHeight: "var(--section-h2-lh)",
              letterSpacing: "var(--section-h2-ls)",
              paddingTop: "var(--section-h2-pt)",
              whiteSpace: "pre-line",
            }}
            className="font-display font-semibold text-fg"
          >
            {"What \nI do."}
          </h2>
        </div>

        {/* Services List Rows */}
        <div ref={rowsRef} className="w-full flex flex-col">
          {services.map((item) => {
            const isHovered = hoveredRow === item.id;

            return (
              <div
                key={item.id}
                style={{
                  minHeight: "var(--services-row-pitch)",
                  paddingBottom: "var(--services-row-pb)",
                }}
                className="service-row-inner group flex flex-col justify-between border-b border-black/[0.08] py-8 select-none transition-colors duration-300"
                onMouseEnter={() => setHoveredRow(item.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                  {/* Service Title (Poppins 400, 50px / 55px, scroll-linked darkness from --inactive to --fg, instant --fg on hover) */}
                  <h3
                    style={{
                      fontSize: "var(--service-title-size)",
                      lineHeight: "var(--service-title-lh)",
                      color: isHovered
                        ? "var(--fg)"
                        : prefersReducedMotion
                        ? "var(--fg)"
                        : undefined,
                    }}
                    className="service-title font-body font-normal tracking-tight transition-colors duration-200 cursor-pointer group-hover:!text-fg"
                  >
                    {item.title}
                  </h3>

                  {/* Capabilities / description */}
                  <p
                    style={{
                      fontSize: "var(--label-size)",
                      lineHeight: "var(--label-lh)",
                    }}
                    className="service-desc font-body font-normal text-muted max-w-sm transition-opacity duration-200 group-hover:!opacity-100"
                  >
                    {item.capabilities.join(", ")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
