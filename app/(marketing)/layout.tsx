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
      <main className="flex-1 pb-16 lg:pb-0">{children}</main>
      <Footer />
      <StickyMobileBar />
    </>
  );
}
