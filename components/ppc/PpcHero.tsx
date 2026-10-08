import { MapPin } from "lucide-react";
import { Photo } from "@/components/media/Photo";
import { WhatsAppButton } from "@/components/conversion/WhatsAppButton";
import { CtaLink } from "@/components/ppc/CtaLink";
import { OfferCard } from "@/components/ppc/OfferCard";
import { FeatureList } from "@/components/ui/FeatureList";
import type { PpcPageConfig } from "@/config/ppc-pages";

interface PpcHeroProps {
  page: PpcPageConfig;
}

/**
 * Hero van een advertentiepagina. Binnen één scherm moet duidelijk zijn welke
 * dienst het is, voor wie, met welk resultaat, in welke regio, met welk
 * aanbod en wat de volgende stap is.
 *
 * Het beeld staat daarom op mobiel ónder de tekst en de knoppen, niet erboven:
 * op een telefoon mag een foto het aanbod en de CTA niet wegduwen.
 */
export function PpcHero({ page }: PpcHeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_55%_at_88%_-5%,rgba(43,184,198,0.24),transparent_70%)]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-14 lg:px-8 lg:py-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-accent">
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {page.eyebrow}
          </p>

          <h1 className="mt-5 text-[1.95rem] leading-[1.12] text-white sm:text-[2.6rem] lg:text-[3rem]">
            {page.h1}
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            {page.sub}
          </p>

          <FeatureList
            items={page.heroPoints}
            tone="dark"
            columns
            className="mt-6 max-w-lg"
          />

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CtaLink label={page.primaryCta} plaats="hero" tone="accent" />
            {page.secondaryCta?.kind === "intake" && (
              <CtaLink
                label={page.secondaryCta.label}
                plaats="hero"
                kind="intake"
                tone="outline-light"
              />
            )}
            {page.secondaryCta?.kind === "whatsapp" && (
              <WhatsAppButton
                variant="light"
                label={page.secondaryCta.label}
                message={page.whatsappMessage}
              />
            )}
          </div>

          {page.offer && (
            <OfferCard offer={page.offer} tone="light" className="mt-8 max-w-xl" />
          )}
        </div>

        <div className="relative">
          <Photo
            image={page.image}
            ratio="aspect-[16/10] lg:aspect-[4/3]"
            sizes="(max-width: 1024px) 100vw, 520px"
            priority
            className="rounded-3xl border border-white/12 shadow-elevated"
          />
        </div>
      </div>
    </section>
  );
}
