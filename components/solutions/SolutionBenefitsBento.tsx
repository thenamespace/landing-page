import type { Solution } from "@/lib/solutions";

/** Renders **bold** and __accent__ spans inside copy strings. */
function renderMarks(text: string) {
  return text.split(/(\*\*[^*]+\*\*|__[^_]+__)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <b key={i}>{part.slice(2, -2)}</b>;
    }
    if (part.startsWith("__") && part.endsWith("__")) {
      return (
        <span key={i} className="solution-spotlight-name">
          {part.slice(2, -2)}
        </span>
      );
    }
    return part;
  });
}

type BenefitItem = NonNullable<Solution["benefits"]>["items"][number];

/**
 * Asymmetric bento layout for benefits: a wide hero card (namespace tree),
 * a tall cold-start card, three compact cards, and a full-width ops strip.
 * Cards are assigned by their `visual` kind, so config order does not matter.
 */
export function SolutionBenefitsBento({
  items,
  name,
}: {
  items: BenefitItem[];
  name: string;
}) {
  const [label, ...rest] = name.split(".");
  const domain = rest.join(".");

  const hero = items.find((i) => i.visual === "network");
  const cold = items.find((i) => i.visual === "everywhere");
  const ops = items.find((i) => i.visual === "ops");
  const compact = items.filter((i) => i !== hero && i !== cold && i !== ops);

  return (
    <div className="solution-bento">
      {hero && (
        <div className="solution-bento-card is-hero-card">
          <div className="solution-bento-tree" aria-hidden="true">
            <div className="solution-bviz-root">
              <span className="solution-bviz-mono">
                <b>{label}</b>
                <i>.{domain}</i>
              </span>
            </div>
            <div className="solution-bento-registry">
              {[
                ["Wallet", "write"],
                ["DEX", "read"],
                ["Explorer", "read"],
              ].map(([app, mode]) => (
                <div key={app} className="solution-bviz-row is-slim">
                  <span className="solution-bviz-app">{app}</span>
                  <span
                    className={`solution-bviz-tag ${mode === "write" ? "is-accent" : "is-ok"}`}
                  >
                    {mode}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <h3 className="heading-style-h5 solution-pain-question">{hero.title}</h3>
          <p className="text-weight-medium solution-pain-detail">{renderMarks(hero.description)}</p>
        </div>
      )}

      {cold && (
        <div className="solution-bento-card is-tall">
          <div className="solution-bento-stack" aria-hidden="true">
            <div className="solution-bviz-chips">
              {["Ethereum", "Base", "Optimism", "Arbitrum"].map((c) => (
                <span key={c} className="solution-bviz-chip">
                  {c}
                </span>
              ))}
              <span className="solution-bviz-chip is-more">+100 chains</span>
            </div>
            <div className="solution-bviz-chips">
              {["Uniswap", "Etherscan", "Farcaster", "Rainbow"].map((c) => (
                <span key={c} className="solution-bviz-chip">
                  {c}
                </span>
              ))}
              <span className="solution-bviz-chip is-more">+1,000 apps</span>
            </div>
          </div>
          <h3 className="heading-style-h5 solution-pain-question">{cold.title}</h3>
          <p className="text-weight-medium solution-pain-detail">{renderMarks(cold.description)}</p>
        </div>
      )}

      {compact.map((item) => (
        <div key={item.title} className="solution-bento-card is-compact">
          <h3 className="heading-style-h5 solution-pain-question">{item.title}</h3>
          <p className="text-weight-medium solution-pain-detail">{renderMarks(item.description)}</p>
        </div>
      ))}

      {ops && (
        <div className="solution-bento-card is-ops">
          <div>
            <h3 className="heading-style-h5 solution-pain-question">{ops.title}</h3>
            <p className="text-weight-medium solution-pain-detail">{renderMarks(ops.description)}</p>
          </div>
          <div className="solution-bento-opsboard" aria-hidden="true">
            {["Resolver", "CCIP gateway", "Indexer", "Monitoring"].map((svc) => (
              <div key={svc} className="solution-bviz-row is-slim">
                <span className="solution-bviz-app">{svc}</span>
                <span className="solution-bviz-tag is-ok">&#10003; operational</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
