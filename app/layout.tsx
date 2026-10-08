import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Manrope } from "next/font/google";
import { siteConfig } from "@/config/site";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ScrollReveal } from "@/components/ux/ScrollReveal";
import {
  GoogleTagManager,
  GoogleTagManagerNoScript,
} from "@/components/analytics/GoogleTagManager";
import { CookieConsent } from "@/components/analytics/CookieConsent";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Strakke display-sans voor koppen — modern, zakelijk en goed leesbaar.
// Variabele font: geen expliciete weights, de volledige range is beschikbaar.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

// Consent Mode v2 moet vóór de GTM-container worden ingesteld.
const consentBootstrap = `
window.dataLayer = window.dataLayer || [];
window.gtag = function() { window.dataLayer.push(arguments); };
window.gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
try {
  var c = JSON.parse(localStorage.getItem('sck-consent-v1') || 'null');
  if (c && c.version === 1 && typeof c.analytics === 'boolean' && typeof c.marketing === 'boolean') {
    window.gtag('consent', 'update', {
      analytics_storage: c.analytics ? 'granted' : 'denied',
      ad_storage: c.marketing ? 'granted' : 'denied',
      ad_user_data: c.marketing ? 'granted' : 'denied',
      ad_personalization: c.marketing ? 'granted' : 'denied'
    });
  }
} catch (_) {}
`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        <Script id="consent-v2-default" strategy="beforeInteractive">
          {consentBootstrap}
        </Script>
      </head>
      <body className="flex min-h-full flex-col">
        <GoogleTagManagerNoScript />
        <OrganizationJsonLd />
        <ScrollReveal />
        {children}

        <GoogleTagManager />

        <CookieConsent />
      </body>
    </html>
  );
}
