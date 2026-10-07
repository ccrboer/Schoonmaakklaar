import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  ClipboardList,
  PhoneCall,
  FileText,
  CalendarCheck,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { services } from "@/config/services";
import { WhatsAppButton } from "@/components/conversion/WhatsAppButton";
import { CallButton } from "@/components/conversion/CallButton";
import { QuoteForm } from "@/components/offerte/QuoteForm";
import { Faq } from "@/components/sections/Faq";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd, type Crumb } from "@/components/seo/JsonLd";

const OFFERTE_WHATSAPP_MESSAGE =
  "Hallo, ik wil graag een offerte voor schoonmaak. Het gaat om ...";

export const metadata: Metadata = {
  title: "Offerte aanvragen",
  description:
    "Vraag vrijblijvend een offerte aan voor horecaschoonmaak, " +
    "kantoorschoonmaak, opleveringsschoonmaak, eindschoonmaak voor de " +
    "plaatsbeschrijving of dieptereiniging in Antwerpen en omgeving.",
  alternates: { canonical: "/offerte" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/offerte`,
    siteName: siteConfig.name,
    title: `Offerte aanvragen | ${siteConfig.name}`,
    description:
      "Vertel kort wat er schoongemaakt moet worden en ontvang een offerte op maat.",
  },
};

export const dynamic = "force-static";
export const revalidate = false;

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Offerte aanvragen", path: "/offerte" },
];

const afterSteps = [
  { icon: ClipboardList, text: "Wij bekijken uw aanvraag en uw foto's." },
  {
    icon: PhoneCall,
    text: "Indien nodig bellen we kort voor extra informatie of een plaatsbezoek.",
  },
  { icon: FileText, text: "U ontvangt een offerte met een concreet werkschema." },
  { icon: CalendarCheck, text: "Na uw akkoord plannen we de startdatum in." },
];

const trustPoints = [
  "Eenmalig of periodiek",
  "Ook buiten de openingsuren",
  "Duidelijke afspraken vooraf",
  "Actief in Antwerpen en omgeving",
];

const faqs = [
  {
    question: "Is een offerte aanvragen vrijblijvend?",
    answer:
      "Ja. U ontvangt een prijs op maat zonder enige verplichting. Pas wanneer u akkoord gaat, plannen we de opdracht in.",
  },
  {
    question: "Hoe snel krijg ik antwoord?",
    answer:
      "Wij nemen zo snel mogelijk contact met u op, meestal binnen één werkdag. Bij een dringende datum, zoals een plaatsbeschrijving of oplevering, vermeldt u die het best meteen in uw aanvraag.",
  },
  {
    question: "Komen jullie eerst langs?",
    answer:
      "Voor periodiek onderhoud, horeca en dieptereiniging doen we dat bij voorkeur wel. Voor een eenmalige eindschoonmaak volstaan de oppervlakte en enkele duidelijke foto's meestal.",
  },
  {
    question: "Kan ik ook via WhatsApp aanvragen?",
    answer:
      "Zeker. Stuur uw gegevens en enkele foto's via WhatsApp, dan krijgt u langs dezelfde weg een antwoord.",
  },
];

export default function OffertePage() {
  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />

      {/* Compacte hero */}
      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 pt-8 pb-10 sm:px-6 lg:px-8 lg:pt-10">
          <Breadcrumbs items={crumbs} tone="dark" />
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.12em] text-brand-light">
            Vrijblijvende offerte
          </p>
          <h1 className="mt-3 max-w-2xl text-[1.9rem] leading-tight text-brand sm:text-4xl">
            Vraag uw offerte op maat aan
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Vertel kort wat er schoongemaakt moet worden. De vragen passen zich
            aan uw situatie aan, zodat u enkel invult wat relevant is.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-brand">
            {["Vrijblijvend", "Offerte op maat", "Foto's mogen mee"].map(
              (item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check
                    className="h-4 w-4 text-accent-dark"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>
      </section>

      {/* Formulier + zijkolom */}
      <section className="bg-surface pb-16 lg:pb-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.6fr_1fr] lg:gap-10 lg:px-8">
          <div className="rounded-3xl border border-hairline bg-white p-5 shadow-soft sm:p-8 lg:p-10">
            {/* Geen Suspense: het formulier leest de URL pas na hydratatie,
                zodat de volledige HTML meteen in de pagina staat. */}
            <QuoteForm />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-hairline bg-white p-6 shadow-soft sm:p-7">
              <h2 className="font-display text-lg font-bold text-brand">
                Wat gebeurt er na uw aanvraag?
              </h2>
              <ol className="mt-5 space-y-4">
                {afterSteps.map(({ icon: Icon, text }, index) => (
                  <li key={text} className="flex gap-3.5">
                    <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-brand">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                      <span className="absolute -right-1 -top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[0.6rem] font-bold text-white">
                        {index + 1}
                      </span>
                    </span>
                    <p className="pt-1.5 text-sm leading-relaxed text-ink-muted">
                      {text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-3xl bg-brand p-6 text-white shadow-soft sm:p-7">
              <h2 className="font-display text-lg font-bold text-white">
                Liever meteen contact?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                Stuur uw vraag en enkele foto&apos;s via WhatsApp, of bel ons
                rechtstreeks.
              </p>
              <div className="mt-5 space-y-2.5">
                <WhatsAppButton
                  label="WhatsApp ons"
                  message={OFFERTE_WHATSAPP_MESSAGE}
                  className="w-full"
                />
                <CallButton variant="light" className="w-full" />
              </div>
              <ul className="mt-6 space-y-2.5 border-t border-white/15 pt-5">
                {trustPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm text-white/80"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Waarvoor kunt u een offerte aanvragen? */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-light">
              Onze diensten
            </p>
            <h2 className="mt-3 text-2xl leading-tight text-brand sm:text-3xl">
              Waarvoor kunt u een offerte aanvragen?
            </h2>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={service.href}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-hairline bg-surface px-5 py-4 text-sm font-semibold text-brand transition-colors hover:border-accent hover:bg-white"
              >
                {service.title}
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-brand-light transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Faq items={faqs} title="Veelgestelde vragen over de offerte" />
    </>
  );
}
