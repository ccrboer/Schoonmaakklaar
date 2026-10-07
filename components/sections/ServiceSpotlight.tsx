import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ImageRef } from "@/types";
import { Photo } from "@/components/media/Photo";
import {
  SpotlightVisual,
  type SpotlightVisualKey,
} from "@/components/sections/SpotlightVisuals";

export interface ServiceSpotlightProps {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  text: string;
  bullets: string[];
  href: string;
  ctaLabel: string;
  /** Tweede, zachtere link — bv. rechtstreeks naar de offerte. */
  secondaryHref?: string;
  secondaryLabel?: string;
  /** Klein label linksboven in het zijpaneel, bv. "Kitchen Reset". */
  badge?: string;
  /** Kop boven de punten in het zijpaneel. */
  panelTitle?: string;
  /** Afsluitende regel onderaan het zijpaneel. */
  panelNote?: string;
  /** Ontworpen visual bovenaan het zijpaneel, specifiek voor deze dienst. */
  visualKey?: SpotlightVisualKey;
  /**
   * Foto bovenaan het zijpaneel. Staat er een foto én een visual, dan vallen
   * de bullets weg: beeld plus één compacte visual vertelt het verhaal al.
   */
  image?: ImageRef;
  /** Beeldpaneel links in plaats van rechts. */
  reverse?: boolean;
  background?: "white" | "surface" | "brand";
}

/**
 * Herbruikbare uitlichting van één dienst op de homepage. Afwisselend links
 * en rechts uitgelijnd, met een paneel dat de kernpunten samenvat. Eén
 * component voor alle vijf de uitgelichte diensten houdt de pagina consistent.
 */
export function ServiceSpotlight({
  icon: Icon,
  eyebrow,
  title,
  text,
  bullets,
  href,
  ctaLabel,
  secondaryHref,
  secondaryLabel,
  badge,
  panelTitle,
  panelNote,
  visualKey,
  image,
  reverse = false,
  background = "white",
}: ServiceSpotlightProps) {
  const isBrand = background === "brand";
  const bg =
    background === "surface"
      ? "bg-surface"
      : isBrand
        ? "bg-brand text-white"
        : "bg-white";

  return (
    <section className={`${bg} relative overflow-hidden`}>
      {isBrand && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_80%_0%,rgba(43,184,198,0.18),transparent_70%)]"
        />
      )}

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
        {/* Tekstkolom */}
        <div
          className={reverse ? "lg:order-2" : undefined}
          data-reveal
        >
          <p
            className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] ${
              isBrand ? "text-accent" : "text-brand-light"
            }`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {eyebrow}
          </p>
          <h2
            className={`mt-3 text-2xl leading-tight sm:text-3xl lg:text-[2.1rem] ${
              isBrand ? "text-white" : "text-brand"
            }`}
          >
            {title}
          </h2>
          <p
            className={`mt-4 text-base leading-relaxed ${
              isBrand ? "text-white/80" : "text-ink-muted"
            }`}
          >
            {text}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={href}
              className={`group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                isBrand
                  ? "bg-accent text-brand-dark hover:bg-white"
                  : "bg-brand text-white hover:bg-brand-dark"
              }`}
            >
              {ctaLabel}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            {secondaryHref && secondaryLabel && (
              <Link
                href={secondaryHref}
                className={`inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-colors ${
                  isBrand
                    ? "border-white/30 text-white hover:bg-white hover:text-brand"
                    : "border-hairline text-brand hover:border-brand hover:bg-surface"
                }`}
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>

        {/* Puntenpaneel */}
        <div
          className={reverse ? "lg:order-1" : undefined}
          data-reveal
          style={{ ["--reveal-delay" as string]: "100ms" }}
        >
          <div
            className={`overflow-hidden rounded-3xl border ${
              image ? "" : "p-6 sm:p-7"
            } ${
              isBrand
                ? "border-white/12 bg-white/[0.07] backdrop-blur-sm"
                : "border-hairline bg-surface shadow-soft"
            }`}
          >
            {image && (
              <Photo
                image={image}
                ratio="aspect-[16/10]"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            )}

            <div className={image ? "p-6 sm:p-7" : "contents"}>
            {badge && (
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                  isBrand
                    ? "bg-accent text-brand-dark"
                    : "bg-brand text-white"
                }`}
              >
                {badge}
              </span>
            )}

            {visualKey && (
              <div className={badge ? "mt-5" : ""}>
                <SpotlightVisual visualKey={visualKey} />
              </div>
            )}

            {/* Met foto én visual zijn de bullets overbodig: dat zou
                dezelfde boodschap een derde keer vertellen. */}
            {!(image && visualKey) && panelTitle && (
              <p
                className={`font-display text-sm font-bold uppercase tracking-wide ${
                  badge || visualKey ? "mt-6" : ""
                } ${isBrand ? "text-accent" : "text-brand-light"}`}
              >
                {panelTitle}
              </p>
            )}

            {!(image && visualKey) && (
            <ul
              className={`space-y-3 ${
                badge || panelTitle || visualKey ? "mt-4" : ""
              }`}
            >
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                      isBrand ? "bg-accent text-brand-dark" : "bg-accent-soft text-brand"
                    }`}
                  >
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span
                    className={`text-sm leading-relaxed ${
                      isBrand ? "text-white/85" : "text-ink"
                    }`}
                  >
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
            )}

            {panelNote && (
              <p
                className={`${image && visualKey ? "mt-5" : "mt-5 border-t pt-4"} text-sm leading-relaxed ${
                  isBrand
                    ? "border-white/10 text-white/70"
                    : "border-hairline text-ink-muted"
                }`}
              >
                {panelNote}
              </p>
            )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
