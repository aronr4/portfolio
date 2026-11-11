import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";

export async function generateStaticParams() {
  const list = projects.map((project) => ({
    slug: project.slug,
  }));
  list.push({ slug: "aura" });
  return list;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug || (slug === "aura" && p.slug === "dheerah"));
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Kinetic Case Study`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const currentIndex = projects.findIndex((p) => p.slug === slug || (slug === "aura" && p.slug === "dheerah"));
  if (currentIndex === -1) {
    notFound();
  }

  const project = projects[currentIndex];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="py-16 md:py-24">
      {/* Top Header */}
      <div className="container-x mb-12">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-accent font-display mb-4">
          <Link href="/work" className="hover:underline">
            Work
          </Link>
          <span>/</span>
          <span>{project.category}</span>
          <span>/</span>
          <span>{project.year}</span>
        </div>

        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-fg">
          {project.title}
          <span className="text-accent">.</span>
        </h1>

        <p className="text-lg sm:text-2xl font-display text-muted mt-4 max-w-3xl leading-snug">
          {project.tagline}
        </p>
      </div>

      {/* Clip-Reveal Hero Image */}
      <div className="container-x mb-16 md:mb-24">
        <Reveal variant="clip-up" duration={1.2}>
          <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-surface shadow-2xl">
            <Image
              src={project.images.hero}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>

      {/* Metrics Row */}
      <div className="container-x mb-20 border-y border-white/10 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted font-display block mb-1">
              Sector
            </span>
            <span className="font-display text-xl font-bold text-fg">
              {project.sector}
            </span>
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-muted font-display block mb-1">
              Timeline
            </span>
            <span className="font-display text-xl font-bold text-fg">
              {project.year}
            </span>
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-muted font-display block mb-1">
              Core Impact
            </span>
            <div className="font-display text-3xl font-bold text-accent flex items-baseline gap-1">
              <Counter
                value={project.metric}
                suffix={project.metric.includes("%") ? "%" : (project.metric.includes("M") ? "M" : "")}
              />
              <span className="text-xs uppercase tracking-wider text-muted font-normal ml-1">
                {project.metricLabel}
              </span>
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-muted font-display block mb-1">
              Disciplines
            </span>
            <span className="text-xs text-fg/90 font-body">
              {project.capabilities.join(", ")}
            </span>
          </div>
        </div>
      </div>

      {/* Case Study Content Grid: Challenge, Solution, Outcome */}
      <div className="container-x mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <span className="text-xs uppercase tracking-widest text-accent font-display">
            The Mission
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-fg leading-tight">
            Elevating digital performance to iconic standards.
          </h2>
          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
            {project.capabilities.map((cap) => (
              <span
                key={cap}
                className="text-xs font-display tracking-wider uppercase px-3 py-1.5 rounded-full bg-surface border border-white/10 text-muted"
              >
                {cap}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-10 font-body text-base md:text-lg text-muted leading-relaxed">
          <div>
            <h3 className="font-display text-sm uppercase tracking-wider text-fg font-semibold mb-2">
              The Challenge
            </h3>
            <p>{project.challenge || project.description}</p>
          </div>

          <div>
            <h3 className="font-display text-sm uppercase tracking-wider text-fg font-semibold mb-2">
              The Solution
            </h3>
            <p>{project.solution || project.description}</p>
          </div>

          <div>
            <h3 className="font-display text-sm uppercase tracking-wider text-fg font-semibold mb-2">
              The Outcome
            </h3>
            <p>{project.outcome || project.description}</p>
          </div>

          {/* Client Testimonial Quote */}
          {project.quote && (
            <div className="p-8 rounded-2xl bg-surface border-l-2 border-accent mt-4">
              <p className="text-fg italic text-base md:text-lg font-body leading-relaxed">
                “{project.quote.text}”
              </p>
              <div className="mt-4 text-xs font-display text-muted">
                <span className="font-bold text-fg">{project.quote.author}</span> — {project.quote.role}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Gallery with Scroll Reveals */}
      <div className="container-x mb-24 flex flex-col gap-8 md:gap-12">
        <span className="text-xs uppercase tracking-widest text-accent font-display">
          Artifacts & Interfaces
        </span>

        {project.images.caseStudy ? (
          /* Case study: continuous plain presentation board without cuts */
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between flex-wrap gap-4 px-2">
              <span className="text-sm font-display text-muted">
                Complete Case Study Presentation
              </span>
              {project.images.caseStudyPdf && (
                <a
                  href={project.images.caseStudyPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="dheerah-case-study.pdf"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-display px-4 py-2 rounded-full bg-surface border border-white/10 hover:border-accent text-fg hover:text-accent transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download Original PDF</span>
                </a>
              )}
            </div>

            <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-surface">
              <img
                src={project.images.caseStudyImage || project.images.gallery[0]}
                alt={`${project.title} Case Study Full Presentation`}
                className="w-full h-auto block m-0 p-0"
                loading="eager"
              />
            </div>
          </div>
        ) : (
          /* Standard: 2-column aspect-[4/3] grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {project.images.gallery.map((imgSrc, idx) => (
              <Reveal key={idx} variant="clip-up" delay={idx * 0.1}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface shadow-xl">
                  <Image
                    src={imgSrc}
                    alt={`${project.title} detail showcase ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* Next Project Link with Hover Preview */}
      <div className="container-x border-t border-white/10 pt-16">
        <span className="text-xs uppercase tracking-widest text-muted font-display block mb-4">
          Next Project
        </span>

        <Link
          href={`/projects/${nextProject.slug}`}
          className="group block relative overflow-hidden rounded-3xl bg-surface p-8 sm:p-12 border border-white/10 hover:border-accent transition-colors"
          data-cursor="view"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
            <div>
              <span className="text-xs uppercase tracking-wider text-accent font-display block mb-2">
                {nextProject.category} • {nextProject.metric} {nextProject.metricLabel}
              </span>
              <h3 className="font-display text-4xl sm:text-6xl font-bold text-fg group-hover:text-accent transition-colors">
                {nextProject.title}
              </h3>
            </div>

            <div className="flex items-center gap-4">
              {/* Thumbnail Preview */}
              <div className="relative w-24 h-16 rounded-xl overflow-hidden hidden sm:block shrink-0 shadow-lg">
                <Image
                  src={nextProject.images.hero}
                  alt={nextProject.title}
                  fill
                  sizes="96px"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <span className="text-3xl text-muted group-hover:text-accent transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}
