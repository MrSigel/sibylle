import { Metadata } from 'next';
import { MethodeClient } from './MethodeClient';

export const metadata: Metadata = {
  title: "Die Methode: Systemische Aufstellungen | Sibylle Bergold",
  description: "Erfahre mehr über den Prozess der systemischen Arbeit: Von der Wahrnehmung bis zur Veränderung deiner Muster.",
  keywords: ["Systemische Methode", "Aufstellungsarbeit Prozess", "Coaching Ablauf", "Wahrnehmung Veränderung"],
};

export default function MethodePage() {
  return <MethodeClient />;
}
