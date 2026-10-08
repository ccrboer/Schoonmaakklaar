import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { WhatsAppButton } from "@/components/conversion/WhatsAppButton";
import { Photo } from "@/components/media/Photo";
import { FeatureList } from "@/components/ui/FeatureList";
import { siteImages } from "@/config/site-images";
import { hasWhatsApp } from "@/config/site";

const HERO_WHATSAPP_MESSAGE =
  "Hallo, ik wil graag een offerte voor schoonmaak in Antwerpen. Het gaat om ...";

const trustPoints = [
  "Eenmalig en periodiek",
  "Ook buiten de openingsuren",
  "Snelle offerte",
  "Professionele uitvoering",
];

/**
 * Homepage-hero. Eén duidelijke boodschap, één primaire CTA (offerte) en
 * WhatsApp als vlotte tweede weg. Rechts het merkbeeld: een professionele
 * schoonmaak in een horecazaak vóór de opening.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_85%_-10%,rgba(43,184,198,0.22),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-brand-light/40 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-24">
        <div data-reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            Actief in Antwerpen en omgeving
          </p>

          <h1 className="mt-6 text-[2.15rem] leading-[1.1] text-white sm:text-5xl lg:text-[3.35rem]">
            Professionele schoonmaak voor bedrijven, horeca en vastgoed
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Van periodieke bedrijfsschoonmaak tot horecakeukens, eindschoonmaak
            en professionele opleveringen. Eén aanspreekpunt voor schoonmaak in
            Antwerpen en omgeving.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/offerte"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-semibold text-brand-dark shadow-soft transition-[background-color,transform] hover:bg-white active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand"
            >
              Vraag gratis offerte aan
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            {hasWhatsApp ? (
              <WhatsAppButton
                variant="light"
                label="WhatsApp ons"
                message={HERO_WHATSAPP_MESSAGE}
              />
            ) : (
              // Zonder WhatsApp-nummer blijft er een tweede, rustige route over.
              <Link
                href="/diensten"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-5 py-3.5 font-semibold text-white transition-colors hover:bg-white hover:text-brand"
              >
                Bekijk onze diensten
              </Link>
            )}
          </div>

          <FeatureList
            items={trustPoints}
            tone="dark"
            columns
            className="mt-9 max-w-lg"
          />
        </div>

        {/* Merkbeeld */}
        <div
          className="relative"
          data-reveal
          style={{ ["--reveal-delay" as string]: "120ms" }}
        >
          <Photo
            image={siteImages.horecaRestaurant}
            ratio="aspect-[4/3] lg:aspect-[5/4]"
            sizes="(max-width: 1024px) 100vw, 560px"
            priority
            className="rounded-3xl border border-white/12 shadow-elevated"
          />

          {/* Zwevende chip: maakt meteen duidelijk wanneer wij komen */}
          <div className="absolute -bottom-5 left-4 flex items-center gap-2.5 rounded-2xl border border-hairline bg-white/95 px-4 py-2.5 shadow-soft backdrop-blur-sm sm:left-6">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-accent">
              <MapPin className="h-4 w-4" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-brand">
                Antwerpen en omgeving
              </span>
              <span className="block text-xs text-ink-muted">
                Ook voor de opening en na sluiting
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
