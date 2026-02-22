import { Product } from "../types";

export const mockProducts: Product[] = Array.from({ length: 100 }).map((_, i) => {
  const category = ["shirts", "jeans", "trousers", "t-shirts", "jackets", "shoes"][i % 6];
  let sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  
  if (category === "jeans" || category === "trousers") {
    sizes = ["28", "30", "32", "34", "36", "38", "40"];
  } else if (category === "shoes") {
    sizes = ["6UK", "7UK", "8UK", "9UK", "10UK", "11UK", "12UK"];
  }

  return {
    id: `p-${i}`,
    name: [
      "Baggy Washed Jeans",
      "Regular Fit Waffle T-Shirt",
      "Washed Straight Fit Jeans",
      "Korean Stretch Trousers",
      "Linen Blend Ombre Shirt",
      "Oversized Graphic Tee",
      "Slim Fit Chinos",
      "Denim Jacket Classic",
      "Cargo Joggers",
      "Polo Neck Sweater",
    ][i % 10] + ` ${Math.floor(i / 10) + 1}`,
    price: 899 + (i % 5) * 200,
    originalPrice: 1999,
    image: `https://picsum.photos/seed/product-${i}/800/1000`,
    images: [
      `https://picsum.photos/seed/product-${i}-1/800/1000`,
      `https://picsum.photos/seed/product-${i}-2/800/1000`,
      `https://picsum.photos/seed/product-${i}-3/800/1000`,
      `https://picsum.photos/seed/product-${i}-4/800/1000`,
    ],
    category,
    tag: i % 7 === 0 ? "NEW" : i % 10 === 0 ? "SALE" : undefined,
    colors: ["#000000", "#ffffff", "#3b82f6", "#ef4444", "#10b981"].slice(0, 3 + (i % 3)),
    sizes,
  };
});

export const featuredCategories = [
  { label: "SHIRTS", image: "https://picsum.photos/seed/shirts/600/800", href: "/shop?category=shirts" },
  { label: "TROUSERS", image: "https://picsum.photos/seed/trousers/600/800", href: "/shop?category=trousers" },
  { label: "JEANS", image: "https://picsum.photos/seed/jeans/600/800", href: "/shop?category=jeans" },
  { label: "POLOS", image: "https://picsum.photos/seed/polos/600/800", href: "/shop?category=polos" },
  { label: "CARGOS", image: "https://picsum.photos/seed/cargos/600/800", href: "/shop?category=cargos" },
  { label: "OVERSHIRTS", image: "https://picsum.photos/seed/overshirts/600/800", href: "/shop?category=overshirts" },
];

export const lastChanceBanner = {
  title: "Last chance!",
  subtitle: "Last few sizes left",
  image: "https://picsum.photos/seed/lastchance/1920/600",
  cta: "SHOP NOW",
};
