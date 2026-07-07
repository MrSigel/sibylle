import { InneresSchlossClient } from "./InneresSchlossClient";
import { pageMetadata } from "@/lib/sibylle/metadata";

export const metadata = pageMetadata({
  title: "Inneres Schloss Selbsttest",
  description: "Textbasiertes Mini-Spiel zu Energie, Authentizität und inneren Mustern. Coaching und Selbsterfahrung ohne Heilversprechen.",
  path: "/schloss-spiel",
  noIndex: true,
});

export default function SchlossSpielPage() {
  return <InneresSchlossClient />;
}
