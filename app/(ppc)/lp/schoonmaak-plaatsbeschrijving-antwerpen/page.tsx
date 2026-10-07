import type { Metadata } from "next";
import {
  CalendarClock,
  ClipboardCheck,
  Sparkles,
  CookingPot,
  ShowerHead,
  Sofa,
  Info,
} from "lucide-react";
import { ppcPages } from "@/config/ppc-pages";
import { ppcMetadata } from "@/lib/ppc-metadata";
import { PpcHeader } from "@/components/ppc/PpcHeader";
import { PpcHero } from "@/components/ppc/PpcHero";
import { FormSection } from "@/components/ppc/FormSection";
import { PpcFinalCta } from "@/components/ppc/FinalCta";
import { PpcFooter } from "@/components/ppc/PpcFooter";
import { PpcStickyBar } from "@/components/ppc/PpcStickyBar";
import { TrackLandingPage } from "@/components/ppc/TrackLandingPage";
import { Faq } from "@/components/sections/Faq";

const page = ppcPages.plaatsbeschrijving;

export const metadata: Metadata = ppcMetadata(page);
export const dynamic = "force-static";
export const revalidate = false;

/* Wat er schoongemaakt wordt — de vier blokken waar de huurder op beoordeeld wordt. */
const scope = [
  {
    icon: CookingPot,
    title: "Keuken",
    items: [
      "Werkbladen en spoelbak",
      "Kastfronten",
      "De kookzone",
      "Bereikbare oppervlakken",
    ],
  },
  {
    icon: ShowerHead,
    title: "Badkamer en sanitair",
    items: [
      "Toilet en lavabo",
      "Douche of bad",
      "Kranen",
      "Bereikbare oppervlakken",
    ],
  },
  {
    icon: Sofa,
    title: "Woon- en slaapruimtes",
    items: [
      "Vloeren en plinten",
      "Bereikbare oppervlakken",
      "Deuren en deurkaders waar afgesproken",
    ],
  },
  {
    icon: Sparkles,
    title: "Extra deze maand",
    items: ["Ramen", "Oven", "Koelkast"],
    highlight: true,
  },
];

/* De drie stappen, telkens gerekend vanaf de datum van de plaatsbeschrijving. */
const verloop = [
  {
    icon: ClipboardCheck,
    title: "U geeft uw datum door",
    text: "Met enkele foto's weten wij meteen wat er nodig is en hoeveel tijd het vraagt.",
  },
  {
    icon: CalendarClock,
    title: "Wij plannen vlak ervoor",
    text: "De schoonmaak gebeurt zo kort mogelijk vóór de plaatsbeschrijving, zodat de woning er fris bij ligt.",
  },
  {
    icon: Sparkles,
    title: "U geeft de sleutels af",
    text: "Keuken, sanitair, vloeren en de details zijn gedaan. U hoeft zelf niets meer na te lopen.",
  },
];

export default function PlaatsbeschrijvingLandingPage() {
  return (
    <>
      <TrackLandingPage landingPage={page.path} dienst={page.dienst} />
      <PpcHeader whatsappMessage={page.whatsappMessage} />

      <main className="flex-1">
        <PpcHero page={page} />

        {/* Scope — concreet wat er gebeurt, want daar wordt op beoordeeld */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-light">
                Wat wij doen
              </p>
              <h2 className="mt-3 text-2xl leading-tight text-brand sm:text-3xl">
                De ruimtes waar bij een plaatsbeschrijving naar gekeken wordt
              </h2>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {scope.map(({ icon: Icon, title, items, highlight }) => (
                <div
                  key={title}
                  className={`rounded-2xl border p-5 ${
                    highlight
                      ? "border-accent/50 bg-accent-soft"
                      : "border-hairline bg-surface"
                  }`}
                >
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${
                      highlight ? "bg-brand text-accent" : "bg-white text-brand"
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-brand">
                    {title}
                  </h3>
                  <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink-muted">
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Eerlijk over de grenzen van de actie */}
            <div className="mt-8 flex items-start gap-3.5 rounded-2xl border border-hairline bg-surface p-5 sm:p-6">
              <Info
                className="mt-0.5 h-5 w-5 shrink-0 text-brand-light"
                aria-hidden="true"
              />
              <p className="text-sm leading-relaxed text-ink-muted">
                Ramen, oven en koelkast gaan uit van standaard bereikbare
                beglazing, een huishoudelijke oven en een huishoudelijke
                koelkast bij een normale vervuilingsgraad. Hoogtewerk, een
                hoogwerker, specialistische glasbewassing, industriële
                apparatuur en extreme vervuiling zitten er niet automatisch in.
                Wat voor uw woning geldt, bevestigen wij vooraf.
              </p>
            </div>
          </div>
        </section>

        {/* Verloop — de deadline is het hele verhaal */}
        <section className="bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
            <h2 className="max-w-2xl text-2xl leading-tight text-brand sm:text-3xl">
              Alles afgestemd op één datum
            </h2>
            <ol className="mt-9 grid gap-5 sm:grid-cols-3">
              {verloop.map(({ icon: Icon, title, text }, index) => (
                <li
                  key={title}
                  className="rounded-2xl border border-hairline bg-white p-6 shadow-soft"
                >
                  <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-brand">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[0.65rem] font-bold text-white">
                      {index + 1}
                    </span>
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-brand">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <FormSection
          page={page}
          background="white"
          aside={{
            title: "Waarom mensen ons hiervoor bellen",
            points: [
              "Wij plannen rond uw datum, niet omgekeerd.",
              "Keuken en sanitair krijgen de meeste aandacht — daar wordt het strengst naar gekeken.",
              "U krijgt een prijs vooraf, geen verrassingen achteraf.",
              "Ook bij een korte termijn kijken we wat nog haalbaar is.",
            ],
          }}
        />

        <Faq
          items={page.faq}
          eyebrow="Goed om te weten"
          title="Veelgestelde vragen"
          background="surface"
        />

        <PpcFinalCta page={page} />
      </main>

      <PpcFooter />
      <PpcStickyBar
        ctaLabel="Vraag voorstel aan"
        whatsappMessage={page.whatsappMessage}
      />
    </>
  );
}
