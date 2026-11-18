import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import styles from "./calculator.module.css";

/* ---------- Config ---------- */

// TikTok Shop fees, pre-filled from a real PH settlement breakdown (Nov 2026).
// Rates differ by category and program; users can edit them under "TikTok Shop fee settings".
const FEE_DEFS = [
  { key: "transaction", label: "Transaction fee", unit: "%", def: 2.24, c: "#2FA8C9" },
  { key: "commission", label: "TikTok Shop commission", unit: "%", def: 6.8, c: "#35D6C4" },
  { key: "growth", label: "Seller growth fee", unit: "%", def: 1.5, c: "#4FD1B5" },
  { key: "voucher", label: "Voucher Xtra fee", unit: "%", def: 0, c: "#5E7BE0" },
  { key: "shippingService", label: "Shipping service fee", unit: "₱", def: 45, c: "#7C6CD9" },
  { key: "orderProcessing", label: "Order processing fee", unit: "₱", def: 5, c: "#9B7BE8" },
  { key: "sellerShipping", label: "Seller shipping fee", unit: "₱", def: 0, c: "#B48CF0" },
] as const;
type FeeKey = (typeof FEE_DEFS)[number]["key"];
const MARGIN_PRESETS = [15, 20, 30, 40, 50];
const PREMIUM_BUMP = 10; // premium tier = target margin + this many points
const STORAGE_KEY = "niunorm-price-calc-v2";

type Fees = Record<FeeKey, number>;
type FeeInputs = Record<FeeKey, string>;
const DEFAULT_FEE_INPUTS = Object.fromEntries(FEE_DEFS.map((d) => [d.key, String(d.def)])) as FeeInputs;
const pctFees = (f: Fees) => FEE_DEFS.reduce((n, d) => (d.unit === "%" ? n + f[d.key] : n), 0);
const fixedFees = (f: Fees) => FEE_DEFS.reduce((n, d) => (d.unit === "₱" ? n + f[d.key] : n), 0);
type State = { expenses: string; margin: string; affiliate: string; current: string; fees: FeeInputs };
const INITIAL: State = { expenses: "", margin: "30", affiliate: "10", current: "", fees: DEFAULT_FEE_INPUTS };

/* ---------- Math ---------- */

const num = (v: string | number) => {
  const n = typeof v === "number" ? v : Number(String(v).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
};
/** Rounds up to the next price ending in 9 (487.3 → 489). */
const endIn9 = (x: number) => {
  const n = Math.ceil(x);
  return n - (n % 10) + 9;
};
const peso = (n: number, dp = 0) => `₱${n.toLocaleString("en-PH", { minimumFractionDigits: dp, maximumFractionDigits: dp })}`;

type Breakdown = {
  price: number;
  expenses: number;
  fees: Record<FeeKey, number>; // peso amount of each fee
  affiliate: number;
  profit: number;
  margin: number;
};

function breakdown(price: number, expenses: number, affiliatePct: number, fees: Fees): Breakdown {
  const amounts = Object.fromEntries(FEE_DEFS.map((d) => [d.key, d.unit === "%" ? (price * fees[d.key]) / 100 : fees[d.key]])) as Record<FeeKey, number>;
  const feeTotal = FEE_DEFS.reduce((n, d) => n + amounts[d.key], 0);
  const affiliate = (price * affiliatePct) / 100;
  const profit = price - expenses - feeTotal - affiliate;
  return { price, expenses, fees: amounts, affiliate, profit, margin: price > 0 ? (profit / price) * 100 : 0 };
}

/** Price that leaves `marginPct` of the price as profit after fees and expenses, or null if impossible. */
function priceFor(expenses: number, marginPct: number, affiliatePct: number, fees: Fees): number | null {
  const pct = (pctFees(fees) + affiliatePct + marginPct) / 100;
  if (pct >= 1) return null;
  return (expenses + fixedFees(fees)) / (1 - pct);
}

/* ---------- Helpers ---------- */

function loadState(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL;
    const p = JSON.parse(raw);
    const f = { ...DEFAULT_FEE_INPUTS };
    for (const d of FEE_DEFS) if (p?.fees?.[d.key] !== undefined) f[d.key] = String(p.fees[d.key]);
    return { ...INITIAL, ...p, fees: f };
  } catch {
    return INITIAL;
  }
}

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Smoothly animates a displayed number toward `value`. */
function useTween(value: number, ms = 600) {
  const [v, setV] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    if (reduced()) {
      setV(value);
      return;
    }
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / ms);
      const cur = a + (value - a) * (1 - (1 - k) ** 3);
      setV(cur);
      from.current = cur;
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, ms]);
  return v;
}

