import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import styles from "./about.module.css";
import teamPhoto from "../../imports/resultsBg";
import logo from "../../imports/NiunormLogo.png";
import aboutHeroBg from "../../imports/aboutHeroPhoto.jpg";
import teamMeetingPhoto from "../../imports/aboutTeamMeeting.jpg";
import teamCollaborationPhoto from "../../imports/aboutTeamCollaboration.jpg";
import teamDiscussionPhoto from "../../imports/aboutTeamDiscussion.jpg";
import tiktokEventPhoto from "../../imports/aboutTikTokEvent.jpg";
import industryCollaborationPhoto from "../../imports/aboutIndustryCollaboration.jpg";
import gmaFeaturePhoto from "../../imports/aboutGmaFeature.jpg";
import tiktokNewsroomPhoto from "../../imports/aboutTikTokNewsroom.png";
import helloMnlPhoto from "../../imports/aboutHelloMnl.png";
import maverickPhoto from "../../imports/aboutMaverick.jpg";
import isabellatrexPhoto from "../../imports/aboutIsabellatrex.jpg";
import joannaPhoto from "../../imports/aboutJoanna.jpg";
import cyllenePhoto from "../../imports/aboutCyllene.jpg";
import aliyannPhoto from "../../imports/aboutAliyann.jpg";
import mheaPhoto from "../../imports/aboutMhea.jpg";

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

// Deterministic bokeh specks floating over the hero photo.
const BOKEH = Array.from({ length: 14 }, (_, i) => ({
  x: (i * 37 + 11) % 100,
  s: 4 + ((i * 7) % 9),
  d: 9 + ((i * 5) % 8),
  o: (i * 1.3) % 9,
  c: ["#F04B9A", "#F5B94F", "#35D6C4", "#F4EFE6"][i % 4],
}));

