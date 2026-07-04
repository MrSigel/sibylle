import { Metadata } from 'next';
import { BeruflicheAufstellungClient } from './BeruflicheAufstellungClient';

export const metadata: Metadata = {
  title: "Berufliche Aufstellung & Organisationsaufstellung | Erfolg im System",
  description: "Blockaden im Business? Systemische Aufstellungen für Beruf & Erfolg helfen Teamdynamiken zu klären und deine Karriere auf das nächste Level zu heben.",
  keywords: ["Berufliche Aufstellung", "Organisationsaufstellung", "Business Coaching", "Teamdynamik", "Erfolgsblockaden lösen", "Systemische Beratung Business"],
};

export default function BeruflicheAufstellungPage() {
  return <BeruflicheAufstellungClient />;
}
