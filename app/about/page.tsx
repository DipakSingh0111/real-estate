import { AboutSection } from "@/components/sections/AboutSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { BreadcrumbHeader } from "@/components/ui/BreadcrumbHeader";
import { getEstateSections } from "@/lib/estate";

export default function AboutPage() {
  const sections = getEstateSections();

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#171717]">
      <BreadcrumbHeader
        badge="Aura Heritage"
        title="About"
        titleHighlight="Us"
        breadcrumbs={[{ label: "About", active: true }]}
      />
      <AboutSection data={sections.AboutUs?.variants?.AuraEstatesAboutUs1} />
      <WhyChooseUsSection data={sections.WhyChooseUs?.variants?.AuraEstatesWhyChooseUs1} />
    </main>
  );
}
