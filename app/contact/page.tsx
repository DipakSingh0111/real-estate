import { BreadcrumbHeader } from "@/components/ui/BreadcrumbHeader";
import { ContactSection } from "@/components/sections/ContactSection";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#171717]">
      <BreadcrumbHeader
        badge="Direct Advisory"
        title="Contact"
        titleHighlight="Us"
        breadcrumbs={[{ label: "Contact Us", active: true }]}
      />
      <ContactSection />
    </main>
  );
}
