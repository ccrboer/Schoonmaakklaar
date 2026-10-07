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
import type { Service, Slug } from "@/types";

/**
 * De volledige dienstenlijst van SchoonmaakKlaar, in de volgorde waarin ze
 * in navigatie en overzichten verschijnt. De uitgebreide paginacontent staat
 * in config/service-pages.ts.
 */
export const services: Service[] = [
  {
    slug: "horecaschoonmaak",
    title: "Horecaschoonmaak",
    shortDescription:
      "Zaal, keuken en sanitair professioneel onderhouden — ook buiten de openingsuren.",
    icon: UtensilsCrossed,
    href: "/horecaschoonmaak",
    features: [
      "Voor opening of na sluiting",
      "Dagelijks tot maandelijks",
      "Zaal, keuken en sanitair",
    ],
    audiences: ["horeca", "hotels"],
    featured: true,
  },
  {
    slug: "horecakeuken-dieptereiniging",
    title: "Horecakeuken dieptereiniging",
    shortDescription:
      "Kitchen Reset: periodieke grondige reiniging van uw professionele keuken.",
    icon: ChefHat,
    href: "/horecakeuken-dieptereiniging",
    features: [
      "Vet, inox en vloeren",
      "Achter en onder toestellen",
      "Op vaste periodes in te plannen",
    ],
    audiences: ["horeca", "hotels"],
    featured: true,
  },
  {
    slug: "kantoorschoonmaak",
    title: "Kantoorschoonmaak",
    shortDescription:
      "Periodiek onderhoud van kantoren, praktijken en winkelruimtes.",
    icon: Building2,
    href: "/kantoorschoonmaak",
    features: [
      "Vaste dagen en vaste ploeg",
      "Sanitair en keukenhoek",
      "Contract op maat",
    ],
    audiences: ["bedrijven", "kantoren"],
    featured: true,
  },
  {
    slug: "opleveringsschoonmaak",
    title: "Opleveringsschoonmaak",
    shortDescription:
      "Bouwstof en werfvuil weg na nieuwbouw, renovatie of schilderwerken.",
    icon: HardHat,
    href: "/opleveringsschoonmaak",
    features: [
      "Na ruwbouw, afwerking of schilderwerk",
      "Stof, verfresten en stickers",
      "Klaar voor de oplevering",
    ],
    audiences: ["aannemers", "verhuurders"],
    featured: true,
  },
  {
    slug: "schoonmaak-voor-plaatsbeschrijving",
    title: "Schoonmaak voor plaatsbeschrijving",
    shortDescription:
      "Eindschoonmaak van uw huurwoning vóór de plaatsbeschrijving en sleuteloverdracht.",
    icon: ClipboardCheck,
    href: "/schoonmaak-voor-plaatsbeschrijving",
    features: [
      "Keuken, badkamer en sanitair",
      "Vloeren, plinten en deuren",
      "Afgestemd op uw datum",
    ],
    audiences: ["huurders", "verhuurders"],
    featured: true,
  },
  {
    slug: "verhuur-verkoopklaar-schoonmaak",
    title: "Verhuur- en verkoopklaar schoonmaak",
    shortDescription:
      "Uw pand netjes en presentabel voor fotoreportage, bezoek of nieuwe huurder.",
    icon: KeyRound,
    href: "/verhuur-verkoopklaar-schoonmaak",
    features: [
      "Tussen twee huurders",
      "Vóór foto's en bezichtigingen",
      "Voor makelaars en beheerders",
    ],
    audiences: ["verhuurders", "makelaars", "vastgoedbeheer"],
  },
  {
    slug: "traphal-schoonmaak",
    title: "Traphallen en gemeenschappelijke delen",
    shortDescription:
      "Periodiek onderhoud van traphallen, inkomhallen en gangen in appartementsgebouwen.",
    icon: Building,
    href: "/traphal-schoonmaak",
    features: [
      "Vaste frequentie per gebouw",
      "Inkom, trappen, lift en gangen",
      "Voor VME en syndicus",
    ],
    audiences: ["vastgoedbeheer", "verhuurders"],
  },
  {
    slug: "dieptereiniging",
    title: "Professionele dieptereiniging",
    shortDescription:
      "Grondige reiniging van sterk vervuilde of lang leegstaande ruimtes.",
    icon: SprayCan,
    href: "/dieptereiniging",
    features: [
      "Zwaar vervuilde panden",
      "Leegstand en vochtplekken",
      "Bedrijfs- en handelsruimtes",
    ],
    audiences: ["verhuurders", "bedrijven", "vastgoedbeheer"],
  },
];

/** Eén dienst opzoeken op slug. */
export function getService(slug: Slug): Service | undefined {
  return services.find((service) => service.slug === slug);
}

/** Diensten die uitgelicht worden op de homepage. */
export const featuredServices: Service[] = services.filter(
  (service) => service.featured,
);
