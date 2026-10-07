import { Info, Check } from "lucide-react";
import { siteConfig } from "@/config/site";
import { WhatsAppButton } from "@/components/conversion/WhatsAppButton";
import { MailLink } from "@/components/conversion/MailLink";

/** Eén onderdeel van een juridische pagina. */
export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

interface LegalPageTemplateProps {
  title: string;
  lastUpdated: string;
  intro?: string;
  sections: LegalSection[];
  ctaHeading: string;
}

const DISCLAIMER =
  "Deze pagina is een praktische tekst en vervangt geen juridisch advies. Laat de definitieve versie nakijken door uw boekhouder of juridisch adviseur.";

const CTA_WHATSAPP_MESSAGE =
  "Hallo, ik heb een vraag over jullie voorwaarden of privacybeleid.";

/**
 * Leesbaar template voor de juridische pagina's (privacy, cookies,
 * voorwaarden). Inhoud komt per pagina binnen als secties.
 */
export function LegalPageTemplate({
  title,
  lastUpdated,
  intro,
  sections,
  ctaHeading,
}: LegalPageTemplateProps) {
  const { contact } = siteConfig;

  return (
    <>
      <section className="relative overflow-hidden bg-brand text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_82%_-5%,rgba(43,184,198,0.18),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <h1 className="text-[1.9rem] leading-tight sm:text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-white/70">{lastUpdated}</p>
          {intro && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80">
              {intro}
            </p>
          )}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="flex items-start gap-3 rounded-2xl border border-hairline bg-surface p-5">
            <Info
              className="mt-0.5 h-5 w-5 shrink-0 text-brand-light"
              aria-hidden="true"
            />
            <p className="text-sm leading-relaxed text-ink-muted">
              {DISCLAIMER}
            </p>
          </div>

          <div className="mt-8 space-y-6">
            {sections.map((section, index) => (
              <article
                key={section.heading}
                className="rounded-2xl border border-hairline bg-surface/60 p-6"
              >
                <h2 className="flex items-baseline gap-2 font-display text-lg font-bold text-brand">
                  <span className="text-sm font-bold text-brand-light">
                    {index + 1}.
                  </span>
                  {section.heading}
                </h2>

                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-3 text-sm leading-relaxed text-ink-muted"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.bullets && (
                  <ul className="mt-3 space-y-2">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-muted"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark"
                          aria-hidden="true"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand text-white">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="text-center">
            <h2 className="text-2xl leading-tight sm:text-3xl">{ctaHeading}</h2>
            <p className="mt-3 text-base text-white/80">
              Neem gerust contact op — wij helpen u graag verder.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <WhatsAppButton
                label="Stel uw vraag via WhatsApp"
                message={CTA_WHATSAPP_MESSAGE}
                className="w-full sm:w-auto"
              />
              <MailLink
                label={contact.email}
                className="w-full justify-center rounded-full border border-white/40 px-5 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-brand sm:w-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
