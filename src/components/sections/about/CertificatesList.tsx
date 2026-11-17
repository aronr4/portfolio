"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  issueDate?: string;
  credentialId?: string;
  pdfUrl: string;
  imageUrl: string;
}

const defaultCertificates: Certificate[] = [
  {
    id: "graphic-design-essentials",
    title: "Graphic Design Essentials, Canva Design School",
    issuer: "Canva Design School",
    year: "2026",
    issueDate: "July 9, 2026",
    credentialId: "0e9662",
    pdfUrl: "/certificates/graphic-design-essentials.pdf",
    imageUrl: "/certificates/graphic-design-essentials.png",
  },
];

interface CertificatesListProps {
  certificates?: Certificate[];
}

export default function CertificatesList({
  certificates = defaultCertificates,
}: CertificatesListProps) {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
      }
    };
    if (selectedCert) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedCert]);

  return (
    <>
      <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
        {certificates.map((cert) => (
          <button
            key={cert.id}
            type="button"
            onClick={() => setSelectedCert(cert)}
            className="group w-full py-6 px-3 sm:px-4 -mx-3 sm:-mx-4 rounded-xl flex items-center justify-between text-left transition-colors duration-200 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
          >
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 pr-4">
              <span className="font-display text-lg sm:text-xl font-bold text-fg group-hover:text-accent transition-colors truncate sm:whitespace-normal">
                {cert.title}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] uppercase tracking-wider font-display font-medium text-muted/70 group-hover:text-accent transition-colors border border-white/10 group-hover:border-accent/40 rounded-full px-2.5 py-0.5 whitespace-nowrap">
                View Certificate
                <svg
                  className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs uppercase tracking-widest text-muted font-display tabular-nums">
                {cert.year}
              </span>
              {/* Mobile icon */}
              <svg
                className="w-4 h-4 text-muted group-hover:text-accent transition-colors sm:hidden"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Certificate Modal Viewer */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedCert.title}
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-[#141719] border border-white/15 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-white/10 bg-[#171b1e]">
              <div className="min-w-0 pr-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                  <span className="text-[11px] font-display uppercase tracking-widest text-muted">
                    {selectedCert.issuer}
                    {selectedCert.year ? ` • ${selectedCert.year}` : ""}
                  </span>
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold text-fg truncate mt-0.5">
                  {selectedCert.title}
                </h3>
              </div>

              {/* Action Buttons & Close */}
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={selectedCert.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-display font-medium text-fg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  Open PDF
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>

                <a
                  href={selectedCert.pdfUrl}
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-display font-medium text-fg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span className="hidden sm:inline">Download</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  aria-label="Close certificate modal"
                  className="p-1.5 rounded-lg text-muted hover:text-fg hover:bg-white/10 transition-colors ml-1"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Certificate Image View */}
            <div className="relative p-3 sm:p-6 bg-[#0c0e10] flex items-center justify-center overflow-auto max-h-[calc(92vh-70px)]">
              <div className="relative w-full max-w-3xl aspect-[3508/2481] rounded-lg overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src={selectedCert.imageUrl}
                  alt={selectedCert.title}
                  fill
                  sizes="(max-width: 1024px) 95vw, 850px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
