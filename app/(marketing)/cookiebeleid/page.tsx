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
      "Deze website gebruikt momenteel enkel functionele en noodzakelijke cookies. Die zijn nodig om de site te laten werken, bijvoorbeeld om uw offerteaanvraag veilig te versturen.",
      "Er worden op dit moment geen advertentiecookies geplaatst en er wordt geen profiel van u opgebouwd voor marketingdoeleinden.",
    ],
  },
  {
    heading: "Statistieken en advertenties",
    paragraphs: [
      "Wanneer wij later meetsoftware of advertentietools toevoegen — bijvoorbeeld om te zien welke pagina's het vaakst bekeken worden — passen wij dit cookiebeleid aan en vragen wij, waar dat wettelijk vereist is, vooraf uw toestemming.",
      "Zolang dat niet gebeurd is, blijft deze pagina de actuele situatie beschrijven.",
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
      "U beheert cookies altijd zelf via de instellingen van uw browser. Daar kunt u bestaande cookies verwijderen of nieuwe blokkeren.",
      "Houd er rekening mee dat het blokkeren van noodzakelijke cookies ervoor kan zorgen dat bepaalde onderdelen van de site, zoals het offerteformulier, niet meer correct werken.",
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
      lastUpdated="Laatst bijgewerkt: 29 september 2026"
      intro="Hieronder leest u welke cookies deze website gebruikt, waarvoor ze dienen en hoe u ze zelf beheert."
      sections={sections}
      ctaHeading="Vragen over cookies of privacy?"
    />
  );
}
