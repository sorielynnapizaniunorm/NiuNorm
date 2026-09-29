import { useState, type FormEvent, type ChangeEvent } from "react";
import s from "../css/apply.module.css";

const SERVICES = [
  "TikTok LIVE selling",
  "Affiliate marketing",
  "GMV Max ads",
  "Content creation",
  "Retention & CRM",
  "Full-stack management",
];

const GMV_OPTIONS = [
  { value: "", label: "Select current GMV…" },
  { value: "below-100k", label: "Below ₱100K / mo" },
  { value: "100k-500k", label: "₱100K – ₱500K / mo" },
  { value: "500k-2m", label: "₱500K – ₱2M / mo" },
  { value: "2m-plus", label: "₱2M+ / mo" },
];

const REFERRAL_OPTIONS = [
  { value: "", label: "Select one…" },
  { value: "tiktok", label: "TikTok" },
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "referral", label: "Friend or colleague" },
  { value: "gma", label: "GMA / Media" },
  { value: "google", label: "Google search" },
  { value: "other", label: "Other" },
];

type Fields = {
  brandName: string;
  contactName: string;
  email: string;
  tiktokHandle: string;
  monthlyGmv: string;
  category: string;
  services: string[];
  referral: string;
  message: string;
};

const EMPTY: Fields = {
  brandName: "",
  contactName: "",
  email: "",
  tiktokHandle: "",
  monthlyGmv: "",
  category: "",
  services: [],
  referral: "",
  message: "",
};

type ApplyProps = {
  onBack: () => void;
};

