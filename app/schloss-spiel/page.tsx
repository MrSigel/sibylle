import type { Metadata } from "next";
import { InneresSchlossClient } from "./InneresSchlossClient";

export const metadata: Metadata = {
  title: "Inneres Schloss Selbsttest | Sibylle Bergold",
  description: "Textbasiertes Mini-Spiel zu Energie, Authentizität und inneren Mustern. Coaching und Selbsterfahrung ohne Heilversprechen.",
  alternates: {
    canonical: "/schloss-spiel",
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Inneres Schloss Selbsttest | Sibylle Bergold",
    description: "Erkunde fünf innere Räume und erhalte deine persönliche Auswertung.",
    url: "/schloss-spiel",
  },
};

export default function SchlossSpielPage() {
  return <InneresSchlossClient />;
}
