import type { Metadata } from "next";
import Link from "next/link";
import { Camera, Check, Minus, ArrowRight } from "lucide-react";
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

const page = ppcPages.kitchenReset;

export const metadata: Metadata = ppcMetadata(page);
export const dynamic = "force-static";
export const revalidate = false;

/* De zones van een reset. Technisch benoemd — dit publiek kent zijn keuken. */
const zones = [
  {
    title: "Kooklijn",
    text: "Fornuis, bakplaat, friteuse en de zones ertussen, inclusief het vet dat zich opbouwt aan de randen.",
  },
  {
    title: "Werkbanken en inox",
    text: "Werkbladen, onderbouw en inox oppervlakken, terug naar een egale, doffe glans.",
  },
  {
    title: "Afwaszone",
    text: "Spoelbakken, de vaatwaszone en de omliggende wanden en vloer.",
  },
  {
    title: "Wanden",
    text: "Tegel- en inox wanden rond de kooklijn, waar aanslag het snelst terugkomt.",
  },
  {
    title: "Vloeren",
    text: "Vloeren en voegen, inclusief de hoeken en randen die bij dagelijks werk overgeslagen worden.",
  },
  {
    title: "Koelzone",
    text: "De buitenzijde en bereikbare delen van koeling en vriezers, plus de ruimte eromheen.",
  },
  {
    title: "Opslag",
    text: "Rekken, droogopslag en de vloer eronder.",
  },
  {
    title: "Onder en achter apparatuur",
    text: "De bereikbare zones achter en onder toestellen, zonder demontage.",
  },
];

/* Eerlijk over de grens tussen schoonmaak en technisch specialistenwerk. */
const welNiet = {
  wel: [
    "Grondige reiniging van de zones die u aanduidt",
    "Bereikbare delen van de afzuigkap en de filters, in overleg",
    "Zones onder en achter apparatuur, voor zover bereikbaar",
    "Werk buiten de openingsuren of op een sluitingsdag",
  ],
  niet: [
    "Technische afzuiginstallaties en kanaalreiniging",
    "Demontage van toestellen",
    "Werk aan gas- of elektrische apparatuur",
    "Attesten of keuringen van voedselveiligheid",
  ],
};

export default function KitchenResetLandingPage() {
  return (
    <>
      <TrackLandingPage landingPage={page.path} dienst={page.dienst} />
      <PpcHeader whatsappMessage={page.whatsappMessage} />

      <main className="flex-1">
        <PpcHero page={page} />

        {/* Zones — donker en technisch: dit is het meest gespecialiseerde product */}
        <section className="bg-brand-dark text-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-accent">
                Zone per zone
              </p>
              <h2 className="mt-3 text-2xl leading-tight text-white sm:text-3xl">
                Waar een reset het verschil maakt
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/75">
                Dagelijkse schoonmaak houdt de zichtbare oppervlakken bij. Een
                reset pakt aan wat zich daarbuiten opbouwt. U bepaalt zelf welke
                zones meegaan.
              </p>
            </div>

            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {zones.map((zone) => (
                <div key={zone.title} className="bg-brand-dark p-5">
                  <h3 className="font-display text-base font-bold text-accent">
                    {zone.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {zone.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Wat wij wel en niet doen */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
            <div className="max-w-2xl">
              <h2 className="text-2xl leading-tight text-brand sm:text-3xl">
                Duidelijk over wat wij wel en niet doen
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                Een reset is schoonmaakwerk op specialistisch niveau — geen
                technisch onderhoud. Dat onderscheid maken wij liever vooraf dan
                achteraf.
              </p>
            </div>

            <div className="mt-9 grid gap-5 lg:grid-cols-2">
              <div className="rounded-2xl border border-hairline bg-surface p-6">
                <h3 className="font-display text-base font-bold text-brand">
                  Dit zit in een Kitchen Reset
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {welNiet.wel.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-ink"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-hairline bg-white p-6">
                <h3 className="font-display text-base font-bold text-brand">
                  Dit is specialistenwerk, niet van ons
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {welNiet.niet.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-muted"
                    >
                      <Minus
                        className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Foto's: hier hangt de hele prijsbepaling aan vast */}
        <section className="bg-surface">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-5 rounded-3xl border border-accent/40 bg-accent-soft p-6 sm:flex-row sm:items-center sm:p-8">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand text-accent">
                <Camera className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-display text-lg font-bold text-brand">
                  Enkele foto&apos;s bepalen het voorstel
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  De vervuilingsgraad bepaalt de tijd, en de tijd bepaalt de
                  prijs. Met foto&apos;s van de kooklijn, de frituur- of
                  ovenzone en de wanden erachter geven wij een scherp voorstel
                  in plaats van een ruwe schatting.
                </p>
              </div>
            </div>
          </div>
        </section>

        <FormSection
          page={page}
          background="surface"
          aside={{
            title: "Waarom zaken hiervoor kiezen",
            points: [
              "Een keuken die er weer uitziet zoals bij de opening.",
              "Werk na sluiting of op een sluitingsdag, zonder serviceverlies.",
              "Zones en prijs vooraf afgesproken, zonder meerwerk achteraf.",
              "Uw ploeg start daarna weer vanaf een schone basis.",
            ],
          }}
        />

        {/* Pas ná het formulier: de stap naar periodiek onderhoud */}
        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 rounded-2xl border border-hairline bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div>
                <h2 className="font-display text-base font-bold text-brand">
                  Wilt u dit niveau daarna behouden?
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  Veel zaken laten na de reset periodiek onderhouden. Dat hoeft
                  niet — de reset staat volledig op zichzelf.
                </p>
              </div>
              <Link
                href="/horecaschoonmaak"
                className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-light"
              >
                Periodieke horecaschoonmaak
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </section>

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
