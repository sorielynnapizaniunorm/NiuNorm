import { useEffect, useState } from "react";
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

function Hero({ onApply }: { onApply?: () => void }) {
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
          <div className="grid w-fit grid-cols-1 gap-3 sm:flex sm:w-auto sm:flex-row sm:items-center md:justify-end">
            <a
              href="#apply"
              onClick={(e) => { e.preventDefault(); onApply?.(); }}
              className="soft-btn-pink group inline-flex items-center justify-center gap-2 rounded-full bg-pink px-5 py-3 text-xs font-bold uppercase tracking-wider text-ink transition-all hover:-translate-y-0.5 sm:px-7 sm:py-4 sm:text-sm sm:tracking-[0.16em]"
            >
              See if you qualify
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#results"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/25 px-5 py-3 text-center text-xs font-bold uppercase tracking-wider text-cream backdrop-blur transition-colors hover:border-cream hover:bg-cream hover:text-ink sm:px-7 sm:py-4 sm:text-sm sm:tracking-[0.16em]"
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
    <section id="about" className="bg-cream text-ink">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 md:px-10 md:py-28">
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
                  : "border-ink/10 bg-white/70 text-ink"
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
                <p className={`mt-6 text-base leading-relaxed ${c.accent ? "text-ink/80" : "text-ink/70"}`}>
                  {c.body}
                </p>
              </div>
              <ul className="mt-10 space-y-3">
                {c.foot.map((f) => (
                  <li
                    key={f}
                    className={`border-t pt-3 text-sm ${
                      c.accent ? "border-ink/25 text-ink/80" : "border-ink/15 text-ink/60"
                    }`}
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section id="results" className="text-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 md:px-10 md:py-28">
        <p className="label mb-6 text-teal">What we've built</p>
        <h2 className="max-w-3xl font-display text-[clamp(2rem,6.5vw,3.75rem)] font-black uppercase leading-[0.9] tracking-tight text-cream/15">
          ₱500M+ in TikTok Shop GMV generated.
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 md:mt-16">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-3xl border border-white/12 bg-white/5 p-7 md:p-8"
            >
              <div className="font-display text-5xl font-black tracking-tight text-teal sm:text-6xl md:text-7xl">
                {s.value}
              </div>
              <p className="label mt-4 text-cream/55">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const NIUNIES_PERKS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 2l1.8 5.5H17l-4.8 3.5 1.8 5.5L9 13 4 16.5l1.8-5.5L1 7.5h6.2L9 2z"/>
      </svg>
    ),
    title: "Brand collaborations",
    body: "Get matched with NiuNorm partner brands. Direct, vetted, no cold DMs.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="14" height="11" rx="2"/>
        <path d="M12 4V3a2 2 0 00-6 0v1"/>
        <path d="M9 10v1m0-1a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
      </svg>
    ),
    title: "Paid opportunities",
    body: "Earn from affiliate commissions, paid campaigns, and LIVE selling sessions.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 2l1.5 4.5H15l-4 3 1.5 4.5L9 11 5 14l1.5-4.5L2.5 6.5H8L9 2z"/>
      </svg>
    ),
    title: "Creator challenges",
    body: "Weekly challenges with real cash prizes, brand deals, and exclusive rewards.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7" cy="6" r="3"/>
        <path d="M1 16c0-3.3 2.7-6 6-6"/>
        <circle cx="13" cy="7" r="2.5"/>
        <path d="M12 12c2 0 4 1.3 4 4"/>
      </svg>
    ),
    title: "Core creator perks",
    body: "Top Niunies get priority access, higher commissions, and co-branding features.",
  },
];

