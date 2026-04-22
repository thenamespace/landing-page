import { Container, Section } from "@/components/ui/Section";

const STATS = [
  {
    value: "800K+",
    label: "Subnames issued",
    note: "Across wallets, L2s, and communities",
  },
  {
    value: "30+",
    label: "Production partners",
    note: "Shipping identity in real products",
  },
  {
    value: "Millions",
    label: "Monthly resolutions",
    note: "Served with high-availability infra",
  },
  {
    value: "100%",
    label: "Uptime guarantee",
    note: "Backed by partner-defined SLAs",
  },
];

export function Stats() {
  return (
    <Section className="relative border-y border-border bg-surface/40">
      <Container size="wide">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-xl">
            <div className="text-xs font-mono uppercase tracking-widest text-text-subtle mb-3">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
                Real-world scale
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-[0.95] tracking-tight">
              Built, shipped, and{" "}
              <em className="italic text-accent">proven</em> at scale.
            </h2>
          </div>
          <p className="max-w-sm text-text-muted">
            Namespace is the go-to operator for ENS-based naming — running in
            production across wallets, rollups, and agents.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border border border-border rounded-xl overflow-hidden">
          {STATS.map(({ value, label, note }) => (
            <div key={label} className="p-6 md:p-8 bg-surface/40">
              <div className="font-display text-5xl md:text-6xl tracking-tight leading-none">
                {value}
              </div>
              <div className="mt-5 text-sm font-medium text-text">{label}</div>
              <div className="mt-1 text-xs text-text-muted leading-relaxed">
                {note}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
