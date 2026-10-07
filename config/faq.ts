import type { FaqItem } from "@/types";

/** De vragen op de homepage: breed, en gericht op twijfels vóór contact. */
export const homepageFaq: FaqItem[] = [
  {
    question: "Werken jullie ook voor particulieren?",
    answer:
      "Ja, maar wel voor specifieke opdrachten: een eindschoonmaak vóór de plaatsbeschrijving, een opleveringsschoonmaak na werken of een grondige dieptereiniging. Wij zijn geen huishoudelijke poetsdienst en werken niet met dienstencheques.",
  },
  {
    question: "Kunnen jullie buiten de openingsuren werken?",
    answer:
      "Dat is voor veel klanten net de reden om ons in te schakelen. Wij werken voor de opening, na sluiting, 's nachts of tijdens een sluitingsperiode, zodat uw zaak of kantoor gewoon kan doordraaien.",
  },
  {
    question: "Is een offerte gratis en vrijblijvend?",
    answer:
      "Ja. U ontvangt een prijs op maat zonder verplichting. Pas wanneer u akkoord gaat, plannen we de opdracht in.",
  },
  {
    question: "Moet ik meteen een contract afsluiten?",
    answer:
      "Nee. Veel klanten starten met één eenmalige beurt en schakelen pas daarna over op een periodiek schema. Wat het best past, bespreken we samen.",
  },
  {
    question: "Komen jullie eerst ter plaatse kijken?",
    answer:
      "Voor periodiek onderhoud, horeca en dieptereiniging doen we dat bij voorkeur wel: zo kunnen we een realistische offerte maken. Voor een eenmalige eindschoonmaak volstaan de oppervlakte en enkele duidelijke foto's meestal.",
  },
  {
    question: "Hoe snel kunnen jullie starten?",
    answer:
      "Dat hangt af van onze planning en van de omvang van de opdracht. Laat ons uw datum weten — bij een plaatsbeschrijving of oplevering plannen we daar gericht op.",
  },
  {
    question: "Wie levert het materiaal en de producten?",
    answer:
      "Standaard brengen wij ons eigen materiaal en producten mee. Werkt u liever met de producten die al in huis zijn, bijvoorbeeld door uw eigen procedures, dan spreken we dat vooraf af.",
  },
  {
    question: "In welke regio werken jullie?",
    answer:
      "In Antwerpen en omgeving: de stad en de districten, plus gemeenten zoals Mortsel, Edegem, Kontich, Schoten, Brasschaat, Wijnegem, Wommelgem, Borsbeek, Kapellen en Ekeren. Twijfelt u of uw gemeente erbij hoort? Vraag het gerust.",
  },
];

export interface FaqGroup {
  title: string;
  items: FaqItem[];
}

/**
 * De volledige FAQ-pagina, gegroepeerd per thema. Bewust andere vragen dan de
 * homepage, zodat de pagina extra waarde heeft in plaats van te herhalen.
 */
