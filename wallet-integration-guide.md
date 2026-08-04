# ENS for wallets: integration guide

## Why ENS, briefly

Your users transact with 42-character hex strings. That is the root of three problems every wallet team knows:

- **Bad UX.** Addresses are unreadable and unmemorable - copy-paste is the entire interaction model, and every paste is a leap of faith.
- **Real losses.** Address poisoning and clipboard-swap attacks work because one `0x4f3a...c8d2` looks like another. Users lose funds; your support queue absorbs the blame.
- **Invisible brand.** Every transaction your users make outside your app shows an anonymous string that could belong to any wallet.

ENS names fix all three: people send to `alice.yourwallet.eth`, verify a name and avatar instead of comparing hex, and carry your brand into every explorer, dApp, and feed they touch. Uniswap, Base, and Gemini have already shipped this playbook - 2M+ uni.eth and 3.5M+ Basenames issued.

## Two levels of ENS support

ENS integration is two-fold, and they are independent - you can ship Level 1 this week and add Level 2 when you are ready:

| | What it means | Effort | What you need |
| --- | --- | --- | --- |
| **Level 1: ENS resolution** | Your wallet *reads* ENS - users can send to any existing ENS name, and known addresses display as names | Hours. Read-only, any ENS library, no account or API key | An ENS-aware library (viem, ethers) |
| **Level 2: ENS usernames** | Your wallet *issues* names - every user gets `alice.yourwallet.eth` at signup, under your brand | Days. One API, no contracts to deploy, gasless and free offchain | A parent ENS name + Namespace API key |

---

# Level 1: ENS resolution

## What it is and why it matters

Resolution is the read side of ENS: turning `bob.eth` into an address (forward) and an address back into `bob.eth` (reverse). Millions of people already own ENS names and expect to type them into send flows - a wallet that can't resolve them fails at table-stakes UX that every major wallet already ships.

It is also your cheapest security win. A recipient who appears as a name with an avatar is the strongest defense against address poisoning: a lookalike `0x` address has nothing to imitate when your UI shows identity instead of hex.

Resolution requires nothing from Namespace - it is standard ENS, read-only, free, and works against any public RPC.

## Integration

**Forward resolution - in your send flow**, when the user types a recipient:

```ts
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";

const publicClient = createPublicClient({ chain: mainnet, transport: http() });

const address = await publicClient.getEnsAddress({ name: normalize(input) });
```

**Identity before confirm** - show the name and avatar on the confirmation screen, not just the resolved address:

```ts
const avatar = await publicClient.getEnsAvatar({ name: normalize(input) });
```

**Reverse resolution - everywhere you currently render an address** (activity feeds, tx history, contact lists):

```ts
const name = await publicClient.getEnsName({ address: counterparty });
// render name ?? truncatedAddress
```

Notes that keep this correct:

- Always `normalize()` user input (ENSIP-15) before resolving.
- Resolve at send time, never cache name→address mappings long-term - records can change.
- ENS names can hold addresses for multiple chains; resolve against the coin type you are sending on.
- This resolves *every* ENS name - `.eth` names, subnames from other wallets, DNS-imported names. CCIP-Read (offchain names) is handled transparently by the library.

**Level 1 checklist**

- [ ] Typing any `.eth` name in the send flow resolves to an address
- [ ] Confirmation screen shows name + avatar
- [ ] Addresses in history/activity render as names when a reverse record exists
- [ ] Unresolvable input fails clearly (no silent fallback to treating it as hex)

Ship this and your users can already *use* ENS. Level 2 makes them *have* it.

---

# Level 2: ENS usernames for your users (subnames)

## What it is and why it matters

Level 2 is the write side: issuing every user a name under your brand - `alice.yourwallet.eth` - as ENS subnames (surfaced to users as usernames). A name to claim is a better first step than an address to copy, and every name displayed in another app is free brand distribution that compounds with user activity. Free names drive growth; premium names and renewals are revenue when you want it.

