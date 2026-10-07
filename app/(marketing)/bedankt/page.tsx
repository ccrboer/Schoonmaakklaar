import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck, ArrowLeft, Check } from "lucide-react";
import { WhatsAppButton } from "@/components/conversion/WhatsAppButton";
import { CallButton } from "@/components/conversion/CallButton";
import { hasWhatsApp, contactSentence } from "@/config/site";

const BEDANKT_WHATSAPP_MESSAGE =
  "Hallo, ik heb net een offerte aangevraagd via de website en wil graag nog extra foto's of informatie doorsturen.";

export const metadata: Metadata = {
  title: "Bedankt voor uw aanvraag",
  // Bevestigingspagina hoort niet in de index of in de sitemap.
  robots: { index: false, follow: false },
  alternates: { canonical: "/bedankt" },
};

export const dynamic = "force-static";
export const revalidate = false;

const nextSteps = [
  "Wij bekijken uw aanvraag en de gegevens die u doorgaf.",
  "Bij vragen of voor een plaatsbezoek nemen we kort contact op.",
  "U ontvangt een offerte met een concreet werkschema.",
];

export default function BedanktPage() {
  return (
    <section className="bg-surface">
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-brand">
          <CircleCheck className="h-8 w-8" aria-hidden="true" />
        </span>

        <h1 className="mt-6 text-[1.9rem] leading-tight text-brand sm:text-4xl">
          Bedankt, uw aanvraag is ontvangen
        </h1>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
          Wij nemen zo snel mogelijk contact met u op, meestal binnen één
          werkdag. Wilt u ondertussen nog foto&apos;s of extra informatie
          doorsturen?{" "}
          {/* Verwijs enkel naar een kanaal dat effectief ingesteld is. */}
          {hasWhatsApp
            ? "Dat kan eenvoudig via WhatsApp."
            : `Dat kan ${contactSentence()}.`}
        </p>

        <ul className="mt-8 w-full space-y-3 rounded-2xl border border-hairline bg-white p-6 text-left shadow-soft">
          {nextSteps.map((step) => (
            <li key={step} className="flex items-start gap-3">
              <Check
                className="mt-0.5 h-4.5 w-4.5 shrink-0 text-accent-dark"
                aria-hidden="true"
              />
              <span className="text-sm leading-relaxed text-ink">{step}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <WhatsAppButton
            label="Extra foto's doorsturen"
            message={BEDANKT_WHATSAPP_MESSAGE}
            className="w-full sm:w-auto"
          />
          <CallButton variant="outline" className="w-full sm:w-auto" />
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-light"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Terug naar de homepage
        </Link>
      </div>
    </section>
  );
}
