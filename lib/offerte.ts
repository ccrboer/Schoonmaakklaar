/**
 * Gedeelde validatie, veldopties en conditionele logica voor de
 * offerte-aanvraag. Wordt zowel client-side (directe feedback) als
 * server-side (bron van waarheid) gebruikt, zodat de regels nooit uiteenlopen.
 */

export interface Option {
  value: string;
  label: string;
}

/** De diensten waaruit de bezoeker kiest. `value` stuurt de conditionele velden. */
export const SERVICE_OPTIONS: Option[] = [
  { value: "horeca", label: "Horecaschoonmaak" },
  { value: "horecakeuken", label: "Horecakeuken dieptereiniging (Kitchen Reset)" },
  { value: "kantoor", label: "Kantoorschoonmaak" },
  { value: "oplevering", label: "Opleveringsschoonmaak na werken" },
  { value: "plaatsbeschrijving", label: "Schoonmaak voor plaatsbeschrijving" },
  { value: "verhuur-verkoop", label: "Verhuur- of verkoopklaar schoonmaak" },
  { value: "traphal", label: "Traphal of gemeenschappelijke delen" },
  { value: "dieptereiniging", label: "Professionele dieptereiniging" },
  { value: "anders", label: "Iets anders" },
];

export const HORECA_TYPE_OPTIONS = [
  "Restaurant",
  "Café",
  "Bar",
  "Hotel",
  "Bakkerij",
  "Frituur",
  "Catering of grootkeuken",
  "Andere",
] as const;

export const HORECA_SCOPE_OPTIONS = [
  "Reguliere schoonmaak",
  "Enkel de keuken",
  "Kitchen Reset (dieptereiniging)",
  "Volledige zaak",
] as const;

export const FREQUENTIE_OPTIONS = [
  "Eenmalig",
  "Dagelijks",
  "Enkele keren per week",
  "Wekelijks",
  "Tweewekelijks",
  "Maandelijks",
  "Nog te bepalen",
] as const;

export const MOMENT_OPTIONS = [
  "Voor de opening",
  "Na sluiting",
  "Overdag",
  "Flexibel",
] as const;

export const OPPERVLAKTE_OPTIONS = [
  "Tot 50 m²",
  "50 – 100 m²",
  "100 – 200 m²",
  "200 – 500 m²",
  "Meer dan 500 m²",
  "Weet ik niet",
] as const;

export const WONINGTYPE_OPTIONS = [
  "Appartement",
  "Studio of kot",
  "Woning",
  "Andere",
] as const;

export const SLAAPKAMER_OPTIONS = [
  "Geen",
  "1",
  "2",
  "3",
  "4 of meer",
] as const;

export const INBOEDEL_OPTIONS = [
  "Volledig leeg",
  "Deels gemeubileerd",
  "Volledig gemeubileerd",
] as const;

export const JA_NEE_OPTIONS = ["Ja", "Nee", "Weet ik nog niet"] as const;

export const PANDTYPE_OPTIONS = [
  "Nieuwbouw",
  "Renovatie of verbouwing",
  "Na schilderwerken",
  "Handels- of bedrijfsruimte",
  "Woning of appartement",
  "Andere",
] as const;

export interface QuoteFields {
  // Contact
  naam: string;
  bedrijf: string;
  telefoon: string;
  email: string;
  postcode: string;
  gemeente: string;
  // Opdracht
  dienst: string;
  datum: string;
  bericht: string;
  // Horeca
  horecaType: string;
  horecaOmvang: string;
  frequentie: string;
  moment: string;
  // Oppervlakte / pand
  oppervlakte: string;
  pandtype: string;
  // Plaatsbeschrijving
  woningtype: string;
  slaapkamers: string;
  inboedel: string;
  datumPlaatsbeschrijving: string;
  datumSleuteloverdracht: string;
  oven: string;
  koelkast: string;
  ramen: string;
  // Extra kwalificatievelden, gebruikt door de PPC-landingspagina's
  staat: string;
  omvang: string;
  ruimtes: string;
  zones: string;
  bedrijfstype: string;
  werkplekken: string;
  sanitair: string;
  keuken: string;
  // Herkomst van de aanvraag — zie META_FIELDS
  brand: string;
  leadType: string;
  landingPage: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  gclid: string;
}

/**
 * Velden die niets over de opdracht zeggen maar over de herkomst van de lead.
 * Ze worden apart gehouden: in de lead-mail staan ze onderaan in een eigen
 * blok, en ze tellen niet mee in de inhoudelijke validatie.
 */
export const META_FIELDS = [
  "brand",
  "leadType",
  "landingPage",
  "utmSource",
  "utmMedium",
  "utmCampaign",
  "utmContent",
  "utmTerm",
  "gclid",
] as const satisfies ReadonlyArray<keyof QuoteFields>;

