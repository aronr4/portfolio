"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  capabilities: string[];
}

const serviceItems: ServiceItem[] = [
  {
    id: "branding",
    number: "01",
    title: "Branding",
    capabilities: [
      "Brand Strategy",
      "Visual Identity",
      "Logo Systems",
      "Art Direction",
    ],
  },
  {
    id: "ux-design",
    number: "02",
    title: "UX Design",
    capabilities: [
      "Prototyping",
      "Accessibility",
      "Interface Design",
      "Design Systems",
    ],
  },
  {
    id: "digital-builds",
    number: "03",
    title: "Digital Builds",
    capabilities: [
      "Website Development",
      "Mobile Apps",
      "CMS Setup",
      "Security",
    ],
  },
  {
    id: "video-production",
    number: "04",
    title: "Video Production",
    capabilities: [
      "Launch Films",
      "Campaign Videos",
      "Motion Direction",
      "Editing",
    ],
  },
  {
    id: "social-media",
    number: "05",
    title: "Social Media",
    capabilities: [
      "Content Direction",
      "Social Templates",
      "Campaign Assets",
      "Motion Graphics",
    ],
  },
];

export default function ServicesFocus() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

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

      gsap.fromTo(
        paragraphRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full px-6 sm:px-10 md:px-12 pt-14 sm:pt-20 lg:pt-28 pb-16 select-none"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16 sm:mb-24 lg:mb-28">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-4 h-[2px] bg-accent rounded-full inline-block" />
          <span className="font-poppins text-sm md:text-base font-normal text-[#111618]">
            Services
          </span>
        </div>

        <h2
          ref={titleRef}
          className="font-clash text-[clamp(60px,12.5vw,180px)] leading-[0.7] tracking-[-0.02em] font-semibold text-[#111618]"
        >
          Focus<span className="text-accent">.</span>
        </h2>

        <p
          ref={paragraphRef}
          className="font-poppins text-[clamp(22px,3.3vw,50px)] leading-[1.1] font-normal text-[#111618] mt-8 sm:mt-12 lg:mt-16 max-w-5xl"
        >
          We work with founders, teams, and creative brands to turn their ideas
          into experiences with structure, momentum, and a clear point of view.
        </p>
      </div>

      {/* Services Grid (Desktop 3+2 layout / Tablet & Mobile vertical list) */}
      <div className="max-w-7xl mx-auto border-t border-[#c4cfd4]">
        {/* Desktop View (>= 1024px) */}
        <div className="hidden lg:block">
          {/* Row 1: 3 columns */}
          <div className="grid grid-cols-3 border-b border-[#c4cfd4]">
            {serviceItems.slice(0, 3).map((item, idx) => (
              <div
                key={item.id}
                className={`h-[480px] p-12 flex flex-col justify-between group transition-all duration-300 hover:bg-accent/[0.03] ${
                  idx < 2 ? "border-r border-[#c4cfd4]" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-inter text-sm font-normal text-[#607580] group-hover:text-accent transition-colors duration-300">
                    {item.number}
                  </span>
                  <span className="font-poppins text-lg text-accent opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                    ↗
                  </span>
                </div>

                <div className="my-auto">
                  <h3 className="font-poppins text-4xl xl:text-5xl font-normal text-[#111618] transition-colors duration-300 group-hover:text-accent">
                    {item.title}
                  </h3>
                </div>

                <div>
                  <p className="font-poppins text-sm xl:text-base font-normal leading-relaxed text-[#607580]">
                    {item.capabilities.join(", ")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: 2 columns */}
          <div className="grid grid-cols-3 border-b border-[#c4cfd4]">
            {serviceItems.slice(3, 5).map((item, idx) => (
              <div
                key={item.id}
                className={`h-[480px] p-12 flex flex-col justify-between group transition-all duration-300 hover:bg-accent/[0.03] ${
                  idx === 0 ? "border-r border-[#c4cfd4]" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-inter text-sm font-normal text-[#607580] group-hover:text-accent transition-colors duration-300">
                    {item.number}
                  </span>
                  <span className="font-poppins text-lg text-accent opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                    ↗
                  </span>
                </div>

                <div className="my-auto">
                  <h3 className="font-poppins text-4xl xl:text-5xl font-normal text-[#111618] transition-colors duration-300 group-hover:text-accent">
                    {item.title}
                  </h3>
                </div>

                <div>
                  <p className="font-poppins text-sm xl:text-base font-normal leading-relaxed text-[#607580]">
                    {item.capabilities.join(", ")}
                  </p>
                </div>
              </div>
            ))}
            {/* 3rd slot empty to maintain architectural alignment */}
            <div className="h-[480px] p-12" />
          </div>
        </div>

        {/* Tablet & Mobile View (< 1024px) */}
        <div className="block lg:hidden divide-y divide-[#c4cfd4]">
          {serviceItems.map((item) => (
            <div
              key={item.id}
              className="py-10 sm:py-14 flex flex-col gap-6 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-inter text-sm font-normal text-[#607580] group-hover:text-accent transition-colors">
                  {item.number}
                </span>
                <span className="font-poppins text-base text-accent">↗</span>
              </div>

              <h3 className="font-poppins text-3xl sm:text-4xl font-normal text-[#111618] transition-colors duration-300 group-hover:text-accent">
                {item.title}
              </h3>

              <p className="font-poppins text-sm sm:text-base font-normal leading-relaxed text-[#607580] max-w-lg">
                {item.capabilities.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
