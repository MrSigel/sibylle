import { BeziehungsmusterClient } from './BeziehungsmusterClient';
import { pageMetadata } from '@/lib/sibylle/metadata';

export const metadata = pageMetadata({
  title: "Beziehungsmuster erkennen & lösen",
  description: "Wiederholen sich deine Beziehungsprobleme? Sibylle Jutta Bergold hilft dir, die tieferen Ursachen deiner Beziehungsmuster zu verstehen und nachhaltig zu verändern.",
  path: "/beziehungsmuster",
  keywords: ["Beziehungsmuster", "Bindungsangst", "Verlustangst", "Partnerschaft Probleme", "Systemisches Coaching", "Liebeskummer überwinden"],
});

export default function BeziehungsmusterPage() {
  return <BeziehungsmusterClient />;
}
