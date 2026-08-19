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
  | "bulk"
  | "chains"
  | "meta"
  | "endpoints"
  | "policies"
  | "mcpq"
  | "latency"
  | "codecomp"
  | "mintw"
  | "nsapp"
  | "wclaim"
  | "wsafe"
  | "wbrand"
  | "wrevenue"
  | "wreach"
  | "wnetwork";


function ChainIcon({ chain }: { chain: string }) {
  if (chain === "eth")
    return (
      <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M8 1 3.5 8.1 8 10.8l4.5-2.7L8 1Z" fill="#8fb0ff" />
        <path d="M8 11.9 3.5 9.2 8 15l4.5-5.8L8 11.9Z" fill="#5474f6" />
      </svg>
    );
  if (chain === "base")
    return (
      <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="7" fill="#2151f5" />
        <rect x="1" y="7" width="9" height="2" rx="1" fill="#fff" />
      </svg>
    );
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 3.5h8.5L13 5H4.5L3 3.5Z" fill="#4fc3f7" />
      <path d="M3 7.2h8.5L13 8.7H4.5L3 7.2Z" fill="#8f5cf6" />
      <path d="M3 11h8.5L13 12.5H4.5L3 11Z" fill="#7ee2a8" />
    </svg>
  );
}

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

      {kind === "chains" && (
        <>
          {[
            ["eth", "0x4f3a\u2026c8d2"],
            ["base", "0x4f3a\u2026c8d2"],
            ["sol", "8kJq\u2026x2vw"],
          ].map(([c, a]) => (
            <div key={c} className="solution-bviz-row is-slim">
              <span className="solution-bviz-app solution-bviz-chain">
                <ChainIcon chain={c} />
                {c}
              </span>
              <span className="solution-bviz-mono">{a}</span>
            </div>
          ))}
        </>
      )}

      {kind === "meta" && (
        <>
          {[
            ["operator", "yourapp.eth"],
            ["policy", "rate-limited \u00b7 capped"],
            ["registration", "erc-8004 #4271"],
          ].map(([k2, v]) => (
            <div key={k2} className="solution-bviz-row is-slim">
              <span className="solution-bviz-app">{k2}</span>
              <span className="solution-bviz-mono">{v}</span>
            </div>
          ))}
        </>
      )}

      {kind === "endpoints" && (
        <>
          {[
            ["agent-endpoint[mcp]", "mcp.youragents.xyz"],
            ["agent-endpoint[a2a]", "a2a.youragents.xyz"],
            ["agent-context", "\u2713 set \u00b7 ENSIP-26"],
          ].map(([k2, v]) => (
            <div key={k2} className="solution-bviz-row is-slim">
              <span className="solution-bviz-app">{k2}</span>
              <span className="solution-bviz-mono">{v}</span>
            </div>
          ))}
        </>
      )}

      {kind === "policies" && (
        <>
          {[
            ["gas cap", "0.02 ETH / day"],
            ["rate limit", "10 tx / hour"],
            ["session key", "expires in 24h"],
          ].map(([k2, v]) => (
            <div key={k2} className="solution-bviz-row is-slim">
              <span className="solution-bviz-app">{k2}</span>
              <span className="solution-bviz-mono">{v}</span>
              <span className="solution-bviz-tag is-ok">&#10003;</span>
            </div>
          ))}
        </>
      )}

      {kind === "mcpq" && (
        <>
          <div className="solution-bviz-row is-slim">
            <span className="solution-bviz-mono is-quiet">&gt; who runs researcher.youragents.eth?</span>
          </div>
          <div className="solution-bviz-row is-slim">
            <span className="solution-bviz-mono"><b>yourapp.eth</b></span>
            <span className="solution-bviz-tag is-ok">&#10003; verified</span>
          </div>
        </>
      )}

      {kind === "latency" && (
        <>
          <div className="solution-bviz-row is-slim">
            <span className="solution-bviz-mono">resolve(alice.eth)</span>
            <span className="solution-bviz-tag is-ok">4 ms</span>
          </div>
          <div className="solution-bviz-row is-slim">
            <span className="solution-bviz-mono">batch(500 names)</span>
            <span className="solution-bviz-tag is-accent">cached</span>
          </div>
        </>
      )}

      {kind === "codecomp" && (
        <>
          <div className="solution-bviz-field">
            <span className="solution-bviz-mono">
              <i>&lt;</i><b>ClaimName</b> <i>parent=</i>"youragents.eth" <i>/&gt;</i>
            </span>
          </div>
          <div className="solution-bviz-ok">renders a full claim flow</div>
        </>
      )}

      {kind === "mintw" && (
        <>
          <div className="solution-bviz-field">
            <span className="solution-bviz-mono">
              <b>agent-07</b>
              <i>.youragents.eth</i>
            </span>
          </div>
          <div className="solution-bviz-chips">
            <span className="solution-bviz-chip is-more">Mint &middot; gasless</span>
          </div>
        </>
      )}

      {kind === "nsapp" && (
        <>
          {["researcher", "trader"].map((l) => (
            <div key={l} className="solution-bviz-row is-slim">
              <span className="solution-bviz-mono">
                <b>{l}</b>
                <i>.youragents.eth</i>
              </span>
              <span className="solution-bviz-tag is-ok">&#10003; live</span>
            </div>
          ))}
          <div className="solution-bviz-chips">
            <span className="solution-bviz-chip is-more">+848 agents</span>
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
            <span className="solution-bviz-chip is-more">+860k</span>
          </div>
        </>
      )}

      {/* ── Wallet page: Uniswap-style name pills + avatars ── */}
      {kind === "wclaim" && (
        <div className="sol-bscene is-center">
          <span className="sol-pill pc2 is-sm">
            <span className="sol-face is-alice is-xs" />
            <b>{label}</b>
            <i>.{domain}</i>
          </span>
          <span className="sol-bmeta is-ok">available · free · no gas</span>
        </div>
      )}

      {kind === "wsafe" && (
        <div className="sol-bscene">
          <div className="sol-brow">
            <span className="sol-hex">0x4f3a&hellip;c8d2</span>
            <span className="solution-bviz-tag is-bad">lookalike</span>
          </div>
          <div className="sol-brow">
            <span className="sol-pill pc3 is-sm">
              <b>{label}</b>
              <i>.{domain}</i>
            </span>
            <span className="solution-bviz-tag is-ok">&#10003; verified</span>
          </div>
        </div>
      )}

      {kind === "wbrand" && (
        <div className="sol-bscene">
          {["Uniswap", "Farcaster", "Etherscan"].map((app, i) => (
            <div key={app} className="sol-brow">
              <span className="sol-bapp">{app}</span>
              <span className={`sol-pill is-xs pc${[3, 4, 2][i]}`}>
                <b>{label}</b>
                <i>.{domain}</i>
              </span>
            </div>
          ))}
        </div>
      )}

      {kind === "wrevenue" && (
        <div className="sol-bscene">
          {[
            [label, "free", "pc1", false],
            ["vip", "$4.99/yr", "pc5", true],
            ["x", "$199/yr", "pc2", true],
          ].map(([l, price, pc, paid]) => (
            <div key={l as string} className="sol-brow">
              <span className={`sol-pill is-xs ${pc}`}>
                <b>{l}</b>
                <i>.{domain}</i>
              </span>
              <span className={`sol-price${paid ? " is-paid" : ""}`}>{price}</span>
            </div>
          ))}
        </div>
      )}

      {kind === "wreach" && (
        <div className="sol-bscene">
          <div className="solution-bviz-chips">
            {["Ethereum", "Base", "Optimism"].map((c) => (
              <span key={c} className="solution-bviz-chip">
                {c}
              </span>
            ))}
            <span className="solution-bviz-chip is-more">+100 chains</span>
          </div>
          <div className="solution-bviz-chips">
            {["Uniswap", "Farcaster"].map((c) => (
              <span key={c} className="solution-bviz-chip">
                {c}
              </span>
            ))}
            <span className="solution-bviz-chip is-more">+1,000 apps</span>
          </div>
        </div>
      )}

      {kind === "wnetwork" && (
        <div className="sol-bcluster">
          {[
            [label, "pc3"],
            ["milo", "pc2"],
            ["juno", "pc1"],
            ["remy", "pc4"],
          ].map(([l, pc]) => (
            <span key={l} className={`sol-pill is-xs ${pc}`}>
              <b>{l}</b>
            </span>
          ))}
          <span className="sol-pill is-xs pc5">
            <b>+860k</b>
          </span>
        </div>
      )}
    </div>
  );
}
