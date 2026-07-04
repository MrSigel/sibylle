import Link from "next/link";

export default function WissenPage() {
  return (
    <main className="bg-white px-4 py-16 text-warmBlack md:px-0 md:py-24">
      <div className="container space-y-10">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-deepGold">
            Wissen
          </p>
          <h1 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
            Wissen über systemische Muster und Selbsterfahrung
          </h1>
          <p className="max-w-3xl text-base leading-8 text-deepGold md:text-lg">
            Hier findest du Hintergründe zur Arbeit mit Systemaufstellungen,
            damit du verstehen kannst, wie Muster und Beziehungen in dir wirken.
          </p>
        </div>
        <div className="rounded-[2rem] border border-mist bg-white p-10 shadow-soft">
          <h2 className="text-2xl font-semibold text-warmBlack">
            Worum es geht
          </h2>
          <p className="mt-4 text-base leading-8 text-deepGold">
            Systemische Aufstellungen machen Beziehungs- und Familienstoff
            sichtbar. Sie ersetzen keine medizinische oder therapeutische
            Behandlung, sondern dienen der eigenen Klarheit und Veränderung.
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
