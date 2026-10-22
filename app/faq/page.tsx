import { FaqSection } from "@/components/sections/FaqSection";
import { BreadcrumbHeader } from "@/components/ui/BreadcrumbHeader";
import { getEstateSections } from "@/lib/estate";

export default function FaqPage() {
  const sections = getEstateSections();

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#171717]">
      <BreadcrumbHeader
        badge="Faq's"
        title="Faq's"
        breadcrumbs={[{ label: "Faq", active: true }]}
      />
      <FaqSection data={sections.Faq?.variants?.AuraEstatesFaq1} />
    </main>
  );
}
