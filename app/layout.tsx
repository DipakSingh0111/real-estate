import { Suspense } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { getEstateSections } from "@/lib/estate";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://auraestates.com"),
  title: "Aura Estates | Ultra-Luxury Real Estate & Private Sanctuaries",
  description:
    "Curators of the world's most distinguished architectural estates, waterfront villas, and private enclaves.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const sections = getEstateSections();

  return (
    <html
      lang="en"
      className="antialiased selection:bg-[#B8945A]/20 selection:text-[#171717]"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F7F4EE] text-[#171717] font-sans">
        <SmoothScroll>
          <Suspense fallback={null}>
            <Navbar data={sections.Header?.variants?.AuraEstatesHeader1} />
          </Suspense>
          {children}
          <Footer
            data={sections.Footer?.variants?.AuraEstatesFooter1}
            logo={sections.Header?.variants?.AuraEstatesHeader1?.logo}
          />
        </SmoothScroll>
      </body>
    </html>
  );
}
