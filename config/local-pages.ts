import type { FaqItem, ImageRef, LocalLink, LocalPageData, Slug } from "@/types";
import { siteImages } from "./site-images";

/**
 * Schaalbaar lokaal SEO-systeem. Elke pagina wordt gebouwd uit een DIENST
 * (het zoekintent) en een LOCATIE in het werkgebied, en krijgt een eigen URL
 * volgens de structuur /<dienst>/<stad>, bv. /horecaschoonmaak/antwerpen.
 *
 * Uitbreiden gebeurt op één plaats: voeg een locatie toe aan LOCATIONS en zet
 * de combinatie in ACTIVE_LOCATIONS. De routebestanden en de sitemap volgen
 * automatisch.
 *
 * Eerlijkheidsregels (nooit claimen): lokale kantoren of vestigingen, reviews,
 * scores, exacte prijzen, 24/7-beschikbaarheid of certificaten. De publieke
 * positionering is altijd "actief in Antwerpen en omgeving".
 */

interface LocationData {
  slug: string;
  name: string;
  /** True voor de centrale stad; false voor een district of randgemeente. */
  isHub: boolean;
  /** Omliggende gemeenten, voor het "Ook actief in de omgeving"-blok. */
  nearby: string[];
  /** Wat typisch is aan het pandenbestand en de bedrijvigheid hier. */
  context: string;
  /** Praktische aandachtspunten bij het werken op deze locatie. */
  considerations: string[];
  /** Dienstspecifieke invalshoek, zodat pagina's niet op elkaar lijken. */
  serviceAngles?: Record<string, string>;
}

