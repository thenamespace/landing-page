import Link from "next/link";
import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { ArrowUpRight, Cube, Code, Puzzle, Globe } from "@/components/ui/Icons";
import { cn } from "@/components/ui/cn";

type Card = {
  badge: string;
  title: string;
  description: string;
  href: string;
  external?: boolean;
  features?: string[];
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  className?: string;
  hero?: React.ReactNode;
};

const CARDS: Card[] = [
  {
    badge: "Offchain",
    title: "Offchain Subnames",
    description:
      "Issue ENS subnames at scale using CCIP-Read. Gasless to create, quick setup, simple management. Best for wallets, apps, and communities.",
    href: "https://docs.namespace.ninja/",
    external: true,
    features: ["Gasless · unlimited", "CCIP-Read resolution", "Managed database"],
    Icon: Globe,
    className: "md:col-span-3 md:row-span-2",
    hero: (
      <div className="mt-8 relative">
        <div className="flex items-center gap-3 rounded-lg border border-border bg-surface-2/60 px-4 py-3 font-mono text-sm">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse-dot" />
          <span className="text-text-subtle">resolve</span>
          <span className="text-text">alice.yourapp.eth</span>
          <span className="ml-auto text-accent">→ 0xA11c3…7f0</span>
        </div>
        <div className="mt-3 flex items-center gap-3 rounded-lg border border-border bg-surface-2/60 px-4 py-3 font-mono text-sm">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse-dot" />
          <span className="text-text-subtle">resolve</span>
          <span className="text-text">bob.yourapp.eth</span>
          <span className="ml-auto text-accent">→ 0xB0b…e12</span>
        </div>
        <div className="mt-3 flex items-center gap-3 rounded-lg border border-border bg-surface-2/60 px-4 py-3 font-mono text-sm opacity-70">
          <span className="h-2 w-2 rounded-full bg-border-strong" />
          <span className="text-text-subtle">resolve</span>
          <span className="text-text">carol.yourapp.eth</span>
          <span className="ml-auto text-text-subtle">→ pending…</span>
        </div>
      </div>
    ),
  },
  {
    badge: "Onchain",
    title: "Onchain Subnames",
    description:
      "Fully onchain ENS subnames with wrapped NFTs, higher guarantees, and programmable economics.",
    href: "https://docs.namespace.ninja/",
    external: true,
    features: ["NFT-wrapped", "Programmable", "L1 + L2"],
    Icon: Cube,
    className: "md:col-span-3",
  },
  {
    badge: "Developers",
    title: "SDK & REST API",
    description:
      "Dev-friendly TypeScript SDK and REST API. Ship in an afternoon, not a quarter.",
    href: "https://docs.namespace.ninja/",
    external: true,
    features: ["TypeScript-first", "Webhook events", "Self-serve keys"],
    Icon: Code,
    className: "md:col-span-2",
  },
  {
    badge: "Embed",
    title: "ENS Widget",
    description:
      "Embed subname registration anywhere. A plug-and-play widget that matches your brand.",
    href: "https://docs.namespace.ninja/",
    external: true,
    features: ["Drop-in iframe", "Themeable", "Pre-built flows"],
    Icon: Puzzle,
    className: "md:col-span-2",
  },
  {
    badge: "UI Kit",
    title: "Open-source UI Kit",
    description:
      "Reusable, pre-styled ENS components. Avatar, profile, search — ready to ship.",
    href: "https://github.com/thenamespace",
    external: true,
    features: ["React + Tailwind", "Accessible", "MIT licensed"],
    Icon: Puzzle,
    className: "md:col-span-2",
  },
];

export function Products() {
  return (
    <Section id="products" className="relative">
      <Container size="wide">
        <SectionHeader
          eyebrow="Products"
          title={
            <>
              One toolkit for{" "}
              <em className="font-display italic">every naming surface.</em>
            </>
          }
          description={
            <>
              Five composable products that cover every way teams ship identity
              — from managed infra to dev-focused SDKs and embeddable flows.
            </>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5 auto-rows-fr">
          {CARDS.map((card) => {
            const Content = (
              <article
                className={cn(
                  "group relative rounded-xl border border-border bg-surface/60 p-7 md:p-8 hover:border-border-strong transition-colors h-full overflow-hidden flex flex-col",
                )}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg border border-border-strong bg-surface-2 flex items-center justify-center text-accent">
                      <card.Icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-text-subtle">
                      {card.badge}
                    </span>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-text-subtle group-hover:text-accent transition-colors" />
                </div>

                <h3 className="mt-8 font-display text-2xl md:text-3xl tracking-tight leading-tight">
                  {card.title}
                </h3>
                <p className="mt-3 text-text-muted leading-relaxed">
                  {card.description}
                </p>

                {card.hero}

                {card.features ? (
                  <ul className="mt-auto pt-6 flex flex-wrap gap-2">
                    {card.features.map((f) => (
                      <li
                        key={f}
                        className="text-xs font-mono px-2.5 py-1 rounded-full border border-border text-text-muted"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            );

            const classes = cn("block h-full", card.className);

            if (card.external) {
              return (
                <a
                  key={card.title}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes}
                >
                  {Content}
                </a>
              );
            }
            return (
              <Link key={card.title} href={card.href} className={classes}>
                {Content}
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
