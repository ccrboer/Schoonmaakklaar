"use client";

import { ArrowRight, CalendarCheck } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type CtaTone = "accent" | "brand" | "outline" | "outline-light";

interface CtaLinkProps {
  label: string;
  /** Waar op de pagina de knop staat — komt mee in het event. */
  plaats: string;
  tone?: CtaTone;
  /** "intake" meldt een intakeverzoek in plaats van een gewone CTA-klik. */
  kind?: "primary" | "intake";
  className?: string;
}

const tones: Record<CtaTone, string> = {
  accent:
    "bg-accent text-brand-dark shadow-soft hover:bg-accent-dark hover:text-white focus-visible:ring-accent",
  brand:
    "bg-brand text-white shadow-soft hover:bg-brand-dark focus-visible:ring-brand",
  outline:
    "border-2 border-brand text-brand hover:bg-brand hover:text-white focus-visible:ring-brand",
  "outline-light":
    "border border-white/40 text-white hover:bg-white hover:text-brand focus-visible:ring-white",
};

/**
 * Hoofd-CTA van een advertentiepagina. Springt naar het formulier op dezelfde
 * pagina — nooit naar een andere route — en meldt de klik, zodat per plaats
 * te zien is welke knop het werk doet.
 */
export function CtaLink({
  label,
  plaats,
  tone = "accent",
  kind = "primary",
  className,
}: CtaLinkProps) {
  const Icon = kind === "intake" ? CalendarCheck : ArrowRight;

  return (
    <a
      href="#aanvraag"
      onClick={() =>
        trackEvent(kind === "intake" ? "intake_requested" : "primary_cta_click", {
          plaats,
        })
      }
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        tones[tone],
        className,
      )}
    >
      {label}
      <Icon
        className={cn(
          "h-4 w-4 shrink-0",
          kind === "primary" && "transition-transform group-hover:translate-x-0.5",
        )}
        aria-hidden="true"
      />
    </a>
  );
}
