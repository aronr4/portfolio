"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { siteConfig } from "@/data/site";

export default function Preloader() {
  const [complete, setComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // If reduced motion is enabled, complete immediately
    if (prefersReducedMotion) {
      setComplete(true);
      window.dispatchEvent(new CustomEvent("preloader-complete"));
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const counterObj = { value: 0 };

      const tl = gsap.timeline({
        onComplete: () => {
          setComplete(true);
          window.dispatchEvent(new CustomEvent("preloader-complete"));
        },
      });

      // Animate counter from 0 to 100 over 1.6s
      tl.to(counterObj, {
        value: 100,
        duration: 1.6,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.innerText = Math.floor(counterObj.value).toString().padStart(2, "0");
          }
        },
      });

      // Fade brand slightly & slide full-screen panel up
      tl.to(brandRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
      });

      tl.to(container, {
        yPercent: -100,
        duration: 0.9,
        ease: "expo.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  if (complete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-bg p-8 md:p-14 select-none pointer-events-auto"
      aria-label="Loading site"
    >
      <div className="flex justify-between items-center text-xs tracking-widest uppercase text-muted font-display">
        <span>{siteConfig.brand}</span>
        <span>Studio Portfolio</span>
      </div>

      <div ref={brandRef} className="flex flex-col items-center justify-center my-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-display text-fg">
          {siteConfig.brand}
        </h1>
        <p className="text-xs uppercase tracking-[0.25em] text-muted mt-2 font-display">
          Motion-First Digital Craft
        </p>
      </div>

      <div className="flex justify-between items-end border-t border-black/[0.08] pt-4">
        <span className="text-xs tracking-wider text-muted font-display uppercase">
          Initializing experience
        </span>
        <div className="font-display text-3xl md:text-5xl font-bold tracking-tight text-fg tabular-nums">
          <span ref={counterRef}>00</span>
          <span className="text-lg md:text-2xl text-muted font-normal ml-1">%</span>
        </div>
      </div>
    </div>
  );
}
