import { FamilienmusterClient } from './FamilienmusterClient';
import { pageMetadata } from '@/lib/sibylle/metadata';

export const metadata = pageMetadata({
  title: "Familienaufstellung nach Hellinger – Muster erkennen & lösen",
  description: "Familienaufstellung nach Hellinger mit Sibylle Jutta Bergold – über 25 Jahre Erfahrung. Erkenne, welche Familienmuster in dir wirken, und löse sie. In Aschaffenburg oder online.",
  path: "/familienmuster",
  keywords: ["Familienaufstellung", "Familienaufstellung nach Hellinger", "Familienstellen", "Familienmuster", "Ahnenlinie", "Familiendynamik", "Systemische Familienaufstellung", "Muster lösen"],
});

export default function FamilienmusterPage() {
  return <FamilienmusterClient />;
}
