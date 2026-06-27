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

  /**
   * Top-of-page announcement bar.
   * Flip `enabled` to false to hide it everywhere — no other change needed.
   * Bump `id` whenever the announcement changes so visitors who dismissed the
   * previous one (this session) see the new one. The CTA opens the Cal booking
   * modal — the booking link itself lives in `lib/cal.ts`.
   */
  announcement: {
    enabled: true,
    id: "eth-belgrade-2026",
    conf: "ETH Belgrade 2026",
    city: "Belgrade",
    dates: "Aug 26–27",
    ctaLabel: "Let's talk",
  },
} as const;

/**
 * Storage contract for the announcement bar's session dismissal — shared between
 * the pre-paint no-flash script (app/layout.tsx) and the bar component so the key
 * format can't drift between them.
 */
export const ANN_DISMISSED_VALUE = "1";
export const annDismissedKey = (id: string) => `ann-dismissed:${id}`;
