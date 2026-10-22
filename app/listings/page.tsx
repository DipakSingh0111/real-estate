import { Suspense } from "react";
import { BreadcrumbHeader } from "@/components/ui/BreadcrumbHeader";
import { ListingsGridWithPagination } from "@/components/sections/ListingsGridWithPagination";
import type { PropertyListingItem } from "@/types/realestate.types";
import estateData from "@/data/properties.json";
import { getEstateSections } from "@/lib/estate";

interface ListingsPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function ListingsContent({ searchParams }: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolvedParams = searchParams ? await searchParams : {};
  const cityParam = typeof resolvedParams.city === "string" ? resolvedParams.city : "all";

  const sections = getEstateSections();
  const listings: PropertyListingItem[] = ((sections?.Listings?.variants?.AuraEstatesListings1?.list || (estateData as any)?.featuredListings?.items || []) as unknown) as PropertyListingItem[];
  const rawCities = sections?.Cities?.variants?.AuraEstatesCities1?.list || (estateData as any)?.citySection?.cities || [];
  const availableCities = rawCities.map((c: any) => ({
    name: c.name,
    slug: c.slug || c.name.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-"),
  }));

  const listingsSection = sections?.Listings?.variants?.AuraEstatesListings1;
  const listingsConfig = listingsSection?.listingsConfig;

  return (
    <ListingsGridWithPagination
      listings={listings}
      itemsPerPage={6}
      initialCity={cityParam}
      availableCities={availableCities}
      config={listingsConfig}
    />
  );
}

export default function ListingsPage({ searchParams }: ListingsPageProps) {
  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#171717]">
      <BreadcrumbHeader
        badge="Private Registry"
        title="Curated Luxury"
        titleHighlight="Properties"
        breadcrumbs={[{ label: "Properties", active: true }]}
      />

      <Suspense fallback={<div className="py-20 text-center font-serif text-xl">Loading Residences...</div>}>
        <ListingsContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
