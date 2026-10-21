import { GsapEffects } from "@/components/animations/GsapEffects";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { FeaturedListings } from "@/components/sections/FeaturedListings";
import { AboutSection } from "@/components/sections/AboutSection";
import { CitySection } from "@/components/sections/CitySection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { BlogSection } from "@/components/sections/BlogSection";
import estateData from "@/data/properties.json";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F4EE] flex flex-col text-[#171717]">
      <GsapEffects />

      {/* Hero */}
      <HeroSection slides={estateData.hero.slides} />

      {/* Featured Properties */}
      <FeaturedListings
        title={estateData.featuredListings.title}
        listings={estateData.featuredListings.items}
        footerCredit={estateData.footer.credit}
      />

      {/* About Us */}
      <AboutSection />

      {/* Explore by City */}
      <CitySection data={estateData.citySection} />

      {/* Stats */}
      <StatsSection />

      {/* Testimonials */}
      <TestimonialsSection data={estateData.testimonials} />

      {/* Blog */}
      <BlogSection />
    </main>
  );
}
