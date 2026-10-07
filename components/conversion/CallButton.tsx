"use client";

import { Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type CallButtonVariant = "solid" | "outline" | "light" | "icon";

interface CallButtonProps {
  /** Zichtbaar label. Valt terug op het telefoonnummer zelf. */
  label?: string;
  variant?: CallButtonVariant;
  className?: string;
  ariaLabel?: string;
}

/** Klik-om-te-bellen CTA met het nummer uit de siteconfig. */
export function CallButton({
  label,
  variant = "outline",
  className,
  ariaLabel,
}: CallButtonProps) {
  const { phone, phoneE164 } = siteConfig.contact;

  // Zonder telefoonnummer verschijnt er geen bel-knop.
  if (!phoneE164) return null;

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold " +
    "transition-colors focus-visible:outline-none focus-visible:ring-2 " +
    "focus-visible:ring-brand focus-visible:ring-offset-2";

  const variants: Record<CallButtonVariant, string> = {
    solid: "bg-brand px-5 py-3 text-white shadow-soft hover:bg-brand-dark",
    outline:
      "border-2 border-brand px-5 py-3 text-brand hover:bg-brand hover:text-white",
    light:
      "border border-white/40 px-5 py-3 text-white hover:bg-white hover:text-brand",
    icon: "h-12 w-12 bg-brand text-white shadow-soft hover:bg-brand-dark",
  };

  return (
    <a
      href={`tel:${phoneE164}`}
      onClick={() => trackEvent("phone_click")}
      aria-label={ariaLabel ?? `Bel ${phone}`}
      className={cn(base, variants[variant], className)}
    >
      <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
      {variant !== "icon" && <span>{label ?? phone}</span>}
    </a>
  );
}
