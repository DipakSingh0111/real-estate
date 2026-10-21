import { BreadcrumbHeader } from "@/components/ui/BreadcrumbHeader";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#171717]">
      <BreadcrumbHeader
        badge="Landmark Portfolio"
        title="Latest"
        titleHighlight="Project"
        breadcrumbs={[{ label: "Projects", active: true }]}
      />
      <ProjectsSection />
    </main>
  );
}
