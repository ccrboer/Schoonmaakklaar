/**
 * Layout voor de advertentie-landingspagina's onder /lp.
 *
 * Bewust los van de marketinglayout: geen navigatiemenu en geen uitgebreide
 * voet. Elke pagina brengt zelf haar eigen kop, vaste mobiele balk en voet
 * mee, omdat die de boodschap van de funnel dragen (WhatsApp-tekst, CTA).
 */
export default function PpcLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // De extra ruimte onderaan houdt de inhoud — inclusief de voet — vrij van
  // de vaste mobiele balk, safe area meegerekend.
  return (
    <div className="flex min-h-full flex-col pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-0">
      {children}
    </div>
  );
}
