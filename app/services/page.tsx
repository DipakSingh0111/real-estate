import { BreadcrumbHeader } from "@/components/ui/BreadcrumbHeader";
import { ServicesSection } from "@/components/sections/ServicesSection";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#171717]">
      <BreadcrumbHeader
        badge="Bespoke Capabilities"
        title="Services"
        breadcrumbs={[{ label: "Services", active: true }]}
      />
      <ServicesSection />
    </main>
  );
}
