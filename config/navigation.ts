import type { NavGroup, NavItem } from "@/types";
import { services } from "./services";
import { localPages } from "./local-pages";

/**
 * Hoofdnavigatie in de header. "Diensten" klapt open met de diensten uit
 * config/services.ts, zodat menu en dienstenaanbod nooit uit elkaar lopen.
 */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Diensten",
    href: "/diensten",
    children: services.map((service) => ({
      label: service.title,
      href: service.href,
      description: service.shortDescription,
      icon: service.icon,
    })),
  },
  { label: "Veelgestelde vragen", href: "/veelgestelde-vragen" },
  { label: "Contact", href: "/contact" },
];

/** De primaire call-to-action in de header. */
export const headerCta: NavItem = {
  label: "Gratis offerte",
  href: "/offerte",
};

/** Footernavigatie, gegroepeerd per kolom. */
export const footerNav: NavGroup[] = [
  {
    title: "Diensten",
    items: services.map((service) => ({
      label: service.title,
      href: service.href,
    })),
  },
  {
    title: "SchoonmaakKlaar",
    items: [
      { label: "Alle diensten", href: "/diensten" },
      { label: "Offerte aanvragen", href: "/offerte" },
      { label: "Veelgestelde vragen", href: "/veelgestelde-vragen" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Regio Antwerpen",
    items: localPages.map((page) => ({
      label: `${page.serviceName} ${page.locationName}`,
      href: page.path,
    })),
  },
  {
    title: "Juridisch",
    items: [
      { label: "Privacybeleid", href: "/privacybeleid" },
      { label: "Cookiebeleid", href: "/cookiebeleid" },
      { label: "Algemene voorwaarden", href: "/algemene-voorwaarden" },
    ],
  },
];
