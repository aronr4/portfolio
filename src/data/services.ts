export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
}

export const services: ServiceItem[] = [
  {
    id: "branding",
    number: "01",
    title: "Branding",
    tagline: "Distilling core ethos into recognizable identity systems.",
    description: "We craft positioning, typographic hierarchies, and visual guidelines that stand apart from category conventions and scale seamlessly across touchpoints.",
    capabilities: [
      "Brand Strategy",
      "Visual Identity",
      "Logo Systems",
      "Art Direction"
    ]
  },
  {
    id: "ux-design",
    number: "02",
    title: "UX Design",
    tagline: "Translating complex functional systems into intuitive products.",
    description: "From deep architectural wireframing to tactile micro-interactions, we architect responsive interfaces that feel weightless, immediate, and delightfully coherent.",
    capabilities: [
      "Interactive Prototyping",
      "Accessibility Standards",
      "Interface Systems",
      "Design Systems"
    ]
  },
  {
    id: "digital-builds",
    number: "03",
    title: "Digital Builds",
    tagline: "High-performance engineering paired with flawless motion.",
    description: "We develop ultra-fluid web applications, responsive headless platforms, and creative web experiences built with modern architecture and 60fps animations.",
    capabilities: [
      "Web Application Dev",
      "Mobile Architecture",
      "Headless CMS Setup",
      "Performance & Security"
    ]
  },
  {
    id: "video-production",
    number: "04",
    title: "Video Production",
    tagline: "Cinematic narratives that introduce products with visceral momentum.",
    description: "We write, shoot, direct, and grade launch films, 3D product reels, and brand trailers that anchor major milestones with cultural weight.",
    capabilities: [
      "Launch Films",
      "Campaign Trailers",
      "Motion Direction",
      "Color & Sound Grading"
    ]
  },
  {
    id: "social-media",
    number: "05",
    title: "Social Media",
    tagline: "Extending brand character through continuous visual signals.",
    description: "We build repeatable asset toolkits, kinetic motion snippets, and dynamic social templates that keep your brand prominent and unmistakably distinct.",
    capabilities: [
      "Content Direction",
      "Social Design Systems",
      "Campaign Toolkits",
      "Kinetic Graphics"
    ]
  }
];
