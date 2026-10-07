import { CtaLink } from "@/components/ppc/CtaLink";
import { WhatsAppButton } from "@/components/conversion/WhatsAppButton";
import { CallButton } from "@/components/conversion/CallButton";
import type { PpcPageConfig } from "@/config/ppc-pages";

interface PpcFinalCtaProps {
  page: PpcPageConfig;
}

/** Laatste duw onderaan de pagina, met dezelfde drie wegen als bovenaan. */
export function PpcFinalCta({ page }: PpcFinalCtaProps) {
  return (
    <section className="bg-brand text-white">
      <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 lg:px-8 lg:py-18">
        <h2 className="text-2xl leading-tight text-white sm:text-3xl">
          {page.finalCta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/80">
          {page.finalCta.text}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CtaLink
            label={page.finalCta.button}
            plaats="slot"
            tone="accent"
            className="w-full sm:w-auto"
          />
          <WhatsAppButton
            variant="light"
            label={page.whatsappLabel}
            message={page.whatsappMessage}
            className="w-full sm:w-auto"
          />
        </div>
        <div className="mt-4 flex justify-center">
          <CallButton variant="light" className="w-full sm:w-auto" />
        </div>
      </div>
    </section>
  );
}
