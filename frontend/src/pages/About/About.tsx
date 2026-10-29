import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import styles from "./about.module.css";
import teamPhoto from "../../imports/resultsBg";
import logo from "../../imports/NiunormLogo.png";

/** Adds the in-view class once the element scrolls into view. */
function useInView<T extends Element>(threshold = 0.25) {
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

const NUMBERS = [
  { key: "partner", value: "5×", label: "TikTok Shop Partner", caption: "Partner recognitions from TikTok Shop", color: "#F5B94F" },
  { key: "gmv", value: "700M", label: "GMV Generated", caption: "Combined across brands we manage", color: "#F04B9A" },
  { key: "brands", value: "100+", label: "Brands Managed", caption: "Across beauty, fashion, wellness & pet", color: "#35D6C4" },
];

const btnPink =
  "soft-btn-pink group inline-flex items-center justify-center gap-2 rounded-full bg-pink px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-ink transition-all hover:-translate-y-0.5";

function CountUp({ value, delay = 0 }: { value: string; delay?: number }) {
  const m = value.match(/^(\d+)(.*)$/);
  const target = m ? Number(m[1]) : 0;
  const suffix = m ? m[2] : value;
  const [n, setN] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now() + delay;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - t0) / 1600));
      setN(Math.round(target * (1 - (1 - t) ** 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, delay]);
  return (
    <>
      {n}
      {suffix}
    </>
  );
}

const SEAL_TEXT = "Meet NiuNorm · TikTok Shop Partner · Philippines · ";

