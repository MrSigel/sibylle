import { AhnenmusterClient } from './AhnenmusterClient';
import { pageMetadata } from '@/lib/sibylle/metadata';

export const metadata = pageMetadata({
  title: "Ahnenmuster & transgenerationale Heilung",
  description: "Trägst du die Lasten deiner Vorfahren? Entdecke, wie systemische Aufstellungen helfen, Ahnenmuster zu erkennen und unbewusste Loyalitäten zu lösen.",
  path: "/ahnenmuster",
  keywords: ["Ahnenmuster", "Transgenerationale Weitergabe", "Epigenetik Coaching", "Familiengeheimnisse lösen", "Ahnenheilung"],
});

export default function AhnenmusterPage() {
  return <AhnenmusterClient />;
}
