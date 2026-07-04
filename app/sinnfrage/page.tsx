import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sinnfrage & Lebensweg klären | Sibylle Bergold",
  description: "Fühlst du dich orientierungslos? Systemische Aufstellungen helfen dir, deinen eigenen Platz zu finden und die Sinnfrage in deinem Leben zu klären.",
  keywords: ["Sinnfrage", "Lebenssinn finden", "Orientierungslosigkeit Coaching", "Systemische Sinnsuche", "Lebensweg Klärung"],
};

export default function SinnfragePage() {
  return (
    <main className="bg-white px-4 py-16 text-warmBlack md:px-0 md:py-24">
      <div className="container space-y-10">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-deepGold">
            Sinnfrage
          </p>
          <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
            Dein Leben als Antwort: Wie stimmig fühlt sich dein Weg an?
          </h1>
          <p className="max-w-3xl text-base leading-8 text-deepGold md:text-lg">
            Sinnfragen zeigen sich oft als innere Leere oder unerfüllte
            Sehnsucht. Systemische Arbeit hilft dir, die Hintergründe zu
            entdecken und den eigenen Platz zu klären.
          </p>
        </div>
        <div className="rounded-[2rem] border border-mist bg-white p-10 shadow-soft">
          <h2 className="text-2xl font-semibold text-warmBlack">
            Stille Transformation
          </h2>
          <p className="mt-4 text-base leading-8 text-deepGold">
            Ohne Druck schauen wir auf die Muster, die deine Lebensenergie
            blockieren. Es geht nicht um schnelle Antworten, sondern um echte
            Übereinstimmung.
          </p>
        </div>
        <Link
          href="/methode"
          className="inline-flex rounded-[1.75rem] bg-deepGold px-8 py-4 text-sm font-semibold text-white transition hover:bg-gold"
        >
          Zur Methode
        </Link>
      </div>
    </main>
  );
}
