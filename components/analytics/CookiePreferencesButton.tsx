"use client";

export function CookiePreferencesButton() {
  return (
    <button type="button"
      onClick={() => window.dispatchEvent(new Event("sck-open-consent"))}
      className="text-left underline underline-offset-2 transition-colors hover:text-white">
      Cookievoorkeuren
    </button>
  );
}
