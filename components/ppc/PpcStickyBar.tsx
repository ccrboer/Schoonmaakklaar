"use client";

import { MessageCircle, Phone, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

interface PpcStickyBarProps {
  /** Korte variant van de hoofd-CTA; de balk is smal. */
  ctaLabel: string;
  whatsappMessage: string;
}

/**
 * Vaste balk onderaan op mobiel. Anders dan op de gewone site verwijst de
 * hoofdknop hier niet naar /offerte maar naar het formulier op deze pagina
 * zelf: betaald verkeer mag de landingspagina niet verlaten.
 */
export function PpcStickyBar({ ctaLabel, whatsappMessage }: PpcStickyBarProps) {
  const { contact } = siteConfig;
  const whatsappHref = contact.whatsapp
    ? buildWhatsAppLink({ phone: contact.whatsapp, message: whatsappMessage })
    : null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 lg:hidden">
      <div className="flex items-stretch gap-px border-t border-brand-dark bg-brand-dark pb-[env(safe-area-inset-bottom)]">
        {contact.phoneE164 && (
          <a
            href={`tel:${contact.phoneE164}`}
            onClick={() => trackEvent("phone_click")}
            aria-label={`Bel ${contact.phone}`}
            className="flex w-16 shrink-0 flex-col items-center justify-center gap-0.5 bg-brand py-2.5 text-[0.7rem] font-semibold text-white"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            Bel
          </a>
        )}
        {whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click")}
            aria-label="Stuur een bericht via WhatsApp"
            className="flex w-16 shrink-0 flex-col items-center justify-center gap-0.5 bg-whatsapp py-2.5 text-[0.7rem] font-semibold text-white"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            WhatsApp
          </a>
        )}
        <a
          href="#aanvraag"
          onClick={() => trackEvent("primary_cta_click", { plaats: "sticky" })}
          className="flex min-w-0 flex-1 items-center justify-center gap-1.5 bg-accent px-3 py-3.5 text-sm font-semibold text-brand-dark"
        >
          <span className="truncate">{ctaLabel}</span>
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
