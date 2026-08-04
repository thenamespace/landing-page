/**
 * Solution pages content config.
 *
 * Every page is written with the LeBak five-questions framework: for each
 * vertical we answer, in the customer's own words -
 *   1. What do you NEED?
 *   2. What do you WANT? (what would you be happy with)
 *   3. What is your biggest FEAR?
 *   4. What do you deeply DESIRE?
 *   5. What have you TRIED, and what did you HATE about it?
 *
 * Those answers live in `voice` for each vertical. The page sections mirror
 * them back: hero = want, pains = fears + tried-and-hated, desire = deep
 * desire, solution/steps = need. When real customer-survey answers are
 * collected (ask ~30 customers, per the framework), replace `voice` and
 * tighten the copy around their exact wording.
 */

export interface SolutionCta {
  label: string;
  href: string;
  external?: boolean;
}

export interface SolutionTestimonial {
  quote: string;
  name: string;
  title: string;
  avatar: string;
}

export interface SolutionFaqItem {
  question: string;
  answer: string;
}

export interface Solution {
  slug: string;
  navLabel: string;
  /** Example subname shown in the hero name-card visual. */
  heroName: string;
  /** Hero visual: the default name card, the phone claim-flow mockup, or the send-flow comparison. */
  heroVisual?: "namecard" | "phone" | "sendflow" | "tree";
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** LeBak five answers - the copy brief this page is built from. */
  voice: {
    needs: string;
    wants: string;
    fears: string;
    desires: string;
    triedAndHated: string;
  };
  hero: {
    tag: string;
    headline: string;
    subheadline: string;
    primaryCta: SolutionCta;
    secondaryCta: SolutionCta;
  };
  /** GEO block: question-phrased H2 + definition-style answer for AI engines. */
  definition?: {
    question: string;
    answer: string;
  };
  /** Optional key-point cards rendered inside the definition block. */
  definitionPoints?: { title: string; description: string }[];
  /** Optional before/after comparison rendered right below the hero. */
  compare?: {
    before: { label: string; value: string; note: string };
    after: { label: string; value: string; note: string };
  };
  /** Optional benefits section (dark), rendered after the pains section. */
  benefits?: {
    /** Eyebrow label (defaults to "Why wallets do this"). */
    label?: string;
    heading: string;
    /** "grid" (default) or "bento": asymmetric hero/tall/compact/ops layout. */
    style?: "grid" | "bento";
    items: {
      title: string;
      description: string;
      /** Optional decorative mini-scene rendered above the title. */
      visual?:
        | "onboarding"
        | "security"
        | "brand"
        | "revenue"
        | "everywhere"
        | "network"
        | "ops";
    }[];
  };
  /** Optional risk-and-mitigation section. Light zone by default; theme "dark" renders in the dark zone with per-card tags. */
  risks?: {
    label: string;
    heading: string;
    theme?: "light" | "dark";
    items: { tag?: string; title: string; description: string; fix?: string }[];
  };
  /** Optional two-card contrast section (dark zone), mono values with verdicts. */
  versus?: {
    label: string;
    heading: string;
    cards: { tag: string; value: string; description: string; verdict: string }[];
  };
  /** Optional split section: copy + CTA on the left, 2x2 stat grid on the right (dark zone). */
  splitStats?: {
    label: string;
    heading: string;
    paragraph: string;
    cta?: SolutionCta;
    stats: { value: string; label: string }[];
  };
  /** Optional terminal/deploy-log section (dark zone). */
  terminal?: {
    label: string;
    heading: string;
    paragraph: string;
    cta?: SolutionCta;
    windowLabel: string;
    lines: { kind: "cmd" | "ok" | "live"; text: string; accent?: string; note?: string }[];
  };
  /** Per-page stat band rendered under the testimonials. Falls back to the shared defaults. */
  stats?: { value: string; label: string }[];
  /** Optional "in your product" section: tagged rows left, visual right (dark zone). */
  productLook?: {
    label: string;
    heading: string;
    paragraph: string;
    items: { tag: string; body: string; visual?: "claim" | "send" | "profile" | "everywhere" | "upgrade" }[];
    /** Optional real screenshot; falls back to the built-in send-flow mock. */
    image?: string;
    imageAlt?: string;
    before: string;
    after: string;
  };
  /** Optional how-to section: joined step strip + dark comparison table + recommendation (dark zone). */
  howTo?: {
    label: string;
    heading: string;
    intro?: string;
    /** Render after the outcomes section instead of the default slot. */
    afterOutcomes?: boolean;
    /** "dark" (default) or "light" zone. */
    theme?: "dark" | "light";
    tableCaption?: string;
    steps: { title: string; body: string }[];
    table: { columns: string[]; rows: string[][] };
    /** Index of the row to highlight with a RECOMMENDED badge. */
    recommendedRow?: number;
    recommendation?: string;
  };
  /** Optional deliverables grid (dark zone, after the tree): compact 4-col cards. */
  deliver?: {
    label?: string;
    heading: string;
    lead?: string;
    items: { title: string; description: string }[];
  };
  /** Optional architecture explainer (light zone, after the tree): step pillars + light comparison table. */
  architecture?: {
    label: string;
    heading: string;
    steps: { title: string; body: string }[];
    tableCaption?: string;
    table?: { columns: string[]; rows: string[][] };
    /** Column index to highlight (accent tint). */
    highlightColumn?: number;
    recommendation?: string;
    note?: string;
    /** Optional policy panel rendered under the steps. */
    chipsLabel?: string;
    chipsParagraph?: string;
    chips?: string[];
  };
  /** Optional big case-story panel: narrative left, visual right, stats + trust footer (dark zone). */
  caseStory?: {
    tag: string;
    heading: string;
    points: { label: string; body: string }[];
    quote: string;
    attribution: string;
    quoteAvatar?: string;
    ctaLabel: string;
    ctaHref: string;
    cta2Label?: string;
    cta2Href?: string;
    /** Name shown in the fallback phone visual. */
    visualName?: string;
    image?: string;
    imageAlt?: string;
    stats?: { value: string; label: string }[];
    trustedBy?: string[];
    badge?: string;
  };
  /** Optional developer callout: heading + resource links + code window (dark zone). */
  dev?: {
    label: string;
    heading: string;
    paragraph: string;
    timeline?: { item: string; duration: string }[];
    links: { label: string; href: string }[];
    windowLabel: string;
    code: string;
  };
  /** Optional compact outcome cards, 4-up (dark zone). */
  outcomes?: {
    label?: string;
    heading: string;
    /** Grid columns (default 4). */
    columns?: 2 | 3 | 4;
    /** "cards" (default) or "list": enclosed spec-sheet rows with mono index. */
    style?: "cards" | "list";
    items: {
      title: string;
      description: string;
      visual?: "root" | "claimsite" | "registry" | "profile" | "verify" | "contracts";
    }[];
  };
  /** Optional big-text explainer panel (dark zone). **text** renders accented. Fact columns or chip strip below. */
  howItWorks?: {
    label: string;
    lead: string;
    facts?: { title: string; description: string }[];
    chips?: string[];
  };
  /** Optional "why Namespace" panel: reason blocks left, comparison table right (dark panel). */
  whyUs?: {
    label: string;
    heading: string;
    lead?: string;
    reasons?: { title: string; body: string }[];
    tableCaption: string;
    table: { columns: string[]; rows: string[][] };
    /** Column index to highlight (accent tint). */
    highlightColumn?: number;
    /** Optional stats + trust footer strip under the grid. */
    stats?: { value: string; label: string }[];
    trustedBy?: string[];
    badge?: string;
  };
  /** Optional business-case + pricing two-panel block (light zone). */
  bizPricing?: {
    caseHeading: string;
    caseParagraph: string;
    caseBullets: string[];
    pricingHeading: string;
    pricingParagraph: string;
    facts: { value: string; label: string }[];
  };
  /** Optional pricing + CTA two-panel block (light zone). */
  pricingCta?: {
    pricingHeading: string;
    pricingParagraph: string;
    facts: { value: string; label: string }[];
    ctaHeading: string;
    ctaItems: { title: string; description: string; href: string; external?: boolean; primary?: boolean }[];
  };
  pains: {
    heading: string;
    /** "grid" (default) or "spotlight": scroll-driven one-at-a-time focus. */
    style?: "grid" | "spotlight";
    items: { question: string; detail: string }[];
  };
  desire?: {
    heading: string;
    paragraph: string;
    bullets: string[];
  };
  solution?: {
    heading: string;
    paragraph: string;
    features: { title: string; description: string }[];
  };
  steps?: {
    heading: string;
    items: { title: string; description: string }[];
    code?: string;
    codeLabel?: string;
    /** "timeline" (default) or "cards" for a numbered card grid. */
    style?: "timeline" | "cards";
  };
  /** Optional feature-comparison table (dark zone). */
  featureTable?: {
    label: string;
    heading: string;
    intro: string;
    columns: [string, string];
    rows: { feature: string; a: boolean; b: boolean; highlight?: boolean }[];
  };
  /** Optional multi-tenant namespace chips (dark zone). */
  tenants?: {
    label: string;
    heading: string;
    paragraph: string;
    names: { label: string; suffix: string }[];
  };
  /** Optional pricing panel (dark panel in the light zone). */
  pricing?: {
    label: string;
    heading: string;
    paragraph: string;
    figure: string;
    figureNote: string;
    rows: { item: string; value: string }[];
  };
  /** Optional horizontal week-by-week timeline, rendered in place of steps. */
  timeline?: {
    heading: string;
    phases: { period: string; title: string; description: string }[];
  };
  /** Optional spotlight case-study panel (dark), rendered after the definition. */
  caseStudy?: {
    tag: string;
    quote: string;
    name: string;
    title: string;
    avatar: string;
    facts: { title: string; description: string }[];
  };
  /** Optional namespace-tree diagram with pillar cards (light zone). */
  tree?: {
    heading: string;
    paragraph: string;
    root: string;
    leaves: { label: string; suffix: string; tag?: string }[];
    pillars: { tag: string; title: string; description: string }[];
  };
  /** "grid" (default): two cards + stat band. "wall": the full homepage Wall of Love marquee. */
  proofStyle?: "grid" | "wall";
  testimonials: SolutionTestimonial[];
  faqs: SolutionFaqItem[];
  /** Optional: render the homepage-style illustrated three-card CTA instead of the panel. */
  ctaCards?: {
    heading: string;
    subheading?: string;
    cards: {
      title: string;
      description: string;
      button: { label: string; href: string };
      links?: { label: string; href: string }[];
      image: string;
      imageAlt: string;
    }[];
  };
  finalCta: {
    heading: string;
    paragraph: string;
    /** Optional pill text above the heading; defaults to the hero name. */
    kicker?: string;
    primary: SolutionCta;
    secondary: SolutionCta;
  };
}

const BOOK_CALL = "https://cal.com/thecap.eth/discovery";
const DOCS = "https://docs.namespace.ninja/";
const APP = "https://app.namespace.ninja/";

