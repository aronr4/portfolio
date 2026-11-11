"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface CounterProps {
  value: number | string;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function Counter({
  value,
  suffix = "",
  prefix = "",
  duration = 1.4,
  className,
}: CounterProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Extract numeric part
  const numericTarget = typeof value === "number" ? value : parseFloat(value.toString().replace(/[^0-9.]/g, "")) || 0;
  const initialDisplay = prefersReducedMotion ? numericTarget : 0;
  const [displayValue, setDisplayValue] = useState<number>(initialDisplay);

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const state = { val: 0 };

      gsap.to(state, {
        val: numericTarget,
        duration,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          once: true,
        },
        onUpdate: () => {
          setDisplayValue(Math.floor(state.val));
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [numericTarget, duration, prefersReducedMotion]);

  return (
    <span ref={containerRef} className={cn("tabular-nums font-display", className)}>
      {prefix}
      {prefersReducedMotion ? numericTarget : displayValue}
      {suffix}
    </span>
  );
}
