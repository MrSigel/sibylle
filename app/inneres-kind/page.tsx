import { InneresKindClient } from './InneresKindClient';
import { pageMetadata } from '@/lib/sibylle/metadata';

export const metadata = pageMetadata({
  title: "Inneres Kind & systemische Heilung",
  description: "Arbeite systemisch mit deinem inneren Kind. Finde zu mehr emotionaler Freiheit und innerer Stärke – online oder in Aschaffenburg.",
  path: "/inneres-kind",
  keywords: ["Inneres Kind", "Systemische Kindheitsarbeit", "Emotionale Heilung", "Selbstwert stärken", "Gefühlswelt verstehen", "Coaching Aschaffenburg"],
});

export default function InneresKindPage() {
  return <InneresKindClient />;
}
