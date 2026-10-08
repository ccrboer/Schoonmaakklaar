import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type FeatureTone = "light" | "dark";

interface FeatureListProps {
  items: readonly string[];
  /** "dark" op een donker vlak (hero), "light" op wit of surface. */
  tone?: FeatureTone;
  /** Twee kolommen vanaf sm. */
  columns?: boolean;
  className?: string;
}

/**
 * USP-lijst met een markering in een eigen badge in plaats van een los vinkje.
 *
 * Een kaal vinkje naast tekst leest als een afvinklijst uit een formulier. Een
 * klein, rond vlak met een dun vinkje erin geeft hetzelfde signaal maar oogt
 * rustiger en verzorgder, en het houdt de tekst netjes uitgelijnd: de badge
 * heeft een vaste breedte, dus regels die doorlopen springen niet onder het
 * icoon.
 */
export function FeatureList({
  items,
  tone = "light",
  columns = false,
  className,
}: FeatureListProps) {
  const dark = tone === "dark";

  return (
    <ul
      className={cn(
        "grid gap-x-6 gap-y-2.5",
        columns && "sm:grid-cols-2",
        className,
      )}
    >
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <FeatureMark tone={tone} />
          <span
            className={cn(
              "min-w-0 text-sm leading-relaxed",
              dark ? "text-white/80" : "text-ink",
            )}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * De markering op zich, voor lijsten die hun eigen opmaak hebben en dus niet
 * door FeatureList heen kunnen.
 */
export function FeatureMark({
  tone = "light",
  className,
}: {
  tone?: FeatureTone;
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <span
      aria-hidden="true"
      className={cn(
        "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
        dark
          ? "bg-accent/15 text-accent ring-1 ring-inset ring-accent/30"
          : "bg-accent-soft text-accent-dark ring-1 ring-inset ring-accent/25",
        className,
      )}
    >
      <Check className="h-3 w-3" strokeWidth={2.75} />
    </span>
  );
}
