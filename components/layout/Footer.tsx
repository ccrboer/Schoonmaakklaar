import Link from "next/link";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import { siteConfig, partnerSites } from "@/config/site";
import { footerNav } from "@/config/navigation";
import { CallButton } from "@/components/conversion/CallButton";
import { MailLink } from "@/components/conversion/MailLink";
import { Logo } from "@/components/layout/Logo";
import { CookiePreferencesButton } from "@/components/analytics/CookiePreferencesButton";

/**
 * Footer met merkblok, contactgegevens, navigatiekolommen en de juridische
 * regel. Donker petrolblauw vlak, zodat de pagina duidelijk afsluit.
 */
export function Footer() {
  const { contact } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-brand text-white/75">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Merk + contact */}
          <div className="space-y-5 md:col-span-2 lg:col-span-1">
            <Logo tone="light" />
            <p className="text-sm leading-relaxed">{siteConfig.tagline}.</p>

            <ul className="space-y-2.5 text-sm">
              {contact.phoneE164 && (
                <li>
                  <CallButton
                    variant="light"
                    className="w-full border-white/25 px-4 py-2.5 text-sm sm:w-auto"
                  />
                </li>
              )}
              {contact.email && (
                <li>
                  <MailLink className="transition-colors hover:text-white" />
                </li>
              )}
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{contact.serviceArea}</span>
              </li>
              {contact.openingHours && (
                <li className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{contact.openingHours}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Navigatiekolommen */}
          {footerNav.map((group) => (
            <div key={group.title}>
              <h2 className="font-display text-sm font-bold uppercase tracking-wide text-white">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {group.items.map((item) => (
                  <li key={`${group.title}-${item.href}`}>
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Partnermerken */}
        {partnerSites.length > 0 && (
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
            <p className="font-display text-sm font-bold text-white">
              Ook nodig voor uw pand?
            </p>
            <ul className="mt-3 flex flex-wrap gap-3">
              {partnerSites.map((partner) => (
                <li key={partner.href}>
                  <a
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm transition-colors hover:border-white/50 hover:text-white"
                  >
                    <span className="font-semibold text-white">
                      {partner.name}
                    </span>
                    <span className="hidden sm:inline">
                      {partner.description}
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {contact.legalName}. Alle rechten voorbehouden.
          </p>
          <CookiePreferencesButton />
          {(contact.companyNumber || contact.vat) && (
            <p>
              {[
                contact.legalName,
                contact.companyNumber && `Ondernemingsnummer ${contact.companyNumber}`,
                contact.vat && `BTW ${contact.vat}`,
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
