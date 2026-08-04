"use client";
import { useState } from "react";
import type { Solution } from "@/lib/solutions";

type ProductLook = NonNullable<Solution["productLook"]>;

/** Renders **bold** spans inside copy strings. */
function renderBold(text: string) {
  return text
    .split(/\*\*(.+?)\*\*/g)
    .map((part, i) => (i % 2 === 1 ? <b key={i}>{part}</b> : part));
}

function ClaimVisual() {
  return (
    <div className="solution-plook-mock" aria-hidden="true">
      <div className="solution-plook-mock-title">Pick your username</div>
      <div className="solution-plook-mock-field">
        <span className="solution-plv-mono"><b>alice</b><i>.yourwallet.eth</i></span>
      </div>
      <div className="solution-plv-ok">alice.yourwallet.eth is available</div>
      <div className="solution-plook-mock-btn">Claim username</div>
      <div className="solution-plook-mock-meta" style={{ textAlign: "center" }}>
        free · no gas · instant
      </div>
    </div>
  );
}

function SendVisual({ name }: { name: string }) {
  return (
    <div className="solution-plook-mock" aria-hidden="true">
      <div className="solution-plook-mock-title">Send</div>
      <div className="solution-plook-mock-field">
        <span className="solution-plook-mock-avatar" />
        <span>{name}</span>
        <span className="solution-plook-mock-check">&#10003;</span>
      </div>
      <div className="solution-plook-mock-meta">
        resolved · avatar and profile shown before confirm
      </div>
      <div className="solution-plook-mock-amount">$50.00</div>
      <div className="solution-plook-mock-btn">Send</div>
    </div>
  );
}

function ProfileVisual({ name }: { name: string }) {
  return (
    <div className="solution-plook-mock" aria-hidden="true">
      <div className="solution-plv-profile-head">
        <span className="solution-plook-mock-avatar is-large" />
        <div>
          <div className="solution-plv-profile-name">{name}</div>
          <div className="solution-plook-mock-meta">Building onchain since 2024</div>
        </div>
      </div>
      <div className="solution-plv-rows">
        <div className="solution-plv-row">
          <span>twitter</span>
          <b>@alice</b>
        </div>
        <div className="solution-plv-row">
          <span>eth</span>
          <b>0x4f3a…c8d2</b>
        </div>
        <div className="solution-plv-row">
          <span>base</span>
          <b>0x4f3a…c8d2</b>
        </div>
      </div>
      <div className="solution-plook-mock-meta">
        standard ENS records, controlled by the user
      </div>
    </div>
  );
}

function EverywhereVisual({ name }: { name: string }) {
  return (
    <div className="solution-plook-mock" aria-hidden="true">
      <div className="solution-plook-mock-title">One name, everywhere</div>
      <div className="solution-plv-rows">
        <div className="solution-plv-row">
          <span>Uniswap</span>
          <b>connected as {name}</b>
        </div>
        <div className="solution-plv-row">
          <span>Farcaster</span>
          <b>{name}</b>
        </div>
        <div className="solution-plv-row">
          <span>Etherscan</span>
          <b>{name}</b>
        </div>
      </div>
      <div className="solution-plook-mock-meta">
        your brand, in apps you do not own
      </div>
    </div>
  );
}

function UpgradeVisual({ name }: { name: string }) {
  return (
    <div className="solution-plook-mock" aria-hidden="true">
      <div className="solution-plook-mock-title">Upgrade to ownership</div>
      <div className="solution-plv-rows">
        <div className="solution-plv-row">
          <span>today</span>
          <b>{name} · offchain, free</b>
        </div>
        <div className="solution-plv-arrow">&#8595;</div>
        <div className="solution-plv-row is-upgrade">
          <span>premium</span>
          <b>{name} · onchain NFT, user-owned</b>
        </div>
      </div>
      <div className="solution-plook-mock-meta">
        same label, migrated, no rename
      </div>
    </div>
  );
}

export function SolutionProductLook({ data, name }: { data: ProductLook; name: string }) {
  const [active, setActive] = useState(0);

  const visualFor = (kind?: string) => {
    switch (kind) {
      case "claim":
        return <ClaimVisual />;
      case "profile":
        return <ProfileVisual name={name} />;
      case "everywhere":
        return <EverywhereVisual name={name} />;
      case "upgrade":
        return <UpgradeVisual name={name} />;
      default:
        return <SendVisual name={name} />;
    }
  };

  return (
    <div className="solution-plook">
      <div className="solution-plook-steps">
        {data.items.map((item, i) => (
          <button
            key={item.tag}
            type="button"
            onClick={() => setActive(i)}
            aria-expanded={i === active}
            className={`solution-plook-step${i === active ? " is-active" : ""}`}
          >
            <span className="solution-plook-step-head">
              <em>{String(i + 1).padStart(2, "0")}</em>
              <span>{item.tag}</span>
            </span>
            <span className="solution-plook-step-body">
              <span>
                <span className="text-weight-medium solution-plook-body solution-plook-step-text">
                  {renderBold(item.body)}
                </span>
              </span>
            </span>
          </button>
        ))}
      </div>
      <div className="solution-plook-visual">
        {data.image ? (
          <img
            src={data.image}
            alt={data.imageAlt ?? ""}
            className="solution-plook-img"
            loading="lazy"
          />
        ) : (
          <div key={active} className="solution-plv-fade">
            {visualFor(data.items[active]?.visual)}
          </div>
        )}
        <div className="solution-plook-compare" aria-hidden="true">
          <div className="solution-plook-before">
            <s>{data.before}</s>
            <span>before</span>
          </div>
          <div className="solution-plook-after">
            <b>{data.after}</b>
            <span>after</span>
          </div>
        </div>
      </div>
    </div>
  );
}