const LOCATIONS: Record<string, LocationData> = {
  antwerpen: {
    slug: "antwerpen",
    name: "Antwerpen",
    isHub: true,
    nearby: [
      "Berchem",
      "Borgerhout",
      "Deurne",
      "Wilrijk",
      "Merksem",
      "Hoboken",
      "Mortsel",
      "Ekeren",
    ],
    context:
      "Antwerpen combineert een dichte horecakern rond het Zuid, het Eilandje en de historische binnenstad met kantoren, praktijken en handelspanden verspreid over de districten. Daarnaast is er veel opgedeeld patrimonium: herenhuizen met meerdere units, appartementsgebouwen en studio's met een snelle huurdersrotatie.",
    considerations: [
      "Smalle straten en beperkte laad- en losruimte in de binnenstad",
      "Werken buiten de openingsuren of vroeg in de ochtend in de horecabuurten",
      "Panden op verdieping, vaak zonder lift in de oudere gebouwen",
      "Afvalregels en ophaalmomenten verschillen per straat en district",
    ],
    serviceAngles: {
      horecaschoonmaak:
        "In de horecabuurten rond het Zuid, het Eilandje, de Kammenstraat en de Grote Markt volgen services elkaar snel op. Wij werken daarom vroeg in de ochtend of na sluiting, en houden rekening met de beperkte ruimte achter de toog en in de keuken van een stadspand.",
      kantoorschoonmaak:
        "Van advocatenkantoren aan het Zuid tot praktijken in Berchem en showrooms langs de invalswegen: in Antwerpen zit het kantorenbestand verspreid en verschillen de werkuren sterk. Wij stemmen het schema af op uw openingsuren en op de toegang tot het gebouw.",
      opleveringsschoonmaak:
        "Antwerpen bouwt en renoveert volop: van nieuwbouwprojecten aan het Eilandje tot renovaties van herenhuizen in de negentiende-eeuwse gordel. Elk type werf laat ander stof en ander afval na, en dat bepaalt de aanpak van de opleveringsschoonmaak.",
      "schoonmaak-voor-plaatsbeschrijving":
        "Met een grote huurmarkt en veel studenten wisselen in Antwerpen voortdurend huurders. Plaatsbeschrijvingen worden hier strikt opgenomen, zeker in gerenoveerde appartementen en koten: de binnenkant van de keukenkasten, de voegen en de plinten wegen mee.",
      dieptereiniging:
        "In het oudere Antwerpse patrimonium duikt zware aanslag geregeld op: nicotine op het pleisterwerk, vet in een keuken van een overgenomen zaak of een handelspand dat jaren leegstond. Wij bekijken zo'n pand altijd eerst ter plaatse.",
    },
  },

  berchem: {
    slug: "berchem",
    name: "Berchem",
    isHub: false,
    nearby: ["Antwerpen", "Borgerhout", "Deurne", "Mortsel", "Wilrijk"],
    context:
      "Berchem heeft veel herenhuizen en opgedeelde appartementen rond Oud-Berchem en Zurenborg, aangevuld met praktijken, kantoren en buurthoreca langs de Statiestraat en de Grotesteenweg.",
    considerations: [
      "Herenhuizen met meerdere verdiepingen en steile trappen",
      "Beperkt parkeren in de woonstraten",
      "Veel opgedeelde panden met gemeenschappelijke inkom en traphal",
    ],
  },
  borgerhout: {
    slug: "borgerhout",
    name: "Borgerhout",
    isHub: false,
    nearby: ["Antwerpen", "Berchem", "Deurne", "Merksem"],
    context:
      "Borgerhout is dicht bebouwd met rijwoningen, opgedeelde panden en veel kleinschalige horeca en handelszaken langs de Turnhoutsebaan.",
    considerations: [
      "Drukke winkelstraten met korte laad- en losmomenten",
      "Rijwoningen met smalle gangen en steile trappen",
      "Appartementen zonder lift komen vaak voor",
    ],
  },
  deurne: {
    slug: "deurne",
    name: "Deurne",
    isHub: false,
    nearby: ["Borgerhout", "Berchem", "Merksem", "Wommelgem", "Wijnegem"],
    context:
      "Deurne is een mix van rijwoningen, tuinwijken en appartementsblokken, met buurthoreca, praktijken en kleinere bedrijfsruimtes verspreid over het district.",
    considerations: [
      "Zowel huizen met tuin als flatgebouwen met lift",
      "Parkeren verloopt doorgaans vlot in de woonwijken",
      "Appartementsblokken met gemeenschappelijke delen die onderhoud vragen",
    ],
  },
  wilrijk: {
    slug: "wilrijk",
    name: "Wilrijk",
    isHub: false,
    nearby: ["Berchem", "Hoboken", "Mortsel", "Edegem", "Antwerpen"],
    context:
      "Wilrijk combineert ruime gezinswoningen en verkavelingen met appartementen en bedrijvigheid langs de invalswegen, waaronder kantoren en zorgpraktijken.",
    considerations: [
      "Vaak woningen met oprit en garage, vlotte toegang",
      "Ruimere panden dan in het stadscentrum",
      "Kantoren en praktijken met eigen parkeergelegenheid",
    ],
  },
  merksem: {
    slug: "merksem",
    name: "Merksem",
    isHub: false,
    nearby: ["Deurne", "Borgerhout", "Ekeren", "Schoten", "Wijnegem"],
    context:
      "Merksem bestaat uit rijwoningen, sociale woningbouw en appartementen langs het kanaal, met handelszaken en horeca langs de Bredabaan.",
    considerations: [
      "Vlotte bereikbaarheid via de ring en het kanaal",
      "Zowel huizen als flatgebouwen met lift",
      "Handelspanden met een woonst erboven",
    ],
  },
  hoboken: {
    slug: "hoboken",
    name: "Hoboken",
    isHub: false,
    nearby: ["Wilrijk", "Antwerpen", "Hemiksem", "Aartselaar"],
    context:
      "Hoboken heeft arbeiderswoningen, rijhuizen en nieuwere appartementen bij de Schelde, met lokale handelszaken en horeca in het centrum.",
    considerations: [
      "Rijwoningen met smalle gangen en trappen",
      "Parkeren doorgaans mogelijk in de straat",
      "Mix van oudere panden en recente nieuwbouw",
    ],
  },
  ekeren: {
    slug: "ekeren",
    name: "Ekeren",
    isHub: false,
    nearby: ["Merksem", "Brasschaat", "Kapellen", "Antwerpen"],
    context:
      "Ekeren is overwegend residentieel, met gezinswoningen, tuinen en kleinschalige handel en horeca rond het dorpscentrum.",
    considerations: [
      "Woningen met oprit, garage of tuin",
      "Rustige straten, vlot laden en lossen",
      "Minder hoogbouw dan in de stad",
    ],
  },
  borsbeek: {
    slug: "borsbeek",
    name: "Borsbeek",
    isHub: false,
    nearby: ["Deurne", "Mortsel", "Wommelgem", "Berchem"],
    context:
      "Borsbeek is een compacte gemeente met gezinswoningen, appartementen en bedrijvigheid nabij de luchthaven.",
    considerations: [
      "Vlotte toegang en parkeergelegenheid",
      "Mix van woningen en kleinere bedrijfsruimtes",
      "Kortbij de luchthavenzone met kantoren",
    ],
  },
  schoten: {
    slug: "schoten",
    name: "Schoten",
    isHub: false,
    nearby: ["Brasschaat", "Merksem", "Wijnegem", "Schilde", "Deurne"],
    context:
      "Schoten heeft ruime gezinswoningen en verkavelingen, met horeca en handel rond het centrum en langs de Bredabaan.",
    considerations: [
      "Woningen met tuin, garage en berging",
      "Parkeren doorgaans geen probleem",
      "Rustige, goed bereikbare wijken",
    ],
  },
  brasschaat: {
    slug: "brasschaat",
    name: "Brasschaat",
    isHub: false,
    nearby: ["Schoten", "Kapellen", "Ekeren", "Schilde"],
    context:
      "Brasschaat staat bekend om villa's en grote gezinswoningen met ruime tuinen, aangevuld met praktijken, kantoren en horeca rond het centrum.",
    considerations: [
      "Grote panden met bijgebouwen, kelder en zolder",
      "Vlotte toegang met oprit en parkeerruimte",
      "Vaak ruimere oppervlaktes dan in de stad",
    ],
  },
  mortsel: {
    slug: "mortsel",
    name: "Mortsel",
    isHub: false,
    nearby: ["Berchem", "Edegem", "Borsbeek", "Wilrijk", "Hove"],
    context:
      "Mortsel is dicht bebouwd met rijwoningen en appartementen vlak bij de stad, met horeca en handel rond het Gemeenteplein en de Statielei.",
    considerations: [
      "Rijwoningen met trappen",
      "Appartementen met of zonder lift",
      "Beperkt parkeren in sommige straten",
    ],
  },
  edegem: {
    slug: "edegem",
    name: "Edegem",
    isHub: false,
    nearby: ["Mortsel", "Wilrijk", "Kontich", "Hove", "Aartselaar"],
    context:
      "Edegem bestaat uit gezinswoningen, villa's en appartementen, met zorgpraktijken en kantoren in de omgeving van het centrum.",
    considerations: [
      "Ruime woningen met oprit en tuin",
      "Ook appartementen nabij het centrum",
      "Vlotte toegang voor de ploeg",
    ],
  },
  kontich: {
    slug: "kontich",
    name: "Kontich",
    isHub: false,
    nearby: ["Edegem", "Aartselaar", "Hove", "Mortsel"],
    context:
      "Kontich combineert gezinswoningen en verkavelingen met bedrijvigheid langs de invalswegen, waaronder kantoren, showrooms en kmo-ruimtes.",
    considerations: [
      "Bedrijfszones met eigen parkeergelegenheid",
      "Woningen met garage, kelder of bijgebouw",
      "Vlot laden en lossen",
    ],
  },
  wommelgem: {
    slug: "wommelgem",
    name: "Wommelgem",
    isHub: false,
    nearby: ["Deurne", "Wijnegem", "Borsbeek", "Ranst", "Mortsel"],
    context:
      "Wommelgem is residentieel met gezinswoningen en verkavelingen, en heeft bedrijvigheid en handel langs de autosnelweg en de invalswegen.",
    considerations: [
      "Woningen met oprit en tuin",
      "Bedrijfsruimtes met vlotte toegang",
      "Rustige straten, parkeren geen probleem",
    ],
  },
  wijnegem: {
    slug: "wijnegem",
    name: "Wijnegem",
    isHub: false,
    nearby: ["Deurne", "Schoten", "Wommelgem", "Schilde", "Merksem"],
    context:
      "Wijnegem heeft gezinswoningen en appartementen, en is door het winkelcentrum en de invalswegen een drukke doorgangsgemeente met veel handel en horeca.",
    considerations: [
      "Goede bereikbaarheid via de ring",
      "Handelszaken met eigen openingsuren",
      "Mix van huizen en appartementsgebouwen",
    ],
  },
  kapellen: {
    slug: "kapellen",
    name: "Kapellen",
    isHub: false,
    nearby: ["Brasschaat", "Ekeren", "Kalmthout", "Stabroek"],
    context:
      "Kapellen is groen en residentieel, met villa's, gezinswoningen en kleinschalige horeca en handel rond het centrum.",
    considerations: [
      "Villa's en woningen met veel bergruimte",
      "Vlotte toegang met oprit",
      "Ruime percelen en tuinen",
    ],
  },
};

