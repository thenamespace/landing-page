/**
 * SolutionV2Page - the 13-block master template for /solutions/ens-* pages.
 *
 * Blocks: hero → answer capsule → problem → product picture → how it works
 * (steps + comparison table + recommendation) → proof → what you get →
 * why Namespace (build vs buy) → business case → integration effort →
 * FAQ → related resources → final CTA.
 */
import { WebflowButton } from "@/components/ui/WebflowButton";
import { SolutionFaqList } from "./SolutionFaq";
import {
  HeroPhone,
  HeroSendFlow,
  HeroNameCard,
} from "./SolutionPage";
import type { SolutionV2, V2Table } from "@/lib/solutions-v2";

function Eyebrow({ num, label, dark }: { num: string; label: string; dark?: boolean }) {
  return (
    <div className={`solution-eyebrow${dark ? " is-on-light" : ""}`}>
      <span className="solution-eyebrow-num">{num}</span>
      <span className="solution-eyebrow-rule" aria-hidden="true" />
      <span className="solution-eyebrow-label">{label}</span>
    </div>
  );
}

function HeroBrowser({ name }: { name: string }) {
  return (
    <div className="solution-browser" aria-hidden="true">
      <div className="solution-browser-bar">
        <div className="solution-browser-dots">
          <i />
          <i />
          <i />
        </div>
        <div className="solution-browser-address">
          <span className="solution-browser-lock">&#10003;</span>
          <b>{name}</b>
        </div>
      </div>
      <div className="solution-browser-page">
        <div className="solution-browser-skel is-hero" />
        <div className="solution-browser-skel is-line" />
        <div className="solution-browser-skel is-line short" />
        <div className="solution-browser-verify">
          <span className="solution-live-dot" />
          content verified by hash · served via eth.limo
        </div>
      </div>
    </div>
  );
}

function HeroApi({ name }: { name: string }) {
  const dot = name.indexOf(".");
  const label = dot > 0 ? name.slice(0, dot) : name;
  const parent = dot > 0 ? name.slice(dot + 1) : name;
  return (
    <div className="solution-code-block solution-hero-window" aria-hidden="true">
      <div className="solution-code-chrome">
        <span className="solution-code-dot" />
        <span className="solution-code-dot" />
        <span className="solution-code-dot" />
        <span className="solution-code-label">wallet provisioning</span>
      </div>
      <pre>
        <code>
          <span className="solution-term-note">POST</span> /api/v1/subnames{"\n"}
          {"{"}
          {"\n  "}"label": "{label}",{"\n  "}"parentName": "{parent}",
          {"\n  "}"owner": "0x4f3a…c8d2"{"\n"}
          {"}"}
          {"\n\n"}
          <span className="solution-term-icon is-ok">201 Created</span>
          {"\n"}
          {"{"} "name": <span className="solution-term-accent">"{name}"</span>{" "}
          {"}"}
        </code>
      </pre>
    </div>
  );
}

function HeroAgent({ name }: { name: string }) {
  return (
    <div className="solution-code-block solution-hero-window" aria-hidden="true">
      <div className="solution-code-chrome">
        <span className="solution-code-dot" />
        <span className="solution-code-dot" />
        <span className="solution-code-dot" />
        <span className="solution-code-label">agent lookup</span>
      </div>
      <pre>
        <code>
          <span className="solution-term-note">&gt;</span> resolve{" "}
          <span className="solution-term-accent">{name}</span>
          {"\n\n"}
          <span className="solution-term-note">owner</span>
          {"      "}youragents.eth{"\n"}
          <span className="solution-term-note">endpoint</span>
          {"   "}agents.you.com/researcher{"\n"}
          <span className="solution-term-note">erc8004</span>
          {"    "}
          <span className="solution-term-icon is-ok">registered &#10003;</span>
          {"\n\n"}
          <span className="solution-term-icon is-ok">&#10003;</span> identity
          verified onchain
        </code>
      </pre>
    </div>
  );
}

function HeroTree({ name }: { name: string }) {
  const dot = name.indexOf(".");
  const suffix = dot > 0 ? name.slice(dot) : name;
  return (
    <div className="solution-tree is-hero" aria-hidden="true">
      <div className="solution-tree-root">{suffix.replace(/^\./, "")}</div>
      <div className="solution-tree-trunk" />
      <div className="solution-tree-branches">
        <div className="solution-tree-leaf">
          <b>alice</b>
          {suffix}
        </div>
        <div className="solution-tree-leaf">
          <b>app</b>
          {suffix}
        </div>
        <div className="solution-tree-leaf">
          <b>bridge</b>
          {suffix}
        </div>
      </div>
    </div>
  );
}

