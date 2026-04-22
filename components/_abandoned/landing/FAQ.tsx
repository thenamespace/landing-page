"use client";

import { useState } from "react";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { Plus, Minus } from "@/components/ui/Icons";
import { cn } from "@/components/ui/cn";

const FAQ_ITEMS = [
  {
    q: "What is Namespace?",
    a: "Namespace is an ENS service provider working on Web3 naming and identity. We design, build, and operate ENS-based naming systems that give crypto users, contracts, and AI agents human-readable identities instead of raw addresses.",
  },
  {
    q: "How is Namespace different from ENS itself?",
    a: "ENS is a protocol. Namespace is the execution and distribution engine. ENS defines how names work; Namespace builds the systems that make naming easily usable at scale for wallets, L2s, apps, DAOs, and communities.",
  },
  {
    q: "Is Namespace a protocol or a company?",
    a: "Namespace is a company that builds production-grade infra, tooling, and apps on top of open protocols like ENS. We do not replace ENS — we extend it, operate it at scale, and make it easily usable for real products.",
  },
  {
    q: "How big is Namespace today?",
    a: "Namespace manages 800k+ subnames, serves millions of resolution requests, and works with 30+ partners across wallets, chains, DAOs, and apps.",
  },
  {
    q: "What's the difference between onchain and offchain subnames?",
    a: "Onchain subnames live on Ethereum or L2s, come with higher guarantees, minting costs, and are typically NFTs. Offchain subnames are stored in a database, free to create, and designed for scale. Namespace supports both and helps partners choose the right model.",
  },
  {
    q: "Can Namespace handle millions of users?",
    a: "Yes. Namespace was designed specifically for high-volume issuance, resolution, and management — with SLAs tailored per partnership rather than one-size-fits-all.",
  },
  {
    q: "Does Namespace support L2s?",
    a: "Yes. Namespace actively supports L2s, including custom deployments tailored to each ecosystem. Currently we support Base, Optimism, Celo, and Filecoin.",
  },
  {
    q: "What happens if Namespace disappears?",
    a: "Names are not trapped. ENS records are portable, resolvable, and recoverable. Namespace is infrastructure — not a custodial lock-in.",
  },
  {
    q: "How do we get started?",
    a: "Wallets & apps integrate usernames via SDK/API. L2s & blockchains launch a native chain-wide identity system. DAOs & communities issue member names using no-code tools or custom integrations. Developers experiment in the Namespace App, SDKs, and UI Kit.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" className="relative">
      <Container size="default">
        <SectionHeader
          eyebrow="FAQ"
          title={
            <>
              Frequently asked{" "}
              <em className="italic">questions.</em>
            </>
          }
          description="Everything we get asked most. Can't find what you need? Book a call."
          align="center"
        />

        <div className="divide-y divide-border border-y border-border">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 py-6 md:py-7 text-left hover:text-accent transition-colors group"
                >
                  <span className="font-display text-xl md:text-2xl tracking-tight pr-4">
                    {item.q}
                  </span>
                  <span
                    className={cn(
                      "flex-none h-9 w-9 rounded-full border border-border flex items-center justify-center transition-all",
                      isOpen
                        ? "bg-accent text-accent-fg border-accent rotate-180"
                        : "text-text-muted group-hover:border-accent group-hover:text-accent",
                    )}
                  >
                    {isOpen ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 pb-6 md:pb-8"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="text-text-muted leading-relaxed max-w-2xl">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
