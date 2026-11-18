import Link from "next/link";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: "Privacy Policy — Aron",
  description: "Privacy policy and client data ethics for Aron.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container-x pt-24 sm:pt-28 md:pt-36 pb-16 md:pb-24 max-w-4xl">
      <div className="border-b border-black/[0.08] pb-8 mb-12">
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
            I value the trust you place in me. This privacy policy explains how I collect, use, and protect any personal information you provide when visiting my website or contacting me directly.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-fg mb-3">2. Information Collection</h2>
          <p>
            I collect only the information needed to respond to enquiries, discuss potential projects, and keep my portfolio secure and working well. This may include your name, email address, phone number, and project details submitted through email or the contact form.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-fg mb-3">3. Telemetry and Analytics</h2>
          <p>
            My website uses minimal analytics to measure performance and loading speed. I do not sell, rent, or trade your personal information to third parties or marketing networks.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-fg mb-3">4. Cookies and Local Storage</h2>
          <p>
            I use lightweight browser storage only to remember interface preferences, such as reduced motion settings. This does not track you across other websites.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-fg mb-3">5. Data Protection and Rights</h2>
          <p>
            You have the right to ask what personal information I hold about you, or to ask me to delete it. To make a request, email me at{" "}
            <a href="mailto:sathisharonr@gmail.com" className="text-accent hover:underline">
              sathisharonr@gmail.com
            </a>
            .
          </p>
        </section>
      </div>

      <div className="mt-16 pt-8 border-t border-black/[0.08] flex items-center justify-between">
        <Link
          href="/"
          className="text-xs uppercase tracking-wider text-muted hover:text-fg font-display transition-colors"
        >
          ← Return to Home
        </Link>
      </div>
    </div>
  );
}
