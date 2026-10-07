import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { SectorBar } from "@/components/sections/SectorBar";
import { Recognition } from "@/components/sections/Recognition";
import { ServiceOverview } from "@/components/sections/ServiceOverview";
import { AudienceSegments } from "@/components/sections/AudienceSegments";
import { ServiceSpotlight } from "@/components/sections/ServiceSpotlight";
import { WhyUs } from "@/components/sections/WhyUs";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { WorkArea } from "@/components/sections/WorkArea";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { homepageSpotlights } from "@/config/homepage";
import { homepageFaq } from "@/config/faq";

export const metadata: Metadata = {
  title: "Schoonmaakbedrijf in Antwerpen voor horeca, bedrijven en vastgoed",
  description:
    "Professionele schoonmaak in Antwerpen en omgeving: horeca, kantoren, " +
    "opleveringen na werken, eindschoonmaak voor de plaatsbeschrijving en " +
    "dieptereiniging. Eenmalig of periodiek, ook buiten de openingsuren.",
  alternates: { canonical: "/" },
};

export const dynamic = "force-static";
export const revalidate = false;

export default function HomePage() {
  return (
    <>
      <FaqJsonLd items={homepageFaq} />
      <Hero />
      <SectorBar />
      <Recognition />
      <ServiceOverview compact />
      <AudienceSegments />

      {homepageSpotlights.map((spotlight) => (
        <ServiceSpotlight key={spotlight.href} {...spotlight} />
      ))}

      <WhyUs />
      <ProcessSteps />
      <WorkArea />
      <Faq
        items={homepageFaq}
        title="Veelgestelde vragen"
        intro="De vragen die wij het vaakst krijgen vóór een eerste opdracht."
        moreHref="/veelgestelde-vragen"
      />
      <FinalCta />
    </>
  );
}
