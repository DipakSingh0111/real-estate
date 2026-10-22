import { BreadcrumbHeader } from "@/components/ui/BreadcrumbHeader";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { getEstateSections } from "@/lib/estate";

export default function ServicesPage() {
  const sections = getEstateSections();

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#171717]">
      <BreadcrumbHeader
        badge="Bespoke Capabilities"
        title="Services"
        breadcrumbs={[{ label: "Services", active: true }]}
      />
      <ServicesSection data={sections.Services?.variants?.AuraEstatesServices1} />
    </main>
  );
}