function Niunies() {
  return (
    <section id="niunies" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -right-32 top-0 h-[32rem] w-[32rem] rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, #4ECDC4, transparent 65%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 md:px-10 md:py-28">
        <div className="grid gap-10 md:grid-cols-2 md:items-end md:gap-16">
          <div>
            <p className="label mb-6 flex items-center gap-3 text-teal">
              <span className="h-2 w-2 rounded-full bg-teal" />
              Creator Community
            </p>
            <h2 className="font-display text-[clamp(2.25rem,7vw,4.5rem)] font-black uppercase leading-[0.9] tracking-tight">
              For creators.<br />
              <span className="text-pink">Not just brands.</span>
            </h2>
          </div>
          <p className="text-base leading-relaxed text-cream/65 md:text-lg">
            Niunies is NiuNorm's creator and affiliate community. TikTok creators get access to
            brand collaborations, product campaigns, paid opportunities, and creator challenges —
            all inside the TikTok Shop ecosystem.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {NIUNIES_PERKS.map((p) => (
            <div
              key={p.title}
              className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-white/4 p-6 transition-colors hover:border-white/14 hover:bg-white/7"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal">
                {p.icon}
              </span>
              <div>
                <h3 className="font-semibold text-cream">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-cream/55">{p.body}</p>
              </div>
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

const SOCIAL_LINKS = [
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@niunorm",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#25F4EE" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.95a8.16 8.16 0 004.77 1.52V7.01a4.85 4.85 0 01-1-.32z"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/helloniunorm",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/niunorm.ph/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
];

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-4">
            <a href="#top" className="flex items-center gap-3">
              <img src={logo} alt="Niunorm logo" className="h-10 w-10 rounded-full" />
              <span className="text-lg font-black lowercase tracking-tight text-cream">
                niu<span className="bg-gradient-to-r from-pink to-teal bg-clip-text text-transparent">norm</span>
              </span>
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-cream/50">
              Platinum TikTok Shop Partner agency in the Philippines. We help brands sell — actually.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-cream/50 transition-colors hover:border-pink hover:text-pink"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-12">
            <div className="flex flex-col gap-3">
              <p className="label text-cream/35">Company</p>
              {NAV_LINKS.map((n) => (
                <a key={n.label} href={n.href} className="text-sm text-cream/60 transition-colors hover:text-cream">
                  {n.label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <p className="label text-cream/35">Work with us</p>
              <a href="#apply" className="text-sm text-cream/60 transition-colors hover:text-cream">Apply as a Brand</a>
              <a href="https://www.tiktok.com/@niunorm" target="_blank" rel="noopener noreferrer" className="text-sm text-cream/60 transition-colors hover:text-cream">Join Niunies</a>
            </div>
            <div className="flex flex-col gap-3">
              <p className="label text-cream/35">Contact</p>
              <a href="mailto:sorielynnapiza.niunorm@gmail.com" className="text-sm text-cream/60 transition-colors hover:text-cream">Email us</a>
              <a href="https://www.tiktok.com/@niunorm" target="_blank" rel="noopener noreferrer" className="text-sm text-cream/60 transition-colors hover:text-cream">TikTok DM</a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start gap-2 border-t border-white/8 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-cream/30">© {new Date().getFullYear()} Niunorm. All rights reserved.</p>
          <p className="label text-cream/25">Platinum TikTok Shop Partner · Philippines</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [showApply, setShowApply] = useState(() => window.location.hash === "#apply");

  useEffect(() => {
    const syncApplyView = () => setShowApply(window.location.hash === "#apply");

    window.addEventListener("hashchange", syncApplyView);
    window.addEventListener("popstate", syncApplyView);
    return () => {
      window.removeEventListener("hashchange", syncApplyView);
      window.removeEventListener("popstate", syncApplyView);
    };
  }, []);

  function openApply() {
    window.history.pushState(null, "", "#apply");
    setShowApply(true);
  }

  function closeApply() {
    window.history.pushState(null, "", `${window.location.pathname}${window.location.search}`);
    setShowApply(false);
  }

  if (showApply) {
    return (
      <div className="min-h-screen bg-ink text-cream">
        <Nav onApply={closeApply} />
        <Apply onBack={closeApply} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink text-cream">
      <Nav onApply={openApply} />
      <Hero onApply={openApply} />
      <Marquee />
      <Pillars />
      <Stats />
      <Trust />
      <Niunies />
      <CTA onApply={openApply} />
      <Footer />
    </div>
  );
}
