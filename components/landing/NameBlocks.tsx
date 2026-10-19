"use client";

import { useEffect, useState } from "react";
import { Caveat } from "next/font/google";

/*
 * The annotated name (user . brand . domain) that closes Products: types user names, cycles endings.
 * Braces under the parts are fixed lengths hanging off the brand, so nothing slides while the name changes.
 */

/* Handwritten user names */
const hand = Caveat({ weight: "700", subsets: ["latin"], variable: "--nb-hand" });

const USERS = ["alice", "nick", "mely", "chris", "kenji", "arti", "maxi", "sofia"];

/* Held longer than a user name takes to type and delete (~3s), so the two cycles don't sync up */
const TLD_HOLD = 4800;
/* .eth shows three times per cycle, spread out, and stays a second longer than the rest */
const TLDS = ["eth", "com", "id", "me", "eth", "ai", "xyz", "eth", "dev", "io", "app", "net", "org"];
const holdFor = (tld: string) => (tld === "eth" ? TLD_HOLD + 1000 : TLD_HOLD);

const GLYPHS = "abcdefghijklmnopqrstuvwxyz0123456789";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Types out a user name, holds it, deletes it, moves to the next. Static first name under reduced motion. */
function useTypedName() {
  const [text, setText] = useState(USERS[0]);
  useEffect(() => {
    if (reducedMotion()) return;
    let i = 0;
    let len = USERS[0].length;
    let deleting = false;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (!deleting && len === USERS[i].length) {
        deleting = true;
        t = setTimeout(tick, 1800);
        return;
      }
      if (deleting && len === 0) {
        deleting = false;
        i = (i + 1) % USERS.length;
        t = setTimeout(tick, 250);
        return;
      }
      len += deleting ? -1 : 1;
      setText(USERS[i].slice(0, len));
      t = setTimeout(tick, deleting ? 55 : 110);
    };
    t = setTimeout(tick, 1800);
    return () => clearTimeout(t);
  }, []);
  return text;
}

/* Cycles the endings, holding each for holdFor(). Static first ending under reduced motion. */
function useTld() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reducedMotion()) return;
    let n = 0;
    let t: ReturnType<typeof setTimeout>;
    const next = () => {
      n = (n + 1) % TLDS.length;
      setI(n);
      t = setTimeout(next, holdFor(TLDS[n]));
    };
    t = setTimeout(next, holdFor(TLDS[0]));
    return () => clearTimeout(t);
  }, []);
  return { tld: TLDS[i], index: i };
}

/* Scrambles through random characters, locking in the real letters left to right */
function Decode({ text }: { text: string }) {
  const [shown, setShown] = useState(text);
  useEffect(() => {
    if (reducedMotion()) return setShown(text);
    let frame = 0;
    const total = 16;
    const id = setInterval(() => {
      frame++;
      const locked = Math.floor((frame / total) * text.length);
      setShown(
        text
          .split("")
          .map((c, n) => (n < locked ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(""),
      );
      if (frame >= total) {
        clearInterval(id);
        setShown(text);
      }
    }, 45);
    return () => clearInterval(id);
  }, [text]);
  return <span className="nb-decode">{shown}</span>;
}

/* Horizontal curly brace that stretches to its container: fixed curls and point, flexible straight runs */
function Brace() {
  return (
    <span className="nb-brace" aria-hidden="true">
      <svg width="10" height="12" viewBox="0 0 10 12">
        <path d="M1 0 C1 4 3 6 7 6 H10" />
      </svg>
      <span className="nb-brace-run" />
      <svg width="20" height="12" viewBox="0 0 20 12">
        <path d="M0 6 H4 C8 6 10 8 10 12 C10 8 12 6 16 6 H20" />
      </svg>
      <span className="nb-brace-run" />
      <svg width="10" height="12" viewBox="0 0 10 12">
        <path d="M0 6 H3 C7 6 9 4 9 0" />
      </svg>
    </span>
  );
}

/* Numbered label under one part, with its brace */
export function Note({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <span className="nb-note">
      <Brace />
      <span className="nb-note-n">{n}</span>
      <span className="nb-note-text">{children}</span>
    </span>
  );
}

/* Endings the interactive version can switch to (everything but .eth) */
export const OTHER_TLDS = Array.from(new Set(TLDS.filter((t) => t !== "eth")));

/* Interactive ending: starts on .eth, and each click swaps to a random other domain */
export function usePickedTld() {
  const [tld, setTld] = useState("eth");
  const [clicks, setClicks] = useState(0);
  const pick = (t: string) => {
    setTld(t);
    setClicks((c) => c + 1);
  };
  /* random other domain, never the current one; returns it so callers can animate towards it */
  const next = () => {
    const pool = OTHER_TLDS.filter((t) => t !== tld);
    const t = pool[Math.floor(Math.random() * pool.length)];
    pick(t);
    return t;
  };
  return { tld, index: clicks, clicks, next, pick };
}

export function TldEnding({ tld, index }: { tld: string; index: number }) {
  return tld === "eth" ? (
    /* .eth gets a slow light sweep and a sparkle once decoded; keyed so it replays every time */
    <span className="nb-lux" key={index}>
      <Decode text={tld} />
      <span className="nb-sparkle is-a" />
      <span className="nb-sparkle is-b" />
    </span>
  ) : (
    <Decode text={tld} key={index} />
  );
}

/* The annotated name. Pass ending to replace the cycling ending (the homepage uses the clickable sketch in NameTry). */
export function NameAnatomy({
  ending,
  after,
  className,
}: {
  /* Replaces the ending column (must render .nb-part.is-tld with a Note inside) */
  ending?: React.ReactNode;
  /* Rendered after the name, inside the graphic */
  after?: React.ReactNode;
  className?: string;
}) {
  const typed = useTypedName();
  const { tld, index } = useTld();
  return (
    <div className={`nb-name ${hand.variable}${className ? ` ${className}` : ""}`}>
      <p className="nb-name-title">
        <span>Anatomy of a web3 username</span>
        <span className="nb-name-badge">Works in 1,000+ apps</span>
      </p>
      {/* Read once as a whole; the animated parts below are decorative */}
      <span className="nb-sr">Example: alice.yourapp.eth. Your users, your brand, any domain.</span>
      {/* Three columns: the brand is pinned to the centre, so only the outer parts grow and shrink */}
      <span className="nb-side is-left" aria-hidden="true">
        <span className="nb-part is-user">
          {/* zero-width space keeps the baseline when the name is fully deleted */}
          <span className="nb-user">{typed || "​"}</span>
          <span className="nb-caret" />
          <Note n="01">Your users</Note>
        </span>
      </span>
      <span className="nb-center" aria-hidden="true">
        <span className="nb-dot">.</span>
        <span className="nb-part is-brand">
          yourapp
          <Note n="02">Your brand</Note>
        </span>
        <span className="nb-dot">.</span>
      </span>
      {ending ? (
        <span className="nb-side">{ending}</span>
      ) : (
        <span className="nb-side" aria-hidden="true">
          <span className="nb-part is-tld">
            <TldEnding tld={tld} index={index} />
            <Note n="03">Any domain</Note>
          </span>
        </span>
      )}
      {after}
    </div>
  );
}
