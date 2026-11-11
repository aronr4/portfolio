"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StatCardData {
  tag: string;
  targetNumber: number;
  suffix: string;
  title: string;
  description: string;
}

const statsData: StatCardData[] = [
  {
    tag: "Full spectrum",
    targetNumber: 20,
    suffix: "+",
    title: "Specialties",
    description:
      "From strategy and identity to motion, content, and launch support.",
  },
  {
    tag: "Fast track",
    targetNumber: 2,
    suffix: "",
    title: "Week Delivery",
    description:
      "Focused engagements designed to create clarity and momentum without a sprawling timeline.",
  },
  {
    tag: "Your call",
    targetNumber: 3,
    suffix: "",
    title: "Ways to work",
    description:
      "Choose a focused sprint, full project, or ongoing creative support.",
  },
  {
    tag: "One system",
    targetNumber: 98,
    suffix: "%",
    title: "Custom",
    description:
      "Every engagement is shaped around the brand, audience, and problem at hand.",
  },
];

export default function ServicesStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Desktop Scroll Scrub Animation:
      // Cards start staggered from down below (0, 96px, 192px, 288px)
      // and as you scroll up into view, they rise up and align into a
      // perfectly straight, clean horizontal row!
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const initialOffsets = [0, 96, 192, 288];

        initialOffsets.forEach((offset, idx) => {
          const card = cardRefs.current[idx];
          if (!card) return;

          gsap.fromTo(
            card,
            { y: offset },
            {
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 95%",
                end: "top 35%",
                scrub: 1,
              },
            }
          );
        });
      });

      // 2. Animated count-up triggered on scroll into reading view
      statsData.forEach((stat, idx) => {
        const el = numberRefs.current[idx];
        if (!el) return;

        const counter = { val: 0 };
        gsap.to(counter, {
          val: stat.targetNumber,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            if (el) {
              el.innerText = Math.round(counter.val).toString();
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-2 pt-2 w-full mb-0 select-none"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 w-full items-start">
        {statsData.map((stat, idx) => (
          <div
            key={stat.tag}
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            style={{ willChange: "transform" }}
            className="bg-[#dce2e5] border border-transparent hover:border-accent/30 rounded-[36px] sm:rounded-[44px] lg:rounded-[60px] p-8 sm:p-10 lg:p-12 min-h-[380px] lg:h-[475px] flex flex-col justify-between transition-colors duration-300 hover:shadow-lg hover:shadow-accent/5 group"
          >
            {/* Top Label */}
            <div className="flex items-center gap-2.5">
              <span className="w-4 h-[2px] bg-accent rounded-full inline-block group-hover:w-6 transition-all duration-300" />
              <span className="font-poppins text-xs sm:text-sm font-medium uppercase tracking-wider text-[#111618]">
                {stat.tag}
              </span>
            </div>

            {/* Middle Number & Title */}
            <div className="my-auto py-6">
              <div className="flex items-baseline">
                <span
                  ref={(el) => {
                    numberRefs.current[idx] = el;
                  }}
                  className="font-inter text-[48px] sm:text-[56px] lg:text-[68px] font-normal leading-none text-[#111618] tracking-tight"
                >
                  0
                </span>
                <span className="font-inter text-[48px] sm:text-[56px] lg:text-[68px] font-normal leading-none text-accent ml-0.5">
                  {stat.suffix}
                </span>
              </div>
              <h3 className="font-poppins text-xl sm:text-2xl lg:text-[28px] font-normal leading-[1.2] text-[#111618] mt-2 group-hover:text-[#111618] transition-colors">
                {stat.title}
              </h3>
            </div>

            {/* Bottom Description */}
            <p className="font-poppins text-sm sm:text-base font-normal leading-[1.5] text-[#607580]">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
