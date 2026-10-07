import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Genereert /robots.txt. Alles mag gecrawld worden behalve de bedankpagina en
 * de API-route, met een verwijzing naar de sitemap.
 */
export const dynamic = "force-static";
export const revalidate = false;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/bedankt", "/api/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
