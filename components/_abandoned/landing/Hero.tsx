import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { ArrowDown, Check } from "@/components/ui/Icons";

export function Hero() {
  return (
    <section className="relative pt-20 pb-28 md:pt-28 md:pb-40 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 grid-bg"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[480px] bg-gradient-to-b from-accent/[0.06] via-transparent to-transparent pointer-events-none"
      />

      <Container size="wide" className="relative">
        <div className="flex flex-col items-center text-center fade-up">
          <Tag tone="accent">ENS Service Provider</Tag>

          <h1 className="mt-8 font-display text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.9] tracking-tight max-w-5xl">
            Name the next billion{" "}
            <em className="italic text-accent whitespace-nowrap">
              Web3
            </em>{" "}
            users.
          </h1>

          <p className="mt-8 max-w-xl text-lg md:text-xl text-text-muted leading-relaxed">
            Namespace helps wallets, chains, apps, and agents ship
            human-readable ENS identities. Fast to integrate.{" "}
            <span className="text-text">Built for scale.</span>
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
            <Button
              href="https://app.namespace.ninja"
              external
              variant="primary"
              size="lg"
              withArrow="up-right"
            >
              Launch the app
            </Button>
            <Button
              href="https://cal.com/thecap.eth/discovery"
              external
              variant="secondary"
              size="lg"
              withArrow="right"
            >
              Book a discovery call
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-sm text-text-muted">
            {[
              "Backed by ENS DAO",
              "30+ partners shipping",
              "800k+ subnames live",
            ].map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Terminal-style visual below hero, gives concrete "what it feels like" */}
        <div className="mt-20 md:mt-28 mx-auto max-w-3xl relative">
          <div
            aria-hidden
            className="absolute -inset-6 rounded-2xl bg-accent/10 blur-2xl"
          />
          <div className="relative rounded-xl border border-border bg-surface/80 backdrop-blur-xl shadow-soft overflow-hidden">
            <div className="flex items-center gap-2 px-4 h-9 border-b border-border bg-surface-2/60">
              <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
              <span className="ml-3 text-xs font-mono text-text-subtle">
                ~/your-app · namespace.ts
              </span>
            </div>
            <pre className="px-5 py-6 text-sm font-mono leading-relaxed overflow-x-auto">
              <code>
<span className="text-text-subtle">// Register an offchain ENS subname</span>{"\n"}
<span className="text-[#ff8bd4]">import</span>{" "}
<span className="text-text">{"{ createClient }"}</span>{" "}
<span className="text-[#ff8bd4]">from</span>{" "}
<span className="text-accent">&quot;@namespace/sdk&quot;</span>
{"\n\n"}
<span className="text-[#ff8bd4]">const</span>{" "}
<span className="text-text">ns</span>{" "}
<span className="text-text-muted">=</span>{" "}
<span className="text-[#7ddfff]">createClient</span>
<span className="text-text">({"{"}</span>{" "}
<span className="text-text">apiKey</span>
<span className="text-text-muted">:</span>{" "}
<span className="text-accent">process.env.NS_KEY</span>{" "}
<span className="text-text">{"}"})</span>
{"\n\n"}
<span className="text-[#ff8bd4]">await</span>{" "}
<span className="text-text">ns.</span>
<span className="text-[#7ddfff]">subnames</span>
<span className="text-text">.</span>
<span className="text-[#7ddfff]">register</span>
<span className="text-text">({"{"}</span>
{"\n  "}
<span className="text-text">label</span>
<span className="text-text-muted">:</span>{" "}
<span className="text-accent">&quot;alice&quot;</span>
<span className="text-text-muted">,</span>
{"\n  "}
<span className="text-text">parent</span>
<span className="text-text-muted">:</span>{" "}
<span className="text-accent">&quot;yourapp.eth&quot;</span>
<span className="text-text-muted">,</span>
{"\n  "}
<span className="text-text">owner</span>
<span className="text-text-muted">:</span>{" "}
<span className="text-accent">&quot;0xAlice…&quot;</span>
<span className="text-text-muted">,</span>
{"\n"}
<span className="text-text">{"})"}</span>
{"\n\n"}
<span className="text-text-subtle">
// → alice.yourapp.eth · gasless · live in ~400ms
</span>
              </code>
            </pre>
          </div>
          <div className="mt-6 flex justify-center text-text-subtle">
            <ArrowDown className="h-5 w-5" />
          </div>
        </div>
      </Container>
    </section>
  );
}
