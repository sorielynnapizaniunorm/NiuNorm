import { useState } from "react";
import logo from "../assets/NiunormLogo.png";
import heroBg from "../assets/hero-bg-2.jpg";
import Apply from "./apply";
import MobileDrawer, { NAV_LINKS } from "./MobileMenu";
import m from "../css/MobileMenu.module.css";

const PILLARS = [
  {
    n: "01",
    title: "Priority algorithm access",
    body: "You hear about TikTok's shifts and beta features before most sellers do.",
  },
  {
    n: "02",
    title: "A partner who knows the TikTok Shop system",
    body: "Leverage our TikTok expertise to troubleshoot challenges and keep your growth moving forward.",
  },
  {
    n: "03",
    title: "One full-stack team",
    body: "TikTok Affiliate, TikTok Ads, TikTok Content, LIVE — under one roof, not five freelancers.",
  },
  {
    n: "04",
    title: "A capped roster",
    body: "You're one of 15 accounts we manage — not one of 200.",
  },
];

const TRUST = [
  {
    tag: "Experts in action",
    title: "TikTok Shop Expertise",
    body: "Deep experience building and scaling Philippine TikTok Shops.",
    foot: ["TikTok Ads & commerce strategy", "TikTok Affiliate ecosystem", "Shop growth playbooks"],
    accent: false,
  },
  {
    tag: "Featured in GMA.online",
    title: "Industry Recognition",
    body: "Trusted voice in the TikTok Shop ecosystem.",
    foot: ["TikTok events & speaking", "Industry collaborations", "Platform insights"],
    accent: true,
  },
  {
    tag: "TikTok Network",
    title: "Brand Visibility",
    body: "Helping brands create stronger market presence.",
    foot: ["PR features", "Matchmaking by TikTok", "Partner spotlights"],
    accent: false,
  },
];

const STATS = [
  { value: "4X", label: "TikTok Shop Partner" },
  { value: "₱500M+", label: "GMV managed to date" },
  { value: "15", label: "Brands managed" },
];

