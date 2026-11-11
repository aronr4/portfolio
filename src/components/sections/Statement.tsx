"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const STATEMENT_TEXT =
  "We work with founders, teams, and creative brands to turn big ideas into digital experiences with structure, momentum, and a distinct point of view.";

export default function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const words = STATEMENT_TEXT.split(" ");

  useEffect(() => {
    const section = sectionRef.current;
    const wordsEl = wordsRef.current;
    if (!section || !wordsEl || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const wordSpans = wordsEl.querySelectorAll(".statement-word");

      // Scroll-linked word-by-word color reveal: #c4cfd4 -> #111618
      gsap.fromTo(
        wordSpans,
        { color: "var(--inactive)" }, // #c4cfd4
        {
          color: "var(--fg)", // #111618
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: wordsEl,
            start: "top 75%",
            end: "bottom 45%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-label="Studio Statement"
      style={{
        paddingTop: "var(--statement-pad-y)",
        paddingBottom: "var(--statement-pad-y)",
        paddingLeft: "var(--statement-pad-x)",
        paddingRight: "var(--statement-pad-x)",
      }}
      className="w-full flex justify-center bg-bg select-none"
    >
      <div
        style={{
          maxWidth: "var(--statement-max-width)",
          gap: "48px",
        }}
        className="w-full flex flex-col items-start px-8 md:px-0"
      >
        <p
          ref={wordsRef}
          style={{
            fontSize: "var(--statement-size)",
            lineHeight: "var(--statement-lh)",
          }}
          className="font-body font-normal text-fg tracking-tight"
        >
          {words.map((word, idx) => (
            <span
              key={`stmt-word-${idx}`}
              className="statement-word inline-block mr-[0.28em] transition-colors duration-150"
              style={{
                color: prefersReducedMotion ? "var(--fg)" : "var(--inactive)",
              }}
            >
              {word}
            </span>
          ))}
        </p>

        {/* Learn More Pill with ↗ icon */}
        <Link
          href="/about"
          style={{
            backgroundColor: "var(--btn-soft)",
            color: "var(--fg)",
            borderRadius: "var(--btn-pill-radius)",
            padding: "var(--btn-pill-pad)",
            gap: "var(--btn-pill-gap)",
            fontSize: "var(--label-size)",
            lineHeight: "var(--label-lh)",
          }}
          className="font-body font-medium inline-flex items-center hover:opacity-85 transition-opacity group cursor-pointer"
        >
          <span>Learn more</span>
          <span className="text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ml-1">
            ↗
          </span>
        </Link>
      </div>
    </section>
  );
}