export const faqGroups: FaqGroup[] = [
  {
    title: "Samenwerking en offerte",
    items: [
      {
        question: "Hoe verloopt een aanvraag?",
        answer:
          "U vraagt een offerte aan via het formulier, WhatsApp of telefoon. Wij bekijken de situatie — meestal met een korte rondgang ter plaatse — en bezorgen u een offerte met een concreet werkschema. Na uw akkoord plannen we de startdatum.",
      },
      {
        question: "Werken jullie met vaste contracten?",
        answer:
          "Voor periodiek onderhoud werken we met duidelijke afspraken over frequentie, zones en prijs. De concrete voorwaarden staan in de offerte, zodat u vooraf weet waaraan u begint. Eenmalige opdrachten kunnen uiteraard zonder contract.",
      },
      {
        question: "Kunnen jullie meerdere panden of vestigingen doen?",
        answer:
          "Ja. Voor beheerders, syndici en bedrijven met meerdere locaties werken we met dezelfde werkwijze over alle panden heen, met één aanspreekpunt voor de opvolging.",
      },
      {
        question: "Wat als ik niet tevreden ben over een beurt?",
        answer:
          "Laat het ons zo snel mogelijk weten, liefst binnen enkele dagen. We bekijken samen wat er misliep en komen dat rechtzetten. Terugkerende punten nemen we mee in het werkschema.",
      },
    ],
  },
  {
    title: "Praktisch en planning",
    items: [
      {
        question: "Moet ik aanwezig zijn tijdens de schoonmaak?",
        answer:
          "Niet noodzakelijk. Zodra de toegang geregeld is met een sleutel, badge of code, werken wij zelfstandig. Bij een eerste opdracht lopen we wel graag samen even door het pand.",
      },
      {
        question: "Hoe regelen we de toegang tot het gebouw?",
        answer:
          "In overleg. We leggen vast wie toegang heeft, hoe er afgesloten wordt en wie we contacteren bij vragen. Die afspraken staan mee in de offerte.",
      },
      {
        question: "Werken jullie in het weekend of 's nachts?",
        answer:
          "Ja, wanneer uw werking dat vraagt. Horeca en winkels worden vaak buiten de openingsuren gedaan; kantoren vroeg in de ochtend of 's avonds.",
      },
      {
        question: "Wat gebeurt er bij ziekte of verlof van de vaste ploeg?",
        answer:
          "Dan zorgen wij voor vervanging volgens hetzelfde werkschema. Omdat het schema op papier staat, weet een vervanger precies wat er moet gebeuren.",
      },
    ],
  },
  {
    title: "Wat we wel en niet doen",
    items: [
      {
        question: "Doen jullie ook huishoudelijke schoonmaak met dienstencheques?",
        answer:
          "Nee. Wij richten ons op professionele schoonmaak voor bedrijven, horeca en vastgoed. Voor wekelijkse huishoudhulp met dienstencheques bent u bij een erkend dienstenchequebedrijf beter geholpen.",
      },
      {
        question: "Halen jullie ook meubels of inboedel weg?",
        answer:
          "Los afval en verpakkingsmateriaal nemen we in overleg mee. Voor het volledig leeghalen van een pand verwijzen we door naar een partner die daarin gespecialiseerd is; daarna verzorgen wij de schoonmaak.",
      },
      {
        question: "Doen jullie ook ramen?",
        answer:
          "De binnenzijde nemen we standaard mee bij een oplevering of eindschoonmaak. Ramen langs de buitenzijde doen we wanneer die veilig bereikbaar zijn zonder hoogtewerker of gevelinstallatie.",
      },
      {
        question: "Kunnen jullie een certificaat of keuring afleveren?",
        answer:
          "Nee. Wij voeren de schoonmaak uit en zijn geen controle- of certificeringsinstantie. Wij leveren geen keuringen, goedkeuringen of certificaten af, en beloven ook geen resultaat bij een externe controle.",
      },
      {
        question: "Krijgen jullie alle vlekken en aanslag weg?",
        answer:
          "Niet altijd, en dat zeggen we liever vooraf. Ingebrande vlekken, aangetaste voegen of beschadigd materiaal horen bij herstel of vernieuwing, niet bij schoonmaak. Bij een plaatsbezoek geven we eerlijk aan wat haalbaar is.",
      },
    ],
  },
  {
    title: "Prijs en facturatie",
    items: [
      {
        question: "Waarom staan er geen prijzen op de site?",
        answer:
          "Omdat elk pand anders is. Oppervlakte, staat, frequentie, tijdstip en bereikbaarheid bepalen samen de prijs. Een richtprijs op de site zou in de praktijk vrijwel nooit kloppen.",
      },
      {
        question: "Wat bepaalt de prijs van een opdracht?",
        answer:
          "De oppervlakte en het aantal ruimtes, de zones die we opnemen, de frequentie, het tijdstip waarop we werken en de staat van het pand. Bij een dieptereiniging weegt de graad van vervuiling zwaar door.",
      },
      {
        question: "Krijg ik een vaste prijs of een uurtarief?",
        answer:
          "Voor duidelijk afgebakende opdrachten werken we bij voorkeur met een vaste prijs. Bij werk waarvan de omvang vooraf moeilijk in te schatten is, spreken we dat expliciet af in de offerte.",
      },
      {
        question: "Hoe verloopt de facturatie?",
        answer:
          "Na uitvoering ontvangt u een factuur met de betalingsvoorwaarden. Bij periodiek onderhoud gebeurt dat doorgaans per maand.",
      },
    ],
  },
];

/** Alle FAQ-items van de FAQ-pagina, voor de structured data. */
export const allFaqItems: FaqItem[] = faqGroups.flatMap((group) => group.items);
