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
 *
 * De acht sectoren staan in een vast raster in plaats van in een wrappende
 * rij. Een wrappende rij geeft op elke schermbreedte een andere, onregelmatige
 * verdeling; een raster houdt de kolommen en de regelhoogtes gelijk, wat
 * rustiger oogt. Elk icoon zit in een even grote badge, zodat labels van
 * verschillende lengte toch netjes op dezelfde lijn beginnen.
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
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <p
          className="font-display text-xs font-bold uppercase tracking-[0.14em] text-brand-light"
          data-reveal
        >
          Wij werken voor
        </p>

        <ul
          className="mt-6 grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-4"
          data-reveal
        >
          {sectors.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-hairline bg-white text-brand">
                <Icon className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <span className="min-w-0 text-sm font-medium leading-snug text-ink">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
