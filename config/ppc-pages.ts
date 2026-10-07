import type { FaqItem, ImageRef } from "@/types";
import type { QuoteFields } from "@/lib/offerte";
import { siteImages } from "@/config/site-images";

/**
 * Content van de advertentie-landingspagina's onder /lp.
 *
 * Dit zijn geen varianten van elkaar: iedere funnel heeft een eigen
 * zoekintentie, doelgroep, probleem, aanbod, formulier en bezwaren. Wat ze
 * delen is de merkhuisstijl, de formuliertechniek en de backend — niet de
 * commerciële boodschap.
 *
 * De pagina's zijn noindex en staan niet in de sitemap: ze bestaan naast de
 * organische dienstpagina's, niet in plaats daarvan.
 */

/* -------------------------------------------------------------------------
 * Formuliermodel
 * ---------------------------------------------------------------------- */

export type PpcFieldType = "text" | "radio" | "multi" | "date" | "textarea";

export interface PpcField {
  /** Veld uit QuoteFields, zodat de bestaande backend het herkent. */
  name: keyof QuoteFields;
  label: string;
  type: PpcFieldType;
  options?: readonly string[];
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
  /** Korte uitleg onder het label. */
  help?: string;
  inputType?: "text" | "tel" | "email";
  autoComplete?: string;
  inputMode?: "text" | "numeric" | "tel" | "email";
  /** Compacte keuzekaarten voor korte opties. */
  compact?: boolean;
  /** Halve breedte binnen de tweekoloms-grid op desktop. */
  half?: boolean;
}

export interface PpcFormGroup {
  /** Korte stapaanduiding boven de groep, bv. "1 · Uw woning". */
  title: string;
  fields: PpcField[];
}

export interface PpcPhotoBlock {
  label: string;
  help: string;
  /** Prominent blok met eigen kader en accentrand. */
  prominent: boolean;
  /** Tekst bij de WhatsApp-link naast de upload. */
  whatsappPrompt?: string;
}

export interface PpcFormConfig {
  /** Titel boven het formulier. */
  heading: string;
  intro: string;
  groups: PpcFormGroup[];
  photos: PpcPhotoBlock;
  /** Groep die ná het fotoblok komt: de contactgegevens. */
  contact: PpcFormGroup;
  submitLabel: string;
  /** Kleine regel onder de knop. */
  reassurance: string;
}

/* -------------------------------------------------------------------------
 * Paginamodel
 * ---------------------------------------------------------------------- */

export interface PpcOffer {
  badge: string;
  title: string;
  support: string;
  footnote: string;
}

export interface PpcPageConfig {
  slug: string;
  path: string;
  seoTitle: string;
  seoDescription: string;
  /** Dienstwaarde uit SERVICE_OPTIONS — stuurt validatie en lead-labeling. */
  dienst: string;
  eyebrow: string;
  h1: string;
  sub: string;
  /** Vier korte bevestigingen onder de subtitel. */
  heroPoints: string[];
  image: ImageRef;
  offer?: PpcOffer;
  primaryCta: string;
  /** Tweede weg naast het formulier. */
  secondaryCta?: { label: string; kind: "intake" | "whatsapp" };
  whatsappLabel: string;
  whatsappMessage: string;
  form: PpcFormConfig;
  faq: FaqItem[];
  finalCta: { title: string; text: string; button: string };
}

/* -------------------------------------------------------------------------
 * Gedeelde bouwstenen voor de formulieren
 * ---------------------------------------------------------------------- */

const LOCATIE_VELDEN: PpcField[] = [
  {
    name: "postcode",
    label: "Postcode",
    type: "text",
    required: true,
    inputMode: "numeric",
    autoComplete: "postal-code",
    half: true,
  },
  {
    name: "gemeente",
    label: "Gemeente",
    type: "text",
    required: true,
    autoComplete: "address-level2",
    half: true,
  },
];

const TELEFOON_EN_MAIL: PpcField[] = [
  {
    name: "telefoon",
    label: "Telefoonnummer",
    type: "text",
    inputType: "tel",
    required: true,
    autoComplete: "tel",
    half: true,
  },
  {
    name: "email",
    label: "E-mailadres",
    type: "text",
    inputType: "email",
    required: true,
    autoComplete: "email",
    half: true,
  },
];

