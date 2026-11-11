import type { Metadata } from "next";
import ServicesHero from "@/components/sections/services/ServicesHero";
import ServicesStats from "@/components/sections/services/ServicesStats";
import ServicesFocus from "@/components/sections/services/ServicesFocus";
import ServicesExplore from "@/components/sections/services/ServicesExplore";

export const metadata: Metadata = {
  title: "Services — Aron",
  description:
    "We shape brands, products, and digital experiences from first idea to final launch. Full spectrum capabilities from brand strategy to digital engineering.",
};

export default function ServicesPage() {
  return (
    <div className="w-full flex flex-col items-center bg-[#f3f5f6]">
      {/* 1. Hero with Project Showreel & Floating Glass Pause Button */}
      <ServicesHero />

      {/* 2. 96px Stepped Cascade Stat Cards with Count-Up */}
      <ServicesStats />

      {/* 3. Focus Section with 5 Capability Cards & Hairline Borders */}
      <ServicesFocus />

      {/* 4. Explore Section with Horizontal Project Reel */}
      <ServicesExplore />
    </div>
  );
}