/* Shared, real testimonials (from the homepage Wall of Love). */
const T = {
  griff: {
    quote:
      "Namespace is providing a magical service. They made issuing thousands of subdomains for ETHDenver attendees simple and nearly effortless.",
    name: "Griff.eth",
    title: "Founder of Unicorn & Giveth",
    avatar: "/assets/images/testimonial-griff.avif",
  },
  jesse: {
    quote:
      "Y'all are killing it and I think every product should have their own subname. And y'all are now my go-to rec. Love y'all 💛",
    name: "Jesse Pollak",
    title: "Founder of Base",
    avatar: "/assets/images/testimonial-jesse.avif",
  },
  kate: {
    quote:
      "Our experience working with Namespace has been exceptional. Their team combines strong technical expertise with clear communication and a true spirit of partnership.",
    name: "Kate",
    title: "Head of Product & GTM @ CELO",
    avatar: "/assets/images/katecelo.jpg",
  },
  joan: {
    quote:
      "The Namespace team have been very proactive and supportive of our timelines to build an integrations with our offering. Definitely recommend working with them!",
    name: "Joan",
    title: "Founder of OpenFort",
    avatar: "/assets/images/testimonial-joan.jpg",
  },
  ted: {
    quote:
      "Namespace has been a core partner for PinMe. Their APIs are extremely easy to use, their subdomain infrastructure is stable and built for the long term.",
    name: "Ted",
    title: "Co-founder of PinMe",
    avatar: "/assets/images/testimonial-ted.jpg",
  },
  ben: {
    quote:
      "Namespace has quickly become the go-to platform for managing ENS subnames. What was once confusing and error-prone is now a streamlined, intuitive experience.",
    name: "Ben",
    title: "Co-founder of ETH.LIMO",
    avatar: "/assets/images/testimonial-ben.avif",
  },
  simon: {
    quote:
      "From simple to complex Subname needs, Namespace has the tools and expertise to make it happen. Fully recommend.",
    name: "Simon",
    title: "Lead DevRel @ ENS Labs",
    avatar: "/assets/images/testimonial-simon.jpg",
  },
  patricio: {
    quote:
      "We have found in Namespace an efficient partner that quickly understood our needs and provided very solid solutions",
    name: "Patricio",
    title: "Founder of POAP",
    avatar: "/assets/images/testimonial-bg-3.avif",
  },
  brantly: {
    quote:
      "ENS is the future, and Namespace offers critical tools for making that happen",
    name: "brantly.eth",
    title: "Founder of EFP",
    avatar: "/assets/images/testimonial-brantly.avif",
  },
  thomas: {
    quote:
      "The Namespace team is incredibly friendly and a pleasure to work with. Their passion and dedication to the ENS ecosystem are evident in everything they do.",
    name: "Thomas Clowes",
    title: "Co-founder of Unruggable",
    avatar: "/assets/images/testimonial-thomas.avif",
  },
} as const;

const SDK_SNIPPET = `import { createOffchainClient, ChainName } from '@thenamespace/offchain-manager';

const client = createOffchainClient({
 mode: 'mainnet',
 defaultApiKey: process.env.NAMESPACE_API_KEY,
});

await client.createSubname({
 label: 'alice',
 parentName: 'yourapp.eth',
 owner: '0x4f3a...c8d2',
 addresses: [{ chain: ChainName.Ethereum, value: '0x4f3a...c8d2' }],
});`;

/* Shared objection-handlers, reused where the objection is identical. */
const FAQ_LOCK_IN: SolutionFaqItem = {
  question: "What happens if Namespace disappears?",
  answer:
    "Your names are not trapped. ENS records are portable, resolvable, and recoverable through standard ENS mechanisms. Onchain subnames are user-owned NFTs; offchain subnames can be migrated. Namespace is infrastructure - not a custodial lock-in.",
};

const FAQ_BUILD_VS_BUY: SolutionFaqItem = {
  question: "Why not build ENS naming infrastructure in-house?",
  answer:
    "Many teams try and underestimate the complexity. Production naming requires resolvers, CCIP-Read gateways, metadata services, indexing, ENSIP compliance, security monitoring, and ongoing protocol updates. Namespace abstracts all of that, so you ship in days instead of quarters - without hiring a permanent naming team.",
};

const FAQ_TIMELINE: SolutionFaqItem = {
  question: "How long does an integration take?",
  answer:
    "Depending on scope, anywhere from a few days to a few weeks. Namespace works with your team from initial scoping through launch and post-launch support - including SDK integration, resolver setup, and custom configuration.",
};

