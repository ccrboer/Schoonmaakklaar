import type { FaqItem } from "@/types";

/**
 * Per combinatie van dienst én gemeente: een eigen invalshoek, een extra
 * situatie en een eigen vraag voor de FAQ.
 *
 * Belangrijke regel: deze teksten beschrijven SITUATIES en onze aanpak, nooit
 * beweerde eigenschappen van een gemeente. Wij hebben geen bron voor hoeveel
 * herenhuizen er in Berchem staan of hoe smal de gangen in Borgerhout zijn,
 * dus zetten we zulke dingen ook niet op de site. Het verschil tussen de
 * pagina's komt uit welk klantscenario vooropstaat, welke volgorde we
 * aanhouden, welke prijsfactoren wegen en welke vragen we beantwoorden.
 *
 * Wat hier dus NOOIT in hoort: beweringen over de lokale huurmarkt, het
 * pandenbestand, de horecadichtheid of de bedrijvigheid van een gemeente, en
 * evenmin verzonnen klanten, cases, cijfers of straatnamen.
 *
 * Sleutel: "<dienst-slug>:<gemeente-slug>".
 */
export interface LocalAngle {
  /** Drie tot vier zinnen over het scenario en onze aanpak. */
  angle: string;
  /** Eén klantsituatie die op deze pagina vooropstaat. */
  situation: string;
  /** Waar bij zo'n opdracht de meeste tijd in gaat. */
  focus?: string;
  /** Eén vraag die bij dit scenario past. */
  faq: FaqItem;
}

