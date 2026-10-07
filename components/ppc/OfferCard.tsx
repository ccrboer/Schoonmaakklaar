import { Gift } from "lucide-react";
import type { PpcOffer } from "@/config/ppc-pages";

interface OfferCardProps {
  offer: PpcOffer;
  /** "light" op een donkere hero, "dark" op een lichte sectie. */
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Het aanbod van een funnel: één badge, één belofte, één voorwaardenregel en
 * de volledige voetnoot. Bewust zonder afteller of doorstreepte prijs — wat
 * er staat moet kloppen, ook over drie maanden.
 *
 * Niet elke funnel heeft een aanbod. Waar er nog geen is, wordt deze kaart
 * niet getoond in plaats van er een te verzinnen.
 */
export function OfferCard({ offer, tone = "light", className }: OfferCardProps) {
  const light = tone === "light";

  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 ${
        light
          ? "border-accent/35 bg-white/10 backdrop-blur-sm"
          : "border-accent/40 bg-accent-soft"
      } ${className ?? ""}`}
    >
      <div className="flex items-start gap-3.5">
        <span
          className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            light ? "bg-accent text-brand-dark" : "bg-brand text-accent"
          }`}
        >
          <Gift className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p
            className={`text-[0.7rem] font-bold uppercase tracking-[0.12em] ${
              light ? "text-accent" : "text-brand-light"
            }`}
          >
            {offer.badge}
          </p>
          <p
            className={`mt-1.5 font-display text-lg font-bold leading-snug ${
              light ? "text-white" : "text-brand"
            }`}
          >
            {offer.title}
          </p>
          <p
            className={`mt-1.5 text-sm leading-relaxed ${
              light ? "text-white/75" : "text-ink-muted"
            }`}
          >
            {offer.support}
          </p>
        </div>
      </div>
      <p
        className={`mt-4 border-t pt-3 text-xs leading-relaxed ${
          light ? "border-white/15 text-white/60" : "border-brand/10 text-ink-muted"
        }`}
      >
        {offer.footnote}
      </p>
    </div>
  );
}
