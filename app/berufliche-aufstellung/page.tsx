import { BeruflicheAufstellungClient } from './BeruflicheAufstellungClient';
import { pageMetadata } from '@/lib/sibylle/metadata';

export const metadata = pageMetadata({
  title: "Berufliche & Organisationsaufstellung",
  description: "Blockaden im Business? Systemische Aufstellungen für Beruf & Erfolg helfen, Teamdynamiken zu klären und deine Karriere auf das nächste Level zu heben.",
  path: "/berufliche-aufstellung",
  keywords: ["Berufliche Aufstellung", "Organisationsaufstellung", "Business Coaching", "Teamdynamik", "Erfolgsblockaden lösen", "Systemische Beratung Business"],
});

export default function BeruflicheAufstellungPage() {
  return <BeruflicheAufstellungClient />;
}
