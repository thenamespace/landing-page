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
