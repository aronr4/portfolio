import React from "react";
import Image from "next/image";

export interface HeroCardData {
  id: number;
  name: string;
  category: string;
  image: string;
  bg: string;
  accent: string;
  renderArtwork: () => React.ReactNode;
}

export const HERO_CARDS: HeroCardData[] = [
  // 1: Dheerah (Designer Boutique)
  {
    id: 1,
    name: "Dheerah",
    category: "Designer Boutique",
    image: "/images/projects/dheerah.jpg",
    bg: "#111618",
    accent: "#ffffff",
    renderArtwork: () => (
      <div className="w-full h-full relative overflow-hidden bg-[#111618] select-none">
        <Image
          src="/images/projects/dheerah.jpg"
          alt="Dheerah"
          fill
          sizes="(max-width: 768px) 70vw, 35vw"
          priority
          className="object-cover object-center pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
      </div>
    ),
  },

  // 2: Skywills Totem (Global Logistics & Trade)
  {
    id: 2,
    name: "Skywills",
    category: "Air & Sea Trade",
    image: "/images/projects/skywills/extracted_2.jpeg",
    bg: "#0d1b2a",
    accent: "#ffffff",
    renderArtwork: () => (
      <div className="w-full h-full relative overflow-hidden bg-[#0d1b2a] select-none">
        <Image
          src="/images/projects/skywills/extracted_2.jpeg"
          alt="Skywills"
          fill
          sizes="(max-width: 768px) 70vw, 35vw"
          priority
          className="object-cover object-center pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
      </div>
    ),
  },

  // 3: W&H (Mobile Shopping Experience)
  {
    id: 3,
    name: "W&H",
    category: "Mobile Commerce",
    image: "/images/projects/w-and-h.jpg",
    bg: "#111618",
    accent: "#ffffff",
    renderArtwork: () => (
      <div className="w-full h-full relative overflow-hidden bg-[#111618] select-none">
        <Image
          src="/images/projects/w-and-h.jpg"
          alt="W&H"
          fill
          sizes="(max-width: 768px) 70vw, 35vw"
          priority
          className="object-cover object-center pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
      </div>
    ),
  },

  // 4: Skywills (Global Logistics & Brand Identity)
  {
    id: 4,
    name: "Skywills",
    category: "Brand Identity",
    image: "/images/projects/skywills/extracted_0.jpeg",
    bg: "#111618",
    accent: "#ffffff",
    renderArtwork: () => (
      <div className="w-full h-full relative overflow-hidden bg-[#111618] select-none">
        <Image
          src="/images/projects/skywills/extracted_0.jpeg"
          alt="Skywills"
          fill
          sizes="(max-width: 768px) 70vw, 35vw"
          priority
          className="object-cover object-center pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
      </div>
    ),
  },

  // 5: Apex (Mobility Design & Vehicle OS)
  {
    id: 5,
    name: "Apex",
    category: "Mobility Design",
    image: "https://framerusercontent.com/images/6ka5ZUVdLrOwC1bihB169y0Jjig.jpg?width=1086&height=1448",
    bg: "#dc2626",
    accent: "#ffffff",
    renderArtwork: () => (
      <div className="w-full h-full relative overflow-hidden bg-[#dc2626] select-none">
        <Image
          src="https://framerusercontent.com/images/6ka5ZUVdLrOwC1bihB169y0Jjig.jpg?width=1086&height=1448"
          alt="Apex"
          fill
          sizes="(max-width: 768px) 70vw, 35vw"
          priority
          className="object-cover object-center pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
      </div>
    ),
  },

  // 6: Nova (Collaborative Creative Platform)
  {
    id: 6,
    name: "Nova",
    category: "Creative Systems",
    image: "https://framerusercontent.com/images/nBocJpXmbqNC0oBwue39Q1ltNeM.jpg?width=1086&height=1448",
    bg: "#4c1d95",
    accent: "#c084fc",
    renderArtwork: () => (
      <div className="w-full h-full relative overflow-hidden bg-[#4c1d95] select-none">
        <Image
          src="https://framerusercontent.com/images/nBocJpXmbqNC0oBwue39Q1ltNeM.jpg?width=1086&height=1448"
          alt="Nova"
          fill
          sizes="(max-width: 768px) 70vw, 35vw"
          priority
          className="object-cover object-center pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
      </div>
    ),
  },
];
