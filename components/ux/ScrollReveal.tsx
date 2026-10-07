"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Zet een subtiele reveal-on-scroll op voor alle [data-reveal]-elementen.
 * Werkt met server components (die enkel het attribuut toevoegen) en is
 * volledig veilig zonder JS: de CSS verbergt pas iets nadat dit component
 * `reveal-ready` op <html> zet. Respecteert prefers-reduced-motion.
 *
 * Belangrijk: dit component blijft gemount in de root layout, maar de App
 * Router wisselt pagina's client-side zonder remount. Daarom draaien we het
 * effect opnieuw bij elke route (usePathname) en observeren we telkens de
 * nieuwe, nog niet onthulde elementen. Anders blijven [data-reveal]-blokken
 * op een via-navigatie geopende pagina permanent op opacity:0 staan.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) return;

    root.classList.add("reveal-ready");

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.reveal-in)"),
    );

    if (elements.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      // Fallback: toon alles.
      elements.forEach((el) => el.classList.add("reveal-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    elements.forEach((el) => observer.observe(el));

    // Vangnet: mocht de observer om welke reden dan ook nooit vuren voor een
    // element (bv. een zeer lange sectie die net onder de threshold blijft),
    // dan tonen we alles alsnog. Content mag nooit permanent verborgen blijven.
    const safety = window.setTimeout(() => {
      elements.forEach((el) => el.classList.add("reveal-in"));
    }, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
    };
  }, [pathname]);

  return null;
}