function HeroVisual({ kind, name }: { kind: SolutionV2["hero"]["visual"]; name: string }) {
  switch (kind) {
    case "phone":
      return <HeroPhone name={name} />;
    case "sendflow":
      return <HeroSendFlow name={name} />;
    case "browser":
      return <HeroBrowser name={name} />;
    case "api":
      return <HeroApi name={name} />;
    case "agent":
      return <HeroAgent name={name} />;
    case "tree":
      return <HeroTree name={name} />;
    default:
      return <HeroNameCard name={name} />;
  }
}

function Table({ table, light, caption }: { table: V2Table; light?: boolean; caption?: string }) {
  const cell = (value: string) => {
    if (value === "Yes" || value.startsWith("Yes,")) return <span className="solution-table-yes">{value}</span>;
    if (value === "No" || value.startsWith("No,")) return <span className="solution-table-muted">{value}</span>;
    return value;
  };
  return (
    <div>
      {caption && <p className="solution2-table-caption">{caption}</p>}
      <div className={`solution-table${light ? " is-light" : ""}`} role="table">
        <div
          className="solution-table-row is-head"
          style={{ gridTemplateColumns: `1.4fr repeat(${table.columns.length - 1}, 1fr)` }}
        >
          {table.columns.map((col, i) => (
            <div key={i}>{col}</div>
          ))}
        </div>
        {table.rows.map((row, ri) => (
          <div
            key={ri}
            className="solution-table-row"
            style={{ gridTemplateColumns: `1.4fr repeat(${table.columns.length - 1}, 1fr)` }}
          >
            {row.map((value, ci) => (
              <div key={ci}>{ci === 0 ? value : cell(value)}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SolutionV2Page({ solution }: { solution: SolutionV2 }) {
  const s = solution;
  let n = 0;
  const num = () => String(++n).padStart(2, "0");
  return (
    <>
      {/* 1 ── Hero */}
      <header className="section_solution-hero">
        <div className="solution-hero-backdrop" aria-hidden="true" />
        <div padding-global="">
          <div container="large" className="padding-section-large is-top-medium">
            <div className="solution-hero">
              <div className="solution-hero-content">
                <div
                  data-wf--component-tag--variant="background-blur"
                  className="tag w-variant-1ec346f0-aef7-27e9-e90b-2eb557766f44 solution-anim solution-anim-1"
                >
                  <div>{s.hero.eyebrow}</div>
                </div>
                <h1 className="solution-hero-heading solution-anim solution-anim-2">
                  {s.hero.h1}
                </h1>
                <div className="max-width-medium is-37rem solution-anim solution-anim-3">
                  <p className="text-size-medium text-weight-medium solution-hero-sub">
                    {s.hero.subhead}
                  </p>
                </div>
                <div className="button-group solution-anim solution-anim-4">
                  {s.hero.ctas.map((cta, i) => (
                    <WebflowButton
                      key={cta.label}
                      label={cta.label}
                      href={cta.href}
                      variant={i === 0 ? "white" : "hero-outline"}
                      external={cta.external ?? false}
                    />
                  ))}
                </div>
                <div className="solution-anim solution-anim-5">
                  <p className="solution-proof-strip">
                    <span className="solution-proof-label">{s.hero.proofLine}</span>
                  </p>
                </div>
              </div>
              <div className="solution-hero-visual solution-anim solution-anim-3">
                <HeroVisual kind={s.hero.visual} name={s.hero.heroName} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2 ── Answer capsule */}
      <section className="section_solution-hiw">
        <div padding-global="">
          <div container="large">
            <div className="solution-hiw">
              <div className="solution-hiw-label">{s.title}</div>
              <p className="solution-hiw-lead">{s.capsule.text}</p>
              <div className="solution-facts">
                {s.capsule.facts.map((fact) => (
                  <span key={fact} className="solution-fact-chip">
                    {fact}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 ── The problem */}
      <section className="section_solution-pains">
        <div padding-global="">
          <div container="large" className="padding-section-large is-top-medium">
            <div className="margin-bottom margin-xlarge">
              <Eyebrow num={num()} label="The problem" />
              <h2 className="solution-section-heading">{s.problem.h2}</h2>
            </div>
            <div className={`solution-pains-grid${s.problem.items.length === 4 ? " is-quad" : ""}`}>
              {s.problem.items.map((p, i) => (
                <div key={p.title} className="solution-pain-card">
                  <div className="solution-pain-index" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="heading-style-h6 solution-pain-question">{p.title}</h3>
                  <p className="text-weight-medium solution-pain-detail">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4 ── Product picture */}
      <section className="section_solution-product">
        <div padding-global="">
          <div container="large" className="padding-section-large is-top-medium">
            <div className="margin-bottom margin-xlarge">
              <Eyebrow num={num()} label="In your product" />
              <h2 className="solution-section-heading">{s.product.h2}</h2>
            </div>
            <div className="solution2-product-grid">
              {s.product.items.map((item) => (
                <div key={item.title} className="solution-def-point">
                  <h3 className="heading-style-h6">{item.title}</h3>
                  <p className="text-weight-medium">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5 ── How it works (light zone starts) */}
      <section className="section_solution-how">
        <div
          padding-global=""
          className="section-inner-background is-top-only background-color-secondary"
        >
          <div container="large" className="padding-section-large is-top-medium">
            <div className="margin-bottom margin-xlarge">
              <Eyebrow num={num()} label="How it works" dark />
              <h2 className="solution-section-heading">{s.how.h2}</h2>
            </div>
            <div className="solution-steps-cards">
              {s.how.steps.map((step, i) => (
                <div key={step.title} className="solution-step-card">
                  <em>{String(i + 1).padStart(2, "0")}</em>
                  <h3 className="heading-style-h6">{step.title}</h3>
                  <p className="text-weight-medium solution-step-detail">{step.body}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "3rem" }}>
              <Table table={s.how.table} light caption={s.how.tableCaption} />
            </div>
            <div className="solution2-reco">
              <p className="text-weight-medium">{s.how.recommendation}</p>
            </div>
            {s.how.note && (
              <div className="solution2-note">
                <p className="text-weight-medium">{s.how.note}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6 ── Proof */}
      <section className="section_solution-proof">
        <div
          padding-global=""
          className="section-inner-background no-border-radius background-color-secondary"
        >
          <div container="large" className="padding-section-large is-top-medium">
            <div className="margin-bottom margin-xlarge">
              <Eyebrow num={num()} label="Proof" dark />
              <h2 className="solution-section-heading">{s.proof.h2}</h2>
            </div>
            <div className="solution2-proof-items">
              {s.proof.items.map((item) => (
                <div key={item.title} className="solution-step-card">
                  <h3 className="heading-style-h6">{item.title}</h3>
                  <p className="text-weight-medium solution-step-detail">{item.body}</p>
                </div>
              ))}
            </div>
            <div className="solution2-quotes">
              {s.proof.quotes.map((q) => (
                <div key={q.name} className="solution2-quote">
                  <blockquote>"{q.quote}"</blockquote>
                  <cite>
                    <img src={q.avatar} alt={q.name} />
                    {q.name}, {q.role}
                  </cite>
                </div>
              ))}
            </div>
            <div className="solution-statband">
              {s.proof.stats.map((stat) => {
                const gap = stat.indexOf(" ");
                return (
                  <div key={stat} className="solution-statband-cell">
                    <b>{gap > 0 ? stat.slice(0, gap) : stat}</b>
                    <span>{gap > 0 ? stat.slice(gap + 1) : ""}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 7 ── What you get */}
      <section className="section_solution-included">
        <div
          padding-global=""
          className="section-inner-background no-border-radius background-color-secondary"
        >
          <div container="large" className="padding-section-large is-top-medium">
            <div className="margin-bottom margin-xlarge">
              <Eyebrow num={num()} label="What you get" dark />
              <h2 className="solution-section-heading">{s.included.h2}</h2>
            </div>
            <div className="solution2-included-grid">
              {s.included.items.map((item) => (
                <div key={item.title} className="solution2-included-item">
                  <b>{item.title}</b>
                  <span>{item.body}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8 ── Why Namespace */}
      <section className="section_solution-why">
        <div
          padding-global=""
          className="section-inner-background no-border-radius background-color-secondary"
        >
          <div container="large" className="padding-section-large is-top-medium">
            <div className="margin-bottom margin-xlarge">
              <Eyebrow num={num()} label="Why Namespace" dark />
              <h2 className="solution-section-heading">{s.why.h2}</h2>
              <p className="text-size-medium text-weight-medium solution-features-intro">
                {s.why.intro}
              </p>
            </div>
            {s.why.table && (
              <div style={{ marginBottom: "2.5rem" }}>
                <Table table={s.why.table} light caption={s.why.tableCaption} />
              </div>
            )}
            <div className="solution2-note">
              <p className="text-weight-medium">{s.why.noLockIn}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9 ── The business case */}
      {s.business && (
        <section className="section_solution-business">
          <div
            padding-global=""
            className="section-inner-background no-border-radius background-color-secondary"
          >
            <div container="large" className="padding-section-large is-top-medium">
              <div className="solution2-business">
                <Eyebrow num={num()} label="The business case" />
                <h2 className="solution-section-heading">{s.business.h2}</h2>
                {s.business.paragraphs.map((p, i) => (
                  <p key={i} className="solution2-business-p">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 10 ── Integration effort */}
      <section className="section_solution-effort">
        <div
          padding-global=""
          className="section-inner-background no-border-radius background-color-secondary"
        >
          <div container="large" className="padding-section-large is-top-medium">
            <div className={s.effort.code ? "solution-terminal is-on-light" : ""}>
              <div>
                <Eyebrow num={num()} label="Integration effort" dark />
                <h2 className="solution-section-heading">{s.effort.h2}</h2>
                <p className="text-size-medium text-weight-medium solution2-effort-body">
                  {s.effort.body}
                </p>
                {s.effort.footnote && (
                  <p className="solution2-effort-footnote">{s.effort.footnote}</p>
                )}
              </div>
              {s.effort.code && (
                <div className="solution-code-block">
                  <div className="solution-code-chrome">
                    <span className="solution-code-dot" />
                    <span className="solution-code-dot" />
                    <span className="solution-code-dot" />
                    {s.effort.codeLabel && (
                      <span className="solution-code-label">{s.effort.codeLabel}</span>
                    )}
                  </div>
                  <pre>
                    <code>{s.effort.code}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 11 ── FAQ */}
      <section className="section_solution-faq">
        <div
          padding-global=""
          className="section-inner-background no-border-radius background-color-secondary"
        >
          <div
            container="large"
            className="padding-section-large is-top-medium is-bottom-small-mobile"
          >
            <div className="faq_component">
              <div
                data-wf--component-heading-center--variant="base"
                className="component_heading"
              >
                <div
                  data-wf--component-tag--variant="dark"
                  className="tag w-variant-b6bce3ac-5c2a-b1ee-66d6-218f87a88dd1"
                >
                  <div>FAQ</div>
                </div>
                <h2>Questions teams ask us</h2>
              </div>
              <div className="faq_content solution-faq-content">
                <SolutionFaqList items={s.faqs} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12 ── Related resources */}
      <section className="section_solution-resources">
        <div
          padding-global=""
          className="section-inner-background is-bottom-only background-color-secondary"
        >
          <div container="large" className="padding-section-large is-top-medium">
            <div className="margin-bottom margin-xlarge">
              <Eyebrow num={num()} label="Related resources" dark />
              <h2 className="solution-section-heading">Keep reading</h2>
            </div>
            <div className="solution2-resources">
              {s.resources.map((r) =>
                r.href ? (
                  <a
                    key={r.label}
                    href={r.href}
                    className="solution2-resource"
                    target={r.href.startsWith("http") ? "_blank" : undefined}
                    rel={r.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {r.label} <span aria-hidden="true">→</span>
                  </a>
                ) : (
                  <span key={r.label} className="solution2-resource is-static">
                    {r.label}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 13 ── Final CTA */}
      <section className="section_solution-cta">
        <div padding-global="">
          <div container="large" className="padding-section-large is-top-medium">
            <div className="solution2-final">
              {s.finalCta.map((item, i) => {
                const primaryIdx =
                  s.slug === "ens-decentralized-websites"
                    ? 0
                    : s.finalCta.findIndex((f) => f.cta.label === "Book a Call");
                return (
                <a
                  key={item.title}
                  href={item.cta.href}
                  target={item.cta.external ? "_blank" : undefined}
                  rel={item.cta.external ? "noopener noreferrer" : undefined}
                  className={`solution-pcta-item${i === primaryIdx ? " is-primary" : ""}`}
                >
                  <b>{item.title}</b>
                  <span>{item.cta.label} →</span>
                </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
