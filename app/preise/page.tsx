import { Metadata } from 'next';
import { PreiseClient } from './PreiseClient';

export const metadata: Metadata = {
  title: "Preise & Pakete für Systemaufstellungen | Sibylle Bergold",
  description: "Finde das passende Paket für deine systemische Begleitung. Von Einzelsessions bis hin zur mehrmonatigen Intensivbegleitung.",
  keywords: ["Preise Systemaufstellung", "Coaching Pakete", "Kosten Familienaufstellung", "Intensivbegleitung Coaching"],
};

export default function PreisePage() {
  return <PreiseClient />;
}
