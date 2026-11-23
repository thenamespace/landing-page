// The two-phone scene: a wallet sends 50 USDC to alice.brand.eth and your app catches it.
// FlyoverAnimation adds the @alice → alice.brand.eth arrow and flight on top.
import React from "react";
import { ADDR_SHORT, Balance, BrandBar, Check, d, Name, NameChars, Phone, ReceivedRow, Skeleton, TabBar } from "./parts";

const COIN_TRAIL = [0, 0.05, 0.1];

function LiveActivity() {
  return (
    <span className="uuh-live uuh-r-live uuh-a">
      <span className="uuh-live-in uuh-r-live-in uuh-a">
        <span className="uuh-rcv-ico is-md">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 4v15m0 0l-6-6m6 6l6-6" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="uuh-live-txt">
          <b>Received</b>
          <Name className="is-xs" />
        </span>
        <span className="uuh-live-r">+50 USDC</span>
      </span>
    </span>
  );
}

type SceneProps = {
  t0: string;
  label: string;
  /** The app → wallet connection, drawn over both phones. */
  children?: React.ReactNode;
};

export function RelayScene({ t0, label, children }: SceneProps) {
  return (
    <div
      className="uuh-stage uuh-r uuh-fly"
      style={{ ["--t0" as string]: t0 } as React.CSSProperties}
      role="img"
      aria-label={label}
    >
      <div className="uuh-canvas">
        <div className="uuh-r-send">
          <Phone dark>
            <div className="uuh-wallet">
              <div className="uuh-wallet-head">
                <svg width="9" height="14" viewBox="0 0 9 14" fill="none">
                  <path d="M7.5 1.5L2 7l5.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <b>Send</b>
                <i />
              </div>
              <span className="uuh-wallet-label">To</span>
              <div className="uuh-field uuh-a">
                <span className="uuh-type">
                  <span className="uuh-ph uuh-r-ph uuh-a">Name or address</span>
                  <NameChars className="uuh-r-chars" step={1 / 15} start={1 / 15} />
                  <span className="uuh-caret-pos uuh-r-caret uuh-a">
                    <span className="uuh-caret" />
                  </span>
                </span>
              </div>
              <div className="uuh-resolve uuh-r-res uuh-a">
                <span className="uuh-avatar is-sm">A</span>
                {/* A wallet only sees what ENS returns (address, avatar), never the in-app handle. */}
                <span className="uuh-resolve-txt">
                  <b>{ADDR_SHORT}</b>
                  <code>Resolved through ENS</code>
                </span>
                <span className="uuh-resolve-state">
                  <span className="uuh-spin uuh-r-spin uuh-a">
                    <i />
                  </span>
                  <span className="uuh-ok uuh-r-ok uuh-a">
                    <Check size={10} />
                  </span>
                </span>
              </div>
              <span className="uuh-wallet-label">Amount</span>
              <div className="uuh-amount">
                <span className="uuh-amount-n">
                  <span className="uuh-amount-ph uuh-r-amt-ph uuh-a">0</span>
                  <span className="uuh-amount-v">
                    <span className="uuh-dig uuh-a" style={d(0)}>
                      5
                    </span>
                    <span className="uuh-dig uuh-a" style={d(0.22)}>
                      0
                    </span>
                  </span>
                </span>
                <span className="uuh-token">
                  <i />
                  USDC
                </span>
              </div>
              <div className="uuh-wallet-fees">
                <Skeleton w1={40} w2={24} />
                <Skeleton w1={52} w2={20} />
              </div>
              <span className="uuh-sendbtn uuh-r-btn uuh-a">
                <span className="uuh-sendbtn-a uuh-r-btn-a uuh-a">Send</span>
                <span className="uuh-sendbtn-b uuh-r-btn-b uuh-a">
                  <Check size={12} />
                  Sent
                </span>
                <span className="uuh-tap uuh-r-tap uuh-a" />
              </span>
            </div>
          </Phone>
        </div>

        <div className="uuh-r-recv">
          <div className="uuh-r-bump uuh-a">
            <Phone island={<LiveActivity />}>
              <div className="uuh-app uuh-m-bal">
                <BrandBar />
                <div className="uuh-hero-bal">
                  <span className="uuh-me uuh-me-src uuh-a">
                    <span className="uuh-avatar">A</span>@alice
                  </span>
                  <Balance />
                  <span className="uuh-bal-sub">USDC balance</span>
                </div>
                <div className="uuh-actions">
                  <span className="uuh-pill is-primary">Add funds</span>
                  <span className="uuh-pill">Send</span>
                </div>
                <div className="uuh-activity">
                  <span className="uuh-section">Activity</span>
                  <div className="uuh-feed">
                    <ReceivedRow className="uuh-a" />
                    <div className="uuh-feed-list uuh-a">
                      <Skeleton w1={56} w2={30} />
                      <Skeleton w1={44} w2={36} />
                      <Skeleton w1={62} w2={26} />
                      <Skeleton w1={50} w2={32} />
                    </div>
                  </div>
                </div>
                <TabBar />
              </div>
            </Phone>
          </div>
        </div>

        <span className="uuh-r-cap">Your favorite wallet</span>
        {children}

        {COIN_TRAIL.map((delay, i) => (
          <span key={i} className={`uuh-coin-g uuh-a is-${i}`} style={d(delay)} aria-hidden={i > 0 ? true : undefined}>
            <span className="uuh-coin-x uuh-r-cx uuh-a">
              <span className="uuh-coin-y uuh-r-cy uuh-a">
                <span className="uuh-coin uuh-r-coin uuh-a">50 USDC</span>
              </span>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
