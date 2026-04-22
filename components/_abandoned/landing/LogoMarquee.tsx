import { Container } from "@/components/ui/Section";

const PARTNERS = [
  "Unichain",
  "Base",
  "Celo",
  "Optimism",
  "Filecoin",
  "POAP",
  "Tatum",
  "ETHDenver",
  "Unicorn",
  "Lens",
  "ENS DAO",
  "Ethereum",
];

export function LogoMarquee() {
  return (
    <section className="py-16 border-y border-border bg-surface/40">
      <Container size="wide">
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="h-px w-10 bg-border-strong" />
          <span className="text-xs font-mono uppercase tracking-widest text-text-subtle">
            Trusted by teams shipping to millions
          </span>
          <span className="h-px w-10 bg-border-strong" />
        </div>

        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="marquee-track flex gap-16 w-max">
            {[...PARTNERS, ...PARTNERS].map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="font-display text-3xl md:text-4xl text-text-muted hover:text-text transition-colors whitespace-nowrap tracking-tight"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
