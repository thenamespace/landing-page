# How to Issue ENS Subnames Without Deploying Contracts

## Table of Contents
- [Why Most Teams Skip ENS (And Why That's Changing)](#why-most-teams-skip-ens)
- [What You're Actually Building](#what-youre-actually-building)
- [Offchain vs. Onchain Subnames: Which One Do You Need?](#offchain-vs-onchain-subnames)
- [How the Namespace ENS Subname API Works](#how-the-namespace-ens-subname-api-works)
  - [Option 1: REST API](#option-1-rest-api)
  - [Option 2: JavaScript/TypeScript SDK](#option-2-javascripttypescript-sdk)
  - [Option 3: No-Code App](#option-3-no-code-app)
- [Ready-Made UI Components](#ready-made-ui-components)
- [Resolution: Making Subnames Useful Across Chains](#resolution-making-subnames-useful-across-chains)
- [Who This Is Built For](#who-this-is-built-for)
- [FAQs](#faqs)

---

## Why Most Teams Skip ENS {#why-most-teams-skip-ens}

Your users are staring at `0x4f3a...c8d2` and wondering why Web3 feels so hostile. You know ENS would fix that. But then you look at what it actually takes to implement it properly - deploying a resolver contract, managing gas, handling upgrades, supporting multiple chains — and suddenly it drops to the bottom of the backlog.

That's the gap Namespace closes. You get ENS subname issuance through a single API call or SDK implementation, with no contracts to write, no infrastructure to manage, and no gas fees for offchain names. Teams like Pinme have used it to attach immutable content to more than 800k subdomains. Unicorn Wallet used it to give 20k users a brandable ENS username in one integration. And many others.

This guide walks you through exactly how it works.

---

## What You're Actually Building {#what-youre-actually-building}

An ENS subname is a human-readable identity that sits under a parent domain. If your app owns `yourapp.eth`, you can issue `alice.yourapp.eth` to your users. That name resolves to their wallet address, works across 1,000 ENS-compatible apps, and makes your product feel like a real identity layer rather than a raw address book.

The traditional path to issuing subnames requires:

- Deploying a subdomain registrar contract
- Writing and auditing resolver logic
- Paying gas for every issuance
- Maintaining contracts as ENS evolves

Namespace handles all of that. You call an API. Users get names.

---

## Offchain vs. Onchain Subnames {#offchain-vs-onchain-subnames}

Before you integrate ENS, decide which model fits your use case best. 

### Offchain Subnames

Offchain subnames are stored offchain and resolved using CCIP-read. They cost nothing to issue — no gas, no transaction, no waiting. Resolution still works across ENS-compatible ecosystems because the protocol handles the lookup transparently.

**Best for:** Apps issuing names at scale, free tiers, onboarding flows where friction kills conversion.

### Onchain Subnames

Onchain subnames are minted directly on Ethereum, Base, or Optimism. They live in the ENS registry, are fully composable, and can be transferred or used in any onchain context. However, they cost gas fees to mint, and require more setting up.

**Best for:** Premium identity tiers, cases where users need provable ownership, or when you want names to be onchain tradeable assets.

You can offer both. It's possible to start with offchain for free users and onchain for paid or power users. Namespace supports either path through the same integration surface.

---

## How the Namespace ENS Subname API Works {#how-the-namespace-ens-subname-api-works}

Namespace gives you three ways to integrate ENS subname issuance: a REST API, a JavaScript/TypeScript SDK, and a no-code app. Pick the one that fits your stack.

### Option 1: REST API {#option-1-rest-api}

The REST API is the most flexible path for issuing offchain subnames. Send a POST request with the label, parent name, and the address you want it to resolve to. Namespace handles the rest.

A basic offchain subname issuance call looks like this:

```http
POST https://offchain-manager.namespace.ninja/api/v1/subnames
x-auth-token: YOUR_API_KEY
Content-Type: application/json

{
  "label": "alice",
  "parentName": "yourapp.eth",
  "owner": "0x4f3a...c8d2",
  "addresses": [
    { "coinType": 60, "value": "0x4f3a...c8d2" }
  ]
}
```

The response confirms the subname was created or updated. No transaction hash, because there's no transaction.

You can also use the API to:

- Look up existing subnames by label or address
- Update ENS records (avatar, text records, contenthash)
- Delete or revoke subnames
- Bulk-issue subnames for existing user lists

For **onchain subname minting**, the REST API is not the right tool. Head to [app.namespace.ninja](https://app.namespace.ninja) to activate your ENS name and enable onchain subname minting on Ethereum, Base, Optimism, and more chains.

The API is documented at [docs.namespace.ninja](https://docs.namespace.ninja/api-reference/introduction).

### Option 2: JavaScript/TypeScript SDK {#option-2-javascripttypescript-sdk}

If you're building in JavaScript or TypeScript, the `@thenamespace/offchain-manager` SDK wraps the API with typed methods and handles authentication, retries, and error handling for you.

Install it:

```bash
npm install @thenamespace/offchain-manager
```

Initialize the client and issue an offchain subname:

```typescript
import { createOffchainClient, ChainName } from '@thenamespace/offchain-manager';

const client = createOffchainClient({
  mode: 'mainnet',
  defaultApiKey: process.env.NAMESPACE_API_KEY,
});

await client.createSubname({
  label: 'alice',
  parentName: 'yourapp.eth',
  owner: '0x4f3a...c8d2',
  addresses: [{ chain: ChainName.Ethereum, value: '0x4f3a...c8d2' }],
  texts: [{ key: 'name', value: 'Alice' }],
});
```

Use `mode: 'sepolia'` for testing. Get your API key at [app.namespace.ninja/offchain](https://app.namespace.ninja/offchain).

> Ready to integrate? Start at [namespace.ninja](https://namespace.ninja) to get your API key and explore the docs.

### Option 3: No-Code App {#option-3-no-code-app}

Not every team needs a custom integration on day one. The Namespace app lets you issue and manage subnames through a UI — no code required. It's useful for:

- Testing before you build
- Ops teams managing subnames manually
- Onchain minting for small batches of users
- Onchain minting for communities 

You can access the app directly from [app.namespace.ninja](https://app.namespace.ninja).

---

## Ready-Made UI Components {#ready-made-ui-components}

If you need a registration flow inside your app, [ENS Components](https://enscomponents.com/) gives you pre-built React components for both offchain and onchain subname registration and record editing.

Install:

```bash
npm install @thenamespace/ens-components wagmi viem @tanstack/react-query
```

Drop in a gasless offchain registration form:

```tsx
import { OffchainSubnameForm } from '@thenamespace/ens-components';

<OffchainSubnameForm
  parentDomain="yourapp.eth"
  apiKey="YOUR_API_KEY"
  onSuccess={(subname) => console.log(`Registered: ${subname}`)}
/>
```

For onchain minting, use `SubnameMintForm` instead — it handles price lookup, record selection, and wallet transaction submission automatically.

The component handles input, validation, API calls, and success state. Style it to match your product. This cuts the UI work down to an afternoon, not a sprint.

---

## Resolution: Making Subnames Useful Across Chains {#resolution-making-subnames-useful-across-chains}

Issuing subnames is only half the job. You also need them to resolve reliably — in your app, in wallets, in payment flows, and across L2s.

Namespace team built [Resolvio](https://www.resolvio.xyz/), a free, API-first universal ENS resolution service. It supports:

- Single and bulk name resolution
- Caching for performance
- Cross-chain resolution across Ethereum, Base, and Optimism
- Self-hosting if you need full control

A simple resolution call:

```http
GET https://api.resolvio.xyz/ens/v2/profile/alice.yourapp.eth
```

Response:

```json
{
  "name": "alice.yourapp.eth",
  "addresses": [
    {
      "coin": 60,
      "chain": "eth",
      "value": "0x4f3a...c8d2",
      "exists": true
    }
  ],
  "texts": [
    { "key": "avatar", "value": "https://...", "exists": true }
  ],
  "resolver": "0x..."
}
```

Resolvio also supports reverse resolution — look up a name from an address — which is useful for displaying names in transaction histories and activity feeds.

The 16M+ resolutions Namespace has already processed run through this infrastructure. It's built to handle scale without you managing any of it.

---

## Who This Is Built For {#who-this-is-built-for}

Namespace works for any team that needs to give users human-readable ENS identities without building the infrastructure from scratch. In practice, that means:

**Wallet teams** — Issue a branded subname at signup. Every user gets `username.yourwallet.eth` automatically. One SDK call in your onboarding flow.

**L2 and rollup chains** — Launch a native chain identity system. Celo did this without writing a single custom contract. Users on your chain get names that resolve across the ENS ecosystem.

**Payment apps** — Replace raw addresses in send flows with names users recognize and trust. Reduces errors, improves conversion.

**WaaS and RaaS providers** — Add naming as a feature for your customers. 30+ teams are already doing this through Namespace.

**AI agent builders** — Give AI agents human-readable identities that are ERC-8004 compliant. Furhermore, we have an ENS MCP, a tool lets AI agents query names. Open-source, available on [our GitHub](https://github.com/thenamespace/ens-mcp).

If your team has 1–3 engineers handling all integrations, this is exactly the kind of tool that saves you from a multi-week infrastructure project. You get ENS subname issuance, resolution, and UI components in one place, backed by an ENS DAO-approved service provider.

---

## FAQs {#faqs}

**What is an ENS subname API?**
An ENS subname API lets developers issue, manage, and resolve ENS subnames programmatically — without deploying smart contracts or managing resolver infrastructure. Namespace provides a REST API and JavaScript/TypeScript SDK for this purpose.

**Do I need to own an ENS domain to issue subnames?**
Yes, you need a parent ENS domain (for example, `yourapp.eth`) to issue subnames under it. Namespace manages the resolver and issuance infrastructure on top of your domain.

**What is the difference between offchain and onchain ENS subnames?**
Offchain subnames are stored offchain and resolved using CCIP-read — they cost nothing to issue and work instantly. Onchain subnames are minted to the ENS registry on Ethereum, Base, or Optimism and are fully composable and transferable on-chain.

**Is gasless ENS integration actually possible?**
Yes. Offchain subname issuance through Namespace requires no gas because no on-chain transaction occurs at issuance. Resolution still works across ENS-compatible apps via CCIP-read.

**Which chains does Namespace support for onchain subnames?**
Namespace supports onchain subname minting on Ethereum mainnet, Base, and Optimism.

**How long does it take to integrate the Namespace ENS subname API?**
Most teams complete a basic integration in a few hours. The SDK handles authentication, retries, and error handling, and the ENS Components library provides ready-made React UI if you need a registration flow.

**What is Resolvio?**
Resolvio is Namespace's free, API-first ENS resolution service. It supports single and bulk resolution, caching, cross-chain lookups, and can be self-hosted. It's the resolution layer that makes issued subnames useful across your app and the broader ENS ecosystem.

---

Your users deserve names, not addresses. The infrastructure to make that happen is a single API call away.

Start building at [namespace.ninja](https://namespace.ninja).
