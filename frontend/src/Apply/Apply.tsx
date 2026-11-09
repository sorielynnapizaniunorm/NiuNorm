import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import s from "./Apply.module.css";
import aboutHeroBg from "../imports/aboutHeroPhoto.jpg";
import btsCollab from "../imports/aboutTeamCollaboration.jpg";
import btsSpeaker from "../imports/aboutTikTokEvent.jpg";
import eventCollab from "../imports/aboutTeamMeeting.jpg";

/* ---------- Config ---------- */

// Sends to the Laravel backend when VITE_API_URL is set (e.g. in frontend/.env), otherwise to Formspree.
const API_URL = import.meta.env.VITE_API_URL as string | undefined;
const FORMSPREE_URL = API_URL ? `${API_URL.replace(/\/$/, "")}/api/applications` : "https://formspree.io/f/mnpnlbez";
const STORAGE_KEY = "niunorm-apply-draft-v2";

/* ---------- Form data ---------- */

const CATEGORIES = [
  "Beauty & Skincare",
  "Health & Wellness",
  "Fashion & Footwear",
  "Food & Beverage",
  "Home & Living",
  "Mom & Baby",
  "Gadgets",
  "Other",
];

const STAGES = [
  { value: "not-live", title: "Not live yet", sub: "Ready to launch the right way", color: "#35D6C4" },
  { value: "slow", title: "Live, pero mabagal ang sales", sub: "Need a real growth plan", color: "#F5B94F" },
  { value: "scaling", title: "Selling well, gusto pa i-scale", sub: "Time to pour fuel on it", color: "#F04B9A" },
];

const GMV_STEPS = ["Not selling yet", "Under ₱100K", "₱100K – ₱500K", "₱500K – ₱1M", "₱1M – ₱5M", "₱5M+"];

const BUDGETS = ["Under ₱50K", "₱50K – ₱100K", "₱100K – ₱300K", "₱300K+", "Not sure yet"];

const SERVICES = [
  "GMV Max Ads",
  "Affiliates & Creators",
  "Content Production",
  "LIVE Selling",
  "Shop Setup & Optimization",
  "Not sure, advise me",
];
const NOT_SURE = "Not sure, advise me";

const STARTS = ["ASAP", "Within a month", "In 1–3 months", "Just exploring"];

const SOURCES = [
  "Referral",
  "TikTok",
  "Facebook",
  "Instagram",
  "LinkedIn",
  "Google",
  "NiuNies community",
  "TikTok Shop team",
  "Event / workshop",
  "Other",
];

type Fields = {
  name: string;
  role: string;
  brandName: string;
  shopLink: string;
  category: string;
  stage: string;
  gmv: number;
  gmvTouched: boolean;
  budget: string;
  services: string[];
  goal: string;
  email: string;
  mobile: string;
  start: string;
  source: string;
  referrer: string;
  sourceDetail: string;
};

const EMPTY: Fields = {
  name: "",
  role: "",
  brandName: "",
  shopLink: "",
  category: "",
  stage: "",
  gmv: 1,
  gmvTouched: false,
  budget: "",
  services: [],
  goal: "",
  email: "",
  mobile: "",
  start: "ASAP",
  source: "",
  referrer: "",
  sourceDetail: "",
};

type Errors = Partial<Record<keyof Fields, string>>;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function loadDraft(): Fields {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    return { ...EMPTY, ...parsed, services: Array.isArray(parsed?.services) ? parsed.services : [] };
  } catch {
    return EMPTY;
  }
}

const STEPS = [
  { kicker: "Let’s go!", title: "First, kilalanin ka namin", sub: "Who are we talking to?" },
  { kicker: "Nice! Keep going", title: "What do you sell?", sub: "Pick your main category." },
  { kicker: "Halfway there!", title: "Where are your numbers now?", sub: "Rough is fine. This just helps us prep a smarter call." },
  { kicker: "Almost done, galing!", title: "Where do you want our help?", sub: "Pick as many as you like." },
  { kicker: "Last step na!", title: "Last na! Saan ka namin kokontakin?", sub: "We’ll only use this to prep and confirm your call." },
];

const STEP_NAMES = ["You", "Brand", "Numbers", "Services", "Contact"];
const STEP_ICONS = [
  "M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c0-4.4 3.6-8 8-8s8 3.6 8 8",
  "M4 7h16l-1.5 12h-13L4 7zM8 7a4 4 0 018 0",
  "M3 17l6-6 4 4 8-8M15 7h6v6",
  "M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.3l6.1-.7L12 3z",
  "M4 6h16v12H4zM4 7l8 6 8-6",
];
const CAT_ICONS: Record<string, string> = {
  "Beauty & Skincare": "M9 3h6v4H9zM8 7h8l-1 14H9L8 7z",
  "Health & Wellness": "M12 21s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.6-7 10-7 10z",
  "Fashion & Footwear": "M8 3l4 3 4-3 5 4-3 4-2-1v11H8V10l-2 1-3-4 5-4z",
  "Food & Beverage": "M6 3v8a3 3 0 006 0V3M9 3v18M17 3c-2 2-2 6 0 8v10",
  "Home & Living": "M3 11l9-7 9 7M5 10v10h14V10",
  "Mom & Baby": "M12 8a3 3 0 100-6 3 3 0 000 6zM7 22l1-8-3-3 4-2h6l4 2-3 3 1 8",
  Gadgets: "M7 2h10v20H7zM11 18h2",
  Other: "M5 12h.01M12 12h.01M19 12h.01",
};