export const SOLUTIONS: Solution[] = [
  /* ────────────────────────── 1. WALLETS ────────────────────────── */
  {
    slug: "wallets",
    navLabel: "Wallets",
    heroName: "alice.yourwallet.eth",
    metaTitle: "ENS Wallet Names - Give Every User a Username",
    metaDescription:
      "Issue ENS usernames like alice.yourwallet.eth to every user at onboarding. Gasless, instant, resolvable in 1,000+ apps. No contracts to deploy, no naming team to hire.",
    keywords: [
      "ENS wallet names",
      "wallet usernames",
      "ENS subnames for wallets",
      "web3 wallet UX",
      "human-readable wallet address",
    ],
    voice: {
      needs:
        "Human-readable usernames for our users; ENS resolution that works everywhere.",
      wants:
        "Better onboarding UX and a brand moment at signup - without gas costs or new infra to run.",
      fears:
        "A user mis-pastes an address, loses funds, and blames the wallet. Or we sink two sprints into naming infra that isn't our core product.",
      desires:
        "Every user leaves onboarding with a name, and that name carries our brand into every app they touch.",
      triedAndHated:
        "Raw 0x addresses and copy-paste UX; an in-house username database that resolves nowhere outside our own app; telling users to go buy their own ENS name.",
    },
    heroVisual: "phone",
    hero: {
      tag: "ENS infrastructure for wallets",
      headline: "ENS Usernames for Crypto Wallets",
      subheadline:
        "Give every user a readable name at signup instead of a 42-character address. No gas, no contracts to deploy, no infrastructure to run. Live in under a week, resolvable across 1,000+ apps.",
      primaryCta: {
        label: "Book a Discovery Call",
        href: BOOK_CALL,
        external: true,
      },
      secondaryCta: { label: "Read the Docs", href: DOCS, external: true },
    },
    benefits: {
      heading: "Benefits",
      items: [
        {
          title: "Smoother onboarding",
          visual: "onboarding",
          description:
            "A name to claim is a better first step than an address to copy.",
        },
        {
          title: "Fewer lost funds, fewer tickets",
          visual: "security",
          description:
            "Address poisoning, clipboard hijacking, and other address-related scams are eliminated with ENS.",
        },
        {
          title: "Your brand in every transaction",
          visual: "brand",
          description:
            "Every alice.yourwallet.eth displayed in another app is free distribution.",
        },
        {
          title: "Revenue when you want it",
          visual: "revenue",
          description:
            "Free names for growth, premium names and renewals for revenue. You set the pricing.",
        },
        {
          title: "Works everywhere",
          visual: "everywhere",
          description:
            "Compatible with 100+ chains and 1,000+ apps, wallets, and protocols.",
        },
        {
          title: "Network effect",
          visual: "network",
          description:
            "Each new subname makes your namespace more valuable. More users, more visibility.",
        },
      ],
    },
    productLook: {
      label: "In your product",
      heading: "What it looks like in your wallet",
      paragraph: "",
      items: [
        {
          tag: "At signup",
          body: "The user claims **alice.yourwallet.eth** in the same step as wallet creation. One API call, no transaction, no gas prompt. Every signup ends with a name, not an address - claimed in-flow, no extra steps.",
          visual: "claim",
        },
        {
          tag: "In the send flow",
          body: "The user types a name instead of pasting a string. Your app resolves it and shows an avatar before the confirm screen. Sending to something you can read is the single highest-leverage safety improvement available to a wallet today.",
          visual: "send",
        },
        {
          tag: "On the profile",
          body: "Avatar, bio, socials and addresses across chains - all stored as standard ENS records the user controls.",
        },
        {
          tag: "Outside your app",
          body: "The same name appears when they connect to Uniswap, post on Farcaster, or show up in a block explorer. Free brand distribution every time they leave your product.",
          visual: "everywhere",
        },
        {
          tag: "Upgrade path",
          body: "Start users on free offchain names. Offer onchain ownership as a premium tier for users who want a transferable, self-custodied name.",
          visual: "upgrade",
        },
      ],
      before: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
      after: "alice.yourwallet.eth",
    },
    howTo: {
      label: "How it works",
      heading: "How does a wallet issue ENS usernames?",
      intro:
        "Three steps, then a decision about where the names live. Most wallets get to production without deploying a single contract.",
      steps: [
        {
          title: "Point a name at our resolver",
          body: "You own yourwallet.eth; one transaction points it at the Namespace resolver.",
        },
        {
          title: "Call the API or SDK at signup",
          body: "One authenticated call issues the subname and sets its records.",
        },
        {
          title: "The name resolves everywhere",
          body: "Any ENS-aware client reads it, whether or not it has heard of your wallet.",
        },
      ],
      table: {
        columns: ["Mode", "Cost", "Ownership", "Speed", "Best for"],
        rows: [
          ["Offchain", "Free, gasless, unlimited", "You control issuance; records are standard ENS", "Instant", "Millions of names, default usernames, signup flows"],
          ["L2 onchain", "Cents of L2 gas", "User-owned NFT, trust-minimized", "Seconds", "Real ownership, paid or premium names, chain identity"],
          ["L1 onchain", "Mainnet gas", "User-owned NFT, fully trustless", "Block time", "Low volumes, flagship and institutional names"],
        ],
      },
      recommendedRow: 0,
      recommendation:
        "For wallets, start offchain. It is free, instant and unlimited, which matches a consumer signup flow.",
    },
    caseStory: {
      tag: "Case study · Unicorn",
      heading: "Thousands of ETHDenver attendees onboarded with a name, not an address",
      points: [
        {
          label: "Situation.",
          body: "Unicorn needed conference-scale onboarding that felt branded and human for people meeting a wallet for the first time.",
        },
        {
          label: "Built.",
          body: "In-app ENS usernames issued offchain at signup - no gas for attendees, no contracts deployed, no naming infrastructure to run.",
        },
        {
          label: "Result.",
          body: "Thousands of subnames issued across the event, and every one of them still resolves anywhere ENS does.",
        },
      ],
      quote:
        "Namespace is providing a magical service. They made issuing thousands of subdomains for ETHDenver attendees simple and nearly effortless.",
      attribution: "Griff.eth - Founder, Unicorn & Giveth",
      quoteAvatar: "/assets/images/testimonial-griff.avif",
      ctaLabel: "Read the full case study",
      ctaHref: "/blog/case-study-namespace-x-unicorn",
      visualName: "alice.unicorn.eth",
    },
    howItWorks: {
      label: "How wallet usernames work",
      lead: "Wallets give every user a readable name - **alice.yourwallet.eth** - by issuing ENS subnames during onboarding. Namespace issues them offchain over CCIP-Read, so there are no contracts to deploy, no gas for the user and no limit on volume. The names resolve in 1,000+ ENS-enabled apps across 100+ chains, which removes address copy-paste errors and puts your brand in every transaction a user makes.",
      chips: [
        "Gasless",
        "No contracts to deploy",
        "Production in under a week",
        "Resolves in 1,000+ apps",
        "Free to issue",
      ],
    },
    whyUs: {
      label: "Why Namespace",
      heading: "Why wallets choose Namespace",
      lead: "Namespace is the ENS DAO-backed service provider.",
      tableCaption: "Build it yourself, or don't",
      table: {
        columns: ["", "In-house", "Namespace"],
        rows: [
          ["Resolver contracts", "You write, audit and maintain", "Managed and monitored"],
          ["CCIP-Read gateway", "You run it, and its uptime is yours", "Managed and monitored"],
          ["Subname expertise", "You start from zero", "Experts in offchain, L1, and L2 subnames"],
          ["Indexing and renewals", "Your on-call rotation", "Included"],
          ["Standards work", "You track ENSIPs yourself", "Follow and actively contribute."],
          ["Engineering to production", "A quarter, realistically", "Under a week"],
          ["ENS expertise", "You learn as you build", "3 years building only on ENS."],
          ["Lock-in", "None, but you maintain it all", "None: user-owned NFTs, exportable offchain names, standard ENS records"],
        ],
      },
      highlightColumn: 2,
      stats: [
        { value: "850k+", label: "Subnames issued" },
        { value: "21M", label: "Resolutions served" },
        { value: "30+", label: "Partnerships and integrations" },
        { value: "221", label: "Namespaces issuing subnames with us" },
      ],
      trustedBy: ["Celo", "Filecoin", "POAP", "Unicorn"],
      badge: "ENS DAO Service Provider",
    },
    bizPricing: {
      caseHeading: "The business case",
      caseParagraph:
        "Names are not only a UX fix. Wallets price short and premium labels, earn on renewals, and use naming as a paid tier.",
      caseBullets: [
        "Premium and short-label pricing you set",
        "Renewals as recurring revenue",
        "5% of onchain mints",
      ],
      pricingHeading: "Our pricing, plainly",
      pricingParagraph:
        "If names are free for your users, we charge nothing. We charge only on priced subnames and only earn when you do.",
      facts: [
        { value: "Free", label: "Offchain subnames" },
        { value: "5%", label: "On onchain mints through our infra" },
        { value: "5-10%", label: "On mints when we build your integration for free, routed to the ENS DAO" },
      ],
    },
    pains: {
      heading: "Why wallets are replacing addresses with usernames",
      style: "spotlight",
      items: [
        {
          question: "0x addresses are bad UX.",
          detail:
            "The first thing a new user sees is a 42-character string they cannot read, verify, or remember. It is the least human screen in your product, and it sits at the exact moment activation is won or lost. Every major consumer wallet has now moved past it. Uniswap Wallet has issued more than **2 million** [uni.eth usernames](https://blog.uniswap.org/introducing-uni-eth-your-unique-web3-username) since 2024. Gemini's smart wallet gives every user a free [gemini.eth username](https://ens.domains/blog/post/gemini-smart-wallet) at creation. Base has issued more than **2.7 million** [Basenames](https://www.base.org/names), and every username in the Base App is an ENS name.",
        },
        {
          question: "Addresses are a security liability.",
          detail:
            "Address poisoning attacks work by planting a lookalike address in a user's transaction history and waiting for a copy-paste. After Ethereum's Fusaka upgrade cut fees, dust transfers used for poisoning surged from about **20% to over 70%** of stablecoin transfer activity at the peak, [per Coin Metrics](https://coinmetrics.substack.com/p/state-of-the-network-issue-349). A single victim [lost 4,556 ETH](https://blockchain.news/flashnews/ethereum-security-alert-4-556-eth-lost-to-address-poisoning-mimicking-galaxy-digital-deposit-what-traders-need-to-know) in January 2026 to exactly this pattern. Names are human-verifiable before the user signs. Addresses are not.",
        },
        {
          question: "Your brand disappears at the transaction layer.",
          detail:
            "Right now, your users are **invisible** outside your app and **anonymous** everywhere they go. Every transaction they make shows a string that could belong to any wallet. Named users carry __alice.yourwallet.eth__ into every explorer, dApp, leaderboard, and social feed instead. Free brand distribution that grows and compounds with your user base and their activity.",
        },
      ],
    },
    stats: [],
    proofStyle: "wall",
    testimonials: [T.griff, T.jesse],
    faqs: [
      {
        question: "How much does it cost to give users ENS names?",
        answer:
          "Offchain subnames are free for you and your users regardless of volume. If you sell onchain names at a price you set, Namespace takes a fixed 5% of that minting revenue - waiveable for partners. Custom solutions for large partners and clients are built for free.",
      },
      {
        question: "Do the names work outside our wallet?",
        answer:
          "Yes. Subnames are real ENS names, resolvable in 1,000+ apps, wallets, and protocols across 100+ chains. alice.yourwallet.eth works wherever ENS does - that reach is the point.",
      },
      {
        question: "Can this handle our user volume?",
        answer:
          "Namespace manages 850,000+ subnames and has served 21M+ resolutions in production with 99.9% uptime. Offchain issuance is instant and gasless, designed specifically for high-volume onboarding flows.",
      },
      {
        question: "Are offchain subnames secure?",
        answer:
          "Yes. They're signed, verifiable, and resolvable through standard ENS mechanisms (CCIP-Read / EIP-3668). Resolution is trustless - the gateway returns signed data that is verified onchain.",
      },
      {
        question: "Do users actually own their username?",
        answer:
          "With onchain subnames, yes. The name is an NFT in the user's wallet and cannot be revoked by you or by us. With offchain names, you control issuance, but every record is standard ENS data and can be migrated to onchain ownership at any time. Most wallets start offchain for cost and speed, then offer an upgrade.",
      },
      {
        question: "What if a user already owns a .eth name?",
        answer:
          "Respect it. Read their ENS primary name first and show it if it exists, then offer your namespace as an additional or alternative identity. Users routinely hold several names, and ENS resolution handles this natively.",
      },
      {
        question: "Can we charge for names?",
        answer:
          "Yes. You set prices by length, reserve names, whitelist addresses, and token-gate registrations. Namespace takes 5% of paid onchain mints and nothing on free issuance. For integrations we build for free, 5-10% of minting revenue is routed back to the ENS DAO.",
      },
      {
        question: "How do we prevent squatting and impersonation?",
        answer:
          "Reserve your brand terms before launch, blocklist confusable strings, apply a minimum length, and optionally require verification before issuance. Celo pairs registration with Self identity verification for exactly this reason.",
      },
      {
        question: "Do we have to deploy a smart contract?",
        answer:
          "No, not for offchain names. You point an existing name at our resolver and call an API. Onchain issuance uses audited contracts that are already deployed.",
      },
      FAQ_BUILD_VS_BUY,
      FAQ_LOCK_IN,
      FAQ_TIMELINE,
    ],
    ctaCards: {
      heading: "Two days to testnet,\none week to production",
      subheading: "It's time to name your next million users.",
      cards: [
        {
          title: "Try it without code",
          description: "Issue your first usernames in minutes with the no-code app. No contracts, no gas.",
          button: { label: "Launch App", href: "https://app.namespace.ninja/" },
          image: "/assets/images/cta-decoration-2.svg",
          imageAlt: "Issue ENS usernames with no code required",
        },
        {
          title: "Build it into your wallet",
          description: "Add username claiming to your onboarding flow with a few lines of TypeScript.",
          button: { label: "Start Building Free", href: "https://docs.namespace.ninja/developer-guide/guide/create-offchain-subnames" },
          image: "/assets/images/cta-decoration-1.svg",
          imageAlt: "Build wallet usernames with the Namespace SDK and API",
        },
        {
          title: "Partner with Namespace",
          description: "Custom features, white-glove integration, partner pricing. Let's scope your integration on the call.",
          button: { label: "Book a Discovery Call", href: "https://cal.com/thecap.eth/discovery" },
          image: "/assets/images/cta-decoration-3.svg",
          imageAlt: "Partner with Namespace for custom wallet naming",
        },
      ],
    },
    finalCta: {
      heading: "Name your next million users",
      kicker: "Give your users a name this week",
      paragraph:
        "We build custom solutions for partners. Let's scope your integration on the call. Most wallets go live in days!",
      primary: {
        label: "Book a Discovery Call",
        href: BOOK_CALL,
        external: true,
      },
      secondary: { label: "Start Building Free", href: DOCS, external: true },
    },
  },

  /* ─────────────────────── 2. L2s / ROLLUPS ─────────────────────── */
  {
    slug: "l2s-rollups",
    navLabel: "L2s / Rollups",
    heroName: "alice.yourchain.eth",
    heroVisual: "tree",
    metaTitle: "ENS Chain Identity for L2s & Rollups",
    metaDescription:
      "Launch a chain-wide naming system like name.yourchain.eth - the identity layer Celo runs with Celonames. Live in weeks, operated with SLAs, no in-house naming team.",
    keywords: [
      "L2 identity system",
      "ENS L2 subnames",
      "rollup naming",
      "chain identity",
      "Celonames",
      "ENS chain names",
    ],
    voice: {
      needs:
        "A unified identity layer for our chain - one namespace every user and builder shares.",
      wants:
        "A credible, ENS-native naming system we can announce, without pulling protocol engineers off the roadmap.",
      fears:
        "Identity on our chain stays fragmented across dApps, users feel no belonging, and activity churns to the next chain. Or we build naming in-house and own a resolver stack forever.",
      desires:
        "name.yourchain.eth becomes part of the chain's culture - every user named, every builder issuing subnames under one root.",
      triedAndHated:
        "Forked greenfield naming protocols that nothing outside the chain resolves; 'we'll get to it after mainnet' backlogs; per-dApp usernames that fragment the ecosystem.",
    },
    hero: {
      tag: "For L2s & Rollups",
      headline: "The ENS identity layer for your L2",
      subheadline:
        "One shared namespace for every user, app, and contract on your chain. Your chain gets name.yourchain.eth. Live in weeks, built by the ENS DAO-backed team, operated with SLAs.",
      primaryCta: {
        label: "Book a Call",
        href: BOOK_CALL,
        external: true,
      },
      secondaryCta: {
        label: "See How Celo Did It",
        href: "https://ens.domains/blog/post/celonames-powered-by-ens",
        external: true,
      },
    },
    howItWorks: {
      label: "How chain identity works",
      lead: "An L2 identity system is a chain-wide naming service for your chain built on ENS. Every user, builder, app, and contract gets a readable name under one root - **user.yourchain.eth**, or a DNS domain you already own, like **yourchain.id** - registered on your chain and resolvable everywhere. Namespace designs, builds, and operates the whole stack as an official ENS service provider: registrar and resolver contracts, CCIP-Read gateways, indexers, and the registration frontend. The names resolve across 100+ chains and in 1,000+ apps from day one, so your chain's identity is legible far outside its own ecosystem.",
      chips: [
        "L1 and L2 chains",
        "Shared across ecosystems",
        "Standards-based",
        "Free implementation",
        "Prod-ready in weeks",
      ],
    },
    tree: {
      heading: "One root. A whole ecosystem under it.",
      paragraph:
        "People, apps, validators, bridges, and DAOs all live under yourchain.eth.",
      root: "yourchain.eth",
      leaves: [
        { label: "alice", suffix: ".yourchain.eth", tag: "user" },
        { label: "validator01", suffix: ".yourchain.eth", tag: "infrastructure" },
        { label: "bridge", suffix: ".yourchain.eth", tag: "contract" },
        { label: "app", suffix: ".yourchain.eth", tag: "builder" },
        { label: "dao", suffix: ".yourchain.eth", tag: "governance" },
      ],
      pillars: [
        {
          tag: "Distribution",
          title: "Resolves everywhere, day one",
          description:
            "A forked naming protocol starts from zero integrations. An ENS-based namespace works in every major wallet from day 1.",
        },
        {
          tag: "Operation",
          title: "We run it. You announce it.",
          description:
            "Resolvers, gateways, indexing, monitoring and ENS protocol updates are Namespace's job, backed by SLAs. Your protocol engineers stay on the roadmap.",
        },
        {
          tag: "Policy & revenue",
          title: "Your root, your rules",
          description:
            "Free names for growth, premium names for revenue, onchain on your L2 or gasless offchain at volume. The namespace is yours; we make it work.",
        },
      ],
    },
    deliver: {
      label: "What you get",
      heading: "What we deliver",
      lead: "Everything a chain namespace needs, built and operated end to end.",
      items: [
        {
          title: "Full contract suite",
          description: "Registry, registrar, resolver, and controller contracts for L1 and your L2.",
        },
        {
          title: "CCIP-Read gateway",
          description: "Deployed and operated, or handed over for you to run.",
        },
        {
          title: "Indexer",
          description: "Event indexing with a queryable API for names, records, and history.",
        },
        {
          title: "Registration frontend",
          description: "A branded claim site, or prebuilt UI components for your own app.",
        },
        {
          title: "Metadata service",
          description: "Dynamic NFT images for minted names.",
        },
        {
          title: "Resolution service",
          description: "Free, API-first resolution with bulk lookups and caching.",
        },
        {
          title: "Ecosystem dev support",
          description: "AI-ready Dev Docs, API or SDK, and direct support for your builders.",
        },
        {
          title: "Open source",
          description: "Our infrastructure code is public. Read exactly what you are implementing.",
        },
      ],
    },
    architecture: {
      label: "Under the hood",
      heading: "The architecture of an ENS-powered namespace",
      steps: [
        {
          title: "Root ownership",
          body: "Your foundation holds yourchain.eth - or your existing DNS domain, imported into ENS - on Ethereum L1. That ownership is yours and never sits with us.",
        },
        {
          title: "Registrar on your chain",
          body: "Registration, pricing, renewals, and permissions run in contracts deployed on your L2, so users transact on their home chain with your gas token.",
        },
        {
          title: "Resolution",
          body: "A CCIP-Read gateway (ERC-3668) plus wildcard resolution (ENSIP-10) makes those L2 names resolve from Ethereum L1 and from every ENS-aware app. An event indexer keeps names queryable through an API, and a metadata service renders NFT images for onchain names.",
        },
      ],
      chipsLabel: "Your registrar, your rules",
      chipsParagraph:
        "Registration policy is yours to set.\nWe implement and operate it.",
      chips: [
        "Near-zero claim fees on your chain",
        "Fees paid in your gas token",
        "Custom pricing and renewals",
        "Reserved and premium names",
        "Partner whitelists at launch",
        "Sybil protection via verification",
        "Use the domain you already own (.id, .me)",
      ],
    },
    pains: {
      heading: "Why L2s need an identity layer",
      style: "spotlight",
      items: [
        {
          question: "Your chain has no native concept of who anyone is.",
          detail:
            "Users arrive as addresses and stay as addresses. There is no handle to build a profile against, no way for an app to greet a returning user by name, and nothing for social features to hang on.",
        },
        {
          question: "Every ecosystem app rebuilds identity separately.",
          detail:
            "Without a shared namespace, each app on your chain invents its own username system. The result is fragmentation, duplicated effort, and identity that dies at the app boundary instead of belonging to the chain.",
        },
        {
          question: "Your competitors already shipped.",
          detail:
            "Coinbase built Basenames under base.eth with **2.7 million** [subnames](https://www.base.org/names). World runs [world.id usernames on ENS](https://ens.domains/ecosystem/world) with **17 million** subnames. Uniswap operates uni.eth and has issued more than **2 million** [usernames](https://blog.uniswap.org/introducing-uni-eth-your-unique-web3-username). Linea runs Linea Names under linea.eth with more than **530,000** [subnames](https://ens.domains/blog/post/ens-picks-linea). Celo uses [celo.eth](https://names.celo.org).",
        },
        {
          question: "A proprietary naming service solves the wrong problem.",
          detail:
            "Building your own naming service outside of ENS means no wallet resolves it, no explorer displays it, and no dApp integrates it at launch. You would be starting the network effect from zero and dealing with the cold-start problem, while an ENS-powered namespace taps into the 1,000+ integrations ENS already has on day one.",
        },
      ],
    },
    benefits: {
      label: "Why chains do this",
      heading: "Benefits",
      style: "bento",
      items: [
        {
          title: "One namespace for the whole chain",
          visual: "network",
          description:
            "Users, builders, apps, and contracts share a single root. No per-dApp identity fragmentation.",
        },
        {
          title: "No identity cold start",
          visual: "everywhere",
          description:
            "An ENS-powered naming system plugs your chain into the entire ENS ecosystem. Your identity layer launches with distribution, not from zero.",
        },
        {
          title: "Users arrive named",
          visual: "onboarding",
          description:
            "New users claim a name once and carry it into every dApp on your chain - no per-app identity setup with portable ENS identity.",
        },
        {
          title: "Your brand in every transaction",
          visual: "brand",
          description:
            "Every __name.yourchain.eth__ displayed in another app is free distribution for your chain.",
        },
        {
          title: "Revenue when you want it",
          visual: "revenue",
          description:
            "Free names for growth, premium and short labels for revenue. You set the pricing.",
        },
        {
          title: "Zero protocol-team time",
          visual: "ops",
          description:
            "Namespace builds and operates the whole stack with SLAs. Your engineers stay on the roadmap.",
        },
      ],
    },
    outcomes: {
      label: "In your product",
      heading: "What a chain identity system includes",
      style: "list",
      items: [
        {
          title: "A name for every user",
          description:
            "alice.yourchain.eth, claimable through a registration site we build and brand for you, or directly inside ecosystem wallets and apps.",
        },
        {
          title: "Profiles, not just handles",
          description:
            "Avatar, bio, socials, and address records across chains, stored as standard ENS records under your namespace.",
        },
        {
          title: "Optional verification\nfor Sybil resistance",
          description:
            "Celonames pairs registration with [Self](https://self.xyz), so a user can prove they are a real person before minting. Verification and identity become one flow instead of two.",
        },
        {
          title: "Names for contracts\nand infrastructure too",
          description:
            "Label your bridges, your ecosystem contracts, and your official addresses.",
        },
        {
          title: "Decentralized websites",
          description:
            "Names can point to IPFS-hosted frontends via contenthash records - app.yourchain.eth becomes a censorship-resistant mirror of your ecosystem's critical apps.",
        },
      ],
    },
    timeline: {
      heading: "Scoping call to live namespace",
      phases: [
        {
          period: "Week 1",
          title: "Scope",
          description:
            "Root name, registration rules, pricing model and launch plan, designed with your team.",
        },
        {
          period: "Weeks 2-3",
          title: "Deploy",
          description:
            "Namespace deploys resolvers and infrastructure, wires SDK and API points for your wallets and dApps.",
        },
        {
          period: "Week 4",
          title: "Launch",
          description:
            "Your ecosystem claims names under the root. Announcement, docs and integration support included.",
        },
        {
          period: "Ongoing",
          title: "Operate",
          description:
            "SLAs, monitoring and protocol updates, the same multi-year partnership Celo and Filecoin run on.",
        },
      ],
    },
    caseStory: {
      tag: "Case study · Celo x Namespace",
      heading: "An entire chain's identity layer, live in weeks",
      points: [
        {
          label: "Situation.",
          body: "Celo wanted one namespace every user and builder on the chain could share, without pulling protocol engineers off the roadmap.",
        },
        {
          label: "Built.",
          body: "Celonames with registrar and resolver contracts, Self verification for Sybil resistance, a CCIP-Read gateway, an indexer, and the registration frontend at names.celo.org.",
        },
        {
          label: "Result.",
          body: "Every Celo user can claim a name and use it in any ENS-aware wallet or app. Namespace operates the stack as a multi-year partnership with SLAs.",
        },
      ],
      quote:
        "Our experience working with Namespace has been exceptional. Their team combines strong technical expertise with clear communication and a true spirit of partnership.",
      attribution: "Kate - Head of Product & GTM at Celo",
      quoteAvatar: "/assets/images/katecelo.jpg",
      ctaLabel: "See Celonames live",
      ctaHref: "https://names.celo.org",
      cta2Label: "Read the ENS blog post",
      cta2Href: "https://ens.domains/blog/post/celonames-powered-by-ens",
      visualName: "alice.celo.eth",
    },
    proofStyle: "wall",
    whyUs: {
      label: "Why Namespace",
      heading: "Why blockchains choose Namespace",
      lead: "Namespace is the ENS DAO-backed service provider.",
      tableCaption: "Build it yourself, or don't",
      table: {
        columns: ["", "In-house", "Namespace"],
        rows: [
          ["Registrar and resolver contracts", "You write, audit and maintain", "Designed, deployed and monitored"],
          ["CCIP-Read gateway", "You run it, and its uptime is yours", "Managed and monitored"],
          ["Indexing and metadata", "Your on-call rotation", "Included"],
          ["Standards work", "You track ENSIPs yourself", "Follow and actively contribute."],
          ["Engineering to production", "Quarters of protocol-team time", "Weeks"],
          ["Subname expertise", "You start from zero", "Experts in offchain, L1, and L2 subnames"],
          ["Lock-in", "None, but you maintain it all", "None: user-owned NFTs, standard ENS records"],
        ],
      },
      highlightColumn: 2,
      stats: [
        { value: "850k+", label: "Subnames issued" },
        { value: "21M", label: "Resolutions served" },
        { value: "30+", label: "Partnerships and integrations" },
        { value: "221", label: "Namespaces issuing subnames with us" },
      ],
      trustedBy: ["Celo", "Filecoin", "POAP", "Unicorn"],
      badge: "ENS DAO Service Provider",
    },
    bizPricing: {
      caseHeading: "The business case",
      caseParagraph:
        "Naming is ecosystem revenue and retention. Chains price names by length and earn on annual renewals and premium names - while every named user carries the chain's brand into every ENS-enabled app they touch.",
      caseBullets: [
        "Tiered pricing by name length, set by you",
        "Annual renewals as recurring revenue",
        "Reserved and premium names",
        "A shared namespace raises switching costs",
      ],
      pricingHeading: "Our pricing, plainly",
      pricingParagraph:
        "The build is free or subsidized - Namespace is funded by the ENS DAO. If names are free for your users, we charge nothing. We charge only on priced subnames and only earn when you do.",
      facts: [
        { value: "Free", label: "Offchain subnames and the build, ENS DAO funded" },
        { value: "5%", label: "On paid onchain mints through our infra" },
        { value: "5-10%", label: "On mints when we build your integration for free, routed to the ENS DAO" },
      ],
    },
    stats: [
      { value: "2", label: "chains operated today: Celo and Filecoin" },
      { value: "Weeks", label: "from scoping call to live namespace" },
      { value: "21M", label: "resolutions served at scale" },
      { value: "100%", label: "uptime, backed by SLAs" },
    ],
    testimonials: [T.jesse, T.thomas],
    faqs: [
      {
        question: "How did Celo launch Celonames?",
        answer:
          "Celo partnered with Namespace to build Celonames - ENS-based names under celo.eth for the entire Celo ecosystem. Namespace designed the architecture, built the infrastructure, and continues to operate it as a long-term partner.",
      },
      {
        question: "Why build on ENS instead of our own naming protocol?",
        answer:
          "Distribution. ENS already resolves in 1,000+ apps, every major wallet, and 100+ chains. A greenfield protocol starts from zero integrations; an ENS-based namespace works across web3 on day one while still being fully yours.",
      },
      {
        question: "Can we use our existing domain instead of a .eth name?",
        answer:
          "Yes. ENS supports DNS domains through DNSSEC integration, so a domain like yourchain.id or yourchain.me can issue names exactly like a .eth root. World runs world.id usernames this way - 17 million of them. Your namespace lives under the brand you already own.",
      },
      {
        question: "Should we issue names onchain on our L2 or offchain?",
        answer:
          "Onchain on your chain is the usual answer for an L2, because it keeps ownership with users, keeps transactions on your chain, and supports renewals as a revenue line. Offchain is better for free bulk issuance, airdrops, and early testing. Many chains run both.",
      },
      {
        question: "Do we need to own a .eth name first?",
        answer:
          "Yes, and you should own it directly. Most chains already hold theirs. If not, we help you acquire it. The root stays in your control at all times.",
      },
      {
        question: "Will these names resolve outside our chain?",
        answer:
          "Yes. That is the point of building on ENS. Names resolve on Ethereum L1 and in every ENS-aware wallet, explorer, and dApp, across 100+ supported chains, through ENSIP-10 and ERC-3668.",
      },
      {
        question: "What are the trust assumptions?",
        answer:
          "For onchain names on your chain, ownership is enforced by contracts you control, and resolution back to L1 relies on CCIP-Read gateways whose responses are verifiable. For offchain names, the issuing server is trusted for issuance but not for ownership of the root. We publish the architecture rather than asking anyone to take it on faith.",
      },
      {
        question: "Can we require identity verification before minting?",
        answer:
          "Yes. Celonames integrates Self so users can prove personhood before minting. Any verification provider can be wired into the registrar the same way.",
      },
      {
        question: "Can we migrate an existing naming system to ENS?",
        answer:
          "Yes. POAP migrated its naming infrastructure to Namespace with no downtime for users. Migrations are scoped case by case.",
      },
      {
        question: "Who operates the infrastructure after launch?",
        answer:
          "Namespace does - resolvers, gateways, indexing, monitoring, and ENS protocol updates, backed by SLAs. Celo and Filecoin run this way today. Your team gets an identity layer without an identity department.",
      },
      {
        question: "Can dApps on our chain issue their own subnames?",
        answer:
          "Yes. Builders can issue names under the chain root (app.yourchain.eth) or their own namespaces, using the same SDK and API. Your namespace becomes ecosystem infrastructure other teams build on.",
      },
      {
        question: "How long does an integration take?",
        answer:
          "Most chains go from scoping to launch in about four weeks. Namespace works with your team from initial scoping through launch and post-launch support - including SDK integration, resolver setup, and custom configuration.",
      },
      FAQ_LOCK_IN,
    ],
    finalCta: {
      heading: "Make your chain a place with names",
      paragraph:
        "Talk to the team that built Celonames. We'll scope your chain's identity layer on the call - architecture, timeline, and pricing.",
      primary: {
        label: "Book a Discovery Call",
        href: BOOK_CALL,
        external: true,
      },
      secondary: { label: "Read the Docs", href: DOCS, external: true },
    },
  },

  /* ──────────────────── 3. FINTECHS & NEOBANKS ──────────────────── */
  {
    slug: "fintechs-neobanks",
    navLabel: "Fintechs & Neobanks",
    heroName: "alice.yourbank.eth",
    heroVisual: "sendflow",
    metaTitle:
      "ENS Names for Fintechs & Neobanks - Crypto UX Your Customers Understand",
    metaDescription:
      "Launch stablecoin and crypto features your customers can't fumble. Replace raw addresses with names like alice.yourbank.eth - fewer wrong sends, less fraud surface, fintech-grade UX.",
    keywords: [
      "fintech crypto UX",
      "neobank stablecoin payments",
      "ENS for fintech",
      "send crypto to username",
      "address poisoning prevention",
      "crypto payments UX",
      "stablecoin remittance UX",
    ],
    voice: {
      needs:
        "A safe, human-readable send-and-receive layer for the stablecoin and crypto features we're shipping.",
      wants:
        "Crypto that feels like the rest of our app - pay a username, not a hex address. Fintech-grade UX, no new infrastructure team.",
      fears:
        "A customer sends stablecoins to a wrong address through our app. It's irreversible, support can't fix it, and the headline reads 'neobank loses customer's money.'",
      desires:
        "Crypto features indistinguishable from our fiat UX - every customer has a payable name under our brand, and trust in the app goes up, not down.",
      triedAndHated:
        "Raw addresses wrapped in warning banners; 'verify the first and last 4 characters' as a UX strategy; internal contact books that stop working the moment money leaves our app; shelving the crypto launch because the send flow felt like a liability.",
    },
    hero: {
      tag: "For Fintechs & Neobanks",
      headline: "Send to a Name, Not an Address",
      subheadline:
        "Give every user in your app a readable username. Fewer failed transfers, less fraud surface, fewer support tickets, and stablecoin send flow that non-crypto users actually understand.",
      primaryCta: {
        label: "Book a Discovery Call",
        href: BOOK_CALL,
        external: true,
      },
      secondaryCta: { label: "Read the Docs", href: DOCS, external: true },
    },
    howItWorks: {
      label: "How payable names work",
      lead: "Fintechs and neobanks can give every customer a payable username like **alice.yourbank.eth** or **alice.yourbank.id**, issued at signup. Instead of pasting a 42-character wallet address, the sender just types a name. Namespace creates these names through an API, with no gas cost and no contract deployment. One name holds address records for every chain you support, so it always resolves to the right address on the right chain before the money moves. The names are not locked to your app. They resolve in wallets, explorers, and other fintechs, so cross-app transfers happen without either side integrating the other.",
      chips: [
        "Free",
        "Gasless",
        "One name, many chains",
        "Resolves in 1,000+ apps",
        "Use any domain you own (.eth, .id, etc.)",
      ],
    },
    pains: {
      heading: "Why addresses break payment products",
      style: "spotlight",
      items: [
        {
          question: "Nobody knows who 0x71C7...F2a9 is.",
          detail:
            "Addresses are unreadable, unmemorable, and impossible to confirm at a glance. Your users are moving money to a string they cannot verify, so they paste, squint at the first and last four characters, and hope it's correct. It is the highest-friction input in consumer finance, and it sits at the exact moment you need them to feel confident. Names are the only part of this stack a first-time user recognizes from every other app they have ever used.",
        },
        {
          question: "Wrong-address transfers are irreversible",
          detail:
            "Address poisoning attacks specifically target payment behavior. Attackers send dust transactions from lookalike addresses so the fake address lands in the user's history, then wait for a copy-paste. Onchain poisoning attempts tracked by security researchers rose from roughly **628,000** in November 2025 to **3.4 million** in January 2026. In December 2025 a single user lost close to **50 million USDT** this way, 26 minutes after making a small test transfer. You cannot refund those. You can only prevent them, and prevention starts with making the destination human-readable before the user signs.",
        },
        {
          question: "You probably have siloed usernames",
          detail:
            "Cash App handles work in Cash App. Revolut tags work in Revolut. Every fintech builds its own username system and none of them talk to each other. The moment your user needs to pay or receive money from someone outside your app, they are back to copying a raw address.",
        },
        {
          question: "Your brand is invisible, but it shouldn't be",
          detail:
            "Every transfer your customers make outside your app shows an anonymous string that could belong to any product. Named customers change that: every payment to or from __alice.yourbank.id__ puts your brand in the other side's app, in explorers, and in transaction history - distribution you do not pay for, compounding with every transaction.",
        },
      ],
    },
    outcomes: {
      label: "In your product",
      heading: "How usernames change\na payments flow",
      columns: 2,
      items: [
        {
          title: "Claim at signup",
          description:
            "alice.yourapp.eth, issued automatically with the account. No transaction, no gas, no extra step for the user to understand.",
        },
        {
          title: "Send by name",
          description:
            "The user types a name. Your app resolves it, displays the avatar and profile, and only then enables the confirm button. The verification step becomes visual instead of a character-by-character comparison.",
        },
        {
          title: "Request and payment links",
          description:
            "Share a name instead of an address. It fits in a message, a bio, an invoice, or a QR code, and it does not change when the user rotates wallets.",
        },
        {
          title: "One name, every chain, 1,000+ apps",
          description:
            "Store address records per chain under the same name. The sender picks a person, your app picks the rail.",
        },
        {
          title: "Interoperable by default",
          description:
            "Because these are ENS names, someone in a different wallet can pay your user without your app being involved at all. That is a growth surface most payment products do not have.",
        },
        {
          title: "Secured and verified",
          description:
            "Resolution is verified onchain through ENS, so the name your user pays is provably the account it belongs to. Lookalike addresses and spoofed handles lose their attack surface.",
        },
      ],
    },
    howTo: {
      label: "How it works",
      heading: "How to add usernames to your app",
      intro: "Three integration points, then a choice of name type.",
      afterOutcomes: true,
      theme: "light",
      steps: [
        { title: "Point a name at our resolver", body: "You keep ownership of the root name." },
        { title: "Issue at account creation", body: "One API call, no gas, no contract deployment." },
        { title: "Resolve on send", body: "ENS-native resolution in your send flow, plus Resolvio for bulk resolution across contact lists and transaction history." },
      ],
      tableCaption: "Name types for payment apps",
      table: {
        columns: ["Mode", "Cost", "Ownership", "Speed", "Best for"],
        rows: [
          ["Offchain", "Free, gasless, unlimited", "You control issuance and management.", "Instant", "Every user by default, issued at signup."],
          ["L2 onchain", "Cents of L2 gas", "User-owned NFT, transferable", "Seconds", "Premium or power users"],
        ],
      },
      recommendedRow: 0,
    },
    solution: {
      heading: "How Namespace does it",
      paragraph:
        "Namespace powers naming for production payment flows - including Filpay usernames on Filecoin - with 21M+ resolutions served at 100% uptime.",
      features: [
        {
          title: "A payable name for every customer",
          description:
            "Issue offchain subnames at signup - gasless, instant, free at any volume. Naming a million customers costs what naming one does.",
        },
        {
          title: "Resolution in your send flow",
          description:
            "Resolve any ENS name to the right address for the right chain via SDK or REST API - with multi-chain address records built in.",
        },
        {
          title: "Fraud surface, reduced by design",
          description:
            "Address poisoning, spoofing, and clipboard hijacking all exploit unreadable hex. Names remove the failure mode instead of warning about it.",
        },
        {
          title: "Bank-grade operational posture",
          description:
            "Signed, verifiable resolution via standard ENS mechanisms (CCIP-Read / EIP-3668), operated with SLAs, monitoring, and protocol-update management.",
        },
      ],
    },
    steps: {
      heading: "Live in three steps",
      items: [
        {
          title: "Claim your namespace",
          description:
            "Point yourbank.eth at Namespace infrastructure - no contracts to deploy, no keys to babysit.",
        },
        {
          title: "Name customers at signup",
          description:
            "One SDK call in your onboarding flow gives every customer a payable name.",
        },
        {
          title: "Resolve names in your send flow",
          description:
            "Accept any ENS name anywhere your app accepts an address - verified, multi-chain, trustless.",
        },
      ],
      code: SDK_SNIPPET,
      codeLabel: "Give every customer a payable name",
    },
    stats: [
      { value: "21M", label: "resolutions served at 100% uptime" },
      { value: "100+", label: "chains with address records" },
      { value: "$0", label: "per customer name, any volume" },
      { value: "Days", label: "to a live send-flow integration" },
    ],
    testimonials: [T.patricio, T.brantly],
    faqs: [
      {
        question: "Does this actually reduce payment errors and fraud?",
        answer:
          "Names remove the failure mode. Address poisoning, spoofing, and clipboard hijacking all exploit the fact that customers can't read hex. A name like alice.yourbank.eth is verifiable at a glance - there's nothing to mis-paste and no lookalike to fall for.",
      },
      {
        question: "Do names work for cross-chain and stablecoin payments?",
        answer:
          "Yes. ENS names carry multi-chain address records, so one name resolves to the right address on the right chain - whether the transfer is USDC on Base, stablecoins on an L2, or ETH on mainnet. Namespace supports records across 100+ chains.",
      },
      {
        question: "What does it cost at consumer-fintech volume?",
        answer:
          "Offchain subnames are free at any volume - for you and your customers. Resolution via the SDK and API is free to use. If you later sell premium names, Namespace charges a fixed 5% of that registration revenue only.",
      },
      {
        question: "Is resolution reliable enough for a regulated product?",
        answer:
          "Resolution is trustless and verifiable: offchain records are signed and verified onchain via CCIP-Read (EIP-3668), the same standard the broader ENS ecosystem relies on. Namespace has served 21M+ resolutions at 100% uptime and operates with SLAs.",
      },
      {
        question: "Do our customers need to know what ENS is?",
        answer:
          "No. To your customers it's just a username - they pick it at signup and pay people by name, like every other feature in your app. The ENS layer underneath is what makes that username work outside your app too.",
      },
      FAQ_BUILD_VS_BUY,
      FAQ_TIMELINE,
      FAQ_LOCK_IN,
    ],
    finalCta: {
      heading: "Ship the crypto feature, keep the trust",
      paragraph:
        "We'll scope your naming integration on a call - most send-flow integrations go live in days, not quarters.",
      primary: {
        label: "Book a Discovery Call",
        href: BOOK_CALL,
        external: true,
      },
      secondary: { label: "Start Building Free", href: DOCS, external: true },
    },
  },

  /* ──────────────────────────── 4. WaaS ─────────────────────────── */
  {
    slug: "waas",
    navLabel: "WaaS",
    heroName: "user.theirbrand.eth",
    metaTitle: "ENS Identity for Wallet-as-a-Service Platforms",
    metaDescription:
      "Bundle ENS identity into every wallet you provision. Give your WaaS customers branded usernames for their users - API-first, gasless, white-label ready.",
    keywords: [
      "wallet as a service",
      "WaaS identity",
      "embedded wallet usernames",
      "ENS API",
      "white-label ENS",
      "embedded wallet ENS",
    ],
    voice: {
      needs:
        "An API-first way to attach identity to every wallet we provision for our B2B customers.",
      wants:
        "A differentiating feature we can put on our pricing page - 'usernames included' - without running naming infra.",
      fears:
        "Our platform stays a commodity - every embedded-wallet provider mints the same keys. Competing on price alone.",
      desires:
        "Every wallet we create ships with a branded name; our customers see us as the platform that makes their users legible.",
      triedAndHated:
        "Roadmapping identity in-house and shelving it every quarter; bolting on display names that don't resolve anywhere.",
    },
    hero: {
      tag: "For Wallet-as-a-Service",
      headline: "Ship wallets with identity built in",
      subheadline:
        "Bundle an ENS username into every wallet you provision - automatically, via API. Your customers get branded names for their users; you get a differentiator that isn't a price cut.",
      primaryCta: {
        label: "Book a Discovery Call",
        href: BOOK_CALL,
        external: true,
      },
      secondaryCta: { label: "Read the Docs", href: DOCS, external: true },
    },
    howItWorks: {
      label: "How platform usernames work",
      lead: "WaaS platforms name every wallet they provision - **user.theirbrand.eth** - with one API call in the same flow that creates the wallet. Each customer brand gets its own namespace, names resolve in 1,000+ apps across 100+ chains, and Namespace operates the infrastructure behind your white label.",
      facts: [
        {
          title: "What you get",
          description: "'ENS usernames included' as a platform feature, scoped per customer brand.",
        },
        {
          title: "How long it takes",
          description: "One call added to provisioning; bulk backfill covers existing wallets.",
        },
        {
          title: "What it costs",
          description: "Free at any volume, funded by the ENS DAO.",
        },
      ],
    },
    definition: {
      question: "How does ENS identity work for Wallet-as-a-Service platforms?",
      answer:
        "Each wallet you provision gets an ENS subname at creation - user.customerbrand.eth - in the same API flow that creates the wallet.",
    },
    definitionPoints: [
      {
        title: "Named at provisioning",
        description:
          "Subname creation runs in the same API call flow that creates the wallet. No separate identity step.",
      },
      {
        title: "Free at platform scale",
        description:
          "Offchain subnames are gasless and free at any volume, so per-wallet naming is viable across millions of wallets.",
      },
      {
        title: "Scoped per customer brand",
        description:
          "Every business customer gets its own namespace under its own ENS name. Tenants never share one.",
      },
      {
        title: "Real ENS reach",
        description:
          "Names resolve in 1,000+ apps and across 100+ chains, not just inside your platform.",
      },
    ],
    pains: {
      heading: "Sound familiar?",
      items: [
        {
          question:
            "Does every embedded-wallet provider look the same on a comparison table?",
          detail:
            "Key management, gas sponsorship, social login - table stakes across the category. When features converge, deals come down to price. You need a row on that table competitors can't check.",
        },
        {
          question: "Do the wallets you provision have no identity at all?",
          detail:
            "You create millions of wallets that are pure key material - anonymous hex your customers then have to make usable. Every one of them ships an address where a name should be.",
        },
        {
          question:
            "Has 'identity layer' been on your roadmap for three quarters?",
          detail:
            "Building naming means resolvers, gateways, multi-tenant namespaces, and ENSIP compliance - a permanent infrastructure commitment that keeps losing the prioritization fight to core wallet features. So it never ships.",
        },
      ],
    },
    desire: {
      heading: "What your platform could ship",
      paragraph:
        "One API integration, and 'ENS usernames included' becomes a line on your pricing page - for every customer, at every wallet creation.",
      bullets: [
        "Every wallet you provision comes with a name under your customer's brand - user.theirbrand.eth.",
        "Namespaces are cleanly scoped per customer, managed through one API.",
        "Names resolve across 1,000+ apps and 100+ chains - real ENS, not display-name decoration.",
        "Zero marginal cost: offchain issuance is gasless and free at any volume.",
      ],
    },
    solution: {
      heading: "How Namespace does it",
      paragraph:
        "Namespace works with wallet-infrastructure teams like OpenFort to put identity inside the wallet-creation flow itself.",
      features: [
        {
          title: "API-first, wallet-flow native",
          description:
            "Create a subname in the same backend flow that provisions the wallet - REST API or TypeScript SDK, with bulk operations for migrations.",
        },
        {
          title: "Multi-tenant namespaces",
          description:
            "Each customer brand gets its own namespace under its own ENS name, managed programmatically from your platform.",
        },
        {
          title: "Free at platform scale",
          description:
            "Offchain subnames cost nothing at any volume - naming a million wallets costs what naming one does. Onchain available where customers want NFT ownership.",
        },
        {
          title: "Infrastructure you don't operate",
          description:
            "Resolvers, gateways, indexing, and protocol updates are Namespace's job, with SLAs. Your platform gets the feature without the pager duty.",
        },
      ],
    },
    featureTable: {
      label: "Differentiation",
      heading: "The row they can't check",
      intro:
        "Key management, gas sponsorship and social login are table stakes across the category. When the stacks converge, deals go to the cheaper platform. Change the table.",
      columns: ["Your platform", "Other WaaS"],
      rows: [
        { feature: "Key management", a: true, b: true },
        { feature: "Gas sponsorship", a: true, b: true },
        { feature: "Social login", a: true, b: true },
        { feature: "ENS usernames included", a: true, b: false, highlight: true },
      ],
    },
    tenants: {
      label: "Multi-tenant by design",
      heading: "Every brand gets its own namespace",
      paragraph:
        "Each customer operates under its own ENS name, managed through your platform's API integration. Tenants never share a namespace, and your customers present usernames as their feature.",
      names: [
        { label: "user", suffix: ".acmewallet.eth" },
        { label: "user", suffix: ".gamestudio.eth" },
        { label: "user", suffix: ".fintechapp.eth" },
        { label: "user", suffix: ".creatorhub.eth" },
      ],
    },
    pricing: {
      label: "Pricing",
      heading: "Free, funded by ENS DAO",
      paragraph:
        "Namespace is an ENS DAO-funded service provider: our services are free or subsidized. Offchain names are gasless and free at any volume, so naming a million wallets costs what naming one does.",
      figure: "$0",
      figureNote: "per wallet named, at any volume",
      rows: [
        { item: "Issuing names", value: "$0" },
        { item: "Resolving names", value: "$0" },
        { item: "Infrastructure & SLAs", value: "ENS DAO subsidized" },
      ],
    },
    steps: {
      heading: 'Three steps to "usernames included"',
      style: "cards",
      items: [
        {
          title: "Scope the platform integration",
          description:
            "We map naming onto your wallet-provisioning flow and your customer onboarding model.",
        },
        {
          title: "Add one call to provisioning",
          description:
            "Subname creation runs in the same backend flow that creates the wallet. Bulk operations cover existing wallets.",
        },
        {
          title: "Switch it on per customer",
          description:
            "Each brand on your platform enables usernames for its users. You own the feature; Namespace runs the infrastructure with SLAs.",
        },
      ],
    },
    stats: [
      { value: "1 call", label: "to name a wallet at provisioning" },
      { value: "$0", label: "per wallet named, any volume" },
      { value: ">850k", label: "subnames managed in production" },
      { value: "100%", label: "uptime, operated with SLAs" },
    ],
    testimonials: [T.joan, T.simon],
    faqs: [
      {
        question: "Can namespaces be isolated per customer?",
        answer:
          "Yes. Each customer brand operates under its own ENS name (user.theirbrand.eth) with its own namespace, managed through your platform's API integration. Tenants never share a namespace.",
      },
      {
        question: "What's the cost model at platform volume?",
        answer:
          "Free. Namespace is an ENS DAO-funded service provider, so its services are free or subsidized. There is no per-name or per-lookup cost to your platform or your customers, at any volume.",
      },
      {
        question: "Can we white-label this as our own feature?",
        answer:
          "Yes. The integration is API-level - your customers interact with your platform, not with Namespace. You present usernames as your feature; Namespace operates the infrastructure behind it.",
      },
      {
        question: "Can existing wallets be named retroactively?",
        answer:
          "Yes. The API supports bulk operations, so you can backfill names for existing wallets as well as assign them at creation.",
      },
      FAQ_TIMELINE,
      FAQ_LOCK_IN,
    ],
    finalCta: {
      heading: "Add the row competitors can't check",
      paragraph:
        "Talk to the team that builds identity into wallet infrastructure. We'll scope your platform integration on the call.",
      primary: {
        label: "Book a Discovery Call",
        href: BOOK_CALL,
        external: true,
      },
      secondary: { label: "Read the Docs", href: DOCS, external: true },
    },
  },

  /* ───────────────── 5. DECENTRALIZED WEBSITES ──────────────────── */
  {
    slug: "decentralized-websites",
    navLabel: "Decentralized Websites",
    heroName: "yourapp.eth",
    metaTitle: "Decentralized Websites on ENS - Unstoppable Frontends",
    metaDescription:
      "Deploy websites to ENS domains that no registrar can seize and no host can take down. Censorship-resistant frontends on ENS + IPFS, live at yourname.eth.",
    keywords: [
      "decentralized website",
      "ENS website",
      "IPFS hosting ENS",
      "censorship-resistant frontend",
      "eth.limo",
      "unstoppable frontend",
    ],
    voice: {
      needs:
        "A frontend that stays up - no registrar, host, or CDN able to take it down.",
      wants:
        "Our app reachable at a censorship-resistant domain, without becoming infrastructure experts.",
      fears:
        "A takedown notice, a DNS seizure, or a deplatformed host taking our product offline overnight - with nothing we can do about it.",
      desires:
        "A permanent home for the frontend: one name, verifiable content, unstoppable access.",
      triedAndHated:
        "Mirror domains that die one by one; 'decentralized' hosting that still hinges on one DNS record; IPFS setups that rot when the pinning stops.",
    },
    hero: {
      tag: "For Decentralized Websites",
      headline: "Websites that can't be taken down",
      subheadline:
        "Deploy your frontend to an ENS domain - no registrar to seize it, no host to deplatform it. Content lives on decentralized storage, resolves from yourname.eth, and stays up.",
      primaryCta: {
        label: "Book a Discovery Call",
        href: BOOK_CALL,
        external: true,
      },
      secondaryCta: { label: "Launch the App", href: APP, external: true },
    },
    howItWorks: {
      label: "How decentralized websites work",
      lead: "Your frontend lives at **yourapp.eth**: the ENS name's contenthash points to content on IPFS, and gateways like eth.limo serve it to any browser. No registrar controls the name and no single host serves the content, so there is no takedown lever to pull.",
      facts: [
        {
          title: "What you get",
          description: "A permanent address for your frontend that no one can seize.",
        },
        {
          title: "How long it takes",
          description: "One deploy: publish to IPFS, point the contenthash, live.",
        },
        {
          title: "What it costs",
          description: "Free or subsidized - Namespace is funded by the ENS DAO.",
        },
      ],
    },
    definition: {
      question: "What is a decentralized website?",
      answer:
        "An ENS domain paired with content on decentralized storage: the name's contenthash points to the site, and gateways serve it to any browser.",
    },
    definitionPoints: [
      {
        title: "No registrar to seize",
        description:
          "The ENS name is controlled by your keys, not a DNS registrar's compliance department.",
      },
      {
        title: "No host to take down",
        description:
          "Content lives on IPFS, served by whichever nodes pin it. No single party can pull it offline.",
      },
      {
        title: "Works in any browser",
        description:
          "Gateways like eth.limo serve the site to standard browsers. No wallet, extension or plugin required.",
      },
      {
        title: "A proven stack",
        description:
          "Namespace runs the naming layer, working with partners like PinMe and ETH.LIMO in the decentralized web.",
      },
    ],
    risks: {
      label: "Attack surface",
      heading: "Every kill switch, removed",
      theme: "dark",
      items: [
        {
          tag: "DNS seizure",
          title: "There is no registrar",
          description:
            "Court orders and compliance departments seize DNS domains every week. Your ENS name is controlled by your keys, and only your keys.",
          fix: "Nothing to seize.",
        },
        {
          tag: "Host takedown",
          title: "There is no host",
          description:
            "Content on IPFS is addressed by its hash and served by whichever nodes pin it, with partners like PinMe keeping it pinned permanently.",
          fix: "Nothing to unplug.",
        },
        {
          tag: "CDN deplatforming",
          title: "There is no gatekeeper",
          description:
            "Public gateways like eth.limo serve ENS websites to any browser, and anyone can run one. No single company sits between your users and your site.",
          fix: "Nothing to pressure.",
        },
      ],
    },
    terminal: {
      label: "Deploys",
      heading: "Ship like normal. Stay up forever.",
      paragraph:
        "Every deploy publishes your build to IPFS and updates the ENS contenthash through the Namespace API, as part of CI/CD. The name your users know never changes; the content behind it does.",
      cta: { label: "Read the PinMe Case Study", href: "/blog/case-study-pinme-forever-frontends" },
      windowLabel: "deploy log",
      lines: [
        { kind: "cmd", text: "npm run build" },
        { kind: "ok", text: "built in 1.2s" },
        { kind: "cmd", text: "deploy --target ipfs" },
        { kind: "ok", text: "pinned", accent: "bafybei…q2fe" },
        { kind: "ok", text: "contenthash updated", accent: "yourapp.eth" },
        { kind: "live", text: "live at yourapp.eth", note: "any browser via eth.limo" },
      ],
    },
    stats: [
      { value: "0", label: "parties able to take your site down" },
      { value: "100%", label: "uptime across 21M+ resolutions" },
      { value: "Any", label: "browser, via gateways like eth.limo" },
      { value: "1 name", label: "forever, however often you deploy" },
    ],
    pains: {
      heading: "Sound familiar?",
      items: [
        {
          question: "Could one takedown notice erase your frontend tonight?",
          detail:
            "DNS domains get seized. Hosts get subpoenaed. CDNs deplatform. Your protocol may be unstoppable onchain while its front door hangs on a single registrar's compliance department.",
        },
        {
          question: "Playing whack-a-mole with mirror domains?",
          detail:
            "app-v2.xyz, app-mirror.com, a Telegram pin with 'current working link' - every mirror is a new address users must trust, and phishers love the confusion. Resilience by mirror is a treadmill.",
        },
        {
          question: "Tried IPFS and watched it rot?",
          detail:
            "Self-managed IPFS means pinning that lapses, hashes that change with every deploy, and links that break silently. Content-addressing without naming and persistence isn't a website - it's a snapshot.",
        },
      ],
    },
    desire: {
      heading: "What a permanent frontend looks like",
      paragraph:
        "One name your users trust, content nobody can pull down, and deploys that update the name - not the URL.",
      bullets: [
        "Your app lives at yourname.eth - a domain no registrar can seize and no court order can quietly reroute.",
        "Content is verifiable by hash: users get exactly the frontend you deployed, not a tampered copy.",
        "Every deploy updates the ENS contenthash - the name stays constant while the site evolves.",
        "Accessible from any browser via gateways like eth.limo - no plugins required.",
      ],
    },
    solution: {
      heading: "How Namespace does it",
      paragraph:
        "Namespace is the naming layer of the decentralized-web stack - partnering with PinMe on Forever Frontends and trusted by the co-founders of ETH.LIMO.",
      features: [
        {
          title: "ENS domains done right",
          description:
            "Name setup, contenthash records, and resolution configured correctly - the naming half of the decentralized web, handled.",
        },
        {
          title: "Subnames for every deployment",
          description:
            "Issue app.yourname.eth, docs.yourname.eth, v2.yourname.eth - structured namespaces for staging, versions, and products.",
        },
        {
          title: "Gateway-accessible by default",
          description:
            "Sites resolve through public gateways like eth.limo, so any browser reaches them - decentralized doesn't mean niche.",
        },
        {
          title: "Managed records via API",
          description:
            "Update contenthash and records programmatically on every deploy - CI/CD for unstoppable frontends.",
        },
      ],
    },
    steps: {
      heading: "Live in three steps",
      items: [
        {
          title: "Set up your ENS name",
          description:
            "Configure yourname.eth (and subnames) on Namespace infrastructure.",
        },
        {
          title: "Deploy to decentralized storage",
          description:
            "Publish your site to IPFS - with partners like PinMe handling persistent pinning.",
        },
        {
          title: "Point the name at the content",
          description:
            "Set the contenthash and your site is live at yourname.eth - permanently, from any browser via eth.limo.",
        },
      ],
    },
    testimonials: [T.ted, T.ben],
    faqs: [
      {
        question: "Can users without a crypto wallet visit the site?",
        answer:
          "Yes. Gateways like eth.limo serve ENS websites to any standard browser (yourname.eth.limo) - no wallet, extension, or plugin required. Crypto-native browsers and wallets resolve the name natively.",
      },
      {
        question: "Who can take the site down?",
        answer:
          "No single party. The ENS name is controlled by your keys, not a registrar. Content on IPFS is served by whichever nodes pin it, not one host. Removing the site would require taking your keys and every pinned copy - there is no takedown lever.",
      },
      {
        question: "How do updates and deploys work?",
        answer:
          "Each deploy publishes new content to IPFS and updates the ENS contenthash record - programmatically, via API, as part of CI/CD. The name your users know never changes.",
      },
      {
        question: "Is this production-proven?",
        answer:
          "Yes. Namespace partners with PinMe on Forever Frontends - permanently pinned, ENS-addressed sites - and its infrastructure is trusted by teams like ETH.LIMO, the gateway serving much of the decentralized web today.",
      },
      FAQ_TIMELINE,
      FAQ_LOCK_IN,
    ],
    finalCta: {
      heading: "Give your frontend a permanent address",
      paragraph:
        "We'll scope your decentralized deployment on a call - naming, storage partners, and CI/CD integration.",
      primary: {
        label: "Book a Discovery Call",
        href: BOOK_CALL,
        external: true,
      },
      secondary: {
        label: "Read the Case Study",
        href: "/blog/case-study-pinme-forever-frontends",
      },
    },
  },

  /* ───────────────────────── 6. AI AGENTS ───────────────────────── */
  {
    slug: "ai-agents",
    navLabel: "AI agents",
    heroName: "agent.yourplatform.eth",
    metaTitle: "ENS Identity for AI Agents - ERC-8004 Names",
    metaDescription:
      "Give AI agents persistent, verifiable ENS identities - ERC-8004 compliant, multi-chain, resolvable everywhere. Named agents are agents you can trust, pay, and audit.",
    keywords: [
      "AI agent identity",
      "ERC-8004",
      "ENS AI agents",
      "agent naming",
      "onchain AI agents",
      "trusted AI agents",
      "agentic payments",
    ],
    voice: {
      needs:
        "Persistent, verifiable identities for agents that transact onchain - compliant with emerging standards like ERC-8004.",
      wants:
        "agent.ourplatform.eth for every agent we deploy - discoverable, auditable, recognizably ours.",
      fears:
        "Our agents are anonymous keys moving money. One spoofed agent, one unverifiable counterparty, and trust in the whole platform collapses.",
      desires:
        "An agent economy where every agent has a name, a record, and a reputation - and ours are the ones people recognize.",
      triedAndHated:
        "Proprietary agent registries nobody else resolves; spreadsheet inventories of agent keys; identity bolted on after the incident, not before.",
    },
    hero: {
      tag: "For AI Agents",
      headline: "Agents need names, not just keys",
      subheadline:
        "Give every AI agent a persistent, verifiable ENS identity - ERC-8004 compliant, multi-chain, resolvable across web3. Named agents can be discovered, verified, paid, and audited. Anonymous keys can't.",
      primaryCta: {
        label: "Book a Discovery Call",
        href: BOOK_CALL,
        external: true,
      },
      secondaryCta: {
        label: "Join the ENS x AI Group",
        href: "https://t.me/ensxai",
        external: true,
      },
    },
    howItWorks: {
      label: "How agent identity works",
      lead: "Agents get persistent, verifiable names - **agent.yourplatform.eth** - with addresses, metadata and service endpoints stored on the name, aligned with ERC-8004. Counterparties resolve the name to verify an agent before trusting or paying it, on any chain ENS reaches.",
      facts: [
        {
          title: "What you get",
          description: "A verifiable identity for every agent, discoverable across web3.",
        },
        {
          title: "How long it takes",
          description: "One SDK call per agent, in the same flow that creates its keys.",
        },
        {
          title: "What it costs",
          description: "Free at any volume, funded by the ENS DAO.",
        },
      ],
    },
    definition: {
      question: "What is ENS identity for AI agents?",
      answer:
        "Each agent gets a persistent, human-readable name - like agent.yourplatform.eth - backed by verifiable onchain records.",
    },
    definitionPoints: [
      {
        title: "ERC-8004 aligned",
        description:
          "Built to the emerging Ethereum standard for trustless agent identity, not a proprietary registry.",
      },
      {
        title: "Verifiable records",
        description:
          "Addresses, metadata and service endpoints live on the agent's name for counterparties to check before trusting or paying it.",
      },
      {
        title: "Anchored across chains",
        description:
          "One identity that resolves anywhere ENS does, surviving key rotations and redeployments.",
      },
      {
        title: "Issued at fleet scale",
        description:
          "Create and manage agent identities programmatically via SDK and API, gasless at any volume.",
      },
    ],
    versus: {
      label: "The difference a name makes",
      heading: "Two agents ask for $500. Which do you pay?",
      cards: [
        {
          tag: "Anonymous key",
          value: "0x8c1f…a04b",
          description:
            "No operator, no history, no way to tell it from an impostor. Any key can claim to be your trading agent, your support bot, your payment router.",
          verdict: "Trust is a guess.",
        },
        {
          tag: "Named agent",
          value: "agent.yourplatform.eth",
          description:
            "Operator, addresses, metadata and service endpoints on a name anyone can resolve, registered under ERC-8004, persistent across key rotations.",
          verdict: "Trust is a lookup.",
        },
      ],
    },
    risks: {
      label: "The record",
      heading: "Everything a counterparty needs to check",
      theme: "dark",
      items: [
        {
          tag: "Addresses",
          title: "Multi-chain by default",
          description:
            "One name resolves to the right address on the right chain, across 100+ chains. Payments to agents stop depending on pasted hex.",
        },
        {
          tag: "Metadata",
          title: "Operator, policy, provenance",
          description:
            "Text records carry who runs the agent and under what rules, readable through standard ENS tooling everywhere.",
        },
        {
          tag: "Endpoints",
          title: "Where to reach it",
          description:
            "Service endpoints live on the name, so agents can discover and talk to each other without a proprietary registry in the middle.",
        },
      ],
    },
    splitStats: {
      label: "Fleet scale",
      heading: "Name agents as you deploy them",
      paragraph:
        "One SDK call per agent, in the same flow that creates its keys. Gasless offchain issuance means naming ten thousand agents costs nothing, and identities survive key rotations and redeployments: records update, the name endures.",
      cta: { label: "Read the Docs", href: DOCS, external: true },
      stats: [
        { value: "850k+", label: "names on the same infrastructure" },
        { value: "$0", label: "per agent named, at any volume" },
        { value: "100+", label: "chains where identity resolves" },
        { value: "ERC-8004", label: "aligned with the agent standard" },
      ],
    },
    pains: {
      heading: "Sound familiar?",
      items: [
        {
          question: "Are your agents just anonymous keys moving money?",
          detail:
            "Agents sign transactions, hold funds, and negotiate with counterparties - identified by nothing but a hex address. No name, no metadata, no way for anyone (including you) to tell one agent from another at a glance.",
        },
        {
          question: "What happens when someone spoofs one of your agents?",
          detail:
            "Without verifiable identity, any key can claim to be your trading agent, your support bot, your payment router. One convincing impostor and the question every user asks becomes 'how do I know this agent is real?'",
        },
        {
          question: "Built an agent registry that only you can read?",
          detail:
            "An internal database of agent keys works - inside your platform. The agent economy is cross-platform by definition: your agents transact with agents and apps you don't control. Identity that isn't a shared standard isn't identity.",
        },
      ],
    },
    desire: {
      heading: "What a trusted agent fleet looks like",
      paragraph:
        "Every agent you deploy is discoverable by name, verifiable by anyone, and accountable by design.",
      bullets: [
        "Each agent gets agent.yourplatform.eth - persistent identity that survives key rotations and redeployments.",
        "Counterparties verify an agent's records before trusting it - identity resolves anywhere ENS does.",
        "ERC-8004 alignment means your agents plug into the emerging trust layer, not a proprietary silo.",
        "Your platform's name is on every agent - visibly, verifiably - turning trust into brand.",
      ],
    },
    solution: {
      heading: "How Namespace does it",
      paragraph:
        "Namespace builds agent naming on the same infrastructure that runs 850k+ subnames in production - and convenes the ENS x AI working group.",
      features: [
        {
          title: "ERC-8004-compliant identities",
          description:
            "Persistent, multi-chain ENS identities aligned with the emerging standard for trustless agent registration and verification.",
        },
        {
          title: "Programmatic issuance at fleet scale",
          description:
            "Name agents at deployment via SDK or API - gasless offchain issuance means naming ten thousand agents costs nothing.",
        },
        {
          title: "Rich, verifiable records",
          description:
            "Store addresses, metadata, and service endpoints on the agent's name - the data counterparties need to verify and interact with it.",
        },
        {
          title: "Cross-platform by default",
          description:
            "Agent names resolve across 100+ chains and 1,000+ apps - identity that works in the open agent economy, not just your walled garden.",
        },
      ],
    },
    steps: {
      heading: "Live in three steps",
      items: [
        {
          title: "Claim your agent namespace",
          description:
            "Point yourplatform.eth at Namespace infrastructure as the root for your agent fleet.",
        },
        {
          title: "Name agents at deployment",
          description:
            "One SDK call per agent - identity created alongside the agent's keys.",
        },
        {
          title: "Let the ecosystem verify",
          description:
            "Counterparties resolve and verify your agents anywhere ENS works. Audit trails come free with named actors.",
        },
      ],
      code: SDK_SNIPPET,
      codeLabel: "Name an agent at deployment",
    },
    stats: [
      { value: ">850k", label: "names on the same infrastructure" },
      { value: "$0", label: "per agent named, gasless at fleet scale" },
      { value: "100+", label: "chains where agent identity resolves" },
      { value: "ERC-8004", label: "aligned with the agent identity standard" },
    ],
    testimonials: [T.simon, T.brantly],
    faqs: [
      {
        question: "What is ERC-8004?",
        answer:
          "ERC-8004 is an emerging Ethereum standard for trustless AI agent identity - giving agents onchain registrations that counterparties can discover and verify. Namespace issues ENS-based agent identities aligned with it, so agents carry standard, interoperable identity rather than proprietary IDs.",
      },
      {
        question: "What survives when an agent's keys rotate?",
        answer:
          "The name. An agent's ENS identity persists across key rotations, redeployments, and infrastructure moves - records update, the identity endures. That persistence is what makes reputation possible.",
      },
      {
        question: "What can be stored on an agent's name?",
        answer:
          "Multi-chain addresses, text records for metadata (operator, model, policy), and service endpoints. Everything a counterparty needs to verify what the agent is and how to interact with it - resolvable through standard ENS tooling.",
      },
      {
        question: "Does naming scale to large agent fleets?",
        answer:
          "Yes. Offchain issuance is gasless and free at any volume, and the API supports bulk operations. Namespace runs 850k+ subnames in production; fleets of agents are the same infrastructure pattern.",
      },
      FAQ_TIMELINE,
      FAQ_LOCK_IN,
    ],
    finalCta: {
      heading: "Name your agents before you scale them",
      paragraph:
        "Talk to the team at the center of ENS x AI. We'll scope identity for your agent platform on the call.",
      primary: {
        label: "Book a Discovery Call",
        href: BOOK_CALL,
        external: true,
      },
      secondary: { label: "Read the Docs", href: DOCS, external: true },
    },
  },
];

export function getSolution(slug: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}

export function getAllSolutionSlugs(): string[] {
  return SOLUTIONS.map((s) => s.slug);
}
