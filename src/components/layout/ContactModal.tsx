"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useContactModal } from "@/providers/ContactModal";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

type FormState = "idle" | "sending" | "sent" | "error";

export default function ContactModal() {
  const { isOpen, close } = useContactModal();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  // Animate in/out
  useEffect(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";

      // Set initial state
      gsap.set(overlay, { display: "flex", opacity: 0 });
      gsap.set(panel, { y: 40, opacity: 0, scale: 0.97 });

      const tl = gsap.timeline();

      // Fade in backdrop
      tl.to(overlay, { opacity: 1, duration: 0.35, ease: "power2.out" });

      // Slide up and scale panel
      tl.to(panel, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "expo.out",
      }, "-=0.15");

      // Animate headline chars
      const chars = headlineRef.current?.querySelectorAll(".contact-char");
      if (chars && chars.length > 0) {
        gsap.fromTo(chars,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.05,
            ease: "expo.out",
            delay: 0.25,
          }
        );
      }
    } else {
      document.body.style.overflow = "";

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
        },
      });

      tl.to(panel, { y: 30, opacity: 0, scale: 0.97, duration: 0.3, ease: "power2.in" });
      tl.to(overlay, { opacity: 0, duration: 0.25, ease: "power2.in" }, "-=0.1");
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) close();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    // Simulate sending (replace with real API call)
    await new Promise((res) => setTimeout(res, 1200));
    setFormState("sent");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  const headlineLetters = "Hello.".split("");

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9995] items-center justify-center p-4 sm:p-8 bg-bg/60 backdrop-blur-md hidden"
      aria-modal="true"
      role="dialog"
      aria-label="Contact Aron"
      onClick={(e) => {
        if (e.target === overlayRef.current) close();
      }}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-5xl max-h-[92svh] overflow-y-auto rounded-3xl will-change-transform shadow-[0_24px_64px_rgba(0,0,0,0.15)] bg-bg text-fg"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={close}
          className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full flex items-center justify-center bg-black/5 hover:bg-black/12 transition-colors text-[#111618] focus-visible:outline-offset-2"
          aria-label="Close contact overlay"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[520px]">
          {/* ── Left Panel ────────────────────── */}
          <div className="md:col-span-5 flex flex-col justify-between p-8 md:p-12 border-b md:border-b-0 md:border-r border-black/[0.08]">
            {/* Giant Headline */}
            <div>
              <h2
                ref={headlineRef}
                className="text-[clamp(4.5rem,12vw,8rem)] font-bold tracking-[-0.04em] leading-[0.88] text-[#111618] font-display select-none"
                aria-label="Hello."
              >
                {headlineLetters.map((char, i) => (
                  <span key={i} className="inline-block overflow-hidden align-top">
                    <span
                      className={cn(
                        "contact-char inline-block will-change-transform",
                        char === "." && "text-[#111618]"
                      )}
                    >
                      {char}
                    </span>
                  </span>
                ))}
              </h2>

              <p className="mt-6 text-lg md:text-xl text-[#111618]/70 font-display leading-snug max-w-xs">
                Have a project in mind? Tell us the essentials.
              </p>
            </div>

            {/* Contact Details */}
            <div className="mt-10 md:mt-0 grid grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#607580] font-display mb-3">
                  Get in touch
                </p>
                <div className="flex flex-col gap-1.5">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-sm font-display text-[#111618] hover:text-black transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="text-sm font-display text-[#607580] hover:text-[#111618] transition-colors"
                  >
                    {siteConfig.phone}
                  </a>
                  <span className="text-sm font-display text-[#607580]">
                    {siteConfig.location}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-[#607580] font-display mb-3">
                  Connect
                </p>
                <div className="flex flex-col gap-1.5">
                  {siteConfig.connectLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-display text-[#111618] hover:text-black transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Panel: Form ────────────── */}
          <div className="md:col-span-7 flex flex-col p-8 md:p-12">
            {formState === "sent" ? (
              <div className="flex flex-col items-center justify-center flex-1 text-center gap-4 py-16">
                <span className="w-14 h-14 rounded-full bg-[#111618] flex items-center justify-center text-white text-2xl">
                  ✓
                </span>
                <h3 className="font-display text-2xl font-bold text-[#111618]">
                  Message sent!
                </h3>
                <p className="text-[#607580] font-body text-sm max-w-xs">
                  We&apos;ll be in touch shortly. Looking forward to hearing more about your project.
                </p>
                <button
                  type="button"
                  onClick={() => setFormState("idle")}
                  className="mt-4 text-xs uppercase tracking-widest text-[#607580] hover:text-[#111618] font-display transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1" noValidate>
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className="text-xs uppercase tracking-widest text-[#607580] font-display">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    required
                    className="w-full h-12 px-5 rounded-full bg-[#dce2e5] placeholder-[#8A8A8A] text-[#111618] text-sm font-body focus:outline-none focus:ring-2 focus:ring-[#111618] transition-all"
                  />
                </div>

                {/* Email + Phone row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-email" className="text-xs uppercase tracking-widest text-[#607580] font-display">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={siteConfig.email}
                      required
                      className="w-full h-12 px-5 rounded-full bg-[#dce2e5] placeholder-[#8A8A8A] text-[#111618] text-sm font-body focus:outline-none focus:ring-2 focus:ring-[#111618] transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-phone" className="text-xs uppercase tracking-widest text-[#607580] font-display">
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder={siteConfig.phone}
                      className="w-full h-12 px-5 rounded-full bg-[#dce2e5] placeholder-[#8A8A8A] text-[#111618] text-sm font-body focus:outline-none focus:ring-2 focus:ring-[#111618] transition-all"
                    />
                  </div>
                </div>

                {/* How can we help */}
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="contact-message" className="text-xs uppercase tracking-widest text-[#607580] font-display">
                    How can we help?
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us a little about your project, what you're working on, and where you'd like to take it."
                    rows={5}
                    required
                    className="w-full px-5 py-4 rounded-3xl bg-[#dce2e5] placeholder-[#8A8A8A] text-[#111618] text-sm font-body resize-none focus:outline-none focus:ring-2 focus:ring-[#111618] transition-all flex-1"
                  />
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className={cn(
                    "w-full h-14 rounded-full font-display font-semibold text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-300",
                    "bg-[#111618] text-white hover:bg-black focus-visible:outline-offset-2",
                    formState === "sending" && "opacity-70 cursor-wait"
                  )}
                >
                  {formState === "sending" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M1 13L13 1M13 1H4M13 1v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Send message
                    </>
                  )}
                </button>

                <p className="text-[10px] text-[#607580] font-body text-center">
                  By submitting this form, you agree to our{" "}
                  <a href="/privacy-policy" className="underline hover:text-[#111618] transition-colors" onClick={close}>
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
