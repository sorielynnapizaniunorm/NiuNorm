import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react";
import { Link } from "react-router";
import styles from "./results.module.css";
import resultsBg from "../../imports/resultsBg";
import niunormLogo from "../../imports/NiunormLogo.png";

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

// Official TikTok Shop certifications: category, certification, date granted
const PARTNER_BADGES = [
  { category: "TikTok Shop Partner (TSP)", title: "Content Management", date: "August 7, 2025", tone: "#F04B9A" },
  { category: "TikTok Shop Partner (TSP)", title: "Operation Tutoring", date: "October 6, 2026", tone: "#F04B9A" },
  { category: "TikTok Shop Partner (TSP)", title: "Shop Management", date: "January 8, 2025", tone: "#F04B9A" },
  { category: "MCN / CAP", title: "Creator Management", date: "July 30, 2025", tone: "#35D6C4" },
  { category: "Affiliate Partner", title: "Seller and Scalable Creator Match-Up", date: "July 30, 2025", tone: "#F5B94F" },
];

const STAR_PATH = "M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z";

type Badge = (typeof PARTNER_BADGES)[number];

const CERT_SUMMARY = [
  { n: "3×", label: "TikTok Shop Partner", tone: "#F04B9A" },
  { n: "1×", label: "MCN / CAP", tone: "#35D6C4" },
  { n: "1×", label: "Affiliate Partner", tone: "#F5B94F" },
];
const CERT_RING = "Official TikTok Shop Partner ✦ 5 Certifications ✦ Official TikTok Shop Partner ✦ 5 Certifications ✦ ";

// Pointer-driven 3D tilt; writes --rx/--ry (and --hx/--hy for the holo light) on the element.
function tiltHandlers(max: number) {
  return {
    onPointerMove: (e: React.PointerEvent<HTMLElement>) => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty("--rx", `${((0.5 - py) * max).toFixed(1)}deg`);
      el.style.setProperty("--ry", `${((px - 0.5) * max).toFixed(1)}deg`);
      el.style.setProperty("--hx", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--hy", `${(py * 100).toFixed(1)}%`);
    },
    onPointerLeave: (e: React.PointerEvent<HTMLElement>) => {
      e.currentTarget.style.setProperty("--rx", "0deg");
      e.currentTarget.style.setProperty("--ry", "0deg");
    },
  };
}

