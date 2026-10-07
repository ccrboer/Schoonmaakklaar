"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, LoaderCircle, CircleAlert, MessageCircle } from "lucide-react";
import {
  validateQuote,
  EMPTY_QUOTE,
  PHOTO_ACCEPT,
  PHOTO_ACCEPT_LABEL,
  MAX_PHOTOS,
  MAX_PHOTO_BYTES,
  MAX_TOTAL_BYTES,
  HONEYPOT_FIELD,
  type QuoteFields,
  type FieldErrors,
} from "@/lib/offerte";
import { trackEvent } from "@/lib/analytics";
import { readAttribution, EMPTY_ATTRIBUTION } from "@/lib/attribution";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";
import type { PpcField, PpcFormConfig } from "@/config/ppc-pages";

interface LeadFormProps {
  form: PpcFormConfig;
  /** Dienstwaarde uit SERVICE_OPTIONS; wordt niet door de bezoeker gekozen. */
  dienst: string;
  landingPage: string;
  whatsappMessage: string;
}

const inputBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-[0.95rem] text-ink " +
  "placeholder:text-ink-muted/60 transition-colors focus:outline-none " +
  "focus:ring-2 focus:ring-brand/15";

function fieldClass(hasError: boolean) {
  return `${inputBase} ${
    hasError
      ? "border-red-400 focus:border-red-500"
      : "border-hairline focus:border-brand"
  }`;
}

