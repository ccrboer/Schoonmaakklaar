"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown, ArrowRight } from "lucide-react";
import { mainNav, headerCta } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

/**
 * Site-header. Mobiel: een compacte balk met hamburgermenu waarin de diensten
 * uitklappen. Desktop: inline navigatie met een dienstenmenu, het
 * telefoonnummer en de offerte-CTA.
 */
export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Menu's sluiten bij een paginawissel. Bewust tijdens de render en niet in
  // een effect, zodat er geen extra render-cyclus met een open menu ontstaat.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }

  // Dienstenmenu sluiten bij Escape of een klik buiten het menu.
  useEffect(() => {
    if (!servicesOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setServicesOpen(false);
    }
    function onPointerDown(event: PointerEvent) {
      if (!servicesRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [servicesOpen]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-hairline bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
        <Link
          href="/"
          aria-label={`${siteConfig.name} — naar de homepage`}
          onClick={() => setMobileOpen(false)}
        >
          <Logo />
        </Link>

        {/* Desktopnavigatie */}
        <nav className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) =>
            item.children?.length ? (
              <div key={item.href} className="relative" ref={servicesRef}>
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  onClick={() => setServicesOpen((open) => !open)}
                  className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface hover:text-brand"
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-ink-muted transition-transform",
                      servicesOpen && "rotate-180",
                    )}
                    aria-hidden="true"
                  />
                </button>

                {servicesOpen && (
                  <div className="absolute left-1/2 top-full z-50 mt-2 w-[42rem] -translate-x-1/2 rounded-2xl border border-hairline bg-white p-3 shadow-elevated">
                    <ul className="grid grid-cols-2 gap-1">
                      {item.children.map((child) => {
                        const Icon = child.icon;
                        return (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-surface"
                            >
                              {Icon && (
                                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                                  <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                                </span>
                              )}
                              <span className="min-w-0">
                                <span className="block text-sm font-semibold text-brand">
                                  {child.label}
                                </span>
                                {child.description && (
                                  <span className="mt-0.5 block text-xs leading-relaxed text-ink-muted">
                                    {child.description}
                                  </span>
                                )}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                    <Link
                      href={item.href}
                      className="mt-1 flex items-center justify-between gap-2 rounded-xl bg-surface px-4 py-3 text-sm font-semibold text-brand transition-colors hover:bg-surface-alt"
                    >
                      Bekijk alle diensten
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface hover:text-brand"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        {/* Desktop-CTA's */}
        <div className="hidden items-center gap-3 lg:flex">
          {siteConfig.contact.phoneE164 && (
            <a
              href={`tel:${siteConfig.contact.phoneE164}`}
              onClick={() => trackEvent("phone_click")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-light"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {siteConfig.contact.phone}
            </a>
          )}
          <Link
            href={headerCta.href}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-dark"
          >
            {headerCta.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Mobiele schakelaar */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-brand transition-colors hover:bg-surface lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobiel-menu"
          aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobiel menu */}
      <div
        id="mobiel-menu"
        className={cn(
          "lg:hidden",
          mobileOpen
            ? "block max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-hairline bg-white"
            : "hidden",
        )}
      >
        <nav className="space-y-1 px-4 pb-6 pt-3">
          {mainNav.map((item) =>
            item.children?.length ? (
              <div key={item.href}>
                <button
                  type="button"
                  aria-expanded={mobileServicesOpen}
                  onClick={() => setMobileServicesOpen((open) => !open)}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-surface"
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-ink-muted transition-transform",
                      mobileServicesOpen && "rotate-180",
                    )}
                    aria-hidden="true"
                  />
                </button>
                {mobileServicesOpen && (
                  <ul className="mb-1 space-y-0.5 border-l-2 border-accent-soft pl-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block rounded-lg px-3 py-2.5 text-[0.95rem] text-ink-muted hover:bg-surface hover:text-brand"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href={item.href}
                        className="block rounded-lg px-3 py-2.5 text-[0.95rem] font-semibold text-brand hover:bg-surface"
                      >
                        Alle diensten
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-surface hover:text-brand"
              >
                {item.label}
              </Link>
            ),
          )}

          <div className="space-y-2 pt-3">
            <Link
              href={headerCta.href}
              className="flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 text-base font-semibold text-white"
            >
              {headerCta.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            {siteConfig.contact.phoneE164 && (
              <a
                href={`tel:${siteConfig.contact.phoneE164}`}
                onClick={() => trackEvent("phone_click")}
                className="flex items-center justify-center gap-2 rounded-full border-2 border-brand px-5 py-3 text-base font-semibold text-brand"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {siteConfig.contact.phone}
              </a>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
