import { PreiseClient } from './PreiseClient';
import { pageMetadata } from '@/lib/sibylle/metadata';

export const metadata = pageMetadata({
  title: "Preise & Pakete für Systemaufstellungen",
  description: "Finde das passende Paket für deine systemische Begleitung – von der 90-minütigen Einzelsession bis zur mehrmonatigen Intensivbegleitung.",
  path: "/preise",
  keywords: ["Preise Systemaufstellung", "Coaching Pakete", "Kosten Familienaufstellung", "Intensivbegleitung Coaching"],
});

export default function PreisePage() {
  return <PreiseClient />;
}
