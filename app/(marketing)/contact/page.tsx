import type { Metadata } from "next";
import Link from "next/link";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  FileText,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { services } from "@/config/services";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppButton } from "@/components/conversion/WhatsAppButton";
import { CallButton } from "@/components/conversion/CallButton";
import { WorkArea } from "@/components/sections/WorkArea";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BreadcrumbJsonLd, type Crumb } from "@/components/seo/JsonLd";

const { contact } = siteConfig;

const CONTACT_WHATSAPP_MESSAGE =
  "Hallo, ik heb een vraag over jullie schoonmaakdiensten.";

export const metadata: Metadata = {
  title: "Contact — schoonmaakbedrijf in Antwerpen",
  description:
    "Neem contact op met SchoonmaakKlaar voor schoonmaak van horeca, " +
    "kantoren en vastgoed in Antwerpen en omgeving. Bereikbaar via WhatsApp, " +
    "telefoon of e-mail.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/contact`,
    siteName: siteConfig.name,
    title: `Contact | ${siteConfig.name}`,
    description:
      "Snel contact voor professionele schoonmaak in Antwerpen en omgeving.",
  },
};

export const dynamic = "force-static";
export const revalidate = false;

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

interface ContactCard {
  icon: typeof Mail;
  title: string;
  value: string;
  description: string;
  href: string;
  external: boolean;
  cta: string;
}

/** Enkel de kanalen waarvoor er effectief gegevens zijn. */
const contactCards: ContactCard[] = [
  contact.whatsapp && contact.phone
    ? {
        icon: MessageCircle,
        title: "WhatsApp",
        value: contact.phone,
        description: "De snelste weg, ook om foto's door te sturen.",
        href: buildWhatsAppLink({
          phone: contact.whatsapp,
          message: CONTACT_WHATSAPP_MESSAGE,
        }),
        external: true,
        cta: "Open WhatsApp",
      }
    : null,
  contact.phoneE164 && contact.phone
    ? {
        icon: Phone,
        title: "Telefoon",
        value: contact.phone,
        description: contact.openingHours ?? "Tijdens de kantooruren",
        href: `tel:${contact.phoneE164}`,
        external: false,
        cta: "Bel direct",
      }
    : null,
  contact.email
    ? {
        icon: Mail,
        title: "E-mail",
        value: contact.email,
        description: "Voor uitgebreide vragen, plannen of documenten.",
        href: `mailto:${contact.email}`,
        external: false,
        cta: "Stuur een e-mail",
      }
    : null,
  {
    icon: FileText,
    title: "Offerteformulier",
    value: "Vrijblijvend en op maat",
    description: "De snelste manier om een concreet voorstel te krijgen.",
    href: "/offerte",
    external: false,
    cta: "Vraag een offerte aan",
  },
  {
    icon: MapPin,
    title: "Werkgebied",
    value: contact.serviceArea,
    description: "Antwerpen, de districten en de omliggende gemeenten.",
    href: "#werkgebied",
    external: false,
    cta: "Bekijk werkgebied",
  },
].filter((card): card is ContactCard => card !== null);

const faqs = [
  {
    question: "Hoe neem ik het snelst contact op?",
    answer:
      "Via WhatsApp of telefoon. Voor een concrete offerte vult u het best het offerteformulier in: dan hebben we meteen alle gegevens die we nodig hebben.",
  },
  {
    question: "Wanneer zijn jullie bereikbaar?",
    answer: `U bereikt ons tijdens de gewone werkuren (${contact.openingHours}). Een bericht via WhatsApp of e-mail kunt u uiteraard op elk moment sturen.`,
  },
  {
    question: "Werken jullie ook in mijn gemeente?",
    answer:
      "Wij werken in Antwerpen en omgeving. Staat uw gemeente niet in de lijst op deze pagina? Vraag het gerust — vaak lukt het toch.",
  },
  {
    question: "Kan ik een plaatsbezoek aanvragen?",
    answer:
      "Ja. Voor periodiek onderhoud, horeca en dieptereiniging komen we sowieso graag eerst kijken. Laat in uw bericht weten wanneer het u past.",
  },
];

export default function ContactPage() {
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
            Even overleggen? Wij helpen u graag verder
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Voor schoonmaak van horeca, kantoren en vastgoed in Antwerpen en
            omgeving. Bereikbaar via WhatsApp, telefoon of e-mail — u kiest wat
            voor u het makkelijkst is.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton
              variant="solid"
              message={CONTACT_WHATSAPP_MESSAGE}
              className="w-full sm:w-auto"
            />
            <CallButton
              variant="light"
              label="Bel direct"
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </section>

      {/* Contactkaarten */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
            {contactCards.map((card) => {
              const Icon = card.icon;
              return (
                <a
                  key={card.title}
                  href={card.href}
                  target={card.external ? "_blank" : undefined}
                  rel={card.external ? "noopener noreferrer" : undefined}
                  className="group flex flex-col rounded-2xl border border-hairline bg-white p-6 shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-elevated"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 font-display text-base font-bold text-brand">
                    {card.title}
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-ink">
                    {card.value}
                  </p>
                  <p className="mt-1 flex-1 text-sm leading-relaxed text-ink-muted">
                    {card.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-light">
                    {card.cta}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Waarvoor contact opnemen */}
      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <h2 className="text-2xl leading-tight text-brand sm:text-3xl">
              Waarvoor kunt u ons contacteren?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">
              Twijfelt u of wij u kunnen helpen? In deze situaties bent u bij
              ons aan het juiste adres.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  href={service.href}
                  className="group flex items-center gap-3.5 rounded-2xl border border-hairline bg-white p-5 transition-colors hover:border-accent"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                    <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <span className="flex-1 text-sm font-semibold text-brand">
                    {service.title}
                  </span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-brand-light transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <WorkArea id="werkgebied" background="white" />

      <Faq items={faqs} title="Veelgestelde vragen over contact" />

      {/* Bedrijfsgegevens */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <div className="rounded-2xl border border-hairline bg-surface p-6 sm:p-7">
            <h2 className="font-display text-xs font-bold uppercase tracking-[0.12em] text-brand-light">
              Bedrijfsgegevens
            </h2>
            <address className="mt-3 text-sm not-italic leading-relaxed text-ink-muted">
              <span className="font-semibold text-ink">{contact.legalName}</span>
              <br />
              {contact.vat && (
                <>
                  BTW {contact.vat}
                  <br />
                </>
              )}
              {contact.email && (
                <>
                  <a
                    href={`mailto:${contact.email}`}
                    className="transition-colors hover:text-brand"
                  >
                    {contact.email}
                  </a>
                  <br />
                </>
              )}
              {contact.phoneE164 && (
                <a
                  href={`tel:${contact.phoneE164}`}
                  className="transition-colors hover:text-brand"
                >
                  {contact.phone}
                </a>
              )}
            </address>
            <p className="mt-3 flex items-center gap-2 text-sm text-ink-muted">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
              Werkgebied: {contact.serviceArea}
            </p>
            {contact.openingHours && (
              <p className="mt-1.5 flex items-center gap-2 text-sm text-ink-muted">
                <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                {contact.openingHours}
              </p>
            )}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