export const LOCAL_ANGLES: Record<string, LocalAngle> = {
  /* =====================================================================
   * Schoonmaak voor plaatsbeschrijving
   * ================================================================== */

  "schoonmaak-voor-plaatsbeschrijving:antwerpen": {
    angle:
      "Gaat het om een studio, een kot of een kleiner appartement, dan is de oppervlakte beperkt maar de verwachting hoog: bij een recent gerenoveerde afwerking wordt er nauw gekeken. In de praktijk gaat het mis op dezelfde plekken, ongeacht waar de woning staat — de binnenkant van de keukenkasten, de voegen in de badkamer en de plinten achter meubels die net zijn weggehaald. Wij werken die onderdelen expliciet af in plaats van ze mee te nemen in een algemene beurt.",
    situation:
      "U verlaat een studio of kot en de verhuurder laat de plaatsbeschrijving door een expert opnemen",
    focus: "Keukenkasten van binnen, voegen en plinten na het leeghalen",
    faq: {
      question:
        "Kunnen jullie een studio of kot in Antwerpen op korte termijn doen?",
      answer:
        "Vaak wel. Een kleinere oppervlakte vraagt minder tijd, waardoor er makkelijker een plek vrijkomt in de planning. Geef uw datum van plaatsbeschrijving meteen mee, dan weten we waar we naartoe werken.",
    },
  },

  "schoonmaak-voor-plaatsbeschrijving:berchem": {
    angle:
      "Woont u op een verdieping van een pand dat uit meerdere wooneenheden bestaat, dan kost een eindschoonmaak meer tijd dan de vierkante meters doen vermoeden. Het vuil zit er in de randen: bovenaan het schrijnwerk, achter de radiatoren en in de hoeken van een trappenhuis dat u met anderen deelt. Wij stemmen de volgorde daar vooraf op af, en vragen ook of de gemeenschappelijke inkom in uw huurcontract staat.",
    situation:
      "U huurt een verdieping in een pand met meerdere wooneenheden en wilt ook de gemeenschappelijke inkom proper achterlaten",
    focus: "Schrijnwerk, radiatoren en traphal",
    faq: {
      question: "Nemen jullie de gemeenschappelijke traphal mee?",
      answer:
        "Dat kan, maar het hangt af van uw huurcontract. Staat de traphal of de inkom mee in uw verplichtingen, geef dat dan aan: we nemen die ruimte dan mee in het voorstel.",
    },
  },

  "schoonmaak-voor-plaatsbeschrijving:deurne": {
    angle:
      "Bij een gezinswoning komt er na de verhuis meestal meer bij kijken dan de woonruimtes alleen: een berging, een garage of een keldertrap blijven het langst liggen en zijn na het leeghalen het vuilst. Bij een appartement draait het eerder om de keuken, het sanitair en een eventueel terras. Welke van die twee uw situatie is, bepaalt hoeveel tijd we inplannen — dus vragen we het vooraf.",
    situation:
      "U verlaat een gezinswoning en ook de garage, berging of kelder moet leeg en proper",
    focus: "Berging, garage en terras naast de woonruimtes",
    faq: {
      question: "Hoort de garage of de berging erbij?",
      answer:
        "Als die in uw huurovereenkomst staat, nemen wij ze mee. Vermeld het in uw aanvraag, want een garage of kelder verandert de omvang en dus de prijs.",
    },
  },

  "schoonmaak-voor-plaatsbeschrijving:wilrijk": {
    angle:
      "Bij een ruimere woning verschuift het zwaartepunt van detailwerk naar volume: meer vloer, meer ramen en meer binnendeuren — precies de onderdelen die bij een plaatsbeschrijving stuk voor stuk nagelopen worden. Kan de ploeg vlak bij de deur laden en lossen, dan gaat die tijd rechtstreeks in de schoonmaak in plaats van in heen-en-weer lopen. Laat daarom weten hoe de toegang eruitziet.",
    situation:
      "U levert een ruimere gezinswoning op en wilt niet zelf dagen bezig zijn met vloeren en ramen",
    focus: "Vloeroppervlak, binnendeuren en ramen langs de binnenzijde",
    faq: {
      question: "Hoe lang duurt het voor een woning in Wilrijk?",
      answer:
        "Dat hangt af van de oppervlakte en de staat. Een gemiddelde gezinswoning is doorgaans een halve tot een hele dag werk met meerdere mensen. U krijgt die inschatting vooraf, samen met de prijs.",
    },
  },

  "schoonmaak-voor-plaatsbeschrijving:merksem": {
    angle:
      "Soms ligt de datum vast voordat u er zelf klaar voor bent: een verhuurder of een huisvestingsmaatschappij legt een moment op en daar valt weinig aan te schuiven. Bij een appartement met lift verloopt het werk dan vlot; bij een woning met meerdere verdiepingen kost de trap tijd, zeker wanneer ook een zolder of kelder mee moet. Geef uw datum zo vroeg mogelijk door, dan weten we meteen wat haalbaar is.",
    situation:
      "De verhuurder of de huisvestingsmaatschappij heeft een vaste datum opgelegd en u heeft weinig tijd",
    focus: "Trappen, zolder en kelder naast de hoofdruimtes",
    faq: {
      question: "Kunnen jullie nog deze week in Merksem komen?",
      answer:
        "Soms lukt dat. Bij een gaatje in de planning kunnen we snel schakelen, zeker bij kleinere opdrachten. Bel of stuur een bericht met uw datum, dan weet u het meteen.",
    },
  },

  "schoonmaak-voor-plaatsbeschrijving:hoboken": {
    angle:
      "Gaat de woning al jaren mee, dan zit de grootste tijdwinst in het sanitair en de keuken: tegels, voegen en kasten die lang dienst hebben gedaan, vragen bij een eindschoonmaak meer dan een gewone beurt. Bij een recentere afwerking is het net omgekeerd — daar wordt strenger gekeken naar krassen, kalkranden en vlekken omdat alles nog nieuw oogt. Wij vragen vooraf welke van de twee uw woning is.",
    situation:
      "U verlaat een woning waar keuken en badkamer al jaren meegaan",
    focus: "Tegels, voegen en kalkaanslag in sanitair en keuken",
    faq: {
      question: "Krijgen jullie oude kalkaanslag weg?",
      answer:
        "Meestal wel, met de juiste producten en voldoende tijd. Volledig ingevreten kalk of beschadigd email krijgen we niet altijd volledig weg — dat zeggen we dan eerlijk vooraf in plaats van achteraf.",
    },
  },

  "schoonmaak-voor-plaatsbeschrijving:borgerhout": {
    angle:
      "Ligt uw woning op een verdieping zonder lift, dan moeten materiaal en afval met de hand naar boven en beneden. Dat is geen probleem, maar het bepaalt wel hoeveel tijd een verdieping kost. Daarom vragen wij vooraf op welke hoogte uw woning ligt en of er een lift is: zo klopt de planning en de prijs vanaf het begin.",
    situation: "Uw woning ligt op een verdieping zonder lift",
    focus: "Trappenhuis, overlopen en toegang op hoogte",
    faq: {
      question: "Is een verdieping zonder lift een probleem?",
      answer:
        "Nee, maar het kost meer tijd. Laat ons weten op welke verdieping u woont en of er een lift is, dan houden wij daar in de planning en in het voorstel rekening mee.",
    },
  },

  "schoonmaak-voor-plaatsbeschrijving:ekeren": {
    angle:
      "Hoort er bij de woning een veranda, een tuinhuis of een garage, dan telt dat mee voor de omvang van de eindschoonmaak. Die buitenruimtes staan niet altijd in de plaatsbeschrijving, en soms juist wel — dat verschilt per huurovereenkomst. Wij vragen daarom vooraf wat er precies in uw contract staat, zodat we niets dubbel doen en niets vergeten.",
    situation:
      "Naast de woning moeten ook een veranda, tuinhuis of garage proper opgeleverd worden",
    focus: "Veranda, bijgebouwen en ramen langs de binnenzijde",
    faq: {
      question: "Nemen jullie een veranda of tuinhuis mee?",
      answer:
        "Dat kan, als u het meegeeft in de aanvraag. Het telt mee voor de omvang, dus we nemen het expliciet op in het voorstel in plaats van het achteraf te verrekenen.",
    },
  },

  "schoonmaak-voor-plaatsbeschrijving:mortsel": {
    angle:
      "Valt uw verhuis in dezelfde week als de plaatsbeschrijving, dan zit er weinig speling tussen het leeghalen en de afspraak. Juist dan loont het om de schoonmaak uit handen te geven: wij komen nadat alles buiten is en zorgen dat de woning op de afgesproken dag klaar staat. Geef ons beide data door, dan plannen we er precies tussenin.",
    situation: "De verhuis en de plaatsbeschrijving vallen binnen dezelfde week",
    focus: "Volledige eindbeurt in één dag, afgestemd op de afspraak",
    faq: {
      question: "Kunnen jullie komen tussen de verhuis en de afspraak in?",
      answer:
        "Dat is net het ideale moment. Zodra de woning leeg is, kunnen wij overal bij. Geef beide data door, dan plannen we er tussenin.",
    },
  },

  "schoonmaak-voor-plaatsbeschrijving:edegem": {
    angle:
      "Wordt er bij de oplevering streng naar de afwerking gekeken, dan verschuift het werk van breedte naar diepte. Schrijnwerk, binnendeuren, ingebouwde kasten en de randen van het sanitair bepalen dan de indruk, niet de vloeroppervlakte. Wij werken die onderdelen apart af en benoemen ze ook apart in het voorstel, zodat u ziet waarvoor u betaalt.",
    situation:
      "De verhuurder of de syndicus kijkt streng naar de afwerking en de details",
    focus: "Schrijnwerk, ingebouwde kasten en de randen van het sanitair",
    faq: {
      question: "Wat als de verhuurder achteraf toch opmerkingen heeft?",
      answer:
        "Wij leveren de afgesproken schoonmaak, maar wij bepalen de beoordeling niet. Daarom spreken we vooraf duidelijk af wat er gedaan wordt. Blijkt iets vergeten dat in de opdracht stond, dan lossen we dat op.",
    },
  },

  "schoonmaak-voor-plaatsbeschrijving:kontich": {
    angle:
      "Bij een woning met een garage, een kelder of een bijgebouw blijven die ruimtes bij het leeghalen het langst liggen, en daar blijft nadien het meeste stof en vuil achter. Ze vallen daardoor makkelijk buiten de planning terwijl ze wel in de huurovereenkomst staan. Wij vragen ze daarom expliciet uit vóór we een prijs geven.",
    situation:
      "De woning is leeg, maar garage, kelder en bijgebouw zijn nog niet aangepakt",
    focus: "Garage, kelder en bijgebouwen na het leeghalen",
    faq: {
      question: "Ruimen jullie ook achtergelaten spullen op?",
      answer:
        "Schoonmaken doen wij; leeghalen en afvoeren is ander werk. Blijft er veel achter, dan zeggen we dat vooraf, zodat u dat apart kunt regelen voordat wij komen.",
    },
  },

  "schoonmaak-voor-plaatsbeschrijving:schoten": {
    angle:
      "Bij een ruimere woning met meerdere badkamers en veel ramen is een eindschoonmaak geen klus voor één persoon op één dag. Wij zetten er dan een ploeg op, zodat het binnen één werkdag rond is en u de sleutels op tijd kunt afgeven. Hoeveel mensen dat worden, hangt af van de oppervlakte en van de datum waar u naartoe werkt.",
    situation:
      "Een ruime woning met meerdere badkamers moet in één dag klaar zijn",
    focus: "Tweede badkamer, ramen en binnendeuren",
    faq: {
      question: "Komen jullie met meerdere mensen?",
      answer:
        "Bij grotere woningen wel. Dat is sneller voor u en praktischer voor ons: een eindschoonmaak die in één dag rond moet zijn, doe je niet alleen.",
    },
  },

  /* =====================================================================
   * Opleveringsschoonmaak
   * ================================================================== */

  "opleveringsschoonmaak:antwerpen": {
    angle:
      "Nieuwbouw en renovatie laten elk een ander soort vuil achter. Na nieuwbouw gaat het vooral om fijn bouwstof, siliconenresten en stickers; na een renovatie eerder om gruis, verfspatten en pleisterstof dat overal inkruipt. Daar komt de praktische kant bij: is er weinig laad- en losruimte of ligt de werf op een verdieping, dan plannen we materiaal en afvoer in één beweging.",
    situation:
      "Een renovatie is af en het pleisterstof zit tot in de kasten",
    focus: "Pleisterstof en verfspatten in een bewoonde omgeving",
    faq: {
      question: "Hoe regelen jullie toegang bij een werf in de stad?",
      answer:
        "Meestal spreken we een tijdslot af waarop laden en lossen kan, of we werken met materiaal dat in één keer naar binnen gaat. Geef door of er een lift is en waar u kunt stilstaan, dan plannen we daarop.",
    },
  },

  "opleveringsschoonmaak:berchem": {
    angle:
      "Worden er meerdere units in hetzelfde gebouw opgeleverd, dan is de volgorde het halve werk. De traphal doet tijdens de werken dienst als werfweg, en elke unit is op een ander moment klaar. Wij werken daarom unit per unit en doen de gemeenschappelijke delen op het laatst, zodat werfverkeer niet terugkomt in wat net gedaan is.",
    situation:
      "Meerdere units in hetzelfde gebouw worden op verschillende momenten opgeleverd",
    focus: "Traphal en gemeenschappelijke delen ná de units",
    faq: {
      question: "Kunnen jullie unit per unit werken?",
      answer:
        "Ja, en bij een opgedeeld pand is dat meestal ook de beste volgorde. We doen de gemeenschappelijke delen op het laatst, zodat werfverkeer het werk niet opnieuw vuil maakt.",
    },
  },

  "opleveringsschoonmaak:deurne": {
    angle:
      "Is het schilderwerk net klaar, dan ligt er een film van stof op alles — inclusief op de radiatoren, de plinten en het schrijnwerk waar bij de werken niemand aan denkt. Dat vraagt een andere aanpak dan een gewone beurt: van boven naar beneden, en pas aan de vloer beginnen als de rest gedaan is. Wij komen daarvoor het liefst nadat de verf volledig droog is en al het werfmateriaal weg is.",
    situation: "Het schilderwerk is net af en er moet nog een laag stof van alles",
    focus: "Radiatoren, schrijnwerk en plinten na schilderwerken",
    faq: {
      question: "Wanneer komen jullie het best na de schilder?",
      answer:
        "Nadat de verf volledig droog is en al het werfmateriaal weg is. Komen wij te vroeg, dan werken we voor niets; te laat is zelden een probleem, zolang de opleverdatum het toelaat.",
    },
  },

  "opleveringsschoonmaak:wilrijk": {
    angle:
      "Hoe meer glas er in een pand zit, hoe meer tijd een oplevering kost. Grote raampartijen en schuiframen naar de tuin zien er na de werken het slechtst uit, want in de kaders en op de dorpels verzamelt het bouwstof zich. Wij nemen ramen langs de binnenzijde standaard mee, kaders en dorpels inbegrepen.",
    situation:
      "Een verbouwing met grote raampartijen moet instapklaar opgeleverd worden",
    focus: "Glas langs de binnenzijde, met kaders en dorpels",
    faq: {
      question: "Doen jullie ook de buitenzijde van de ramen?",
      answer:
        "Standaard doen we de binnenzijde. De buitenzijde kan in overleg, zolang het veilig bereikbaar is zonder hoogwerker of gevelwerk — anders verwijzen we u door naar een glasbewassingsbedrijf.",
    },
  },

  "opleveringsschoonmaak:merksem": {
    angle:
      "Wordt er gerenoveerd in een bewoond gebouw, dan leven de buren gewoon door terwijl de werken lopen. Dat stelt eisen aan de manier van werken: stof afvoeren in plaats van opjagen, de traphal schoon achterlaten en afval meteen meenemen. Volledig stofvrij bestaat niet, maar de volgorde en de werkwijze schelen een wereld.",
    situation:
      "Er wordt gerenoveerd in een bewoond gebouw en de buren mogen er geen last van hebben",
    focus: "Stofbeheersing en een nette traphal tijdens het werk",
    faq: {
      question: "Hoe voorkomen jullie dat het stof zich verspreidt?",
      answer:
        "We werken van boven naar beneden, zuigen in plaats van te vegen waar dat kan, en houden de deuren naar gemeenschappelijke delen gesloten. Volledig stofvrij bestaat niet, maar het scheelt een wereld.",
    },
  },

  "opleveringsschoonmaak:hoboken": {
    angle:
      "Bij een nieuwbouw zit de oplevering vooral in wat er nog op zit: beschermfolie, stickers op het glas en het sanitair, en siliconenresten langs de randen. Bij een ouder pand zit ze juist in de hoeken en in de lagen die er al waren. Beide vragen een andere aanpak, dus vragen wij vooraf om welk type werf het gaat.",
    situation:
      "Een nieuwbouw moet instapklaar: folie, stickers en siliconenresten moeten weg",
    focus: "Beschermfolie, stickers en siliconenresten",
    faq: {
      question: "Verwijderen jullie beschermfolie en stickers?",
      answer:
        "Ja, dat hoort bij een opleveringsschoonmaak. Zit folie er al lang op en is ze ingebrand door de zon, dan kost het meer tijd — dat melden we vooraf.",
    },
  },

  "opleveringsschoonmaak:ekeren": {
    angle:
      "Wordt er in fases verbouwd, dan is één deel van het pand klaar terwijl elders nog gewerkt wordt. Een oplevering in één keer is dan niet logisch: u wilt een afgewerkte ruimte meteen in gebruik kunnen nemen. Wij plannen daarom per fase en spreken telkens af wat er gedaan wordt en wat er nog volgt.",
    situation:
      "Een aanbouw of nieuwe keuken is klaar terwijl de rest nog in de steigers staat",
    focus: "Gefaseerde afwerking per ruimte",
    faq: {
      question: "Kunnen jullie in fases komen?",
      answer:
        "Ja. Bij een verbouwing in delen is dat vaak logischer dan één grote eindbeurt. We spreken dan per fase af wat er gedaan wordt en wat er nog volgt.",
    },
  },

  "opleveringsschoonmaak:schoten": {
    angle:
      "Bij een verbouwing over meerdere ruimtes tegelijk loopt het bouwstof verder dan de werfzone — tot in kasten en op plekken die niemand bij de werken betrokken had. Alleen de verbouwde ruimtes schoonmaken levert dan een halve oplevering op. Wij lopen daarom in overleg het hele pand na, niet enkel het gedeelte waar gewerkt is.",
    situation: "Het bouwstof is verder getrokken dan de ruimtes waar gewerkt werd",
    focus: "Het hele pand, niet alleen de werfzone",
    faq: {
      question: "Maken jullie ook de ruimtes waar niet gewerkt is?",
      answer:
        "In overleg wel. Bouwstof stopt niet bij een deur, dus bij een grote verbouwing is het meestal verstandig om de aangrenzende ruimtes mee te nemen.",
    },
  },

  "opleveringsschoonmaak:brasschaat": {
    angle:
      "Bij een groter pand met bijgebouwen, een kelder of een zolder is een oplevering vooral een kwestie van volume en volgorde. Veel vierkante meters, veel glas, en bijgebouwen die pas aan bod komen als het hoofdgebouw klaar is. Is er een oprit of parkeerruimte, dan kunnen wij met een volledige ploeg en volledig materiaal werken — en dat bepaalt of het één of twee dagen wordt.",
    situation:
      "Een grote woning met bijgebouwen moet op één opleverdatum klaar zijn",
    focus: "Volume, glas en bijgebouwen in de juiste volgorde",
    faq: {
      question: "Hoeveel mensen zetten jullie in op een groot pand?",
      answer:
        "Dat hangt af van de oppervlakte en de datum. Bij een groot pand met een vaste opleverdatum werken we met een ploeg, zodat alles in één of twee dagen rond is.",
    },
  },

  "opleveringsschoonmaak:mortsel": {
    angle:
      "Ligt de werf aan een straat waar laden en lossen beperkt mogelijk is, dan plannen wij materiaal en afvoer in één beweging in plaats van in losse ritten. Binnen draait een oplevering dan vooral om de trappen, het schrijnwerk en de vloeren: die krijgen van werfverkeer het meeste te verduren. Geef vooraf door hoe de toegang eruitziet, dan stemmen we het moment daarop af.",
    situation:
      "De werf ligt aan een straat waar laden en lossen beperkt mogelijk is",
    focus: "Trappen, schrijnwerk en vloeren na werfverkeer",
    faq: {
      question: "Wat als er geen plaats is om stil te staan?",
      answer:
        "Geef dat vooraf door. We stemmen dan het moment en het materiaal af, bijvoorbeeld vroeg in de ochtend wanneer de straat nog rustig is.",
    },
  },

  "opleveringsschoonmaak:edegem": {
    angle:
      "Is de afwerking net geplaatst, dan telt bij de oplevering vooral het detail: siliconenranden, de binnenkant van nieuwe kasten, de dorpels en het schrijnwerk rond deuren en ramen. Dat zijn de plekken waar bouwstof en zaagsel blijven hangen, en waar het als eerste opvalt als er niets aan gedaan is. Wij nemen die onderdelen standaard mee.",
    situation: "De afwerking is net geplaatst en moet smetteloos opgeleverd worden",
    focus: "Siliconenranden, nieuwe kasten en dorpels",
    faq: {
      question: "Maken jullie ook de binnenkant van nieuwe kasten?",
      answer:
        "Ja. Bij een oplevering hoort dat erbij: in nieuwe kasten en laden zit vrijwel altijd nog zaagsel en bouwstof.",
    },
  },

  "opleveringsschoonmaak:kontich": {
    angle:
      "Een bedrijfsruimte vraagt een andere aanpak dan een woning: grotere vloeroppervlaktes, meer glas en een oplevering die vaak 's avonds of in het weekend moet gebeuren omdat de zaak maandag weer open is. Dat verandert niet alleen de planning maar ook het materiaal dat we meebrengen. Geef uw opleverdatum en uw openingsuren door, dan plannen we daarbuiten.",
    situation: "Een kantoor of showroom moet na de werken meteen weer open kunnen",
    focus: "Grote vloeren en glaspartijen van een bedrijfsruimte",
    faq: {
      question: "Kunnen jullie 's avonds of in het weekend opleveren?",
      answer:
        "Ja. Bij bedrijfsruimtes is dat vaak de enige werkbare optie. Geef uw opleverdatum en openingsuren door, dan plannen we daarbuiten.",
    },
  },

  /* =====================================================================
   * Kantoorschoonmaak
   * ================================================================== */

  "kantoorschoonmaak:antwerpen": {
    angle:
      "Zit uw kantoor in een gebouw waar u de inkom en de lift met anderen deelt, dan is het eerst een kwestie van afspraken: wanneer wij komen, hoe wij binnen geraken en welke ruimtes onder uw contract vallen. Die drie leggen wij bij de start schriftelijk vast, inclusief wie verantwoordelijk is voor afsluiten. Daarna loopt het onderhoud zonder dat u er nog naar hoeft om te kijken.",
    situation:
      "Uw kantoor zit in een gebouw waar u de inkom en de lift met anderen deelt",
    focus: "Toegangsafspraken en gedeelde circulatiezones",
    faq: {
      question: "Hoe regelen jullie toegang tot een gedeeld gebouw?",
      answer:
        "Met een sleutel, badge of code, afhankelijk van wat uw gebouw gebruikt. We leggen dat bij de start schriftelijk vast, inclusief wie er verantwoordelijk is voor afsluiten.",
    },
  },

  "kantoorschoonmaak:berchem": {
    angle:
      "Een praktijk of kantoor in een pand dat oorspronkelijk een woning was, onderhoud je anders dan een open kantoorplateau: meer deuren, meer kleine ruimtes en contactpunten die dagelijks worden aangeraakt. Een algemene ronde schiet daar tekort. Wij werken met een vast schema per ruimte, zodat de wachtruimte, de consultatieruimtes en het sanitair elk hun eigen frequentie krijgen.",
    situation:
      "Een praktijk of kantoor in een voormalig woonhuis, met veel kleine ruimtes",
    focus: "Wachtruimte, contactpunten en sanitair tussen consultaties door",
    faq: {
      question: "Kunnen jullie tussen consultaties door komen?",
      answer:
        "Dat kan. Veel praktijken kiezen voor een vast moment aan het begin of het einde van de dag, maar een korte beurt tussen de blokken door is ook mogelijk als het schema dat toelaat.",
    },
  },

  "kantoorschoonmaak:deurne": {
    angle:
      "Bij een kleiner kantoor gaat het om een handvol werkplekken, een vergaderruimte, sanitair en een keukenhoek. Juist bij die omvang maakt regelmaat het verschil: een kantoor dat er altijd verzorgd bij ligt tegenover één dat er twee keer per maand even goed uitziet. Wij stemmen de frequentie en de duur af op de oppervlakte, zodat het in verhouding blijft.",
    situation:
      "Een kleiner kantoor waar het onderhoud er nu bij geschoven wordt door het team zelf",
    focus: "Werkplekken, keukenhoek en sanitair volgens vast schema",
    faq: {
      question: "Is ons kantoor niet te klein voor een vast contract?",
      answer:
        "Zelden. Ook bij een handvol werkplekken is een korte, vaste beurt zinvol. We stemmen de frequentie en de duur af op de omvang, zodat het in verhouding blijft.",
    },
  },

  "kantoorschoonmaak:wilrijk": {
    angle:
      "Heeft uw pand een eigen inkom en eigen parkeergelegenheid, dan kunnen wij buiten de kantooruren werken zonder dat iemand hoeft open te doen. Komt er veel bezoekersverkeer over de vloer, dan verschuift het zwaartepunt naar de contactpunten en het sanitair — daar is het verschil het snelst zichtbaar. Welke van die twee voor u telt, bepalen we bij de intake.",
    situation:
      "Een praktijk of kantoor met eigen parking waar buiten de uren gewerkt kan worden",
    focus: "Contactpunten en sanitair bij veel bezoekersverkeer",
    faq: {
      question: "Werken jullie ook in zorgpraktijken?",
      answer:
        "Ja, voor het gewone onderhoud: wachtruimte, sanitair, vloeren en contactpunten. Medische desinfectieprotocollen vallen daarbuiten — dat is specialistenwerk met eigen voorschriften.",
    },
  },

  "kantoorschoonmaak:merksem": {
    angle:
      "Heeft uw pand een publiek gedeelte waar klanten komen en een werkgedeelte erachter of erboven, dan stellen die twee heel verschillende eisen. Het publieke deel moet er elke ochtend verzorgd bij liggen; het werkgedeelte vraagt vooral regelmaat. Dat onderscheid zetten wij expliciet in het schema in plaats van overal dezelfde frequentie te hanteren.",
    situation:
      "Een handelspand met publieke ruimte vooraan en kantoren erachter of erboven",
    focus: "Onthaal en etalagezone vóór de openingsuren",
    faq: {
      question: "Kunnen jullie vóór de opening komen?",
      answer:
        "Ja. Voor een pand met publiek is dat meestal de beste keuze: alles ligt er fris bij wanneer de eerste klant binnenkomt.",
    },
  },

  "kantoorschoonmaak:brasschaat": {
    angle:
      "Komen er klanten over de vloer, dan is de inkom het eerste wat ze zien en de vergaderruimte het tweede. Representativiteit weegt dan zwaarder dan vierkante meters. Wij leggen de nadruk daarom op de onthaalzone, de vergaderruimte en het sanitair, en houden de rest op een rustiger maar vast ritme.",
    situation:
      "Klanten komen over de vloer en de inkom moet er altijd verzorgd bij liggen",
    focus: "Onthaal, vergaderruimte en sanitair",
    faq: {
      question: "Kunnen jullie vóór een klantenbezoek extra langskomen?",
      answer:
        "Dat kan in overleg. Sommige klanten houden een vaste frequentie aan en bellen ons voor een extra beurt vóór een belangrijke afspraak.",
    },
  },

  "kantoorschoonmaak:edegem": {
    angle:
      "Is uw wachtruimte de hele dag bezet, dan moet het onderhoud ertussendoor of erbuiten gebeuren — en het moet onopvallend zijn. Een wisselende poetshulp die telkens opnieuw uitleg nodig heeft, werkt dan tegen u. Wij werken met vaste momenten en een vaste ploeg, zodat uw patiënten of klanten er niets van merken.",
    situation:
      "Een praktijk met consultatie-uren waarbij het onderhoud niet mag opvallen",
    focus: "Wachtruimte en sanitair buiten de consultatie-uren",
    faq: {
      question: "Komt er altijd dezelfde persoon?",
      answer:
        "Daar streven wij naar. Een vaste ploeg kent uw pand, uw sleutels en uw afspraken, en dat levert constanter werk op. Bij ziekte of verlof zorgen we voor vervanging die ingewerkt is.",
    },
  },

  "kantoorschoonmaak:kontich": {
    angle:
      "Zitten een kantoorgedeelte en een magazijn of werkplaats onder hetzelfde dak, dan vragen die twee een ander regime: het kantoor wekelijks of vaker, de werkplaats op een lager ritme en met ander materiaal. Eén frequentie voor het hele pand betekent dat u te veel betaalt voor het ene of te weinig doet aan het andere. Wij splitsen dat expliciet in het voorstel.",
    situation:
      "Een kantoorgedeelte en een magazijn of werkplaats onder hetzelfde dak",
    focus: "Gescheiden regime voor kantoor en werkplaats",
    faq: {
      question: "Doen jullie ook het magazijn of de werkplaats?",
      answer:
        "Dat kan, maar op een eigen frequentie en met eigen materiaal. We nemen het apart op in het voorstel, zodat de verhouding tussen prijs en nut klopt.",
    },
  },

  "kantoorschoonmaak:wommelgem": {
    angle:
      "Is uw pand vlot bereikbaar en heeft het een eigen parking, dan kunnen wij vroeg of laat werken zonder dat er iemand aanwezig hoeft te zijn. Dat maakt een vaste planning buiten de kantooruren werkbaar en houdt uw werkdag ongestoord. Bij de eerste beurt lopen we het pand graag samen door; daarna werken we zelfstandig volgens het afgesproken schema.",
    situation: "Een bedrijfspand waar niemand van uw team aanwezig hoeft te zijn",
    focus: "Zelfstandig werken buiten de kantooruren",
    faq: {
      question: "Moet er iemand van ons aanwezig zijn?",
      answer:
        "Niet als de toegang geregeld is. Bij de eerste beurt lopen we het pand graag samen door; daarna werken we zelfstandig volgens het afgesproken schema.",
    },
  },

  /* =====================================================================
   * Horecaschoonmaak
   * ================================================================== */

  "horecaschoonmaak:antwerpen": {
    angle:
      "In een zaak waar de services elkaar snel opvolgen, is het moment van schoonmaken minstens zo belangrijk als het werk zelf. Wij komen vroeg in de ochtend vóór de voorbereiding begint, of na sluiting wanneer de laatste gast weg is. Is de keuken krap, dan bepaalt dat ook het materiaal dat we meebrengen — compact genoeg om te werken zonder de werkruimte te blokkeren.",
    situation:
      "Een zaak met een krappe keuken waar overdag geen moment vrij is",
    focus: "Werken in een krappe keuken buiten de service om",
    faq: {
      question: "Hoe vroeg kunnen jullie komen?",
      answer:
        "Vroeg in de ochtend of meteen na sluiting, afhankelijk van wat uw zaak het best uitkomt. We leggen dat moment vast in het schema, zodat uw ploeg erop kan rekenen.",
    },
  },

  "horecaschoonmaak:berchem": {
    angle:
      "Werkt u met een kleine ploeg, dan komt de schoonmaak er in de praktijk bij na een lange dag — en dan wint de vermoeidheid het van de grondigheid. Juist daar levert een vast schema het meeste op: niet alleen omdat het schoner is, maar omdat uw mensen doen waarvoor u ze aanwierf. De frequentie stemmen we af op uw omvang en uw openingsdagen; dagelijks hoeft niet.",
    situation:
      "Een zaak met een kleine ploeg die de schoonmaak er nu zelf bij doet",
    focus: "Zaal, toog en sanitair volgens een vast ritme",
    faq: {
      question: "Loont een vast schema voor een kleine zaak?",
      answer:
        "Meestal wel. We stemmen de frequentie af op uw omvang en openingsdagen. Het hoeft niet dagelijks te zijn om het verschil te maken.",
    },
  },

  "horecaschoonmaak:deurne": {
    angle:
      "Een zaak met afhaal en levering laat ander vuil achter dan een zittende zaak: meer verpakkingsafval, meer verkeer rond de toog en minder tijd tussen de bestellingen door. Heeft u uitgesproken piekdagen, dan is één vaste frequentie zelden de beste oplossing. Wij zetten de zwaarste beurt daarom na de drukste dagen en houden de rest lichter.",
    situation: "Een afhaal- of eetzaak met pieken in de avond en het weekend",
    focus: "Toog, afvalzone en vloeren na de piekdagen",
    faq: {
      question: "Kunnen jullie na het weekend extra langskomen?",
      answer:
        "Ja. Veel zaken kiezen voor een zwaardere beurt op maandag of dinsdag, na de drukste dagen. Dat kunnen we in het vaste schema opnemen.",
    },
  },

  "horecaschoonmaak:wilrijk": {
    angle:
      "Bij een ruimere zaal verschuift het werk naar vloeren en meubilair: tafels, banken en stoelen vragen samen meer tijd dan de keuken. Is er ruimte om materiaal vlot binnen te brengen, dan is een grondige beurt buiten de uren praktisch in te plannen. Bij vaste banken of specifieke bekleding kijken we vooraf wat verantwoord is.",
    situation:
      "Een ruimere zaal met veel meubilair die buiten de uren gedaan moet worden",
    focus: "Zaalvloeren en meubilair in een ruimere zaak",
    faq: {
      question: "Nemen jullie ook de zaalvloer en het meubilair mee?",
      answer:
        "Ja, dat hoort bij de zaal: vloeren, tafels, banken en stoelen. Bij vaste banken of specifieke bekleding kijken we vooraf wat verantwoord is.",
    },
  },

  "horecaschoonmaak:merksem": {
    angle:
      "Ligt de afvalzone dicht bij de werkruimte, dan is de volgorde van het werk bepalend. Beginnen bij het sanitair of het afval betekent dat u vuil terug naar binnen draagt. Wij werken daarom altijd van schoon naar vuil — eerst de werkvlakken en de keuken, dan pas de afvalzone en het sanitair — met aparte materialen per zone.",
    situation:
      "Een compacte keuken waar de afvalzone vlak bij de werkruimte ligt",
    focus: "Volgorde van schoon naar vuil, met afvalzone op het eind",
    faq: {
      question: "Hoe houden jullie de keuken en de afvalzone gescheiden?",
      answer:
        "Met aparte materialen en een vaste volgorde: eerst de werkvlakken en de keuken, daarna pas de afvalzone en het sanitair. Dat voorkomt dat vuil terug naar binnen gaat.",
    },
  },

  "horecaschoonmaak:borgerhout": {
    angle:
      "Is uw pand smal en de keuken krap, dan bepaalt de toegang hoeveel materiaal we kunnen meebrengen. Wij werken in zo'n geval met compact materiaal dat in één beweging naar binnen gaat, zodat de straat niet lang geblokkeerd staat. Het werk zelf draait dan vooral om de keuken en de toog, waar vetaanslag zich het snelst opbouwt.",
    situation:
      "Een smal pand met een krappe keuken achteraan en korte laadmomenten",
    focus: "Keuken en toog, waar vetaanslag zich het snelst opbouwt",
    faq: {
      question: "Komen jullie met veel materiaal?",
      answer:
        "We stemmen dat af op uw pand. In een smal pand werken we met compact materiaal dat in één beweging naar binnen kan, zodat de straat niet lang geblokkeerd staat.",
    },
  },

  "horecaschoonmaak:hoboken": {
    angle:
      "Is de schoonmaak jarenlang intern gebleven, dan gebeurt de dagelijkse beurt meestal wel, maar raken de grondige delen achterop: achter de toestellen, onder de toog en in de hoeken. Starten met periodiek onderhoud werkt dan zelden — u blijft achter de feiten aanlopen. Wij brengen in zo'n geval eerst alles op niveau en houden het daarna bij.",
    situation:
      "De dagelijkse beurt gebeurt wel, maar de grondige delen zijn achterop geraakt",
    focus: "Achter en onder toestellen, toog en hoeken",
    faq: {
      question: "Beginnen jullie met een grondige beurt?",
      answer:
        "Als de situatie dat vraagt wel. Starten met periodiek onderhoud in een zaak met achterstand werkt zelden; dan brengen we eerst alles op niveau en houden we het daarna bij.",
    },
  },

  "horecaschoonmaak:brasschaat": {
    angle:
      "Ligt de lat voor de uitstraling hoog, dan moet de zaal er bij het openen onberispelijk bij liggen — inclusief het glaswerk aan de toog en, in het seizoen, het terras. Dat lukt niet met een beurt tussen de services door. Wij plannen daarom vóór de opening, zodat uw zaak start zoals ze eruit hoort te zien.",
    situation:
      "Een zaak met terras waar de zaal er bij de opening onberispelijk bij moet liggen",
    focus: "Zaal en terraszone vóór de opening",
    faq: {
      question: "Nemen jullie het terras mee?",
      answer:
        "In het seizoen kan dat: vloer, tafels en stoelen van het terras. We spreken vooraf af of het in het vaste schema zit of enkel in de zomermaanden.",
    },
  },

  /* =====================================================================
   * Professionele dieptereiniging
   * ================================================================== */

  "dieptereiniging:antwerpen": {
    angle:
      "Nicotine op pleisterwerk, vet in de keuken van een overgenomen zaak, stof en schimmel na langdurige leegstand: dat zijn opdrachten die je niet op afstand inschat. De vervuilingsgraad bepaalt de tijd, en de tijd bepaalt de prijs. Daarom komen wij bij een dieptereiniging bij voorkeur eerst kijken, zodat u een concreet aantal dagen krijgt in plaats van een open einde.",
    situation:
      "Een overgenomen pand of handelszaak waar jarenlang achterstand is opgebouwd",
    focus: "Nicotine-, vet- en schimmelaanslag op wanden en plafonds",
    faq: {
      question: "Komen jullie eerst langs voor een dieptereiniging?",
      answer:
        "Bij voorkeur wel. Foto's helpen, maar bij zware vervuiling zien we ter plaatse pas goed wat haalbaar is en wat niet. Dat plaatsbezoek is vrijblijvend.",
    },
  },

  "dieptereiniging:berchem": {
    angle:
      "In een pand dat lang bewoond of verhuurd is geweest, zit het vuil in lagen: achter radiatoren, bovenaan het schrijnwerk, in de voegen van een oudere badkamer en op pleisterwerk dat nooit grondig is aangepakt. Zijn de plafonds hoog, dan vraagt alles boven handbereik een extra opstelling en dus meer tijd. Is er echt hoogtewerk nodig, dan zeggen we dat vooraf.",
    situation:
      "Een pand dat jarenlang bewoond of verhuurd is geweest zonder grondige beurt",
    focus: "Hoge plafonds, schrijnwerk en oude voegen",
    faq: {
      question: "Hoe pakken jullie hoge plafonds aan?",
      answer:
        "Met verlengstukken en een veilige opstelling vanaf de grond. Is er echt hoogtewerk of een hoogwerker nodig, dan zeggen we dat vooraf — dat valt buiten een gewone dieptereiniging.",
    },
  },

  "dieptereiniging:deurne": {
    angle:
      "Leegstand laat een eigen soort vuil achter: stof dat zich overal heeft gezet, muffe lucht en soms vocht- of schimmelplekken in de minst verluchte hoeken. Dat vraagt een andere volgorde dan gewone schoonmaak — eerst ontstoffen en verluchten, pas daarna reinigen. Komt de schimmel door vocht in de constructie, dan zeggen we dat eerlijk: dan komt ze terug.",
    situation: "Een woning of bedrijfsruimte die lang heeft leeggestaan",
    focus: "Ontstoffen en verluchten vóór het eigenlijke reinigen",
    faq: {
      question: "Lossen jullie ook een schimmelprobleem op?",
      answer:
        "Oppervlakkige schimmel kunnen wij reinigen. Komt het door vocht in de constructie, dan komt het terug: dan is het eerst een zaak voor wie de oorzaak aanpakt. Dat zeggen we eerlijk.",
    },
  },

  "dieptereiniging:wilrijk": {
    angle:
      "Bij een grotere oppervlakte moet een dieptereiniging in zones gebeuren, anders droogt het ene deel op terwijl het andere nog onder handen is. Is er toegang tot water en stroom en kan er vlot geparkeerd worden, dan kunnen wij met volledig materiaal werken — en dat maakt bij zware vervuiling het verschil. Na het plaatsbezoek krijgt u een concreet aantal dagen.",
    situation:
      "Een ruimere woning of bedrijfsruimte met achterstallig onderhoud",
    focus: "Zone per zone werken bij grotere oppervlaktes",
    faq: {
      question: "Hoeveel dagen duurt een dieptereiniging?",
      answer:
        "Van één dag tot meerdere, afhankelijk van de oppervlakte en de vervuilingsgraad. Na het plaatsbezoek krijgt u een concreet aantal dagen in het voorstel, geen open einde.",
    },
  },

  "dieptereiniging:merksem": {
    angle:
      "Heeft een pand meerdere functies onder één dak — een zaak beneden, een woonst erboven — dan loopt het vuil van de ene functie in de andere over: vet van de zaak, kookdampen in het trappenhuis, een keuken boven die intensief gebruikt is. Bij een wissel van bewoner of uitbater pakken wij dat aan in één doorlopende opdracht. Van boven naar beneden, zodat niets opnieuw vuil wordt.",
    situation:
      "Een pand met een zaak beneden en een woonst erboven wisselt van uitbater of bewoner",
    focus: "Van boven naar beneden, inclusief het trappenhuis",
    faq: {
      question: "Kunnen jullie het hele pand in één opdracht doen?",
      answer:
        "Ja, en bij een pand met meerdere functies is dat ook de beste volgorde. We werken van boven naar beneden, zodat niets opnieuw vuil wordt.",
    },
  },
};

/** Sleutel voor LOCAL_ANGLES. */
export function angleKey(serviceSlug: string, citySlug: string): string {
  return `${serviceSlug}:${citySlug}`;
}
