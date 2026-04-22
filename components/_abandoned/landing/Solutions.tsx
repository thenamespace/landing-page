import { Container, Section, SectionHeader } from "@/components/ui/Section";
import { ArrowUpRight, Wallet, Stack, Sparkles, Globe } from "@/components/ui/Icons";

const SOLUTIONS = [
  {
    Icon: Wallet,
    title: "Wallets",
    copy:
      "In-app usernames for every user. Ship payments, profiles, and recoverable identity with a single SDK call.",
    bullets: ["Gasless offchain subnames", "Multichain resolution", "Custom issuance rules"],
  },
  {
    Icon: Stack,
    title: "L2s & Rollups",
    copy:
      "Launch a native, chain-wide identity system. Custom TLDs, pricing, and policies — fully owned by your ecosystem.",
    bullets: ["Branded identity namespace", "Partner revenue flows", "Operated at scale"],
  },
  {
    Icon: Sparkles,
    title: "AI Agents",
    copy:
      "Persistent, verifiable identity for autonomous agents. Reputation, ownership, and machine-to-machine interop.",
    bullets: ["Agent wallet naming", "Reputation attestations", "Portable across apps"],
  },
  {
    Icon: Globe,
    title: "Communities",
    copy:
      "Issue member names as identities with no-code flows or custom integrations. Turn membership into identity.",
    bullets: ["DAO & creator tools", "Bulk issuance APIs", "Retention by design"],
  },
];

export function Solutions() {
  return (
    <Section id="solutions" className="relative">
      <Container size="wide">
        <SectionHeader
          eyebrow="Solutions"
          title={
            <>
              Identity, <em className="font-display italic">reimagined</em> for
              every corner of Web3.
            </>
          }
          description={
            <>
              Namespace is the naming layer for crypto-native products. Wallets,
              L2s, apps, agents, and communities ship on the same
              infrastructure — different shapes, one standard.
            </>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {SOLUTIONS.map(({ Icon, title, copy, bullets }) => (
            <article
              key={title}
              className="group relative rounded-xl border border-border bg-surface/60 p-8 md:p-10 hover:border-border-strong transition-colors overflow-hidden"
            >
              <div
                aria-hidden
                className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent/[0.04] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="relative flex items-start justify-between gap-6">
                <div className="h-12 w-12 rounded-lg border border-border-strong bg-surface-2 flex items-center justify-center text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-text-subtle opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <h3 className="relative mt-8 font-display text-3xl md:text-4xl leading-tight tracking-tight">
                {title}
              </h3>
              <p className="relative mt-3 text-text-muted leading-relaxed">
                {copy}
              </p>
              <ul className="relative mt-6 flex flex-wrap gap-2">
                {bullets.map((b) => (
                  <li
                    key={b}
                    className="text-xs font-mono px-3 py-1.5 rounded-full border border-border text-text-muted"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