interface LocalService {
  /** Moet overeenkomen met de slug in config/service-pages.ts. */
  slug: string;
  name: string;
  /** Korte omschrijving voor de meta description. */
  metaBenefit: string;
  /** Eén zin die vertelt wat we doen; wordt in de intro verwerkt. */
  body: string;
  /** Aanloopzin voor de H1-intro. */
  lead: string;
  whenToUse: string[];
  whatWeDo: string[];
  forWho: string[];
  /** Dienstspecifieke FAQ-vraag, naast de lokale standaardvragen. */
  faqExtra: FaqItem;
  /** Werkwoordgroep voor het WhatsApp-bericht. */
  waIntent: string;
  /** Voorselectie voor het offerteformulier. */
  quoteIntent: string;
  /** Verwante interne links. */
  related: LocalLink[];
  /**
   * Beeldset voor deze dienst. Elke lokale pagina kiest er deterministisch één
   * uit, zodat eenzelfde dienst in twee gemeenten niet hetzelfde beeld toont
   * zodra er meerdere alternatieven beschikbaar zijn.
   */
  images?: ImageRef[];
}

const LOCAL_SERVICES: Record<string, LocalService> = {
  horecaschoonmaak: {
    slug: "horecaschoonmaak",
    name: "Horecaschoonmaak",
    metaBenefit:
      "Zaal, keuken en sanitair, ook buiten de openingsuren.",
    body: "Wij verzorgen de schoonmaak van zaal, toog, keuken en sanitair, voor de opening of na sluiting.",
    lead: "Horecaschoonmaak",
    whenToUse: [
      "Uw poetshulp valt uit en de zaak moet toch open",
      "De keuken vraagt meer dan uw ploeg erbij kan nemen",
      "U opent een nieuwe zaak en wilt het onderhoud meteen vastleggen",
      "Na een druk weekend of een event moet alles opnieuw piekfijn zijn",
    ],
    whatWeDo: [
      "Zaal, tafels, banken en vloeren",
      "Toog, barzone en werkvlakken",
      "Keuken: inox, werkbanken, vloeren en afvalzone",
      "Sanitair, inclusief aanvullen van verbruik",
    ],
    forWho: [
      "Restaurants, bistro's en brasserieën",
      "Cafés, bars en lunchzaken",
      "Hotels en B&B's",
      "Bakkerijen, frituren en catering",
    ],
    faqExtra: {
      question: "Kunnen jullie voor de opening of na sluiting komen?",
      answer:
        "Ja, dat is net de bedoeling. Wij plannen de schoonmaak buiten uw openingsuren, zodat uw zaak geen omzeturen verliest.",
    },
    waIntent: "horecaschoonmaak",
    quoteIntent: "horeca",
    related: [
      { label: "Horecaschoonmaak", href: "/horecaschoonmaak" },
      {
        label: "Horecakeuken dieptereiniging",
        href: "/horecakeuken-dieptereiniging",
      },
      { label: "Professionele dieptereiniging", href: "/dieptereiniging" },
    ],
    images: [siteImages.horecaBar, siteImages.horecaRestaurant, siteImages.horecaSerre],
  },

  kantoorschoonmaak: {
    slug: "kantoorschoonmaak",
    name: "Kantoorschoonmaak",
    metaBenefit: "Vaste dagen, vaste ploeg en een duidelijk werkschema.",
    body: "Wij onderhouden kantoren, praktijken en handelsruimtes op vaste dagen, volgens een schema dat we samen vastleggen.",
    lead: "Kantoorschoonmaak",
    whenToUse: [
      "Uw huidige poetshulp levert wisselend werk of valt uit",
      "Het kantoor is gegroeid en het onderhoud niet mee",
      "U verhuist naar een nieuw pand",
      "Klanten komen over de vloer en de eerste indruk telt",
    ],
    whatWeDo: [
      "Bureaus, vergaderzalen en ontvangstruimte",
      "Sanitair en keukenhoek",
      "Contactpunten: deuren, klinken en schakelaars",
      "Gangen, inkom en circulatiezones",
    ],
    forWho: [
      "Kantoren en kantoorgebouwen",
      "Artsen-, tandarts- en kinepraktijken",
      "Advocaten, accountants en makelaars",
      "Winkels, showrooms en handelsruimtes",
    ],
    faqExtra: {
      question: "Werken jullie tijdens of buiten de kantooruren?",
      answer:
        "Allebei kan. Veel klanten kiezen voor de vroege ochtend of de avond; praktijken werken vaak liever met een moment tussen de consultaties door.",
    },
    waIntent: "kantoorschoonmaak",
    quoteIntent: "kantoor",
    related: [
      { label: "Kantoorschoonmaak", href: "/kantoorschoonmaak" },
      {
        label: "Traphallen en gemeenschappelijke delen",
        href: "/traphal-schoonmaak",
      },
      { label: "Professionele dieptereiniging", href: "/dieptereiniging" },
    ],
    images: [siteImages.entreehal, siteImages.werkwagen],
  },

  opleveringsschoonmaak: {
    slug: "opleveringsschoonmaak",
    name: "Opleveringsschoonmaak",
    metaBenefit: "Bouwstof, verfresten en stickers weg vóór de oplevering.",
    body: "Wij verwijderen bouwstof, verfresten en werfvuil zodat u het pand op datum kunt opleveren.",
    lead: "Opleveringsschoonmaak",
    whenToUse: [
      "De werken zijn klaar en de oplevering staat gepland",
      "Na het schilderen ligt er stof en liggen er verfresten",
      "Een appartement moet instapklaar zijn voor de kopers",
      "Een handelspand moet kort na de afwerking open",
    ],
    whatWeDo: [
      "Ontstoffen van plafonds, wanden en alle oppervlakken",
      "Ramen langs de binnenzijde, met kaders en dorpels",
      "Stickers, etiketten en beschermfolie verwijderen",
      "Keuken, sanitair, vloeren en schrijnwerk afwerken",
    ],
    forWho: [
      "Aannemers en afwerkingsbedrijven",
      "Projectontwikkelaars",
      "Verhuurders en eigenaars na renovatie",
      "Particulieren na een verbouwing",
    ],
    faqExtra: {
      question: "Kunnen jullie op korte termijn komen?",
      answer:
        "Vaak wel. Laat ons zo snel mogelijk uw opleverdatum weten, dan bekijken we meteen wat haalbaar is binnen onze planning.",
    },
    waIntent: "een opleveringsschoonmaak",
    quoteIntent: "oplevering",
    related: [
      { label: "Opleveringsschoonmaak", href: "/opleveringsschoonmaak" },
      {
        label: "Verhuur- en verkoopklaar schoonmaak",
        href: "/verhuur-verkoopklaar-schoonmaak",
      },
      { label: "Professionele dieptereiniging", href: "/dieptereiniging" },
    ],
  },

  "schoonmaak-voor-plaatsbeschrijving": {
    slug: "schoonmaak-voor-plaatsbeschrijving",
    name: "Schoonmaak voor plaatsbeschrijving",
    metaBenefit: "Eindschoonmaak afgestemd op uw datum van plaatsbeschrijving.",
    body: "Wij verzorgen de eindschoonmaak van uw huurwoning, zodat die netjes klaarstaat voor de plaatsbeschrijving en de sleuteloverdracht.",
    lead: "Schoonmaak voor plaatsbeschrijving",
    whenToUse: [
      "De plaatsbeschrijving is vastgelegd",
      "U bent volop aan het verhuizen",
      "De woning is net leeg en het vuil komt naar boven",
      "Een verhuurder wil het pand proper opgeleverd zien",
    ],
    whatWeDo: [
      "Keuken: werkblad, spoelbak en kasten van binnen en buiten",
      "Badkamer en sanitair, inclusief tegels en voegen",
      "Vloeren, plinten, deuren en schakelaars",
      "Oven, koelkast en ramen in overleg",
    ],
    forWho: [
      "Huurders bij het einde van hun huurcontract",
      "Studenten die een kot verlaten",
      "Verhuurders en eigenaars",
      "Makelaars en beheerders",
    ],
    faqExtra: {
      question: "Wanneer plannen we de schoonmaak het best?",
      answer:
        "Nadat de woning volledig leeg is en vóór de dag van de plaatsbeschrijving. Geef ons beide data door, dan stemmen we de planning daarop af.",
    },
    waIntent: "een eindschoonmaak voor de plaatsbeschrijving",
    quoteIntent: "plaatsbeschrijving",
    related: [
      {
        label: "Schoonmaak voor plaatsbeschrijving",
        href: "/schoonmaak-voor-plaatsbeschrijving",
      },
      {
        label: "Verhuur- en verkoopklaar schoonmaak",
        href: "/verhuur-verkoopklaar-schoonmaak",
      },
      { label: "Opleveringsschoonmaak", href: "/opleveringsschoonmaak" },
    ],
    images: [siteImages.woningEindschoonmaak],
  },

  dieptereiniging: {
    slug: "dieptereiniging",
    name: "Professionele dieptereiniging",
    metaBenefit: "Voor sterk vervuilde of lang leegstaande panden.",
    body: "Wij pakken zware aanslag, vet en ingelopen vuil aan in panden waar een gewone poetsbeurt niet meer volstaat.",
    lead: "Professionele dieptereiniging",
    whenToUse: [
      "Een pand stond lang leeg en zit vol stof en vuil",
      "Er is nicotine- of vetaanslag op muren en plafonds",
      "Een bedrijfsruimte heeft jarenlang achterstallig onderhoud",
      "Een keuken of sanitair zit vol kalk- en vetaanslag",
    ],
    whatWeDo: [
      "Volledige ontstoffing van plafonds, wanden en oppervlakken",
      "Ontvetten van keuken en kookzone",
      "Sanitair: kalkaanslag, tegels en voegen",
      "Vloeren, ramen, deuren en radiatoren",
    ],
    forWho: [
      "Eigenaars van leegstaande panden",
      "Bedrijven met een vervuilde werkruimte",
      "Horecazaken bij overname of heropstart",
      "Verhuurders en vastgoedbeheerders",
    ],
    faqExtra: {
      question: "Komen jullie eerst kijken?",
      answer:
        "Bij een dieptereiniging wel. De omvang hangt sterk af van wat we ter plaatse zien, en zo vermijden we verrassingen voor u en voor ons.",
    },
    waIntent: "een dieptereiniging",
    quoteIntent: "dieptereiniging",
    related: [
      { label: "Professionele dieptereiniging", href: "/dieptereiniging" },
      { label: "Opleveringsschoonmaak", href: "/opleveringsschoonmaak" },
      { label: "Kantoorschoonmaak", href: "/kantoorschoonmaak" },
    ],
    images: [siteImages.vloeronderhoud, siteImages.entreehal],
  },
};

