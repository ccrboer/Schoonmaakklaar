import type { Metadata } from "next";
import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { faqGroups, allFaqItems } from "@/config/faq";
import { services } from "@/config/services";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  BreadcrumbJsonLd,
  FaqJsonLd,
  type Crumb,
} from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Veelgestelde vragen over onze schoonmaak",
  description:
    "Antwoorden op de meest gestelde vragen over samenwerking, planning, " +
    "prijzen en wat wij wel en niet doen bij professionele schoonmaak in " +
    "Antwerpen en omgeving.",
  alternates: { canonical: "/veelgestelde-vragen" },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/veelgestelde-vragen`,
    siteName: siteConfig.name,
    title: `Veelgestelde vragen | ${siteConfig.name}`,
    description:
      "Alles over samenwerking, planning, prijzen en wat wij wel en niet doen.",
  },
};

export const dynamic = "force-static";
export const revalidate = false;

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Veelgestelde vragen", path: "/veelgestelde-vragen" },
];

export default function VeelgesteldeVragenPage() {
  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <FaqJsonLd items={allFaqItems} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_82%_-5%,rgba(43,184,198,0.2),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-8 text-[2rem] leading-[1.12] sm:text-4xl lg:text-[2.9rem]">
            Veelgestelde vragen
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Van hoe een samenwerking start tot wat een prijs bepaalt — en wat
            wij bewust niet doen. Staat uw vraag er niet bij? Stel ze gerust.
          </p>
        </div>
      </section>

      {/* Vragen per thema */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="space-y-12">
            {faqGroups.map((group) => (
              <div key={group.title} data-reveal>
                <h2 className="text-xl leading-tight text-brand sm:text-2xl">
                  {group.title}
                </h2>
                <div className="mt-5 divide-y divide-hairline overflow-hidden rounded-2xl border border-hairline bg-surface">
                  {group.items.map((item) => (
                    <details
                      key={item.question}
                      className="group px-5 py-4 sm:px-6 sm:py-5"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[0.95rem] font-bold text-brand marker:content-none sm:text-base">
                        {item.question}
                        <Plus
                          className="h-5 w-5 shrink-0 text-brand-light transition-transform duration-300 group-open:rotate-45"
                          aria-hidden="true"
                        />
                      </summary>
                      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Naar de diensten */}
          <div className="mt-14 rounded-3xl border border-hairline bg-surface p-6 sm:p-8" data-reveal>
            <h2 className="font-display text-lg font-bold text-brand">
              Vraag over een specifieke dienst?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Op elke dienstpagina staan de vragen die specifiek over die dienst
              gaan, inclusief wat er precies inbegrepen is.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={service.href}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-hairline bg-white px-4 py-2 text-sm font-semibold text-brand transition-colors hover:border-accent"
                  >
                    {service.title}
                    <ArrowRight
                      className="h-3.5 w-3.5 text-brand-light transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FinalCta
        title="Uw vraag staat er niet bij?"
        text="Stel ze gerust via WhatsApp of telefoon, of vraag meteen een vrijblijvende offerte aan."
      />
    </>
  );
}
