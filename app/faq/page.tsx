import { FaqSection } from "@/components/sections/FaqSection";
import { BreadcrumbHeader } from "@/components/ui/BreadcrumbHeader";

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#171717]">
      <BreadcrumbHeader
        badge="Faq's"
        title="Faq's"
        breadcrumbs={[{ label: "Faq", active: true }]}
      />
      <FaqSection />
    </main>
  );
}
