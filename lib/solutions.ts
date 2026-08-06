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
  heroVisual?: "namecard" | "phone" | "sendflow" | "tree" | "browser" | "agent";
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
    items: { tag?: string; title: string; description: string; fix?: string; visual?: "chains" | "meta" | "endpoints" }[];
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
    cta2?: SolutionCta;
    quotes?: { quote: string; attribution: string; avatar?: string }[];
    stats?: { value: string; label: string }[];
    link?: { label: string; href: string };
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
  /** Optional standards trio (dark zone): tagged cards with record-key chips. */
  standards?: {
    label: string;
    heading: string;
    lead?: string;
    items: {
      tag: string;
      title: string;
      description: string;
      keys?: string[];
      link?: { label: string; href: string };
    }[];
  };
  /** Optional deliverables grid (dark zone, after the tree): compact 4-col cards. */
  deliver?: {
    label?: string;
    heading: string;
    lead?: string;
    /** Grid columns (default 4). */
    columns?: 2 | 4;
    /** "cards" (default), "list" (spec-sheet rows), "tiered", or "split" (products shelf + services ledger). */
    style?: "cards" | "list" | "tiered" | "split";
    items: {
      title: string;
      description: string;
      tag?: string;
      size?: "hero" | "medium";
      group?: "product" | "service";
      glyph?: string;
      hue?: string;
      logo?: string;
      /** Framed logos render inside a bordered white tile. */
      logoFramed?: boolean;
      visual?: "policies" | "mcpq" | "latency" | "codecomp" | "mintw" | "nsapp";
      chips?: string[];
      link?: { label: string; href: string };
      link2?: { label: string; href: string };
    }[];
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
    quote?: string;
    attribution?: string;
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
    /** Optional pipeline strip rendered above the grid. */
    flow?: {
      steps: { label: string; sub: string }[];
      caption?: string;
    };
    items: {
      title: string;
      description: string;
      visual?: "root" | "claimsite" | "registry" | "profile" | "verify" | "contracts" | "onboarding" | "revenue" | "brands" | "provision" | "whitelabel" | "bulk";
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
    lead?: string;
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
  testimonials?: SolutionTestimonial[];
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
      lead: "Wallets give every user a readable name - **alice.yourwallet.eth** - by issuing ENS subnames during onboarding. An ENS subname is what your users experience as their username. Namespace issues them offchain over CCIP-Read, so there are no contracts to deploy, no gas for the user and no limit on volume. The names resolve in 1,000+ ENS-enabled apps across 100+ chains, which removes address copy-paste errors and puts your brand in every transaction a user makes.",
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
      {
        question: "What is the difference between ENS names, subnames, and usernames?",
        answer:
          "They describe the same thing at different levels. An ENS name is any Ethereum Name Service identifier. A subname (or subdomain) is a name issued under a parent you control, like alice.yourwallet.eth. Username is simply what your product calls that subname when a user sees it. Namespace issues ENS subnames that your users experience as usernames.",
      },
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
      lead: "An L2 identity system is a chain-wide naming service for your chain built on ENS. Every user, builder, app, and contract gets a readable name under one root - **user.yourchain.eth**, or a DNS domain you already own, like **yourchain.id** - registered on your chain and resolvable everywhere. These names are ENS subnames, surfaced to your users as usernames. Namespace designs, builds, and operates the whole stack as an official ENS service provider: registrar and resolver contracts, CCIP-Read gateways, indexers, and the registration frontend. The names resolve across 100+ chains and in 1,000+ apps from day one, so your chain's identity is legible far outside its own ecosystem.",
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
      lead: "Fintechs and neobanks can give every customer a payable username - an ENS subname like **alice.yourbank.eth** or **alice.yourbank.id** - issued at signup. Instead of pasting a 42-character wallet address, the sender just types a name. Namespace creates these names through an API, with no gas cost and no contract deployment. One name holds address records for every chain you support, so it always resolves to the right address on the right chain before the money moves. The names are not locked to your app. They resolve in wallets, explorers, and other fintechs, so cross-app transfers happen without either side integrating the other.",
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
          ["L1 onchain", "Mainnet gas", "User-owned NFT, fully trustless", "Block time", "Flagship and institutional accounts"],
        ],
      },
      recommendedRow: 0,
    },
    caseStory: {
      tag: "Case study · Filecoin x Namespace",
      heading: "Payment usernames, live in production",
      points: [
        {
          label: "Situation.",
          body: "Filecoin wanted readable identities for sending and receiving - names people can type instead of addresses.",
        },
        {
          label: "Built.",
          body: "Filpay usernames on Namespace infrastructure: issuance, resolution, and multi-chain address records, operated as a multi-year partnership.",
        },
        {
          label: "Result.",
          body: "Usernames that resolve across the ENS ecosystem, on the same stack that serves 21M+ resolutions in production.",
        },
      ],
      ctaLabel: "Read our case studies",
      ctaHref: "/blog",
      visualName: "alice.filpay.eth",
    },
    proofStyle: "wall",
    ctaCards: {
      heading: "Send-flow live in days,\nnot quarters",
      subheading: "It's time to give your customers payable names.",
      cards: [
        {
          title: "Try it without code",
          description: "Issue your first usernames in minutes with the no-code app. No contracts, no gas.",
          button: { label: "Launch App", href: "https://app.namespace.ninja/" },
          image: "/assets/images/cta-decoration-2.svg",
          imageAlt: "Issue payable ENS usernames with no code required",
        },
        {
          title: "Build it into your app",
          description: "Add username claiming and send-flow resolution with a few lines of TypeScript.",
          button: { label: "Start Building Free", href: "https://docs.namespace.ninja/developer-guide/guide/create-offchain-subnames" },
          image: "/assets/images/cta-decoration-1.svg",
          imageAlt: "Build payable names with the Namespace SDK and API",
        },
        {
          title: "Partner with Namespace",
          description: "Custom features, white-glove integration, partner pricing. Let's scope your integration on the call.",
          button: { label: "Book a Discovery Call", href: "https://cal.com/thecap.eth/discovery" },
          image: "/assets/images/cta-decoration-3.svg",
          imageAlt: "Partner with Namespace for payable name infrastructure",
        },
      ],
    },
    deliver: {
      label: "What you get",
      heading: "What is included",
      columns: 2,
      items: [
        {
          title: "Subname API and SDK",
          description: "For issuance and record management.",
        },
        {
          title: "Resolvio",
          description: "Our resolution API, with bulk resolution and caching. Free, and self-hostable if your compliance team prefers it.",
        },
        {
          title: "ENS Components",
          description: "Drop-in React components for claim flows and profile editing.",
        },
        {
          title: "Multi-chain address records",
          description: "Under a single name.",
        },
        {
          title: "Reserved and blocked name lists",
          description: "To prevent impersonation of your brand, support staff, or well-known users.",
        },
        {
          title: "No-code dashboard",
          description: "For operations and support teams.",
        },
      ],
    },
    whyUs: {
      label: "Why Namespace",
      heading: "Why teams choose Namespace",
      lead: "Namespace is the ENS DAO-backed service provider.",
      tableCaption: "Build it yourself, or don't",
      table: {
        columns: ["", "In-house", "Namespace"],
        rows: [
          ["Issuance and resolution infra", "You build, audit and maintain", "Managed and monitored"],
          ["Uptime and monitoring", "Your on-call rotation", "Operated with SLAs"],
          ["Reserved and blocked name lists", "You write and enforce the policy", "Included and managed"],
          ["Standards work", "You track ENSIPs yourself", "Follow and actively contribute."],
          ["Engineering to production", "A quarter, realistically", "Days to weeks"],
          ["Subname expertise", "You start from zero", "Experts in offchain, L1, and L2 subnames"],
          ["Lock-in", "None, but you maintain it all", "None: exportable names, standard ENS records"],
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
        "Names pay for themselves in avoided losses and support tickets - and they open a revenue line. Fintechs price premium and short labels, earn on renewals, and turn usernames into a paid tier of their crypto features.",
      caseBullets: [
        "Fewer wrong-send losses and refund disputes",
        "Fewer 'did I send this right?' support tickets",
        "Premium and short labels, priced by you",
        "Named customers carry your brand into other apps",
      ],
      pricingHeading: "Our pricing, plainly",
      pricingParagraph:
        "If names are free for your customers, we charge nothing. We charge only on priced subnames and only earn when you do.",
      facts: [
        { value: "Free", label: "Offchain subnames and integration support" },
        { value: "5%", label: "On paid onchain mints through our infra" },
        { value: "5-10%", label: "On mints when we build your integration for free, routed to the ENS DAO" },
      ],
    },
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
          "Resolution is trustless and verifiable: offchain records are signed and verified onchain via CCIP-Read (EIP-3668), the same standard the broader ENS ecosystem relies on. Namespace has served 21M+ resolutions at 99.9% uptime and operates with SLAs.",
      },
      {
        question: "Do our customers need to know what ENS is?",
        answer:
          "No. To your customers it's just a username - they pick it at signup and pay people by name, like every other feature in your app. The ENS layer underneath is what makes that username work outside your app too.",
      },
      {
        question: "Can we use our own domain instead of a crypto name?",
        answer:
          "Yes. ENS supports DNS domains through DNSSEC integration, so usernames can live under yourbank.id or yourbank.com instead of a .eth name. World runs world.id usernames this way - 17 million of them. Your customers see your brand, not a crypto TLD.",
      },
      {
        question: "Does the recipient need a username too?",
        answer:
          "No. Your app can send to any raw address. Names are an improvement on both sides but a requirement on neither, so nothing breaks for users who do not have one.",
      },
      {
        question: "Does issuing names create custody or regulatory exposure?",
        answer:
          "Issuing a name does not hold, move, or create a claim on user funds. It is a naming and routing record. Your existing custody and transmission posture is unchanged. We are happy to walk your compliance team through the architecture.",
      },
      {
        question: "What happens to a user's name if they leave our app?",
        answer:
          "Offchain names remain under your namespace and you decide the policy. Onchain names are user-owned NFTs that travel with them. If you want names to be genuinely portable, issue onchain.",
      },
      {
        question: "Is the offchain database a privacy problem?",
        answer:
          "Offchain names are stored in a database we operate, containing the name, the address, and any records you set. It holds no more personal data than the public chain already does. It can also be self-hosted if you need the data inside your own perimeter.",
      },
      {
        question: "Can we import users who already have ENS names?",
        answer:
          "Yes. Read their existing primary name first and display it. Users often hold several names, and ENS handles that natively.",
      },
      {
        question: "What is the resolution latency on a send?",
        answer:
          "Resolvio caches aggressively and supports bulk resolution, so a send-flow lookup does not add perceptible delay. Contact lists and transaction histories can be resolved in batches rather than one call at a time.",
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
      headline: "Ship identity with every wallet you create",
      subheadline:
        "A branded ENS namespace for every customer on your platform, and a name for every wallet you provision - issued with the same call that creates the wallet.",
      primaryCta: {
        label: "Book a Discovery Call",
        href: BOOK_CALL,
        external: true,
      },
      secondaryCta: { label: "Read the Docs", href: DOCS, external: true },
    },
    howItWorks: {
      label: "How platform usernames work",
      lead: "Wallet-as-a-Service platforms can bundle ENS usernames into every wallet they provision, so each end user receives a readable name like **user.theirbrand.eth** - or **user.theirbrand.id**, under a DNS domain the customer already owns - at creation. Namespace provides the infrastructure behind it: a separate namespace for every customer brand, issuance through a single API, white-label management, and no smart contracts for you or your customers to deploy. The names are standard ENS records, so they resolve in every ENS-aware wallet and app rather than only inside the platform that issued them.",
      chips: [
        "A namespace for every brand",
        "One API call at wallet creation",
        "Fully white-label",
        "No contracts",
        "Works with any domain",
        "Free at any volume",
      ],
    },
    pains: {
      heading: "Embedded wallets are commoditized. Identity is not.",
      lead: "You win on developer experience, and a raw address is the worst part of the experience you ship.",
      style: "spotlight",
      items: [
        {
          question: "0x addresses are bad UX.",
          detail:
            "Every wallet you provision ships a 42-character string as its identity - the least human screen in the products your customers build, at the exact moment their users' activation is won or lost. Every major consumer wallet has moved past it: Uniswap has issued more than **2 million** [uni.eth usernames](https://blog.uniswap.org/introducing-uni-eth-your-unique-web3-username), Gemini gives every user a free [gemini.eth username](https://ens.domains/blog/post/gemini-smart-wallet), and Base has issued more than **2.7 million** [Basenames](https://www.base.org/names). Your customers' users expect the same.",
        },
        {
          question: "Addresses are a security liability.",
          detail:
            "Address poisoning attacks work by planting a lookalike address in a user's transaction history and waiting for a copy-paste. After Ethereum's Fusaka upgrade cut fees, dust transfers used for poisoning surged from about **20% to over 70%** of stablecoin transfer activity at the peak, [per Coin Metrics](https://coinmetrics.substack.com/p/state-of-the-network-issue-349). A single victim [lost 4,556 ETH](https://blockchain.news/flashnews/ethereum-security-alert-4-556-eth-lost-to-address-poisoning-mimicking-galaxy-digital-deposit-what-traders-need-to-know) in January 2026 to exactly this pattern. Every unnamed wallet you provision carries that surface into your customers' products.",
        },
        {
          question: "Differentiation moves up the stack.",
          detail:
            "Passkeys, social login, gas sponsorship, and smart accounts are now table stakes across the category, and the market is consolidating around a few large owners. When key management is a solved commodity, differentiation moves up the stack. Identity is the layer directly above it.",
        },
      ],
    },
    outcomes: {
      label: "In your product",
      heading: "How branded\nnamespaces work",
      columns: 2,
      items: [
        {
          title: "One namespace per customer",
          visual: "brands",
          description:
            "Your customer brings theirbrand.eth or a DNS domain they already own, or you provision one for them. Their users get user.theirbrand.eth. Their branding, not yours, and not ours.",
        },
        {
          title: "Issued at wallet creation",
          visual: "provision",
          description:
            "The same server-side call that creates the wallet issues the name and writes the address record. Your customers do not have to build a claim flow unless they want one.",
        },
        {
          title: "White-label management",
          visual: "whitelabel",
          description:
            "Namespace does not need to appear anywhere in your customer's experience. Reserved names, pricing, and policy are configurable per brand.",
        },
        {
          title: "Ready-made claim UI when they want it",
          visual: "onboarding",
          description:
            "ENS Components gives your customers a registration and profile-editing interface as React components, so a custom claim flow ships in hours instead of sprints.",
        },
        {
          title: "Bulk backfill for existing wallets",
          visual: "bulk",
          description:
            "The API supports bulk operations, so wallets you have already provisioned can be named retroactively.",
        },
        {
          title: "A feature you can price",
          visual: "revenue",
          description:
            "Identity becomes a line item in your plans rather than a support question.",
        },
      ],
    },
    howTo: {
      label: "How it works",
      heading: "How a WaaS platform integrates ENS",
      intro: "Three integration points, then a choice of what to offer your customers.",
      afterOutcomes: true,
      steps: [
        { title: "Brand setup", body: "Each customer's root name - .eth or a DNS domain they already own - is pointed at our resolver, once, at onboarding, through your admin dashboard." },
        { title: "Provision with the wallet", body: "One authenticated API call issues the subname and sets the address record." },
        { title: "Resolution is automatic", body: "Resolution follows [ERC-3668](https://eips.ethereum.org/EIPS/eip-3668) and [ENSIP-10](https://docs.ens.domains/ensip/10), which means every ENS-aware app already knows how to read your names. Nothing to integrate on either side." },
      ],
      tableCaption: "What to offer your customers",
      table: {
        columns: ["Mode", "Cost to you", "Silent provisioning", "End user owns it", "Best as"],
        rows: [
          ["Offchain", "Free at any volume", "Yes", "No", "The default in every plan"],
          ["Onchain L2", "Gas per mint", "Requires a user transaction", "Yes", "A premium tier you upsell"],
          ["Onchain L1", "Mainnet gas", "Requires a user transaction", "Yes, fully trustless", "Flagship customers and institutional accounts"],
        ],
      },
      recommendedRow: 0,
    },
    featureTable: {
      label: "Differentiation",
      heading: "The feature the others don't have",
      intro:
        "Key management, gas sponsorship, and social login are on every provider's pricing page. ENS usernames aren't - which makes them the easiest way to stop competing on price.",
      columns: ["Your platform", "Other WaaS"],
      rows: [
        { feature: "Key management", a: true, b: true },
        { feature: "Gas sponsorship", a: true, b: true },
        { feature: "Social login", a: true, b: true },
        { feature: "ENS usernames included", a: true, b: false, highlight: true },
      ],
    },
    tenants: {
      label: "One namespace per brand",
      heading: "Every brand gets its own namespace",
      paragraph:
        "Each customer operates under its own ENS name - or a DNS domain they already own - managed through your platform's API integration. Brands never share a namespace, and your customers present usernames as their feature.",
      names: [
        { label: "alice", suffix: ".acmewallet.eth" },
        { label: "bob", suffix: ".gamestudio.id" },
        { label: "carol", suffix: ".fintechapp.me" },
        { label: "dave", suffix: ".creatorhub.eth" },
      ],
    },
    deliver: {
      label: "What you get",
      heading: "What is included",
      columns: 2,
      items: [
        {
          title: "Per-brand API",
          description: "Separate namespaces, keys, and policy for every customer brand.",
        },
        {
          title: "TypeScript SDK and REST API",
          description: "LLM-friendly and documented for fast integration.",
        },
        {
          title: "White-label dashboard",
          description: "For managing your customer brands.",
        },
        {
          title: "Reserved and blocked name lists",
          description: "Per brand.",
        },
        {
          title: "Migration support",
          description: "POAP moved its existing naming system to Namespace with no downtime for users.",
        },
        {
          title: "Custom engineering",
          description: "When the standard tools do not fit your architecture, we build what does.",
        },
        {
          title: "ENS Components",
          description: "Optional - for customers who want their own claim UI.",
        },
        {
          title: "Resolvio",
          description: "Optional - resolution with bulk lookups and caching.",
        },
      ],
    },
    whyUs: {
      label: "Why Namespace",
      heading: "Why platforms choose Namespace",
      lead: "Namespace is the ENS DAO-backed service provider.",
      tableCaption: "Build it yourself, or don't",
      table: {
        columns: ["", "In-house", "Namespace"],
        rows: [
          ["Per-brand naming infra", "You build, audit and maintain", "Managed and monitored"],
          ["CCIP-Read gateway", "You run it, and its uptime is yours", "Managed and monitored"],
          ["Reserved-name policy per brand", "You write and enforce it", "Included and managed"],
          ["Standards work", "You track ENSIPs yourself", "Follow and actively contribute."],
          ["Engineering to production", "Quarters, multiplied by every brand", "One to two weeks"],
          ["Subname expertise", "You start from zero", "Experts in offchain, L1, and L2 subnames"],
          ["Lock-in", "None, but you maintain it all", "None: roots stay with your customers, standard ENS records"],
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
        "Include offchain names in every plan to close feature-parity gaps in your sales cycle. Sell onchain names, premium tiers, and custom namespaces as upsells - your customers price names to their own users and keep that revenue.",
      caseBullets: [
        "'Usernames included' in every plan",
        "Onchain and premium names as paid tiers",
        "Your customers keep their name revenue",
        "Revenue share negotiable for platform partners",
      ],
      pricingHeading: "Our pricing, plainly",
      pricingParagraph:
        "If names are free for end users, we charge nothing. We charge only on priced subnames and only earn when your customers do.",
      facts: [
        { value: "Free", label: "Offchain subnames at platform volume" },
        { value: "5%", label: "On paid onchain mints through our infra" },
        { value: "5-10%", label: "On mints when we build your integration for free, routed to the ENS DAO" },
      ],
    },
    proofStyle: "wall",
    ctaCards: {
      heading: "Usernames included,\nlive in two weeks",
      subheading: "It's time to ship identity with every wallet.",
      cards: [
        {
          title: "Try it without code",
          description: "Issue your first usernames in minutes with the no-code app. No contracts, no gas.",
          button: { label: "Launch App", href: "https://app.namespace.ninja/" },
          image: "/assets/images/cta-decoration-2.svg",
          imageAlt: "Issue ENS usernames with no code required",
        },
        {
          title: "Build it into your platform",
          description: "Add per-brand name provisioning with a few lines of TypeScript.",
          button: { label: "Start Building Free", href: "https://docs.namespace.ninja/developer-guide/guide/create-offchain-subnames" },
          image: "/assets/images/cta-decoration-1.svg",
          imageAlt: "Build platform usernames with the Namespace SDK and API",
        },
        {
          title: "Partner with Namespace",
          description: "Custom features, white-glove integration, partner pricing. Let's scope your integration on the call.",
          button: { label: "Book a Discovery Call", href: "https://cal.com/thecap.eth/discovery" },
          image: "/assets/images/cta-decoration-3.svg",
          imageAlt: "Partner with Namespace for platform identity",
        },
      ],
    },
    faqs: [
      {
        question: "How are customer brands kept separate?",
        answer:
          "Each customer has its own root name, its own namespace, and its own policy configuration. Issuance is scoped per brand through your API key. Brands are isolated from each other and never share a namespace.",
      },
      {
        question: "Can our customers use their existing domain instead of a .eth name?",
        answer:
          "Yes. ENS supports DNS domains through DNSSEC integration, so a customer's usernames can live under theirbrand.id or theirbrand.com instead of a .eth name. World runs world.id usernames this way - 17 million of them. The feature ships under the domain your customer already markets.",
      },
      {
        question: "Who owns the names, us or our customer?",
        answer:
          "Your customer owns their root name. We recommend it stays with them rather than with you, because it makes the offer easier to sell and easier to leave, which counterintuitively makes it easier to keep.",
      },
      {
        question: "Can we white-label this as our own feature?",
        answer:
          "Yes. The integration is API-level - your customers interact with your platform, not with Namespace. You present usernames as your feature; Namespace operates the infrastructure behind it.",
      },
      {
        question: "What's the cost model at platform volume?",
        answer:
          "Offchain issuance and resolution are free at any volume - Namespace is an ENS DAO-funded service provider. If your customers charge for names, our standard fee is 5% of paid mints only, and revenue share for platform partners is negotiable.",
      },
      {
        question: "Does it scale?",
        answer:
          "We manage more than 850,000 subnames today and have served over 21 million resolution requests. Offchain issuance has no per-name cost and no practical volume ceiling.",
      },
      {
        question: "Can existing wallets be named retroactively?",
        answer:
          "Yes. The API supports bulk operations, so you can backfill names for existing wallets as well as assign them at creation.",
      },
      {
        question: "Can our customers migrate an existing username system?",
        answer:
          "Yes. POAP did exactly this, moving its naming infrastructure to Namespace without downtime for users. We scope migrations individually.",
      },
      {
        question: "What happens if a customer leaves our platform?",
        answer:
          "Their root name and records are theirs. This is not a lock-in mechanism, and pretending otherwise would make the feature harder to sell in the first place.",
      },
      {
        question: "Do we need to deploy contracts?",
        answer:
          "No, not for offchain names. Onchain issuance uses already-deployed audited contracts.",
      },
      FAQ_TIMELINE,
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
    heroName: "yourapp.eth.limo",
    heroVisual: "browser",
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
        "Publish to an ENS domain and IPFS instead of a DNS registrar and a server. No hosting account, no nameservers, no registrar that can be phished into pointing your users somewhere else.",
      primaryCta: { label: "Deploy a Site", href: APP, external: true },
      secondaryCta: { label: "Read the Docs", href: DOCS, external: true },
    },
    howItWorks: {
      label: "How ENS websites work",
      lead: "A decentralized website is a site whose content is stored on IPFS and whose address is an ENS domain rather than a DNS domain. The site's content hash is written to the ENS domain's contenthash record - **yourapp.eth** points at a cryptographic hash of the exact content - and visitors reach it through ENS-aware browsers or gateways such as eth.limo. Because there is no registrar, nameserver, or hosting account in the path, the site cannot be redirected by a DNS hijack or removed by a hosting provider. Namespace provides the ENS subname and record infrastructure that makes this practical at scale.",
      chips: [
        "No DNS",
        "No server",
        "Content-addressed and verifiable",
        "Resolves through eth.limo",
        "Free subnames",
      ],
    },
    pains: {
      heading: "Why frontends are\nthe weakest link in web3",
      style: "spotlight",
      items: [
        {
          question: "Contracts live forever. Interfaces do not.",
          detail:
            "Protocols are credibly neutral and permissionless at the contract layer, and then they are served to users through a registrar account and a hosting provider. When the team moves on or the grant money runs out, the site quietly disappears. The contracts keep running. Nobody can reach them.",
        },
        {
          question: "DNS is a live attack surface.",
          detail:
            "Curve Finance had its curve.fi domain [hijacked at the registrar level in May 2025](https://news.curve.finance/curve-domain-incident/), redirecting users to a decoy site that existed only to harvest wallet signatures. The smart contracts were never touched. Curve had already suffered [DNS hijacks in 2022 and 2024](https://threesigma.xyz/blog/exploit/defi-front-end-exploits), and after the 2025 incident the team [moved domains and pushed users toward ENS](https://crypto.news/curve-finance-confirms-migration-to-new-domain-after-dns-hijack/). [Arrakis Finance was hit the same way](https://threesigma.xyz/blog/exploit/defi-front-end-exploits) in January 2025. This is not a rare failure mode. It is a recurring one.",
        },
        {
          question: "Deplatforming is one policy decision away.",
          detail:
            "Your registrar, your DNS provider, and your host are three separate companies, each of which can be compelled or convinced to disconnect you. That has [already happened to crypto interfaces](https://en.wikipedia.org/wiki/Tornado_Cash) - Tornado Cash's web domain and GitHub repositories were taken down within hours of the 2022 sanctions announcement.",
        },
        {
          question: "Users cannot verify they are on the real site.",
          detail:
            "A DNS name resolves to whatever the current record says. A contenthash resolves to a cryptographic hash of the exact content. One of those is verifiable and one is a promise.",
        },
      ],
    },
    outcomes: {
      label: "In your product",
      heading: "How ENS websites work",
      columns: 3,
      flow: {
        steps: [
          { label: "./build", sub: "your files" },
          { label: "bafybei\u2026q2fe", sub: "IPFS content ID" },
          { label: "yourapp.eth", sub: "contenthash, onchain" },
          { label: "yourapp.eth.limo", sub: "any browser" },
        ],
        caption:
          "Content-addressed end to end: change one byte and it is a different CID. The record is controlled only by the domain's owner.",
      },
      items: [
        {
          title: "Subnames give you a whole site structure",
          description:
            "docs.yourapp.eth, app.yourapp.eth, blog.yourapp.eth, all under one domain you own, each with its own contenthash.",
        },
        {
          title: "Updating is a record change",
          description:
            "Deploy new content, write the new hash, done. No cache invalidation across a CDN, no nameserver propagation.",
        },
        {
          title: "Keep your DNS domain too",
          description:
            "Run both. Many teams keep the DNS domain for reach and publish the ENS version as the canonical, verifiable, unkillable copy.",
        },
      ],
    },
    howTo: {
      label: "How it works",
      heading: "How to publish a website to ENS",
      intro: "Three steps, then an honest comparison.",
      afterOutcomes: true,
      steps: [
        { title: "Get a domain", body: "A .eth domain you own, or a subname under one you already have. Issue subnames for each site or environment." },
        { title: "Pin your build to IPFS", body: "Any pinning service works. PinMe reduces this to a single command: pinme upload ./build-folder." },
        { title: "Write the contenthash and share the link", body: "Set the EIP-1577 contenthash record on the domain, through the Namespace app, the SDK, or the API. yourapp.eth.limo works immediately, everywhere." },
      ],
      tableCaption: "ENS hosting versus DNS hosting",
      table: {
        columns: ["", "DNS + hosting", "ENS + IPFS"],
        rows: [
          ["Can be hijacked at the registrar", "Yes", "No registrar involved"],
          ["Can be taken down by a host", "Yes", "No host involved"],
          ["Content is verifiable by the visitor", "No", "Yes, content-addressed"],
          ["Renewal risk", "Domain expiry loses everything", "ENS domain renewal, records persist"],
          ["Works in every browser unmodified", "Yes", "Through a gateway such as eth.limo"],
          ["Dynamic server-side rendering", "Yes", "No, static content only"],
        ],
      },
    },
    risks: {
      label: "Attack surface",
      heading: "Every kill switch, removed",
      theme: "dark",
      items: [
        {
          tag: "DNS seizure",
          title: "There is no registrar",
          description:
            "Court orders and compliance departments seize DNS domains every week. Your ENS domain is controlled by your keys, and only your keys.",
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
      label: "PinMe × Namespace",
      heading: "Or use PinMe",
      paragraph:
        "One command does all three steps: pins your build, sets the contenthash, hands you the link. PinMe is built on Namespace infrastructure and free to use.",
      cta: { label: "Visit PinMe", href: "https://pinme.eth.limo", external: true },
      cta2: { label: "View on GitHub", href: "https://github.com/glitternetwork/pinme", external: true },
      quotes: [
        {
          quote:
            "Namespace has been a core partner for PinMe. Their APIs are extremely easy to use, their subdomain infrastructure is stable and built for the long term.",
          attribution: "Ted - Co-founder of PinMe",
          avatar: "/assets/images/testimonial-ted.jpg",
        },
        {
          quote:
            "Namespace has quickly become the go-to platform for managing ENS subnames. What was once confusing and error-prone is now a streamlined, intuitive experience.",
          attribution: "Ben - Co-founder of ETH.LIMO",
          avatar: "/assets/images/testimonial-ben.avif",
        },
      ],
      stats: [
        { value: "815k+", label: "Deployments" },
        { value: "2.6M+", label: "Monthly requests via eth.limo" },
      ],
      link: { label: "Read the full case study", href: "/blog/case-study-pinme-forever-frontends" },
      windowLabel: "pinme",
      lines: [
        { kind: "cmd", text: "npm install -g pinme" },
        { kind: "cmd", text: "pinme upload ./dist" },
        { kind: "ok", text: "pinned", accent: "bafybei\u2026q2fe" },
        { kind: "live", text: "live at", accent: "yoursite.pinit.eth.limo" },
      ],
    },
    deliver: {
      label: "What you get",
      heading: "What is included",
      style: "list",
      items: [
        {
          title: "Subname issuance",
          description: "For site structure, at any scale - free offchain, or onchain for full ownership.",
        },
        {
          title: "Contenthash record management",
          description: "Through the app, SDK, or API.",
        },
        {
          title: "API-driven deploys",
          description: "Fit publishing into CI/CD, so it is part of your pipeline rather than a manual step.",
        },
        {
          title: "One-command deploys",
          description: "Build your own single-command deployment service on our issuance and record APIs.",
        },
        {
          title: "Permanent pinning",
          description: "Implemented from your ENS domain, so your content stays available and your site does not rot.",
        },
      ],
    },
    whyUs: {
      label: "Why Namespace",
      heading: "Why builders choose Namespace",
      lead: "Namespace is the ENS DAO-backed service provider, and our infrastructure is behind the largest deployment of ENS contenthash records to date.",
      tableCaption: "Build it yourself, or don't",
      table: {
        columns: ["", "In-house", "Namespace"],
        rows: [
          ["Contenthash and record infra", "You build, audit and maintain", "Managed and monitored"],
          ["Subname issuance at scale", "Your own registrar stack", "One API call"],
          ["Pinning and persistence", "You babysit IPFS nodes", "Handled through our infrastructure and partners"],
          ["Standards work", "You track ENSIPs and EIP-1577 yourself", "Follow and actively contribute."],
          ["Engineering to production", "Weeks of plumbing", "Minutes for a site, days for CI/CD"],
          ["Subname expertise", "You start from zero", "Experts in offchain, L1, and L2 subnames"],
          ["Lock-in", "None, but you maintain it all", "None: your root domain stays yours, records are standard ENS and exportable, and onchain names keep resolving without us"],
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
        "A frontend that cannot be seized is an insurance policy for your protocol - and a namespace others can publish under is a product.",
      caseBullets: [
        "A canonical, verifiable copy of your frontend",
        "Community publishing under your namespace",
        "Price registrations if you want a revenue line",
      ],
      pricingHeading: "Our pricing, plainly",
      pricingParagraph:
        "If publishing under your domain is free, we charge nothing. We charge only on priced subnames and only earn when you do.",
      facts: [
        { value: "Free", label: "Offchain subnames and contenthash records" },
        { value: "5%", label: "On paid onchain mints through our infra" },
        { value: "5-10%", label: "On mints when we build your integration for free, routed to the ENS DAO" },
      ],
    },
    proofStyle: "wall",
    ctaCards: {
      heading: "A site in minutes,\na pipeline in days",
      subheading: "It's time to make your frontend permanent.",
      cards: [
        {
          title: "Deploy a site now",
          description: "Issue a domain and set the contenthash from the no-code app in minutes.",
          button: { label: "Launch App", href: "https://app.namespace.ninja/" },
          image: "/assets/images/cta-decoration-2.svg",
          imageAlt: "Deploy a decentralized website on ENS with no code",
        },
        {
          title: "Automate it in CI",
          description: "Publish to IPFS and update the contenthash on every deploy via the API.",
          button: { label: "Read the Docs", href: "https://docs.namespace.ninja/" },
          image: "/assets/images/cta-decoration-1.svg",
          imageAlt: "Automate ENS website deploys with the Namespace API",
        },
        {
          title: "Publishing at scale",
          description: "Custom features, white-glove integration, partner pricing. Let's scope it on a call.",
          button: { label: "Book a Call", href: "https://cal.com/thecap.eth/discovery" },
          image: "/assets/images/cta-decoration-3.svg",
          imageAlt: "Partner with Namespace for publishing at scale",
        },
      ],
    },
    faqs: [
      {
        question: "How do normal users open a .eth website?",
        answer:
          "Append .limo. yourapp.eth.limo loads in any browser with no extension and no configuration. Brave and some other browsers resolve .eth natively. eth.link is an alternative gateway.",
      },
      {
        question: "Do visitors need a wallet or an extension?",
        answer:
          "No. Gateways handle resolution server-side, so a visitor with no crypto knowledge and no wallet can read the site normally.",
      },
      {
        question: "Who keeps the content online?",
        answer:
          "IPFS content stays available as long as at least one node pins it. Use a pinning service, run your own node, or use a tool like PinMe that pins for you. Filecoin adds incentivized long-term persistence.",
      },
      {
        question: "How do I update the site?",
        answer:
          "Deploy new content, get a new content identifier, and write it to the contenthash record. The domain stays the same. There is no propagation delay of the kind DNS has.",
      },
      {
        question: "Can I use my existing DNS domain too?",
        answer:
          "Yes. Run both. Many teams keep the DNS domain for reach and publish the ENS version as the canonical, verifiable, unkillable copy. Curve moved to a new DNS domain after its hijack and simultaneously pushed users toward ENS access.",
      },
      {
        question: "Do .eth sites get indexed by search engines?",
        answer:
          "Gateway URLs such as yourapp.eth.limo are ordinary HTTPS URLs and can be crawled and indexed. Treat the gateway URL as your canonical for SEO purposes and make sure the content is rendered server-side or statically.",
      },
      {
        question: "What does it cost?",
        answer:
          "Offchain subnames are free to issue. An ENS domain registration costs gas plus the ENS registration fee. Pinning costs depend on your provider, and many tiers are free at small scale.",
      },
      {
        question: "What are the limitations?",
        answer:
          "Content must be static. There is no server-side rendering, no backend, and no dynamic API in the same origin. Most web3 frontends are static builds that call contracts and APIs from the client, which is exactly what this suits.",
      },
      {
        question: "Is this actually censorship-resistant, or just harder to censor?",
        answer:
          "Gateways can be blocked, which is why multiple gateways exist and why ENS-native browser resolution matters. The content itself and the pointer to it cannot be altered by anyone but the domain owner. That is a meaningfully different threat model from a registrar that can be phished.",
      },
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
    heroVisual: "agent",
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
      tag: "Names for AI Agents",
      headline: "Names and identities for AI agents",
      subheadline:
        "Give every AI agent a persistent, verifiable ENS identity - ERC-8004 compliant, multi-chain, resolvable across web3. Named agents can be discovered, verified, paid, and audited.",
      primaryCta: {
        label: "Book a Call",
        href: BOOK_CALL,
        external: true,
      },
      secondaryCta: {
        label: "Join ENS x AI group",
        href: "https://t.me/ensxai",
        external: true,
      },
    },
    howItWorks: {
      label: "How agent identity works",
      lead: "AI agents need identity for the same reason businesses do: counterparties must know who they are dealing with before they transact. An ENS name gives an agent a readable, permanent identifier like **agent.yourplatform.eth**, with records for its owner, its endpoint, its capabilities, and its wallet address. ERC-8004, the Trustless Agents standard, adds three onchain registries for identity, reputation, and validation. Namespace builds the naming and smart account infrastructure that makes agent identity usable in production.",
      chips: [
        "ERC-8004 compatible",
        "Portable across platforms",
        "Verifiable ownership",
        "Wallet included",
        "Free at any volume",
      ],
    },
    pains: {
      heading: "Agents transact, and nobody can tell which one did",
      lead: "The identity layer agents need already exists. It just has not been pointed at them yet.",
      style: "spotlight",
      items: [
        {
          question: "An agent with no identity is an address with no history.",
          detail:
            "When an agent calls another agent, there is nothing to check. No owner, no capabilities, no track record, no way to tell a legitimate service from an impersonator using a similar-looking address.",
        },
        {
          question: "The industry still authenticates agents with shared secrets.",
          detail:
            "A February 2026 survey by Strata Identity and the Cloud Security Alliance found that only **23%** of organizations had a formal agent identity management strategy, **45.6%** were still using shared API keys for agent authentication, and only **21.9%** treated agents as independent identity-bearing entities. Shared API keys do not survive contact with agents that hold funds.",
        },
        {
          question: "Reputation does not travel and discovery does not exist.",
          detail:
            "An agent that has performed well on one platform arrives at the next one with nothing. Without a portable identifier, every reputation system is a silo, and every agent starts from zero forever. There is no directory. If your agent can do something useful, there is no canonical place for another agent to find that out and verify it.",
        },
        {
          question: "Payments amplify all of the above.",
          detail:
            "Agents are starting to hold and move funds. The moment money is involved, 'which agent is this and who is responsible for it' stops being a design question and becomes a liability question.",
        },
      ],
    },
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
        "Issue a name with the same call that creates the agent's keys. Offchain issuance is gasless and free at any volume, and when you rotate keys or redeploy, you update the records - the name stays the same.",
      cta: { label: "Read the Docs", href: DOCS, external: true },
      stats: [
        { value: "850k+", label: "names on the same infrastructure" },
        { value: "$0", label: "per agent named, at any volume" },
        { value: "100+", label: "chains where identity resolves" },
        { value: "ERC-8004", label: "aligned with the agent standard" },
      ],
    },
    howTo: {
      label: "How it works",
      heading: "How ENS and ERC-8004 fit together",
      intro: "Name the agent, write the records, register it - then any counterparty can verify before transacting.",
      afterOutcomes: true,
      steps: [
        { title: "Name the agent", body: "Issue agent.yourplatform.eth programmatically as you deploy - one API call per agent, in the same flow that creates its keys." },
        { title: "Write the records", body: "Owner, endpoint, capabilities, wallet address, and a pointer to the ERC-8004 registration file." },
        { title: "Register in ERC-8004", body: "Mint the identity token and point its URI at the registration file. Counterparties resolve the name, read the records, and check the registry before transacting." },
      ],
      tableCaption: "What each layer provides",
      table: {
        columns: ["", "ENS", "ERC-8004"],
        rows: [
          ["Human-readable identifier", "Yes", "Token ID only"],
          ["Resolves in existing wallets and apps", "Yes, 1,000+ today", "No"],
          ["Onchain identity registry", "Records on the name", "Yes, ERC-721 registry"],
          ["Portable reputation", "Via records", "Yes, Reputation Registry"],
          ["Validation hooks", "No", "Yes, Validation Registry"],
        ],
      },
    },
    standards: {
      label: "Standards",
      heading: "The standards behind agent identity",
      lead: "Agent identity on ENS is being standardized in the open.",
      items: [
        {
          tag: "ENSIP-25",
          title: "Registry verification",
          description:
            "A standard text record that attests an ENS name controls a specific agent registered onchain - in ERC-8004 or any other registry. Wallets and apps check the record and show a verified agent instead of trusting a claim.",
          keys: ["agent-registration[registry][agentId]"],
          link: { label: "Read the spec", href: "https://docs.ens.domains/ensip/25/" },
        },
        {
          tag: "ENSIP-26",
          title: "Agent text records",
          description:
            "Standard records that describe an agent and how to reach it - MCP, A2A, or web endpoints - so one name is the discovery and connection point for an agent across chains. Merged and live in production.",
          keys: ["agent-context", "agent-endpoint[mcp]"],
          link: { label: "Read the spec", href: "https://docs.ens.domains/ensip/26/" },
        },
        {
          tag: "Node metadata",
          title: "Typed metadata for ENS nodes",
          description:
            "An ENS-sponsored standard in development for attaching structured, typed records - roles, categories, labels - directly to ENS nodes, so agent capabilities become machine-readable instead of freeform text.",
          keys: ["typed records, schemas on IPFS"],
          link: { label: "Read the write-up", href: "https://lighthouse.cx/writing/260414-ens-metadata" },
        },
      ],
    },
    deliver: {
      label: "What you get",
      heading: "What is included",
      style: "split",
      items: [
        {
          title: "Namera",
          tag: "By Namespace",
          group: "product",
          logo: "/assets/images/namera-logo.png",
          description:
            "Programmable permission infrastructure for autonomous agents. Smart accounts, scoped session keys, and policies define exactly what your agents can do onchain.",
          link: { label: "Visit namera.ai", href: "https://namera.ai" },
        },
        {
          title: "ENS MCP",
          group: "product",
          logo: "/assets/images/ens-mark-Blue.svg",
          logoFramed: true,
          description: "Your models query ENS in natural language, over the Model Context Protocol.",
          link: { label: "GitHub", href: "https://github.com/thenamespace/ens-mcp" },
        },
        {
          title: "Namespace App",
          group: "product",
          logo: "/assets/images/favicon-128.png",
          description: "No-code namespace management - create namespaces and issue subnames with no engineering.",
          link: { label: "Launch App", href: "https://app.namespace.ninja/" },
        },
        {
          title: "REST API and TypeScript SDK",
          group: "service",
          description: "Issuance, records and resolution at fleet scale.",
        },
        {
          title: "Hosted resolver and gateway",
          group: "service",
          description: "CCIP-Read infrastructure, run and monitored by us.",
        },
        {
          title: "ERC-8004 integration support",
          group: "service",
          description: "Hands-on wiring into the registries.",
        },
        {
          title: "Records schema guidance",
          group: "service",
          description: "What to publish, where, and how.",
        },
        {
          title: "Direct support",
          group: "service",
          description: "A shared channel with the engineers.",
        },
      ],
    },
    whyUs: {
      label: "Why Namespace",
      heading: "Why agent platforms choose Namespace",
      lead: "Namespace is the ENS DAO-backed service provider, and our ENS MCP server is listed in the official ENS documentation.",
      tableCaption: "Build it yourself, or don't",
      table: {
        columns: ["", "In-house", "Namespace"],
        rows: [
          ["Naming and records infra", "You build, audit and maintain", "Managed and monitored"],
          ["ERC-8004 wiring", "You interpret the spec alone", "Hands-on integration support"],
          ["Agent smart accounts", "Another workstream", "Namera, included"],
          ["Standards work", "You track ENSIPs yourself", "Follow and actively contribute."],
          ["Engineering to production", "Quarters, realistically", "A day for naming, two weeks for full identity"],
          ["Subname expertise", "You start from zero", "Experts in offchain, L1, and L2 subnames"],
          ["Lock-in", "None, but you maintain it all", "None: onchain names and identity tokens are operator-owned"],
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
        "Agent-to-agent discovery, verifiable delegation, portable reputation, and payment flows where the counterparty is checkable. For platforms issuing agents, a branded namespace makes every agent you deploy carry your name into every interaction it has.",
      caseBullets: [
        "Agents other agents can discover and verify",
        "Context that travels across platforms",
        "Payment flows with checkable counterparties",
        "Your brand on every agent you deploy",
      ],
      pricingHeading: "Our pricing, plainly",
      pricingParagraph:
        "If names are free for your agents, we charge nothing. We charge only on priced subnames and only earn when you do.",
      facts: [
        { value: "Free", label: "Offchain subnames at fleet scale" },
        { value: "5%", label: "On paid onchain mints through our infra" },
        { value: "5-10%", label: "On mints when we build your integration for free, routed to the ENS DAO" },
      ],
    },
    proofStyle: "wall",
    ctaCards: {
      heading: "A named fleet in a day,\nfull identity in two weeks",
      subheading: "It's time to make your agents verifiable.",
      cards: [
        {
          title: "Try it without code",
          description: "Issue your first agent names in minutes with the no-code app. No contracts, no gas.",
          button: { label: "Launch App", href: "https://app.namespace.ninja/" },
          image: "/assets/images/cta-decoration-2.svg",
          imageAlt: "Issue ENS agent names with no code required",
        },
        {
          title: "Build it into your stack",
          description: "Name agents as you deploy them with a few lines of TypeScript.",
          button: { label: "Start Building Free", href: "https://docs.namespace.ninja/developer-guide/guide/create-offchain-subnames" },
          image: "/assets/images/cta-decoration-1.svg",
          imageAlt: "Build agent identity with the Namespace SDK and API",
        },
        {
          title: "Partner with Namespace",
          description: "Custom features, white-glove integration, partner pricing. Let's scope your integration on the call.",
          button: { label: "Book a Discovery Call", href: "https://cal.com/thecap.eth/discovery" },
          image: "/assets/images/cta-decoration-3.svg",
          imageAlt: "Partner with Namespace for agent identity",
        },
      ],
    },
    faqs: [
      {
        question: "What is ERC-8004?",
        answer:
          "ERC-8004, Trustless Agents, is an Ethereum standard defining three lightweight onchain registries: an Identity Registry (an ERC-721 where each agent mints a token pointing to its registration file), a Reputation Registry for publishing and reading feedback signals, and a Validation Registry for validator results. It went to mainnet in January 2026. It makes agents discoverable and gives trust signals a standard shape across organizational boundaries.",
      },
      {
        question: "Do we need ENS if we already use ERC-8004?",
        answer:
          "You do not strictly need it, and you will want it. ERC-8004 gives an agent a token ID and a registration file. ENS gives it a name that resolves in every wallet, explorer, and app already deployed, plus a records layer for everything the registry does not cover. They compose deliberately.",
      },
      {
        question: "Can an agent register its own name autonomously?",
        answer:
          "Yes. Issuance is an API call, so an agent with credentials and a wallet can name itself or name sub-agents it spawns. You set the policy on what it is allowed to do.",
      },
      {
        question: "How do you revoke a compromised agent identity?",
        answer:
          "The operator controls the name and the identity token. Records can be updated or cleared immediately, the agent wallet can be unset, and the identity can be transferred or retired. Because ownership is onchain, revocation does not depend on a platform cooperating.",
      },
      {
        question: "How does a counterparty verify an agent's wallet?",
        answer:
          "Ownership of the ERC-8004 identity token is enforced onchain. The agent's operating wallet is set separately and can only be updated after proving control of the new wallet through an EIP-712 or ERC-1271 signature, and it is cleared automatically on transfer so a new owner must re-verify. The ENS name resolves to those records, so verification starts from something a human can read.",
      },
      {
        question: "What about agent payments?",
        answer:
          "ERC-8004 leaves payment rails out of scope by design, and shows how payment proofs can enrich feedback signals instead. Identity sits underneath payments: the rail moves the money, the identity tells you who you are paying. Namera pairs the identity with a smart account so an agent can hold and move funds under policy.",
      },
      {
        question: "Does this work across chains?",
        answer:
          "Yes. ERC-8004 registries are deployed as per-chain singletons and use CAIP-10 chain-agnostic addressing, and ENS resolves across more than 100 chains. An agent can be referenced consistently regardless of where it operates.",
      },
      {
        question: "Our framework already handles agent auth. Why is this different?",
        answer:
          "Most frameworks handle authentication inside their own boundary, which is fine until an agent needs to be trusted outside it. Protocols like MCP and A2A cover capability advertisement and messaging but do not cover discovery and trust across organizations. That is the gap ERC-8004 was written to fill.",
      },
      {
        question: "What does it cost at fleet scale?",
        answer:
          "Offchain issuance is free at any volume - naming ten thousand agents costs nothing. If you charge for names, our standard fee is 5% of paid mints only.",
      },
      FAQ_TIMELINE,
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
