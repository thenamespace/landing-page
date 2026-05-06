export const SITE = {
  name: "Namespace",
  title: "Namespace: ENS Subname Service Provider for Web3 Identity",
  description:
    "Namespace is the leading ENS subname service for wallets, L2 chains, and DeFi apps. Issue subnames at scale — offchain or onchain. Backed by ENS DAO.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://namespace.ninja",
  ogImage:
    "https://namespace.ninja/assets/images/og-image.png",
  twitter: "@namespace_eth",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "G-1K699QQ114",
  locale: "en_US",
} as const;
