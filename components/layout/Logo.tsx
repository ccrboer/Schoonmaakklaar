import { cn } from "@/lib/utils";

interface LogoProps {
  /** "dark" voor lichte achtergronden, "light" voor donkere vlakken. */
  tone?: "dark" | "light";
  className?: string;
}

/**
 * Woordmerk van SchoonmaakKlaar: een beeldmerk (druppel met glans) plus de
 * naam, waarbij "Klaar" in het accent staat. Volledig als SVG en tekst
 * opgebouwd, zodat het scherp blijft op elk scherm en geen extra request kost.
 *
 * Wordt vervangen zodra er een definitief logobestand is.
 */
export function Logo({ tone = "dark", className }: LogoProps) {
  const wordColor = tone === "light" ? "text-white" : "text-brand";
  const markBg = tone === "light" ? "bg-white/10" : "bg-brand";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
          markBg,
        )}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3.2c3.1 3.4 5.2 6.2 5.2 8.8a5.2 5.2 0 1 1-10.4 0c0-2.6 2.1-5.4 5.2-8.8Z"
            fill="var(--accent)"
          />
          <path
            d="M10 11.4c0-1.1.5-2.2 1.3-3.2"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.85"
          />
        </svg>
      </span>
      <span
        className={cn(
          "font-display text-lg font-extrabold tracking-tight",
          wordColor,
        )}
      >
        Schoonmaak<span className="text-accent">Klaar</span>
      </span>
    </span>
  );
}
