export interface Project {
  slug: string;
  title: string;
  category: string;
  sector: string;
  year: string;
  metric: string;
  metricLabel: string;
  description: string;
  tagline: string;
  quote?: {
    text: string;
    author: string;
    role: string;
  };
  challenge?: string;
  solution?: string;
  outcome?: string;
  capabilities: string[];
  images: {
    hero: string;
    secondary?: string;
    caseStudy?: boolean;
    caseStudyImage?: string;
    caseStudyImages?: string[];
    caseStudyPdf?: string;
    heroAspect?: "16/9" | "4/3" | "auto";
    gallery: string[];
  };
}

export const projects: Project[] = [
  {
    slug: "dheerah",
    title: "Dheerah",
    category: "E-Commerce",
    sector: "Designer Boutique",
    year: "2026",
    metric: "84%",
    metricLabel: "boutique lift",
    description: "Dheerah is a modern fashion e-commerce website designed to create a smooth, engaging, and visually immersive shopping experience, guiding users effortlessly from exploration to purchase.",
    tagline: "Embrace the perfect blend of style and sophistication.",
    quote: {
      text: "Dheerah shaped our collections into an editorial digital storefront that elevated customer connection, seamless product discovery, and shopping elegance.",
      author: "Elena Park",
      role: "Dheerah Creative Director"
    },
    challenge: "Traditional fashion e-commerce websites often suffer from weak call-to-actions, confusing navigation menus, lack of distinct branding, and cluttered layouts that cause customer friction and drop-offs.",
    solution: "A streamlined, user-friendly shopping experience with intuitive navigation, engaging 'New In' lookbooks, balanced typography (Kygile & Sora), refined warm color palettes, and fully responsive layouts across mobile, tablet, and desktop.",
    outcome: "84% lift in boutique engagement, friction-free checkout flows, and a cohesive multi-device experience across 10+ tailored e-commerce templates.",
    capabilities: ["UI/UX Design", "E-Commerce", "User Flow", "Design System", "Branding"],
    images: {
      hero: "/images/projects/dheerah.jpg",
      caseStudy: true,
      caseStudyImage: "/images/projects/dheerah/dheerah_case_study.jpg",
      caseStudyImages: [
        "/images/projects/dheerah/01_overview_and_goal.jpg",
        "/images/projects/dheerah/02_design_process_and_problems.jpg",
        "/images/projects/dheerah/03_solving_and_architecture.jpg",
        "/images/projects/dheerah/04_website_preview.jpg",
        "/images/projects/dheerah/05_typography_and_color.jpg",
        "/images/projects/dheerah/06_responsive_experience.jpg"
      ],
      caseStudyPdf: "/documents/dheerah-case-study.pdf",
      gallery: [
        "/images/projects/dheerah/01_overview_and_goal.jpg",
        "/images/projects/dheerah/02_design_process_and_problems.jpg",
        "/images/projects/dheerah/03_solving_and_architecture.jpg",
        "/images/projects/dheerah/04_website_preview.jpg",
        "/images/projects/dheerah/05_typography_and_color.jpg",
        "/images/projects/dheerah/06_responsive_experience.jpg"
      ]
    }
  },
  {
    slug: "w-and-h",
    title: "W&H",
    category: "E-Commerce",
    sector: "Mobile Commerce",
    year: "2026",
    metric: "50+",
    metricLabel: "product layouts",
    description: "A minimalist mobile e-commerce shopping experience inspired by modern fashion retail, focusing on simplicity, visual clarity, and seamless product discovery across category navigation, wishlist, and bag management.",
    tagline: "Minimalist mobile fashion shopping, refined.",
    quote: {
      text: "The interface delivers clean visual hierarchy, balanced spacing, and intuitive navigation that make product browsing effortless.",
      author: "Emily Smith",
      role: "Lead Product Designer"
    },
    challenge: "Traditional shopping apps often clutter the interface with heavy banners and fragmented navigation, making product discovery and checkout cumbersome.",
    solution: "Designed a clean mobile shopping journey with balanced spacing, refined typography (SF Pro & Poppins), unified wishlist and shopping bag flows, and streamlined checkout.",
    outcome: "Intuitive product browsing and friction-free user onboarding across 50+ product categories.",
    capabilities: ["UI/UX Design", "Mobile App", "Design System", "Branding"],
    images: {
      hero: "/images/projects/w-and-h.jpg",
      heroAspect: "4/3",
      caseStudy: true,
      caseStudyImage: "/images/projects/vault-pay/vault_pay_full_case_study.jpg",
      caseStudyImages: [
        "/images/projects/vault-pay/case1.jpg",
        "/images/projects/vault-pay/case2.jpg",
        "/images/projects/vault-pay/case3.jpg"
      ],
      caseStudyPdf: "/documents/w-and-h-case-study.pdf",
      gallery: [
        "/images/projects/vault-pay/vault_pay_full_case_study.jpg"
      ]
    }
  },
  {
    slug: "skywills",
    title: "Skywills",
    category: "Brand Identity",
    sector: "Logistics Company",
    year: "2026",
    metric: "100%",
    metricLabel: "global route reach",
    description: "Skywills provides global trade solutions, helping businesses worldwide optimize their international trade with real-time tracking, multimodal freight, and seamless supply chain integration.",
    tagline: "Global solution for international trade.",
    quote: {
      text: "The Skywills mark expresses limitless reach. Three arcs of increasing curvature rise above a central navigation arrow, showing a company that adapts its path to every route, market and challenge: we bend to reach.",
      author: "Skywills",
      role: "Global Logistics & Trade"
    },
    challenge: "Modern international trade requires an identity system that commands presence across high-velocity logistics infrastructure — from freight container ships and transcontinental trucks to airport terminals and digital tracking dashboards.",
    solution: "A dynamic brand identity system centered on a navigation arrow and adaptive arcs, paired with high-legibility typographic hierarchies, precision route grids, and high-impact physical and digital mockups.",
    outcome: "Bending distance, delivering everywhere. Unified presence across sea, air, and land logistics networks worldwide.",
    capabilities: ["Brand Identity", "Visual Systems", "Art Direction", "Logistics Design"],
    images: {
      hero: "/images/projects/skywills/extracted_0.jpeg",
      secondary: "/images/projects/skywills/extracted_2.jpeg",
      heroAspect: "16/9",
      caseStudy: true,
      caseStudyPdf: "/documents/skywills-case-study.pdf",
      caseStudyImage: "/images/projects/skywills/skywills_case_study_p1.png",
      caseStudyImages: [
        "/images/projects/skywills/skywills_case_study_p1.png"
      ],
      gallery: [
        "/images/projects/skywills/extracted_0.jpeg",
        "/images/projects/skywills/extracted_2.jpeg"
      ]
    }
  }
];

export const heroReelImages = [
  "/images/projects/dheerah.jpg",
  "/images/projects/w-and-h.jpg",
  "/images/projects/skywills/extracted_0.jpeg",
  "/images/projects/skywills/extracted_2.jpeg",
  "https://framerusercontent.com/images/6ka5ZUVdLrOwC1bihB169y0Jjig.jpg",
  "https://framerusercontent.com/images/nBocJpXmbqNC0oBwue39Q1ltNeM.jpg"
];
