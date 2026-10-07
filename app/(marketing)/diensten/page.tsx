import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { siteConfig } from "@/config/site";
import { services } from "@/config/services";
import { audiences } from "@/config/audiences";
import { servicePages } from "@/config/service-pages";
import { WhatsAppButton } from "@/components/conversion/WhatsAppButton";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { WorkArea } from "@/components/sections/WorkArea";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd, type Crumb } from "@/components/seo/JsonLd";

const DIENSTEN_WHATSAPP_MESSAGE =
  "Hallo, ik heb een vraag over jullie diensten. Het gaat om ...";

export const metadata: Metadata = {
  title: "Onze schoonmaakdiensten in Antwerpen",
  description:
    "Alle diensten van SchoonmaakKlaar: horecaschoonmaak, Kitchen Reset, " +
    "kantoorschoonmaak, opleveringsschoonmaak, eindschoonmaak voor de " +
    "plaatsbeschrijving, traphallen en dieptereiniging in Antwerpen.",
  alternates: { canonical: "/diensten" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/diensten`,
    siteName: siteConfig.name,
    title: `Onze schoonmaakdiensten in Antwerpen | ${siteConfig.name}`,
    description:
      "Professionele schoonmaak voor horeca, bedrijven en vastgoed in Antwerpen en omgeving.",
  },
};

export const dynamic = "force-static";
export const revalidate = false;

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Diensten", path: "/diensten" },
];

export default function DienstenPage() {
  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_82%_-5%,rgba(43,184,198,0.2),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-8 text-[2rem] leading-[1.12] sm:text-4xl lg:text-[2.9rem]">
            Schoonmaakdiensten voor bedrijven, horeca en vastgoed
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Acht diensten, één aanspreekpunt. Van periodiek onderhoud van uw
            zaak of kantoor tot een eenmalige eindschoonmaak of dieptereiniging
            — altijd afgestemd op uw pand en uw werking.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/offerte"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-semibold text-brand-dark shadow-soft transition-[background-color,transform] hover:bg-white active:translate-y-px"
            >
              Vraag gratis offerte aan
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <WhatsAppButton
              variant="light"
              message={DIENSTEN_WHATSAPP_MESSAGE}
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </section>

      {/* Alle diensten, uitgebreid */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
            {services.map((service) => {
              const Icon = service.icon;
              const detail = servicePages.find(
                (page) => page.slug === service.slug,
              );

              return (
                <article
                  key={service.slug}
                  className="flex flex-col rounded-2xl border border-hairline bg-surface p-6 transition-[border-color,box-shadow] hover:border-accent hover:shadow-soft"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white">
                    <Icon className="h-5.5 w-5.5" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 font-display text-lg font-bold leading-snug text-brand">
                    {service.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {service.shortDescription}
                  </p>

                  <ul className="mt-4 flex-1 space-y-2">
                    {(detail?.primaryBenefits ?? service.features)
                      .slice(0, 3)
                      .map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm leading-relaxed text-ink-muted"
                        >
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark"
                            aria-hidden="true"
                          />
                          {feature}
                        </li>
                      ))}
                  </ul>

                  <Link
                    href={service.href}
                    className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
                  >
                    Meer over {service.title.toLowerCase()}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Keuzehulp */}
      <section className="bg-brand text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-2xl" data-reveal>
            <h2 className="text-2xl leading-tight sm:text-3xl">
              Niet zeker welke dienst u nodig heeft?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/80">
              Kies de situatie die het best past bij uw pand of uw zaak. Twijfelt
              u nog? Beschrijf kort uw situatie in de offerteaanvraag, dan
              denken wij met u mee.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
            {audiences.map((audience) => {
              const target = audience.services?.[0];
              const service = services.find((item) => item.slug === target);
              if (!service) return null;

              return (
                <Link
                  key={audience.slug}
                  href={service.href}
                  className="group flex items-center justify-between gap-3 rounded-2xl bg-white/[0.07] p-5 transition-colors hover:bg-white/[0.12]"
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-white">
                      {audience.title}
                    </span>
                    <span className="mt-0.5 block text-xs text-white/65">
                      {service.title}
                    </span>
                  </span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-accent transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <ProcessSteps />
      <WorkArea background="white" />
      <FinalCta />
    </>
  );
}
