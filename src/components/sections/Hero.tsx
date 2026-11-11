"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { HERO_CARDS, type HeroCardData } from "./HeroCards";

// Ordered ring sequence starting with Card 6 (NOVA) so that Card 1 & Card 2 sit at center
// [6, 1, 2, 3, 4, 5]
const RING_ORDER: HeroCardData[] = [
  HERO_CARDS[5], // Nova
  HERO_CARDS[2], // Vault Pay
  HERO_CARDS[3], // Pulse
  HERO_CARDS[1], // Outbound
  HERO_CARDS[0], // FlowFit
  HERO_CARDS[4], // Apex
];

// 3 copies = 18 cards for seamless wrap
const FULL_RING_CARDS: HeroCardData[] = [
  ...RING_ORDER,
  ...RING_ORDER,
  ...RING_ORDER,
];

// Word flicker sequence: Products, brands, systems, motion, stories.
const FLICKER_WORDS = ["Products", "brands", "systems", "motion", "stories"];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Layer 1: Headline lines & words
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wordDotRef = useRef<HTMLSpanElement>(null);

  // Layer 2: Reel & Stack
  const reelContainerRef = useRef<HTMLDivElement>(null);
  const stackCardRef = useRef<HTMLDivElement>(null);
  const stackLayersRef = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const reelCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Layer 3: Bottom row
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const ctx = gsap.context(() => {
      // ----------------------------------------------------
      // 1. FIRST LOAD ONLY: Bottom Row Spring Entrance
      // ----------------------------------------------------
      if (bottomLeftRef.current && bottomRightRef.current) {
        if (prefersReducedMotion) {
          gsap.set([bottomLeftRef.current, bottomRightRef.current], { opacity: 1, y: 0 });
        } else {
          gsap.fromTo(
            bottomLeftRef.current,
            { opacity: 0.001, y: 150 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              delay: 0.2,
              ease: "back.out(1.4)",
            }
          );
          gsap.fromTo(
            bottomRightRef.current,
            { opacity: 0.001, y: 150 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              delay: 0.4,
              ease: "back.out(1.4)",
            }
          );
        }
      }

      // ----------------------------------------------------
      // 2. REDUCED MOTION FALLBACK
      // ----------------------------------------------------
      if (prefersReducedMotion) {
        gsap.set([line1Ref.current, line2Ref.current, line3Ref.current, dotRef.current], {
          opacity: 1,
          y: 0,
        });
        if (wordsContainerRef.current) gsap.set(wordsContainerRef.current, { display: "none" });
        if (stackCardRef.current) gsap.set(stackCardRef.current, { display: "none" });
        if (reelContainerRef.current) {
          gsap.set(reelContainerRef.current, { opacity: 1 });
          reelCardsRef.current.forEach((card, i) => {
            if (card) {
              gsap.set(card, {
                xPercent: (i - 7.5) * 102.24,
                opacity: 1,
              });
            }
          });
        }
        return;
      }

      // ----------------------------------------------------
      // 3. MASTER GSAP TIMELINE (13.8s Cycle, Repeat Forever)
      // Pure DOM & GPU-accelerated: Zero React State in Loop
      // ----------------------------------------------------
      const masterTl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "none" },
      });

      const cards = reelCardsRef.current.filter(Boolean) as HTMLDivElement[];
      const stackLayers = stackLayersRef.current;

      // Initial Frame at 0.00s
      masterTl.addLabel("start", 0);
      masterTl.set(line1Ref.current, { opacity: 0, y: 24 }, 0);
      masterTl.set(line2Ref.current, { opacity: 0, y: 24 }, 0);
      masterTl.set(line3Ref.current, { opacity: 0, y: 24 }, 0);
      masterTl.set(dotRef.current, { opacity: 0 }, 0);

      // Reset Stack & Reel
      masterTl.set(stackCardRef.current, { opacity: 0, scale: 0.12 }, 0);
      masterTl.set(reelContainerRef.current, { opacity: 0 }, 0);
      masterTl.set(cards, { xPercent: 0, scaleX: 1.0, opacity: 1 }, 0);

      // Stack initial layer visibility: start with Card 5 (dark phone)
      HERO_CARDS.forEach((c) => {
        const el = stackLayers[c.id];
        if (el) {
          masterTl.set(el, { opacity: c.id === 5 ? 1 : 0, zIndex: c.id === 5 ? 10 : 1 }, 0);
        }
      });

      // Reset Word Flicker words
      wordRefs.current.forEach((w) => {
        if (w) masterTl.set(w, { opacity: 0, scale: 1 }, 0);
      });
      if (wordDotRef.current) masterTl.set(wordDotRef.current, { opacity: 0 }, 0);

      // Loop restart ghost: faint ghost (15% opacity) from 0.05s to 0.75s
      masterTl.fromTo(
        line1Ref.current,
        { opacity: 0.15, y: 0 },
        { opacity: 0.15, y: 0, duration: 0.70 },
        0.05
      );

      // --- 0.80s - 1.70s: Headline Entrance ---
      masterTl.addLabel("headline-enter", 0.8);
      // 0.80s: "Digital" in (opacity 0.15 -> 1, y: 0 in 0.18s)
      masterTl.fromTo(
        line1Ref.current,
        { opacity: 0.15, y: 0 },
        { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" },
        0.80
      );
      // 1.00s: "product" in (0.18s ease-out)
      masterTl.fromTo(
        line2Ref.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" },
        1.00
      );
      // 1.20s: "studio" in (0.18s ease-out)
      masterTl.fromTo(
        line3Ref.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" },
        1.20
      );
      // 1.45s: "." fades in (0.12s)
      masterTl.fromTo(
        dotRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.12, ease: "power1.out" },
        1.45
      );

      // --- 2.10s - 4.60s: Card Stack Zoom & Pure DOM Image Shuffle ---
      masterTl.addLabel("stack-start", 2.1);
      masterTl.set(stackCardRef.current, { opacity: 1, scale: 0.12 }, 2.10);
      // Dim headline to very faint (stays visible behind card like the reference), NOT hidden to 0
      masterTl.to(
        [line1Ref.current, line2Ref.current, line3Ref.current, dotRef.current],
        { opacity: 0.07, duration: 0.35, ease: "power1.out" },
        2.10
      );

      // Smooth continuous scale curve from 2.10s to 3.40s (original speed)
      masterTl.fromTo(
        stackCardRef.current,
        { scale: 0.12 },
        { scale: 0.44, duration: 0.30, ease: "power1.in" },
        2.10
      );
      masterTl.to(stackCardRef.current, { scale: 0.52, duration: 0.20, ease: "none" }, 2.40);
      masterTl.to(stackCardRef.current, { scale: 0.68, duration: 0.20, ease: "none" }, 2.60);
      masterTl.to(stackCardRef.current, { scale: 0.80, duration: 0.20, ease: "none" }, 2.80);
      masterTl.to(stackCardRef.current, { scale: 0.88, duration: 0.20, ease: "none" }, 3.00);
      masterTl.to(stackCardRef.current, { scale: 1.00, duration: 0.20, ease: "power1.out" }, 3.20);

      // Pure DOM image swaps in ring order: 5 -> 6 -> 1 -> 2 -> 3 -> 4
      if (stackLayers[6]) masterTl.set(stackLayers[6], { opacity: 1, zIndex: 11 }, 2.50);
      if (stackLayers[1]) masterTl.set(stackLayers[1], { opacity: 1, zIndex: 12 }, 2.60);
      if (stackLayers[2]) masterTl.set(stackLayers[2], { opacity: 1, zIndex: 13 }, 2.80);
      if (stackLayers[3]) masterTl.set(stackLayers[3], { opacity: 1, zIndex: 14 }, 2.90);
      if (stackLayers[4]) masterTl.set(stackLayers[4], { opacity: 1, zIndex: 15 }, 3.00);

      // --- 3.40s - 3.90s: FAN-OUT BURST ---
      masterTl.addLabel("fanout", 3.4);
      masterTl.to(stackCardRef.current, { opacity: 0, duration: 0.08 }, 3.40);
      masterTl.set(reelContainerRef.current, { opacity: 1 }, 3.40);

      // Card horizontal spacing: 100% card width + 6.5% gap (~29px on desktop, ~20px on tablet)
      const PITCH_PERCENT = 106.5;

      // All 18 cards burst outward into row pitch (expo.out, 0.50s)
      cards.forEach((card, i) => {
        const targetPercent = (i - 7.5) * PITCH_PERCENT;
        masterTl.fromTo(
          card,
          { xPercent: 0 },
          {
            xPercent: targetPercent,
            duration: 0.50,
            ease: "expo.out",
          },
          3.40
        );
      });

      // --- 3.90s - 5.10s: Dwell (Row Static, Headline Visible Behind) ---
      masterTl.addLabel("dwell", 3.9);

      // --- 5.10s, 6.70s, 8.30s: THREE PUSHES ---
      const pushTimestamps = [5.10, 6.70, 8.30];
      const pushShiftPercents = [PITCH_PERCENT * 2, PITCH_PERCENT * 4, PITCH_PERCENT * 6];

      pushTimestamps.forEach((startTime, pushIdx) => {
        masterTl.addLabel(`push-${pushIdx + 1}`, startTime);

        cards.forEach((card, i) => {
          const rightToLeftIndex = cards.length - 1 - i;
          const staggerDelay = rightToLeftIndex * 0.012;

          const basePercent = (i - 7.5) * PITCH_PERCENT;
          const prevPushOffset = pushIdx > 0 ? pushShiftPercents[pushIdx - 1] : 0;
          const newPushOffset = pushShiftPercents[pushIdx];

          const startX = basePercent + prevPushOffset;
          const endX = basePercent + newPushOffset;

          masterTl.fromTo(
            card,
            { xPercent: startX },
            {
              xPercent: endX,
              duration: 1.05,
              ease: "power3.out",
            },
            startTime + staggerDelay
          );

          masterTl.fromTo(
            card,
            { scaleX: 1.0 },
            {
              scaleX: 1.04,
              duration: 0.45,
              ease: "sine.out",
            },
            startTime + staggerDelay
          );
          masterTl.to(
            card,
            {
              scaleX: 1.0,
              duration: 0.60,
              ease: "sine.inOut",
            },
            startTime + staggerDelay + 0.45
          );
        });
      });

      // --- 9.70s - 10.20s: Reel Exits & Headline Revealed ---
      masterTl.addLabel("reel-exit", 9.7);
      masterTl.to(
        [line1Ref.current, line2Ref.current, line3Ref.current, dotRef.current],
        { opacity: 1, duration: 0.25, ease: "power1.out" },
        9.70
      );
      masterTl.to(
        reelContainerRef.current,
        { opacity: 0, duration: 0.30, ease: "power2.out" },
        9.90
      );

      // --- 10.20s - 10.65s: Headline Exits in Reverse Order ---
      masterTl.addLabel("headline-exit", 10.2);
      masterTl.to([line3Ref.current, dotRef.current], { opacity: 0, duration: 0.12, ease: "power1.in" }, 10.20);
      masterTl.to(line2Ref.current, { opacity: 0, duration: 0.12, ease: "power1.in" }, 10.35);
      masterTl.to(line1Ref.current, { opacity: 0, duration: 0.12, ease: "power1.in" }, 10.50);

      // --- 10.75s - 13.80s: WORD FLICKER ---
      masterTl.addLabel("word-flicker", 10.75);

      const wProducts = wordRefs.current[0];
      if (wProducts) {
        masterTl.fromTo(
          wProducts,
          { opacity: 0, scale: 1.35 },
          { opacity: 1, scale: 1.0, duration: 0.15, ease: "power2.out" },
          10.75
        );
        masterTl.to(wProducts, { opacity: 0, duration: 0.10, ease: "power1.in" }, 11.15);
      }

      const wBrands = wordRefs.current[1];
      if (wBrands) {
        masterTl.fromTo(
          wBrands,
          { opacity: 0, scale: 1.0 },
          { opacity: 1, duration: 0.12, ease: "power1.out" },
          11.30
        );
        masterTl.to(wBrands, { opacity: 0, duration: 0.10, ease: "power1.in" }, 11.70);
      }

      const wSystems = wordRefs.current[2];
      if (wSystems) {
        masterTl.fromTo(
          wSystems,
          { opacity: 0, scale: 1.0 },
          { opacity: 1, duration: 0.12, ease: "power1.out" },
          11.85
        );
        masterTl.to(wSystems, { opacity: 0, duration: 0.10, ease: "power1.in" }, 12.25);
      }

      const wMotion = wordRefs.current[3];
      if (wMotion) {
        masterTl.fromTo(
          wMotion,
          { opacity: 0, scale: 1.0 },
          { opacity: 1, duration: 0.12, ease: "power1.out" },
          12.40
        );
        masterTl.to(wMotion, { opacity: 0, duration: 0.10, ease: "power1.in" }, 12.80);
      }

      const wStories = wordRefs.current[4];
      if (wStories) {
        masterTl.fromTo(
          wStories,
          { opacity: 0, scale: 1.0 },
          { opacity: 1, duration: 0.12, ease: "power1.out" },
          12.95
        );
        masterTl.fromTo(
          wordDotRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.10, ease: "power1.out" },
          13.45
        );
        masterTl.to(
          [wStories, wordDotRef.current],
          { opacity: 0, duration: 0.12, ease: "power1.in" },
          13.80
        );
      }

      // 13.80s - 14.60s: gentle rest before loop repeats
      masterTl.addLabel("cycle-end", 13.8);
      masterTl.to({}, { duration: 0.80 }, 13.80);

      // Expose to window for testing / seeking if ?t= is passed
      if (typeof window !== "undefined") {
        (window as unknown as { __heroTimeline: gsap.core.Timeline }).__heroTimeline = masterTl;
        const urlParams = new URLSearchParams(window.location.search);
        const tParam = urlParams.get("t");
        if (tParam !== null) {
          const seekTime = parseFloat(tParam);
          if (!isNaN(seekTime)) {
            masterTl.seek(seekTime);
            masterTl.pause();
          }
        }
      }
    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Hero Section"
      style={{
        paddingLeft: "8px",
        paddingRight: "8px",
      }}
      className="relative w-full pt-[46px] pb-2 bg-bg select-none"
    >
      {/* Hero Rounded Container (inset 8px, rounded 32px, min-height 100svh, gradient) */}
      <div
        ref={panelRef}
        style={{
          borderRadius: "32px",
          background: "linear-gradient(180deg, #dce2e5 0%, #f3f5f6 100%)",
          paddingBottom: "var(--hero-pad-bottom)",
          paddingLeft: "var(--page-pad-x)",
          paddingRight: "var(--page-pad-x)",
          minHeight: "calc(100svh - 54px)",
        }}
        className="w-full flex flex-col justify-between overflow-hidden relative shadow-sm"
      >
        {/* ========================================================== */}
        {/* LAYER 1: HEADLINE & WORD FLICKER (z-10, centered at ~30% height matching Framer) */}
        {/* ========================================================== */}
        <div
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
          style={{ top: "50%", transform: "translateY(-50%) translateZ(0)" }}
        >
          {/* Main 3-Line Headline */}
          <div
            style={{
              gap: "var(--hero-line-gap)",
            }}
            className="flex flex-col items-center justify-center font-display font-semibold text-fg tracking-tight text-center leading-[0.7]"
          >
            {/* Line 1: Hello */}
            <div className="overflow-hidden">
              <div
                ref={line1Ref}
                style={{
                  fontSize: "var(--hero-h1-size)",
                  lineHeight: "var(--hero-h1-lh)",
                  letterSpacing: "var(--hero-h1-ls)",
                }}
                className="will-change-transform opacity-0"
              >
                Hello
              </div>
            </div>

            {/* Line 2: I'm Aron */}
            <div className="overflow-hidden">
              <div
                ref={line2Ref}
                style={{
                  fontSize: "var(--hero-h1-size)",
                  lineHeight: "var(--hero-h1-lh)",
                  letterSpacing: "var(--hero-h1-ls)",
                }}
                className="will-change-transform opacity-0"
              >
                I&apos;m{" "}
                <span className="text-accent" style={{ color: "var(--accent)" }}>
                  Aron
                </span>
              </div>
            </div>

            {/* Line 3: Creative Designer. (Orange Accent) */}
            <div className="overflow-hidden">
              <div
                ref={line3Ref}
                style={{
                  fontSize: "var(--hero-h1-size)",
                  lineHeight: "var(--hero-h1-lh)",
                  letterSpacing: "var(--hero-h1-ls)",
                  color: "var(--accent)",
                }}
                className="will-change-transform opacity-0 flex items-baseline justify-center whitespace-nowrap text-accent"
              >
                <span>Creative Designer</span>
                <span ref={dotRef} className="opacity-0">
                  .
                </span>
              </div>
            </div>
          </div>

          {/* Word Flicker Container (single word centered, same 15vw / 190px size) */}
          <div
            ref={wordsContainerRef}
            className="absolute inset-0 flex items-center justify-center font-display font-semibold text-fg tracking-tight text-center leading-[0.7]"
          >
            {FLICKER_WORDS.map((word, idx) => {
              const isStories = word === "stories";
              return (
                <div
                  key={word}
                  ref={(el) => {
                    wordRefs.current[idx] = el;
                  }}
                  style={{
                    fontSize: "var(--hero-h1-size)",
                    lineHeight: "var(--hero-h1-lh)",
                    letterSpacing: "var(--hero-h1-ls)",
                  }}
                  className="absolute opacity-0 will-change-transform flex items-baseline justify-center"
                >
                  <span>{word}</span>
                  {isStories && (
                    <span ref={wordDotRef} className="opacity-0">
                      .
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================== */}
        {/* LAYER 2: REEL & STACKED CARD (z-20, in front of headline, centered at ~48%) */}
        {/* ========================================================== */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          style={{ top: "50%", transform: "translateY(-50%) translateZ(0)" }}
        >
          {/* A. Single Centered Stack Card (scales 0.12 -> 1.00 & swaps top image via pure DOM) */}
          <div
            ref={stackCardRef}
            className="relative flex items-center justify-center opacity-0 will-change-transform"
            style={{
              width: "var(--hero-card-width)",
              aspectRatio: "3/4",
            }}
          >
            {/* Peeking card behind (a few px bigger, giving layered stack look) */}
            <div
              style={{
                borderRadius: "var(--hero-card-radius)",
              }}
              className="absolute inset-0 scale-[1.04] rotate-1 bg-black/15 shadow-2xl border border-white/40"
            />

            {/* All 6 Stack Layers (DOM toggled via GSAP, 0 React re-renders) */}
            {HERO_CARDS.map((card) => (
              <div
                key={`stack-layer-${card.id}`}
                ref={(el) => {
                  stackLayersRef.current[card.id] = el;
                }}
                style={{
                  borderRadius: "var(--hero-card-radius)",
                }}
                className="absolute inset-0 overflow-hidden shadow-2xl border border-white/20 will-change-transform opacity-0"
              >
                {card.renderArtwork()}
              </div>
            ))}
          </div>

          {/* B. Full Reel Cards Row (18 cards in ring, fan-out burst & 3 pushes) */}
          <div
            ref={reelContainerRef}
            className="absolute inset-0 flex items-center justify-center opacity-0 will-change-transform pointer-events-none"
          >
            {FULL_RING_CARDS.map((card, idx) => (
              <div
                key={`ring-card-${idx}`}
                ref={(el) => {
                  reelCardsRef.current[idx] = el;
                }}
                style={{
                  width: "var(--hero-card-width)",
                  aspectRatio: "3/4",
                  borderRadius: "var(--hero-card-radius)",
                }}
                className="absolute shadow-xl overflow-hidden border border-white/10 will-change-transform bg-black/5"
              >
                {card.renderArtwork()}
              </div>
            ))}
          </div>
        </div>

        {/* Spacer for vertical balance */}
        <div className="flex-1" />

        {/* ========================================================== */}
        {/* LAYER 3: BOTTOM ROW (z-30, inside the panel) */}
        {/* ========================================================== */}
        <div className="relative z-30 w-full flex items-center justify-between">
          {/* Left: — Award-winning designs. */}
          <div
            ref={bottomLeftRef}
            className="flex items-center gap-2 font-body font-medium text-fg will-change-transform"
          >
            <span className="w-4 h-[1.5px] bg-fg inline-block" />
            <p
              style={{
                fontSize: "var(--label-size)",
                lineHeight: "var(--label-lh)",
              }}
            >
              Award-winning designs.
            </p>
          </div>

          {/* Right: ↗ Explore our work. */}
          <div ref={bottomRightRef} className="will-change-transform">
            <Link
              href="/work"
              style={{
                fontSize: "var(--label-size)",
                lineHeight: "var(--label-lh)",
              }}
              className="font-body font-normal text-fg transition-opacity hover:opacity-70 inline-flex items-center gap-1.5 group cursor-pointer"
            >
              <span className="text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
              <span>Explore our work.</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
