import React from "react";
/**
 * SolutionPage - shared template for /solutions/[slug] pages.
 *
 * Section order follows the LeBak five-questions funnel defined in
 * lib/solutions.ts: hero (want) → definition (GEO) → pains (fears +
 * tried-and-hated) → desire → solution + steps (need) → proof → FAQ
 * (objections) → final CTA.
 */
import { WebflowButton } from "@/components/ui/WebflowButton";
import { SolutionFaqList } from "./SolutionFaq";
import { SolutionPainsSpotlight } from "./SolutionPainsSpotlight";
import { Testimonials } from "@/components/landing/Testimonials";
import { Cta } from "@/components/landing/Cta";
import { SolutionProductLook } from "./SolutionProductLook";
import { SolutionBenefitVisual } from "./SolutionBenefitVisual";
import { SolutionBenefitsBento } from "./SolutionBenefitsBento";
import type { Solution, SolutionTestimonial } from "@/lib/solutions";

function Eyebrow({
  num,
  label,
  dark,
}: {
  num: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <div className={`solution-eyebrow${dark ? " is-on-light" : ""}`}>
      <span className="solution-eyebrow-num">{num}</span>
      <span className="solution-eyebrow-rule" aria-hidden="true" />
      <span className="solution-eyebrow-label">{label}</span>
    </div>
  );
}

function ProofStrip() {
  return (
    <p className="solution-proof-strip">
      <span className="solution-proof-num">850k+</span>
      <span className="solution-proof-label"> subnames</span>
      <span className="solution-proof-dot" aria-hidden="true">
        {" "}
        ·{" "}
      </span>
      <span className="solution-proof-num">21M</span>
      <span className="solution-proof-label"> resolutions</span>
      <span className="solution-proof-dot" aria-hidden="true">
        {" "}
        ·{" "}
      </span>
      <span className="solution-proof-num">30+</span>
      <span className="solution-proof-label"> partners</span>
      <span className="solution-proof-dot" aria-hidden="true">
        {" "}
        ·{" "}
      </span>
      <span className="solution-proof-label">Backed by ENS DAO</span>
    </p>
  );
}

export function HeroNameCard({ name }: { name: string }) {
  return (
    <div className="solution-namecard-wrapper" aria-hidden="true">
      <div className="solution-namecard">
        <div className="solution-namecard-row">
          <span className="solution-namecard-avatar" />
          <span className="solution-namecard-name">{name}</span>
          <span className="solution-namecard-badge">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M3.20898 7.1826C3.08735 6.63471 3.10603 6.06497 3.26328 5.52622C3.42053 4.98746 3.71127 4.49714 4.10854 4.1007C4.50581 3.70427 4.99674 3.41455 5.53582 3.25843C6.0749 3.1023 6.64468 3.08482 7.19232 3.2076C7.49374 2.73619 7.90898 2.34823 8.39977 2.07951C8.89056 1.81078 9.4411 1.66992 10.0006 1.66992C10.5602 1.66992 11.1107 1.81078 11.6015 2.07951C12.0923 2.34823 12.5076 2.73619 12.809 3.2076C13.3575 3.08429 13.9282 3.10169 14.4681 3.2582C15.0081 3.4147 15.4997 3.70522 15.8972 4.10273C16.2947 4.50024 16.5852 4.99183 16.7417 5.53177C16.8982 6.07171 16.9156 6.64246 16.7923 7.19093C17.2637 7.49236 17.6517 7.9076 17.9204 8.39839C18.1891 8.88918 18.33 9.43972 18.33 9.99927C18.33 10.5588 18.1891 11.1094 17.9204 11.6001C17.6517 12.0909 17.2637 12.5062 16.7923 12.8076C16.9151 13.3552 16.8976 13.925 16.7415 14.4641C16.5854 15.0032 16.2957 15.4941 15.8992 15.8914C15.5028 16.2886 15.0125 16.5794 14.4737 16.7366C13.9349 16.8939 13.3652 16.9126 12.8173 16.7909C12.5163 17.2642 12.1007 17.6538 11.6091 17.9237C11.1175 18.1936 10.5657 18.3351 10.0048 18.3351C9.44396 18.3351 8.89217 18.1936 8.40054 17.9237C7.90892 17.6538 7.49335 17.2642 7.19232 16.7909C6.64468 16.9137 6.0749 16.8962 5.53582 16.7401C4.99674 16.584 4.50581 16.2943 4.10854 15.8978C3.71127 15.5014 3.42053 15.0111 3.26328 14.4723C3.10603 13.9336 3.08735 13.3638 3.20898 12.8159C2.73395 12.5153 2.34266 12.0994 2.07152 11.6069C1.80038 11.1145 1.6582 10.5614 1.6582 9.99927C1.6582 9.4371 1.80038 8.88405 2.07152 8.39159C2.34266 7.89912 2.73395 7.48323 3.20898 7.1826Z"
                fill="#5474F6"
              />
              <path
                d="M7.5 10.0007L9.16667 11.6673L12.5 8.33398"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <div className="solution-namecard-meta">
          <div className="solution-namecard-meta-row">
            <span className="solution-namecard-key">status</span>
            <span className="solution-namecard-val is-live">
              <span className="solution-live-dot" /> resolving
            </span>
          </div>
          <div className="solution-namecard-meta-row">
            <span className="solution-namecard-key">reach</span>
            <span className="solution-namecard-val">
              100+ chains · 1,000+ apps
            </span>
          </div>
          <div className="solution-namecard-meta-row">
            <span className="solution-namecard-key">gas</span>
            <span className="solution-namecard-val">0 ETH - offchain</span>
          </div>
        </div>
      </div>
      <div className="solution-namecard-shadow" />
    </div>
  );
}

