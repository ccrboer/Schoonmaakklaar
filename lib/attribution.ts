/**
 * Herkomst van advertentieverkeer: de UTM-parameters en gclid uit de URL.
 *
 * Het doel is dat die waarden de hele sessie op de landingspagina overleven,
 * ook wanneer de bezoeker intern doorklikt en de parameters uit de URL
 * verdwijnen. Daarom worden ze één keer gelezen en in sessionStorage bewaard.
 *
 * De parameters worden nooit als instructie gebruikt — enkel doorgegeven aan
 * de lead-mail, waar ze bovendien server-side afgekapt worden.
 */

export interface Attribution {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  gclid: string;
}

export const EMPTY_ATTRIBUTION: Attribution = {
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  utmContent: "",
  utmTerm: "",
  gclid: "",
};

const PARAM_MAP: Array<[keyof Attribution, string]> = [
  ["utmSource", "utm_source"],
  ["utmMedium", "utm_medium"],
  ["utmCampaign", "utm_campaign"],
  ["utmContent", "utm_content"],
  ["utmTerm", "utm_term"],
  ["gclid", "gclid"],
];

const STORAGE_KEY = "skk_attribution";
/** Zelfde grens als server-side, zodat er niets onnodig bewaard wordt. */
const MAX_LENGTH = 200;

function readStored(): Attribution | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Attribution>;
    const result = { ...EMPTY_ATTRIBUTION };
    PARAM_MAP.forEach(([key]) => {
      const value = parsed[key];
      if (typeof value === "string") result[key] = value.slice(0, MAX_LENGTH);
    });
    return result;
  } catch {
    // Privémodus of geblokkeerde opslag: dan werkt de pagina gewoon zonder.
    return null;
  }
}

function store(attribution: Attribution): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    /* Opslag is een gemak, geen vereiste. */
  }
}

function hasAny(attribution: Attribution): boolean {
  return Object.values(attribution).some((value) => value !== "");
}

/**
 * Leest de herkomst uit de huidige URL. Staat er niets in, dan valt de functie
 * terug op wat eerder in deze sessie bewaard werd. Enkel client-side te
 * gebruiken, ná hydratatie.
 */
export function readAttribution(): Attribution {
  if (typeof window === "undefined") return EMPTY_ATTRIBUTION;

  const params = new URLSearchParams(window.location.search);
  const fromUrl = { ...EMPTY_ATTRIBUTION };
  PARAM_MAP.forEach(([key, param]) => {
    fromUrl[key] = (params.get(param) ?? "").trim().slice(0, MAX_LENGTH);
  });

  if (hasAny(fromUrl)) {
    store(fromUrl);
    return fromUrl;
  }

  return readStored() ?? EMPTY_ATTRIBUTION;
}