export default function Apply({ onBack }: ApplyProps) {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set(key: keyof Fields, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
  }

  function toggleService(svc: string) {
    setFields((f) => ({
      ...f,
      services: f.services.includes(svc)
        ? f.services.filter((s) => s !== svc)
        : [...f.services, svc],
    }));
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    set(e.target.name as keyof Fields, e.target.value);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("https://formspree.io/f/xdekylyy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand_name: fields.brandName,
          contact_name: fields.contactName,
          email: fields.email,
          tiktok_handle: fields.tiktokHandle,
          monthly_gmv: fields.monthlyGmv,
          category: fields.category,
          services: fields.services,
          referral: fields.referral,
          message: fields.message,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message ?? "Server error");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "May error. Subukan ulit.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={s.section}>
      <div className={s.glow} />
      <div className={s.inner}>
        <div className={s.grid}>
          <div className={s.pitch}>
            <button type="button" className={s.backLink} onClick={onBack}>
              ← Back to home
            </button>
            <p className={s.eyebrow}>Applications open</p>
            <h2 className={s.heading}>
              Work with
              <br />
              <span className={s.headingAccent}>Niunorm</span>
            </h2>
            <p className={s.subtext}>
              We cap our roster at 15 brands so every client gets the full weight of our
              team. Fill out the form and we'll reach out within 48 hours.
            </p>
            <ol className={s.steps}>
              <li className={s.step}>
                <span className={s.stepNum}>01</span>
                <span className={s.stepText}>
                  <strong>Submit your application</strong>
                  Takes less than three minutes.
                </span>
              </li>
              <li className={s.step}>
                <span className={s.stepNum}>02</span>
                <span className={s.stepText}>
                  <strong>Discovery call</strong>
                  We review your shop and schedule a short call.
                </span>
              </li>
              <li className={s.step}>
                <span className={s.stepNum}>03</span>
                <span className={s.stepText}>
                  <strong>Onboarding</strong>
                  If it's a fit, we start building your growth plan.
                </span>
              </li>
            </ol>
          </div>

          {submitted ? (
            <div className={s.success}>
              <div className={s.successRing}>
                <span className={s.successIcon}>✓</span>
              </div>
              <h3 className={s.successHeading}>Application received!</h3>
              <div className={s.successEmailBadge}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <rect x="1" y="2.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M1 4.5l6 4 6-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                <span>{fields.email}</span>
              </div>
              <p className={s.successText}>
                Check your inbox — our team will reach out to{" "}
                <strong>{fields.email}</strong> within 48 hours to schedule a quick discovery call.
              </p>
              <div className={s.successSteps}>
                <div className={s.successStep}>
                  <span className={s.successStepNum}>01</span>
                  <div>
                    <strong>Application review</strong>
                    <span>We go through your shop details now.</span>
                  </div>
                </div>
                <div className={s.successStep}>
                  <span className={s.successStepNum}>02</span>
                  <div>
                    <strong>Email within 48 hrs</strong>
                    <span>Expect a message at {fields.email}.</span>
                  </div>
                </div>
                <div className={s.successStep}>
                  <span className={s.successStepNum}>03</span>
                  <div>
                    <strong>Discovery call</strong>
                    <span>We align on fit and map out your growth plan.</span>
                  </div>
                </div>
              </div>
              <button type="button" className={s.successBackBtn} onClick={onBack}>
                ← Back to home
              </button>
            </div>
          ) : (
            <form className={s.form} onSubmit={handleSubmit} noValidate>
              {error && (
                <div className={s.errorBanner}>
                  <span>⚠ {error}</span>
                  <button
                    type="button"
                    onClick={() => setError(null)}
                    className={s.errorClose}
                  >
                    ✕
                  </button>
                </div>
              )}
              <div className={s.formRow}>
                <div className={s.field}>
                  <label htmlFor="brandName" className={s.fieldLabel}>
                    Brand name
                  </label>
                  <input
                    id="brandName"
                    name="brandName"
                    className={s.input}
                    placeholder="Acme PH"
                    value={fields.brandName}
                    onChange={handleChange}
                    required
                    autoComplete="organization"
                  />
                </div>

                <div className={s.field}>
                  <label htmlFor="contactName" className={s.fieldLabel}>
                    Your name
                  </label>
                  <input
                    id="contactName"
                    name="contactName"
                    className={s.input}
                    placeholder="Maria Santos"
                    value={fields.contactName}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                  />
                </div>
              </div>

              <div className={s.formRow}>
                <div className={s.field}>
                  <label htmlFor="email" className={s.fieldLabel}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={s.input}
                    placeholder="maria@acme.ph"
                    value={fields.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>

                <div className={s.field}>
                  <label htmlFor="tiktokHandle" className={s.fieldLabel}>
                    TikTok handle
                  </label>
                  <input
                    id="tiktokHandle"
                    name="tiktokHandle"
                    className={s.input}
                    placeholder="@acmeph"
                    value={fields.tiktokHandle}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={s.formRow}>
                <div className={s.field}>
                  <label htmlFor="monthlyGmv" className={s.fieldLabel}>
                    Current monthly GMV
                  </label>
                  <select
                    id="monthlyGmv"
                    name="monthlyGmv"
                    className={s.select}
                    value={fields.monthlyGmv}
                    onChange={handleChange}
                    required
                  >
                    {GMV_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={s.field}>
                  <label htmlFor="category" className={s.fieldLabel}>
                    Product category
                  </label>
                  <input
                    id="category"
                    name="category"
                    className={s.input}
                    placeholder="Beauty, Fashion, Food…"
                    value={fields.category}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={s.field}>
                <span className={s.fieldLabel}>Services you're interested in</span>
                <div className={s.checkGroup}>
                  {SERVICES.map((svc) => (
                    <label key={svc} className={s.checkLabel}>
                      <input
                        type="checkbox"
                        className={s.checkbox}
                        checked={fields.services.includes(svc)}
                        onChange={() => toggleService(svc)}
                      />
                      {svc}
                    </label>
                  ))}
                </div>
              </div>

              <div className={s.field}>
                <label htmlFor="message" className={s.fieldLabel}>
                  Tell us about your brand
                </label>
                <textarea
                  id="message"
                  name="message"
                  className={s.textarea}
                  placeholder="What you sell, what's working, what isn't — give us the honest picture."
                  value={fields.message}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <div className={s.field}>
                <label htmlFor="referral" className={s.fieldLabel}>
                  How did you hear about us?
                </label>
                <select
                  id="referral"
                  name="referral"
                  className={s.select}
                  value={fields.referral}
                  onChange={handleChange}
                >
                  {REFERRAL_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={s.submitRow}>
                <p className={s.submitNote}>
                  We review every application personally and respond within 48 hours.
                </p>
                <button
                  type="submit"
                  className={s.submitBtn}
                  disabled={loading || !fields.brandName || !fields.email}
                >
                  {loading ? (
                    "Sending…"
                  ) : (
                    <>
                      Submit application <span className={s.arrow}>→</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
