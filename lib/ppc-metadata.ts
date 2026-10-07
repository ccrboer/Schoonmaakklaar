import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { PpcPageConfig } from "@/config/ppc-pages";

/**
 * Metadata voor een advertentiepagina.
 *
 * Altijd `noindex, follow`: deze pagina's zijn bedoeld voor betaald verkeer en
 * mogen de organische dienstpagina's niet beconcurreren in de index. De links
 * erop mogen wel gevolgd worden.
 *
 * De canonical wijst naar de pagina zelf, nooit naar een organische pagina.
 * Zou dat wel gebeuren, dan zou de advertentiepagina de signalen van de
 * organische pagina overnemen — precies wat we hier niet willen.
 */
export function ppcMetadata(page: PpcPageConfig): Metadata {
  return {
    title: page.seoTitle,
    description: page.seoDescription,
    robots: { index: false, follow: true },
    alternates: { canonical: page.path },
    openGraph: {
      type: "website",
      url: `${siteConfig.url}${page.path}`,
      siteName: siteConfig.name,
      title: `${page.seoTitle} | ${siteConfig.name}`,
      description: page.seoDescription,
    },
  };
}
