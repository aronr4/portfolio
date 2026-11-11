"use client";

import Image from "next/image";
import Marquee from "@/components/ui/Marquee";
import { heroReelImages } from "@/data/projects";

export default function ImageReelSection() {
  return (
    <section
      aria-label="Image Reel Section"
      style={{
        paddingTop: "var(--reel-pad-y)",
        paddingBottom: "var(--reel-pad-y)",
        paddingLeft: "var(--reel-pad-x)",
        paddingRight: "var(--reel-pad-x)",
      }}
      className="w-full bg-bg overflow-hidden select-none"
      data-cursor="drag"
    >
      <Marquee speed={40} direction="left" pauseOnHover={true}>
        <div className="flex gap-4 sm:gap-6 pr-4 sm:pr-6">
          {heroReelImages.map((src, idx) => (
            <div
              key={`reel-img-${idx}`}
              className="relative w-[240px] sm:w-[320px] aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              <Image
                src={src}
                alt={`Studio craft sample ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 240px, 320px"
                className="object-cover hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
          ))}
        </div>
      </Marquee>
    </section>
  );
}