/**
 * Welke dienst-/locatiecombinaties effectief gepubliceerd worden. Bewust
 * beperkt gehouden: liever enkele sterke lokale pagina's dan tientallen dunne
 * varianten. Uitbreiden = een locatie-slug toevoegen aan de juiste lijst.
 */
const ACTIVE_LOCATIONS: Record<string, string[]> = {
  horecaschoonmaak: ["antwerpen"],
  kantoorschoonmaak: ["antwerpen"],
  opleveringsschoonmaak: ["antwerpen"],
  "schoonmaak-voor-plaatsbeschrijving": ["antwerpen"],
  dieptereiniging: ["antwerpen"],
};

const OFFERTE_LINK: LocalLink = {
  label: "Gratis offerte aanvragen",
  href: "/offerte",
};
const DIENSTEN_LINK: LocalLink = { label: "Alle diensten", href: "/diensten" };

function buildProcessSteps(service: LocalService) {
  return [
    {
      title: "Vertel ons wat u nodig heeft",
      description: `Bezorg ons de gegevens van het pand en wat u verwacht van ${service.name.toLowerCase()}.`,
    },
    {
      title: "Wij bekijken de situatie",
      description:
        "Met een plaatsbezoek of duidelijke foto's schatten we de omvang correct in.",
    },
    {
      title: "U ontvangt een offerte op maat",
      description:
        "Met een concreet overzicht van wat inbegrepen is, zonder vage omschrijvingen.",
    },
    {
      title: "Wij voeren uit op afspraak",
      description:
        "Op het moment dat u past. U hoeft zelf niet aanwezig te zijn als de toegang geregeld is.",
    },
  ];
}

