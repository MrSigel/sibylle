import type { Metadata } from "next";
import { BeziehungsKompassClient } from "./BeziehungsKompassClient";

export const metadata: Metadata = {
  title: "Beziehungs-Kompass Selbsttest | Sibylle Bergold",
  description: "Kostenloser Selbsttest zu Beziehungsmustern. Erhalte deinen Beziehungs-Kompass per WhatsApp und Impulse zu systemischem Coaching.",
  openGraph: {
    title: "Beziehungs-Kompass Selbsttest | Sibylle Bergold",
    description: "Finde heraus, welches Beziehungsmuster gerade sichtbar ist.",
    url: "/kompass",
  },
};

export default function KompassPage() {
  return <BeziehungsKompassClient />;
}
