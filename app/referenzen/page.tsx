import { Metadata } from 'next';
import { ReferenzenClient } from './ReferenzenClient';

export const metadata: Metadata = {
  title: "Erfahrungen & Referenzen | Sibylle Bergold",
  description: "Was Klienten über die systemische Arbeit mit Sibylle Bergold sagen. Authentische Einblicke in Prozesse und Transformationen.",
  keywords: ["Erfahrungen Systemaufstellung", "Referenzen Coaching", "Sibylle Bergold Bewertungen", "Klientenfeedback"],
};

export default function ReferenzenPage() {
  return <ReferenzenClient />;
}
