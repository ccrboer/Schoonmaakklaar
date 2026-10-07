import type { FaqItem, ImageRef, LocalLink, LocalPageData, Slug } from "@/types";
import { siteImages } from "./site-images";
import { LOCAL_ANGLES, angleKey } from "./local-angles";

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
  /**
   * Praktische punten waar wij rekening mee houden. Bewust geformuleerd als
   * voorwaarde ("Bij ...") en niet als bewering over de gemeente: wij hebben
   * geen bron voor hoe de straten of de panden er daar uitzien, dus doen we
   * daar ook geen uitspraken over.
   */
  considerations: string[];
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
    considerations: [
      "Bij weinig laad- en losruimte plannen wij materiaal en afvoer in één beweging",
      "Werken vroeg in de ochtend of na sluiting wanneer de zaak of het gebouw in gebruik blijft",
      "Bij een pand op een verdieping zonder lift rekenen wij extra tijd voor toegang",
      "Bij gedeelde inkom of traphal spreken we vooraf af wat wel en niet meegaat",
    ],
  },
  berchem: {
    slug: "berchem",
    name: "Berchem",
    isHub: false,
    nearby: ["Antwerpen", "Borgerhout", "Deurne", "Mortsel", "Wilrijk"],
    considerations: [
      "Bij meerdere verdiepingen stemmen wij de volgorde vooraf af",
      "Bij beperkt parkeren kiezen we een moment waarop laden en lossen vlot gaat",
      "Bij een gedeelde inkom of traphal checken we eerst wat in uw overeenkomst staat",
    ],
  },
  borgerhout: {
    slug: "borgerhout",
    name: "Borgerhout",
    isHub: false,
    nearby: ["Antwerpen", "Berchem", "Deurne", "Merksem"],
    considerations: [
      "Bij smalle gangen of een krappe toegang werken we met compact materiaal",
      "Bij korte laad- en losmomenten brengen we alles in één beweging naar binnen",
      "Bij een verdieping zonder lift houden we rekening met extra tijd",
    ],
  },
  deurne: {
    slug: "deurne",
    name: "Deurne",
    isHub: false,
    nearby: ["Borgerhout", "Berchem", "Merksem", "Wommelgem", "Wijnegem"],
    considerations: [
      "Bij een woning met tuin, garage of berging vragen we vooraf wat meegaat",
      "Bij vlotte parkeergelegenheid kunnen we met volledig materiaal werken",
      "Bij gemeenschappelijke delen van een gebouw spreken we de scope vooraf af",
    ],
  },
  wilrijk: {
    slug: "wilrijk",
    name: "Wilrijk",
    isHub: false,
    nearby: ["Berchem", "Hoboken", "Mortsel", "Edegem", "Antwerpen"],
    considerations: [
      "Bij een eigen oprit of garage staat het materiaal vlak bij de deur",
      "Bij een ruimere oppervlakte zetten we meerdere mensen in",
      "Bij een pand met eigen parking kunnen we buiten de uren werken",
    ],
  },
  merksem: {
    slug: "merksem",
    name: "Merksem",
    isHub: false,
    nearby: ["Deurne", "Borgerhout", "Ekeren", "Schoten", "Wijnegem"],
    considerations: [
      "Bij een opgelegde datum kijken we meteen wat binnen de planning haalbaar is",
      "Bij een gebouw met lift verloopt het werk sneller dan bij meerdere verdiepingen",
      "Bij een pand met een zaak beneden en een woonst erboven werken we van boven naar beneden",
    ],
  },
  hoboken: {
    slug: "hoboken",
    name: "Hoboken",
    isHub: false,
    nearby: ["Wilrijk", "Antwerpen", "Hemiksem", "Aartselaar"],
    considerations: [
      "Bij een oudere keuken of badkamer rekenen we meer tijd voor kalk en voegen",
      "Bij een recentere afwerking ligt de nadruk op vlekken, randen en details",
      "Bij parkeren in de straat stemmen we het moment af op de rust",
    ],
  },
  ekeren: {
    slug: "ekeren",
    name: "Ekeren",
    isHub: false,
    nearby: ["Merksem", "Brasschaat", "Kapellen", "Antwerpen"],
    considerations: [
      "Bij een veranda, tuinhuis of garage vragen we vooraf of die meegaan",
      "Bij een eigen oprit kan de ploeg vlot laden en lossen",
      "Bij veel glas plannen we extra tijd voor kaders en dorpels",
    ],
  },
  borsbeek: {
    slug: "borsbeek",
    name: "Borsbeek",
    isHub: false,
    nearby: ["Deurne", "Mortsel", "Wommelgem", "Berchem"],
    considerations: [
      "Bij vlotte toegang en parkeergelegenheid werken we met volledig materiaal",
      "Bij een combinatie van woon- en bedrijfsruimte splitsen we de scope",
      "Bij een pand dat in gebruik blijft, werken we buiten de uren",
    ],
  },
  schoten: {
    slug: "schoten",
    name: "Schoten",
    isHub: false,
    nearby: ["Brasschaat", "Merksem", "Wijnegem", "Schilde", "Deurne"],
    considerations: [
      "Bij een ruimere woning zetten we een ploeg in in plaats van één persoon",
      "Bij een tuin, garage of berging vragen we vooraf wat binnen de opdracht valt",
      "Bij een tweede badkamer of veel binnendeuren rekenen we extra tijd",
    ],
  },
  brasschaat: {
    slug: "brasschaat",
    name: "Brasschaat",
    isHub: false,
    nearby: ["Schoten", "Kapellen", "Ekeren", "Schilde"],
    considerations: [
      "Bij een groter pand met bijgebouwen bepalen we vooraf de volgorde",
      "Bij een kelder of zolder vragen we of die mee in de opdracht zitten",
      "Bij een oprit of eigen parking werken we met een volledige ploeg",
    ],
  },
  mortsel: {
    slug: "mortsel",
    name: "Mortsel",
    isHub: false,
    nearby: ["Berchem", "Edegem", "Borsbeek", "Wilrijk", "Hove"],
    considerations: [
      "Bij beperkte laad- en losruimte plannen we materiaal en afvoer samen",
      "Bij een gebouw zonder lift houden we rekening met trappen en overlopen",
      "Bij een krappe timing tussen verhuis en afspraak plannen we ertussenin",
    ],
  },
  edegem: {
    slug: "edegem",
    name: "Edegem",
    isHub: false,
    nearby: ["Mortsel", "Wilrijk", "Kontich", "Hove", "Aartselaar"],
    considerations: [
      "Bij een strenge beoordeling van de afwerking werken we detail per detail",
      "Bij consultatie- of openingsuren plannen we het onderhoud erbuiten",
      "Bij een eigen inkom en parking kunnen we zelfstandig werken",
    ],
  },
  kontich: {
    slug: "kontich",
    name: "Kontich",
    isHub: false,
    nearby: ["Edegem", "Aartselaar", "Hove", "Mortsel"],
    considerations: [
      "Bij een garage, kelder of bijgebouw vragen we die expliciet uit",
      "Bij een kantoor met magazijn splitsen we de frequentie per zone",
      "Bij een bedrijfsruimte werken we 's avonds of in het weekend",
    ],
  },
  wommelgem: {
    slug: "wommelgem",
    name: "Wommelgem",
    isHub: false,
    nearby: ["Deurne", "Wijnegem", "Borsbeek", "Ranst", "Mortsel"],
    considerations: [
      "Bij een pand met eigen parking werken we zonder dat iemand aanwezig hoeft te zijn",
      "Bij een combinatie van kantoor en werkplaats hanteren we twee regimes",
      "Bij een eerste beurt lopen we het pand graag samen door",
    ],
  },
  wijnegem: {
    slug: "wijnegem",
    name: "Wijnegem",
    isHub: false,
    nearby: ["Deurne", "Schoten", "Wommelgem", "Schilde", "Merksem"],
    considerations: [
      "Bij eigen openingsuren plannen we het onderhoud daarbuiten",
      "Bij vlotte bereikbaarheid kunnen we op korte termijn inschuiven",
      "Bij een gebouw met meerdere gebruikers leggen we de toegang schriftelijk vast",
    ],
  },
  kapellen: {
    slug: "kapellen",
    name: "Kapellen",
    isHub: false,
    nearby: ["Brasschaat", "Ekeren", "Kalmthout", "Stabroek"],
    considerations: [
      "Bij een ruimer pand met veel bergruimte bepalen we vooraf de scope",
      "Bij een eigen oprit staat het materiaal vlak bij de deur",
      "Bij veel glas plannen we extra tijd voor kaders en dorpels",
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
  /** Dienstspecifieke factor die de prijs mee bepaalt. */
  priceFactor: string;
  /** Eén reden om voor deze dienst met ons te werken. */
  whyUs: string;
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
    priceFactor: "Welke ruimtes meegaan: keuken, zaal, sanitair, bar of opslag",
    whyUs: "Wij werken voor of na uw openingsuren, zodat uw zaak geen omzeturen verliest.",
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
    priceFactor: "Het aantal werkplekken en sanitairblokken, en de gewenste frequentie",
    whyUs: "Een vast schema per ruimte, zodat u ons kunt afrekenen op wat is afgesproken.",
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
    priceFactor: "Het type werf: nieuwbouw, renovatie of afwerking na schilderwerken",
    whyUs: "Wij plannen rond uw opleverdatum, ook wanneer die krap is.",
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
    priceFactor: "Of de woning leeg is en of oven, koelkast en ramen meegaan",
    whyUs: "Wij stemmen de planning af op uw datum van plaatsbeschrijving.",
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
    priceFactor: "De vervuilingsgraad, want die bepaalt de tijd en de tijd bepaalt de prijs",
    whyUs: "Wij komen eerst kijken en zeggen eerlijk wat haalbaar is en wat niet.",
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
  // Sterkste organische leadcategorie: particuliere huurders met een datum.
  "schoonmaak-voor-plaatsbeschrijving": [
    "antwerpen",
    "berchem",
    "deurne",
    "wilrijk",
    "merksem",
    "hoboken",
    "borgerhout",
    "ekeren",
    "mortsel",
    "edegem",
    "kontich",
    "schoten",
  ],
  // Hoge orderwaarde per opdracht; breed inzetbaar in het hele werkgebied.
  opleveringsschoonmaak: [
    "antwerpen",
    "berchem",
    "deurne",
    "wilrijk",
    "merksem",
    "hoboken",
    "ekeren",
    "schoten",
    "brasschaat",
    "mortsel",
    "edegem",
    "kontich",
  ],
  // Periodieke B2B-contracten; beperkt tot de gemeenten die we hiervoor targeten.
  kantoorschoonmaak: [
    "antwerpen",
    "berchem",
    "deurne",
    "wilrijk",
    "merksem",
    "brasschaat",
    "edegem",
    "kontich",
    "wommelgem",
  ],
  // Beperkt tot de gemeenten waar wij deze dienst commercieel willen voeren.
  horecaschoonmaak: [
    "antwerpen",
    "berchem",
    "deurne",
    "wilrijk",
    "merksem",
    "borgerhout",
    "hoboken",
    "brasschaat",
  ],
  // Laagste zoekvolume, dus bewust beperkt tot de stad en haar districten.
  dieptereiniging: ["antwerpen", "berchem", "deurne", "wilrijk", "merksem"],
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

/**
 * Stabiele pseudowillekeurige keuze op basis van dienst én gemeente. Zo krijgt
 * elke combinatie een andere zinsbouw, zonder dat die tussen builds verspringt.
 */
function variant(serviceSlug: string, citySlug: string, count: number): number {
  const key = `${serviceSlug}|${citySlug}`;
  let sum = 0;
  for (let i = 0; i < key.length; i += 1) {
    sum = (sum * 31 + key.charCodeAt(i)) % 100000;
  }
  return sum % count;
}

/**
 * De intro varieert bewust in zinsbouw, niet alleen in plaatsnaam. Een lezer
 * die twee van onze lokale pagina's naast elkaar legt, mag geen invuloefening
 * zien — en een zoekmachine evenmin.
 */
function buildIntro(service: LocalService, location: LocationData): string {
  const near = location.nearby.slice(0, 3).join(", ");
  const naam = service.name.toLowerCase();
  const closings = [
    "Eenmalig of periodiek, telkens op een moment dat past bij uw werking.",
    "U krijgt vooraf een offerte op maat, zodat u weet waar u aan toe bent.",
    "Wat er precies gebeurt, leggen we vooraf vast — geen vage omschrijvingen.",
    "Eén aanspreekpunt, duidelijke afspraken en een prijs die vooraf vastligt.",
  ];
  const closing = closings[variant(service.slug, location.slug, closings.length)];

  const openings = [
    `${service.lead} nodig in ${location.name}? ${service.body}`,
    `Zoekt u ${naam} in ${location.name}? ${service.body}`,
    `Voor ${naam} in ${location.name} bent u bij ons aan het juiste adres. ${service.body}`,
    `${service.body} Ook in ${location.name}, met een ploeg die weet wat zo'n opdracht vraagt.`,
  ];
  const opening = openings[variant(location.slug, service.slug, openings.length)];

  // Wat op deze plek extra aandacht krijgt. Dit is het enige stuk van de intro
  // dat per dienst én gemeente verschilt, en dus het stuk dat telt.
  const focus = LOCAL_ANGLES[angleKey(service.slug, location.slug)]?.focus;
  const accenten = focus
    ? [
        ` Onze aandacht gaat daarbij vooral naar ${focus.toLowerCase()}.`,
        ` Daarbij letten wij extra op ${focus.toLowerCase()}.`,
        ` Bij zo'n opdracht gaat de meeste tijd naar ${focus.toLowerCase()}.`,
      ]
    : [""];
  const accent = accenten[variant(location.slug, naam, accenten.length)];

  const bereiken = location.isHub
    ? [
        `Wij werken in ${location.name} en de omliggende districten en gemeenten, van ${near} tot de rest van de regio.`,
        `Ons werkgebied omvat ${location.name} met al zijn districten, plus ${near} en de bredere regio.`,
      ]
    : [
        `Wij komen in ${location.name} en de omliggende gemeenten zoals ${near}.`,
        `${location.name} ligt binnen ons werkgebied, net als ${near}.`,
        `Naast ${location.name} zijn wij ook actief in ${near} en de rest van de regio.`,
      ];
  const bereik = bereiken[variant(naam, location.slug, bereiken.length)];

  return `${opening}${accent} ${bereik} ${closing}`;
}

/**
 * De invalshoek voor deze dienst in deze gemeente. Die is handgeschreven en
 * beschrijft een situatie plus onze aanpak — nooit een bewering over hoe het
 * er in die gemeente aan toegaat.
 *
 * Ontbreekt de invalshoek, dan wordt de combinatie niet gepubliceerd: een
 * lokale pagina zonder eigen inhoud is er geen.
 */
function buildLocalContext(
  service: LocalService,
  location: LocationData,
): string {
  const angle = LOCAL_ANGLES[angleKey(service.slug, location.slug)]?.angle;
  if (!angle) {
    throw new Error(
      `Geen invalshoek voor "${service.slug}" in "${location.slug}". ` +
        "Schrijf er een in config/local-angles.ts of haal de combinatie uit ACTIVE_LOCATIONS.",
    );
  }
  return angle;
}

/** Meta description die per dienst én gemeente anders geformuleerd is. */
function buildMetaDescription(
  service: LocalService,
  location: LocationData,
): string {
  const naam = service.name.toLowerCase();
  const varianten = [
    `${service.name} in ${location.name} en omgeving. ${service.metaBenefit} Vraag vrijblijvend een voorstel aan bij SchoonmaakKlaar.`,
    `Op zoek naar ${naam} in ${location.name}? ${service.metaBenefit} Duidelijke afspraken en een offerte op maat.`,
    `Professionele ${naam} voor ${location.name} en de omliggende gemeenten. ${service.metaBenefit} Vrijblijvend een prijs op maat.`,
    `${service.metaBenefit} Wij verzorgen ${naam} in ${location.name} en omgeving, eenmalig of op vaste momenten.`,
  ];
  return varianten[variant(service.slug, location.slug, varianten.length)];
}

/** Prijsfactoren: wat de prijs bepaalt, zonder ooit een tarief te noemen. */
function buildPriceFactors(
  service: LocalService,
  location: LocationData,
): string[] {
  const focus = LOCAL_ANGLES[angleKey(service.slug, location.slug)]?.focus;
  return [
    "De oppervlakte en het aantal ruimtes dat meegaat",
    "De staat van het pand en hoeveel achterstand er is",
    service.priceFactor,
    focus ? `Bijzondere aandacht voor: ${focus.toLowerCase()}` : null,
    "Of het om een eenmalige opdracht gaat of om een vast schema",
    "Het moment waarop wij werken, binnen of buiten uw uren",
  ].filter((item): item is string => Boolean(item));
}

function buildWhyUs(service: LocalService, location: LocationData): string[] {
  return [
    `Wij werken met een vaste ploeg in ${location.name} en de hele regio errond.`,
    "U krijgt vooraf een offerte op maat, met een concrete omschrijving van wat inbegrepen is.",
    service.whyUs,
    "Geen abonnementsverplichting: eenmalig kan evengoed als een vast schema.",
  ];
}

function buildFaq(service: LocalService, location: LocationData): FaqItem[] {
  const areaAnswer = location.isHub
    ? `Ja. Wij zijn actief in ${location.name} en de omliggende gemeenten, onder meer ${location.nearby.slice(0, 5).join(", ")} en de rest van de regio.`
    : `Ja, wij komen in ${location.name} en de omliggende gemeenten zoals ${location.nearby.slice(0, 3).join(", ")}.`;

  const local = LOCAL_ANGLES[angleKey(service.slug, location.slug)]?.faq;

  // De laatste twee vragen wisselen per combinatie, zodat niet elke lokale
  // pagina met exact dezelfde reeks eindigt.
  const sluitvragen: FaqItem[] = [
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
    {
      question: "Brengen jullie zelf materiaal en producten mee?",
      answer:
        "Ja, onze ploeg komt met eigen materiaal en producten. Gebruikt u liever iets specifieks voor een bepaalde ondergrond, laat het dan weten.",
    },
    {
      question: "Hoe snel krijg ik een antwoord op mijn aanvraag?",
      answer:
        "Meestal binnen één werkdag. Heeft u een vaste datum waar u naartoe werkt, vermeld die dan meteen — dan weten wij hoe dringend het is.",
    },
  ];
  // Een sluitvraag die hetzelfde onderwerp aansnijdt als de lokale of de
  // dienstvraag valt af: twee keer naar materiaal vragen op één pagina leest
  // als vulling.
  const alGesteld = [local?.question, service.faqExtra.question]
    .filter((q): q is string => Boolean(q))
    .join(" ")
    .toLowerCase();
  const botst = (vraag: string) =>
    vraag
      .toLowerCase()
      .split(/[^a-zà-ÿ]+/)
      .filter((woord) => woord.length > 6)
      .some((woord) => alGesteld.includes(woord));

  const bruikbaar = sluitvragen.filter((item) => !botst(item.question));
  const start = variant(service.slug, location.slug, bruikbaar.length);
  const gekozen = [
    bruikbaar[start],
    bruikbaar[(start + 1) % bruikbaar.length],
  ].filter(
    (item, index, lijst) =>
      item && lijst.findIndex((other) => other?.question === item.question) === index,
  );

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
    ...(local ? [local] : []),
    service.faqExtra,
    ...gekozen,
  ];
}

/**
 * Links naar andere diensten die wij in dezelfde gemeente aanbieden. Alleen
 * echt bestaande pagina's, en alleen wanneer de combinatie inhoudelijk
 * logisch is — geen linkmuur onderaan elke pagina.
 */
const RELATED_IN_CITY: Record<string, string[]> = {
  "schoonmaak-voor-plaatsbeschrijving": [
    "opleveringsschoonmaak",
    "dieptereiniging",
  ],
  opleveringsschoonmaak: [
    "schoonmaak-voor-plaatsbeschrijving",
    "dieptereiniging",
  ],
  kantoorschoonmaak: ["dieptereiniging", "opleveringsschoonmaak"],
  horecaschoonmaak: ["dieptereiniging", "kantoorschoonmaak"],
  dieptereiniging: ["opleveringsschoonmaak", "kantoorschoonmaak"],
};

function buildSameCityLinks(
  service: LocalService,
  location: LocationData,
): LocalLink[] {
  const kandidaten = RELATED_IN_CITY[service.slug] ?? [];
  return kandidaten
    .filter((slug) => (ACTIVE_LOCATIONS[slug] ?? []).includes(location.slug))
    .map((slug) => ({
      label: `${LOCAL_SERVICES[slug].name} in ${location.name}`,
      href: `/${slug}/${location.slug}`,
    }));
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
  const angle = LOCAL_ANGLES[angleKey(service.slug, location.slug)];

  // De lokale situatie komt vooraan te staan: dat is de reden waarom iemand
  // op deze pagina en niet op de algemene dienstpagina terechtkomt.
  const whenToUse = angle
    ? [angle.situation, ...service.whenToUse]
    : service.whenToUse;

  return {
    serviceSlug: service.slug,
    citySlug: location.slug,
    path: `/${service.slug}/${location.slug}`,
    serviceName: service.name,
    locationName: location.name,
    isHub: location.isHub,
    h1,
    metaTitle: `${service.name} ${location.name}`,
    metaDescription: buildMetaDescription(service, location),
    eyebrow: `${service.name} · ${location.name}`,
    intro: buildIntro(service, location),
    localContext: buildLocalContext(service, location),
    localConsiderations: location.considerations,
    whenToUse,
    whatWeDo: service.whatWeDo,
    forWho: service.forWho,
    processSteps: buildProcessSteps(service),
    priceFactors: buildPriceFactors(service, location),
    whyUs: buildWhyUs(service, location),
    nearbyAreas: location.nearby,
    relatedLinks: [...service.related, OFFERTE_LINK, DIENSTEN_LINK],
    sameCityLinks: buildSameCityLinks(service, location),
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

/**
 * De lokale pagina's van de centrale stad. Gebruikt op plaatsen die op élke
 * pagina verschijnen — de footer en het werkgebiedblok — zodat daar niet
 * tientallen links staan. De volledige stadlijst per dienst hoort thuis op de
 * dienstpagina zelf, waar ze ook betekenis heeft.
 */
export const hubLocalPages: LocalPageData[] = localPages.filter(
  (page) => page.isHub,
);
