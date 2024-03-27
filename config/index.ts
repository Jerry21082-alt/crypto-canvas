import { nft1, nft2, nft3, apeCoin, cowCoin, yooshiCoin } from "@/public/images";

export const CATEGORIES = [
  {
    label: "NFTs",
    value: "nft" as const,
    featured: [
      {
        name: "Editor picks",
        href: "#",
        image: nft1,
      },
      {
        name: "New arrivals",
        href: "#",
        image: nft2,
      },
      {
        name: "Best sellers",
        href: "#",
        image: nft3,
      },
    ],
  },
  
  {
    label: "CRYPTO",
    value: "crypto" as const,
    featured: [
      {
        name: "Favorite",
        href: "#",
        image: apeCoin,
      },
      {
        name: "Trending",
        href: "#",
        image: cowCoin,
      },
      {
        name: "Top rated",
        href: "#",
        image: yooshiCoin,
      },
    ],
  },
];
