import { PartnerschaftClient } from './PartnerschaftClient';
import { pageMetadata } from '@/lib/sibylle/metadata';

export const metadata = pageMetadata({
  title: "Partnerschaft klären & Liebe neu erleben",
  description: "Beziehungskrise oder Sehnsucht nach Nähe? Systemische Aufstellungen helfen Singles und Paaren, Beziehungsdynamiken zu verstehen und zu heilen.",
  path: "/partnerschaft",
  keywords: ["Partnerschaft Hilfe", "Beziehungskrise", "Single Coaching", "Trennungsschmerz überwinden", "Systemische Paarberatung"],
});

export default function PartnerschaftPage() {
  return <PartnerschaftClient />;
}
