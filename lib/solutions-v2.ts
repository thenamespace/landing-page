/**
 * Solutions V2: six vertical pages on the shared 13-block master template.
 *
 * Blocks: hero, answer capsule, problem, product picture, how it works,
 * proof, what you get, why Namespace, business case, integration effort,
 * FAQ, related resources, final CTA.
 *
 * Copy source: the user's master template document. Third-party statistics
 * are pending verification (see the source document's Appendix A), so these
 * pages ship noindex until approved.
 */

export interface V2Cta {
  label: string;
  href: string;
  external?: boolean;
}

export interface V2Table {
  columns: string[];
  rows: string[][];
}

export interface V2Quote {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export interface SolutionV2 {
  slug: string;
  navLabel: string;
  title: string;
  description: string;
  keywords: string[];
  hero: {
    eyebrow: string;
    h1: string;
    subhead: string;
    proofLine: string;
    ctas: V2Cta[];
    visual: "phone" | "sendflow" | "browser" | "api" | "agent" | "tree";
    heroName: string;
  };
  capsule: { text: string; facts: string[] };
  problem: { h2: string; items: { title: string; body: string }[] };
  product: { h2: string; items: { title: string; body: string }[] };
  how: {
    h2: string;
    steps: { title: string; body: string }[];
    tableCaption: string;
    table: V2Table;
    recommendation: string;
    note?: string;
  };
  proof: {
    h2: string;
    items: { title: string; body: string }[];
    quotes: V2Quote[];
    stats: string[];
  };
  included: { h2: string; items: { title: string; body: string }[] };
  why: {
    h2: string;
    intro: string;
    tableCaption?: string;
    table?: V2Table;
    noLockIn: string;
  };
  business?: { h2: string; paragraphs: string[] };
  effort: {
    h2: string;
    body: string;
    code?: string;
    codeLabel?: string;
    footnote?: string;
  };
  faqs: { question: string; answer: string }[];
  resources: { label: string; href?: string }[];
  finalCta: { title: string; cta: V2Cta }[];
}

const CAL = "https://cal.com/thecap.eth/discovery";
const DOCS = "https://docs.namespace.ninja/";
const APP = "https://app.namespace.ninja/";
const AV = {
  griff: "/assets/images/testimonial-griff.avif",
  kate: "/assets/images/katecelo.jpg",
  joan: "/assets/images/testimonial-joan.jpg",
  ted: "/assets/images/testimonial-ted.jpg",
  ben: "/assets/images/testimonial-ben.avif",
};

export const SOLUTIONS_V2: SolutionV2[] = [
  /* ═══════════════════ 3. PAYMENT APPS AND FINTECH ═══════════════════ */
  {
    slug: "ens-for-payment-apps",
    navLabel: "Payment Apps (V2)",
    title: "ENS Usernames for Crypto Payment Apps",
    description:
      "Let users send to names instead of addresses. Fewer failed transfers, fewer support tickets, no copy-paste anxiety. Gasless ENS usernames for payment and stablecoin apps.",
    keywords: ["crypto payment app usernames", "send crypto to username", "stablecoin app identity", "prevent address poisoning", "ens for fintech", "payment links crypto"],
    hero: {
      eyebrow: "ENS DAO Service Provider",
      h1: "Send to a Name, Not an Address",
      subhead:
        "Give every user in your payment app a readable username. Fewer failed transfers, fewer support tickets, and a send flow that a non-crypto user can actually complete.",
      proofLine: "Powering Filpay usernames for Filecoin. 850,000+ subnames issued. 16M resolutions.",
      ctas: [
        { label: "Book a Call", href: CAL, external: true },
        { label: "Read the Docs", href: DOCS, external: true },
      ],
      visual: "sendflow",
      heroName: "alice.yourapp.eth",
    },
    capsule: {
      text: "ENS usernames let a payment app replace 42-character wallet addresses with readable names like alice.yourapp.eth. Namespace issues these names through an API with no gas cost and no smart contract deployment, and one name can hold address records for multiple chains, so the sender never has to choose a network. Because the names are standard ENS records, they also resolve outside your app, in wallets, explorers, and other payment products, which makes cross-app transfers possible without either side integrating the other.",
      facts: ["One name, many chains", "Gasless", "No custody implications", "Resolves outside your app"],
    },
    problem: {
      h2: "Why addresses break payment products",
      items: [
        {
          title: "The scariest screen in your product is the one that matters most.",
          body: "Pasting a 42-character string, checking the first four characters, checking the last four, and hoping is not a payment experience. It is a stress test. Every user who hesitates at that screen is a transaction you did not process.",
        },
        {
          title: "Wrong-address transfers are irreversible and become trust events.",
          body: "Address poisoning attacks specifically target payment behavior. Attackers send dust transactions from lookalike addresses so the fake address lands in the user's history, then wait for a copy-paste. Onchain poisoning attempts tracked by security researchers rose from roughly 628,000 in November 2025 to 3.4 million in January 2026. In December 2025 a single user lost close to 50 million USDT this way, 26 minutes after making a small test transfer. You cannot refund those. You can only prevent them, and prevention starts with making the destination human-readable before the user signs.",
        },
        {
          title: "Multi-chain makes it worse.",
          body: "The user has to pick a network as well as an address, and picking wrong is another irreversible loss. A single ENS name can carry address records for Ethereum, Base, Optimism, Bitcoin, Solana, and more, which moves that decision out of the user's hands and into your app's logic.",
        },
        {
          title: "You cannot onboard a normal person to a hex string.",
          body: "If your target user has never held crypto, the address is where they stop. Names are the only part of this stack that a first-time user recognizes from every other app they have ever used.",
        },
      ],
    },
    product: {
      h2: "How usernames change a payments flow",
      items: [
        { title: "Claim at signup", body: "alice.yourapp.eth, issued automatically with the account. No transaction, no gas, no extra step for the user to understand." },
        { title: "Send by name", body: "The user types a name. Your app resolves it, displays the avatar and profile, and only then enables the confirm button. The verification step becomes visual instead of a character-by-character comparison." },
        { title: "Request and payment links", body: "Share a name instead of an address. It fits in a message, a bio, an invoice, or a QR code, and it does not change when the user rotates wallets." },
        { title: "One name, every chain", body: "Store address records per chain under the same name. The sender picks a person, your app picks the rail." },
        { title: "Interoperable by default", body: "Because these are ENS names, someone in a different wallet can pay your user without your app being involved at all. That is a growth surface most payment products do not have." },
      ],
    },
    how: {
      h2: "How to add usernames to your app",
      steps: [
        { title: "Point a name at our resolver", body: "You keep ownership of the root name." },
        { title: "Issue at account creation", body: "One API call, no gas, no contract deployment." },
        { title: "Resolve on send", body: "Use Resolvio or the SDK to resolve names to addresses, including bulk resolution for contact lists and transaction history." },
      ],
      tableCaption: "Name types for payment apps",
      table: {
        columns: ["", "Offchain", "Onchain L2"],
        rows: [
          ["Cost", "Free", "Low gas"],
          ["Issue at signup silently", "Yes", "Requires a transaction"],
          ["User owns and can transfer", "No", "Yes"],
          ["Best for", "Every user, by default", "Premium or power users"],
        ],
      },
      recommendation:
        "Recommendation for payment apps: offchain, issued automatically at account creation. Payments products need identity to be invisible, and asking a first-time user to sign a transaction to get a username defeats the purpose.",
    },
    proof: {
      h2: "Payment products running on Namespace",
      items: [
        { title: "Filecoin", body: "Filpay usernames give Filecoin users readable identities for sending and receiving." },
        { title: "Celo", body: "Celonames is explicitly positioned around making sending feel familiar and stress free. Celo's own framing is that reduced gas fees on an L2 do not remove the error rates associated with raw addresses, which is exactly the point." },
        { title: "Uniswap", body: "Over two million uni.eth usernames issued since 2024 on an offchain resolver model, which is the same architecture we operate for partners." },
      ],
      quotes: [
        {
          quote: "We have found in Namespace an efficient partner that quickly understood our needs and provided very solid solutions.",
          name: "Patricio",
          role: "Founder of POAP",
          avatar: "/assets/images/testimonial-bg-3.avif",
        },
      ],
      stats: ["850,000+ subnames", "16M resolutions", "30+ partners", "100% resolution uptime"],
    },
    included: {
      h2: "What is included",
      items: [
        { title: "Subname API and SDK", body: "For issuance and record management." },
        { title: "Resolvio", body: "Our resolution API, with bulk resolution and caching. Free, and self-hostable if your compliance team prefers it." },
        { title: "ENS Components", body: "Drop-in React components for claim flows and profile editing." },
        { title: "Multi-chain address records", body: "Under a single name." },
        { title: "Reserved and blocked name lists", body: "To prevent impersonation of your brand, support staff, or well-known users." },
        { title: "No-code dashboard", body: "For operations and support teams." },
      ],
    },
    why: {
      h2: "Why payment teams choose Namespace",
      intro:
        "We are the ENS DAO's official Service Provider, in our third consecutive term, and we manage more than 850,000 names with no resolution downtime to date.",
      noLockIn:
        "On compliance surface: ENS names are records, not custody. Issuing a name does not move funds, hold funds, or create a claim on funds. It is a display and routing layer over addresses your product already handles. That distinction matters when this goes to your legal team, and we will put it in writing. No lock-in: names and records are portable, exportable, and repointable at any resolver, including your own.",
    },
    business: {
      h2: "What usernames are worth to a payment product",
      paragraphs: [
        "Fewer abandoned sends, fewer irreversible-loss support cases, and a shareable identifier that turns each user into a distribution surface. Premium and short names can be priced if you want a revenue line, and renewals compound.",
        "Namespace charges 5% of minting revenue, and only on paid mints. Free issuance costs you nothing.",
      ],
    },
    effort: {
      h2: "How long does it take",
      body: "Two days to testnet, about a week to production for a standard claim-and-resolve integration. Bulk resolution for existing users is a single batch job.",
      code: `// resolve a name before enabling the send button
const res = await fetch(\`https://api.resolvio.xyz/resolve/\${name}\`);
const { address, avatar } = await res.json();`,
      codeLabel: "send-flow.ts",
    },
    faqs: [
      {
        question: "How does this actually prevent address poisoning?",
        answer:
          "Poisoning works because two addresses look similar at a glance. Two names do not. When your send flow resolves a name and shows a profile and avatar before the confirm step, the user is verifying something they can actually read. It does not eliminate every social-engineering vector, but it removes the specific one that has cost users tens of millions of dollars.",
      },
      {
        question: "Can one name work across multiple chains?",
        answer:
          "Yes. ENS supports address records per chain under a single name, covering Ethereum, L2s, Bitcoin, Solana, and others. Your app resolves the right record for the rail you are using.",
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
    ],
    resources: [
      { label: "Case study: POAP in-app ENS usernames", href: "/blog/case-study-poap-in-app-ens-usernames-with-namespace" },
      { label: "Resolvio: universal ENS resolution API", href: "https://resolvio.xyz/" },
      { label: "Docs: create offchain subnames", href: "https://docs.namespace.ninja/developer-guide/guide/create-offchain-subnames" },
      { label: "Related: ENS for Wallet-as-a-Service", href: "/solutions/ens-for-wallet-as-a-service" },
    ],
    finalCta: [
      { title: "Try it with no code", cta: { label: "Launch App", href: APP, external: true } },
      { title: "Build the send flow", cta: { label: "Read the Docs", href: DOCS, external: true } },
      { title: "Talk through your architecture", cta: { label: "Book a Call", href: CAL, external: true } },
    ],
  },

  /* ═══════════════════ 4. WALLET-AS-A-SERVICE ═══════════════════ */
  {
    slug: "ens-for-wallet-as-a-service",
    navLabel: "WaaS (V2)",
    title: "ENS Usernames for Wallet-as-a-Service Platforms",
    description:
      "Ship identity as part of your wallet infrastructure. Multi-tenant ENS namespaces, one API call at wallet creation, fully white-label. Backed by ENS DAO.",
    keywords: ["wallet as a service usernames", "embedded wallet identity", "waas ens integration", "white label subname infrastructure", "multi-tenant ens"],
    hero: {
      eyebrow: "ENS DAO Service Provider",
      h1: "Ship Identity With Every Wallet You Create",
      subhead:
        "Multi-tenant ENS namespaces for wallet infrastructure platforms. Each of your customers gets their own branded namespace. You provision a name with the same call that creates the wallet.",
      proofLine: "Trusted by Openfort. 850,000+ subnames managed across 30+ partners.",
      ctas: [
        { label: "Book a Call", href: CAL, external: true },
        { label: "Read the Docs", href: DOCS, external: true },
      ],
      visual: "api",
      heroName: "alice.customerbrand.eth",
    },
    capsule: {
      text: "Wallet-as-a-Service platforms can bundle ENS usernames into every wallet they provision, so each end user receives a readable name like alice.customerbrand.eth at creation. Namespace provides the multi-tenant infrastructure behind this: a separate namespace per customer, issuance through a single API, white-label management, and no smart contracts for either you or your customers to deploy. The names are standard ENS records, so they resolve in every ENS-aware wallet and app rather than only inside the platform that issued them.",
      facts: ["Multi-tenant by design", "One API call at wallet creation", "Fully white-label", "No contracts to deploy"],
    },
    problem: {
      h2: "Why identity is now a WaaS differentiator",
      items: [
        {
          title: "Embedded wallets are commoditizing fast.",
          body: "Passkeys, social login, gas sponsorship, and smart accounts are now table stakes across the category, and the market is consolidating around a few large owners. When key management is a solved commodity, differentiation moves up the stack. Identity is the layer directly above it.",
        },
        {
          title: "Your customers keep asking for usernames.",
          body: "Every consumer-facing team that ships wallets eventually asks how their users get a handle. Right now the honest answer from most providers is that they do not, or that the customer should build it. That is a request you can either monetize or lose.",
        },
        {
          title: "Building naming infrastructure is permanently off-roadmap.",
          body: "Resolvers, CCIP-Read gateways, indexers, reverse resolution, renewal logic, and reserved-name policy are a full workstream. For a WaaS platform it is a feature, not a product, and it never wins the prioritization argument. That is precisely why it should be a partnership.",
        },
        {
          title: "A proprietary username system solves nothing.",
          body: "Usernames that only work inside your platform give your customers a walled garden they did not ask for. ENS names resolve in MetaMask, Uniswap, Farcaster, and hundreds of other apps immediately, which makes the feature worth selling.",
        },
      ],
    },
    product: {
      h2: "How multi-tenant ENS namespaces work",
      items: [
        { title: "One namespace per customer", body: "Your customer brings theirbrand.eth, or you provision one for them. Their users get alice.theirbrand.eth. Their branding, not yours, and not ours." },
        { title: "Issued at wallet creation", body: "The same server-side call that creates the wallet issues the name and writes the address record. Your customers do not have to build a claim flow unless they want one." },
        { title: "White-label management", body: "Namespace does not need to appear anywhere in your customer's experience. Reserved names, pricing, and policy are configurable per tenant." },
        { title: "Ready-made claim UI when they want it", body: "ENS Components gives your customers a registration and profile-editing interface as React components, so a customer who wants a custom claim flow ships it in hours instead of sprints." },
        { title: "A feature you can price", body: "Identity becomes a line item in your plans rather than a support question." },
      ],
    },
    how: {
      h2: "How a WaaS platform integrates ENS",
      steps: [
        { title: "Tenant setup", body: "Each customer's root name is pointed at our resolver, once, at onboarding." },
        { title: "Provision with the wallet", body: "One authenticated API call issues the subname and sets the address record." },
        { title: "Resolution is automatic", body: "Offchain names resolve through ERC-3668 and ENSIP-10, so every ENS-aware app reads them without either you or your customer integrating anything further." },
      ],
      tableCaption: "What to offer your customers",
      table: {
        columns: ["", "Offchain", "Onchain L2"],
        rows: [
          ["Cost to you", "Free at any volume", "Gas per mint"],
          ["Silent provisioning", "Yes", "Requires a user transaction"],
          ["End user owns the name", "No", "Yes"],
          ["Best as", "The default in every plan", "A premium tier you upsell"],
        ],
      },
      recommendation:
        "Recommendation for WaaS: offchain as the default, included in every plan, because it provisions silently and costs nothing at volume. Offer onchain names as a paid tier for customers whose users want real ownership.",
    },
    proof: {
      h2: "Infrastructure providers already working with us",
      items: [
        { title: "POAP", body: "Migrated existing naming infrastructure to Namespace with no downtime, which is the closest analogue to a platform migration." },
        { title: "Unicorn", body: "Issued branded names to thousands of ETHDenver attendees through its wallet, provisioned programmatically." },
      ],
      quotes: [
        {
          quote: "The Namespace team have been very proactive and supportive of our timelines to build an integration with our offering. Definitely recommend working with them.",
          name: "Joan",
          role: "Co-founder of Openfort",
          avatar: AV.joan,
        },
      ],
      stats: ["850,000+ subnames", "16M resolutions", "30+ partners", "100% resolution uptime"],
    },
    included: {
      h2: "What is included",
      items: [
        { title: "Multi-tenant API", body: "Per-tenant namespaces, keys, and policy." },
        { title: "TypeScript SDK and REST API", body: "Both LLM-friendly and documented for fast integration." },
        { title: "ENS Components", body: "For customers who want their own claim UI." },
        { title: "Resolvio", body: "For resolution, with bulk lookups and caching." },
        { title: "White-label dashboard", body: "For tenant management." },
        { title: "Reserved and blocked name lists", body: "Per tenant." },
        { title: "Custom engineering", body: "When the standard tools do not fit your architecture, we build what does. That is what an ENS DAO Service Provider mandate is for." },
      ],
    },
    why: {
      h2: "Why platforms partner with us instead of building",
      intro:
        "We are the ENS DAO's official Service Provider, in our third consecutive funded term, and we build only ENS infrastructure. What you would otherwise own: resolver contracts, a CCIP-Read gateway with an uptime SLA, an indexer, reverse resolution, renewal and expiry logic, reserved-name policy, and continuous tracking of ENSv2. Multiplied by every tenant.",
      noLockIn:
        "No lock-in for you or your customers. Root names stay with the customer. Records are standard ENS data, exportable and repointable. If a customer leaves your platform, their identity is not held hostage, which is a much easier thing to say in a sales call than the alternative.",
    },
    business: {
      h2: "Identity as a revenue line",
      paragraphs: [
        "Include offchain names in every plan to close feature-parity gaps in your sales cycle. Sell onchain names, premium name tiers, and custom namespaces as upsells. Your customers can price names to their own users and keep that revenue.",
        "Namespace charges 5% of subname minting revenue, and only where a non-zero price is set. Free issuance is free at any volume. Revenue-share arrangements for platform partners are negotiable.",
      ],
    },
    effort: {
      h2: "How long does it take",
      body: "A multi-tenant integration is typically one to two weeks, most of which is your tenant onboarding flow rather than name issuance.",
      code: `// provision a wallet and a name in the same server-side flow
const wallet = await yourPlatform.createWallet({ userId });

await namespace.createSubname({
  parentName: tenant.ensRoot,     // e.g. "customerbrand.eth"
  label: username,
  address: wallet.address,
});`,
      codeLabel: "provision.ts",
    },
    faqs: [
      {
        question: "How does multi-tenancy work?",
        answer:
          "Each customer has its own root name, its own namespace, and its own policy configuration. Issuance is scoped per tenant through your API key. Tenants are isolated from each other.",
      },
      {
        question: "Who owns the names, us or our customer?",
        answer:
          "Your customer owns their root name. We recommend it stays with them rather than with you, because it makes the offer easier to sell and easier to leave, which counterintuitively makes it easier to keep.",
      },
      {
        question: "Can this be fully white-label?",
        answer: "Yes. Namespace does not need to appear in your product or your customer's product at any point.",
      },
      {
        question: "Does it scale?",
        answer:
          "We manage more than 850,000 subnames today and have served millions of resolution requests without downtime. Offchain issuance has no per-name cost and no practical volume ceiling.",
      },
      {
        question: "Is there a revenue share?",
        answer:
          "Yes, negotiable for platform partners. Our standard fee is 5% of paid mints only, and nothing on free issuance.",
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
        answer: "No, not for offchain names. Onchain issuance uses already-deployed audited contracts.",
      },
    ],
    resources: [
      { label: "Docs: SDK quickstart", href: "https://docs.namespace.ninja/developer-guide/quickstart" },
      { label: "Docs: API reference", href: "https://docs.namespace.ninja/api-reference/introduction" },
      { label: "ENS Components", href: "https://enscomponents.com/" },
      { label: "Related: ENS for AI Agents", href: "/solutions/ens-for-ai-agents" },
    ],
    finalCta: [
      { title: "See the API", cta: { label: "Read the Docs", href: DOCS, external: true } },
      { title: "Try issuance with no code", cta: { label: "Launch App", href: APP, external: true } },
      { title: "Discuss a platform partnership", cta: { label: "Book a Call", href: CAL, external: true } },
    ],
  },

  /* ═══════════════════ 5. DECENTRALIZED WEBSITES ═══════════════════ */
  {
    slug: "ens-decentralized-websites",
    navLabel: "Decentralized Websites (V2)",
    title: "Decentralized Websites on ENS: Censorship-Resistant Frontends",
    description:
      "Host websites on ENS and IPFS. No DNS registrar, no server, no takedown. Deploy a permanent frontend in minutes. 125,000+ ENS sites deployed with our infrastructure.",
    keywords: ["ens website", "how to host a website on ens", ".eth website", "ipfs ens website", "censorship resistant frontend", "decentralized website hosting", "eth.limo"],
    hero: {
      eyebrow: "ENS DAO Service Provider",
      h1: "Websites That Cannot Be Taken Down",
      subhead:
        "Publish to an ENS name and IPFS instead of a DNS registrar and a server. No hosting account, no nameservers, no registrar that can be phished into pointing your users somewhere else.",
      proofLine: "125,000+ ENS sites deployed through infrastructure we built with PinMe, serving 2.6M+ requests a month.",
      ctas: [
        { label: "Deploy a Site", href: APP, external: true },
        { label: "Read the Docs", href: DOCS, external: true },
        { label: "Talk to Us", href: CAL, external: true },
      ],
      visual: "browser",
      heroName: "yoursite.eth",
    },
    capsule: {
      text: "A decentralized website is a site whose content is stored on IPFS and whose address is an ENS name rather than a DNS domain. The site's content hash is written to the ENS name's contenthash record, defined in EIP-1577, and visitors reach it through ENS-aware browsers or gateways such as eth.limo. Because there is no registrar, nameserver, or hosting account in the path, the site cannot be redirected by a DNS hijack or removed by a hosting provider. Namespace provides the ENS subname and record infrastructure that makes this practical at scale.",
      facts: ["No DNS", "No server", "Content-addressed and verifiable", "Resolves through eth.limo"],
    },
    problem: {
      h2: "Why frontends are the weakest link in Web3",
      items: [
        {
          title: "Contracts live forever. Interfaces do not.",
          body: "Protocols are credibly neutral and permissionless at the contract layer, and then they are served to users through a registrar account and a hosting provider. When NounsDAO funded a set of governance frontends, many of those sites quietly disappeared once the grants ran out. The contracts kept running. Nobody could reach them.",
        },
        {
          title: "DNS is a live attack surface.",
          body: "Curve Finance had its curve.fi domain hijacked at the registrar level in May 2025, redirecting users to a decoy site that existed only to harvest wallet signatures. The smart contracts were never touched. Curve had already suffered a DNS hijack in 2022, and after the 2025 incident the team publicly urged a shift toward ENS. Arrakis Finance was hit the same way in January 2025. This is not a rare failure mode. It is a recurring one.",
        },
        {
          title: "Deplatforming and takedown are one policy decision away.",
          body: "Your registrar, your DNS provider, and your host are three separate companies, each of which can be compelled or convinced to disconnect you. In several jurisdictions that has already happened to crypto interfaces.",
        },
        {
          title: "Users cannot verify they are on the real site.",
          body: "A DNS name resolves to whatever the current record says. A contenthash resolves to a cryptographic hash of the exact content. One of those is verifiable and one is a promise.",
        },
      ],
    },
    product: {
      h2: "How an ENS website works",
      items: [
        { title: "Your content goes to IPFS", body: "Files are addressed by a content identifier, which is a cryptographic hash of the content itself. Change one byte, and it is a different address." },
        { title: "The hash goes into your ENS name", body: "The contenthash record on yoursite.eth points to that CID. That record is onchain and controlled only by the name's owner." },
        { title: "Visitors reach it through a gateway or a native browser", body: "yoursite.eth.limo works in any browser today. ENS-aware browsers resolve .eth natively." },
        { title: "Subnames give you a whole site structure", body: "docs.yourproject.eth, app.yourproject.eth, blog.yourproject.eth, all under one name you own, each with its own contenthash." },
        { title: "Updating is a record change", body: "Deploy new content, write the new hash, done. No cache invalidation across a CDN, no nameserver propagation. Real deployments include protocol dashboards, documentation sites, portfolios, news pages, music distribution, and books that are blocked elsewhere." },
      ],
    },
    how: {
      h2: "How to publish a website to ENS",
      steps: [
        { title: "Get a name", body: "A .eth name you own, or a subname under one you already have. Issue subnames for each site or environment." },
        { title: "Pin your build to IPFS", body: "Any pinning service works. PinMe reduces this to a single command: pinme upload ./build-folder." },
        { title: "Write the contenthash and share the link", body: "Set the EIP-1577 contenthash record on the name, through the Namespace app, the SDK, or the API. yoursite.eth.limo works immediately, everywhere." },
      ],
      tableCaption: "ENS hosting versus DNS hosting",
      table: {
        columns: ["", "DNS plus hosting", "ENS plus IPFS"],
        rows: [
          ["Can be hijacked at the registrar", "Yes", "No registrar involved"],
          ["Can be taken down by a host", "Yes", "No host involved"],
          ["Content is verifiable by the visitor", "No", "Yes, content-addressed"],
          ["Renewal risk", "Domain expiry loses everything", "Name renewal, records persist"],
          ["Works in every browser unmodified", "Yes", "Through a gateway such as eth.limo"],
          ["Dynamic server-side rendering", "Yes", "No, static content only"],
        ],
      },
      recommendation:
        "We list the last two rows honestly because they are the real tradeoffs, and pretending otherwise costs credibility with exactly the developers this page is for.",
    },
    proof: {
      h2: "PinMe, built on Namespace",
      items: [
        {
          title: "The largest ENS website deployment to date",
          body: "PinMe is a one-command deployment tool that pins static frontends to IPFS and maps them to ENS subnames issued through Namespace. Within months of launch it became one of the most adopted ENS-powered tools in the ecosystem: 125,000+ ENS contenthash records created, against roughly 30,000 across all ENS names before it existed, and 2.6M+ monthly requests routed through eth.limo, around 5% of all eth.limo traffic.",
        },
        {
          title: "Real use",
          body: "Protocol dashboards and docs, portfolios, news, music, and books distributed where they are otherwise blocked.",
        },
      ],
      quotes: [
        {
          quote: "Namespace has been a core partner for PinMe. Their APIs are extremely easy to use, their subdomain infrastructure is stable and built for the long term.",
          name: "Ted",
          role: "Co-founder of PinMe",
          avatar: AV.ted,
        },
        {
          quote: "Namespace has quickly become the go-to platform for managing ENS subnames. What was once confusing and error-prone is now a streamlined, intuitive experience.",
          name: "Ben",
          role: "Co-founder of ETH.LIMO",
          avatar: AV.ben,
        },
      ],
      stats: ["125,000+ ENS sites", "2.6M+ monthly requests", "850,000+ subnames", "100% resolution uptime"],
    },
    included: {
      h2: "What is included",
      items: [
        { title: "Subname issuance", body: "For site structure, at any scale, free offchain or onchain for full ownership." },
        { title: "Contenthash record management", body: "Through the app, SDK, or API." },
        { title: "API-driven deploys", body: "Fit publishing into CI/CD, so it is part of your pipeline rather than a manual step." },
        { title: "Resolvio", body: "For resolving names and records programmatically." },
        { title: "No-code app", body: "For teams that do not want to touch an API." },
        { title: "Subpages", body: "A white-label site for issuing subnames if you want to let your community publish under your name." },
      ],
    },
    why: {
      h2: "Why build on Namespace",
      intro:
        "We are the ENS DAO's official Service Provider, in our third consecutive funded term, and our infrastructure is behind the largest deployment of ENS contenthash records to date.",
      noLockIn:
        "No lock-in, and it matters more here than anywhere. The entire proposition of this page is that no single party can cut you off. Onchain subnames are NFTs you own. Records are onchain. If Namespace disappeared tomorrow, your site would keep resolving, because the contenthash is not ours and never was.",
    },
    business: {
      h2: "Start publishing",
      paragraphs: [
        "Issuing offchain subnames is free at any volume. Onchain subnames cost gas and give full ownership. If you want to let others publish under your namespace, you can price registrations and we take 5% of paid mints only.",
      ],
    },
    effort: {
      h2: "How long does it take",
      body: "A single site: minutes. A CI/CD pipeline that publishes to ENS and IPFS on every merge: an afternoon. Migrating a documentation site or dashboard fleet across many subnames: a day or two.",
      code: `npm i -g pinme
pinme upload ./build-folder`,
      codeLabel: "deploy",
    },
    faqs: [
      {
        question: "How do normal users open a .eth website?",
        answer:
          "Append .limo. yoursite.eth.limo loads in any browser with no extension and no configuration. Brave and some other browsers resolve .eth natively. eth.link is an alternative gateway.",
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
          "Deploy new content, get a new content identifier, and write it to the contenthash record. The name stays the same. There is no propagation delay of the kind DNS has.",
      },
      {
        question: "Can I use my existing DNS domain too?",
        answer:
          "Yes. Run both. Many teams keep the DNS domain for reach and publish the ENS version as the canonical, verifiable, unkillable copy. Curve moved to a new DNS domain after its hijack and simultaneously pushed users toward ENS access.",
      },
      {
        question: "Do .eth sites get indexed by search engines?",
        answer:
          "Gateway URLs such as yoursite.eth.limo are ordinary HTTPS URLs and can be crawled and indexed. Treat the gateway URL as your canonical for SEO purposes and make sure the content is rendered server-side or statically.",
      },
      {
        question: "What does it cost?",
        answer:
          "Offchain subnames are free to issue. An ENS name registration costs gas plus the ENS registration fee, and ENS gas costs fell roughly 99% over the past year. Pinning costs depend on your provider, and many tiers are free at small scale.",
      },
      {
        question: "What are the limitations?",
        answer:
          "Content must be static. There is no server-side rendering, no backend, and no dynamic API in the same origin. Most Web3 frontends are static builds that call contracts and APIs from the client, which is exactly what this suits.",
      },
      {
        question: "Is this actually censorship-resistant, or just harder to censor?",
        answer:
          "Gateways can be blocked, which is why multiple gateways exist and why ENS-native browser resolution matters. The content itself and the pointer to it cannot be altered by anyone but the name owner. That is a meaningfully different threat model from a registrar that can be phished.",
      },
    ],
    resources: [
      { label: "Case study: PinMe, Forever Frontends", href: "/blog/case-study-pinme-forever-frontends" },
      { label: "Subpages: white-label subname registration site", href: "https://github.com/thenamespace/subpages" },
    ],
    finalCta: [
      { title: "Deploy a site now", cta: { label: "Launch App", href: APP, external: true } },
      { title: "Automate it in CI", cta: { label: "Read the Docs", href: DOCS, external: true } },
      { title: "Publishing at scale?", cta: { label: "Book a Call", href: CAL, external: true } },
    ],
  },

  /* ═══════════════════ 6. AI AGENTS ═══════════════════ */
  {
    slug: "ens-for-ai-agents",
    navLabel: "AI Agents (V2)",
    title: "ENS Identity for AI Agents: ERC-8004 Ready",
    description:
      "Give AI agents verifiable, portable onchain identity. ENS names, ERC-8004 registration, and smart accounts.",
    keywords: ["ai agent identity", "erc-8004", "agent wallet identity", "how do ai agents get an identity", "agent to agent discovery", "agent payments identity", "ens for ai agents"],
    hero: {
      eyebrow: "ENS DAO Service Provider",
      h1: "Identity for AI Agents",
      subhead:
        "Give every agent a name, a verifiable owner, a published set of capabilities, and a wallet. Built on ENS and ERC-8004, so any counterparty can check who they are dealing with before they transact.",
      proofLine: "850,000+ ENS names managed.",
      ctas: [
        { label: "Book a Call", href: CAL, external: true },
        { label: "Read the Docs", href: DOCS, external: true },
      ],
      visual: "agent",
      heroName: "researcher.youragents.eth",
    },
    capsule: {
      text: "AI agents need identity for the same reason businesses do: counterparties must know who they are dealing with before they transact. An ENS name gives an agent a readable, permanent identifier like researcher.youragents.eth, with records for its owner, its endpoint, its capabilities, and its wallet address. ERC-8004, the Trustless Agents standard that went to Ethereum mainnet in January 2026, adds three onchain registries for identity, reputation, and validation. Namespace builds the naming and smart account infrastructure that makes agent identity usable in production.",
      facts: ["ERC-8004 compatible", "Portable across platforms", "Verifiable ownership", "Wallet included"],
    },
    problem: {
      h2: "Why anonymous agents cannot transact",
      items: [
        {
          title: "An agent with no identity is an address with no history.",
          body: "When an agent calls another agent, there is nothing to check. No owner, no capabilities, no track record, no way to tell a legitimate service from an impersonator using a similar-looking address.",
        },
        {
          title: "The industry is still authenticating agents with shared secrets.",
          body: "A February 2026 survey by Strata Identity and the Cloud Security Alliance found that only 23% of organizations had a formal agent identity management strategy, 45.6% were still using shared API keys for agent authentication, and only 21.9% treated agents as independent identity-bearing entities. Shared API keys do not survive contact with agents that hold funds.",
        },
        {
          title: "Reputation does not travel and discovery does not exist.",
          body: "An agent that has performed well on one platform arrives at the next one with nothing. Without a portable identifier, every reputation system is a silo, and every agent starts from zero forever. There is no directory. If your agent can do something useful, there is no canonical place for another agent to find that out and verify it.",
        },
        {
          title: "Payments amplify all of the above.",
          body: "Agents are starting to hold and move funds. The moment money is involved, 'which agent is this and who is responsible for it' stops being a design question and becomes a liability question.",
        },
      ],
    },
    product: {
      h2: "What an agent identity contains",
      items: [
        { title: "A name", body: "researcher.youragents.eth. Readable, permanent, and resolvable by anything that speaks ENS." },
        { title: "An owner", body: "The name resolves to the operator or organization responsible for the agent. Accountability has an address." },
        { title: "Capabilities and endpoint", body: "Published as ENS text records and in the agent's ERC-8004 registration file, so a counterparty can discover what the agent does and how to reach it before contacting it." },
        { title: "A wallet", body: "The name resolves to the agent's address, and ERC-8004 supports proving control of an agent wallet through EIP-712 or ERC-1271 signatures." },
        { title: "An ERC-8004 registration", body: "The Identity Registry is an ERC-721 contract where each agent mints a token whose URI points to its registration file. Because it is an NFT, the identity is transferable and browsable, and ownership is enforced by the chain rather than by a platform." },
        { title: "Reputation that accumulates, names for fleets", body: "ERC-8004's Reputation Registry standardizes how feedback signals are published and read, so a track record attaches to a portable identity. Issue subnames programmatically for every agent you spawn, under one namespace you control." },
      ],
    },
    how: {
      h2: "How ENS and ERC-8004 fit together",
      steps: [
        { title: "Issue a name", body: "One API call per agent, under your namespace. Free offchain, or onchain for full ownership." },
        { title: "Write the records", body: "Owner, endpoint, capabilities, wallet address, and a pointer to the ERC-8004 registration file." },
        { title: "Register in ERC-8004", body: "Mint the identity token and point its URI at the registration file. Counterparties resolve the name, read the records, and check the registry before transacting." },
      ],
      tableCaption: "The two standards do different jobs and are designed to compose",
      table: {
        columns: ["", "ENS", "ERC-8004"],
        rows: [
          ["Provides", "Readable name, records, resolution", "Onchain registries for identity, reputation, validation"],
          ["Answers", "What is this agent called and where does it point", "Who registered it, what is its track record, was its work validated"],
          ["Registry type", "Name registry", "ERC-721 identity registry plus reputation and validation registries"],
          ["Human-readable", "Yes", "Not by itself"],
          ["Status", "Live for a decade", "Mainnet since January 2026"],
        ],
      },
      recommendation:
        "In practice: ERC-8004 gives the agent a verifiable onchain record. ENS gives that record a name a human can read and a resolution path every existing wallet, explorer, and app already understands. An agent identified only by a registry token ID is machine-legible. An agent identified by researcher.youragents.eth is both.",
      note: "A note on payments. ERC-8004 deliberately leaves payment rails out of scope, though it shows how payments can enrich feedback signals. Identity is the layer beneath payments, not a replacement for them.",
    },
    proof: {
      h2: "Why the standards matter, and where we sit in them",
      items: [
        {
          title: "We helped write the standard",
          body: "ERC-8004 reference implementations went live on Ethereum mainnet in January 2026, with contracts audited by Cyfrin, Nethermind, and the Ethereum Foundation Security Team, and deployments across Ethereum, Base, and other networks.",
        },
        {
          title: "Namera",
          body: "Our agent identity and smart account infrastructure, built on ENS and ERC-8004, giving agents a name and an account in the same primitive.",
        },
        {
          title: "ENS MCP",
          body: "Our open-source Model Context Protocol server, listed in the official ENS documentation, which gives AI models native access to ENS lookups, availability, pricing, records, and subname queries.",
        },
      ],
      quotes: [
        {
          quote: "From simple to complex Subname needs, Namespace has the tools and expertise to make it happen. Fully recommend.",
          name: "Simon",
          role: "Lead DevRel at ENS Labs",
          avatar: "/assets/images/testimonial-simon.jpg",
        },
      ],
      stats: ["850,000+ subnames", "16M resolutions", "30+ partners", "100% resolution uptime"],
    },
    included: {
      h2: "What is included",
      items: [
        { title: "Programmatic subname issuance", body: "For agent fleets, at any scale." },
        { title: "Namera", body: "Smart account and identity infrastructure for agents, with SDK and CLI." },
        { title: "ERC-8004 integration support", body: "Hands-on help wiring your agents into the registries." },
        { title: "ENS MCP", body: "So your models can query ENS directly in natural language." },
        { title: "Resolvio", body: "For fast resolution and reverse lookups at agent speed." },
        { title: "Records schema guidance", body: "What to publish, where, and how, so your agents are legible to counterparties you have never met." },
      ],
    },
    why: {
      h2: "Why build agent identity with us",
      intro:
        "We are the ENS DAO's official Service Provider, in our third consecutive funded term. We built and operate naming infrastructure for more than 850,000 names, and our ENS MCP server is listed in the official ENS documentation. Why not build a proprietary agent registry? Because the entire value of agent identity is that a counterparty you have never met can verify it. A registry only your platform reads solves nothing. ENS and ERC-8004 are neutral, open, and already integrated across the ecosystem.",
      noLockIn:
        "No lock-in. Onchain names and ERC-8004 identity tokens are owned by the agent's operator. Records are onchain and standard.",
    },
    business: {
      h2: "What agent identity unlocks",
      paragraphs: [
        "Agent-to-agent discovery, verifiable delegation, portable reputation, and payment flows where the counterparty is checkable. For platforms issuing agents, a branded namespace makes every agent you deploy carry your name into every interaction it has.",
        "Namespace charges 5% of subname minting revenue, only where a price is set. Free issuance costs nothing at any volume.",
      ],
    },
    effort: {
      h2: "How long does it take",
      body: "Naming a fleet of agents: one API call per agent, integrated in a day. Full ERC-8004 identity with records, wallet, and registration file: typically one to two weeks, and we do this alongside your team rather than handing you a spec.",
      code: `await namespace.createSubname({
  parentName: "youragents.eth",
  label: agentId,
  address: agentWallet,
  records: {
    text: {
      "agent.endpoint": "https://agents.you.com/researcher",
      "agent.capabilities": "research,summarize,cite",
      "agent.erc8004": "eip155:1:0x8004A169...",
    },
  },
});`,
      codeLabel: "name-agent.ts",
    },
    faqs: [
      {
        question: "What is ERC-8004?",
        answer:
          "ERC-8004, Trustless Agents, is an Ethereum standard defining three lightweight onchain registries: an Identity Registry (an ERC-721 where each agent mints a token pointing to its registration file), a Reputation Registry for publishing and reading feedback signals, and a Validation Registry for validator results. It went to mainnet in January 2026. It makes agents discoverable and gives trust signals a standard shape across organizational boundaries.",
      },
      {
        question: "How does an agent prove it is the agent?",
        answer:
          "Ownership of the ERC-8004 identity token is enforced onchain. The agent's operating wallet is set separately and can only be updated after proving control of the new wallet through an EIP-712 or ERC-1271 signature, and it is cleared automatically on transfer so a new owner must re-verify. The ENS name resolves to those records, so verification starts from something a human can read.",
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
        question: "How do agent payments work?",
        answer:
          "ERC-8004 leaves payment rails out of scope by design, and shows how payment proofs can enrich feedback signals instead. Identity sits underneath payments: the rail moves the money, the identity tells you who you are paying. Namera pairs the identity with a smart account so an agent can hold and move funds under policy.",
      },
      {
        question: "How do you revoke a compromised agent identity?",
        answer:
          "The operator controls the name and the identity token. Records can be updated or cleared immediately, the agent wallet can be unset, and the identity can be transferred or retired. Because ownership is onchain, revocation does not depend on a platform cooperating.",
      },
      {
        question: "Does this work across chains?",
        answer:
          "Yes. ERC-8004 registries are deployed as per-chain singletons and use CAIP-10 chain-agnostic addressing, and ENS resolves across more than 100 chains. An agent can be referenced consistently regardless of where it operates.",
      },
      {
        question: "What if the agent framework we use has its own identity system?",
        answer:
          "Most frameworks handle authentication inside their own boundary, which is fine until an agent needs to be trusted outside it. Protocols like MCP and A2A cover capability advertisement and messaging but do not cover discovery and trust across organizations. That is the gap ERC-8004 was written to fill.",
      },
    ],
    resources: [
      { label: "ENS MCP on GitHub, listed in the official ENS docs", href: "https://github.com/thenamespace/ens-mcp" },
      { label: "ERC-8004 specification", href: "https://eips.ethereum.org/EIPS/eip-8004" },
      { label: "Related: ENS for Wallet-as-a-Service", href: "/solutions/ens-for-wallet-as-a-service" },
    ],
    finalCta: [
      { title: "Name your agents", cta: { label: "Read the Docs", href: DOCS, external: true } },
      { title: "Talk to the team", cta: { label: "Book a Call", href: CAL, external: true } },
      { title: "Join the working group", cta: { label: "ENS x AI Group", href: "https://t.me/ensxai", external: true } },
    ],
  },
];

export function getSolutionV2(slug: string): SolutionV2 | undefined {
  return SOLUTIONS_V2.find((s) => s.slug === slug);
}

export function getAllSolutionV2Slugs(): string[] {
  return SOLUTIONS_V2.map((s) => s.slug);
}
