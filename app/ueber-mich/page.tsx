import { UeberMichClient } from './UeberMichClient';
import { pageMetadata } from '@/lib/sibylle/metadata';

export const metadata = pageMetadata({
  title: "Über mich – Systemische Aufstellerin",
  description: "Lerne Sibylle Jutta Bergold kennen – Gründerin der Deutschen Akademie für Systemaufstellungen mit über 25 Jahren Erfahrung in systemischer Begleitung.",
  path: "/ueber-mich",
  keywords: ["Sibylle Bergold", "Systemische Aufstellerin", "Coaching Expertise", "Akademie für Systemaufstellungen", "Erfahrung systemische Arbeit"],
});

export default function UeberMichPage() {
  return <UeberMichClient />;
}
