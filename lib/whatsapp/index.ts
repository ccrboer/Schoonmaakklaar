/**
 * Helpers for building WhatsApp click-to-chat links (wa.me).
 *
 * @see https://faq.whatsapp.com/5913398998672934
 */

export interface WhatsAppLinkOptions {
  /**
   * Recipient number in international format, digits only (no +, spaces or
   * dashes), e.g. "32470000000".
   */
  phone: string;
  /** Optional pre-filled message. */
  message?: string;
}

/**
 * Build a wa.me click-to-chat URL with an optional pre-filled message.
 *
 * @example
 * buildWhatsAppLink({ phone: "32470000000", message: "Hallo!" })
 * // -> "https://wa.me/32470000000?text=Hallo%21"
 */
export function buildWhatsAppLink({
  phone,
  message,
}: WhatsAppLinkOptions): string {
  const digits = phone.replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/**
 * Convenience helper that builds a WhatsApp link for a specific service
 * enquiry, with a sensible default message.
 */
export function serviceWhatsAppLink(
  phone: string,
  serviceTitle: string,
): string {
  return buildWhatsAppLink({
    phone,
    message: `Hallo, ik heb een vraag over ${serviceTitle}.`,
  });
}
