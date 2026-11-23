"use client";
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

/* -------------------------------------------------------------------------
 * The life of a Universal Usernames lookup, as a canvas that plays itself.
 *
 * It draws the real CCIP-Read (EIP-3668) path, with the wallet as the hub:
 *   1. wallet → ENS: resolve the name. The wildcard resolver (ENSIP-10) has
 *      no record, so it reverts with OffchainLookup, pointing at the gateway.
 *   2. wallet → Namespace gateway: the wallet calls the gateway itself.
 *      ENS never talks to the gateway.
 *   3. gateway → your API: GET {base}/{username}; 404 for unknown usernames.
 *   4. gateway signs the answer and returns it to the wallet.
 *   5. wallet → ENS again: the resolver's callback checks the signature and
 *      returns the address.
 * ---------------------------------------------------------------------- */

type CardState = "idle" | "active" | "done" | "failed" | "skipped";
type Cell = "idle" | "active" | "pass" | "fail" | "skipped";

const WALLETS = ["MetaMask", "Rainbow", "Coinbase"] as const;
type Wallet = (typeof WALLETS)[number];

const COINS = ["ETH", "Base", "BTC", "SOL"] as const;
type Coin = (typeof COINS)[number];

const USERNAMES = ["happy", "bob", "zoe"] as const;
type Username = (typeof USERNAMES)[number];

/** Your database. zoe is not in it. */
const USERS: Partial<Record<Username, Record<Coin, string>>> = {
  happy: { ETH: "0x8F3c…a91E", Base: "0x8F3c…a91E", BTC: "bc1q…7v2k", SOL: "7xKX…gAsU" },
  bob: { ETH: "0x91C2…a07e", Base: "0x91C2…a07e", BTC: "bc1q…m3xf", SOL: "5bRt…Lq9w" },
};

const PARENT = "brand.eth";

const WALLET_STEPS = [
  { label: "Ask ENS", note: "resolve the name" },
  { label: "Call the gateway", note: "where ENS pointed it" },
  { label: "Verify through ENS", note: "checks the gateway’s signature" },
] as const;
const GATEWAY_STEPS = [
  { label: "Receive", note: "the wallet’s CCIP-Read call" },
  { label: "Find your endpoint", note: "saved in the Namespace App" },
  { label: "Call your API", note: "read-only, over HTTPS" },
  { label: "Sign the answer", note: "no key for you to hold" },
] as const;
const API_CHECKS = ["Request", "Username", "Address", "Profile", "Response"] as const;

/* ---- the script --------------------------------------------------------- */

type Actor = "wallet" | "ens" | "gateway" | "api";
type WireId = "askEns" | "ensReply" | "callGateway" | "gatewayReply" | "callApi" | "apiReply";
type CellRef = `${"wallet" | "gateway" | "api"}:${number}`;
type Beat = {
  actor: Actor;
  wire?: WireId;
  label?: string;
  danger?: boolean;
  cells?: CellRef[];
  fail?: boolean;
  status: string;
};

