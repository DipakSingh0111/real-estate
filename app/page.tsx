import { GsapEffects } from "@/components/animations/GsapEffects";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedListings } from "@/components/sections/FeaturedListings";
import { AboutSection } from "@/components/sections/AboutSection";
import { CitySection } from "@/components/sections/CitySection";
import { StatsSection } from "@/components/sections/StatsSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { getEstateSections } from "@/lib/estate";

export default function Home() {
  const sections = getEstateSections();

  return (
    <main className="min-h-screen bg-[#F7F4EE] flex flex-col text-[#171717]">
      <GsapEffects />

      {/* Hero */}
      <HeroSection
        data={sections?.HeroBanner?.variants?.AuraEstatesHeroBanner1}
      />

      {/* Featured Properties */}
      <FeaturedListings
        data={sections?.Listings?.variants?.AuraEstatesListings1}
      />

      {/* About Us */}
      <AboutSection data={sections?.AboutUs?.variants?.AuraEstatesAboutUs1} />

      {/* Explore by City */}
      <CitySection data={sections?.Cities?.variants?.AuraEstatesCities1} />

      {/* Stats */}
      <StatsSection data={sections?.Stats?.variants?.AuraEstatesStats1} />

      {/* Testimonials */}
      <TestimonialsSection
        data={sections?.Testimonials?.variants?.AuraEstatesTestimonials1}
      />

      {/* Blog */}
      <BlogSection data={sections?.BlogNews?.variants?.AuraEstatesBlogNews1} />
    </main>
  );
}
