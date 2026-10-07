import { FileText, Building2, ClipboardCheck, CalendarCheck } from "lucide-react";

interface ProcessStepsProps {
  background?: "white" | "surface";
}

const steps = [
  {
    icon: FileText,
    title: "U vraagt een offerte aan",
    description:
      "Via het formulier, WhatsApp of telefoon. Vertel kort om welk pand het gaat en wat er moet gebeuren.",
  },
  {
    icon: Building2,
    title: "Wij bekijken de situatie",
    description:
      "Meestal met een korte rondgang ter plaatse. Voor kleinere opdrachten volstaan duidelijke foto's.",
  },
  {
    icon: ClipboardCheck,
    title: "U ontvangt een offerte op maat",
    description:
      "Met een concreet werkschema: welke zones, welke frequentie en op welk moment we werken.",
  },
  {
    icon: CalendarCheck,
    title: "Wij starten op afspraak",
    description:
      "Wij komen volgens planning. Wijzigt er iets aan uw werking, dan sturen we het schema in overleg bij.",
  },
];

/** Werkwijze in vier stappen. Geen eigen CTA — die staat elders op de pagina. */
export function ProcessSteps({ background = "surface" }: ProcessStepsProps) {
  const bg = background === "white" ? "bg-white" : "bg-surface";

  return (
    <section className={bg}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl" data-reveal>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-light">
            Werkwijze
          </p>
          <h2 className="mt-3 text-2xl leading-tight text-brand sm:text-3xl lg:text-4xl">
            In vier stappen geregeld
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Van aanvraag tot uitvoering, zonder omwegen. U weet op elk moment
            wat er gaat gebeuren.
          </p>
        </div>

        <ol
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          data-reveal
        >
          {steps.map(({ icon: Icon, title, description }, index) => (
            <li
              key={title}
              className="relative rounded-2xl border border-hairline bg-white p-6 shadow-soft"
            >
              <span className="absolute right-5 top-4 font-display text-3xl font-extrabold leading-none text-accent-soft">
                {index + 1}
              </span>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-[1rem] font-bold leading-snug text-brand">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
