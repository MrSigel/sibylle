import { faqItems } from '@/lib/sibylle/siteData';
import { pageMetadata } from '@/lib/sibylle/metadata';
import { FaqClient } from './FaqClient';

export const metadata = pageMetadata({
  title: "Häufige Fragen zu Systemaufstellungen",
  description: "Erfahre alles über den Ablauf, die Wirkung und die Anwendungsgebiete von systemischen Aufstellungen in den FAQ von Sibylle Bergold.",
  path: "/faq",
  keywords: ["Systemaufstellung FAQ", "Ablauf Aufstellung", "Coaching Fragen", "Voraussetzungen Aufstellung"],
});

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FaqClient />
    </>
  );
}
