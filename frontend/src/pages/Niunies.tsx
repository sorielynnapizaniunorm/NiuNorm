import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router";
import styles from "./niunies.module.css";

const L = {
  girlCode: "/brand-logos/girl-code.png",
  labsky: "/brand-logos/labsky.png",
  glowGlass: "/brand-logos/glow-glass.png",
  jskinBeauty: "/brand-logos/jskin-beauty.png",
  twelveTwenty: "/brand-logos/twelve-twenty.png",
  kirste: "/brand-logos/kirste.png",
  esoskin: "/brand-logos/esoskin.png",
  feelGood: "/brand-logos/feel-good.png",
  gelle: "/brand-logos/gelle.png",
  oleia: "/brand-logos/oleia.png",
  skinMagical: "/brand-logos/skin-magical.png",
  snug: "/brand-logos/snug.png",
} as const;

const TIKTOK_URL = "https://www.tiktok.com/@niunorm";

const btnPink =
  "soft-btn-pink group inline-flex items-center justify-center gap-2 rounded-full bg-pink px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-ink transition-all hover:-translate-y-0.5";
const btnGhost =
  "group inline-flex items-center justify-center gap-2 rounded-full border border-cream/25 px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-cream backdrop-blur transition-colors hover:border-cream hover:bg-cream hover:text-ink";

/** Adds the in-view class once the element scrolls into view. */
function useInView<T extends Element>(threshold = 0.2) {
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

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Cursor-driven spotlight + tilt variables for cards. */
const spot = {
  onPointerMove: (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--x", `${px * 100}%`);
    el.style.setProperty("--y", `${py * 100}%`);
    el.style.setProperty("--rx", `${((0.5 - py) * 6).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${((px - 0.5) * 8).toFixed(2)}deg`);
  },
  onPointerLeave: (e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  },
};

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`${styles.eyebrow} ${light ? styles.eyebrowLight : ""} ${styles.reveal}`}>
      <span className={styles.liveDot} /> {children}
    </p>
  );
}

/* =========================================================
   Hero
   ========================================================= */

const FLOATERS = Array.from({ length: 14 }, (_, i) => ({
  x: (i * 41 + 9) % 100,
  d: 10 + ((i * 5) % 9),
  o: (i * 1.7) % 12,
  s: 0.8 + ((i * 3) % 5) * 0.12,
  k: i % 3,
  c: ["#F04B9A", "#35D6C4", "#F5B94F"][i % 3],
}));
const FLOAT_ICONS = [
  "M12 21s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.6-7 10-7 10z",
  "M5 6h15l-1.5 8h-12L5 6zm0 0L4 3H2m6 17a1 1 0 100-2 1 1 0 000 2zm9 0a1 1 0 100-2 1 1 0 000 2z",
  "M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.3l6.1-.7L12 3z",
];

const NOTIFS = [
  { t: "New brand campaign", s: "Matched to your niche", c: "#F04B9A", icon: FLOAT_ICONS[2] },
  { t: "Free product shipped", s: "Review it on your next video", c: "#35D6C4", icon: "M3 7l9-4 9 4-9 4-9-4zm0 0v10l9 4 9-4V7" },
  { t: "Order placed", s: "Commission added to your earnings", c: "#F5B94F", icon: FLOAT_ICONS[1] },
  { t: "Creator challenge", s: "New challenge unlocked", c: "#FF66B2", icon: "M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4zM7 6H4a3 3 0 003 3m10-3h3a3 3 0 01-3 3" },
];

