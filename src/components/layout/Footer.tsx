"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { useContactModal } from "@/providers/ContactModal";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { open: openContact } = useContactModal();

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const chars = headlineRef.current?.querySelectorAll(".footer-char");
      if (chars && chars.length > 0) {
        gsap.fromTo(
          chars,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.03,
            ease: "expo.out",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <footer
      ref={footerRef}
      id="footer"
      aria-label="Site Footer"
      style={{
        borderRadius: "var(--footer-radius)",
        paddingLeft: "var(--footer-pad-x)",
        paddingRight: "var(--footer-pad-x)",
      }}
      className="relative w-full max-w-[1100px] mx-auto bg-bg border border-black/[0.06] pt-16 pb-12 overflow-hidden my-8"
    >
      <div className="w-full flex flex-col gap-12">
        {/* Giant Headline: "Let's talk." in the 130px style (Clash Grotesk 600) */}
        <div className="flex flex-col gap-8">
          <h2
            ref={headlineRef}
            style={{
              fontSize: "var(--section-h2-size)",
              lineHeight: "var(--section-h2-lh)",
              letterSpacing: "var(--section-h2-ls)",
              paddingTop: "var(--section-h2-pt)",
              whiteSpace: "pre-line",
            }}
            className="font-display font-semibold text-fg select-none"
            aria-label="Let's talk."
          >
            {"Let's\ntalk."}
          </h2>

          {/* "Get in touch" Pill Button */}
          <div>
            <button
              type="button"
              onClick={openContact}
              style={{
                backgroundColor: "var(--fg)",
                color: "var(--white)",
                borderRadius: "var(--btn-pill-radius)",
                padding: "var(--btn-pill-pad)",
                gap: "var(--btn-pill-gap)",
                fontSize: "var(--label-size)",
                lineHeight: "var(--label-lh)",
              }}
              className="font-body font-medium inline-flex items-center hover:opacity-85 transition-opacity cursor-pointer"
            >
              <span>Get in touch</span>
            </button>
          </div>
        </div>

        {/* 4-Column Grid: Studio details, Contact, Explore, Connect */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-black/[0.08] pt-12">
          {/* Brand Col */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="font-display font-semibold text-xl text-fg">
              Aron.
            </span>
            <p
              style={{
                fontSize: "var(--project-metric-size)",
                lineHeight: "var(--project-metric-lh)",
              }}
              className="font-body text-muted max-w-xs"
            >
              Creative designer crafting digital products, brands, and motion-driven experiences.
            </p>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span
              style={{
                fontSize: "var(--label-size)",
                lineHeight: "var(--label-lh)",
              }}
              className="font-body font-medium text-fg"
            >
              Contact
            </span>
            <div className="flex flex-col gap-1.5 font-body text-sm">
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-fg hover:opacity-70 transition-opacity"
              >
                {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="text-muted hover:text-fg transition-colors"
              >
                {siteConfig.phone}
              </a>
              <span className="text-muted">
                {siteConfig.location}
              </span>
            </div>
          </div>

          {/* Explore Links */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span
              style={{
                fontSize: "var(--label-size)",
                lineHeight: "var(--label-lh)",
              }}
              className="font-body font-medium text-fg"
            >
              Explore
            </span>
            <nav className="flex flex-col gap-1.5 font-body text-sm" aria-label="Footer Explore Navigation">
              {siteConfig.exploreLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-muted hover:text-fg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect Links */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <span
              style={{
                fontSize: "var(--label-size)",
                lineHeight: "var(--label-lh)",
              }}
              className="font-body font-medium text-fg"
            >
              Connect
            </span>
            <div className="flex flex-col gap-1.5 font-body text-sm">
              {siteConfig.connectLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-fg transition-colors"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="border-t border-black/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-body text-xs text-muted">
          <p>© 2026 Aron. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-fg underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
