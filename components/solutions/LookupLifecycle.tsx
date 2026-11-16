"use client";
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

/* -------------------------------------------------------------------------
 * The life of a Universal Usernames lookup, as a canvas that plays itself.
 * Same shape as the namera.ai execution path: a control card on the left,
 * cards joined by dotted wires that light up in order, a failure branch, and a
 * Run / Run again footer that reports what happened.
 *
 * What it draws is the real CCIP-Read path:
 *   wallet → ENS (wildcard resolver answers with OffchainLookup)
 *   → Namespace gateway (finds your endpoint, calls it)
 *   → your API (GET {base}/{username}; 404 for unknown usernames)
 *   → gateway signs → wallet verifies through the resolver → address.
 * ---------------------------------------------------------------------- */

type CardState = "idle" | "active" | "done" | "failed" | "skipped";
type Cell = "idle" | "active" | "pass" | "fail" | "skipped";

const WALLETS = ["MetaMask", "Rainbow", "Coinbase"] as const;
type Wallet = (typeof WALLETS)[number];

const COINS = [
  { id: "ETH", type: "60" },
  { id: "Base", type: "2147492101" },
  { id: "BTC", type: "0" },
  { id: "SOL", type: "501" },
] as const;
type Coin = (typeof COINS)[number]["id"];

const USERNAMES = ["alice", "bob", "zoe"] as const;
type Username = (typeof USERNAMES)[number];

/** Your database. zoe is not in it. */
const USERS: Partial<Record<Username, Record<Coin, string>>> = {
  alice: { ETH: "0x4A7D…31da", Base: "0x4A7D…31da", BTC: "bc1q…7v2k", SOL: "7xKX…gAsU" },
  bob: { ETH: "0x91C2…a07e", Base: "0x91C2…a07e", BTC: "bc1q…m3xf", SOL: "5bRt…Lq9w" },
};

const PARENT = "brand.eth";

const GATEWAY_STEPS = [
  { label: "Receive", note: "the lookup ENS pointed here" },
  { label: "Find your endpoint", note: "saved in the Namespace App" },
  { label: "Call your API", note: "read-only, over HTTPS" },
] as const;

const API_CHECKS = ["Request", "Username", "Address", "Profile", "Response"] as const;

/* One beat per thing that happens. */
const ASK_AT = 0;
const ENS_AT = 1;
const GATEWAY_AT = 2;
const API_AT = 5;
const SIGN_AT = 10;
const VERIFY_AT = 11;
const RESOLVED_AT = 12;
const LAST_BEAT = 12;
const BEAT_MS = [620, 680, 560, 560, 600, 460, 460, 460, 460, 520, 700, 720, 820] as const;

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
const IconSign = svg(<><path d="M4 18c2.5 0 3.5-6 6-6s1.5 4 3.5 4 2-2 3-2" /><path d="M4 21h16" /></>);
const IconShield = svg(<><path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></>);
const IconCheck = svg(<path d="m5 12.5 4.5 4.5L19 7.5" />);
const IconX = svg(<><circle cx="12" cy="12" r="9" /><path d="m9 9 6 6M15 9l-6 6" /></>);
const IconPlay = svg(<path d="M7 5.5v13l11-6.5-11-6.5Z" />);
const IconSpin = svg(<path d="M12 3a9 9 0 1 0 9 9" />);

/* ---- card parts --------------------------------------------------------- */

const shell = (state: CardState, extra = "") =>
  `ll-card is-${state}${extra ? ` ${extra}` : ""}`;

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

function Row({ label, value, tone }: { label: string; value: React.ReactNode; tone?: "good" }) {
  return (
    <div className="ll-row">
      <span className="ll-row-label">{label}</span>
      <span className={`ll-row-value${tone === "good" ? " is-good" : ""}`}>{value}</span>
    </div>
  );
}

function Chips<T extends string>({
  options,
  value,
  onChange,
  render,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  render?: (v: T) => React.ReactNode;
}) {
  return (
    <span className="ll-chips">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          className={`ll-chip${o === value ? " is-on" : ""}`}
          aria-pressed={o === value}
          onClick={() => onChange(o)}
        >
          {render ? render(o) : o}
        </button>
      ))}
    </span>
  );
}

/* ---- cards -------------------------------------------------------------- */

