import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/config/services";

interface ServiceOverviewProps {
  background?: "white" | "surface";
  /** Compacte variant zonder de opsomming per dienst. */
  compact?: boolean;
  title?: string;
  intro?: string;
}

/**
 * Dienstenoverzicht uit config/services.ts. Eén bron voor homepage,
 * dienstenpagina en offertepagina, zodat het aanbod nooit uit elkaar loopt.
 */
export function ServiceOverview({
  background = "surface",
  compact = false,
  title = "Onze diensten",
  intro = "Acht diensten, één aanspreekpunt. Van periodiek onderhoud tot een eenmalige grondige beurt — telkens afgestemd op uw pand en uw werking.",
}: ServiceOverviewProps) {
  const bg = background === "white" ? "bg-white" : "bg-surface";

  return (
    <section id="diensten" className={`${bg} scroll-mt-20`}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl" data-reveal>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-light">
            Diensten
          </p>
          <h2 className="mt-3 text-2xl leading-tight text-brand sm:text-3xl lg:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            {intro}
          </p>
        </div>

        <div
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          data-reveal
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.slug}
                href={service.href}
                className="group flex flex-col rounded-2xl border border-hairline bg-white p-6 shadow-soft transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-elevated"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-[1.05rem] font-bold leading-snug text-brand">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                  {service.shortDescription}
                </p>

                {!compact && (
                  <ul className="mt-4 space-y-1.5">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-xs leading-relaxed text-ink-muted"
                      >
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-dark"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-light">
                  Meer info
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
