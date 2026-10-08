import type { Metadata } from "next";
import { siteConfig, mailOrFormSentence } from "@/config/site";
import {
  LegalPageTemplate,
  type LegalSection,
} from "@/components/sections/legal/LegalPageTemplate";

export const metadata: Metadata = {
  title: "Cookiebeleid",
  description:
    "Welke cookies deze website gebruikt, waarvoor ze dienen en hoe u ze in uw browser beheert.",
  alternates: { canonical: "/cookiebeleid" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/cookiebeleid`,
    siteName: siteConfig.name,
    title: `Cookiebeleid | ${siteConfig.name}`,
    description: "Welke cookies deze website gebruikt en waarvoor ze dienen.",
  },
};

export const dynamic = "force-static";
export const revalidate = false;

const sections: LegalSection[] = [
  {
    heading: "Wat zijn cookies?",
    paragraphs: [
      "Cookies zijn kleine bestanden die een website op uw toestel plaatst. Ze zorgen er onder meer voor dat een site correct werkt, of ze meten hoe bezoekers de site gebruiken.",
    ],
  },
  {
    heading: "Welke cookies gebruiken wij?",
    paragraphs: [
      "Noodzakelijke functies blijven altijd beschikbaar. Uw cookievoorkeuren bewaren we lokaal in uw browser.",
      "Analyse (Google Analytics 4) en marketing/advertentiemetingen zijn optioneel. De toestemmingscategorieën staan standaard op geweigerd.",
    ],
  },
  {
    heading: "Statistieken en advertenties",
    paragraphs: [
      "We gebruiken Google Tag Manager voor het beheren van meettags en Google Analytics 4 voor statistieken wanneer u toestemming geeft. Marketingtoestemming is een aparte keuze.",
      "Consent Mode v2 voorkomt standaard analytische en advertentiecookieopslag. Google-tags kunnen bij geweigerde toestemming beperkte cookieloze signalen sturen.",
    ],
  },
  {
    heading: "Diensten van derden",
    paragraphs: [
      "Wanneer u vanaf onze site doorklikt naar WhatsApp, komt u op een dienst van een andere partij terecht. Op dat moment gelden de voorwaarden en het privacybeleid van die partij. Wij hebben geen controle over de cookies die zij plaatsen.",
    ],
  },
  {
    heading: "Cookies beheren of verwijderen",
    paragraphs: [
      "Via Cookievoorkeuren in de footer kunt u toestemming op elk moment wijzigen of intrekken. Cookies verwijderen kan ook via de browserinstellingen.",
      "Houd er rekening mee dat het blokkeren van noodzakelijke functies invloed kan hebben op onderdelen van de site.",
    ],
  },
  {
    heading: "Vragen over dit cookiebeleid",
    paragraphs: [
      `Heeft u vragen over dit cookiebeleid of over de manier waarop wij gegevens verwerken? ${mailOrFormSentence()[0].toUpperCase() + mailOrFormSentence().slice(1)}. Meer informatie vindt u ook in ons privacybeleid.`,
    ],
  },
];

export default function CookiebeleidPage() {
  return (
    <LegalPageTemplate
      title="Cookiebeleid"
      lastUpdated="Laatst bijgewerkt: 8 oktober 2026"
      intro="Hieronder leest u welke cookies deze website gebruikt, waarvoor ze dienen en hoe u ze zelf beheert."
      sections={sections}
      ctaHeading="Vragen over cookies of privacy?"
    />
  );
}
