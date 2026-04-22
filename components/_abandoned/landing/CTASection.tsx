import { Container, Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";

export function CTASection() {
  return (
    <Section className="relative">
      <Container size="wide">
        <div className="relative rounded-2xl border border-border bg-gradient-to-br from-surface to-surface-2 p-10 md:p-16 overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <div className="text-xs font-mono uppercase tracking-widest text-text-subtle mb-4">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
                  Ready to ship
                </span>
              </div>
              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
                Let&apos;s build the{" "}
                <em className="italic text-accent">identity layer</em> of the
                next billion users.
              </h2>
              <p className="mt-6 text-lg text-text-muted leading-relaxed max-w-xl">
                Whether you&apos;re shipping a wallet, launching an L2, or
                naming a million agents — we&apos;ve done it before. Let&apos;s
                do it together.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button
                  href="https://cal.com/thecap.eth/discovery"
                  external
                  size="lg"
                  withArrow="up-right"
                >
                  Book a discovery call
                </Button>
                <Button
                  href="https://docs.namespace.ninja/"
                  external
                  variant="secondary"
                  size="lg"
                  withArrow="up-right"
                >
                  Read the docs
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 lg:pt-2">
              <div className="rounded-xl border border-border bg-surface/80 backdrop-blur p-6 md:p-8">
                <div className="text-xs font-mono uppercase tracking-widest text-text-subtle mb-2">
                  Newsletter
                </div>
                <h3 className="font-display text-2xl md:text-3xl leading-tight tracking-tight">
                  Case studies, drops, and ENS deep dives.
                </h3>
                <p className="mt-3 text-sm text-text-muted">
                  One email, monthly. Unsubscribe any time.
                </p>
                <div className="mt-5">
                  <NewsletterForm variant="stacked" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