/* =========================================================================
 * A — Schoonmaak voor plaatsbeschrijving
 * Zoekintentie: particulier die vertrekt en een deadline heeft.
 * ====================================================================== */

const plaatsbeschrijving: PpcPageConfig = {
  slug: "schoonmaak-plaatsbeschrijving-antwerpen",
  path: "/lp/schoonmaak-plaatsbeschrijving-antwerpen",
  seoTitle: "Schoonmaak voor de plaatsbeschrijving in Antwerpen",
  seoDescription:
    "Uw woning grondig schoon vóór de plaatsbeschrijving. Keuken, sanitair, " +
    "vloeren en de laatste details, verzorgd door een professioneel team in " +
    "Antwerpen en omgeving.",
  dienst: "plaatsbeschrijving",
  eyebrow: "Schoonmaak voor plaatsbeschrijving — Antwerpen & omgeving",
  h1: "Uw woning grondig schoon vóór de plaatsbeschrijving",
  sub:
    "Laat uw woning netjes achter zonder zelf keuken, sanitair, vloeren en de " +
    "laatste details nog te moeten nalopen.",
  heroPoints: [
    "Afgestemd op uw datum",
    "Keuken en sanitair grondig",
    "Ook bij korte termijn",
    "Antwerpen en omgeving",
  ],
  image: siteImages.woningEindschoonmaak,
  offer: {
    badge: "Extra grondig deze maand",
    title: "Ramen, oven én koelkast inbegrepen*",
    support: "Bij geselecteerde volledige schoonmaakopdrachten.",
    footnote:
      "* Actie geldig bij geselecteerde volledige schoonmaakopdrachten die " +
      "deze maand worden aangevraagd. Toepassing en exacte scope worden " +
      "vooraf bevestigd.",
  },
  primaryCta: "Ontvang mijn schoonmaakvoorstel",
  secondaryCta: { label: "Stuur foto's via WhatsApp", kind: "whatsapp" },
  whatsappLabel: "Stuur foto's via WhatsApp",
  whatsappMessage:
    "Hallo, ik heb schoonmaak nodig vóór mijn plaatsbeschrijving. Ik stuur " +
    "u enkele foto's van de woning door.",
  form: {
    heading: "Vraag uw schoonmaakvoorstel aan",
    intro:
      "Hoe meer wij vooraf weten, hoe gerichter het voorstel. Invullen duurt " +
      "ongeveer een minuut.",
    groups: [
      {
        title: "1 · Uw woning",
        fields: [
          {
            name: "woningtype",
            label: "Type woning",
            type: "radio",
            compact: true,
            options: ["Appartement", "Woning", "Studio", "Anders"],
          },
          {
            name: "slaapkamers",
            label: "Omvang",
            type: "radio",
            compact: true,
            options: [
              "Studio",
              "1 slaapkamer",
              "2 slaapkamers",
              "3 slaapkamers",
              "4 of meer",
              "Anders",
            ],
          },
          {
            name: "staat",
            label: "Hoe is de woning er nu aan toe?",
            type: "radio",
            compact: true,
            options: [
              "Normale schoonmaak",
              "Grondige schoonmaak nodig",
              "Sterk vervuild",
              "Niet zeker",
            ],
          },
          {
            name: "inboedel",
            label: "Inrichting",
            type: "radio",
            compact: true,
            options: ["Leeg", "Deels gemeubileerd", "Gemeubileerd"],
          },
        ],
      },
      {
        title: "2 · Uw planning",
        fields: [
          {
            name: "datumPlaatsbeschrijving",
            label: "Datum plaatsbeschrijving",
            type: "date",
            required: true,
            help: "Hierop stemmen wij de planning af.",
            half: true,
          },
          {
            name: "datumSleuteloverdracht",
            label: "Datum sleuteloverdracht",
            type: "date",
            optional: true,
            half: true,
          },
          ...LOCATIE_VELDEN,
        ],
      },
    ],
    photos: {
      label: "Foto's van de woning",
      help: "Foto's helpen ons om de schoonmaak beter in te schatten.",
      prominent: true,
      whatsappPrompt: "Liever foto's via WhatsApp sturen?",
    },
    contact: {
      title: "4 · Uw gegevens",
      fields: [
        {
          name: "naam",
          label: "Naam",
          type: "text",
          required: true,
          autoComplete: "name",
        },
        ...TELEFOON_EN_MAIL,
      ],
    },
    submitLabel: "Ontvang mijn schoonmaakvoorstel",
    reassurance: "Vrijblijvend — u zit nergens aan vast.",
  },
  faq: [
    {
      question: "Wat wordt er precies schoongemaakt?",
      answer:
        "Keuken, sanitair en de woon- en slaapruimtes. Concreet: werkbladen, " +
        "spoelbak, kastfronten en de kookzone; toilet, lavabo, douche of bad " +
        "en kranen; vloeren, plinten en de bereikbare oppervlakken. Deuren en " +
        "deurkaders doen we waar dat zo afgesproken is.",
    },
    {
      question: "Zijn ramen, oven en koelkast inbegrepen?",
      answer:
        "Bij geselecteerde volledige schoonmaakopdrachten die deze maand " +
        "worden aangevraagd, nemen we die drie mee. Het gaat om standaard " +
        "bereikbare beglazing, een huishoudelijke oven en een huishoudelijke " +
        "koelkast bij een normale vervuilingsgraad. Wat voor uw woning van " +
        "toepassing is, bevestigen we vooraf in het voorstel.",
    },
    {
      question: "Kunnen jullie kort vóór mijn plaatsbeschrijving komen?",
      answer:
        "Daar plannen we bewust op. Geef de datum van de plaatsbeschrijving " +
        "mee in uw aanvraag, dan zoeken we een moment zo kort mogelijk " +
        "daarvoor. Bij een korte termijn laat u dat het best meteen weten.",
    },
    {
      question: "Moet de woning leeg zijn?",
      answer:
        "Niet noodzakelijk, maar het helpt wel. In een lege woning bereiken " +
        "we alles en gaat het sneller. Staat er nog meubilair, geef dat dan " +
        "aan in het formulier — we houden er rekening mee in het voorstel.",
    },
    {
      question: "Garandeert dit de teruggave van mijn huurwaarborg?",
      answer:
        "Nee. Wij zorgen voor de afgesproken schoonmaak, maar wij bepalen " +
        "niet de beoordeling van de verhuurder of de expert, en evenmin de " +
        "teruggave van de huurwaarborg.",
    },
  ],
  finalCta: {
    title: "Klaar om uw woning zorgeloos achter te laten?",
    text:
      "Geef uw datum door, dan bekijken wij meteen wat er nodig is en wanneer " +
      "we kunnen komen.",
    button: "Ontvang mijn schoonmaakvoorstel",
  },
};

