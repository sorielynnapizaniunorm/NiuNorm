import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router";
import logo from "./imports/NiunormLogo.png";
import MobileDrawer, { NAV_LINKS, useActiveNav } from "./MobileMenu/MobileMenu";
import m from "./MobileMenu/MobileMenu.module.css";

function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const onApplyPage = pathname === "/apply";
  const isActive = useActiveNav();

  // Close drawer on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <Link to="/" className="flex items-center gap-3" aria-label="Niunorm home">
            <img
              src={logo}
              alt="Niunorm logo"
              className="h-10 w-10 rounded-full sm:h-11 sm:w-11"
            />
            <span className="hidden text-lg font-black lowercase tracking-tight sm:inline">
              niu<span className="bg-gradient-to-r from-pink to-teal bg-clip-text text-transparent">norm</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((n) => {
              const active = isActive(n.href);
              return (
                <Link
                  key={n.label}
                  to={n.href}
                  aria-current={active ? "page" : undefined}
                  className={`label relative py-2 transition-colors hover:text-cream ${active ? "text-cream" : "text-cream/60"}`}
                >
                  {n.label}
                  <span
                    aria-hidden
                    className={`absolute -bottom-1 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-pink shadow-[0_0_10px_var(--color-pink)] transition-all duration-300 ${active ? "w-full opacity-100" : "w-0 opacity-0"}`}
                  />
                  <span
                    aria-hidden
                    className={`absolute -top-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-pink transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0"}`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {!onApplyPage && (
              <Link
                to="/apply"
                className="soft-btn-pink hidden rounded-full bg-pink px-6 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-ink transition-all hover:-translate-y-0.5 md:inline-block"
              >
                Apply
              </Link>
            )}
            {/* Hamburger — mobile only (hidden when desktop nav is visible) */}
            <button
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
        showApply={!onApplyPage}
      />
    </>
  );
}

const SOCIAL_LINKS = [
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@niunorm",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.95a8.16 8.16 0 004.77 1.52V7.01a4.85 4.85 0 01-1-.32z"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/helloniunorm",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/niunorm.ph/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
];

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-16">

        {/* Top row */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3" aria-label="Niunorm home">
              <img src={logo} alt="Niunorm logo" className="h-10 w-10 rounded-full" />
              <span className="text-lg font-black lowercase tracking-tight text-cream">
                niu<span className="bg-gradient-to-r from-pink to-teal bg-clip-text text-transparent">norm</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-cream/50">
              Platinum TikTok Shop Partner agency in the Philippines. We help brands sell — actually.
            </p>
            {/* Socials */}
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

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-12">
            <div className="flex flex-col gap-3">
              <p className="label text-cream/35">Company</p>
              {NAV_LINKS.map((n) => (
                <Link
                  key={n.label}
                  to={n.href}
                  className="text-sm text-cream/60 transition-colors hover:text-cream"
                >
                  {n.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <p className="label text-cream/35">Work with us</p>
              <Link to="/apply" className="text-sm text-cream/60 transition-colors hover:text-cream">
                Apply as a Brand
              </Link>
              <a
                href="https://www.tiktok.com/@niunorm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cream/60 transition-colors hover:text-cream"
              >
                Join Niunies
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <p className="label text-cream/35">Contact</p>
              <a
                href="mailto:sorielynnapiza.niunorm@gmail.com"
                className="text-sm text-cream/60 transition-colors hover:text-cream"
              >
                Email us
              </a>
              <a
                href="https://www.tiktok.com/@niunorm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cream/60 transition-colors hover:text-cream"
              >
                TikTok DM
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start gap-2 border-t border-white/8 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-cream/30">
            © {new Date().getFullYear()} Niunorm. All rights reserved.
          </p>
          <p className="label text-cream/25">Platinum TikTok Shop Partner · Philippines</p>
        </div>

      </div>
    </footer>
  );
}

function HashScroller() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    // Give the page one frame to render before scrolling
    const id = hash.slice(1);
    const attempt = (tries: number) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else if (tries > 0) {
        requestAnimationFrame(() => attempt(tries - 1));
      }
    };
    requestAnimationFrame(() => attempt(10));
  }, [hash]);
  return null;
}

/**
 * Scroll behaviour:
 * - opening the site fresh lands on the hero (top)
 * - refreshing restores the exact spot you were at
 * - navigating to another page starts at the top (hash links are handled by HashScroller)
 */
const SCROLL_KEY = "niunorm:scroll";

// A fresh visit (not a refresh) always starts on the hero: drop any leftover #hash and saved spot.
if (typeof window !== "undefined") {
  const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  if (nav && nav.type !== "reload") {
    sessionStorage.removeItem(SCROLL_KEY);
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
  }
}

function ScrollMemory() {
  const { pathname, hash, key } = useLocation();

  // Take over restoration from the browser, which loses the spot while the page is still growing.
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    let t = 0;
    const save = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => {
        sessionStorage.setItem(SCROLL_KEY, JSON.stringify({ path: location.pathname, y: window.scrollY }));
      }, 80);
    };
    window.addEventListener("scroll", save, { passive: true });
    window.addEventListener("pagehide", save);
    return () => {
      window.removeEventListener("scroll", save);
      window.removeEventListener("pagehide", save);
    };
  }, []);

  useEffect(() => {
    if (hash) return;
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const isReload = nav?.type === "reload" && !firstRouteHandled.done;
    firstRouteHandled.done = true;
    let target = 0;
    if (isReload) {
      try {
        const saved = JSON.parse(sessionStorage.getItem(SCROLL_KEY) || "null");
        if (saved && saved.path === pathname) target = saved.y;
      } catch {
        /* ignore */
      }
    }
    if (!target) {
      window.scrollTo(0, 0);
      return;
    }
    // The page grows as sections mount; keep trying until it is tall enough.
    let tries = 0;
    const go = () => {
      window.scrollTo({ top: target, behavior: "instant" as ScrollBehavior });
      if (Math.abs(window.scrollY - target) > 2 && tries++ < 40) requestAnimationFrame(go);
    };
    requestAnimationFrame(go);
  }, [pathname, hash, key]);

  return null;
}
const firstRouteHandled = { done: false };

export default function Root() {
  return (
    <div className="min-h-screen bg-ink text-cream">
      <ScrollMemory />
      <HashScroller />
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}
