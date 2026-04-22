import { PageShell } from "@/components/layout/PageShell";
import { Container, Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PageShell>
      <Section className="min-h-[70vh] flex items-center">
        <Container size="default" className="text-center">
          <div
            aria-hidden
            className="font-display text-[clamp(8rem,25vw,18rem)] leading-[0.85] tracking-tight text-accent select-none"
          >
            404
          </div>
          <h1 className="mt-6 font-display text-4xl md:text-5xl tracking-tight">
            This name isn&apos;t registered.
          </h1>
          <p className="mt-5 text-lg text-text-muted max-w-lg mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has moved.
            Let&apos;s get you back on track.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href="/" size="lg" withArrow="right">
              Back to home
            </Button>
            <Button href="/blog" variant="secondary" size="lg" withArrow="right">
              Read the blog
            </Button>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