function buildIntro(service: LocalService, location: LocationData): string {
  const near = location.nearby.slice(0, 3).join(", ");

  if (location.isHub) {
    return `${service.lead} nodig in ${location.name}? ${service.body} Wij zijn actief in ${location.name} en de omliggende gemeenten — van ${near} tot de rest van de regio — en werken met duidelijke afspraken en een offerte op maat. Eenmalig of periodiek, telkens op een moment dat past bij uw werking.`;
  }

  return `Zoekt u ${service.name.toLowerCase()} in ${location.name}? ${service.body} Wij komen in ${location.name} en de omliggende gemeenten zoals ${near}, met duidelijke afspraken en een offerte op maat. Eenmalig of op vaste momenten, afhankelijk van wat uw pand nodig heeft.`;
}

function buildLocalContext(
  service: LocalService,
  location: LocationData,
): string {
  const angle = location.serviceAngles?.[service.slug];
  return angle ?? location.context;
}

function buildFaq(service: LocalService, location: LocationData): FaqItem[] {
  const areaAnswer = location.isHub
    ? `Ja. Wij zijn actief in ${location.name} en de omliggende gemeenten, onder meer ${location.nearby.slice(0, 5).join(", ")} en de rest van de regio.`
    : `Ja, wij komen in ${location.name} en de omliggende gemeenten zoals ${location.nearby.slice(0, 3).join(", ")}.`;

  return [
    {
      question: `Wat kost ${service.name.toLowerCase()} in ${location.name}?`,
      answer:
        "Er staan bewust geen tarieven op de site: de prijs hangt af van de oppervlakte, de staat van het pand, de frequentie en het moment waarop we werken. U ontvangt altijd vooraf een offerte op maat.",
    },
    {
      question: `Werken jullie in ${location.name}?`,
      answer: areaAnswer,
    },
    service.faqExtra,
    {
      question: "Moet ik zelf aanwezig zijn?",
      answer:
        "Niet noodzakelijk. Zodra de toegang geregeld is — met een sleutel, badge of code — kunnen wij zelfstandig werken. Bij een eerste opdracht komen we wel graag even samen door het pand.",
    },
    {
      question: "Kunnen jullie eenmalig komen of moet het periodiek zijn?",
      answer:
        "Allebei kan. Sommige klanten starten met één grondige beurt, andere kiezen meteen voor een vast schema. U beslist wat past.",
    },
  ];
}

