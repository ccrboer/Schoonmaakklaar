import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Manrope } from "next/font/google";
import { siteConfig } from "@/config/site";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { ScrollReveal } from "@/components/ux/ScrollReveal";
import {
  GoogleTagManager,
  GoogleTagManagerNoScript,
  gtmId,
} from "@/components/analytics/GoogleTagManager";
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

// Meet-ID komt uit de omgeving. Zonder ID wordt er niets geladen of gemeten.
//
// Deze directe gtag-koppeling is er nog van vóór Google Tag Manager. Staat er
// een GTM-container ingesteld, dan laadt gtag.js hier bewust NIET: dat zou
// naast de container een tweede meetpad opleveren en, zodra er in GTM een
// GA4-tag staat, elke paginaweergave dubbel tellen.
const gtagId = gtmId ? undefined : process.env.NEXT_PUBLIC_GTAG_ID;

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
      <body className="flex min-h-full flex-col">
        <GoogleTagManagerNoScript />
        <OrganizationJsonLd />
        <ScrollReveal />
        {children}

        <GoogleTagManager />

        {gtagId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gtagId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
