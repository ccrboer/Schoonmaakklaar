import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileBar } from "@/components/layout/StickyMobileBar";

/**
 * Layout voor de publieke marketingpagina's: header, content, footer en een
 * vaste conversiebalk op mobiel. De extra padding onderaan houdt de content
 * vrij van die balk op kleine schermen.
 */
export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {/* De onderruimte zit om main én footer heen, niet enkel om main: de
          vaste balk overlapt anders de laatste regel van de footer. */}
      <div className="flex flex-1 flex-col pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-0">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <StickyMobileBar />
    </>
  );
}