type Run = ReturnType<typeof useRunModel>;

function LookupCard({ m }: { m: Run }) {
  return (
    <div className={shell(m.lookupState, "is-control")}>
      <Head title="Lookup" note="what the wallet asks for" state={m.lookupState} Glyph={IconSliders} />
      <div className="ll-control-row">
        <span className="ll-row-label">Wallet</span>
        <Chips options={WALLETS} value={m.wallet} onChange={m.setWallet} />
      </div>
      <div className="ll-control-row">
        <span className="ll-row-label">Name</span>
        <Chips
          options={USERNAMES}
          value={m.username}
          onChange={m.setUsername}
        />
      </div>
      <div className="ll-control-row">
        <span className="ll-row-label">Address</span>
        <Chips options={COINS.map((c) => c.id)} value={m.coin} onChange={m.setCoin} />
      </div>
    </div>
  );
}

function WalletCard({ m }: { m: Run }) {
  return (
    <div className={shell(m.askState)}>
      <Head title={m.wallet} note={`looks up ${m.name}`} state={m.askState} Glyph={IconWallet} />
    </div>
  );
}

function EnsCard({ m }: { m: Run }) {
  return (
    <div className={shell(m.ensState)}>
      <Head title="ENS" note="on Ethereum" state={m.ensState} Glyph={IconEns} />
      <Row label="Name" value={m.name} />
      <Row label="Resolver" value="wildcard" />
      <Row label="Answer" value="ask the gateway" />
    </div>
  );
}

