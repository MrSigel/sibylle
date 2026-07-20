import type { Metadata } from "next";
import { TerminClient } from "./TerminClient";

// Ads-only landing page. noindex so it never competes with the real
// /familienmuster content page in organic search — it exists purely to
// convert paid clicks into WhatsApp inquiries.
export const metadata: Metadata = {
  title: "Familienaufstellung nach Hellinger – online & in Aschaffenburg",
  description:
    "Familienaufstellung nach Hellinger mit Sibylle Jutta Bergold. Wiederkehrende Muster aus der Herkunftsfamilie sichtbar machen und lösen. Jetzt per WhatsApp anfragen.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/termin" },
};

export default function TerminPage() {
  return <TerminClient />;
}
