import { Metadata } from 'next';
import { AhnenmusterClient } from './AhnenmusterClient';

export const metadata: Metadata = {
  title: "Ahnenmuster verstehen & transgenerationale Heilung | Sibylle Bergold",
  description: "Trägst du die Lasten deiner Vorfahren? Entdecke, wie systemische Aufstellungen helfen, Ahnenmuster zu erkennen und unbewusste Loyalitäten zu lösen.",
  keywords: ["Ahnenmuster", "Transgenerationale Weitergabe", "Epigenetik Coaching", "Familiengeheimnisse lösen", "Ahnenheilung"],
};

export default function AhnenmusterPage() {
  return <AhnenmusterClient />;
}
