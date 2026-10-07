import type { ImageRef } from "@/types";

/**
 * Centrale verwijzingen naar de fotografie in /public/images.
 * Eén bron van waarheid voor pad, afmetingen, alt-tekst en bijsnijding.
 *
 * `objectPosition` staat alleen waar het echt nodig is: bij een beeld waarvan
 * het onderwerp niet in het midden zit en bij een smalle crop (mobiel of een
 * brede hero) anders wegvalt.
 *
 * De originelen staan in /assets-bron en worden niet mee gedeployed.
 */
export const siteImages = {
  /* --- Horeca --- */
  horecaRestaurant: {
    src: "/images/horeca-restaurant-schoonmaak.webp",
    width: 1248,
    height: 832,
    alt: "Schoonmaker stofzuigt de zaal van een restaurant voor de opening",
    // Persoon staat rechts van het midden; bij een smalle crop blijft ze zo in beeld.
    objectPosition: "60% 50%",
  },
  horecaBar: {
    src: "/images/horeca-bar-dweilen.webp",
    width: 1248,
    height: 832,
    alt: "Medewerker dweilt de vloer van een bar na sluitingstijd",
    objectPosition: "55% 55%",
  },
  horecaSerre: {
    src: "/images/horeca-serre-stofzuigen.webp",
    width: 1248,
    height: 832,
    alt: "Schoonmaak van de lichte serre van een horecazaak",
    objectPosition: "50% 55%",
  },
  horecaOverleg: {
    src: "/images/horeca-overleg-zaakvoerder.webp",
    width: 1200,
    height: 800,
    alt: "Schoonmaakteam maakt afspraken met de zaakvoerder aan de toog",
    objectPosition: "50% 40%",
  },

  /* --- Professionele keuken --- */
  keukenInox: {
    src: "/images/keuken-inox-reiniging.webp",
    width: 1000,
    height: 631,
    alt: "Inox werkblad van een professionele keuken wordt grondig gereinigd",
    objectPosition: "60% 50%",
  },

  /* --- Bedrijven en gemeenschappelijke delen --- */
  entreehal: {
    src: "/images/entreehal-vloerreiniging.webp",
    width: 1000,
    height: 515,
    alt: "Medewerker reinigt de vloer van een entreehal met een schrobmachine",
    objectPosition: "60% 50%",
  },
  werkwagen: {
    src: "/images/schoonmaker-werkwagen.webp",
    width: 880,
    height: 1323,
    alt: "Schoonmaker met werkwagen in de gang van een kantoorgebouw",
    objectPosition: "60% 40%",
  },
  vloeronderhoud: {
    src: "/images/vloeronderhoud-wachtruimte.webp",
    width: 1024,
    height: 536,
    alt: "Vloeronderhoud in een wachtruimte, met waarschuwingsbord voor een natte vloer",
    objectPosition: "45% 50%",
  },

  /* --- Woningen --- */
  woningEindschoonmaak: {
    src: "/images/woning-eindschoonmaak.webp",
    width: 900,
    height: 500,
    alt: "Twee schoonmakers verzorgen de eindschoonmaak van een lege woning",
    objectPosition: "50% 45%",
  },
} satisfies Record<string, ImageRef>;

export type SiteImageKey = keyof typeof siteImages;