function validateStep(step: number, f: Fields): Errors {
  const e: Errors = {};
  if (step === 0) {
    if (!f.name.trim()) e.name = "Please add your name.";
    if (!f.brandName.trim()) e.brandName = "Please add your brand name.";
  }
  if (step === 1) {
    if (!f.category) e.category = "Pick your main category.";
    if (!f.stage) e.stage = "Tell us where you are on TikTok Shop.";
  }
  if (step === 2) {
    if (!f.budget) e.budget = "Pick a budget range.";
  }
  if (step === 3) {
    if (f.services.length === 0) e.services = "Pick at least one.";
  }
  if (step === 4) {
    if (!f.email.trim()) e.email = "Email is required.";
    else if (!EMAIL_RE.test(f.email.trim())) e.email = "Please enter a valid email (e.g. juan@brand.ph).";
    if (!f.mobile.trim()) e.mobile = "Mobile / Viber is required.";
    if (!f.source) e.source = "Let us know where you found us.";
  }
  return e;
}

/** 0–100 based on what’s been filled in. */
function matchScore(f: Fields): number {
  let n = 0;
  if (f.name.trim()) n += 8;
  if (f.role.trim()) n += 4;
  if (f.brandName.trim()) n += 8;
  if (f.shopLink.trim()) n += 4;
  if (f.category) n += 10;
  if (f.stage) n += 10;
  if (f.gmvTouched) n += 8;
  if (f.budget) n += 8;
  if (f.services.length) n += 12;
  if (f.goal.trim()) n += 6;
  if (EMAIL_RE.test(f.email.trim())) n += 6;
  if (f.mobile.trim()) n += 6;
  if (f.start) n += 2;
  if (f.source) n += 4;
  return Math.min(100, n);
}

function matchMessage(score: number, done: boolean) {
  if (done) return "Perfect match! Let’s talk.";
  if (score === 0) return "Answer a few questions and watch this go up.";
  if (score < 40) return "Good start. Keep going.";
  if (score < 70) return "Looking like a strong fit!";
  return "We’re already thinking of ideas for you.";
}

function suggestPackage(f: Fields) {
  const picked = f.services.filter((x) => x !== NOT_SURE);
  if (picked.length === 0 && !f.services.includes(NOT_SURE)) return null;
  if (picked.length <= 2) return { name: "Core", desc: "A focused start on 1–2 engines to get momentum fast." };
  if (picked.length <= 4) return { name: "Growth", desc: "Several engines working together to scale what’s already working." };
  return { name: "Full Engine", desc: "Every engine under one team, built for brands ready to scale hard." };
}

/* ---------- Shared bits ---------- */

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

