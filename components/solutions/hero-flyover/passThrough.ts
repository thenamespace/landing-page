// The @happy → happy.brand.eth journey as a pure timeline: t (ms into the 10s loop) → what every
// moving part looks like. FlyoverAnimation samples it into WAAPI keyframes.
//
// @happy rides the arrow up to brand.eth, turns to a ghost as it touches, drifts through slowest
// in the middle, sheds its @ and avatar inside, comes out as happy.brand.eth (solid again as it
// leaves the station) and rides down into the To field. No bumps, rings or springs: the moment is
// carried by opacity and pace alone (bump-and-hop exits were tried and read as busy and jittery).

export type Pt = { x: number; y: number };
export type Track = { at: (d: number) => Pt; total: number; find: (from: number, test: (p: Pt) => boolean) => number };

/** Live layout, in canvas px. */
export type Geo = {
  route: Track; // @happy's centre → up the arrow → under the station → down to the typed name's centre
  dHit: number; // distance along the route where @happy's front edge meets brand.eth's right end
  pillL: number; // brand.eth's left end
  wb: number; // happy.brand.eth pill width
  delta: number; // @happy centre − happy.brand.eth centre when their "happy"s line up
  foldClip: number; // px trimmed off @happy's left so only "happy" is left
};

export type JourneyFrame = {
  src: number; // @happy in the app
  a: { x: number; y: number; s: number; o: number; shadow: number; fold: number }; // the travelling @happy
  b: { x: number; y: number; s: number; o: number; shadow: number }; // happy.brand.eth
  glow: number; // brand.eth's outline while something is inside it
};

// Beats, ms into the loop. ARRIVE lines up with the typed name appearing in the To field (20% of
// the loop plus --shift in hero-flyover.css).
export const LIFT = 500;
const ENTER = 1350;
const INSIDE = 1000;
const CLEAR = ENTER + INSIDE;
export const ARRIVE = CLEAR + 850; // 3200
const GHOST = 0.35;
const V_IN = 0.45; // px/ms going in…
const V_OUT = 0.5; // …and coming out. The curve between them sags: slowest mid-station.

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
const lerp = (a: number, b: number, u: number) => a + (b - a) * u;

function bezier(x1: number, y1: number, x2: number, y2: number) {
  const bx = (t: number) => 3 * x1 * t * (1 - t) ** 2 + 3 * x2 * t * t * (1 - t) + t ** 3;
  const by = (t: number) => 3 * y1 * t * (1 - t) ** 2 + 3 * y2 * t * t * (1 - t) + t ** 3;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 24; i++) {
      const mid = (lo + hi) / 2;
      if (bx(mid) < x) lo = mid;
      else hi = mid;
    }
    return by((lo + hi) / 2);
  };
}
const easeOut = bezier(0.23, 1, 0.32, 1);
const inOut = bezier(0.65, 0, 0.35, 1);

/** Cubic Hermite: p0 → p1 over [t0, t1], leaving at velocity m0 and arriving at m1 (px/ms). */
function hermite(t: number, t0: number, t1: number, p0: number, p1: number, m0: number, m1: number) {
  const h = t1 - t0;
  const u = clamp01((t - t0) / h);
  const u2 = u * u;
  const u3 = u2 * u;
  return (2 * u3 - 3 * u2 + 1) * p0 + (u3 - 2 * u2 + u) * h * m0 + (-2 * u3 + 3 * u2) * p1 + (u3 - u2) * h * m1;
}

/** Route y at a given x, from brand.eth onward (the runway and the way down). */
const yAt = (g: Geo, x: number) => g.route.at(g.route.find(g.dHit, (p) => p.x <= x)).y;

/** @happy (a) and happy.brand.eth (b) move as one rigid piece through the station, then b carries on down. */
function positions(t: number, g: Geo): { a: Pt; b: Pt; out: boolean } {
  const xBClear = g.pillL - g.wb / 2; // b's right end has left the station
  if (t < ENTER) {
    const a = g.route.at(hermite(t, LIFT, ENTER, 0, g.dHit, 0, V_IN));
    return { a, b: { x: a.x - g.delta, y: a.y }, out: false };
  }
  if (t < CLEAR) {
    const ax = hermite(t, ENTER, CLEAR, g.route.at(g.dHit).x, xBClear + g.delta, -V_IN, -V_OUT);
    const bx = ax - g.delta;
    return { a: { x: ax, y: yAt(g, ax) }, b: { x: bx, y: yAt(g, bx) }, out: false };
  }
  const d0 = g.route.find(g.dHit, (p) => p.x <= xBClear);
  const b = g.route.at(hermite(t, CLEAR, ARRIVE, d0, g.route.total, V_OUT, 0));
  return { a: { x: b.x + g.delta, y: b.y }, b, out: true };
}

export function journeyAt(t: number, g: Geo): JourneyFrame {
  const { a, b, out } = positions(t, g);
  const ghostIn = easeOut(seg(t, ENTER - 40, ENTER + 240));
  // Halfway through, the ghost of @happy becomes the ghost of happy.brand.eth: a slow cross-dissolve.
  const swap = inOut(seg(t, ENTER + INSIDE * 0.35, ENTER + INSIDE * 0.6));
  // happy.brand.eth turns solid as its body leaves the station.
  const solid = out ? 1 : easeOut(clamp01((g.pillL - (b.x - g.wb / 2)) / g.wb));
  return {
    src: t < LIFT ? 1 : seg(t, ARRIVE + 150, ARRIVE + 450),
    a: {
      ...a,
      s: 0.86 + 0.14 * easeOut(seg(t, LIFT, LIFT + 380)), // from the app's size to full
      o: t < LIFT ? 0 : lerp(1, GHOST, ghostIn) * (1 - swap),
      shadow: 1 - seg(t, ENTER - 220, ENTER), // sinks flat just before it touches
      fold: inOut(seg(t, ENTER + INSIDE * 0.1, ENTER + INSIDE * 0.4)), // sheds @ and avatar inside
    },
    b: {
      ...b,
      s: 1 - 0.17 * inOut(seg(t, CLEAR, ARRIVE)), // down to the field's text size
      // Hands over to the typed name the moment it lands.
      o: lerp(GHOST, 1, solid) * swap * (1 - seg(t, ARRIVE, ARRIVE + 65)),
      shadow: solid,
    },
    glow: seg(t, ENTER, ENTER + 200) * (1 - seg(t, CLEAR, CLEAR + 260)),
  };
}
