import {
  UtensilsCrossed,
  ChefHat,
  ClipboardCheck,
  HardHat,
  Building2,
} from "lucide-react";
import type { ServiceSpotlightProps } from "@/components/sections/ServiceSpotlight";
import { siteImages } from "./site-images";

/**
 * De uitgelichte diensten op de homepage, in de volgorde waarin ze getoond
 * worden. Eén component (ServiceSpotlight) rendert ze allemaal; de afwisseling
 * in achtergrond en uitlijning zit in deze data.
 */
export const homepageSpotlights: ServiceSpotlightProps[] = [
  {
    icon: UtensilsCrossed,
    eyebrow: "Horeca",
    title: "Uw zaak klaar voor de service, zonder omzeturen te verliezen",
    text: "Restaurants, cafés, bars en hotels vragen een schoonmaak die zich schikt naar de uren van de zaak. Wij komen voor de opening of na sluiting en nemen zaal, toog, keuken en sanitair voor onze rekening — eenmalig of op vaste dagen.",
    bullets: [
      "Zaal, toog, keuken en sanitair in één opdracht",
      "Dagelijks, wekelijks of enkele keren per week",
      "Ook voor hotels, bakkerijen, frituren en catering",
      "Een vaste ploeg die uw zaak en uw afspraken kent",
    ],
    href: "/horecaschoonmaak",
    ctaLabel: "Bekijk horecaschoonmaak",
    secondaryHref: "/offerte?dienst=horeca",
    secondaryLabel: "Offerte aanvragen",
    image: siteImages.horecaBar,
    visualKey: "horeca-uren",
    panelTitle: "Wat wij voor uw zaak doen",
    panelNote:
      "Van restaurants en cafés tot hotels, bakkerijen en catering — telkens buiten uw openingsuren.",
    background: "white",
  },
  {
    icon: ChefHat,
    eyebrow: "Horecakeuken dieptereiniging",
    title: "Kitchen Reset: uw professionele keuken periodiek terug op nul",
    text: "Dagelijks poetsen houdt vet achter de toestellen, tegen de wanden en op de rekken niet tegen. Met een Kitchen Reset pakken we die zones grondig aan, ingepland 's nachts of op uw sluitingsdag.",
    bullets: [
      "Ontvetten van inox, werkbanken, wanden en rekken",
      "Vloeren tot in de hoeken en onder de werkbanken",
      "Zones achter en onder de toestellen, waar veilig bereikbaar",
      "Afwaszone, spoelbakken en afvalzone",
    ],
    href: "/horecakeuken-dieptereiniging",
    ctaLabel: "Bekijk Kitchen Reset",
    secondaryHref: "/offerte?dienst=horecakeuken",
    secondaryLabel: "Offerte aanvragen",
    badge: "Kitchen Reset",
    image: siteImages.keukenInox,
    visualKey: "keuken-zones",
    panelTitle: "Zone per zone aangepakt",
    panelNote:
      "Ingepland 's nachts, op uw sluitingsdag of tijdens een sluitingsperiode — uw keuken ligt niet stil tijdens de uren die tellen.",
    reverse: true,
    background: "brand",
  },
  {
    icon: ClipboardCheck,
    eyebrow: "Plaatsbeschrijving",
    title: "Eindschoonmaak vóór de plaatsbeschrijving en sleuteloverdracht",
    text: "Verlaat u binnenkort uw huurwoning? Wij zorgen voor een professionele eindschoonmaak zodat de woning netjes klaarstaat voor de plaatsbeschrijving en de sleuteloverdracht. U geeft de datum door, wij plannen daarop.",
    bullets: [
      "Keuken, badkamer, sanitair en vloeren",
      "Plinten, deuren, schakelaars en radiatoren",
      "Oven, koelkast en ramen in overleg",
      "Ingepland vóór uw datum van plaatsbeschrijving",
    ],
    href: "/schoonmaak-voor-plaatsbeschrijving",
    ctaLabel: "Bekijk eindschoonmaak",
    secondaryHref: "/offerte?dienst=plaatsbeschrijving",
    secondaryLabel: "Offerte aanvragen",
    image: siteImages.woningEindschoonmaak,
    visualKey: "plaatsbeschrijving-data",
    panelTitle: "Wat wij afwerken",
    panelNote:
      "Geef uw datum van plaatsbeschrijving door bij de aanvraag, dan plannen wij ruim op tijd.",
    background: "white",
  },
  {
    icon: HardHat,
    eyebrow: "Na de werken",
    title: "Opleveringsschoonmaak na nieuwbouw, renovatie of schilderwerk",
    text: "Bouwstof komt in golven terug en de oplevering staat al gepland. Wij werken van boven naar beneden, verwijderen verfresten, siliconen en stickers, en maken het pand klaar voor overdracht.",
    bullets: [
      "Bouwstof van plafonds tot plinten",
      "Ramen langs de binnenzijde, met kaders en dorpels",
      "Stickers, etiketten en beschermfolie",
      "Keuken, sanitair en vloeren afgewerkt",
    ],
    href: "/opleveringsschoonmaak",
    ctaLabel: "Bekijk opleveringsschoonmaak",
    secondaryHref: "/offerte?dienst=oplevering",
    secondaryLabel: "Offerte aanvragen",
    // Bewust nog geen foto: er is nog geen passend bouw-/opleveringsbeeld.
    visualKey: "oplevering-fases",
    panelTitle: "Wat er na de werken weg moet",
    panelNote:
      "Voor aannemers, ontwikkelaars, verhuurders en particulieren — ingepland op uw opleverdatum.",
    reverse: true,
    background: "surface",
  },
  {
    icon: Building2,
    eyebrow: "Kantoren en bedrijven",
    title: "Periodiek onderhoud met een vast schema en een vaste ploeg",
    text: "Kantoren, praktijken, winkels en showrooms hebben geen behoefte aan wisselende poetshulp, maar aan een voorspelbaar resultaat. Wij komen op vaste dagen, volgens een schema dat we samen vastleggen.",
    bullets: [
      "Bureaus, vergaderzalen en ontvangstruimte",
      "Sanitair en keukenhoek, inclusief verbruik aanvullen",
      "Vóór de opening, na sluitingstijd of overdag",
      "Contract op maat, ook voor meerdere vestigingen",
    ],
    href: "/kantoorschoonmaak",
    ctaLabel: "Bekijk kantoorschoonmaak",
    secondaryHref: "/offerte?dienst=kantoor",
    secondaryLabel: "Offerte aanvragen",
    image: siteImages.entreehal,
    panelTitle: "Wat in het schema staat",
    panelNote:
      "Voor kantoren, praktijken, winkels en showrooms — met één aanspreekpunt voor de opvolging.",
    background: "white",
  },
];