export function HeroPhone({ name }: { name: string }) {
  const dot = name.indexOf(".");
  const label = dot > 0 ? name.slice(0, dot) : name;
  const suffix = dot > 0 ? name.slice(dot) : "";
  return (
    <div className="sol-uni-hero" aria-hidden="true">
      {/* Wallet phone (partial, left) */}
      <div className="sol-uni-phone">
        <div className="sol-uni-head">
          <span className="sol-uni-pfp">
            <img src="/assets/images/alice-hatter.png" alt="" />
          </span>
          <svg className="sol-uni-gear" width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M19.4 13a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-2.9 1.09V21a2 2 0 11-4 0v-.09A1.65 1.65 0 004.6 19.4l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 003 13H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 7.1l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6V3a2 2 0 114 0v.09a1.65 1.65 0 002.9 1.09l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0021 9v.09a1.65 1.65 0 001.51.91H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"
              stroke="currentColor"
              strokeWidth="1.4"
              opacity="0.55"
            />
          </svg>
        </div>
        <div className="sol-uni-id">
          <span className="sol-uni-name">
            <b>{label}</b>
            <i>{suffix}</i>
          </span>
          <svg className="sol-uni-copy" width="14" height="14" viewBox="0 0 24 24" fill="none">
            <rect x="9" y="9" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
            <path d="M5 15V6a2 2 0 012-2h9" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </div>
        <div className="sol-uni-bal">
          $43,251<i>.56</i>
        </div>
        <div className="sol-uni-chg">
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <path d="M5 1l4 7H1l4-7z" fill="#23a35b" />
          </svg>
          $156.01 (0.69%)
        </div>
        <div className="sol-uni-actions">
          <span className="sol-uni-act">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="6" width="18" height="12" rx="2.5" stroke="currentColor" strokeWidth="2" />
              <path d="M6 10h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <span className="sol-uni-act">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 4L3 11l6 2.5L11.5 20 20 4z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="sol-uni-act">
            <span className="sol-uni-act-fill">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 4v14m0 0l-5-5m5 5l5-5"
                  stroke="#fff"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
          <span className="sol-uni-act">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 8V5a1 1 0 011-1h3M20 8V5a1 1 0 00-1-1h-3M4 16v3a1 1 0 001 1h3M20 16v3a1 1 0 01-1 1h-3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
        <div className="sol-uni-claim">
          <b className="sol-uni-claim-h">Claim your username</b>
          <span className="sol-uni-claim-sub">
            One name for every app you touch.
          </span>
          <div className="sol-uni-claim-social">
            <span className="sol-uni-avastack">
              <span className="sol-face g1" />
              <span className="sol-face g2" />
              <span className="sol-face g3" />
              <span className="sol-uni-avamore">+2.4k</span>
            </span>
            <span className="sol-uni-claim-count">claimed this week</span>
          </div>
          <span className="sol-uni-claim-btn">Claim your name</span>
        </div>
        <div className="sol-uni-tabs">
          <span className="sol-uni-tab">Tokens</span>
          <span className="sol-uni-tab is-dim">NFTs</span>
          <span className="sol-uni-tab is-dim">Activity</span>
        </div>
        <div className="sol-uni-trow">
          <span className="sol-uni-ticon eth">Ξ</span>
          <span className="sol-uni-tinfo">
            <b>Ethereum</b>
            <span>1.24 ETH</span>
          </span>
          <span className="sol-uni-tval">
            <b>$3,058</b>
            <span className="is-up">+2.1%</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Unicorn-branded onboarding visual for the Unicorn case study: white cards
 * on the signature chunky purple offset-shadow (see myunicornaccount.com).
 */
const EthIcon = () => (
  <svg className="sol-uc-tok" viewBox="0 0 32 32" aria-hidden="true">
    <circle cx="16" cy="16" r="16" fill="#627eea" />
    <path fill="#fff" fillOpacity="0.9" d="M16 4l-.15.5v14.4l.15.15 6-3.55z" />
    <path fill="#fff" d="M16 4l-6 9.95 6 3.55V4z" />
    <path fill="#fff" fillOpacity="0.9" d="M16 18.62l-.08.1v5.13l.08.25 6-8.45z" />
    <path fill="#fff" d="M16 24.1v-5.48l-6-3.55z" />
  </svg>
);
const UsdtIcon = () => (
  <svg className="sol-uc-tok" viewBox="0 0 32 32" aria-hidden="true">
    <circle cx="16" cy="16" r="16" fill="#26a17b" />
    <path
      fill="#fff"
      d="M17.9 14.3v-1.9h4.3V9.5H9.8v2.9h4.3v1.9c-3.5.16-6.13.85-6.13 1.68 0 .83 2.63 1.52 6.13 1.68v6.03h3.8v-6.03c3.49-.16 6.11-.85 6.11-1.68 0-.83-2.62-1.52-6.11-1.68m0 2.84v-.01c-.09.01-.54.04-1.55.04-.8 0-1.37-.02-1.57-.04v.01c-3.1-.14-5.42-.68-5.42-1.33 0-.64 2.32-1.19 5.42-1.33v2.12c.2.01.78.05 1.58.05.97 0 1.45-.04 1.54-.05v-2.12c3.09.14 5.4.69 5.4 1.33 0 .65-2.31 1.19-5.4 1.33"
    />
  </svg>
);

/**
 * Unicorn case study — recreation of Unicorn's "Simple Monetization" visual:
 * a yellow phone with a swap screen, two floating white cards on the signature
 * purple offset-shadow showing the fee the brand earns.
 */
export function UnicornOnboard() {
  return (
    <div className="sol-uc" aria-hidden="true">
      <div className="sol-uc-ellipse" />
      <div className="sol-uc-phone">
        <div className="sol-uc-phone-notch" />
        <div className="sol-uc-screen">
          <div className="sol-uc-screen-head" />
          <div className="sol-uc-screen-note">You can add usernames in the swap</div>
          <div className="sol-uc-swaprow">
            <div className="sol-uc-swap-amt">
              <b>1</b>
              <span>($2277.71)</span>
            </div>
            <div className="sol-uc-swap-tok">
              <EthIcon />
              <b>ETH</b>
              <span>6.387 ETH</span>
              <em>Max</em>
            </div>
          </div>
          <div className="sol-uc-swap-swapicon">&#8645;</div>
          <div className="sol-uc-swaprow">
            <div className="sol-uc-swap-amt">
              <b>3487.18</b>
              <span>($3486.00)</span>
            </div>
            <div className="sol-uc-swap-tok">
              <UsdtIcon />
              <b>USDT</b>
              <span>47.883 USDT</span>
            </div>
          </div>
          <div className="sol-uc-swap-fee">
            Transaction fee <span>0.00635 ETH ($1.5)</span>
          </div>
          <div className="sol-uc-swap-btns">
            <span className="is-cancel">Cancel</span>
            <span className="is-confirm">Confirm</span>
          </div>
        </div>
      </div>

      <div className="sol-uc-fcard sol-uc-fcard-1">
        <div className="sol-uc-fcard-title">
          <b>user.yourbrand.com</b> swaps
        </div>
        <div className="sol-uc-fcard-row">
          <b>1 ETH</b>
          <EthIcon />
          <span className="sol-uc-fcard-arrow">&#187;</span>
          <UsdtIcon />
          <b>3,487.18 USDT</b>
        </div>
      </div>

      <span className="sol-uc-connect">&#8595;</span>

      <div className="sol-uc-fcard sol-uc-fcard-2">
        <div className="sol-uc-fcard-title">
          <b>yourbrand.com</b> makes 0.5%
        </div>
        <div className="sol-uc-fcard-row is-center">
          <UsdtIcon />
          <b>17.43 USDT</b>
        </div>
      </div>
    </div>
  );
}

/**
 * Celo-branded case-study visual (Celonames): cream panel with the tiled-pill
 * texture, Celo yellow accents, and the "get your CELO name" register card.
 */
export function CeloNames() {
  return (
    <div className="sol-celo" aria-hidden="true">
      <img className="sol-celo-shot s1" src="/assets/images/celo-case-1.png" alt="" loading="lazy" />
      <img className="sol-celo-shot s2" src="/assets/images/celo-case-2.png" alt="" loading="lazy" />
    </div>
  );
}

/**
 * Fintech / neobank case-study visual: a clean "send money" screen showing a
 * payment to a readable name (alice.pay.eth) instead of a 42-char address.
 */
export function FintechSend({ name }: { name: string }) {
  const dot = name.indexOf(".");
  const label = dot > 0 ? name.slice(0, dot) : name;
  const suffix = dot > 0 ? name.slice(dot) : "";
  return (
    <div className="sol-fin" aria-hidden="true">
      <div className="sol-fin-screen">
        <div className="sol-fin-top">
          <span className="sol-fin-back">&#8249;</span>
          <span className="sol-fin-title">Send money</span>
          <span className="sol-fin-x">&#215;</span>
        </div>
        <div className="sol-fin-to">
          <span className="sol-fin-avatar">
            <img src="/assets/images/alice-hatter.png" alt="" />
          </span>
          <div className="sol-fin-to-info">
            <span className="sol-fin-name">
              <b>{label}</b>
              <i>{suffix}</i>
            </span>
            <span className="sol-fin-to-sub">Verified &middot; resolves on 5 chains</span>
          </div>
          <span className="sol-fin-check">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12.5l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        <div className="sol-fin-amount">
          $50<span>.00</span>
        </div>
        <div className="sol-fin-from">
          <span>From</span>
          <b>Main balance &middot; $4,208.00</b>
        </div>
        <div className="sol-fin-btn">Send $50.00</div>
        <div className="sol-fin-note">Instant &middot; no network fee</div>
      </div>
    </div>
  );
}

/** Renders **bold** spans inside copy strings. */
/** Renders [text](url) links and **bold** inside copy strings. */
function renderRich(text: string) {
  const parts = text.split(/\[([^\]]+)\]\(([^)]+)\)/g);
  const out: React.ReactNode[] = [];
  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i]) out.push(<span key={`t${i}`}>{renderBold(parts[i])}</span>);
    if (parts[i + 1] && parts[i + 2]) {
      out.push(
        <a
          key={`l${i}`}
          href={parts[i + 2]}
          target="_blank"
          rel="noopener noreferrer"
          className="solution-spotlight-link"
        >
          {parts[i + 1]}
        </a>
      );
    }
  }
  return out;
}

function renderBold(text: string) {
  return text
    .split(/\*\*(.+?)\*\*/g)
    .map((part, i) => (i % 2 === 1 ? <b key={i}>{part}</b> : part));
}

export function HeroSendFlow({ name }: { name: string }) {
  return (
    <div className="solution-sendflow" aria-hidden="true">
      <div className="solution-sendflow-card">
        <div className="solution-sendflow-label">Your send flow today</div>
        <div className="solution-sendflow-field">
          0x4f3a91c07b8e22d40a6f18e5c1b7a3900d42c8d2
        </div>
        <div className="solution-sendflow-warn">
          <span>&#9888;</span> Double-check the first and last 4 characters
          before sending. Transactions cannot be reversed.
        </div>
        <div className="solution-sendflow-btn">Send anyway</div>
      </div>
      <div className="solution-sendflow-card is-good">
        <div className="solution-sendflow-label">With Namespace</div>
        <div className="solution-sendflow-field">{name}</div>
        <div className="solution-sendflow-ok">
          &#10003; Resolved and verified onchain
        </div>
        <div className="solution-sendflow-btn is-pay">Pay $50.00</div>
      </div>
    </div>
  );
}

function QuoteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6 17H9L11 13V7H5V13H8L6 17ZM14 17H17L19 13V7H13V13H16L14 17Z"
        fill="#5474F6"
      />
    </svg>
  );
}

function TestimonialCard({ t }: { t: SolutionTestimonial }) {
  return (
    <div className="testimonials_card solution-testimonial-card">
      <div className="testimonials_card-top">
        <div className="testimonials_quote-wrapper">
          <div className="icon-embed-xsmall w-embed">
            <QuoteIcon />
          </div>
        </div>
        <div className="testimonial_rich-text w-richtext">
          <blockquote>{t.quote}</blockquote>
        </div>
      </div>
      <div className="testimonials_card-author-wrapper">
        <div className="testimonials_author-avatar-wrapper">
          <img
            loading="lazy"
            src={t.avatar}
            alt={`${t.name} testimonial photo`}
            className="testimonials_author-avatar"
          />
        </div>
        <div className="testimonials_card-author-info">
          <p className="text-size-medium text-weight-bold is-author">
            {t.name}
          </p>
          <p className="text-size-small text-weight-medium is-testimonials-author-title">
            {t.title}
          </p>
        </div>
      </div>
    </div>
  );
}


function HeroTree({ name }: { name: string }) {
  const [label, ...rest] = name.split(".");
  const root = rest.join(".");
  return (
    <div className="solution-tree is-hero" aria-hidden="true">
      <div className="solution-tree-root">{root}</div>
      <div className="solution-tree-trunk" />
      <div className="solution-tree-branches">
        {[label, "app", "bridge"].map((l) => (
          <div key={l} className="solution-tree-leaf">
            <b>{l}</b>.{root}
          </div>
        ))}
      </div>
    </div>
  );
}


function HeroBrowser({ name }: { name: string }) {
  return (
    <div className="solution-browser" aria-hidden="true">
      <div className="solution-browser-chrome">
        <span className="solution-code-dot" />
        <span className="solution-code-dot" />
        <span className="solution-code-dot" />
        <div className="solution-browser-bar">
          <span className="solution-browser-lock">&#10003;</span>
          {name}
        </div>
      </div>
      <div className="solution-browser-page">
        <div className="solution-browser-nav">
          <span className="solution-browser-logo" />
          <span className="solution-browser-navname">yourapp</span>
          <span className="solution-browser-navlinks">
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className="solution-browser-hero">
          <div className="solution-browser-headline">Always online.</div>
          <div className="solution-browser-sub">
            No registrar. No server. No takedowns.
          </div>
          <div className="solution-browser-btn">Enter app</div>
        </div>
        <div className="solution-browser-cards">
          {["docs", "app", "blog"].map((sub) => (
            <div key={sub} className="solution-browser-card">
              <span className="solution-browser-cardname">
                <b>{sub}</b>.yourapp.eth
              </span>
              <span className="solution-browser-cardlive">&#9679; live</span>
            </div>
          ))}
        </div>
      </div>
      <div className="solution-browser-meta">
        content-addressed &middot; bafybei&hellip;q2fe &middot; no server, no registrar
      </div>
    </div>
  );
}




