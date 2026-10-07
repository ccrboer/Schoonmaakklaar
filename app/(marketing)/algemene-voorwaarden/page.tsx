import type { Metadata } from "next";
import { siteConfig, contactSentence } from "@/config/site";
import {
  LegalPageTemplate,
  type LegalSection,
} from "@/components/sections/legal/LegalPageTemplate";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  description:
    "De algemene voorwaarden van SchoonmaakKlaar voor offertes, planning, toegang, uitvoering, betaling en aansprakelijkheid.",
  alternates: { canonical: "/algemene-voorwaarden" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/algemene-voorwaarden`,
    siteName: siteConfig.name,
    title: `Algemene voorwaarden | ${siteConfig.name}`,
    description:
      "Voorwaarden voor offertes, planning, uitvoering, betaling en aansprakelijkheid.",
  },
};

export const dynamic = "force-static";
export const revalidate = false;

const { contact } = siteConfig;

const sections: LegalSection[] = [
  {
    heading: "Toepasselijkheid",
    paragraphs: [
      `Deze algemene voorwaarden zijn van toepassing op alle offertes, overeenkomsten en diensten van ${siteConfig.name}${contact.vat ? ` (ondernemings-/BTW-nummer ${contact.vat})` : ""}, tenzij schriftelijk anders overeengekomen.`,
    ],
  },
  {
    heading: "Onze diensten",
    paragraphs: [
      "Wij verzorgen professionele schoonmaak voor bedrijven, horeca en vastgoed: onder meer horecaschoonmaak, dieptereiniging van professionele keukens, kantoorschoonmaak, opleveringsschoonmaak na werken, eindschoonmaak vóór een plaatsbeschrijving, verhuur- en verkoopklaar maken, onderhoud van gemeenschappelijke delen en dieptereiniging.",
      "Wij zijn geen dienstenchequebedrijf en leveren geen huishoudelijke poetshulp met dienstencheques.",
    ],
  },
  {
    heading: "Offertes",
    paragraphs: [
      "Onze offertes zijn gebaseerd op de informatie die de klant aanlevert en op wat wij tijdens een eventueel plaatsbezoek vaststellen. Wijkt de situatie ter plaatse wezenlijk af van wat werd doorgegeven, dan kan de prijs in overleg worden aangepast vóór verdere uitvoering.",
      "Tenzij anders vermeld, is een offerte geldig gedurende dertig dagen. De offerte vermeldt welke zones en taken inbegrepen zijn; werk dat daar niet in staat, is meerwerk.",
    ],
  },
  {
    heading: "Periodieke opdrachten",
    paragraphs: [
      "Bij periodiek onderhoud leggen wij de frequentie, de zones en het tijdstip vast in het werkschema bij de offerte. Wijzigingen aan dat schema gebeuren in onderling overleg.",
      "De duur en de opzegmodaliteiten van een periodieke samenwerking worden vermeld in de offerte of overeenkomst.",
    ],
  },
  {
    heading: "Planning en toegang",
    paragraphs: [
      "De klant zorgt ervoor dat wij op het afgesproken moment toegang hebben tot het pand, en bezorgt tijdig de nodige sleutels, badges of codes.",
      "Kunnen wij door omstandigheden buiten onze wil niet aan de slag — bijvoorbeeld omdat de toegang niet geregeld is of het pand niet beschikbaar is — dan kunnen de voorziene uren worden aangerekend.",
      "Wij gaan zorgvuldig om met sleutels en toegangsgegevens, beperken de toegang tot de medewerkers die de opdracht uitvoeren en bezorgen alles terug bij het einde van de samenwerking.",
    ],
  },
  {
    heading: "Verantwoordelijkheden van de klant",
    paragraphs: [
      "De klant duidt vóór aanvang aan welke zaken bijzondere voorzichtigheid vragen: kwetsbare oppervlakken, waardevolle voorwerpen, apparatuur die niet verplaatst of gereinigd mag worden, en materialen die een specifieke behandeling nodig hebben.",
      "De klant zorgt voor een veilige werkomgeving en meldt vooraf eventuele risico's in het pand.",
    ],
  },
  {
    heading: "Uitvoering",
    paragraphs: [
      "Wij voeren de werken vakkundig uit volgens de afspraken in de offerte en het werkschema. Tenzij anders afgesproken, brengen wij zelf het nodige materiaal en de nodige producten mee.",
      "Sommige vormen van vervuiling of beschadiging zijn met schoonmaak niet weg te werken, bijvoorbeeld ingebrande vlekken, aangetaste voegen, kalkaanslag die het materiaal heeft aangetast of slijtage. Wij geven dat vooraf aan waar wij het vaststellen en nemen het niet op als resultaatsverbintenis.",
    ],
  },
  {
    heading: "Wat wij niet uitvoeren",
    paragraphs: [
      "Gespecialiseerde of risicovolle werken vallen niet onder onze standaarddienst, tenzij dit uitdrukkelijk werd afgesproken en wettelijk toegelaten is. Het gaat onder meer om werken met asbest, chemische of medische risico's, werken op hoogte die specifieke uitrusting vereisen, en technische ingrepen aan toestellen of installaties.",
      "Wij zijn geen controle-, keurings- of certificeringsinstantie. Wij leveren geen keuringen, attesten of certificaten af en geven geen garantie over de uitkomst van een controle door derden.",
    ],
  },
  {
    heading: "Betaling",
    paragraphs: [
      "De betalingsvoorwaarden staan vermeld op de offerte of factuur. Bij periodieke opdrachten factureren wij doorgaans per maand.",
      "Bij laattijdige betaling kunnen, voor zover wettelijk toegelaten, interesten en invorderingskosten worden aangerekend.",
    ],
  },
  {
    heading: "Annulering en verplaatsing",
    paragraphs: [
      "De klant verwittigt ons zo vroeg mogelijk bij annulering of verplaatsing van een opdracht. Wanneer planning en mankracht al gereserveerd waren, kunnen bij een laattijdige annulering redelijke kosten worden aangerekend.",
    ],
  },
  {
    heading: "Klachten",
    paragraphs: [
      `Meld klachten zo snel mogelijk, bij voorkeur binnen 48 uur na uitvoering, ${contactSentence()}. Zo kunnen wij nagaan wat er misliep en het rechtzetten.`,
    ],
  },
  {
    heading: "Aansprakelijkheid",
    paragraphs: [
      "Onze aansprakelijkheid is redelijk beperkt. Wij zijn niet aansprakelijk voor reeds bestaande schade of slijtage, noch voor schade aan voorwerpen of oppervlakken waarvan de bijzondere aard of kwetsbaarheid ons niet vooraf werd gemeld.",
      "Wij sluiten onze aansprakelijkheid nooit uit in de gevallen waarin dat wettelijk niet is toegestaan.",
    ],
  },
  {
    heading: "Overmacht",
    paragraphs: [
      "Bij omstandigheden buiten onze redelijke controle kan de uitvoering vertraging oplopen. Wij brengen u daarvan zo snel mogelijk op de hoogte en zoeken samen een nieuwe datum.",
    ],
  },
  {
    heading: "Toepasselijk recht",
    paragraphs: [
      "Voor zover wettelijk toegestaan, is het recht van toepassing zoals vermeld op de offerte of factuur.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      `Heeft u vragen over deze voorwaarden? Neem contact op ${contactSentence()}.`,
    ],
  },
];

export default function AlgemeneVoorwaardenPage() {
  return (
    <LegalPageTemplate
      title="Algemene voorwaarden"
      lastUpdated="Laatst bijgewerkt: 29 september 2026"
      intro="Hieronder leest u onze voorwaarden voor offertes, planning, toegang tot uw pand, uitvoering, betaling en aansprakelijkheid."
      sections={sections}
      ctaHeading="Vragen over deze voorwaarden?"
    />
  );
}
