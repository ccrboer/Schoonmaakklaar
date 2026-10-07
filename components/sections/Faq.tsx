import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";
import type { FaqItem } from "@/types";

interface FaqProps {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
  intro?: string;
  background?: "white" | "surface";
  /** Smallere kolom (bv. op een dienstpagina) of volle breedte. */
  narrow?: boolean;
  /** Optionele link naar meer vragen, onder de lijst. */
  moreHref?: string;
  moreLabel?: string;
}

/**
 * Herbruikbare FAQ met native <details>/<summary>, zodat ze ook zonder
 * JavaScript werkt. De structured data wordt per pagina toegevoegd met
 * FaqJsonLd, nooit automatisch hier.
 */
export function Faq({
  items,
  eyebrow = "Veelgestelde vragen",
  title = "Goed om te weten",
  intro,
  background = "surface",
  narrow = true,
  moreHref,
  moreLabel = "Bekijk alle veelgestelde vragen",
}: FaqProps) {
  if (items.length === 0) return null;

  const bg = background === "white" ? "bg-white" : "bg-surface";

  return (
    <section className={bg}>
      <div
        className={`mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-20 ${
          narrow ? "max-w-3xl" : "max-w-5xl"
        }`}
      >
        <div data-reveal>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-light">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-2xl leading-tight text-brand sm:text-3xl lg:text-4xl">
            {title}
          </h2>
          {intro && (
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              {intro}
            </p>
          )}
        </div>

        <div
          className="mt-8 divide-y divide-hairline overflow-hidden rounded-2xl border border-hairline bg-white shadow-soft"
          data-reveal
        >
          {items.map((item) => (
            <details key={item.question} className="group px-5 py-4 sm:px-6 sm:py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[0.95rem] font-bold text-brand marker:content-none sm:text-base">
                {item.question}
                <Plus
                  className="h-5 w-5 shrink-0 text-brand-light transition-transform duration-300 group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {item.answer}
              </p>
            </details>
          ))}
        </div>

        {moreHref && (
          <div className="mt-6" data-reveal>
            <Link
              href={moreHref}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-light"
            >
              {moreLabel}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
