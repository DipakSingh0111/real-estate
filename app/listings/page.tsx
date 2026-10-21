import { Suspense } from "react";
import { BreadcrumbHeader } from "@/components/ui/BreadcrumbHeader";
import { ListingsGridWithPagination } from "@/components/sections/ListingsGridWithPagination";
import { PropertyListing } from "@/types/estate";
import estateData from "@/data/properties.json";

interface ListingsPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
}

async function ListingsContent({ searchParams }: ListingsPageProps) {
  const resolvedParams = searchParams ? await Promise.resolve(searchParams) : {};
  const cityParam = typeof resolvedParams.city === "string" ? resolvedParams.city : "all";

  const listings: PropertyListing[] = (estateData.featuredListings.items as unknown) as PropertyListing[];
  const availableCities = (estateData.citySection?.cities || []).map((c) => ({
    name: c.name,
    slug: c.slug || c.name.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-"),
  }));

  return (
    <ListingsGridWithPagination
      listings={listings}
      itemsPerPage={6}
      initialCity={cityParam}
      availableCities={availableCities}
    />
  );
}

export default function ListingsPage({ searchParams }: ListingsPageProps) {
  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#171717]">
      <BreadcrumbHeader
        badge="Private Registry"
        title="Curated Luxury"
        titleHighlight="Listings"
        breadcrumbs={[{ label: "Listings", active: true }]}
      />

      <Suspense fallback={<div className="py-20 text-center font-serif text-xl">Loading Residences...</div>}>
        <ListingsContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
