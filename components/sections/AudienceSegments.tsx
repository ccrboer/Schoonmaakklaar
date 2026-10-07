import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { audiences } from "@/config/audiences";
import { getService } from "@/config/services";

interface AudienceSegmentsProps {
  background?: "white" | "surface";
}

/**
 * "Voor wie werken wij?" — laat de bezoeker zichzelf herkennen en stuurt
 * meteen door naar de dienst die bij dat segment hoort.
 */
export function AudienceSegments({
  background = "white",
}: AudienceSegmentsProps) {
  const bg = background === "surface" ? "bg-surface" : "bg-white";

  return (
    <section className={bg}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl" data-reveal>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-light">
            Voor wie
          </p>
          <h2 className="mt-3 text-2xl leading-tight text-brand sm:text-3xl lg:text-4xl">
            Gemaakt voor professionele opdrachtgevers
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Wij werken voor zaken, gebouwen en panden — geen huishoudelijke
            poetsdienst, geen dienstencheques. Zoekt u een partner die met uw
            planning meedenkt, dan bent u hier juist.
          </p>
        </div>

        <div
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          data-reveal
        >
          {audiences.map((audience) => {
            const Icon = audience.icon;
            const primaryService = audience.services?.[0]
              ? getService(audience.services[0])
              : undefined;

            return (
              <article
                key={audience.slug}
                className="flex flex-col rounded-2xl border border-hairline bg-white p-6 shadow-soft"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-[1.05rem] font-bold text-brand">
                  {audience.title}
                </h3>
                <p className="mt-2 text-sm italic leading-relaxed text-ink-muted">
                  {audience.painPoint}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink">
                  {audience.valueProposition}
                </p>

                {primaryService && (
                  <Link
                    href={primaryService.href}
                    className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-light"
                  >
                    {primaryService.title}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
