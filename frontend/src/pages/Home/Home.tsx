import styles from "./home.module.css";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import heroBg from "../../imports/heroBg";

function Marquee() {
  const items = [
    "Direct TikTok Shop PH & Singapore line",
    "LIVE selling",
    "Affiliate marketing",
    "GMV Max ads",
    "Retention & CRM",
  ];
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-pink/40 bg-pink text-ink">
      <div className="marquee-track flex w-max whitespace-nowrap py-2.5">
        {row.map((t, i) => (
          <span key={i} className="label mx-6 flex items-center gap-6 font-bold text-ink/90">
            {t}
            <span className="text-ink/50">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative flex h-svh min-h-[34rem] flex-col justify-center overflow-hidden pt-16">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBg})`,
          transform: "scaleX(-1)",
        }}
      />
      <div className="absolute inset-0 bg-ink/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      <div
        className="pointer-events-none absolute -right-32 -top-48 h-[40rem] w-[48rem] rounded-full opacity-40 blur-3xl"
        style={{
          animation: "hero-glow 7s ease-in-out infinite",
          background: "radial-gradient(circle, #F04B9A, transparent 65%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-10 pt-4 md:px-10 md:pb-12 md:pt-6">
        <p className="label hero-rise mb-6 inline-flex items-center gap-3 rounded-full border border-teal/30 bg-teal/10 px-4 py-2 text-teal backdrop-blur sm:mb-5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75" />
            <span className="relative h-2 w-2 rounded-full bg-teal" />
          </span>
          Services · Platinum TikTok Shop Partner
        </p>
        <h1 className="max-w-5xl font-display text-[clamp(2.25rem,min(10vw,12.5vh),6.5rem)] font-black uppercase leading-[0.86] tracking-tight">
          <span className="hero-rise block drop-shadow-[0_4px_30px_rgba(0,0,0,.5)]" style={{ animationDelay: "120ms" }}>Stop</span>
          <span className="hero-rise block" style={{ animationDelay: "260ms" }}>
            <span className="relative inline-block text-cream/60">
              Posting.
              <span className="strike-line absolute -left-[2%] top-[48%] h-[0.08em] w-[104%] -rotate-[2deg] bg-pink" />
            </span>
          </span>
          <span className="hero-rise block drop-shadow-[0_4px_30px_rgba(0,0,0,.5)]" style={{ animationDelay: "400ms" }}>Start</span>
          <span className="hero-rise block" style={{ animationDelay: "540ms" }}><span className="hero-selling inline-block">Selling.</span></span>
        </h1>
        <p className="hero-rise mt-6 max-w-xl border-l-2 border-pink/60 pl-5 text-base leading-relaxed text-cream/80 sm:text-lg" style={{ animationDelay: "700ms" }}>
          Views don&apos;t pay the bills. Checkouts do. We run every engine that turns a scroll
          into an order on TikTok Shop, and we run them together, for a small roster of
          Philippine brands we can actually go all-in on.
        </p>
        <div className="hero-rise mt-6 flex flex-wrap items-center gap-3" style={{ animationDelay: "850ms" }}>
          <Link
            to="/apply"
            className="soft-btn-pink hero-btn-shine group inline-flex items-center justify-center gap-2 rounded-full bg-pink px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-ink transition-all hover:-translate-y-0.5 sm:text-sm"
          >
            Apply now
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <a
            href="#services"
            className="inline-flex items-center justify-center rounded-full border border-cream/25 bg-ink/30 px-7 py-4 backdrop-blur text-xs font-bold uppercase tracking-[0.16em] text-cream transition-colors hover:border-cream hover:bg-cream hover:text-ink sm:text-sm"
          >
            See what you get
          </a>
        </div>
        <p className="label hero-rise mt-6 text-cream/60 normal-case" style={{ animationDelay: "1000ms" }}>
          Referral-first · Limited slots · Reviewed by our founder
        </p>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute bottom-16 right-10 hidden w-64 flex-col gap-4 lg:flex xl:right-20">
        <div className="hero-chip rounded-2xl border border-cream/15 bg-ink/50 p-4 shadow-[0_0_40px_-10px_var(--color-pink)] backdrop-blur-md" style={{ ["--r" as string]: "-3deg" }}>
          <p className="label text-cream/50">Orders today</p>
          <p className="font-display text-3xl font-black text-pink">+248%</p>
        </div>
        <div className="hero-chip ml-10 rounded-2xl border border-cream/15 bg-ink/50 p-4 shadow-[0_0_40px_-10px_var(--color-teal)] backdrop-blur-md" style={{ ["--r" as string]: "2deg", animationDelay: "-2s" }}>
          <p className="label text-cream/50">Live checkouts</p>
          <p className="font-display text-3xl font-black text-teal">1,204</p>
        </div>
      </div>

      <div aria-hidden="true" className="absolute bottom-6 left-1/2 hidden h-10 w-px -translate-x-1/2 overflow-hidden bg-cream/20 md:block">
        <span className="block h-1/2 w-full bg-pink" style={{ animation: "hero-scroll 2s ease-in-out infinite" }} />
      </div>
    </section>
  );
}

const PAIN_STEP_MS = 2400;
const PAINS = [
  { tag: "Content", title: "Viral video, empty cart.", body: "People watched, liked, shared. Then scrolled away without buying.", metric: "1.2M views → 3 orders", icon: "M15 10l5-3v10l-5-3M4 6h11v12H4z" },
  { tag: "LIVE", title: "Going LIVE to a quiet room.", body: "Your host is talking to a handful of viewers and wondering why you even bother.", metric: "14 viewers · 0 checkouts", icon: "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm-4.2 2.2a6 6 0 0 1 0-8.4m8.4 0a6 6 0 0 1 0 8.4M5 19a10 10 0 0 1 0-14m14 0a10 10 0 0 1 0 14" },
  { tag: "Affiliates", title: "Creators who post once, then ghost.", body: "You sent samples. You got one video. Then nothing.", metric: "40 samples → 1 video", icon: "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 10a7 7 0 0 1 14 0M17 3a4 4 0 0 1 0 8m5 10a7 7 0 0 0-4-6.3" },
  { tag: "Ads", title: "Ad spend that disappears.", body: "Budget goes in, and nobody can tell you clearly what came out.", metric: "₱80K spent → ROAS ?", icon: "M3 11v2a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1Zm13-3a5 5 0 0 1 0 8m3-11a9 9 0 0 1 0 14" },
  { tag: "Retention", title: "Buyers who never come back.", body: "You keep paying to win the same type of customer again and again.", metric: "Repeat rate 4%", icon: "M4 12a8 8 0 0 1 14-5.3M20 4v4h-4M20 12a8 8 0 0 1-14 5.3M4 20v-4h4" },
  { tag: "Team", title: "Five freelancers, zero plan.", body: "Everyone does their part. Nobody owns the result.", metric: "5 people · 0 owners", icon: "M12 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM5 22a7 7 0 0 1 14 0M4 10a2 2 0 1 0 0-4m16 4a2 2 0 1 0 0-4" },
];
/** Illustrative monthly revenue each disconnected engine leaks, plus how bad it is. */
const PAIN_LEAK = [
  { amount: 42_000, severity: "High" },
  { amount: 28_000, severity: "High" },
  { amount: 35_000, severity: "High" },
  { amount: 80_000, severity: "Critical" },
  { amount: 51_000, severity: "Critical" },
  { amount: 24_000, severity: "High" },
];
const PAIN_CX = 200;
const PAIN_CY = 115;
const PAIN_RY = 82 / 150; // node ellipse squash
/** Engine chips around "Your shop" in the diagnosis panel (0-400 x 0-230 SVG space). */
const PAIN_NODES = PAINS.map((p, i) => {
  const deg = -150 + i * 60;
  const a = (deg * Math.PI) / 180;
  return { tag: p.tag, deg, x: PAIN_CX + 150 * Math.cos(a), y: PAIN_CY + 82 * Math.sin(a) };
});

function PainDiagnosis({ active, found }: { active: number; found: number }) {
  const cur = PAINS[active];
  const leak = PAIN_LEAK[active];
  // keep the radar turning forward the short way round, even when the scan wraps or hover jumps
  const sweep = useRef({ prev: active, deg: PAIN_NODES[active].deg });
  if (sweep.current.prev !== active) {
    let d = (active - sweep.current.prev + 6) % 6;
    if (d > 3) d -= 6;
    sweep.current = { prev: active, deg: sweep.current.deg + d * 60 };
  }
  const health = 100 - found * 11;
  const healthColor = health > 70 ? "#35D6C4" : health > 45 ? "#F5B94F" : "#F04B9A";
  const leaking = PAIN_LEAK.slice(0, found).reduce((s, l) => s + l.amount, 0);

  return (
    <div className="relative h-full overflow-hidden rounded-2xl bg-ink p-5 text-cream">
      {/* atmosphere: pink bloom, fine grid, moving scanline */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(55% 75% at 30% 50%, rgba(240,75,154,0.24), transparent 70%), radial-gradient(40% 50% at 100% 100%, rgba(53,214,196,0.1), transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: "linear-gradient(#F4EFE6 1px, transparent 1px), linear-gradient(90deg, #F4EFE6 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      />
      <div aria-hidden="true" className="pain-scanline pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-pink/[0.07] to-transparent" />

      <div className="relative flex items-center justify-between gap-3">
        <p className="label text-cream/60">Shop health check</p>
        <p className="label flex items-center gap-2 text-pink">
          <span className="relative flex h-2 w-2">
            <span className="pulse-ring absolute inset-0 rounded-full bg-pink" />
            <span className="relative h-2 w-2 rounded-full bg-pink" />
          </span>
          Scanning
        </p>
      </div>

      <div className="relative mt-2 grid items-center gap-4 md:grid-cols-[1.35fr_1fr]">
        <svg viewBox="0 0 400 230" className="h-auto w-full" role="img" aria-label="Your shop with six disconnected engines">
          <defs>
            <linearGradient id="pain-sweep" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F04B9A" stopOpacity="0" />
              <stop offset="100%" stopColor="#F04B9A" stopOpacity="0.38" />
            </linearGradient>
            <filter id="pain-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* radar rings + expanding pings */}
          {[0.35, 0.65, 1].map((k) => (
            <ellipse key={k} cx={PAIN_CX} cy={PAIN_CY} rx={150 * k} ry={82 * k} fill="none" stroke="#F4EFE6" strokeOpacity={0.07} strokeDasharray={k === 1 ? "2 4" : undefined} />
          ))}
          <circle className="pain-ping" cx={PAIN_CX} cy={PAIN_CY} r="34" fill="none" stroke="#F04B9A" strokeWidth="1" />
          <circle className="pain-ping" style={{ animationDelay: "1.2s" }} cx={PAIN_CX} cy={PAIN_CY} r="34" fill="none" stroke="#F04B9A" strokeWidth="1" />

          {/* radar sweep, aimed at the engine being scanned */}
          <g transform={`translate(${PAIN_CX} ${PAIN_CY}) scale(1 ${PAIN_RY})`}>
            <g style={{ transform: `rotate(${sweep.current.deg}deg)`, transition: "transform 0.9s cubic-bezier(0.5, 0, 0.2, 1)" }}>
              <path d="M0 0 L 165 0 A 165 165 0 0 0 126.4 -106 Z" fill="url(#pain-sweep)" transform="rotate(0)" />
              <line x1="0" y1="0" x2="165" y2="0" stroke="#F04B9A" strokeOpacity="0.8" strokeWidth="1.5" />
            </g>
          </g>

          {/* broken links */}
          {PAIN_NODES.map((n, i) => {
            const on = i === active;
            const at = (t: number) => [PAIN_CX + (n.x - PAIN_CX) * t, PAIN_CY + (n.y - PAIN_CY) * t] as const;
            const [ax, ay] = at(0.3);
            const [bx, by] = at(0.44);
            const [cx, cy] = at(0.56);
            const [dx, dy] = at(0.76);
            const [mx, my] = at(0.5);
            const stroke = on ? "#F04B9A" : i < found ? "rgba(240,75,154,0.45)" : "rgba(244,239,230,0.18)";
            return (
              <g key={n.tag}>
                <g className={on ? "pain-flicker" : undefined}>
                  <line x1={ax} y1={ay} x2={bx} y2={by} stroke={stroke} strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1={cx} y1={cy} x2={dx} y2={dy} stroke={stroke} strokeWidth="1.5" strokeDasharray="3 3" />
                </g>
                {on && <circle cx={mx} cy={my} r="9" fill="#F04B9A" opacity="0.5" filter="url(#pain-blur)" />}
                <path
                  d={`M ${mx - 3.5} ${my - 3.5} L ${mx + 3.5} ${my + 3.5} M ${mx + 3.5} ${my - 3.5} L ${mx - 3.5} ${my + 3.5}`}
                  stroke={on ? "#FFD1E8" : "#F04B9A"}
                  strokeOpacity={on || i < found ? 1 : 0.35}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                {/* revenue dripping out of the break */}
                {on &&
                  [0, 0.35, 0.7].map((d) => (
                    <circle key={`${active}-${d}`} cx={mx} cy={my + 5} r="1.8" fill="#F04B9A" className="pain-drip" style={{ animationDelay: `${d}s` }} />
                  ))}
              </g>
            );
          })}

          {/* your shop + health ring */}
          <circle cx={PAIN_CX} cy={PAIN_CY} r="34" fill="#130B1E" stroke="#F4EFE6" strokeOpacity="0.12" strokeWidth="4" />
          <circle
            cx={PAIN_CX}
            cy={PAIN_CY}
            r="34"
            fill="none"
            stroke={healthColor}
            strokeWidth="4"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray={`${health} 100`}
            transform={`rotate(-90 ${PAIN_CX} ${PAIN_CY})`}
            style={{ transition: "stroke-dasharray 0.8s ease-out, stroke 0.8s" }}
          />
          <text x={PAIN_CX} y={PAIN_CY - 6} textAnchor="middle" className="font-mono text-[7.5px] uppercase tracking-[0.14em]" fill="#9A8FA8">Your shop</text>
          <text key={health} x={PAIN_CX} y={PAIN_CY + 12} textAnchor="middle" className="fly-num font-display text-[19px] font-black" fill="#F4EFE6">
            {health}%
          </text>

          {/* engine chips */}
          {PAIN_NODES.map((n, i) => {
            const on = i === active;
            const w = n.tag.length * 7 + 22;
            return (
              <g key={n.tag}>
                {on && <rect x={n.x - w / 2 - 5} y={n.y - 16} width={w + 10} height="32" rx="16" fill="#F04B9A" className="pain-glow" filter="url(#pain-blur)" />}
                <rect
                  x={n.x - w / 2}
                  y={n.y - 11}
                  width={w}
                  height="22"
                  rx="11"
                  fill={on ? "#F04B9A" : "#1C1329"}
                  stroke={on ? "#FFD1E8" : i < found ? "rgba(240,75,154,0.65)" : "rgba(244,239,230,0.2)"}
                  style={{ transition: "fill 0.4s, stroke 0.4s" }}
                />
                <text x={n.x} y={n.y + 3.5} textAnchor="middle" className="font-mono text-[10px] font-bold uppercase tracking-[0.06em]" fill={on ? "#130B1E" : "#F4EFE6"}>
                  {n.tag}
                </text>
              </g>
            );
          })}
        </svg>

        <div>
          <div className="flex items-center gap-2">
            <p className="label text-cream/50">Leak found</p>
            <span
              key={`sev-${active}`}
              className={`phase-title rounded-full px-2 py-0.5 font-mono text-[0.55rem] font-bold uppercase tracking-[0.12em] ${
                leak.severity === "Critical" ? "bg-pink text-ink" : "border border-amber/60 text-amber"
              }`}
            >
              {leak.severity}
            </span>
          </div>
          <p key={active} className="pain-glitch mt-1.5 font-display text-[clamp(1.5rem,2.4vw,1.875rem)] font-black uppercase leading-none text-pink">
            {cur.tag}
          </p>
          <p key={`m-${active}`} className="phase-title mt-1.5 truncate font-mono text-[0.68rem] text-cream/70">
            {cur.metric}
          </p>

          <div className="mt-3 flex items-baseline justify-between gap-2 rounded-lg border border-pink/25 bg-pink/[0.07] px-3 py-2">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-cream/50">Leaking / mo</p>
            <p key={leaking} className="pain-count font-display text-base font-black text-cream">
              ₱{leaking.toLocaleString("en-US")}
            </p>
          </div>

          <div className="mt-3">
            <div className="flex justify-between font-mono text-[0.58rem] uppercase tracking-[0.12em] text-cream/50">
              <span>
                Leaks <span className="text-pink">{found}/6</span>
              </span>
              <span>
                Connected <span className="text-cream">0/6</span>
              </span>
            </div>
            <div className="mt-1.5 flex gap-1">
              {PAINS.map((p, i) => (
                <span
                  key={p.tag}
                  className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${i < found ? "bg-pink shadow-[0_0_8px_rgba(240,75,154,0.7)]" : "bg-cream/10"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BeHonest() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [settled, setSettled] = useState(false);

  // drop the reveal stagger once cards are in, so hover/scan transitions stay snappy
  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => setSettled(true), 1200);
    return () => clearTimeout(id);
  }, [inView]);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = gridRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // scanner walks through each pain once visible; hover takes over
  useEffect(() => {
    if (!inView || reduced || hovered !== null) return;
    const id = setInterval(() => setActive((a) => (a + 1) % PAINS.length), PAIN_STEP_MS);
    return () => clearInterval(id);
  }, [inView, reduced, hovered]);

  const cur = hovered ?? active;
  const shown = inView || reduced;
  const found = reduced ? PAINS.length : cur + 1;

  return (
    <section className="relative overflow-hidden bg-cream text-ink">
      <div
        className="pointer-events-none absolute -right-40 top-0 h-[34rem] w-[34rem] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(240,75,154,0.28), transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-[26rem] w-[26rem] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(53,214,196,0.22), transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: "radial-gradient(rgba(19,11,30,0.08) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="max-w-5xl">
          <p className="label mb-6 flex items-center gap-3 text-[#C4287A]">
            <span className="h-2 w-2 rounded-full bg-[#C4287A]" />
            Be honest
          </p>
          <h2 className="font-display text-[clamp(2.25rem,7vw,4.5rem)] font-black uppercase leading-[0.9] tracking-tight">
            <span className="block">Does your shop</span>
            <span className="block">
              feel{" "}
              <span className="relative inline-block">
                like this?
                <svg viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute -bottom-[0.12em] left-0 h-[0.22em] w-full overflow-visible" aria-hidden="true">
                  <path
                    d="M3 14 C 60 4, 120 18, 180 9 S 270 6, 297 11"
                    fill="none"
                    stroke="#F04B9A"
                    strokeWidth="6"
                    strokeLinecap="round"
                    pathLength={1}
                    strokeDasharray="1"
                    style={{ strokeDashoffset: shown ? 0 : 1, transition: "stroke-dashoffset 1.1s cubic-bezier(0.6,0,0.3,1) 0.3s" }}
                  />
                </svg>
              </span>
            </span>
          </h2>

          <div ref={gridRef} className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PAINS.map((c, i) => {
              const on = i === cur;
              return (
                <div
                  key={c.tag}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => {
                    setHovered(null);
                    setActive(i);
                  }}
                  className={`relative flex flex-col overflow-hidden rounded-2xl border p-6 backdrop-blur transition-all duration-500 ease-out ${
                    shown ? "opacity-100" : "translate-y-6 opacity-0"
                  } ${
                    on
                      ? "-translate-y-1 border-[#C4287A]/50 bg-white/80 shadow-[0_24px_50px_-24px_rgba(196,40,122,0.55)]"
                      : "border-ink/10 bg-white/40 shadow-[0_1px_0_rgba(19,11,30,0.04)]"
                  }`}
                  style={{ transitionDelay: inView && !settled ? `${i * 70}ms` : "0ms" }}
                >
                  {on && !reduced && (
                    <span
                      key={`scan-${cur}`}
                      aria-hidden="true"
                      className="ads-scan pointer-events-none absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-[#F04B9A]/15 to-transparent"
                    />
                  )}
                  <div className="relative flex items-center justify-between gap-3">
                    <span className="label text-[#C4287A]">{c.tag}</span>
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-colors duration-500 ${
                        on ? "border-[#C4287A] bg-[#C4287A] text-cream" : "border-ink/10 text-ink/40"
                      }`}
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d={c.icon} />
                      </svg>
                    </span>
                  </div>
                  <h3 className={`relative mt-5 font-display text-lg font-black leading-tight transition-transform duration-300 ${on ? "translate-x-1" : ""}`}>
                    {c.title}
                  </h3>
                  <p className="relative mb-5 mt-3 text-sm leading-relaxed text-ink/60">{c.body}</p>
                  <p
                    className={`relative mt-auto inline-flex items-center gap-1.5 self-start rounded-full border px-3 py-1 font-mono text-[0.65rem] transition-colors duration-500 ${
                      on ? "border-[#C4287A] bg-[#C4287A] text-cream" : "border-ink/15 text-ink/60"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 7l6 6 4-4 6 6M20 10v5h-5" />
                    </svg>
                    {c.metric}
                  </p>
                </div>
              );
            })}
            <div className={`h-full transition-all duration-700 sm:col-span-2 ${shown ? "opacity-100" : "translate-y-6 opacity-0"}`} style={{ transitionDelay: inView && !settled ? "420ms" : "0ms" }}>
              <PainDiagnosis active={cur} found={found} />
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-end justify-between gap-8">
            <p className="font-display text-[clamp(1.5rem,3.6vw,2.25rem)] font-black uppercase leading-[0.95] tracking-tight">
              It&apos;s not your product.
              <br />
              <span className="text-[#C4287A]">
                It&apos;s that the engines
                <br />
                aren&apos;t connected.
              </span>
            </p>
            <a
              href="#services"
              className="soft-btn-pink group inline-flex items-center gap-2 rounded-full bg-pink px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-ink transition-all hover:-translate-y-0.5 sm:text-sm"
            >
              Show me the fix
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const LIVE_POINTS = [
  { lead: "Hosts who sell, not just talk.", rest: "Trained on your product, your offers and your objections." },
  { lead: "Run-of-show for every session.", rest: "Hooks, bundles, flash deals and pinned products planned ahead." },
  { lead: "Post-LIVE review.", rest: "What worked, what didn't, what changes next session." },
];

const LIVE_HOST_PHOTO =
  "https://images.unsplash.com/photo-1599847896696-7e19dbd9d2e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900";

const LIVE_COMMENTS = [
  { user: "ria.mae", text: "pa add to cart po 🙏", tint: "from-[#F7A86B] to-pink" },
  { user: "jm.deals", text: "may stock pa?", tint: "from-teal to-[#5B7CFA]" },
  { user: "bea_shops", text: "check out na ako!", tint: "from-[#C084FC] to-pink" },
];

const LIVE_HEARTS = [
  { color: "#FFB84D", right: "8%", bottom: "46%", delay: "0s" },
  { color: "#35D6C4", right: "12%", bottom: "38%", delay: "0.9s" },
  { color: "#F04B9A", right: "6%", bottom: "32%", delay: "1.8s" },
  { color: "#FF66B2", right: "10%", bottom: "28%", delay: "2.7s" },
];

function Heart({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 drop-shadow" fill={color} aria-hidden="true">
      <path d="M12 21s-7.5-4.6-10-9.3C.4 8.4 2.3 4.5 6 4.5c2.2 0 3.5 1.2 4.2 2.3h3.6c.7-1.1 2-2.3 4.2-2.3 3.7 0 5.6 3.9 4 7.2C19.5 16.4 12 21 12 21z" />
    </svg>
  );
}

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function LivePhone() {
  return (
    <div className="relative flex items-center justify-center overflow-hidden rounded-3xl border border-cream/10 bg-ink-2 px-6 py-12 sm:py-14">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -inset-[25%]"
        style={{
          background:
            "radial-gradient(45% 40% at 50% 40%, rgba(240,75,154,0.35), transparent 70%), radial-gradient(35% 30% at 70% 80%, rgba(53,214,196,0.18), transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-[17rem]">
        {/* Floating stat chips */}
        <div className="absolute -left-10 top-24 z-20 hidden rounded-2xl border border-cream/15 bg-ink/80 px-3.5 py-2.5 shadow-xl backdrop-blur-md sm:block">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-cream/50">GMV this LIVE</p>
          <p className="mt-0.5 font-display text-base font-black text-teal">₱86,420</p>
        </div>
        <div className="absolute -right-10 bottom-28 z-20 hidden items-center gap-2 rounded-2xl border border-cream/15 bg-ink/80 px-3.5 py-2.5 shadow-xl backdrop-blur-md sm:flex">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-pink/20 text-pink">
            <svg {...iconProps} className="h-3.5 w-3.5"><path d="M5 12l5 5L20 7" /></svg>
          </span>
          <div>
            <p className="text-xs font-bold text-cream">+312 orders</p>
            <p className="text-[0.6rem] text-cream/50">in the last hour</p>
          </div>
        </div>

        {/* Phone hardware */}
        <div className="phone-float relative rounded-[2.75rem] bg-[#0A0610] p-[7px] shadow-[0_40px_80px_-25px_rgba(0,0,0,0.85),0_0_0_1px_rgba(244,239,230,0.14)]">
          <div className="absolute -left-[3px] top-24 h-10 w-[3px] rounded-l bg-[#2A2233]" />
          <div className="absolute -left-[3px] top-36 h-14 w-[3px] rounded-l bg-[#2A2233]" />
          <div className="absolute -right-[3px] top-32 h-16 w-[3px] rounded-r bg-[#2A2233]" />

          {/* Screen */}
          <div className="relative aspect-[9/19] overflow-hidden rounded-[2.35rem] bg-ink">
            <img
              src={LIVE_HOST_PHOTO}
              alt="Host showing a skincare product on a TikTok LIVE"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "58% center" }}
            />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

            {/* Status bar + dynamic island */}
            <div className="relative flex items-center justify-between px-6 pt-2.5 text-[0.6rem] font-semibold text-white">
              <span>9:41</span>
              <span className="absolute left-1/2 top-2 h-[1.15rem] w-[4.5rem] -translate-x-1/2 rounded-full bg-black" />
              <span className="flex items-center gap-1">
                <svg viewBox="0 0 18 12" className="h-2 w-3" fill="currentColor" aria-hidden="true">
                  <rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5" width="3" height="7" rx="1" /><rect x="10" y="2" width="3" height="10" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" />
                </svg>
                <span className="relative h-2 w-4 rounded-[3px] border border-white/70 p-[1px]">
                  <span className="block h-full w-3/4 rounded-[1px] bg-white" />
                </span>
              </span>
            </div>

            {/* Top bar: host + viewers */}
            <div className="relative mt-3 flex items-center justify-between px-2.5">
              <div className="flex items-center gap-1.5 rounded-full bg-black/35 py-1 pl-1 pr-1 backdrop-blur-sm">
                <span className="relative">
                  <img
                    src={LIVE_HOST_PHOTO}
                    alt=""
                    className="h-7 w-7 rounded-full object-cover ring-2 ring-pink"
                    style={{ objectPosition: "60% 25%" }}
                  />
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-[3px] bg-pink px-1 text-[0.4rem] font-black uppercase leading-[0.7rem] tracking-wide text-white">
                    Live
                  </span>
                </span>
                <div className="leading-none">
                  <p className="text-[0.62rem] font-bold text-white">glowlab.ph</p>
                  <p className="mt-0.5 text-[0.5rem] text-white/70">24.8K likes</p>
                </div>
                <span className="ml-1 rounded-full bg-pink px-2.5 py-1 text-[0.55rem] font-bold text-white">Follow</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-1.5">
                  {["from-[#F7A86B] to-pink", "from-teal to-[#5B7CFA]", "from-[#C084FC] to-pink"].map((t) => (
                    <span key={t} className={`h-5 w-5 rounded-full border border-black/40 bg-gradient-to-br ${t}`} />
                  ))}
                </div>
                <span className="rounded-full bg-black/35 px-1.5 py-0.5 text-[0.55rem] font-bold text-white backdrop-blur-sm">2.4K</span>
                <svg {...iconProps} className="h-3.5 w-3.5 text-white"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </div>
            </div>

            {/* Ranking pills */}
            <div className="relative mt-2 flex gap-1.5 px-2.5">
              <span className="flex items-center gap-1 rounded-full bg-black/30 px-2 py-0.5 text-[0.5rem] font-semibold text-white backdrop-blur-sm">
                <span className="text-[#FFB84D]">●</span> Daily ranking · Top 3
              </span>
              <span className="rounded-full bg-black/30 px-2 py-0.5 text-[0.5rem] font-semibold text-white backdrop-blur-sm">Explore</span>
            </div>

            {/* Floating hearts */}
            {LIVE_HEARTS.map((h, i) => (
              <span
                key={i}
                className="live-heart absolute"
                style={{ right: h.right, bottom: h.bottom, animationDelay: h.delay }}
              >
                <Heart color={h.color} />
              </span>
            ))}

            {/* Bottom overlay */}
            <div className="absolute inset-x-0 bottom-0 px-2.5 pb-3">
              <p className="mb-1.5 w-fit rounded-full bg-[#FF8A3D]/90 px-2 py-0.5 text-[0.52rem] font-bold text-white">
                carla.ph just bought this
              </p>
              <div className="space-y-1">
                {LIVE_COMMENTS.map((c) => (
                  <div key={c.user} className="flex items-start gap-1.5">
                    <span className={`mt-0.5 h-4 w-4 shrink-0 rounded-full bg-gradient-to-br ${c.tint}`} />
                    <p className="text-[0.58rem] leading-snug text-white">
                      <span className="font-semibold text-white/60">{c.user}</span> {c.text}
                    </p>
                  </div>
                ))}
                <p className="pl-[1.375rem] text-[0.52rem] text-white/50">kyle.ph joined</p>
              </div>

              {/* Pinned product */}
              <div className="mt-2 flex items-center gap-2 rounded-xl bg-white p-1.5 shadow-lg">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-[#FFD6E8] to-[#F7A86B]">
                  <span className="absolute left-1/2 top-1.5 h-7 w-3.5 -translate-x-1/2 rounded-md bg-white/90 shadow-sm" />
                  <span className="absolute left-1/2 top-1 h-1.5 w-2 -translate-x-1/2 rounded-sm bg-ink/80" />
                  <span className="absolute left-0 top-0 rounded-br-md bg-pink px-1 text-[0.45rem] font-black text-white">1</span>
                </div>
                <div className="min-w-0 flex-1 leading-tight">
                  <p className="text-[0.5rem] font-bold uppercase tracking-wide text-[#FF6A1A]">Bundle deal · today only</p>
                  <p className="truncate text-[0.6rem] font-semibold text-ink">Glow Serum Set (3 pcs)</p>
                  <p className="text-[0.62rem] font-black text-pink">
                    ₱299 <span className="text-[0.5rem] font-medium text-ink/40 line-through">₱599</span>
                  </p>
                </div>
                <span className="rounded-md bg-pink px-3 py-1.5 text-[0.58rem] font-bold text-white">Buy</span>
              </div>

              {/* Action bar */}
              <div className="mt-2 flex items-center gap-2 text-white">
                <span className="flex-1 rounded-full bg-white/15 px-3 py-1.5 text-[0.55rem] text-white/60 backdrop-blur-sm">
                  Add comment...
                </span>
                <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[#FF8A3D]">
                  <svg {...iconProps} className="h-3.5 w-3.5"><path d="M6 7h12l-1 13H7L6 7z" /><path d="M9 7a3 3 0 016 0" /></svg>
                  <span className="absolute -right-1 -top-1 rounded-full bg-pink px-1 text-[0.42rem] font-black leading-[0.7rem]">12</span>
                </span>
                <svg {...iconProps} className="h-4 w-4"><rect x="3" y="8" width="18" height="13" rx="2" /><path d="M12 8v13M3 12h18M12 8c-2-4-6-4-6-1.5S10 8 12 8zm0 0c2-4 6-4 6-1.5S14 8 12 8z" /></svg>
                <svg {...iconProps} className="h-4 w-4"><path d="M14 5l7 7-7 7v-4c-6 0-9 2-11 5 1-6 4-10 11-11V5z" /></svg>
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-pink" fill="currentColor" aria-hidden="true">
                  <path d="M12 21s-7.5-4.6-10-9.3C.4 8.4 2.3 4.5 6 4.5c2.2 0 3.5 1.2 4.2 2.3h3.6c.7-1.1 2-2.3 4.2-2.3 3.7 0 5.6 3.9 4 7.2C19.5 16.4 12 21 12 21z" />
                </svg>
              </div>
            </div>
            <span className="absolute bottom-1 left-1/2 h-1 w-20 -translate-x-1/2 rounded-full bg-white/60" />
          </div>
        </div>
      </div>
    </div>
  );
}

const AFFILIATE_POINTS = [
  { lead: "Matched creators, not random ones.", rest: "Picked for your category and your buyer." },
  { lead: "Briefs that convert.", rest: "Hooks, angles and talking points so their videos sell." },
  { lead: "Affiliate CRM.", rest: "We follow up, re-activate, and reward the ones who perform." },
];

const avatar = (id: string) =>
  `https://images.unsplash.com/photo-${id}?crop=faces&fit=crop&w=160&h=160&q=80&auto=format`;

/** Seconds per pulse cycle; nodes are staggered evenly across it. */
const FLOW_CYCLE = 4.5;

/**
 * Creator nodes around "YOUR SHOP". x/y/size are % of the square card.
 * `sale` pops out of the shop each time this creator's pulse arrives.
 */
const CREATOR_NODES = [
  { x: 25, y: 26, size: 15, photo: avatar("1780396700817-2ec700591808"), handle: "@creator", stat: "5 vids / wk", videos: 22, gmv: "₱31.6k", sale: 1240, label: true },
  { x: 75, y: 22, size: 12, photo: avatar("1579420593648-0deba81fd762"), handle: "@reviewer", stat: "4.9★ reviews", videos: 14, gmv: "₱18.2k", sale: 860, label: true },
  { x: 87, y: 56, size: 12, photo: avatar("1542909168-82c3e7fdca5c"), handle: "@jaybuys.ph", stat: "Tech & gadgets", videos: 11, gmv: "₱12.9k", sale: 2150 },
  { x: 70, y: 79, size: 15, photo: avatar("1550478869-1f9d247b6980"), handle: "@niunie", stat: "Niunies creator", videos: 27, gmv: "₱38.4k", sale: 1680, label: true, niunie: true },
  { x: 30, y: 82, size: 11, photo: avatar("1600481176431-47ad2ab2745d"), handle: "@mika.finds", stat: "Beauty hauls", videos: 9, gmv: "₱9.7k", sale: 540 },
  { x: 12, y: 55, size: 10, photo: avatar("1534751516642-a1af1ef26a56"), handle: "@ate.reviews", stat: "Home & living", videos: 16, gmv: "₱14.1k", sale: 980 },
].map((n, i) => ({ ...n, delay: (i * FLOW_CYCLE) / 6 }));

const peso = (v: number) => `₱${Math.round(v).toLocaleString("en-PH")}`;

/** GMV that climbs each time a sale pops out of the shop, tweened for a live-dashboard feel. */
function useGmvTicker(start: number) {
  const [value, setValue] = useState(start);
  const [bump, setBump] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let target = start;
    let shown = start;
    let frame = 0;
    let tick = 0;
    const tween = () => {
      shown += (target - shown) * 0.12;
      if (target - shown < 1) shown = target;
      setValue(shown);
      if (shown !== target) frame = requestAnimationFrame(tween);
    };
    const addSale = () => {
      target += CREATOR_NODES[tick % CREATOR_NODES.length].sale;
      tick += 1;
      setBump(tick);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(tween);
    };
    // First pop lands once the first pulse reaches the shop (~45% into its cycle).
    let interval = 0;
    const first = window.setTimeout(() => {
      addSale();
      interval = window.setInterval(addSale, (FLOW_CYCLE / CREATOR_NODES.length) * 1000);
    }, FLOW_CYCLE * 0.45 * 1000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
      cancelAnimationFrame(frame);
    };
  }, [start]);
  return { value, bump };
}

function CreatorNetwork() {
  const [active, setActive] = useState<number | null>(null);
  const gmv = useGmvTicker(128400);

  return (
    <div
      className="relative aspect-square w-full overflow-hidden rounded-3xl border border-cream/10"
      style={{
        background:
          "radial-gradient(55% 55% at 50% 50%, rgba(53,214,196,0.26), transparent 72%), radial-gradient(60% 50% at 80% 100%, rgba(240,75,154,0.16), transparent 70%), radial-gradient(50% 40% at 0% 0%, rgba(120,60,140,0.2), transparent 70%), #1C1329",
      }}
      onPointerLeave={() => setActive(null)}
    >
      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(rgba(244,239,230,0.12) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(circle at 50% 50%, black 30%, transparent 75%)",
        }}
      />

      {/* Orbits + connection lines */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <circle cx="50" cy="50" r="22" fill="none" stroke="#F4EFE6" strokeOpacity="0.07" strokeWidth="0.3" />
        <circle cx="50" cy="50" r="36" fill="none" stroke="#F4EFE6" strokeOpacity="0.05" strokeWidth="0.3" strokeDasharray="0.8 1.4" />
        {CREATOR_NODES.map((n, i) => {
          const color = n.niunie ? "#F04B9A" : "#35D6C4";
          const dim = active !== null && active !== i;
          const lit = active === i;
          return (
            <g key={n.photo} className="transition-opacity duration-300" style={{ opacity: dim ? 0.15 : 1 }}>
              <line
                x1={n.x}
                y1={n.y}
                x2="50"
                y2="50"
                stroke={lit ? color : "#35D6C4"}
                strokeOpacity={lit ? 0.9 : 0.35}
                strokeWidth={lit ? 0.6 : 0.35}
                strokeDasharray="1.4 1.2"
                className="transition-all duration-300"
              />
              {/* Bright pulse travelling from the creator into the shop */}
              <line
                x1={n.x}
                y1={n.y}
                x2="50"
                y2="50"
                pathLength={100}
                stroke={color}
                strokeWidth="0.8"
                strokeLinecap="round"
                className="flow-line"
                style={{ animationDelay: `${n.delay}s`, animationDuration: `${FLOW_CYCLE}s` }}
              />
            </g>
          );
        })}
      </svg>

      {/* Centre: your shop */}
      <div className="absolute left-1/2 top-1/2 w-[26%] -translate-x-1/2 -translate-y-1/2">
        <span className="pulse-ring absolute inset-0 rounded-full border border-teal/60" />
        <span className="pulse-ring absolute inset-0 rounded-full border border-teal/60" style={{ animationDelay: "1.5s" }} />
        <div className="relative flex aspect-square flex-col items-center justify-center rounded-full bg-teal text-ink shadow-[0_0_60px_rgba(53,214,196,0.55),inset_0_-8px_18px_rgba(19,11,30,0.25)]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1 h-[22%] w-[22%]" aria-hidden="true">
            <path d="M6 7h12l-1 13H7L6 7z" />
            <path d="M9 7a3 3 0 0 1 6 0" />
          </svg>
          <span className="font-mono text-[clamp(0.5rem,1.6vw,0.7rem)] font-bold uppercase leading-tight tracking-[0.12em]">
            Your
            <br />
            Shop
          </span>
        </div>
      </div>

      {/* Sales popping out of the shop as each pulse lands */}
      {CREATOR_NODES.map((n, i) => (
        <div
          key={`sale-${n.photo}`}
          aria-hidden="true"
          className="pointer-events-none absolute top-[35%] -translate-x-1/2"
          style={{ left: `${i % 2 ? 60 : 40}%` }}
        >
          <span
            className={`sale-pop block whitespace-nowrap rounded-full border px-2 py-0.5 font-mono text-[0.6rem] font-bold shadow-lg backdrop-blur-md ${
              n.niunie ? "border-pink/40 bg-ink/80 text-pink" : "border-teal/40 bg-ink/80 text-teal"
            }`}
            style={{ animationDelay: `${n.delay}s`, animationDuration: `${FLOW_CYCLE}s` }}
          >
            +{peso(n.sale)}
          </span>
        </div>
      ))}

      {/* Creator avatars */}
      {CREATOR_NODES.map((n, i) => {
        const isActive = active === i;
        const dim = active !== null && !isActive;
        const cardAbove = n.y > 70;
        // Keep the stats card inside the card on the far-left / far-right nodes.
        const cardX = n.x < 20 ? "left-0" : n.x > 80 ? "right-0" : "left-1/2 -translate-x-1/2";
        return (
          <div
            key={n.photo}
            className={`absolute -translate-x-1/2 -translate-y-1/2 ${isActive ? "z-30" : "z-10"}`}
            style={{ left: `${n.x}%`, top: `${n.y}%`, width: `${n.size}%` }}
          >
            <div className="avatar-float" style={{ animationDelay: `${-i * 1.1}s` }}>
              <button
                type="button"
                aria-label={`${n.handle}: ${n.videos} videos, ${n.gmv} GMV`}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                onClick={() => setActive(isActive ? null : i)}
                className={`relative block aspect-square w-full cursor-pointer rounded-full p-[3px] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream ${
                  n.niunie ? "bg-gradient-to-br from-pink to-[#FF9BC9]" : "bg-gradient-to-br from-teal to-[#1E8F84]"
                } ${isActive ? "scale-110 shadow-[0_0_32px_rgba(53,214,196,0.55)]" : "shadow-[0_8px_24px_rgba(0,0,0,0.45)]"} ${
                  dim ? "opacity-40 saturate-50" : ""
                }`}
              >
                <img src={n.photo} alt="" loading="lazy" className="h-full w-full rounded-full border-2 border-ink-2 object-cover" />
                {n.label && (
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 flex h-[34%] w-[34%] items-center justify-center rounded-full border-2 border-ink-2 ${
                      n.niunie ? "bg-pink" : "bg-teal"
                    } text-ink`}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-1/2 w-1/2" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                )}
              </button>

              {n.label && !isActive && (
                <div
                  className={`pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-cream/10 bg-ink/85 px-2.5 py-1 text-center shadow-lg backdrop-blur-md transition-opacity duration-300 ${
                    dim ? "opacity-40" : ""
                  }`}
                >
                  <p className="font-mono text-[0.6rem] font-bold leading-none text-cream">{n.handle}</p>
                  <p className={`mt-0.5 font-mono text-[0.5rem] leading-none ${n.niunie ? "text-pink" : "text-teal"}`}>{n.stat}</p>
                </div>
              )}

              {/* Hover / tap stats card */}
              <div
                className={`pointer-events-none absolute ${cardX} w-max rounded-2xl border bg-ink/90 px-3.5 py-2.5 shadow-2xl backdrop-blur-md transition-all duration-300 ${
                  cardAbove ? "bottom-full mb-3" : "top-full mt-3"
                } ${n.niunie ? "border-pink/40" : "border-teal/40"} ${
                  isActive ? "translate-y-0 opacity-100" : `${cardAbove ? "translate-y-1" : "-translate-y-1"} opacity-0`
                }`}
              >
                <p className="font-mono text-[0.65rem] font-bold leading-none text-cream">{n.handle}</p>
                <p className={`mt-1 font-mono text-[0.5rem] uppercase tracking-[0.14em] ${n.niunie ? "text-pink" : "text-teal"}`}>{n.stat}</p>
                <div className="mt-2 flex gap-4 border-t border-cream/10 pt-2">
                  <div>
                    <p className="font-display text-sm font-black leading-none text-cream">{n.videos}</p>
                    <p className="mt-1 font-mono text-[0.5rem] uppercase tracking-[0.14em] text-cream/50">Videos</p>
                  </div>
                  <div>
                    <p className="font-display text-sm font-black leading-none text-cream">{n.gmv}</p>
                    <p className="mt-1 font-mono text-[0.5rem] uppercase tracking-[0.14em] text-cream/50">GMV</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Live GMV chip */}
      <div className="absolute left-1/2 top-[5%] z-20 -translate-x-1/2 whitespace-nowrap rounded-2xl border border-cream/15 bg-ink/80 px-3.5 py-2 shadow-xl backdrop-blur-md">
        <p className="flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-cream/50">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal" />
          </span>
          Affiliate GMV · 30d
        </p>
        <p className="mt-0.5 flex items-baseline gap-2 font-display text-sm font-black tabular-nums text-cream sm:text-base">
          <span key={gmv.bump} className={gmv.bump ? "gmv-flash" : undefined}>{peso(gmv.value)}</span>
          <span className="font-mono text-[0.6rem] font-bold text-teal">▲ 42%</span>
        </p>
      </div>
    </div>
  );
}

const ADS_POINTS = [
  { lead: "Winner-first spending.", rest: "We scale what's converting and cut what isn't, fast." },
  { lead: "Creative fed by your other engines.", rest: "Best LIVE moments and affiliate videos become ad fuel." },
  { lead: "Clear reporting.", rest: "You'll always know where your money went and what it brought back." },
];

/**
 * Ad creatives in the GMV Max card. Every creative starts on an even ₱10k test
 * budget, then spend shifts to `spend` (in ₱k). Bar width = spend / AD_SCALE_MAX.
 */
const AD_START_SPEND = 10;
const AD_SCALE_MAX = 30;
const AD_BUDGET = 50;
const AD_BARS = [
  { label: "Video A", spend: 4.1, roas: 1.2, hue: "from-[#6B5B8C] to-[#3B2F55]" },
  { label: "LIVE clip", spend: 21.6, roas: 5.4, hue: "from-pink to-[#FF9BC9]", winner: true },
  { label: "Video C", spend: 5.2, roas: 1.6, hue: "from-[#5B7CFA] to-[#3B2F55]" },
  { label: "Affiliate", spend: 16.9, roas: 4.7, hue: "from-teal to-[#1E8F84]", winner: true },
  { label: "Video E", spend: 2.2, roas: 0.8, hue: "from-[#8C6B5B] to-[#3B2F55]", paused: true },
];
const AD_SORTED = AD_BARS.map((_, i) => i).sort((a, b) => AD_BARS[b].spend - AD_BARS[a].spend);
const AD_TOP = AD_BARS[AD_SORTED[0]];
const ROAS_START = 2.6;
const ROAS_END = 4.2;

type AdPhase = "test" | "learn" | "scale";
const AD_PHASES: { id: AdPhase; label: string; title: string; pill: string; ms: number }[] = [
  { id: "test", label: "Test", title: "Testing 5 creatives", pill: "Testing creatives", ms: 2000 },
  { id: "learn", label: "Learn", title: "Reading the signals", pill: "Finding winners", ms: 2500 },
  { id: "scale", label: "Scale", title: "Budget auto-shifting", pill: "Scaling winners ↑", ms: 4500 },
];
/** Row pitch in rem; rows are absolutely stacked so they can slide when re-ranked. */
const AD_ROW = 2.75;

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const pesoK = (k: number) => `₱${k.toFixed(1)}k`;

/** Drives the Test → Learn → Scale loop: phase, rebalance progress (0–1), and ranking. */
function useAdsLoop() {
  const [phase, setPhase] = useState<AdPhase>("test");
  const [progress, setProgress] = useState(0);
  const [ranked, setRanked] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("scale");
      setProgress(1);
      setRanked(true);
      return;
    }
    const timers: number[] = [];
    let frame = 0;
    let p = 0;
    const tweenTo = (target: number, ms: number) => {
      cancelAnimationFrame(frame);
      const from = p;
      const t0 = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / ms);
        p = from + (target - from) * easeInOut(t);
        setProgress(p);
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));

    const run = () => {
      const [test, learn, scale] = AD_PHASES;
      setPhase("test");
      setRanked(false);
      tweenTo(0, 900);
      later(() => setPhase("learn"), test.ms);
      later(() => {
        setPhase("scale");
        tweenTo(1, 1600);
        later(() => setRanked(true), 1800);
      }, test.ms + learn.ms);
      later(run, test.ms + learn.ms + scale.ms);
    };
    run();
    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(frame);
    };
  }, []);

  return { phase, progress, ranked };
}

function AdsBudget() {
  const { phase, progress, ranked } = useAdsLoop();
  const phaseIdx = AD_PHASES.findIndex((p) => p.id === phase);
  const current = AD_PHASES[phaseIdx];

  const spendOf = (i: number) => AD_START_SPEND + (AD_BARS[i].spend - AD_START_SPEND) * progress;
  const winnersShare = AD_BARS.reduce((sum, b, i) => sum + (b.winner ? spendOf(i) : 0), 0) / AD_BUDGET;
  const roas = ROAS_START + (ROAS_END - ROAS_START) * progress;
  const order = ranked ? AD_SORTED : AD_BARS.map((_, i) => i);

  return (
    <div
      className="relative flex w-full flex-col justify-center overflow-hidden rounded-3xl border border-cream/10 p-6 sm:p-10 lg:aspect-square"
      style={{
        background:
          "radial-gradient(60% 50% at 50% 40%, rgba(245,185,79,0.22), transparent 72%), radial-gradient(55% 45% at 90% 100%, rgba(240,75,154,0.18), transparent 70%), radial-gradient(50% 40% at 0% 100%, rgba(120,60,140,0.22), transparent 70%), #1C1329",
      }}
    >
      {/* Faint grid lines behind the chart */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(244,239,230,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(244,239,230,0.05) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(circle at 50% 50%, black 25%, transparent 75%)",
        }}
      />

      <div className="relative">
        {/* Test → Learn → Scale */}
        <ol className="mb-6 grid grid-cols-3 gap-2" aria-label="GMV Max process">
          {AD_PHASES.map((p, i) => {
            const done = i < phaseIdx;
            const on = i === phaseIdx;
            return (
              <li key={p.id}>
                <p
                  className={`font-mono text-[0.55rem] uppercase tracking-[0.16em] transition-colors duration-300 ${
                    on ? "text-amber" : done ? "text-cream/60" : "text-cream/30"
                  }`}
                >
                  <span className="opacity-60">0{i + 1}</span> {p.label}
                </p>
                <span className="mt-1.5 block h-0.5 overflow-hidden rounded-full bg-cream/10">
                  <span
                    key={on ? `${p.id}-on` : p.id}
                    className={`block h-full rounded-full bg-amber ${on ? "phase-fill" : ""}`}
                    style={{ width: done ? "100%" : on ? undefined : "0%", animationDuration: `${p.ms}ms` }}
                  />
                </span>
              </li>
            );
          })}
        </ol>

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-amber">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
              </span>
              GMV Max · Live
            </p>
            <p key={current.id} className="phase-title mt-1.5 font-display text-sm font-black text-cream sm:text-base">
              {current.title}
            </p>
          </div>
          <div className="rounded-2xl border border-cream/15 bg-ink/70 px-3 py-2 text-right shadow-xl backdrop-blur-md">
            <p className="font-mono text-[0.5rem] uppercase tracking-[0.18em] text-cream/50">Blended ROAS</p>
            <p className="mt-0.5 flex items-baseline justify-end gap-1.5 font-display text-base font-black tabular-nums text-cream sm:text-lg">
              {roas.toFixed(1)}x
              <span
                className={`font-mono text-[0.55rem] font-bold text-amber transition-opacity duration-300 ${
                  progress > 0.05 ? "opacity-100" : "opacity-0"
                }`}
              >
                ▲ {(roas - ROAS_START).toFixed(1)}x
              </span>
            </p>
          </div>
        </div>

        {/* Bars: absolutely stacked so winners can slide to the top */}
        <div className="relative mt-7" style={{ height: `${AD_BARS.length * AD_ROW}rem` }}>
          {AD_BARS.map((b, i) => {
            const rank = order.indexOf(i);
            const spend = spendOf(i);
            const paused = b.paused && ranked;
            const revealed = phase !== "test";
            return (
              <div
                key={b.label}
                className="absolute inset-x-0 top-0 flex items-center gap-3 transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
                style={{ height: `${AD_ROW}rem`, transform: `translateY(${rank * AD_ROW}rem)` }}
              >
                <span
                  aria-hidden="true"
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br transition-all duration-500 ${b.hue} ${
                    b.winner && revealed ? "shadow-[0_0_16px_rgba(240,75,154,0.35)]" : ""
                  } ${!b.winner && revealed ? "opacity-70 saturate-50" : ""} ${paused ? "grayscale" : ""}`}
                >
                  {paused ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 text-cream/80">
                      <path d="M7 5h3v14H7zM14 5h3v14h-3z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 text-cream/90">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </span>
                <div className="w-[4.75rem] shrink-0">
                  <p
                    className={`whitespace-nowrap font-mono text-[0.6rem] leading-none transition-colors duration-500 ${
                      b.winner && revealed ? "font-bold text-cream" : paused ? "text-cream/40" : "text-cream/70"
                    }`}
                  >
                    {b.label}
                  </p>
                  <p className="relative mt-1 h-[0.5rem] whitespace-nowrap font-mono text-[0.5rem] uppercase leading-none tracking-[0.12em]">
                    <span className={`absolute left-0 text-cream/35 transition-opacity duration-300 ${revealed ? "opacity-0" : "opacity-100"}`}>
                      Testing…
                    </span>
                    <span
                      className={`absolute left-0 transition-opacity duration-300 ${revealed ? "opacity-100" : "opacity-0"} ${
                        paused ? "text-cream/40" : b.winner ? "text-pink" : "text-cream/40"
                      }`}
                      style={{ transitionDelay: phase === "learn" ? `${250 + i * 440}ms` : "0ms" }}
                    >
                      {paused ? "❚❚ Paused" : b.winner ? "▲ Scale" : "▼ Cut"} · {b.roas.toFixed(1)}x
                    </span>
                  </p>
                </div>
                <span className="relative h-3.5 flex-1 overflow-hidden rounded-full bg-[#2A1F3D]">
                  <span
                    className={`relative block h-full overflow-hidden rounded-full transition-[filter,opacity] duration-500 ${
                      b.winner
                        ? "bg-gradient-to-r from-amber to-pink shadow-[0_0_14px_rgba(240,75,154,0.45)]"
                        : "bg-gradient-to-r from-[#B8955A] to-amber"
                    } ${paused ? "opacity-40 grayscale" : ""}`}
                    style={{ width: `${(spend / AD_SCALE_MAX) * 100}%` }}
                  >
                    {b.winner && phase === "scale" && <span className="bar-shimmer absolute inset-y-0 w-1/3" />}
                  </span>
                </span>
                <span
                  className={`w-11 shrink-0 text-right font-mono text-[0.6rem] tabular-nums transition-colors duration-500 ${
                    b.winner && revealed ? "font-bold text-cream" : "text-cream/50"
                  }`}
                >
                  {pesoK(spend)}
                </span>
              </div>
            );
          })}

          {/* Scanner sweeping the rows while GMV Max "learns" */}
          {phase === "learn" && (
            <span aria-hidden="true" className="ads-scan pointer-events-none absolute inset-x-0 h-10 -translate-y-full">
              <span className="absolute inset-0 bg-gradient-to-b from-transparent to-amber/15" />
              <span className="absolute inset-x-0 bottom-0 h-px bg-amber shadow-[0_0_12px_2px_rgba(245,185,79,0.7)]" />
            </span>
          )}

          {/* Toast: budget moved to the top winner */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute -top-6 right-14 whitespace-nowrap rounded-full border border-pink/40 bg-ink/85 px-2.5 py-1 font-mono text-[0.55rem] font-bold text-pink shadow-lg backdrop-blur-md transition-all duration-500 ${
              ranked ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            +₱{Math.round((AD_TOP.spend - AD_START_SPEND) * 1000).toLocaleString("en-PH")} → {AD_TOP.label}
          </span>
        </div>

        {/* Footer */}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-cream/10 pt-5">
          <span
            key={current.id}
            className={`phase-title inline-flex items-center gap-1 rounded-full px-3 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.12em] ${
              phase === "scale" ? "scale-pill bg-amber text-ink" : "border border-amber/50 text-amber"
            }`}
          >
            {current.pill}
          </span>
          <div className="flex gap-5 text-right">
            <div>
              <p className="font-display text-sm font-black leading-none text-cream">₱{(AD_BUDGET * 1000).toLocaleString("en-PH")}</p>
              <p className="mt-1 font-mono text-[0.5rem] uppercase tracking-[0.14em] text-cream/50">Daily budget</p>
            </div>
            <div>
              <p className="font-display text-sm font-black leading-none tabular-nums text-amber">{Math.round(winnersShare * 100)}%</p>
              <p className="mt-1 font-mono text-[0.5rem] uppercase tracking-[0.14em] text-cream/50">On winners</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CONTENT_POINTS = [
  { lead: "Hook-first scripting.", rest: "Taglish, trend-aware, and written for your actual buyer." },
  { lead: "Shoot, edit, post.", rest: "We handle production so your team can run the business." },
  { lead: "Testing built in.", rest: "Multiple angles per product so we find what lands." },
];

const tiktokPhoto = (id: string) =>
  `https://images.unsplash.com/photo-${id}?crop=entropy&fit=crop&w=420&h=900&q=75&auto=format`;

/** Seconds each video "plays" before the spotlight moves to the next angle. */
const CONTENT_CYCLE = 3.4;

/** Sample TikTok videos shown on the three phones. `width` is % of the card, `y` nudges each phone (%). */
const CONTENT_VIDEOS = [
  {
    hook: "Huwag mo 'tong bilhin kung...",
    photo: tiktokPhoto("1748944680238-6748810e5579"),
    sticker: "bg-[#E04BA5] text-cream",
    tint: "from-[#E04BA5]/30 to-[#7E2C8C]/40",
    glow: "rgba(224,75,165,0.55)",
    width: "29%",
    y: "4%",
    handle: "glowbyana",
    caption: "Akala ko hype lang. Hindi pala.",
    tags: "#skincare #TikTokShopPH",
    product: "Glow Serum 30ml",
    price: "₱299",
    sold: "4.1K sold",
    likes: "48.2K",
    comments: "1,204",
    saves: "6,310",
    shares: "2,045",
    views: "612K",
    hold: "64%",
    orders: "+1,180",
  },
  {
    hook: "POV: sold out ulit",
    photo: tiktokPhoto("1607687441809-dd332b5b9c18"),
    sticker: "bg-[#2FBFB2] text-ink",
    tint: "from-[#2FBFB2]/25 to-[#1D4F66]/45",
    glow: "rgba(47,191,178,0.55)",
    width: "27%",
    y: "8%",
    handle: "shop.dailyfinds",
    caption: "Restock day na naman, mga besh.",
    tags: "#sellingfast #TikTokShopPH",
    product: "Everyday Tote Bag",
    price: "₱459",
    sold: "2.6K sold",
    likes: "31.7K",
    comments: "866",
    saves: "3,982",
    shares: "1,120",
    views: "438K",
    hold: "58%",
    orders: "+742",
  },
  {
    hook: "3 reasons bakit",
    photo: tiktokPhoto("1609405979808-08669e982546"),
    sticker: "bg-[#E9AE52] text-ink",
    tint: "from-[#E9AE52]/25 to-[#B9503A]/40",
    glow: "rgba(233,174,82,0.55)",
    width: "29%",
    y: "-6%",
    handle: "ate.reviews",
    caption: "Number 3 ang game changer talaga.",
    tags: "#review #TikTokShopPH",
    product: "MagGrip Phone Stand",
    price: "₱349",
    sold: "9.8K sold",
    likes: "92.4K",
    comments: "3,410",
    saves: "12.6K",
    shares: "5,870",
    views: "1.2M",
    hold: "71%",
    orders: "+2,960",
    winner: true,
  },
];

const HEART_PATH = "M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z";

/** One TikTok "For You" screen inside a phone frame. All inner sizes use cqw so the UI scales with the phone. */
function TikTokPhone({ v, on, progressKey, autoplay }: { v: (typeof CONTENT_VIDEOS)[number]; on: boolean; progressKey: string; autoplay: boolean }) {
  const rail = [
    { d: HEART_PATH, n: v.likes, fill: true, hot: on },
    { d: "M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z", n: v.comments, fill: true },
    { d: "M6 3h12v18l-6-4-6 4V3z", n: v.saves, fill: true },
    { d: "M14 5l7 7-7 7v-4c-5 0-8 1.5-10 5 .5-5.5 3-10 10-10V5z", n: v.shares, fill: true },
  ];
  return (
    <div className="@container relative aspect-[9/19.5] w-full">
      {/* Side buttons */}
      <span className="absolute -left-[1.2cqw] top-[18%] h-[7%] w-[1.6cqw] rounded-l-sm bg-[#2A2233]" />
      <span className="absolute -left-[1.2cqw] top-[27%] h-[10%] w-[1.6cqw] rounded-l-sm bg-[#2A2233]" />
      <span className="absolute -right-[1.2cqw] top-[24%] h-[14%] w-[1.6cqw] rounded-r-sm bg-[#2A2233]" />

      {/* Frame */}
      <div className="absolute inset-0 rounded-[15cqw] bg-gradient-to-b from-[#3A3045] to-[#15101C] p-[2.2cqw] shadow-[inset_0_0_0_1px_rgba(244,239,230,0.18)]">
        <div className="relative h-full w-full overflow-hidden rounded-[13cqw] bg-black text-cream">
          {/* Video */}
          <img src={v.photo} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <span className={`absolute inset-0 bg-gradient-to-b ${v.tint}`} />
          <span className="absolute inset-x-0 top-0 h-[22%] bg-gradient-to-b from-black/60 to-transparent" />
          <span className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          {/* Dynamic island */}
          <span className="absolute left-1/2 top-[2.4cqw] h-[7.5cqw] w-[28cqw] -translate-x-1/2 rounded-full bg-black" />

          {/* Status bar */}
          <div className="absolute inset-x-[8cqw] top-[3.4cqw] flex items-center justify-between text-[4.4cqw] font-semibold leading-none">
            <span>9:41</span>
            <span className="flex items-center gap-[1.2cqw]">
              <svg viewBox="0 0 18 12" fill="currentColor" className="h-[3.4cqw] w-[5cqw]" aria-hidden="true">
                <rect x="0" y="8" width="3" height="4" rx="0.6" />
                <rect x="5" y="5.5" width="3" height="6.5" rx="0.6" />
                <rect x="10" y="3" width="3" height="9" rx="0.6" />
                <rect x="15" y="0" width="3" height="12" rx="0.6" />
              </svg>
              <span className="relative flex h-[3.6cqw] w-[7cqw] items-center rounded-[1cqw] border-[0.4cqw] border-cream/60 p-[0.5cqw]">
                <span className="h-full w-[75%] rounded-[0.5cqw] bg-cream" />
              </span>
            </span>
          </div>

          {/* Top nav */}
          <div className="absolute inset-x-[5cqw] top-[13cqw] flex items-center justify-between">
            <span className="rounded-[1.2cqw] border-[0.4cqw] border-cream/80 px-[1.2cqw] py-[0.3cqw] text-[3.2cqw] font-black leading-none">LIVE</span>
            <span className="flex items-end gap-[3.5cqw] text-[4.6cqw] font-bold leading-none">
              <span className="text-cream/60">Following</span>
              <span className="relative">
                For You
                <span className="absolute -bottom-[1.8cqw] left-1/2 h-[0.7cqw] w-[6cqw] -translate-x-1/2 rounded-full bg-cream" />
              </span>
            </span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" className="h-[5.5cqw] w-[5.5cqw]" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
          </div>

          {/* Hook as a TikTok text sticker */}
          <div className="absolute inset-x-[7cqw] top-[29%] text-center">
            {v.winner && (
              <span className="mb-[2cqw] inline-block rounded-full bg-amber px-[2.4cqw] py-[0.8cqw] font-mono text-[3.4cqw] font-bold leading-none tracking-[0.08em] text-ink shadow-md">
                ★ WINNER
              </span>
            )}
            <p className="font-display text-[6.4cqw] font-black uppercase leading-[1.55]">
              <span className={`box-decoration-clone rounded-[1.2cqw] px-[1.8cqw] py-[0.6cqw] ${v.sticker}`}>{v.hook}</span>
            </p>
          </div>

          {/* Paused state */}
          <span
            className={`absolute left-1/2 top-1/2 flex h-[18cqw] w-[18cqw] -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-all duration-300 ${
              on ? "scale-75 opacity-0" : "opacity-100"
            }`}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full text-cream/55 drop-shadow" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>

          {/* Action rail */}
          <div className="absolute bottom-[30%] right-[2.5cqw] flex flex-col items-center gap-[3.6cqw]">
            <span className="relative mb-[2cqw] block h-[11cqw] w-[11cqw]">
              <img src={v.photo} alt="" className="h-full w-full rounded-full border-[0.6cqw] border-cream object-cover" />
              <span className="absolute -bottom-[2cqw] left-1/2 flex h-[4.6cqw] w-[4.6cqw] -translate-x-1/2 items-center justify-center rounded-full bg-[#FE2C55] text-[4cqw] font-bold leading-none">
                +
              </span>
            </span>
            {rail.map((a) => (
              <span key={a.d} className="relative flex flex-col items-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`h-[8cqw] w-[8cqw] drop-shadow transition-colors duration-300 ${a.hot ? "text-[#FE2C55]" : "text-cream"}`}
                  aria-hidden="true"
                >
                  <path d={a.d} />
                </svg>
                <span className="mt-[0.8cqw] text-[3.2cqw] font-bold leading-none drop-shadow">{a.n}</span>
                {/* Hearts rising off the like button while playing */}
                {a.hot &&
                  [0, 1, 2].map((h) => (
                    <svg
                      key={`${progressKey}-${h}`}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="content-heart absolute left-1/2 top-0 h-[6cqw] w-[6cqw] -translate-x-1/2"
                      style={{ animationDelay: `${h * 0.7}s`, color: ["#FE2C55", "#F5B94F", "#35D6C4"][h] }}
                    >
                      <path d={HEART_PATH} />
                    </svg>
                  ))}
              </span>
            ))}
            {/* Spinning sound disc */}
            <span className={`disc-spin mt-[1cqw] flex h-[10cqw] w-[10cqw] items-center justify-center rounded-full bg-gradient-to-br from-[#3A3A3A] to-[#111] ${on ? "" : "[animation-play-state:paused]"}`}>
              <img src={v.photo} alt="" className="h-[5.5cqw] w-[5.5cqw] rounded-full object-cover" />
            </span>
          </div>

          {/* Caption block */}
          <div className="absolute bottom-[14cqw] left-[4cqw] right-[17cqw] text-left">
            {/* TikTok Shop product anchor */}
            <div className="mb-[2.4cqw] flex items-center gap-[1.8cqw] rounded-[2cqw] bg-black/55 p-[1.6cqw] backdrop-blur-sm">
              <span className="flex h-[8cqw] w-[8cqw] shrink-0 items-center justify-center rounded-[1.4cqw] bg-[#FFC83D] text-ink">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" className="h-[5cqw] w-[5cqw]" aria-hidden="true">
                  <path d="M4 8h16l-1.6 12H5.6L4 8z" />
                  <path d="M9 11V6a3 3 0 0 1 6 0v5" />
                </svg>
              </span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block truncate text-[3.4cqw] font-semibold">{v.product}</span>
                <span className="block text-[3.2cqw] leading-tight">
                  <span className="font-bold text-[#FFC83D]">{v.price}</span> <span className="text-cream/60">· {v.sold}</span>
                </span>
              </span>
            </div>
            <p className="text-[4.2cqw] font-bold leading-tight">@{v.handle}</p>
            <p className="mt-[1cqw] text-[3.6cqw] leading-snug text-cream/90">
              {v.caption} <span className="font-semibold">{v.tags}</span>
            </p>
            <p className="mt-[1.4cqw] flex items-center gap-[1.2cqw] overflow-hidden whitespace-nowrap text-[3.4cqw] leading-none text-cream/90">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-[3.6cqw] w-[3.6cqw] shrink-0" aria-hidden="true">
                <path d="M9 18V6l11-2v12" stroke="currentColor" strokeWidth="2" fill="none" />
                <circle cx="6.5" cy="18" r="2.5" />
                <circle cx="17.5" cy="16" r="2.5" />
              </svg>
              <span className="truncate">original sound - {v.handle}</span>
            </p>
          </div>

          {/* Playback progress */}
          <span className="absolute inset-x-0 bottom-[12cqw] h-[0.6cqw] bg-cream/20">
            {on && (
              <span
                key={progressKey}
                className={`block h-full bg-cream ${autoplay ? "content-progress" : "w-full"}`}
                style={{ animationDuration: `${CONTENT_CYCLE}s` }}
              />
            )}
          </span>

          {/* Bottom nav */}
          <div className="absolute inset-x-0 bottom-0 flex h-[12cqw] items-start justify-around bg-black px-[2cqw] pt-[1.8cqw] text-[2.6cqw] font-semibold leading-none">
            {[
              { label: "Home", d: "M3 11l9-7 9 7v9h-6v-6H9v6H3v-9z", active: true },
              { label: "Friends", d: "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 9a7 7 0 0 1 14 0H2zm15-9a3 3 0 1 0 0-6M18 20h4a5 5 0 0 0-4-5" },
              null,
              { label: "Inbox", d: "M4 4h16v12H8l-4 4V4z" },
              { label: "Profile", d: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-8 9a8 8 0 0 1 16 0H4z" },
            ].map((item, i) =>
              item ? (
                <span key={item.label} className={`flex flex-col items-center gap-[0.8cqw] ${item.active ? "text-cream" : "text-cream/55"}`}>
                  <svg viewBox="0 0 24 24" fill={item.active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="h-[5cqw] w-[5cqw]" aria-hidden="true">
                    <path d={item.d} />
                  </svg>
                  {item.label}
                </span>
              ) : (
                <span key={`plus-${i}`} className="relative mt-[0.4cqw] h-[6cqw] w-[10cqw]">
                  <span className="absolute inset-0 -translate-x-[0.9cqw] rounded-[1.6cqw] bg-[#25F4EE]" />
                  <span className="absolute inset-0 translate-x-[0.9cqw] rounded-[1.6cqw] bg-[#FE2C55]" />
                  <span className="absolute inset-0 flex items-center justify-center rounded-[1.6cqw] bg-cream text-[5cqw] font-black leading-none text-ink">
                    +
                  </span>
                </span>
              ),
            )}
            <span className="absolute bottom-[1.2cqw] left-1/2 h-[0.9cqw] w-[30cqw] -translate-x-1/2 rounded-full bg-cream/80" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentStack() {
  const [auto, setAuto] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered ?? auto;
  const video = CONTENT_VIDEOS[active];

  useEffect(() => {
    if (hovered !== null || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setAuto((i) => (i + 1) % CONTENT_VIDEOS.length), CONTENT_CYCLE * 1000);
    return () => clearInterval(id);
  }, [hovered]);

  return (
    <div
      className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl border border-cream/10"
      style={{
        background:
          "radial-gradient(60% 55% at 45% 30%, rgba(160,80,150,0.35), transparent 72%), radial-gradient(60% 50% at 50% 100%, rgba(90,40,110,0.3), transparent 70%), #1C1329",
      }}
    >
      {/* Glow behind the playing phone, tinted to its colour */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-[background] duration-700"
        style={{ background: `radial-gradient(40% 40% at 50% 48%, ${video.glow.replace("0.55", "0.28")}, transparent 70%)` }}
      />

      {/* Top label */}
      <p className="absolute left-[6%] top-[5%] z-20 flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-pink-soft">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-soft opacity-75 motion-reduce:animate-none" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-pink-soft" />
        </span>
        For You · Testing 3 angles
      </p>

      <div className="flex w-full -rotate-[5deg] items-center justify-center" onPointerLeave={() => setHovered(null)}>
        {CONTENT_VIDEOS.map((v, i) => {
          const on = i === active;
          return (
            <div
              key={v.hook}
              className={`relative -mx-[1%] shrink-0 ${on ? "z-10" : "z-0"}`}
              style={{ width: v.width, transform: `translateY(${v.y})` }}
            >
              <div className="content-float" style={{ animationDelay: `${-i * 1.7}s` }}>
                <button
                  type="button"
                  aria-label={`Play "${v.hook}" by @${v.handle}`}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(i)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  onClick={() => setAuto(i)}
                  className={`block w-full cursor-pointer rounded-[15%/7%] text-left transition-all duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream ${
                    on ? "-translate-y-[4%] scale-[1.1]" : "scale-[0.96] opacity-75 saturate-[0.75]"
                  }`}
                  style={{
                    filter: on ? `drop-shadow(0 24px 30px rgba(0,0,0,0.55)) drop-shadow(0 0 26px ${v.glow})` : "drop-shadow(0 16px 24px rgba(0,0,0,0.5))",
                  }}
                >
                  <TikTokPhone v={v} on={on} progressKey={`${active}-${hovered ?? "auto"}`} autoplay={hovered === null} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats for the playing angle */}
      <div
        key={active}
        className="phase-title absolute bottom-[4%] left-1/2 z-20 flex -translate-x-1/2 items-center gap-4 whitespace-nowrap rounded-2xl border border-cream/15 bg-ink/85 px-3.5 py-2 shadow-xl backdrop-blur-md"
      >
        <div>
          <p className={`font-mono text-[0.5rem] uppercase tracking-[0.16em] ${video.winner ? "text-amber" : "text-pink-soft"}`}>
            {video.winner ? "★ Winning angle" : "Now testing"} · 0{active + 1}
          </p>
          <p className="mt-0.5 font-display text-xs font-black text-cream sm:text-sm">{video.views} views</p>
        </div>
        <span className="h-6 w-px bg-cream/10" />
        <div>
          <p className="font-mono text-[0.5rem] uppercase tracking-[0.16em] text-cream/50">3s hold</p>
          <p className="mt-0.5 font-display text-xs font-black text-cream sm:text-sm">{video.hold}</p>
        </div>
        <div>
          <p className="font-mono text-[0.5rem] uppercase tracking-[0.16em] text-cream/50">Orders</p>
          <p className="mt-0.5 font-display text-xs font-black text-teal sm:text-sm">{video.orders}</p>
        </div>
      </div>
    </div>
  );
}

const RETENTION_POINTS = [
  { lead: "Buyer follow-up flows.", rest: "The right message at the right time after checkout." },
  { lead: "Repeat offers.", rest: "Bundles, restocks and exclusives that give them a reason to return." },
  { lead: "Fans, not one-timers.", rest: "Buyers who come back to your LIVEs and bring friends." },
];

const RET_SEG_MS = 3200; // one touchpoint every 3.2s
const RET_MOVE = 0.42; // share of each segment spent travelling; the rest is a pause at the stop
const RET_PRICE = 899;
const RET_FRIEND_LAG = 22; // degrees each friend trails behind the buyer
const RET_IMG = (id: string) => `https://images.unsplash.com/${id}?w=120&h=120&fit=crop&crop=faces`;
const RET_BUYER = RET_IMG("photo-1534528741775-53994a69daeb");
const RET_FRIENDS = [RET_IMG("photo-1494790108377-be9c29b29330"), RET_IMG("photo-1507003211169-0a1dd7228f2d")];
/** Fading trail: [length in degrees, opacity, width]. */
const RET_TRAIL = [
  [80, 0.12, 2.6],
  [52, 0.22, 2.2],
  [28, 0.45, 1.8],
] as const;

/**
 * Touchpoints around the loop (top, right, bottom, left). Each fires a CRM message that sits in the
 * quadrant just ahead of it, joined by a connector drawn in the 0-100 SVG space.
 */
const RETENTION_STEPS = [
  {
    label: "Checkout",
    pos: "left-1/2 top-[17%]",
    toast: "right-[3%] top-[24%]",
    link: "M58.5 17 Q 72 17 72 24",
    title: "Order confirmed",
    body: "Ana bought Glow Serum",
    icon: "M3 4h2l2.2 10.2a1 1 0 0 0 1 .8h8.6a1 1 0 0 0 1-.8L19.5 7H6.2M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
  },
  {
    label: "Thank-you",
    pos: "left-[83%] top-1/2",
    toast: "right-[3%] top-[60%]",
    link: "M83 53 Q 83 57 79 60",
    title: "Salamat, Ana!",
    body: "₱50 off your next order",
    icon: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z",
  },
  {
    label: "Restock alert",
    pos: "left-1/2 top-[83%]",
    toast: "left-[3%] bottom-[24%]",
    link: "M40.5 83 Q 28 83 28 76",
    title: "Back in stock",
    body: "Glow Serum is ready to reorder",
    icon: "M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15L6 16Zm4 4h4",
  },
  {
    label: "Repeat offer",
    pos: "left-[17%] top-1/2",
    toast: "left-[3%] bottom-[60%]",
    link: "M17 47 Q 17 43 21 40",
    title: "Bundle for you + a friend",
    body: "2 for ₱1,499 · ends tonight",
    icon: "M4 11h16v9H4v-9Zm-1-4h18v4H3V7Zm9 0v13M12 7S10.5 3 8 3.5 7.5 7 12 7Zm0 0s1.5-4 4-3.5S16.5 7 12 7Z",
  },
];

/** Particles thrown out of the center each time the buyer completes another order. */
const RET_BURST = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2;
  const d = i % 2 ? 15 : 20;
  return { dx: `${Math.cos(a) * d}cqw`, dy: `${Math.sin(a) * d}cqw`, pink: i % 3 === 0 };
});

function RetIcon({ d, className }: { d: string; className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/** A face riding the orbit; `lag` keeps friends a few degrees behind the buyer. */
function RetOrbiter({ src, lag, size, className = "" }: { src: string; lag: number; size: number; className?: string }) {
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{ transform: `translate(-50%, -50%) rotate(calc(var(--a, 0deg) - ${lag}deg)) translateY(-33cqw) rotate(calc(${lag}deg - var(--a, 0deg)))` }}
      aria-hidden="true"
    >
      <div className={className}>
        <img
          src={src}
          alt=""
          className="rounded-full border-2 border-teal bg-ink-2 object-cover"
          style={{ width: `${size}cqw`, height: `${size}cqw` }}
        />
      </div>
    </div>
  );
}

function RetentionLoop() {
  const cardRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(SVGCircleElement | null)[]>([]);
  const [seg, setSeg] = useState(0);
  const [arrived, setArrived] = useState(true);

  // One clock drives the buyer, friends, trail and active touchpoint so they never drift apart.
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const paint = (angle: number) => {
      card.style.setProperty("--a", `${angle}deg`);
      trailRefs.current.forEach((el, i) => {
        const len = i < RET_TRAIL.length ? RET_TRAIL[i][0] : 10;
        el?.setAttribute("stroke-dashoffset", String(-(angle - len)));
      });
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paint(0);
      return;
    }
    const t0 = performance.now();
    let frame = 0;
    let last = "";
    const tick = (now: number) => {
      const t = (now - t0) / RET_SEG_MS + RET_MOVE; // start already parked at Checkout
      const k = Math.floor(t);
      const segT = t - k;
      paint((k - 1 + easeInOut(Math.min(1, segT / RET_MOVE))) * 90);
      const isArrived = segT >= RET_MOVE;
      const key = `${k}-${isArrived}`;
      if (key !== last) {
        last = key;
        setSeg(k);
        setArrived(isArrived);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const step = seg % 4;
  // Stops visited so far, restarting the story every 6 loops so the numbers stay believable.
  const visited = Math.max(0, arrived ? seg : seg - 1) % 24;
  const orders = 2 + Math.floor(visited / 4);
  const friends = Math.floor((visited + 1) / 4);
  const celebrate = arrived && step === 0 && seg > 0;

  return (
    <div>
      <div
        ref={cardRef}
        className="relative aspect-square w-full overflow-hidden rounded-3xl border border-cream/10 [container-type:inline-size]"
        style={{
          background:
            "radial-gradient(45% 45% at 50% 50%, rgba(53,214,196,0.26), transparent 72%), radial-gradient(60% 50% at 50% 100%, rgba(120,40,120,0.32), transparent 70%), radial-gradient(50% 40% at 100% 0%, rgba(240,75,154,0.12), transparent 70%), #1C1329",
        }}
      >
        {/* dot grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(rgba(244,239,230,0.12) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
            maskImage: "radial-gradient(circle at 50% 50%, black 30%, transparent 75%)",
          }}
        />

        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <filter id="ret-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.1" />
            </filter>
          </defs>
          <circle cx="50" cy="50" r="40" fill="none" stroke="#F4EFE6" strokeOpacity="0.05" strokeWidth="0.3" />
          <circle cx="50" cy="50" r="33" fill="none" stroke="#35D6C4" strokeOpacity="0.4" strokeWidth="0.4" strokeDasharray="1.2 1.2" />
          <circle cx="50" cy="50" r="26" fill="none" stroke="#F4EFE6" strokeOpacity="0.05" strokeWidth="0.3" />
          <g transform="rotate(-90 50 50)">
            {RET_TRAIL.map(([len, opacity, width], i) => (
              <circle
                key={len}
                ref={(el) => { trailRefs.current[i] = el; }}
                cx="50" cy="50" r="33" fill="none" stroke="#35D6C4" strokeOpacity={opacity} strokeWidth={width}
                strokeLinecap="round" pathLength={360} strokeDasharray={`${len} ${360 - len}`} filter="url(#ret-glow)"
              />
            ))}
            {/* bright leading edge */}
            <circle
              ref={(el) => { trailRefs.current[RET_TRAIL.length] = el; }}
              cx="50" cy="50" r="33" fill="none" stroke="#B9FFF6" strokeWidth="0.9"
              strokeLinecap="round" pathLength={360} strokeDasharray="10 350"
            />
          </g>

          {/* connector from the active touchpoint to its message */}
          {RETENTION_STEPS.map((s, i) => {
            const show = arrived && i === step;
            return (
              <path
                key={s.label}
                d={s.link}
                fill="none"
                stroke="#35D6C4"
                strokeWidth="0.45"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray="1"
                style={{
                  strokeDashoffset: show ? 0 : 1,
                  opacity: show ? 0.9 : 0,
                  transition: show ? "stroke-dashoffset 0.45s ease-out, opacity 0.2s" : "opacity 0.25s",
                }}
              />
            );
          })}
        </svg>

        {/* center */}
        <div className="absolute left-1/2 top-1/2 aspect-square w-[25%] -translate-x-1/2 -translate-y-1/2">
          <span className="pulse-ring absolute inset-0 rounded-full border border-teal/60" />
          <span className="pulse-ring absolute inset-0 rounded-full border border-teal/60" style={{ animationDelay: "1.5s" }} />
          {celebrate && (
            <span key={`shock-${seg}`} aria-hidden="true">
              <span className="ret-shock absolute inset-0 rounded-full border-2 border-teal" />
              {RET_BURST.map((p, i) => (
                <span
                  key={i}
                  className={`ret-burst absolute left-1/2 top-1/2 h-[1.4cqw] w-[1.4cqw] rounded-full ${p.pink ? "bg-pink" : "bg-teal"}`}
                  style={{ "--dx": p.dx, "--dy": p.dy } as React.CSSProperties}
                />
              ))}
            </span>
          )}
          <div
            key={orders}
            className="gmv-flash relative flex h-full w-full flex-col items-center justify-center rounded-full bg-teal text-center shadow-[0_0_60px_rgba(53,214,196,0.45)]"
            style={{ backgroundImage: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.35), transparent 55%)" }}
          >
            <span className="font-mono text-[clamp(0.5rem,3cqw,0.8rem)] font-bold uppercase leading-tight tracking-[0.08em] text-ink">
              Buyer
              <br />
              comes
              <br />
              back
            </span>
            <span className="mt-[1.2cqw] rounded-full bg-ink px-[1.8cqw] py-[0.4cqw] font-mono text-[clamp(0.45rem,2cqw,0.6rem)] font-bold text-teal">
              Order #{orders}
            </span>
          </div>
        </div>

        {/* friends who tag along after a repeat offer */}
        {RET_FRIENDS.slice(0, Math.min(2, friends)).map((src, i) => (
          <RetOrbiter key={src} src={src} lag={RET_FRIEND_LAG * (i + 1)} size={5.6 - i * 0.6} className="ret-pop z-10 opacity-90" />
        ))}

        {/* touchpoints; the active one swaps its icon for the buyer's face */}
        {RETENTION_STEPS.map((s, i) => {
          const active = arrived && i === step;
          return (
            <span
              key={s.label}
              className={`absolute ${s.pos} z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border py-1 pl-1.5 pr-2.5 font-mono text-[clamp(0.55rem,2.1cqw,0.68rem)] transition-all duration-500 ${
                active
                  ? "scale-110 border-teal bg-teal font-bold text-ink shadow-[0_0_28px_rgba(53,214,196,0.65)]"
                  : "border-cream/20 bg-ink-2 text-cream"
              }`}
            >
              <span className="relative flex h-[1.6em] w-[1.6em] items-center justify-center">
                {active ? (
                  <img key={seg} src={RET_BUYER} alt="" className="ret-pop h-full w-full rounded-full border border-ink object-cover" />
                ) : (
                  <RetIcon d={s.icon} className="h-[1.15em] w-[1.15em]" />
                )}
              </span>
              {s.label}
              {active && <span className="pulse-ring absolute inset-0 rounded-full border border-teal" />}
            </span>
          );
        })}

        {/* the buyer travelling between touchpoints; tucks into the pill on arrival */}
        <RetOrbiter
          src={RET_BUYER}
          lag={0}
          size={8.5}
          className={`relative z-30 rounded-full shadow-[0_0_22px_rgba(53,214,196,0.75)] transition-all ${
            arrived ? "scale-50 opacity-0 duration-200" : "scale-100 opacity-100 duration-300"
          }`}
        />

        {/* CRM message fired at each touchpoint */}
        {RETENTION_STEPS.map((s, i) => {
          const show = arrived && i === step;
          return (
            <div
              key={s.label}
              className={`absolute ${s.toast} z-40 flex w-[38%] items-start gap-[1.8cqw] rounded-[2.6cqw] border border-teal/30 bg-ink/90 p-[2cqw] shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-500 ${
                show ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
              }`}
              style={{ transitionDelay: show ? "0.25s" : "0s" }}
              aria-hidden={!show}
            >
              <span className="flex h-[6.5cqw] w-[6.5cqw] shrink-0 items-center justify-center rounded-[1.6cqw] bg-teal text-ink">
                <RetIcon d={s.icon} className="h-[60%] w-[60%]" />
              </span>
              <span className="min-w-0 leading-tight">
                <span className="flex items-center justify-between gap-1 font-mono text-[clamp(0.45rem,1.8cqw,0.55rem)] uppercase tracking-[0.1em] text-cream/50">
                  <span className="truncate">Niunorm Shop</span>
                  <span>now</span>
                </span>
                <span className="mt-[0.5cqw] block text-[clamp(0.6rem,2.5cqw,0.78rem)] font-bold text-cream">{s.title}</span>
                <span className="block text-[clamp(0.55rem,2.2cqw,0.7rem)] text-cream/65">{s.body}</span>
              </span>
            </div>
          );
        })}
      </div>

      {/* what the loop is worth */}
      <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
        {[
          { label: "Customer value", value: `₱${(orders * RET_PRICE).toLocaleString("en-US")}`, bump: orders, accent: "text-teal" },
          { label: "Friends brought", value: `+${friends}`, bump: friends, accent: "text-pink-soft" },
          { label: "Ads to bring back", value: "₱0", bump: 0, accent: "text-cream" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-cream/10 bg-ink-2 px-3 py-3 sm:px-4">
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-cream/50 sm:text-[0.62rem]">{stat.label}</p>
            <p key={stat.bump} className={`gmv-flash mt-1 font-display text-lg font-black sm:text-2xl ${stat.accent}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Engines() {
  return (
    <section id="services" className="relative overflow-hidden bg-ink text-cream">
      <div
        className="pointer-events-none absolute -left-48 top-10 h-[36rem] w-[36rem] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(53,214,196,0.25), transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-20 h-[32rem] w-[32rem] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(240,75,154,0.3), transparent 65%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <p className="label mb-6 flex items-center gap-3 text-teal">
          <span className="h-2 w-2 rounded-full bg-teal" />
          What we run for you
        </p>
        <h2 className="font-display text-[clamp(2.5rem,8vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tight">
          <span className="block">Five engines.</span>
          <span className="block">
            <span className="text-pink">One</span> team.
          </span>
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/70 sm:text-lg">
          Each one works on its own. Together they feed each other, and that&apos;s where TikTok Shop brands break out.
        </p>

        <div className="mt-14 h-px bg-cream/10 md:mt-20" />
        <div className="pt-14 md:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="label mb-6 text-pink">Engine · LIVE Selling</p>
              <h3 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase leading-[0.92] tracking-tight">
                Turn your LIVE into your best sales channel.
              </h3>
              <p className="mt-6 text-base leading-relaxed text-cream/85 sm:text-lg">
                You get{" "}
                <span className="font-bold text-pink">
                  trained hosts, scripts that sell, and a schedule that builds a habit
                </span>{" "}
                with your buyers. Your LIVE stops being a chore and starts being the room where people actually check
                out.
              </p>
              <ul className="mt-8 space-y-4">
                {LIVE_POINTS.map((pt) => (
                  <li key={pt.lead} className="flex gap-3 text-sm leading-relaxed">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-pink">
                      <span className="h-1.5 w-1.5 rounded-full bg-pink" />
                    </span>
                    <span className="text-cream/60">
                      <strong className="font-bold text-cream">{pt.lead}</strong> {pt.rest}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-2xl border border-cream/10 bg-ink-2 px-5 py-4 transition-colors duration-300 hover:border-pink/40">
                <p className="label text-pink">What changes for you</p>
                <p className="mt-2 text-sm text-cream/60">
                  <strong className="font-bold text-cream">You stop wondering if LIVE &ldquo;works&rdquo; for your brand.</strong>{" "}
                  You see it working.
                </p>
              </div>
            </div>
            <LivePhone />
          </div>

          <div className="mt-14 h-px bg-cream/10 md:mt-20" />
          <div className="grid items-center gap-12 pt-14 md:pt-20 lg:grid-cols-2 lg:gap-16">
            <div className="lg:order-2">
              <p className="label mb-6 text-teal">Engine · Affiliate Marketing</p>
              <h3 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase leading-[0.92] tracking-tight">
                An army of creators selling for you, every day.
              </h3>
              <p className="mt-6 text-base leading-relaxed text-cream/85 sm:text-lg">
                You get <span className="font-bold text-teal">creators who keep posting</span> because we recruit,
                brief, and manage them for you. Plus first access to Niunies, our own creator community.
              </p>
              <ul className="mt-8 space-y-4">
                {AFFILIATE_POINTS.map((pt) => (
                  <li key={pt.lead} className="flex gap-3 text-sm leading-relaxed">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-teal">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                    </span>
                    <span className="text-cream/60">
                      <strong className="font-bold text-cream">{pt.lead}</strong> {pt.rest}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-2xl border border-cream/10 bg-ink-2 px-5 py-4 transition-colors duration-300 hover:border-teal/40">
                <p className="label text-teal">What changes for you</p>
                <p className="mt-2 text-sm text-cream/60">
                  <strong className="font-bold text-cream">No more chasing creators in your DMs.</strong> They show
                  up, and they keep showing up.
                </p>
              </div>
            </div>
            <div className="lg:order-1">
              <CreatorNetwork />
            </div>
          </div>

          <div className="mt-14 h-px bg-cream/10 md:mt-20" />
          <div className="grid items-center gap-12 pt-14 md:pt-20 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="label mb-6 text-amber">Engine · GMV Max Ads</p>
              <h3 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase leading-[0.92] tracking-tight">
                Ads that push winners, not guesses.
              </h3>
              <p className="mt-6 text-base leading-relaxed text-cream/85 sm:text-lg">
                You get{" "}
                <span className="font-bold text-amber">
                  GMV Max campaigns run by a team that sees TikTok&apos;s changes early
                </span>
                , so your budget goes behind the products and videos that are already proving they sell.
              </p>
              <ul className="mt-8 space-y-4">
                {ADS_POINTS.map((pt) => (
                  <li key={pt.lead} className="flex gap-3 text-sm leading-relaxed">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-amber">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                    </span>
                    <span className="text-cream/60">
                      <strong className="font-bold text-cream">{pt.lead}</strong> {pt.rest}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-2xl border border-cream/10 bg-ink-2 px-5 py-4 transition-colors duration-300 hover:border-amber/40">
                <p className="label text-amber">What changes for you</p>
                <p className="mt-2 text-sm text-cream/60">
                  <strong className="font-bold text-cream">Ads stop feeling like gambling.</strong> Every peso has a job.
                </p>
              </div>
            </div>
            <AdsBudget />
          </div>

          <div className="mt-14 h-px bg-cream/10 md:mt-20" />
          <div className="grid items-center gap-12 pt-14 md:pt-20 lg:grid-cols-2 lg:gap-16">
            <div className="lg:order-2">
              <p className="label mb-6 text-pink-soft">Engine · Content Production</p>
              <h3 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase leading-[0.92] tracking-tight">
                Content made for the For You Page, built to sell.
              </h3>
              <p className="mt-6 text-base leading-relaxed text-cream/85 sm:text-lg">
                You get{" "}
                <span className="font-bold text-pink-soft">TikTok-native videos with hooks in the first second</span> and
                a reason to tap the yellow basket. Not repurposed Facebook ads. Not pretty-but-boring.
              </p>
              <ul className="mt-8 space-y-4">
                {CONTENT_POINTS.map((pt) => (
                  <li key={pt.lead} className="flex gap-3 text-sm leading-relaxed">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-pink-soft">
                      <span className="h-1.5 w-1.5 rounded-full bg-pink-soft" />
                    </span>
                    <span className="text-cream/60">
                      <strong className="font-bold text-cream">{pt.lead}</strong> {pt.rest}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-2xl border border-cream/10 bg-ink-2 px-5 py-4 transition-colors duration-300 hover:border-pink-soft/40">
                <p className="label text-pink-soft">What changes for you</p>
                <p className="mt-2 text-sm text-cream/60">
                  <strong className="font-bold text-cream">You stop staring at a blank calendar.</strong> Content that
                  sells keeps coming.
                </p>
              </div>
            </div>
            <div className="lg:order-1">
              <ContentStack />
            </div>
          </div>

          <div className="mt-14 h-px bg-cream/10 md:mt-20" />
          <div className="grid items-center gap-12 pt-14 md:pt-20 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="label mb-6 text-teal">Engine · Retention &amp; CRM</p>
              <h3 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase leading-[0.92] tracking-tight">
                First order is the start, not the finish.
              </h3>
              <p className="mt-6 text-base leading-relaxed text-cream/85 sm:text-lg">
                You get <span className="font-bold text-teal">a system that brings buyers back</span>: follow-ups,
                repeat-purchase offers and loyalty moves that make your existing customers your cheapest growth.
              </p>
              <ul className="mt-8 space-y-4">
                {RETENTION_POINTS.map((pt) => (
                  <li key={pt.lead} className="flex gap-3 text-sm leading-relaxed">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-teal">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                    </span>
                    <span className="text-cream/60">
                      <strong className="font-bold text-cream">{pt.lead}</strong> {pt.rest}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-2xl border border-cream/10 bg-ink-2 px-5 py-4 transition-colors duration-300 hover:border-teal/40">
                <p className="label text-teal">What changes for you</p>
                <p className="mt-2 text-sm text-cream/60">
                  <strong className="font-bold text-cream">You stop starting from zero every month.</strong> Growth starts
                  to stack.
                </p>
              </div>
            </div>
            <RetentionLoop />
          </div>
        </div>
      </div>
    </section>
  );
}

const FLY_C = 200;
const FLY_R = 135;
const FLY_BASE = 36; // deg/s at momentum ×1 (10s lap)
const FLY_CYCLE_S = 32; // momentum builds for most of the cycle, then a new month starts
const FLY_MAX = 2.6;
const FLY_GMV_START = 248_000;
/** Engines clockwise from the top. Labels sit outside the ring so they never cross it. */
const FLY_NODES = [
  { name: "Content", sub: "proves the hook", deg: -90, color: "#FF66B2", lx: 200, ly: 36, anchor: "middle", handoff: "Winning hook found", next: "briefed to affiliates" },
  { name: "Affiliates", sub: "spread it", deg: -18, color: "#35D6C4", lx: 348, ly: 152, anchor: "start", handoff: "120 creators post it", next: "traffic flows into LIVE" },
  { name: "LIVE", sub: "converts it", deg: 54, color: "#FF66B2", lx: 292, ly: 342, anchor: "middle", handoff: "Viewers check out", next: "best clips go to ads" },
  { name: "GMV Max", sub: "scales winners", deg: 126, color: "#F5B94F", lx: 108, ly: 342, anchor: "middle", handoff: "Ads scale the winners", next: "new buyers land in CRM" },
  { name: "CRM", sub: "brings them back", deg: 198, color: "#35D6C4", lx: 52, ly: 152, anchor: "end", handoff: "Buyers come back", next: "feeding new content angles" },
] as const;
const FLY_TICKS = Array.from({ length: 48 }, (_, i) => i * 7.5);

const flyPoint = (deg: number, r = FLY_R) => {
  const a = (deg * Math.PI) / 180;
  return [FLY_C + r * Math.cos(a), FLY_C + r * Math.sin(a)] as const;
};
const flyPeso = (v: number) => (v >= 1_000_000 ? `₱${(v / 1_000_000).toFixed(2)}M` : `₱${Math.round(v / 1000)}K`);
/** Momentum multiplier across the cycle: slow build, then ease back down for the next month. */
const flyMomentum = (u: number) =>
  u < 0.82 ? 1 + (FLY_MAX - 1) * (u / 0.82) ** 1.6 : FLY_MAX - (FLY_MAX - 1) * easeInOut((u - 0.82) / 0.18);

function FlywheelDiagram() {
  const dotRef = useRef<SVGGElement>(null);
  const ticksRef = useRef<SVGGElement>(null);
  const trailRefs = useRef<(SVGCircleElement | null)[]>([]);
  const barRef = useRef<HTMLSpanElement>(null);
  const multRef = useRef<HTMLSpanElement>(null);
  const [pulse, setPulse] = useState({ idx: 0, n: 0, gmv: FLY_GMV_START });

  useEffect(() => {
    const paint = (angle: number, m: number, kick: number) => {
      dotRef.current?.setAttribute("transform", `rotate(${angle} ${FLY_C} ${FLY_C})`);
      ticksRef.current?.setAttribute("transform", `rotate(${angle * 0.35} ${FLY_C} ${FLY_C})`);
      const len = 16 + 30 * ((m - 1) / (FLY_MAX - 1)) + kick * 0.25;
      trailRefs.current.forEach((el, i) => {
        const l = i === 0 ? len : len * 0.45;
        el?.setAttribute("stroke-dasharray", `${l} ${360 - l}`);
        el?.setAttribute("stroke-dashoffset", String(-(angle + 90 - l)));
      });
      if (barRef.current) barRef.current.style.width = `${((m - 1) / (FLY_MAX - 1)) * 100}%`;
      if (multRef.current) multRef.current.textContent = `×${m.toFixed(1)}`;
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paint(-124, 1, 0);
      return;
    }
    const t0 = performance.now();
    let prev = t0;
    let angle = -100; // start just before Content
    let kick = 0;
    let last = 4;
    let lastU = 0;
    let n = 0;
    let gmv = FLY_GMV_START;
    let frame = 0;
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      const u = (((now - t0) / 1000) % FLY_CYCLE_S) / FLY_CYCLE_S;
      if (u < lastU) gmv = FLY_GMV_START; // new month
      lastU = u;
      const m = flyMomentum(u);
      kick *= Math.exp(-dt / 0.45);
      angle += (FLY_BASE * m + kick) * dt;
      const idx = Math.floor((((angle + 90) % 360) + 360) % 360 / 72) % FLY_NODES.length;
      if (idx !== last) {
        // each engine the dot passes kicks the wheel and feeds the shop
        last = idx;
        kick += 55;
        n += 1;
        gmv += Math.round(17_000 * m);
        setPulse({ idx, n, gmv });
      }
      paint(angle, m, kick);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const cur = FLY_NODES[pulse.idx] ?? FLY_NODES[0];
  const [ax, ay] = flyPoint(cur.deg);
  const [cx, cy] = flyPoint(cur.deg, 64);

  return (
    <div className="relative mx-auto w-full max-w-[38rem]">
      <div
        className="pointer-events-none absolute inset-[16%] rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(240,75,154,0.38), rgba(53,214,196,0.08) 55%, transparent 72%)" }}
      />
      <svg viewBox="-50 0 500 400" className="relative h-auto w-full" role="img" aria-label="Flywheel: Content, Affiliates, LIVE, GMV Max and CRM feeding your TikTok Shop">
        <defs>
          <filter id="fly-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <radialGradient id="fly-core" cx="38%" cy="32%" r="75%">
            <stop offset="0%" stopColor="#FF8AC4" />
            <stop offset="60%" stopColor="#F04B9A" />
            <stop offset="100%" stopColor="#C4287A" />
          </radialGradient>
        </defs>

        {/* inner rings; the tick ring turns with the wheel */}
        <circle cx={FLY_C} cy={FLY_C} r="85" fill="none" stroke="#F4EFE6" strokeOpacity="0.14" strokeWidth="1" strokeDasharray="2 4" />
        <g ref={ticksRef}>
          {FLY_TICKS.map((d) => {
            const [x1, y1] = flyPoint(d, 104);
            const [x2, y2] = flyPoint(d, d % 30 === 0 ? 113 : 109);
            return <line key={d} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#F4EFE6" strokeOpacity={d % 30 === 0 ? 0.28 : 0.12} strokeWidth="1" />;
          })}
        </g>

        {FLY_NODES.map((nd, i) => {
          const next = FLY_NODES[(i + 1) % FLY_NODES.length];
          const [x1, y1] = flyPoint(nd.deg);
          const [x2, y2] = flyPoint(next.deg + (next.deg < nd.deg ? 360 : 0));
          return (
            <path
              key={nd.name}
              d={`M ${x1} ${y1} A ${FLY_R} ${FLY_R} 0 0 1 ${x2} ${y2}`}
              fill="none"
              stroke={nd.color}
              strokeWidth="2.5"
              strokeOpacity={pulse.idx === i ? 1 : 0.6}
              className="transition-[stroke-opacity] duration-500"
            />
          );
        })}

        {/* comet trail, longer as momentum builds */}
        <g transform={`rotate(-90 ${FLY_C} ${FLY_C})`}>
          <circle ref={(el) => { trailRefs.current[0] = el; }} cx={FLY_C} cy={FLY_C} r={FLY_R} fill="none" stroke="#F04B9A" strokeWidth="7" strokeLinecap="round" pathLength={360} opacity="0.45" filter="url(#fly-glow)" />
          <circle ref={(el) => { trailRefs.current[1] = el; }} cx={FLY_C} cy={FLY_C} r={FLY_R} fill="none" stroke="#FFD1E8" strokeWidth="2" strokeLinecap="round" pathLength={360} opacity="0.9" />
        </g>

        {/* energy travelling from the engine just passed into the shop */}
        <line key={`spoke-${pulse.n}`} x1={ax} y1={ay} x2={cx} y2={cy} stroke={cur.color} strokeWidth="2.5" strokeLinecap="round" pathLength={1} className="fly-spoke" />

        {/* center */}
        <circle className="fly-pulse" cx={FLY_C} cy={FLY_C} r="62" fill="none" stroke="#F04B9A" strokeWidth="1.5" />
        <circle className="fly-pulse" style={{ animationDelay: "1.4s" }} cx={FLY_C} cy={FLY_C} r="62" fill="none" stroke="#F04B9A" strokeWidth="1.5" />
        <g key={`core-${pulse.n}`} className={pulse.n ? "fly-bump" : undefined}>
          <circle cx={FLY_C} cy={FLY_C} r="64" fill="#F04B9A" opacity="0.35" filter="url(#fly-glow)" />
          <circle cx={FLY_C} cy={FLY_C} r="62" fill="url(#fly-core)" />
          <circle cx={FLY_C} cy={FLY_C} r="62" fill="none" stroke={cur.color} strokeOpacity="0.9" strokeWidth="2" className="fly-core-ring" />
        </g>
        <text x={FLY_C} y={FLY_C - 12} textAnchor="middle" className="fill-ink font-display text-[15px] font-black uppercase">
          Your
        </text>
        <text x={FLY_C} y={FLY_C + 4} textAnchor="middle" className="fill-ink font-display text-[15px] font-black uppercase">
          TikTok Shop
        </text>
        <rect x={FLY_C - 34} y={FLY_C + 13} width="68" height="18" rx="9" fill="#130B1E" />
        <text key={`gmv-${pulse.n}`} x={FLY_C} y={FLY_C + 25.5} textAnchor="middle" className="fly-num font-mono text-[10px] font-bold" fill="#F4EFE6">
          {flyPeso(pulse.gmv)}
        </text>

        {/* travelling dot */}
        <g ref={dotRef} transform={`rotate(-124 ${FLY_C} ${FLY_C})`}>
          <circle cx={FLY_C + FLY_R} cy={FLY_C} r="11" fill="#F04B9A" opacity="0.7" filter="url(#fly-glow)" />
          <circle cx={FLY_C + FLY_R} cy={FLY_C} r="5.5" fill="#F04B9A" />
          <circle cx={FLY_C + FLY_R} cy={FLY_C} r="2.2" fill="#FFF" />
        </g>

        {FLY_NODES.map((nd, i) => {
          const [x, y] = flyPoint(nd.deg);
          const on = pulse.idx === i;
          return (
            <g key={nd.name}>
              {on && <circle key={`rip-${pulse.n}`} cx={x} cy={y} r="10" fill="none" stroke={nd.color} strokeWidth="2" className="fly-ripple" />}
              {on && <circle cx={x} cy={y} r="17" fill={nd.color} opacity="0.45" filter="url(#fly-glow)" />}
              <circle cx={x} cy={y} r={on ? 10.5 : 9} fill={on ? nd.color : "#1C1329"} stroke={nd.color} strokeWidth="2.5" className="transition-all duration-500" />
              <text x={nd.lx} y={nd.ly} textAnchor={nd.anchor} className="font-display text-[13px] font-black uppercase transition-colors duration-500" fill={on ? nd.color : "#F4EFE6"}>
                {nd.name}
              </text>
              <text x={nd.lx} y={nd.ly + 13} textAnchor={nd.anchor} className="font-mono text-[9.5px]" fill="#9A8FA8">
                {nd.sub}
              </text>
            </g>
          );
        })}
      </svg>

      {/* live readout: what just happened, and how fast the wheel is turning */}
      <div className="relative mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
        <div className="flex items-center gap-3 rounded-2xl border border-cream/10 bg-ink/70 px-4 py-3 backdrop-blur">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: cur.color, boxShadow: `0 0 12px ${cur.color}` }} />
          <p key={pulse.n} className="phase-title min-w-0 text-sm leading-snug">
            <span className="font-bold text-cream">{cur.handoff}</span>
            <span className="text-cream/50"> → {cur.next}</span>
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-cream/10 bg-ink/70 px-4 py-3 backdrop-blur sm:w-52">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-cream/50">Momentum</span>
          <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-cream/10">
            <span ref={barRef} className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-teal via-pink to-amber" style={{ width: "0%" }} />
          </span>
          <span ref={multRef} className="w-8 text-right font-mono text-xs font-bold text-cream">×1.0</span>
        </div>
      </div>
    </div>
  );
}

function Flywheel() {
  return (
    <section className="relative overflow-hidden border-y border-cream/10 bg-ink-2 text-cream">
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 md:px-10 md:py-24 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="label mb-6 flex items-center gap-3 text-teal">
            <span className="h-2 w-2 rounded-full bg-teal" />
            The real advantage
          </p>
          <h2 className="font-display text-[clamp(2.5rem,6.5vw,4.75rem)] font-black uppercase leading-[0.9] tracking-tight">
            <span className="block">They&apos;re not five services.</span>
            <span className="block text-pink">It&apos;s one flywheel.</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-cream/60 sm:text-lg">
            Most brands hire for one piece and wonder why it stalls. When the same team runs all five, every win in one
            engine feeds the next one.
          </p>
          <p className="mt-6 max-w-lg border-l-2 border-pink pl-5 text-base leading-relaxed text-cream sm:text-lg">
            Content proves the hook. Affiliates spread it. LIVE converts it. Ads scale the winners. CRM brings the buyers
            back, and the wheel spins faster.
          </p>
          <Link
            to="/apply"
            className="soft-btn-pink group mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-pink px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-ink transition-all hover:-translate-y-0.5 sm:text-sm"
          >
            Put my brand on the wheel
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
        <FlywheelDiagram />
      </div>
    </section>
  );
}

const HOW_STEP_MS = 2600;
const HOW_STEPS = [
  { when: "Today", title: "Apply", body: "Tell us about your brand and where your shop is now. Takes a few minutes.", pink: true, icon: "M9 4h6v3H9zM7 5H5v16h14V5h-2M9 12h6M9 16h4" },
  { when: "This week", title: "Fit call", body: "We talk goals, products and team. If we're not the right partner, we'll tell you straight.", pink: true, icon: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" },
  { when: "Onboarding", title: "Shop audit", body: "We go through your shop, content, ads and affiliates to find the fastest wins.", pink: false, icon: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-2 4 4" },
  { when: "Launch", title: "Growth plan", body: "Which engines start first, what we're aiming for, and who owns what.", pink: false, icon: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-5a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-3a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" },
  { when: "Every week", title: "Run & report", body: "We execute, review, and adjust. You always know what's happening and why.", pink: false, icon: "M4 12a8 8 0 0 1 14-5.3M20 4v4h-4M20 12a8 8 0 0 1-14 5.3M4 20v-4h4" },
];

function HowWeStart() {
  const listRef = useRef<HTMLOListElement>(null);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = listRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // walk through the steps once visible; hovering a step takes over
  useEffect(() => {
    if (!inView || reduced || hovered !== null) return;
    const id = setInterval(() => setActive((a) => (a + 1) % HOW_STEPS.length), HOW_STEP_MS);
    return () => clearInterval(id);
  }, [inView, reduced, hovered]);

  const cur = hovered ?? active;
  const shown = inView || reduced;
  // node i sits at the start of column i: (track width + one gap) * i / 5
  const at = (i: number) => `calc((100% + 2rem) * ${i} / ${HOW_STEPS.length})`;

  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      <div
        className="pointer-events-none absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(240,75,154,0.3), transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute -right-40 top-10 h-[30rem] w-[30rem] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(53,214,196,0.22), transparent 65%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <p className="label mb-6 flex items-center gap-3 text-teal">
          <span className="h-2 w-2 rounded-full bg-teal" />
          How we start
        </p>
        <h2 className="font-display text-[clamp(2.5rem,6.5vw,4.75rem)] font-black uppercase leading-[0.9] tracking-tight">
          <span className="block">From apply</span>
          <span className="block">
            to <span className="text-pink">selling</span>,
          </span>
          <span className="block">without the</span>
          <span className="block">guesswork.</span>
        </h2>

        <ol ref={listRef} className="relative mt-12 grid gap-6 md:mt-16 lg:grid-cols-5 lg:gap-8">
          {/* mobile rail */}
          <span aria-hidden="true" className="absolute bottom-6 left-[15px] top-4 w-px bg-cream/10 lg:hidden" />
          <span
            aria-hidden="true"
            className="absolute left-[15px] top-4 w-px bg-gradient-to-b from-pink to-teal transition-[height] duration-1000 ease-out lg:hidden"
            style={{ height: shown ? "calc(100% - 2.5rem)" : "0%" }}
          />
          {/* desktop rail: dim track, glowing fill up to the current step, and a comet head */}
          <span aria-hidden="true" className="absolute left-4 right-0 top-4 hidden h-px bg-cream/15 lg:block" />
          <span
            aria-hidden="true"
            className="absolute left-4 top-[15px] hidden h-[3px] rounded-full bg-gradient-to-r from-pink via-pink to-teal shadow-[0_0_14px_rgba(240,75,154,0.6)] transition-[width] duration-700 ease-out lg:block"
            style={{ width: shown ? at(cur) : "0%" }}
          />
          <span
            aria-hidden="true"
            className={`absolute top-4 hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl transition-[left,background-color] duration-700 ease-out lg:block ${
              HOW_STEPS[cur].pink ? "bg-pink/50" : "bg-teal/50"
            }`}
            style={{ left: `calc(1rem + ${at(cur)})` }}
          />

          {HOW_STEPS.map((s, i) => {
            const on = i === cur;
            const done = i < cur;
            const tone = s.pink
              ? { border: "border-pink", bg: "bg-pink", text: "text-pink", glow: "rgba(240,75,154,0.45)" }
              : { border: "border-teal", bg: "bg-teal", text: "text-teal", glow: "rgba(53,214,196,0.45)" };
            return (
              <li
                key={s.title}
                className={`relative pl-12 transition-all duration-700 ease-out lg:flex lg:flex-col lg:pl-0 ${shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
                style={{ transitionDelay: shown && !inView ? "0ms" : `${i * 120}ms` }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => {
                  setHovered(null);
                  setActive(i);
                }}
              >
                {/* node */}
                <span
                  className={`absolute left-0 top-0 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-500 lg:relative ${tone.border} ${
                    on ? `${tone.bg} scale-110` : done ? `${tone.bg}` : "bg-ink"
                  }`}
                  style={{ boxShadow: `0 0 ${on ? 26 : 14}px ${tone.glow}` }}
                >
                  {done ? (
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-ink" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="m5 12 5 5 9-10" />
                    </svg>
                  ) : (
                    <span className={`h-2.5 w-2.5 rounded-full transition-colors duration-500 ${on ? "bg-ink" : tone.bg}`} />
                  )}
                  {on && <span className={`pulse-ring absolute inset-0 rounded-full border ${tone.border}`} />}
                </span>

                {/* card */}
                <div
                  className={`relative mt-0 overflow-hidden rounded-2xl border p-5 transition-all duration-500 lg:mt-5 lg:flex-1 ${
                    on ? "-translate-y-1 bg-ink-2" : "border-cream/10 bg-ink-2/40"
                  }`}
                  style={on ? { borderColor: tone.glow.replace("0.45", "0.55"), boxShadow: `0 18px 50px -20px ${tone.glow}` } : undefined}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 h-[2px] origin-left transition-transform duration-700 ${tone.bg} ${on ? "scale-x-100" : "scale-x-0"}`}
                  />
                  <span aria-hidden="true" className="pointer-events-none absolute -right-1 -top-3 font-display text-7xl font-black text-cream/[0.04]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex items-center justify-between gap-3">
                    <p className="label text-teal">{s.when}</p>
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-xl border transition-colors duration-500 ${
                        on ? `${tone.border} ${tone.text}` : "border-cream/10 text-cream/40"
                      }`}
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d={s.icon} />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-black uppercase tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/60">{s.body}</p>
                  {i === HOW_STEPS.length - 1 && (
                    <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-teal/30 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-teal">
                      <svg viewBox="0 0 24 24" className="disc-spin h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                        <path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v4h-4" />
                      </svg>
                      Repeats weekly
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

const WHY_CARDS = [
  { label: "Direct line", title: "We can call TikTok Shop PH & SG.", body: "When something breaks, a campaign gets flagged, or a new beta drops, we have people to escalate to. You don't wait in a support queue.", pink: true, icon: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" },
  { label: "Platinum partner", title: "Recognized by TikTok Shop itself.", body: "Our Agency Advantage tier means early access to platform changes, programs and features before most sellers hear about them.", icon: "M12 3 4 7v5c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V7l-8-4Zm-3 9 2 2 4-4" },
  { label: "Capped roster", title: "You're never \u201cjust another account.\u201d", body: "We keep our roster small on purpose, so your brand gets real attention.", icon: "M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM21 19v-1a4 4 0 0 0-3-3.9M16 4.1a3 3 0 0 1 0 5.8" },
  { label: "Under one roof", title: "One team owns the result.", body: "Ads, affiliates, content, LIVE and CRM talk to each other every day.", icon: "M3 10.5 12 4l9 6.5M5 9v10h14V9M10 19v-5h4v5" },
  { label: "Niunies community", title: "Creators already waiting.", body: "Our own affiliate community means faster creator activation for your launch.", icon: "M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z" },
];
const WHY_ENGINES = ["Ads", "Affiliates", "Content", "LIVE", "CRM"];
const WHY_CREATORS = ["#F04B9A", "#35D6C4", "#F5B94F", "#FF66B2", "#9A8FA8"];

/** Small animated proof strip at the bottom of each card. */
function WhyProof({ i }: { i: number }) {
  if (i === 0)
    return (
      <p className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-cream">
        <span className="relative flex h-2 w-2">
          <span className="pulse-ring absolute inset-0 rounded-full bg-teal" />
          <span className="relative h-2 w-2 rounded-full bg-teal" />
        </span>
        Escalation line open
      </p>
    );
  if (i === 1)
    return (
      <p className="why-metal inline-flex items-center gap-2 rounded-full border border-cream/20 px-3 py-1.5 font-mono text-[0.62rem] font-bold uppercase tracking-[0.14em] text-ink">
        ★ Platinum · Agency Advantage
      </p>
    );
  if (i === 2)
    return (
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5">
          {Array.from({ length: 8 }, (_, k) => (
            <span
              key={k}
              className={`h-2.5 w-2.5 rounded-full ${k < 6 ? "bg-cream/25" : k === 6 ? "why-seat bg-pink" : "border border-cream/25"}`}
            />
          ))}
        </div>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-pink">Your seat</span>
      </div>
    );
  if (i === 3)
    return (
      <div className="flex flex-wrap items-center gap-1">
        {WHY_ENGINES.map((e, k) => (
          <span key={e} className="flex items-center gap-1">
            <span className="why-seq rounded-full border border-cream/15 px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.08em] text-cream/60" style={{ animationDelay: `${k * 0.5}s` }}>
              {e}
            </span>
            {k < WHY_ENGINES.length - 1 && <span className="h-px w-2 bg-cream/20" />}
          </span>
        ))}
      </div>
    );
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        {WHY_CREATORS.map((c, k) => (
          <span
            key={c}
            className="why-bob relative h-7 w-7 rounded-full border-2 border-ink-2"
            style={{ background: `radial-gradient(circle at 35% 30%, #fff8, transparent 45%), ${c}`, animationDelay: `${k * 0.25}s` }}
          >
            <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-ink-2 bg-teal" />
          </span>
        ))}
      </div>
      <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-teal">Ready to post</span>
    </div>
  );
}

function WhyNiunorm() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setShown(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShown(true), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // drop the stagger delay once cards are in, so hover feels instant
  useEffect(() => {
    if (!shown) return;
    const t = setTimeout(() => setSettled(true), 1300);
    return () => clearTimeout(t);
  }, [shown]);

  // spotlight follows the cursor inside each card
  const track = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      <div
        className="pointer-events-none absolute -left-32 top-1/3 h-[28rem] w-[28rem] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(240,75,154,0.28), transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-[26rem] w-[26rem] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(53,214,196,0.2), transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: "linear-gradient(#F4EFE6 1px, transparent 1px), linear-gradient(90deg, #F4EFE6 1px, transparent 1px)", backgroundSize: "48px 48px", maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <p className="label mb-6 flex items-center gap-3 text-teal">
          <span className="relative flex h-2 w-2">
            <span className="pulse-ring absolute inset-0 rounded-full bg-teal" />
            <span className="relative h-2 w-2 rounded-full bg-teal" />
          </span>
          Why brands pick Niunorm
        </p>
        <h2 className="font-display text-[clamp(2.5rem,6.5vw,4.75rem)] font-black uppercase leading-[0.9] tracking-tight">
          <span className="block">What you can&apos;t get</span>
          <span className="block">
            from a <span className={`relative inline-block text-pink ${shown ? "why-strike" : ""}`}>freelancer</span>.
          </span>
        </h2>

        <div ref={gridRef} className="mt-12 grid gap-4 md:mt-16 md:grid-cols-6">
          {WHY_CARDS.map((c, i) => (
            <article
              key={c.label}
              onMouseMove={track}
              className={`why-card group relative flex flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-700 ease-out hover:-translate-y-1.5 md:p-7 ${
                i < 2 ? "md:col-span-3" : "md:col-span-2"
              } ${
                c.pink
                  ? "border-pink bg-pink text-ink shadow-[0_24px_60px_-24px_rgba(240,75,154,0.8)]"
                  : "border-cream/10 bg-ink-2 text-cream hover:border-pink/40 hover:shadow-[0_24px_60px_-28px_rgba(240,75,154,0.6)]"
              } ${shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ transitionDelay: shown && !settled ? `${i * 110}ms` : "0ms" }}
            >
              {/* cursor spotlight */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), ${c.pink ? "rgba(255,255,255,0.28)" : "rgba(240,75,154,0.16)"}, transparent 70%)` }}
              />
              {c.pink && <span aria-hidden="true" className="why-shine pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent" />}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${c.pink ? "bg-ink" : "bg-gradient-to-r from-pink to-teal"}`}
              />
              <span aria-hidden="true" className={`pointer-events-none absolute -bottom-6 right-3 font-display text-8xl font-black ${c.pink ? "text-ink/10" : "text-cream/[0.04]"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative flex items-start justify-between gap-4">
                <p className={`label ${c.pink ? "text-ink/70" : "text-teal"}`}>{c.label}</p>
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 ${
                    c.pink ? "border-ink/20 bg-ink text-pink" : "border-cream/10 bg-ink text-cream/70 group-hover:border-pink/50 group-hover:text-pink"
                  }`}
                >
                  <svg viewBox="0 0 24 24" className={`h-5 w-5 ${i === 0 ? "why-ring" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={c.icon} />
                  </svg>
                </span>
              </div>
              <h3 className="relative mt-3 font-display text-[clamp(1.35rem,2.2vw,1.75rem)] font-black uppercase leading-[1.05] tracking-tight">{c.title}</h3>
              <p className={`relative mb-6 mt-3 text-sm leading-relaxed ${c.pink ? "text-ink/80" : "text-cream/60"}`}>{c.body}</p>
              <div className="relative mt-auto">
                <WhyProof i={i} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const FIT_YES = [
  "Have a product people already love and want to scale it on TikTok Shop",
  "Want one partner running the whole system, not another vendor",
  "Can move fast on stock, offers and approvals",
  "Care about building a brand buyers return to",
];
const FIT_NO = [
  "Want a one-off viral video and nothing after",
  "Are still figuring out what you're selling",
  "Need someone to just \u201cpost for you\u201d",
  "Aren't ready to treat TikTok Shop as a real channel",
];

function FitCheck() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setShown(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShown(true), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // drop reveal delays once everything is in, so hover feels instant
  useEffect(() => {
    if (!shown) return;
    const t = setTimeout(() => setSettled(true), 1500);
    return () => clearTimeout(t);
  }, [shown]);

  const track = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section className="relative overflow-hidden bg-cream text-ink">
      <div
        className="pointer-events-none absolute -right-40 -top-20 h-[30rem] w-[30rem] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(240,75,154,0.18), transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{ backgroundImage: "radial-gradient(rgba(19,11,30,0.12) 1px, transparent 1px)", backgroundSize: "22px 22px", maskImage: "linear-gradient(to bottom, transparent, black 40%, black 70%, transparent)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <p className="label mb-6 flex items-center gap-3 text-pink">
          <span className="relative flex h-2 w-2">
            <span className="pulse-ring absolute inset-0 rounded-full bg-pink" />
            <span className="relative h-2 w-2 rounded-full bg-pink" />
          </span>
          Fit check
        </p>
        <h2 className="font-display text-[clamp(2.5rem,6.5vw,4.75rem)] font-black uppercase leading-[0.9] tracking-tight">
          <span className="block">
            We&apos;re <span className="relative inline-block">picky<span aria-hidden="true" className={`fit-underline absolute -bottom-1 left-0 h-[0.12em] w-full rounded-full bg-pink ${shown ? "fit-underline-on" : ""}`} /></span>. Here&apos;s why
          </span>
          <span className="block">that&apos;s good for you.</span>
        </h2>

        <div ref={gridRef} className="relative mt-12 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-6">
          {/* "or" badge between the two cards */}
          <span
            aria-hidden="true"
            className={`absolute left-1/2 top-1/2 z-20 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-cream bg-pink font-display text-xs font-black uppercase text-ink shadow-[0_10px_30px_-8px_rgba(240,75,154,0.8)] transition-all delay-500 duration-500 md:flex ${
              shown ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
          >
            or
          </span>

          {/* fit */}
          <div
            onMouseMove={track}
            className={`group relative overflow-hidden rounded-2xl bg-ink p-7 text-cream shadow-[0_30px_70px_-30px_rgba(19,11,30,0.7)] transition-all duration-700 ease-out hover:-translate-y-1 md:p-9 ${
              shown ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
          >
            <span aria-hidden="true" className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full opacity-60 blur-3xl" style={{ background: "radial-gradient(circle, rgba(53,214,196,0.35), transparent 65%)" }} />
            <span aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full opacity-50 blur-3xl" style={{ background: "radial-gradient(circle, rgba(240,75,154,0.35), transparent 65%)" }} />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: "radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), rgba(53,214,196,0.16), transparent 70%)" }}
            />
            <span aria-hidden="true" className="fit-stamp pointer-events-none absolute -right-4 top-6 rotate-[-12deg] rounded-xl border-4 border-teal/25 px-4 py-1 font-display text-5xl font-black uppercase text-teal/20">
              Fit
            </span>

            <div className="relative flex items-center justify-between gap-4">
              <h3 className="font-display text-xl font-black uppercase tracking-tight sm:text-2xl">We&apos;re a fit if you...</h3>
            </div>
            <ul className="relative mt-6 space-y-2">
              {FIT_YES.map((t, i) => (
                <li
                  key={t}
                  className={`flex items-start gap-4 rounded-xl px-3 py-2.5 text-sm leading-relaxed transition-all duration-500 hover:translate-x-1 hover:bg-cream/[0.06] sm:text-base ${
                    shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                  }`}
                  style={{ transitionDelay: shown && !settled ? `${300 + i * 140}ms` : "0ms" }}
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/15 text-teal ring-1 ring-teal/40 shadow-[0_0_14px_rgba(53,214,196,0.35)]">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="m5 12 5 5 9-10" pathLength={1} className={`fit-draw ${shown ? "fit-draw-on" : ""}`} style={{ transitionDelay: `${450 + i * 140}ms` }} />
                    </svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <Link
              to="/apply"
              className="soft-btn-pink group/cta relative mt-7 inline-flex items-center gap-2 rounded-full bg-pink px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-ink transition-all hover:-translate-y-0.5"
            >
              Sounds like you? Apply
              <span className="transition-transform group-hover/cta:translate-x-1">→</span>
            </Link>
          </div>

          {/* not a fit */}
          <div
            onMouseMove={track}
            className={`group relative overflow-hidden rounded-2xl bg-cream-2/40 p-7 transition-all duration-700 ease-out md:p-9 ${
              shown ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
            style={{ transitionDelay: shown && !settled ? "150ms" : "0ms" }}
          >
            {/* marching dashed border */}
            <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full">
              <rect x="1" y="1" rx="15" style={{ width: "calc(100% - 2px)", height: "calc(100% - 2px)" }} fill="none" stroke="rgba(19,11,30,0.22)" strokeWidth="2" strokeDasharray="7 7" className="fit-march" />
            </svg>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: "radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), rgba(240,75,154,0.1), transparent 70%)" }}
            />
            <span aria-hidden="true" className="pointer-events-none absolute -right-4 top-6 rotate-[10deg] rounded-xl border-4 border-pink/20 px-4 py-1 font-display text-5xl font-black uppercase text-pink/15">
              Pass
            </span>

            <h3 className="relative font-display text-xl font-black uppercase tracking-tight sm:text-2xl">We&apos;re not a fit if you...</h3>
            <ul className="relative mt-6 space-y-2">
              {FIT_NO.map((t, i) => (
                <li
                  key={t}
                  className={`group/no flex items-start gap-4 rounded-xl px-3 py-2.5 text-sm leading-relaxed text-ink/70 transition-all duration-500 hover:bg-pink/[0.06] sm:text-base ${
                    shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                  }`}
                  style={{ transitionDelay: shown && !settled ? `${450 + i * 140}ms` : "0ms" }}
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pink/10 text-pink ring-1 ring-pink/30 transition-transform duration-300 group-hover/no:rotate-90">
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" aria-hidden="true">
                      <path d="M6 6l12 12M18 6 6 18" />
                    </svg>
                  </span>
                  <span className="relative">
                    {t}
                    <span aria-hidden="true" className="absolute left-0 top-1/2 h-[1.5px] w-full origin-left scale-x-0 bg-pink transition-transform duration-300 group-hover/no:scale-x-100" />
                  </span>
                </li>
              ))}
            </ul>
            <p className="relative mt-7 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink/45">
              No hard feelings. We&apos;ll tell you straight on the fit call.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  { q: "Do I need to sign up for all five engines?", a: "No. We look at your shop and recommend where to start. Many brands begin with two or three engines and add the rest once the first ones are running well." },
  { q: "We're new on TikTok Shop. Can we still apply?", a: "Yes, as long as your product and operations are ready. We've helped brands set up from scratch as well as scale shops that were already selling." },
  { q: "How much does it cost?", a: "Every brand's scope is different, so we don't publish a rate card. After the fit call we'll send a plan built around your goals and which engines you need." },
  { q: "Will we still have control over our brand?", a: "Always. You approve the voice, offers and creative direction. We handle execution and keep you updated every week." },
  { q: "Why is there an application?", a: "Because we cap our roster. Applying lets us check that we can give your brand the attention it deserves before either of us commits." },
];

function Faq() {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));
  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      <div aria-hidden="true" className="faq-orb pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-pink/20 blur-3xl" style={{ animation: "faq-orb 12s ease-in-out infinite" }} />
      <div aria-hidden="true" className="faq-orb pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-teal/15 blur-3xl" style={{ animation: "faq-orb 15s ease-in-out infinite reverse" }} />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 md:px-10 md:py-24 lg:grid-cols-2 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="label mb-6 flex items-center gap-3 text-teal">
            <span className="h-2 w-2 rounded-full bg-teal" />
            Before you apply
          </p>
          <h2 className="font-display text-[clamp(2.5rem,6.5vw,4.75rem)] font-black uppercase leading-[0.9] tracking-tight">
            <span className="block">Questions</span>
            <span className="block">brands</span>
            <span className="block">ask us</span>
            <span className="block bg-gradient-to-r from-pink via-pink-soft to-amber bg-clip-text text-transparent">first.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {FAQS.map((f, i) => {
            const on = open.has(i);
            return (
              <div
                key={f.q}
                style={{ animationDelay: `${i * 90}ms` }}
                className={`faq-row relative overflow-hidden rounded-2xl border backdrop-blur transition-all duration-300 hover:-translate-y-0.5 ${on ? "border-pink/50 bg-pink/[0.07] shadow-[0_0_40px_-12px_var(--color-pink)]" : "border-cream/10 bg-cream/[0.03] hover:border-pink/30"}`}
              >
                <span aria-hidden="true" className={`absolute left-0 top-0 h-full w-1 origin-top bg-gradient-to-b from-pink to-amber transition-transform duration-500 ${on ? "scale-y-100" : "scale-y-0"}`} />
                <h3>
                  <button
                    type="button"
                    aria-expanded={on}
                    aria-controls={`faq-${i}`}
                    onClick={() =>
                      setOpen((prev) => {
                        const next = new Set(prev);
                        if (on) next.delete(i);
                        else next.add(i);
                        return next;
                      })
                    }
                    className="relative flex w-full items-center gap-4 px-5 py-5 text-left font-bold sm:px-6 sm:text-lg"
                  >
                    <span aria-hidden="true" className={`label shrink-0 transition-colors ${on ? "text-pink" : "text-cream/35"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">{f.q}</span>
                    <span aria-hidden="true" className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border text-xl leading-none transition-all duration-300 ${on ? "rotate-45 border-pink bg-pink text-ink" : "border-pink/40 text-pink"}`}>
                      +
                    </span>
                  </button>
                </h3>
                <div id={`faq-${i}`} className={`grid transition-[grid-template-rows] duration-300 ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <p className="overflow-hidden pl-5 text-sm leading-relaxed text-cream/70 sm:pl-[4.25rem]">
                    <span className="block pb-6 pr-6">{f.a}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[30%] top-1/2 h-[42rem] w-[56rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(240,75,154,0.38), rgba(120,40,100,0.18) 45%, transparent 70%)", animation: "hero-glow 8s ease-in-out infinite" }}
      />
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-32">
        <p className="label hero-rise mb-8 inline-flex items-center gap-3 rounded-full border border-cream/15 bg-cream/[0.04] px-4 py-2 text-cream/80 backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75" />
            <span className="relative h-2 w-2 rounded-full bg-teal" />
          </span>
          Slots open when a brand graduates
        </p>
        <h2 className="max-w-5xl font-display text-[clamp(2.5rem,8.5vw,6.5rem)] font-black uppercase leading-[0.92] tracking-tight">
          <span className="block">Your shop</span>
          <span className="block">could be</span>
          <span className="hero-selling block w-fit">actually</span>
          <span className="block">
            <span className="hero-selling inline-block">selling</span> next.
          </span>
        </h2>
        <p className="mt-10 max-w-xl border-l-2 border-pink/60 pl-5 text-base leading-relaxed text-cream/70 sm:text-lg">
          We only take a limited number of brands at a time. Apply now and we&apos;ll tell you honestly if there&apos;s a slot for yours.
        </p>
        <div className="mt-10">
          <Link
            to="/apply"
            className="soft-btn-pink hero-btn-shine group inline-flex items-center justify-center gap-3 rounded-full bg-pink px-10 py-5 text-xs font-bold uppercase tracking-[0.16em] text-ink transition-all hover:-translate-y-0.5 hover:scale-[1.03] sm:text-sm"
          >
            Apply now
            <span className="transition-transform group-hover:translate-x-1.5">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className={styles.page}>
      <Hero />
      <Marquee />
      <BeHonest />
      <Engines />
      <Flywheel />
      <HowWeStart />
      <WhyNiunorm />
      <FitCheck />
      <Faq />
      <FinalCta />
    </div>
  );
}
