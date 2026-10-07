"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { readAttribution } from "@/lib/attribution";

interface TrackLandingPageProps {
  landingPage: string;
  dienst: string;
}

/**
 * Meldt één keer dat deze advertentiepagina bekeken is, met de herkomst erbij.
 *
 * De gezien-markering staat buiten de component. Daardoor vuurt het event ook
 * niet dubbel wanneer React de component opnieuw aankoppelt — iets wat in
 * ontwikkelmodus standaard gebeurt en anders elk cijfer zou verdubbelen.
 */
const reported = new Set<string>();

export function TrackLandingPage({
  landingPage,
  dienst,
}: TrackLandingPageProps) {
  useEffect(() => {
    if (reported.has(landingPage)) return;
    reported.add(landingPage);

    const attribution = readAttribution();
    trackEvent("landing_page_view", {
      brand: "schoonmaakklaar",
      lead_type: "ppc",
      service: dienst,
      landing_page: landingPage,
      utm_source: attribution.utmSource || undefined,
      utm_medium: attribution.utmMedium || undefined,
      utm_campaign: attribution.utmCampaign || undefined,
      utm_content: attribution.utmContent || undefined,
      utm_term: attribution.utmTerm || undefined,
      gclid: attribution.gclid || undefined,
    });
  }, [landingPage, dienst]);

  return null;
}
