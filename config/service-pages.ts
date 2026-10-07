import type { Metadata } from "next";
import {
  UtensilsCrossed,
  ChefHat,
  Building2,
  HardHat,
  ClipboardCheck,
  KeyRound,
  Building,
  SprayCan,
} from "lucide-react";
import type { ServicePageData, Slug } from "@/types";
import { siteConfig } from "./site";
import { siteImages } from "./site-images";

/**
 * Volledige, data-gedreven content voor elke dienstpagina. Eén herbruikbaar
 * template (ServicePageTemplate) rendert elke entry uit deze lijst.
 *
 * Elke dienst heeft een eigen invalshoek, eigen situaties, eigen checklist en
 * eigen FAQ — bewust geen herhaalde standaardtekst. Er staan geen prijzen op
 * de site: een offerte wordt altijd op maat gemaakt.
 */
export const servicePages: ServicePageData[] = [
  /* ------------------------------------------------------------------ */
  /* 1. Horecaschoonmaak                                                 */
  /* ------------------------------------------------------------------ */
  {
    slug: "horecaschoonmaak",
    name: "Horecaschoonmaak",
    icon: UtensilsCrossed,
    seoTitle: "Horecaschoonmaak in Antwerpen",
    seoDescription:
      "Professionele horecaschoonmaak in Antwerpen voor restaurants, cafés, bars en hotels. Zaal, keuken en sanitair, ook buiten de openingsuren. Vraag een offerte op maat.",
    eyebrow: "Horecaschoonmaak",
    heroTitle: "Horecaschoonmaak in Antwerpen en omgeving",
    heroIntro:
      "Uw zaak moet er bij elke service onberispelijk uitzien, terwijl uw ploeg al genoeg om handen heeft. Wij nemen de schoonmaak van zaal, keuken en sanitair over — voor de opening of na sluiting, eenmalig of op vaste dagen.",
    heroCard: {
      title: "Wat wij voor uw zaak doen",
      items: [
        "Zaal, toog, keuken en sanitair",
        "Voor de opening of na sluiting",
        "Van dagelijks tot maandelijks",
        "Vaste ploeg en een vast werkschema",
      ],
      footnote: "Starten met één grondige beurt kan ook.",
    },
    whatWeDoText:
      "Wij stemmen de schoonmaak af op uw uren en uw zaak. U bepaalt welke zones wij opnemen en hoe vaak we langskomen; wij leggen het vast in een duidelijk werkschema zodat uw team weet wat er gebeurd is.",
    commonSituations: [
      "De poetshulp valt uit en de zaak moet toch open kunnen",
      "De keuken wordt dagelijks gepoetst, maar het vet stapelt zich op",
      "Het sanitair vraagt meer aandacht dan uw team erin kan steken",
      "U opent een nieuwe zaak en wilt het onderhoud meteen goed regelen",
      "Na een druk weekend of een event moet alles opnieuw piekfijn zijn",
    ],
    primaryBenefits: [
      "Schoonmaak voor de opening of na sluiting, zonder verlies van omzeturen",
      "Zaal, toog, keuken, sanitair en personeelsruimtes in één opdracht",
      "Van dagelijks tot maandelijks, of eenmalig bij een piek",
      "Een vaste ploeg die uw zaak kent en volgens een vast schema werkt",
    ],
    includedItems: [
      "Zaal: tafels, stoelen, banken, vensterbanken en vloeren",
      "Toog en barzone, inclusief werkvlakken en spoelbak",
      "Keuken: werkbanken, inox, vloeren en afvalzone",
      "Sanitair: toiletten, lavabo's, spiegels en aanvullen van verbruik",
      "Deuren, klinken, schakelaars en andere contactpunten",
      "Personeels- en kleedruimtes in overleg",
      "Afval naar de door u aangeduide verzamelplaats",
    ],
    optionalItems: [
      "Dieptereiniging van de keuken (Kitchen Reset)",
      "Ramen en glaspartijen langs de binnenzijde",
      "Terraszone en gevelaanzicht",
      "Extra beurt na een event of feestdagen",
    ],
    processSteps: [
      {
        title: "Vertel ons over uw zaak",
        description:
          "Type zaak, oppervlakte, openingsuren en wat er vandaag al gebeurt door uw eigen team.",
      },
      {
        title: "Wij bekijken de zaak ter plaatse",
        description:
          "Zo zien we de keuken, het sanitair en de zones die extra aandacht vragen.",
      },
      {
        title: "U ontvangt een offerte op maat",
        description:
          "Met een duidelijk werkschema: welke zones, welke frequentie en op welk moment.",
      },
      {
        title: "Wij komen op vaste momenten",
        description:
          "Voor opening of na sluiting, volgens de afspraken. U hoeft niet aanwezig te zijn.",
      },
    ],
    forWho: [
      "Restaurants, bistro's en brasserieën",
      "Cafés, bars en lunchzaken",
      "Hotels en B&B's",
      "Bakkerijen, frituren en traiteurs",
      "Cateringbedrijven en grootkeukens",
    ],
    faq: [
      {
        question: "Komen jullie ook buiten de openingsuren?",
        answer:
          "Ja. Wij werken bij voorkeur voor de opening of na sluiting, zodat uw zaak geen omzeturen verliest. De concrete tijdstippen leggen we samen vast.",
      },
      {
        question: "Kunnen we starten met een eenmalige beurt?",
        answer:
          "Zeker. Veel zaken starten met een eenmalige grondige beurt en schakelen daarna over op een periodiek schema. U bent tot niets verplicht.",
      },
      {
        question: "Wie levert de producten en het materiaal?",
        answer:
          "Standaard brengen wij ons eigen materiaal en producten mee. Werkt u liever met de producten die al in huis zijn, bijvoorbeeld omwille van uw eigen procedures, dan spreken we dat vooraf af.",
      },
      {
        question: "Is de keuken inbegrepen in de dagelijkse schoonmaak?",
        answer:
          "De dagelijkse of wekelijkse keukenzone nemen wij mee zoals afgesproken. Voor het aangekoekte vet achter en onder de toestellen is een periodieke dieptereiniging de betere aanpak — dat is onze Kitchen Reset.",
      },
      {
        question: "Werken jullie met een vaste ploeg?",
        answer:
          "Ja. U krijgt zoveel mogelijk dezelfde mensen over de vloer, met één aanspreekpunt. Dat maakt het resultaat voorspelbaar en de communicatie eenvoudig.",
      },
      {
        question: "Wat kost horecaschoonmaak?",
        answer:
          "Dat hangt af van de oppervlakte, de zones, de frequentie en het tijdstip. Na een korte rondgang ter plaatse ontvangt u een offerte op maat met een duidelijk werkschema.",
      },
    ],
    whatsappMessage:
      "Hallo, ik wil graag een offerte voor horecaschoonmaak in Antwerpen. Het gaat om een zaak van ongeveer ... m².",
    quoteIntent: "horeca",
    heroImage: siteImages.horecaSerre,
    pricingText:
      "De prijs hangt af van de oppervlakte, welke zones we opnemen, hoe vaak we komen en op welk moment we werken. Na een korte rondgang ter plaatse krijgt u een offerte op maat met een concreet werkschema — geen open eindjes.",
    crossSell: {
      title: "Ook de keuken grondig laten aanpakken?",
      text: "Naast de dagelijkse schoonmaak vraagt een professionele keuken periodiek een grondige beurt: vet, inox, vloeren en de zones achter en onder de toestellen. Dat is onze Kitchen Reset.",
      links: [
        {
          label: "Horecakeuken dieptereiniging",
          href: "/horecakeuken-dieptereiniging",
        },
        { label: "Professionele dieptereiniging", href: "/dieptereiniging" },
      ],
      ctaLabel: "Vraag een offerte aan",
      ctaHref: "/offerte?dienst=horeca",
    },
  },

  /* ------------------------------------------------------------------ */
  /* 2. Horecakeuken dieptereiniging — Kitchen Reset                     */
  /* ------------------------------------------------------------------ */
  {
    slug: "horecakeuken-dieptereiniging",
    name: "Horecakeuken dieptereiniging",
    icon: ChefHat,
    seoTitle: "Horecakeuken dieptereiniging — Kitchen Reset",
    seoDescription:
      "Kitchen Reset: periodieke dieptereiniging van professionele keukens in Antwerpen. Vet, inox, vloeren, wanden en de zones achter en onder de toestellen.",
    eyebrow: "Kitchen Reset",
    heroTitle: "Kitchen Reset: dieptereiniging van uw professionele keuken",
    heroIntro:
      "Elke keuken wordt dagelijks gepoetst, en toch bouwt vet zich op waar niemand dagelijks aan toekomt: achter de toestellen, tegen de wanden, op de rekken en in de afwaszone. Onze Kitchen Reset zet uw keuken periodiek terug op nul.",
    heroCard: {
      title: "Wat een Kitchen Reset omvat",
      items: [
        "Ontvetten van inox, wanden en rekken",
        "Vloeren tot in de hoeken en onder de werkbanken",
        "Zones achter en onder de toestellen",
        "Afwaszone, spoelbakken en afvalzone",
      ],
      footnote: "Ingepland 's nachts, op de sluitingsdag of tijdens een sluitingsperiode.",
    },
    whatWeDoText:
      "Een Kitchen Reset is een grondige beurt bovenop uw dagelijkse schoonmaak. Wij werken zone per zone, ook op de plaatsen die tijdens de service onbereikbaar zijn, en plannen dat op een moment waarop uw keuken stilligt.",
    commonSituations: [
      "Er zit aangekoekt vet op wanden, rekken en achter de toestellen",
      "De vloer blijft plakkerig ondanks dagelijks dweilen",
      "De keuken is toe aan een grondige beurt vóór een controle of inspectie",
      "Na een drukke periode of de feestdagen moet alles terug op punt",
      "U neemt een bestaande zaak over en wilt met een propere keuken starten",
    ],
    primaryBenefits: [
      "Grondige reiniging van vet en aanslag op moeilijk bereikbare plaatsen",
      "Werkt zone per zone: kookzone, afwaszone, opslag en afvalzone",
      "Ingepland 's nachts, op de sluitingsdag of tijdens een sluitingsperiode",
      "Op een vast interval in te plannen, of eenmalig wanneer het nodig is",
    ],
    includedItems: [
      "Ontvetten van inox oppervlakken, werkbanken en spatwanden",
      "Wanden, tegelwerk en plinten in de kookzone",
      "Vloeren inclusief hoeken, randen en onder de werkbanken",
      "Rekken, stellingen en opbergzones",
      "Buitenzijde van toestellen en de zones eronder en erachter, waar deze veilig bereikbaar zijn",
      "Afwaszone, spoelbakken en de omgeving van de vaatwasmachine",
      "Afvalzone en de omgeving van de containers",
    ],
    optionalItems: [
      "Binnenzijde van ovens, friteuses en koeling, in overleg",
      "Dampkapfilters, in overleg en voor zover demonteerbaar zonder technische ingreep",
      "Koelcel en diepvriesruimte",
      "Aansluitend een periodiek schema voor de dagelijkse schoonmaak",
    ],
    processSteps: [
      {
        title: "Wij bekijken de keuken",
        description:
          "Ter plaatse bepalen we de zones, de toestand en wat veilig bereikbaar is.",
      },
      {
        title: "U krijgt een offerte met zonelijst",
        description:
          "Zwart op wit welke zones de Kitchen Reset omvat en wat eventueel meerwerk is.",
      },
      {
        title: "We plannen buiten de service",
        description:
          "'s Nachts, op de sluitingsdag of tijdens een sluitingsperiode — uw keuken ligt niet stil tijdens de uren die tellen.",
      },
      {
        title: "Oplevering en vervolgafspraak",
        description:
          "We lopen het resultaat met u na en bepalen samen wanneer de volgende beurt nodig is.",
      },
    ],
    forWho: [
      "Restaurants en brasserieën met een intensieve kookzone",
      "Grootkeukens, catering en bedrijfsrestaurants",
      "Hotels met een eigen keuken",
      "Frituren, snackbars en bakkerijen",
      "Overnames en heropstarts van een bestaande zaak",
    ],
    faq: [
      {
        question: "Wat is een Kitchen Reset precies?",
        answer:
          "Een Kitchen Reset is een periodieke dieptereiniging van uw professionele keuken. We pakken de plaatsen aan die tijdens de dagelijkse schoonmaak niet aan bod komen: vet op wanden en rekken, vloeren tot in de hoeken, de afwaszone en de zones achter en onder de toestellen.",
      },
      {
        question: "Hoe vaak is een dieptereiniging nodig?",
        answer:
          "Dat hangt af van uw keuken en uw kookstijl. Bij intensief frituren of bakken is een korter interval logisch, bij een lichtere keuken kan het interval ruimer. We bespreken een realistisch ritme op basis van wat we ter plaatse zien.",
      },
      {
        question: "Ligt mijn keuken stil tijdens de reiniging?",
        answer:
          "Wij plannen de Kitchen Reset buiten de service: 's nachts, op de sluitingsdag of tijdens een sluitingsperiode. Zo ligt uw keuken niet stil op de momenten waarop u draait.",
      },
      {
        question: "Verplaatsen jullie de toestellen?",
        answer:
          "Wij reinigen de zones achter en onder de toestellen voor zover die veilig bereikbaar zijn en de toestellen zonder technische ingreep verplaatst of geopend kunnen worden. Losgekoppeld of gedemonteerd werk laten we over aan uw technieker.",
      },
      {
        question: "Voldoet mijn keuken daarna aan de regels?",
        answer:
          "Wij verzorgen de reiniging; wij zijn geen controle- of certificeringsinstantie en geven dus geen goedkeuring of certificaat af. Een grondig gereinigde keuken maakt het voor u wel merkbaar eenvoudiger om uw eigen procedures en registers op orde te houden.",
      },
      {
        question: "Kan dit gecombineerd worden met de gewone schoonmaak?",
        answer:
          "Ja. Veel zaken laten ons de dagelijkse of wekelijkse schoonmaak doen en plannen daarbovenop een Kitchen Reset op vaste momenten in het jaar.",
      },
    ],
    whatsappMessage:
      "Hallo, ik wil graag een offerte voor een Kitchen Reset (dieptereiniging keuken) in Antwerpen.",
    quoteIntent: "horecakeuken",
    heroImage: siteImages.keukenInox,
    pricingText:
      "Een Kitchen Reset wordt altijd op maat geprijsd: de oppervlakte, het aantal toestellen, de toestand van de keuken en de bereikbaarheid bepalen de omvang. U krijgt een offerte met een concrete zonelijst, zodat duidelijk is wat inbegrepen is.",
    crossSell: {
      title: "Ook de rest van de zaak in onderhoud?",
      text: "Naast de keuken verzorgen wij ook zaal, toog en sanitair — eenmalig of op vaste dagen, telkens buiten uw openingsuren.",
      links: [{ label: "Horecaschoonmaak", href: "/horecaschoonmaak" }],
      ctaLabel: "Vraag een offerte aan",
      ctaHref: "/offerte?dienst=horecakeuken",
    },
  },

  /* ------------------------------------------------------------------ */
  /* 3. Kantoorschoonmaak                                                */
  /* ------------------------------------------------------------------ */
  {
    slug: "kantoorschoonmaak",
    name: "Kantoorschoonmaak",
    icon: Building2,
    seoTitle: "Kantoorschoonmaak in Antwerpen",
    seoDescription:
      "Periodieke kantoorschoonmaak in Antwerpen voor kantoren, praktijken, winkels en showrooms. Vaste dagen, vaste ploeg en een contract op maat.",
    eyebrow: "Kantoorschoonmaak",
    heroTitle: "Kantoorschoonmaak met een vast schema",
    heroIntro:
      "Een verzorgd kantoor zegt iets over uw bedrijf, maar het onderhoud mag geen dagelijkse zorg zijn. Wij komen op vaste dagen langs, buiten of tijdens de kantooruren, volgens een schema dat we samen vastleggen.",
    heroCard: {
      title: "Wat uw contract omvat",
      items: [
        "Een vast schema per ruimte",
        "Sanitair en keukenhoek standaard mee",
        "Vóór, tijdens of na de kantooruren",
        "Eén aanspreekpunt voor de opvolging",
      ],
      footnote: "Ook voor meerdere vestigingen of praktijken.",
    },
    whatWeDoText:
      "Wij werken met een vast onderhoudsschema per ruimte: wat gebeurt er elke beurt, wat periodiek. Zo weet u precies wat u krijgt en blijft het resultaat gelijk, ook wanneer uw eigen team wisselt.",
    commonSituations: [
      "Uw huidige poetshulp levert wisselend werk of valt regelmatig uit",
      "Het kantoor is gegroeid en het onderhoud is niet meegegroeid",
      "U verhuist naar een nieuw pand en wilt het onderhoud meteen goed regelen",
      "Klanten en kandidaten komen over de vloer en de eerste indruk telt",
      "Sanitair en keukenhoek vragen meer aandacht dan uw team kan geven",
    ],
    primaryBenefits: [
      "Een vast schema per ruimte, met dezelfde ploeg en één aanspreekpunt",
      "Werkuren die passen: voor de opening, na sluitingstijd of overdag",
      "Sanitair, keukenhoek en vergaderruimtes standaard mee opgenomen",
      "Periodieke extra's zoals ramen of vloeronderhoud, in hetzelfde contract",
    ],
    includedItems: [
      "Bureauruimtes: bureaus, oppervlakken en vloeren",
      "Vergaderzalen en ontvangstruimte",
      "Sanitair: toiletten, lavabo's, spiegels en aanvullen van verbruik",
      "Keukenhoek en koffiezone, inclusief buitenzijde van de toestellen",
      "Contactpunten: deuren, klinken, schakelaars en trapleuningen",
      "Gangen, inkom en circulatiezones",
      "Afval en sortering naar de verzamelplaats",
    ],
    optionalItems: [
      "Ramen en glaswanden langs de binnenzijde",
      "Periodiek vloeronderhoud",
      "Extra beurt na een verbouwing of interne verhuis",
      "Aanvullen van sanitair verbruiksmateriaal in uw beheer",
    ],
    processSteps: [
      {
        title: "Kort plaatsbezoek",
        description:
          "We bekijken de ruimtes, de oppervlakte en de momenten waarop wij kunnen werken.",
      },
      {
        title: "Voorstel met werkschema",
        description:
          "U krijgt een offerte met per ruimte de frequentie en de taken, zonder vage omschrijvingen.",
      },
      {
        title: "Opstart met een vaste ploeg",
        description:
          "We spreken toegang, sleutels of badges af en starten op de afgesproken dag.",
      },
      {
        title: "Opvolging en bijsturing",
        description:
          "Verandert er iets aan uw kantoor of team, dan passen we het schema in overleg aan.",
      },
    ],
    forWho: [
      "Kantoren en kantoorgebouwen",
      "Praktijken: artsen, tandartsen, kinesisten en therapeuten",
      "Advocaten, accountants en makelaarskantoren",
      "Winkels, showrooms en handelsruimtes",
      "Kleinere bedrijfsgebouwen en ateliers",
    ],
    faq: [
      {
        question: "Werken jullie tijdens of buiten de kantooruren?",
        answer:
          "Allebei is mogelijk. Veel klanten kiezen voor de vroege ochtend of de avond, zodat er niemand gestoord wordt. Praktijken kiezen vaak voor een moment tussen de consultaties.",
      },
      {
        question: "Is er een minimumfrequentie of een lange opzegtermijn?",
        answer:
          "Wij werken met afspraken op maat. Van enkele keren per week tot maandelijks is mogelijk. De concrete voorwaarden staan in de offerte, zodat u vooraf weet waaraan u toe bent.",
      },
      {
        question: "Hoe regelen we de toegang tot het gebouw?",
        answer:
          "In overleg: met sleutels, een badge of een code. We leggen vast wie toegang heeft en hoe er afgesloten wordt, zodat daar geen discussie over kan ontstaan.",
      },
      {
        question: "Krijgen wij altijd dezelfde poetsploeg?",
        answer:
          "Dat is het uitgangspunt. Een vaste ploeg kent uw kantoor, uw afspraken en uw prioriteiten. Bij ziekte of verlof zorgen wij voor vervanging volgens hetzelfde werkschema.",
      },
      {
        question: "Vullen jullie ook handdoekjes en zeep aan?",
        answer:
          "Dat kan. Wij kunnen het verbruiksmateriaal aanvullen dat u zelf voorziet, of het in overleg voor u mee bestellen. Dat leggen we vast in de offerte.",
      },
      {
        question: "Wat kost kantoorschoonmaak per maand?",
        answer:
          "De prijs hangt af van de oppervlakte, het aantal ruimtes, de frequentie en het tijdstip. Na een kort plaatsbezoek ontvangt u een offerte met een vast bedrag per beurt of per maand.",
      },
    ],
    whatsappMessage:
      "Hallo, ik wil graag een offerte voor kantoorschoonmaak in Antwerpen. Het gaat om ongeveer ... m².",
    quoteIntent: "kantoor",
    heroImage: siteImages.werkwagen,
    pricingText:
      "Kantoorschoonmaak wordt geprijsd per beurt of per maand, op basis van de oppervlakte, het aantal ruimtes, de frequentie en het moment waarop we werken. U krijgt een offerte met een vast bedrag en een concreet werkschema.",
    crossSell: {
      title: "Ook de gemeenschappelijke delen van het gebouw?",
      text: "Deelt u een gebouw met andere huurders? Dan kunnen wij ook de traphal, de inkom en de gangen periodiek onderhouden, in afspraak met de syndicus of eigenaar.",
      links: [
        {
          label: "Traphallen en gemeenschappelijke delen",
          href: "/traphal-schoonmaak",
        },
      ],
      ctaLabel: "Vraag een offerte aan",
      ctaHref: "/offerte?dienst=kantoor",
    },
  },

  /* ------------------------------------------------------------------ */
  /* 4. Opleveringsschoonmaak                                            */
  /* ------------------------------------------------------------------ */
  {
    slug: "opleveringsschoonmaak",
    name: "Opleveringsschoonmaak",
    icon: HardHat,
    seoTitle: "Opleveringsschoonmaak na werken in Antwerpen",
    seoDescription:
      "Opleveringsschoonmaak in Antwerpen na nieuwbouw, renovatie of schilderwerken. Bouwstof, verfresten en werfvuil weg, klaar voor de oplevering.",
    eyebrow: "Opleveringsschoonmaak",
    heroTitle: "Opleveringsschoonmaak na nieuwbouw of renovatie",
    heroIntro:
      "Na de laatste werkdag ligt er bouwstof op elke horizontale vlak, zitten er verfspatten op het glas en plakken de stickers nog op het schrijnwerk. Wij maken het pand opleverklaar, zodat u op datum kunt opleveren of overdragen.",
    heroCard: {
      title: "Wat wij na de werken aanpakken",
      items: [
        "Bouwstof van plafond tot plint",
        "Ramen binnen, inclusief kaders en dorpels",
        "Stickers, verfresten en siliconen",
        "Keuken, sanitair en vloeren afgewerkt",
      ],
      footnote: "Ook een tussentijdse beurt tussen twee fases van de werken.",
    },
    whatWeDoText:
      "Een opleveringsschoonmaak is geen gewone poetsbeurt. Bouwstof zit overal en komt in golven terug; daarom werken we van boven naar beneden en in de juiste volgorde, zodat het resultaat standhoudt tot de oplevering.",
    commonSituations: [
      "De werken zijn klaar en de oplevering staat over enkele dagen gepland",
      "Na het schilderen liggen er verfresten en stof op alle oppervlakken",
      "Een appartement of woning moet instapklaar zijn voor de kopers",
      "Een handelspand moet open kunnen kort na de afwerking",
      "Er is een tussentijdse poetsbeurt nodig tussen twee fases van de werken",
    ],
    primaryBenefits: [
      "Verwijderen van bouwstof, verfresten, siliconen en stickerresten",
      "Van boven naar beneden gewerkt, zodat stof niet terugkomt",
      "Ingepland op uw opleverdatum, ook op korte termijn wanneer mogelijk",
      "Voor aannemers, ontwikkelaars, verhuurders en particulieren",
    ],
    includedItems: [
      "Stofvrij maken van plafonds, wanden en alle horizontale vlakken",
      "Ramen langs de binnenzijde, inclusief kaders en dorpels",
      "Verwijderen van stickers, etiketten en beschermfolie waar veilig mogelijk",
      "Keuken: kasten van binnen en buiten, werkblad en spoelbak",
      "Sanitair: toiletten, douche, bad, lavabo's en tegelwerk",
      "Deuren, deurkaders, plinten, schakelaars en stopcontacten",
      "Vloeren: stofzuigen en dweilen, afgestemd op het vloertype",
      "Radiatoren en zichtbare leidingen",
    ],
    optionalItems: [
      "Tweede beurt vlak voor de oplevering, na de laatste werkdag",
      "Ramen langs de buitenzijde, indien veilig bereikbaar",
      "Afvoeren van achtergebleven verpakkingen en werfafval, in overleg",
      "Reiniging van terras, garage of kelder",
    ],
    processSteps: [
      {
        title: "Bezorg ons de gegevens van het pand",
        description:
          "Oppervlakte, aantal ruimtes, type werken en uw gewenste opleverdatum.",
      },
      {
        title: "Plaatsbezoek of foto's",
        description:
          "Bij grotere werven komen we langs; voor kleinere panden volstaan duidelijke foto's vaak.",
      },
      {
        title: "Offerte en planning",
        description:
          "U krijgt een prijs op maat en een datum die aansluit op uw planning.",
      },
      {
        title: "Wij maken het pand opleverklaar",
        description:
          "Wij werken de ruimtes af zodat u kunt opleveren, verhuren of verkopen.",
      },
    ],
    forWho: [
      "Aannemers en algemene bouwbedrijven",
      "Schilders, plaatsers en afwerkingsbedrijven",
      "Projectontwikkelaars en bouwpromotoren",
      "Verhuurders en eigenaars na een renovatie",
      "Particulieren na een verbouwing",
    ],
    faq: [
      {
        question: "Wat is het verschil met een gewone schoonmaak?",
        answer:
          "Bij een opleveringsschoonmaak ligt de nadruk op bouwstof, verfresten, siliconen en stickerresten. Dat vraagt een andere volgorde, ander materiaal en meer tijd dan een gewone onderhoudsbeurt.",
      },
      {
        question: "Wanneer plannen we dit het best in?",
        answer:
          "Nadat de laatste werken klaar zijn en er niemand meer met materiaal door het pand moet. Wordt er nadien nog gewerkt, dan plannen we beter een tussentijdse beurt en een eindbeurt.",
      },
      {
        question: "Verwijderen jullie ook het werfafval?",
        answer:
          "Los verpakkingsmateriaal en klein werfafval nemen we in overleg mee. Gaat het om grotere hoeveelheden puin of bouwafval, dan stemmen we vooraf af hoe dat afgevoerd wordt.",
      },
      {
        question: "Doen jullie ook de ramen?",
        answer:
          "Ramen langs de binnenzijde, inclusief kaders en dorpels, zitten standaard in de opleveringsschoonmaak. De buitenzijde nemen we mee als die veilig en zonder hoogtewerker bereikbaar is.",
      },
      {
        question: "Kunnen jullie op korte termijn komen?",
        answer:
          "Vaak wel. Laat ons zo vroeg mogelijk uw opleverdatum weten, dan bekijken we meteen wat haalbaar is en bevestigen we een realistische planning.",
      },
      {
        question: "Werken jullie ook voor aannemers op meerdere werven?",
        answer:
          "Ja. Voor aannemers en ontwikkelaars werken we graag met terugkerende afspraken per project, met één contactpersoon en een vaste werkwijze per oplevering.",
      },
    ],
    whatsappMessage:
      "Hallo, ik heb een opleveringsschoonmaak nodig in Antwerpen na werken. Ik geef graag de oppervlakte en de opleverdatum door.",
    quoteIntent: "oplevering",
    crossSell: {
      title: "Meteen ook verhuur- of verkoopklaar?",
      text: "Wordt het pand na de werken verhuurd of verkocht? Dan kunnen we in dezelfde beurt ook de afwerking verzorgen die nodig is voor de fotoreportage en de eerste bezoeken.",
      links: [
        {
          label: "Verhuur- en verkoopklaar schoonmaak",
          href: "/verhuur-verkoopklaar-schoonmaak",
        },
        { label: "Professionele dieptereiniging", href: "/dieptereiniging" },
      ],
      ctaLabel: "Vraag een offerte aan",
      ctaHref: "/offerte?dienst=oplevering",
    },
  },

  /* ------------------------------------------------------------------ */
  /* 5. Schoonmaak voor plaatsbeschrijving                               */
  /* ------------------------------------------------------------------ */
  {
    slug: "schoonmaak-voor-plaatsbeschrijving",
    name: "Schoonmaak voor plaatsbeschrijving",
    icon: ClipboardCheck,
    seoTitle: "Schoonmaak voor plaatsbeschrijving in Antwerpen",
    seoDescription:
      "Professionele eindschoonmaak vóór de plaatsbeschrijving en sleuteloverdracht in Antwerpen. Keuken, badkamer, vloeren en detailwerk, afgestemd op uw datum.",
    eyebrow: "Plaatsbeschrijving",
    heroTitle: "Schoonmaak voor plaatsbeschrijving",
    heroIntro:
      "Verlaat u binnenkort uw huurwoning? Wij zorgen voor een professionele eindschoonmaak zodat de woning netjes klaarstaat voor de plaatsbeschrijving en de sleuteloverdracht. U geeft de datum door, wij stemmen de planning daarop af.",
    heroCard: {
      title: "Uw datum bepaalt de planning",
      items: [
        "Datum van de plaatsbeschrijving",
        "Datum van de sleuteloverdracht",
        "Woning, appartement, studio of kot",
        "Oven, koelkast en ramen in overleg",
      ],
      footnote:
        "Geef uw datum door bij de aanvraag, dan plannen wij de schoonmaak ruim op tijd.",
    },
    whatWeDoText:
      "Bij een plaatsbeschrijving wordt in detail gekeken: de binnenkant van de keukenkasten, de voegen in de badkamer, de plinten, de schakelaars. Wij werken die punten systematisch af, zodat de woning er netjes bij staat op het moment dat het telt.",
    commonSituations: [
      "De plaatsbeschrijving is vastgelegd en de woning moet er netjes bij staan",
      "U bent volop aan het verhuizen en komt niet meer toe aan grondig kuisen",
      "De woning is net leeg en er komt stof en vuil naar boven",
      "U woont al in uw nieuwe woning en wilt de oude in één keer laten afwerken",
      "Een verhuurder wil het appartement proper opgeleverd zien voor de nieuwe huurder",
    ],
    primaryBenefits: [
      "Volledige eindschoonmaak van de lege woning of het appartement",
      "Extra aandacht voor de punten die bij een plaatsbeschrijving opvallen",
      "Gepland vóór uw datum van plaatsbeschrijving of sleuteloverdracht",
      "Oven, koelkast en ramen kunnen mee opgenomen worden in overleg",
    ],
    includedItems: [
      "Keuken: werkblad, spoelbak, kasten van binnen en buiten, spatwand",
      "Badkamer en sanitair: douche, bad, lavabo, toilet, tegels en voegen",
      "Vloeren in alle ruimtes, inclusief hoeken en randen",
      "Plinten, deuren, deurkaders en klinken",
      "Schakelaars, stopcontacten en lichtpunten",
      "Radiatoren en vensterbanken",
      "Binnenzijde van de lege kasten",
      "Verwijderen van stof en spinnenwebben",
    ],
    optionalItems: [
      "Oven en/of dampkap reinigen",
      "Koelkast en diepvries reinigen en ontdooid opleveren",
      "Ramen langs de binnenzijde, of langs beide zijden waar veilig bereikbaar",
      "Terras, kelder, garage of berging",
    ],
    processSteps: [
      {
        title: "Geef uw data door",
        description:
          "De datum van de plaatsbeschrijving en van de sleuteloverdracht bepalen onze planning.",
      },
      {
        title: "Bezorg ons de details",
        description:
          "Type woning, oppervlakte, aantal slaapkamers en of de woning leeg of nog gemeubileerd is.",
      },
      {
        title: "U ontvangt een offerte op maat",
        description:
          "Met de opties die u wenst, zoals oven, koelkast of ramen, duidelijk vermeld.",
      },
      {
        title: "Wij kuisen vóór uw afspraak",
        description:
          "Wij plannen de schoonmaak ruim vóór de plaatsbeschrijving, zodat u zelf niets meer hoeft te doen.",
      },
    ],
    forWho: [
      "Huurders die een huurcontract beëindigen",
      "Studenten en koten bij het einde van het academiejaar",
      "Verhuurders die het pand proper willen laten opleveren",
      "Makelaars en beheerders die een overdracht begeleiden",
      "Iedereen die na de verhuis niet zelf wil poetsen",
    ],
    faq: [
      {
        question: "Wanneer plannen we de schoonmaak het best?",
        answer:
          "Het best nadat de woning volledig leeg is en vóór de dag van de plaatsbeschrijving. Zo komt er nadien geen verhuisstof meer bij. Geef ons beide data door, dan plannen we daarop.",
      },
      {
        question: "Moet de woning helemaal leeg zijn?",
        answer:
          "Een lege woning geeft het beste resultaat en werkt het vlotst. Staat er nog meubilair, laat het ons dan vooraf weten: we bekijken wat haalbaar is en houden er rekening mee in de offerte.",
      },
      {
        question: "Krijg ik mijn huurwaarborg terug na een professionele schoonmaak?",
        answer:
          "Dat beslist u niet samen met ons: de teruggave van de huurwaarborg hangt af van de plaatsbeschrijving en de afspraken met uw verhuurder, en ook van zaken zoals slijtage of schade. Wij zorgen ervoor dat de woning er proper bij staat; daar kunnen wij ons werk op afstemmen, maar geen uitkomst op garanderen.",
      },
      {
        question: "Zijn de oven en de koelkast inbegrepen?",
        answer:
          "Die nemen we op als optie, omdat ze niet in elke woning aanwezig of nodig zijn. Geef bij uw aanvraag aan of u ze mee wilt, dan staan ze duidelijk in de offerte.",
      },
      {
        question: "Doen jullie ook de ramen?",
        answer:
          "Ja, in overleg. De binnenzijde kunnen we altijd meenemen, de buitenzijde wanneer die veilig bereikbaar is zonder speciale uitrusting.",
      },
      {
        question: "Hoe snel kunnen jullie komen?",
        answer:
          "Dat hangt af van onze planning en van uw datum. Vraag dus liefst aan zodra u uw datum van plaatsbeschrijving kent, dan houden we die plaats voor u vrij.",
      },
    ],
    whatsappMessage:
      "Hallo, ik heb een eindschoonmaak nodig voor de plaatsbeschrijving in Antwerpen. Mijn plaatsbeschrijving is gepland op ...",
    quoteIntent: "plaatsbeschrijving",
    heroImage: siteImages.woningEindschoonmaak,
    pricingText:
      "De prijs hangt af van de oppervlakte, het aantal slaapkamers en badkamers, de staat van de woning en de opties die u kiest, zoals oven, koelkast of ramen. U krijgt vooraf een offerte op maat, zodat u weet waaraan u toe bent.",
    crossSell: {
      title: "Verhuurder of makelaar?",
      text: "Wordt het pand meteen opnieuw verhuurd of verkocht? Dan kunnen wij het in dezelfde beurt ook presentabel maken voor de fotoreportage en de eerste bezoeken.",
      links: [
        {
          label: "Verhuur- en verkoopklaar schoonmaak",
          href: "/verhuur-verkoopklaar-schoonmaak",
        },
        { label: "Opleveringsschoonmaak", href: "/opleveringsschoonmaak" },
      ],
      ctaLabel: "Vraag een offerte aan",
      ctaHref: "/offerte?dienst=plaatsbeschrijving",
    },
  },

  /* ------------------------------------------------------------------ */
  /* 6. Verhuur- en verkoopklaar schoonmaak                              */
  /* ------------------------------------------------------------------ */
  {
    slug: "verhuur-verkoopklaar-schoonmaak",
    name: "Verhuur- en verkoopklaar schoonmaak",
    icon: KeyRound,
    seoTitle: "Verhuur- en verkoopklaar schoonmaak in Antwerpen",
    seoDescription:
      "Uw pand professioneel laten reinigen vóór verhuur of verkoop in Antwerpen. Klaar voor de fotoreportage, de bezoeken en de nieuwe huurder.",
    eyebrow: "Verhuur & verkoop",
    heroTitle: "Uw pand proper en presentabel op de markt",
    heroIntro:
      "Een pand dat proper oogt, verhuurt en verkoopt vlotter. Tussen twee huurders of vlak voor de fotoreportage telt elke dag, dus wij werken snel en gericht: wat opvalt op foto's en tijdens een bezoek, pakken we eerst aan.",
    heroCard: {
      title: "Wat het pand klaarmaakt",
      items: [
        "Keuken, sanitair en vloeren",
        "Ramen langs de binnenzijde",
        "Detailpunten die op foto's opvallen",
        "Snelle doorlooptijd tussen twee huurders",
      ],
      footnote: "Vaste werkwijze voor eigenaars en beheerders met meerdere panden.",
    },
    whatWeDoText:
      "Wij kijken naar uw pand zoals een kandidaat-huurder of koper dat doet: de inkom, het licht, de keuken, de badkamer en de geur. Die punten bepalen de eerste indruk en krijgen bij ons voorrang.",
    commonSituations: [
      "De vorige huurder is vertrokken en het pand moet meteen opnieuw op de markt",
      "De fotoreportage staat gepland en het pand moet er op zijn best uitzien",
      "Een pand staat al een tijd leeg en oogt stoffig bij bezoeken",
      "U beheert meerdere panden en wilt één vaste partner voor de schoonmaak",
      "Na een oplevering of ontruiming moet het pand nog afgewerkt worden",
    ],
    primaryBenefits: [
      "Snelle doorlooptijd tussen twee huurders",
      "Gericht op wat telt bij foto's en bezichtigingen",
      "Volledige reiniging van keuken, sanitair, vloeren en detailpunten",
      "Vaste werkwijze voor eigenaars en beheerders met meerdere panden",
    ],
    includedItems: [
      "Keuken: kasten van binnen en buiten, werkblad, spoelbak en spatwand",
      "Badkamer en toilet: sanitair, tegels, voegen en spiegels",
      "Vloeren in alle ruimtes",
      "Ramen langs de binnenzijde, inclusief kaders en dorpels",
      "Deuren, plinten, schakelaars en vensterbanken",
      "Stof en spinnenwebben, ook in de hoeken en op hoogte",
      "Inkom en circulatieruimtes",
    ],
    optionalItems: [
      "Oven, dampkap en koelkast",
      "Ramen langs de buitenzijde, indien veilig bereikbaar",
      "Terras, tuinberging, kelder of garage",
      "Terugkerende beurt bij langere leegstand",
    ],
    processSteps: [
      {
        title: "Bezorg ons de gegevens",
        description:
          "Adres, type pand, oppervlakte en de datum waarop het klaar moet zijn.",
      },
      {
        title: "Offerte op maat",
        description:
          "Duidelijk wat inbegrepen is, met opties zoals ramen of oven apart vermeld.",
      },
      {
        title: "Wij plannen kort op de bal",
        description:
          "We stemmen af op uw fotoreportage, bezoekmomenten of de intrek van de nieuwe huurder.",
      },
      {
        title: "Klaar voor de markt",
        description:
          "Het pand staat proper en presentabel klaar voor foto's, bezoek of overdracht.",
      },
    ],
    forWho: [
      "Verhuurders en eigenaars",
      "Vastgoedmakelaars",
      "Vastgoedbeheerders en rentmeesters",
      "Investeerders met meerdere panden",
      "Syndici bij de overdracht van een unit",
    ],
    faq: [
      {
        question: "Hoe snel kan een pand klaar zijn?",
        answer:
          "Voor een gemiddeld appartement volstaat vaak één werkdag. Laat ons uw deadline weten, dan bevestigen we wat haalbaar is binnen onze planning.",
      },
      {
        question: "Werken jullie ook voor meerdere panden?",
        answer:
          "Ja. Voor eigenaars, beheerders en makelaars met meerdere panden werken we met vaste afspraken en één contactpersoon, zodat elke opdracht op dezelfde manier verloopt.",
      },
      {
        question: "Kan het pand nog gemeubileerd zijn?",
        answer:
          "Dat kan, maar het resultaat is het beste in een leeg pand. Staat er nog meubilair of achtergelaten inboedel, geef dat dan bij de aanvraag aan.",
      },
      {
        question: "Wat als er nog spullen van de vorige huurder staan?",
        answer:
          "Moeten er nog goederen of afval weg, dan is dat een aparte opdracht. Wij laten u weten wat wij kunnen meenemen en verwijzen u anders door naar een partner die panden leeghaalt.",
      },
      {
        question: "Is dit hetzelfde als een opleveringsschoonmaak?",
        answer:
          "Niet helemaal. Een opleveringsschoonmaak volgt op bouw- of renovatiewerken en draait rond bouwstof. Verhuur- en verkoopklaar maken vertrekt van een bewoond pand en focust op presentatie en detailafwerking.",
      },
    ],
    whatsappMessage:
      "Hallo, ik wil een pand verhuur- of verkoopklaar laten reinigen in Antwerpen. Graag een offerte.",
    quoteIntent: "verhuur-verkoop",
    crossSell: {
      title: "Moet het pand eerst nog leeggehaald worden?",
      text: "Staat er nog inboedel in het pand? Voor het leeghalen en ontruimen werken wij samen met VastgoedKlaar; daarna verzorgen wij de schoonmaak. Laat het weten in uw aanvraag, dan stemmen we beide opdrachten op elkaar af.",
      links: [
        { label: "Opleveringsschoonmaak", href: "/opleveringsschoonmaak" },
        {
          label: "Traphallen en gemeenschappelijke delen",
          href: "/traphal-schoonmaak",
        },
      ],
      ctaLabel: "Vraag een offerte aan",
      ctaHref: "/offerte?dienst=verhuur-verkoop",
    },
  },

  /* ------------------------------------------------------------------ */
  /* 7. Traphallen en gemeenschappelijke delen                           */
  /* ------------------------------------------------------------------ */
  {
    slug: "traphal-schoonmaak",
    name: "Traphallen en gemeenschappelijke delen",
    icon: Building,
    seoTitle: "Traphal schoonmaak in Antwerpen — VME en syndicus",
    seoDescription:
      "Periodiek onderhoud van traphallen, inkomhallen en gangen in Antwerpse appartementsgebouwen. Vaste frequentie, vaste ploeg, duidelijke afspraken per gebouw.",
    eyebrow: "Gemeenschappelijke delen",
    heroTitle: "Traphallen en gemeenschappelijke delen onderhouden",
    heroIntro:
      "De inkomhal en de traphal zijn het eerste wat bewoners en bezoekers zien, en net daar wringt het vaak. Wij onderhouden gemeenschappelijke delen op een vaste frequentie, met een werkschema dat u als syndicus of VME kunt voorleggen.",
    heroCard: {
      title: "Wat wij per gebouw doen",
      items: [
        "Inkomhal, trappen en overlopen",
        "Gangen per verdieping en de lift",
        "Vaste frequentie, afgesproken per gebouw",
        "Werkschema dat u kunt voorleggen aan de VME",
      ],
      footnote: "Afvalberging en containers in overleg.",
    },
    whatWeDoText:
      "Per gebouw leggen we vast welke zones we doen en hoe vaak: inkom, trappen, overlopen, lift, gangen, kelderverdieping en de afvalberging. Dat schema is duidelijk voor de bewoners en controleerbaar voor het bestuur.",
    commonSituations: [
      "De traphal wordt onregelmatig gepoetst en bewoners klagen",
      "De huidige poetsdienst valt uit of levert wisselend werk",
      "Een nieuwe syndicus wil het onderhoud correct en aantoonbaar regelen",
      "Het gebouw kreeg nieuwe bewoners en de afvalberging loopt uit de hand",
      "Er is discussie over wat wel en niet tot het onderhoud behoort",
    ],
    primaryBenefits: [
      "Vaste frequentie: wekelijks, tweewekelijks of maandelijks",
      "Een concreet werkschema per zone, bruikbaar voor de algemene vergadering",
      "Eén aanspreekpunt voor de syndicus of de VME",
      "Ook inzetbaar voor meerdere gebouwen in beheer",
    ],
    includedItems: [
      "Inkomhal, deurmatten en brievenbuszone",
      "Trappen, treden en trapleuningen",
      "Overlopen en gangen per verdieping",
      "Lift: vloer, wanden, spiegel en bedieningspaneel",
      "Ramen in de gemeenschappelijke delen langs de binnenzijde",
      "Contactpunten: deuren, klinken, schakelaars en parlofoon",
      "Kelderverdieping en gangen, in overleg",
    ],
    optionalItems: [
      "Afvalberging en containerlokaal reinigen",
      "Containers buiten- en binnenzetten op ophaaldagen",
      "Fietsenberging en garagegang",
      "Periodieke dieptereiniging van vloeren in de gemeenschappelijke delen",
    ],
    processSteps: [
      {
        title: "Rondgang in het gebouw",
        description:
          "We bekijken het aantal verdiepingen, de oppervlakte en de staat van de gemeenschappelijke delen.",
      },
      {
        title: "Voorstel per gebouw",
        description:
          "U krijgt een offerte met zones, frequentie en taken — helder genoeg om voor te leggen aan de VME.",
      },
      {
        title: "Afspraken over toegang",
        description:
          "Sleutel, badge of code, en wie we contacteren bij vragen of meldingen.",
      },
      {
        title: "Onderhoud op vaste momenten",
        description:
          "Wij komen volgens schema. Wijzigt er iets aan het gebouw, dan sturen we in overleg bij.",
      },
    ],
    forWho: [
      "Vereniging van mede-eigenaars (VME)",
      "Syndici en beheerkantoren",
      "Eigenaars van appartementsgebouwen",
      "Vastgoedbeheerders met meerdere panden",
      "Verhuurders van opgedeelde panden",
    ],
    faq: [
      {
        question: "Welke frequentie is zinvol voor ons gebouw?",
        answer:
          "Dat hangt af van het aantal appartementen, de ligging en het gebruik. Een klein gebouw met weinig doorloop komt vaak toe met een beurt om de twee weken; een druk gebouw vraagt wekelijks onderhoud. We stellen een ritme voor na een rondgang.",
      },
      {
        question: "Kunnen wij het werkschema voorleggen aan de VME?",
        answer:
          "Ja. Wij zetten zones, frequentie en taken op papier in de offerte, zodat de syndicus of het bestuur precies weet wat er gebeurt en wat niet.",
      },
      {
        question: "Zetten jullie ook de containers buiten?",
        answer:
          "Dat kan als bijkomende afspraak. We leggen dan vast op welke dagen de containers buiten- en binnengezet worden en waar ze staan.",
      },
      {
        question: "Wat met de afvalberging?",
        answer:
          "Die kunnen we mee opnemen. Omdat de staat ervan sterk verschilt per gebouw, bekijken we die zone apart tijdens de rondgang en vermelden we ze afzonderlijk in de offerte.",
      },
      {
        question: "Werken jullie ook voor meerdere gebouwen in beheer?",
        answer:
          "Ja. Voor syndici en beheerkantoren werken we met dezelfde werkwijze over meerdere gebouwen heen, met één contactpersoon voor de opvolging.",
      },
    ],
    whatsappMessage:
      "Hallo, ik zoek een partner voor het onderhoud van de gemeenschappelijke delen van een appartementsgebouw in Antwerpen.",
    quoteIntent: "traphal",
    heroImage: siteImages.entreehal,
    pricingText:
      "De prijs wordt bepaald door het aantal verdiepingen en appartementen, de oppervlakte van de gemeenschappelijke delen en de frequentie. U ontvangt een offerte per gebouw, met een vast bedrag per beurt of per maand.",
    crossSell: {
      title: "Ook een unit in het gebouw laten reinigen?",
      text: "Komt er een appartement vrij in hetzelfde gebouw? Dan kunnen wij dat in dezelfde beweging verhuurklaar maken of de eindschoonmaak voor de plaatsbeschrijving verzorgen.",
      links: [
        {
          label: "Verhuur- en verkoopklaar schoonmaak",
          href: "/verhuur-verkoopklaar-schoonmaak",
        },
        {
          label: "Schoonmaak voor plaatsbeschrijving",
          href: "/schoonmaak-voor-plaatsbeschrijving",
        },
      ],
      ctaLabel: "Vraag een offerte aan",
      ctaHref: "/offerte?dienst=traphal",
    },
  },

  /* ------------------------------------------------------------------ */
  /* 8. Professionele dieptereiniging                                    */
  /* ------------------------------------------------------------------ */
  {
    slug: "dieptereiniging",
    name: "Professionele dieptereiniging",
    icon: SprayCan,
    seoTitle: "Professionele dieptereiniging in Antwerpen",
    seoDescription:
      "Dieptereiniging van sterk vervuilde of langdurig leegstaande panden in Antwerpen. Voor bedrijfsruimtes, handelspanden, horeca en woningen.",
    eyebrow: "Dieptereiniging",
    heroTitle: "Dieptereiniging van sterk vervuilde ruimtes",
    heroIntro:
      "Sommige panden zijn te ver heen voor een gewone poetsbeurt: jarenlange aanslag, nicotine op de muren, een keuken vol vet of een ruimte die lang leegstond. Wij pakken die situaties aan met de juiste aanpak en voldoende mankracht.",
    heroCard: {
      title: "Wat wij aanpakken",
      items: [
        "Zware vet-, nicotine- en kalkaanslag",
        "Volledige ontstoffing van plafond tot plint",
        "Keuken, sanitair en vloeren",
        "Een eerlijke inschatting van wat haalbaar is",
      ],
      footnote: "Altijd na een plaatsbezoek, zodat de offerte klopt.",
    },
    whatWeDoText:
      "Bij een dieptereiniging is een plaatsbezoek de regel, geen uitzondering. We bepalen eerst wat haalbaar is en wat niet: sommige vlekken en aanslag zijn permanent en horen bij herstel of renovatie, niet bij schoonmaak. Dat zeggen we vooraf, niet achteraf.",
    commonSituations: [
      "Een pand stond lang leeg en zit vol stof, vuil en muffe geur",
      "Nicotine- of vetaanslag op muren, plafonds en schrijnwerk",
      "Een bedrijfs- of handelsruimte met jarenlang achterstallig onderhoud",
      "Een woning die na een moeilijke situatie grondig gereinigd moet worden",
      "Een keuken of sanitair met zware kalk- en vetaanslag",
    ],
    primaryBenefits: [
      "Aanpak van zware aanslag, vet, kalk en ingelopen vuil",
      "Voldoende mankracht en materiaal om het in één keer te doen",
      "Eerlijke inschatting vooraf van wat wel en niet oplosbaar is",
      "Aansluitend een onderhoudsschema mogelijk, zodat het proper blijft",
    ],
    includedItems: [
      "Volledige ontstoffing van plafonds, wanden en oppervlakken",
      "Ontvetten van keuken, kookzone en werkbanken",
      "Sanitair: kalkaanslag, tegels, voegen en afvoeren",
      "Vloeren: grondige reiniging afgestemd op het vloertype",
      "Ramen langs de binnenzijde, inclusief kaders en dorpels",
      "Deuren, plinten, radiatoren en schakelaars",
      "Kasten en bergruimtes van binnen en buiten",
    ],
    optionalItems: [
      "Aanpak van geurhinder, in overleg en na inschatting ter plaatse",
      "Verwijderen van achtergebleven goederen en afval, in overleg",
      "Ramen langs de buitenzijde, indien veilig bereikbaar",
      "Een periodiek onderhoudsschema na de dieptereiniging",
    ],
    processSteps: [
      {
        title: "Plaatsbezoek",
        description:
          "Bij zware vervuiling komen we altijd eerst kijken. Foto's geven zelden het volledige beeld.",
      },
      {
        title: "Eerlijke inschatting",
        description:
          "We zeggen vooraf wat wij kunnen oplossen en wat onder herstel of renovatie valt.",
      },
      {
        title: "Offerte en planning",
        description:
          "U krijgt een prijs op maat, met de nodige mankracht en tijd realistisch ingepland.",
      },
      {
        title: "Uitvoering en oplevering",
        description:
          "Wij werken het pand zone per zone af en lopen het resultaat met u na.",
      },
    ],
    forWho: [
      "Eigenaars van leegstaande of verwaarloosde panden",
      "Bedrijven met een sterk vervuilde werk- of opslagruimte",
      "Horecazaken bij een overname of heropstart",
      "Verhuurders na een moeilijke huursituatie",
      "Vastgoedbeheerders en syndici",
    ],
    faq: [
      {
        question: "Komen jullie eerst kijken?",
        answer:
          "Bij een dieptereiniging wel. De omvang van het werk hangt sterk af van wat we ter plaatse zien, en een plaatsbezoek voorkomt verrassingen voor u en voor ons.",
      },
      {
        question: "Krijgen jullie alles weg?",
        answer:
          "Niet altijd, en dat zeggen we liever vooraf. Ingebrande vlekken, beschadigde voegen of aangetast materiaal horen bij herstel of vernieuwing. Wij geven eerlijk aan wat schoonmaak kan oplossen en wat niet.",
      },
      {
        question: "Werken jullie ook in bewoonde panden?",
        answer:
          "Ja, al werkt het vlotter in een leeg pand. In een bewoonde situatie stemmen we vooraf af welke ruimtes wanneer aan de beurt zijn.",
      },
      {
        question: "Verwijderen jullie ook achtergelaten spullen?",
        answer:
          "Los afval nemen we in overleg mee. Gaat het om een volledige inboedel, dan stemmen we vooraf af hoe dat afgevoerd wordt of verwijzen we u door naar een partner die panden leeghaalt.",
      },
      {
        question: "Blijft het daarna proper?",
        answer:
          "Na een dieptereiniging is een periodiek onderhoud de logische vervolgstap. Dat houdt het resultaat in stand en is doorgaans een pak minder ingrijpend dan opnieuw van nul beginnen.",
      },
    ],
    whatsappMessage:
      "Hallo, ik heb een dieptereiniging nodig in Antwerpen. Het gaat om een sterk vervuilde ruimte.",
    quoteIntent: "dieptereiniging",
    heroImage: siteImages.vloeronderhoud,
    pricingText:
      "Een dieptereiniging wordt altijd op maat geprijsd na een plaatsbezoek. De oppervlakte, de graad van vervuiling en de benodigde mankracht bepalen de prijs. U krijgt een realistische offerte, geen richtprijs die achteraf niet blijkt te kloppen.",
    crossSell: {
      title: "Daarna in onderhoud houden?",
      text: "Na een dieptereiniging houden we het pand graag op peil met een periodiek schema — voor kantoren, handelsruimtes of horeca.",
      links: [
        { label: "Kantoorschoonmaak", href: "/kantoorschoonmaak" },
        { label: "Horecaschoonmaak", href: "/horecaschoonmaak" },
      ],
      ctaLabel: "Vraag een offerte aan",
      ctaHref: "/offerte?dienst=dieptereiniging",
    },
  },
];

/** Alle dienst-slugs, voor routegeneratie en de sitemap. */
export const serviceSlugs: Slug[] = servicePages.map((page) => page.slug);

/**
 * Eén dienstpagina opzoeken. Gooit een fout bij een onbekende slug, zodat een
 * typfout in een routebestand tijdens de build opvalt in plaats van een lege
 * pagina te renderen.
 */
export function getServicePage(slug: Slug): ServicePageData {
  const page = servicePages.find((entry) => entry.slug === slug);
  if (!page) {
    throw new Error(`Onbekende dienstpagina-slug: "${slug}"`);
  }
  return page;
}

/** Bouwt de metadata voor een dienstpagina uit de data. */
export function serviceMetadata(slug: Slug): Metadata {
  const page = getServicePage(slug);
  const url = `${siteConfig.url}/${page.slug}`;
  return {
    title: page.seoTitle,
    description: page.seoDescription,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      title: `${page.seoTitle} | ${siteConfig.name}`,
      description: page.seoDescription,
    },
  };
}
