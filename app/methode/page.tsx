import { MethodeClient } from './MethodeClient';
import { pageMetadata } from '@/lib/sibylle/metadata';

export const metadata = pageMetadata({
  title: "Die Methode – Systemische Aufstellungen",
  description: "Erfahre, wie systemische Arbeit abläuft: von der Klärung deines Anliegens über das Sichtbarmachen bis zur Veränderung deiner Muster.",
  path: "/methode",
  keywords: ["Systemische Methode", "Aufstellungsarbeit Prozess", "Coaching Ablauf", "Wahrnehmung Veränderung"],
});

export default function MethodePage() {
  return <MethodeClient />;
}
