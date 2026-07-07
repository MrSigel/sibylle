import { ReferenzenClient } from './ReferenzenClient';
import { pageMetadata } from '@/lib/sibylle/metadata';

export const metadata = pageMetadata({
  title: "Erfahrungen & Referenzen",
  description: "Was Klienten über die systemische Arbeit mit Sibylle Bergold sagen. Einblicke in Prozesse und persönliche Entwicklung.",
  path: "/referenzen",
  keywords: ["Erfahrungen Systemaufstellung", "Referenzen Coaching", "Sibylle Bergold Bewertungen", "Klientenfeedback"],
});

export default function ReferenzenPage() {
  return <ReferenzenClient />;
}
