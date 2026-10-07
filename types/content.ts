/**
 * Contentmodel voor de marketingpagina's: diensten, doelgroepen, navigatie en
 * de herbruikbare conversie-elementen.
 */

import type { LucideIcon } from "lucide-react";

/** Korte, URL-veilige identificatie van een content-entiteit. */
export type Slug = string;

/**
 * Een verwijzing naar een afbeelding met Nederlandse alt-tekst.
 * Breedte en hoogte zijn verplicht: daarmee reserveert next/image de ruimte
 * en treedt er geen layout shift op.
 */
export interface ImageRef {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** CSS object-position, enkel waar het onderwerp niet gecentreerd staat. */
  objectPosition?: string;
}

/** Een eenvoudige interne link (label + href). */
export interface LocalLink {
  label: string;
  href: string;
}

/** Eén stap in de "Hoe werkt het?"-sectie. */
export interface ProcessStep {
  title: string;
  description: string;
}

/** Eén vraag-antwoordcombinatie. */
export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Een dienst zoals ze in overzichten en navigatie verschijnt.
 * De volledige paginacontent staat in `ServicePageData`.
 */
export interface Service {
  slug: Slug;
  /** Weergavenaam, bv. "Horecaschoonmaak". */
  title: string;
  /** Eén regel voor cards en navigatie. */
  shortDescription: string;
  icon: LucideIcon;
  /** Route naar de dienstpagina, bv. "/horecaschoonmaak". */
  href: string;
  /** Korte opsomming van wat de dienst omvat. */
  features: string[];
  /** Doelgroep-slugs waarvoor deze dienst het meest relevant is. */
  audiences?: Slug[];
  /** Uitlichten in overzichten en op de homepage. */
  featured?: boolean;
}

/** Een klantsegment (horeca, kantoren, verhuurders, ...). */
export interface Audience {
  slug: Slug;
  title: string;
  /** Het concrete probleem of de situatie van dit segment. */
  painPoint: string;
  /** Hoe wij dat oplossen. */
  valueProposition: string;
  icon: LucideIcon;
  /** Dienst-slugs die het best aansluiten. */
  services?: Slug[];
}

/** Een navigatie-item, optioneel genest voor dropdowns. */
export interface NavItem {
  label: string;
  href: string;
  /** Beschrijving voor mega-menu-stijl dropdowns. */
  description?: string;
  icon?: LucideIcon;
  children?: NavItem[];
  /** Opent in een nieuw tabblad. */
  external?: boolean;
}

/** Een gegroepeerde set navigatie-items, voor de footerkolommen. */
export interface NavGroup {
  title: string;
  items: NavItem[];
}

/** Cross-sellblok onderaan een dienstpagina. */
export interface CrossSell {
  title: string;
  text: string;
  links: LocalLink[];
  ctaLabel?: string;
  ctaHref?: string;
}

/**
 * Volledig datamodel voor een dienstpagina. Eén herbruikbaar template
 * (ServicePageTemplate) rendert elke entry uit deze lijst.
 */
export interface ServicePageData {
  slug: Slug;
  /** Weergavenaam van de dienst. */
  name: string;
  icon: LucideIcon;

  /** SEO-titel (merknaam wordt door het metadata-template toegevoegd). */
  seoTitle: string;
  seoDescription: string;

  /** Klein label boven de hero-titel. */
  eyebrow: string;
  heroTitle: string;
  heroIntro: string;
  /**
   * Kaart naast de hero. Vat in één oogopslag samen wat de dienst inhoudt —
   * of, bij een datumgedreven dienst, welke data wij nodig hebben.
   */
  heroCard: {
    title: string;
    items: string[];
    footnote?: string;
  };

  /** Intro van de "Wat doen we precies?"-sectie. */
  whatWeDoText?: string;
  /** Concrete klantsituaties ("Herkenbaar?"). */
  commonSituations?: string[];
  /** Kernvoordelen in de "Wat doen we precies?"-sectie. */
  primaryBenefits: string[];
  /** Checklist voor de "Wat is inbegrepen?"-sectie. */
  includedItems: string[];
  /** Optionele tweede checklist (bv. "In overleg / meerwerk"). */
  optionalItems?: string[];
  /** De "Hoe werkt het?"-stappen. */
  processSteps: ProcessStep[];
  /** Voor wie deze dienst bedoeld is. */
  forWho?: string[];
  faq: FaqItem[];

  /** Vooringevuld WhatsApp-bericht voor de CTA's op deze pagina. */
  whatsappMessage: string;
  /** Voorselectie in het offerteformulier, bv. "/offerte?dienst=horeca". */
  quoteIntent: string;

  /** Eigen tekst voor de prijssectie (valt anders terug op de standaard). */
  pricingText?: string;
  /** Cross-sellblok naar aanvullende diensten. */
  crossSell?: CrossSell;

  /** Beeld naast de hero. Zonder foto blijft de hero tekst + kaart. */
  heroImage?: ImageRef;
  /** Optioneel tweede beeld lager op de pagina, met bijschrift. */
  calloutImage?: ImageRef & { caption?: string };
}

/**
 * Datamodel voor een lokale SEO-landingspagina, bv.
 * "/horecaschoonmaak/antwerpen". Gegenereerd uit dienst + locatie.
 */
export interface LocalPageData {
  /** Slug van de bovenliggende dienst, bv. "horecaschoonmaak". */
  serviceSlug: Slug;
  /** Slug van de locatie, bv. "antwerpen". */
  citySlug: Slug;
  /** Volledig pad, bv. "/horecaschoonmaak/antwerpen". */
  path: string;

  serviceName: string;
  locationName: string;
  /** True voor de centrale stad/hub, false voor een deelgemeente. */
  isHub: boolean;

  h1: string;
  metaTitle: string;
  metaDescription: string;

  eyebrow: string;
  /** Locatie- en dienstspecifieke introductie. */
  intro: string;
  /** Locatiespecifieke context (type panden, buurten). */
  localContext: string;
  /** Locatiespecifieke aandachtspunten (toegang, timing, parkeren). */
  localConsiderations: string[];

  /** "Wanneer schakelt u ons in?" */
  whenToUse: string[];
  /** "Wat doen we precies?" */
  whatWeDo: string[];
  /** Voor wie deze pagina bedoeld is. */
  forWho: string[];
  processSteps: ProcessStep[];
  /** "Ook actief in de omgeving". */
  nearbyAreas: string[];
  /** Interne links naar hoofddiensten en andere lokale pagina's. */
  relatedLinks: LocalLink[];
  faq: FaqItem[];

  whatsappMessage: string;
  quoteIntent: string;
  /** Beeld bij deze lokale pagina; per dienst gekozen uit een kleine set. */
  image?: ImageRef;
}
