"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Avoid animation on initial mount (Preloader handles initial mount)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      window.scrollTo(0, 0);
      return;
    }

    window.scrollTo(0, 0);
    if (prefersReducedMotion) return;

    const curtain = curtainRef.current;
    if (!curtain) return;

    const tl = gsap.timeline();

    // Curtain wipe up from bottom to cover screen, then slide up to exit
    tl.set(curtain, { yPercent: 100, display: "block" });
    tl.to(curtain, {
      yPercent: 0,
      duration: 0.35,
      ease: "power3.inOut",
    });
    tl.to(curtain, {
      yPercent: -100,
      duration: 0.35,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.set(curtain, { display: "none" });
      },
    });

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.25, ease: "power2.out" }
      );
    }
  }, [pathname, prefersReducedMotion]);

  return (
    <>
      <div
        ref={curtainRef}
        className="fixed inset-0 z-[9990] bg-[#dce2e5] hidden pointer-events-none"
        aria-hidden="true"
      />
      <div ref={contentRef} className="w-full">
        {children}
      </div>
    </>
  );
}
