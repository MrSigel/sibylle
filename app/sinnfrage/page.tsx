import { Metadata } from 'next';
import { SinnfrageClient } from './SinnfrageClient';

export const metadata: Metadata = {
  title: "Sinnfrage & Lebensweg klären | Sibylle Bergold",
  description: "Fühlst du dich orientierungslos? Systemische Aufstellungen helfen dir, deinen eigenen Platz zu finden und die Sinnfrage in deinem Leben zu klären.",
  keywords: ["Sinnfrage", "Lebenssinn finden", "Orientierungslosigkeit Coaching", "Systemische Sinnsuche", "Lebensweg Klärung"],
};

export default function SinnfragePage() {
  return <SinnfrageClient />;
}
