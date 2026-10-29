import { Link } from "react-router";

const PERKS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 2L13.5 8.5H20.5L14.5 12.5L17 19L11 15L5 19L7.5 12.5L1.5 8.5H8.5L11 2Z"/>
      </svg>
    ),
    title: "Brand Collaborations",
    body: "Get matched with NiuNorm partner brands actively looking for creators. Direct, vetted, no cold DMs.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="18" height="14" rx="2"/>
        <path d="M15 5V3a2 2 0 00-8 0v2"/>
        <path d="M11 12v2m0-2a2 2 0 100-4 2 2 0 000 4z"/>
      </svg>
    ),
    title: "Paid Opportunities",
    body: "Earn from affiliate commissions, paid campaigns, and LIVE selling sessions with real brands.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12V8a4 4 0 018 0v4"/>
        <rect x="2" y="12" width="12" height="8" rx="2"/>
        <path d="M16 8h2a2 2 0 012 2v8a2 2 0 01-2 2h-2"/>
      </svg>
    ),
    title: "Product Campaigns",
    body: "Receive products from brands for review, LIVE, or content. Keep them and earn from your sales.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"/>
      </svg>
    ),
    title: "Creator Challenges",
    body: "Weekly and monthly challenges with real cash prizes, brand deals, and exclusive creator rewards.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="8" r="4"/>
        <path d="M3 20c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
      </svg>
    ),
    title: "Affiliate Ecosystem",
    body: "Access affiliate links and commission structures across all NiuNorm partner brands on TikTok Shop.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 3L13 8H18L14 11L15.5 16.5L11 13.5L6.5 16.5L8 11L4 8H9L11 3Z"/>
        <circle cx="11" cy="19" r="1.5"/>
      </svg>
    ),
    title: "Core Creator Perks",
    body: "Top Niunies get priority access, higher commissions, co-branding features, and direct NiuNorm support.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Sign up as a Niunies creator",
    body: "Fill out the creator form — takes less than 2 minutes. Tell us your niche, follower count, and content style.",
  },
  {
    n: "02",
    title: "Get matched to campaigns",
    body: "Our team reviews your profile and connects you with brands and campaigns that fit your audience.",
  },
  {
    n: "03",
    title: "Create, sell, and earn",
    body: "Post content, join LIVE sessions, drive affiliate sales — and get paid. Simple as that.",
  },
];

const CREATOR_TIERS = [
  {
    tier: "Starter",
    range: "1K – 10K followers",
    perks: ["Product seeding", "Affiliate links", "Community access", "Creator challenges"],
    accent: false,
  },
  {
    tier: "Rising",
    range: "10K – 100K followers",
    perks: ["Paid campaigns", "Brand collabs", "Priority matching", "Monthly bonuses"],
    accent: true,
  },
  {
    tier: "Core",
    range: "100K+ followers",
    perks: ["Exclusive deals", "Co-branding", "Higher commissions", "Direct NiuNorm team support"],
    accent: false,
  },
];

