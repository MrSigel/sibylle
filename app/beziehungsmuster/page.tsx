import { BeziehungsmusterClient } from './BeziehungsmusterClient';
import { pageMetadata } from '@/lib/sibylle/metadata';

export const metadata = pageMetadata({
  title: "Beziehungsmuster erkennen & lösen",
  description: "Wiederholen sich deine Beziehungsprobleme? Sibylle Jutta Bergold hilft dir, deine Beziehungsmuster zu erkennen, ihre tieferen Ursachen zu verstehen und nachhaltig zu verändern.",
  path: "/beziehungsmuster",
  keywords: ["Beziehungsmuster", "Beziehungsmuster erkennen", "Beziehungsmuster verstehen", "Bindungsangst", "Verlustangst", "Partnerschaft Probleme", "Systemisches Coaching", "Liebeskummer überwinden"],
});

export default function BeziehungsmusterPage() {
  return <BeziehungsmusterClient />;
}
