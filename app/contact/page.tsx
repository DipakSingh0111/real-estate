import { BreadcrumbHeader } from "@/components/ui/BreadcrumbHeader";
import { ContactSection } from "@/components/sections/ContactSection";
import { getEstateSections } from "@/lib/estate";

export default function ContactPage() {
  const sections = getEstateSections();
  const contactVariant = sections.ContactPage?.variants?.AuraEstatesContactPage1;

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#171717]">
      <BreadcrumbHeader
        badge={contactVariant?.badge || "Direct Advisory"}
        title="Contact"
        titleHighlight="Us"
        breadcrumbs={[{ label: "Contact Us", active: true }]}
      />
      <ContactSection data={contactVariant} />
    </main>
  );
}
