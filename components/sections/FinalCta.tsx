import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WhatsAppButton } from "@/components/conversion/WhatsAppButton";
import { CallButton } from "@/components/conversion/CallButton";

interface FinalCtaProps {
  title?: string;
  text?: string;
  /** Doel van de offerteknop, bv. "/offerte?dienst=horeca". */
  quoteHref?: string;
  whatsappMessage?: string;
}

const DEFAULT_WHATSAPP_MESSAGE =
  "Hallo, ik wil graag een offerte voor schoonmaak in Antwerpen. Het gaat om ...";

/** Afsluitende CTA: offerte als primaire actie, WhatsApp en bellen ernaast. */
export function FinalCta({
  title = "Klaar om de schoonmaak uit handen te geven?",
  text = "Vraag vrijblijvend een offerte aan. Wij bekijken uw pand, stellen een werkschema voor en bezorgen u een duidelijke prijs — zonder verplichtingen.",
  quoteHref = "/offerte",
  whatsappMessage = DEFAULT_WHATSAPP_MESSAGE,
}: FinalCtaProps) {
  return (
    <section className="bg-brand text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-brand-dark/50 px-6 py-12 text-center sm:px-10 sm:py-14"
          data-reveal
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_0%,rgba(43,184,198,0.18),transparent_70%)]"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-2xl leading-tight text-white sm:text-3xl lg:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/80">
              {text}
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={quoteHref}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-semibold text-brand-dark shadow-soft transition-[background-color,transform] hover:bg-white active:translate-y-px sm:w-auto"
              >
                Vraag gratis offerte aan
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <WhatsAppButton
                variant="light"
                message={whatsappMessage}
                className="w-full sm:w-auto"
              />
              <CallButton
                variant="light"
                label="Bel direct"
                className="w-full sm:w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
