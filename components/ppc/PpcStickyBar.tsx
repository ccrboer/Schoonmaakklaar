"use client";

import { MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

interface PpcStickyBarProps {
  /** Korte variant van de hoofd-CTA; de balk is smal. */
  ctaLabel: string;
  whatsappMessage: string;
}

/**
 * Vaste balk onderaan op mobiel. Zelfde vorm als op de rest van de site —
 * drie losse knoppen op een lichte balk — maar de hoofdknop verwijst hier
 * naar het formulier op deze pagina zelf: betaald verkeer mag de
 * landingspagina niet verlaten.
 */
export function PpcStickyBar({ ctaLabel, whatsappMessage }: PpcStickyBarProps) {
  const { contact } = siteConfig;
  const whatsappHref = contact.whatsapp
    ? buildWhatsAppLink({ phone: contact.whatsapp, message: whatsappMessage })
    : null;

  const stacked =
    "flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 " +
    "rounded-xl text-[0.6875rem] font-semibold transition-colors";

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-hairline bg-white/95 backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-lg items-stretch gap-2 px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
        {contact.phoneE164 && (
          <a
            href={`tel:${contact.phoneE164}`}
            onClick={() => trackEvent("phone_click")}
            aria-label={`Bel ${contact.phone}`}
            className={`${stacked} border border-hairline bg-white text-ink hover:border-brand hover:text-brand`}
          >
            <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
            Bellen
          </a>
        )}

        {whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click")}
            aria-label="Stuur een bericht via WhatsApp"
            className={`${stacked} bg-whatsapp text-[#08301a] hover:bg-whatsapp-dark`}
          >
            <MessageCircle className="h-[18px] w-[18px]" aria-hidden="true" />
            WhatsApp
          </a>
        )}

        <a
          href="#aanvraag"
          onClick={() => trackEvent("primary_cta_click", { plaats: "sticky" })}
          className="flex min-h-12 flex-[1.4] items-center justify-center rounded-xl bg-brand px-4 text-center text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-dark"
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  );
}
