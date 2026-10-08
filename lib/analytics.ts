/**
 * Site-events gaan als custom events naar de GTM dataLayer.
 * GTM en de Google-tags verwerken deze volgens de ingestelde toestemming.
 */
export type TrackEvent =
  | "offerte_submit"
  | "phone_click"
  | "whatsapp_click"
  | "email_click"
  | "landing_page_view"
  | "primary_cta_click"
  | "form_start"
  | "form_submit_success"
  | "photo_upload"
  | "intake_requested";

type AnalyticsWindow = Window & { dataLayer?: unknown[] };

/** Bevat geen persoonsgegevens. De verzendbeslissing ligt bij GTM. */
export function trackEvent(event: TrackEvent, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const w = window as AnalyticsWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ ...params, event });
}