function PhoneStudio() {
  const [n, setN] = useState(0);
  const [amt, setAmt] = useState(18240);
  useEffect(() => {
    if (reduced()) return;
    const a = window.setInterval(() => setN((v) => (v + 1) % NOTIFS.length), 2600);
    const b = window.setInterval(() => setAmt((v) => v + 40 + Math.round(Math.random() * 160)), 1300);
    return () => {
      window.clearInterval(a);
      window.clearInterval(b);
    };
  }, []);

  return (
    <div className={styles.phoneStage} aria-hidden>
      <span className={styles.phoneRing} />
      <span className={`${styles.phoneRing} ${styles.phoneRing2}`} />
      <div className={styles.phone}>
        <span className={styles.notch} />
        <div className={styles.screen}>
          <div className={styles.scHead}>
            <span className={styles.scAvatar}>
              <b>N</b>
            </span>
            <span className="flex min-w-0 flex-col">
              <strong>@you</strong>
              <em>Niunies creator</em>
            </span>
            <span className={styles.scLive}>
              <i /> Live
            </span>
          </div>

          <div className={styles.scEarn}>
            <span className={styles.scLabel}>Commission earned</span>
            <span className={styles.scAmt}>
              ₱{amt.toLocaleString("en-PH")}
              <small>.00</small>
            </span>
            <span className={styles.scDelta}>▲ this week</span>
            <div className={styles.scBars}>
              {[34, 48, 40, 62, 55, 78, 92].map((h, i) => (
                <i key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }} />
              ))}
            </div>
          </div>

          <div className={styles.scNotifs}>
            {NOTIFS.map((x, i) => {
              const pos = (i - n + NOTIFS.length) % NOTIFS.length;
              return (
                <div key={x.t} className={styles.notif} data-pos={pos} style={{ ["--c" as string]: x.c }}>
                  <span className={styles.notifIcon}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={x.icon} />
                    </svg>
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <strong>{x.t}</strong>
                    <em>{x.s}</em>
                  </span>
                </div>
              );
            })}
          </div>
          <p className={styles.scNote}>Sample creator dashboard</p>
        </div>
      </div>

      <div className={`${styles.chip} ${styles.chipA}`}>
        <span className={styles.chipDot} style={{ background: "#35D6C4" }} />
        <span className="flex flex-col">
          <em>Brand collabs</em>
          <strong>Matched for you</strong>
        </span>
      </div>
      <div className={`${styles.chip} ${styles.chipB}`}>
        <span className={styles.chipHeart}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d={FLOAT_ICONS[0]} />
          </svg>
        </span>
        <span className="flex flex-col">
          <em>Creator challenges</em>
          <strong>Win rewards</strong>
        </span>
      </div>
      <div className={`${styles.chip} ${styles.chipC}`}>
        <span className={styles.chipDot} style={{ background: "#F5B94F" }} />
        <span className="flex flex-col">
          <em>Affiliate links</em>
          <strong>Earn per sale</strong>
        </span>
      </div>
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
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
    el.addEventListener("pointermove", move);
    return () => el.removeEventListener("pointermove", move);
  }, []);

  return (
    <section ref={ref} className={styles.hero}>
      <div className={styles.heroGrid} aria-hidden />
      <div className={styles.heroGlowA} aria-hidden />
      <div className={styles.heroGlowB} aria-hidden />
      <div className={styles.heroSpot} aria-hidden />
      <div className={styles.floaters} aria-hidden>
        {FLOATERS.map((f, i) => (
          <svg
            key={i}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ left: `${f.x}%`, color: f.c, animationDuration: `${f.d}s`, animationDelay: `${-f.o}s`, ["--s" as string]: f.s }}
          >
            <path d={FLOAT_ICONS[f.k]} />
          </svg>
        ))}
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-32 sm:px-6 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:pb-32 lg:pt-40">
        <div>
          <p className={`${styles.eyebrow} ${styles.rise}`}>
            <span className={styles.liveDot} /> Creator community
          </p>
          <h1 className={styles.heroTitle}>
            {["Create.", "Sell."].map((w, i) => (
              <span key={w} className={styles.mask}>
                <span className={styles.wordIn} style={{ animationDelay: `${0.15 + i * 0.15}s` }}>
                  {w}
                </span>
              </span>
            ))}
            <span className={styles.mask}>
              <span className={styles.wordIn} style={{ animationDelay: "0.45s" }}>
                <span className={styles.earn}>
                  Earn.
                  <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden>
                    <path pathLength={1} d="M4 16 C 80 4, 170 4, 296 14" />
                  </svg>
                </span>
              </span>
            </span>
          </h1>
          <p className={`${styles.rise} mt-8 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg`} style={{ animationDelay: "0.7s" }}>
            Niunies is NiuNorm’s creator and affiliate community. Join to get access to brand
            collaborations, product campaigns, paid opportunities, creator challenges, and more, all
            inside the TikTok Shop ecosystem.
          </p>
          <div className={`${styles.rise} mt-10 flex flex-wrap gap-3`} style={{ animationDelay: "0.85s" }}>
            <a href="#join" className={`${btnPink} ${styles.btnShine}`}>
              Join Niunies
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className={btnGhost}>
              Follow @niunorm
              <span className="transition-transform group-hover:translate-x-1">↗</span>
            </a>
          </div>
          <ul className={`${styles.rise} ${styles.heroTags}`} style={{ animationDelay: "1s" }}>
            {[
              ["Brand collabs", "#F04B9A"],
              ["Paid campaigns", "#F5B94F"],
              ["Free products", "#35D6C4"],
              ["LIVE selling", "#FF66B2"],
            ].map(([t, c]) => (
              <li key={t} style={{ ["--c" as string]: c }}>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <PhoneStudio />
      </div>
    </section>
  );
}

const RIBBON = ["Brand collaborations", "Paid campaigns", "Product seeding", "Creator challenges", "Affiliate commissions", "LIVE selling", "Co-branding"];

function Ribbon() {
  return (
    <div className={styles.ribbonWrap} aria-hidden>
      <div className={styles.ribbon}>
        <div className={styles.ribbonTrack}>
          {[0, 1].map((k) => (
            <span key={k}>
              {RIBBON.map((r) => (
                <em key={r}>
                  {r}
                  <b>✦</b>
                </em>
              ))}
            </span>
          ))}
        </div>
      </div>
      <div className={`${styles.ribbon} ${styles.ribbonBack}`}>
        <div className={`${styles.ribbonTrack} ${styles.ribbonRev}`}>
          {[0, 1].map((k) => (
            <span key={k}>
              {RIBBON.map((r) => (
                <em key={r}>
                  {r}
                  <b>✦</b>
                </em>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Perks
   ========================================================= */

const PARTNER_LOGOS: { name: string; src: string }[] = [
  { name: "Girl Code", src: L.girlCode },
  { name: "Labsky", src: L.labsky },
  { name: "Glow Glass", src: L.glowGlass },
  { name: "JSkin Beauty", src: L.jskinBeauty },
  { name: "Twelve Twenty", src: L.twelveTwenty },
  { name: "Kirste", src: L.kirste },
  { name: "Esoskin", src: L.esoskin },
  { name: "Feel Good", src: L.feelGood },
  { name: "Gelle", src: L.gelle },
  { name: "Oleia", src: L.oleia },
  { name: "Skin Magical", src: L.skinMagical },
  { name: "Snug", src: L.snug },
];

const PERKS = [
  {
    title: "Paid Opportunities",
    body: "Earn from affiliate commissions, paid campaigns, and LIVE selling sessions with real brands.",
    c: "#F5B94F",
    icon: "M12 2v20M17 6H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
  },
  {
    title: "Product Campaigns",
    body: "Receive products from brands for review, LIVE, or content. Keep them and earn from your sales.",
    c: "#35D6C4",
    icon: "M3 7l9-4 9 4-9 4-9-4zm0 0v10l9 4 9-4V7M12 11v10",
  },
  {
    title: "Creator Challenges",
    body: "Weekly and monthly challenges with rewards, brand deals, and exclusive creator perks.",
    c: "#FF66B2",
    icon: "M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4zM7 6H4a3 3 0 003 3m10-3h3a3 3 0 01-3 3",
  },
  {
    title: "Affiliate Ecosystem",
    body: "Access affiliate links and commission structures across NiuNorm partner brands on TikTok Shop.",
    c: "#F04B9A",
    icon: "M10 14a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1M14 10a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1",
  },
  {
    title: "Core Creator Perks",
    body: "Top Niunies get priority access, higher commissions, co-branding features, and direct NiuNorm support.",
    c: "#F5B94F",
    icon: "M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.3l6.1-.7L12 3z",
  },
];

function PerksSection() {
  const [ref, inView] = useInView<HTMLElement>(0.12);
  return (
    <section ref={ref} className={`${styles.perks} ${inView ? styles.inView : ""}`}>
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 md:py-32">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Eyebrow light>What’s in it for you</Eyebrow>
            <h2 className={`${styles.h2} ${styles.reveal} max-w-3xl text-ink`} style={{ transitionDelay: "0.1s" }}>
              Everything a creator needs to <span className={styles.marker}>win</span> on TikTok Shop.
            </h2>
          </div>
          <p className={`${styles.reveal} max-w-sm text-base leading-relaxed text-ink/65`} style={{ transitionDelay: "0.2s" }}>
            One community, every way to earn: brand deals, free products, commissions, and challenges.
          </p>
        </div>

        <div className={styles.bento}>
          {/* Feature tile with partner logos */}
          <article className={`${styles.perk} ${styles.perkFeature} ${styles.reveal}`} style={{ ["--c" as string]: "#F04B9A", transitionDelay: "0.2s" }} {...spot}>
            <span className={styles.perkGlow} aria-hidden />
            <div className={styles.perkHead}>
              <span className={styles.perkIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M16 11a4 4 0 10-8 0M12 3v2M4.2 6.2l1.4 1.4M19.8 6.2l-1.4 1.4M3 13h2M19 13h2M7 21h10l-1-5H8l-1 5z" pathLength={1} />
                </svg>
              </span>
              <span className={styles.perkNum}>01</span>
            </div>
            <h3 className={styles.perkTitle}>Brand Collaborations</h3>
            <p className={styles.perkBody}>
              Get matched with NiuNorm partner brands actively looking for creators. Direct, vetted, no cold DMs.
            </p>
            <div className={styles.logoRail} aria-label="Some NiuNorm partner brands">
              {[0, 1].map((row) => (
                <div key={row} className={`${styles.logoTrack} ${row ? styles.logoTrackRev : ""}`}>
                  {[0, 1].map((k) => (
                    <span key={k}>
                      {PARTNER_LOGOS.slice(row * 6, row * 6 + 6).map((b) => (
                        <img key={b.name} src={b.src} alt={k ? "" : b.name} draggable={false} />
                      ))}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </article>

          {PERKS.map((p, i) => (
            <article
              key={p.title}
              className={`${styles.perk} ${styles.reveal}`}
              style={{ ["--c" as string]: p.c, ["--i" as string]: i, transitionDelay: `${0.28 + i * 0.08}s` }}
              {...spot}
            >
              <span className={styles.perkGlow} aria-hidden />
              <div className={styles.perkHead}>
                <span className={styles.perkIcon}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d={p.icon} pathLength={1} />
                  </svg>
                </span>
                <span className={styles.perkNum}>0{i + 2}</span>
              </div>
              <h3 className={styles.perkTitle}>{p.title}</h3>
              <p className={styles.perkBody}>{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   How it works
   ========================================================= */

const STEPS = [
  { n: "01", title: "Sign up as a Niunies creator", body: "Fill out the creator form. It takes less than 2 minutes. Tell us your niche, follower count, and content style.", c: "#F04B9A" },
  { n: "02", title: "Get matched to campaigns", body: "Our team reviews your profile and connects you with brands and campaigns that fit your audience.", c: "#35D6C4" },
  { n: "03", title: "Create, sell, and earn", body: "Post content, join LIVE sessions, drive affiliate sales, and get paid. Simple as that.", c: "#F5B94F" },
];

function StepVisual({ i }: { i: number }) {
  if (i === 0)
    return (
      <div className={styles.vForm}>
        {["@yourhandle", "Beauty · Lifestyle", "10K – 100K"].map((t, k) => (
          <span key={t} style={{ ["--k" as string]: k }}>
            <b>{t}</b>
          </span>
        ))}
        <i className={styles.vSubmit}>Submit</i>
      </div>
    );
  if (i === 1)
    return (
      <div className={styles.vMatch}>
        <span className={styles.vYou}>You</span>
        {[0, 1, 2].map((k) => (
          <span key={k} className={styles.vBrand} style={{ ["--k" as string]: k }}>
            <img src={[L.girlCode, L.labsky, L.glowGlass][k]} alt="" />
          </span>
        ))}
        <svg className={styles.vLines} viewBox="0 0 200 120" preserveAspectRatio="none">
          {[20, 60, 100].map((y, k) => (
            <path key={k} d={`M40 60 C 100 60, 110 ${y}, 160 ${y}`} pathLength={1} style={{ ["--k" as string]: k }} />
          ))}
        </svg>
      </div>
    );
  return (
    <div className={styles.vEarn}>
      {[30, 46, 40, 64, 58, 82, 100].map((h, k) => (
        <i key={k} style={{ height: `${h}%`, ["--k" as string]: k }} />
      ))}
      <span className={styles.vCoin}>₱</span>
      <span className={`${styles.vCoin} ${styles.vCoin2}`}>₱</span>
    </div>
  );
}

function StepsSection() {
  const [ref, inView] = useInView<HTMLElement>(0.2);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (!inView || paused || reduced()) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % STEPS.length), 3600);
    return () => window.clearInterval(t);
  }, [inView, paused]);

  return (
    <section ref={ref} className={`${styles.steps} ${inView ? styles.inView : ""}`}>
      <div className={styles.stepsGrid} aria-hidden />
      <div className={styles.stepsGlow} aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 md:py-32">
        <div className="text-center">
          <Eyebrow>Simple process</Eyebrow>
          <h2 className={`${styles.h2} ${styles.reveal} mx-auto max-w-3xl`} style={{ transitionDelay: "0.1s" }}>
            From creator to earning in <span className={styles.shimmer}>three steps.</span>
          </h2>
        </div>

        <div className={styles.stepTrack} aria-hidden>
          <span className={styles.stepTrackFill} style={{ ["--p" as string]: active / (STEPS.length - 1) }} />
          {STEPS.map((s, i) => (
            <i key={s.n} className={i <= active ? styles.on : ""} style={{ left: `${(i / (STEPS.length - 1)) * 100}%`, ["--c" as string]: s.c }} />
          ))}
        </div>

        <div className={styles.stepRow} onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
          {STEPS.map((s, i) => (
            <article
              key={s.n}
              className={`${styles.step} ${active === i ? styles.stepOn : ""} ${styles.reveal}`}
              style={{ ["--c" as string]: s.c, transitionDelay: `${0.2 + i * 0.12}s` }}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              tabIndex={0}
              {...spot}
            >
              <span className={styles.stepRing} aria-hidden />
              <div className={styles.stepVisual} aria-hidden>
                <StepVisual i={i} />
              </div>
              <span className={styles.stepNum}>{s.n}</span>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepBody}>{s.body}</p>
              <span className={styles.stepBar} aria-hidden />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Creator tiers
   ========================================================= */

const TIERS = [
  { tier: "Starter", level: "01", range: "1K – 10K followers", meter: 0.33, perks: ["Product seeding", "Affiliate links", "Community access", "Creator challenges"], c: "#35D6C4" },
  { tier: "Rising", level: "02", range: "10K – 100K followers", meter: 0.66, perks: ["Paid campaigns", "Brand collabs", "Priority matching", "Monthly bonuses"], c: "#F04B9A" },
  { tier: "Core", level: "03", range: "100K+ followers", meter: 1, perks: ["Exclusive deals", "Co-branding", "Higher commissions", "Direct NiuNorm team support"], c: "#F5B94F" },
];

function TiersSection() {
  const [ref, inView] = useInView<HTMLElement>(0.15);
  return (
    <section ref={ref} className={`${styles.tiers} ${inView ? styles.inView : ""}`}>
      <div className={styles.tiersBg} aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 md:py-32">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Eyebrow>Find your level</Eyebrow>
            <h2 className={`${styles.h2} ${styles.reveal} max-w-3xl`} style={{ transitionDelay: "0.1s" }}>
              Niunies for every <span className={styles.shimmer}>creator size.</span>
            </h2>
          </div>
          <p className={`${styles.reveal} max-w-sm text-base leading-relaxed text-cream/65`} style={{ transitionDelay: "0.2s" }}>
            Start where you are. As your audience grows, so do your opportunities.
          </p>
        </div>

        <div className={styles.tierRow}>
          {TIERS.map((t, i) => (
            <article
              key={t.tier}
              className={`${styles.tier} ${i === 1 ? styles.tierHot : ""}`}
              style={{ ["--c" as string]: t.c, ["--i" as string]: i, ["--m" as string]: t.meter }}
              {...spot}
            >
              <span className={styles.tierEdge} aria-hidden />
              <span className={styles.tierShine} aria-hidden />
              <div className={styles.tierTop}>
                <span className={styles.tierLevel}>
                  <svg viewBox="0 0 48 48" aria-hidden>
                    <circle cx="24" cy="24" r="20" />
                    <circle cx="24" cy="24" r="20" pathLength={1} className={styles.tierArc} />
                  </svg>
                  <b>{t.level}</b>
                </span>
                <span className={styles.tierRange}>{t.range}</span>
              </div>
              <h3 className={styles.tierName}>{t.tier}</h3>
              <span className={styles.tierMeter} aria-hidden>
                <i />
              </span>
              <ul className={styles.tierPerks}>
                {t.perks.map((p, k) => (
                  <li key={p} style={{ ["--k" as string]: k }}>
                    <span className={styles.tick} aria-hidden>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.5 4.5L19 7.5" pathLength={1} />
                      </svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <a href="#join" className={styles.tierCta}>
                Join as {t.tier} <span aria-hidden>→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Join CTA
   ========================================================= */

function JoinSection() {
  const [ref, inView] = useInView<HTMLElement>(0.2);

  return (
    <section id="join" ref={ref} className={`${styles.join} ${inView ? styles.inView : ""}`}>
      <div className={styles.joinGlow} aria-hidden />
      <div className={styles.joinRings} aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 py-24 text-center sm:px-6 md:px-10 md:py-36">
        <Eyebrow>Open to all TikTok creators</Eyebrow>
        <h2 className={`${styles.h2} ${styles.reveal}`} style={{ transitionDelay: "0.1s" }}>
          Ready to become a <span className={styles.shimmer}>Niunies</span> creator?
        </h2>
        <p className={`${styles.reveal} mt-6 max-w-md text-base leading-relaxed text-cream/70 sm:text-lg`} style={{ transitionDelay: "0.2s" }}>
          Join the community. Get matched with brands. Start earning on TikTok Shop.
        </p>
        <ul className={`${styles.reveal} ${styles.joinList}`} style={{ transitionDelay: "0.3s" }}>
          {["Brand collaborations", "Free products", "Paid opportunities"].map((t) => (
            <li key={t}>
              <span className={styles.tick} aria-hidden>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              </span>
              {t}
            </li>
          ))}
        </ul>
        <div className={`${styles.reveal} mt-10 flex flex-wrap justify-center gap-3`} style={{ transitionDelay: "0.4s" }}>
          <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className={`${btnPink} ${styles.btnShine}`}>
            Join Niunies
            <span className="transition-transform group-hover:translate-x-1">↗</span>
          </a>
          <Link to="/apply" className={btnGhost}>
            I represent a brand
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Niunies() {
  return (
    <div className={styles.page}>
      <Hero />
      <Ribbon />
      <PerksSection />
      <StepsSection />
      <TiersSection />
      <JoinSection />
    </div>
  );
}
