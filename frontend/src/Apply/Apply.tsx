import { useEffect, useState, type FormEvent, type ChangeEvent } from "react";
import { Link } from "react-router";
import s from "./Apply.module.css";

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

const FORMSPREE_URL = "https://formspree.io/f/mnpnlbez";

const STORAGE_KEY = "niunorm-apply-draft";

function loadDraft(): Fields {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    return {
      ...EMPTY,
      ...parsed,
      services: Array.isArray(parsed?.services) ? parsed.services : [],
    };
  } catch {
    return EMPTY;
  }
}

type FieldErrors = Partial<Record<keyof Fields, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const SERVER_FIELD_MAP: Record<string, keyof Fields> = {
  brand_name: "brandName",
  contact_name: "contactName",
  email: "email",
  tiktok_handle: "tiktokHandle",
  monthly_gmv: "monthlyGmv",
  category: "category",
  services: "services",
  referral: "referral",
  message: "message",
};

function validate(f: Fields): FieldErrors {
  const e: FieldErrors = {};
  if (!f.brandName.trim()) e.brandName = "Brand name is required.";
  if (!f.contactName.trim()) e.contactName = "Your name is required.";
  if (!f.email.trim()) e.email = "Email is required.";
  else if (!EMAIL_RE.test(f.email.trim()))
    e.email = "Please enter a valid email address (e.g. maria@acme.ph).";
  if (!f.tiktokHandle.trim()) e.tiktokHandle = "TikTok handle is required.";
  else if (!/^@?[\w.]{2,24}$/.test(f.tiktokHandle.trim()))
    e.tiktokHandle = "Please enter a valid handle (e.g. @acmeph).";
  if (!f.monthlyGmv) e.monthlyGmv = "Please select your current monthly GMV.";
  if (!f.category.trim()) e.category = "Product category is required.";
  if (f.services.length === 0) e.services = "Select at least one service.";
  if (!f.message.trim()) e.message = "Please tell us about your brand.";
  if (!f.referral) e.referral = "Please tell us how you heard about us.";
  return e;
}

function parseServerErrors(data: any): FieldErrors {
  const out: FieldErrors = {};
  if (Array.isArray(data?.errors)) {
    for (const item of data.errors) {
      const key = SERVER_FIELD_MAP[item?.field] ?? (item?.field as keyof Fields);
      if (key in EMPTY && !out[key]) {
        out[key] = key === "email" ? "Please enter a valid email address." : item.message;
      }
    }
  } else if (data?.errors && typeof data.errors === "object") {
    for (const [k, v] of Object.entries<any>(data.errors)) {
      const key = SERVER_FIELD_MAP[k] ?? (k as keyof Fields);
      if (key in EMPTY) out[key] = Array.isArray(v) ? v[0] : String(v);
    }
  }
  return out;
}