function buildPage(serviceKey: string, locationKey: string): LocalPageData {
  const service = LOCAL_SERVICES[serviceKey];
  const location = LOCATIONS[locationKey];

  if (!service) {
    throw new Error(`Onbekende lokale dienst: "${serviceKey}"`);
  }
  if (!location) {
    throw new Error(`Onbekende locatie: "${locationKey}"`);
  }

  const h1 = `${service.name} in ${location.name}`;

  return {
    serviceSlug: service.slug,
    citySlug: location.slug,
    path: `/${service.slug}/${location.slug}`,
    serviceName: service.name,
    locationName: location.name,
    isHub: location.isHub,
    h1,
    metaTitle: `${service.name} ${location.name} — offerte op maat`,
    metaDescription: `${service.name} in ${location.name} en omgeving. ${service.metaBenefit} Eenmalig of periodiek, met duidelijke afspraken en een offerte op maat.`,
    eyebrow: `${service.name} · ${location.name}`,
    intro: buildIntro(service, location),
    localContext: buildLocalContext(service, location),
    localConsiderations: location.considerations,
    whenToUse: service.whenToUse,
    whatWeDo: service.whatWeDo,
    forWho: service.forWho,
    processSteps: buildProcessSteps(service),
    nearbyAreas: location.nearby,
    relatedLinks: [...service.related, OFFERTE_LINK, DIENSTEN_LINK],
    faq: buildFaq(service, location),
    whatsappMessage: `Hallo, ik wil graag een offerte voor ${service.waIntent} in ${location.name}.`,
    quoteIntent: service.quoteIntent,
    image: pickImage(service, location),
  };
}

