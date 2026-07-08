import { pageMetadata } from "@/lib/sibylle/metadata";
import { AcademyClient } from "./AcademyClient";

export const metadata = pageMetadata({
  title: "Academy für systemische Aufstellungen",
  description:
    "Die Academy von Sibylle Bergold: Aufzeichnungen, Selbst-Aufstellungs-Übungen und monatliche Live-Gruppensessions rund um systemische Aufstellungen und Selbsterfahrung.",
  path: "/academy",
  keywords: ["Systemaufstellung Academy", "Aufstellung Ausbildung", "Selbsterfahrung Gruppe", "systemisches Coaching lernen", "Sibylle Bergold Academy"],
});

export default function AcademyPage() {
  return <AcademyClient />;
}
