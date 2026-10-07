import "server-only";
import { siteConfig } from "@/config/site";
import { SERVICE_OPTIONS, type QuoteFields } from "@/lib/offerte";

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

function buildHtml(fields: QuoteFields, photoCount: number): string {
  const rows = ORDER.filter((key) => fields[key] && fields[key].trim() !== "")
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

  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;">
    <h2 style="color:#0e3a4a;margin:0 0 4px;">Nieuwe offerte-aanvraag</h2>
    <p style="color:#5a6b72;margin:0 0 18px;">Via het offerteformulier op ${escapeHtml(
      siteConfig.url,
    )}/offerte</p>
    <table style="border-collapse:collapse;font-size:14px;">${rows}</table>
    <p style="color:#5a6b72;font-size:13px;margin:18px 0 0;">
      ${
        photoCount > 0
          ? `${photoCount} foto('s) als bijlage toegevoegd.`
          : "Geen foto's meegestuurd."
      }
    </p>
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
