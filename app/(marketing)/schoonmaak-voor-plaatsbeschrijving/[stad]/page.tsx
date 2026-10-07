import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalSeoPageTemplate } from "@/components/sections/local/LocalSeoPageTemplate";
import { getCitySlugsForService, getLocalPage } from "@/config/local-pages";
import { siteConfig } from "@/config/site";

/**
 * Lokale landingspagina's voor deze dienst, volgens de structuur
 * /<dienst>/<stad>. Enkel de steden uit config/local-pages.ts worden
 * gegenereerd; al de rest geeft een 404.
 */
const SERVICE = "schoonmaak-voor-plaatsbeschrijving";

export const dynamicParams = false;
export const dynamic = "force-static";
export const revalidate = false;

interface PageParams {
  params: Promise<{ stad: string }>;
}

export function generateStaticParams(): Array<{ stad: string }> {
  return getCitySlugsForService(SERVICE).map((stad) => ({ stad }));
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { stad } = await params;
  const page = getLocalPage(SERVICE, stad);

  if (!page) return {};

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: page.path },
    openGraph: {
      type: "website",
      url: `${siteConfig.url}${page.path}`,
      siteName: siteConfig.name,
      title: `${page.metaTitle} | ${siteConfig.name}`,
      description: page.metaDescription,
    },
  };
}

export default async function Page({ params }: PageParams) {
  const { stad } = await params;
  const page = getLocalPage(SERVICE, stad);

  if (!page) notFound();

  return <LocalSeoPageTemplate page={page} />;
}
