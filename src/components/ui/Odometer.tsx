"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface OdometerProps {
  value: number;
  suffix?: string;
  className?: string;
  digitClassName?: string;
}

export default function Odometer({
  value,
  suffix = "",
  className,
  digitClassName,
}: OdometerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const digits = value.toString().split("");

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const strips = containerRef.current?.querySelectorAll(".odometer-strip");
      if (!strips) return;

      strips.forEach((strip, index) => {
        const targetDigit = parseInt(digits[index], 10);
        if (isNaN(targetDigit)) return;

        // Each digit in the 0-9 column is 10% of total strip height
        const targetPercent = -(targetDigit * 10);

        gsap.to(strip, {
          yPercent: targetPercent,
          duration: 1.6,
          delay: index * 0.12,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [value, digits, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <span className={cn("inline-flex font-display tabular-nums items-baseline", className)}>
        <span>{value}</span>
        {suffix && <span>{suffix}</span>}
      </span>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("inline-flex items-baseline font-display tabular-nums overflow-hidden", className)}
      aria-label={`${value}${suffix}`}
    >
      <div className="inline-flex items-center overflow-hidden" aria-hidden="true">
        {digits.map((_, i) => (
          <div
            key={i}
            className={cn("relative overflow-hidden inline-block h-[1em] leading-none", digitClassName)}
          >
            <div className="odometer-strip flex flex-col will-change-transform">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <span
                  key={num}
                  className="h-[1em] leading-none flex items-center justify-center"
                >
                  {num}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {suffix && (
        <span className="leading-none ml-0.5" aria-hidden="true">
          {suffix}
        </span>
      )}
    </div>
  );
}
