"use client";

import Link from "next/link";
import { MessageCircle, Phone, FileText } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

/**
 * Vaste conversiebalk onderaan het scherm, enkel op mobiel. De offerte staat
 * er altijd; bellen en WhatsApp verschijnen zodra die gegevens ingevuld zijn.
 * De balk verdeelt zich over het aantal beschikbare acties.
 */
export function StickyMobileBar() {
  const { contact } = siteConfig;
  const whatsappHref = contact.whatsapp
    ? buildWhatsAppLink({
        phone: contact.whatsapp,
        message: "Hallo, ik heb een vraag over jullie schoonmaakdiensten.",
      })
    : null;

  const columns = 1 + (contact.phoneE164 ? 1 : 0) + (whatsappHref ? 1 : 0);
  const gridClass =
    columns === 3 ? "grid-cols-3" : columns === 2 ? "grid-cols-2" : "grid-cols-1";

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 lg:hidden">
      <div
        className={`grid ${gridClass} gap-px border-t border-brand-dark bg-brand-dark pb-[env(safe-area-inset-bottom)]`}
      >
        {contact.phoneE164 && (
          <a
            href={`tel:${contact.phoneE164}`}
            onClick={() => trackEvent("phone_click")}
            aria-label={`Bel ${contact.phone}`}
            className="flex items-center justify-center gap-2 bg-brand py-3.5 text-sm font-semibold text-white"
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
            className="flex items-center justify-center gap-2 bg-whatsapp py-3.5 text-sm font-semibold text-white"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            WhatsApp
          </a>
        )}
        <Link
          href="/offerte"
          className="flex items-center justify-center gap-2 bg-accent py-3.5 text-sm font-semibold text-brand-dark"
        >
          <FileText className="h-5 w-5" aria-hidden="true" />
          Offerte aanvragen
        </Link>
      </div>
    </div>
  );
}