function HeroAgent({ name }: { name: string }) {
  const [label, ...rest] = name.split(".");
  const domain = rest.join(".");
  const brand = (rest[0] ?? "yourapp").replace(/\.eth$/, "");
  return (
    <div className="solution-alookup" aria-hidden="true">
      <div className="solution-code-chrome">
        <span className="solution-code-dot" />
        <span className="solution-code-dot" />
        <span className="solution-code-dot" />
        <span className="solution-code-label">Agent lookup</span>
      </div>
      <div className="solution-alookup-body">
        <div className="solution-alookup-cmd">
          <i>&gt;</i> resolve <b>{name}</b>
        </div>
        <div className="solution-alookup-rows">
          <div className="solution-alookup-row">
            <span>owner</span>
            <b>{domain}</b>
          </div>
          <div className="solution-alookup-row">
            <span>endpoint</span>
            <b>agents.{brand}.com/{label}</b>
          </div>
          <div className="solution-alookup-row">
            <span>erc8004</span>
            <b className="is-ok">registered &#10003;</b>
          </div>
          {[
            ["eth", "0x4f3a\u2026c8d2"],
            ["base", "0x4f3a\u2026c8d2"],
            ["btc", "bc1q\u2026x2vw"],
            ["sol", "8kJq\u2026p4Fn"],
          ].map(([c, a], ci) => (
            <div key={c} className="solution-alookup-row">
              <span>{ci === 0 ? "wallets" : ""}</span>
              <em className="solution-alookup-chain">{c}</em>
              <b>{a}</b>
            </div>
          ))}
        </div>
        <div className="solution-alookup-ok">
          &#10003; identity verified onchain
        </div>
      </div>
    </div>
  );
}

