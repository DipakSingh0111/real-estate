import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PropertyListing } from "@/types/estate";
import { PropertyDetailsClient } from "@/components/sections/PropertyDetailsClient";
import estateJsonData from "@/data/properties.json";

// Direct Property Details Data from properties.json
export const propertiesDetailsData: PropertyListing[] = (estateJsonData?.featuredListings?.items || []) as unknown as PropertyListing[];

interface PropertyPageProps {
  params:
    | Promise<{
        title: string;
      }>
    | {
        title: string;
      };
}

function matchesTitle(propertyTitle: string, inputTitle: string): boolean {
  if (!propertyTitle || !inputTitle) return false;
  const decoded = decodeURIComponent(inputTitle).toLowerCase().trim();
  const titleLower = propertyTitle.toLowerCase().trim();
  const slug = titleLower.replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
  const inputSlug = decoded.replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

  return decoded === titleLower || decoded === slug || inputSlug === slug;
}

export async function generateStaticParams() {
  return propertiesDetailsData.map((property) => ({
    title: property.title,
  }));
}

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const rawTitle = resolvedParams?.title || "";

  const property = propertiesDetailsData.find((item) =>
    matchesTitle(item.title, rawTitle),
  );

  if (!property) {
    return {
      title: "Property Details | Aura Estates",
    };
  }

  return {
    title: `${property.title} | ${property.location} - Aura Estates`,
    description:
      property.description ||
      `Explore ${property.title} in ${property.location}. Offered at ${property.price}. Exclusive luxury residence by Aura Estates.`,
    openGraph: {
      title: `${property.title} | Aura Estates`,
      description:
        property.description || `Luxury property in ${property.location}`,
      images: [
        {
          url: property.image,
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
    },
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const rawTitle = resolvedParams?.title || "";

  // Find property by Title directly from local array
  let property = propertiesDetailsData.find((item) =>
    matchesTitle(item.title, rawTitle),
  );

  // Fallback: match by ID if numeric passed
  if (!property && rawTitle) {
    property = propertiesDetailsData.find((item) => item.id === rawTitle);
  }

  // Graceful fallback
  if (!property) {
    property = propertiesDetailsData[0];
  }

  const similarProperties = propertiesDetailsData.filter(
    (item) => item.id !== property.id,
  );

  return (
    <main>
      <PropertyDetailsClient
        property={property}
        similarProperties={similarProperties}
      />
    </main>
  );
}