function script(wallet: Wallet, username: Username, address: string | undefined): Beat[] {
  const name = `${username}.${PARENT}`;
  const head: Beat[] = [
    { actor: "wallet", wire: "askEns", label: "resolve", cells: ["wallet:0"], status: `${wallet} asks ENS for ${name}…` },
    { actor: "ens", wire: "ensReply", label: "OffchainLookup", status: `ENS doesn’t store ${username}. Your resolver points ${wallet} to the gateway…` },
    { actor: "wallet", wire: "callGateway", label: "CCIP-Read", cells: ["wallet:1", "gateway:0"], status: `${wallet} calls the Namespace gateway…` },
    { actor: "gateway", cells: ["gateway:1"], status: "The gateway finds the endpoint you saved…" },
    { actor: "gateway", wire: "callApi", label: `GET /${username}`, cells: ["gateway:2", "api:0"], status: "The gateway calls your API…" },
  ];
  if (!address) {
    return [
      ...head,
      { actor: "api", cells: ["api:1"], fail: true, status: `No user called ${username} in your database…` },
      { actor: "api", wire: "apiReply", label: "404", danger: true, cells: ["api:4"], fail: true, status: "Your API returns 404…" },
      { actor: "gateway", wire: "gatewayReply", label: "not found", danger: true, status: `The gateway tells ${wallet} there’s no such name…` },
    ];
  }
  return [
    ...head,
    { actor: "api", cells: ["api:1"], status: `Your API finds ${username}…` },
    { actor: "api", cells: ["api:2"], status: "…and the address…" },
    { actor: "api", cells: ["api:3"], status: "…and the profile…" },
    { actor: "api", wire: "apiReply", label: "200 OK", cells: ["api:4"], status: "Your API answers…" },
    { actor: "gateway", cells: ["gateway:3"], status: "The gateway signs the answer…" },
    { actor: "gateway", wire: "gatewayReply", label: "signed answer", status: `The signed answer goes back to ${wallet}…` },
    { actor: "wallet", wire: "askEns", label: "verify", cells: ["wallet:2"], status: `${wallet} checks the signature through your resolver…` },
    { actor: "ens", wire: "ensReply", label: address, status: "Signature valid…" },
  ];
}

/* Wire beats get time for the pulse to travel (0.76s); the rest are quicker ticks. */
const WIRE_MS = 780;
const TICK_MS = 540;
const SETTLE_MS = 600;

/* ---- icons -------------------------------------------------------------- */

type G = { className?: string };
const svg = (d: React.ReactNode) =>
  function Glyph({ className }: G) {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        {d}
      </svg>
    );
  };
const IconSliders = svg(<><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></>);
const IconWallet = svg(<><rect x="3" y="6" width="18" height="13" rx="3" /><path d="M3 10h18M16 14.5h1.5" /></>);
const IconEns = svg(<><path d="M12 3 5 13l7 8 7-8-7-10Z" /><path d="M5 13h14" /></>);
const IconGateway = svg(<><rect x="4" y="4" width="16" height="6" rx="2" /><rect x="4" y="14" width="16" height="6" rx="2" /><path d="M8 7h.01M8 17h.01" /></>);
const IconApi = svg(<><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" /></>);
const IconCheck = svg(<path d="m5 12.5 4.5 4.5L19 7.5" />);
const IconX = svg(<><circle cx="12" cy="12" r="9" /><path d="m9 9 6 6M15 9l-6 6" /></>);
const IconPlay = svg(<path d="M7 5.5v13l11-6.5-11-6.5Z" />);
const IconSpin = svg(<path d="M12 3a9 9 0 1 0 9 9" />);

/* ---- card parts --------------------------------------------------------- */

const shell = (state: CardState, extra = "") => `ll-card is-${state}${extra ? ` ${extra}` : ""}`;

function Head({
  title,
  note,
  state,
  Glyph,
  badge,
}: {
  title: string;
  note: string;
  state: CardState;
  Glyph: (p: G) => React.ReactElement;
  badge?: string;
}) {
  return (
    <div className="ll-head">
      <span className={`ll-mark is-${state}`}>
        <Glyph className="ll-mark-icon" />
      </span>
      <span className="ll-head-text">
        <span className="ll-title">{title}</span>
        <span className="ll-note">{note}</span>
      </span>
      {badge && <span className="ll-badge">{badge}</span>}
    </div>
  );
}

function Pip({ state }: { state: Cell }) {
  if (state === "active") return <IconSpin className="ll-pip is-spin" />;
  if (state === "pass") return <IconCheck className="ll-pip is-pass" />;
  if (state === "fail") return <IconX className="ll-pip is-fail" />;
  return <span className="ll-pip-dot" aria-hidden="true" />;
}

function Row({ label, value, tone }: { label: string; value: React.ReactNode; tone?: "good" | "bad" }) {
  return (
    <div className="ll-row">
      <span className="ll-row-label">{label}</span>
      <span className={`ll-row-value${tone ? ` is-${tone}` : ""}`}>{value}</span>
    </div>
  );
}

function Chips<T extends string>({ options, value, onChange }: { options: readonly T[]; value: T; onChange: (v: T) => void }) {
  return (
    <span className="ll-chips">
      {options.map((o) => (
        <button key={o} type="button" className={`ll-chip${o === value ? " is-on" : ""}`} aria-pressed={o === value} onClick={() => onChange(o)}>
          {o}
        </button>
      ))}
    </span>
  );
}

function Steps({ steps, cells }: { steps: readonly { label: string; note: string }[]; cells: Cell[] }) {
  return (
    <>
      {steps.map((s, i) => (
        <div key={s.label} className={`ll-step is-${cells[i]}`}>
          <Pip state={cells[i]} />
          <span className="ll-step-text">
            <span className="ll-step-label">{s.label}</span>
            <span className="ll-step-note">{s.note}</span>
          </span>
        </div>
      ))}
    </>
  );
}

/* ---- the run ------------------------------------------------------------ */

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(q.matches);
    sync();
    q.addEventListener("change", sync);
    return () => q.removeEventListener("change", sync);
  }, []);
  return reduced;
}

