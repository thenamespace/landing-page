export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    question: "What is Namespace?",
    answer:
      "Namespace is an ENS (Ethereum Name Service) service provider backed by ENS DAO. It designs, builds, and operates ENS-based naming and identity systems that give crypto users, smart contracts, and AI agents human-readable identities — like alice.wallet.eth — instead of raw wallet addresses.",
    category: "General",
  },
  {
    question: "What is Namespace's mission?",
    answer:
      "To name every crypto user by building and operating universal naming infrastructure for wallets, applications, and blockchains. Namespace manages over 800,000 ENS subnames for 30+ partners including Celo (Celonames) and Filecoin (Filpay usernames).",
    category: "General",
  },
  {
    question: "What is Namespace's vision?",
    answer:
      "A decentralized internet where every user, AI agent, smart contract, asset, and blockchain record is identified by a name first and an address second — making Web3 as legible as the traditional web.",
    category: "General",
  },
  {
    question: "Is Namespace a protocol or a company?",
    answer:
      "Namespace is a company that builds production-grade infrastructure, tooling, and apps on top of open protocols like ENS. It does not replace ENS or DNS — it extends them, operates them at scale, and makes them easily usable for real products.",
    category: "General",
  },
  {
    question: "How is Namespace different from ENS itself?",
    answer:
      "ENS is the naming protocol; Namespace is the execution and distribution engine built on top of it. ENS defines how names work; Namespace builds the systems — resolvers, APIs, SDKs, managed infrastructure — that make naming usable at scale for wallets, L2 chains, apps, and DAOs.",
    category: "General",
  },
  {
    question: "How big is Namespace today?",
    answer:
      "As of 2026, Namespace manages 800,000+ ENS subnames, has served millions of resolution requests with 100% uptime, and works with 30+ partners across wallets, L2 chains, DAOs, and apps — including Celo, Filecoin, POAP, and PinMe.",
    category: "General",
  },
  {
    question: "What happens if Namespace disappears?",
    answer:
      "Names are not trapped. ENS records are portable, resolvable, and recoverable through standard ENS mechanisms. Namespace is infrastructure — not a custodial lock-in. Onchain subnames are user-owned NFTs; offchain subnames can be migrated.",
    category: "General",
  },
  {
    question: "How does Namespace make money?",
    answer:
      "Namespace charges a fixed 5% fee on subname minting revenue — only when the partner sets a non-zero price. If subnames are minted for free, Namespace charges nothing. Offchain subnames are always free to issue regardless of volume.",
    category: "General",
  },
  {
    question: "What's the difference between onchain and offchain subnames?",
    answer:
      "Onchain subnames are minted on Ethereum, Base, or Optimism as NFTs — maximum security, user-owned, unruggable, with gas costs. Offchain subnames are stored in Namespace's database using CCIP-Read — gasless, instant, free to create, and designed for high-volume onboarding. Namespace supports both models.",
    category: "Technology",
  },
  {
    question: "Are offchain subnames secure?",
    answer:
      "Yes. Offchain subnames are signed, verifiable, and resolvable through standard ENS mechanisms (CCIP-Read / EIP-3668). Resolution is trustless — a CCIP-Read gateway returns signed data that is verified onchain. They trade full onchain guarantees for scalability and zero gas costs.",
    category: "Technology",
  },
  {
    question: "Does Namespace support L2s and rollups?",
    answer:
      "Yes. Namespace supports Base, Optimism, Celo, and Filecoin, with custom deployments tailored to each ecosystem. Partners like Celo use Namespace for Celonames (name.celo.eth) and Filecoin for Filpay usernames.",
    category: "Technology",
  },
  {
    question: "Is Namespace production-ready?",
    answer:
      "Yes. Namespace infrastructure is live, battle-tested, and operating at large scale. It has served millions of ENS resolution requests with 100% uptime and powers production identity systems for Celo, Filecoin, POAP, and 30+ other partners.",
    category: "Technology",
  },
  {
    question: "Who typically integrates Namespace?",
    answer:
      "Wallets issuing usernames, L2 and rollup chains building chain-wide identity, DeFi and payment apps replacing addresses with names, AI agent platforms giving agents persistent ENS identities, and DAOs or communities issuing member names.",
    category: "Integrations",
  },
  {
    question: "How long does a Namespace integration take?",
    answer:
      "Depending on scope, anywhere from a few days to a few weeks. Namespace works with teams from initial brainstorming through launch and post-launch support — including SDK integration, resolver setup, and custom configurations.",
    category: "Integrations",
  },
  {
    question: "Why not build ENS naming infrastructure ourselves?",
    answer:
      "Many teams try and underestimate the complexity. Production naming infrastructure requires resolvers, CCIP-Read gateways, metadata services, indexing, ENSIPs compliance, security monitoring, and ongoing protocol updates. Namespace abstracts all of that so teams ship faster without a permanent internal naming team.",
    category: "Integrations",
  },
  {
    question: "Do you provide SDKs and APIs?",
    answer:
      "Yes. Namespace provides a JavaScript/TypeScript SDK and REST API for programmatic subname registration, management, and resolution. It supports both offchain and onchain flows, full CRUD on ENS records, and bulk operations. Full docs at docs.namespace.ninja.",
    category: "Integrations",
  },
  {
    question: "Does Namespace offer ongoing support?",
    answer:
      "Yes. Namespace operates as a long-term infrastructure partner, not a one-off vendor. It provides SLAs, ongoing monitoring, and protocol update management. Current long-term partners include Celo (Celonames) and Filecoin (Filpay usernames).",
    category: "Integrations",
  },
];
