import type { Metadata } from "next";
import { siteConfig, contactSentence, mailOrFormSentence } from "@/config/site";
import {
  LegalPageTemplate,
  type LegalSection,
} from "@/components/sections/legal/LegalPageTemplate";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description:
    "Hoe SchoonmaakKlaar omgaat met persoonsgegevens, offerteaanvragen, foto's, WhatsApp-berichten en toegangsgegevens tot uw pand.",
  alternates: { canonical: "/privacybeleid" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/privacybeleid`,
    siteName: siteConfig.name,
    title: `Privacybeleid | ${siteConfig.name}`,
    description:
      "Hoe wij omgaan met uw persoonsgegevens, foto's en aanvragen.",
  },
};

export const dynamic = "force-static";
export const revalidate = false;

const { contact } = siteConfig;

const sections: LegalSection[] = [
  {
    heading: "Wie zijn wij?",
    paragraphs: [
      `Dit privacybeleid is van toepassing op ${siteConfig.name}${contact.vat ? ` (ondernemings-/BTW-nummer ${contact.vat})` : ""}. U bereikt ons ${contactSentence()}.`,
      "Wij gaan zorgvuldig om met de gegevens die u met ons deelt en verwerken niet meer dan nodig is om uw aanvraag te behandelen en onze diensten uit te voeren.",
    ],
  },
  {
    heading: "Welke gegevens verwerken wij?",
    paragraphs: [
      "Afhankelijk van uw aanvraag verwerken wij onder meer de volgende gegevens:",
    ],
    bullets: [
      "Naam en, indien van toepassing, de naam van uw bedrijf of zaak",
      "Telefoonnummer en e-mailadres",
      "Adres, postcode en gemeente van het pand of de zaak",
      "Gegevens over de opdracht: type ruimte, oppervlakte, frequentie, gewenste data",
      "Foto's die u bezorgt via het formulier, WhatsApp of e-mail",
      "Praktische afspraken over toegang, zoals de vermelding dat er een sleutel, badge of code beschikbaar is",
      "Onze communicatiegeschiedenis met u, offertes en facturatiegegevens",
    ],
  },
  {
    heading: "Waarom verwerken wij uw gegevens?",
    paragraphs: ["Wij gebruiken uw gegevens om:"],
    bullets: [
      "Uw aanvraag of vraag te beantwoorden",
      "Een offerte en werkschema op te stellen",
      "De schoonmaakopdracht te plannen en uit te voeren",
      "Onze administratie, facturatie en boekhouding te verzorgen",
      "Te voldoen aan onze wettelijke verplichtingen",
    ],
  },
  {
    heading: "Foto's van uw pand",
    paragraphs: [
      "Foto's helpen ons om de omvang van een opdracht correct in te schatten. Wij gebruiken die beelden enkel voor de offerte en de uitvoering.",
      "Wij publiceren nooit foto's van uw pand op onze website of sociale media zonder uw uitdrukkelijke, voorafgaande toestemming.",
      "Stuur ons geen onnodige gevoelige documenten mee. Vermijd beelden van identiteitsdocumenten, bankgegevens of persoonlijke papieren die niets met de opdracht te maken hebben.",
    ],
  },
  {
    heading: "Toegang tot uw pand",
    paragraphs: [
      "Voor periodiek onderhoud krijgen wij soms een sleutel, badge of toegangscode. Wij gaan daar zorgvuldig mee om, beperken de toegang tot de medewerkers die de opdracht uitvoeren en registreren enkel wat nodig is om de opdracht correct uit te voeren.",
      "Bij het einde van de samenwerking bezorgen wij sleutels en badges terug en verwijderen wij de toegangsgegevens uit onze werking.",
    ],
  },
  {
    heading: "Delen met derden",
    paragraphs: [
      "Wij verkopen uw gegevens niet. Delen gebeurt enkel waar dat nodig is: met onze boekhouding, met IT-, e-mail- en hostingdiensten die wij gebruiken, en wanneer een wettelijke verplichting dit vereist.",
      "Wanneer wij voor een specifieke opdracht met een partner samenwerken, delen wij enkel de gegevens die deze partner nodig heeft om zijn deel van de opdracht uit te voeren.",
    ],
  },
  {
    heading: "Hoe lang bewaren wij gegevens?",
    paragraphs: [
      "Wij bewaren uw gegevens niet langer dan nodig voor de afhandeling van uw aanvraag, de uitvoering van de opdracht, onze administratie en de wettelijke bewaartermijnen die op ons van toepassing zijn.",
    ],
  },
  {
    heading: "Beveiliging",
    paragraphs: [
      "Wij nemen redelijke technische en organisatorische maatregelen om uw gegevens te beschermen tegen verlies, misbruik of ongeoorloofde toegang.",
    ],
  },
  {
    heading: "Cookies",
    paragraphs: [
      "We gebruiken Google Tag Manager en, na uw toestemming, Google Analytics 4 voor statistieken. Marketingtoestemming is apart instelbaar. Optionele opslag is standaard geweigerd.",
      "U kunt uw keuze via Cookievoorkeuren in de footer aanpassen. Het cookiebeleid beschrijft ook de beperkte cookieloze signalen die Google-tags bij geweigerde toestemming kunnen versturen.",
    ],
  },
  {
    heading: "Uw rechten",
    paragraphs: [
      "U heeft recht op inzage, correctie, verwijdering, beperking en bezwaar, en in voorkomend geval op overdraagbaarheid van uw gegevens. Wilt u hiervan gebruikmaken? Neem contact met ons op.",
      "Bent u niet tevreden over hoe wij met uw gegevens omgaan, dan kunt u ook klacht indienen bij de Gegevensbeschermingsautoriteit.",
    ],
  },
  {
    heading: "Vragen of wijzigingen",
    paragraphs: [
      `Heeft u vragen over dit privacybeleid? ${mailOrFormSentence()[0].toUpperCase() + mailOrFormSentence().slice(1)}.`,
      "Wij kunnen dit beleid van tijd tot tijd aanpassen. De meest recente versie staat steeds op deze pagina.",
    ],
  },
];

export default function PrivacybeleidPage() {
  return (
    <LegalPageTemplate
      title="Privacybeleid"
      lastUpdated="Laatst bijgewerkt: 8 oktober 2026"
      intro="Hieronder leest u hoe wij omgaan met uw persoonsgegevens, offerteaanvragen, foto's van uw pand en de toegangsgegevens die wij bij periodiek onderhoud ontvangen."
      sections={sections}
      ctaHeading="Vragen over dit privacybeleid?"
    />
  );
}
