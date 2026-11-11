import Link from "next/link";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: "Privacy Policy — Kinetic Studio",
  description: "Privacy policy and client data ethics for Kinetic Studio.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="container-x py-16 md:py-24 max-w-4xl">
      <div className="border-b border-white/10 pb-8 mb-12">
        <span className="text-xs uppercase tracking-widest text-accent font-display block mb-3">
          Governance & Ethics
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-fg">
          Privacy Policy<span className="text-accent">.</span>
        </h1>
        <p className="text-xs uppercase tracking-wider text-muted font-display mt-3">
          Last updated: January 2026
        </p>
      </div>

      <div className="flex flex-col gap-10 font-body text-base text-muted leading-relaxed">
        <section>
          <h2 className="font-display text-xl font-bold text-fg mb-3">1. Overview</h2>
          <p>
            At {siteConfig.brand} Studio, we value the trust you place in us. This privacy policy explains how we collect, use, and protect any personal information you provide when visiting our website or communicating directly with our team.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-fg mb-3">2. Information Collection</h2>
          <p>
            We collect only essential information required to respond to business inquiries, evaluate potential project partnerships, and ensure the performance and security of our digital portfolio. This may include your name, email address, company details, and project brief submitted via email or contact forms.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-fg mb-3">3. Telemetry and Analytics</h2>
          <p>
            Our website utilizes minimal, privacy-centric telemetry to measure technical performance, render speed, and accessibility metrics. We do not sell, rent, or trade your personal information to third-party data brokers or marketing networks.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-fg mb-3">4. Cookies and Local Storage</h2>
          <p>
            We use lightweight browser storage solely to preserve interface preferences, such as reduced motion preferences and session state. These tokens do not track you across external web properties.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-fg mb-3">5. Data Protection and Rights</h2>
          <p>
            You have the right to request access to any personal correspondence or data we hold, or to request its immediate deletion. To submit an inquiry, please contact our team directly at{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-accent hover:underline">
              {siteConfig.email}
            </a>
            .
          </p>
        </section>
      </div>

      <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
        <Link
          href="/"
          className="text-xs uppercase tracking-wider text-muted hover:text-fg font-display transition-colors"
        >
          ← Return to Studio Home
        </Link>
      </div>
    </main>
  );
}
