"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { projects } from "@/data/projects";

interface ServicesHeroProps {
  videoSrc?: string;
}

export default function ServicesHero({ videoSrc }: ServicesHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const whatRef = useRef<HTMLHeadingElement>(null);
  const weDoRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  // Cinematic project slides showing user's studio projects (Outbound warm orange theme first)
  const studioSlides = [
    {
      title: "Outbound",
      category: "Digital Experience",
      image: "https://framerusercontent.com/images/R0th5fwVElUQTT9huxwZEh99dE.jpg",
    },
    {
      title: "Nova",
      category: "Creative Systems",
      image: "https://framerusercontent.com/images/bVS9QEJVywX32fS66G9f7LQu1g.jpg",
    },
    {
      title: "Pulse",
      category: "Digital Health",
      image: "/images/projects/pulse.png",
    },
    {
      title: "Dheerah",
      category: "Designer Boutique",
      image: "/images/projects/dheerah.jpg",
    },
    {
      title: "Vault Pay",
      category: "Fintech Platform",
      image: "https://framerusercontent.com/images/YVA66MSwMYiDVnxX7kJTFIOMVCk.jpg",
    },
    {
      title: "Apex",
      category: "Mobility Design",
      image: "https://framerusercontent.com/images/6ka5ZUVdLrOwC1bihB169y0Jjig.jpg",
    },
  ];

  // Slideshow interval when videoSrc is not active
  useEffect(() => {
    if (!isPlaying || videoSrc) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % studioSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, videoSrc, studioSlides.length]);

  // Entrance animation for typography
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        whatRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.1 }
      )
        .fromTo(
          weDoRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.75"
        )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.6"
        )
        .fromTo(
          buttonRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.7"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const togglePlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div ref={containerRef} className="px-2 pt-2 pb-0 w-full">
      <div className="relative w-full min-h-[calc(100svh-16px)] md:h-[804px] rounded-[24px] md:rounded-[32px] overflow-hidden flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16 select-none bg-[#111618]">
        {/* Background Project Showreel */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {videoSrc ? (
            <video
              ref={videoRef}
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            studioSlides.map((slide, index) => {
              const isActive = index === activeSlide;
              return (
                <div
                  key={slide.title}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <div
                    className={`w-full h-full relative transition-transform duration-[6000ms] ease-out ${
                      isActive && isPlaying ? "scale-105" : "scale-100"
                    }`}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      priority={index === 0}
                      className="object-cover object-center"
                      sizes="100vw"
                    />
                  </div>
                </div>
              );
            })
          )}

          {/* Warm Orange Ambient Glow & Measured Dark Gradient Overlays */}
          <div
            className="absolute inset-0 z-15 pointer-events-none opacity-40 mix-blend-screen"
            style={{
              background:
                "radial-gradient(circle at 75% 35%, rgba(224, 43, 2, 0.45) 0%, transparent 60%)",
            }}
          />
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background:
                "linear-gradient(271deg, rgba(84, 84, 84, 0) 16%, rgba(0, 0, 0, 0.45) 100%)",
            }}
          />
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.6) 100%)",
            }}
          />
        </div>

        {/* Top Header Row with Floating Glass Pause/Play Button */}
        <div className="relative z-30 flex items-center justify-between w-full">
          {/* Subtle Project Tag Indicator */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md bg-white/10 border border-white/15 text-white/90 text-xs font-body uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>Studio Showreel — {studioSlides[activeSlide]?.title}</span>
          </div>

          {/* Pause / Play Button */}
          <button
            ref={buttonRef}
            type="button"
            onClick={togglePlayback}
            aria-label={isPlaying ? "Pause background reel" : "Play background reel"}
            className="w-11 h-11 md:w-12 md:h-12 rounded-full backdrop-blur-md bg-white/20 hover:bg-white/30 border border-white/25 text-white flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:border-accent/50"
          >
            {isPlaying ? (
              // Pause icon ||
              <span className="flex items-center justify-center gap-1">
                <span className="w-1 h-3.5 bg-white rounded-full" />
                <span className="w-1 h-3.5 bg-white rounded-full" />
              </span>
            ) : (
              // Play icon ▶
              <svg
                className="w-4 h-4 text-white ml-0.5 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="relative z-30 flex flex-col justify-end mt-auto max-w-4xl">
          {/* Headline: "What we do." with orange accent period */}
          <div className="flex flex-col select-none">
            <h1
              ref={whatRef}
              className="font-clash text-white text-[clamp(64px,16vw,230px)] leading-[0.7] tracking-[-0.04em] font-semibold"
            >
              What
            </h1>
            <h1
              ref={weDoRef}
              className="font-clash text-white text-[clamp(64px,16vw,230px)] leading-[0.7] tracking-[-0.04em] font-semibold mt-2 md:mt-4"
            >
              we do<span className="text-accent">.</span>
            </h1>
          </div>

          {/* Subtitle Paragraph */}
          <p
            ref={subtitleRef}
            className="font-inter text-white/90 text-[clamp(18px,2.2vw,30px)] leading-[1.3] font-normal mt-6 md:mt-10 max-w-2xl"
          >
            We shape brands, products, and digital experiences from first idea to
            final launch.
          </p>
        </div>
      </div>
    </div>
  );
}
