import { pageMetadata } from "@/lib/sibylle/metadata";
import { WissenClient } from "./WissenClient";

export const metadata = pageMetadata({
  title: "Wissen über systemische Muster",
  description:
    "Hintergründe zu Systemaufstellungen, Beziehungsmustern, Familienmustern und systemischer Selbsterfahrung – klar erklärt von Sibylle Bergold.",
  path: "/wissen",
  keywords: ["Systemaufstellung Wissen", "Beziehungsmuster verstehen", "Familienmuster", "systemisches Coaching", "Selbsterfahrung"],
});

export default function WissenPage() {
  return <WissenClient />;
}
