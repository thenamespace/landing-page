export type BenefitVisualKind =
  | "onboarding"
  | "security"
  | "brand"
  | "revenue"
  | "everywhere"
  | "network"
  | "ops"
  | "root"
  | "claimsite"
  | "registry"
  | "profile"
  | "verify"
  | "contracts"
  | "brands"
  | "provision"
  | "whitelabel"
  | "bulk";

/**
 * Compact decorative scene rendered at the top of a benefit card. Each kind
 * is a miniature of the product moment the card describes, drawn with the
 * same mono/chip vocabulary as the product-look mocks.
 */
export function SolutionBenefitVisual({
  kind,
  name,
}: {
  kind: BenefitVisualKind;
  name: string;
}) {
  const [label, ...rest] = name.split(".");
  const domain = rest.join(".");

  return (
    <div className="solution-bviz" aria-hidden="true">
      {kind === "onboarding" && (
        <>
          <div className="solution-bviz-field">
            <span className="solution-bviz-mono">
              <b>{label}</b>
              <i>.{domain}</i>
            </span>
            <span className="solution-bviz-caret" />
          </div>
          <div className="solution-bviz-ok">available &middot; free &middot; no gas</div>
        </>
      )}

      {kind === "security" && (
        <>
          <div className="solution-bviz-row">
            <span className="solution-bviz-mono is-dim">0x4f3a&hellip;c8d2</span>
            <span className="solution-bviz-tag is-bad">lookalike</span>
          </div>
          <div className="solution-bviz-row">
            <span className="solution-bviz-mono">{name}</span>
            <span className="solution-bviz-tag is-ok">&#10003; verified</span>
          </div>
        </>
      )}

      {kind === "brand" && (
        <>
          {["Etherscan", "Farcaster", "Uniswap"].map((app) => (
            <div key={app} className="solution-bviz-row is-slim">
              <span className="solution-bviz-app">{app}</span>
              <span className="solution-bviz-mono">{name}</span>
            </div>
          ))}
        </>
      )}

      {kind === "revenue" && (
        <>
          <div className="solution-bviz-row">
            <span className="solution-bviz-mono">
              <b>{label}</b>
              <i>.{domain}</i>
            </span>
            <span className="solution-bviz-tag is-ok">free</span>
          </div>
          <div className="solution-bviz-row">
            <span className="solution-bviz-mono">
              <b>vip</b>
              <i>.{domain}</i>
            </span>
            <span className="solution-bviz-tag is-accent">$4.99/yr</span>
          </div>
          <div className="solution-bviz-row">
            <span className="solution-bviz-mono">
              <b>x</b>
              <i>.{domain}</i>
            </span>
            <span className="solution-bviz-tag is-accent">$199/yr</span>
          </div>
        </>
      )}

      {kind === "everywhere" && (
        <>
          <div className="solution-bviz-chips">
            {["Ethereum", "Base", "Optimism", "Arbitrum"].map((c) => (
              <span key={c} className="solution-bviz-chip">
                {c}
              </span>
            ))}
            <span className="solution-bviz-chip is-more">+100 chains</span>
          </div>
          <div className="solution-bviz-chips">
            {["Uniswap", "Etherscan", "Farcaster"].map((c) => (
              <span key={c} className="solution-bviz-chip">
                {c}
              </span>
            ))}
            <span className="solution-bviz-chip is-more">+1,000 apps</span>
          </div>
        </>
      )}

      {kind === "ops" && (
        <>
          {["Resolver", "CCIP gateway", "Indexer"].map((svc) => (
            <div key={svc} className="solution-bviz-row is-slim">
              <span className="solution-bviz-app">{svc}</span>
              <span className="solution-bviz-tag is-ok">&#10003; operational</span>
            </div>
          ))}
        </>
      )}

      {kind === "root" && (
        <>
          <div className="solution-bviz-row">
            <span className="solution-bviz-mono">
              <b>{domain}</b>
            </span>
            <span className="solution-bviz-tag is-ok">&#10003; registered</span>
          </div>
          <div className="solution-bviz-row is-slim">
            <span className="solution-bviz-app">owner</span>
            <span className="solution-bviz-mono">foundation multisig</span>
          </div>
        </>
      )}

      {kind === "claimsite" && (
        <>
          {[label, "bob"].map((l) => (
            <div key={l} className="solution-bviz-row is-slim">
              <span className="solution-bviz-mono">
                <b>{l}</b>
                <i>.{domain}</i>
              </span>
              <span className="solution-bviz-tag is-ok">claimed</span>
            </div>
          ))}
          <div className="solution-bviz-chips">
            <span className="solution-bviz-chip is-more">+12,801 this week</span>
          </div>
        </>
      )}

      {kind === "registry" && (
        <>
          <div className="solution-bviz-root">
            <span className="solution-bviz-mono">
              <b>{label}</b>
              <i>.{domain}</i>
            </span>
          </div>
          {[
            ["DEX", "read"],
            ["Wallet", "write"],
            ["Explorer", "read"],
          ].map(([app, mode]) => (
            <div key={app} className="solution-bviz-row is-slim">
              <span className="solution-bviz-app">{app}</span>
              <span className={`solution-bviz-tag ${mode === "write" ? "is-accent" : "is-ok"}`}>
                {mode}
              </span>
            </div>
          ))}
        </>
      )}

      {kind === "profile" && (
        <>
          {[
            ["avatar", "\u2713 set"],
            ["bio", "Building on yourchain"],
            ["com.twitter", `@${label}`],
          ].map(([k, v]) => (
            <div key={k} className="solution-bviz-row is-slim">
              <span className="solution-bviz-app">{k}</span>
              <span className="solution-bviz-mono">{v}</span>
            </div>
          ))}
        </>
      )}

      {kind === "verify" && (
        <>
          <div className="solution-bviz-row">
            <span className="solution-bviz-mono">
              <b>{label}</b>
              <i>.{domain}</i>
            </span>
            <span className="solution-bviz-tag is-ok">&#10003; human</span>
          </div>
          <div className="solution-bviz-row">
            <span className="solution-bviz-mono is-dim">0xbot&hellip;9f2c</span>
            <span className="solution-bviz-tag is-bad">sybil</span>
          </div>
        </>
      )}

      {kind === "contracts" && (
        <>
          {["bridge", "treasury"].map((l) => (
            <div key={l} className="solution-bviz-row is-slim">
              <span className="solution-bviz-mono">
                <b>{l}</b>
                <i>.{domain}</i>
              </span>
              <span className="solution-bviz-tag is-ok">official</span>
            </div>
          ))}
          <div className="solution-bviz-row is-slim">
            <span className="solution-bviz-mono is-dim">0x7a1f&hellip;03c9</span>
            <span className="solution-bviz-tag is-bad">unlabeled</span>
          </div>
        </>
      )}

      {kind === "brands" && (
        <>
          {[
            ["alice", "acmewallet", "#7ee2a8"],
            ["bob", "gamestudio", "#f0b86c"],
            ["carol", "fintechapp", "#e39ff6"],
          ].map(([n, b, c]) => (
            <div key={b} className="solution-bviz-row is-slim">
              <span className="solution-bviz-mono">
                <b>{n}</b>
                <i>.</i>
                <span style={{ color: c, fontWeight: 600 }}>{b}</span>
                <i>.eth</i>
              </span>
              <span className="solution-bviz-tag is-ok">own namespace</span>
            </div>
          ))}
        </>
      )}

      {kind === "provision" && (
        <>
          <div className="solution-bviz-row is-slim">
            <span className="solution-bviz-mono">createWallet(userId)</span>
            <span className="solution-bviz-tag is-ok">&#10003; wallet</span>
          </div>
          <div className="solution-bviz-row is-slim">
            <span className="solution-bviz-mono">
              <b>{label}</b>
              <i>.{domain}</i>
            </span>
            <span className="solution-bviz-tag is-accent">&#10003; named</span>
          </div>
          <div className="solution-bviz-chips">
            <span className="solution-bviz-chip is-more">same server-side call</span>
          </div>
        </>
      )}

      {kind === "whitelabel" && (
        <>
          <div className="solution-bviz-row is-slim">
            <span className="solution-bviz-mono">
              <b>{label}</b>
              <i>.{domain}</i>
            </span>
            <span className="solution-bviz-tag is-ok">their feature</span>
          </div>
          <div className="solution-bviz-row is-slim">
            <span className="solution-bviz-mono is-dim">powered by Namespace</span>
            <span className="solution-bviz-tag is-accent">invisible</span>
          </div>
        </>
      )}

      {kind === "bulk" && (
        <>
          {["0x4f3a&hellip;c8d2", "0x91b7&hellip;e410"].map((a, ix) => (
            <div key={a} className="solution-bviz-row is-slim">
              <span
                className="solution-bviz-mono is-dim"
                dangerouslySetInnerHTML={{ __html: a }}
              />
              <span className="solution-bviz-tag is-ok">&#10003; named</span>
            </div>
          ))}
          <div className="solution-bviz-chips">
            <span className="solution-bviz-chip is-more">+48,000 backfilled</span>
          </div>
        </>
      )}

      {kind === "network" && (
        <>
          <div className="solution-bviz-root">
            <span className="solution-bviz-mono">
              <b>{domain}</b>
            </span>
          </div>
          <div className="solution-bviz-chips is-centered">
            {[label, "bob", "carol"].map((c) => (
              <span key={c} className="solution-bviz-chip">
                {c}
              </span>
            ))}
            <span className="solution-bviz-chip is-more">+850k</span>
          </div>
        </>
      )}
    </div>
  );
}
