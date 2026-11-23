"use client";
// The Relay scene with an arrow from @alice in the app, up past the app's right edge to a
// brand.eth station above it, then down into the wallet's To field. @alice rides the arrow, passes
// through brand.eth like a ghost and comes out as alice.brand.eth (timeline in passThrough.ts).
// The rest of the Relay loop (resolve, send, payment into the app) runs --shift later in CSS.
import React, { useEffect, useRef } from "react";
import { arrowHead, type Cubic } from "./parts";
import { journeyAt, LIFT, ARRIVE, type Geo, type JourneyFrame, type Pt, type Track } from "./passThrough";
import { RelayScene } from "./RelayScene";

// Canvas px in the shared Relay layout (wallet top-left, app lower-right, both at 0.86).
// The arrow is built from ellipse quarters (control points at K of each radius), so every turn is one
// even sweep rather than tight corners joined by straight runs.
const K = 0.5523;
const LEAD = "M325 207L366 207"; // @alice's centre → its right edge
// Flat out of @alice, then one half-ellipse (centre 452,114.5; 66 × 92.5) out past the app's right
// edge, clear of the app's avatar, and back in over the station onto the runway.
const UP_LOW: Cubic = [452, 207, 452 + 66 * K, 207, 518, 114.5 + 92.5 * K, 518, 114.5];
const UP_HIGH: Cubic = [518, 114.5, 518, 114.5 - 92.5 * K, 452 + 66 * K, 22, 452, 22];
// A quarter-ellipse (centre 372,104; 153 × 82) out from under the station, clear of its sub-label,
// ending straight down into the To field's right end.
const DOWN: Cubic = [372, 22, 372 - 153 * K, 22, 219, 104 - 82 * K, 219, 104];
const DROP = "C219 118 150 121 86.5 120.5"; // eases along the field to the typed name's centre (travel only, not drawn)
const HEAD = arrowHead(DOWN);
const START: Pt = { x: 366, y: 207 };

const c = (k: Cubic) => `C${k[2].toFixed(1)} ${k[3].toFixed(1)} ${k[4].toFixed(1)} ${k[5].toFixed(1)} ${k[6]} ${k[7]}`;
const CLIMB = `L${UP_LOW[0]} ${UP_LOW[1]}${c(UP_LOW)}${c(UP_HIGH)}L372 22${c(DOWN)}`;
const ARROW = `M${START.x} ${START.y}${CLIMB}`;
const ROUTE = `${LEAD}${CLIMB}${DROP}`;

const LOOP_MS = 10000;
const SAMPLE_MS = 10; // keyframe spacing; the journey is sampled, not tweened, so pace and paths stay exact

function track(d: string): Track {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", d);
  const total = path.getTotalLength();
  const step = 0.5;
  const pts: Pt[] = [];
  for (let s = 0; s <= total; s += step) {
    const p = path.getPointAtLength(s);
    pts.push({ x: p.x, y: p.y });
  }
  const at = (dist: number): Pt => {
    const i = Math.max(0, Math.min(pts.length - 1.001, dist / step));
    const a = pts[Math.floor(i)];
    const b = pts[Math.min(pts.length - 1, Math.floor(i) + 1)];
    const u = i - Math.floor(i);
    return { x: a.x + (b.x - a.x) * u, y: a.y + (b.y - a.y) * u };
  };
  const find = (from: number, test: (p: Pt) => boolean) => {
    for (let s = from; s < total; s += step) if (test(at(s))) return s;
    return total;
  };
  return { at, total, find };
}

type Parts = {
  src: HTMLElement;
  station: HTMLElement;
  glow: HTMLElement;
  aRoot: HTMLElement;
  aIn: HTMLElement;
  aAv: HTMLElement;
  aAt: HTMLElement;
  aAlice: HTMLElement;
  aShadow: HTMLElement;
  bRoot: HTMLElement;
  bIn: HTMLElement;
  bAlice: HTMLElement;
  bShadow: HTMLElement;
};