function AboutHero() {
  const heroRef = useRef<HTMLElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", `${e.clientX - r.left}px`);
      hero.style.setProperty("--my", `${e.clientY - r.top}px`);
      hero.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      hero.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    };
    const leave = () => {
      hero.style.setProperty("--px", "0");
      hero.style.setProperty("--py", "0");
    };
    // Camera-style running timecode for the viewfinder.
    const start = performance.now();
    const pad = (n: number) => String(Math.floor(n)).padStart(2, "0");
    const tick = window.setInterval(() => {
      const t = (performance.now() - start) / 1000;
      if (timeRef.current) timeRef.current.textContent = `${pad(t / 3600)}:${pad((t / 60) % 60)}:${pad(t % 60)}:${pad((t * 30) % 30)}`;
    }, 50);
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", leave);
    return () => {
      window.clearInterval(tick);
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <section ref={heroRef} className={styles.hero}>
      <div className={styles.heroMedia}>
        <div className={styles.heroParallax}>
          <img src={aboutHeroBg} alt="The NiuNorm team" className={styles.heroImg} draggable={false} />
        </div>
        <span className={styles.heroDuotone} aria-hidden />
        <span className={styles.heroLeak} aria-hidden />
        <span className={styles.heroLeak2} aria-hidden />
        <span className={styles.heroSweep} aria-hidden />
        <span className={styles.heroScan} aria-hidden />
      </div>
      <div className={styles.heroShade} aria-hidden />
      <div className={styles.heroLight} aria-hidden />
      <div className={styles.heroGrid} aria-hidden />
      <div className={styles.spotlight} aria-hidden />
      <div className={styles.bokeh} aria-hidden>
        {BOKEH.map((b, i) => (
          <i
            key={i}
            style={{ left: `${b.x}%`, width: b.s, height: b.s, background: b.c, color: b.c, animationDuration: `${b.d}s`, animationDelay: `${-b.o}s` }}
          />
        ))}
      </div>
      <div className={styles.grain} aria-hidden />

      {/* Camera viewfinder framing the team */}
      <div className={styles.viewfinder} aria-hidden>
        <i />
        <i />
        <i />
        <i />
        <span className={styles.vfRec}>
          <b /> Rec
        </span>
        <span ref={timeRef} className={styles.vfTime}>
          00:00:00:00
        </span>
        <span className={styles.vfFocus} />
        <span className={styles.vfTag}>
          <span className={styles.liveDot} /> The NiuNorm team · Philippines
        </span>
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-20 pt-[44svh] sm:px-6 md:justify-center md:px-10 md:pb-28 md:pt-36">
        <div className={`${styles.heroCopy} max-w-[40rem]`}>
          <p className={`${styles.eyebrow} ${styles.rise}`}>
            <span className={styles.liveDot} /> Meet NiuNorm
          </p>
          <h1 className="font-display text-[clamp(2.2rem,4.6vw,4.2rem)] font-black uppercase leading-[0.95] tracking-tight">
            <span className={styles.lineMask}>
              <span className={styles.lineIn} style={{ animationDelay: "0.5s" }}>The people behind</span>
            </span>
            <span className={styles.lineMask}>
              <span className={styles.lineIn} style={{ animationDelay: "0.65s" }}>your shop’s</span>
            </span>
            <span className={styles.lineMask}>
              <span className={styles.lineIn} style={{ animationDelay: "0.8s" }}>
                <span className={styles.swoosh}>
                  <span className={`${styles.shimmer} ${styles.glowText}`}>next chapter.</span>
                  <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden>
                    <path pathLength={1} d="M4 18 C 70 6, 150 4, 296 12" />
                  </svg>
                </span>
              </span>
            </span>
          </h1>
          <p className={`${styles.rise} mt-8 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg`} style={{ animationDelay: "1s" }}>
            NiuNorm is a TikTok Shop partner agency working with Filipino brands across beauty,
            fashion, wellness, pet essentials, and more.
          </p>
          <p className={`${styles.rise} mt-4 max-w-xl text-base leading-relaxed text-cream/65 sm:text-lg`} style={{ animationDelay: "1.1s" }}>
            We bring together people who understand the daily work behind a growing shop, from the
            content shoppers discover to the conversations that help them check out.
          </p>
          <div className={`${styles.rise} mt-10 flex flex-wrap gap-3`} style={{ animationDelay: "1.25s" }}>
            <a href="#team" className={`${btnPink} ${styles.btnShine}`}>
              Meet the Team
              <span className="transition-transform group-hover:translate-y-0.5">↓</span>
            </a>
          </div>

          <ul className={`${styles.rise} ${styles.catRow}`} style={{ animationDelay: "1.4s" }}>
            {["Beauty", "Fashion", "Wellness", "Pet essentials", "And more"].map((c, i) => (
              <li key={c} style={{ ["--c" as string]: ["#F04B9A", "#F5B94F", "#35D6C4", "#FF66B2", "#9A8FA8"][i] }}>
                {c}
              </li>
            ))}
          </ul>
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
const BTS_PHOTOS: { label: string; src?: string; pos?: string }[] = [
  { label: "Team planning session", src: teamMeetingPhoto, pos: "50% 72%" },
  { label: "Working together on a brand", src: teamCollaborationPhoto, pos: "50% 48%" },
  { label: "Speaking at a TikTok Shop event", src: teamDiscussionPhoto, pos: "50% 48%" },
];

// Event / speaking photos (Section 5).
const EVENT_PHOTOS: { label: string; src?: string; pos?: string }[] = [
  { label: "Speaking engagement", src: teamPhoto },
  { label: "TikTok event", src: tiktokEventPhoto, pos: "50% 50%" },
  { label: "Industry collaboration", src: industryCollaborationPhoto, pos: "50% 50%" },
];

// Featured media (Section 6).
const FEATURE = {
  outlet: "GMA News Online",
  headline: "Thinking of starting a business? Here’s how to grow it on social media",
  date: "May 19, 2026",
  blurb: "NiuNorm+ founder and CEO Velasco shares how entrepreneurs can grow a business with simple, consistent social media content. No expensive equipment needed.",
  url: "https://www.gmanetwork.com/news/money/companies/988168/thinking-of-starting-a-business-here-s-how-to-grow-it-on-social-media/story/",
  img: gmaFeaturePhoto,
};

// More press coverage (Section 6).
const ARTICLES = [
  {
    outlet: "TikTok Newsroom",
    title: "TikTok Shop Brings Unlad Lokal to Pasig City to Strengthen MSME Digitalization and Creator-Led Discovery Commerce",
    date: "May 21, 2026",
    blurb: "NiuNorm supported Unlad Lokal in Pasig, representing brand partners Girl Code, Labsky, Glow Glass Beauty, JSkin, Twelve Twenty, and Kirste.",
    url: "https://newsroom.tiktok.com/tiktok-shop-brings-unlad-lokal-to-pasig-city-to-strengthen-msme-digitalization-and-creator-led-discovery-commerce?lang=en-PH",
    img: tiktokNewsroomPhoto,
    pos: "50% 30%",
    c: "#35D6C4",
  },
  {
    outlet: "adobo Magazine",
    title: "TikTok Shop brings Unlad Lokal to Pasig, spotlighting digital literacy in the age of discovery commerce",
    date: "May 28, 2026",
    blurb: "How platform literacy, creator ecosystems, and local partnerships are shaping MSME growth, with brand partners represented by NiuNorm.",
    url: "https://www.adobomagazine.com/featured/tiktok-shop-brings-unlad-lokal-to-pasig-spotlighting-digital-literacy-in-the-age-of-discovery-commerce/",
    img: tiktokEventPhoto,
    pos: "50% 50%",
    c: "#F5B94F",
  },
  {
    outlet: "Hello Mnl",
    title: "TikTok Shop Brings Unlad Lokal to Pasig City to Strengthen MSME Digitalization",
    date: "May 31, 2026",
    blurb: "Digital training, creators, and LGU partnerships for Pasig MSMEs, supported by J&T Express Philippines and NiuNorm.",
    url: "https://hellomnl.com/tiktok-shop-brings-unlad-lokal-to-pasig-city-to-strengthen-msme-digitalization/",
    img: helloMnlPhoto,
    pos: "50% 50%",
    c: "#F04B9A",
  },
];

// Team (Section 7).
type Member = { name: string; role: string; dept: string; src: string; c: string; pos?: string };
const FOUNDERS: Member[] = [
  { name: "Maverick Velasco", role: "Founder of NiuNorm", dept: "Leadership", src: maverickPhoto, c: "#F5B94F", pos: "50% 22%" },
  { name: "Isabellatrex Velasco", role: "Founder of NiuNorm", dept: "Leadership", src: isabellatrexPhoto, c: "#F5B94F", pos: "50% 22%" },
];
const TEAM: Member[] = [
  { name: "Joanna Sophia Nombre", role: "Senior Ads and Marketing", dept: "Ads & Marketing", src: joannaPhoto, c: "#F04B9A", pos: "50% 18%" },
  { name: "Cyllene Panganiban", role: "Senior TikTok & Affiliate Manager", dept: "TikTok & Affiliate", src: cyllenePhoto, c: "#35D6C4", pos: "50% 18%" },
  { name: "Aliyann Velasco", role: "Junior Ads and Marketing", dept: "Ads & Marketing", src: aliyannPhoto, c: "#FF66B2", pos: "50% 18%" },
  { name: "Mhea Ann Pauline Arsino", role: "Junior TikTok & Affiliate Manager", dept: "TikTok & Affiliate", src: mheaPhoto, c: "#35D6C4", pos: "50% 18%" },
];

/* ---------- Shared bits ---------- */

/** A photo frame. Shows the image when `src` is set, otherwise a styled placeholder. */
function PhotoSlot({ src, label, className = "", pos, hideLabel = false }: { src?: string; label: string; className?: string; pos?: string; hideLabel?: boolean }) {
  return (
    <div className={`${styles.slot} ${src ? "" : styles.slotEmpty} ${className}`}>
      {src ? (
        <div className={styles.slotImg} style={{ backgroundImage: `url(${src})`, backgroundPosition: pos }} role="img" aria-label={label} />
      ) : (
        <div className={styles.slotPh} aria-hidden>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8a2 2 0 012-2h2l1.5-2h7L17 6h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
            <circle cx="12" cy="13" r="3.5" />
          </svg>
          <span>Add photo</span>
        </div>
      )}
      {!hideLabel && <span className={styles.slotLabel}>{label}</span>}
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
              <PhotoSlot src={p.src} label={p.label} pos={p.pos} hideLabel />
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
const PURPOSE_HEAD = "Helping Filipino brands build their".split(" ");

const PILLARS = [
  {
    k: "Understand",
    c: "#35D6C4",
    d: "We take the time to learn what you’re building: your products, your shoppers, and your priorities.",
    icon: "M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12zM12 15a3 3 0 100-6 3 3 0 000 6z",
  },
  {
    k: "Direct",
    c: "#F5B94F",
    d: "We bring clear direction to the work, so every content plan, LIVE and campaign has a reason behind it.",
    icon: "M12 22a10 10 0 100-20 10 10 0 000 20zM16.2 7.8l-2.1 6.3-6.3 2.1 2.1-6.3 6.3-2.1z",
  },
  {
    k: "Stay accountable",
    c: "#F04B9A",
    d: "We stay close to the details and own the next step, every week, as your business grows.",
    icon: "M12 2l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5l8-3zM8.5 12l2.5 2.5 4.5-5",
  },
];

// Deterministic starfield.
const P_STARS = Array.from({ length: 34 }, (_, i) => ({
  x: (i * 53 + 7) % 100,
  y: (i * 29 + 13) % 78,
  s: 1 + (i % 3),
  d: 2.5 + ((i * 7) % 5),
  o: (i * 0.7) % 4,
}));

function PurposeSection() {
  const [ref, inView] = useInView<HTMLElement>(0.2);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [p, setP] = useState(0);
  const spot = useSpotlight();

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

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const words = PURPOSE_LINE.split(" ");

  return (
    <section ref={ref} onPointerMove={onMove} className={`${styles.purpose} ${inView ? styles.inView : ""}`}>
      <div className={styles.purposeGrid} aria-hidden />
      <div className={styles.pRays} aria-hidden />
      <div className={styles.pRings} aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <div className={styles.purposeGlow} aria-hidden />
      <div className={styles.pStars} aria-hidden>
        {P_STARS.map((s, i) => (
          <i key={i} style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDuration: `${s.d}s`, animationDelay: `${-s.o}s` }} />
        ))}
      </div>
      <div className={styles.pSpot} aria-hidden />
      <div className={styles.pHorizon} aria-hidden />
      <span className={styles.chapter} aria-hidden>
        <em>Chapter</em> 02
      </span>

      <div className="relative mx-auto max-w-6xl px-5 pb-40 pt-24 text-center sm:px-6 md:px-10 md:pb-52 md:pt-36">
        <p className={`${styles.eyebrow} ${styles.reveal} mx-auto`}>
          <span className={styles.liveDot} /> Our purpose
        </p>
        <h2 className={`${styles.pHead} mx-auto max-w-4xl font-display text-[clamp(2.2rem,5.6vw,4.6rem)] font-black uppercase leading-[0.92] tracking-tight`}>
          {PURPOSE_HEAD.map((w, i) => (
            <span key={i}>
              <span className={styles.hWord} style={{ ["--i" as string]: i }}>{w}</span>{" "}
            </span>
          ))}
          <span className={`${styles.hWord} ${styles.pChapter}`} style={{ ["--i" as string]: PURPOSE_HEAD.length }}>
            <span className={styles.shimmer}>next chapter.</span>
            <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden>
              <path pathLength={1} d="M4 16 C 80 4, 170 4, 296 14" />
            </svg>
          </span>
        </h2>

        <div className={styles.pQuoteWrap}>
          <span className={styles.pQuote} aria-hidden>“</span>
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
          <span className={styles.pProgress} style={{ ["--p" as string]: p }} aria-hidden />
        </div>

        <p className={`mx-auto mt-10 max-w-2xl text-base leading-relaxed text-cream/65 sm:text-lg ${styles.reveal}`} style={{ transitionDelay: "0.3s" }}>
          We believe brands deserve a team that takes the time to understand what they’re building,
          brings direction to the work, and stays accountable as the business grows.
        </p>

        <div className={styles.pillars}>
          <div className={styles.pTrack} aria-hidden>
            <span className={styles.pTrackLine} />
            <span className={styles.pComet} />
            {PILLARS.map((pl, i) => (
              <i key={pl.k} style={{ ["--c" as string]: pl.c, ["--i" as string]: i }} />
            ))}
          </div>
          {PILLARS.map((pl, i) => (
            <article key={pl.k} className={styles.pillar} style={{ ["--c" as string]: pl.c, ["--i" as string]: i }} {...spot}>
              <span className={styles.pillarIcon}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d={pl.icon} pathLength={1} />
                </svg>
              </span>
              <span className={styles.pillarNum}>0{i + 1}</span>
              <h3 className="mt-5 font-display text-xl font-black uppercase tracking-tight text-cream">{pl.k}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/65">{pl.d}</p>
            </article>
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
  const [ref, inView] = useInView<HTMLElement>(0.15);
  const spot = useSpotlight();
  const head = ["What", "you", "can"];

  return (
    <section ref={ref} className={`${styles.values} ${inView ? styles.inView : ""}`}>
      <div className={styles.valuesGrid} aria-hidden />
      <div className={styles.vAurora} aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <div className={styles.valuesGlow} aria-hidden />
      <div className={styles.vWatermark} aria-hidden>
        <div>
          {[0, 1].map((k) => (
            <span key={k}>
              {VALUES.map((v) => (
                <em key={v.title} style={{ ["--c" as string]: v.color }}>
                  {v.title}
                  <b>✦</b>
                </em>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 md:py-32">
        <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className={`${styles.eyebrow} ${styles.reveal}`}>
              <span className={styles.liveDot} /> What we value
            </p>
            <h2 className={`${styles.pHead} max-w-3xl font-display text-[clamp(2rem,5vw,4rem)] font-black uppercase leading-[0.92] tracking-tight`}>
              {head.map((w, i) => (
                <span key={w}>
                  <span className={styles.hWord} style={{ ["--i" as string]: i }}>{w}</span>{" "}
                </span>
              ))}
              <span className={styles.hWord} style={{ ["--i" as string]: 3 }}>
                <span className={styles.never}>expect</span>
              </span>{" "}
              <span className={styles.hWord} style={{ ["--i" as string]: 4 }}>from</span>{" "}
              <span className={styles.hWord} style={{ ["--i" as string]: 5 }}>us.</span>
            </h2>
          </div>
          <div className={`${styles.vIndex} ${styles.reveal}`} style={{ transitionDelay: "0.5s" }}>
            <span className={styles.vIndexRing} aria-hidden>
              <b>04</b>
            </span>
            <span className="flex flex-col">
              <span className="label text-cream/50">Values</span>
              <strong>One way of working</strong>
            </span>
          </div>
        </div>

        <div className={`${styles.vDeck} mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4`}>
          {VALUES.map((v, i) => (
            <div key={v.title} className={styles.vDeal} style={{ ["--i" as string]: i }}>
              <article className={styles.valueCard} style={{ ["--c" as string]: v.color }} {...spot}>
                <span className={styles.valueRing} aria-hidden />
                <span className={styles.valueBorder} aria-hidden />
                <span className={styles.valueSpot} aria-hidden />
                <span className={styles.valueSheen} aria-hidden />
                <span className={styles.valueWm} aria-hidden>0{i + 1}</span>
                <div className={styles.valueVisual} aria-hidden>
                  <ValueScene i={i} />
                </div>
                <div className={styles.valueBody}>
                  <span className={styles.valueNum}>0{i + 1}</span>
                  <h3 className={`${styles.valueTitle} font-display text-2xl font-black uppercase leading-tight`}>{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/70">{v.body}</p>
                </div>
                <span className={styles.valueBar} aria-hidden />
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
              <PhotoSlot src={p.src} label={p.label} pos={p.pos} />
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
            <h3 className={styles.featureHeadline}>{FEATURE.headline}</h3>
            <p className={styles.featureDate}>{FEATURE.date}</p>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-cream/70 sm:text-base">{FEATURE.blurb}</p>
            <a href={FEATURE.url} target="_blank" rel="noopener noreferrer" className={`${btnPink} ${styles.btnShine} mt-8`}>
              Read the Feature
              <span className="transition-transform group-hover:translate-x-1">↗</span>
            </a>
          </div>
          <a href={FEATURE.url} target="_blank" rel="noopener noreferrer" className={styles.featureArt} aria-label={`Read “${FEATURE.headline}” on ${FEATURE.outlet}`}>
            <span className={styles.featureMast} aria-hidden>GMA News</span>
            <div className={styles.featurePaper}>
              <span className={styles.fpBar} aria-hidden>
                <i />
                <i />
                <i />
                <b>gmanetwork.com</b>
              </span>
              <img src={FEATURE.img} alt="" className={styles.fpPhoto} draggable={false} />
              <span className={styles.fpTitle} aria-hidden />
              <span className={styles.fpTitle} style={{ width: "70%" }} aria-hidden />
              {[100, 92, 60].map((w, k) => (
                <span key={k} className={styles.fpLine} style={{ width: `${w}%` }} aria-hidden />
              ))}
            </div>
          </a>
        </article>

        {/* More press coverage */}
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {ARTICLES.map((a, i) => (
            <div key={a.url} className={styles.reveal} style={{ transitionDelay: `${0.35 + i * 0.12}s` }}>
              <a href={a.url} target="_blank" rel="noopener noreferrer" className={styles.appear} style={{ ["--c" as string]: a.c }}>
                <span className={styles.appearPhoto}>
                  <img src={a.img} alt="" style={{ objectPosition: a.pos }} draggable={false} />
                  <span className={styles.appearOutlet}>
                    <i /> {a.outlet}
                  </span>
                </span>
                <span className={styles.appearBody}>
                  <span className={styles.appearDate}>{a.date}</span>
                  <span className={`${styles.appearTitle} line-clamp-3`}>{a.title}</span>
                  <span className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/65">{a.blurb}</span>
                  <span className={styles.appearCta}>
                    Read article <span aria-hidden>↗</span>
                  </span>
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Section 7: The team ---------- */

/** A hanging "team pass" ID badge for one person. */
function TeamPass({ m, i, id, founder = false }: { m: Member; i: number; id: string; founder?: boolean }) {
  const spot = useSpotlight();
  return (
    <div className={`${styles.hang} ${founder ? styles.hangFounder : ""}`} style={{ ["--c" as string]: m.c, ["--i" as string]: i }}>
      <span className={styles.strap} aria-hidden />
      <span className={styles.clip} aria-hidden />
      <article className={styles.pass} {...spot}>
        <span className={styles.passFoil} aria-hidden />
        <span className={styles.passEdge} aria-hidden />
        <header className={styles.passTop}>
          <img src={logo} alt="" className={styles.passLogo} />
          <span className={styles.passBrand}>NiuNorm</span>
          <span className={styles.passType}>{founder ? "Founder pass" : "Team pass"}</span>
        </header>
        <div className={styles.passPhoto}>
          <img src={m.src} alt={m.name} style={{ objectPosition: m.pos }} draggable={false} loading="lazy" />
          <span className={styles.passScan} aria-hidden />
          <span className={styles.passDept}>
            <i /> {m.dept}
          </span>
          {founder && (
            <span className={styles.passStar} aria-hidden>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d={STAR} />
              </svg>
            </span>
          )}
        </div>
        <div className={styles.passBody}>
          <h3 className={styles.passName}>{m.name}</h3>
          <p className={styles.passRole}>{m.role}</p>
          <div className={styles.passFoot}>
            <span>ID · {id}</span>
            <span className={styles.passCode} aria-hidden>
              {Array.from({ length: 22 }, (_, k) => (
                <i key={k} style={{ width: (k * 7 + i * 3) % 3 === 0 ? 3 : 1.5 }} />
              ))}
            </span>
          </div>
        </div>
      </article>
    </div>
  );
}

function TeamSection() {
  const [ref, inView] = useInView<HTMLElement>(0.08);
  const head = ["Meet", "the", "people", "you’ll"];

  return (
    <section id="team" ref={ref} className={`${styles.team} ${inView ? styles.inView : ""}`}>
      <div className={styles.valuesGrid} aria-hidden />
      <div className={styles.teamGlow} aria-hidden />
      <div className={styles.teamBeams} aria-hidden>
        <i />
        <i />
        <i />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 md:px-10 md:py-32">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <p className={`${styles.eyebrow} ${styles.reveal}`}>
              <span className={styles.liveDot} /> The team
            </p>
            <h2 className={`${styles.pHead} font-display text-[clamp(2rem,5vw,4rem)] font-black uppercase leading-[0.92] tracking-tight`}>
              {head.map((w, i) => (
                <span key={w}>
                  <span className={styles.hWord} style={{ ["--i" as string]: i }}>{w}</span>{" "}
                </span>
              ))}
              <span className={styles.hWord} style={{ ["--i" as string]: 4 }}>
                <span className={styles.shimmer}>build with.</span>
              </span>
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

        {/* Founders */}
        <div className={`${styles.teamRowLabel} ${styles.reveal}`} style={{ transitionDelay: "0.3s" }}>
          <span>Founders</span>
        </div>
        <div className={styles.foundersRow}>
          {FOUNDERS.map((m, i) => (
            <TeamPass key={m.name} m={m} i={i} id={`NN-F0${i + 1}`} founder />
          ))}
        </div>

        {/* Team */}
        <div className={`${styles.teamRowLabel} ${styles.reveal}`} style={{ transitionDelay: "0.2s" }}>
          <span>The team</span>
        </div>
        <div className={styles.teamRow}>
          {TEAM.map((m, i) => (
            <TeamPass key={m.name} m={m} i={i + 2} id={`NN-0${i + 1}`} />
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
