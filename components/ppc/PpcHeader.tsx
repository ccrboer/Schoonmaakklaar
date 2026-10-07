import { Logo } from "@/components/layout/Logo";
import { CallButton } from "@/components/conversion/CallButton";
import { WhatsAppButton } from "@/components/conversion/WhatsAppButton";
import { siteConfig } from "@/config/site";

interface PpcHeaderProps {
  /** Vooringevuld WhatsApp-bericht, passend bij deze funnel. */
  whatsappMessage: string;
}

/**
 * Koptekst voor advertentieverkeer: enkel het merk en de directe
 * contactacties. Bewust geen navigatiemenu — betaald verkeer dat doorklikt
 * naar andere pagina's converteert niet, en elke extra uitgang kost geld.
 * Het woordmerk is daarom ook geen link.
 */
export function PpcHeader({ whatsappMessage }: PpcHeaderProps) {
  const { phone } = siteConfig.contact;

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <div className="flex items-center gap-2.5">
          {/* Op mobiel enkel de iconen: de balk blijft zo rustig. */}
          <WhatsAppButton
            variant="icon"
            message={whatsappMessage}
            ariaLabel="Stuur ons een bericht via WhatsApp"
            className="sm:hidden"
          />
          <CallButton variant="icon" className="sm:hidden" />

          <WhatsAppButton
            variant="outline"
            label="WhatsApp"
            message={whatsappMessage}
            className="hidden px-4 py-2.5 text-sm sm:inline-flex"
          />
          <CallButton
            variant="solid"
            label={phone}
            className="hidden px-4 py-2.5 text-sm sm:inline-flex"
          />
        </div>
      </div>
    </header>
  );
}
