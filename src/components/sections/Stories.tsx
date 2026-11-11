"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Marquee from "@/components/ui/Marquee";
import Odometer from "@/components/ui/Odometer";
import {
  storyCardsRow1,
  storyCardsRow2,
  type StoryCard,
  type TestimonialCard,
  type StatCard,
  type ImageCard,
} from "@/data/testimonials";
import { cn } from "@/lib/utils";

function RenderStoryCard({ card }: { card: StoryCard }) {
  if (card.type === "testimonial") {
    const t = card as TestimonialCard;
    return (
      <div className="story-card w-[340px] sm:w-[400px] p-8 rounded-2xl bg-white border border-black/[0.08] flex flex-col justify-between shrink-0 h-[280px] sm:h-[300px] select-none shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
        <p className="text-base text-fg font-body font-normal leading-relaxed line-clamp-4">
          “{t.quote}”
        </p>

        <div className="flex items-center justify-between border-t border-black/[0.06] pt-4 mt-4">
          <div className="flex flex-col">
            <span className="font-body font-semibold text-sm text-fg">{t.author}</span>
            <span className="text-xs text-muted font-body">
              {t.role}, {t.company}
            </span>
          </div>

          <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center font-body font-medium text-xs text-fg">
            {t.logoPlaceholder || "DS"}
          </div>
        </div>
      </div>
    );
  }

  if (card.type === "stat") {
    const s = card as StatCard;
    return (
      <div className="story-card w-[300px] sm:w-[340px] p-8 rounded-2xl bg-white border border-black/[0.08] flex flex-col justify-between shrink-0 h-[280px] sm:h-[300px] select-none shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between">
          <h4
            style={{
              fontSize: "var(--stat-title-size)",
              lineHeight: "var(--stat-title-lh)",
            }}
            className="font-stat font-normal text-fg"
          >
            {s.label}
          </h4>
          {s.badgeImg && (
            <div className="relative w-8 h-8">
              <Image src={s.badgeImg} alt="" fill sizes="32px" className="object-contain" />
            </div>
          )}
        </div>

        <div className="my-auto py-2">
          <div className="font-display text-5xl sm:text-6xl font-semibold tracking-tight text-fg flex items-baseline">
            <Odometer value={s.targetNumber} suffix={s.suffix} />
          </div>
        </div>

        <p className="text-xs sm:text-sm text-muted font-body leading-relaxed border-t border-black/[0.06] pt-3">
          {s.description}
        </p>
      </div>
    );
  }

  if (card.type === "image") {
    const img = card as ImageCard;
    return (
      <div className="story-card relative w-[240px] sm:w-[280px] h-[280px] sm:h-[300px] rounded-2xl overflow-hidden shrink-0 select-none shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-black/[0.08] group">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes="280px"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
          <span className="text-xs font-body font-medium uppercase tracking-wider text-white bg-black/40 backdrop-blur-md px-3 py-1 rounded-full">
            {img.caption}
          </span>
        </div>
      </div>
    );
  }

  return null;
}

export default function Stories() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll(".story-card");
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="stories"
      aria-label="Stories Section"
      style={{
        paddingTop: "var(--stories-pt)",
        paddingLeft: "var(--page-pad-x)",
        paddingRight: "var(--page-pad-x)",
      }}
      className="w-full flex flex-col items-center bg-bg overflow-hidden"
    >
      <div
        style={{
          maxWidth: "calc(var(--work-col-width) * 2 + var(--work-col-gap))",
          gap: "var(--stories-gap)",
        }}
        className="w-full flex flex-col mb-12"
      >
        <span
          style={{
            fontSize: "var(--label-size)",
            lineHeight: "var(--label-lh)",
          }}
          className="font-body font-medium text-fg block mb-1"
        >
          Stories
        </span>

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
          {"Big \nwins."}
        </h2>
      </div>

      {/* Marquee Row 1 */}
      <div className="mb-4 w-full" data-cursor="drag">
        <Marquee speed={55} direction="left" pauseOnHover={true}>
          <div className="flex gap-4 pr-4 py-2">
            {storyCardsRow1.map((card) => (
              <RenderStoryCard key={card.id} card={card} />
            ))}
          </div>
        </Marquee>
      </div>

      {/* Marquee Row 2 */}
      <div className="w-full" data-cursor="drag">
        <Marquee speed={65} direction="right" pauseOnHover={true}>
          <div className="flex gap-4 pr-4 py-2">
            {storyCardsRow2.map((card) => (
              <RenderStoryCard key={card.id} card={card} />
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
}
