/**
 * Minimale, veilige tracking-helper. Er wordt niets geladen of verstuurd
 * zolang er geen meet-ID in de omgeving staat (NEXT_PUBLIC_GTAG_ID), zodat
 * de site lokaal en zonder analytics gewoon werkt.
 */

export type TrackEvent =
  | "offerte_submit"
  | "phone_click"
  | "whatsapp_click"
  | "email_click"
  // Advertentie-landingspagina's
  | "landing_page_view"
  | "primary_cta_click"
  | "form_start"
  | "form_submit_success"
  | "photo_upload"
  | "intake_requested";

type GtagWindow = Window & {
  gtag?: (command: string, event: string, params?: Record<string, unknown>) => void;
};

/** Stuurt een event naar gtag als dat geladen is. Faalt nooit hard. */
export function trackEvent(
  event: TrackEvent,
  params?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;
  const gtag = (window as GtagWindow).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", event, params);
}