export function SolutionPage({ solution }: { solution: Solution }) {
  const s = solution;
  let sectionCount = 0;
  const nextNum = () => String(++sectionCount).padStart(2, "0");
  const howToGrid =
    s.howTo && s.howTo.table.columns.length === 3
      ? "1.1fr 1fr 1fr"
      : "0.8fr 1fr 1.4fr 0.7fr 1.4fr";

  return (
    <>
      {/* ── Hero - mirrors the WANT ── */}
      <header className="section_solution-hero">
        <div className="solution-hero-backdrop" aria-hidden="true" />
        <div padding-global="">
          <div
            container="large"
            className="padding-section-large is-top-medium"
          >
            <div className="solution-hero">
              <div className="solution-hero-content">
                <div
                  data-wf--component-tag--variant="background-blur"
                  className="tag w-variant-1ec346f0-aef7-27e9-e90b-2eb557766f44 solution-anim solution-anim-1"
                >
                  <div>{s.hero.tag}</div>
                </div>
                <h1 className="solution-hero-heading solution-anim solution-anim-2">
                  {s.hero.headline}
                </h1>
                <div className="max-width-medium is-37rem solution-anim solution-anim-3">
                  <p className="text-size-medium text-weight-medium solution-hero-sub">
                    {renderBold(s.hero.subheadline)}
                  </p>
                </div>
                <div className="button-group solution-anim solution-anim-4">
                  <WebflowButton
                    label={s.hero.primaryCta.label}
                    href={s.hero.primaryCta.href}
                    variant="white"
                    external={s.hero.primaryCta.external ?? false}
                  />
                  <WebflowButton
                    label={s.hero.secondaryCta.label}
                    href={s.hero.secondaryCta.href}
                    variant="hero-outline"
                    external={s.hero.secondaryCta.external ?? false}
                  />
                </div>
                <div className="solution-anim solution-anim-5">
                  <ProofStrip />
                </div>
              </div>
              <div className="solution-hero-visual solution-anim solution-anim-3">
                {s.heroVisual === "phone" ? (
                  <HeroPhone name={s.heroName} />
                ) : s.heroVisual === "sendflow" ? (
                  <HeroSendFlow name={s.heroName} />
                ) : s.heroVisual === "tree" ? (
                  <HeroTree name={s.heroName} />
                ) : s.heroVisual === "browser" ? (
                  <HeroBrowser name={s.heroName} />
                ) : s.heroVisual === "agent" ? (
                  <HeroAgent name={s.heroName} />
                ) : (
                  <HeroNameCard name={s.heroName} />
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Answer capsule: how it works, right after the hero ── */}
      {s.howItWorks && (
        <section className="section_solution-hiw">
          <div padding-global="">
            <div container="large">
              <div className="solution-hiw">
                <div className="solution-hiw-label">{s.howItWorks.label}</div>
                <p className="solution-hiw-lead">
                  {renderBold(s.howItWorks.lead)}
                </p>
                {s.howItWorks.facts && (
                  <div className="solution-hiw-facts">
                    {s.howItWorks.facts.map((f) => (
                      <div key={f.title} className="solution-hiw-fact">
                        <b>{f.title}</b>
                        <span>{f.description}</span>
                      </div>
                    ))}
                  </div>
                )}
                {s.howItWorks.chips && (
                  <div className="solution-facts">
                    {s.howItWorks.chips.map((chip) => (
                      <span key={chip} className="solution-fact-chip">
                        {chip}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Before / after comparison ── */}
      {s.compare && (
        <section className="section_solution-compare">
          <div padding-global="">
            <div container="large">
              <div className="solution-compare">
                <div className="solution-compare-card">
                  <div className="solution-compare-label">
                    {s.compare.before.label}
                  </div>
                  <div className="solution-compare-value">
                    {s.compare.before.value}
                  </div>
                  <p className="text-weight-medium solution-compare-note">
                    {s.compare.before.note}
                  </p>
                </div>
                <div className="solution-compare-card is-after">
                  <div className="solution-compare-label">
                    {s.compare.after.label}
                  </div>
                  <div className="solution-compare-value">
                    {s.compare.after.value}
                  </div>
                  <p className="text-weight-medium solution-compare-note">
                    {s.compare.after.note}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Definition - answer-shaped block for SEO/GEO ── */}
      {s.definition && (
      <section className="section_solution-definition">
        <div padding-global="">
          <div container="large">
            <div className="solution-definition">
              <div className="solution-definition-body">
                <h2 className="heading-style-h5">{s.definition.question}</h2>
                <p className="text-weight-medium solution-definition-answer">
                  {s.definition.answer}
                </p>
                {s.definitionPoints && (
                  <div className="solution-def-points">
                    {s.definitionPoints.map((pt) => (
                      <div key={pt.title} className="solution-def-point">
                        <h3 className="heading-style-h6">{pt.title}</h3>
                        <p className="text-weight-medium">{pt.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ── Pains - mirrors FEARS + TRIED-AND-HATED ── */}
      <section className="section_solution-pains">
        <div padding-global="">
          <div
            container="large"
            className="padding-section-large is-top-medium"
          >
            <div className="margin-bottom margin-xlarge">
              <Eyebrow num={nextNum()} label="The problem" />
              <h2 className="solution-section-heading">
                {s.pains.heading.split("\n").map((line, li) => (
                  <span key={li} className="cta_heading-line">
                    {line}
                  </span>
                ))}
              </h2>
              {s.pains.lead && (
                <p className="text-size-medium text-weight-medium solution-terminal-paragraph">
                  {s.pains.lead}
                </p>
              )}
            </div>
            {s.pains.style === "spotlight" ? (
              <SolutionPainsSpotlight items={s.pains.items} />
            ) : (
            <div className="solution-pains-grid">
              {s.pains.items.map((p, i) => (
                <div key={p.question} className="solution-pain-card">
                  <div className="solution-pain-index" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="heading-style-h5 solution-pain-question">
                    {p.question}
                  </h3>
                  <p className="text-weight-medium solution-pain-detail">
                    {p.detail}
                  </p>
                </div>
              ))}
            </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Case study spotlight (optional) ── */}
      {s.caseStudy && (
        <section className="section_solution-case">
          <div padding-global="">
            <div container="large" className="padding-section-large is-top-medium">
              <div className="solution-case">
                <div className="solution-case-main">
                  <div className="solution-case-tag">{s.caseStudy.tag}</div>
                  <blockquote className="solution-case-quote">
                    "{s.caseStudy.quote}"
                  </blockquote>
                  <div className="solution-case-author">
                    <img src={s.caseStudy.avatar} alt={s.caseStudy.name} />
                    <span>
                      {s.caseStudy.name}, {s.caseStudy.title}
                    </span>
                  </div>
                </div>
                <div className="solution-case-facts">
                  {s.caseStudy.facts.map((f) => (
                    <div key={f.title} className="solution-case-fact">
                      <b>{f.title}</b>
                      <span>{f.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Benefits (optional) ── */}
      {s.benefits && (
        <section className="section_solution-benefits">
          <div padding-global="">
            <div
              container="large"
              className="padding-section-large is-top-medium"
            >
              <div className="margin-bottom margin-xlarge">
                <Eyebrow num={nextNum()} label={s.benefits.label ?? "Why wallets do this"} />
                <h2 className="solution-section-heading">
                  {s.benefits.heading}
                </h2>
              </div>
              {s.benefits.style === "bento" ? (
                <SolutionBenefitsBento items={s.benefits.items} name={s.heroName} />
              ) : (
              <div
                className={`solution-pains-grid${s.benefits.items.length === 4 ? " is-quad" : ""}`}
              >
                {s.benefits.items.map((b) => (
                  <div key={b.title} className="solution-pain-card">
                    {b.visual && (
                      <SolutionBenefitVisual kind={b.visual} name={s.heroName} />
                    )}
                    <h3 className="heading-style-h5 solution-pain-question">
                      {b.title}
                    </h3>
                    <p className="text-weight-medium solution-pain-detail">
                      {b.description}
                    </p>
                  </div>
                ))}
              </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── In your product: rows left, visual right (optional, dark) ── */}
      {s.productLook && (
        <section className="section_solution-plook">
          <div padding-global="">
            <div
              container="large"
              className="padding-section-large is-top-medium"
            >
              <div className="margin-bottom margin-xlarge">
                <Eyebrow num={nextNum()} label={s.productLook.label} />
                <h2 className="solution-section-heading solution-plook-heading">
                  {s.productLook.heading}
                </h2>
                {s.productLook.paragraph && (
                  <p className="text-size-medium text-weight-medium solution-terminal-paragraph">
                    {s.productLook.paragraph}
                  </p>
                )}
              </div>
              <SolutionProductLook data={s.productLook} name={s.heroName} />
            </div>
          </div>
        </section>
      )}

      {!s.howTo?.afterOutcomes && (<>
      {/* ── How-to: joined step strip + dark comparison table (dark zone) ── */}
      {s.howTo && (
        <section
          className={`section_solution-howto${s.howTo.theme === "light" ? " is-light" : ""}`}
        >
          <div
            padding-global=""
            className={s.howTo.theme === "light" ? "section-inner-background is-top-only background-color-secondary" : undefined}
          >
            <div
              container="large"
              className="padding-section-large is-top-medium"
            >
              <div className="margin-bottom margin-xlarge">
                <Eyebrow num={nextNum()} label={s.howTo.label} dark={s.howTo.theme === "light"} />
                <h2 className="solution-section-heading solution-howto-heading">
                  {s.howTo.heading}
                </h2>
                <p className="text-size-medium text-weight-medium solution-table-intro">
                  {s.howTo.intro}
                </p>
              </div>
              <div className="solution-howto-steps">
                {s.howTo.steps.map((step, i) => (
                  <div key={step.title} className="solution-howto-step">
                    <em>{String(i + 1).padStart(2, "0")}</em>
                    <h3 className="heading-style-h6">{step.title}</h3>
                    <p className="text-weight-medium">{renderRich(step.body)}</p>
                  </div>
                ))}
              </div>
              {s.howTo.tableCaption && (
                <p className="solution-howto-caption">{s.howTo.tableCaption}</p>
              )}
              <div className="solution-table solution-howto-table">
                <div
                  className="solution-table-row is-head"
                  style={{ gridTemplateColumns: howToGrid }}
                >
                  {s.howTo.table.columns.map((col, i) => (
                    <div key={i}>{col}</div>
                  ))}
                </div>
                {s.howTo.table.rows.map((row, ri) => (
                  <div
                    key={ri}
                    className={`solution-table-row${ri === s.howTo!.recommendedRow ? " is-highlight" : ""}`}
                    style={{ gridTemplateColumns: howToGrid }}
                  >
                    {row.map((value, ci) => (
                      <div
                        key={ci}
                        data-label={ci > 0 ? s.howTo!.table.columns[ci] : undefined}
                      >
                        {value}
                        {ci === 0 && ri === s.howTo!.recommendedRow && (
                          <span className="solution-howto-badge">
                            Recommended
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              {s.howTo.recommendation && (
                <p className="solution-howto-reco">
                  <b>Our recommendation:</b> {s.howTo.recommendation}
                </p>
              )}
            </div>
          </div>
        </section>
      )}
      </>)}

      {/* ── Compact outcome cards (optional, dark) ── */}
      {s.outcomes && (
        <section className="section_solution-outcomes">
          <div padding-global="">
            <div
              container="large"
              className="padding-section-large is-top-medium"
            >
              <div className="margin-bottom margin-xlarge">
                {s.outcomes.label && (
                  <Eyebrow num={nextNum()} label={s.outcomes.label} />
                )}
                <h2 className="solution-section-heading">
                  {s.outcomes.heading.split("\n").map((line, li) => (
                    <span key={li} className="cta_heading-line">
                      {line}
                    </span>
                  ))}
                </h2>
              </div>
              {s.outcomes.flow && (
                <div className="solution-flow-wrap">
                  <div className="solution-flow" aria-hidden="true">
                    {s.outcomes.flow.steps.map((st, si) => (
                      <React.Fragment key={st.label}>
                        {si > 0 && (
                          <span className="solution-flow-arrow">&rarr;</span>
                        )}
                        <span className="solution-flow-node">
                          <b>{st.label}</b>
                          <i>{st.sub}</i>
                        </span>
                      </React.Fragment>
                    ))}
                  </div>
                  {s.outcomes.flow.caption && (
                    <p className="solution-flow-caption">
                      {s.outcomes.flow.caption}
                    </p>
                  )}
                </div>
              )}
              {s.outcomes.style === "list" ? (
                <div className="solution-manifest">
                  {s.outcomes.items.map((o, i) => (
                    <div key={o.title} className="solution-manifest-row">
                      <span className="solution-manifest-num" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="heading-style-h6">
                        {o.title.split("\n").map((line, li) => (
                          <span key={li} className="solution-manifest-titleline">
                            {line}
                          </span>
                        ))}
                      </h3>
                      <p className="text-weight-medium">{renderRich(o.description)}</p>
                    </div>
                  ))}
                </div>
              ) : (
              <div
                className={`solution-outcomes-grid${s.outcomes.columns === 2 ? " is-two" : s.outcomes.columns === 3 ? " is-three" : ""}`}
              >
                {s.outcomes.items.map((o) => (
                  <div
                    key={o.title}
                    className={`solution-outcome-card${o.visual ? " has-visual" : ""}`}
                  >
                    <div>
                      <h3 className="heading-style-h6">
                        {o.title.split("\n").map((line, li) => (
                          <span key={li} className="solution-manifest-titleline">
                            {line}
                          </span>
                        ))}
                      </h3>
                      <p className="text-weight-medium">{renderRich(o.description)}</p>
                    </div>
                    {o.visual && (
                      <SolutionBenefitVisual kind={o.visual} name={s.heroName} />
                    )}
                  </div>
                ))}
              </div>
              )}
            </div>
          </div>
        </section>
      )}

      {s.howTo?.afterOutcomes && (<>
      {/* ── How-to: joined step strip + dark comparison table (dark zone) ── */}
      {s.howTo && (
        <section
          className={`section_solution-howto${s.howTo.theme === "light" ? " is-light" : ""}`}
        >
          <div
            padding-global=""
            className={s.howTo.theme === "light" ? "section-inner-background is-top-only background-color-secondary" : undefined}
          >
            <div
              container="large"
              className="padding-section-large is-top-medium"
            >
              <div className="margin-bottom margin-xlarge">
                <Eyebrow num={nextNum()} label={s.howTo.label} dark={s.howTo.theme === "light"} />
                <h2 className="solution-section-heading solution-howto-heading">
                  {s.howTo.heading}
                </h2>
                <p className="text-size-medium text-weight-medium solution-table-intro">
                  {s.howTo.intro}
                </p>
              </div>
              <div className="solution-howto-steps">
                {s.howTo.steps.map((step, i) => (
                  <div key={step.title} className="solution-howto-step">
                    <em>{String(i + 1).padStart(2, "0")}</em>
                    <h3 className="heading-style-h6">{step.title}</h3>
                    <p className="text-weight-medium">{renderRich(step.body)}</p>
                  </div>
                ))}
              </div>
              {s.howTo.tableCaption && (
                <p className="solution-howto-caption">{s.howTo.tableCaption}</p>
              )}
              <div className="solution-table solution-howto-table">
                <div
                  className="solution-table-row is-head"
                  style={{ gridTemplateColumns: howToGrid }}
                >
                  {s.howTo.table.columns.map((col, i) => (
                    <div key={i}>{col}</div>
                  ))}
                </div>
                {s.howTo.table.rows.map((row, ri) => (
                  <div
                    key={ri}
                    className={`solution-table-row${ri === s.howTo!.recommendedRow ? " is-highlight" : ""}`}
                    style={{ gridTemplateColumns: howToGrid }}
                  >
                    {row.map((value, ci) => (
                      <div
                        key={ci}
                        data-label={ci > 0 ? s.howTo!.table.columns[ci] : undefined}
                      >
                        {value}
                        {ci === 0 && ri === s.howTo!.recommendedRow && (
                          <span className="solution-howto-badge">
                            Recommended
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              {s.howTo.recommendation && (
                <p className="solution-howto-reco">
                  <b>Our recommendation:</b> {s.howTo.recommendation}
                </p>
              )}
            </div>
          </div>
        </section>
      )}
      </>)}

      {/* ── Standards trio (optional, dark) ── */}
      {s.standards && (
        <section className="section_solution-standards">
          <div padding-global="">
            <div
              container="large"
              className="padding-section-large is-top-medium"
            >
              <div className="margin-bottom margin-xlarge">
                <Eyebrow num={nextNum()} label={s.standards.label} />
                <h2 className="solution-section-heading">
                  {s.standards.heading}
                </h2>
                {s.standards.lead && (
                  <p className="text-size-medium text-weight-medium solution-terminal-paragraph">
                    {s.standards.lead}
                  </p>
                )}
              </div>
              <div className="solution-standards-grid">
                {s.standards.items.map((st) => (
                  <div key={st.tag} className="solution-standard-card">
                    <em>{st.tag}</em>
                    <h3 className="heading-style-h6">{st.title}</h3>
                    <p className="text-weight-medium">{st.description}</p>
                    {st.keys && (
                      <div className="solution-standard-keys">
                        {st.keys.map((k) => (
                          <code key={k}>{k}</code>
                        ))}
                      </div>
                    )}
                    {st.link && (
                      <a
                        href={st.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="solution-dev-link"
                      >
                        {st.link.label} <span aria-hidden="true">→</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Feature comparison table (optional, dark) ── */}
      {s.featureTable && (
        <section className="section_solution-table">
          <div padding-global="">
            <div
              container="large"
              className="padding-section-large is-top-medium"
            >
              <div className="margin-bottom margin-xlarge">
                <Eyebrow num={nextNum()} label={s.featureTable.label} />
                <h2 className="solution-section-heading">
                  {s.featureTable.heading}
                </h2>
                <p className="text-size-medium text-weight-medium solution-table-intro">
                  {s.featureTable.intro}
                </p>
              </div>
              <div className="solution-table">
                <div className="solution-table-row is-head">
                  <div>Feature</div>
                  <div>{s.featureTable.columns[0]}</div>
                  <div>{s.featureTable.columns[1]}</div>
                </div>
                {s.featureTable.rows.map((row) => (
                  <div
                    key={row.feature}
                    className={`solution-table-row${row.highlight ? " is-highlight" : ""}`}
                  >
                    <div>{row.feature}</div>
                    <div className={row.a ? "solution-table-yes" : "solution-table-no"}>
                      {row.a ? "✓" : "—"}
                    </div>
                    <div className={row.b ? "solution-table-yes" : "solution-table-no"}>
                      {row.b ? "✓" : "—"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Multi-tenant namespaces (optional, dark) ── */}
      {s.tenants && (
        <section className="section_solution-tenants">
          <div padding-global="">
            <div
              container="large"
              className="padding-section-large is-top-medium"
            >
              <div className="margin-bottom margin-xlarge">
                <Eyebrow num={nextNum()} label={s.tenants.label} />
                <h2 className="solution-section-heading">
                  {s.tenants.heading}
                </h2>
                <p className="text-size-medium text-weight-medium solution-table-intro">
                  {s.tenants.paragraph}
                </p>
              </div>
              <div className="solution-tenants">
                {s.tenants.names.map((n) => {
                  const parts = n.suffix.replace(/^\./, "").split(".");
                  const brand = parts[0];
                  const tld = parts.slice(1).join(".");
                  return (
                    <div key={n.suffix} className="solution-tenant">
                      <b>{n.label}</b>.
                      <span className="solution-tenant-brand">{brand}</span>.{tld}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Two-card contrast (optional, dark) ── */}
      {s.versus && (
        <section className="section_solution-versus">
          <div padding-global="">
            <div
              container="large"
              className="padding-section-large is-top-medium"
            >
              <div className="margin-bottom margin-xlarge">
                <Eyebrow num={nextNum()} label={s.versus.label} />
                <h2 className="solution-section-heading">
                  {s.versus.heading}
                </h2>
              </div>
              <div className="solution-versus-grid">
                {s.versus.cards.map((card) => (
                  <div key={card.tag} className="solution-risk-card is-dark">
                    <em className="solution-risk-tag">{card.tag}</em>
                    <h3 className="heading-style-h6 solution-versus-value">
                      {card.value.includes(".") ? (
                        <span className="solution-versus-name">
                          {card.value.split(".").map((part, pi, arr) => (
                            <React.Fragment key={pi}>
                              {pi > 0 && <span className="is-dot">.</span>}
                              <span
                                className={
                                  pi === 0
                                    ? "is-label"
                                    : pi === arr.length - 1
                                      ? "is-tld"
                                      : "is-mid"
                                }
                              >
                                {part}
                              </span>
                            </React.Fragment>
                          ))}
                        </span>
                      ) : (
                        card.value
                      )}
                    </h3>
                    <p className="text-weight-medium solution-risk-detail">
                      {card.description}
                    </p>
                    <p className="solution-risk-fix">{card.verdict}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Terminal / deploy log (optional, dark) ── */}
      {s.terminal && (
        <section className="section_solution-terminal">
          <div padding-global="">
            <div
              container="large"
              className="padding-section-large is-top-medium"
            >
              <div className="solution-or-divider" aria-hidden="true">
                <span>or</span>
              </div>
              <div className="solution-pinme-panel">
              <div className="solution-terminal">
                <div>
                  <div className="solution-pinme-tag">{s.terminal.label}</div>
                  <h2 className="solution-section-heading">
                    {s.terminal.heading}
                  </h2>
                  <p className="text-size-medium text-weight-medium solution-terminal-paragraph">
                    {s.terminal.paragraph}
                  </p>
                  {s.terminal.cta && (
                    <div className="button-group solution-terminal-cta">
                      <WebflowButton
                        label={s.terminal.cta.label}
                        href={s.terminal.cta.href}
                        variant="white"
                        external={s.terminal.cta.external ?? false}
                      />
                      {s.terminal.cta2 && (
                        <WebflowButton
                          label={s.terminal.cta2.label}
                          href={s.terminal.cta2.href}
                          variant="hero-outline"
                          external={s.terminal.cta2.external ?? false}
                        />
                      )}
                    </div>
                  )}
                </div>
                <div className="solution-code-block">
                  <div className="solution-code-chrome">
                    <span className="solution-code-dot" />
                    <span className="solution-code-dot" />
                    <span className="solution-code-dot" />
                    <span className="solution-code-label">
                      {s.terminal.windowLabel}
                    </span>
                  </div>
                  <pre>
                    <code>
                      {s.terminal.lines.map((line, i) => (
                        <span key={i} className="solution-term-line">
                          <span className={`solution-term-icon is-${line.kind}`}>
                            {line.kind === "cmd" ? "$" : line.kind === "ok" ? "✓" : "●"}
                          </span>{" "}
                          {line.text}
                          {line.accent && (
                            <span className="solution-term-accent">
                              {"  "}
                              {line.accent}
                            </span>
                          )}
                          {line.note && (
                            <span className="solution-term-note">
                              {" "}
                              · {line.note}
                            </span>
                          )}
                          {"\n"}
                        </span>
                      ))}
                    </code>
                  </pre>
                </div>
              </div>
              {(s.terminal.quotes || s.terminal.stats) && (
                <div className="solution-pinme-footer is-stacked">
                  {s.terminal.quotes && (
                    <div className="solution-pinme-quotes">
                      {s.terminal.quotes.map((q) => (
                        <div key={q.attribution} className="solution-pinme-quote">
                          <p>"{q.quote}"</p>
                          <div className="solution-pinme-attribution">
                            {q.avatar && (
                              <img src={q.avatar} alt="" loading="lazy" />
                            )}
                            <span>{q.attribution}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="solution-pinme-statsrow">
                    {s.terminal.stats && (
                      <div className="solution-pinme-stats">
                        {s.terminal.stats.map((st) => (
                          <div key={st.label} className="solution-pinme-stat">
                            <b>{st.value}</b>
                            <span>{st.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {s.terminal.link && (
                      <a
                        href={s.terminal.link.href}
                        className="solution-cstory-link"
                      >
                        {s.terminal.link.label}{" "}
                        <span aria-hidden="true">→</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Risks + mitigations, dark variant (optional) ── */}
      {s.risks && s.risks.theme === "dark" && (
        <section className="section_solution-risks">
          <div padding-global="">
            <div
              container="large"
              className="padding-section-large is-top-medium"
            >
              <div className="margin-bottom margin-xlarge">
                <Eyebrow num={nextNum()} label={s.risks.label} />
                <h2 className="solution-section-heading solution-risks-heading">
                  {s.risks.heading}
                </h2>
              </div>
              <div className="solution-risks-grid is-dark">
                {s.risks.items.map((r) => (
                  <div key={r.title} className="solution-risk-card is-dark">
                    {r.tag && <em className="solution-risk-tag">{r.tag}</em>}
                    {r.visual && (
                      <SolutionBenefitVisual kind={r.visual} name={s.heroName} />
                    )}
                    <h3 className="heading-style-h6">{r.title}</h3>
                    <p className="text-weight-medium solution-risk-detail">
                      {r.description}
                    </p>
                    {r.fix && <p className="solution-risk-fix">{r.fix}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Split copy + stat grid (optional, dark) ── */}
      {s.splitStats && (
        <section className="section_solution-splitstats">
          <div padding-global="">
            <div
              container="large"
              className="padding-section-large is-top-medium"
            >
              <div className="solution-terminal">
                <div>
                  <Eyebrow num={nextNum()} label={s.splitStats.label} />
                  <h2 className="solution-section-heading">
                    {s.splitStats.heading}
                  </h2>
                  <p className="text-size-medium text-weight-medium solution-terminal-paragraph">
                    {s.splitStats.paragraph}
                  </p>
                  {s.splitStats.cta && (
                    <div className="button-group solution-terminal-cta">
                      <WebflowButton
                        label={s.splitStats.cta.label}
                        href={s.splitStats.cta.href}
                        variant="hero-outline"
                        external={s.splitStats.cta.external ?? false}
                      />
                    </div>
                  )}
                </div>
                <div className="solution-statband is-dark is-quad">
                  {s.splitStats.stats.map((stat) => (
                    <div key={stat.label} className="solution-statband-cell">
                      <b>{stat.value}</b>
                      <span>{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Namespace tree + pillars (optional, light zone) ── */}
      {s.tree && (
        <section className="section_solution-tree">
          <div padding-global="">
            <div
              container="large"
              className="padding-section-large is-top-medium"
            >
              <div className="margin-bottom margin-xlarge solution-tree-head">
                <h2 className="solution-section-heading">{s.tree.heading}</h2>
                <p className="text-size-medium text-weight-medium solution-features-intro">
                  {s.tree.paragraph}
                </p>
              </div>
              <div className="solution-tree is-dark" aria-hidden="true">
                <div className="solution-tree-root">{s.tree.root}</div>
                <div className="solution-tree-trunk" />
                <div className="solution-tree-branches">
                  {s.tree.leaves.map((leaf) => (
                    <div key={leaf.label} className="solution-tree-leaf">
                      <span>
                        <b>{leaf.label}</b>
                        {leaf.suffix}
                      </span>
                      {leaf.tag && (
                        <span className="solution-tree-leaftag">{leaf.tag}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="solution-tree-pillars is-dark">
                {s.tree.pillars.map((p) => (
                  <div key={p.title} className="solution-pillar">
                    <em>{p.tag}</em>
                    <h3 className="heading-style-h6">{p.title}</h3>
                    <p className="text-weight-medium">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Case story panel: narrative + visual + stats footer (optional, dark) ── */}
      {s.caseStory && (
        <section className="section_solution-cstory">
          <div padding-global="">
            <div
              container="large"
              className="padding-section-large is-top-medium"
            >
              <div className="solution-cstory">
                <div className="solution-cstory-main">
                  <div className="solution-cstory-body">
                    <div className="solution-case-tag">{s.caseStory.tag}</div>
                    <h2 className="solution-cstory-heading">
                      {s.caseStory.heading}
                    </h2>
                    {s.caseStory.points.map((pt) => (
                      <p key={pt.label} className="solution-cstory-point">
                        <b>{pt.label}</b> {pt.body}
                      </p>
                    ))}
                    {s.caseStory.quote && (
                    <div className="solution-cstory-quotecard">
                      <blockquote className="solution-cstory-quote">
                        "{s.caseStory.quote}"
                      </blockquote>
                      <div className="solution-cstory-author">
                        {s.caseStory.quoteAvatar && (
                          <img
                            src={s.caseStory.quoteAvatar}
                            alt={s.caseStory.attribution}
                            loading="lazy"
                          />
                        )}
                        <span>{s.caseStory.attribution}</span>
                      </div>
                    </div>
                    )}
                    <div className="solution-cstory-links">
                      <a
                        href={s.caseStory.ctaHref}
                        className="solution-cstory-link"
                        {...(s.caseStory.ctaHref.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {s.caseStory.ctaLabel} <span aria-hidden="true">→</span>
                      </a>
                      {s.caseStory.cta2Label && s.caseStory.cta2Href && (
                        <a
                          href={s.caseStory.cta2Href}
                          className="solution-cstory-link"
                          {...(s.caseStory.cta2Href.startsWith("http")
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          {s.caseStory.cta2Label}{" "}
                          <span aria-hidden="true">→</span>
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="solution-cstory-visual">
                    {s.caseStory.image ? (
                      <img
                        src={s.caseStory.image}
                        alt={s.caseStory.imageAlt ?? s.caseStory.tag}
                        className="solution-plook-img"
                        loading="lazy"
                      />
                    ) : s.caseStory.visualKind === "unicorn" ? (
                      <UnicornOnboard />
                    ) : s.caseStory.visualKind === "celo" ? (
                      <CeloNames />
                    ) : s.caseStory.visualKind === "fintech" ? (
                      <FintechSend name={s.caseStory.visualName ?? s.heroName} />
                    ) : (
                      <HeroPhone name={s.caseStory.visualName ?? s.heroName} />
                    )}
                  </div>
                </div>
                {s.caseStory.stats && (
                  <div className="solution-cstory-stats">
                    {s.caseStory.stats.map((stat) => (
                      <div key={stat.label} className="solution-cstory-stat">
                        <b>{stat.value}</b>
                        <span>{stat.label}</span>
                      </div>
                    ))}
                  </div>
                )}
                {s.caseStory.trustedBy && (
                  <div className="solution-cstory-footer">
                    <div className="solution-cstory-trust">
                      <span>Trusted by</span>
                      {s.caseStory.trustedBy.map((name) => (
                        <b key={name}>{name}</b>
                      ))}
                    </div>
                    {s.caseStory.badge && (
                      <div className="solution-cstory-badge">
                        {s.caseStory.badge}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Architecture explainer (optional, light zone) ── */}
      {s.architecture && (
        <section className="section_solution-arch">
          <div
            padding-global=""
            className="section-inner-background is-top-only background-color-secondary"
          >
            <div
              container="large"
              className="padding-section-large is-top-medium"
            >
              <div className="margin-bottom margin-xlarge">
                <Eyebrow num={nextNum()} label={s.architecture.label} dark />
                <h2 className="solution-section-heading">
                  {s.architecture.heading}
                </h2>
              </div>
              <div className="solution-tree-pillars">
                {s.architecture.steps.map((step, i) => (
                  <div key={step.title} className="solution-pillar">
                    <em>{String(i + 1).padStart(2, "0")}</em>
                    <h3 className="heading-style-h6">{step.title}</h3>
                    <p className="text-weight-medium">{renderRich(step.body)}</p>
                  </div>
                ))}
              </div>
              {s.architecture.table && (
              <div className="solution-arch-tablewrap">
                <p className="solution-whyus-caption">
                  {s.architecture.tableCaption}
                </p>
                <div className="solution-table solution-whyus-table">
                  <div
                    className="solution-table-row is-head"
                    style={{ gridTemplateColumns: `1.1fr 1fr 1fr 1fr` }}
                  >
                    {s.architecture.table!.columns.map((col, i) => (
                      <div
                        key={i}
                        className={
                          i === s.architecture!.highlightColumn
                            ? "solution-whyus-hl-head"
                            : undefined
                        }
                      >
                        {col}
                      </div>
                    ))}
                  </div>
                  {s.architecture.table!.rows.map((row, ri) => (
                    <div
                      key={ri}
                      className="solution-table-row"
                      style={{ gridTemplateColumns: `1.1fr 1fr 1fr 1fr` }}
                    >
                      {row.map((value, ci) => (
                        <div
                          key={ci}
                          data-label={ci > 0 ? s.architecture!.table!.columns[ci] : undefined}
                          className={
                            ci === s.architecture!.highlightColumn
                              ? "solution-whyus-hl"
                              : undefined
                          }
                        >
                          {value}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              )}
              {s.architecture.chips && (
                <div className="solution-arch-panel">
                  <div className="solution-arch-panel-head">
                    <h3 className="heading-style-h5">
                      {s.architecture.chipsLabel}
                    </h3>
                    {s.architecture.chipsParagraph && (
                      <p className="text-weight-medium">
                        {s.architecture.chipsParagraph.split("\n").map((line, li) => (
                          <span key={li} className="solution-arch-paraline">
                            {line}
                          </span>
                        ))}
                      </p>
                    )}
                  </div>
                  <div className="solution-arch-rules">
                    {s.architecture.chips.map((chip) => (
                      <div key={chip} className="solution-arch-rule">
                        <span className="solution-arch-tick" aria-hidden="true">
                          &#10003;
                        </span>
                        {chip}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {s.architecture.recommendation && (
                <p className="solution-arch-reco">
                  <b>Our recommendation:</b> {s.architecture.recommendation}
                </p>
              )}
              {s.architecture.note && (
                <p className="solution-arch-note">{s.architecture.note}</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Desire - mirrors the DEEP DESIRE ── */}
      {s.desire && (
      <section className="section_solution-desire">
        <div
          padding-global=""
          className={`section-inner-background ${s.tree || s.howTo?.theme === "light" ? "no-border-radius" : "is-top-only"} background-color-secondary`}
        >
          <div
            container="large"
            className="padding-section-large is-top-medium"
          >
            <div className="solution-desire">
              <div className="solution-desire-intro">
                <Eyebrow num={nextNum()} label="The outcome" dark />
                <h2 className="solution-section-heading">{s.desire.heading}</h2>
                <p className="text-size-medium text-weight-medium solution-desire-paragraph">
                  {s.desire.paragraph}
                </p>
              </div>
              <ul className="solution-desire-list">
                {s.desire.bullets.map((b) => (
                  <li key={b} className="solution-desire-item">
                    <span className="solution-desire-check" aria-hidden="true">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M4 10.5L8.5 15L16 6"
                          stroke="#fff"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <p className="text-weight-medium">{b}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ── Risks + mitigations (optional, light zone) ── */}
      {s.risks && s.risks.theme !== "dark" && (
        <section className="section_solution-risks">
          <div
            padding-global=""
            className="section-inner-background no-border-radius background-color-secondary"
          >
            <div
              container="large"
              className="padding-section-large is-top-medium"
            >
              <div className="margin-bottom margin-xlarge">
                <Eyebrow num={nextNum()} label={s.risks.label} dark />
                <h2 className="solution-section-heading solution-risks-heading">
                  {s.risks.heading}
                </h2>
              </div>
              <div className="solution-risks-grid">
                {s.risks.items.map((r) => (
                  <div key={r.title} className="solution-risk-card">
                    <h3 className="heading-style-h6">{r.title}</h3>
                    <p className="text-weight-medium solution-risk-detail">
                      {r.description}
                    </p>
                    <p className="solution-risk-fix">{r.fix}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Solution - answers the NEED ── */}
      {s.solution && (
      <section className="section_solution-features">
        <div
          padding-global=""
          className={`section-inner-background ${s.desire || s.howTo?.theme === "light" ? "no-border-radius" : "is-top-only"} background-color-secondary`}
        >
          <div
            container="large"
            className="padding-section-large is-top-medium"
          >
            <div className="margin-bottom margin-xlarge">
              <Eyebrow num={nextNum()} label="The solution" dark />
              <h2 className="solution-section-heading">{s.solution.heading}</h2>
              <p className="text-size-medium text-weight-medium solution-features-intro">
                {s.solution.paragraph}
              </p>
            </div>
            <div className="solution-features-grid">
              {s.solution.features.map((f, i) => (
                <div key={f.title} className="solution-feature-card">
                  <div className="solution-feature-index" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="heading-style-h6 solution-feature-title">
                    {f.title}
                  </h3>
                  <p className="text-weight-medium solution-feature-detail">
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ── Timeline (optional, rendered in place of steps) ── */}
      {s.timeline && (
        <section className="section_solution-timeline">
          <div
            padding-global=""
            className="section-inner-background no-border-radius background-color-secondary"
          >
            <div
              container="large"
              className="padding-section-large is-top-medium"
            >
              <div className="margin-bottom margin-xlarge">
                <Eyebrow num={nextNum()} label="Timeline" dark />
                <h2 className="solution-section-heading">
                  {s.timeline.heading}
                </h2>
              </div>
              <div className="solution-timeline">
                {s.timeline.phases.map((phase) => (
                  <div key={phase.title} className="solution-timeline-phase">
                    <em>{phase.period}</em>
                    <h3 className="heading-style-h6">{phase.title}</h3>
                    <p className="text-weight-medium">{phase.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Deliverables grid (optional, light zone) ── */}
      {s.deliver && (
        <section className="section_solution-deliver">
          <div
            padding-global=""
            className={`section-inner-background ${s.timeline || s.solution ? "no-border-radius" : "is-top-only"} background-color-secondary`}
          >
            <div
              container="large"
              className="padding-section-large is-top-medium"
            >
              <div className="margin-bottom margin-xlarge">
                {s.deliver.label && (
                  <Eyebrow num={nextNum()} label={s.deliver.label} dark />
                )}
                <h2 className="solution-section-heading">{s.deliver.heading}</h2>
                {s.deliver.lead && (
                  <p className="text-size-medium text-weight-medium solution-terminal-paragraph">
                    {s.deliver.lead}
                  </p>
                )}
              </div>
              {s.deliver.style === "split" ? (
                <div className="solution-pbento">
                  <div className="solution-pbento-products">
                    {s.deliver.items
                    .filter((o) => o.group === "product")
                    .map((o) => (
                      <div
                        key={o.title}
                        className={`solution-pbento-card${o.tag ? " is-brand" : ""}`}
                      >
                        {o.logo ? (
                          <div className="solution-namera-head">
                            <span
                              className={`solution-product-tile${o.logoFramed ? " is-framed" : ""}`}
                            >
                              <img src={o.logo} alt="" loading="lazy" />
                            </span>
                            <h3 className="heading-style-h6">{o.title}</h3>
                            {o.tag && (
                              <span className="solution-namera-by">{o.tag}</span>
                            )}
                          </div>
                        ) : (
                          <h3 className="heading-style-h6">{o.title}</h3>
                        )}
                        <p className="text-weight-medium">{o.description}</p>
                        {o.chips && (
                          <div className="solution-namera-chips">
                            {o.chips.map((c) => (
                              <span key={c} className="solution-fact-chip">
                                {c}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="solution-namera-links">
                          {o.link && (
                            <a
                              href={o.link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="solution-pbento-link"
                            >
                              {o.link.label} <span aria-hidden="true">→</span>
                            </a>
                          )}
                          {o.link2 && (
                            <a
                              href={o.link2.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="solution-pbento-link"
                            >
                              {o.link2.label} <span aria-hidden="true">→</span>
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="solution-pbento-svchead" aria-hidden="true">
                    <span>Tools and services</span>
                  </div>
                  <div className="solution-manifest is-light solution-pbento-manifest">
                    {s.deliver.items
                      .filter((o) => o.group === "service")
                      .map((o, si) => (
                        <div key={o.title} className="solution-manifest-row">
                          <span className="solution-manifest-num" aria-hidden="true">
                            {String(si + 1).padStart(2, "0")}
                          </span>
                          <h3 className="heading-style-h6">{o.title}</h3>
                          <p className="text-weight-medium">{o.description}</p>
                        </div>
                      ))}
                  </div>
                  {s.deliver.items.some((o) => o.group === "bonus") && (
                    <>
                      <div className="solution-pbento-svchead" aria-hidden="true">
                        <span>Bonus</span>
                      </div>
                      {s.deliver.items
                        .filter((o) => o.group === "bonus")
                        .map((o) => (
                          <div
                            key={o.title}
                            className="solution-pbento-card is-bonus"
                          >
                            {o.logo ? (
                              <div className="solution-namera-head">
                                <span
                                  className={`solution-product-tile${o.logoFramed ? " is-framed" : ""}`}
                                >
                                  <img src={o.logo} alt="" loading="lazy" />
                                </span>
                                <h3 className="heading-style-h6">{o.title}</h3>
                                {o.tag && (
                                  <span className="solution-namera-by">{o.tag}</span>
                                )}
                              </div>
                            ) : (
                              <h3 className="heading-style-h6">{o.title}</h3>
                            )}
                            <p className="text-weight-medium">{o.description}</p>
                            {o.chips && (
                              <div className="solution-namera-chips">
                                {o.chips.map((c) => (
                                  <span key={c} className="solution-fact-chip">
                                    {c}
                                  </span>
                                ))}
                              </div>
                            )}
                            <div className="solution-namera-links">
                              {o.link && (
                                <a
                                  href={o.link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="solution-pbento-link"
                                >
                                  {o.link.label} <span aria-hidden="true">→</span>
                                </a>
                              )}
                              {o.link2 && (
                                <a
                                  href={o.link2.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="solution-pbento-link"
                                >
                                  {o.link2.label} <span aria-hidden="true">→</span>
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                    </>
                  )}
                </div>
              ) : s.deliver.style === "tiered" ? (
                <div className="solution-tiered">
                  {s.deliver.items.filter((o) => o.size === "hero").map((o) => (
                    <div key={o.title} className="solution-tiered-hero">
                      <div>
                        <div className="solution-namera-head">
                          <img
                            src="/assets/images/namera-logo.png"
                            alt="Namera logo"
                            className="solution-namera-tile-img"
                            loading="lazy"
                          />
                          <h3 className="solution-tiered-title">{o.title}</h3>
                          {o.tag && (
                            <span className="solution-namera-by">{o.tag}</span>
                          )}
                        </div>
                        <p className="text-weight-medium">{o.description}</p>
                        {o.chips && (
                          <div className="solution-namera-chips">
                            {o.chips.map((c) => (
                              <span key={c} className="solution-fact-chip">
                                {c}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="solution-namera-links">
                          {o.link && (
                            <a
                              href={o.link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="solution-dev-link"
                            >
                              {o.link.label} <span aria-hidden="true">→</span>
                            </a>
                          )}
                          {o.link2 && (
                            <a
                              href={o.link2.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="solution-dev-link"
                            >
                              {o.link2.label} <span aria-hidden="true">→</span>
                            </a>
                          )}
                        </div>
                      </div>
                      {o.visual && (
                        <SolutionBenefitVisual
                          kind={o.visual}
                          name={s.heroName}
                        />
                      )}
                    </div>
                  ))}
                  <div className="solution-tiered-medium">
                    {s.deliver.items.filter((o) => o.size === "medium").map((o) => (
                      <div key={o.title} className="solution-outcome-card">
                        <h3 className="heading-style-h6">{o.title}</h3>
                        <p className="text-weight-medium">{o.description}</p>
                        {o.link && (
                          <a
                            href={o.link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="solution-dev-link"
                          >
                            {o.link.label} <span aria-hidden="true">→</span>
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="solution-tiered-small">
                    {s.deliver.items.filter((o) => !o.size).map((o) => (
                      <div key={o.title} className="solution-outcome-card">
                        <h3 className="heading-style-h6">{o.title}</h3>
                        <p className="text-weight-medium">{o.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : s.deliver.style === "list" ? (
                <div className="solution-manifest is-light">
                  {s.deliver.items.map((o, oi) => (
                    <div key={o.title} className="solution-manifest-row">
                      <span className="solution-manifest-num" aria-hidden="true">
                        {String(oi + 1).padStart(2, "0")}
                      </span>
                      <h3 className="heading-style-h6">{o.title}</h3>
                      <p className="text-weight-medium">{o.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
              <div className={`solution-outcomes-grid is-on-light${s.deliver!.columns === 2 ? " is-two" : ""}`}>
                {s.deliver.items.map((o) => (
                  <div key={o.title} className="solution-outcome-card">
                    <h3 className="heading-style-h6">{o.title}</h3>
                    <p className="text-weight-medium">{o.description}</p>
                  </div>
                ))}
              </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── How it works ── */}
      {s.steps && (
      <section className="section_solution-steps">
        <div
          padding-global=""
          className="section-inner-background no-border-radius background-color-secondary"
        >
          <div
            container="large"
            className="padding-section-large is-top-medium"
          >
            <div className="margin-bottom margin-xlarge">
              <Eyebrow num={nextNum()} label="How it works" dark />
              <h2 className="solution-section-heading">{s.steps.heading}</h2>
            </div>
            {s.steps.style === "cards" ? (
              <div className="solution-steps-cards">
                {s.steps.items.map((step, i) => (
                  <div key={step.title} className="solution-step-card">
                    <em>{String(i + 1).padStart(2, "0")}</em>
                    <h3 className="heading-style-h6">{step.title}</h3>
                    <p className="text-weight-medium solution-step-detail">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
            <div className={`solution-steps${s.steps.code ? " has-code" : ""}`}>
              <ol className="solution-steps-list">
                {s.steps.items.map((step, i) => (
                  <li key={step.title} className="solution-step">
                    <div className="solution-step-rail" aria-hidden="true">
                      <div className="solution-step-num">{i + 1}</div>
                      {i < (s.steps?.items.length ?? 0) - 1 && (
                        <div className="solution-step-line" />
                      )}
                    </div>
                    <div className="solution-step-body">
                      <h3 className="heading-style-h6">{step.title}</h3>
                      <p className="text-weight-medium solution-step-detail">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              {s.steps.code && (
                <div className="solution-code-block">
                  <div className="solution-code-chrome">
                    <span className="solution-code-dot" />
                    <span className="solution-code-dot" />
                    <span className="solution-code-dot" />
                    {s.steps.codeLabel && (
                      <span className="solution-code-label">
                        {s.steps.codeLabel}
                      </span>
                    )}
                  </div>
                  <pre>
                    <code>{s.steps.code}</code>
                  </pre>
                </div>
              )}
            </div>
            )}
          </div>
        </div>
      </section>
      )}

      {/* ── Pricing panel (optional, light zone) ── */}
      {s.pricing && (
        <section className="section_solution-pricing">
          <div
            padding-global=""
            className="section-inner-background no-border-radius background-color-secondary"
          >
            <div
              container="large"
              className="padding-section-large is-top-medium"
            >
              <div className="solution-pricing">
                <div>
                  <Eyebrow num={nextNum()} label={s.pricing.label} />
                  <h2 className="solution-section-heading solution-pricing-heading">
                    {s.pricing.heading}
                  </h2>
                  <p className="text-weight-medium solution-pricing-paragraph">
                    {s.pricing.paragraph}
                  </p>
                </div>
                <div className="solution-pricing-figure">
                  <b>{s.pricing.figure}</b>
                  <span>{s.pricing.figureNote}</span>
                  <div className="solution-pricing-rows">
                    {s.pricing.rows.map((row) => (
                      <div key={row.item} className="solution-pricing-row">
                        <span>{row.item}</span>
                        <b>{row.value}</b>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Why Namespace: reasons + comparison table (dark panel in light zone) ── */}
      {s.whyUs && (
        <section className="section_solution-whyus">
          <div
            padding-global=""
            className={`section-inner-background ${s.desire || s.timeline || s.deliver || s.howTo?.theme === "light" ? "no-border-radius" : "is-top-only"} background-color-secondary`}
          >
            <div
              container="large"
              className="padding-section-large is-top-medium"
            >
              <div className={`solution-whyus${s.whyUs.reasons ? "" : " is-stacked"}`}>
                <div className="solution-whyus-left">
                  <Eyebrow num={nextNum()} label={s.whyUs.label} dark />
                  <h2 className="solution-whyus-heading">{s.whyUs.heading}</h2>
                  {s.whyUs.lead && (
                    <p className="solution-whyus-lead">{s.whyUs.lead}</p>
                  )}
                  {s.whyUs.reasons && (
                  <div className="solution-whyus-reasons">
                    {s.whyUs.reasons.map((r) => (
                      <div key={r.title} className="solution-whyus-reason">
                        <b>{r.title}</b>
                        <p>{r.body}</p>
                      </div>
                    ))}
                  </div>
                  )}
                </div>
                <div className="solution-whyus-right">
                  <p className="solution-whyus-caption">
                    {s.whyUs.tableCaption}
                  </p>
                  <div className="solution-table solution-whyus-table">
                    <div
                      className="solution-table-row is-head"
                      style={{ gridTemplateColumns: `1fr 1.1fr 1.1fr` }}
                    >
                      {s.whyUs.table.columns.map((col, i) => (
                        <div
                          key={i}
                          className={
                            i === s.whyUs!.highlightColumn
                              ? "solution-whyus-hl-head"
                              : undefined
                          }
                        >
                          {col}
                        </div>
                      ))}
                    </div>
                    {s.whyUs.table.rows.map((row, ri) => (
                      <div
                        key={ri}
                        className="solution-table-row"
                        style={{ gridTemplateColumns: `1fr 1.1fr 1.1fr` }}
                      >
                        {row.map((value, ci) => (
                          <div
                            key={ci}
                            data-label={ci > 0 ? s.whyUs!.table.columns[ci] : undefined}
                            className={
                              ci === s.whyUs!.highlightColumn
                                ? "solution-whyus-hl"
                                : undefined
                            }
                          >
                            {value}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {(s.whyUs.stats || s.whyUs.trustedBy) && (
              <div className="solution-whyus-panel">
              {s.whyUs.stats && (
                <div className="solution-whyus-statrow">
                  {s.whyUs.stats.map((stat) => (
                    <div key={stat.label} className="solution-whyus-statcell">
                      <b>{stat.value}</b>
                      <span>{stat.label}</span>
                    </div>
                  ))}
                </div>
              )}
              {s.whyUs.trustedBy && (
                <div className="solution-whyus-trust">
                  <div className="solution-whyus-trustnames">
                    <span>Trusted by</span>
                    {s.whyUs.trustedBy.map((n) => (
                      <b key={n}>{n}</b>
                    ))}
                  </div>
                  {s.whyUs.badge && (
                    <div className="solution-whyus-badge">{s.whyUs.badge}</div>
                  )}
                </div>
              )}
              </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Business case + pricing two-panel (optional, light zone) ── */}
      {s.bizPricing && (
        <section className="section_solution-bizpricing">
          <div
            padding-global=""
            className="section-inner-background no-border-radius background-color-secondary"
          >
            <div
              container="large"
              className="padding-section-large is-top-medium"
            >
              <div className="solution-pcta">
                <div className="solution-pcta-panel is-light">
                  <h2 className="heading-style-h4">
                    {s.bizPricing.caseHeading}
                  </h2>
                  <p className="solution-bizcase-paragraph">
                    {s.bizPricing.caseParagraph}
                  </p>
                  <ul className="solution-bizcase-list">
                    {s.bizPricing.caseBullets.map((bullet) => (
                      <li key={bullet}>
                        <span className="solution-bizcase-dash" aria-hidden="true" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="solution-pcta-panel is-light">
                  <h2 className="heading-style-h4">
                    {s.bizPricing.pricingHeading}
                  </h2>
                  <p className="solution-pcta-paragraph">
                    {s.bizPricing.pricingParagraph}
                  </p>
                  <div className="solution-pcta-facts">
                    {s.bizPricing.facts.map((f) => (
                      <div key={f.label} className="solution-pcta-fact">
                        <b>{f.value}</b>
                        <span>{f.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Pricing + CTA two-panel (optional, light zone) ── */}
      {s.pricingCta && (
        <section className="section_solution-pricing-cta">
          <div
            padding-global=""
            className="section-inner-background no-border-radius background-color-secondary"
          >
            <div
              container="large"
              className="padding-section-large is-top-medium"
            >
              <div className="solution-pcta">
                <div className="solution-pcta-panel">
                  <h2 className="heading-style-h4">{s.pricingCta.pricingHeading}</h2>
                  <p className="solution-pcta-paragraph">
                    {s.pricingCta.pricingParagraph}
                  </p>
                  <div className="solution-pcta-facts">
                    {s.pricingCta.facts.map((f) => (
                      <div key={f.label} className="solution-pcta-fact">
                        <b>{f.value}</b>
                        <span>{f.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="solution-pcta-panel">
                  <h2 className="heading-style-h4">{s.pricingCta.ctaHeading}</h2>
                  <div className="solution-pcta-items">
                    {s.pricingCta.ctaItems.map((item) => (
                      <a
                        key={item.title}
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        className={`solution-pcta-item${item.primary ? " is-primary" : ""}`}
                      >
                        <b>{item.title}</b>
                        <span>{item.description}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Proof ── */}
      {s.proofStyle === "wall" || !s.testimonials ? null : (
      <section className="section_solution-proof">
        <div
          padding-global=""
          className="section-inner-background no-border-radius background-color-secondary"
        >
          <div
            container="large"
            className="padding-section-large is-top-medium"
          >
            <div className="margin-bottom margin-xlarge">
              <Eyebrow num={nextNum()} label="Proof" dark />
              <h2 className="solution-section-heading">
                Teams that already did this
              </h2>
            </div>
            <div className="solution-proof-grid">
              {s.testimonials.map((t) => (
                <TestimonialCard key={t.name} t={t} />
              ))}
            </div>
            {(s.stats?.length ?? 1) > 0 && (
            <div className="solution-statband">
              {(
                s.stats ?? [
                  { value: ">850k", label: "subnames managed in production" },
                  { value: "21M", label: "resolutions served" },
                  { value: "30+", label: "teams building with Namespace" },
                  { value: "100%", label: "uptime in production" },
                ]
              ).map((stat) => (
                <div key={stat.label} className="solution-statband-cell">
                  <b>{stat.value}</b>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
            )}
          </div>
        </div>
      </section>
      )}

      {/* ── FAQ - objection handling + FAQPage schema surface ── */}
      <section className="section_solution-faq">
        <div
          padding-global=""
          className="section-inner-background is-bottom-only background-color-secondary"
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

      {/* ── Wall of Love (when proofStyle is wall) ── */}
      {s.proofStyle === "wall" && <Testimonials />}

      {/* ── Developer callout (optional, light zone) ── */}
      {s.dev && (
        <section className="section_solution-dev">
          <div padding-global="">
            <div
              container="large"
              className="padding-section-large is-top-medium"
            >
              <div className="solution-terminal">
                <div>
                  <Eyebrow num={nextNum()} label={s.dev.label} />
                  <h2 className="solution-section-heading">{s.dev.heading}</h2>
                  <p className="text-size-medium text-weight-medium solution-terminal-paragraph">
                    {s.dev.paragraph}
                  </p>
                  {s.dev.timeline && (
                    <div className="solution-dev-timeline">
                      {s.dev.timeline.map((row) => (
                        <div key={row.item} className="solution-dev-timerow">
                          <span>{row.item}</span>
                          <b>{row.duration}</b>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="solution-dev-links">
                    {s.dev.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="solution-dev-link"
                      >
                        {link.label} <span aria-hidden="true">→</span>
                      </a>
                    ))}
                  </div>
                </div>
                <div className="solution-code-block">
                  <div className="solution-code-chrome">
                    <span className="solution-code-dot" />
                    <span className="solution-code-dot" />
                    <span className="solution-code-dot" />
                    <span className="solution-code-label">
                      {s.dev.windowLabel}
                    </span>
                  </div>
                  <pre>
                    <code>{s.dev.code}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}


      {/* ── Final CTA ── */}
      {s.ctaCards ? (
        <div className="solution-cta-cards">
          <Cta heading={s.ctaCards.heading} subheading={s.ctaCards.subheading} cards={s.ctaCards.cards} />
        </div>
      ) : (
      <section className="section_solution-cta">
        <div padding-global="">
          <div
            container="large"
            className="padding-section-large is-top-medium"
          >
            <div className="solution-final-cta">
              <div className="solution-final-cta-glow" aria-hidden="true" />
              <p className="solution-final-cta-name">{s.finalCta.kicker ?? s.heroName}</p>
              <h2 className="solution-final-cta-heading">
                {s.finalCta.heading}
              </h2>
              <div className="max-width-medium is-37rem">
                <p className="text-size-medium text-weight-medium solution-final-cta-sub">
                  {s.finalCta.paragraph}
                </p>
              </div>
              <div className="button-group is-center">
                <WebflowButton
                  label={s.finalCta.primary.label}
                  href={s.finalCta.primary.href}
                  variant="white"
                  external={s.finalCta.primary.external ?? false}
                />
                <WebflowButton
                  label={s.finalCta.secondary.label}
                  href={s.finalCta.secondary.href}
                  variant="hero-outline"
                  external={s.finalCta.secondary.external ?? false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      )}
    </>
  );
}
