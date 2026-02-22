import { SiteConfig } from "../types";

export const siteConfig: SiteConfig = {
  name: "NoirKult",
  logo: {
    text: "NOIRKULT",
    subtext: "DARK CULTURE",
  },
  theme: {
    primary: "#000000",
    secondary: "#ffffff",
    accent: "#f27d26",
    background: "#ffffff",
    footerBackground: "#141414",
  },
  navigation: [
    { label: "NEW DROPS", href: "/shop?category=new" },
    { label: "BESTSELLERS", href: "/shop?category=bestsellers" },
    { label: "SHIRTS", href: "/shop?category=shirts" },
    { label: "JEANS", href: "/shop?category=jeans" },
    { label: "TROUSERS", href: "/shop?category=trousers" },
    { label: "ADMIN", href: "/admin", isAdmin: true },
  ],
  homePage: {
    hero: {
      title: "MUST HAVE DENIMS",
      subtitle: "RELAXED & STRAIGHT",
      image: "https://picsum.photos/seed/denim/1920/1080",
      cta: "SHOP NOW",
    },
    sections: [
      { title: "FEATURED CATEGORIES", type: "categories", dataKey: "featuredCategories" },
      { title: "NEW AND POPULAR", type: "products", dataKey: "popularProducts" },
      { title: "LAST CHANCE!", type: "banner", dataKey: "lastChanceBanner" },
    ],
  },
  footer: {
    sections: [
      {
        title: "COMPANY",
        links: [
          { label: "About Us", href: "/about" },
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms & Conditions", href: "/terms" },
          { label: "Contact Us", href: "/contact" },
        ],
      },
      {
        title: "HELP",
        links: [
          { label: "Track Order", href: "/track" },
          { label: "Returns & Exchanges", href: "/returns" },
          { label: "Shipping Policy", href: "/shipping" },
          { label: "FAQs", href: "/faq" },
        ],
      },
    ],
    bottomText: "© 2026 NOIRKULT. ALL RIGHTS RESERVED.",
  },
};