/* =========================================================================
 * B — Periodieke horecaschoonmaak
 * Zoekintentie: zaakvoerder die structureel schoon wil blijven.
 * ====================================================================== */

const horecaPeriodiek: PpcPageConfig = {
  slug: "horecaschoonmaak-antwerpen",
  path: "/lp/horecaschoonmaak-antwerpen",
  seoTitle: "Periodieke horecaschoonmaak in Antwerpen",
  seoDescription:
    "Professionele horecaschoonmaak volgens een vaste planning. Eerst uw zaak " +
    "op niveau brengen, daarna structureel schoon houden — op momenten die " +
    "bij uw openingsuren passen.",
  dienst: "horeca",
  eyebrow: "Start met een schone lei",
  h1: "Professionele horecaschoonmaak volgens een vaste planning",
  sub:
    "Wij brengen uw zaak professioneel op niveau en houden ze daarna " +
    "structureel schoon op momenten die bij uw openingsuren passen.",
  heroPoints: [
    "Vaste ploeg, vaste afspraken",
    "Voor opening of na sluiting",
    "Keuken, zaal en sanitair",
    "Antwerpen en omgeving",
  ],
  image: siteImages.horecaBar,
  offer: {
    badge: "Bij uw opstart",
    title: "Gratis Kitchen Reset bij uw opstart*",
    support: "Bij geselecteerde nieuwe periodieke schoonmaakovereenkomsten.",
    footnote: "* Omvang, scope en voorwaarden worden vooraf bevestigd.",
  },
  primaryCta: "Vraag mijn schoonmaakvoorstel aan",
  secondaryCta: { label: "Plan een vrijblijvende intake", kind: "intake" },
  whatsappLabel: "Stuur foto's van uw zaak via WhatsApp",
  whatsappMessage:
    "Hallo, ik zoek een vaste schoonmaakpartner voor mijn horecazaak in " +
    "Antwerpen. Ik stuur u enkele foto's van de zaak en de keuken door.",
  form: {
    heading: "Vraag uw schoonmaakvoorstel aan",
    intro:
      "Met deze gegevens stellen wij een planning en een prijs op maat van " +
      "uw zaak voor.",
    groups: [
      {
        title: "1 · Uw zaak",
        fields: [
          {
            name: "horecaType",
            label: "Type zaak",
            type: "radio",
            required: true,
            compact: true,
            options: [
              "Restaurant",
              "Brasserie",
              "Café",
              "Hotel",
              "Take-away",
              "Grootkeuken",
              "Anders",
            ],
          },
          {
            name: "omvang",
            label: "Omvang",
            type: "text",
            placeholder: "bv. 120 m² zaal en 40 m² keuken, of 90 couverts",
            help: "Een oppervlakte of een bruikbare indicatie volstaat.",
          },
          {
            name: "ruimtes",
            label: "Welke ruimtes moeten onderhouden worden?",
            type: "multi",
            compact: true,
            options: ["Keuken", "Zaal", "Sanitair", "Bar", "Opslag", "Andere"],
          },
        ],
      },
      {
        title: "2 · Uw planning",
        fields: [
          {
            name: "frequentie",
            label: "Gewenste frequentie",
            type: "radio",
            compact: true,
            options: [
              "Dagelijks",
              "Meerdere keren per week",
              "Wekelijks",
              "Anders",
            ],
          },
          {
            name: "moment",
            label: "Wanneer komen wij het best?",
            type: "radio",
            compact: true,
            options: ["Voor opening", "Na sluiting", "Overdag", "Flexibel"],
          },
          {
            name: "staat",
            label: "Hoe is de situatie vandaag?",
            type: "radio",
            compact: true,
            options: [
              "Redelijk schoon",
              "Grondige start nodig",
              "Achterstallige vervuiling",
              "Niet zeker",
            ],
            help: "Dit bepaalt of een Kitchen Reset bij de opstart zinvol is.",
          },
          ...LOCATIE_VELDEN,
        ],
      },
    ],
    photos: {
      label: "Foto's van uw zaak of keuken",
      help: "Foto's van de huidige situatie maken ons voorstel een stuk concreter.",
      prominent: false,
      whatsappPrompt: "Liever foto's via WhatsApp sturen?",
    },
    contact: {
      title: "4 · Uw gegevens",
      fields: [
        {
          name: "bedrijf",
          label: "Naam van de zaak",
          type: "text",
          autoComplete: "organization",
          half: true,
        },
        {
          name: "naam",
          label: "Contactpersoon",
          type: "text",
          required: true,
          autoComplete: "name",
          half: true,
        },
        ...TELEFOON_EN_MAIL,
      ],
    },
    submitLabel: "Vraag mijn schoonmaakvoorstel aan",
    reassurance: "Vrijblijvend — eerst een voorstel, dan pas afspraken.",
  },
  faq: [
    {
      question: "Werken jullie vóór of na de openingsuren?",
      answer:
        "Allebei. De meeste zaken kiezen voor de schoonmaak vóór de opening " +
        "of na sluiting, zodat uw zaal en keuken vrij blijven tijdens de " +
        "service. Overdag kan ook, als dat in uw werking past.",
    },
    {
      question: "Welke frequenties zijn mogelijk?",
      answer:
        "Van dagelijks tot wekelijks, en alles daartussen. Wat het best past " +
        "hangt af van uw type zaak, uw openingsdagen en wat uw eigen ploeg " +
        "zelf al doet. Dat bepalen we samen bij de intake.",
    },
    {
      question: "Wat houdt de Kitchen Reset bij de opstart in?",
      answer:
        "Een grondige dieptereiniging van de keuken vóór het periodieke " +
        "onderhoud begint: kooklijn, werkbanken, inox, afwaszone, vloeren en " +
        "wanden, opslag en koelzone, en de bereikbare zones onder en achter " +
        "de apparatuur. Zo start het onderhoud vanaf een schone basis.",
    },
    {
      question: "Is die reset altijd inbegrepen?",
      answer:
        "Niet automatisch. Het aanbod geldt bij geselecteerde nieuwe " +
        "periodieke schoonmaakovereenkomsten. Omvang, scope en voorwaarden " +
        "bevestigen we vooraf in het voorstel, zodat u precies weet wat " +
        "inbegrepen is.",
    },
    {
      question: "Reinigen jullie de keuken én de zaal?",
      answer:
        "Ja. U geeft in de aanvraag aan welke ruimtes u wilt laten " +
        "onderhouden: keuken, zaal, sanitair, bar, opslag of een combinatie. " +
        "Het voorstel volgt die keuze.",
    },
    {
      question: "Hoe wordt de prijs bepaald?",
      answer:
        "Op basis van de oppervlakte, de ruimtes die meegaan, de frequentie, " +
        "het moment van de dag en de staat waarin uw zaak zich vandaag " +
        "bevindt. U krijgt een prijs per beurt of per maand, afgesproken " +
        "vóór we starten.",
    },
  ],
  finalCta: {
    title: "Eén vaste partner voor uw zaak",
    text:
      "Vertel ons kort hoe uw zaak werkt, dan stellen wij een planning en een " +
      "prijs voor die daarbij passen.",
    button: "Vraag mijn schoonmaakvoorstel aan",
  },
};

