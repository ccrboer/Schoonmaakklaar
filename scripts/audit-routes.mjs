/**
 * Route-audit: haalt /sitemap.xml op van een draaiende server, vraagt elke
 * vermelde URL op en meldt alles wat geen 200 teruggeeft. Controleert ook of
 * alle URL's absoluut zijn en op het productiedomein staan.
 *
 * Gebruik:
 *   1. npm run build && npm start   (in één terminal)
 *   2. npm run audit:routes         (in een tweede terminal)
 *
 * Een ander basisadres meegeven kan met AUDIT_BASE, bv.:
 *   AUDIT_BASE=https://schoonmaakklaar.be npm run audit:routes
 */

const BASE = process.env.AUDIT_BASE || "http://localhost:3000";
const EXPECTED_DOMAIN = process.env.EXPECTED_DOMAIN || "https://schoonmaakklaar.be";

async function main() {
  let sitemapRes;
  try {
    sitemapRes = await fetch(`${BASE}/sitemap.xml`);
  } catch (error) {
    console.error(`Kon ${BASE}/sitemap.xml niet bereiken — draait de server?`);
    console.error(String(error));
    process.exit(1);
  }

  if (!sitemapRes.ok) {
    console.error(
      `sitemap.xml gaf ${sitemapRes.status} ${sitemapRes.statusText}`,
    );
    process.exit(1);
  }

  const xml = await sitemapRes.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

  if (locs.length === 0) {
    console.error("sitemap.xml bevatte geen <loc>-items.");
    process.exit(1);
  }

  console.log(`sitemap.xml OK — ${locs.length} URL's gevonden.\n`);

  let failures = 0;
  let badDomain = 0;

  for (const loc of locs) {
    if (!loc.startsWith(EXPECTED_DOMAIN)) {
      console.error(`FOUT DOMEIN  ${loc}`);
      badDomain += 1;
    }
    const path = loc.replace(/^https?:\/\/[^/]+/, "") || "/";
    let status = 0;
    try {
      const res = await fetch(`${BASE}${path}`, { redirect: "manual" });
      status = res.status;
    } catch (error) {
      console.error(`FOUT        ${path} — ${String(error)}`);
      failures += 1;
      continue;
    }
    if (status !== 200) {
      console.error(`FAAL ${status}   ${path}`);
      failures += 1;
    }
  }

  console.log(
    `\n${locs.length} URL's gecontroleerd — ${failures} niet-200, ${badDomain} verkeerd domein.`,
  );
  process.exit(failures === 0 && badDomain === 0 ? 0 : 1);
}

main();
