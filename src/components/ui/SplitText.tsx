"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  type?: "words" | "chars";
  className?: string;
  innerClassName?: string;
  stagger?: number;
  delay?: number;
  triggerOnScroll?: boolean;
}

export default function SplitText({
  text,
  type = "words",
  className,
  innerClassName,
  stagger = 0.05,
  delay = 0,
  triggerOnScroll = true,
}: SplitTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const items = type === "chars" ? text.split("") : text.split(" ");

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const elements = containerRef.current?.querySelectorAll(".split-unit-inner");
      if (!elements || elements.length === 0) return;

      gsap.set(elements, { yPercent: 110, opacity: 0 });

      if (triggerOnScroll) {
        gsap.to(elements, {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          stagger,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 88%",
            once: true,
          },
        });
      } else {
        gsap.to(elements, {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          stagger,
          delay,
          ease: "power3.out",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [stagger, delay, triggerOnScroll, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span ref={containerRef} className={cn("inline-block", className)} aria-label={text}>
      {items.map((item, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden align-top"
          aria-hidden="true"
        >
          <span
            className={cn("split-unit-inner inline-block will-change-transform", innerClassName)}
          >
            {item}
          </span>
          {type === "words" && index < items.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  );
}
