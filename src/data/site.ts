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
  whatsapp: string;
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
  email: "sathisharonr@gmail.com",
  phone: "+91 9025232903",
  whatsapp: "919025232903",
  location: "India",
  timezone: "Asia/Kolkata",
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
    { label: "Behance", href: "https://www.behance.net/sathisharon" }
  ]
};