/** Maximale lengte van een herkomstveld. Houdt vervuilde URL's uit de mail. */
export const MAX_META_LENGTH = 200;

export const EMPTY_QUOTE: QuoteFields = {
  naam: "",
  bedrijf: "",
  telefoon: "",
  email: "",
  postcode: "",
  gemeente: "",
  dienst: "",
  datum: "",
  bericht: "",
  horecaType: "",
  horecaOmvang: "",
  frequentie: "",
  moment: "",
  oppervlakte: "",
  pandtype: "",
  woningtype: "",
  slaapkamers: "",
  inboedel: "",
  datumPlaatsbeschrijving: "",
  datumSleuteloverdracht: "",
  oven: "",
  koelkast: "",
  ramen: "",
  staat: "",
  omvang: "",
  ruimtes: "",
  zones: "",
  bedrijfstype: "",
  werkplekken: "",
  sanitair: "",
  keuken: "",
  brand: "",
  leadType: "",
  landingPage: "",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  utmContent: "",
  utmTerm: "",
  gclid: "",
};

/** Welke conditionele blokken bij een gekozen dienst horen. */
export interface ConditionalBlocks {
  horeca: boolean;
  periodiek: boolean;
  plaatsbeschrijving: boolean;
  pand: boolean;
}

export function blocksForService(dienst: string): ConditionalBlocks {
  return {
    horeca: dienst === "horeca" || dienst === "horecakeuken",
    periodiek:
      dienst === "kantoor" || dienst === "traphal" || dienst === "horeca",
    plaatsbeschrijving: dienst === "plaatsbeschrijving",
    pand:
      dienst === "oplevering" ||
      dienst === "verhuur-verkoop" ||
      dienst === "dieptereiniging",
  };
}

/** Toegestane foto-formaten en limieten. */
export const PHOTO_ACCEPT = ["image/jpeg", "image/png", "image/webp"];
export const PHOTO_ACCEPT_LABEL = "jpg, jpeg, png of webp";
export const MAX_PHOTOS = 5;
export const MAX_PHOTO_BYTES = 5 * 1024 * 1024; // 5 MB per foto
export const MAX_TOTAL_BYTES = 10 * 1024 * 1024; // 10 MB totaal

/** Naam van het honeypot-veld. Wordt door echte bezoekers nooit ingevuld. */
export const HONEYPOT_FIELD = "bedrijfsnaam_extra";
/** Minimale invultijd in ms. Sneller ingediend = vrijwel zeker een bot. */
export const MIN_FILL_MS = 2500;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Belgische en internationale nummers: cijfers, spaties, +, -, (), min. 8 cijfers.
const PHONE_RE = /^[+()\d][\d\s()/.-]{7,}$/;
const POSTCODE_RE = /^\d{4}$/;

export type FieldErrors = Partial<Record<keyof QuoteFields, string>>;

/**
 * Valideert de aanvraag. Retourneert een map van veld → foutmelding.
 * Een leeg object betekent geldig.
 */
export function validateQuote(fields: Partial<QuoteFields>): FieldErrors {
  const errors: FieldErrors = {};
  const empty = (value: string | undefined) => !value || value.trim() === "";

  if (empty(fields.naam)) errors.naam = "Vul uw naam in.";

  if (empty(fields.telefoon)) {
    errors.telefoon = "Vul uw telefoonnummer in.";
  } else if (!PHONE_RE.test(fields.telefoon!.trim())) {
    errors.telefoon = "Vul een geldig telefoonnummer in.";
  }

  if (empty(fields.email)) {
    errors.email = "Vul uw e-mailadres in.";
  } else if (!EMAIL_RE.test(fields.email!.trim())) {
    errors.email = "Vul een geldig e-mailadres in.";
  }

  if (empty(fields.postcode)) {
    errors.postcode = "Vul uw postcode in.";
  } else if (!POSTCODE_RE.test(fields.postcode!.trim())) {
    errors.postcode = "Een Belgische postcode bestaat uit 4 cijfers.";
  }

  if (empty(fields.gemeente)) errors.gemeente = "Vul uw gemeente in.";

  if (empty(fields.dienst)) {
    errors.dienst = "Kies waarvoor u een offerte wilt.";
  } else if (!SERVICE_OPTIONS.some((o) => o.value === fields.dienst)) {
    errors.dienst = "Kies een geldige optie.";
  }

  const blocks = blocksForService(fields.dienst ?? "");

  if (blocks.horeca && empty(fields.horecaType)) {
    errors.horecaType = "Laat ons weten om welk type zaak het gaat.";
  }

  if (blocks.plaatsbeschrijving && empty(fields.datumPlaatsbeschrijving)) {
    errors.datumPlaatsbeschrijving =
      "Vul de datum van de plaatsbeschrijving in — daarop stemmen wij de planning af.";
  }

  return errors;
}
