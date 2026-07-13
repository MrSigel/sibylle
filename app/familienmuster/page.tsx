import { FamilienmusterClient } from './FamilienmusterClient';
import { pageMetadata } from '@/lib/sibylle/metadata';

export const metadata = pageMetadata({
  title: "Familienaufstellung & Familienmuster erkennen und lösen",
  description: "Familienaufstellung mit Sibylle Jutta Bergold: Erkenne, wie Familienmuster dein Leben beeinflussen, verstehe deine Ahnenlinie und finde Freiheit in Verantwortung – in Aschaffenburg oder online.",
  path: "/familienmuster",
  keywords: ["Familienaufstellung", "Familienstellen", "Familienmuster", "Ahnenlinie", "Familiendynamik", "Systemische Familienaufstellung", "Muster lösen"],
});

export default function FamilienmusterPage() {
  return <FamilienmusterClient />;
}