function AboutHero() {
  const heroRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", `${e.clientX - r.left}px`);
      hero.style.setProperty("--my", `${e.clientY - r.top}px`);
      const card = cardRef.current;
      if (!card) return;
      const c = card.getBoundingClientRect();
      const px = (e.clientX - c.left) / c.width - 0.5;
      const py = (e.clientY - c.top) / c.height - 0.5;
      card.style.setProperty("--rx", `${(-py * 8).toFixed(2)}deg`);
      card.style.setProperty("--ry", `${(px * 10).toFixed(2)}deg`);
      card.style.setProperty("--gx", `${((px + 0.5) * 100).toFixed(1)}%`);
      card.style.setProperty("--gy", `${((py + 0.5) * 100).toFixed(1)}%`);
    };
    const leave = () => {
      cardRef.current?.style.setProperty("--rx", "0deg");
      cardRef.current?.style.setProperty("--ry", "0deg");
    };
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", leave);
    return () => {
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <section ref={heroRef} className={styles.hero}>
      <div className={styles.heroGrid} aria-hidden />
      <div className={styles.heroGlow} aria-hidden />
      <div className={styles.heroGlow2} aria-hidden />
      <div className={styles.spotlight} aria-hidden />
      <div className={styles.grain} aria-hidden />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-32 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:px-10 md:pb-28 md:pt-40">
        <div>
          <p className={`${styles.eyebrow} ${styles.rise}`}>
            <span className={styles.liveDot} /> Meet NiuNorm
          </p>
          <h1 className="font-display text-[clamp(2.1rem,4vw,3.6rem)] font-black uppercase leading-[0.95] tracking-tight">
            <span className={styles.lineMask}>
              <span className={styles.lineIn} style={{ animationDelay: "0.15s" }}>The people behind</span>
            </span>
            <span className={styles.lineMask}>
              <span className={styles.lineIn} style={{ animationDelay: "0.3s" }}>your shop’s</span>
            </span>
            <span className={styles.lineMask}>
              <span className={styles.lineIn} style={{ animationDelay: "0.45s" }}>
                <span className={styles.swoosh}>
                  <span className={styles.shimmer}>next chapter.</span>
                  <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden>
                    <path pathLength={1} d="M4 18 C 70 6, 150 4, 296 12" />
                  </svg>
                </span>
              </span>
            </span>
          </h1>
          <p className={`${styles.rise} mt-8 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg`} style={{ animationDelay: "0.65s" }}>
            NiuNorm is a TikTok Shop partner agency working with Filipino brands across beauty,
            fashion, wellness, pet essentials, and more.
          </p>
          <p className={`${styles.rise} mt-4 max-w-xl text-base leading-relaxed text-cream/60 sm:text-lg`} style={{ animationDelay: "0.75s" }}>
            We bring together people who understand the daily work behind a growing shop, from the
            content shoppers discover to the conversations that help them check out.
          </p>
          <div className={`${styles.rise} mt-10 flex flex-wrap gap-3`} style={{ animationDelay: "0.9s" }}>
            <a href="#team" className={`${btnPink} ${styles.btnShine}`}>
              Meet the Team
              <span className="transition-transform group-hover:translate-y-0.5">↓</span>
            </a>
          </div>

          <ul className={`${styles.rise} ${styles.catRow}`} style={{ animationDelay: "1.05s" }}>
            {["Beauty", "Fashion", "Wellness", "Pet essentials", "And more"].map((c, i) => (
              <li key={c} style={{ ["--c" as string]: ["#F04B9A", "#F5B94F", "#35D6C4", "#FF66B2", "#9A8FA8"][i] }}>
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.stage}>
          <span className={styles.orbit1} aria-hidden />
          <span className={styles.orbit2} aria-hidden />

          <div ref={cardRef} className={styles.photoWrap}>
            <span className={styles.photoFrame} aria-hidden />
            <div className={styles.photo} style={{ backgroundImage: `url(${teamPhoto})` }} role="img" aria-label="The NiuNorm team">
              <span className={styles.glare} aria-hidden />
              <span className={styles.photoTint} aria-hidden />
            </div>

            {/* Rotating seal */}
            <div className={styles.seal} aria-hidden>
              <svg viewBox="0 0 120 120" className={styles.sealText}>
                <defs>
                  <path id="sealPath" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
                </defs>
                <text>
                  <textPath href="#sealPath">{SEAL_TEXT.repeat(2)}</textPath>
                </text>
              </svg>
              <span className={styles.sealCore}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />
                </svg>
              </span>
            </div>

            <div className={`${styles.floatCard} ${styles.floatTop}`}>
              <span className={styles.pulse} />
              <span className="flex flex-col">
                <span className="label text-teal">Working with</span>
                <strong>Filipino brands</strong>
              </span>
            </div>

            <div className={`${styles.floatCard} ${styles.photoBadge}`}>
              <span className={styles.badgeIcon} aria-hidden>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />
                </svg>
              </span>
              <span className="flex flex-col">
                <span className="label text-amber">5×</span>
                <strong>TikTok Shop Partner</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      <a href="#who" className={styles.scrollCue} aria-label="Scroll to who we are">
        <span />
      </a>
    </section>
  );
}

/* ---------- Data you can fill in ---------- */

// Behind-the-scenes photos (Section 2). Add an image import to `src` to show a photo.
const BTS_PHOTOS: { label: string; src?: string }[] = [
  { label: "Planning" },
  { label: "Filming" },
  { label: "LIVE session" },
];

// Event / speaking photos (Section 5).
const EVENT_PHOTOS: { label: string; src?: string }[] = [
  { label: "Speaking engagement", src: teamPhoto },
  { label: "TikTok event" },
  { label: "Industry collaboration" },
];

// Featured media (Section 6). Fill in the exact headline, date and link.
const FEATURE = {
  outlet: "GMA Online",
  headline: "",
  date: "",
  url: "",
};

// Other events or collaborations (Section 6).
const APPEARANCES: { tag: string; title: string; date: string; src?: string; url?: string }[] = [
  { tag: "Speaking engagement", title: "", date: "", src: teamPhoto },
  { tag: "Event", title: "", date: "" },
  { tag: "Collaboration", title: "", date: "" },
];

// Team (Section 7). Add a photo import to `src` for each person.
const TEAM: { name: string; role: string; desc: string; src?: string }[] = [
  { name: "", role: "", desc: "" },
  { name: "", role: "", desc: "" },
  { name: "", role: "", desc: "" },
  { name: "", role: "", desc: "" },
];

/* ---------- Shared bits ---------- */

/** A photo frame. Shows the image when `src` is set, otherwise a styled placeholder. */
function PhotoSlot({ src, label, className = "" }: { src?: string; label: string; className?: string }) {
  return (
    <div className={`${styles.slot} ${src ? "" : styles.slotEmpty} ${className}`}>
      {src ? (
        <div className={styles.slotImg} style={{ backgroundImage: `url(${src})` }} role="img" aria-label={label} />
      ) : (
        <div className={styles.slotPh} aria-hidden>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8a2 2 0 012-2h2l1.5-2h7L17 6h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
            <circle cx="12" cy="13" r="3.5" />
          </svg>
          <span>Add photo</span>
        </div>
      )}
      <span className={styles.slotLabel}>{label}</span>
    </div>
  );
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
      el.style.setProperty("--rx", `${((0.5 - py) * 7).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${((px - 0.5) * 9).toFixed(2)}deg`);
    },
    onPointerLeave: (e: React.PointerEvent<HTMLElement>) => {
      e.currentTarget.style.setProperty("--rx", "0deg");
      e.currentTarget.style.setProperty("--ry", "0deg");
    },
  };
}

