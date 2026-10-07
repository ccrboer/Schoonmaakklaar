import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/sections/service/ServicePageTemplate";
import { getServicePage, serviceMetadata } from "@/config/service-pages";

const SLUG = "schoonmaak-voor-plaatsbeschrijving";

export const metadata: Metadata = serviceMetadata(SLUG);

export const dynamic = "force-static";
export const revalidate = false;

export default function Page() {
  return <ServicePageTemplate service={getServicePage(SLUG)} />;
}
