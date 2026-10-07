import Link from "next/link";
import { siteConfig } from "@/config/site";

/**
 * Minimale voet voor advertentiepagina's: geen sitemenu, enkel wat er
 * wettelijk hoort te staan. De juridische links zijn de enige uitgangen op
 * de pagina en blijven daarom bewust klein.
 */
export function PpcFooter() {
  const { contact } = siteConfig;
  const year = new Date().getFullYear();

  const legal = [
    { label: "Privacybeleid", href: "/privacybeleid" },
    { label: "Cookiebeleid", href: "/cookiebeleid" },
    { label: "Algemene voorwaarden", href: "/algemene-voorwaarden" },
  ];

  return (
    <footer className="border-t border-hairline bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-8 text-xs text-ink-muted sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {contact.legalName}
            {(contact.companyNumber || contact.vat) && (
              <>
                {" · "}
                {[
                  contact.companyNumber &&
                    `Ondernemingsnummer ${contact.companyNumber}`,
                  contact.vat && `BTW ${contact.vat}`,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </>
            )}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
            {legal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 max-w-2xl leading-relaxed">
          {contact.serviceArea} · {contact.openingHours}
        </p>
      </div>
    </footer>
  );
}