function formatBytes(bytes: number) {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Waarden van een multi-select worden als één tekstveld verstuurd. */
function toggleInList(current: string, option: string): string {
  const items = current ? current.split(", ").filter(Boolean) : [];
  const next = items.includes(option)
    ? items.filter((item) => item !== option)
    : [...items, option];
  return next.join(", ");
}

function isSelected(current: string, option: string): boolean {
  return current ? current.split(", ").includes(option) : false;
}

/**
 * Formulier van een advertentiepagina. De velden komen uit de funnelconfig,
 * zodat elke funnel zijn eigen kwalificatievragen stelt, maar validatie,
 * spambeveiliging, verzending en de lead-mail blijven exact dezelfde als bij
 * het gewone offerteformulier.
 *
 * Er wordt nergens automatisch gescrold na een keuze: wie iets aanvinkt
 * verliest zo zijn plaats niet in een lange lijst.
 */
export function LeadForm({
  form,
  dienst,
  landingPage,
  whatsappMessage,
}: LeadFormProps) {
  const router = useRouter();
  const uid = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const startedAt = useRef(0);
  const attribution = useRef(EMPTY_ATTRIBUTION);
  const formStarted = useRef(false);

  const [fields, setFields] = useState<QuoteFields>({
    ...EMPTY_QUOTE,
    dienst,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Herkomst en starttijd worden na hydratatie in refs gezet: geen state, dus
  // geen extra render en geen verschil tussen server- en clientweergave.
  useEffect(() => {
    startedAt.current = Date.now();
    attribution.current = readAttribution();
  }, []);

  const whatsappHref = siteConfig.contact.whatsapp
    ? buildWhatsAppLink({
        phone: siteConfig.contact.whatsapp,
        message: whatsappMessage,
      })
    : null;

  /** Meldt één keer dat de bezoeker het formulier begon in te vullen. */
  function noteStart() {
    if (formStarted.current) return;
    formStarted.current = true;
    trackEvent("form_start", { service: dienst, landing_page: landingPage });
  }

  function update<K extends keyof QuoteFields>(key: K, value: string) {
    noteStart();
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function addPhotos(list: FileList | null) {
    if (!list || list.length === 0) return;
    noteStart();
    setPhotoError(null);
    const next: File[] = [...photos];

    for (const file of Array.from(list)) {
      if (!PHOTO_ACCEPT.includes(file.type)) {
        setPhotoError(`Alleen ${PHOTO_ACCEPT_LABEL} zijn toegestaan.`);
        continue;
      }
      if (file.size > MAX_PHOTO_BYTES) {
        setPhotoError(`"${file.name}" is te groot (max 5 MB per foto).`);
        continue;
      }
      if (next.length >= MAX_PHOTOS) {
        setPhotoError(`Maximaal ${MAX_PHOTOS} foto's.`);
        break;
      }
      if (!next.some((f) => f.name === file.name && f.size === file.size)) {
        next.push(file);
      }
    }

    const total = next.reduce((sum, file) => sum + file.size, 0);
    if (total > MAX_TOTAL_BYTES) {
      setPhotoError(
        `De foto's zijn samen te groot (max ${formatBytes(MAX_TOTAL_BYTES)}).`,
      );
      return;
    }
    if (next.length > photos.length) {
      trackEvent("photo_upload", {
        service: dienst,
        aantal: next.length - photos.length,
      });
    }
    setPhotos(next);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removePhoto(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoError(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const nextErrors = validateQuote(fields);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const first = Object.keys(nextErrors)[0];
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const body = new FormData();
      const payload: QuoteFields = {
        ...fields,
        dienst,
        landingPage,
        ...attribution.current,
      };
      (Object.keys(payload) as Array<keyof QuoteFields>).forEach((key) =>
        body.append(key, payload[key]),
      );
      body.append("startedAt", String(startedAt.current));
      const honeypot = (
        document.getElementById(
          `${uid}-${HONEYPOT_FIELD}`,
        ) as HTMLInputElement | null
      )?.value;
      body.append(HONEYPOT_FIELD, honeypot ?? "");
      photos.forEach((file) => body.append("photos", file, file.name));

      const response = await fetch("/api/offerte", { method: "POST", body });

      if (response.ok) {
        trackEvent("form_submit_success", {
          service: dienst,
          landing_page: landingPage,
          foto_aantal: photos.length,
        });
        trackEvent("offerte_submit", { dienst });
        router.push("/bedankt");
        return;
      }

      const data = (await response.json().catch(() => null)) as
        | { errors?: FieldErrors; error?: string }
        | null;

      if (data?.errors) {
        setErrors(data.errors);
        const first = Object.keys(data.errors)[0];
        document.getElementById(`${uid}-${first}`)?.focus();
      }
      setSubmitError(
        data?.error ?? "Er ging iets mis bij het verzenden. Probeer het opnieuw.",
      );
      setSubmitting(false);
    } catch {
      setSubmitError(
        "Verzenden lukte niet. Controleer uw verbinding en probeer het opnieuw.",
      );
      setSubmitting(false);
    }
  }

  const totalPhotoBytes = photos.reduce((sum, file) => sum + file.size, 0);

  function renderField(field: PpcField) {
    const id = `${uid}-${field.name}`;
    const error = errors[field.name];
    const value = fields[field.name];
    const span = field.half ? "sm:col-span-1" : "sm:col-span-2";

    if (field.type === "radio" || field.type === "multi") {
      const multi = field.type === "multi";
      return (
        <fieldset key={field.name} className="sm:col-span-2">
          <legend className="text-sm font-medium text-ink">
            {field.label}
            {field.required && <span className="ml-0.5 text-accent-dark">*</span>}
            {multi && (
              <span className="ml-1 font-normal text-ink-muted">
                (meerdere mogelijk)
              </span>
            )}
          </legend>
          {field.help && (
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">
              {field.help}
            </p>
          )}
          <div
            className={`mt-2.5 grid gap-2.5 ${
              field.compact
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2"
            }`}
          >
            {(field.options ?? []).map((option, index) => {
              const checked = multi
                ? isSelected(value, option)
                : value === option;
              const optionId =
                index === 0 ? id : `${uid}-${field.name}-${index}`;
              return (
                <label
                  key={option}
                  htmlFor={optionId}
                  className={`flex h-full cursor-pointer items-start gap-2.5 rounded-xl border px-4 py-3 text-sm transition-colors ${
                    checked
                      ? "border-brand bg-accent-soft text-brand"
                      : "border-hairline bg-white text-ink hover:border-accent"
                  }`}
                >
                  <input
                    id={optionId}
                    type={multi ? "checkbox" : "radio"}
                    name={field.name}
                    value={option}
                    checked={checked}
                    onChange={() =>
                      update(
                        field.name,
                        multi ? toggleInList(value, option) : option,
                      )
                    }
                    className="mt-0.5 h-4 w-4 shrink-0 accent-brand"
                  />
                  <span className="min-w-0 font-medium leading-snug break-words">
                    {option}
                  </span>
                </label>
              );
            })}
          </div>
          {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
        </fieldset>
      );
    }

    if (field.type === "textarea") {
      return (
        <div key={field.name} className="sm:col-span-2">
          <FieldLabel id={id} field={field} />
          <textarea
            id={id}
            name={field.name}
            rows={4}
            value={value}
            onChange={(event) => update(field.name, event.target.value)}
            placeholder={field.placeholder}
            className={`mt-2 resize-y ${fieldClass(false)}`}
          />
        </div>
      );
    }

    return (
      <div key={field.name} className={`min-w-0 ${span}`}>
        <FieldLabel id={id} field={field} />
        <input
          id={id}
          name={field.name}
          type={field.type === "date" ? "date" : (field.inputType ?? "text")}
          inputMode={field.inputMode}
          autoComplete={field.autoComplete}
          placeholder={field.placeholder}
          value={value}
          onChange={(event) => update(field.name, event.target.value)}
          aria-required={field.required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`mt-2 ${fieldClass(Boolean(error))}`}
        />
        {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-9">
      {form.groups.map((group) => (
        <fieldset key={group.title} className="space-y-5">
          <legend className="font-display text-xs font-bold uppercase tracking-[0.12em] text-brand-light">
            {group.title}
          </legend>
          <div className="grid gap-5 sm:grid-cols-2">
            {group.fields.map(renderField)}
          </div>
        </fieldset>
      ))}

      {/* Foto's */}
      <fieldset className="space-y-5">
        <legend className="font-display text-xs font-bold uppercase tracking-[0.12em] text-brand-light">
          3 · Foto&apos;s en toelichting
        </legend>

        <div
          className={
            form.photos.prominent
              ? "rounded-2xl border border-accent/40 bg-accent-soft/40 p-5 sm:p-6"
              : undefined
          }
        >
          <span className="block text-sm font-medium text-ink">
            {form.photos.label}{" "}
            <span className="font-normal text-ink-muted">(optioneel)</span>
          </span>
          <p className="mt-1 text-sm leading-relaxed text-ink-muted">
            {form.photos.help}
          </p>

          <label
            htmlFor={`${uid}-photos`}
            className="mt-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-hairline bg-white px-6 py-8 text-center transition-colors hover:border-accent hover:bg-accent-soft/50"
          >
            <Upload className="h-6 w-6 text-brand-light" aria-hidden="true" />
            <span className="text-sm font-semibold text-brand">
              Kies foto&apos;s of sleep ze hierheen
            </span>
            <span className="text-xs text-ink-muted">
              {PHOTO_ACCEPT_LABEL} · max {MAX_PHOTOS} foto&apos;s ·{" "}
              {formatBytes(MAX_TOTAL_BYTES)} totaal
            </span>
            <input
              ref={fileInputRef}
              id={`${uid}-photos`}
              name="photos"
              type="file"
              accept={PHOTO_ACCEPT.join(",")}
              multiple
              className="sr-only"
              onChange={(event) => addPhotos(event.target.files)}
            />
          </label>

          {photoError && <FieldError>{photoError}</FieldError>}

          {photos.length > 0 && (
            <ul className="mt-3 space-y-2">
              {photos.map((file, index) => (
                <li
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-hairline bg-white px-4 py-2.5 text-sm"
                >
                  <span className="min-w-0 truncate text-ink">{file.name}</span>
                  <span className="flex shrink-0 items-center gap-3">
                    <span className="text-xs text-ink-muted">
                      {formatBytes(file.size)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="rounded-full p-1 text-ink-muted transition-colors hover:bg-surface hover:text-brand"
                      aria-label={`${file.name} verwijderen`}
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </span>
                </li>
              ))}
              <li className="px-1 text-xs text-ink-muted">
                {photos.length}/{MAX_PHOTOS} foto&apos;s ·{" "}
                {formatBytes(totalPhotoBytes)} totaal
              </li>
            </ul>
          )}

          {form.photos.whatsappPrompt && whatsappHref && (
            <p className="mt-3 text-sm text-ink-muted">
              {form.photos.whatsappPrompt}{" "}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { plaats: "formulier" })}
                className="inline-flex items-center gap-1 font-semibold text-brand underline-offset-2 hover:underline"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Stuur ze via WhatsApp
              </a>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${uid}-bericht`}
            className="block text-sm font-medium text-ink"
          >
            Omschrijving{" "}
            <span className="font-normal text-ink-muted">(optioneel)</span>
          </label>
          <textarea
            id={`${uid}-bericht`}
            name="bericht"
            rows={4}
            value={fields.bericht}
            onChange={(event) => update("bericht", event.target.value)}
            placeholder="Alles wat wij volgens u moeten weten om goed in te schatten."
            className={`mt-2 resize-y ${fieldClass(false)}`}
          />
        </div>

        {/* Honeypot — onzichtbaar voor bezoekers, ingevuld door bots. */}
        <div
          aria-hidden="true"
          className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
        >
          <label htmlFor={`${uid}-${HONEYPOT_FIELD}`}>
            Laat dit veld leeg
            <input
              id={`${uid}-${HONEYPOT_FIELD}`}
              name={HONEYPOT_FIELD}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </label>
        </div>
      </fieldset>

      {/* Contactgegevens */}
      <fieldset className="space-y-5">
        <legend className="font-display text-xs font-bold uppercase tracking-[0.12em] text-brand-light">
          {form.contact.title}
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          {form.contact.fields.map(renderField)}
        </div>
      </fieldset>

      {/* Verzenden */}
      <div className="space-y-3">
        {submitError && (
          <p
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <CircleAlert
              className="mt-0.5 h-4 w-4 shrink-0"
              aria-hidden="true"
            />
            {submitError}
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 font-semibold text-brand-dark shadow-soft transition-colors hover:bg-accent-dark hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting && (
            <LoaderCircle
              className="h-5 w-5 animate-spin"
              aria-hidden="true"
            />
          )}
          {submitting ? "Bezig met verzenden…" : form.submitLabel}
        </button>
        <p className="text-center text-xs text-ink-muted">
          {form.reassurance}
        </p>
      </div>
    </form>
  );
}

/* ---------------------------------------------------------------------- */

function FieldLabel({ id, field }: { id: string; field: PpcField }) {
  return (
    <>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {field.label}
        {field.required && <span className="ml-0.5 text-accent-dark">*</span>}
        {field.optional && (
          <span className="ml-1 font-normal text-ink-muted">(optioneel)</span>
        )}
      </label>
      {field.help && (
        <p className="mt-1 text-sm leading-relaxed text-ink-muted">
          {field.help}
        </p>
      )}
    </>
  );
}

function FieldError({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      id={id}
      className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600"
    >
      <CircleAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}