/* =========================================================================
 * C — Kitchen Reset: dieptereiniging van de horecakeuken
 * Zoekintentie: keuken met opgebouwde vervuiling, eenmalige reset.
 * ====================================================================== */

const kitchenReset: PpcPageConfig = {
  slug: "horecakeuken-dieptereiniging-antwerpen",
  path: "/lp/horecakeuken-dieptereiniging-antwerpen",
  seoTitle: "Dieptereiniging van uw horecakeuken in Antwerpen",
  seoDescription:
    "Professionele dieptereiniging van horecakeukens in Antwerpen: kooklijn, " +
    "werkbanken, inox, afwaszone, vloeren en wanden grondig terug op niveau.",
  dienst: "horecakeuken",
  eyebrow: "Kitchen Reset — Antwerpen & omgeving",
  h1: "Uw horecakeuken grondig gereinigd en terug op niveau",
  sub:
    "Een professionele deep clean voor opgebouwde vervuiling, moeilijkere " +
    "zones en een schone basis voor dagelijks onderhoud.",
  heroPoints: [
    "Gespecialiseerde dieptereiniging",
    "Buiten de openingsuren mogelijk",
    "Zone per zone afgesproken",
    "Antwerpen en omgeving",
  ],
  image: siteImages.keukenInox,
  // Bewust geen offer-blok: voor deze dienst is er nog geen bonus bepaald.
  primaryCta: "Ontvang mijn Kitchen Reset voorstel",
  secondaryCta: {
    label: "Stuur foto's van uw keuken via WhatsApp",
    kind: "whatsapp",
  },
  whatsappLabel: "Stuur foto's van uw keuken via WhatsApp",
  whatsappMessage:
    "Hallo, ik wil graag een dieptereiniging van onze horecakeuken. Ik stuur " +
    "u enkele foto's van de keuken door.",
  form: {
    heading: "Ontvang uw Kitchen Reset voorstel",
    intro:
      "Hoe preciezer u de zones en de staat omschrijft, hoe scherper wij de " +
      "reset kunnen inplannen en prijzen.",
    groups: [
      {
        title: "1 · Uw keuken",
        fields: [
          {
            name: "horecaType",
            label: "Type zaak of keuken",
            type: "radio",
            required: true,
            compact: true,
            options: [
              "Restaurant",
              "Brasserie",
              "Hotel",
              "Grootkeuken",
              "Catering",
              "Take-away",
              "Anders",
            ],
          },
          {
            name: "omvang",
            label: "Omvang van de keuken",
            type: "text",
            placeholder: "bv. 40 m², of een keuken met twee kooklijnen",
            help: "Een oppervlakte of een bruikbare indicatie volstaat.",
          },
          {
            name: "zones",
            label: "Welke zones moeten mee?",
            type: "multi",
            compact: true,
            options: [
              "Kooklijn",
              "Ovenzone",
              "Frituurzone",
              "Werkbanken",
              "Wanden",
              "Vloeren",
              "Afwaszone",
              "Koelzone",
              "Opslag",
              "Anders",
            ],
          },
          {
            name: "staat",
            label: "Hoe is de keuken er nu aan toe?",
            type: "radio",
            compact: true,
            options: [
              "Regulier",
              "Grondige reiniging nodig",
              "Zware vetopbouw",
              "Niet zeker",
            ],
          },
        ],
      },
      {
        title: "2 · Planning en locatie",
        fields: [
          {
            name: "datum",
            label: "Gewenste datum",
            type: "date",
            optional: true,
            half: true,
          },
          ...LOCATIE_VELDEN,
        ],
      },
    ],
    photos: {
      label: "Foto's van uw keuken",
      help:
        "Foto's zijn hier het belangrijkste: aan de hand daarvan schatten wij " +
        "de vervuilingsgraad en de benodigde tijd in. Fotografeer bij voorkeur " +
        "de kooklijn, de frituur- of ovenzone en de wanden erachter.",
      prominent: true,
      whatsappPrompt: "Liever foto's via WhatsApp sturen?",
    },
    contact: {
      title: "4 · Uw gegevens",
      fields: [
        {
          name: "bedrijf",
          label: "Naam van de zaak",
          type: "text",
          autoComplete: "organization",
          half: true,
        },
        {
          name: "naam",
          label: "Contactpersoon",
          type: "text",
          required: true,
          autoComplete: "name",
          half: true,
        },
        ...TELEFOON_EN_MAIL,
      ],
    },
    submitLabel: "Ontvang mijn Kitchen Reset voorstel",
    reassurance: "Vrijblijvend — eerst een voorstel, dan pas een datum.",
  },
  faq: [
    {
      question: "Wat is een Kitchen Reset precies?",
      answer:
        "Een eenmalige, grondige dieptereiniging van uw professionele keuken. " +
        "Waar dagelijkse schoonmaak de zichtbare oppervlakken bijhoudt, pakt " +
        "een reset de opgebouwde vervuiling aan: de moeilijker bereikbare " +
        "zones, het vet achter en onder de apparatuur, wanden en vloeren.",
    },
    {
      question: "Welke delen van de keuken worden gereinigd?",
      answer:
        "U bepaalt de zones. Gebruikelijk zijn de kooklijn, werkbanken en " +
        "inox, de afwaszone, vloeren en wanden, opslag en koelzone, en de " +
        "bereikbare zones onder en achter de apparatuur. Wat meegaat, staat " +
        "vooraf in het voorstel.",
    },
    {
      question: "Reinigen jullie ook de afzuiging en de kanalen?",
      answer:
        "Bereikbare delen van de afzuigkap en de filters nemen we in overleg " +
        "mee. Technische afzuiginstallaties, kanaalreiniging, demontage en " +
        "werk aan gas- of elektrische apparatuur zijn specialistisch werk dat " +
        "wij niet standaard aanbieden. Wat wij wel en niet doen, zeggen we " +
        "eerlijk vóór we starten.",
    },
    {
      question: "Hoe wordt de prijs bepaald?",
      answer:
        "Op basis van de omvang van de keuken, de zones die meegaan en vooral " +
        "de vervuilingsgraad. Dat laatste bepaalt de tijd, en tijd bepaalt de " +
        "prijs. Daarom vragen we foto's.",
    },
    {
      question: "Zijn foto's nodig?",
      answer:
        "Ze zijn niet verplicht, maar ze maken het verschil tussen een ruwe " +
        "inschatting en een scherp voorstel. Enkele foto's van de kooklijn, de " +
        "frituur- of ovenzone en de wanden volstaan meestal.",
    },
    {
      question: "Kan de reiniging buiten de openingsuren?",
      answer:
        "Ja. Een reset gebeurt meestal na sluiting of op een sluitingsdag, " +
        "zodat uw keuken tijdens de service gewoon beschikbaar blijft.",
    },
    {
      question: "Kunnen jullie de keuken daarna periodiek onderhouden?",
      answer:
        "Dat kan. Veel zaken laten eerst een reset uitvoeren en kiezen daarna " +
        "voor periodieke horecaschoonmaak om dat niveau vast te houden. U " +
        "bent daar niet toe verplicht: de reset staat op zichzelf.",
    },
  ],
  finalCta: {
    title: "Uw keuken terug op niveau",
    text:
      "Stuur enkele foto's mee en wij laten u weten wat er nodig is, hoelang " +
      "het duurt en wat het kost.",
    button: "Ontvang mijn Kitchen Reset voorstel",
  },
};

