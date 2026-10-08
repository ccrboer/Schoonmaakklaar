"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const KEY = "sck-consent-v1";
const CHANGE = "sck-consent-changed";
const OPEN = "sck-open-consent";

type Choice = { version: 1; analytics: boolean; marketing: boolean };
type ConsentWindow = Window & {
  gtag?: (command: string, action: string, settings: Record<string, string>) => void;
};

function parseConsent(raw: string): Choice | null {
  try {
    const parsed = JSON.parse(raw) as Partial<Choice>;
    if (parsed?.version === 1 &&
        typeof parsed.analytics === "boolean" &&
        typeof parsed.marketing === "boolean") {
      return { version: 1, analytics: parsed.analytics, marketing: parsed.marketing };
    }
  } catch { /* geen geldige voorkeur */ }
  return null;
}
function subscribe(cb: () => void) {
  window.addEventListener(CHANGE, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CHANGE, cb);
    window.removeEventListener("storage", cb);
  };
}
function snapshot() {
  try { return localStorage.getItem(KEY) || "unset"; }
  catch { return "unset"; }
}
function serverSnapshot() { return "loading"; }

function saveConsent(analytics: boolean, marketing: boolean) {
  try { localStorage.setItem(KEY, JSON.stringify({ version: 1, analytics, marketing })); }
  catch { /* browser blokkeert lokale opslag */ }
  const w = window as ConsentWindow;
  w.gtag?.("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: marketing ? "granted" : "denied",
    ad_user_data: marketing ? "granted" : "denied",
    ad_personalization: marketing ? "granted" : "denied",
  });
  window.dispatchEvent(new Event(CHANGE));
}

export function CookieConsent() {
  const raw = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const current = parseConsent(raw);
  const [reopened, setReopened] = useState(false);
  const [manage, setManage] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    function open() {
      const c = parseConsent(snapshot());
      setAnalytics(c?.analytics ?? false);
      setMarketing(c?.marketing ?? false);
      setManage(true);
      setReopened(true);
    }
    window.addEventListener(OPEN, open);
    return () => window.removeEventListener(OPEN, open);
  }, []);

  if (raw === "loading" || (current && !reopened)) return null;

  function save(a: boolean, m: boolean) {
    saveConsent(a, m);
    setReopened(false);
    setManage(false);
  }

  return (
    <section
      aria-label="Cookievoorkeuren"
      className="fixed inset-x-4 bottom-24 z-[100] mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-2xl sm:p-6 lg:bottom-5"
    >
      <h2 className="font-display text-lg font-bold">Uw privacy en cookies</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">
        Noodzakelijke functies blijven beschikbaar. U beslist of we Google Analytics
        en marketingmetingen mogen gebruiken. U kunt uw keuze altijd aanpassen.
      </p>
      {manage && (
        <div className="mt-4 space-y-3 rounded-xl bg-slate-50 p-4 text-sm">
          <div className="flex justify-between gap-4">
            <span>Noodzakelijk</span><strong>Altijd actief</strong>
          </div>
          <label className="flex cursor-pointer justify-between gap-4">
            <span>Analyse (Google Analytics)</span>
            <input type="checkbox" checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="h-5 w-5 accent-teal-700" />
          </label>
          <label className="flex cursor-pointer justify-between gap-4">
            <span>Marketing en advertenties</span>
            <input type="checkbox" checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="h-5 w-5 accent-teal-700" />
          </label>
        </div>
      )}
      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" onClick={() => save(true, true)}
          className="rounded-xl bg-teal-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-900">
          Alles accepteren
        </button>
        <button type="button" onClick={() => save(false, false)}
          className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold hover:bg-slate-100">
          Alleen noodzakelijk
        </button>
        {manage ? (
          <button type="button" onClick={() => save(analytics, marketing)}
            className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold hover:bg-slate-100">
            Voorkeuren opslaan
          </button>
        ) : (
          <button type="button" onClick={() => {
            setAnalytics(current?.analytics ?? false);
            setMarketing(current?.marketing ?? false);
            setManage(true);
          }}
            className="rounded-xl px-3 py-2.5 text-sm font-semibold underline underline-offset-2">
            Voorkeuren beheren
          </button>
        )}
      </div>
      <p className="mt-3 text-xs text-slate-600">
        Lees het <a href="/cookiebeleid" className="underline">cookiebeleid</a>
        {" "}en <a href="/privacybeleid" className="underline">privacybeleid</a>.
      </p>
    </section>
  );
}
