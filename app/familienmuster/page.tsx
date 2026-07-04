import { Metadata } from 'next';
import { FamilienmusterClient } from './FamilienmusterClient';

export const metadata: Metadata = {
  title: "Familienmuster erkennen & lösen | Sibylle Bergold",
  description: "Entdecke, wie Familienmuster dein Leben beeinflussen. Systemische Aufstellungen helfen dir, Ahnenlinien zu verstehen und Freiheit in Verantwortung zu finden.",
  keywords: ["Familienmuster", "Ahnenlinie", "Familiendynamik", "Systemische Familienaufstellung", "Muster lösen"],
};

export default function FamilienmusterPage() {
  return <FamilienmusterClient />;
}
