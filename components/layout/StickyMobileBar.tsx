"use client";

import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

/**
 * Vaste conversiebalk onderaan het scherm, enkel op mobiel.
 *
 * Drie losse knoppen op een lichte, doorschijnende balk in plaats van drie
 * gekleurde vlakken die tegen elkaar aan liggen: dat laatste leest als een
 * systeembalk, niet als een keuze. Bellen is secundair (omlijnd), WhatsApp
 * draagt zijn eigen groen en de offerte krijgt het meeste gewicht — zowel in
 * kleur als in breedte.
 *
 * De onderste padding houdt rekening met de safe area, zodat de knoppen op
 * iPhones niet onder de systeembalk verdwijnen.
 */
export function StickyMobileBar() {
  const { contact } = siteConfig;
  const whatsappHref = contact.whatsapp
    ? buildWhatsAppLink({
        phone: contact.whatsapp,
        message: "Hallo, ik heb een vraag over jullie schoonmaakdiensten.",
      })
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

        <Link
          href="/offerte"
          className="flex min-h-12 flex-[1.4] items-center justify-center rounded-xl bg-brand px-4 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-dark"
        >
          Gratis offerte
        </Link>
      </div>
    </div>
  );
}
