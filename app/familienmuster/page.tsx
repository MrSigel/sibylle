import { FamilienmusterClient } from './FamilienmusterClient';
import { pageMetadata } from '@/lib/sibylle/metadata';

export const metadata = pageMetadata({
  title: "Familienmuster erkennen & lösen",
  description: "Entdecke, wie Familienmuster dein Leben beeinflussen. Systemische Aufstellungen helfen dir, Ahnenlinien zu verstehen und Freiheit in Verantwortung zu finden.",
  path: "/familienmuster",
  keywords: ["Familienmuster", "Ahnenlinie", "Familiendynamik", "Systemische Familienaufstellung", "Muster lösen"],
});

export default function FamilienmusterPage() {
  return <FamilienmusterClient />;
}
