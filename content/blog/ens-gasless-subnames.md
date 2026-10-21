---
title: "ENS Gasless Subnames: Cutting Gas Costs for High-Volume Apps"
slug: ens-gasless-subnames
description: "ENS gasless subnames let high-volume apps assign Web3 identities to thousands of users with zero per-user transaction fees. Here is how it works."
excerpt: "How offchain ENS subnames let high-volume apps give every user a Web3 identity with no per-user gas."
date: 2026-10-21
author: Cap
tag: ENS
format: markdown
image: /assets/images/ens-gasless-subnames-cover.png
imageAlt: "Gas coins crossed out, feeding a single ENS identity card that connects to web, gaming, mobile, and desktop apps"
---
# ENS Gasless Subnames: Cutting Gas Costs for High-Volume Apps

Gas costs are not a minor inconvenience for high-volume applications. They are a structural barrier. When every user action requires an onchain transaction, the economics of issuing ENS subnames at scale become difficult to justify, and the user experience suffers alongside the budget.

ENS gasless subnames solve this directly. By moving name issuance offchain, applications can assign human-readable Web3 identities to thousands of users without paying any gas per name. The name resolves through ENS infrastructure, the user gets a real identity, and the application avoids the cost and complexity of onchain writes for every user.

## What "Gasless" Actually Means in ENS

In standard ENS subname issuance, each name registration is an onchain transaction. That transaction costs gas. For a single user, the cost is manageable. For an application issuing names to tens of thousands of users, it adds up quickly.

