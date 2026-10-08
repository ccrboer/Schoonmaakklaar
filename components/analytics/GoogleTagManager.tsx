import Script from "next/script";

/**
 * Google Tag Manager.
 *
 * De container-ID komt uit de omgeving, net als de rest van de configuratie
 * van deze site. Zonder ID wordt er niets geladen: lokaal en in previews
 * draait de site dus zonder tracking, tenzij de variabele daar bewust gezet
 * wordt.
 *
 * Het script staat in de root-layout. Die wordt bij client-side navigatie niet
 * opnieuw aangekoppeld, en `next/script` ontdubbelt bovendien op `id`, dus
 * gtm.js wordt per paginabezoek één keer opgehaald — ook wanneer de bezoeker
 * daarna door de site klikt.
 *
 * Deze component plaatst enkel de container. Welke tags daarin vuren, wordt in
 * Google Tag Manager zelf bepaald, niet hier.
 */

/** Container-ID, of undefined wanneer er geen ingesteld is. */
export const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim() || undefined;

export function GoogleTagManager() {
  if (!gtmId) return null;

  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
    </Script>
  );
}

/**
 * Terugval voor bezoekers zonder JavaScript. Hoort volgens Google zo hoog
 * mogelijk in de body te staan.
 */
export function GoogleTagManagerNoScript() {
  if (!gtmId) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