function useRunModel() {
  const reduced = useReducedMotion();
  const [wallet, setWalletRaw] = useState<Wallet>("MetaMask");
  const [username, setUsernameRaw] = useState<Username>("happy");
  const [coin, setCoinRaw] = useState<Coin>("ETH");
  const [step, setStep] = useState(-1);
  const [settled, setSettled] = useState(false);

  const address = USERS[username]?.[coin];
  const found = address !== undefined;
  const name = `${username}.${PARENT}`;
  const beats = useMemo(() => script(wallet, username, address), [wallet, username, address]);
  const last = beats.length - 1;
  const running = step >= 0 && !settled;

  useEffect(() => {
    if (step < 0 || settled) return;
    const delay = step >= last ? SETTLE_MS : beats[step + 1].wire ? WIRE_MS : TICK_MS;
    const t = setTimeout(() => (step >= last ? setSettled(true) : setStep((s) => s + 1)), delay);
    return () => clearTimeout(t);
  }, [step, settled, last, beats]);

  /* Reduced motion skips the playback and shows where it ends. */
  const start = useCallback(() => {
    setSettled(reduced);
    setStep(reduced ? last : 0);
  }, [reduced, last]);
  const rewind = () => {
    setStep(-1);
    setSettled(false);
  };
  const setWallet = (v: Wallet) => (setWalletRaw(v), rewind());
  const setUsername = (v: Username) => (setUsernameRaw(v), rewind());
  const setCoin = (v: Coin) => (setCoinRaw(v), rewind());

  const failed = settled && !found;
  const cell = (ref: CellRef): Cell => {
    const at = beats.findIndex((b) => b.cells?.includes(ref));
    if (at < 0) return failed ? "skipped" : "idle";
    if (step < at) return "idle";
    if (step === at && !settled) return "active";
    return beats[at].fail ? "fail" : "pass";
  };
  const actorState = (a: Actor): CardState => {
    const seen = beats.slice(0, step + 1).filter((b) => b.actor === a);
    if (seen.length === 0) return failed ? "skipped" : "idle";
    if (seen.some((b) => b.fail)) return "failed";
    if (!settled && beats[step].actor === a) return "active";
    return "done";
  };
  const wire = (id: WireId) => {
    const shown = beats.slice(0, step + 1).filter((b) => b.wire === id);
    const latest = shown[shown.length - 1] ?? beats.find((b) => b.wire === id);
    return {
      lit: shown.length > 0,
      live: !settled && step >= 0 && beats[step].wire === id,
      label: latest?.label,
      danger: shown.length > 0 && latest?.danger === true,
    };
  };

  return {
    wallet, username, coin, setWallet, setUsername, setCoin,
    step, settled, running, start, found, failed, address, name, beats,
    cell, actorState, wire,
  };
}

type Run = ReturnType<typeof useRunModel>;

/* ---- cards -------------------------------------------------------------- */

