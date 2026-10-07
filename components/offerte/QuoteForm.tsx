"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useRouter } from "next/navigation";
import { Upload, X, LoaderCircle, CircleAlert } from "lucide-react";
import {
  validateQuote,
  blocksForService,
  EMPTY_QUOTE,
  SERVICE_OPTIONS,
  HORECA_TYPE_OPTIONS,
  HORECA_SCOPE_OPTIONS,
  FREQUENTIE_OPTIONS,
  MOMENT_OPTIONS,
  OPPERVLAKTE_OPTIONS,
  WONINGTYPE_OPTIONS,
  SLAAPKAMER_OPTIONS,
  INBOEDEL_OPTIONS,
  JA_NEE_OPTIONS,
  PANDTYPE_OPTIONS,
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

/** De querystring als externe bron: leeg tijdens prerender, echt na hydratatie. */
function subscribeToUrl(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}
function readSearch() {
  return window.location.search;
}
function readNoSearch() {
  return "";
}

/**
 * Offerteformulier met conditionele velden: de vragen volgen de gekozen
 * dienst, zodat niemand irrelevante velden hoeft in te vullen. De dienst kan
 * vooraf geselecteerd worden via ?dienst= in de URL, bv. vanaf een
 * dienstpagina.
 */
export function QuoteForm() {
  const router = useRouter();
  const uid = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const startedAt = useRef(0);

  const [fields, setFields] = useState<QuoteFields>(EMPTY_QUOTE);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Tijdstip waarop het formulier verscheen — samen met het honeypot-veld de
  // eenvoudige spambeveiliging. Een ref in een effect, zodat de render puur blijft.
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Voorselectie vanuit de URL (bv. /offerte?dienst=plaatsbeschrijving).
  // De querystring komt via useSyncExternalStore binnen: op de server leeg, na
  // hydratatie de echte waarde. useSearchParams kan hier niet, want op een
  // statische pagina blijft de component dan in de Suspense-fallback hangen en
  // hydrateert het formulier nooit.
  const search = useSyncExternalStore(subscribeToUrl, readSearch, readNoSearch);
  const intent = new URLSearchParams(search).get("dienst") ?? "";
  const [appliedIntent, setAppliedIntent] = useState<string | null>(null);
  if (appliedIntent !== intent) {
    setAppliedIntent(intent);
    if (intent && SERVICE_OPTIONS.some((option) => option.value === intent)) {
      setFields((prev) => (prev.dienst ? prev : { ...prev, dienst: intent }));
    }
  }

  const blocks = blocksForService(fields.dienst);

  function update<K extends keyof QuoteFields>(key: K, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function addPhotos(list: FileList | null) {
    if (!list || list.length === 0) return;
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
      (Object.keys(fields) as Array<keyof QuoteFields>).forEach((key) =>
        body.append(key, fields[key]),
      );
      body.append("startedAt", String(startedAt.current));
      const honeypot = (
        document.getElementById(`${uid}-${HONEYPOT_FIELD}`) as HTMLInputElement | null
      )?.value;
      body.append(HONEYPOT_FIELD, honeypot ?? "");
      photos.forEach((file) => body.append("photos", file, file.name));

      const response = await fetch("/api/offerte", { method: "POST", body });

      if (response.ok) {
        trackEvent("offerte_submit", { dienst: fields.dienst });
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

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-10">
      {/* 1 — Uw gegevens */}
      <fieldset className="space-y-5">
        <legend className="font-display text-xs font-bold uppercase tracking-[0.12em] text-brand-light">
          1 · Uw gegevens
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            uid={uid}
            name="naam"
            label="Naam"
            required
            autoComplete="name"
            value={fields.naam}
            error={errors.naam}
            onChange={(value) => update("naam", value)}
          />
          <TextField
            uid={uid}
            name="bedrijf"
            label="Bedrijf of zaak"
            optional
            autoComplete="organization"
            value={fields.bedrijf}
            onChange={(value) => update("bedrijf", value)}
          />
          <TextField
            uid={uid}
            name="telefoon"
            label="Telefoonnummer"
            type="tel"
            required
            autoComplete="tel"
            value={fields.telefoon}
            error={errors.telefoon}
            onChange={(value) => update("telefoon", value)}
          />
          <TextField
            uid={uid}
            name="email"
            label="E-mailadres"
            type="email"
            required
            autoComplete="email"
            value={fields.email}
            error={errors.email}
            onChange={(value) => update("email", value)}
          />
          <div className="grid grid-cols-[7rem_1fr] gap-3">
            <TextField
              uid={uid}
              name="postcode"
              label="Postcode"
              required
              autoComplete="postal-code"
              inputMode="numeric"
              value={fields.postcode}
              error={errors.postcode}
              onChange={(value) => update("postcode", value)}
            />
            <TextField
              uid={uid}
              name="gemeente"
              label="Gemeente"
              required
              autoComplete="address-level2"
              value={fields.gemeente}
              error={errors.gemeente}
              onChange={(value) => update("gemeente", value)}
            />
          </div>
        </div>
      </fieldset>

      {/* 2 — De opdracht */}
      <fieldset className="space-y-6">
        <legend className="font-display text-xs font-bold uppercase tracking-[0.12em] text-brand-light">
          2 · De opdracht
        </legend>

        <RadioCards
          uid={uid}
          name="dienst"
          label="Waarvoor wilt u een offerte?"
          required
          options={SERVICE_OPTIONS.map((option) => option.label)}
          values={SERVICE_OPTIONS.map((option) => option.value)}
          value={fields.dienst}
          error={errors.dienst}
          onChange={(value) => update("dienst", value)}
        />

        {/* Horeca */}
        {blocks.horeca && (
          <div className="space-y-6 rounded-2xl border border-hairline bg-surface p-5 sm:p-6">
            <RadioCards
              uid={uid}
              name="horecaType"
              label="Om welk type zaak gaat het?"
              required
              compact
              options={[...HORECA_TYPE_OPTIONS]}
              value={fields.horecaType}
              error={errors.horecaType}
              onChange={(value) => update("horecaType", value)}
            />
            <RadioCards
              uid={uid}
              name="horecaOmvang"
              label="Wat moet er schoongemaakt worden?"
              compact
              options={[...HORECA_SCOPE_OPTIONS]}
              value={fields.horecaOmvang}
              onChange={(value) => update("horecaOmvang", value)}
            />
          </div>
        )}

        {/* Frequentie en moment */}
        {blocks.periodiek && (
          <div className="space-y-6 rounded-2xl border border-hairline bg-surface p-5 sm:p-6">
            <RadioCards
              uid={uid}
              name="frequentie"
              label="Hoe vaak wilt u dat wij komen?"
              compact
              options={[...FREQUENTIE_OPTIONS]}
              value={fields.frequentie}
              onChange={(value) => update("frequentie", value)}
            />
            <RadioCards
              uid={uid}
              name="moment"
              label="Op welk moment werken wij het best?"
              compact
              options={[...MOMENT_OPTIONS]}
              value={fields.moment}
              onChange={(value) => update("moment", value)}
            />
          </div>
        )}

        {/* Pand en werken */}
        {blocks.pand && (
          <div className="space-y-6 rounded-2xl border border-hairline bg-surface p-5 sm:p-6">
            <RadioCards
              uid={uid}
              name="pandtype"
              label="Om wat voor pand of werken gaat het?"
              compact
              options={[...PANDTYPE_OPTIONS]}
              value={fields.pandtype}
              onChange={(value) => update("pandtype", value)}
            />
            <RadioCards
              uid={uid}
              name="oppervlakte"
              label="Hoe groot is de ruimte ongeveer?"
              compact
              options={[...OPPERVLAKTE_OPTIONS]}
              value={fields.oppervlakte}
              onChange={(value) => update("oppervlakte", value)}
            />
          </div>
        )}

        {/* Plaatsbeschrijving */}
        {blocks.plaatsbeschrijving && (
          <div className="space-y-6 rounded-2xl border border-hairline bg-surface p-5 sm:p-6">
            <p className="text-sm leading-relaxed text-ink-muted">
              Op basis van deze gegevens plannen wij de eindschoonmaak ruim vóór
              uw plaatsbeschrijving.
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              <DateField
                uid={uid}
                name="datumPlaatsbeschrijving"
                label="Datum plaatsbeschrijving"
                required
                value={fields.datumPlaatsbeschrijving}
                error={errors.datumPlaatsbeschrijving}
                onChange={(value) => update("datumPlaatsbeschrijving", value)}
              />
              <DateField
                uid={uid}
                name="datumSleuteloverdracht"
                label="Datum sleuteloverdracht"
                optional
                value={fields.datumSleuteloverdracht}
                onChange={(value) => update("datumSleuteloverdracht", value)}
              />
            </div>

            <RadioCards
              uid={uid}
              name="woningtype"
              label="Type woning"
              compact
              options={[...WONINGTYPE_OPTIONS]}
              value={fields.woningtype}
              onChange={(value) => update("woningtype", value)}
            />
            <RadioCards
              uid={uid}
              name="oppervlakte"
              label="Oppervlakte"
              compact
              options={[...OPPERVLAKTE_OPTIONS]}
              value={fields.oppervlakte}
              onChange={(value) => update("oppervlakte", value)}
            />
            <RadioCards
              uid={uid}
              name="slaapkamers"
              label="Aantal slaapkamers"
              compact
              options={[...SLAAPKAMER_OPTIONS]}
              value={fields.slaapkamers}
              onChange={(value) => update("slaapkamers", value)}
            />
            <RadioCards
              uid={uid}
              name="inboedel"
              label="Staat van de woning"
              compact
              options={[...INBOEDEL_OPTIONS]}
              value={fields.inboedel}
              onChange={(value) => update("inboedel", value)}
            />

            <div className="space-y-6">
              <RadioCards
                uid={uid}
                name="oven"
                label="Oven reinigen?"
                compact
                options={[...JA_NEE_OPTIONS]}
                value={fields.oven}
                onChange={(value) => update("oven", value)}
              />
              <RadioCards
                uid={uid}
                name="koelkast"
                label="Koelkast reinigen?"
                compact
                options={[...JA_NEE_OPTIONS]}
                value={fields.koelkast}
                onChange={(value) => update("koelkast", value)}
              />
              <RadioCards
                uid={uid}
                name="ramen"
                label="Ramen reinigen?"
                compact
                options={[...JA_NEE_OPTIONS]}
                value={fields.ramen}
                onChange={(value) => update("ramen", value)}
              />
            </div>
          </div>
        )}

        {/* Gewenste datum — niet bij plaatsbeschrijving, daar staan al twee data */}
        {!blocks.plaatsbeschrijving && (
          <DateField
            uid={uid}
            name="datum"
            label="Gewenste startdatum"
            optional
            value={fields.datum}
            onChange={(value) => update("datum", value)}
            className="sm:max-w-xs"
          />
        )}
      </fieldset>

      {/* 3 — Foto's en toelichting */}
      <fieldset className="space-y-5">
        <legend className="font-display text-xs font-bold uppercase tracking-[0.12em] text-brand-light">
          3 · Foto&apos;s en toelichting
        </legend>

        <div>
          <span className="block text-sm font-medium text-ink">
            Foto&apos;s van de ruimte{" "}
            <span className="font-normal text-ink-muted">(optioneel)</span>
          </span>
          <p className="mt-1 text-sm leading-relaxed text-ink-muted">
            Met enkele foto&apos;s kunnen wij de omvang beter inschatten en
            sneller een gerichte offerte maken.
          </p>

          <label
            htmlFor={`${uid}-photos`}
            className="mt-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-hairline bg-surface px-6 py-8 text-center transition-colors hover:border-accent hover:bg-accent-soft/50"
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

          {photoError && (
            <p className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
              <CircleAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
              {photoError}
            </p>
          )}

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
        </div>

        <div>
          <label
            htmlFor={`${uid}-bericht`}
            className="block text-sm font-medium text-ink"
          >
            Bericht{" "}
            <span className="font-normal text-ink-muted">(optioneel)</span>
          </label>
          <textarea
            id={`${uid}-bericht`}
            name="bericht"
            rows={4}
            value={fields.bericht}
            onChange={(event) => update("bericht", event.target.value)}
            placeholder="Bijvoorbeeld: twee verdiepingen, keuken met friteuse, toegang via de achterzijde, sleutel bij de buren."
            className={`mt-2 resize-y ${fieldClass(false)}`}
          />
        </div>

        {/* Honeypot — verborgen voor bezoekers, ingevuld door bots. */}
        <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
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

      {/* Verzenden */}
      <div className="space-y-3">
        {submitError && (
          <p
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {submitError}
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-base font-semibold text-white shadow-soft transition-colors hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting && (
            <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
          )}
          {submitting ? "Bezig met verzenden…" : "Vraag mijn offerte aan"}
        </button>
        <p className="text-center text-sm text-ink-muted">
          Vrijblijvend — u zit nergens aan vast.
        </p>
      </div>
    </form>
  );
}

/* ---------- Herbruikbare velden ---------- */

interface TextFieldProps {
  uid: string;
  name: keyof QuoteFields;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  optional?: boolean;
  type?: string;
  autoComplete?: string;
  inputMode?: "text" | "numeric" | "tel" | "email";
}

function TextField({
  uid,
  name,
  label,
  value,
  onChange,
  error,
  required,
  optional,
  type = "text",
  autoComplete,
  inputMode,
}: TextFieldProps) {
  const id = `${uid}-${name}`;
  const errorId = `${id}-error`;

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
        {required && <span className="ml-0.5 text-accent-dark">*</span>}
        {optional && (
          <span className="ml-1 font-normal text-ink-muted">(optioneel)</span>
        )}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`mt-2 ${fieldClass(Boolean(error))}`}
      />
      {error && (
        <p
          id={errorId}
          className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600"
        >
          <CircleAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

interface DateFieldProps {
  uid: string;
  name: keyof QuoteFields;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  optional?: boolean;
  className?: string;
}

function DateField({
  uid,
  name,
  label,
  value,
  onChange,
  error,
  required,
  optional,
  className,
}: DateFieldProps) {
  const id = `${uid}-${name}`;
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
        {required && <span className="ml-0.5 text-accent-dark">*</span>}
        {optional && (
          <span className="ml-1 font-normal text-ink-muted">(optioneel)</span>
        )}
      </label>
      <input
        id={id}
        name={name}
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`mt-2 ${fieldClass(Boolean(error))}`}
      />
      {error && (
        <p
          id={errorId}
          className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600"
        >
          <CircleAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

interface RadioCardsProps {
  uid: string;
  name: keyof QuoteFields;
  label: string;
  options: readonly string[];
  /** Waarden die verstuurd worden; standaard gelijk aan de labels. */
  values?: readonly string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  compact?: boolean;
}

function RadioCards({
  uid,
  name,
  label,
  options,
  values,
  value,
  onChange,
  error,
  required,
  compact,
}: RadioCardsProps) {
  const errorId = `${uid}-${name}-error`;

  return (
    <fieldset
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? errorId : undefined}
    >
      <legend className="text-sm font-medium text-ink">
        {label}
        {required && <span className="ml-0.5 text-accent-dark">*</span>}
      </legend>
      <div
        className={`mt-3 grid gap-2.5 ${
          compact
            ? "grid-cols-2 sm:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {options.map((option, index) => {
          const optionValue = values?.[index] ?? option;
          // Het eerste veld draagt het veld-id, zodat validatie erheen kan focussen.
          const id = index === 0 ? `${uid}-${name}` : `${uid}-${name}-${index}`;
          const checked = value === optionValue;

          return (
            <label
              key={optionValue}
              htmlFor={id}
              className={`flex h-full cursor-pointer items-start gap-2.5 rounded-xl border px-4 py-3 text-sm transition-colors ${
                checked
                  ? "border-brand bg-accent-soft text-brand"
                  : "border-hairline bg-white text-ink hover:border-accent"
              }`}
            >
              <input
                id={id}
                type="radio"
                name={name}
                value={optionValue}
                checked={checked}
                onChange={() => onChange(optionValue)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-brand"
              />
              <span className="min-w-0 font-medium leading-snug break-words">
                {option}
              </span>
            </label>
          );
        })}
      </div>
      {error && (
        <p
          id={errorId}
          className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600"
        >
          <CircleAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </fieldset>
  );
}
