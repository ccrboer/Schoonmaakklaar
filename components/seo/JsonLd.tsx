import { siteConfig } from "@/config/site";
import type { FaqItem } from "@/types";

/**
 * Structured data, opgebouwd uit échte gegevens uit config/site.ts.
 *
 * Bewust NIET opgenomen: LocalBusiness met adres of openingstijden, reviews,
 * sterren, aggregateRating, prijzen en certificaten. Die gegevens zijn er
 * (nog) niet, en verzonnen structured data is een risico in plaats van winst.
 * Zodra er een geverifieerd vestigingsadres is, kan LocalBusiness hier bij.
 */

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Vertrouwde build-time data; JSON.stringify levert veilige output.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Organisatie + website, één keer per pagina via de root layout. */
export function OrganizationJsonLd() {
  const { contact } = siteConfig;

  const organization: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: contact.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    // Enkel opnemen wat echt ingevuld is: lege velden in structured data
    // leveren niets op en kloppende data is hier het hele punt.
    ...(contact.phoneE164 ? { telephone: contact.phoneE164 } : {}),
    ...(contact.email ? { email: contact.email } : {}),
    ...(contact.vat ? { vatID: contact.vat } : {}),
    areaServed: {
      "@type": "AdministrativeArea",
      name: contact.serviceArea,
    },
  };

  const website: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: siteConfig.locale,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };

  return (
    <>
      <JsonLdScript data={organization} />
      <JsonLdScript data={website} />
    </>
  );
}

interface ServiceJsonLdProps {
  name: string;
  description: string;
  /** Pad van de pagina, bv. "/horecaschoonmaak". */
  path: string;
  /** Specifieker werkgebied, bv. "Antwerpen". */
  areaServed?: string;
}

/** Service-schema voor een dienst- of lokale pagina. */
export function ServiceJsonLd({
  name,
  description,
  path,
  areaServed,
}: ServiceJsonLdProps) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: name,
    url: `${siteConfig.url}${path}`,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: {
      "@type": "AdministrativeArea",
      name: areaServed ?? siteConfig.contact.serviceArea,
    },
  };

  return <JsonLdScript data={data} />;
}

export interface Crumb {
  name: string;
  /** Pad zonder domein, bv. "/horecaschoonmaak". */
  path: string;
}

/** Kruimelpad-schema. Geef altijd het volledige pad door, inclusief Home. */
export function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };

  return <JsonLdScript data={data} />;
}

/** FAQ-schema. Gebruik dit enkel als de vragen ook zichtbaar op de pagina staan. */
export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  if (items.length === 0) return null;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return <JsonLdScript data={data} />;
}
