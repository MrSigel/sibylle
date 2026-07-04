import { Metadata } from 'next';
import { UeberMichClient } from './UeberMichClient';

export const metadata: Metadata = {
  title: "Über Sibylle Bergold | Expertin für Systemische Aufstellungen",
  description: "Lerne Sibylle Bergold kennen – Gründerin der Deutschen Akademie für Systemaufstellungen mit über 25 Jahren Erfahrung in systemischer Begleitung.",
  keywords: ["Sibylle Bergold", "Systemische Aufstellerin", "Coaching Expertise", "Akademie für Systemaufstellungen", "Erfahrung systemische Arbeit"],
};

export default function UeberMichPage() {
  return <UeberMichClient />;
}
