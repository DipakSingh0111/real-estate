import { Suspense } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://auraestates.com"),
  title: "Aura Estates | Ultra-Luxury Real Estate & Private Sanctuaries",
  description:
    "Curators of the world's most distinguished architectural estates, waterfront villas, and private enclaves.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="h-full antialiased selection:bg-[#B8945A]/20 selection:text-[#171717]"
    >
      <body className="min-h-full flex flex-col bg-[#F7F4EE] text-[#171717] font-sans">
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        {children}
        <Footer />
      </body>
    </html>
  );
}
