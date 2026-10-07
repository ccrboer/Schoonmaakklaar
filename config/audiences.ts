import {
  UtensilsCrossed,
  Building2,
  HardHat,
  House,
  KeyRound,
  Users,
} from "lucide-react";
import type { Audience, Slug } from "@/types";

/**
 * De klantsegmenten van SchoonmaakKlaar, in de volgorde waarin ze op de
 * homepage verschijnen. Bewust B2B-gericht: geen huishoudelijke poetsdienst
 * en geen dienstencheques.
 */
export const audiences: Audience[] = [
  {
    slug: "horeca",
    title: "Horeca en hotels",
    painPoint:
      "Uw zaak moet er elke dag onberispelijk uitzien, maar schoonmaken kan pas als de deuren dicht zijn.",
    valueProposition:
      "Wij komen voor de opening of na sluiting, zodat uw zaak en keuken klaarstaan zonder verlies van omzeturen.",
    icon: UtensilsCrossed,
    services: ["horecaschoonmaak", "horecakeuken-dieptereiniging"],
  },
  {
    slug: "bedrijven",
    title: "Bedrijven en kantoren",
    painPoint:
      "Onderhoud regelen met wisselende poetshulp kost tijd en levert een wisselend resultaat op.",
    valueProposition:
      "Een vast schema, een vaste ploeg en duidelijke afspraken over wat wanneer gebeurt.",
    icon: Building2,
    services: ["kantoorschoonmaak", "dieptereiniging"],
  },
  {
    slug: "aannemers",
    title: "Aannemers en ontwikkelaars",
    painPoint:
      "Na de werken ligt er bouwstof, verfresten en werfvuil, net op het moment dat de oplevering gepland staat.",
    valueProposition:
      "Wij nemen de opleveringsschoonmaak over zodat uw ploeg verder kan en het pand op datum klaar is.",
    icon: HardHat,
    services: ["opleveringsschoonmaak", "dieptereiniging"],
  },
  {
    slug: "huurders",
    title: "Huurders",
    painPoint:
      "De plaatsbeschrijving nadert en de woning moet er netjes bij staan, terwijl u volop aan het verhuizen bent.",
    valueProposition:
      "Wij verzorgen de eindschoonmaak op maat van uw datum van plaatsbeschrijving en sleuteloverdracht.",
    icon: House,
    services: ["schoonmaak-voor-plaatsbeschrijving"],
  },
  {
    slug: "verhuurders",
    title: "Verhuurders en eigenaars",
    painPoint:
      "Tussen twee huurders telt elke dag leegstand, en het pand moet meteen toonbaar zijn.",
    valueProposition:
      "Snelle eindschoonmaak zodat het pand klaar is voor foto's, bezoek en de volgende huurder.",
    icon: KeyRound,
    services: [
      "verhuur-verkoopklaar-schoonmaak",
      "opleveringsschoonmaak",
      "dieptereiniging",
    ],
  },
  {
    slug: "vastgoedbeheer",
    title: "Makelaars, VME's en syndici",
    painPoint:
      "U beheert meerdere panden en wilt één aanspreekpunt met een vaste, controleerbare werkwijze.",
    valueProposition:
      "Periodiek onderhoud van gemeenschappelijke delen en schoonmaak per pand, via één contactpersoon.",
    icon: Users,
    services: ["traphal-schoonmaak", "verhuur-verkoopklaar-schoonmaak"],
  },
];

/** Eén doelgroep opzoeken op slug. */
export function getAudience(slug: Slug): Audience | undefined {
  return audiences.find((audience) => audience.slug === slug);
}
