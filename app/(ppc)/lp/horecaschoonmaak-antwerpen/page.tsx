import type { Metadata } from "next";
import {
  Sunrise,
  MoonStar,
  Sun,
  CalendarRange,
  ChefHat,
  UtensilsCrossed,
  ShowerHead,
  Wine,
  Package,
  ArrowRight,
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

const page = ppcPages.horecaPeriodiek;

export const metadata: Metadata = ppcMetadata(page);
export const dynamic = "force-static";
export const revalidate = false;

/* De momenten waarop wij komen — het bezwaar van elke zaakvoerder. */
const momenten = [
  {
    icon: Sunrise,
    title: "Voor de opening",
    text: "De zaal staat klaar en de keuken is fris wanneer uw ploeg binnenkomt.",
  },
  {
    icon: MoonStar,
    title: "Na sluiting",
    text: "Wij werken wanneer de laatste gast weg is, zonder dat iemand hoeft te wachten.",
  },
  {
    icon: Sun,
    title: "Overdag",
    text: "Tussen de services door, bijvoorbeeld voor sanitair en gemeenschappelijke delen.",
  },
  {
    icon: CalendarRange,
    title: "Flexibel",
    text: "Sluitingsdagen, wisselende uren of seizoenswerking: de planning volgt uw zaak.",
  },
];

const ruimtes = [
  { icon: ChefHat, label: "Keuken" },
  { icon: UtensilsCrossed, label: "Zaal" },
  { icon: ShowerHead, label: "Sanitair" },
  { icon: Wine, label: "Bar" },
  { icon: Package, label: "Opslag" },
];

export default function HorecaPeriodiekLandingPage() {
  return (
    <>
      <TrackLandingPage landingPage={page.path} dienst={page.dienst} />
      <PpcHeader whatsappMessage={page.whatsappMessage} />

      <main className="flex-1">
        <PpcHero page={page} />

        {/* Eerst resetten, dan onderhouden — de kern van dit aanbod */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-light">
                Hoe wij starten
              </p>
              <h2 className="mt-3 text-2xl leading-tight text-brand sm:text-3xl">
                Eerst op niveau, daarna structureel schoon
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                Start regulier onderhoud in een keuken die al achterstallig
                vervuild is, dan loopt u vanaf dag één achter de feiten aan. Wij
                draaien die volgorde om.
              </p>
            </div>

            <div className="mt-10 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]">
              <div className="rounded-3xl border-2 border-accent bg-accent-soft p-6 sm:p-8">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-brand-light">
                  Stap 1 · eenmalig
                </p>
                <h3 className="mt-2.5 font-display text-xl font-bold text-brand">
                  De Kitchen Reset
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Een grondige dieptereiniging van de keuken: kooklijn,
                  werkbanken en inox, afwaszone, vloeren en wanden, opslag en
                  koelzone, en de bereikbare zones onder en achter de
                  apparatuur.
                </p>
                <p className="mt-4 rounded-xl bg-white/70 px-4 py-3 text-sm font-semibold text-brand">
                  Gratis bij uw opstart, bij geselecteerde nieuwe periodieke
                  overeenkomsten.
                </p>
              </div>

              <div
                className="flex items-center justify-center lg:px-2"
                aria-hidden="true"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand text-accent">
                  <ArrowRight className="h-5 w-5 rotate-90 lg:rotate-0" />
                </span>
              </div>

              <div className="rounded-3xl border border-hairline bg-surface p-6 sm:p-8">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-brand-light">
                  Stap 2 · elke week opnieuw
                </p>
                <h3 className="mt-2.5 font-display text-xl font-bold text-brand">
                  Het vaste onderhoud
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Een vaste ploeg, vaste momenten en een vast werkschema. U
                  belt niet meer rond, u plant niet meer in en u controleert
                  niet meer achteraf — de zaak blijft gewoon op niveau.
                </p>
                <p className="mt-4 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-brand">
                  Van dagelijks tot wekelijks, afgestemd op uw werking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Momenten — het grootste praktische bezwaar wegnemen */}
        <section className="bg-brand text-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-accent">
                Wanneer wij komen
              </p>
              <h2 className="mt-3 text-2xl leading-tight text-white sm:text-3xl">
                Uw zaak hoeft er geen uur voor dicht
              </h2>
            </div>
            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {momenten.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/12 bg-white/5 p-5"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-brand-dark">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-9 rounded-2xl border border-white/12 bg-white/5 p-5 sm:p-6">
              <p className="text-sm font-semibold text-white">
                En welke ruimtes mee onderhouden worden, kiest u zelf:
              </p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {ruimtes.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85"
                  >
                    <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <FormSection
          page={page}
          background="surface"
          aside={{
            title: "Wat u van ons mag verwachten",
            points: [
              "Een vaste ploeg die uw zaak kent, geen wisselend gezicht.",
              "Schoonmaak vóór opening of na sluiting, zodat de service nooit stilvalt.",
              "Een werkschema dat vooraf vastligt en waar u ons op mag afrekenen.",
              "Eén aanspreekpunt voor keuken, zaal, sanitair, bar en opslag.",
            ],
          }}
        />

        <Faq
          items={page.faq}
          eyebrow="Goed om te weten"
          title="Veelgestelde vragen"
          background="white"
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
