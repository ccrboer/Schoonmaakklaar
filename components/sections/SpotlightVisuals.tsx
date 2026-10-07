import { Moon, Sunrise, ArrowRight, CalendarClock, KeyRound } from "lucide-react";

/**
 * Ontworpen visuals voor de uitgelichte diensten op de homepage. Elke visual
 * maakt de belofte van die dienst concreet — de uren waarop we komen, de zones
 * die we aanpakken, de data waarop we plannen of de fase van de werken.
 *
 * Dit zijn bewust geen stockfoto's: zolang er geen eigen fotografie is, zegt
 * een ontworpen schema meer dan een willekeurig beeld. Zodra er echte foto's
 * zijn, kan een beeld hier eenvoudig naast of in de plaats komen.
 */

export type SpotlightVisualKey =
  | "horeca-uren"
  | "keuken-zones"
  | "plaatsbeschrijving-data"
  | "oplevering-fases";

/** Horeca — wanneer wij komen ten opzichte van uw service. */
function HorecaHoursVisual() {
  const blocks = [
    { label: "Voor de opening", time: "06:00 – 11:00", active: true, icon: Sunrise },
    { label: "Uw service", time: "11:00 – 23:00", active: false },
    { label: "Na sluiting", time: "23:00 – 02:00", active: true, icon: Moon },
  ];

  return (
    <div>
      <div className="flex gap-1.5">
        {blocks.map((block) => (
          <div
            key={block.label}
            className={`h-2 flex-1 rounded-full ${
              block.active ? "bg-accent" : "bg-hairline"
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
      <ul className="mt-4 space-y-2.5">
        {blocks.map((block) => {
          const Icon = block.icon;
          return (
            <li
              key={block.label}
              className={`flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-sm ${
                block.active
                  ? "bg-accent-soft text-brand"
                  : "bg-white text-ink-muted"
              }`}
            >
              <span className="flex items-center gap-2 font-semibold">
                {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
                {block.label}
              </span>
              <span className="shrink-0 text-xs font-medium tabular-nums">
                {block.time}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-xs leading-relaxed text-ink-muted">
        Indicatieve uren — de concrete momenten leggen we samen vast.
      </p>
    </div>
  );
}

/** Kitchen Reset — de zones die een dieptereiniging omvat. */
function KitchenZonesVisual() {
  const zones = [
    { zone: "Kookzone", detail: "Inox, spatwanden, friteuse-omgeving" },
    { zone: "Afwaszone", detail: "Spoelbakken en vaatwasmachine" },
    { zone: "Opslag", detail: "Rekken, stellingen, droogwaren" },
    { zone: "Afvalzone", detail: "Containers en omgeving" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
        <span className="font-display text-xs font-bold uppercase tracking-[0.14em] text-accent">
          Zonerapport
        </span>
        <span className="text-xs text-white/55">4 zones · 1 beurt</span>
      </div>
      <ul className="mt-3 divide-y divide-white/10">
        {zones.map(({ zone, detail }, index) => (
          <li key={zone} className="flex items-start gap-3 py-3">
            <span className="mt-0.5 font-display text-xs font-bold tabular-nums text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-white">
                {zone}
              </span>
              <span className="block text-xs leading-relaxed text-white/60">
                {detail}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Plaatsbeschrijving — uw data en het moment waarop wij komen. */
function PlaatsbeschrijvingDatesVisual() {
  return (
    <div className="rounded-2xl border border-hairline bg-white p-4 sm:p-5">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-brand-dark">
          <CalendarClock className="h-4.5 w-4.5" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold text-brand">
            Wij plannen vóór uw afspraak
          </span>
          <span className="block text-xs text-ink-muted">
            U geeft twee data door, wij doen de rest
          </span>
        </span>
      </div>

      {/* Tijdlijn: de verbindingslijn loopt achter de markers door, zodat
          marker en label altijd op dezelfde hoogte staan. */}
      <ol className="relative mt-4 space-y-3 pl-6">
        <span
          aria-hidden="true"
          className="absolute left-[5px] top-2 bottom-2 w-px bg-hairline"
        />
        {[
          { label: "Wij maken schoon", current: true },
          { label: "Plaatsbeschrijving", current: false },
          { label: "Sleuteloverdracht", current: false, icon: KeyRound },
        ].map(({ label, current, icon: Icon }) => (
          <li key={label} className="relative flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className={`absolute left-[-1.5rem] h-2.5 w-2.5 rounded-full ${
                current
                  ? "bg-accent ring-4 ring-white"
                  : "border-2 border-brand bg-white"
              }`}
            />
            {Icon && (
              <Icon className="h-3.5 w-3.5 text-ink-muted" aria-hidden="true" />
            )}
            <span
              className={`text-sm leading-5 ${
                current ? "font-semibold text-brand" : "text-ink"
              }`}
            >
              {label}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Oplevering — in welke fase van de werken wij binnenkomen. */
function OpleveringPhasesVisual() {
  const phases = [
    { label: "Ruwbouw", active: false },
    { label: "Afwerking", active: false },
    { label: "Schoonmaak", active: true },
    { label: "Oplevering", active: false },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {phases.map((phase, index) => (
          <span key={phase.label} className="flex items-center gap-2">
            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                phase.active
                  ? "bg-brand text-white"
                  : "bg-white text-ink-muted ring-1 ring-hairline"
              }`}
            >
              {phase.label}
            </span>
            {/* Pijlen enkel waar de rij niet afbreekt; op mobiel wikkelen de
                chips zonder losse pijl aan het regeleinde. */}
            {index < phases.length - 1 && (
              <ArrowRight
                className="hidden h-3.5 w-3.5 shrink-0 text-ink-muted/60 sm:block"
                aria-hidden="true"
              />
            )}
          </span>
        ))}
      </div>
      <p className="mt-3 text-xs leading-relaxed text-ink-muted">
        Wij komen tussen de laatste werkdag en de oplevering — of tussen twee
        fases, als er nadien nog gewerkt wordt.
      </p>
    </div>
  );
}

const VISUALS: Record<SpotlightVisualKey, () => React.JSX.Element> = {
  "horeca-uren": HorecaHoursVisual,
  "keuken-zones": KitchenZonesVisual,
  "plaatsbeschrijving-data": PlaatsbeschrijvingDatesVisual,
  "oplevering-fases": OpleveringPhasesVisual,
};

export function SpotlightVisual({ visualKey }: { visualKey: SpotlightVisualKey }) {
  const Visual = VISUALS[visualKey];
  return <Visual />;
}
