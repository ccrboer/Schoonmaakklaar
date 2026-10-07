import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Herkenningssectie: de bezoeker moet zichzelf in één van deze situaties
 * terugvinden. Begint bij het probleem van de klant, niet bij onszelf.
 */
const situations = [
  {
    title: "Uw poetshulp valt uit",
    text: "De zaak of het kantoor moet toch open kunnen, en het onderhoud mag niet stilvallen.",
    href: "/kantoorschoonmaak",
    linkLabel: "Periodiek onderhoud",
  },
  {
    title: "De keuken is toe aan een grondige beurt",
    text: "Dagelijks poetsen houdt vet achter de toestellen en tegen de wanden niet tegen.",
    href: "/horecakeuken-dieptereiniging",
    linkLabel: "Kitchen Reset",
  },
  {
    title: "De plaatsbeschrijving komt eraan",
    text: "De huurwoning moet netjes klaarstaan, net op het moment dat u aan het verhuizen bent.",
    href: "/schoonmaak-voor-plaatsbeschrijving",
    linkLabel: "Eindschoonmaak",
  },
  {
    title: "De werken zijn klaar, het stof niet",
    text: "Na de renovatie ligt er bouwstof op alles en staat de oplevering al gepland.",
    href: "/opleveringsschoonmaak",
    linkLabel: "Opleveringsschoonmaak",
  },
  {
    title: "Het pand moet snel opnieuw verhuurd",
    text: "Tussen twee huurders telt elke dag, en het pand moet meteen toonbaar zijn.",
    href: "/verhuur-verkoopklaar-schoonmaak",
    linkLabel: "Verhuurklaar maken",
  },
  {
    title: "De traphal krijgt te weinig aandacht",
    text: "Bewoners merken het eerst in de inkom en de gemeenschappelijke delen.",
    href: "/traphal-schoonmaak",
    linkLabel: "Gemeenschappelijke delen",
  },
];

export function Recognition() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl" data-reveal>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-light">
            Herkenbaar?
          </p>
          <h2 className="mt-3 text-2xl leading-tight text-brand sm:text-3xl lg:text-4xl">
            De situaties waarvoor men ons belt
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Schoonmaak wordt pas urgent op het moment dat het knelt: een datum
            die nadert, een ploeg die uitvalt of een pand dat toonbaar moet
            zijn. Voor die momenten zijn wij er.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
          {situations.map((situation) => (
            <li key={situation.title}>
              <Link
                href={situation.href}
                className="group flex h-full flex-col rounded-2xl border border-hairline bg-surface/60 p-6 transition-[border-color,background-color,transform] hover:-translate-y-0.5 hover:border-accent hover:bg-white"
              >
                <h3 className="font-display text-base font-bold text-brand">
                  {situation.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                  {situation.text}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-light">
                  {situation.linkLabel}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
