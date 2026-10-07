import { Check } from "lucide-react";
import { LeadForm } from "@/components/ppc/LeadForm";
import { OfferCard } from "@/components/ppc/OfferCard";
import type { PpcPageConfig } from "@/config/ppc-pages";

interface FormSectionProps {
  page: PpcPageConfig;
  /** Vier korte punten in de zijkolom, per funnel anders. */
  aside: { title: string; points: string[] };
  background?: "surface" | "white";
}

/**
 * Het aanvraagblok. Dit is het doel van elke CTA op de pagina, vandaar het
 * vaste anker #aanvraag. De zijkolom herhaalt kort waarom het de moeite is om
 * door te gaan; op mobiel staat ze ónder het formulier, zodat het invullen
 * meteen begint.
 */
export function FormSection({
  page,
  aside,
  background = "surface",
}: FormSectionProps) {
  return (
    <section
      id="aanvraag"
      className={`scroll-mt-16 ${background === "white" ? "bg-white" : "bg-surface"}`}
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
          <div className="order-1 rounded-3xl border border-hairline bg-white p-5 shadow-soft sm:p-8 lg:p-10">
            <h2 className="text-2xl leading-tight text-brand sm:text-3xl">
              {page.form.heading}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">
              {page.form.intro}
            </p>
            <div className="mt-8">
              <LeadForm
                form={page.form}
                dienst={page.dienst}
                landingPage={page.path}
                whatsappMessage={page.whatsappMessage}
              />
            </div>
          </div>

          <aside className="order-2 space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl bg-brand p-6 text-white shadow-soft sm:p-7">
              <h3 className="font-display text-lg font-bold text-white">
                {aside.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {aside.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-white/80"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {page.offer && <OfferCard offer={page.offer} tone="dark" />}
          </aside>
        </div>
      </div>
    </section>
  );
}
