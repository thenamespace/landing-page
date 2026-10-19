"use client";

import { NameAnatomy, Note, usePickedTld } from "@/components/landing/NameBlocks";

/*
 * The annotated name with a clickable ending: starts on .eth, a hand-drawn "click me!" invites a click,
 * each click swaps to another domain, and a marked-up note shows it still works like .eth.
 */


/* How the ending changes, per design: each one gets the transition that suits it (keyed so it replays) */
function Swap({ tld, index, fx }: { tld: string; index: number; fx: "wipe" }) {
  return (
    <span className={`try-swap is-${fx}`} key={index}>
      {tld}
    </span>
  );
}

/* ---------- Sketch: a hand-drawn note and circle, like someone marked up the name ---------- */

export function TrySketch() {
  const picked = usePickedTld();
  const tried = picked.clicks > 0;
  return (
    <NameAnatomy
      className="is-try"
      ending={
        <button
          type="button"
          className={`nb-part is-tld try-sketch${tried ? " is-tried" : ""}`}
          onClick={picked.next}
          aria-label={`Ending: .${picked.tld}. Change it to another domain`}
        >
          <span aria-hidden="true">
            {/* .eth keeps its shine and sparkle (no scramble); other domains ink-wipe in on a click */}
            {picked.tld === "eth" ? (
              <span className="nb-lux is-loop">
                <span className="nb-decode">eth</span>
                <span className="nb-sparkle is-a" />
                <span className="nb-sparkle is-b" />
              </span>
            ) : (
              <Swap tld={picked.tld} index={picked.index} fx="wipe" />
            )}
          </span>
          {/* hand-drawn loop around the ending; redraws on every change */}
          <svg className="try-sketch-ring" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true" key={picked.index}>
            <path d="M18 58 C 14 22, 70 8, 112 10 C 160 12, 196 30, 190 58 C 184 86, 130 96, 88 94 C 40 92, 6 78, 22 46 C 30 30, 60 18, 96 16" />
          </svg>
          <span className="try-sketch-note" aria-hidden="true">
            <span className="try-sketch-text" key={picked.index}>
              {/* the note changes as people keep clicking: explain once, then keep confirming */}
              {!tried ? (
                "click me!"
              ) : picked.clicks === 1 ? (
                <>
                  ENS is not
                  <br />
                  just .eth...
                </>
              ) : picked.clicks === 2 ? (
                <>
                  it works with
                  <br />
                  any DNS TLD...
                </>
              ) : picked.clicks === 3 ? (
                <>
                  guess what?
                  <br />
                  this one works too.
                </>
              ) : picked.clicks === 4 ? (
                "yes, this one too."
              ) : (
                "and this one..."
              )}
              {/* invites the next click; fades in a beat after each change */}
              {tried && picked.clicks < 5 && (
                <span className="try-sketch-again">{picked.clicks < 3 ? "(click again)" : "(keep going)"}</span>
              )}
            </span>
            <svg viewBox="0 0 60 50" className="try-sketch-arrow">
              <path d="M54 6 C 40 8, 22 16, 12 40 M4 30 L12 42 L22 34" />
            </svg>
          </span>
          <span aria-hidden="true">
            <Note n="03">Any domain</Note>
          </span>
        </button>
      }
    />
  );
}