/* ---------- Section 2: Who we are ---------- */

const ROLES = [
  { name: "Marketers", color: "#F04B9A" },
  { name: "Affiliate managers", color: "#35D6C4" },
  { name: "Content creatives", color: "#F5B94F" },
  { name: "LIVE operators", color: "#FF66B2" },
];
const LOOP = ["Plan", "Launch", "Review", "Adjust"];

function WhoSection() {
  const [ref, inView] = useInView<HTMLElement>(0.2);
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const iv = window.setInterval(() => setStep((x) => (x + 1) % LOOP.length), 1600);
    return () => window.clearInterval(iv);
  }, [inView]);

  return (
    <section id="who" ref={ref} className={`${styles.who} ${inView ? styles.inView : ""}`}>
      <span className={styles.whoBlob} aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-6 md:grid-cols-[1.05fr_0.95fr] md:px-10 md:py-32">
        <div>
          <p className={`${styles.inkEyebrow} ${styles.reveal}`}>
            <span /> Who we are
          </p>
          <h2 className="font-display text-[clamp(2.1rem,5vw,4rem)] font-black uppercase leading-[0.92] tracking-tight">
            <span className={`${styles.reveal} block`}>Different specialties.</span>
            <span className={`${styles.reveal} block text-pink`} style={{ transitionDelay: "0.12s" }}>
              <span className={styles.marker}>Shared responsibility.</span>
            </span>
          </h2>

          <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-ink/70 sm:text-lg">
            <p className={`text-ink ${styles.reveal}`} style={{ transitionDelay: "0.2s" }}>
              We’re a team of marketers, affiliate managers, content creatives, and LIVE operators
              working together around each brand’s goals.
            </p>
            <ul className={`${styles.roles} ${styles.reveal}`} style={{ transitionDelay: "0.3s" }}>
              {ROLES.map((r, i) => (
                <li key={r.name} style={{ ["--c" as string]: r.color, transitionDelay: `${0.5 + i * 0.1}s` }}>
                  <i /> {r.name}
                </li>
              ))}
            </ul>
            <p className={styles.reveal} style={{ transitionDelay: "0.4s" }}>
              Our work connects creative ideas with everyday execution. We plan, launch, review, and
              adjust, staying involved in the details that matter to the brands we manage.
            </p>
            <p className={styles.reveal} style={{ transitionDelay: "0.5s" }}>
              For us, being a partner means knowing your products, understanding your priorities,
              and being clear about what comes next.
            </p>
          </div>

          {/* Plan → Launch → Review → Adjust */}
          <div className={`${styles.loop} ${styles.reveal}`} style={{ transitionDelay: "0.6s" }} aria-label="Plan, launch, review, adjust">
            {LOOP.map((l, i) => (
              <span key={l} className={`${styles.loopStep} ${i === step ? styles.loopOn : ""} ${i < step ? styles.loopDone : ""}`}>
                <b>0{i + 1}</b>
                {l}
              </span>
            ))}
            <span className={styles.loopBack} aria-hidden>↻</span>
          </div>
        </div>

        {/* Behind-the-scenes mosaic */}
        <div className={styles.mosaic}>
          {BTS_PHOTOS.map((p, i) => (
            <div key={p.label} className={`${styles.mosaicItem} ${styles[`m${i}` as "m0"]} ${styles.reveal}`} style={{ transitionDelay: `${0.2 + i * 0.15}s` }}>
              <PhotoSlot src={p.src} label={p.label} />
            </div>
          ))}
          <span className={styles.mosaicTag} aria-hidden>
            <span className={styles.recDot} /> Behind the scenes
          </span>
        </div>
      </div>
    </section>
  );
}

/* ---------- Section 3: Our purpose ---------- */

const PURPOSE_LINE = "Our purpose is to help Filipino brands build stronger businesses on TikTok Shop.";