Mechanically: offchain subnames live in Namespace's managed store and resolve through CCIP-Read (EIP-3668), with records signed and verified onchain. Issuance is instant, gasless, and free at any volume. There are no contracts to deploy - the only onchain transaction in this guide is a one-time resolver update on your parent name.

```
Signup                    Namespace                     Everywhere else
┌──────────────┐  create  ┌──────────────┐  CCIP-Read  ┌──────────────┐
│ user picks   │ ───────> │ subname API  │ <────────── │ Etherscan,   │
│ "alice"      │          │ + gateway    │             │ dApps, other │
└──────────────┘          └──────────────┘             │ wallets      │
                                                       └──────────────┘
```

## Quickstart (10 minutes)

Issue and resolve your first subname on Sepolia before wiring anything into your product.

**1. Get an API key** from the [Dev Portal](https://dev.namespace.ninja) <!-- TODO(docs): confirm portal URL + key issuance flow -->

**2. Install the SDK**

```bash
npm install @thenamespace/offchain-manager
```

**3. Create a client and issue a name**

```ts
import { createOffchainClient, ChainName } from "@thenamespace/offchain-manager";

const client = createOffchainClient({
  mode: "sepolia",
  defaultApiKey: process.env.NAMESPACE_API_KEY,
});

const { isAvailable } = await client.isSubnameAvailable("alice.yourwallet.eth");

if (isAvailable) {
  await client.createSubname({
    label: "alice",
    parentName: "yourwallet.eth",
    owner: userAddress,
    addresses: [{ chain: ChainName.Ethereum, value: userAddress }],
    texts: [{ key: "avatar", value: userAvatarUrl }],
  });
}
// alice.yourwallet.eth now resolves everywhere
```

**4. See it resolve.** Paste the name into [app.ens.domains](https://app.ens.domains), or resolve it with the Level 1 code you already shipped.

No wallet with funds was needed at any point. That is what gasless means here.

## Setup: your namespace

One-time setup before production. Everything after this section is plain API calls.

1. **Own the parent name.** Register `yourwallet.eth` (or bring the ENS name you already own).
2. **Point its resolver at Namespace.** The single onchain transaction in the whole integration. Do it from the Dev Portal or directly in the ENS Manager app. <!-- TODO(docs): link exact resolver address + walkthrough -->
3. **Create API keys** - one per environment. Pass as `defaultApiKey` at client creation; store in env vars, never client-side.
4. **Pick your mode.** `mode: "sepolia"` for staging, `mode: "mainnet"` for production. Use separate parent names per environment so staging claims never collide with real users.

## Step 1 - At signup: claim

The claim flow is an availability check plus a create call. What makes it feel native is everything around it:

```ts
// suggest a label from what you already know
const suggestion = deriveLabel(user.handle ?? user.email); // "alice"

const { isAvailable } = await client.isSubnameAvailable(`${suggestion}.yourwallet.eth`);

await client.createSubname({
  label: suggestion,
  parentName: "yourwallet.eth",
  owner: user.address,
  addresses: [{ chain: ChainName.Ethereum, value: user.address }],
  texts: [{ key: "avatar", value: user.avatarUrl }],
  metadata: [{ key: "userId", value: user.id }], // your internal reference, not public
});
```

**Label rules to enforce client-side** (the API enforces them too, but fail fast in your UI):

- Lowercase letters, digits, hyphens; no leading/trailing hyphen
- Normalize with ENSIP-15 (`@adraffy/ens-normalize` or viem's `normalize`)
- Keep a reserved list: your brand names, `admin`, `support`, top exchange names - anything phishable

**Listing a user's names** (e.g. for a settings screen):

```ts
const page = await client.getFilteredSubnames({
  parentName: "yourwallet.eth",
  owner: user.address,
  page: 1,
  size: 10,
});
```

> **Idempotency tip:** treat `createSubname` failures on an already-claimed label as a prompt to re-check availability, not to retry blindly.

## Step 2 - Profiles: records

Subname records are standard ENS data - readable by any app, portable by design. Read and update them as your profile layer:

```ts
// read
const all = await client.getTextRecords("alice.yourwallet.eth");
const { record } = await client.getTextRecord("alice.yourwallet.eth", "avatar");
```

Common text records: `avatar`, `name`, `description`, `url`, `com.twitter`. Whatever you set is visible to every ENS-aware app - that is the feature, not a leak. Keep private data in `metadata` (internal) rather than `texts` (public).

Subnames can carry addresses for multiple chains (`addresses: [{ chain: ... }]`), so one name routes ETH, Base, and other network payments to the right place.

For avatar image uploads, see the [Avatar SDK](https://docs.namespace.ninja/developer-guide/sdks/avatar).

## Step 3 - Later: onchain upgrade (optional)

Offchain names cover the core UX free of charge. Some users eventually want full onchain ownership - the name as an NFT in their own wallet, transferable and provably theirs. Offer it as a premium tier, keep the same label, and migrate without a rename.

Use the [Mint Manager SDK](https://docs.namespace.ninja/developer-guide/sdks/mint-manager) to check eligibility and generate mint transaction parameters for Ethereum or L2 chains. The user pays gas; you set the price (including free).

When to offer it: power users, paid tiers, or anyone asking "do I actually own this?" The answer for onchain names is yes, verifiably - Namespace cannot take an onchain name back.

Pricing note: offchain issuance is free at any volume. If you charge for onchain mints, Namespace takes a fixed 5% of that minting revenue. Nothing on free issuance. See [pricing](https://namespace.ninja/solutions/wallets) for details.

## Level 2 testing checklist

Work through this on Sepolia before mainnet. Teams typically clear it in a day or two.

- [ ] Claim succeeds for a fresh label; re-claim of the same label fails cleanly
- [ ] Invalid labels (uppercase, unwanted emoji, reserved words) are rejected in your UI
- [ ] Name resolves via `getEnsAddress` from a public RPC (not just your own client)
- [ ] Name shows up on app.ens.domains with avatar and address records
- [ ] Your Level 1 send flow resolves your own subnames like any other ENS name
- [ ] Reverse resolution renders your subnames in history / activity feeds
- [ ] Load test your claim path: issuance is not limited by chain throughput, but your signup flow has its own limits

**Going to production:** switch `mode` to `"mainnet"`, swap parent name and API key, and set up monitoring on your claim endpoint. Resolution runs on Namespace-operated gateways with SLAs; status and incident history at <!-- TODO(docs): status page URL -->.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Name created but not resolving | Parent resolver not pointed at Namespace | Complete the resolver step in Setup; verify on the ENS Manager app |
| `isSubnameAvailable` true, `createSubname` fails | Race: claimed between check and create | Re-check availability, prompt for a new label |
| Resolution works in your app, not in others | You are reading from your own store, not via ENS | Resolve through a standard ENS library against a public RPC |
| Names resolve on mainnet tools but you are testing Sepolia | Mode/network mismatch | Ensure client `mode`, parent name, and the resolving RPC are on the same network |
| Avatar not showing in other apps | `avatar` text record missing or unreachable URL | Set a public HTTPS or IPFS URL in the `avatar` record |
| `.eth` name typed in send flow does not resolve (Level 1) | Input not normalized, or RPC lacks ENS support | `normalize()` input; use a mainnet-capable RPC for ENS lookups |

## Skip ahead

- **Clone instead of build:** [wallet integration template (Privy + Namespace)](https://github.com/thenamespace/ens-subnames-privy-template) - a working claim flow to fork
- **Not on TypeScript:** [REST API reference](https://docs.namespace.ninja/api-reference/introduction) - everything above, as plain HTTP
- **Prebuilt claim UI:** [ENS Components](https://enscomponents.com/)
- **Partner build:** for custom features and white-glove integration, [book a discovery call](https://cal.com/thecap.eth/discovery)