function Nav({ onApply }: { onApply: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <a href="#top" className="flex items-center gap-3" aria-label="Niunorm home">
            <img
              src={logo}
              alt="Niunorm logo"
              className="h-10 w-10 rounded-full sm:h-11 sm:w-11"
            />
            <span className="hidden text-lg font-black lowercase tracking-tight sm:inline">
              niu<span className="bg-gradient-to-r from-pink to-teal bg-clip-text text-transparent">norm</span>
            </span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="label text-cream/70 transition-colors hover:text-cream"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onApply}
              className="soft-btn-pink hidden rounded-full bg-pink px-6 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-ink transition-all hover:-translate-y-0.5 sm:inline-block"
            >
              Apply
            </button>
            <button
              type="button"
              className={`${m.menuBtn} md:hidden`}
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <span className={m.bar} />
              <span className={m.bar} />
              <span className={m.bar} />
            </button>
          </div>
        </div>
      </header>
      <MobileDrawer
        open={open}
        onClose={() => setOpen(false)}
        showApply
        onApply={onApply}
      />
    </>
  );
}

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
    <section id="top" className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})`, transform: "scaleX(-1)" }}
      />
      <div className="absolute inset-0 bg-ink/50" />
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #F04B9A, transparent 65%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-6 md:px-10 md:pb-28 md:pt-24">
        <p className="label mb-6 flex items-center gap-3 text-teal sm:mb-8">
          <span className="h-2 w-2 rounded-full bg-teal" />
          Platinum-spend TikTok Shop partner
        </p>
        <h1 className="max-w-5xl font-display text-[clamp(2.75rem,12vw,8.5rem)] font-black uppercase leading-[0.86] tracking-tight">
          Your TikTok<br />
          Shop,{" "}
          <span className="text-pink">actually</span><br />
          selling.
        </h1>
        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-[1.1fr_0.9fr] md:items-end md:gap-10">
          <p className="max-w-xl text-base leading-relaxed text-cream/70 sm:text-lg">
            Niunorm runs LIVE TikTok Shop selling, Affiliate Marketing, Retention &amp; CRM,
            GMV Max ads, and content for a capped roster of Philippine brands — turning
            attention into revenue.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row md:justify-end">
            <a
              href="#apply"
              className="soft-btn-pink group inline-flex items-center justify-center gap-2 rounded-full bg-pink px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-ink transition-all hover:-translate-y-0.5"
            >
              See if you qualify
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#results"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/25 px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.16em] text-cream backdrop-blur transition-colors hover:border-cream hover:bg-cream hover:text-ink"
            >
              View our results
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section id="services" className="bg-cream text-ink">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 md:px-10 md:py-28">
        <p className="label mb-6 text-teal">Built for TikTok Shop growth</p>
        <h2 className="max-w-4xl font-display text-[clamp(2.25rem,7vw,4.5rem)] font-black uppercase leading-[0.9] tracking-tight">
          What this actually gets your brand
        </h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <div
              key={p.n}
              className="soft-card-light group flex flex-col rounded-3xl border border-ink/10 bg-white/70 p-7 transition-all hover:-translate-y-1 hover:bg-ink hover:text-cream"
            >
              <span className="font-mono text-sm font-bold text-pink">{p.n}</span>
              <h3 className="mt-8 text-xl font-extrabold leading-tight">{p.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-ink/60 group-hover:text-cream/70">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Trust() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-16 sm:px-6 md:px-10 md:py-28">
      <p className="label mb-6 text-teal">Let's get to know each other</p>
      <h2 className="max-w-4xl font-display text-[clamp(2rem,6.5vw,3.75rem)] font-black uppercase leading-[0.9] tracking-tight">
        Trusted by the TikTok Shop ecosystem
      </h2>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
        {TRUST.map((c) => (
          <article
            key={c.title}
            className={`soft-card flex flex-col justify-between rounded-3xl border p-6 transition-transform hover:-translate-y-1 sm:p-8 ${
              c.accent
                ? "border-pink bg-pink text-ink"
                : "border-white/12 bg-ink-2 text-cream"
            }`}
          >
            <div>
              <p
                className={`label mb-6 ${c.accent ? "text-ink/70" : "text-teal"}`}
              >
                {c.tag}
              </p>
              <h3 className="font-display text-3xl font-extrabold uppercase leading-[0.92] tracking-tight">
                {c.title}
              </h3>
              <p className={`mt-6 text-base leading-relaxed ${c.accent ? "text-ink/80" : "text-cream/70"}`}>
                {c.body}
              </p>
            </div>
            <ul className="mt-10 space-y-3">
              {c.foot.map((f) => (
                <li
                  key={f}
                  className={`border-t pt-3 text-sm ${
                    c.accent ? "border-ink/25 text-ink/80" : "border-white/12 text-cream/55"
                  }`}
                >
                  {f}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section id="results" className="bg-cream text-ink">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 md:px-10 md:py-28">
        <p className="label mb-6 text-teal">What we've built</p>
        <h2 className="max-w-3xl font-display text-[clamp(2rem,6.5vw,3.75rem)] font-black uppercase leading-[0.9] tracking-tight text-ink/15">
          ₱500M+ in TikTok Shop GMV generated.
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 md:mt-16">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="soft-card-light rounded-3xl border border-ink/10 bg-white/70 p-7 md:p-8"
            >
              <div className="font-display text-5xl font-black tracking-tight text-teal sm:text-6xl md:text-7xl">
                {s.value}
              </div>
              <p className="label mt-4 text-ink/60">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA({ onApply }: { onApply: () => void }) {
  return (
    <section id="apply" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #F04B9A, transparent 65%)" }}
      />
      <div className="relative mx-auto max-w-5xl px-5 py-20 text-center sm:px-6 md:py-36">
        <h2 className="font-display text-[clamp(2rem,7vw,4.5rem)] font-black uppercase leading-[0.92] tracking-tight">
          We only take<br />15 clients at a time.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-base text-cream/70 sm:mt-8 sm:text-lg">
          That's on purpose. Apply to see if there's a slot for your brand.
        </p>
        <button
          type="button"
          onClick={onApply}
          className="soft-btn-pink mt-10 inline-flex items-center gap-2 rounded-full bg-pink px-9 py-4 text-sm font-bold uppercase tracking-[0.16em] text-ink transition-all hover:-translate-y-0.5"
        >
          Apply now →
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-12 md:px-10">
        <img
          src={logo}
          alt="Niunorm logo"
          className="h-16 w-16 rounded-full"
        />
        <p className="label text-cream/45">
          © Niunorm — Platinum TikTok Shop Partner, Philippines
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  const [showApply, setShowApply] = useState(false);

  if (showApply) {
    return (
      <div className="min-h-screen bg-ink text-cream">
        <Nav onApply={() => setShowApply(false)} />
        <Apply onBack={() => setShowApply(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink text-cream">
      <Nav onApply={() => setShowApply(true)} />
      <Hero />
      <Marquee />
      <Pillars />
      <Trust />
      <Stats />
      <CTA onApply={() => setShowApply(true)} />
      <Footer />
    </div>
  );
}
