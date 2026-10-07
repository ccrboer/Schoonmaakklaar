import type { SiteConfig } from "@/types";

/**
 * Globale siteconfiguratie — de enige plaats waar identiteit en
 * contactgegevens staan. Componenten hardcoderen nooit een telefoonnummer,
 * e-mailadres of URL.
 *
 * Contactgegevens komen uit environment variables, zodat ze per omgeving
 * ingevuld kunnen worden zonder codewijziging. Zolang een waarde ontbreekt,
 * blijft ze leeg en verbergt de site de bijbehorende knop. Er worden bewust
 * géén gegevens van een ander merk of verzonnen gegevens getoond.
 *
 * Nog in te vullen vóór livegang (zie .env.example):
 *   NEXT_PUBLIC_CONTACT_PHONE, NEXT_PUBLIC_WHATSAPP_NUMBER,
 *   NEXT_PUBLIC_CONTACT_EMAIL, NEXT_PUBLIC_COMPANY_NUMBER,
 *   NEXT_PUBLIC_COMPANY_VAT
 */

/** Productiedomein. Zonder www: www.schoonmaakklaar.be redirect hiernaartoe. */
const PRODUCTION_URL = "https://schoonmaakklaar.be";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_URL).replace(
  /\/$/,
  "",
);

const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || undefined;
/** tel:-link verwacht E.164: enkel cijfers en een leidende plus. */
const phoneE164 = phone ? `+${phone.replace(/\D/g, "")}` : undefined;
/** wa.me verwacht enkel cijfers. */
const whatsapp =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || undefined;

export const siteConfig: SiteConfig = {
  name: "SchoonmaakKlaar",
  tagline: "Professionele schoonmaak voor bedrijven, horeca en vastgoed",
  description:
    "SchoonmaakKlaar verzorgt professionele schoonmaak voor horeca, bedrijven " +
    "en vastgoed in Antwerpen en omgeving: periodieke bedrijfsschoonmaak, " +
    "horecakeukens, eindschoonmaak voor de plaatsbeschrijving en " +
    "opleveringsschoonmaak na werken.",
  url: siteUrl,
  locale: "nl-BE",
  contact: {
    // Publieke handelsnaam. Geen "BV" tot die rechtsvorm van toepassing is.
    legalName: "SchoonmaakKlaar",
    companyNumber: process.env.NEXT_PUBLIC_COMPANY_NUMBER?.trim() || undefined,
    vat: process.env.NEXT_PUBLIC_COMPANY_VAT?.trim() || undefined,
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || undefined,
    phone,
    phoneE164,
    whatsapp,
    // Bewust geen adres: de positionering is het werkgebied, niet een vestiging.
    openingHours: "Ma–za 08:00–18:00, schoonmaak ook buiten de openingsuren",
    serviceArea: "Antwerpen en omgeving",
  },
};

/** True zodra er een telefoonnummer is; stuurt de zichtbaarheid van bel-CTA's. */
export const hasPhone = Boolean(siteConfig.contact.phoneE164);
/** True zodra er een WhatsApp-nummer is. */
export const hasWhatsApp = Boolean(siteConfig.contact.whatsapp);
/** True zodra er een e-mailadres is. */
export const hasEmail = Boolean(siteConfig.contact.email);

/**
 * Beschrijft in lopende tekst hoe men ons bereikt, op basis van de gegevens
 * die effectief ingevuld zijn. Gebruikt in de juridische pagina's, zodat daar
 * nooit een leeg of verzonnen adres in een zin terechtkomt.
 */
export function contactSentence(): string {
  const { email, phone } = siteConfig.contact;
  if (email && phone) return `via ${email} of telefonisch op ${phone}`;
  if (email) return `via ${email}`;
  if (phone) return `telefonisch op ${phone}`;
  return `via het contactformulier op ${siteConfig.url}/offerte`;
}

/** Korte variant: enkel het e-mailkanaal, met terugval op het formulier. */
export function mailOrFormSentence(): string {
  const { email } = siteConfig.contact;
  return email
    ? `mail ons gerust op ${email}`
    : `neem contact op via het formulier op ${siteConfig.url}/contact`;
}

/** Externe merken binnen dezelfde familie, enkel bestaande en geldige links. */
export const partnerSites = [
  {
    name: "VastgoedKlaar",
    description: "Panden leeghalen, ontruimen en klaarmaken voor overdracht.",
    href: "https://www.vastgoedklaar.be",
  },
] as const;
