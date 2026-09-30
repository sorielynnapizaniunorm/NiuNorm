import { useEffect, useRef, useState, type FormEvent, type ChangeEvent } from "react";
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

const STORAGE_KEY = "niunorm-apply-draft";

function loadDraft(): Fields {
  if (typeof window === "undefined") return EMPTY;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return EMPTY;

    const draft = JSON.parse(saved) as Partial<Fields>;
    return {
      brandName: typeof draft.brandName === "string" ? draft.brandName : EMPTY.brandName,
      contactName: typeof draft.contactName === "string" ? draft.contactName : EMPTY.contactName,
      email: typeof draft.email === "string" ? draft.email : EMPTY.email,
      tiktokHandle: typeof draft.tiktokHandle === "string" ? draft.tiktokHandle : EMPTY.tiktokHandle,
      monthlyGmv: typeof draft.monthlyGmv === "string" ? draft.monthlyGmv : EMPTY.monthlyGmv,
      category: typeof draft.category === "string" ? draft.category : EMPTY.category,
      services: Array.isArray(draft.services)
        ? draft.services.filter((service): service is string => typeof service === "string")
        : EMPTY.services,
      referral: typeof draft.referral === "string" ? draft.referral : EMPTY.referral,
      message: typeof draft.message === "string" ? draft.message : EMPTY.message,
    };
  } catch {
    return EMPTY;
  }
}

type ApplyProps = {
  onBack: () => void;
};

type ValidatedField =
  | "brandName"
  | "contactName"
  | "email"
  | "tiktokHandle"
  | "monthlyGmv"
  | "category"
  | "services"
  | "message"
  | "referral";
type FieldErrors = Partial<Record<ValidatedField, string>>;
type ServerError = { field?: string; message?: string };
type ServerResponse = {
  error?: string;
  message?: string;
  errors?: Record<string, string[] | string> | ServerError[];
};

const VALIDATED_FIELDS: ValidatedField[] = [
  "brandName",
  "contactName",
  "email",
  "tiktokHandle",
  "monthlyGmv",
  "category",
  "services",
  "message",
  "referral",
];

const SERVER_FIELD_NAMES: Record<string, ValidatedField> = {
  brandName: "brandName",
  brand_name: "brandName",
  contactName: "contactName",
  contact_name: "contactName",
  email: "email",
  tiktokHandle: "tiktokHandle",
  tiktok_handle: "tiktokHandle",
  monthlyGmv: "monthlyGmv",
  monthly_gmv: "monthlyGmv",
  category: "category",
  services: "services",
  message: "message",
  referral: "referral",
};

function validateFields(values: Fields): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.brandName.trim()) errors.brandName = "Brand name is required.";
  if (!values.contactName.trim()) errors.contactName = "Your name is required.";
  if (!values.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address (e.g. maria@acme.ph).";
  }
  if (!values.tiktokHandle.trim()) errors.tiktokHandle = "TikTok handle is required.";
  if (!values.monthlyGmv) errors.monthlyGmv = "Monthly GMV is required.";
  if (!values.category.trim()) errors.category = "Product category is required.";
  if (values.services.length === 0) errors.services = "Select at least one service.";
  if (!values.message.trim()) errors.message = "Tell us about your brand is required.";
  if (!values.referral) errors.referral = "How did you hear about us is required.";

  return errors;
}

function parseServerErrors(data: ServerResponse): FieldErrors {
  const fieldErrors: FieldErrors = {};

  if (Array.isArray(data.errors)) {
    data.errors.forEach((item) => {
      const field = item.field ? SERVER_FIELD_NAMES[item.field] : undefined;
      if (field && item.message) fieldErrors[field] = item.message;
    });
    return fieldErrors;
  }

  if (data.errors) {
    Object.entries(data.errors).forEach(([key, messages]) => {
      const field = SERVER_FIELD_NAMES[key];
      const message = Array.isArray(messages) ? messages[0] : messages;
      if (field && message) fieldErrors[field] = message;
    });
  }

  return fieldErrors;
}

