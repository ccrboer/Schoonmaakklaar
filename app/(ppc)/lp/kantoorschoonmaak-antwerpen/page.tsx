import type { Metadata } from "next";
import {
  Monitor,
  Users,
  ShowerHead,
  CupSoda,
  DoorOpen,
  Building2,
  Sunrise,
  Clock,
  MoonStar,
  CalendarRange,
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

const page = ppcPages.kantoorPeriodiek;

export const metadata: Metadata = ppcMetadata(page);
export const dynamic = "force-static";
export const revalidate = false;

const ruimtes = [
  {
    icon: Monitor,
    title: "Werkplekken",
    text: "Bureaus, bureaustoelen en de bereikbare oppervlakken.",
  },
  {
    icon: Users,
    title: "Vergaderruimtes",
    text: "Tafels, stoelen en glaswanden, klaar voor de volgende afspraak.",
  },
  {
    icon: ShowerHead,
    title: "Sanitair",
    text: "Toiletten, lavabo's en het aanvullen van verbruiksmateriaal.",
  },
  {
    icon: CupSoda,
    title: "Keuken of kitchenette",
    text: "Werkbladen, spoelbak, koelkast aan de buitenzijde en de kookzone.",
  },
  {
    icon: DoorOpen,
    title: "Onthaal en gangen",
    text: "De eerste indruk: inkom, balie, gangen en vloeren.",
  },
  {
    icon: Building2,
    title: "Gemeenschappelijke delen",
    text: "Traphallen en gedeelde ruimtes van het gebouw, mee op te nemen.",
  },
];

const momenten = [
  { icon: Sunrise, label: "Voor kantooruren" },
  { icon: Clock, label: "Tijdens kantooruren" },
  { icon: MoonStar, label: "Na kantooruren" },
  { icon: CalendarRange, label: "Flexibel" },
];

export default function KantoorPeriodiekLandingPage() {
  return (
    <>
      <TrackLandingPage landingPage={page.path} dienst={page.dienst} />
      <PpcHeader whatsappMessage={page.whatsappMessage} />

      <main className="flex-1">
        <PpcHero page={page} />

        {/* Deep Clean, daarna onderhoud */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-light">
                Hoe wij starten
              </p>
              <h2 className="mt-3 text-2xl leading-tight text-brand sm:text-3xl">
                Eerst grondig op niveau, daarna consequent schoon
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                Een kantoor dat al een tijd blijft liggen, krijgt u met gewoon
                onderhoud niet meer bij. Daarom starten we met een Deep Clean en
                pas daarna met de vaste planning.
              </p>
            </div>

            <div className="mt-10 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]">
              <div className="rounded-3xl border-2 border-accent bg-accent-soft p-6 sm:p-8">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-brand-light">
                  Stap 1 · eenmalig
                </p>
                <h3 className="mt-2.5 font-display text-xl font-bold text-brand">
                  De eerste Deep Clean
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Werkplekken en bureaus, sanitair, de keuken of kitchenette,
                  gemeenschappelijke ruimtes, vloeren en de bereikbare
                  oppervlakken — in één grondige beurt.
                </p>
                <p className="mt-4 rounded-xl bg-white/70 px-4 py-3 text-sm font-semibold text-brand">
                  Inbegrepen bij geselecteerde nieuwe periodieke
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
                  Stap 2 · volgens planning
                </p>
                <h3 className="mt-2.5 font-display text-xl font-bold text-brand">
                  Het vaste onderhoud
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Vaste momenten, een vast werkschema en één aanspreekpunt.
                  Niemand intern hoeft nog schoonmaak in te plannen, op te
                  volgen of te controleren.
                </p>
                <p className="mt-4 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-brand">
                  Van dagelijks tot wekelijks, afgestemd op uw bezetting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Welke ruimtes */}
        <section className="bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-light">
                Wat wij onderhouden
              </p>
              <h2 className="mt-3 text-2xl leading-tight text-brand sm:text-3xl">
                Een werkplek waar u bezoek kunt ontvangen
              </h2>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ruimtes.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-hairline bg-white p-5 shadow-soft"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-brand">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-brand">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-hairline bg-white p-5 sm:p-6">
              <p className="text-sm font-semibold text-brand">
                En op het moment dat u het best uitkomt:
              </p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {momenten.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-4 py-2 text-sm text-ink"
                  >
                    <Icon
                      className="h-4 w-4 text-brand-light"
                      aria-hidden="true"
                    />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <FormSection
          page={page}
          background="white"
          aside={{
            title: "Wat u van ons mag verwachten",
            points: [
              "Een vaste ploeg die uw gebouw kent en discreet werkt.",
              "Schoonmaak buiten de kantooruren, zodat niemand gestoord wordt.",
              "Een werkschema dat vooraf vastligt, per ruimte en per frequentie.",
              "Eén aanspreekpunt en één factuur voor het hele gebouw.",
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
