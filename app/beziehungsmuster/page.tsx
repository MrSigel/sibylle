import { Metadata } from 'next';
import { BeziehungsmusterClient } from './BeziehungsmusterClient';

export const metadata: Metadata = {
  title: "Beziehungsmuster erkennen & lösen | Systemisches Coaching",
  description: "Wiederholen sich deine Beziehungsprobleme? Sibylle Bergold hilft dir, die tieferen Ursachen deiner Beziehungsmuster zu verstehen und nachhaltig zu verändern.",
  keywords: ["Beziehungsmuster", "Bindungsangst", "Verlustangst", "Partnerschaft Probleme", "Systemisches Coaching", "Liebeskummer überwinden"],
};

export default function BeziehungsmusterPage() {
  return <BeziehungsmusterClient />;
}