function firstServerMessage(data: ServerResponse): string | undefined {
  if (typeof data.error === "string") return data.error;
  if (typeof data.message === "string") return data.message;

  if (data.errors && !Array.isArray(data.errors)) {
    const firstError = Object.values(data.errors)[0];
    return Array.isArray(firstError) ? firstError[0] : firstError;
  }

  return data.errors?.find((item) => item.message)?.message;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <span id={id} className={s.fieldError}>
      {message}
    </span>
  );
}

export default function Apply({ onBack }: ApplyProps) {
  const [fields, setFields] = useState<Fields>(loadDraft);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const fieldRefs = useRef<Record<ValidatedField, HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null>>({
    brandName: null,
    contactName: null,
    email: null,
    tiktokHandle: null,
    monthlyGmv: null,
    category: null,
    services: null,
    message: null,
    referral: null,
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fields));
    } catch {
    }
  }, [fields]);

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

      if (fieldErrors.services) {
        setFieldErrors((current) => {
          const next = { ...current };
          delete next.services;
          return next;
        });
      }
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const fieldName = e.target.name as keyof Fields;
    set(fieldName, e.target.value);

    if (fieldName in fieldErrors) {
      setFieldErrors((current) => {
        const next = { ...current };
        delete next[fieldName as ValidatedField];
        return next;
      });
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const validationErrors = validateFields(fields);
    setFieldErrors(validationErrors);
    setError(null);

    const firstInvalidField = VALIDATED_FIELDS.find((field) => validationErrors[field]);
    if (firstInvalidField) {
      fieldRefs.current[firstInvalidField]?.focus();
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://formspree.io/f/mnpnlbez", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `New application: ${fields.brandName}`,
          brandName: fields.brandName,
          contactName: fields.contactName,
          email: fields.email,
          tiktokHandle: fields.tiktokHandle,
          monthlyGmv: fields.monthlyGmv,
          category: fields.category,
          services: fields.services.join(", "),
          referral: fields.referral,
          message: fields.message,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as ServerResponse;
        const serverFieldErrors = parseServerErrors(data);

        if (res.status === 422 && Object.keys(serverFieldErrors).length > 0) {
          setFieldErrors(serverFieldErrors);
          const firstServerError = VALIDATED_FIELDS.find((field) => serverFieldErrors[field]);
          if (firstServerError) fieldRefs.current[firstServerError]?.focus();
          return;
        }

        throw new Error(firstServerMessage(data) ?? "Something went wrong. Please try again.");
      }

      localStorage.removeItem(STORAGE_KEY);
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
                    className={`${s.input} ${fieldErrors.brandName ? s.inputError : ""}`}
                    placeholder="Acme PH"
                    value={fields.brandName}
                    onChange={handleChange}
                    ref={(element) => { fieldRefs.current.brandName = element; }}
                    aria-invalid={Boolean(fieldErrors.brandName)}
                    aria-describedby={fieldErrors.brandName ? "brandName-error" : undefined}
                    required
                    autoComplete="organization"
                  />
                  {fieldErrors.brandName && <span id="brandName-error" className={s.fieldError}>{fieldErrors.brandName}</span>}
                </div>

                <div className={s.field}>
                  <label htmlFor="contactName" className={s.fieldLabel}>
                    Your name
                  </label>
                  <input
                    id="contactName"
                    name="contactName"
                    className={`${s.input} ${fieldErrors.contactName ? s.inputError : ""}`}
                    placeholder="Maria Santos"
                    value={fields.contactName}
                    onChange={handleChange}
                    ref={(element) => { fieldRefs.current.contactName = element; }}
                    aria-invalid={Boolean(fieldErrors.contactName)}
                    aria-describedby={fieldErrors.contactName ? "contactName-error" : undefined}
                    required
                    autoComplete="name"
                  />
                  {fieldErrors.contactName && <span id="contactName-error" className={s.fieldError}>{fieldErrors.contactName}</span>}
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
                    className={`${s.input} ${fieldErrors.email ? s.inputError : ""}`}
                    placeholder="maria@acme.ph"
                    value={fields.email}
                    onChange={handleChange}
                    ref={(element) => { fieldRefs.current.email = element; }}
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? "email-error" : undefined}
                    required
                    autoComplete="email"
                  />
                  {fieldErrors.email && <span id="email-error" className={s.fieldError}>{fieldErrors.email}</span>}
                </div>

                <div className={s.field}>
                  <label htmlFor="tiktokHandle" className={s.fieldLabel}>
                    TikTok handle
                  </label>
                  <input
                    id="tiktokHandle"
                    name="tiktokHandle"
                    className={`${s.input} ${fieldErrors.tiktokHandle ? s.inputError : ""}`}
                    placeholder="@acmeph"
                    value={fields.tiktokHandle}
                    onChange={handleChange}
                    ref={(element) => { fieldRefs.current.tiktokHandle = element; }}
                    aria-invalid={Boolean(fieldErrors.tiktokHandle)}
                    aria-describedby={fieldErrors.tiktokHandle ? "tiktokHandle-error" : undefined}
                    required
                  />
                  <FieldError id="tiktokHandle-error" message={fieldErrors.tiktokHandle} />
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
                    className={`${s.select} ${fieldErrors.monthlyGmv ? s.inputError : ""}`}
                    value={fields.monthlyGmv}
                    onChange={handleChange}
                    ref={(element) => { fieldRefs.current.monthlyGmv = element; }}
                    aria-invalid={Boolean(fieldErrors.monthlyGmv)}
                    aria-describedby={fieldErrors.monthlyGmv ? "monthlyGmv-error" : undefined}
                    required
                  >
                    {GMV_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <FieldError id="monthlyGmv-error" message={fieldErrors.monthlyGmv} />
                </div>

                <div className={s.field}>
                  <label htmlFor="category" className={s.fieldLabel}>
                    Product category
                  </label>
                  <input
                    id="category"
                    name="category"
                    placeholder="Beauty, Fashion, Food…"
                    value={fields.category}
                    onChange={handleChange}
                    ref={(element) => { fieldRefs.current.category = element; }}
                    className={`${s.input} ${fieldErrors.category ? s.inputError : ""}`}
                    aria-invalid={Boolean(fieldErrors.category)}
                    aria-describedby={fieldErrors.category ? "category-error" : undefined}
                    required
                  />
                  <FieldError id="category-error" message={fieldErrors.category} />
                </div>
              </div>

              <div className={s.field}>
                <span className={s.fieldLabel}>Services you're interested in</span>
                <div
                  className={`${s.checkGroup} ${fieldErrors.services ? s.checkGroupError : ""}`}
                  role="group"
                  aria-invalid={Boolean(fieldErrors.services)}
                  aria-describedby={fieldErrors.services ? "services-error" : undefined}
                >
                  {SERVICES.map((svc) => (
                    <label key={svc} className={s.checkLabel}>
                      <input
                        type="checkbox"
                        className={s.checkbox}
                        checked={fields.services.includes(svc)}
                        onChange={() => toggleService(svc)}
                        ref={(element) => {
                          if (svc === SERVICES[0]) fieldRefs.current.services = element;
                        }}
                      />
                      {svc}
                    </label>
                  ))}
                </div>
                <FieldError id="services-error" message={fieldErrors.services} />
              </div>

              <div className={s.field}>
                <label htmlFor="message" className={s.fieldLabel}>
                  Tell us about your brand
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="What you sell, what's working, what isn't — give us the honest picture."
                  value={fields.message}
                  onChange={handleChange}
                  ref={(element) => { fieldRefs.current.message = element; }}
                  className={`${s.textarea} ${fieldErrors.message ? s.inputError : ""}`}
                  aria-invalid={Boolean(fieldErrors.message)}
                  aria-describedby={fieldErrors.message ? "message-error" : undefined}
                  required
                  rows={4}
                />
                <FieldError id="message-error" message={fieldErrors.message} />
              </div>

              <div className={s.field}>
                <label htmlFor="referral" className={s.fieldLabel}>
                  How did you hear about us?
                </label>
                <select
                  id="referral"
                  name="referral"
                  className={`${s.select} ${fieldErrors.referral ? s.inputError : ""}`}
                  value={fields.referral}
                  onChange={handleChange}
                  ref={(element) => { fieldRefs.current.referral = element; }}
                  aria-invalid={Boolean(fieldErrors.referral)}
                  aria-describedby={fieldErrors.referral ? "referral-error" : undefined}
                  required
                >
                  {REFERRAL_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <FieldError id="referral-error" message={fieldErrors.referral} />
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