export default function Apply() {
  const [fields, setFields] = useState<Fields>(loadDraft);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fields));
    } catch {}
  }, [fields]);

  function set(key: keyof Fields, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
    setFieldErrors((errs) => (errs[key] ? { ...errs, [key]: undefined } : errs));
  }

  function fieldProps(key: keyof Fields) {
    const msg = fieldErrors[key];
    return {
      "aria-invalid": msg ? true : undefined,
      "aria-describedby": msg ? `${key}-error` : undefined,
      "data-invalid": msg ? "true" : undefined,
    } as const;
  }

  function FieldError({ name }: { name: keyof Fields }) {
    const msg = fieldErrors[name];
    return msg ? (
      <p id={`${name}-error`} role="alert" className={s.fieldError}>
        {msg}
      </p>
    ) : null;
  }

  function toggleService(svc: string) {
    setFieldErrors((errs) => ({ ...errs, services: undefined }));
    setFields((f) => ({
      ...f,
      services: f.services.includes(svc)
        ? f.services.filter((s) => s !== svc)
        : [...f.services, svc],
    }));
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    set(e.target.name as keyof Fields, e.target.value);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const errs = validate(fields);
    setFieldErrors(errs);
    const firstInvalid = Object.keys(errs)[0];
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New application: ${fields.brandName}`,
          brandName:    fields.brandName,
          contactName:  fields.contactName,
          email:        fields.email,
          tiktokHandle: fields.tiktokHandle,
          monthlyGmv:   fields.monthlyGmv,
          category:     fields.category,
          services:     fields.services.join(", "),
          referral:     fields.referral,
          message:      fields.message,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const serverErrs = parseServerErrors(err);
        if (Object.keys(serverErrs).length) {
          setFieldErrors(serverErrs);
          document.getElementById(Object.keys(serverErrs)[0])?.focus();
          return;
        }
        throw new Error("Something went wrong on our side. Please try again.");
      }
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={s.section}>
      <div className={s.glow} />
      <div className={s.inner}>
        <div className={s.grid}>
          {/* ── Pitch ── */}
          <div className={s.pitch}>
            <Link to="/" className={s.backLink}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M8.5 2.5L4 7l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to home
            </Link>
          <p className={s.eyebrow}>Applications open</p>
            <h2 className={s.heading}>
              Work with<br />
              <span className={s.headingAccent}>Niunorm</span>
            </h2>
            <p className={s.subtext}>
              We cap our roster at 15 brands so every client gets the full weight
              of our team. Fill out the form and we'll reach out within 48 hours.
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

          {/* ── Form ── */}
          {submitted ? (
            <div className={s.success}>
              <div className={s.successRing}>
                <span className={s.successIcon}>✓</span>
              </div>
              <h3 className={s.successHeading}>Application received!</h3>
              <div className={s.successEmailBadge}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <rect x="1" y="2.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M1 4.5l6 4 6-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                <span>{fields.email}</span>
              </div>
              <p className={s.successText}>
                Check your inbox — our team will reach out to{" "}
                <strong>{fields.email}</strong> within 48 hours to schedule
                a quick discovery call.
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
              <Link to="/" className={s.successBackBtn}>
                ← Back to home
              </Link>
            </div>
          ) : (
            <form className={s.form} onSubmit={handleSubmit} noValidate>
              {error && (
                <div className={s.errorBanner}>
                  <span>⚠ {error}</span>
                  <button type="button" onClick={() => setError(null)} className={s.errorClose}>✕</button>
                </div>
              )}
              <div className={s.formRow}>
                <div className={s.field}>
                  <label htmlFor="brandName" className={s.fieldLabel}>Brand name</label>
                  <input
                    id="brandName"
                    name="brandName"
                    {...fieldProps("brandName")}
                    className={s.input}
                    placeholder="Acme PH"
                    value={fields.brandName}
                    onChange={handleChange}
                    required
                    autoComplete="organization"
                  />
                  <FieldError name="brandName" />
                </div>
                <div className={s.field}>
                  <label htmlFor="contactName" className={s.fieldLabel}>Your name</label>
                  <input
                    id="contactName"
                    name="contactName"
                    {...fieldProps("contactName")}
                    className={s.input}
                    placeholder="Maria Santos"
                    value={fields.contactName}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                  />
                  <FieldError name="contactName" />
                </div>
              </div>

              <div className={s.formRow}>
                <div className={s.field}>
                  <label htmlFor="email" className={s.fieldLabel}>Email</label>
                  <input
                    id="email"
                    name="email"
                    {...fieldProps("email")}
                    type="email"
                    className={s.input}
                    placeholder="maria@acme.ph"
                    value={fields.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                  <FieldError name="email" />
                </div>
                <div className={s.field}>
                  <label htmlFor="tiktokHandle" className={s.fieldLabel}>TikTok handle</label>
                  <input
                    id="tiktokHandle"
                    name="tiktokHandle"
                    {...fieldProps("tiktokHandle")}
                    className={s.input}
                    placeholder="@acmeph"
                    value={fields.tiktokHandle}
                    onChange={handleChange}
                  />
                  <FieldError name="tiktokHandle" />
                </div>
              </div>

              <div className={s.formRow}>
                <div className={s.field}>
                  <label htmlFor="monthlyGmv" className={s.fieldLabel}>Current monthly GMV</label>
                  <select
                    id="monthlyGmv"
                    name="monthlyGmv"
                    {...fieldProps("monthlyGmv")}
                    className={s.select}
                    value={fields.monthlyGmv}
                    onChange={handleChange}
                    required
                  >
                    {GMV_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <FieldError name="monthlyGmv" />
                </div>
                <div className={s.field}>
                  <label htmlFor="category" className={s.fieldLabel}>Product category</label>
                  <input
                    id="category"
                    name="category"
                    {...fieldProps("category")}
                    className={s.input}
                    placeholder="Beauty, Fashion, Food…"
                    value={fields.category}
                    onChange={handleChange}
                  />
                  <FieldError name="category" />
                </div>
              </div>

              <div className={s.field}>
                <span className={s.fieldLabel}>Services you're interested in</span>
                <div id="services" tabIndex={-1} className={s.checkGroup} data-invalid={fieldErrors.services ? "true" : undefined}>
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
                <FieldError name="services" />
              </div>

              <div className={s.field}>
                <label htmlFor="message" className={s.fieldLabel}>Tell us about your brand</label>
                <textarea
                  id="message"
                  name="message"
                  {...fieldProps("message")}
                  className={s.textarea}
                  placeholder="What you sell, what's working, what isn't — give us the honest picture."
                  value={fields.message}
                  onChange={handleChange}
                  rows={4}
                />
                <FieldError name="message" />
              </div>

              <div className={s.field}>
                <label htmlFor="referral" className={s.fieldLabel}>How did you hear about us?</label>
                <select
                  id="referral"
                  name="referral"
                  {...fieldProps("referral")}
                  className={s.select}
                  value={fields.referral}
                  onChange={handleChange}
                >
                  {REFERRAL_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <FieldError name="referral" />
              </div>

              <div className={s.submitRow}>
                <p className={s.submitNote}>
                  We review every application personally and respond within 48 hours.
                </p>
                <button
                  type="submit"
                  className={s.submitBtn}
                  disabled={loading}
                >
                  {loading ? "Sending…" : (
                    <>Submit application <span className={s.arrow}>→</span></>
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
