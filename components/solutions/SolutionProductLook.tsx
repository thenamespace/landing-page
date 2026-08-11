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

/** Split a name into its first label and the remaining suffix (".domain.eth"). */
function splitName(name: string) {
  const dot = name.indexOf(".");
  return {
    label: dot > 0 ? name.slice(0, dot) : name,
    suffix: dot > 0 ? name.slice(dot) : "",
  };
}

/** A Uniswap-style name pill: colored label + gray suffix on a white capsule. */
function NamePill({
  name,
  color = "pc2",
  size = "",
  face,
}: {
  name: string;
  color?: string;
  size?: string;
  face?: string;
}) {
  const { label, suffix } = splitName(name);
  return (
    <span className={`sol-pill ${color} ${size}`.trim()}>
      {face && <span className={`sol-face ${face} is-xs`} />}
      <b>{label}</b>
      {suffix && <i>{suffix}</i>}
    </span>
  );
}

function ClaimVisual({ name }: { name: string }) {
  const { label, suffix } = splitName(name);
  return (
    <div className="sol-pmock" aria-hidden="true">
      <div className="sol-pmock-title">Pick your username</div>
      <div className="sol-pinput">
        <b>{label}</b>
        <span className="sol-caret" />
        <i>{suffix}</i>
      </div>
      <div className="sol-pok">
        <span>&#10003;</span> {name} is available
      </div>
      <div className="sol-pbtn">Claim username</div>
      <div className="sol-pmeta is-center">free · no gas · instant</div>
    </div>
  );
}

function SendVisual({ name }: { name: string }) {
  return (
    <div className="sol-pmock" aria-hidden="true">
      <div className="sol-pmock-title">Send</div>
      <div className="sol-pfield">
        <NamePill name={name} color="pc2" face="is-alice" />
        <span className="sol-pcheck">&#10003;</span>
      </div>
      <div className="sol-pmeta">
        resolved · avatar and profile shown before you confirm
      </div>
      <div className="sol-pamount">$50.00</div>
      <div className="sol-pbtn">Send</div>
    </div>
  );
}

function ProfileVisual({ name }: { name: string }) {
  const { label } = splitName(name);
  return (
    <div className="sol-pmock" aria-hidden="true">
      <div className="sol-pprofile">
        <span className="sol-face is-alice is-lg" />
        <div>
          <NamePill name={name} color="pc4" />
          <div className="sol-pmeta">Building onchain since 2024</div>
        </div>
      </div>
      <div className="sol-prows">
        <div className="sol-prow">
          <span className="sol-prow-key">twitter</span>
          <span className="sol-prow-val">@{label}</span>
        </div>
        <div className="sol-prow">
          <span className="sol-prow-key">eth</span>
          <span className="sol-prow-val">0x4f3a…c8d2</span>
        </div>
        <div className="sol-prow">
          <span className="sol-prow-key">base</span>
          <span className="sol-prow-val">0x4f3a…c8d2</span>
        </div>
      </div>
      <div className="sol-pmeta">
        standard ENS records, controlled by the user
      </div>
    </div>
  );
}

function EverywhereVisual({ name }: { name: string }) {
  const apps: [string, string][] = [
    ["Uniswap", "pc3"],
    ["Farcaster", "pc4"],
    ["Etherscan", "pc2"],
  ];
  return (
    <div className="sol-pmock" aria-hidden="true">
      <div className="sol-pmock-title">One name, everywhere</div>
      <div className="sol-prows">
        {apps.map(([app, color]) => (
          <div key={app} className="sol-prow">
            <span className="sol-prow-key">{app}</span>
            <NamePill name={name} color={color} size="is-sm" />
          </div>
        ))}
      </div>
      <div className="sol-pmeta">your brand, in apps you do not own</div>
    </div>
  );
}

function UpgradeVisual({ name }: { name: string }) {
  return (
    <div className="sol-pmock" aria-hidden="true">
      <div className="sol-pmock-title">Upgrade to ownership</div>
      <div className="sol-prows">
        <div className="sol-prow">
          <NamePill name={name} color="pc3" size="is-sm" />
          <span className="sol-ptag">offchain · free</span>
        </div>
        <div className="sol-parrow">&#8595;</div>
        <div className="sol-prow is-up">
          <NamePill name={name} color="pc4" size="is-sm" />
          <span className="sol-ptag is-up">onchain NFT · owned</span>
        </div>
      </div>
      <div className="sol-pmeta">same label, migrated, no rename</div>
    </div>
  );
}

/** Shorten a raw 0x address to head…tail for the transform strip. */
function shortHex(value: string) {
  if (value.startsWith("0x") && value.length > 14) {
    return `${value.slice(0, 6)}…${value.slice(-4)}`;
  }
  return value;
}

export function SolutionProductLook({ data, name }: { data: ProductLook; name: string }) {
  const [active, setActive] = useState(0);

  const visualFor = (kind?: string) => {
    switch (kind) {
      case "claim":
        return <ClaimVisual name={name} />;
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
        <div className="sol-xf" aria-hidden="true">
          <div className="sol-xf-row is-from">
            <span className="sol-xf-hex">{shortHex(data.before)}</span>
            <span className="sol-xf-tag">wallet address</span>
          </div>
          <span className="sol-xf-arrow">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14m0 0l-6-6m6 6l6-6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="sol-xf-row is-to">
            <NamePill name={data.after} color="pc2" size="is-sm" face="is-alice" />
            <span className="sol-xf-tag is-accent">their username</span>
          </div>
        </div>
      </div>
    </div>
  );
}