/**
 * Kiest deterministisch een beeld uit de set van de dienst, op basis van de
 * locatienaam. Zo krijgt dezelfde dienst in een andere gemeente een ander
 * beeld, en blijft de keuze stabiel tussen builds.
 */
function pickImage(
  service: LocalService,
  location: LocationData,
): ImageRef | undefined {
  const images = service.images;
  if (!images || images.length === 0) return undefined;
  let sum = 0;
  for (let i = 0; i < location.slug.length; i += 1) {
    sum += location.slug.charCodeAt(i);
  }
  return images[sum % images.length];
}

/** Alle gepubliceerde lokale pagina's. */
export const localPages: LocalPageData[] = Object.entries(
  ACTIVE_LOCATIONS,
).flatMap(([serviceKey, locationKeys]) =>
  locationKeys.map((locationKey) => buildPage(serviceKey, locationKey)),
);

/** Alle lokale paden, voor de sitemap. */
export const localPagePaths: string[] = localPages.map((page) => page.path);

/** De stad-slugs die voor één dienst gepubliceerd zijn (voor generateStaticParams). */
export function getCitySlugsForService(serviceSlug: Slug): string[] {
  return ACTIVE_LOCATIONS[serviceSlug] ?? [];
}

/** Eén lokale pagina opzoeken op dienst + stad. */
export function getLocalPage(
  serviceSlug: Slug,
  citySlug: Slug,
): LocalPageData | undefined {
  return localPages.find(
    (page) => page.serviceSlug === serviceSlug && page.citySlug === citySlug,
  );
}

/** Lokale pagina's van één dienst, voor interne links op de dienstpagina. */
export function getLocalPagesForService(serviceSlug: Slug): LocalPageData[] {
  return localPages.filter((page) => page.serviceSlug === serviceSlug);
}

/** Alle gemeenten in het werkgebied, voor de regio-sectie op de homepage. */
export const serviceAreaCities: string[] = Object.values(LOCATIONS).map(
  (location) => location.name,
);
