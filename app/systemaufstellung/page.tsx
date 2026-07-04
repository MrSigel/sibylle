import { Metadata } from 'next';
import { SystemaufstellungClient } from './SystemaufstellungClient';

export const metadata: Metadata = {
  title: "Systemaufstellung München & Online | Verstrickungen lösen",
  description: "Erlebe die befreiende Kraft einer Systemaufstellung. Sibylle Bergold begleitet dich dabei, unbewusste Dynamiken in Familie & Beruf sichtbar zu machen und zu lösen.",
  keywords: ["Systemaufstellung", "Familienaufstellung", "Organisationsaufstellung", "Strukturaufstellung", "München Aufstellung", "Online Aufstellung", "Systemische Arbeit"],
};

export default function SystemaufstellungPage() {
  return <SystemaufstellungClient />;
}
