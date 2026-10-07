import { Users, ClipboardList, CalendarClock, ShieldCheck, Building2, MessageCircle } from "lucide-react";

/**
 * "Waarom SchoonmaakKlaar" — onderscheidende punten die bewust NIET de
 * trustpunten uit het trustblok herhalen (eenmalig/periodiek, buiten de uren,
 * snelle offerte, professionele uitvoering).
 */
const reasons = [
  {
    icon: ClipboardList,
    title: "Een werkschema op papier",
    text: "U krijgt zwart op wit welke zones we doen en hoe vaak. Geen discussie achteraf over wat er wel of niet bij hoorde.",
  },
  {
    icon: Users,
    title: "Een vaste ploeg",
    text: "Dezelfde mensen over de vloer, die uw pand en uw afspraken kennen. Bij verlof of ziekte zorgen wij voor vervanging.",
  },
  {
    icon: Building2,
    title: "Gericht op B2B en vastgoed",
    text: "Horeca, kantoren, opleveringen en panden. Geen huishoudhulp, dus ook geen wachtlijsten of dienstenchequeregels.",
  },
  {
    icon: CalendarClock,
    title: "Wij werken rond uw uren",
    text: "Voor de opening, na sluiting, in het weekend of tijdens een sluitingsperiode — uw werking bepaalt de planning.",
  },
  {
    icon: MessageCircle,
    title: "Eén aanspreekpunt",
    text: "Eén contactpersoon voor planning, vragen en bijsturing. Ook wanneer u meerdere panden of zaken laat onderhouden.",
  },
  {
    icon: ShieldCheck,
    title: "Eerlijk over wat kan",
    text: "Kan schoonmaak een probleem niet oplossen, dan zeggen we dat vooraf. Liever een realistische offerte dan een ontgoocheling.",
  },
];

export function WhyUs() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl" data-reveal>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-light">
            Waarom SchoonmaakKlaar
          </p>
          <h2 className="mt-3 text-2xl leading-tight text-brand sm:text-3xl lg:text-4xl">
            Voorspelbaar werk, duidelijke afspraken
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Schoonmaak valt pas op wanneer ze niet gebeurt. Daarom leggen wij
            vooraf vast wat er gebeurt, door wie en wanneer — en houden we ons
            daaraan.
          </p>
        </div>

        <div
          className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
          data-reveal
        >
          {reasons.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-brand">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-[0.95rem] font-bold text-brand">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