function LookupCard({ m }: { m: Run }) {
  return (
    <div className={shell(m.step < 0 ? "idle" : "done", "is-control")}>
      <Head title="Lookup" note="what the wallet asks for" state={m.step < 0 ? "idle" : "done"} Glyph={IconSliders} />
      <div className="ll-control-row">
        <span className="ll-row-label">Wallet</span>
        <Chips options={WALLETS} value={m.wallet} onChange={m.setWallet} />
      </div>
      <div className="ll-control-row">
        <span className="ll-row-label">Name</span>
        <Chips options={USERNAMES} value={m.username} onChange={m.setUsername} />
      </div>
      <div className="ll-control-row">
        <span className="ll-row-label">Address</span>
        <Chips options={COINS} value={m.coin} onChange={m.setCoin} />
      </div>
    </div>
  );
}

function WalletCard({ m }: { m: Run }) {
  const resolved = m.settled && m.found;
  const st = resolved ? "done" : m.failed ? "failed" : m.actorState("wallet");
  return (
    <div className={shell(st, resolved ? "is-success" : "")}>
      <Head title={m.wallet} note={`looks up ${m.name}`} state={st} Glyph={IconWallet} />
      <Steps steps={WALLET_STEPS} cells={WALLET_STEPS.map((_, i) => m.cell(`wallet:${i}`))} />
      <Row
        label={m.coin}
        value={resolved ? m.address : m.failed ? "doesn’t resolve" : "—"}
        tone={resolved ? "good" : m.failed ? "bad" : undefined}
      />
      <Row label="Minted" value="nothing" tone={resolved ? "good" : undefined} />
      <Row label="Gas paid" value="none" tone={resolved ? "good" : undefined} />
    </div>
  );
}

function EnsCard({ m }: { m: Run }) {
  const verified = m.settled && m.found;
  const answer = verified ? "signature valid" : m.step >= 1 ? "OffchainLookup" : "—";
  return (
    <div className={shell(m.actorState("ens"))}>
      <Head title="ENS" note="your name’s resolver" state={m.actorState("ens")} Glyph={IconEns} />
      <Row label="Name" value={m.name} />
      <Row label="Resolver" value="wildcard" />
      <Row label="Answer" value={answer} tone={verified ? "good" : undefined} />
    </div>
  );
}

function GatewayCard({ m }: { m: Run }) {
  return (
    <div className={shell(m.actorState("gateway"))}>
      <Head title="Gateway" note="hosted by Namespace" state={m.actorState("gateway")} Glyph={IconGateway} badge="CCIP-Read" />
      <Steps steps={GATEWAY_STEPS} cells={GATEWAY_STEPS.map((_, i) => m.cell(`gateway:${i}`))} />
    </div>
  );
}

