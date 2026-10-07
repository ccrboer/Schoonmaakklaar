import {
  UtensilsCrossed,
  ChefHat,
  Building2,
  Store,
  HardHat,
  KeyRound,
  Users,
  Briefcase,
} from "lucide-react";

/**
 * Sectorenbalk direct onder de hero. Toont in één oogopslag voor wie wij
 * werken — dat positioneert ons meteen als B2B-partner en herhaalt bewust niet
 * de trustpunten uit de hero.
 */
const sectors = [
  { icon: UtensilsCrossed, label: "Restaurants en cafés" },
  { icon: ChefHat, label: "Grootkeukens en catering" },
  { icon: Briefcase, label: "Hotels en B&B's" },
  { icon: Building2, label: "Kantoren en praktijken" },
  { icon: Store, label: "Winkels en showrooms" },
  { icon: HardHat, label: "Aannemers en ontwikkelaars" },
  { icon: KeyRound, label: "Verhuurders en makelaars" },
  { icon: Users, label: "VME's en syndici" },
];

export function SectorBar() {
  return (
    <section className="border-b border-hairline bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div
          className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-10"
          data-reveal
        >
          <p className="shrink-0 font-display text-sm font-bold uppercase tracking-[0.12em] text-brand">
            Wij werken voor
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-3 lg:gap-x-7">
            {sectors.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-sm font-medium text-ink-muted"
              >
                <Icon
                  className="h-4.5 w-4.5 shrink-0 text-accent-dark"
                  aria-hidden="true"
                />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
