import { HeroSection } from "@/components/sibylle/HeroSection";
import { TrustStrip } from "@/components/sibylle/TrustStrip";
import { EditorialSection } from "@/components/sibylle/EditorialSection";
import { EmotionalPatternCards } from "@/components/sibylle/EmotionalPatternCards";
import { ThemeCards } from "@/components/sibylle/ThemeCards";
import { TestimonialMarquee } from "@/components/sibylle/TestimonialMarquee";
import { AboutSibylle } from "@/components/sibylle/AboutSibylle";
import { MethodStory } from "@/components/sibylle/MethodStory";
import { FAQAccordion } from "@/components/sibylle/FAQAccordion";
import { ClosingCTA } from "@/components/sibylle/ClosingCTA";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TrustStrip />
      <EditorialSection />
      <EmotionalPatternCards />
      <ThemeCards />
      <TestimonialMarquee />
      <AboutSibylle />
      <MethodStory />
      <FAQAccordion />
      <ClosingCTA />
    </main>
  );
}