/** Measured from the live layout: the pills change width with the font and the mobile breakpoint. */
function measure(p: Parts): Geo {
  // offsetLeft/offsetWidth are layout px, unaffected by the stage's scale.
  const stationX = p.station.offsetLeft;
  const pillW = p.station.offsetWidth;
  const wa = p.aIn.offsetWidth;
  const wb = p.bIn.offsetWidth;
  const aAliceL = p.aAlice.offsetLeft;
  const route = track(ROUTE);
  return {
    route,
    dHit: route.find(0, (pt) => pt.y < 40 && pt.x <= stationX + pillW / 2 + wa / 2),
    pillL: stationX - pillW / 2,
    wb,
    delta: p.bAlice.offsetLeft - wb / 2 - (aAliceL - wa / 2),
    foldClip: aAliceL - 9,
  };
}

const n = (v: number) => v.toFixed(2);

/** One keyframe track per element, sampled from the journey across the whole loop. */
function keyframes(g: Geo): [keyof Parts, Keyframe[]][] {
  const tracks: Record<string, Keyframe[]> = {};
  const push = (k: keyof Parts, offset: number, kf: Keyframe) => (tracks[k] ??= []).push({ offset, ...kf });
  const add = (t: number, f: JourneyFrame) => {
    const offset = t / LOOP_MS;
    push("src", offset, { opacity: f.src });
    push("aRoot", offset, { opacity: f.a.o, transform: `translate(${n(f.a.x)}px, ${n(f.a.y)}px)` });
    push("aIn", offset, { transform: `scale(${f.a.s.toFixed(4)})`, clipPath: `inset(0 0 0 ${n(f.a.fold * g.foldClip)}px round 13px)` });
    push("aAv", offset, { opacity: 1 - f.a.fold, transform: `scale(${(1 - 0.6 * f.a.fold).toFixed(4)})` });
    push("aAt", offset, { opacity: Math.max(0, 1 - f.a.fold * 1.6) });
    push("aShadow", offset, { opacity: f.a.shadow });
    push("bRoot", offset, { opacity: f.b.o, transform: `translate(${n(f.b.x)}px, ${n(f.b.y)}px)` });
    push("bIn", offset, { transform: `scale(${f.b.s.toFixed(4)})` });
    push("bShadow", offset, { opacity: f.b.shadow });
    push("glow", offset, { opacity: f.glow });
  };
  // Everything rests outside [LIFT, ARRIVE + 500]; sample densely only where it moves.
  add(0, journeyAt(0, g));
  for (let t = LIFT - SAMPLE_MS; t <= ARRIVE + 500; t += SAMPLE_MS) add(t, journeyAt(t, g));
  add(LOOP_MS, journeyAt(LOOP_MS, g));
  return Object.entries(tracks) as [keyof Parts, Keyframe[]][];
}

/** Drives the journey with WAAPI on the CSS loop's clock. The whole stage pauses while it is off
 *  screen or the tab is hidden; under reduced motion nothing travels and CSS shows one still frame. */
