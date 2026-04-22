import { Container, Section, SectionHeader } from "@/components/ui/Section";

const STEPS = [
  {
    n: "01",
    title: "Pick your model",
    copy: "Offchain for gasless scale, onchain for sovereignty. Namespace runs both on the same rails.",
  },
  {
    n: "02",
    title: "Integrate in a day",
    copy: "Drop in our SDK, API, or Widget. Custom issuance rules, pricing, and resolvers you fully own.",
  },
  {
    n: "03",
    title: "Operate at scale",
    copy: "We keep it running — resolution, SLA, monitoring, migrations. You ship product, not infra.",
  },
];

export function HowItWorks() {
  return (
    <Section className="relative">
      <Container size="wide">
        <SectionHeader
          eyebrow="How it works"
          title={
            <>
              From idea to identity in{" "}
              <em className="italic">three steps.</em>
            </>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border rounded-xl overflow-hidden">
          {STEPS.map((step, i) => (
            <div
              key={step.n}
              className="p-8 md:p-10 bg-surface/40 border-b md:border-b-0 md:border-r border-border last:border-0 last:md:border-0 relative group"
            >
              <div className="flex items-center justify-between gap-4 mb-8">
                <span className="font-mono text-sm text-text-subtle">
                  {step.n}
                </span>
                <span className="h-px flex-1 bg-border" />
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full bg-accent group-hover:scale-125 transition-transform"
                />
              </div>
              <h3 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">
                {step.title}
              </h3>
              <p className="mt-4 text-text-muted leading-relaxed">
                {step.copy}
              </p>
              {i < STEPS.length - 1 ? (
                <div
                  aria-hidden
                  className="hidden md:block absolute top-12 -right-3 h-6 w-6 rounded-full border border-border bg-bg items-center justify-center text-text-subtle"
                >
                  <span className="h-full w-full flex items-center justify-center text-xs">
                    →
                  </span>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
