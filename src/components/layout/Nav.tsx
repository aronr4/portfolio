"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { useContactModal } from "@/providers/ContactModal";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef(0);
  const pathname = usePathname();
  const { open: openContact } = useContactModal();

  // Nav is fixed at top, always visible, no hide-on-scroll, no entrance animation

  // Mobile menu open / close animation
  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(menu, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.5,
        ease: "power3.out",
      });

      const links = menu.querySelectorAll(".mobile-nav-item");
      gsap.fromTo(
        links,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "expo.out", delay: 0.15 }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(menu, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.4,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    openContact();
  };

  return (
    <>
      <header
        ref={navRef}
        style={{
          height: "var(--nav-height)",
          paddingLeft: "var(--nav-pad-x)",
          paddingRight: "var(--nav-pad-x)",
          paddingTop: "var(--nav-pad-y)",
          paddingBottom: "var(--nav-pad-y)",
          backgroundColor: "var(--bg)",
        }}
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 flex items-center justify-between border-b border-black/[0.04]"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center text-fg font-display font-semibold text-lg tracking-tight hover:opacity-80 transition-opacity"
          aria-label="Aron home"
        >
          <span>Aron.</span>
        </Link>

        {/* Desktop Navigation Links (Services, Work, About, Contact spaced evenly, Contact right-aligned) */}
        <nav className="hidden md:flex items-center justify-between flex-1 max-w-[620px] ml-auto" aria-label="Main Navigation">
          {siteConfig.navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "var(--label-size)",
                  lineHeight: "var(--label-lh)",
                }}
                className={cn(
                  "font-body font-normal text-fg transition-opacity hover:opacity-70",
                  isActive && "font-medium"
                )}
              >
                {link.label}
              </Link>
            );
          })}

          <button
            type="button"
            onClick={handleContactClick}
            style={{
              fontSize: "var(--label-size)",
              lineHeight: "var(--label-lh)",
            }}
            className="font-body font-normal text-fg transition-opacity hover:opacity-70 cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative z-50 text-fg"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={cn(
              "w-5 h-0.5 bg-fg transition-transform duration-300 ease-in-out",
              isOpen ? "rotate-45 translate-y-1 bg-fg" : "-translate-y-1"
            )}
          />
          <span
            className={cn(
              "w-5 h-0.5 bg-fg transition-transform duration-300 ease-in-out",
              isOpen ? "-rotate-45 -translate-y-0.5 bg-fg" : "translate-y-1"
            )}
          />
        </button>
      </header>

      {/* Full-screen Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-bg flex flex-col justify-between p-8 pt-24 opacity-0 pointer-events-none md:hidden"
        aria-hidden={!isOpen}
      >
        <nav className="flex flex-col gap-6" aria-label="Mobile Navigation">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="mobile-nav-item font-body text-3xl font-medium text-fg hover:opacity-70 transition-opacity"
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={handleContactClick}
            className="mobile-nav-item font-body text-3xl font-medium text-fg text-left hover:opacity-70 transition-opacity cursor-pointer"
          >
            Contact
          </button>
        </nav>

        <div className="mobile-nav-item border-t border-black/[0.08] pt-6 flex flex-col gap-2 font-body text-sm text-muted">
          <span>{siteConfig.email}</span>
          <span>{siteConfig.location}</span>
        </div>
      </div>
    </>
  );
}