function BadgeCard({ b, i, active }: { b: Badge; i: number; active: boolean }) {
  return (
    <div className={`${styles.badgeCard} ${styles.reveal} ${active ? styles.badgeOn : ""}`} style={{ transitionDelay: `${0.5 + i * 0.15}s`, ["--tone" as string]: b.tone }}>
      <span className={styles.badgeNode} aria-hidden />
      <div className={styles.badgeFace} {...tiltHandlers(16)}>
        <span className={styles.badgeHolo} aria-hidden />
        <span className={styles.badgeIndex}>0{i + 1}</span>
        <svg className={styles.shield} width="52" height="60" viewBox="0 0 52 60" aria-hidden style={{ animationDelay: `${0.9 + i * 0.15}s` }}>
          <defs>
            <linearGradient id={`sg${i}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#FFE29A" />
              <stop offset="0.5" stopColor="#F5B94F" />
              <stop offset="1" stopColor="#C97A1B" />
            </linearGradient>
          </defs>
          <path d="M26 2l21 7v18c0 15-9 25-21 31C14 52 5 42 5 27V9l21-7z" fill={`url(#sg${i})`} />
          <path d="M26 8l15 5v14c0 11-6 19-15 24-9-5-15-13-15-24V13l15-5z" fill="#130B1E" fillOpacity="0.88" />
          <g transform="translate(14 15)">
            <path d={STAR_PATH} fill="#F5B94F" />
          </g>
        </svg>
        <span className={styles.verified}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12l5 5L20 7" />
          </svg>
          Verified
        </span>
        <p className={styles.badgeCat}>{b.category}</p>
        <h3 className={styles.badgeTitle}>{b.title}</h3>
        <p className={styles.badgeDate}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M3 10h18M8 3v4M16 3v4" />
          </svg>
          {b.date}
        </p>
      </div>
    </div>
  );
}

function PartnerSection() {
  const [ref, inView] = useInView<HTMLElement>(0.25);
  const [n, setN] = useState(0);
  const [active, setActive] = useState(-1);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(5);
      return;
    }
    const timers = [1, 2, 3, 4, 5].map((v) => window.setTimeout(() => setN(v), 500 + v * 380));
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  // Spotlight walks across the badges like a timeline playhead; pauses on hover.
  useEffect(() => {
    if (!inView || hover || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const iv = window.setInterval(() => setActive((x) => (x + 1) % PARTNER_BADGES.length), 2200);
    return () => window.clearInterval(iv);
  }, [inView, hover]);

  return (
    <section ref={ref} className={`${styles.partner} ${inView ? styles.inView : ""}`}>
      <div className={styles.partnerGlow} aria-hidden />
      <div className={styles.partnerBeams} aria-hidden>
        <i />
        <i />
        <i />
      </div>
      <div className={styles.partnerSparks} aria-hidden>
        {Array.from({ length: 22 }, (_, i) => (
          <span key={i} style={{ left: `${(i * 53 + 7) % 100}%`, animationDelay: `${-(i * 1.3) % 9}s`, animationDuration: `${7 + (i % 5)}s` }} />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 md:py-32">
        <div className="grid items-center gap-14 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className={`${styles.partnerTag} ${styles.reveal}`}>
              <i /> Official TikTok Shop certifications
            </p>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,6vw,4.5rem)] font-black uppercase leading-[0.9] tracking-tight">
              <span className={`${styles.reveal} block`} style={{ transitionDelay: "0.1s" }}>
                <span className={styles.goldText}>5×</span> TikTok
              </span>
              <span className={`${styles.reveal} block`} style={{ transitionDelay: "0.22s" }}>Shop Partner.</span>
            </h2>
            <div className="mt-8 max-w-xl space-y-4 text-base leading-relaxed text-cream/70 sm:text-lg">
              <p className={styles.reveal} style={{ transitionDelay: "0.34s" }}>
                A milestone in NiuNorm’s journey, alongside the brands we’ve worked with and the
                teams behind them.
              </p>
              <p className={styles.reveal} style={{ transitionDelay: "0.46s" }}>
                Our TikTok Shop partner recognitions are part of that story.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {CERT_SUMMARY.map((c, i) => (
                <span key={c.label} className={`${styles.certPill} ${styles.reveal}`} style={{ ["--tone" as string]: c.tone, transitionDelay: `${0.58 + i * 0.1}s` }}>
                  <b>{c.n}</b> {c.label}
                </span>
              ))}
            </div>
          </div>

          {/* Sunburst medallion */}
          <div className={styles.medalStage}>
            <div className={styles.medal} aria-hidden {...tiltHandlers(18)}>
              <span className={styles.rays} />
              <span className={`${styles.rays} ${styles.rays2}`} />
              <svg className={styles.medalText} viewBox="0 0 200 200">
                <defs>
                  <path id="medalCircle" d="M100,100 m-86,0 a86,86 0 1,1 172,0 a86,86 0 1,1 -172,0" />
                </defs>
                <text>
                  <textPath href="#medalCircle" textLength="538" lengthAdjust="spacing">
                    {CERT_RING}
                  </textPath>
                </text>
              </svg>
              <span className={styles.medalOrbit}>
                <i />
                <i />
                <i />
              </span>
              <span className={styles.medalRing} />
              <span className={`${styles.medalRing} ${styles.medalRing2}`} />
              <div className={styles.medalCore}>
                <span className={styles.medalShine} />
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
        </div>

        {/* Recognitions timeline */}
        <div className={styles.timeline}>
          <span className={styles.timelineLine} aria-hidden>
            <i className={styles.timelineComet} />
          </span>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5" onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)}>
            {PARTNER_BADGES.map((b, i) => (
              <BadgeCard key={b.title} b={b} i={i} active={!hover && active === i} />
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

/* ==========================================================
   Stat cards
   ========================================================== */

// Floating glass stat card (used in the Results hero and the brand logo wall).
type Stat = { label: string; value: number; text?: string; suffix: string; caption: string; color: string; icon: string; bars: number[] };
const STATS: Stat[] = [
  { label: "GMV", value: 700, suffix: "M", caption: "generated on TikTok Shop", color: "#35D6C4", icon: "M3 17l6-6 4 4 8-8M15 7h6v6", bars: [30, 42, 38, 55, 64, 78, 100] },
  { label: "Brands", value: 100, suffix: "+", caption: "managed and growing", color: "#F5B94F", icon: "M4 7h16l-1.5 12h-13L4 7zM8 7a4 4 0 018 0", bars: [40, 55, 48, 70, 62, 84, 100] },
  { label: "Partner", value: 5, suffix: "×", text: "Platinum", caption: "TikTok Shop Partner", color: "#F04B9A", icon: "M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.3l6.1-.7L12 3z", bars: [20, 40, 60, 80, 100] },
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
          {stat.text ? (
            <span style={{ color: stat.color, fontSize: "1.4rem" }}>{stat.text}</span>
          ) : (
            <>
              {n}
              <span style={{ color: stat.color }}>{stat.suffix}</span>
            </>
          )}
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

/* ==========================================================
   Brand logo wall + brand orbit
   ========================================================== */

/* ---------- Brand data ----------
 * Add `logo` (an imported image) to show the real logo; until then the name is shown.
 * `featured` brands sit on the inner orbit ring with a pink glow.
 */
type Brand = { name: string; logo?: string; featured?: boolean };

const LOGOS: Record<string, string> = {
  Ascendra: "/brand-logos/ascendra.png",
  Abby: "/brand-logos/abby.png",
  "10X Booster": "/brand-logos/10x-booster.png",
  "AgriGoPro Inc.": "/brand-logos/agrigopro.png",
  AlphaLab: "/brand-logos/alphalab.png",
  Athena: "/brand-logos/athena.png",
  Babe: "/brand-logos/babe.png",
  "Bee Kind": "/brand-logos/bee-kind.png",
  "Clarity Essentials": "/brand-logos/clarity-essentials.png",
  CTV: "/brand-logos/ctv.png",
  Esoskin: "/brand-logos/esoskin.png",
  Eyeconic: "/brand-logos/eyeconic.png",
  "Feel Good": "/brand-logos/feel-good.png",
  Gelle: "/brand-logos/gelle.png",
  "Girl Code": "/brand-logos/girl-code.png",
  "Glow Glass": "/brand-logos/glow-glass.png",
  "Got U": "/brand-logos/gotu.png",
  "Green N": "/brand-logos/green-n.png",
  Hail: "/brand-logos/hail.png",
  "Jeannie's Tilapia Chips": "/brand-logos/jeannies.png",
  "Josefina's": "/brand-logos/josefinas.png",
  "JSkin Beauty": "/brand-logos/jskin-beauty.png",
  Kirste: "/brand-logos/kirste.png",
  Knue: "/brand-logos/knue.png",
  Labsky: "/brand-logos/labsky.png",
  "Legalize Clothing": "/brand-logos/legalize.png",
  "Magic Bowl": "/brand-logos/magic-bowl.png",
  Monogram: "/brand-logos/monogram.png",
  "Navi Philippines": "/brand-logos/navi.png",
  Nipponware: "/brand-logos/nipponware.png",
  Oleia: "/brand-logos/oleia.png",
  Ovabliss: "/brand-logos/ovabliss.png",
  "Pogi Skin": "/brand-logos/pogi-skin.png",
  SBG: "/brand-logos/sbg.png",
  "S&J Beauty": "/brand-logos/sj-beauty.png",
  "Skin Magical": "/brand-logos/skin-magical.png",
  Snug: "/brand-logos/snug.png",
  "Snug & Cozy": "/brand-logos/snug-and-cozy.png",
  Tikas: "/brand-logos/tikas.png",
  "Twelve Twenty": "/brand-logos/twelve-twenty.png",
  Uncommon: "/brand-logos/uncommon.png",
  WearKiddoPH: "/brand-logos/wearkiddo.png",
};

const B = (name: string, featured = false): Brand => ({ name, featured, logo: LOGOS[name] });

const FEATURED: Brand[] = [
  B("Twelve Twenty", true), B("Clarity Essentials", true), B("CTV", true), B("Eyeconic", true),
  B("Labsky", true), B("JSkin Beauty", true), B("Girl Code", true), B("Navi Philippines", true),
];
const MIDDLE: Brand[] = [
  B("Ovabliss"), B("10X Booster"), B("Feel Good"), B("Nipponware"), B("Kirste"),
  B("Josefina's"), B("S&J Beauty"), B("Jeannie's Tilapia Chips"), B("Skin Magical"), B("SBG"),
  B("Magic Bowl"), B("Babe"), B("Pogi Skin"), B("Oleia"), B("AgriGoPro Inc."),
];
const OUTER: Brand[] = [
  B("Athena"), B("Legalize Clothing"), B("Gelle"), B("Knue"), B("Got U"),
  B("Esoskin"), B("Green N"), B("Ascendra"), B("Abby"), B("You"),
  B("Bee Kind"), B("Hail"), B("Snug & Cozy"), B("Uncommon"), B("Glow Glass"),
  B("Monogram"), B("WearKiddoPH"), B("AlphaLab"), B("Snug"), B("Tikas"),
];

// Every unique brand, alternated into two marquee rows.
const ALL: Brand[] = [
  ...new Map([...FEATURED, ...MIDDLE, ...OUTER].filter((b) => b.name !== "You").map((b) => [b.name, { ...b, featured: false }])).values(),
];
const ROW_A = ALL.filter((_, i) => i % 2 === 0);
const ROW_B = ALL.filter((_, i) => i % 2 === 1);

const CHIPS = ["Live selling", "Affiliates", "GMV Max ads", "Content", "Retention & CRM"];

// Deterministic so layout is stable between renders.
const SPARKS = Array.from({ length: 18 }, (_, i) => ({
  x: (i * 53 + 7) % 100,
  y: (i * 29 + 13) % 100,
  s: 2 + (i % 3),
  d: 2.5 + ((i * 7) % 5) * 0.6,
  o: (i * 0.37) % 3,
  c: ["#F04B9A", "#35D6C4", "#F5B94F", "#F4EFE6"][i % 4],
}));

const STARS = Array.from({ length: 46 }, (_, i) => ({
  x: (i * 37 + 5) % 100,
  y: (i * 61 + 17) % 100,
  s: 1 + (i % 3),
  d: 2 + ((i * 7) % 6) * 0.5,
  o: (i * 0.53) % 4,
}));
const RISERS = Array.from({ length: 16 }, (_, i) => ({
  x: 30 + ((i * 41) % 40),
  d: 7 + ((i * 5) % 6),
  o: (i * 1.3) % 10,
  dx: ((i * 23) % 60) - 30,
  c: ["#F04B9A", "#35D6C4", "#F5B94F"][i % 3],
}));

/* ---------- Hooks ---------- */

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useCountUp(target: number, run: boolean, delay = 300, duration = 1800) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (reduced()) return setN(target);
    let raf = 0;
    const t0 = performance.now() + delay;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - t0) / duration));
      setN(Math.round(target * (1 - (1 - t) ** 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, delay, duration]);
  return n;
}

// Writes pointer position into CSS vars (--mx/--my in px, --px/--py from -0.5 to 0.5).
function usePointerVars(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
      el.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      el.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    };
    const leave = () => {
      el.style.setProperty("--px", "0");
      el.style.setProperty("--py", "0");
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [ref]);
}

/* ---------- Pieces ---------- */

function Logo({ brand, className = "", style }: { brand: Brand; className?: string; style?: CSSProperties }) {
  return (
    <div className={`${styles.logo} ${className}`} style={style} data-name={brand.name}>
      {brand.logo ? <img src={brand.logo} alt={brand.name} loading="lazy" draggable={false} /> : <span>{brand.name}</span>}
    </div>
  );
}

function Line({ i, children }: { i: number; children: ReactNode }) {
  return (
    <span className={styles.bwLine}>
      <span style={{ transitionDelay: `${0.1 + i * 0.12}s` }}>{children}</span>
    </span>
  );
}

function Sparks() {
  return (
    <div className={styles.sparks} aria-hidden>
      {SPARKS.map((p, i) => (
        <i
          key={i}
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, background: p.c, color: p.c, animationDuration: `${p.d}s`, animationDelay: `${-p.o}s` }}
        />
      ))}
    </div>
  );
}

const Tag = ({ children }: { children: ReactNode }) => (
  <p className={`${styles.tag} ${styles.bwReveal}`}>
    <i /> {children}
  </p>
);

/* ---------- Section 1: Built to sell (logo wall) ---------- */

function BrandLogoWall() {
  const [ref, inView] = useInView<HTMLElement>(0.2);
  usePointerVars(ref);
  return (
    <section ref={ref} id="brands" className={`${styles.wall} ${inView ? styles.bwInView : ""}`}>
      <div className={styles.bwPhoto} style={{ backgroundImage: "url(/results-brand-wall.jpg)" }} aria-hidden />
      <div className={styles.bwPhotoShade} aria-hidden />
      <div className={styles.aurora} aria-hidden>
        <i />
        <i />
        <i />
      </div>
      <div className={styles.gridBg} aria-hidden />
      <div className={styles.spot} aria-hidden />
      <Sparks />

      <div className="relative mx-auto max-w-7xl px-5 pt-20 sm:px-6 md:px-10 md:pt-28">
        <div>
          <div className="max-w-3xl">
            <Tag>Managed by Niunorm</Tag>
            <h2 className={`${styles.title} mt-6 font-display text-[clamp(2.25rem,6vw,4.5rem)] font-black uppercase leading-[0.9] tracking-tight`}>
              <Line i={0}>
                Built to{" "}
                <span className={styles.sell}>
                  sell.
                  <svg viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden>
                    <path d="M2 14 C 40 4, 70 18, 105 9 S 165 4, 198 11" />
                  </svg>
                </span>
              </Line>
              <Line i={1}>Proven by these</Line>
              <Line i={2}>TikTok Shop brands.</Line>
            </h2>
            <p className={`${styles.bwReveal} mt-8 max-w-xl text-base leading-relaxed text-cream/70 sm:text-lg`} style={{ transitionDelay: "0.5s" }}>
              Every brand below is <b className="text-cream">growing on TikTok Shop</b> with our team running their
              LIVE, affiliates, GMV Max and content. The same system can grow yours.
            </p>
          </div>

        </div>
      </div>

      <div className={styles.rows}>
        {[ROW_A, ROW_B].map((row, r) => (
          <div key={r} className={styles.row}>
            <div className={`${styles.track} ${r ? styles.trackRev : ""}`}>
              {[...row, ...row].map((b, i) => (
                <Logo key={i} brand={b} className={styles.wallLogo} style={{ ["--i" as string]: i % row.length }} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 pb-20 pt-10 sm:px-6 md:px-10 md:pb-24">
        <p className="flex items-center gap-2.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-cream/50">
          <span className={styles.bwLiveDot} />
          Hover a logo · Combined GMV across brands managed by Niunorm
        </p>
        <div className="flex items-center gap-6">
          <Link to="/apply" className={styles.pillBtn}>
            Grow with us <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Section 2: 100+ brands orbit ---------- */

function ring(list: Brand[], radius: number, offset: number) {
  return list.map((b, i) => {
    const a = ((i / list.length) * 360 + offset) * (Math.PI / 180);
    return { b, x: 50 + Math.cos(a) * radius, y: 50 + Math.sin(a) * radius, i };
  });
}

const TIERS = [
  { key: "inner", nodes: ring(FEATURED, 22, -112), dur: "90s", dir: "normal", delay: 0.3 },
  { key: "mid", nodes: ring(MIDDLE, 34, -100), dur: "140s", dir: "reverse", delay: 0.6 },
  { key: "outer", nodes: ring(OUTER, 46, -90), dur: "200s", dir: "normal", delay: 0.9 },
] as const;

const SPOT_COUNT = TIERS.reduce((n, tier) => n + tier.nodes.length, 0);
const SPOT_OFFSET = { inner: 0, mid: TIERS[0].nodes.length, outer: TIERS[0].nodes.length + TIERS[1].nodes.length };

function BrandOrbit() {
  const [ref, inView] = useInView<HTMLElement>(0.12);
  const orbitRef = useRef<HTMLDivElement>(null);
  usePointerVars(orbitRef);
  const gmv = useCountUp(700, inView, 500);
  const count = useCountUp(100, inView, 650);
  const hub = useCountUp(100, inView, 1200, 2200);

  usePointerVars(ref);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!inView || reduced()) return;
    const iv = window.setInterval(() => setTick((n) => n + 1), 2400);
    return () => window.clearInterval(iv);
  }, [inView]);

  // Spotlight hops between brands so the orbit always feels alive; pauses while the user hovers.
  const [spot, setSpot] = useState(-1);
  const [hovering, setHovering] = useState(false);
  const [tapPaused, setTapPaused] = useState(false);
  useEffect(() => {
    if (!inView || hovering || tapPaused || reduced()) return;
    const iv = window.setInterval(() => setSpot((n) => (n + 7) % SPOT_COUNT), 1600);
    return () => window.clearInterval(iv);
  }, [inView, hovering, tapPaused]);

  return (
    <section ref={ref} className={`${styles.orbitSection} ${inView ? styles.bwInView : ""}`}>
      <div className={styles.introAurora} aria-hidden>
        <i />
        <i />
      </div>
      <div className={styles.introGrid} aria-hidden />
      <div className={styles.introSpot} aria-hidden />
      <span className={styles.watermark} aria-hidden>
        100+
      </span>
      <Sparks />
      <div className="relative mx-auto max-w-7xl px-5 pt-20 sm:px-6 md:px-10 md:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <Tag>The brands behind the ₱700M</Tag>
            <h2 className={`${styles.title} mt-6 font-display text-[clamp(2.25rem,6vw,4.5rem)] font-black uppercase leading-[0.9] tracking-tight`}>
              <Line i={0}>
                <span className={styles.countNum}>{count}+</span> brands
              </Line>
              <Line i={1}>growing with us.</Line>
              <Line i={2}>
                <span className={styles.plusWrap}>
                  <span className={styles.gradText}>And counting.</span>
                  <span className={styles.plusOne} aria-hidden>
                    +1
                  </span>
                </span>
              </Line>
            </h2>
            <p className={`${styles.bwReveal} mt-8 max-w-xl text-base leading-relaxed text-cream/70 sm:text-lg`} style={{ transitionDelay: "0.5s" }}>
              From first sale to steady growth, we run the LIVEs, the creators, the ads and the content.{" "}
              <b className="text-cream">Here are the brands growing with Niunorm.</b>
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {CHIPS.map((c, i) => (
                <span key={c} className={styles.bwChip} style={{ ["--d" as string]: `${0.6 + i * 0.08}s`, ["--s" as string]: `${i * 0.5}s` }}>
                  <b>✓</b> {c}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.introSide}>
            {/* Live ticker cycling through the managed brands */}
            <div className={styles.ticker}>
              <div className={styles.tickerHead}>
                <span className={styles.bwLiveDot} />
                Live · Growing with Niunorm
              </div>
              <div className={styles.tickerBody}>
                <div key={tick} className={styles.tickerItem}>
                  <Logo brand={ALL[tick % ALL.length]} className={styles.tickerLogo} />
                  <div className="min-w-0 flex-1">
                    <strong>{ALL[tick % ALL.length].name}</strong>
                    <span>Managed by Niunorm</span>
                  </div>
                  <span className={styles.tickerUp}>▲ Growing</span>
                </div>
              </div>
              <div className={styles.tickerBar}>
                <i key={tick} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { v: `₱${gmv}M`, l: "Combined GMV", c: "#F04B9A", icon: "M3 17l6-6 4 4 8-8M15 7h6v6", spark: "M0 28 L14 24 L28 26 L42 17 L56 19 L70 10 L84 12 L100 2" },
                { v: `${count}+`, l: "Brands managed", c: "#F5B94F", icon: "M4 7h16l-1.5 12h-13L4 7zM8 7a4 4 0 018 0", spark: "M0 26 L14 27 L28 20 L42 22 L56 14 L70 15 L84 7 L100 4" },
              ].map((m, i) => (
                <div key={m.l} className={styles.tile} style={{ ["--c" as string]: m.c, ["--d" as string]: `${0.6 + i * 0.15}s`, ["--f" as string]: `${i * -3}s` }}>
                  <div className={styles.tileTop}>
                    <span className={styles.tileIcon}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={m.icon} />
                      </svg>
                    </span>
                    <span className={styles.tileLabel}>{m.l}</span>
                  </div>
                  <strong>{m.v}</strong>
                  <svg className={styles.tileSpark} viewBox="0 0 100 32" preserveAspectRatio="none" aria-hidden>
                    <path className={styles.tileArea} d={`${m.spark} L100 32 L0 32 Z`} />
                    <path className={styles.tileLine} d={m.spark} pathLength={1} />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.orbitWrap}>
        {/* Living backdrop behind the orbit */}
        <div className={styles.stage} aria-hidden>
          <div className={styles.nebula}>
            <i />
            <i />
            <i />
          </div>
          <div className={styles.floor} />
          {STARS.map((st, i) => (
            <i key={i} className={styles.star} style={{ left: `${st.x}%`, top: `${st.y}%`, width: st.s, height: st.s, animationDuration: `${st.d}s`, animationDelay: `${-st.o}s` }} />
          ))}
          {[0, 1, 2].map((i) => (
            <i key={`sh${i}`} className={styles.shoot} style={{ top: `${8 + i * 22}%`, left: `${15 + i * 28}%`, animationDelay: `${i * 2.7}s` }} />
          ))}
          {[0, 1, 2].map((i) => (
            <span key={`p${i}`} className={styles.pulse} style={{ animationDelay: `${i * 2}s` }} />
          ))}
          {RISERS.map((r, i) => (
            <i key={`r${i}`} className={styles.riser} style={{ left: `${r.x}%`, background: r.c, color: r.c, animationDuration: `${r.d}s`, animationDelay: `${-r.o}s`, ["--dx" as string]: `${r.dx}px` }} />
          ))}
        </div>
        <div
          ref={orbitRef}
          className={`${styles.bwOrbit} ${tapPaused ? styles.paused : ""}`}
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && setHovering(false)}
          onPointerUp={(e) => e.pointerType !== "mouse" && setTapPaused((p) => !p)}
        >
          <span className={styles.galaxy} aria-hidden />
          <span className={styles.radar} aria-hidden />
          {(["r1", "r2", "r3"] as const).map((r) => (
            <span key={r} className={`${styles.orbitRing} ${styles[r]}`} aria-hidden>
              <i className={styles.comet} />
            </span>
          ))}

          <div className={styles.hub}>
            <span className={styles.hubWave} aria-hidden />
            <span className={`${styles.hubWave} ${styles.hubWave2}`} aria-hidden />
            <span className={`${styles.hubWave} ${styles.hubWave3}`} aria-hidden />
            <span className={styles.hubRing} aria-hidden />
            <span className={styles.hubOrbit} aria-hidden>
              <i />
              <i />
              <i />
            </span>
            <img src={niunormLogo} alt="Niunorm" className={styles.hubLogo} draggable={false} />
            <em className={styles.hubBadge}>{hub}+ brands managed</em>
          </div>

          {TIERS.map((tier) => (
            <div key={tier.key} className={styles.spin} style={{ ["--dur" as string]: tier.dur, ["--dir" as string]: tier.dir }}>
              {tier.key === "inner" && (
                <svg className={styles.beams} viewBox="0 0 100 100" aria-hidden>
                  {tier.nodes.map(({ x, y, i }) => (
                    <line key={i} x1="50" y1="50" x2={x} y2={y} style={{ animationDelay: `${i * -0.35}s` }} />
                  ))}
                </svg>
              )}
              {tier.nodes.map(({ b, x, y, i }) => {
                const on = spot === SPOT_OFFSET[tier.key] + i;
                const style = { left: `${x}%`, top: `${y}%`, transitionDelay: `${tier.delay + i * 0.04}s`, ["--f" as string]: `${(i % 5) * -0.9}s` };
                if (b.name === "You")
                  return (
                    <Link key="you" to="/apply" className={`${styles.bwNode} ${styles.youNode} ${on ? styles.spotOn : ""}`} style={style} data-name="Apply now">
                      <span className={styles.you}>
                        <b>You?</b>
                        <span>Your brand</span>
                      </span>
                    </Link>
                  );
                return (
                  <div key={b.name} className={`${styles.bwNode} ${styles[tier.key]} ${on ? styles.spotOn : ""}`} style={style} data-name={b.name}>
                    <Logo brand={b} />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto mt-10 flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-5 px-5 sm:px-6 md:px-10">
        <p className="flex items-center gap-2.5 text-center font-mono text-[0.66rem] uppercase tracking-[0.18em] text-cream/55">
          <span className={styles.bwLiveDot} />
          Hover or tap the orbit to pause · A selection of brands managed by Niunorm
        </p>
        <Link to="/apply" className={`${styles.pillBtn} ${styles.pillBtnLg}`}>
          Claim your spot in the orbit <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}

/* ==========================================================
   Results page
   ========================================================== */

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
            <a href="#brands" className={`${btnPink} ${styles.btnShine}`}>
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

      {/* BRAND LOGO WALL */}
      <BrandLogoWall />

      {/* BRAND ORBIT */}
      <BrandOrbit />

      {/* PARTNER MILESTONE */}
      <PartnerSection />

      {/* CLOSING CTA */}
      <ClosingCta />
    </main>
  );
}
