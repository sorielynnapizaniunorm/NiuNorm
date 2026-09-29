import { useEffect } from "react";
import logo from "../assets/NiunormLogo.png";
import m from "../css/MobileMenu.module.css";

export const NAV_LINKS = [
  {
    label: "Services",
    href: "/#services",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="1" width="6" height="6" rx="1.5"/>
        <rect x="9" y="1" width="6" height="6" rx="1.5"/>
        <rect x="1" y="9" width="6" height="6" rx="1.5"/>
        <rect x="9" y="9" width="6" height="6" rx="1.5"/>
      </svg>
    ),
  },
  {
    label: "Results",
    href: "/#results",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 13V9M6 13V5M10 13V7M14 13V3"/>
      </svg>
    ),
  },
  {
    label: "About",
    href: "/#about",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="8" r="6.5"/>
        <path d="M8 7v5M8 5.5v.5"/>
      </svg>
    ),
  },
  {
    label: "Niunies",
    href: "/#niunies",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="5" r="2.5"/>
        <path d="M1 13c0-2.8 2.2-5 5-5"/>
        <circle cx="11.5" cy="5.5" r="2"/>
        <path d="M10.5 10.5c1.4-.3 2.9 0 4 1.5"/>
      </svg>
    ),
  },
];

export default function MobileDrawer({
  open,
  onClose,
  showApply,
  onApply,
}: {
  open: boolean;
  onClose: () => void;
  showApply: boolean;
  onApply: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div className={m.backdrop} onClick={onClose} aria-hidden="true" />
      <div className={m.drawer} role="dialog" aria-modal="true" aria-label="Navigation menu">

        <div className={m.drawerHeader}>
          <a href="#top" onClick={onClose} className={m.brandLink} aria-label="Niunorm home">
            <img src={logo} alt="Niunorm logo" className="h-9 w-9 rounded-full flex-shrink-0" />
            <span className={m.brandName}>
              niu<span>norm</span>
            </span>
          </a>
          <button className={m.closeBtn} onClick={onClose} aria-label="Close menu">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M1.5 1.5l10 10M11.5 1.5l-10 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className={m.sectionLabel}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
            <circle cx="5" cy="5" r="2"/>
          </svg>
          Navigate
        </div>

        <nav className={m.navList}>
          {NAV_LINKS.map((n) => (
            <a key={n.label} href={n.href} className={m.navItem} onClick={onClose}>
              <span className={m.navIcon}>{n.icon}</span>
              {n.label}
            </a>
          ))}

          {showApply && (
            <>
              <div className={m.divider} />
              <button
                type="button"
                className={`${m.navItem} ${m.navItemApply}`}
                onClick={() => {
                  onClose();
                  onApply();
                }}
              >
                <span className={m.navIcon}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8h10M9 4l4 4-4 4"/>
                  </svg>
                </span>
                Apply
              </button>
            </>
          )}
        </nav>

        <div className={m.drawerFooter}>
          <p className={m.drawerFooterLabel}>Platinum TikTok Shop Partner · PH</p>
        </div>

      </div>
    </>
  );
}
