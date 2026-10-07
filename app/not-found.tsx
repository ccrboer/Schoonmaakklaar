import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/config/services";

/** Eenvoudige 404 in de huisstijl, met een weg terug naar de diensten. */
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-surface px-4 py-20 text-center">
      <p className="font-display text-sm font-bold uppercase tracking-[0.12em] text-brand-light">
        Pagina niet gevonden
      </p>
      <h1 className="mt-3 text-[1.9rem] leading-tight text-brand sm:text-4xl">
        Deze pagina bestaat niet of is verplaatst
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
        Gebruik onderstaande links om verder te gaan, of vraag meteen een
        vrijblijvende offerte aan.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          Naar de homepage
        </Link>
        <Link
          href="/offerte"
          className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand px-6 py-3.5 font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
        >
          Offerte aanvragen
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>

      <ul className="mt-10 flex max-w-3xl flex-wrap justify-center gap-2.5">
        {services.map((service) => (
          <li key={service.slug}>
            <Link
              href={service.href}
              className="inline-flex rounded-full border border-hairline bg-white px-4 py-2 text-sm font-semibold text-brand transition-colors hover:border-accent"
            >
              {service.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
