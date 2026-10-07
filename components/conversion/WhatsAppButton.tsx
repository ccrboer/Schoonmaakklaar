"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type WhatsAppButtonVariant = "solid" | "outline" | "light" | "icon";

interface WhatsAppButtonProps {
  /** Vooringevuld bericht. Valt terug op een algemene vraag. */
  message?: string;
  /** Zichtbaar label. Genegeerd bij de variant "icon". */
  label?: string;
  variant?: WhatsAppButtonVariant;
  className?: string;
  ariaLabel?: string;
}

const DEFAULT_MESSAGE =
  "Hallo, ik heb een vraag over jullie schoonmaakdiensten.";

/**
 * WhatsApp-CTA. Opent een wa.me-chat met het nummer uit de siteconfig en een
 * vooringevuld bericht dat past bij de pagina waarop de knop staat.
 */
export function WhatsAppButton({
  message = DEFAULT_MESSAGE,
  label = "WhatsApp ons",
  variant = "solid",
  className,
  ariaLabel,
}: WhatsAppButtonProps) {
  const { whatsapp } = siteConfig.contact;

  // Zonder WhatsApp-nummer tonen we geen knop die nergens heen gaat.
  if (!whatsapp) return null;

  const href = buildWhatsAppLink({ phone: whatsapp, message });

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold " +
    "transition-colors focus-visible:outline-none focus-visible:ring-2 " +
    "focus-visible:ring-whatsapp focus-visible:ring-offset-2";

  const variants: Record<WhatsAppButtonVariant, string> = {
    solid: "bg-whatsapp px-5 py-3 text-white shadow-soft hover:bg-whatsapp-dark",
    outline:
      "border-2 border-whatsapp px-5 py-3 text-whatsapp hover:bg-whatsapp hover:text-white",
    light:
      "border border-white/40 px-5 py-3 text-white hover:bg-white hover:text-brand",
    icon: "h-12 w-12 bg-whatsapp text-white shadow-soft hover:bg-whatsapp-dark",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("whatsapp_click")}
      aria-label={
        ariaLabel ?? (variant === "icon" ? "Stuur een WhatsApp-bericht" : undefined)
      }
      className={cn(base, variants[variant], className)}
    >
      <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
      {variant !== "icon" && <span>{label}</span>}
    </a>
  );
}