function ApiCard({ m }: { m: Run }) {
  const details = [
    `GET /${m.username}`,
    m.found ? `${m.username} found` : `no user called ${m.username}`,
    `${m.coin} · ${m.address ?? "—"}`,
    "avatar, url",
    m.found ? "200 OK" : "404",
  ];
  return (
    <div className={shell(m.actorState("api"))}>
      <Head title="Your API" note="api.brand.com, read-only" state={m.actorState("api")} Glyph={IconApi} badge="your database" />
      {API_CHECKS.map((c, i) => {
        const s = m.cell(`api:${i}`);
        return (
          <div key={c} className={`ll-check is-${s}`}>
            <Pip state={s} />
            <span className="ll-check-label">{c}</span>
            <span className="ll-check-detail">{details[i]}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ---- canvas geometry ---------------------------------------------------- */

const W = 1380;
const H = 466;
type Box = { x: number; y: number; w: number; h: number };
type CardId = "lookup" | "wallet" | "ens" | "gateway" | "api";
const BOX: Record<CardId, Box> = {
  lookup: { x: 0, y: 60, w: 300, h: 300 },
  wallet: { x: 340, y: 24, w: 230, h: 418 },
  ens: { x: 700, y: 0, w: 250, h: 170 },
  gateway: { x: 700, y: 222, w: 250, h: 244 },
  api: { x: 1080, y: 150, w: 300, h: 316 },
};

type Side = "l" | "r";
type Port = [CardId, Side, number];
/** Each message gets its own wire; a request and its reply run side by side. */
const WIRES: Record<WireId, { from: Port; to: Port; route: [string, string] }> = {
  askEns: { from: ["wallet", "r", 0.12], to: ["ens", "l", 0.36], route: ["wallet", "ENS"] },
  ensReply: { from: ["ens", "l", 0.72], to: ["wallet", "r", 0.26], route: ["ENS", "wallet"] },
  callGateway: { from: ["wallet", "r", 0.6], to: ["gateway", "l", 0.3], route: ["wallet", "Gateway"] },
  gatewayReply: { from: ["gateway", "l", 0.7], to: ["wallet", "r", 0.76], route: ["Gateway", "wallet"] },
  callApi: { from: ["gateway", "r", 0.3], to: ["api", "l", 0.35], route: ["Gateway", "Your API"] },
  apiReply: { from: ["api", "l", 0.65], to: ["gateway", "r", 0.7], route: ["Your API", "Gateway"] },
};

const point = ([id, side, t]: Port) => {
  const b = BOX[id];
  return [side === "l" ? b.x : b.x + b.w, b.y + b.h * t] as const;
};

function wirePath(from: Port, to: Port) {
  const [sx, sy] = point(from);
  const [tx, ty] = point(to);
  /* Leave each card straight out of the side it sits on. */
  const c = Math.max(30, Math.abs(tx - sx) * 0.5);
  const c1x = sx + (from[1] === "r" ? c : -c);
  const c2x = tx + (to[1] === "r" ? c : -c);
  const d = `M${sx},${sy} C${c1x},${sy} ${c2x},${ty} ${tx},${ty}`;
  const mx = 0.125 * sx + 0.375 * c1x + 0.375 * c2x + 0.125 * tx;
  const my = 0.5 * sy + 0.5 * ty;
  return { d, sx, sy, tx, ty, mx, my };
}

function Wire({ id, m }: { id: WireId; m: Run }) {
  const { lit, live, label, danger } = m.wire(id);
  const p = wirePath(WIRES[id].from, WIRES[id].to);
  const hue = danger ? "var(--ll-stop)" : "var(--ll-live)";
  return (
    <g>
      <path d={p.d} className="ll-wire-rest" />
      <path d={p.d} pathLength={100} className="ll-trail" stroke={hue} strokeWidth={5} opacity={0.16} style={{ strokeDashoffset: lit ? 0 : 100 }} />
      <path d={p.d} pathLength={100} className="ll-trail" stroke={hue} strokeWidth={1.75} style={{ strokeDashoffset: lit ? 0 : 100 }} />
      <circle cx={p.sx} cy={p.sy} r={3} className="ll-end" fill={lit ? hue : "var(--ll-wire)"} />
      {/* Arrowhead into the receiving card, so a request and its reply read apart at rest. */}
      <path
        d={WIRES[id].to[1] === "l" ? `M${p.tx - 7},${p.ty - 4.5} L${p.tx},${p.ty} L${p.tx - 7},${p.ty + 4.5}Z` : `M${p.tx + 7},${p.ty - 4.5} L${p.tx},${p.ty} L${p.tx + 7},${p.ty + 4.5}Z`}
        className="ll-end"
        fill={lit ? hue : "var(--ll-wire)"}
      />
      {live && (
        /* Keyed by beat, so a wire used twice (resolve, then verify) pulses twice. */
        <g key={`pulse-${m.step}`}>
          <path d={p.d} pathLength={100} className="ll-pulse" />
          <g className="ll-bead" style={{ offsetPath: `path("${p.d}")` }}>
            <circle r={8} fill={hue} opacity={0.3} />
            <circle r={3} fill="var(--ll-charge)" />
          </g>
        </g>
      )}
      {label && (
        <foreignObject x={p.mx - 60} y={p.my - 12} width={120} height={24}>
          <div className="ll-wire-label-wrap">
            <span className={`ll-wire-label${lit ? (danger ? " is-danger" : " is-lit") : ""}`}>{label}</span>
          </div>
        </foreignObject>
      )}
    </g>
  );
}

/* ---- narrow screens: the same messages as a list ------------------------ */

function MessageList({ m }: { m: Run }) {
  const msgs = m.beats.map((b, i) => ({ b, i })).filter(({ b }) => b.wire);
  return (
    <ol className="ll-msgs">
      {msgs.map(({ b, i }) => {
        const [a, z] = WIRES[b.wire!].route.map((r) => (r === "wallet" ? m.wallet : r));
        const state = m.step < i ? "idle" : m.step === i && !m.settled ? "current" : "past";
        return (
          <li key={i} className={`ll-msg is-${state}${b.danger ? " is-danger" : ""}`}>
            <span className="ll-msg-route">
              {a} → {z}
            </span>
            <span className="ll-msg-label">{b.label}</span>
          </li>
        );
      })}
    </ol>
  );
}

/* ---- the whole thing ---------------------------------------------------- */

export function LookupLifecycle() {
  const m = useRunModel();
  const frame = useRef<HTMLDivElement | null>(null);
  const stage = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  /* Fit the fixed-size canvas to the frame's width. */
  useLayoutEffect(() => {
    const el = stage.current;
    if (!el) return;
    const fit = () => setScale(Math.min(1, (el.clientWidth - 48) / W)); /* 24px padding each side */
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* Plays once when it first comes into view, then only on request. */
  const { start } = m;
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        start();
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [start]);

  const place = (k: CardId): React.CSSProperties => ({ left: BOX[k].x, top: BOX[k].y, width: BOX[k].w, height: BOX[k].h });
  const { settled, step } = m;

  return (
    <div ref={frame} className="ll-frame">
      {/* stacked, for screens too narrow to hold the canvas */}
      <div className="ll-stack">
        <LookupCard m={m} />
        <MessageList m={m} />
      </div>

      {/* the canvas */}
      <div ref={stage} className="ll-stage" style={{ height: H * scale + 64 }}>
        <div className="ll-canvas" style={{ width: W, height: H, transform: `scale(${scale})` }}>
          <svg className="ll-wires" width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
            {(Object.keys(WIRES) as WireId[]).map((id) => (
              <Wire key={id} id={id} m={m} />
            ))}
          </svg>
          <div className="ll-node" style={place("lookup")}><LookupCard m={m} /></div>
          <div className="ll-node" style={place("wallet")}><WalletCard m={m} /></div>
          <div className="ll-node" style={place("ens")}><EnsCard m={m} /></div>
          <div className="ll-node" style={place("gateway")}><GatewayCard m={m} /></div>
          <div className="ll-node" style={place("api")}><ApiCard m={m} /></div>
        </div>
      </div>

      {/* run, and what came of it */}
      <div className="ll-foot">
        <button type="button" className={`ll-run${m.running ? " is-running" : ""}`} disabled={m.running} onClick={m.start}>
          {m.running ? <IconSpin className="ll-run-icon is-spin" /> : <IconPlay className="ll-run-icon" />}
          {m.running ? "Running" : settled ? "Run again" : "Run"}
        </button>
        <output className="ll-status" aria-live="polite">
          {m.running ? (
            <span className="ll-status-muted">{m.beats[step].status}</span>
          ) : m.failed ? (
            <span className="ll-status-line">
              <span className="ll-status-bad">Not found.</span>
              <span>
                {m.username} isn&apos;t one of your users, so {m.name} doesn&apos;t resolve.
              </span>
            </span>
          ) : settled ? (
            <span className="ll-status-line">
              <span className="ll-status-good">
                <IconCheck className="ll-status-icon" /> Resolved in {m.wallet}
              </span>
              <span className="ll-status-muted">
                {m.name} → {m.address}. Nothing minted, no gas.
              </span>
            </span>
          ) : (
            <span className="ll-status-muted">
              Pick a wallet, a name and an address, then run it. Try zoe, who isn&apos;t one of your users.
            </span>
          )}
        </output>
      </div>
    </div>
  );
}
