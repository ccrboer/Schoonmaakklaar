import "server-only";
import { siteConfig } from "@/config/site";
import { SERVICE_OPTIONS, META_FIELDS, type QuoteFields } from "@/lib/offerte";

interface Attachment {
  filename: string;
  /** base64-gecodeerde inhoud. */
  content: string;
}

export interface SendLeadResult {
  ok: boolean;
  /** Reden bij mislukking, voor logging — niet één op één naar de gebruiker. */
  error?: string;
}

const LABELS: Record<keyof QuoteFields, string> = {
  naam: "Naam",
  bedrijf: "Bedrijf of zaak",
  telefoon: "Telefoon",
  email: "E-mail",
  postcode: "Postcode",
  gemeente: "Gemeente",
  dienst: "Gewenste dienst",
  datum: "Gewenste datum",
  bericht: "Bericht",
  horecaType: "Type zaak",
  horecaOmvang: "Type schoonmaak",
  frequentie: "Frequentie",
  moment: "Moment van de dag",
  oppervlakte: "Oppervlakte",
  pandtype: "Type pand of werken",
  woningtype: "Type woning",
  slaapkamers: "Aantal slaapkamers",
  inboedel: "Staat van de woning",
  datumPlaatsbeschrijving: "Datum plaatsbeschrijving",
  datumSleuteloverdracht: "Datum sleuteloverdracht",
  oven: "Oven reinigen",
  koelkast: "Koelkast reinigen",
  ramen: "Ramen reinigen",
  staat: "Huidige situatie",
  omvang: "Omvang",
  ruimtes: "Te onderhouden ruimtes",
  zones: "Te reinigen zones",
  bedrijfstype: "Type kantoor of bedrijf",
  werkplekken: "Aantal werkplekken",
  sanitair: "Sanitair",
  keuken: "Keuken of kitchenette",
  brand: "Merk",
  leadType: "Type lead",
  landingPage: "Landingspagina",
  utmSource: "utm_source",
  utmMedium: "utm_medium",
  utmCampaign: "utm_campaign",
  utmContent: "utm_content",
  utmTerm: "utm_term",
  gclid: "gclid",
};

const ORDER: Array<keyof QuoteFields> = [
  "naam",
  "bedrijf",
  "telefoon",
  "email",
  "postcode",
  "gemeente",
  "dienst",
  "horecaType",
  "horecaOmvang",
  "frequentie",
  "moment",
  "pandtype",
  "woningtype",
  "oppervlakte",
  "slaapkamers",
  "inboedel",
  "datumPlaatsbeschrijving",
  "datumSleuteloverdracht",
  "bedrijfstype",
  "werkplekken",
  "sanitair",
  "keuken",
  "ruimtes",
  "zones",
  "omvang",
  "staat",
  "oven",
  "koelkast",
  "ramen",
  "datum",
  "bericht",
];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Toont het leesbare dienstlabel in plaats van de interne waarde. */
function displayValue(key: keyof QuoteFields, value: string): string {
  if (key !== "dienst") return value;
  return SERVICE_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

/** Bouwt de tabelrijen voor een lijst velden, lege waarden overgeslagen. */
function rowsFor(
  fields: QuoteFields,
  keys: ReadonlyArray<keyof QuoteFields>,
): string {
  return keys
    .filter((key) => fields[key] && fields[key].trim() !== "")
    .map((key) => {
      const value = escapeHtml(displayValue(key, fields[key])).replace(
        /\n/g,
        "<br>",
      );
      return `<tr>
        <td style="padding:6px 14px 6px 0;color:#5a6b72;vertical-align:top;white-space:nowrap;">${LABELS[key]}</td>
        <td style="padding:6px 0;color:#16262d;">${value}</td>
      </tr>`;
    })
    .join("");
}

function buildHtml(fields: QuoteFields, photoCount: number): string {
  const rows = rowsFor(fields, ORDER);
  const metaRows = rowsFor(fields, META_FIELDS);
  // Een aanvraag via een advertentiepagina vermeldt zijn eigen herkomst.
  const source = fields.landingPage
    ? `Via het formulier op ${escapeHtml(siteConfig.url)}${escapeHtml(fields.landingPage)}`
    : `Via het offerteformulier op ${escapeHtml(siteConfig.url)}/offerte`;

  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;">
    <h2 style="color:#0e3a4a;margin:0 0 4px;">Nieuwe offerte-aanvraag</h2>
    <p style="color:#5a6b72;margin:0 0 18px;">${source}</p>
    <table style="border-collapse:collapse;font-size:14px;">${rows}</table>
    <p style="color:#5a6b72;font-size:13px;margin:18px 0 0;">
      ${
        photoCount > 0
          ? `${photoCount} foto('s) als bijlage toegevoegd.`
          : "Geen foto's meegestuurd."
      }
    </p>
    ${
      metaRows
        ? `<div style="margin-top:22px;padding-top:14px;border-top:1px solid #dbe7ec;">
      <p style="color:#5a6b72;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px;">Herkomst van de aanvraag</p>
      <table style="border-collapse:collapse;font-size:13px;">${metaRows}</table>
    </div>`
        : ""
    }
  </div>`;
}

/**
 * Verstuurt een offerte-lead via de Resend REST API. Geen extra dependency:
 * we praten rechtstreeks met de API. Afzender en ontvanger komen uit de
 * omgevingsvariabelen of de siteconfig, nooit hardcoded in een component.
 */
export async function sendLead(
  fields: QuoteFields,
  attachments: Attachment[],
): Promise<SendLeadResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY ontbreekt" };
  }

  const from = process.env.RESEND_FROM_EMAIL ?? process.env.RESEND_FROM;
  const to = process.env.FORM_TO_EMAIL ?? process.env.LEAD_TO ?? siteConfig.contact.email;

  if (!from) {
    return { ok: false, error: "RESEND_FROM_EMAIL ontbreekt" };
  }
  if (!to) {
    return { ok: false, error: "FORM_TO_EMAIL ontbreekt" };
  }
  const dienst =
    SERVICE_OPTIONS.find((option) => option.value === fields.dienst)?.label ??
    "Offerte";

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: fields.email,
        subject: `${dienst} — ${fields.naam} (${fields.gemeente || fields.postcode})`,
        html: buildHtml(fields, attachments.length),
        attachments,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      return { ok: false, error: `Resend ${response.status}: ${detail}` };
    }

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "network",
    };
  }
}
