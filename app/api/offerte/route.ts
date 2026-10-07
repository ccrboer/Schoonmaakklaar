import { NextResponse } from "next/server";
import {
  validateQuote,
  blocksForService,
  META_FIELDS,
  MAX_META_LENGTH,
  HONEYPOT_FIELD,
  MIN_FILL_MS,
  PHOTO_ACCEPT,
  MAX_PHOTOS,
  MAX_PHOTO_BYTES,
  MAX_TOTAL_BYTES,
  EMPTY_QUOTE,
  type QuoteFields,
} from "@/lib/offerte";
import { sendLead } from "@/lib/send-lead";
import { siteConfig } from "@/config/site";

// Dit is een echte verzend-endpoint: nooit statisch prerenderen.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function str(form: FormData, key: string): string {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/** Verwijst enkel naar contactkanalen die effectief ingevuld zijn. */
function fallbackChannel(): string {
  const { whatsapp, phone, email } = siteConfig.contact;
  if (whatsapp) return "Probeer het opnieuw of stuur uw aanvraag via WhatsApp.";
  if (phone) return `Probeer het opnieuw of bel ons op ${phone}.`;
  if (email) return `Probeer het opnieuw of mail ons op ${email}.`;
  return "Probeer het over enkele minuten opnieuw.";
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Ongeldige aanvraag." },
      { status: 400 },
    );
  }

  // Spambeveiliging 1 — honeypot: enkel bots vullen dit verborgen veld in.
  if (str(form, HONEYPOT_FIELD) !== "") {
    // Geen foutmelding tonen: bots krijgen een "geslaagde" respons.
    return NextResponse.json({ ok: true });
  }

  // Spambeveiliging 2 — invultijd: een formulier binnen enkele seconden
  // ingediend is in de praktijk altijd geautomatiseerd.
  const startedAt = Number(str(form, "startedAt"));
  if (Number.isFinite(startedAt) && startedAt > 0) {
    if (Date.now() - startedAt < MIN_FILL_MS) {
      return NextResponse.json({ ok: true });
    }
  }

  const fields = { ...EMPTY_QUOTE } as QuoteFields;
  (Object.keys(EMPTY_QUOTE) as Array<keyof QuoteFields>).forEach((key) => {
    fields[key] = str(form, key);
  });

  // Herkomstvelden komen uit de URL en zijn dus bezoekersinvoer: ze worden
  // nooit vertrouwd, enkel begrensd meegestuurd voor de rapportage.
  META_FIELDS.forEach((key) => {
    fields[key] = fields[key].slice(0, MAX_META_LENGTH);
  });
  // Enkel een eigen landingspad telt als herkomst; al de rest valt weg.
  if (!/^\/lp\/[a-z0-9-]+$/.test(fields.landingPage)) {
    fields.landingPage = "";
  }
  // Merk en leadtype worden server-side bepaald, niet door de client.
  fields.brand = "schoonmaakklaar";
  fields.leadType = fields.landingPage ? "ppc" : "organisch";

  // Server-side validatie is de bron van waarheid.
  const errors = validateQuote(fields);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  // Velden die niet bij de gekozen dienst horen, worden niet meegestuurd.
  const blocks = blocksForService(fields.dienst);
  if (!blocks.horeca) {
    fields.horecaType = "";
    fields.horecaOmvang = "";
  }
  if (!blocks.horeca && !blocks.periodiek) {
    fields.frequentie = "";
    fields.moment = "";
  }
  if (!blocks.plaatsbeschrijving) {
    fields.woningtype = "";
    fields.slaapkamers = "";
    fields.inboedel = "";
    fields.datumPlaatsbeschrijving = "";
    fields.datumSleuteloverdracht = "";
    fields.oven = "";
    fields.koelkast = "";
    fields.ramen = "";
  }
  if (!blocks.pand) {
    fields.pandtype = "";
  }

  // Foto's valideren en omzetten naar base64 voor de e-mailbijlage.
  const files = form
    .getAll("photos")
    .filter((file): file is File => file instanceof File && file.size > 0);

  if (files.length > MAX_PHOTOS) {
    return NextResponse.json(
      { ok: false, error: `Maximaal ${MAX_PHOTOS} foto's toegestaan.` },
      { status: 400 },
    );
  }

  let total = 0;
  const attachments: Array<{ filename: string; content: string }> = [];
  for (const file of files) {
    if (!PHOTO_ACCEPT.includes(file.type)) {
      return NextResponse.json(
        { ok: false, error: "Alleen jpg, png of webp toegestaan." },
        { status: 400 },
      );
    }
    if (file.size > MAX_PHOTO_BYTES) {
      return NextResponse.json(
        {
          ok: false,
          error: "Eén of meer foto's zijn te groot (max 5 MB per foto).",
        },
        { status: 400 },
      );
    }
    total += file.size;
    if (total > MAX_TOTAL_BYTES) {
      return NextResponse.json(
        {
          ok: false,
          error: "De foto's zijn samen te groot (max 10 MB in totaal).",
        },
        { status: 400 },
      );
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    attachments.push({
      filename: file.name || "foto",
      content: buffer.toString("base64"),
    });
  }

  const result = await sendLead(fields, attachments);
  if (!result.ok) {
    // De technische reden blijft server-side; de bezoeker krijgt enkel een
    // begrijpelijke melding met een alternatief kanaal dat ook echt bestaat.
    console.error("[offerte] verzenden mislukt:", result.error);
    return NextResponse.json(
      { ok: false, error: `Verzenden is mislukt. ${fallbackChannel()}` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
