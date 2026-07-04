import { HeroSection } from "@/components/sibylle/HeroSection";
import { TrustStrip } from "@/components/sibylle/TrustStrip";
import { EditorialSection } from "@/components/sibylle/EditorialSection";
import { EmotionalPatternCards } from "@/components/sibylle/EmotionalPatternCards";
import { ThemeCards } from "@/components/sibylle/ThemeCards";
import { TestimonialMarquee } from "@/components/sibylle/TestimonialMarquee";
import { AboutSibylle } from "@/components/sibylle/AboutSibylle";
import { MethodStory } from "@/components/sibylle/MethodStory";
import { PublicBookingCalendar } from "@/components/sibylle/PublicBookingCalendar";
import { FAQAccordion } from "@/components/sibylle/FAQAccordion";
import { ClosingCTA } from "@/components/sibylle/ClosingCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sibylle Bergold | Systemische Aufstellung München",
  description: "Systemische Aufstellung, Coaching und freie Erstgespräche mit Sibylle Bergold. Beziehungsmuster und Familienmuster online oder in München klären.",
  openGraph: {
    title: "Sibylle Bergold | Systemische Aufstellung München",
    description: "Freie Erstgespräche, systemische Aufstellung und Coaching mit Sibylle Bergold online oder in München.",
    url: "/",
  },
};

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
      <PublicBookingCalendar />
      <FAQAccordion />
      <ClosingCTA />
    </main>
  );
}
