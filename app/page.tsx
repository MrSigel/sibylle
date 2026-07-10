import { HeroSection } from "@/components/sibylle/HeroSection";
import { TrustStrip } from "@/components/sibylle/TrustStrip";
import { EditorialSection } from "@/components/sibylle/EditorialSection";
import { EmotionalPatternCards } from "@/components/sibylle/EmotionalPatternCards";
import { ThemeCards } from "@/components/sibylle/ThemeCards";
import { TestimonialMarquee } from "@/components/sibylle/TestimonialMarquee";
import { AboutSibylle } from "@/components/sibylle/AboutSibylle";
import { MethodStory } from "@/components/sibylle/MethodStory";
import { InstagramSection } from "@/components/sibylle/InstagramSection";
import { NewsletterSection } from "@/components/sibylle/NewsletterSection";
import { PublicBookingCalendar } from "@/components/sibylle/PublicBookingCalendar";
import { FAQAccordion } from "@/components/sibylle/FAQAccordion";
import { ClosingCTA } from "@/components/sibylle/ClosingCTA";
import { pageMetadata } from "@/lib/sibylle/metadata";

export const metadata = pageMetadata({
  // The root segment does NOT inherit the layout's title template, so the brand
  // is included explicitly here (unlike child pages).
  title: "Systemische Aufstellung Aschaffenburg & Online | Sibylle Bergold",
  description: "Systemische Aufstellung, Coaching und freie Erstgespräche mit Sibylle Bergold. Beziehungsmuster und Familienmuster online oder in Aschaffenburg klären.",
  path: "/",
  keywords: ["Systemische Aufstellung", "Familienaufstellung", "Systemisches Coaching", "Aschaffenburg", "Beziehungsmuster lösen"],
});

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
      <InstagramSection />
      <PublicBookingCalendar />
      <NewsletterSection />
      <FAQAccordion />
      <ClosingCTA />
    </main>
  );
}
