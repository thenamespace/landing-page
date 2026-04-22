import { Container, Section, SectionHeader } from "@/components/ui/Section";

const QUOTES = [
  {
    quote:
      "Y'all are killing it and I think every product should have their own subname. And y'all are now my go-to rec. Love y'all.",
    author: "Brantly Millegan",
    role: "Former Director of ENS",
  },
  {
    quote:
      "Namespace is providing a magical service. They made issuing thousands of subdomains for ETHDenver attendees simple and nearly effortless.",
    author: "Unicorn team",
    role: "ETHDenver partner",
  },
  {
    quote:
      "Their team combines strong technical expertise with clear communication and a true spirit of partnership. We're grateful for the partnership and excited to continue building.",
    author: "Celo team",
    role: "Layer 2 partner",
  },
  {
    quote:
      "The Namespace team have been very proactive and supportive of our timelines to build an integration with our offering. Definitely recommend.",
    author: "Tatum team",
    role: "Infrastructure partner",
  },
];

export function Testimonials() {
  return (
    <Section className="relative border-t border-border">
      <Container size="wide">
        <SectionHeader
          eyebrow="Words from the builders"
          title={
            <>
              The teams shipping identity,{" "}
              <em className="italic">in their own words.</em>
            </>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {QUOTES.map((q) => (
            <figure
              key={q.author}
              className="relative rounded-xl border border-border bg-surface/60 p-8 md:p-10"
            >
              <span
                aria-hidden
                className="absolute -top-4 left-8 font-display text-6xl text-accent leading-none select-none"
              >
                &ldquo;
              </span>
              <blockquote className="font-display text-2xl md:text-[1.75rem] leading-[1.25] tracking-tight text-text">
                {q.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 text-sm">
                <span
                  aria-hidden
                  className="h-8 w-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center font-mono text-accent text-xs"
                >
                  {q.author.slice(0, 1)}
                </span>
                <div>
                  <div className="font-medium text-text">{q.author}</div>
                  <div className="text-text-subtle text-xs">{q.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