function GatewayCard({ m }: { m: Run }) {
  return (
    <div className={shell(m.gatewayState)}>
      <Head title="Gateway" note="hosted by Namespace" state={m.gatewayState} Glyph={IconGateway} badge="CCIP-Read" />
      {GATEWAY_STEPS.map((s, i) => (
        <div key={s.label} className={`ll-step is-${m.gatewayCells[i]}`}>
          <Pip state={m.gatewayCells[i]} />
          <span className="ll-step-text">
            <span className="ll-step-label">{s.label}</span>
            <span className="ll-step-note">{i === 2 ? `GET /ens/${m.username}` : s.note}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

function ApiCard({ m }: { m: Run }) {
  return (
    <div className={shell(m.apiState)}>
      <Head title="Your API" note="api.brand.com, read-only" state={m.apiState} Glyph={IconApi} badge="your database" />
      {API_CHECKS.map((c, i) => (
        <div key={c} className={`ll-check is-${m.apiCells[i]}`}>
          <Pip state={m.apiCells[i]} />
          <span className="ll-check-label">{c}</span>
          <span className="ll-check-detail">{m.apiDetails[i]}</span>
        </div>
      ))}
    </div>
  );
}

function NotFoundCard({ m }: { m: Run }) {
  return (
    <div className={shell(m.notFoundState)}>
      <Head title="Not found" note="your API returned 404" state={m.notFoundState} Glyph={IconX} />
      <div className="ll-line">{m.found ? "every name you issued resolves" : `${m.username} isn't one of your users`}</div>
    </div>
  );
}

function SignCard({ m }: { m: Run }) {
  const st = m.stateAt(SIGN_AT);
  return (
    <div className={shell(st)}>
      <Head title="Sign" note="by the gateway" state={st} Glyph={IconSign} />
      <div className="ll-line">no key for you to hold</div>
    </div>
  );
}

function VerifyCard({ m }: { m: Run }) {
  const st = m.stateAt(VERIFY_AT);
  return (
    <div className={shell(st)}>
      <Head title="Verify" note="by the wallet" state={st} Glyph={IconShield} />
      <div className="ll-line">checks the signature via ENS</div>
    </div>
  );
}

function ResolvedCard({ m }: { m: Run }) {
  const st = m.stateAt(RESOLVED_AT);
  return (
    <div className={shell(st, st === "done" ? "is-success" : "")}>
      <Head title="Resolved" note={m.name} state={st} Glyph={IconCheck} />
      <Row label={m.coin} value={m.address ?? "—"} />
      <Row label="Minted" value="nothing" tone={st === "done" ? "good" : undefined} />
      <Row label="Gas paid" value="none" tone={st === "done" ? "good" : undefined} />
    </div>
  );
}

/* ---- the run ------------------------------------------------------------ */

function useRunModel() {
  const [wallet, setWalletRaw] = useState<Wallet>("MetaMask");
  const [username, setUsernameRaw] = useState<Username>("alice");
  const [coin, setCoinRaw] = useState<Coin>("ETH");
  const [step, setStep] = useState(-1);
  const [settled, setSettled] = useState(false);
  const [run, setRun] = useState(0);

  const user = USERS[username];
  const found = user !== undefined;
  const address = user?.[coin];
  const coinType = COINS.find((c) => c.id === coin)?.type ?? "60";
  const name = `${username}.${PARENT}`;

  /* Unknown usernames stop at the username check: the API returns 404. */
  const failAt = found ? null : API_AT + 1;
  const lastBeat = failAt ?? LAST_BEAT;
  const running = step >= 0 && !settled;

  useEffect(() => {
    if (step < 0 || settled) return;
    const delay = step > lastBeat ? 700 : BEAT_MS[step] ?? 600;
    const t = setTimeout(() => {
      if (step > lastBeat) setSettled(true);
      else setStep((s) => s + 1);
    }, delay);
    return () => clearTimeout(t);
  }, [step, settled, lastBeat]);

  const start = useCallback(() => {
    setSettled(false);
    setRun((r) => r + 1);
    setStep(0);
  }, []);
  const rewind = () => {
    setStep(-1);
    setSettled(false);
  };
  const setWallet = (v: Wallet) => (setWalletRaw(v), rewind());
  const setUsername = (v: Username) => (setUsernameRaw(v), rewind());
  const setCoin = (v: Coin) => (setCoinRaw(v), rewind());

  const cellAt = (beat: number, failing: boolean): Cell => {
    if (step < 0) return "idle";
    if (failAt !== null && beat > failAt) return settled ? "skipped" : "idle";
    if (step < beat) return "idle";
    if (step === beat && !settled) return "active";
    return failing ? "fail" : "pass";
  };
  const stateAt = (beat: number): CardState => {
    if (step < 0) return "idle";
    if (failAt !== null) return settled ? "skipped" : "idle";
    if (step < beat) return "idle";
    if (step === beat && !settled) return "active";
    return "done";
  };

  const gatewayCells = GATEWAY_STEPS.map((_, i) => cellAt(GATEWAY_AT + i, false));
  const apiCells = API_CHECKS.map((_, i) => cellAt(API_AT + i, failAt === API_AT + i));
  const apiDetails = [
    `GET /ens/${username}`,
    found ? `${username} found` : `no user called ${username}`,
    `${coin} · ${address ?? "—"}`,
    "avatar, url",
    found ? "200 OK" : "404",
  ];

  return {
    wallet,
    username,
    coin,
    setWallet,
    setUsername,
    setCoin,
    step,
    settled,
    run,
    running,
    start,
    found,
    failAt,
    address,
    coinType,
    name,
    gatewayCells,
    apiCells,
    apiDetails,
    stateAt,
    lookupState: (step < 0 ? "idle" : "done") as CardState,
    askState: (step < 0 ? "idle" : step === ASK_AT && !settled ? "active" : "done") as CardState,
    ensState: (step < ENS_AT ? "idle" : step === ENS_AT && !settled ? "active" : "done") as CardState,
    gatewayState: (step < GATEWAY_AT ? "idle" : step < API_AT ? "active" : "done") as CardState,
    apiState: (step < API_AT
      ? "idle"
      : failAt !== null && step >= failAt
        ? "failed"
        : step < SIGN_AT
          ? "active"
          : "done") as CardState,
    notFoundState: (step < 0 ? "idle" : failAt === null ? (settled ? "skipped" : "idle") : step > failAt ? "failed" : "idle") as CardState,
  };
}

/* ---- canvas geometry ---------------------------------------------------- */

const W = 1414;
const H = 466;
type Box = { x: number; y: number; w: number; h: number };
const BOX: Record<string, Box> = {
  lookup: { x: 0, y: 40, w: 300, h: 300 },
  wallet: { x: 350, y: 42, w: 196, h: 58 },
  ens: { x: 350, y: 156, w: 196, h: 164 },
  gateway: { x: 598, y: 78, w: 250, h: 194 },
  api: { x: 900, y: 4, w: 296, h: 316 },
  notfound: { x: 900, y: 376, w: 296, h: 86 },
  sign: { x: 1236, y: 20, w: 178, h: 86 },
  verify: { x: 1236, y: 140, w: 178, h: 86 },
  resolved: { x: 1236, y: 260, w: 178, h: 150 },
};
type Side = "l" | "r" | "t" | "b";
const port = (b: Box, s: Side) =>
  s === "l" ? [b.x, b.y + b.h / 2] : s === "r" ? [b.x + b.w, b.y + b.h / 2] : s === "t" ? [b.x + b.w / 2, b.y] : [b.x + b.w / 2, b.y + b.h];

function wirePath(a: Box, as: Side, b: Box, bs: Side) {
  const [sx, sy] = port(a, as);
  const [tx, ty] = port(b, bs);
  const vertical = as === "b";
  const c = vertical ? Math.max(24, Math.abs(ty - sy) * 0.5) : Math.max(30, Math.abs(tx - sx) * 0.5);
  const c1 = vertical ? [sx, sy + c] : [sx + c, sy];
  const c2 = vertical ? [tx, ty - c] : [tx - c, ty];
  const d = `M${sx},${sy} C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${tx},${ty}`;
  /* midpoint of the cubic, for the label */
  const mx = 0.125 * sx + 0.375 * c1[0] + 0.375 * c2[0] + 0.125 * tx;
  const my = 0.125 * sy + 0.375 * c1[1] + 0.375 * c2[1] + 0.125 * ty;
  return { d, sx, sy, tx, ty, mx, my };
}

function Wire({
  from,
  to,
  lit,
  live,
  run,
  label,
  danger,
}: {
  from: [string, Side];
  to: [string, Side];
  lit: boolean;
  live: boolean;
  run: number;
  label?: string;
  danger?: boolean;
}) {
  const p = wirePath(BOX[from[0]], from[1], BOX[to[0]], to[1]);
  const hue = danger ? "var(--ll-stop)" : "var(--ll-live)";
  return (
    <g>
      <path d={p.d} className="ll-wire-rest" />
      <path d={p.d} pathLength={100} className="ll-trail" stroke={hue} strokeWidth={5} opacity={0.16} style={{ strokeDashoffset: lit ? 0 : 100 }} />
      <path d={p.d} pathLength={100} className="ll-trail" stroke={hue} strokeWidth={1.75} style={{ strokeDashoffset: lit ? 0 : 100 }} />
      <circle cx={p.sx} cy={p.sy} r={3} className="ll-end" fill={lit ? hue : "var(--ll-wire)"} />
      <circle cx={p.tx} cy={p.ty} r={3} className="ll-end" fill={lit ? hue : "var(--ll-wire)"} />
      {live && (
        <g key={`pulse-${run}`}>
          <path d={p.d} pathLength={100} className="ll-pulse" />
          <g className="ll-head" style={{ offsetPath: `path("${p.d}")` }}>
            <circle r={8} fill={hue} opacity={0.3} />
            <circle r={3} fill="var(--ll-charge)" />
          </g>
        </g>
      )}
      {label && (
        <foreignObject x={p.mx - 40} y={p.my - 12} width={80} height={24}>
          <div className="ll-wire-label-wrap">
            <span className={`ll-wire-label${lit ? (danger ? " is-danger" : " is-lit") : ""}`}>{label}</span>
          </div>
        </foreignObject>
      )}
    </g>
  );
}

function Rail({ lit, label, danger }: { lit: boolean; label?: string; danger?: boolean }) {
  const tone = lit ? (danger ? " is-danger" : " is-lit") : "";
  return (
    <div className="ll-rail" aria-hidden="true">
      <span className={`ll-rail-dot${tone}`} />
      <span className={`ll-rail-line${tone}`} />
      {label && (
        <>
          <span className={`ll-wire-label${tone}`}>{label}</span>
          <span className={`ll-rail-line${tone}`} />
        </>
      )}
      <span className={`ll-rail-dot${tone}`} />
    </div>
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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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

  const { step, settled, run, failAt } = m;
  const ok = failAt === null;
  const wires = useMemo(
    () => [
      { from: ["wallet", "b"], to: ["ens", "t"], lit: step >= ASK_AT, live: step === ASK_AT && !settled },
      { from: ["ens", "r"], to: ["gateway", "l"], lit: step >= GATEWAY_AT, live: step === GATEWAY_AT && !settled },
      { from: ["gateway", "r"], to: ["api", "l"], lit: step >= API_AT, live: step === API_AT && !settled },
      { from: ["api", "r"], to: ["sign", "l"], lit: ok && step >= SIGN_AT, live: ok && step === SIGN_AT && !settled, label: "200 OK" },
      { from: ["api", "b"], to: ["notfound", "t"], lit: !ok && step > (failAt ?? 0), live: !ok && step === (failAt ?? 0) + 1 && !settled, label: "404", danger: true },
      { from: ["sign", "b"], to: ["verify", "t"], lit: ok && step >= VERIFY_AT, live: ok && step === VERIFY_AT && !settled },
      { from: ["verify", "b"], to: ["resolved", "t"], lit: ok && step >= RESOLVED_AT, live: ok && step === RESOLVED_AT && !settled },
    ] as { from: [string, Side]; to: [string, Side]; lit: boolean; live: boolean; label?: string; danger?: boolean }[],
    [step, settled, ok, failAt],
  );

  const place = (k: string): React.CSSProperties => ({ left: BOX[k].x, top: BOX[k].y, width: BOX[k].w, height: BOX[k].h });

  return (
    <div ref={frame} className="ll-frame">
      {/* stacked, for screens too narrow to hold the canvas */}
      <div className="ll-stack">
        <LookupCard m={m} />
        <Rail lit={step >= 0} />
        <WalletCard m={m} />
        <Rail lit={step >= ENS_AT} />
        <EnsCard m={m} />
        <Rail lit={step >= GATEWAY_AT} />
        <GatewayCard m={m} />
        <Rail lit={step >= API_AT} />
        <ApiCard m={m} />
        {ok ? (
          <>
            <Rail lit={step >= SIGN_AT} label="200 OK" />
            <SignCard m={m} />
            <Rail lit={step >= VERIFY_AT} />
            <VerifyCard m={m} />
            <Rail lit={step >= RESOLVED_AT} />
            <ResolvedCard m={m} />
          </>
        ) : (
          <>
            <Rail lit={step > (failAt ?? 0)} label="404" danger />
            <NotFoundCard m={m} />
          </>
        )}
      </div>

      {/* the canvas */}
      <div ref={stage} className="ll-stage" style={{ height: H * scale + 64 }}>
        <div className="ll-canvas" style={{ width: W, height: H, transform: `scale(${scale})` }}>
          <svg className="ll-wires" width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
            {wires.map((w) => (
              <Wire key={`${w.from[0]}-${w.to[0]}`} {...w} run={run} />
            ))}
          </svg>
          <div className="ll-node" style={place("lookup")}><LookupCard m={m} /></div>
          <div className="ll-node" style={place("wallet")}><WalletCard m={m} /></div>
          <div className="ll-node" style={place("ens")}><EnsCard m={m} /></div>
          <div className="ll-node" style={place("gateway")}><GatewayCard m={m} /></div>
          <div className="ll-node" style={place("api")}><ApiCard m={m} /></div>
          <div className="ll-node" style={place("notfound")}><NotFoundCard m={m} /></div>
          <div className="ll-node" style={place("sign")}><SignCard m={m} /></div>
          <div className="ll-node" style={place("verify")}><VerifyCard m={m} /></div>
          <div className="ll-node" style={place("resolved")}><ResolvedCard m={m} /></div>
        </div>
      </div>

      {/* run, and what came of it */}
      <div className="ll-foot">
        <button type="button" className={`ll-run${m.running ? " is-running" : ""}`} disabled={m.running} onClick={m.start}>
          {m.running ? <IconSpin className="ll-run-icon is-spin" /> : <IconPlay className="ll-run-icon" />}
          {m.running ? "Running" : settled ? "Run again" : "Run"}
        </button>
        <output className="ll-status">
          {m.running ? (
            <span className="ll-status-muted">
              {step < GATEWAY_AT
                ? `${m.wallet} asks ENS for ${m.name}…`
                : step < API_AT
                  ? "ENS hands the lookup to the Namespace gateway…"
                  : step < SIGN_AT
                    ? "Your API answers…"
                    : "Signing and verifying…"}
            </span>
          ) : settled && !ok ? (
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