function useJourney(root: React.RefObject<HTMLSpanElement | null>) {
  useEffect(() => {
    const layer = root.current;
    const stage = layer?.closest<HTMLElement>(".uuh-stage");
    if (!layer || !stage || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const q = (sel: string) => stage.querySelector<HTMLElement>(sel)!;
    const parts: Parts = {
      src: q(".uuh-me-src"),
      station: q(".uuh-fly-station"),
      glow: q(".uuh-fly-glow"),
      aRoot: q(".uuh-fly-root.is-a"),
      aIn: q(".uuh-fly-a"),
      aAv: q(".uuh-fly-av"),
      aAt: q(".uuh-fly-at"),
      aAlice: q(".uuh-fly-a-alice"),
      aShadow: q(".uuh-fly-a .uuh-fly-shadow"),
      bRoot: q(".uuh-fly-root.is-b"),
      bIn: q(".uuh-fly-b"),
      bAlice: q(".uuh-fly-b-alice"),
      bShadow: q(".uuh-fly-b .uuh-fly-shadow"),
    };

    const loops = () => stage.getAnimations({ subtree: true }).filter((a) => a.effect?.getTiming().iterations === Infinity);
    let inView = true;
    const sync = () => {
      const run = inView && !document.hidden;
      for (const a of loops()) (run ? a.play() : a.pause());
    };

    let journey: Animation[] = [];
    let cancelled = false;
    // Measured after the mono font loads, and again when the breakpoint resizes the pills.
    const build = () => {
      if (cancelled) return;
      for (const a of journey) a.cancel();
      // Borrow the clock of a CSS loop that started on mount: same 10s period, and its currentTime
      // counts from mount whatever its delay, so the journey lines up with the shifted Relay beats.
      const clock = q(".uuh-r-res").getAnimations()[0];
      const t0 = getComputedStyle(stage).getPropertyValue("--t0").trim();
      const delay = (parseFloat(t0) || 0) * (t0.endsWith("ms") ? 1 : 1000);
      const g = measure(parts);
      journey = keyframes(g).map(([k, frames]) => {
        const a = parts[k].animate(frames, { duration: LOOP_MS, iterations: Infinity, delay, fill: "both", easing: "linear" });
        if (clock?.currentTime != null) a.currentTime = clock.currentTime;
        return a;
      });
      sync();
    };
    const mq = window.matchMedia("(max-width: 519px)");
    document.fonts.ready.then(build);
    mq.addEventListener("change", build);

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    io.observe(stage);
    document.addEventListener("visibilitychange", sync);
    return () => {
      cancelled = true;
      io.disconnect();
      mq.removeEventListener("change", build);
      document.removeEventListener("visibilitychange", sync);
      for (const a of journey) a.cancel();
    };
  }, [root]);
}

/** t0 delays the first beat so the hero copy can rise in first. */
export function FlyoverAnimation({ t0 = "1s" }: { t0?: string }) {
  const layer = useRef<HTMLSpanElement>(null);
  useJourney(layer);
  return (
    <RelayScene
      t0={t0}
      label="@alice in your app becomes alice.brand.eth in any wallet. An arrow runs from @alice on the lower phone, running your app, up to brand.eth, your app's ENS name, and down into the To field of a wallet on the upper phone. @alice rides the arrow, passes through brand.eth and comes out as alice.brand.eth, then lands in the To field. It resolves to 0x8F3c…a91E, 50 USDC is sent, the app's Dynamic Island shows Received +50 USDC and @alice's balance rolls to $50.00."
    >
      <svg className="uuh-curves" viewBox="0 0 500 600" fill="none" aria-hidden="true">
        <path className="uuh-fly-arc uuh-fly-arc-glow uuh-fly-once uuh-a" d={ARROW} pathLength={1} />
        <path className="uuh-fly-arc uuh-fly-arc-line uuh-fly-once uuh-a" d={ARROW} pathLength={1} />
        <path className="uuh-fly-head uuh-fly-once uuh-a" d={HEAD.d} style={{ transformOrigin: HEAD.origin }} />
        <circle className="uuh-fly-dot uuh-fly-once uuh-a" cx={START.x} cy={START.y} r={3.5} style={{ transformOrigin: `${START.x}px ${START.y}px` }} />
      </svg>
      <span className="uuh-fly-station uuh-fly-once uuh-a">
        <code className="uuh-fly-station-pill">
          brand.eth
          <span className="uuh-fly-glow" />
        </code>
      </span>
      <small className="uuh-fly-station-sub uuh-fly-once uuh-a">your app’s ENS name</small>
      <span ref={layer} className="uuh-fly-layer" aria-hidden="true">
        <span className="uuh-fly-root is-a">
          <span className="uuh-me uuh-fly-a">
            <span className="uuh-fly-shadow" />
            <span className="uuh-avatar uuh-fly-av">A</span>
            <span>
              <span className="uuh-fly-at">@</span>
              <span className="uuh-fly-a-alice">alice</span>
            </span>
          </span>
        </span>
        <span className="uuh-fly-root is-b">
          <span className="uuh-fly-b">
            <span className="uuh-fly-shadow" />
            <span className="uuh-name">
              <span className="uuh-fly-b-alice">alice</span>
              <i>.brand.eth</i>
            </span>
          </span>
        </span>
      </span>
    </RelayScene>
  );
}
