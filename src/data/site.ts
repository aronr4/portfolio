export interface NavLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  brand: string;
  name: string;
  title: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  timezone: string;
  navLinks: NavLink[];
  exploreLinks: NavLink[];
  connectLinks: NavLink[];
}

export const siteConfig: SiteConfig = {
  brand: "Aron.",
  name: "Aron",
  title: "Aron — Creative Designer",
  description: "Creative designer crafting digital products, brands, and motion-driven experiences.",
  email: "hello@aron.com",
  phone: "+1 (800) 987-1234",
  location: "New York, NY",
  timezone: "America/New_York",
  navLinks: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" }
  ],
  exploreLinks: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Privacy Policy", href: "/privacy-policy" }
  ],
  connectLinks: [
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Dribbble", href: "https://dribbble.com" }
  ]
};
