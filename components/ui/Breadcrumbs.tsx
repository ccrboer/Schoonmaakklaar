import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Crumb } from "@/components/seo/JsonLd";

interface BreadcrumbsProps {
  items: Crumb[];
  /** "light" voor donkere achtergronden, "dark" voor lichte. */
  tone?: "light" | "dark";
}

/**
 * Zichtbaar kruimelpad. Gebruik dezelfde items voor BreadcrumbJsonLd, zodat
 * wat de bezoeker ziet en wat de zoekmachine leest identiek zijn.
 */
export function Breadcrumbs({ items, tone = "light" }: BreadcrumbsProps) {
  if (items.length < 2) return null;

  const base = tone === "light" ? "text-white/60" : "text-ink-muted";
  const linkColor =
    tone === "light" ? "hover:text-white" : "hover:text-brand";
  const current = tone === "light" ? "text-white/90" : "text-brand";

  return (
    <nav aria-label="Kruimelpad" className={`text-xs sm:text-sm ${base}`}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {isLast ? (
                <span className={`font-medium ${current}`} aria-current="page">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.path}
                    className={`transition-colors ${linkColor}`}
                  >
                    {item.name}
                  </Link>
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
