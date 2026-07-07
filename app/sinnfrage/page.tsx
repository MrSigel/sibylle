import { SinnfrageClient } from './SinnfrageClient';
import { pageMetadata } from '@/lib/sibylle/metadata';

export const metadata = pageMetadata({
  title: "Sinnfrage & Lebensweg klären",
  description: "Fühlst du dich orientierungslos? Systemische Aufstellungen helfen dir, deinen eigenen Platz zu finden und die Sinnfrage in deinem Leben zu klären.",
  path: "/sinnfrage",
  keywords: ["Sinnfrage", "Lebenssinn finden", "Orientierungslosigkeit Coaching", "Systemische Sinnsuche", "Lebensweg Klärung"],
});

export default function SinnfragePage() {
  return <SinnfrageClient />;
}
