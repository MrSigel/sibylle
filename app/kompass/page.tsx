import { BeziehungsKompassClient } from "./BeziehungsKompassClient";
import { pageMetadata } from "@/lib/sibylle/metadata";

export const metadata = pageMetadata({
  title: "Beziehungs-Kompass Selbsttest",
  description: "Kostenloser Selbsttest zu Beziehungsmustern. Erhalte deinen Beziehungs-Kompass per WhatsApp und Impulse zu systemischem Coaching.",
  path: "/kompass",
  keywords: ["Beziehungstest", "Beziehungsmuster Selbsttest", "Beziehungs-Kompass", "Systemisches Coaching"],
});

export default function KompassPage() {
  return <BeziehungsKompassClient />;
}
