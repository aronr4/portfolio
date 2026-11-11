"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  speed?: number; // duration in seconds for one full loop
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  velocityReactive?: boolean;
  className?: string;
  showPauseControl?: boolean;
}

export default function Marquee({
  children,
  speed = 40,
  direction = "left",
  pauseOnHover = true,
  velocityReactive = false,
  className,
  showPauseControl = false,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!trackRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const totalDistance = 50; // We duplicate children so 50% shift creates seamless loop
      const startX = direction === "left" ? 0 : -totalDistance;
      const endX = direction === "left" ? -totalDistance : 0;

      gsap.set(track, { xPercent: startX });

      const tween = gsap.to(track, {
        xPercent: endX,
        duration: speed,
        ease: "none",
        repeat: -1,
      });

      tweenRef.current = tween;

      if (velocityReactive) {
        let lastScrollY = window.scrollY;
        let timeoutId: NodeJS.Timeout;

        const onScroll = () => {
          const currentScrollY = window.scrollY;
          const delta = currentScrollY - lastScrollY;
          lastScrollY = currentScrollY;

          // Map scroll delta to timeScale (speed up when scrolling down, reverse if scrolling up)
          const targetScale = direction === "left"
            ? (delta >= 0 ? 1 + Math.min(Math.abs(delta) * 0.08, 4) : -(1 + Math.min(Math.abs(delta) * 0.08, 4)))
            : (delta <= 0 ? 1 + Math.min(Math.abs(delta) * 0.08, 4) : -(1 + Math.min(Math.abs(delta) * 0.08, 4)));

          gsap.to(tween, {
            timeScale: targetScale,
            duration: 0.2,
            overwrite: "auto",
          });

          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            gsap.to(tween, {
              timeScale: 1,
              duration: 0.8,
              ease: "power2.out",
              overwrite: "auto",
            });
          }, 150);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
          window.removeEventListener("scroll", onScroll);
          clearTimeout(timeoutId);
        };
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [speed, direction, velocityReactive, prefersReducedMotion]);

  const handleMouseEnter = () => {
    if (pauseOnHover && tweenRef.current && !isPaused && !prefersReducedMotion) {
      gsap.to(tweenRef.current, { timeScale: 0, duration: 0.4 });
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && tweenRef.current && !isPaused && !prefersReducedMotion) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.4 });
    }
  };

  const togglePause = () => {
    if (!tweenRef.current) return;
    if (isPaused) {
      tweenRef.current.play();
      setIsPaused(false);
    } else {
      tweenRef.current.pause();
      setIsPaused(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden w-full select-none", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-label="Scrolling marquee list"
    >
      <div
        ref={trackRef}
        className={cn(
          "flex w-max will-change-transform",
          prefersReducedMotion && "overflow-x-auto w-full flex-wrap justify-center"
        )}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        {!prefersReducedMotion && (
          <div className="flex shrink-0 items-center" aria-hidden="true">
            {children}
          </div>
        )}
      </div>

      {showPauseControl && !prefersReducedMotion && (
        <button
          type="button"
          onClick={togglePause}
          className="absolute right-4 bottom-2 z-10 text-[10px] uppercase tracking-wider text-muted hover:text-accent focus-visible:outline-accent bg-bg/80 px-2 py-1 rounded backdrop-blur border border-white/10"
          aria-label={isPaused ? "Resume marquee animation" : "Pause marquee animation"}
        >
          {isPaused ? "Play" : "Pause"}
        </button>
      )}
    </div>
  );
}