export default function Niunies() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -left-40 -top-40 h-[40rem] w-[40rem] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #F04B9A, transparent 65%)" }}
        />
        <div
          className="pointer-events-none absolute -right-20 top-20 h-[28rem] w-[28rem] rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, #4ECDC4, transparent 65%)" }}
        />
        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-6 md:px-10 md:pb-28 md:pt-24">
          <p className="label mb-6 flex items-center gap-3 text-teal">
            <span className="h-2 w-2 rounded-full bg-teal" />
            Creator Community
          </p>
          <h1 className="max-w-5xl font-display text-[clamp(2.75rem,11vw,8rem)] font-black uppercase leading-[0.86] tracking-tight">
            Create.<br />
            Sell. <span className="text-pink">Earn.</span>
          </h1>
          <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-[1.1fr_0.9fr] md:items-end md:gap-10">
            <p className="max-w-xl text-base leading-relaxed text-cream/70 sm:text-lg">
              Niunies is NiuNorm's creator and affiliate community. Join to get access to brand
              collaborations, product campaigns, paid opportunities, creator challenges, and more —
              all inside the TikTok Shop ecosystem.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row md:justify-end">
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="soft-btn-pink group inline-flex items-center justify-center gap-2 rounded-full bg-pink px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-ink transition-all hover:-translate-y-0.5"
              >
                Join Niunies
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <Link
                to="/apply"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/25 px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.16em] text-cream backdrop-blur transition-colors hover:border-cream hover:bg-cream hover:text-ink"
              >
                I'm a brand
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── What you get ── */}
      <section className="bg-cream text-ink">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 md:px-10 md:py-28">
          <p className="label mb-6 text-teal">What's in it for you</p>
          <h2 className="max-w-3xl font-display text-[clamp(2.25rem,7vw,4.5rem)] font-black uppercase leading-[0.9] tracking-tight">
            Everything a creator needs to win on TikTok Shop
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
            {PERKS.map((p) => (
              <div
                key={p.title}
                className="soft-card-light group flex flex-col rounded-3xl border border-ink/10 bg-white/70 p-7 transition-all hover:-translate-y-1 hover:bg-ink hover:text-cream"
              >
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-pink/10 text-pink transition-colors group-hover:bg-pink/20">
                  {p.icon}
                </span>
                <h3 className="text-xl font-extrabold leading-tight">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60 group-hover:text-cream/70">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 md:px-10 md:py-28">
        <p className="label mb-6 text-teal">Simple process</p>
        <h2 className="max-w-3xl font-display text-[clamp(2rem,6.5vw,3.75rem)] font-black uppercase leading-[0.9] tracking-tight">
          From creator to earning in three steps
        </h2>
        <div className="mt-12 grid gap-5 md:mt-14 md:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="flex flex-col rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <span className="font-mono text-sm font-bold text-pink">{step.n}</span>
              <h3 className="mt-6 text-xl font-extrabold leading-tight">{step.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-cream/60">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Creator Tiers ── */}
      <section className="bg-cream text-ink">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 md:px-10 md:py-28">
          <p className="label mb-6 text-teal">Find your level</p>
          <h2 className="max-w-3xl font-display text-[clamp(2rem,6.5vw,3.75rem)] font-black uppercase leading-[0.9] tracking-tight">
            Niunies for every creator size
          </h2>
          <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-3">
            {CREATOR_TIERS.map((tier) => (
              <article
                key={tier.tier}
                className={`soft-card flex flex-col rounded-3xl border p-7 transition-transform hover:-translate-y-1 sm:p-8 ${
                  tier.accent
                    ? "border-pink bg-pink text-ink"
                    : "border-ink/10 bg-white/70 text-ink"
                }`}
              >
                <p className={`label mb-2 ${tier.accent ? "text-ink/60" : "text-teal"}`}>
                  {tier.range}
                </p>
                <h3 className="font-display text-3xl font-extrabold uppercase leading-none tracking-tight">
                  {tier.tier}
                </h3>
                <ul className="mt-8 space-y-3">
                  {tier.perks.map((perk) => (
                    <li
                      key={perk}
                      className={`flex items-center gap-2.5 border-t pt-3 text-sm font-medium ${
                        tier.accent ? "border-ink/20 text-ink/80" : "border-ink/10 text-ink/70"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${tier.accent ? "bg-ink/50" : "bg-pink"}`} />
                      {perk}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #4ECDC4, transparent 65%)" }}
        />
        <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-6 md:py-36">
          <p className="label mb-6 flex items-center justify-center gap-3 text-teal">
            <span className="h-2 w-2 rounded-full bg-teal" />
            Open to all TikTok creators
          </p>
          <h2 className="font-display text-[clamp(2rem,7vw,4.5rem)] font-black uppercase leading-[0.92] tracking-tight">
            Ready to become<br />
            a <span className="text-pink">Niunies</span> creator?
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base text-cream/70 sm:mt-8 sm:text-lg">
            Join the community. Get matched with brands. Start earning on TikTok Shop.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="soft-btn-pink inline-flex items-center gap-2 rounded-full bg-pink px-9 py-4 text-sm font-bold uppercase tracking-[0.16em] text-ink transition-all hover:-translate-y-0.5"
            >
              Join Niunies →
            </a>
            <Link
              to="/apply"
              className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-9 py-4 text-sm font-bold uppercase tracking-[0.16em] text-cream transition-colors hover:border-cream hover:bg-cream hover:text-ink"
            >
              I represent a brand
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
