import { Type } from "@google/genai";

export enum UserRole {
  GUEST = "GUEST",
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  tag?: string;
  colors?: string[];
  sizes?: string[];
  description?: string;
}

export interface SiteConfig {
  name: string;
  logo: {
    text: string;
    subtext?: string;
  };
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    footerBackground: string;
  };
  navigation: {
    label: string;
    href: string;
    isPrivate?: boolean;
    isAdmin?: boolean;
  }[];
  homePage: {
    hero: {
      title: string;
      subtitle: string;
      image: string;
      cta: string;
    };
    sections: {
      title: string;
      type: "categories" | "products" | "banner";
      dataKey: string;
    }[];
  };
  footer: {
    sections: {
      title: string;
      links: { label: string; href: string }[];
    }[];
    bottomText: string;
  };
}
