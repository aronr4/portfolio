"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Check if device is touch / fine pointer
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    setIsTouchDevice(isTouch);

    if (isTouch || prefersReducedMotion) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const setX = gsap.quickTo(cursor, "x", { duration: 0.25, ease: "power3.out" });
    const setY = gsap.quickTo(cursor, "y", { duration: 0.25, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const isCursorNone = (e.target as HTMLElement).closest(".cursor-none");
      if (isCursorNone) {
        setIsVisible(false);
        return;
      }

      setIsVisible(true);
      setX(e.clientX);
      setY(e.clientY);

      // Check target element data-cursor attributes
      const target = (e.target as HTMLElement).closest("[data-cursor]") as HTMLElement | null;
      if (target) {
        const type = target.getAttribute("data-cursor");
        if (type === "view") {
          setCursorText("View");
          setIsHovered(true);
        } else if (type === "drag") {
          setCursorText("Drag");
          setIsHovered(true);
        } else {
          setCursorText("");
          setIsHovered(true);
        }
      } else {
        const isClickable = (e.target as HTMLElement).closest("a, button, input, [role='button']");
        if (isClickable) {
          setCursorText("");
          setIsHovered(true);
        } else {
          setCursorText("");
          setIsHovered(false);
        }
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [prefersReducedMotion]);

  if (isTouchDevice || prefersReducedMotion) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9998] transition-opacity duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
      }}
    >
      <div
        className="rounded-full flex items-center justify-center transition-all duration-300 ease-out will-change-transform"
        style={{
          width: isHovered ? (cursorText ? "64px" : "32px") : "12px",
          height: isHovered ? (cursorText ? "64px" : "32px") : "12px",
          backgroundColor: "#FFFFFF",
          mixBlendMode: "difference",
        }}
      >
        {cursorText && (
          <span className="text-[10px] uppercase font-display font-bold tracking-wider text-black select-none pointer-events-none">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
