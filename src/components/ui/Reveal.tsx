"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  variant?: "clip-up" | "fade-up" | "scale";
  duration?: number;
  delay?: number;
  className?: string;
  triggerStart?: string;
}

export default function Reveal({
  children,
  variant = "clip-up",
  duration = 1.2,
  delay = 0,
  className,
  triggerStart = "top 85%",
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!elementRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const el = elementRef.current;
      if (!el) return;

      if (variant === "clip-up") {
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration,
            delay,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: triggerStart,
              once: true,
            },
          }
        );
      } else if (variant === "fade-up") {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: triggerStart,
              once: true,
            },
          }
        );
      } else if (variant === "scale") {
        gsap.fromTo(
          el,
          { scale: 1.15, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration,
            delay,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: triggerStart,
              once: true,
            },
          }
        );
      }
    }, elementRef);

    return () => ctx.revert();
  }, [variant, duration, delay, triggerStart, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={elementRef} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
