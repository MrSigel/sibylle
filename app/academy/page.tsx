import Link from 'next/link';

export default function AcademyPage() {
  return (
    <main className="bg-white px-4 py-16 text-warmBlack md:px-0 md:py-24">
      <div className="container space-y-10">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-deepGold">Academy</p>
          <h1 className="editorial text-4xl sm:text-5xl md:text-6xl">Raum für Wissen und systemische Vertiefung</h1>
          <p className="max-w-3xl text-base leading-8 text-deepGold md:text-lg">
            Informationen zu aktuellen Formaten und Inhalten erhältst du direkt im persönlichen Kontakt.
          </p>
        </div>
        <Link href="mailto:kontakt@sibylle-bergold.de" className="inline-flex rounded-[1.75rem] bg-deepGold px-8 py-4 text-sm font-semibold text-white transition hover:bg-gold">
          Jetzt persönlich bei Sibylle melden
        </Link>
      </div>
    </main>
  );
}
