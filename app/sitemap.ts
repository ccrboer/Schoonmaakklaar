import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { serviceSlugs } from "@/config/service-pages";
import { localPagePaths } from "@/config/local-pages";

/**
 * Genereert /sitemap.xml: de hoofdpagina's, elke dienstpagina uit
 * config/service-pages.ts en elke lokale pagina uit config/local-pages.ts.
 * Zo blijft de sitemap automatisch in sync met de content.
 *
 * /bedankt staat er bewust niet in: die pagina is noindex.
 */
export const dynamic = "force-static";
export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const lastModified = new Date();

  const entries: Array<{ path: string; priority: number }> = [
    { path: "", priority: 1 },
    { path: "/diensten", priority: 0.8 },
    { path: "/offerte", priority: 0.9 },
    { path: "/contact", priority: 0.7 },
    { path: "/veelgestelde-vragen", priority: 0.5 },
    ...serviceSlugs.map((slug) => ({ path: `/${slug}`, priority: 0.8 })),
    ...localPagePaths.map((path) => ({ path, priority: 0.7 })),
    { path: "/privacybeleid", priority: 0.2 },
    { path: "/cookiebeleid", priority: 0.2 },
    { path: "/algemene-voorwaarden", priority: 0.2 },
  ];

  return entries.map(({ path, priority }) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
