import { Metadata } from 'next';
import { PartnerschaftClient } from './PartnerschaftClient';

export const metadata: Metadata = {
  title: "Partnerschaft klären & Liebe neu erleben | Sibylle Bergold",
  description: "Beziehungskrise oder Sehnsucht nach Nähe? Systemische Aufstellungen helfen Singles und Paaren, Beziehungsdynamiken zu verstehen und zu heilen.",
  keywords: ["Partnerschaft Hilfe", "Beziehungskrise", "Single Coaching", "Trennungsschmerz überwinden", "Systemische Paarberatung"],
};

export default function PartnerschaftPage() {
  return <PartnerschaftClient />;
}
