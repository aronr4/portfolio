"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ExploreProject {
  slug: string;
  title: string;
  metric: string;
  arrow: string;
  image: string;
}

const exploreProjects: ExploreProject[] = [
  {
    slug: "dheerah",
    title: "Dheerah",
    metric: "84% boutique lift",
    arrow: "↗",
    image: "/images/projects/dheerah.jpg",
  },
  {
    slug: "flowfit",
    title: "FlowFit",
    metric: "3x signup lift",
    arrow: "↗",
    image: "https://framerusercontent.com/images/4b5amoeQ9i5PTDQCngUS605p10.jpg",
  },
  {
    slug: "vault-pay",
    title: "Vault Pay",
    metric: "41M transactions",
    arrow: "→",
    image: "https://framerusercontent.com/images/KhGBU3pxfTDeQxwzyGKckveb5A.jpg",
  },
  {
    slug: "pulse",
    title: "Pulse",
    metric: "68% weekly engagement",
    arrow: "↗",
    image: "/images/projects/pulse.png",
  },
  {
    slug: "nova",
    title: "Nova",
    metric: "75% fewer revisions",
    arrow: "↗",
    image: "https://framerusercontent.com/images/8G3dIuDlgJdCRp9KGus3P7RvlZI.jpg",
  },
];

// Duplicate items 4x for smooth infinite wrapping
const infiniteList = [
  ...exploreProjects,
  ...exploreProjects,
  ...exploreProjects,
  ...exploreProjects,
];

export default function ServicesExplore() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Position & Interaction State
  const xRef = useRef(0);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const reqIdRef = useRef<number | null>(null);

  // GSAP Title Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Continuous Auto-Scroll Ticker (60fps requestAnimationFrame with delta-time)
  useEffect(() => {
    const speed = 45; // Pixels per second (steady, smooth editorial pace)

    const tick = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (!isHoveredRef.current && !isDraggingRef.current && trackRef.current) {
        xRef.current -= speed * delta;

        // Total width of one complete set of 5 cards
        const firstCard = trackRef.current.children[0] as HTMLElement | undefined;
        if (firstCard) {
          const cardPitch = firstCard.offsetWidth + 8; // card width + gap
          const singleSetWidth = cardPitch * exploreProjects.length;

          if (xRef.current <= -singleSetWidth) {
            xRef.current += singleSetWidth;
          } else if (xRef.current > 0) {
            xRef.current -= singleSetWidth;
          }
        }

        trackRef.current.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
      }

      reqIdRef.current = requestAnimationFrame(tick);
    };

    reqIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (reqIdRef.current) {
        cancelAnimationFrame(reqIdRef.current);
      }
    };
  }, []);

  // Drag Event Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    dragDistanceRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !trackRef.current) return;
    const dx = e.clientX - startXRef.current;
    startXRef.current = e.clientX;
    dragDistanceRef.current += Math.abs(dx);

    xRef.current += dx;

    const firstCard = trackRef.current.children[0] as HTMLElement | undefined;
    if (firstCard) {
      const cardPitch = firstCard.offsetWidth + 8;
      const singleSetWidth = cardPitch * exploreProjects.length;
      if (xRef.current <= -singleSetWidth) {
        xRef.current += singleSetWidth;
      } else if (xRef.current > 0) {
        xRef.current -= singleSetWidth;
      }
    }

    trackRef.current.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section
      ref={sectionRef}
      className="w-full pt-16 sm:pt-24 lg:pt-32 pb-24 lg:pb-36 select-none overflow-hidden"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-12 mb-8 sm:mb-12 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-4 h-[2px] bg-accent rounded-full inline-block" />
          <span className="font-poppins text-sm md:text-base font-normal text-[#111618]">
            Work
          </span>
        </div>

        <h2
          ref={titleRef}
          className="font-clash text-[clamp(60px,12.5vw,180px)] leading-[0.7] tracking-[-0.02em] font-semibold text-[#111618]"
        >
          Explore<span className="text-accent">.</span>
        </h2>
      </div>

      {/* Infinite Auto-Scroll Ticker Track */}
      <div
        className="w-full overflow-hidden relative cursor-grab active:cursor-grabbing py-2"
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
          isDraggingRef.current = false;
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          ref={trackRef}
          className="flex gap-2 will-change-transform"
          style={{ width: "max-content" }}
        >
          {infiniteList.map((project, index) => (
            <Link
              key={`${project.slug}-${index}`}
              href={`/projects/${project.slug}`}
              onClick={(e) => {
                // Prevent navigation if user was dragging
                if (dragDistanceRef.current > 6) {
                  e.preventDefault();
                }
              }}
              className="group relative flex-none w-[300px] h-[400px] sm:w-[380px] sm:h-[500px] lg:w-[450px] lg:h-[600px] rounded-[36px] sm:rounded-[48px] lg:rounded-[60px] overflow-hidden bg-[#dce2e5] border border-transparent hover:border-accent/30 transition-all duration-300 block"
            >
              {/* Full Background Project Mockup Image */}
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 300px, (max-width: 1024px) 380px, 450px"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
              />

              {/* Bottom Subtle Gradient for Text Contrast */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.7) 85%, rgba(0,0,0,0.85) 100%)",
                }}
              />

              {/* Floating "Open" Button Centered on Hover */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="px-5 py-2.5 rounded-full bg-[#111618] text-white font-poppins text-sm font-medium tracking-wide shadow-2xl scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out">
                  Open
                </span>
              </div>

              {/* Bottom-Left Information Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10 pointer-events-none z-10 flex flex-col justify-end">
                <h3 className="font-poppins text-xl sm:text-2xl lg:text-[26px] font-medium text-white tracking-tight leading-snug">
                  {project.title}
                </h3>
                <div className="flex items-center gap-1.5 mt-1 font-poppins text-sm sm:text-base font-normal text-white/90">
                  <span className="text-white text-base leading-none">
                    {project.arrow}
                  </span>
                  <span>{project.metric}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
