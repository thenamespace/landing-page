// iPhone pieces for the Universal Usernames hero animation.
import React from "react";

const NAME = "happy.brand.eth";
export const ADDR_SHORT = "0x8F3c…a91E";

// Per-element offset on the scene's shared 10s timeline (see .uuh-a in hero-flyover.css).
export const d = (s: number) => ({ ["--d" as string]: `${s}s` }) as React.CSSProperties;

export function Name({ className = "" }: { className?: string }) {
  return (
    <span className={`uuh-name ${className}`}>
      happy<i>.brand.eth</i>
    </span>
  );
}

function StatusBar() {
  return (
    <div className="uuh-sbar uuh-a">
      <span className="uuh-sbar-time">9:41</span>
      <span className="uuh-sbar-icons">
        <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor">
          <rect x="0" y="7" width="3" height="3" rx="0.8" />
          <rect x="4.3" y="5" width="3" height="5" rx="0.8" />
          <rect x="8.6" y="2.6" width="3" height="7.4" rx="0.8" />
          <rect x="12.9" y="0" width="3" height="10" rx="0.8" />
        </svg>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor">
          <path d="M7 2.2c1.9 0 3.6.7 4.9 1.9l1-1A8.3 8.3 0 007 .8 8.3 8.3 0 001.1 3.1l1 1A6.9 6.9 0 017 2.2zm0 2.9c1.1 0 2.1.4 2.9 1.1l1-1A5.6 5.6 0 007 3.7a5.6 5.6 0 00-3.9 1.5l1 1c.8-.7 1.8-1.1 2.9-1.1zM7 8c.5 0 .9.2 1.2.5L7 9.7 5.8 8.5C6.1 8.2 6.5 8 7 8z" />
        </svg>
        <span className="uuh-batt">
          <span />
        </span>
      </span>
    </div>
  );
}

export function Phone({
  children,
  island,
  dark = false,
  className = "",
}: {
  children: React.ReactNode;
  island?: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`uuh-phone ${dark ? "is-dark" : ""} ${className}`}>
      <span className="uuh-btn uuh-btn-action" />
      <span className="uuh-btn uuh-btn-volup" />
      <span className="uuh-btn uuh-btn-voldn" />
      <span className="uuh-btn uuh-btn-power" />
      <div className="uuh-bezel">
        <div className="uuh-screen uuh-ios">
          {children}
          <StatusBar />
          <span className="uuh-island" />
          {island}
          <span className="uuh-home" />
        </div>
      </div>
    </div>
  );
}

export function BrandBar() {
  return (
    <div className="uuh-appbar">
      <span className="uuh-brand">
        <span className="uuh-brand-mark">b</span>brand
      </span>
      <span className="uuh-avatar is-sm">H</span>
    </div>
  );
}

// The name split into characters so they can cascade in (each gets its own --d).
export function NameChars({ className = "", step = 0.03, start = 0 }: { className?: string; step?: number; start?: number }) {
  return (
    <span className={`uuh-name ${className}`}>
      {Array.from(NAME).map((ch, i) => {
        const span = (
          <span key={i} className="uuh-ch uuh-a" style={d(start + i * step)}>
            {ch}
          </span>
        );
        return i >= 5 ? <i key={i}>{span}</i> : span;
      })}
    </span>
  );
}

const ROLL = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const TENS = ["0", "1", "2", "3", "4", "5"];

// Rolling-digit balance. Starts reading $0.00 (tens column hidden, the rest shifted
// left one column) and the scene's keyframes roll it to $50.00.
export function Balance({ stagger = 0.05 }: { stagger?: number }) {
  return (
    <span className="uuh-bal uuh-a">
      <span className="uuh-bal-cur">$</span>
      <span className="uuh-col uuh-col-t uuh-a">
        <span className="uuh-strip uuh-a">
          {TENS.map((n, i) => (
            <span key={i}>{n}</span>
          ))}
        </span>
      </span>
      <span className="uuh-bal-rest uuh-a">
        {(["o", "dot", "c1", "c2"] as const).map((k, i) =>
          k === "dot" ? (
            <span key={k} className="uuh-bal-dot">
              .
            </span>
          ) : (
            <span key={k} className={`uuh-col uuh-col-${k}`}>
              <span className="uuh-strip uuh-a" style={d(stagger * (i === 0 ? 1 : i))}>
                {ROLL.map((n, j) => (
                  <span key={j}>{n}</span>
                ))}
              </span>
            </span>
          ),
        )}
      </span>
    </span>
  );
}

export function Skeleton({ w1 = 58, w2 = 34 }: { w1?: number; w2?: number }) {
  return (
    <div className="uuh-skel">
      <i />
      <span>
        <b style={{ width: `${w1}%` }} />
        <b style={{ width: `${w2}%` }} />
      </span>
      <em />
    </div>
  );
}

export function ReceivedRow({ className = "" }: { className?: string }) {
  return (
    <div className={`uuh-rcv ${className}`}>
      <span className="uuh-rcv-ico">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M12 4v15m0 0l-6-6m6 6l6-6" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="uuh-rcv-txt">
        <b>Received</b>
        <Name className="is-xs" />
      </span>
      <span className="uuh-rcv-amt">+50 USDC</span>
    </div>
  );
}

export function TabBar() {
  return (
    <div className="uuh-tabs">
      <i className="is-on" />
      <i />
      <i />
      <i />
    </div>
  );
}

export function Check({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// A cubic Bézier [x0, y0, x1, y1, x2, y2, x3, y3] in canvas px.
export type Cubic = readonly [number, number, number, number, number, number, number, number];

// A filled, rounded arrowhead at the curve's end, turned to the end tangent (last control point → end point).
// Round it with stroke-linejoin: round in CSS.
export function arrowHead(c: Cubic, len = 10, half = 5.5) {
  const [x, y] = [c[6], c[7]];
  const a = Math.atan2(c[7] - c[5], c[6] - c[4]);
  const bx = x - len * Math.cos(a);
  const by = y - len * Math.sin(a);
  const px = -Math.sin(a) * half;
  const py = Math.cos(a) * half;
  const pt = (u: number, v: number) => `${u.toFixed(1)} ${v.toFixed(1)}`;
  return { d: `M${x} ${y}L${pt(bx + px, by + py)}L${pt(bx - px, by - py)}Z`, origin: `${x}px ${y}px` };
}
