import { AboutSection } from "@/components/sections/AboutSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { BreadcrumbHeader } from "@/components/ui/BreadcrumbHeader";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#171717]">
      <BreadcrumbHeader
        badge="Aura Heritage"
        title="About"
        titleHighlight="Us"
        breadcrumbs={[{ label: "About", active: true }]}
      />
      <AboutSection />
      <WhyChooseUsSection />
    </main>
  );
}
