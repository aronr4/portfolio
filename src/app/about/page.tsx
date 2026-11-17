import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import Odometer from "@/components/ui/Odometer";
import CertificatesList from "@/components/sections/about/CertificatesList";

export const metadata = {
  title: "About — Aron",
  description: "I’m Aron, an independent motion-first digital product designer partnering with visionary creators worldwide.",
};

const processSteps = [
  {
    step: "01",
    title: "Find the point.",
    description: "We strip away superficial noise to find the fundamental truth and core ambition worth building everything around. No filler, just pure intention.",
  },
  {
    step: "02",
    title: "Shape the system.",
    description: "We turn that core idea into an elastic, coherent design system engineered to maintain absolute aesthetic precision across screens and scales.",
  },
  {
    step: "03",
    title: "Create the moments.",
    description: "We choreograph layout, physical kinetic feedback, and high-performance animation to make every digital touchpoint distinctly memorable.",
  },
];

const teamMembers = [
  {
    name: "Aron Vance",
    role: "Founder & Creative Director",
    bio: "Pioneering motion design systems and digital architecture for over a decade.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Elena Rostova",
    role: "Head of Interface Engineering",
    bio: "Bridging mathematical animation curves, front-end shaders, and high-performance code.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Marcus Thorne",
    role: "Brand Strategy Director",
    bio: "Crafting resonant positioning, sharp narrative arcs, and international cultural launch strategies.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
  },
];

export default function AboutPage() {
  return (
    <main className="container-x py-16 md:py-24">
      {/* Header */}
      <div className="border-b border-white/10 pb-12 mb-16">
        <span className="text-xs uppercase tracking-widest text-accent font-display block mb-3">
          Behind the Craft
        </span>
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-fg">
          My Story<span className="text-accent">.</span>
        </h1>
        <p className="text-muted text-base sm:text-lg max-w-2xl font-body mt-4">
          I’m Aron, an independent motion-first digital product designer. I work across brand, product design, and creative direction to make every interaction feel physically connected and hard to forget.
        </p>
        <p className="text-muted text-base sm:text-lg max-w-2xl font-body mt-4">
          After studying design, I began freelancing in 2026 to work directly with founders and take projects from first idea to launch. Since then, I’ve collaborated with startups and creative brands on brand identities, apps, and websites.
        </p>
      </div>

      {/* Hero Studio Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-12 border-b border-white/10 mb-20">
        <div>
          <div className="font-display text-5xl sm:text-6xl font-bold text-fg flex items-baseline">
            <Odometer value={5} suffix="+" />
          </div>
          <span className="text-xs uppercase tracking-wider text-muted font-display mt-2 block">
            Projects Completed
          </span>
        </div>

        <div>
          <div className="font-display text-5xl sm:text-6xl font-bold text-accent flex items-baseline">
            <Odometer value={82} suffix="%" />
          </div>
          <span className="text-xs uppercase tracking-wider text-muted font-display mt-2 block">
            Repeat Client Collaborations
          </span>
        </div>

        <div>
          <div className="font-display text-5xl sm:text-6xl font-bold text-fg flex items-baseline">
            <Odometer value={100} suffix="%" />
          </div>
          <span className="text-xs uppercase tracking-wider text-muted font-display mt-2 block">
            On-Schedule Project Delivery
          </span>
        </div>
      </div>

      {/* The Process */}
      <div className="mb-24">
        <span className="text-xs uppercase tracking-widest text-accent font-display block mb-3">
          Methodology
        </span>
        <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-fg mb-12">
          The process<span className="text-accent">.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {processSteps.map((step) => (
            <Reveal key={step.step} variant="fade-up">
              <div className="p-8 rounded-2xl bg-surface border border-white/10 flex flex-col justify-between h-full">
                <div>
                  <span className="text-sm font-display text-accent font-bold tabular-nums">
                    {step.step}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-fg mt-3 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted font-body leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Certificates Section */}
      <div className="mb-24 border-t border-white/10 pt-16">
        <span className="text-xs uppercase tracking-widest text-accent font-display block mb-3">
          Learning
        </span>
        <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-fg mb-12">
          Certificates<span className="text-accent">.</span>
        </h2>

        <CertificatesList />
      </div>

      {/* Team Members */}
      <div className="border-t border-white/10 pt-16">
        <span className="text-xs uppercase tracking-widest text-accent font-display block mb-3">
          Leadership
        </span>
        <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-fg mb-12">
          Our team<span className="text-accent">.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex flex-col bg-surface rounded-2xl overflow-hidden border border-white/10">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-bg">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-fg">{member.name}</h3>
                <span className="text-xs text-accent font-display uppercase tracking-wider block mt-1 mb-3">
                  {member.role}
                </span>
                <p className="text-xs text-muted font-body leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
