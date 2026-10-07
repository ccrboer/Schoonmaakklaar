import Link from "next/link";
import { Check, ArrowRight, Plus, MapPin, Euro, Clock, ShieldCheck } from "lucide-react";
import type { ServicePageData } from "@/types";
import { WhatsAppButton } from "@/components/conversion/WhatsAppButton";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  BreadcrumbJsonLd,
  FaqJsonLd,
  ServiceJsonLd,
  type Crumb,
} from "@/components/seo/JsonLd";
import { getLocalPagesForService } from "@/config/local-pages";
import { Photo } from "@/components/media/Photo";

interface ServicePageTemplateProps {
  service: ServicePageData;
}

/**
 * Herbruikbaar, data-gedreven template voor elke dienstpagina. Eén opbouw voor
 * alle diensten: probleem, aanbod, inbegrepen, werkwijze, prijs, lokale
 * pagina's, cross-sell, FAQ en een afsluitende CTA.
 */
export function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const Icon = service.icon;
  const localPages = getLocalPagesForService(service.slug);
  const quoteHref = `/offerte?dienst=${service.quoteIntent}`;

  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Diensten", path: "/diensten" },
    { name: service.name, path: `/${service.slug}` },
  ];

  return (
    <>
      <ServiceJsonLd
        name={service.name}
        description={service.seoDescription}
        path={`/${service.slug}`}
      />
      <BreadcrumbJsonLd items={crumbs} />
      <FaqJsonLd items={service.faq} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_82%_-5%,rgba(43,184,198,0.2),transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-light/40 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <Breadcrumbs items={crumbs} />

          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
            <div>
              <p
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-accent"
                data-reveal
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {service.eyebrow}
              </p>

              <h1
                className="mt-5 text-[2rem] leading-[1.12] text-white sm:text-4xl lg:text-[2.75rem]"
                data-reveal
              >
                {service.heroTitle}
              </h1>

              <p
                className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
                data-reveal
              >
                {service.heroIntro}
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
                  message={service.whatsappMessage}
                />
              </div>

            </div>

            {/* Beeld + samenvattende kaart naast de hero */}
            <div
              className="overflow-hidden rounded-3xl border border-white/12 bg-white/[0.07] backdrop-blur-sm"
              data-reveal
              style={{ ["--reveal-delay" as string]: "120ms" }}
            >
              {service.heroImage && (
                <Photo
                  image={service.heroImage}
                  ratio="aspect-[16/10]"
                  sizes="(max-width: 1024px) 100vw, 540px"
                  priority
                />
              )}

              <div className="p-6 sm:p-7">
              <p className="font-display text-sm font-bold uppercase tracking-wide text-accent">
                {service.heroCard.title}
              </p>
              <ul className="mt-5 space-y-3">
                {service.heroCard.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-brand-dark">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-sm leading-relaxed text-white/85">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              {service.heroCard.footnote && (
                <p className="mt-5 border-t border-white/10 pt-4 text-sm leading-relaxed text-white/70">
                  {service.heroCard.footnote}
                </p>
              )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wat doen we precies? */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-2xl" data-reveal>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-light">
              Wat we doen
            </p>
            <h2 className="mt-3 text-2xl leading-tight text-brand sm:text-3xl">
              Volledig uit handen genomen
            </h2>
            {service.whatWeDoText && (
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                {service.whatWeDoText}
              </p>
            )}
          </div>

          <ul className="mt-9 grid gap-4 sm:grid-cols-2" data-reveal>
            {service.primaryBenefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-3 rounded-2xl border border-hairline bg-surface p-5"
              >
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="text-sm leading-relaxed text-ink">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Herkenbaar? */}
      {service.commonSituations && service.commonSituations.length > 0 && (
        <section className="bg-surface">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="max-w-2xl" data-reveal>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-light">
                Herkenbaar?
              </p>
              <h2 className="mt-3 text-2xl leading-tight text-brand sm:text-3xl">
                Situaties waarin men ons belt
              </h2>
            </div>
            <ul className="mt-9 grid gap-3 sm:grid-cols-2" data-reveal>
              {service.commonSituations.map((situation) => (
                <li
                  key={situation}
                  className="flex items-start gap-3 rounded-2xl border border-hairline bg-white p-5 text-sm leading-relaxed text-ink shadow-soft"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark"
                    aria-hidden="true"
                  />
                  {situation}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Wat is inbegrepen? */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-2xl" data-reveal>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-light">
              Inbegrepen
            </p>
            <h2 className="mt-3 text-2xl leading-tight text-brand sm:text-3xl">
              Wat is inbegrepen?
            </h2>
          </div>

          <ul
            className="mt-9 grid gap-3 rounded-3xl border border-hairline bg-surface p-6 sm:grid-cols-2 sm:p-8"
            data-reveal
          >
            {service.includedItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-relaxed text-ink"
              >
                <Check
                  className="mt-0.5 h-4.5 w-4.5 shrink-0 text-accent-dark"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>

          {service.optionalItems && service.optionalItems.length > 0 && (
            <div className="mt-6 rounded-3xl border border-dashed border-hairline p-6 sm:p-8" data-reveal>
              <h3 className="font-display text-base font-bold text-brand">
                In overleg mogelijk
              </h3>
              <p className="mt-1.5 text-sm text-ink-muted">
                Niet standaard inbegrepen, wel eenvoudig toe te voegen aan uw
                offerte.
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {service.optionalItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted"
                  >
                    <Plus
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-light"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Voor wie */}
      {service.forWho && service.forWho.length > 0 && (
        <section className="bg-surface">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="max-w-2xl" data-reveal>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-light">
                Voor wie
              </p>
              <h2 className="mt-3 text-2xl leading-tight text-brand sm:text-3xl">
                Wie schakelt ons hiervoor in?
              </h2>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2.5" data-reveal>
              {service.forWho.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-hairline bg-white px-4 py-2 text-sm text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Hoe werkt het? */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-2xl" data-reveal>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-light">
              Werkwijze
            </p>
            <h2 className="mt-3 text-2xl leading-tight text-brand sm:text-3xl">
              Hoe werkt het?
            </h2>
          </div>

          <ol
            className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            data-reveal
          >
            {service.processSteps.map((step, index) => (
              <li
                key={step.title}
                className="relative rounded-2xl border border-hairline bg-surface p-6"
              >
                <span className="absolute right-5 top-4 font-display text-3xl font-extrabold leading-none text-accent/35">
                  {index + 1}
                </span>
                <h3 className="relative font-display text-base font-bold leading-snug text-brand">
                  {step.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-ink-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Prijs */}
      <section className="bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div
            className="relative overflow-hidden rounded-3xl bg-brand text-white shadow-elevated"
            data-reveal
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/20 blur-3xl"
            />
            <div className="relative grid gap-8 p-7 sm:p-9 lg:grid-cols-2 lg:items-center lg:p-12">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-accent">
                  Prijs
                </p>
                <h2 className="mt-3 text-2xl leading-tight sm:text-3xl">
                  Een offerte op maat
                </h2>
                <p className="mt-4 leading-relaxed text-white/80">
                  {service.pricingText ??
                    "Elk pand is anders, dus staan er geen tarieven op de site. Na een korte rondgang of op basis van uw gegevens ontvangt u een offerte op maat, met een duidelijk overzicht van wat inbegrepen is."}
                </p>
                <div className="mt-8">
                  <Link
                    href={quoteHref}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-semibold text-brand-dark transition-[background-color,transform] hover:bg-white active:translate-y-px"
                  >
                    Vraag uw offerte aan
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>

              <ul className="space-y-3 rounded-2xl bg-white/5 p-6">
                {[
                  { icon: Euro, label: "Offerte op maat, vooraf en duidelijk" },
                  {
                    icon: ShieldCheck,
                    label: "Vrijblijvend — u zit nergens aan vast",
                  },
                  {
                    icon: Clock,
                    label: "Eenmalig of periodiek, u kiest",
                  },
                ].map(({ icon: PointIcon, label }) => (
                  <li key={label} className="flex items-start gap-3">
                    <PointIcon
                      className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-white/85">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Lokale pagina's van deze dienst */}
      {localPages.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
            <div className="rounded-3xl border border-hairline bg-surface p-6 sm:p-8" data-reveal>
              <h2 className="font-display text-lg font-bold text-brand">
                {service.name} in uw gemeente
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Bekijk wat wij specifiek doen in uw regio, of vraag gerust na of
                wij bij u komen.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {localPages.map((page) => (
                  <li key={page.path}>
                    <Link
                      href={page.path}
                      className="group inline-flex items-center gap-2 rounded-full border border-hairline bg-white px-4 py-2 text-sm font-semibold text-brand transition-colors hover:border-accent"
                    >
                      <MapPin
                        className="h-4 w-4 text-brand-light"
                        aria-hidden="true"
                      />
                      {page.locationName}
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Cross-sell */}
      {service.crossSell && (
        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
            <div
              className="rounded-3xl border border-hairline bg-surface p-7 shadow-soft sm:p-9"
              data-reveal
            >
              <h2 className="text-xl leading-tight text-brand sm:text-2xl">
                {service.crossSell.title}
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">
                {service.crossSell.text}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {service.crossSell.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-hairline bg-white px-4 py-2 text-sm font-semibold text-brand transition-colors hover:border-accent"
                  >
                    {link.label}
                    <ArrowRight
                      className="h-4 w-4 text-brand-light transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
              <div className="mt-7">
                <Link
                  href={service.crossSell.ctaHref ?? quoteHref}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                >
                  {service.crossSell.ctaLabel ?? "Vraag een offerte aan"}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <Faq items={service.faq} title="Veelgestelde vragen" />

      <FinalCta
        title={`${service.name} nodig in Antwerpen of omgeving?`}
        text="Vraag vrijblijvend een offerte aan. Wij bekijken uw situatie en bezorgen u een duidelijk voorstel met een concreet werkschema."
        quoteHref={quoteHref}
        whatsappMessage={service.whatsappMessage}
      />
    </>
  );
}
