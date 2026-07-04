import { Metadata } from 'next';
import { InneresKindClient } from './InneresKindClient';

export const metadata: Metadata = {
  title: "Inneres Kind Arbeit & Systemische Heilung | Sibylle Bergold",
  description: "Heile alte Wunden durch systemische Arbeit mit dem inneren Kind. Finde zu emotionaler Freiheit und neuer Stärke in München & Online.",
  keywords: ["Inneres Kind", "Systemische Kindheitsarbeit", "Emotionale Heilung", "Selbstwert stärken", "Gefühlswelt verstehen", "Coaching München"],
};

export default function InneresKindPage() {
  return <InneresKindClient />;
}
