import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import styles from "./results.module.css";
import resultsBg from "../../imports/resultsBg";

type Stat = { label: string; value: number; suffix: string; caption: string; color: string; icon: string; bars: number[] };
const STATS: Stat[] = [
  { label: "GMV", value: 700, suffix: "M", caption: "generated on TikTok Shop", color: "#35D6C4", icon: "M3 17l6-6 4 4 8-8M15 7h6v6", bars: [30, 42, 38, 55, 64, 78, 100] },
  { label: "Brands", value: 100, suffix: "+", caption: "managed and growing", color: "#F5B94F", icon: "M4 7h16l-1.5 12h-13L4 7zM8 7a4 4 0 018 0", bars: [40, 55, 48, 70, 62, 84, 100] },
  { label: "Partner", value: 5, suffix: "×", caption: "TikTok Shop Partner", color: "#F04B9A", icon: "M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.3l6.1-.7L12 3z", bars: [20, 40, 60, 80, 100] },
];

function StatCard({ stat, className }: { stat: Stat; className?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(stat.value);
      return;
    }
    let raf = 0;
    const t0 = performance.now() + 1800; // wait for the card to appear
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - t0) / 2000));
      setN(Math.round(stat.value * (1 - (1 - t) ** 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stat.value]);

  const tilt = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--rx", `${(-((e.clientY - r.top) / r.height - 0.5) * 14).toFixed(1)}deg`);
    el.style.setProperty("--ry", `${(((e.clientX - r.left) / r.width - 0.5) * 14).toFixed(1)}deg`);
  };
  const reset = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <div className={`${styles.chip} ${className ?? ""}`} style={{ ["--c" as string]: stat.color }}>
      <div ref={ref} className={styles.card} onPointerMove={tilt} onPointerLeave={reset}>
        <div className={styles.cardTop}>
          <span className={styles.iconWrap}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={stat.icon} />
            </svg>
          </span>
          <span className="label" style={{ color: stat.color }}>{stat.label}</span>
          <span className={styles.liveTag}><i /> Live</span>
        </div>
        <div className={styles.cardValue}>
          {n}
          <span style={{ color: stat.color }}>{stat.suffix}</span>
        </div>
        <p className={styles.cardCaption}>{stat.caption}</p>
        <div className={styles.spark}>
          {stat.bars.map((h, i) => (
            <span key={i} style={{ height: `${h}%`, animationDelay: `${2 + i * 0.1}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Adds the in-view class once the element scrolls into view. */
function useInView<T extends Element>(threshold = 0.35) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

const GMV_MILESTONES = ["100M", "250M", "500M", "700M"];
const GMV_TOASTS = [
  { tag: "Order placed", detail: "Beauty · ₱1,299", color: "#F04B9A" },
  { tag: "New buyer", detail: "Fashion · ₱849", color: "#35D6C4" },
  { tag: "Checkout", detail: "Wellness · ₱2,150", color: "#F5B94F" },
  { tag: "Repeat order", detail: "Pet essentials · ₱599", color: "#F04B9A" },
];

function GmvSection() {
  const [ref, inView] = useInView<HTMLElement>();
  const [n, setN] = useState(0);
  const [toast, setToast] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(700);
      return;
    }
    let raf = 0;
    const t0 = performance.now() + 300;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - t0) / 2200));
      setN(Math.round(700 * (1 - (1 - t) ** 4)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const iv = window.setInterval(() => setToast((x) => (x + 1) % GMV_TOASTS.length), 2600);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(iv);
    };
  }, [inView]);

  const t = GMV_TOASTS[toast];

  return (
    <section ref={ref} id="gmv" className={`${styles.gmv} ${inView ? styles.inView : ""}`}>
      <div className={styles.gmvDots} aria-hidden />
      <span className={styles.gmvWatermark} aria-hidden>700M</span>
      <svg className={styles.gmvCurve} viewBox="0 0 1200 300" preserveAspectRatio="none" fill="none" aria-hidden>
        <defs>
          <linearGradient id="gmvCurve" x1="0" x2="1">
            <stop offset="0" stopColor="#F04B9A" stopOpacity="0" />
            <stop offset="0.4" stopColor="#F04B9A" />
            <stop offset="1" stopColor="#F5B94F" />
          </linearGradient>
          <linearGradient id="gmvArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#F04B9A" stopOpacity="0.18" />
            <stop offset="1" stopColor="#F04B9A" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className={styles.gmvArea} d="M0 290 C200 280 320 260 460 220 S720 150 860 100 S1080 30 1200 10 L1200 300 L0 300Z" fill="url(#gmvArea)" />
        <path className={styles.gmvLine} pathLength={1} d="M0 290 C200 280 320 260 460 220 S720 150 860 100 S1080 30 1200 10" stroke="url(#gmvCurve)" strokeWidth="3" />
      </svg>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-10 md:py-32">
        <div>
          <h2 className={styles.bigNumber} aria-label="700M">
            <span className={styles.bigNumberShadow} aria-hidden>{n}M</span>
            <span className={styles.bigNumberFill}>{n}M</span>
          </h2>
          <h3 className={`mt-4 font-display text-[clamp(1.5rem,4vw,2.5rem)] font-black uppercase tracking-tight ${styles.reveal}`} style={{ transitionDelay: "0.2s" }}>
            GMV generated<span className="text-pink">.</span>
          </h3>

          <div className={styles.rail} aria-hidden>
            <span className={styles.railFill} />
            {GMV_MILESTONES.map((m, i) => (
              <span key={m} className={styles.railStop} style={{ left: `${(i / (GMV_MILESTONES.length - 1)) * 100}%`, transitionDelay: `${0.5 + i * 0.5}s` }}>
                <i />
                <b>{m}</b>
              </span>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className={styles.gmvCard}>
            <div className="space-y-5 text-base leading-relaxed text-ink/70 sm:text-lg">
              <p className={`text-ink ${styles.reveal}`} style={{ transitionDelay: "0.3s" }}>
                A collective milestone built through our work with brands on TikTok Shop.
              </p>
              <p className={styles.reveal} style={{ transitionDelay: "0.45s" }}>
                Behind this number are products discovered, orders placed, and teams working
                together to grow their businesses.
              </p>
              <p className={`font-mono text-xs uppercase tracking-[0.14em] text-ink/50 ${styles.reveal}`} style={{ transitionDelay: "0.6s" }}>
                *Combined GMV across brands managed by NiuNorm.*
              </p>
            </div>
          </div>

          <div className={styles.toastSlot} aria-hidden>
            <div key={toast} className={styles.toast} style={{ ["--c" as string]: t.color }}>
              <span className={styles.toastIcon}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </span>
              <span className="flex flex-col">
                <b className="text-xs font-extrabold text-cream">{t.tag}</b>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-cream/60">{t.detail}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Deterministic so the layout is stable between renders.
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  x: (i * 37 + 11) % 100,
  s: 3 + ((i * 7) % 5),
  d: 9 + ((i * 13) % 9),
  o: (i * 1.7) % 14,
  c: ["#F04B9A", "#35D6C4", "#F5B94F"][i % 3],
}));

const MARQUEE_ITEMS = [
  "700M GMV generated",
  "100+ brands managed",
  "5× TikTok Shop Partner",
  "Beauty · Fashion · Wellness · Pet",
  "Built with Filipino brands",
];

const CATEGORIES = [
  { name: "Beauty", color: "#F04B9A", icon: "M12 3c3 4 6 6 6 10a6 6 0 01-12 0c0-4 3-6 6-10z" },
  { name: "Fashion", color: "#F5B94F", icon: "M8 3l-5 4 3 3 2-1v12h8V9l2 1 3-3-5-4a4 4 0 01-8 0z" },
  { name: "Wellness", color: "#35D6C4", icon: "M12 21s-8-5-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 6-8 11-8 11z" },
  { name: "Pet Essentials", color: "#FF66B2", icon: "M5 11a2 2 0 100-4 2 2 0 000 4zm14 0a2 2 0 100-4 2 2 0 000 4zM9 8a2 2 0 100-4 2 2 0 000 4zm6 0a2 2 0 100-4 2 2 0 000 4zM12 12c-3 0-6 3-6 6 0 2 2 2 3 2s2-1 3-1 2 1 3 1 3 0 3-2c0-3-3-6-6-6z" },
];

function BrandsSection() {
  const [ref, inView] = useInView<HTMLElement>(0.3);
  const [n, setN] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(100);
      return;
    }
    let raf = 0;
    const t0 = performance.now() + 400;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - t0) / 1800));
      setN(Math.round(100 * (1 - (1 - t) ** 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const iv = window.setInterval(() => setActive((x) => (x + 1) % CATEGORIES.length), 2200);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(iv);
    };
  }, [inView]);

  return (
    <section ref={ref} className={`${styles.brands} ${inView ? styles.inView : ""}`}>
      <div className={styles.brandsGrid} aria-hidden />
      <div className={styles.brandsGlow} aria-hidden />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-6 md:grid-cols-[1.05fr_0.95fr] md:px-10 md:py-32">
        <div>
          <h2 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] font-black uppercase leading-[0.9] tracking-tight">
            <span className={`${styles.reveal} block`}>100+ brands.</span>
            <span className={`${styles.reveal} ${styles.tealShimmer} block`} style={{ transitionDelay: "0.15s" }}>
              Part of the NiuNorm story.
            </span>
          </h2>

          <div className="mt-8 grid max-w-2xl gap-6 text-base leading-relaxed text-cream/70 sm:text-lg md:grid-cols-2">
            <p className={styles.reveal} style={{ transitionDelay: "0.3s" }}>
              We’ve managed over 100 brands, each with its own products, customers, and ambitions.
            </p>
            <p className={styles.reveal} style={{ transitionDelay: "0.45s" }}>
              From beauty and fashion to wellness and pet essentials, our experience spans the
              categories Filipino shoppers bring into their everyday lives.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {CATEGORIES.map((c, i) => (
              <button
                key={c.name}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`${styles.pill} ${active === i ? styles.pillOn : ""} ${styles.reveal}`}
                style={{ ["--c" as string]: c.color, transitionDelay: `${0.6 + i * 0.1}s` }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d={c.icon} />
                </svg>
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Orbit */}
        <div className={styles.orbit} aria-hidden>
          <span className={styles.wave} />
          <span className={`${styles.wave} ${styles.wave2}`} />
          <span className={`${styles.wave} ${styles.wave3}`} />
          <div className={styles.ringOuter}>
            {Array.from({ length: 9 }, (_, i) => (
              <span key={i} className={styles.dotNode} style={{ ["--a" as string]: `${i * 40}deg` }} />
            ))}
          </div>
          <div className={styles.ringInner}>
            {CATEGORIES.map((c, i) => (
              <div key={c.name} className={styles.node} style={{ ["--a" as string]: `${i * 90 - 45}deg`, ["--c" as string]: c.color }}>
                <div className={`${styles.nodeInner} ${active === i ? styles.nodeOn : ""}`}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d={c.icon} />
                  </svg>
                  <span>{c.name}</span>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.core}>
            <strong>
              {n}
              <em>+</em>
            </strong>
            <span>Brands managed</span>
          </div>
        </div>
      </div>
    </section>
  );
}


// Replace with real badges/certificates: official title + date
const PARTNER_BADGES = [
  { title: "TikTok Shop Partner", date: "Add date" },
  { title: "TikTok Shop Partner", date: "Add date" },
  { title: "TikTok Shop Partner", date: "Add date" },
  { title: "TikTok Shop Partner", date: "Add date" },
  { title: "TikTok Shop Partner", date: "Add date" },
];

const STAR_PATH = "M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z";

function PartnerSection() {
  const [ref, inView] = useInView<HTMLElement>(0.25);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(5);
      return;
    }
    const timers = [1, 2, 3, 4, 5].map((v) => window.setTimeout(() => setN(v), 500 + v * 380));
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <section ref={ref} className={`${styles.partner} ${inView ? styles.inView : ""}`}>
      <div className={styles.partnerGlow} aria-hidden />
      <div className={styles.partnerSparks} aria-hidden>
        {Array.from({ length: 16 }, (_, i) => (
          <span key={i} style={{ left: `${(i * 53 + 7) % 100}%`, animationDelay: `${-(i * 1.3) % 9}s`, animationDuration: `${7 + (i % 5)}s` }} />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 md:py-32">
        <div className="grid items-center gap-14 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] font-black uppercase leading-[0.9] tracking-tight">
              <span className={`${styles.reveal} block`}>
                <span className={styles.goldText}>5×</span> TikTok
              </span>
              <span className={`${styles.reveal} block`} style={{ transitionDelay: "0.15s" }}>Shop Partner.</span>
            </h2>
            <div className="mt-8 max-w-xl space-y-4 text-base leading-relaxed text-cream/70 sm:text-lg">
              <p className={styles.reveal} style={{ transitionDelay: "0.3s" }}>
                A milestone in NiuNorm’s journey, alongside the brands we’ve worked with and the
                teams behind them.
              </p>
              <p className={styles.reveal} style={{ transitionDelay: "0.45s" }}>
                Our TikTok Shop partner recognitions are part of that story.
              </p>
            </div>
          </div>

          {/* Sunburst medallion */}
          <div className={styles.medal} aria-hidden>
            <span className={styles.rays} />
            <span className={styles.medalRing} />
            <span className={`${styles.medalRing} ${styles.medalRing2}`} />
            <div className={styles.medalCore}>
              <strong>{n}<em>×</em></strong>
              <span>Partner</span>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 24 24" className={n >= i ? styles.starOn : ""}>
                    <path d={STAR_PATH} />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recognitions timeline */}
        <div className={styles.timeline}>
          <span className={styles.timelineLine} aria-hidden />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {PARTNER_BADGES.map((b, i) => (
              <div key={i} className={`${styles.badgeCard} ${styles.reveal}`} style={{ transitionDelay: `${0.5 + i * 0.18}s` }}>
                <span className={styles.badgeNode} aria-hidden />
                <svg className={styles.shield} width="52" height="60" viewBox="0 0 52 60" aria-hidden>
                  <defs>
                    <linearGradient id={`sg${i}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#FFE29A" />
                      <stop offset="0.5" stopColor="#F5B94F" />
                      <stop offset="1" stopColor="#C97A1B" />
                    </linearGradient>
                  </defs>
                  <path d="M26 2l21 7v18c0 15-9 25-21 31C14 52 5 42 5 27V9l21-7z" fill={`url(#sg${i})`} />
                  <path d="M26 8l15 5v14c0 11-6 19-15 24-9-5-15-13-15-24V13l15-5z" fill="#130B1E" fillOpacity="0.88" />
                  <g transform="translate(14 15) scale(1)">
                    <path d={STAR_PATH} fill="#F5B94F" />
                  </g>
                </svg>
                <span className={styles.badgeIndex}>0{i + 1}</span>
                <h3 className="text-base font-extrabold leading-tight">{b.title}</h3>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-amber/80">{b.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const CTA_STEPS = [18, 30, 44, 60, 78, 100];

function ClosingCta() {
  const [ref, inView] = useInView<HTMLElement>(0.3);
  const btnRef = useRef<HTMLSpanElement>(null);

  // Button leans toward the cursor.
  const lean = (e: React.PointerEvent<HTMLSpanElement>) => {
    const el = btnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.18;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.3;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const unlean = () => {
    if (btnRef.current) btnRef.current.style.transform = "";
  };

  return (
    <section ref={ref} className={`${styles.cta} ${inView ? styles.inView : ""}`}>
      <div className={styles.ctaGlow} aria-hidden />
      <div className={styles.ctaGrid} aria-hidden />
      <div className={styles.ctaSteps} aria-hidden>
        {CTA_STEPS.map((h, i) => (
          <span key={i} style={{ ["--h" as string]: `${h}%`, transitionDelay: `${0.2 + i * 0.12}s` }}>
            {i === CTA_STEPS.length - 1 && <i className={styles.flag} />}
          </span>
        ))}
      </div>
      <div className={styles.partnerSparks} aria-hidden>
        {Array.from({ length: 18 }, (_, i) => (
          <span key={i} style={{ left: `${(i * 47 + 13) % 100}%`, animationDelay: `${-(i * 1.1) % 9}s`, animationDuration: `${6 + (i % 6)}s`, background: ["#F04B9A", "#F5B94F", "#35D6C4"][i % 3], color: ["#F04B9A", "#F5B94F", "#35D6C4"][i % 3] }} />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-24 text-center sm:px-6 md:px-10 md:py-36">
        <div className={styles.ctaRing} aria-hidden />
        <p className={`label mb-6 text-teal ${styles.reveal}`}>Your turn</p>
        <h2 className="mx-auto max-w-4xl font-display text-[clamp(2.25rem,7vw,5rem)] font-black uppercase leading-[0.92] tracking-tight">
          <span className={`${styles.reveal} block`}>Let’s build your</span>
          <span className={`${styles.reveal} ${styles.shimmer2} block`} style={{ transitionDelay: "0.18s" }}>
            next milestone.
          </span>
        </h2>
        <p className={`${styles.reveal} mx-auto mt-8 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg`} style={{ transitionDelay: "0.4s" }}>
          You’ve seen our numbers. Let’s talk about the goals behind yours.
        </p>
        <p className={`${styles.reveal} mx-auto mt-3 max-w-xl text-base leading-relaxed text-cream/70 sm:text-lg`} style={{ transitionDelay: "0.52s" }}>
          Tell us where your TikTok Shop stands today and what you want to achieve next.
        </p>

        <span
          ref={btnRef}
          className={`${styles.btnHalo} ${styles.lean} ${styles.reveal} mt-10`}
          style={{ transitionDelay: "0.7s" }}
          onPointerMove={lean}
          onPointerLeave={unlean}
        >
          <Link to="/apply" className={`${btnPink} ${styles.btnShine}`}>
            Apply to Work With NiuNorm
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </span>

        <div className={`${styles.reveal} mt-10 flex flex-wrap items-center justify-center gap-3`} style={{ transitionDelay: "0.9s" }}>
          {["700M GMV", "100+ Brands", "5× Partner"].map((t) => (
            <span key={t} className={styles.trust}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

const btnPink =
  "soft-btn-pink group inline-flex items-center justify-center gap-2 rounded-full bg-pink px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-ink transition-all hover:-translate-y-0.5";

export default function Results() {
  const heroRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = heroRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
      el.style.setProperty("--px", String((e.clientX - r.left) / r.width - 0.5));
      el.style.setProperty("--py", String((e.clientY - r.top) / r.height - 0.5));
    };
    el.addEventListener("pointermove", move);
    return () => el.removeEventListener("pointermove", move);
  }, []);

  return (
    <main className="bg-ink text-cream">
      {/* HERO */}
      <section ref={heroRef} className={styles.hero}>
        <div className={styles.ring} aria-hidden />
        <div className={styles.photo} style={{ backgroundImage: `url(${resultsBg})` }} aria-hidden />
        <div className={styles.photoShade} aria-hidden />
        <div className={styles.grid} aria-hidden />
        <div className={styles.spotlight} aria-hidden />
        <div className={styles.photoSweep} aria-hidden />
        <div className={styles.particles} aria-hidden>
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              style={{
                left: `${p.x}%`,
                width: p.s,
                height: p.s,
                background: p.c,
                color: p.c,
                animationDuration: `${p.d}s`,
                animationDelay: `${-p.o}s`,
              }}
            />
          ))}
        </div>

        {/* Floating stat cards */}
        <div className={styles.chart}>
          <span className={styles.stream} aria-hidden>
            <i />
            <i />
            <i />
          </span>
          {STATS.map((st, i) => (
            <StatCard key={st.label} stat={st} className={styles[`chip${"ABC"[i]}` as "chipA"]} />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 pb-20 pt-36 sm:px-6 md:px-10 md:pb-32 md:pt-44">
          <div className="md:max-w-[50%]">
          <p className={`label mb-6 text-teal ${styles.rise}`} style={{ animationDelay: "0.1s" }}>
            <span className={styles.liveDot} /> Our Results
          </p>
          <h1 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-black uppercase leading-[0.9] tracking-tight">
            <span className={`${styles.rise} block`} style={{ animationDelay: "0.2s" }}>The work.</span>
            <span className={`${styles.rise} ${styles.shimmer} block`} style={{ animationDelay: "0.4s" }}>The brands.</span>
            <span className={`${styles.rise} block`} style={{ animationDelay: "0.6s" }}>
              <span className={styles.underline}>The numbers.</span>
            </span>
          </h1>
          <p className="mt-8 flex flex-wrap gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-[0.18em] text-amber sm:text-sm">
            {[["700M", "in GMV generated."], ["100+", "brands managed."], ["5×", "TikTok Shop Partner."]].map(([num, rest], i) => (
              <span key={num} className={`${styles.statPop} ${styles.rise}`} style={{ animationDelay: `${0.85 + i * 0.15}s` }}>
                <b>{num}</b> {rest}
              </span>
            ))}
          </p>
          <p className={`${styles.rise} mt-6 max-w-xl text-base leading-relaxed text-cream/70 sm:text-lg`} style={{ animationDelay: "1s" }}>
            These milestones tell the story of NiuNorm’s work with brands on TikTok Shop, and the
            businesses behind every number.
          </p>
          <span className={`${styles.btnHalo} ${styles.rise} mt-10`} style={{ animationDelay: "1.15s" }}>
            <a href="#gmv" className={`${btnPink} ${styles.btnShine}`}>
            Explore Our Results
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </span>
          </div>
        </div>
        <span className={styles.scrollCue} aria-hidden />
      </section>

      {/* MARQUEE */}
      <div className={styles.marquee}>
        <div className={styles.marqueeTrack}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((t, i) => (
            <span key={i} className="label mx-6 flex items-center gap-6 font-bold text-ink/90">
              {t}
              <span className="text-ink/50">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* MAIN RESULT */}
      <GmvSection />

      {/* BRAND EXPERIENCE */}
      <BrandsSection />

      {/* PARTNER MILESTONE */}
      <PartnerSection />

      {/* CLOSING CTA */}
      <ClosingCta />
    </main>
  );
}
