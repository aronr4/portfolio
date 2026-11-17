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
    slug: "pulse",
    title: "Pulse",
    category: "Digital Health",
    sector: "Digital Health",
    year: "2026",
    metric: "68%",
    metricLabel: "weekly engagement",
    description: "Pulse is a connected health platform that brings activity, recovery, heart data, and everyday wellness signals into one clear ecosystem. Designed across wearable and larger-screen experiences, the product turns constant streams of personal data into information people can understand quickly.",
    tagline: "Everyday health, in one rhythm.",
    quote: {
      text: "Pulse gave us a way to make a lot of health data feel focused, useful, and genuinely easy to live with.",
      author: "Maya Chen",
      role: "Pulse Product Director"
    },
    challenge: "Health platforms collect an enormous amount of information, but more data rarely means more clarity. Pulse needed to connect activity, recovery, heart rate, and environmental signals without making the experience feel clinical or overwhelming.",
    solution: "The experience was built around layers of attention, putting essential signals first and deeper context one step away. Circular progress cues, restrained data visualizations, and high contrast created a recognizable visual language across devices.",
    outcome: "68% weekly engagement and exceptional habit retention across watch and phone devices.",
    capabilities: ["Branding", "Digital Builds", "Social Media"],
    images: {
      hero: "/images/projects/pulse.png",
      secondary: "/images/projects/pulse.png",
      gallery: [
        "/images/projects/pulse.png"
      ]
    }
  },
  {
    slug: "nova",
    title: "Nova",
    category: "Creative SaaS",
    sector: "Creative SaaS",
    year: "2025",
    metric: "75%",
    metricLabel: "fewer revisions",
    description: "Nova is a collaborative design platform built for teams shaping brands, campaigns, and visual systems at speed. The product brings flexible composition tools, shared assets, and brand controls into one focused workspace, giving designers room to experiment without losing consistency.",
    tagline: "Creative systems, made fluid.",
    quote: {
      text: "Nova gave our team enough structure to stay aligned without sanding away the experimentation that makes the work interesting.",
      author: "Lena Ortiz",
      role: "Nova Creative Director"
    },
    challenge: "Creative teams were moving between design files, asset libraries, feedback threads, and disconnected brand guidelines just to keep everyday work moving.",
    solution: "The experience centers on a flexible canvas supported by persistent layers, shared swatches, reusable components, and lightweight collaboration tools.",
    outcome: "75% fewer design revisions across multi-disciplinary creative departments.",
    capabilities: ["Social Media", "Branding", "UX Design", "Digital Builds"],
    images: {
      hero: "https://framerusercontent.com/images/8G3dIuDlgJdCRp9KGus3P7RvlZI.jpg",
      secondary: "https://framerusercontent.com/images/e4guFY2tLOjPg4nI07mgeBc.png",
      gallery: [
        "https://framerusercontent.com/images/8G3dIuDlgJdCRp9KGus3P7RvlZI.jpg",
        "https://framerusercontent.com/images/e4guFY2tLOjPg4nI07mgeBc.png"
      ]
    }
  },
  {
    slug: "dheerah",
    title: "Dheerah",
    category: "E-Commerce",
    sector: "Designer Boutique",
    year: "2026",
    metric: "84%",
    metricLabel: "boutique lift",
    description: "Dheerah is an artisanal designer boutique and modern digital storefront celebrating handcrafted cotton gowns and contemporary silhouettes. Crafted to deliver an editorial shopping experience that seamlessly connects curated collections with sophisticated craftsmanship.",
    tagline: "Embrace the perfect blend of style and sophistication.",
    quote: {
      text: "Dheerah shaped our collections into an editorial digital storefront that elevated customer connection and shopping elegance.",
      author: "Elena Park",
      role: "Dheerah Creative Director"
    },
    challenge: "Creating a boutique digital experience that feels luxurious, fast, and tactile without losing the handcrafted warmth of artisan garments.",
    solution: "A minimalist layout built with editorial typography, responsive product lookbooks, and high-conversion purchase journeys.",
    outcome: "84% lift in boutique orders and higher engagement across seasonal lookbooks.",
    capabilities: ["E-Commerce", "Digital Builds", "UX Design", "Branding"],
    images: {
      hero: "/images/projects/dheerah.jpg",
      caseStudy: true,
      caseStudyImage: "/images/projects/dheerah/dheerah_case_study.jpg",
      caseStudyPdf: "/documents/dheerah-case-study.pdf",
      gallery: [
        "/images/projects/dheerah/dheerah_case_study.jpg"
      ]
    }
  },
  {
    slug: "flowfit",
    title: "FlowFit",
    category: "Fitness",
    sector: "Fitness",
    year: "2026",
    metric: "3x",
    metricLabel: "signup lift",
    description: "FlowFit is an on-demand fitness platform built around choice, consistency, and everyday movement. Members can discover strength, mobility, cardio, and recovery classes.",
    tagline: "Fitness that moves with you.",
    quote: {
      text: "FlowFit finally made our class library feel like an advantage instead of something members had to work through.",
      author: "Jordan Lee",
      role: "FlowFit Head of Product"
    },
    challenge: "A deep class library gave members plenty of options, but finding the right workout could quickly become its own exercise.",
    solution: "Organized around time, training goal, and intensity with direct class information and personalized recommendations.",
    outcome: "3x signup lift and 50% increase in workout completion rates.",
    capabilities: ["Video Production", "Digital Builds", "UX Design"],
    images: {
      hero: "https://framerusercontent.com/images/4I2kWx8ci0eAgYehRx4XnlSv8.jpg",
      gallery: [
        "https://framerusercontent.com/images/4I2kWx8ci0eAgYehRx4XnlSv8.jpg"
      ]
    }
  },
  {
    slug: "onward",
    title: "Onward",
    category: "Travel",
    sector: "Travel",
    year: "2026",
    metric: "38%",
    metricLabel: "more inquiries",
    description: "Onward is a luxury travel brand built for people who would rather disappear somewhere remarkable than follow a familiar itinerary.",
    tagline: "Luxury travel, beyond the expected.",
    quote: {
      text: "The new identity gave us permission to feel luxurious without becoming quiet, predictable, or interchangeable with everyone else.",
      author: "Sofia Bennett",
      role: "Onward Brand Director"
    },
    challenge: "The category was full of polished photography, muted palettes, and interchangeable promises of exclusivity.",
    solution: "Dramatic destinations, oversized typography, saturated contrast, and language that feels more like an invitation.",
    outcome: "38% surge in qualified private luxury expedition inquiries.",
    capabilities: ["Video Production", "Social Media", "Branding"],
    images: {
      hero: "https://framerusercontent.com/images/diVgLXSOpJwZpKD8J2RgDwnerw.png",
      gallery: [
        "https://framerusercontent.com/images/diVgLXSOpJwZpKD8J2RgDwnerw.png"
      ]
    }
  }
];

export const heroReelImages = [
  "https://framerusercontent.com/images/4b5amoeQ9i5PTDQCngUS605p10.jpg",
  "https://framerusercontent.com/images/YVA66MSwMYiDVnxX7kJTFIOMVCk.jpg",
  "https://framerusercontent.com/images/KhGBU3pxfTDeQxwzyGKckveb5A.jpg",
  "/images/projects/pulse.png",
  "https://framerusercontent.com/images/6ka5ZUVdLrOwC1bihB169y0Jjig.jpg",
  "https://framerusercontent.com/images/nBocJpXmbqNC0oBwue39Q1ltNeM.jpg"
];
