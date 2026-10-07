/**
 * Types voor de globale siteconfiguratie: identiteit, contactgegevens,
 * bedrijfsgegevens (NAP) en sociale profielen.
 */

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}

export interface PostalAddress {
  street: string;
  postalCode: string;
  city: string;
  /** Provincie / regio, bv. "Antwerpen". */
  region?: string;
  country: string;
}

/**
 * Naam / adres / telefoon — de canonieke bedrijfsgegevens die gebruikt worden
 * voor lokale SEO, de footer, structured data en de contact-CTA's.
 */
export interface BusinessContact {
  /** Juridische of handelsnaam. */
  legalName: string;
  /** Belgisch ondernemingsnummer, bv. "0XXX.XXX.XXX". */
  companyNumber?: string;
  /** BTW-nummer, bv. "BE0XXXXXXXXX". */
  vat?: string;
  /**
   * Onderstaande velden zijn optioneel: zolang er geen eigen gegevens zijn,
   * blijven ze leeg en verbergt de site de bijbehorende knoppen. Er worden
   * nooit gegevens van een ander merk getoond.
   */
  email?: string;
  /** Leesbaar telefoonnummer, bv. "+32 470 00 00 00". */
  phone?: string;
  /** E.164-nummer voor tel:-links, bv. "+32470000000". */
  phoneE164?: string;
  /** Enkel cijfers, voor wa.me-links, bv. "32470000000". */
  whatsapp?: string;
  /** Administratief adres. Optioneel: enkel tonen als het klopt en nodig is. */
  address?: PostalAddress;
  /** Vrije omschrijving van de bereikbaarheid. */
  openingHours?: string;
  /** Publiek werkgebied, bv. "Antwerpen en omgeving". */
  serviceArea: string;
}

/** De enige bron van waarheid voor site-brede instellingen. */
export interface SiteConfig {
  name: string;
  /** Korte tagline voor hero en metadata. */
  tagline: string;
  description: string;
  /** Absolute productie-URL, zonder slash op het einde. */
  url: string;
  /** Pad naar de standaard Open Graph-afbeelding, relatief t.o.v. /public. */
  ogImage?: string;
  /** Primaire BCP-47 locale, bv. "nl-BE". */
  locale: string;
  contact: BusinessContact;
  social?: SocialLinks;
}
