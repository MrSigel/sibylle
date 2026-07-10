import { SystemaufstellungClient } from './SystemaufstellungClient';
import { pageMetadata } from '@/lib/sibylle/metadata';

export const metadata = pageMetadata({
  title: "Systemaufstellung Aschaffenburg & Online",
  description: "Erlebe die Kraft einer Systemaufstellung. Sibylle Bergold macht unbewusste Dynamiken in Familie & Beruf sichtbar und hilft dir, sie zu lösen.",
  path: "/systemaufstellung",
  keywords: ["Systemaufstellung", "Familienaufstellung", "Organisationsaufstellung", "Strukturaufstellung", "Aschaffenburg Aufstellung", "Online Aufstellung", "Systemische Arbeit"],
});

export default function SystemaufstellungPage() {
  return <SystemaufstellungClient />;
}
