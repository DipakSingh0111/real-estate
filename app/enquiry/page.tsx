import { BreadcrumbHeader } from "@/components/ui/BreadcrumbHeader";
import { EnquirySection } from "@/components/sections/EnquirySection";

export default function EnquiryPage() {
  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#171717]">
      <BreadcrumbHeader
        badge="Private Client Desk"
        title="Enquiry"
        titleHighlight="Form"
        breadcrumbs={[{ label: "Enquiry", active: true }]}
      />
      <EnquirySection />
    </main>
  );
}