Gasless subnames work differently. Instead of writing each name to a smart contract, the name and its records are stored offchain, typically in a database run by the operator of a CCIP-Read gateway. When someone looks up that name, the ENS resolution process queries that gateway via CCIP-Read ([EIP-3668](https://eips.ethereum.org/EIPS/eip-3668)), the Ethereum standard for secure offchain data retrieval. The name resolves in any ENS-compatible client that supports CCIP-Read, without the issuance ever touching the chain.

The result is a name that, from the user's point of view, behaves like an ENS subname: it resolves to a wallet address, supports text records, and works in wallets and dApps. The difference is that issuing it costs nothing.

## Why High-Volume Apps Cannot Ignore This

Consider what happens when a social app, gaming platform, or DeFi protocol wants to give every user a human-readable identity. If each username costs gas to register, the application either absorbs that cost, which is often too expensive at scale, or passes it to users, which adds friction at onboarding.

Neither option works. Users who have never paid gas before will not start now just to get a username. And applications that pay gas for every user at scale are spending budget on infrastructure that should be invisible.

Gasless issuance removes that tradeoff. The application issues names freely, users get identities immediately, and the costs are limited to the parent ENS name (an annual registration fee for a .eth name) plus a one-time transaction to point that name at an offchain resolver. There is no per-user fee.

This matters most for:

- **Consumer apps with large user bases** where per-user gas costs would be too high
- **Onboarding flows** where friction at the first step determines whether users stay
- **Gaming and social platforms** where identities are expected to be instant and free
- **Protocols running loyalty or rewards programs** that need to issue identities in bulk

## How ENS Gasless Resolution Works

The technical foundation is CCIP-Read, combined with wildcard resolution ([ENSIP-10](https://docs.ens.domains/ensip/10)). Wildcard resolution lets the parent name's resolver answer for subnames that do not exist in the ENS registry. CCIP-Read lets that resolver send the client to an offchain gateway for the answer.

When a resolver receives a lookup request, it responds with a directive to query an offchain gateway. The client fetches the data from that gateway and passes the response back to the resolver contract, which verifies that it was signed by an authorized key and returns the result.

For the end user or the application querying the name, this process is transparent. The name resolves. The records are returned.

The parent name owner sets a resolver that supports CCIP-Read and wildcard resolution on their ENS name. That resolver points to an offchain gateway that serves subname records. From then on, issuance is a database write, not a blockchain transaction.

## Issuing Gasless Subnames Without Building Infrastructure

Building a CCIP-Read gateway, managing the offchain data store, and keeping resolver compatibility across ENS updates is non-trivial work. Most application teams do not want to own that infrastructure, and they should not have to.

[Namespace](https://namespace.ninja) handles all of it. As an ENS DAO-approved service provider, Namespace lets developers issue gasless subnames through an SDK, REST API, or no-code app, without deploying contracts or running resolver infrastructure. The parent name connects to Namespace's offchain resolution layer, and subnames can be issued programmatically from that point forward.

The [integration guide for issuing subnames without deploying contracts](https://namespace.ninja/blog/how-to-issue-subnames-without-deploying-contracts) covers the setup in detail. The short version: set your parent ENS name's resolver to the Namespace resolver (a single onchain transaction), get an API key, and start issuing subnames via API or SDK. Each issuance is a single API call. No gas, no contract interaction, no infrastructure to maintain.

Teams already using this approach at scale include:

- **[PinMe](https://pinme.eth.limo):** A one-command tool that pins static websites to IPFS and maps each one to an ENS subname under `pinme.eth`, using Namespace to create and manage the subnames. It has attached content to more than 800,000 subnames. See the [PinMe case study](https://namespace.ninja/blog/case-study-pinme-forever-frontends).
- **[Unicorn](https://www.myunicornaccount.com):** Used Namespace's offchain subnames to give 25,000+ ETHDenver attendees a branded ENS username in one integration. See the [Unicorn case study](https://namespace.ninja/blog/case-study-namespace-x-unicorn).
- **[POAP](https://poap.xyz):** Migrated from its previous provider to Namespace's offchain subnames API with no downtime and issued more than 5,000 in-app usernames. See the [POAP case study](https://namespace.ninja/blog/case-study-poap-in-app-ens-usernames-with-namespace).

## Gasless vs. Onchain: Choosing the Right Model

Gasless issuance is not always the right choice. Understanding when to use it, and when onchain makes more sense, is part of building a coherent identity system.

**Gasless subnames are the right choice when:**

- You need to issue names to many users quickly and cheaply
- Users are not expected to pay gas themselves
- The identity does not need to be independently owned or transferred by the user
- Speed of issuance matters more than onchain permanence

**Onchain subnames make more sense when:**

- The user needs to own their name as an onchain asset, including the ability to transfer it
- The application requires onchain composability, for example reading the name from a smart contract (contracts cannot fetch offchain data themselves)
- Permanence and censorship resistance are explicit product requirements

Many applications use both. Gasless subnames handle onboarding and lightweight identity; onchain names serve users who want something more durable and self-sovereign. Namespace supports both models, including onchain issuance on Ethereum, Base, and Optimism, so the same infrastructure can serve both use cases without switching providers.

## What Resolves, and Where

A common concern with offchain names is compatibility. If the name is not onchain, will it resolve in wallets? In DeFi interfaces? In block explorers?

In most cases, yes. All ENS resolution starts on Ethereum Mainnet, and the major Web3 libraries (viem, wagmi, ethers, and ENSjs) handle CCIP-Read automatically. Any wallet or app that uses an up-to-date version of these libraries will resolve a CCIP-Read name correctly. Apps that use outdated libraries or custom resolution code without CCIP-Read support will not, so it is worth testing the specific wallets and apps your users rely on.

For resolution itself, the name looks the same as an onchain name. It is not identical in every respect: an offchain subname is not an NFT, does not appear in the ENS registry or onchain indexes, and cannot be read by smart contracts.

Namespace also provides [Resolvio](https://resolvio.xyz), a free universal ENS resolution API with single and bulk lookups, caching, reverse resolution, and cross-chain resolution across Ethereum, Base, and Optimism. For applications that need broad reach, this matters.

## Practical Considerations Before You Integrate

A few things worth knowing before building on gasless subnames:

**You need a parent ENS name.** Gasless subnames live under a parent name, for example `yourapp.eth`. That parent name must be registered and set to use the offchain resolver. Setting the resolver is a one-time onchain transaction. A .eth name also has an annual registration fee and must be renewed, or the subnames under it stop working when it expires.

**Records are mutable.** Because the data lives offchain, records can be updated without gas. This is useful for applications where user profiles change frequently: wallet addresses, avatars, social handles.

**Offchain does not mean unverifiable.** The gateway signs each response with a trusted key, and the resolver contract checks that signature before returning the result. The trust model is different from onchain storage (you trust the gateway operator), but it is not absent.

**Moving users onchain later.** If some users later want a name they fully own, you can issue them onchain subnames from the same parent name. Starting gasless does not block an onchain tier later.

For a broader introduction to how subnames work and what they enable, the [ENS subnames overview](https://namespace.ninja/blog/unified-identity-for-your-community-with-ens-subnames) is a useful starting point before diving into implementation.

## Building Identity at Scale

The economics of identity in high-volume applications only work if the cost of issuance approaches zero. Gasless ENS subnames make that possible without giving up the interoperability and human readability that make ENS names worth using in the first place.

The infrastructure required to do this well (CCIP-Read gateways, offchain resolvers, compatibility layers) is complex to build and maintain. Namespace exists so that application teams do not have to build it themselves.

If your application needs to issue ENS subnames at scale, without gas and without infrastructure overhead, [Namespace](https://namespace.ninja) is where to start.

---

## Frequently Asked Questions

**What is an ENS gasless subname?**
An ENS gasless subname is a subname issued offchain and resolved using CCIP-Read (EIP-3668) and wildcard resolution (ENSIP-10). Instead of writing the name to a smart contract, the name and its records are stored in an offchain database and served through a gateway. The name resolves in ENS-compatible wallets and applications, but no gas is spent during issuance.

**Do gasless ENS subnames resolve in standard wallets?**
Yes, in any wallet or app whose ENS resolution supports CCIP-Read, which includes current versions of viem, wagmi, ethers, and ENSjs. The process is transparent to the end user: the name resolves to the correct address and records. Apps with outdated or custom resolution code may not resolve offchain names.

**What do I need to issue gasless subnames?**
You need a registered parent ENS name (for example, `yourapp.eth`) with its resolver set to a resolver that supports CCIP-Read and wildcard resolution. Setting the resolver is a one-time transaction. After that, subnames can be issued via API or SDK without any contract deployment or further gas. Namespace handles the resolver infrastructure and offchain data layer.

**Are gasless subnames permanent?**
Gasless subnames exist as long as the offchain data store and gateway are maintained and the parent name stays registered. They do not carry the same permanence guarantees as onchain names. For most application use cases (onboarding, in-app identity, loyalty programs), the offchain model is sufficient.

**Can users update their gasless subname records?**
Yes. Because records are stored offchain, they can be updated without paying gas. This makes gasless subnames well suited for applications where user profiles change frequently, such as social platforms or gaming apps.

**What is the difference between gasless and onchain ENS subnames?**
Gasless subnames are stored offchain and cost nothing to issue. Onchain subnames are written to a smart contract on Ethereum or an L2 and require gas, but they are recorded onchain, can be held and transferred by the user (depending on the permissions the parent owner sets), and can be read by other smart contracts. The right choice depends on whether the application prioritizes scale and low cost (gasless) or user ownership and onchain composability (onchain).

**How does Namespace support gasless subname issuance?**
Namespace provides the resolver infrastructure, offchain data layer, and developer tooling (SDK, REST API, and a no-code app) needed to issue gasless subnames without deploying contracts or managing backend systems. It is an ENS DAO-approved service provider and also supports onchain subnames on Ethereum, Base, and Optimism.
