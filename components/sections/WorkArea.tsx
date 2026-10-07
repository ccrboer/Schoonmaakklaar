import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { localPages, serviceAreaCities } from "@/config/local-pages";
import { WhatsAppButton } from "@/components/conversion/WhatsAppButton";

interface WorkAreaProps {
  background?: "white" | "surface";
  id?: string;
}

const WORK_AREA_WHATSAPP_MESSAGE =
  "Hallo, ik zit in Antwerpen of omgeving en wil graag een offerte voor schoonmaak.";

/**
 * Werkgebied Antwerpen. Geen kaart-API en geen vestigingsclaim: enkel de
 * gemeenten waar wij effectief komen, met links naar de lokale pagina's.
 */
export function WorkArea({ background = "surface", id }: WorkAreaProps) {
  const bg = background === "white" ? "bg-white" : "bg-surface";

  return (
    <section id={id} className={`${bg} ${id ? "scroll-mt-20" : ""}`}>
      <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
        <div data-reveal>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-light">
            Werkgebied
          </p>
          <h2 className="mt-3 text-2xl leading-tight text-brand sm:text-3xl lg:text-4xl">
            Actief in Antwerpen en omgeving
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
            Van de binnenstad en de districten tot de rand: Berchem, Deurne,
            Borgerhout, Wilrijk, Merksem, Mortsel, Edegem, Schoten, Brasschaat
            en de omliggende gemeenten. Staat uw gemeente er niet bij? Vraag het
            gerust — vaak lukt het toch.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {serviceAreaCities.map((city) => (
              <li
                key={city}
                className="rounded-full border border-hairline bg-white px-3 py-1 text-sm text-ink-muted"
              >
                {city}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/offerte"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Vraag een offerte aan
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <WhatsAppButton
              variant="outline"
              label="WhatsApp ons"
              message={WORK_AREA_WHATSAPP_MESSAGE}
              className="px-5 py-3 text-sm"
            />
          </div>
        </div>

        {/* Lokale pagina's */}
        <div
          className="rounded-3xl border border-hairline bg-white p-6 shadow-soft sm:p-7"
          data-reveal
          style={{ ["--reveal-delay" as string]: "100ms" }}
        >
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white">
              <MapPin className="h-4.5 w-4.5" aria-hidden="true" />
            </span>
            <h3 className="font-display text-base font-bold text-brand">
              Schoonmaak in Antwerpen
            </h3>
          </div>

          <ul className="mt-5 divide-y divide-hairline">
            {localPages.map((page) => (
              <li key={page.path}>
                <Link
                  href={page.path}
                  className="group flex items-center justify-between gap-3 py-3.5 text-sm font-medium text-ink transition-colors hover:text-brand"
                >
                  {page.serviceName} in {page.locationName}
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-brand-light transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-5 border-t border-hairline pt-4 text-xs leading-relaxed text-ink-muted">
            Wij werken vanuit ons werkgebied en hebben geen bijkantoren per
            gemeente. Wat u ziet, is waar we effectief komen.
          </p>
        </div>
      </div>
    </section>
  );
}
