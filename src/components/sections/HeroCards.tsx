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
  // 1: FlowFit (Fitness Training Platform)
  {
    id: 1,
    name: "FlowFit",
    category: "Fitness Platform",
    image: "https://framerusercontent.com/images/4b5amoeQ9i5PTDQCngUS605p10.jpg?width=1086&height=1448",
    bg: "#111618",
    accent: "#ffffff",
    renderArtwork: () => (
      <div className="w-full h-full relative overflow-hidden bg-[#111618] select-none">
        <Image
          src="https://framerusercontent.com/images/4b5amoeQ9i5PTDQCngUS605p10.jpg?width=1086&height=1448"
          alt="FlowFit"
          fill
          sizes="(max-width: 768px) 70vw, 35vw"
          priority
          className="object-cover object-center pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
      </div>
    ),
  },

  // 2: Outbound (Expedition & Active Travel)
  {
    id: 2,
    name: "Outbound",
    category: "Active Expedition",
    image: "https://framerusercontent.com/images/YVA66MSwMYiDVnxX7kJTFIOMVCk.jpg?width=1086&height=1448",
    bg: "#e02b02",
    accent: "#ffffff",
    renderArtwork: () => (
      <div className="w-full h-full relative overflow-hidden bg-[#e02b02] select-none">
        <Image
          src="https://framerusercontent.com/images/YVA66MSwMYiDVnxX7kJTFIOMVCk.jpg?width=1086&height=1448"
          alt="Outbound"
          fill
          sizes="(max-width: 768px) 70vw, 35vw"
          priority
          className="object-cover object-center pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
      </div>
    ),
  },

  // 3: Vault Pay (Mobile Banking Platform)
  {
    id: 3,
    name: "Vault Pay",
    category: "Fintech App",
    image: "https://framerusercontent.com/images/KhGBU3pxfTDeQxwzyGKckveb5A.jpg?width=1086&height=1448",
    bg: "#1c382b",
    accent: "#4ade80",
    renderArtwork: () => (
      <div className="w-full h-full relative overflow-hidden bg-[#1c382b] select-none">
        <Image
          src="https://framerusercontent.com/images/KhGBU3pxfTDeQxwzyGKckveb5A.jpg?width=1086&height=1448"
          alt="Vault Pay"
          fill
          sizes="(max-width: 768px) 70vw, 35vw"
          priority
          className="object-cover object-center pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
      </div>
    ),
  },

  // 4: Pulse (Connected Health Ecosystem)
  {
    id: 4,
    name: "Pulse",
    category: "Digital Health",
    image: "/images/projects/pulse.png",
    bg: "#111618",
    accent: "#ffffff",
    renderArtwork: () => (
      <div className="w-full h-full relative overflow-hidden bg-[#111618] select-none">
        <Image
          src="/images/projects/pulse.png"
          alt="Pulse"
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