function PurposeSection() {
  const [ref, inView] = useInView<HTMLElement>(0.2);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [p, setP] = useState(0);

  // Words light up as you scroll past.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(1);
      return;
    }
    const onScroll = () => {
      const el = textRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      setP(Math.max(0, Math.min(1, (vh * 0.85 - r.top) / (vh * 0.55))));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const words = PURPOSE_LINE.split(" ");

  return (
    <section ref={ref} className={`${styles.purpose} ${inView ? styles.inView : ""}`}>
      <div className={styles.purposeGrid} aria-hidden />
      <div className={styles.purposeGlow} aria-hidden />
      <span className={styles.chapter} aria-hidden>
        <em>Chapter</em> 02
      </span>

      <div className="relative mx-auto max-w-5xl px-5 py-24 text-center sm:px-6 md:px-10 md:py-36">
        <p className={`${styles.eyebrow} ${styles.reveal} mx-auto`}>
          <span className={styles.liveDot} /> Our purpose
        </p>
        <h2 className={`mx-auto max-w-4xl font-display text-[clamp(2.2rem,5.6vw,4.6rem)] font-black uppercase leading-[0.92] tracking-tight ${styles.reveal}`} style={{ transitionDelay: "0.1s" }}>
          Helping Filipino brands build their <span className={styles.shimmer}>next chapter.</span>
        </h2>

        <p ref={textRef} className={styles.purposeLine}>
          {words.map((w, i) => {
            const on = p * words.length > i;
            const hot = /Filipino|brands|stronger|TikTok|Shop/.test(w);
            return (
              <span key={i} className={`${on ? styles.wordOn : ""} ${hot && on ? styles.wordHot : ""}`}>
                {w}{" "}
              </span>
            );
          })}
        </p>

        <p className={`mx-auto mt-8 max-w-2xl text-base leading-relaxed text-cream/65 sm:text-lg ${styles.reveal}`} style={{ transitionDelay: "0.3s" }}>
          We believe brands deserve a team that takes the time to understand what they’re building,
          brings direction to the work, and stays accountable as the business grows.
        </p>

        <div className={`${styles.beliefs} ${styles.reveal}`} style={{ transitionDelay: "0.45s" }}>
          {["Understand", "Direct", "Stay accountable"].map((b, i) => (
            <span key={b} style={{ ["--c" as string]: ["#35D6C4", "#F5B94F", "#F04B9A"][i] }}>
              <i />
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Section 4: What we value ---------- */

const VALUES = [
  { title: "Ownership", body: "We take responsibility for our work, follow through on commitments, and keep the next steps clear.", color: "#F04B9A" },
  { title: "Clarity", body: "We explain what we’re doing, what we’re seeing, and what needs attention in language you can understand.", color: "#35D6C4" },
  { title: "Collaboration", body: "We work closely with brand owners and with each other. Your product knowledge and our execution belong in the same conversation.", color: "#F5B94F" },
  { title: "Curiosity", body: "We keep learning, testing ideas, and using what we learn to improve the next round of work.", color: "#FF66B2" },
];

function ValueScene({ i }: { i: number }) {
  if (i === 0) {
    // Ownership: a checklist that ticks itself off
    return (
      <div className={styles.sCheck}>
        {["Commit", "Deliver", "Next step"].map((t, k) => (
          <span key={t} style={{ animationDelay: `${k * 0.6}s` }}>
            <i />
            {t}
          </span>
        ))}
      </div>
    );
  }
  if (i === 1) {
    // Clarity: a report being scanned
    return (
      <div className={styles.sReport}>
        <div className={styles.sDoc}>
          {[90, 70, 82, 55].map((w, k) => (
            <span key={k} style={{ width: `${w}%` }} />
          ))}
          <span className={styles.sScan} />
        </div>
        <span className={styles.sLens} />
      </div>
    );
  }
  if (i === 2) {
    // Collaboration: you + NiuNorm
    return (
      <div className={styles.vPartner}>
        <span className={`${styles.vNode} ${styles.vNodeA}`}>You</span>
        <span className={styles.vLink}>
          <i />
        </span>
        <span className={`${styles.vNode} ${styles.vNodeB}`}>
          <img src={logo} alt="" className={styles.vLogo} />
          <span className={styles.vOrbit} />
        </span>
      </div>
    );
  }
  // Curiosity: an A/B test picking a winner
  return (
    <div className={styles.sTest}>
      <span className={styles.sA}>A</span>
      <span className={styles.sB}>B</span>
      <span className={styles.sSpark} />
    </div>
  );
}

function ValuesSection() {
  const [ref, inView] = useInView<HTMLElement>(0.2);
  const spot = useSpotlight();

  return (
    <section ref={ref} className={`${styles.values} ${inView ? styles.inView : ""}`}>
      <div className={styles.valuesGrid} aria-hidden />
      <div className={styles.valuesGlow} aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 md:py-32">
        <p className={`${styles.eyebrow} ${styles.reveal}`}>
          <span className={styles.liveDot} /> What we value
        </p>
        <h2 className={`max-w-3xl font-display text-[clamp(2rem,5vw,4rem)] font-black uppercase leading-[0.92] tracking-tight ${styles.reveal}`} style={{ transitionDelay: "0.1s" }}>
          What you can <span className={styles.never}>expect</span> from us.
        </h2>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <div key={v.title} className={styles.reveal} style={{ transitionDelay: `${0.2 + i * 0.12}s` }}>
              <article className={styles.valueCard} style={{ ["--c" as string]: v.color }} {...spot}>
                <span className={styles.valueBorder} aria-hidden />
                <span className={styles.valueSpot} aria-hidden />
                <div className={styles.valueVisual} aria-hidden>
                  <ValueScene i={i} />
                </div>
                <div className={styles.valueBody}>
                  <span className={styles.valueNum}>0{i + 1}</span>
                  <h3 className="font-display text-2xl font-black uppercase leading-tight">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/70">{v.body}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Section 5: Expertise, recognition & industry ---------- */

const ECOSYSTEM = [
  {
    title: "TikTok Shop expertise",
    body: "Hands-on experience managing Philippine TikTok Shops, with knowledge across advertising, affiliate marketing, and shop growth planning.",
    points: ["TikTok Ads and commerce strategy", "Affiliate ecosystem experience", "Shop growth planning and execution"],
    color: "#F04B9A",
    icon: "M3 17l6-6 4 4 8-8M15 7h6v6",
  },
  {
    title: "Industry involvement",
    body: "Taking part in conversations and collaborations around TikTok Shop and the businesses growing within it.",
    points: ["TikTok events and speaking engagements", "Industry collaborations", "Platform insights and knowledge sharing"],
    color: "#35D6C4",
    icon: "M12 3a3 3 0 00-3 3v6a3 3 0 006 0V6a3 3 0 00-3-3zM5 11a7 7 0 0014 0M12 18v3",
  },
  {
    title: "Brand visibility",
    body: "Helping brands explore opportunities to strengthen their presence within the TikTok Shop ecosystem.",
    points: ["PR features", "TikTok matchmaking opportunities", "Partner spotlights"],
    color: "#F5B94F",
    icon: "M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z",
  },
];

function EcosystemSection() {
  const [ref, inView] = useInView<HTMLElement>(0.15);
  const spot = useSpotlight();

  return (
    <section ref={ref} className={`${styles.eco} ${inView ? styles.inView : ""}`}>
      <div className={styles.ecoGlow} aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 md:py-32">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <p className={`${styles.eyebrow} ${styles.eyebrowAmber} ${styles.reveal}`}>
              <span className={styles.liveDot} /> Expertise & recognition
            </p>
            <h2 className={`font-display text-[clamp(2rem,5vw,4rem)] font-black uppercase leading-[0.92] tracking-tight ${styles.reveal}`} style={{ transitionDelay: "0.1s" }}>
              Part of the <span className={styles.shimmer}>TikTok Shop</span> ecosystem.
            </h2>
          </div>
          <p className={`max-w-md text-base leading-relaxed text-cream/65 sm:text-lg ${styles.reveal}`} style={{ transitionDelay: "0.2s" }}>
            Our experience extends from everyday shop operations to industry conversations,
            collaborations, and opportunities for brands to be seen.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {ECOSYSTEM.map((c, i) => (
            <div key={c.title} className={styles.reveal} style={{ transitionDelay: `${0.2 + i * 0.15}s` }}>
              <article className={styles.ecoCard} style={{ ["--c" as string]: c.color }} {...spot}>
                <span className={styles.valueBorder} aria-hidden />
                <span className={styles.valueSpot} aria-hidden />
                <div className={styles.ecoHead}>
                  <span className={styles.ecoIcon} aria-hidden>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={c.icon} />
                    </svg>
                  </span>
                  <span className={styles.ecoIdx}>0{i + 1}</span>
                </div>
                <h3 className="mt-6 font-display text-xl font-black uppercase leading-tight">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/65 sm:text-base">{c.body}</p>
                <ul className={styles.ecoList}>
                  {c.points.map((pt, k) => (
                    <li key={pt} style={{ transitionDelay: `${0.6 + i * 0.15 + k * 0.1}s` }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          ))}
        </div>

        {/* Event photos */}
        <div className={styles.eventStrip}>
          {EVENT_PHOTOS.map((p, i) => (
            <div key={p.label} className={`${styles.eventItem} ${i === 0 ? styles.eventBig : ""} ${styles.reveal}`} style={{ transitionDelay: `${0.3 + i * 0.12}s` }}>
              <PhotoSlot src={p.src} label={p.label} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Section 6: In the spotlight ---------- */

function SpotlightSection() {
  const [ref, inView] = useInView<HTMLElement>(0.15);
  const spot = useSpotlight();

  return (
    <section ref={ref} className={`${styles.spot} ${inView ? styles.inView : ""}`}>
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 md:py-32">
        <p className={`${styles.inkEyebrow} ${styles.reveal}`}>
          <span /> In the spotlight
        </p>
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <h2 className={`font-display text-[clamp(2rem,5vw,4rem)] font-black uppercase leading-[0.92] tracking-tight ${styles.reveal}`} style={{ transitionDelay: "0.1s" }}>
            NiuNorm, <span className="text-pink">beyond the shop.</span>
          </h2>
          <p className={`max-w-sm text-base leading-relaxed text-ink/65 ${styles.reveal}`} style={{ transitionDelay: "0.2s" }}>
            Explore NiuNorm’s media features and industry appearances.
          </p>
        </div>

        {/* Featured press card */}
        <article className={`${styles.feature} ${styles.reveal}`} style={{ transitionDelay: "0.25s" }} {...spot}>
          <div className={styles.featureLeft}>
            <span className={styles.featureBadge}>
              <i /> Featured on
            </span>
            <p className={styles.featureOutlet}>{FEATURE.outlet}</p>
            <h3 className={`${styles.featureHeadline} ${FEATURE.headline ? "" : styles.isPh}`}>
              {FEATURE.headline || "Article headline goes here"}
            </h3>
            <p className={`${styles.featureDate} ${FEATURE.date ? "" : styles.isPh}`}>{FEATURE.date || "Publication date"}</p>
            <a
              href={FEATURE.url || undefined}
              target="_blank"
              rel="noreferrer"
              className={`${btnPink} ${styles.btnShine} mt-8 ${FEATURE.url ? "" : styles.btnOff}`}
              aria-disabled={!FEATURE.url}
            >
              Read the Feature
              <span className="transition-transform group-hover:translate-x-1">↗</span>
            </a>
          </div>
          <div className={styles.featureArt} aria-hidden>
            <span className={styles.featureMast}>{FEATURE.outlet}</span>
            <div className={styles.featurePaper}>
              <span className={styles.fpTitle} />
              <span className={styles.fpTitle} style={{ width: "70%" }} />
              <span className={styles.fpImg} />
              {[100, 92, 96, 60].map((w, k) => (
                <span key={k} className={styles.fpLine} style={{ width: `${w}%` }} />
              ))}
            </div>
          </div>
        </article>

        {/* More appearances */}
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {APPEARANCES.map((a, i) => (
            <div key={i} className={styles.reveal} style={{ transitionDelay: `${0.35 + i * 0.12}s` }}>
              <article className={styles.appear}>
                <PhotoSlot src={a.src} label={a.tag} className={styles.appearPhoto} />
                <div className="p-5">
                  <p className={`${styles.appearTitle} ${a.title ? "" : styles.isPh}`}>{a.title || "Event or collaboration title"}</p>
                  <p className={`${styles.appearDate} ${a.date ? "" : styles.isPh}`}>{a.date || "Date"}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Section 7: The team ---------- */

function TeamSection() {
  const [ref, inView] = useInView<HTMLElement>(0.15);
  const spot = useSpotlight();
  const colors = ["#F04B9A", "#35D6C4", "#F5B94F", "#FF66B2"];

  return (
    <section id="team" ref={ref} className={`${styles.team} ${inView ? styles.inView : ""}`}>
      <div className={styles.valuesGrid} aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 md:py-32">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <p className={`${styles.eyebrow} ${styles.reveal}`}>
              <span className={styles.liveDot} /> The team
            </p>
            <h2 className={`font-display text-[clamp(2rem,5vw,4rem)] font-black uppercase leading-[0.92] tracking-tight ${styles.reveal}`} style={{ transitionDelay: "0.1s" }}>
              Meet the people you’ll <span className={styles.shimmer}>build with.</span>
            </h2>
          </div>
          <div className="space-y-3 text-base leading-relaxed text-cream/65 sm:text-lg">
            <p className={styles.reveal} style={{ transitionDelay: "0.2s" }}>
              Behind the campaigns, content, and LIVE sessions are the people who bring the work
              together.
            </p>
            <p className={styles.reveal} style={{ transitionDelay: "0.3s" }}>
              Get to know the NiuNorm team and the roles we play in supporting our partner brands.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((t, i) => (
            <div key={i} className={styles.reveal} style={{ transitionDelay: `${0.25 + i * 0.12}s` }}>
              <article className={styles.member} style={{ ["--c" as string]: colors[i % colors.length] }} {...spot}>
                <span className={styles.valueBorder} aria-hidden />
                <div className={styles.memberPhoto}>
                  {t.src ? (
                    <div className={styles.slotImg} style={{ backgroundImage: `url(${t.src})` }} role="img" aria-label={t.name} />
                  ) : (
                    <div className={styles.memberPh} aria-hidden>
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8z" />
                      </svg>
                    </div>
                  )}
                  <div className={styles.memberMore}>
                    <p className={t.desc ? "" : styles.isPh}>{t.desc || "A short description of what this person handles for partner brands."}</p>
                  </div>
                </div>
                <div className={styles.memberInfo}>
                  <h3 className={`${styles.memberName} ${t.name ? "" : styles.isPh}`}>{t.name || "Team member"}</h3>
                  <p className={`${styles.memberRole} ${t.role ? "" : styles.isPh}`}>{t.role || "Role"}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STAR = "M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z";

function NumberVisual({ kind }: { kind: string }) {
  if (kind === "gmv") {
    return (
      <svg className={styles.nSpark} viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="nArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#F04B9A" stopOpacity="0.35" />
            <stop offset="1" stopColor="#F04B9A" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className={styles.nArea} d="M0 55 C30 52 45 44 70 40 S110 30 130 22 S170 10 200 4 L200 60 L0 60Z" fill="url(#nArea)" />
        <path className={styles.nLine} pathLength={1} d="M0 55 C30 52 45 44 70 40 S110 30 130 22 S170 10 200 4" />
        <circle className={styles.nTip} cx="200" cy="4" r="4" />
      </svg>
    );
  }
  if (kind === "brands") {
    return (
      <div className={styles.nDots} aria-hidden>
        {Array.from({ length: 30 }, (_, k) => (
          <span key={k} style={{ transitionDelay: `${0.6 + k * 0.04}s` }} />
        ))}
      </div>
    );
  }
  return (
    <div className={styles.nStars} aria-hidden>
      {[0, 1, 2, 3, 4].map((k) => (
        <svg key={k} width="26" height="26" viewBox="0 0 24 24" style={{ transitionDelay: `${0.7 + k * 0.25}s` }}>
          <path d={STAR} />
        </svg>
      ))}
    </div>
  );
}

function NumbersSection() {
  const [ref, inView] = useInView<HTMLElement>(0.3);
  const spot = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--y", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <section ref={ref} className={`${styles.numbers} ${inView ? styles.inView : ""}`}>
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 md:py-24">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className={`${styles.eyebrow} ${styles.reveal}`}>
              <span className={styles.liveDot} /> Our track record
            </p>
            <h2 className={`max-w-3xl font-display text-[clamp(2rem,5vw,3.75rem)] font-black uppercase leading-[0.92] tracking-tight ${styles.reveal}`} style={{ transitionDelay: "0.1s" }}>
              Experience you can put <span className={styles.shimmer}>numbers</span> to.
            </h2>
          </div>
          <div className={styles.reveal} style={{ transitionDelay: "0.2s" }}>
            <Link to="/results" className="group inline-flex items-center justify-center gap-2 rounded-full border border-cream/25 px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-cream transition-colors hover:border-cream hover:bg-cream hover:text-ink">
              Explore Our Results
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {NUMBERS.map((n, i) => (
            <div key={n.label} className={styles.reveal} style={{ transitionDelay: `${0.1 + i * 0.15}s` }}>
              <article className={styles.numberCard} style={{ ["--c" as string]: n.color }} onPointerMove={spot}>
                <span className={styles.valueBorder} aria-hidden />
                <span className={styles.valueSpot} aria-hidden />
                <div className={styles.numberTop}>
                  <span>{n.label}</span>
                  <span className={styles.numberIdx}>0{i + 1}</span>
                </div>
                <strong>{inView ? <CountUp value={n.value} delay={300 + i * 200} /> : `0${n.value.replace(/^\d+/, "")}`}</strong>
                <p className={styles.numberCaption}>{n.caption}</p>
                <div className={styles.numberVisual}>
                  <NumberVisual kind={n.key} />
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutCta() {
  const [ref, inView] = useInView<HTMLElement>(0.3);
  const btnRef = useRef<HTMLSpanElement>(null);
  const lean = (e: React.PointerEvent<HTMLSpanElement>) => {
    const el = btnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.18}px, ${(e.clientY - (r.top + r.height / 2)) * 0.3}px)`;
  };
  const unlean = () => {
    if (btnRef.current) btnRef.current.style.transform = "";
  };

  return (
    <section ref={ref} className={`${styles.cta} ${inView ? styles.inView : ""}`}>
      <div className={styles.ctaRings} aria-hidden>
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className={styles.ctaSparks} aria-hidden>
        {Array.from({ length: 18 }, (_, i) => (
          <span
            key={i}
            style={{
              left: `${(i * 47 + 13) % 100}%`,
              animationDelay: `${-((i * 1.1) % 9)}s`,
              animationDuration: `${6 + (i % 6)}s`,
              background: ["#F04B9A", "#F5B94F", "#35D6C4"][i % 3],
              color: ["#F04B9A", "#F5B94F", "#35D6C4"][i % 3],
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl px-5 py-28 text-center sm:px-6 md:px-10 md:py-36">
        <div className={`${styles.ctaLogo} ${styles.reveal}`}>
          <img src={logo} alt="" />
        </div>
        <h2 className="mt-10 font-display text-[clamp(2.4rem,7vw,5.25rem)] font-black uppercase leading-[0.92] tracking-tight">
          <span className={styles.lineMask}>
            <span className={`${styles.ctaLine} ${inView ? styles.ctaLineIn : ""}`}>Let’s get to know</span>
          </span>
          <span className={styles.lineMask}>
            <span className={`${styles.ctaLine} ${inView ? styles.ctaLineIn : ""}`} style={{ transitionDelay: "0.15s" }}>
              <span className={styles.shimmer}>your brand.</span>
            </span>
          </span>
        </h2>
        <p className={`mx-auto mt-7 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg ${styles.reveal}`} style={{ transitionDelay: "0.35s" }}>
          Now that you know us, we’d like to hear about you.
        </p>
        <p className={`mx-auto mt-3 max-w-xl text-base leading-relaxed text-cream/60 sm:text-lg ${styles.reveal}`} style={{ transitionDelay: "0.45s" }}>
          Tell us what you’re building, where your TikTok Shop stands today, and where you want to
          take it next.
        </p>
        <span
          ref={btnRef}
          className={`${styles.ctaBtn} ${styles.reveal} mt-10`}
          style={{ transitionDelay: "0.5s" }}
          onPointerMove={lean}
          onPointerLeave={unlean}
        >
          <Link to="/apply" className={`${btnPink} ${styles.btnShine}`}>
            Apply to Work With NiuNorm
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </span>
      </div>
    </section>
  );
}

const MARQUEE_ITEMS = [
  "Marketers",
  "Affiliate managers",
  "Content creatives",
  "LIVE operators",
  "Beauty · Fashion · Wellness · Pet essentials",
  "TikTok Shop Partner",
];

export default function About() {
  return (
    <main className="bg-ink text-cream">
      <AboutHero />
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
      <WhoSection />
      <PurposeSection />
      <ValuesSection />
      <EcosystemSection />
      <SpotlightSection />
      <TeamSection />
      <NumbersSection />
      <AboutCta />
    </main>
  );
}
