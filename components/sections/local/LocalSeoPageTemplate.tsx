import Link from "next/link";
import { Check, ArrowRight, MapPin, Euro, ShieldCheck } from "lucide-react";
import { FeatureMark } from "@/components/ui/FeatureList";
import type { LocalPageData } from "@/types";
import { WhatsAppButton } from "@/components/conversion/WhatsAppButton";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Photo } from "@/components/media/Photo";
import {
  BreadcrumbJsonLd,
  FaqJsonLd,
  ServiceJsonLd,
  type Crumb,
} from "@/components/seo/JsonLd";

interface LocalSeoPageTemplateProps {
  page: LocalPageData;
}

/**
 * Herbruikbaar template voor de lokale landingspagina's (/dienst/stad). De
 * opbouw is gedeeld, de inhoud komt volledig uit config/local-pages.ts en is
 * per dienst én per locatie verschillend.
 */
export function LocalSeoPageTemplate({ page }: LocalSeoPageTemplateProps) {
  const quoteHref = `/offerte?dienst=${page.quoteIntent}`;

  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: page.serviceName, path: `/${page.serviceSlug}` },
    { name: page.locationName, path: page.path },
  ];

  return (
    <>
      <ServiceJsonLd
        name={`${page.serviceName} ${page.locationName}`}
        description={page.metaDescription}
        path={page.path}
        areaServed={page.locationName}
      />
      <BreadcrumbJsonLd items={crumbs} />
      <FaqJsonLd items={page.faq} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_82%_-5%,rgba(43,184,198,0.2),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <Breadcrumbs items={crumbs} />

          <p
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-accent"
            data-reveal
          >
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {page.eyebrow}
          </p>

          <h1
            className="mt-5 text-[2rem] leading-[1.12] text-white sm:text-4xl lg:text-[2.9rem]"
            data-reveal
          >
            {page.h1}
          </h1>

          <p
            className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
            data-reveal
          >
            {page.intro}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row" data-reveal>
            <Link
              href={quoteHref}
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
              label="WhatsApp ons"
              message={page.whatsappMessage}
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </section>

      {/* Waar we op letten in deze gemeente */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div
            className={`gap-10 ${page.image ? "lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-start" : ""}`}
          >
            <div data-reveal>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-light">
                Lokaal
              </p>
              <h2 className="mt-3 text-2xl leading-tight text-brand sm:text-3xl">
                Waar we rekening mee houden in {page.locationName}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                {page.localContext}
              </p>
            </div>

            {page.image && (
              <Photo
                image={page.image}
                ratio="aspect-[4/3]"
                sizes="(max-width: 1024px) 100vw, 420px"
                className="mt-8 rounded-3xl border border-hairline shadow-soft lg:mt-0"
              />
            )}
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2" data-reveal>
            {page.localConsiderations.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-hairline bg-surface p-5 text-sm leading-relaxed text-ink"
              >
                <FeatureMark />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Wanneer schakelt u ons in? */}
      <section className="bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2
            className="max-w-2xl text-2xl leading-tight text-brand sm:text-3xl"
            data-reveal
          >
            Wanneer schakelt u ons in?
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2" data-reveal>
            {page.whenToUse.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-hairline bg-white p-5"
              >
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="text-sm leading-relaxed text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Wat doen we precies? */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-20">
          <div data-reveal>
            <h2 className="text-2xl leading-tight text-brand sm:text-3xl">
              Wat doen we precies?
            </h2>
            <ul className="mt-6 space-y-3">
              {page.whatWeDo.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <FeatureMark />
                  <span className="text-sm leading-relaxed text-ink">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-3xl border border-hairline bg-surface p-6 sm:p-7"
            data-reveal
            style={{ ["--reveal-delay" as string]: "100ms" }}
          >
            <h2 className="font-display text-lg font-bold text-brand">
              Voor wie in {page.locationName}?
            </h2>
            <ul className="mt-4 space-y-2.5">
              {page.forWho.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-dark"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Hoe werkt het? */}
      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2
            className="max-w-2xl text-2xl leading-tight text-brand sm:text-3xl"
            data-reveal
          >
            Hoe werkt het?
          </h2>
          <ol
            className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            data-reveal
          >
            {page.processSteps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-2xl border border-hairline bg-white p-6"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand font-display text-sm font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-display text-base font-bold leading-snug text-brand">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Wat bepaalt de prijs? + waarom wij */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-20">
          <div data-reveal>
            <h2 className="text-2xl leading-tight text-brand sm:text-3xl">
              Wat bepaalt de prijs?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Wij zetten bewust geen tarieven op de site. Twee panden van
              dezelfde grootte kunnen een heel verschillende opdracht zijn.
              Deze factoren wegen mee:
            </p>
            <ul className="mt-5 space-y-3">
              {page.priceFactors.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Euro
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-relaxed text-ink">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-3xl border border-hairline bg-surface p-6 sm:p-7"
            data-reveal
            style={{ ["--reveal-delay" as string]: "100ms" }}
          >
            <h2 className="font-display text-lg font-bold text-brand">
              Waarom SchoonmaakKlaar?
            </h2>
            <ul className="mt-5 space-y-3.5">
              {page.whyUs.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted"
                >
                  <ShieldCheck
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Ook actief in de omgeving */}
      <section className="bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-2xl" data-reveal>
            <h2 className="text-2xl leading-tight text-brand sm:text-3xl">
              Ook actief in de omgeving
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">
              {page.isHub
                ? `Naast ${page.locationName} komen wij ook in de districten en omliggende gemeenten, onder meer:`
                : `Naast ${page.locationName} zijn wij ook actief in de omliggende gemeenten:`}
            </p>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2" data-reveal>
            {page.nearbyAreas.map((area) => (
              <li
                key={area}
                className="rounded-full border border-hairline bg-surface px-3 py-1 text-sm text-ink-muted"
              >
                {area}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Gerelateerde diensten */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          {page.sameCityLinks.length > 0 && (
            <div className="mb-12" data-reveal>
              <h2 className="max-w-2xl text-2xl leading-tight text-brand sm:text-3xl">
                Ook in {page.locationName}
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">
                Verwante diensten die wij in dezelfde gemeente verzorgen.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {page.sameCityLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-hairline bg-surface p-5 transition-colors hover:border-accent hover:bg-white"
                  >
                    <span className="text-sm font-semibold text-brand">
                      {link.label}
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-brand-light transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}

          <h2
            className="max-w-2xl text-2xl leading-tight text-brand sm:text-3xl"
            data-reveal
          >
            Gerelateerde diensten
          </h2>
          <div
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            data-reveal
          >
            {page.relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-hairline bg-white p-5 transition-colors hover:border-accent"
              >
                <span className="text-sm font-semibold text-brand">
                  {link.label}
                </span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-brand-light transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Faq
        items={page.faq}
        title={`Veelgestelde vragen over ${page.serviceName.toLowerCase()} in ${page.locationName}`}
        background="white"
      />

      <FinalCta
        title={`${page.serviceName} nodig in ${page.locationName}?`}
        text="Vraag vrijblijvend een offerte aan. Wij bekijken uw situatie en bezorgen u een duidelijk voorstel met een concreet werkschema."
        quoteHref={quoteHref}
        whatsappMessage={page.whatsappMessage}
      />
    </>
  );
}