/* =========================================================================
 * D — Periodieke kantoorschoonmaak
 * Zoekintentie: bedrijf dat een representatieve werkplek wil uitbesteden.
 * ====================================================================== */

const kantoorPeriodiek: PpcPageConfig = {
  slug: "kantoorschoonmaak-antwerpen",
  path: "/lp/kantoorschoonmaak-antwerpen",
  seoTitle: "Periodieke kantoorschoonmaak in Antwerpen",
  seoDescription:
    "Professionele kantoorschoonmaak volgens een vaste planning in Antwerpen. " +
    "Werkplekken, sanitair en gemeenschappelijke ruimtes structureel schoon.",
  dienst: "kantoor",
  eyebrow: "Start met een frisse werkplek",
  h1: "Professionele kantoorschoonmaak volgens een vaste planning",
  sub:
    "We brengen uw kantoor eerst grondig op niveau en houden werkplekken, " +
    "sanitair en gemeenschappelijke ruimtes daarna structureel schoon.",
  heroPoints: [
    "Vaste ploeg en vaste momenten",
    "Buiten de kantooruren mogelijk",
    "Werkplekken, sanitair en keuken",
    "Antwerpen en omgeving",
  ],
  image: siteImages.entreehal,
  offer: {
    badge: "Bij uw opstart",
    title: "Uw eerste Deep Clean inbegrepen*",
    support: "Bij geselecteerde nieuwe periodieke schoonmaakovereenkomsten.",
    footnote: "* Omvang, scope en voorwaarden worden vooraf bevestigd.",
  },
  primaryCta: "Ontvang mijn schoonmaakvoorstel",
  secondaryCta: { label: "Plan een vrijblijvende intake", kind: "intake" },
  whatsappLabel: "Stel uw vraag via WhatsApp",
  whatsappMessage:
    "Hallo, wij zoeken een vaste partner voor de schoonmaak van ons kantoor " +
    "in Antwerpen.",
  form: {
    heading: "Ontvang uw schoonmaakvoorstel",
    intro:
      "Met deze gegevens stellen wij een planning en een prijs op maat van uw " +
      "kantoor voor.",
    groups: [
      {
        title: "1 · Uw kantoor",
        fields: [
          {
            name: "bedrijfstype",
            label: "Type kantoor of bedrijf",
            type: "radio",
            compact: true,
            options: [
              "Kantoor",
              "Praktijk of kabinet",
              "Bedrijfsgebouw",
              "Commerciële ruimte",
              "Anders",
            ],
          },
          {
            name: "oppervlakte",
            label: "Oppervlakte",
            type: "radio",
            compact: true,
            options: [
              "Tot 100 m²",
              "100 – 250 m²",
              "250 – 500 m²",
              "500 – 1.000 m²",
              "Meer dan 1.000 m²",
              "Weet ik niet",
            ],
          },
          {
            name: "werkplekken",
            label: "Aantal werkplekken",
            type: "text",
            inputMode: "numeric",
            placeholder: "bv. 24",
            half: true,
          },
          {
            name: "sanitair",
            label: "Sanitair",
            type: "text",
            placeholder: "bv. 2 toiletblokken",
            help: "Een aantal of een indicatie volstaat.",
            half: true,
          },
          {
            name: "keuken",
            label: "Keuken of kitchenette aanwezig?",
            type: "radio",
            compact: true,
            options: ["Ja", "Nee", "Niet zeker"],
          },
        ],
      },
      {
        title: "2 · Uw planning",
        fields: [
          {
            name: "frequentie",
            label: "Gewenste frequentie",
            type: "radio",
            compact: true,
            options: [
              "Dagelijks",
              "Meerdere keren per week",
              "Wekelijks",
              "Anders",
            ],
          },
          {
            name: "moment",
            label: "Gewenste momenten",
            type: "radio",
            compact: true,
            options: [
              "Voor kantooruren",
              "Tijdens kantooruren",
              "Na kantooruren",
              "Flexibel",
            ],
          },
          {
            name: "staat",
            label: "Hoe is de situatie vandaag?",
            type: "radio",
            compact: true,
            options: [
              "Redelijk schoon",
              "Grondige start nodig",
              "Achterstallige vervuiling",
              "Niet zeker",
            ],
            help: "Dit bepaalt of een Deep Clean bij de opstart zinvol is.",
          },
          ...LOCATIE_VELDEN,
        ],
      },
    ],
    photos: {
      label: "Foto's van uw kantoor",
      help: "Optioneel. Enkele foto's helpen ons de omvang beter in te schatten.",
      prominent: false,
    },
    contact: {
      title: "4 · Uw gegevens",
      fields: [
        {
          name: "bedrijf",
          label: "Bedrijfsnaam",
          type: "text",
          autoComplete: "organization",
          half: true,
        },
        {
          name: "naam",
          label: "Contactpersoon",
          type: "text",
          required: true,
          autoComplete: "name",
          half: true,
        },
        ...TELEFOON_EN_MAIL,
      ],
    },
    submitLabel: "Ontvang mijn schoonmaakvoorstel",
    reassurance: "Vrijblijvend — eerst een voorstel, dan pas afspraken.",
  },
  faq: [
    {
      question: "Welke frequenties zijn mogelijk?",
      answer:
        "Van dagelijks tot wekelijks. Wat het best past hangt af van het " +
        "aantal werkplekken, de bezetting en hoeveel passage uw gebouw kent. " +
        "Dat bepalen we samen bij de intake.",
    },
    {
      question: "Werken jullie buiten de kantooruren?",
      answer:
        "Ja. De meeste kantoren kiezen voor schoonmaak vóór of na de " +
        "kantooruren, zodat niemand gestoord wordt. Tijdens de kantooruren " +
        "kan ook, bijvoorbeeld voor sanitair en gemeenschappelijke ruimtes.",
    },
    {
      question: "Wat houdt die eerste Deep Clean in?",
      answer:
        "Een grondige reiniging vóór het periodieke onderhoud start: " +
        "werkplekken en bureaus, sanitair, de keuken of kitchenette, " +
        "gemeenschappelijke ruimtes, vloeren en de bereikbare oppervlakken. " +
        "Daarna begint het onderhoud vanaf een schone basis.",
    },
    {
      question: "Is die Deep Clean altijd inbegrepen?",
      answer:
        "Niet automatisch. Het aanbod geldt bij geselecteerde nieuwe " +
        "periodieke schoonmaakovereenkomsten. Omvang, scope en voorwaarden " +
        "bevestigen we vooraf in het voorstel.",
    },
    {
      question: "Welke ruimtes kunnen onderhouden worden?",
      answer:
        "Werkplekken en bureaus, vergaderruimtes, onthaal en gangen, sanitair, " +
        "de keuken of kitchenette en gemeenschappelijke ruimtes. Traphallen en " +
        "gemeenschappelijke delen van het gebouw kunnen we mee opnemen.",
    },
    {
      question: "Hoe wordt de prijs bepaald?",
      answer:
        "Op basis van de oppervlakte, het aantal werkplekken en " +
        "sanitairblokken, de frequentie, het moment van de dag en de huidige " +
        "staat. U krijgt een prijs per beurt of per maand, afgesproken vóór " +
        "we starten.",
    },
  ],
  finalCta: {
    title: "Een werkplek die er altijd verzorgd bij ligt",
    text:
      "Vertel ons kort hoe uw kantoor eruitziet, dan stellen wij een planning " +
      "en een prijs voor die daarbij passen.",
    button: "Ontvang mijn schoonmaakvoorstel",
  },
};

/* ---------------------------------------------------------------------- */

export const ppcPages = {
  plaatsbeschrijving,
  horecaPeriodiek,
  kitchenReset,
  kantoorPeriodiek,
} satisfies Record<string, PpcPageConfig>;

/** Alle PPC-paden. Bewust NIET gebruikt in app/sitemap.ts. */
export const ppcPaths = Object.values(ppcPages).map((page) => page.path);