function useSpotlight() {
  return {
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
}

function CountUp({ to, run, suffix = "" }: { to: number; run: boolean; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / 1600);
      setN(Math.round(to * (1 - (1 - t) ** 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, run]);
  return (
    <>
      {n}
      {suffix}
    </>
  );
}

function PhotoSlot({ src, label, className = "" }: { src?: string; label: string; className?: string }) {
  return (
    <div className={`${s.slot} ${src ? "" : s.slotEmpty} ${className}`}>
      {src ? (
        <div className={s.slotImg} style={{ backgroundImage: `url(${src})` }} role="img" aria-label={label} />
      ) : (
        <div className={s.slotPh} aria-hidden>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8a2 2 0 012-2h2l1.5-2h7L17 6h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
            <circle cx="12" cy="13" r="3.5" />
          </svg>
          <span>Add photo</span>
        </div>
      )}
      <span className={s.slotLabel}>{label}</span>
    </div>
  );
}

const btnPink =
  "soft-btn-pink group inline-flex items-center justify-center gap-2 rounded-full bg-pink px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-ink transition-all hover:-translate-y-0.5";
const btnGhost =
  "group inline-flex items-center justify-center gap-2 rounded-full border border-cream/25 px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-cream backdrop-blur transition-colors hover:border-cream hover:bg-cream hover:text-ink";

/* ---------- 1. Hero ---------- */

const HERO_STATS = [
  { value: 700, suffix: "M+", label: "GMV generated for our brands", color: "#F04B9A" },
  { text: "Platinum", label: "TikTok Shop Agency Advantage Program tier", color: "#F5B94F" },
  { value: 15, suffix: "", label: "brands max, so you get real attention", color: "#35D6C4" },
  { text: "PH + SG", label: "direct escalation line with TikTok", color: "#FF66B2" },
];

const FAN = [
  { label: "Working on your brand", src: btsCollab },
  { label: "On stage at TikTok Shop", src: btsSpeaker },
  { label: "The NiuNorm team", src: eventCollab },
];

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [statsRef, statsIn] = useInView<HTMLDivElement>(0.3);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", `${e.clientX - r.left}px`);
      hero.style.setProperty("--my", `${e.clientY - r.top}px`);
      hero.style.setProperty("--px", String((e.clientX - r.left) / r.width - 0.5));
      hero.style.setProperty("--py", String((e.clientY - r.top) / r.height - 0.5));
    };
    hero.addEventListener("pointermove", move);
    return () => hero.removeEventListener("pointermove", move);
  }, []);

  return (
    <section ref={heroRef} className={s.hero}>
      <div className={s.grid} aria-hidden />
      <div className={s.glowA} aria-hidden />
      <div className={s.glowB} aria-hidden />
      <div className={s.spotlight} aria-hidden />
      <div className={s.grain} aria-hidden />
      <div className={s.heroRays} aria-hidden />
      <div className={s.heroFloat} aria-hidden>
        {Array.from({ length: 12 }, (_, i) => (
          <i key={i} style={{ left: `${(i * 37 + 7) % 100}%`, animationDuration: `${9 + (i % 5) * 2}s`, animationDelay: `${-((i * 1.3) % 10)}s`, color: ["#F04B9A", "#F5B94F", "#35D6C4"][i % 3] }} />
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-32 text-center sm:px-6 md:px-10 md:pt-40">
        <div className={`${s.rise} flex flex-wrap items-center justify-center gap-3`}>
          <span className={s.pill}>
            <span className={s.liveDot} /> Now accepting applications
          </span>
          <span className={`${s.pill} ${s.pillAmber}`}>700M sales generated for our TikTok Shop clients</span>
        </div>

        <h1 className="mx-auto mt-8 max-w-5xl font-display text-[clamp(2.2rem,5.4vw,4.6rem)] font-black uppercase leading-[0.95] tracking-tight">
          <span className={s.lineMask}>
            <span className={s.lineIn} style={{ animationDelay: "0.15s" }}>Your brand deserves to</span>
          </span>
          <span className={s.lineMask}>
            <span className={s.lineIn} style={{ animationDelay: "0.3s" }}>
              <span className={s.swoosh}>
                <span className={s.shimmer}>sell like crazy</span>
                <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden>
                  <path pathLength={1} d="M4 18 C 70 6, 150 4, 296 12" />
                </svg>
              </span>
            </span>
          </span>
          <span className={s.lineMask}>
            <span className={s.lineIn} style={{ animationDelay: "0.45s" }}>on TikTok Shop.</span>
          </span>
        </h1>

        <p className={`${s.rise} mx-auto mt-8 max-w-2xl text-base leading-relaxed text-cream/75 sm:text-lg`} style={{ animationDelay: "0.65s" }}>
          Tell us about your brand in 3 minutes. If we’re a fit, you’ll get a free strategy call with a
          clear game plan (GMV Max, affiliates, content, and LIVE) tailored to <em>your</em> shop.
          Walang hard sell, promise.
        </p>

        <div className={`${s.rise} mt-10 flex flex-wrap justify-center gap-3`} style={{ animationDelay: "0.8s" }}>
          <a href="#apply-form" className={`${btnPink} ${s.btnShine}`}>
            Start my application
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a href="#how" className={btnGhost}>
            How it works
          </a>
        </div>

        {/* Photo fan */}
        <div className={s.fan}>
          {FAN.map((f, i) => (
            <div key={f.label} className={`${s.fanCard} ${s[`fan${i}` as "fan0"]}`}>
              <PhotoSlot src={f.src} label={f.label} />
            </div>
          ))}
          <span className={`${s.fanChip} ${s.chipGmv}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />
            </svg>
            GMV going up
          </span>
          <span className={`${s.fanChip} ${s.chipLive}`}>
            <b>LIVE</b> Orders coming in
          </span>
          <span className={`${s.fanChip} ${s.chipPlat}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.3l6.1-.7L12 3z" />
            </svg>
            Platinum partner
          </span>
          <span className={s.fanOrbit} aria-hidden />
        </div>

        {/* Stats */}
        <div ref={statsRef} className={`${s.stats} ${statsIn ? s.inView : ""}`}>
          {HERO_STATS.map((st, i) => (
            <div key={st.label} className={`${s.stat} ${s.reveal}`} style={{ ["--c" as string]: st.color, transitionDelay: `${i * 0.1}s` }}>
              <strong>{st.text ?? <CountUp to={st.value!} suffix={st.suffix} run={statsIn} />}</strong>
              <span>{st.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Marquee ---------- */

const MARQUEE = ["GMV Max ads", "Affiliates & creators", "Content production", "LIVE selling", "15 brands max", "Free strategy call"];

function Marquee() {
  return (
    <div className={s.marquee}>
      <div className={s.marqueeTrack}>
        {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((t, i) => (
          <span key={i} className="label mx-6 flex items-center gap-6 font-bold text-ink/90">
            {t}
            <span className="text-ink/50">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- 2. What’s in it for your brand ---------- */

const BENEFITS = [
  { photo: "Ads / dashboard", title: "GMV Max that pays back", body: "Ads built around your margins, scaled when they win, cut when they don’t.", color: "#F04B9A", icon: "M3 17l6-6 4 4 8-8M15 7h6v6" },
  { photo: "Creators / NiuNies", title: "Affiliates on autopilot", body: "An affiliate CRM and our NiuNies creator community pushing your products every day.", color: "#F5B94F", icon: "M8 11a3 3 0 100-6 3 3 0 000 6zm8 2a3 3 0 100-6 3 3 0 000 6zM2 20c0-3 3-5 6-5s6 2 6 5m2-5c2.5 0 6 1.5 6 4.5" },
  { photo: "Content shoot", title: "Content that converts", body: "Scroll-stopping videos made for how Filipinos actually shop on TikTok.", color: "#35D6C4", icon: "M4 6h11v12H4zM15 10l5-3v10l-5-3" },
  { photo: "LIVE studio", title: "LIVE selling that sells", body: "Trained hosts, scripts, and shifts that turn viewers into checkouts.", color: "#FF66B2", icon: "M12 12m-2 0a2 2 0 104 0 2 2 0 10-4 0M7.8 7.8a6 6 0 000 8.4m8.4 0a6 6 0 000-8.4M5 5a10 10 0 000 14m14 0a10 10 0 000-14" },
];

/** Small animated scene for each growth engine. */
function BenefitScene({ i }: { i: number }) {
  if (i === 0)
    return (
      <div className={`${s.scene} ${s.sAds}`}>
        <div className={s.sAdsBars}>
          {[28, 40, 34, 52, 60, 74, 92].map((h, k) => (
            <i key={k} style={{ height: `${h}%`, ["--k" as string]: k }} />
          ))}
        </div>
        <svg className={s.sAdsLine} viewBox="0 0 100 50" preserveAspectRatio="none">
          <path d="M2 44 L18 36 L32 39 L48 26 L62 22 L78 12 L98 4" pathLength={1} />
        </svg>
        <span className={s.sTag}>ROAS ▲</span>
      </div>
    );
  if (i === 1)
    return (
      <div className={`${s.scene} ${s.sAff}`}>
        <span className={s.sAffCore}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 7h16l-1.5 12h-13L4 7zM8 7a4 4 0 018 0" />
          </svg>
        </span>
        <span className={s.sAffOrbit}>
          {[0, 1, 2, 3, 4].map((k) => (
            <i key={k} style={{ ["--k" as string]: k }} />
          ))}
        </span>
        <span className={s.sAffRing} />
      </div>
    );
  if (i === 2)
    return (
      <div className={`${s.scene} ${s.sVid}`}>
        <span className={s.sPhone}>
          <span className={s.sPlay} />
          <span className={s.sProg}>
            <i />
          </span>
        </span>
        {[0, 1, 2].map((k) => (
          <svg key={k} className={s.sHeart} style={{ ["--k" as string]: k }} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.6-7 10-7 10z" />
          </svg>
        ))}
      </div>
    );
  return (
    <div className={`${s.scene} ${s.sLive}`}>
      <span className={s.sLiveBadge}>
        <i /> Live
      </span>
      <span className={s.sWave}>
        {[0, 1, 2, 3, 4, 5, 6].map((k) => (
          <i key={k} style={{ ["--k" as string]: k }} />
        ))}
      </span>
      {[0, 1].map((k) => (
        <span key={k} className={s.sOrder} style={{ ["--k" as string]: k }}>
          +1 order
        </span>
      ))}
    </div>
  );
}

function Benefits() {
  const [ref, inView] = useInView<HTMLElement>(0.15);
  const spot = useSpotlight();
  return (
    <section ref={ref} className={`${s.section} ${inView ? s.inView : ""}`}>
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 md:py-28">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <p className={`${s.pill} ${s.reveal}`}>
              <span className={s.liveDot} /> What’s in it for your brand
            </p>
            <h2 className={`mt-6 font-display text-[clamp(2rem,5vw,3.75rem)] font-black uppercase leading-[0.92] tracking-tight ${s.reveal}`} style={{ transitionDelay: "0.1s" }}>
              Four engines. <span className={s.shimmer}>One team.</span>
            </h2>
          </div>
          <p className={`max-w-md text-base leading-relaxed text-cream/65 sm:text-lg ${s.reveal}`} style={{ transitionDelay: "0.2s" }}>
            One team handling the four engines that actually move GMV on TikTok Shop, working together,
            not in silos.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b, i) => (
            <div key={b.title} className={s.reveal} style={{ transitionDelay: `${0.2 + i * 0.12}s` }}>
              <article className={s.card} style={{ ["--c" as string]: b.color }} {...spot}>
                <span className={s.cardBorder} aria-hidden />
                <span className={s.cardSpot} aria-hidden />
                <span className={s.cardRing} aria-hidden />
                <div className={s.cardPhoto} aria-hidden>
                  <BenefitScene i={i} />
                </div>
                <div className="relative p-6">
                  <span className={s.cardIcon} aria-hidden>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={b.icon} />
                    </svg>
                  </span>
                  <h3 className="mt-5 font-display text-lg font-black uppercase leading-tight">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/65">{b.body}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 3. The form ---------- */

function MatchRing({ value }: { value: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className={s.ring}>
      <svg viewBox="0 0 120 120" aria-hidden>
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F5B94F" />
            <stop offset="1" stopColor="#F04B9A" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r={r} className={s.ringTrack} />
        <circle cx="60" cy="60" r={r} className={s.ringFill} strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} />
      </svg>
      <div className={s.ringValue}>
        <strong>{value}%</strong>
        <span>match</span>
      </div>
    </div>
  );
}

function ApplyForm() {
  const [ref, inView] = useInView<HTMLElement>(0.1);
  const [f, setF] = useState<Fields>(loadDraft);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (done) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(f));
    } catch {
      /* ignore */
    }
  }, [f, done]);

  const score = done ? 100 : matchScore(f);
  const pkg = useMemo(() => suggestPackage(f), [f]);

  function set<K extends keyof Fields>(key: K, value: Fields[K]) {
    setF((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }
  const onText = (key: keyof Fields) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    set(key, e.target.value as never);

  function toggleService(v: string) {
    const has = f.services.includes(v);
    set("services", has ? f.services.filter((x) => x !== v) : [...f.services, v]);
  }

  function scrollToCard() {
    const el = cardRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    if (window.scrollY > top) window.scrollTo({ top, behavior: "smooth" });
  }

  function next() {
    const errs = validateStep(step, f);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setDir(1);
    setStep((x) => Math.min(STEPS.length - 1, x + 1));
    scrollToCard();
  }
  function goTo(i: number) {
    if (i >= step) return;
    setErrors({});
    setDir(-1);
    setStep(i);
    scrollToCard();
  }
  function back() {
    setErrors({});
    setDir(-1);
    setStep((x) => Math.max(0, x - 1));
    scrollToCard();
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (step < STEPS.length - 1) return next();
    const errs = validateStep(step, f);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setLoading(true);
    setFailed(null);
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New application: ${f.brandName}`,
          _replyto: f.email,
          name: f.name,
          role: f.role,
          brandName: f.brandName,
          shopLink: f.shopLink,
          category: f.category,
          stage: STAGES.find((x) => x.value === f.stage)?.title ?? f.stage,
          monthlyGmv: GMV_STEPS[f.gmv],
          marketingBudget: f.budget,
          services: f.services.join(", "),
          goal90Days: f.goal,
          email: f.email,
          mobile: f.mobile,
          startWhen: f.start,
          foundUsVia: f.source,
          referredBy: f.referrer,
          foundUsDetail: f.sourceDetail,
          suggestedPackage: pkg?.name ?? "",
          matchScore: `${matchScore(f)}%`,
        }),
      });
      if (!res.ok) throw new Error("Something went wrong on our side. Please try again.");
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
      setDone(true);
      scrollToCard();
    } catch (err) {
      setFailed(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const firstName = f.name.trim().split(" ")[0] || "there";
  const spot = useSpotlight();
  const checks = STEP_NAMES.map((n, i) => ({ n, ok: done || Object.keys(validateStep(i, f)).length === 0 }));

  const Err = ({ k }: { k: keyof Fields }) => (errors[k] ? <p className={s.err}>{errors[k]}</p> : null);

  return (
    <section id="apply-form" ref={ref} className={`${s.formSection} ${inView ? s.inView : ""}`}>
      <div className={s.formGlow} aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-6 md:px-10 md:py-28">
        <div className="text-center">
          <p className={`${s.pill} ${s.pillAmber} ${s.reveal} mx-auto`}>
            <span className={s.liveDot} /> 5 quick steps
          </p>
          <h2 className={`mt-6 font-display text-[clamp(2rem,5vw,3.75rem)] font-black uppercase leading-[0.92] tracking-tight ${s.reveal}`} style={{ transitionDelay: "0.1s" }}>
            Let’s see if we’re <span className={s.shimmer}>a match.</span>
          </h2>
          <p className={`mx-auto mt-5 max-w-xl text-base leading-relaxed text-cream/65 sm:text-lg ${s.reveal}`} style={{ transitionDelay: "0.2s" }}>
            5 quick steps. Watch your match score climb as you go, and our team will reach out after reviewing.
          </p>
        </div>

        <div className={`${s.formGrid} ${s.reveal}`} style={{ transitionDelay: "0.3s" }}>
          {/* Form card */}
          <div ref={cardRef} className={s.formCard} onPointerMove={spot.onPointerMove}>
            <span className={s.cardBorderStatic} aria-hidden />
            <span className={s.formEdge} aria-hidden />
            <span className={s.formSpot} aria-hidden />
            {!done && (
              <span key={step} className={s.stepWm} aria-hidden>
                0{step + 1}
              </span>
            )}
            {done ? (
              <div className={s.success}>
                <div className={s.burst} aria-hidden>
                  {Array.from({ length: 14 }, (_, i) => (
                    <i key={i} style={{ ["--a" as string]: `${i * (360 / 14)}deg`, background: ["#F04B9A", "#F5B94F", "#35D6C4"][i % 3] }} />
                  ))}
                  <span className={s.burstCore}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </span>
                </div>
                <h3 className="mt-6 font-display text-[clamp(1.6rem,3.4vw,2.4rem)] font-black uppercase leading-tight">
                  Application received, <span className="text-pink">{firstName}!</span>
                </h3>
                <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-cream/70">
                  Salamat! Our team is now reviewing your application for{" "}
                  <b className="text-cream">{f.brandName}</b>. Expect a call from the NiuNorm team once
                  we’re done, usually within 1–2 business days.
                </p>
                <ol className={s.nextList}>
                  {[
                    "We review your application and look at your shop.",
                    "The NiuNorm team calls you to walk through ideas for your brand.",
                    "You get a clear growth plan, whether you work with us or not.",
                  ].map((t, i) => (
                    <li key={i} style={{ animationDelay: `${0.4 + i * 0.15}s` }}>
                      <b>{i + 1}</b>
                      {t}
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                {/* progress */}
                <div className={s.stepper}>
                  <span className={s.stepperLine} aria-hidden>
                    <i style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }} />
                  </span>
                  {STEP_NAMES.map((n, i) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => goTo(i)}
                      disabled={i >= step}
                      aria-current={i === step ? "step" : undefined}
                      aria-label={`Step ${i + 1}: ${n}`}
                      className={`${s.stepBtn} ${i < step ? s.stepDone : i === step ? s.stepNow : ""}`}
                    >
                      <span className={s.stepIco}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={i < step ? 3 : 1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d={i < step ? "M5 12l5 5L20 7" : STEP_ICONS[i]} />
                        </svg>
                      </span>
                      <em>{n}</em>
                    </button>
                  ))}
                </div>
                <p className={s.stepCount}>
                  Step {step + 1} of {STEPS.length}
                </p>

                <div key={step} className={dir === 1 ? s.stepInR : s.stepInL}>
                  <p className={s.kicker}>{STEPS[step].kicker}</p>
                  <h3 className={s.stepTitle}>{STEPS[step].title}</h3>
                  <p className={s.stepSub}>{STEPS[step].sub}</p>

                  {step === 0 && (
                    <div className={s.fields}>
                      <div className={s.row2}>
                        <label className={s.field}>
                          <span>Your name</span>
                          <input id="f-name" value={f.name} onChange={onText("name")} placeholder="Juan dela Cruz" autoComplete="name" aria-invalid={!!errors.name} />
                          <Err k="name" />
                        </label>
                        <label className={s.field}>
                          <span>Your role</span>
                          <input id="f-role" value={f.role} onChange={onText("role")} placeholder="Founder, Marketing Head…" autoComplete="organization-title" />
                        </label>
                      </div>
                      <label className={s.field}>
                        <span>Brand name</span>
                        <input id="f-brandName" value={f.brandName} onChange={onText("brandName")} placeholder="Your brand" autoComplete="organization" aria-invalid={!!errors.brandName} />
                        <Err k="brandName" />
                      </label>
                      <label className={s.field}>
                        <span>
                          TikTok Shop or brand link <em>(optional)</em>
                        </span>
                        <input id="f-shopLink" value={f.shopLink} onChange={onText("shopLink")} placeholder="https://" inputMode="url" />
                      </label>
                    </div>
                  )}

                  {step === 1 && (
                    <div className={s.fields}>
                      <div id="f-category" tabIndex={-1} className={s.chips} role="radiogroup" aria-label="Main category">
                        {CATEGORIES.map((c) => (
                          <button key={c} type="button" role="radio" aria-checked={f.category === c} className={`${s.chip} ${s.catChip} ${f.category === c ? s.chipOn : ""}`} onClick={() => set("category", c)}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                              <path d={CAT_ICONS[c]} />
                            </svg>
                            {c}
                          </button>
                        ))}
                      </div>
                      <Err k="category" />
                      <p className={s.groupLabel}>Where are you on TikTok Shop right now?</p>
                      <div id="f-stage" tabIndex={-1} className={s.options} role="radiogroup" aria-label="Stage">
                        {STAGES.map((st) => (
                          <button
                            key={st.value}
                            type="button"
                            role="radio"
                            aria-checked={f.stage === st.value}
                            className={`${s.option} ${f.stage === st.value ? s.optionOn : ""}`}
                            style={{ ["--c" as string]: st.color }}
                            onClick={() => set("stage", st.value)}
                          >
                            <i />
                            <span>
                              <b>{st.title}</b>
                              <small>{st.sub}</small>
                            </span>
                          </button>
                        ))}
                      </div>
                      <Err k="stage" />
                    </div>
                  )}

                  {step === 2 && (
                    <div className={s.fields}>
                      <div className={s.gmvBox}>
                        <p className={s.gmvValue}>{GMV_STEPS[f.gmv]}</p>
                        <p className={s.gmvCap}>Current monthly TikTok Shop GMV</p>
                        <div className={s.gmvBars} aria-hidden>
                          {GMV_STEPS.map((g, i) => (
                            <span
                              key={g}
                              className={i <= f.gmv ? s.gmvBarOn : ""}
                              style={{ height: `${24 + i * 15}%`, ["--k" as string]: i }}
                              onClick={() => setF((p) => ({ ...p, gmv: i, gmvTouched: true }))}
                            />
                          ))}
                        </div>
                        <input
                          id="f-gmv"
                          type="range"
                          min={0}
                          max={GMV_STEPS.length - 1}
                          step={1}
                          value={f.gmv}
                          onChange={(e) => setF((p) => ({ ...p, gmv: Number(e.target.value), gmvTouched: true }))}
                          className={s.range}
                          style={{ ["--p" as string]: `${(f.gmv / (GMV_STEPS.length - 1)) * 100}%` }}
                          aria-valuetext={GMV_STEPS[f.gmv]}
                        />
                        <div className={s.rangeEnds}>
                          <span>₱0</span>
                          <span>₱5M+</span>
                        </div>
                      </div>
                      <p className={s.groupLabel}>Monthly marketing budget you’re comfortable with</p>
                      <div id="f-budget" tabIndex={-1} className={s.budgetGrid} role="radiogroup" aria-label="Monthly marketing budget">
                        {BUDGETS.map((b, i) => (
                          <button
                            key={b}
                            type="button"
                            role="radio"
                            aria-checked={f.budget === b}
                            className={`${s.budget} ${f.budget === b ? s.budgetOn : ""}`}
                            style={{ ["--k" as string]: i }}
                            onClick={() => set("budget", b)}
                          >
                            <span className={s.budgetCoins} aria-hidden>
                              {Array.from({ length: i === 4 ? 1 : i + 1 }, (_, k) => (
                                <i key={k} />
                              ))}
                            </span>
                            {b}
                          </button>
                        ))}
                      </div>
                      <Err k="budget" />
                    </div>
                  )}

                  {step === 3 && (
                    <div className={s.fields}>
                      <div id="f-services" tabIndex={-1} className={s.chips} role="group" aria-label="Services">
                        {SERVICES.map((v) => (
                          <button key={v} type="button" aria-pressed={f.services.includes(v)} className={`${s.chip} ${f.services.includes(v) ? s.chipOn : ""}`} onClick={() => toggleService(v)}>
                            {f.services.includes(v) && (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                <path d="M5 12l5 5L20 7" />
                              </svg>
                            )}
                            {v}
                          </button>
                        ))}
                      </div>
                      <Err k="services" />
                      <label className={s.field}>
                        <span>What’s your #1 goal for the next 90 days?</span>
                        <textarea id="f-goal" rows={4} value={f.goal} onChange={onText("goal")} placeholder="e.g. Hit ₱1M/month, launch our new product line, make LIVE profitable…" />
                      </label>
                    </div>
                  )}

                  {step === 4 && (
                    <div className={s.fields}>
                      <label className={s.field}>
                        <span>Email</span>
                        <input id="f-email" type="email" value={f.email} onChange={onText("email")} placeholder="juan@brand.ph" autoComplete="email" aria-invalid={!!errors.email} />
                        <Err k="email" />
                      </label>
                      <div className={s.row2}>
                        <label className={s.field}>
                          <span>Mobile / Viber</span>
                          <input id="f-mobile" type="tel" value={f.mobile} onChange={onText("mobile")} placeholder="09XX XXX XXXX" autoComplete="tel" aria-invalid={!!errors.mobile} />
                          <Err k="mobile" />
                        </label>
                      </div>
                      <p className={s.groupLabel}>When do you want to start?</p>
                      <div id="f-start" tabIndex={-1} className={s.chips} role="radiogroup" aria-label="When do you want to start">
                        {STARTS.map((x) => (
                          <button key={x} type="button" role="radio" aria-checked={f.start === x} className={`${s.chip} ${s.chipSm} ${f.start === x ? s.chipOn : ""}`} onClick={() => set("start", x)}>
                            {x === "ASAP" && <span className={s.asapDot} aria-hidden />}
                            {x}
                          </button>
                        ))}
                      </div>
                      <p className={s.groupLabel}>Where did you find us?</p>
                      <div id="f-source" tabIndex={-1} className={s.chips} role="radiogroup" aria-label="Where did you find us">
                        {SOURCES.map((x) => (
                          <button key={x} type="button" role="radio" aria-checked={f.source === x} className={`${s.chip} ${s.chipSm} ${f.source === x ? s.chipOn : ""}`} onClick={() => set("source", x)}>
                            {x}
                          </button>
                        ))}
                      </div>
                      <Err k="source" />
                      {f.source === "Referral" && (
                        <label className={`${s.field} ${s.reveal1}`}>
                          <span>Who referred you? Shoutout sa nag-refer!</span>
                          <input id="f-referrer" value={f.referrer} onChange={onText("referrer")} placeholder="Name or brand" />
                        </label>
                      )}
                      {(f.source === "Other" || f.source === "Event / workshop") && (
                        <label className={`${s.field} ${s.reveal1}`}>
                          <span>Tell us where</span>
                          <input id="f-sourceDetail" value={f.sourceDetail} onChange={onText("sourceDetail")} placeholder="e.g. a podcast, a friend’s post…" />
                        </label>
                      )}
                    </div>
                  )}
                </div>

                {failed && <p className={s.failBox}>{failed}</p>}

                <div className={s.navRow}>
                  <button type="button" onClick={back} disabled={step === 0} className={s.backBtn}>
                    ← Back
                  </button>
                  {step < STEPS.length - 1 ? (
                    <button type="button" onClick={next} className={`${btnPink} ${s.btnShine}`}>
                      Next: {STEP_NAMES[step + 1]}
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </button>
                  ) : (
                    <button type="submit" disabled={loading} className={`${btnPink} ${s.btnShine}`}>
                      {loading ? "Sending…" : "Submit application"}
                      {!loading && <span className="transition-transform group-hover:translate-x-1">→</span>}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* Match sidebar */}
          <aside className={s.match} aria-live="polite">
            <p className={s.matchLabel}>Your NiuNorm match</p>
            <div className={s.ringWrap}>
              <span className={s.ringHalo} aria-hidden />
              <span key={Math.floor(score / 10)} className={s.ringPulse} aria-hidden />
              <MatchRing value={score} />
            </div>
            <p className={s.matchMsg}>{matchMessage(score, done)}</p>

            <div className={`${s.pkg} ${pkg ? s.pkgOn : ""}`}>
              <p className={s.pkgLabel}>Suggested starting package</p>
              <p key={pkg?.name ?? "none"} className={s.pkgName}>
                {pkg?.name ?? "—"}
              </p>
              <p className={s.pkgDesc}>{pkg?.desc ?? "We’ll recommend a fit based on what you need."}</p>
            </div>

            {f.services.length > 0 && (
              <div className={s.picked}>
                {f.services.map((x) => (
                  <span key={x}>{x}</span>
                ))}
              </div>
            )}

            <ul className={s.checks}>
              {checks.map((c) => (
                <li key={c.n} className={c.ok ? s.checkOn : ""}>
                  <i aria-hidden>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </i>
                  {c.n}
                </li>
              ))}
            </ul>

            <p className={s.cap}>
              <span className={s.liveDot} /> We cap our roster at 15 brands so every client gets senior attention.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ---------- 4. What happens after you apply ---------- */

const AFTER = [
  { title: "You apply", body: "3 minutes. Tell us where your shop is and where you want it to go.", color: "#F04B9A" },
  { title: "Free strategy call", body: "30 minutes with our team. We’ve already looked at your shop, so you get real ideas, not a sales pitch.", color: "#F5B94F" },
  { title: "Your growth plan", body: "If it’s a fit, we map out ads, affiliates, content, and LIVE, and get to work.", color: "#35D6C4" },
];

function After() {
  const [ref, inView] = useInView<HTMLElement>(0.15);
  const spot = useSpotlight();
  return (
    <section id="how" ref={ref} className={`${s.after} ${inView ? s.inView : ""}`}>
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 md:py-28">
        <div className="text-center">
          <p className={`${s.inkPill} ${s.reveal} mx-auto`}>
            <span /> How it works
          </p>
          <h2 className={`mt-6 font-display text-[clamp(2rem,5vw,3.75rem)] font-black uppercase leading-[0.92] tracking-tight ${s.reveal}`} style={{ transitionDelay: "0.1s" }}>
            What happens <span className="text-pink">after you apply.</span>
          </h2>
          <p className={`mt-4 text-base text-ink/60 sm:text-lg ${s.reveal}`} style={{ transitionDelay: "0.2s" }}>
            Simple, fast, and zero pressure.
          </p>
        </div>

        <div className={s.afterRow}>
          <span className={s.afterLine} aria-hidden>
            <i />
          </span>
          {AFTER.map((a, i) => (
            <div key={a.title} className={s.reveal} style={{ transitionDelay: `${0.25 + i * 0.15}s` }}>
              <article className={s.afterCard} style={{ ["--c" as string]: a.color }} {...spot}>
                <span className={s.afterNum}>0{i + 1}</span>
                <h3 className="mt-4 font-display text-xl font-black uppercase leading-tight">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65 sm:text-base">{a.body}</p>
              </article>
            </div>
          ))}
        </div>

        <div className={`${s.quoteWrap} ${s.reveal}`} style={{ transitionDelay: "0.3s" }}>
          <div className={s.quotePhoto}>
            <PhotoSlot src={aboutHeroBg} label="The NiuNorm team" />
          </div>
          <div>
            <span className={s.quoteMark} aria-hidden>“</span>
            <blockquote className={s.quote}>
              We only take 15 brands because we want to{" "}
              <span className={s.quoteHi}>know your numbers by heart</span>, not just send you a report.
            </blockquote>
            <p className={s.quoteBy}>— The NiuNorm team</p>
            <a href="#apply-form" className={`${btnPink} ${s.btnShine} mt-8`}>
              Apply to work with us
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 5. FAQ ---------- */

const FAQ = [
  { q: "How long does the application take?", a: "About 3 minutes. Five quick steps, and your answers are saved on this device as you go." },
  { q: "Is the strategy call really free?", a: "Yes. It’s a free 30-minute call. We look at your shop beforehand so the time goes to real ideas, not a sales pitch." },
  { q: "Why do you only take 15 brands?", a: "So every client gets senior attention. We’d rather know your numbers by heart than spread ourselves thin." },
  { q: "What if my shop isn’t live yet?", a: "That’s fine. Pick “Not live yet” in the form and we’ll talk through launching the right way." },
];

function Faq() {
  const [ref, inView] = useInView<HTMLElement>(0.15);
  const [open, setOpen] = useState(0);
  return (
    <section ref={ref} className={`${s.section} ${inView ? s.inView : ""}`}>
      <div className="mx-auto max-w-4xl px-5 py-20 sm:px-6 md:px-10 md:py-28">
        <p className={`${s.pill} ${s.reveal}`}>
          <span className={s.liveDot} /> Questions
        </p>
        <h2 className={`mt-6 font-display text-[clamp(2rem,5vw,3.5rem)] font-black uppercase leading-[0.92] tracking-tight ${s.reveal}`} style={{ transitionDelay: "0.1s" }}>
          Questions? <span className={s.shimmer}>Sagot namin.</span>
        </h2>
        <div className="mt-10 grid gap-3">
          {FAQ.map((item, i) => (
            <div key={item.q} className={`${s.faq} ${open === i ? s.faqOpen : ""} ${s.reveal}`} style={{ transitionDelay: `${0.2 + i * 0.08}s` }}>
              <button type="button" className={s.faqQ} aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                <span className={s.faqIdx}>0{i + 1}</span>
                <span className="flex-1 text-left">{item.q}</span>
                <span className={s.faqPlus} aria-hidden />
              </button>
              <div className={s.faqA}>
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 6. Closing banner ---------- */

function GrowBanner() {
  const [ref, inView] = useInView<HTMLElement>(0.3);
  const spot = useSpotlight();
  return (
    <section ref={ref} className={`${s.section} ${inView ? s.inView : ""}`}>
      <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-6 md:px-10 md:pb-32">
        <div className={`${s.banner} ${s.reveal}`} {...spot}>
          <span className={s.bannerGlare} aria-hidden />
          <span className={s.bannerRing} aria-hidden />
          <span className={`${s.bannerRing} ${s.bannerRing2}`} aria-hidden />
          <div className={s.bannerSparks} aria-hidden>
            {Array.from({ length: 12 }, (_, i) => (
              <i key={i} style={{ left: `${(i * 41 + 9) % 100}%`, animationDelay: `${-((i * 0.9) % 6)}s`, animationDuration: `${5 + (i % 4)}s` }} />
            ))}
          </div>

          <div className="relative text-center">
            <p className={s.bannerKicker}>
              <span /> 3-minute application
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,4.6vw,3.6rem)] font-black uppercase leading-[0.95] tracking-tight text-ink">
              Ready na ba ang brand mo <span className={s.bannerOutline}>to grow?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink/80 sm:text-lg">
              Your next best month on TikTok Shop starts with a 3-minute application. Tara, let’s build
              it together.
            </p>
            <a href="#apply-form" className={`${s.bannerBtn} ${s.btnShine} group mt-9`}>
              Apply now, it’s free
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Apply() {
  return (
    <main className="bg-ink text-cream">
      <Hero />
      <Marquee />
      <Benefits />
      <ApplyForm />
      <After />
      <Faq />
      <GrowBanner />
    </main>
  );
}
