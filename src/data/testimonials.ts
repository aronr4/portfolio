export type StoryCardType = "testimonial" | "stat" | "image";

export interface TestimonialCard {
  type: "testimonial";
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  logoPlaceholder?: string;
}

export interface StatCard {
  type: "stat";
  id: string;
  label: string;
  targetNumber: number;
  suffix?: string;
  description: string;
  badgeImg?: string;
}

export interface ImageCard {
  type: "image";
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export type StoryCard = TestimonialCard | StatCard | ImageCard;

export const storyCardsRow1: StoryCard[] = [
  {
    type: "testimonial",
    id: "mira-chen",
    quote: "They turned a messy product story into something clear, confident, and easy to move through. The whole experience finally felt premium.",
    author: "Mira Chen",
    role: "Founder",
    company: "Northline Studio",
    logoPlaceholder: "NL"
  },
  {
    type: "stat",
    id: "awards-stat",
    label: "Awwwards",
    targetNumber: 50,
    suffix: "+",
    description: "Recognized for standout work across brand, product, and digital design.",
    badgeImg: "https://framerusercontent.com/images/ctpdlzPiUpSrDSdYvpTGNRvY.png"
  },
  {
    type: "image",
    id: "studio-reel-1",
    src: "https://framerusercontent.com/images/4I2kWx8ci0eAgYehRx4XnlSv8.jpg",
    alt: "Aurora branded gear",
    caption: "Aurora Visual System"
  },
  {
    type: "testimonial",
    id: "roger-gomez",
    quote: "The work gave our brand a stronger rhythm. Every page felt intentional, from the first scroll to the final case study.",
    author: "Roger Gomez",
    role: "Creative Director",
    company: "Field Office",
    logoPlaceholder: "FO"
  }
];

export const storyCardsRow2: StoryCard[] = [
  {
    type: "stat",
    id: "partnerships-stat",
    label: "Repeat work",
    targetNumber: 82,
    suffix: "%",
    description: "Clients come back for the clarity, collaboration, and consistency."
  },
  {
    type: "testimonial",
    id: "rowan-ellis",
    quote: "The site made our work feel sharper without overexplaining it. Clients understood what we do faster, and the brand felt more mature overnight.",
    author: "Rowan Ellis",
    role: "Strategy Lead",
    company: "Common Goods",
    logoPlaceholder: "CG"
  },
  {
    type: "image",
    id: "studio-reel-2",
    src: "https://framerusercontent.com/images/XUW7CZm4ZNStcTkCkDyV9GTkOBk.png",
    alt: "Aurora print ad",
    caption: "Print & Environmental"
  },
  {
    type: "testimonial",
    id: "lena-ortiz",
    quote: "What stood out most was the restraint. Nothing felt overdesigned, but every detail had a reason to be there.",
    author: "Lena Ortiz",
    role: "Partner",
    company: "Framehouse",
    logoPlaceholder: "FH"
  }
];