function Tween({ value, dp = 0 }: { value: number; dp?: number }) {
  const v = useTween(value);
  return <>{peso(v, dp)}</>;
}

const spot = {
  onPointerMove: (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${((e.clientX - r.left) / r.width) * 100}%`);
    e.currentTarget.style.setProperty("--y", `${((e.clientY - r.top) / r.height) * 100}%`);
  },
};

function NumField({
  id,
  label,
  hint,
  value,
  onChange,
  prefix,
  suffix,
  placeholder,
  big = false,
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  big?: boolean;
}) {
  return (
    <label className={`${styles.field} ${big ? styles.fieldBig : ""}`} htmlFor={id}>
      <span className={styles.fieldLabel}>{label}</span>
      {hint && <span className={styles.fieldHint}>{hint}</span>}
      <span className={styles.inputWrap}>
        {prefix && <i className={styles.affix}>{prefix}</i>}
        <input
          id={id}
          inputMode="decimal"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value.replace(/[^\d.]/g, "").replace(/(\..*)\./g, "$1"))}
          autoComplete="off"
        />
        {suffix && <i className={styles.affix}>{suffix}</i>}
      </span>
    </label>
  );
}

/* ---------- Breakdown bar ---------- */

function BreakdownView({ b }: { b: Breakdown }) {
  const total = Math.max(b.price, 1);
  const rows = [
    { key: "expenses", label: "Your expenses", c: "#9A8FA8", v: b.expenses },
    ...FEE_DEFS.filter((d) => b.fees[d.key] > 0.004).map((d) => ({ key: d.key as string, label: d.label, c: d.c, v: b.fees[d.key] })),
    ...(b.affiliate > 0.004 ? [{ key: "affiliate", label: "Affiliate commission", c: "#F5B94F", v: b.affiliate }] : []),
  ];
  return (
    <div className={styles.bd}>
      <div className={styles.bdBar} aria-hidden>
        {[...rows, { key: "profit", c: "#F04B9A", v: b.profit }].map((r) => (
          <span key={r.key} style={{ width: `${(Math.max(0, r.v) / total) * 100}%`, background: r.c }} />
        ))}
      </div>
      <ul className={styles.bdList}>
        <li className={styles.bdTotal}>
          <span>Selling price</span>
          <strong>{peso(b.price, 2)}</strong>
        </li>
        {rows.map((r) => (
          <li key={r.key} style={{ ["--c" as string]: r.c }}>
            <span>
              <i /> {r.label}
            </span>
            <strong>−{peso(r.v, 2)}</strong>
          </li>
        ))}
        <li className={styles.bdProfit} style={{ ["--c" as string]: "#F04B9A" }}>
          <span>
            <i /> Your profit
          </span>
          <strong className={b.profit < 0 ? styles.neg : ""}>
            {b.profit < 0 ? "−" : ""}
            {peso(Math.abs(b.profit), 2)}
          </strong>
        </li>
      </ul>
    </div>
  );
}

/* ---------- Page ---------- */

export default function Calculator() {
  const [s, setS] = useState<State>(loadState);
  const [feesOpen, setFeesOpen] = useState(false);
  const [view, setView] = useState<"suggested" | "current">("suggested");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    } catch {
      /* ignore */
    }
  }, [s]);

  const set = <K extends keyof State>(k: K, v: State[K]) => setS((x) => ({ ...x, [k]: v }));
  const setFee = (k: FeeKey, v: string) => setS((x) => ({ ...x, fees: { ...x.fees, [k]: v } }));
  const fees: Fees = useMemo(() => Object.fromEntries(FEE_DEFS.map((d) => [d.key, num(s.fees[d.key])])) as Fees, [s.fees]);

  const expenses = num(s.expenses);
  const margin = num(s.margin);
  const affiliate = num(s.affiliate);
  const current = num(s.current);
  const totalPct = pctFees(fees) + affiliate;

  const r = useMemo(() => {
    if (!(expenses > 0)) return null;
    const be = priceFor(expenses, 0, affiliate, fees);
    const sug = priceFor(expenses, margin, affiliate, fees);
    const pre = priceFor(expenses, margin + PREMIUM_BUMP, affiliate, fees);
    return {
      breakEven: be === null ? null : Math.ceil(be),
      suggested: sug === null ? null : endIn9(sug),
      premium: pre === null ? null : endIn9(pre),
    };
  }, [expenses, margin, affiliate, fees]);

  const sugB = r?.suggested ? breakdown(r.suggested, expenses, affiliate, fees) : null;
  const preB = r?.premium ? breakdown(r.premium, expenses, affiliate, fees) : null;
  const curB = current > 0 && expenses > 0 ? breakdown(current, expenses, affiliate, fees) : null;
  const impossible = expenses > 0 && r?.suggested === null;
  const view_b = view === "current" ? curB : sugB;

  const status = curB
    ? curB.profit < 0
      ? { k: "loss", t: "You’re losing money on every order.", c: "#FF5A7A" }
      : curB.margin < margin
        ? { k: "thin", t: `Below your ${margin}% target margin.`, c: "#F5B94F" }
        : { k: "good", t: "Healthy. You’re hitting your target.", c: "#35D6C4" }
    : null;

  async function copy() {
    if (!r?.suggested || !sugB) return;
    const text = `TikTok Shop price (Niunorm calculator)\nExpenses: ${peso(expenses, 2)}\nSuggested price: ${peso(r.suggested)} (profit ${peso(sugB.profit, 2)}, ${sugB.margin.toFixed(1)}%)\nBreak-even: ${r.breakEven ? peso(r.breakEven) : "—"}\nPremium: ${r.premium ? peso(r.premium) : "—"}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }

  const gaugePct = curB ? Math.max(0, Math.min(100, curB.margin * 1.6 + 20)) : 0;

  // Mobile: show a sticky price bar while the main result card is off screen.
  const resultRef = useRef<HTMLDivElement>(null);
  const [resultVisible, setResultVisible] = useState(true);
  useEffect(() => {
    const el = resultRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setResultVisible(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const showBar = !!(r?.suggested && sugB) && !resultVisible;
  const scrollToResult = () => resultRef.current?.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "center" });

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden />
        <div className={styles.glowA} aria-hidden />
        <div className={styles.glowB} aria-hidden />
        <div className={styles.symbols} aria-hidden>
          {["₱", "%", "+", "÷", "₱", "×", "%", "=", "₱", "−"].map((c, i) => (
            <i key={i} style={{ left: `${(i * 37 + 6) % 100}%`, animationDuration: `${10 + (i % 5) * 2}s`, animationDelay: `${-((i * 1.4) % 10)}s`, color: ["#F04B9A", "#F5B94F", "#35D6C4"][i % 3] }}>
              {c}
            </i>
          ))}
        </div>
        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6 sm:pb-12 md:px-10 md:pt-40">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className={`${styles.eyebrow} ${styles.rise}`}>
              <span className={styles.liveDot} /> Free tool
            </p>
            <span className={`${styles.badge} ${styles.rise}`} style={{ animationDelay: "0.1s" }}>
              TikTok Shop Partner · Platinum
            </span>
          </div>
          <h1 className={styles.heroTitle}>
            <span className={styles.mask}>
              <span className={styles.wordIn} style={{ animationDelay: "0.15s" }}>TikTok Shop</span>
            </span>
            <span className={styles.mask}>
              <span className={styles.wordIn} style={{ animationDelay: "0.3s" }}>
                <span className={styles.grad}>price calculator.</span>
              </span>
            </span>
          </h1>
          <p className={`${styles.rise} mt-6 max-w-2xl text-base leading-relaxed text-cream/75 sm:text-lg`} style={{ animationDelay: "0.5s" }}>
            Find your <b className="text-teal">best selling price</b> after every TikTok Shop fee, so each order is profitable.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className={styles.calc}>
        <div className="mx-auto grid max-w-7xl gap-4 px-4 pb-20 sm:gap-5 sm:px-6 md:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          {/* Inputs */}
          <div className={`${styles.card} ${styles.inputs} ${styles.rise} min-w-0`} style={{ animationDelay: "0.6s" }} {...spot}>
            <span className={styles.cardSpot} aria-hidden />
            <p className={styles.cardLabel}>
              <span>01</span> Your product
            </p>

            <NumField
              id="c-expenses"
              big
              label="Total expenses per product"
              hint="Everything one sold unit costs you: product cost / COGS, packaging, freebies, inserts, labor, warehousing."
              prefix="₱"
              placeholder="0.00"
              value={s.expenses}
              onChange={(v) => set("expenses", v)}
            />

            <NumField
              id="c-margin"
              label="Target profit margin"
              hint="Your net profit as a % of the selling price, after all fees and expenses."
              suffix="%"
              value={s.margin}
              onChange={(v) => set("margin", v)}
            />
            <div className={styles.presets} role="group" aria-label="Margin presets">
              {MARGIN_PRESETS.map((m) => (
                <button key={m} type="button" aria-pressed={margin === m} className={`${styles.preset} ${margin === m ? styles.presetOn : ""}`} onClick={() => set("margin", String(m))}>
                  {m}%
                </button>
              ))}
            </div>

            <NumField
              id="c-affiliate"
              label="Affiliate commission"
              hint="The commission rate you give affiliates. Set 0 if no affiliates sell this product."
              suffix="%"
              value={s.affiliate}
              onChange={(v) => set("affiliate", v)}
            />

            <div className={`${styles.fees} ${feesOpen ? styles.feesOpen : ""}`}>
              <button type="button" className={styles.feesHead} aria-expanded={feesOpen} onClick={() => setFeesOpen((o) => !o)}>
                <span>
                  TikTok Shop fee settings
                  <em>
                    {Number(pctFees(fees).toFixed(2))}% {fixedFees(fees) > 0 ? `+ ${peso(fixedFees(fees))} ` : ""}per order
                  </em>
                </span>
                <i className={styles.plus} aria-hidden />
              </button>
              <div className={styles.feesBody}>
                <div>
                  <p className={styles.feeNote}>
                    Pre-filled from a real PH settlement breakdown (Nov 2026). Rates differ by category and program. Copy them from your own
                    Settlement breakdown.
                  </p>
                  <div className={styles.feeGrid}>
                    {FEE_DEFS.map((d) => (
                      <NumField
                        key={d.key}
                        id={`f-${d.key}`}
                        label={d.label}
                        prefix={d.unit === "₱" ? "₱" : undefined}
                        suffix={d.unit === "%" ? "%" : undefined}
                        value={s.fees[d.key]}
                        onChange={(v) => setFee(d.key, v)}
                      />
                    ))}
                  </div>
                  <button type="button" className={styles.resetBtn} onClick={() => set("fees", DEFAULT_FEE_INPUTS)}>
                    Reset to default fees
                  </button>

                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className={`${styles.results} min-w-0`}>
            <div ref={resultRef} className={`${styles.card} ${styles.hero2} ${styles.rise}`} style={{ animationDelay: "0.7s" }} {...spot}>
              <span className={styles.cardEdge} aria-hidden />
              <span className={styles.heroGlow} aria-hidden />
              <div className="flex items-start justify-between gap-3">
                <p className={styles.resLabel}>Best suggested selling price</p>
                {r?.suggested && (
                  <button type="button" onClick={copy} className={styles.copyBtn}>
                    {copied ? "Copied!" : "Copy result"}
                  </button>
                )}
              </div>
              <p className={styles.bigPrice} aria-live="polite">
                {r?.suggested ? <Tween value={r.suggested} /> : impossible ? "—" : "₱—"}
              </p>
              <p className={styles.resSub}>
                {impossible ? (
                  <span className={styles.neg}>
                    Fees ({totalPct.toFixed(1)}%) + margin ({margin}%) reach 100% or more. Lower your margin or affiliate rate.
                  </span>
                ) : sugB ? (
                  <>
                    You keep <b className="text-pink">{peso(sugB.profit, 2)}</b> per order ({sugB.margin.toFixed(1)}% margin). Rounded up to a price ending in 9.
                  </>
                ) : (
                  "Enter your total expenses per product to see your price."
                )}
              </p>
            </div>

            <div className={styles.tiers}>
              {[
                { k: "Break-even", v: r?.breakEven, sub: r?.breakEven ? "₱0 profit. Never go below" : "—", c: "#9A8FA8" },
                { k: "Suggested", v: r?.suggested, sub: sugB ? `${peso(sugB.profit)} profit · ${margin}%` : "—", c: "#F04B9A", on: true },
                { k: "Premium", v: r?.premium, sub: preB ? `${peso(preB.profit)} profit · ${margin + PREMIUM_BUMP}%` : "—", c: "#F5B94F" },
              ].map((t, i) => (
                <div key={t.k} className={`${styles.tier} ${t.on ? styles.tierOn : ""} ${styles.rise}`} style={{ ["--c" as string]: t.c, animationDelay: `${0.8 + i * 0.08}s` }}>
                  <span className={styles.tierK}>{t.k}</span>
                  <strong className={styles.tierV}>{t.v ? <Tween value={t.v} /> : "—"}</strong>
                  <span className={styles.tierSub}>{t.sub}</span>
                </div>
              ))}
            </div>

            <div className={`${styles.card} ${styles.check} ${styles.rise}`} style={{ animationDelay: "1s" }} {...spot}>
              <span className={styles.cardSpot} aria-hidden />
              <p className={styles.cardLabel}>
                <span>02</span> Check your current price
              </p>
              <p className={styles.fieldHint}>Already selling? Enter your current selling price to see what you actually keep.</p>
              <div className={styles.checkRow}>
                <NumField id="c-current" label="Current selling price" prefix="₱" placeholder="e.g. 499" value={s.current} onChange={(v) => { set("current", v); if (v) setView("current"); }} />
                {curB && status && (
                  <div className={styles.verdict} style={{ ["--c" as string]: status.c }}>
                    <div className={styles.gauge} aria-hidden>
                      <svg viewBox="0 0 100 56">
                        <path d="M8 50 A42 42 0 0 1 92 50" className={styles.gTrack} />
                        <path d="M8 50 A42 42 0 0 1 92 50" className={styles.gFill} pathLength={100} style={{ strokeDashoffset: 100 - gaugePct }} />
                      </svg>
                      <b>{curB.margin.toFixed(1)}%</b>
                    </div>
                    <span className={styles.verdictText}>
                      <strong className={curB.profit < 0 ? styles.neg : ""}>
                        {curB.profit < 0 ? "−" : ""}
                        {peso(Math.abs(curB.profit), 2)} per order
                      </strong>
                      <em>{status.t}</em>
                    </span>
                  </div>
                )}
              </div>
              {curB && r?.suggested && curB.profit < (sugB?.profit ?? 0) && (
                <p className={styles.tip}>
                  Raising your price to <b>{peso(r.suggested)}</b> adds <b>{peso((sugB?.profit ?? 0) - curB.profit, 2)}</b> profit per order.
                </p>
              )}

              <div className={styles.tabs} role="tablist" aria-label="Breakdown">
                <button type="button" role="tab" aria-selected={view === "suggested"} className={view === "suggested" ? styles.tabOn : ""} onClick={() => setView("suggested")}>
                  <span className={styles.tabPre}>Breakdown: </span>
                  <span className={styles.tabCap}>suggested price</span>
                </button>
                <button type="button" role="tab" aria-selected={view === "current"} className={view === "current" ? styles.tabOn : ""} onClick={() => setView("current")} disabled={!curB}>
                  <span className={styles.tabPre}>Breakdown: </span>
                  <span className={styles.tabCap}>current price</span>
                </button>
              </div>
              {view_b ? <BreakdownView key={view} b={view_b} /> : <p className={styles.empty}>{view === "current" ? "Enter your current price above to see its breakdown." : "Enter your expenses to see where every peso goes."}</p>}
            </div>

            <p className={styles.formula}>
              <b>How it works:</b> Price = (expenses + fixed fees) ÷ (1 − % fees − affiliate % − target margin). The suggested price is
              rounded up to a price ending in 9. Fees are estimates. TikTok may change rates, add campaign or voucher fees, or apply caps,
              so check your actual Settlement breakdown.
            </p>
          </div>
        </div>
      </section>

      {/* Mobile sticky result */}
      <div className={`${styles.stickyBar} ${showBar ? styles.stickyOn : ""}`} aria-hidden={!showBar} inert={!showBar}>
        <button type="button" onClick={scrollToResult} className={styles.stickyInner}>
          <span className={styles.stickyLabel}>Suggested price</span>
          <strong className={styles.stickyPrice}>{r?.suggested ? <Tween value={r.suggested} /> : "₱—"}</strong>
          <span className={styles.stickyProfit}>{sugB ? `+${peso(sugB.profit)} profit` : ""}</span>
          <span className={styles.stickyGo} aria-hidden>
            ↑
          </span>
        </button>
      </div>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-6 md:px-10 md:pb-32">
        <div className={styles.banner} {...spot}>
          <span className={styles.bannerGlare} aria-hidden />
          <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <p className={styles.bannerKicker}>
                <span /> Free strategy call
              </p>
              <h2 className="mt-4 font-display text-[clamp(1.7rem,3.8vw,2.8rem)] font-black uppercase leading-[0.95] tracking-tight text-ink">
                Want help hitting <span className={styles.bannerOutline}>this margin?</span>
              </h2>
              <p className="mt-3 max-w-xl text-ink/75">Pricing is step one. We handle GMV Max, affiliates, content, and LIVE to turn that margin into real sales.</p>
            </div>
            <Link to="/apply" className={`${styles.bannerBtn} group`}>
              Apply now
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
